import { promises as fs } from "node:fs";
import path from "node:path";

import {
  checkConnection,
  discardDraft,
  draftStatus,
  getFileSha,
  getJsonFile,
  isGithubConfigured,
  publishDraft,
  putJsonFile,
  putRawFile,
} from "@/lib/github";
import { collectionByFile } from "@/lib/cms/registry";

/**
 * Storage abstraction for the CMS.
 *  - Production (GITHUB_* configured): read/write the `cms-draft` branch via the
 *    GitHub API; "publish" merges draft → main.
 *  - Local dev (not configured): read/write the JSON files on disk directly, so
 *    editing works without any GitHub setup (changes land in your working tree).
 */

const abs = (file: string) => path.join(process.cwd(), file);

export type CmsMode = "github" | "local";
export const cmsMode = (): CmsMode => (isGithubConfigured() ? "github" : "local");

export async function readCollection<T = unknown>(
  file: string
): Promise<{ data: T; sha: string | null }> {
  if (isGithubConfigured()) {
    const fromDraft = await getJsonFile<T>(file);
    if (fromDraft) return fromDraft;
  }
  const raw = await fs.readFile(abs(file), "utf8");
  return { data: JSON.parse(raw) as T, sha: null };
}

export async function writeCollection(
  file: string,
  data: unknown,
  sha: string | null,
  message: string
): Promise<void> {
  if (isGithubConfigured()) {
    const useSha = sha ?? (await getFileSha(file));
    await putJsonFile(file, data, useSha, message);
    return;
  }
  await fs.writeFile(abs(file), JSON.stringify(data, null, 2) + "\n", "utf8");
}

export async function writeBinary(file: string, base64: string, message: string): Promise<void> {
  if (isGithubConfigured()) {
    await putRawFile(file, base64, message);
    return;
  }
  await fs.mkdir(path.dirname(abs(file)), { recursive: true });
  await fs.writeFile(abs(file), Buffer.from(base64, "base64"));
}

export type StatusInfo = {
  mode: CmsMode;
  pending: number;
  items: { file: string; label: string }[];
  connection: { ok: boolean; reason?: string };
};

export async function statusInfo(): Promise<StatusInfo> {
  if (!isGithubConfigured()) return { mode: "local", pending: 0, items: [], connection: { ok: true } };

  // Preflight first so a bad token/repo yields one clear banner instead of an
  // error on every section.
  const conn = await checkConnection();
  if (!conn.ok) return { mode: "github", pending: 0, items: [], connection: conn };

  const { aheadBy, files } = await draftStatus();
  return {
    mode: "github",
    pending: aheadBy,
    items: files.map((f) => ({ file: f, label: collectionByFile(f)?.label ?? f })),
    connection: { ok: true },
  };
}

export const publish = () => publishDraft();
export const discard = () => discardDraft();
