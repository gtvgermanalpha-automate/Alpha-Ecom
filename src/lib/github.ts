/**
 * Tiny GitHub REST client for the git-backed CMS.
 *
 * All CMS reads/writes target the DRAFT branch (default `cms-draft`); the live
 * site builds from the production branch (`main`). "Publish" merges draft → main
 * (a merge commit that DOES build); draft commits carry `[skip ci]` as a backstop.
 *
 * Configured purely from env (server-only):
 *   GITHUB_TOKEN         fine-grained PAT, Contents: read/write, this repo only
 *   GITHUB_REPO          "owner/name"
 *   GITHUB_BRANCH        published branch the host builds (default "main")
 *   GITHUB_DRAFT_BRANCH  draft branch, not built (default "cms-draft")
 */

const TOKEN = process.env.GITHUB_TOKEN;
const REPO = process.env.GITHUB_REPO;
const BRANCH = process.env.GITHUB_BRANCH ?? "main";
const DRAFT = process.env.GITHUB_DRAFT_BRANCH ?? "cms-draft";

const API = "https://api.github.com";

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
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });

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

/** Create the draft branch from production if it doesn't exist (idempotent). */
export async function ensureDraftBranch() {
  const existing = await getBranchSha(DRAFT);
  if (existing) return;
  const baseSha = await getBranchSha(BRANCH);
  if (!baseSha) throw new Error(`Production branch "${BRANCH}" not found.`);
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
