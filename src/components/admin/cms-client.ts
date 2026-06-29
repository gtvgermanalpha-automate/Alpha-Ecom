"use client";

/** Field descriptor shape the content API returns (mirrors @/lib/cms/validate). */
export type FieldSpec = {
  key: string;
  label?: string;
  type: "string" | "text" | "string[]" | "number" | "boolean" | "object" | "object[]";
  required?: boolean;
  format?: "email" | "url" | "slug" | "hex";
  max?: number;
  enum?: string[];
  fields?: FieldSpec[];
  itemLabel?: string;
};

export type CollectionMeta = {
  data: unknown;
  sha: string | null;
  mode: "object" | "list";
  idField?: string;
  fields: FieldSpec[];
  label: string;
};

async function parse(res: Response) {
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = json.errors ? json.errors.join("\n") : json.error || `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return json;
}

export const getContent = (id: string): Promise<CollectionMeta> =>
  fetch(`/api/admin/content/${id}`, { cache: "no-store" }).then(parse);

export const saveObject = (id: string, data: unknown, sha: string | null) =>
  fetch(`/api/admin/content/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data, sha }),
  }).then(parse);

export const saveEntry = (id: string, entry: Record<string, unknown>, sha: string | null) =>
  fetch(`/api/admin/content/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ entry, sha }),
  }).then(parse);

export const createEntry = (id: string, title: string): Promise<{ slug: string }> =>
  fetch(`/api/admin/content/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  }).then(parse);

export const deleteEntry = (id: string, slug: string) =>
  fetch(`/api/admin/content/${id}?slug=${encodeURIComponent(slug)}`, { method: "DELETE" }).then(parse);

export type StatusInfo = {
  mode: "github" | "local";
  pending: number;
  items: { file: string; label: string }[];
  connection?: { ok: boolean; reason?: string };
};
export const getStatus = (): Promise<StatusInfo> =>
  fetch(`/api/admin/status`, { cache: "no-store" }).then(parse);

export const publishDraft = () => fetch(`/api/admin/publish`, { method: "POST" }).then(parse);
export const discardDraft = () => fetch(`/api/admin/discard`, { method: "POST" }).then(parse);

export const login = (password: string) =>
  fetch(`/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  }).then(parse);

export const logout = () => fetch(`/api/admin/logout`, { method: "POST" }).then(parse);

export async function uploadImage(file: File): Promise<{ url: string }> {
  const fd = new FormData();
  fd.append("file", file);
  return fetch(`/api/admin/upload`, { method: "POST", body: fd }).then(parse);
}
