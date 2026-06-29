import { NextResponse } from "next/server";

import { publish } from "@/lib/cms/store";
import { GitHubConfigError, GitHubConflictError } from "@/lib/github";

export const runtime = "nodejs";

export async function POST() {
  try {
    const result = await publish();
    return NextResponse.json(result);
  } catch (e) {
    if (e instanceof GitHubConflictError) return NextResponse.json({ error: e.message }, { status: 409 });
    if (e instanceof GitHubConfigError) return NextResponse.json({ error: e.message }, { status: 503 });
    return NextResponse.json({ error: e instanceof Error ? e.message : "Publish failed" }, { status: 500 });
  }
}
