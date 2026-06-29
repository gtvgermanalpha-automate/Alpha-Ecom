import { NextResponse } from "next/server";

import { writeBinary } from "@/lib/cms/store";
import { slugify } from "@/lib/cms/limits";
import { GitHubConfigError } from "@/lib/github";

export const runtime = "nodejs";

const MAX_BYTES = 6 * 1024 * 1024; // 6 MB
const ALLOWED: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/svg+xml": "svg",
  "image/avif": "avif",
};

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "No file provided." }, { status: 400 });
    if (file.size > MAX_BYTES) return NextResponse.json({ error: "File must be under 6 MB." }, { status: 422 });

    const ext = ALLOWED[file.type];
    if (!ext) return NextResponse.json({ error: "Unsupported image type." }, { status: 422 });

    const base = slugify(file.name.replace(/\.[^.]+$/, "")) || "upload";
    const stamp = Math.abs(hashString(`${file.name}:${file.size}`)).toString(36).slice(0, 6);
    const path = `public/uploads/${base}-${stamp}.${ext}`;

    const base64 = Buffer.from(await file.arrayBuffer()).toString("base64");
    await writeBinary(path, base64, `CMS: upload ${base}.${ext}`);

    // Public URL (strip the leading "public")
    return NextResponse.json({ ok: true, url: path.replace(/^public/, "") });
  } catch (e) {
    if (e instanceof GitHubConfigError) return NextResponse.json({ error: e.message }, { status: 503 });
    return NextResponse.json({ error: e instanceof Error ? e.message : "Upload failed" }, { status: 500 });
  }
}

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}
