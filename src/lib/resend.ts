import { siteConfig } from "@/lib/site";

/**
 * Tiny server-only Resend client (REST API via fetch — no SDK dependency).
 * Shared by the contact and newsletter API routes.
 *   RESEND_API_KEY      required to actually send
 *   CONTACT_TO_EMAIL    recipient (defaults to the site email)
 *   CONTACT_FROM_EMAIL  verified sender (defaults to Resend's shared onboarding sender)
 *   RESEND_AUDIENCE_ID  optional — newsletter subscribers are added to this audience
 */
const RESEND_API_KEY = process.env.RESEND_API_KEY?.trim();
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL?.trim() || "Alpha E-Commerce <onboarding@resend.dev>";
const TO_EMAIL = process.env.CONTACT_TO_EMAIL?.trim() || siteConfig.email;
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID?.trim();

export const resendConfigured = () => Boolean(RESEND_API_KEY);
export const ownerEmail = () => TO_EMAIL;

/** Minimal HTML escaper for user-supplied values placed into emails. */
export const esc = (v: unknown) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

type Attachment = { filename: string; content: string };

/** Send an email via Resend. Throws if not configured or on a non-2xx response. */
export async function sendEmail(opts: {
  subject: string;
  html: string;
  to?: string | string[];
  replyTo?: string;
  attachments?: Attachment[];
}) {
  if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

  const body: Record<string, unknown> = {
    from: FROM_EMAIL,
    to: Array.isArray(opts.to) ? opts.to : [opts.to ?? TO_EMAIL],
    subject: opts.subject,
    html: opts.html,
  };
  if (opts.replyTo) body.reply_to = opts.replyTo;
  if (opts.attachments?.length) body.attachments = opts.attachments;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend ${res.status}: ${detail.slice(0, 300)}`);
  }
}

/** Add a subscriber to a Resend audience if RESEND_AUDIENCE_ID is set. Best-effort. */
export async function addContactToAudience(email: string): Promise<boolean> {
  if (!RESEND_API_KEY || !AUDIENCE_ID) return false;
  try {
    const res = await fetch(`https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ email, unsubscribed: false }),
      cache: "no-store",
    });
    return res.ok;
  } catch {
    return false;
  }
}
