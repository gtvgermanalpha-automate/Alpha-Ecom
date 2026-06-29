/**
 * Tiny GitHub REST client for the git-backed CMS.
 *
 * All CMS reads/writes target the DRAFT branch (default `cms-draft`); the live
 * site builds from the production branch (`main`). "Publish" merges draft → main
 * (a merge commit that DOES build); draft commits carry `[skip ci]` as a backstop.
 *
 * Configured purely from env (server-only):
 *   GITHUB_TOKEN         a token that can read/write this repo. Classic PAT (scope: repo)
 *                        from an account with push access, OR a fine-grained PAT whose
 *                        resource owner OWNS this repo with Contents: read/write. A
 *                        fine-grained PAT under any other account 404s on every call.
 *   GITHUB_REPO          "owner/name"
 *   GITHUB_BRANCH        published branch the host builds (default "main")
 *   GITHUB_DRAFT_BRANCH  draft branch, not built (default "cms-draft")
 */

/** Trim env values — secrets pasted into a host dashboard often carry a trailing
 * space or newline, which silently breaks the Authorization header or the repo path. */
const clean = (v: string | undefined): string | undefined => {
  const t = v?.trim();
  return t ? t : undefined;
};

/**
 * Reduce a repo value to the "owner/name" the API expects, even if someone pastes
 * the full clone URL (https://github.com/owner/name(.git)) or a git@ SSH URL. This
 * is the single most common GITHUB_REPO misconfiguration.
 */
const normalizeRepo = (v: string | undefined): string | undefined => {
  let t = clean(v);
  if (!t) return undefined;
  t = t
    .replace(/^https?:\/\/(www\.)?github\.com\//i, "")
    .replace(/^git@github\.com:/i, "")
    .replace(/\.git$/i, "")
    .replace(/^\/+|\/+$/g, "");
  return t || undefined;
};

const TOKEN = clean(process.env.GITHUB_TOKEN);
const REPO = normalizeRepo(process.env.GITHUB_REPO);
const BRANCH = clean(process.env.GITHUB_BRANCH) ?? "main";
const DRAFT = clean(process.env.GITHUB_DRAFT_BRANCH) ?? "cms-draft";

const API = "https://api.github.com";

function authHeaders(extra: HeadersInit = {}): HeadersInit {
  return {
    Authorization: `Bearer ${TOKEN}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
    ...extra,
  };
}

export class GitHubConfigError extends Error {}
export class GitHubConflictError extends Error {}

/** True when the CMS has everything it needs to talk to GitHub. */
export function isGithubConfigured() {
  return Boolean(TOKEN && REPO);
}

function requireConfig() {
  if (!isGithubConfigured()) {
    throw new GitHubConfigError(
      "CMS is not configured. Set GITHUB_TOKEN and GITHUB_REPO (and optionally GITHUB_BRANCH / GITHUB_DRAFT_BRANCH)."
    );
  }
}

async function api(path: string, init: RequestInit = {}) {
  requireConfig();
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: authHeaders(init.headers),
    cache: "no-store",
  });

  if (res.status === 401) {
    throw new GitHubConfigError(
      "GitHub rejected the token (401). GITHUB_TOKEN is missing, malformed, or expired."
    );
  }
  if (res.status === 403) {
    const detail = await res.text().catch(() => "");
    throw new GitHubConfigError(
      `GitHub denied the request (403) — the token lacks permission or hit a rate limit. ${detail.slice(0, 200)}`
    );
  }
  if (res.status === 409) {
    throw new GitHubConflictError("Content changed since you loaded it. Reload and try again.");
  }
  if (!res.ok && res.status !== 404) {
    const detail = await res.text().catch(() => "");
    throw new Error(`GitHub ${res.status} on ${path}: ${detail.slice(0, 300)}`);
  }
  return res;
}

const b64encode = (s: string) => Buffer.from(s, "utf8").toString("base64");
const b64decode = (s: string) => Buffer.from(s, "base64").toString("utf8");

/** Read + parse a JSON file from the draft branch. Returns null if absent. */
export async function getJsonFile<T = unknown>(
  path: string
): Promise<{ data: T; sha: string } | null> {
  await ensureDraftBranch();
  const res = await api(`/repos/${REPO}/contents/${encodeURIComponent(path).replace(/%2F/g, "/")}?ref=${DRAFT}`);
  if (res.status === 404) return null;
  const json = (await res.json()) as { content: string; sha: string };
  return { data: JSON.parse(b64decode(json.content)) as T, sha: json.sha };
}

/** Current blob sha of a file on the draft branch (or null). */
export async function getFileSha(path: string): Promise<string | null> {
  const res = await api(`/repos/${REPO}/contents/${path}?ref=${DRAFT}`);
  if (res.status === 404) return null;
  const json = (await res.json()) as { sha: string };
  return json.sha;
}

/** Commit pretty-printed JSON to the draft branch. */
export async function putJsonFile(path: string, data: unknown, sha: string | null, message: string) {
  const content = b64encode(JSON.stringify(data, null, 2) + "\n");
  return api(`/repos/${REPO}/contents/${path}`, {
    method: "PUT",
    body: JSON.stringify({
      message: `${message} [skip ci]`,
      content,
      branch: DRAFT,
      ...(sha ? { sha } : {}),
    }),
  });
}

/** Commit a base64 binary (e.g. an image) to the draft branch. */
export async function putRawFile(path: string, base64: string, message: string) {
  const sha = await getFileSha(path);
  return api(`/repos/${REPO}/contents/${path}`, {
    method: "PUT",
    body: JSON.stringify({
      message: `${message} [skip ci]`,
      content: base64,
      branch: DRAFT,
      ...(sha ? { sha } : {}),
    }),
  });
}

async function getBranchSha(branch: string): Promise<string | null> {
  const res = await api(`/repos/${REPO}/git/ref/heads/${branch}`);
  if (res.status === 404) return null;
  const json = (await res.json()) as { object: { sha: string } };
  return json.object.sha;
}

/**
 * Preflight the GitHub connection with the configured token and return a precise,
 * actionable reason when it can't be used. Surfaced by the admin status endpoint so
 * editors see the true problem instead of a misleading per-section error.
 */
export async function checkConnection(): Promise<{ ok: true } | { ok: false; reason: string }> {
  if (!isGithubConfigured()) {
    return { ok: false, reason: "GITHUB_TOKEN and GITHUB_REPO are not both set." };
  }
  const owner = (REPO ?? "").split("/")[0] || REPO;

  let repo: Response;
  try {
    repo = await fetch(`${API}/repos/${REPO}`, { headers: authHeaders(), cache: "no-store" });
  } catch (e) {
    return { ok: false, reason: `Network error reaching GitHub: ${e instanceof Error ? e.message : String(e)}` };
  }

  if (repo.status === 401) {
    return { ok: false, reason: "GitHub rejected the token (401). GITHUB_TOKEN is invalid, malformed, or expired." };
  }
  if (repo.status === 404) {
    return {
      ok: false,
      reason:
        `Repository "${REPO}" is not visible to this token (404). A fine-grained PAT only reaches ` +
        `repositories owned by its resource owner — set the resource owner to "${owner}" and grant this repo ` +
        `Contents: Read and write, or use a classic PAT (scope: repo) from an account with push access. ` +
        `Also double-check GITHUB_REPO for typos or trailing spaces.`,
    };
  }
  if (!repo.ok) {
    return { ok: false, reason: `GitHub returned ${repo.status} for /repos/${REPO}.` };
  }

  const branch = await fetch(`${API}/repos/${REPO}/git/ref/heads/${BRANCH}`, {
    headers: authHeaders(),
    cache: "no-store",
  });
  if (branch.status === 404) {
    return {
      ok: false,
      reason: `The repository is reachable, but production branch "${BRANCH}" was not found. Set GITHUB_BRANCH to your live branch.`,
    };
  }
  if (!branch.ok) {
    return { ok: false, reason: `GitHub returned ${branch.status} reading branch "${BRANCH}".` };
  }
  return { ok: true };
}

/** Create the draft branch from production if it doesn't exist (idempotent). */
export async function ensureDraftBranch() {
  const existing = await getBranchSha(DRAFT);
  if (existing) return;
  const baseSha = await getBranchSha(BRANCH);
  if (!baseSha) {
    // A 404 on the base ref is almost never a truly missing branch — it's the token
    // being unable to see the repo. Probe and surface the real, actionable reason.
    const probe = await checkConnection();
    throw new GitHubConfigError(
      probe.ok
        ? `Production branch "${BRANCH}" not found in ${REPO}. Set GITHUB_BRANCH to your live branch.`
        : probe.reason
    );
  }
  await api(`/repos/${REPO}/git/refs`, {
    method: "POST",
    body: JSON.stringify({ ref: `refs/heads/${DRAFT}`, sha: baseSha }),
  });
}

/** What's unpublished: how many commits ahead + which files changed. */
export async function draftStatus(): Promise<{ aheadBy: number; files: string[] }> {
  await ensureDraftBranch();
  const res = await api(`/repos/${REPO}/compare/${BRANCH}...${DRAFT}`);
  const json = (await res.json()) as { ahead_by: number; files?: { filename: string }[] };
  return { aheadBy: json.ahead_by ?? 0, files: (json.files ?? []).map((f) => f.filename) };
}

/** Merge draft → production (one build). Resync draft afterward so pending = 0. */
export async function publishDraft(): Promise<{ published: boolean; files: string[] }> {
  const { aheadBy, files } = await draftStatus();
  if (aheadBy === 0) return { published: false, files: [] };

  const merge = await api(`/repos/${REPO}/merges`, {
    method: "POST",
    body: JSON.stringify({
      base: BRANCH,
      head: DRAFT,
      commit_message: `CMS: publish ${files.length} change(s)`,
    }),
  });
  if (merge.status === 409) {
    throw new GitHubConflictError("Publish hit a merge conflict. Resolve on GitHub and retry.");
  }

  const tip = await getBranchSha(BRANCH);
  if (tip) await resetBranchTo(DRAFT, tip);
  return { published: true, files };
}

/** Discard all drafts: force the draft branch back to production. */
export async function discardDraft() {
  const tip = await getBranchSha(BRANCH);
  if (tip) await resetBranchTo(DRAFT, tip);
}

async function resetBranchTo(branch: string, sha: string) {
  return api(`/repos/${REPO}/git/refs/heads/${branch}`, {
    method: "PATCH",
    body: JSON.stringify({ sha, force: true }),
  });
}
