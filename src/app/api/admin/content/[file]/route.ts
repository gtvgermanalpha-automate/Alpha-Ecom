import { NextResponse } from "next/server";

import { getCollection } from "@/lib/cms/registry";
import { type FieldSpec } from "@/lib/cms/validate";
import { readCollection, writeCollection } from "@/lib/cms/store";
import { slugify } from "@/lib/cms/limits";
import { GitHubConfigError, GitHubConflictError } from "@/lib/github";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: Promise<{ file: string }> };

const json = (data: unknown, status = 200) => NextResponse.json(data, { status });

function handle(err: unknown) {
  if (err instanceof GitHubConflictError) return json({ error: err.message }, 409);
  if (err instanceof GitHubConfigError) return json({ error: err.message }, 503);
  return json({ error: err instanceof Error ? err.message : "Unexpected error" }, 500);
}

/** Build a minimal entry that satisfies the collection's required fields. */
function defaultValue(f: FieldSpec): unknown {
  switch (f.type) {
    case "string":
    case "text":
      return f.enum ? f.enum[0] : f.required ? "Untitled" : "";
    case "number":
      return 0;
    case "boolean":
      return false;
    case "string[]":
      return [];
    case "object":
      return Object.fromEntries((f.fields ?? []).map((sf) => [sf.key, defaultValue(sf)]));
    case "object[]":
      return [];
    default:
      return "";
  }
}

export async function GET(_req: Request, { params }: Params) {
  const col = getCollection((await params).file);
  if (!col) return json({ error: "unknown_collection" }, 404);
  try {
    const { data, sha } = await readCollection(col.file);
    return json({ data, sha, mode: col.mode, idField: col.idField, fields: col.fields, label: col.label });
  } catch (e) {
    return handle(e);
  }
}

export async function PUT(req: Request, { params }: Params) {
  const col = getCollection((await params).file);
  if (!col) return json({ error: "unknown_collection" }, 404);
  const body = await req.json().catch(() => null);
  if (!body) return json({ error: "invalid_json" }, 400);

  try {
    if (col.mode === "object") {
      const v = col.validate(body.data);
      if (!v.ok) return json({ errors: v.errors }, 422);
      await writeCollection(col.file, body.data, body.sha ?? null, `CMS: update ${col.label}`);
      return json({ ok: true });
    }

    // list mode — replace (or append) the entry matched by idField
    const idField = col.idField ?? "slug";
    const entry = body.entry as Record<string, unknown> | undefined;
    if (!entry || typeof entry[idField] !== "string") return json({ error: "missing_entry" }, 400);

    const { data } = await readCollection<Record<string, unknown>[]>(col.file);
    const arr = Array.isArray(data) ? data.slice() : [];
    const idx = arr.findIndex((e) => e?.[idField] === entry[idField]);
    if (idx >= 0) arr[idx] = entry;
    else arr.push(entry);

    const v = col.validate(arr);
    if (!v.ok) return json({ errors: v.errors }, 422);
    await writeCollection(col.file, arr, body.sha ?? null, `CMS: update ${col.label}/${entry[idField]}`);
    return json({ ok: true });
  } catch (e) {
    return handle(e);
  }
}

export async function POST(req: Request, { params }: Params) {
  const col = getCollection((await params).file);
  if (!col || col.mode !== "list") return json({ error: "unsupported" }, 400);
  const body = await req.json().catch(() => ({}));
  const idField = col.idField ?? "slug";
  const title = String((body as { title?: string }).title || "New entry").slice(0, 120);

  try {
    const { data } = await readCollection<Record<string, unknown>[]>(col.file);
    const arr = Array.isArray(data) ? data.slice() : [];

    // server owns the unique slug
    const base = slugify(title) || "entry";
    let slug = base;
    let n = 1;
    while (arr.some((e) => e?.[idField] === slug)) slug = `${base}-${++n}`;

    const entry: Record<string, unknown> = {};
    for (const f of col.fields) entry[f.key] = defaultValue(f);
    entry[idField] = slug;
    if (col.titleField) entry[col.titleField] = title;

    arr.push(entry);
    const v = col.validate(arr);
    if (!v.ok) return json({ errors: v.errors }, 422);
    await writeCollection(col.file, arr, null, `CMS: create ${col.label}/${slug}`);
    return json({ ok: true, slug });
  } catch (e) {
    return handle(e);
  }
}

export async function DELETE(req: Request, { params }: Params) {
  const col = getCollection((await params).file);
  if (!col || col.mode !== "list") return json({ error: "unsupported" }, 400);
  const slug = new URL(req.url).searchParams.get("slug");
  if (!slug) return json({ error: "missing_slug" }, 400);
  const idField = col.idField ?? "slug";

  try {
    const { data } = await readCollection<Record<string, unknown>[]>(col.file);
    const arr = (Array.isArray(data) ? data : []).filter((e) => e?.[idField] !== slug);
    const v = col.validate(arr);
    if (!v.ok) return json({ errors: v.errors }, 422);
    await writeCollection(col.file, arr, null, `CMS: delete ${col.label}/${slug}`);
    return json({ ok: true });
  } catch (e) {
    return handle(e);
  }
}
