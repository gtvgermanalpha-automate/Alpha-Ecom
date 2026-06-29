import { NextResponse } from "next/server";

import { statusInfo } from "@/lib/cms/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(await statusInfo());
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unable to read status" },
      { status: 500 }
    );
  }
}
