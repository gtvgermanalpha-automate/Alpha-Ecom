import { NextResponse } from "next/server";
import { z } from "zod";

import { siteConfig } from "@/lib/site";
import { addContactToAudience, esc, resendConfigured, sendEmail } from "@/lib/resend";

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json ?? {});
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 422 });
  }
  const { email } = parsed.data;

  if (resendConfigured()) {
    try {
      // Add to the Resend audience (no-op unless RESEND_AUDIENCE_ID is set)…
      await addContactToAudience(email);
      // …and notify the team so the lead lands in the inbox either way.
      await sendEmail({
        subject: `New newsletter subscriber: ${email}`,
        replyTo: email,
        html: `<div style="font-family:Arial,Helvetica,sans-serif;color:#111144">
                 <p>New newsletter signup on ${esc(siteConfig.name)}:</p>
                 <p style="font-size:18px;font-weight:bold">${esc(email)}</p>
               </div>`,
      });
    } catch (err) {
      console.error("[newsletter] subscribe failed", err);
      return NextResponse.json(
        { ok: false, error: "Couldn't subscribe right now. Please try again." },
        { status: 502 }
      );
    }
  } else {
    console.warn("[newsletter] RESEND_API_KEY not set — subscriber logged only:", email);
  }

  return NextResponse.json({ ok: true });
}
