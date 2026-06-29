import { NextResponse } from "next/server";

import { discard } from "@/lib/cms/store";
import { GitHubConfigError } from "@/lib/github";

export const runtime = "nodejs";

export async function POST() {
  try {
    await discard();
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof GitHubConfigError) return NextResponse.json({ error: e.message }, { status: 503 });
    return NextResponse.json({ error: e instanceof Error ? e.message : "Discard failed" }, { status: 500 });
  }
}
