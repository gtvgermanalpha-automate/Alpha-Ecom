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
  longText?: boolean; // string[] edited as one big text box (one block per line)
  guide?: { diagram: string; title: string; steps: string[] }; // picture + directions shown above the field
};

export type CollectionMeta = {
  data: unknown;
  sha: string | null;
  mode: "object" | "list";
  idField?: string;
  fields: FieldSpec[];
  label: string;
  guide?: FieldSpec["guide"];
};

async function parse(res: Response) {
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = json.errors
      ? json.errors.join("\n")
      : json.error ||
        (res.status === 413
          ? "This file is too large to upload. Please use an image under 4 MB."
          : `Request failed (${res.status})`);
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

/** Longest side, in pixels, an uploaded photo is scaled down to. Plenty for a full-width banner. */
const MAX_IMAGE_SIDE = 2000;
/** The host rejects request bodies over 4.5 MB, so stay safely below that. */
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

const canvasBlob = (canvas: HTMLCanvasElement, type: string, quality: number) =>
  new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality));

/**
 * Scale a photo down and re-encode it as WebP in the browser, so large camera or
 * Canva exports upload quickly and never hit the host's size limit.
 * SVGs and files the browser cannot decode are returned unchanged.
 */
async function shrinkImage(file: File): Promise<File> {
  if (!/^image\/(jpeg|png|webp|avif)$/.test(file.type)) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_IMAGE_SIDE / Math.max(bitmap.width, bitmap.height));
    // Small files that need no resizing are fine as they are.
    if (scale === 1 && file.size <= 600 * 1024) return file;
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const base = file.name.replace(/\.[^.]+$/, "");
    for (const quality of [0.86, 0.75, 0.6]) {
      const blob = await canvasBlob(canvas, "image/webp", quality);
      if (!blob || blob.type !== "image/webp") break; // browser cannot write WebP
      if (blob.size <= MAX_UPLOAD_BYTES) {
        return blob.size < file.size ? new File([blob], `${base}.webp`, { type: "image/webp" }) : file;
      }
    }
  } catch {
    /* not decodable here: upload the original */
  }
  return file;
}

export async function uploadImage(file: File): Promise<{ url: string }> {
  const ready = await shrinkImage(file);
  if (ready.size > MAX_UPLOAD_BYTES) {
    throw new Error("This file is too large to upload. Please use an image under 4 MB.");
  }
  const fd = new FormData();
  fd.append("file", ready);
  return fetch(`/api/admin/upload`, { method: "POST", body: fd }).then(parse);
}
