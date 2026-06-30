import { NextResponse } from "next/server";

import { contactSchema, MAX_FILE_BYTES, ACCEPTED_FILE_TYPES } from "@/lib/validations";
import { siteConfig } from "@/lib/site";
import { esc, resendConfigured, sendEmail } from "@/lib/resend";

export const runtime = "nodejs";

type Enquiry = ReturnType<typeof contactSchema.parse>;

async function sendEnquiryEmail(data: Enquiry, file: File | null) {
  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Company", data.company || "—"],
    ["Interested in", data.interest],
    ["Budget", data.budget],
    ["Heard via", data.source || "—"],
    ["NDA requested", data.nda ? "Yes" : "No"],
  ];

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#111144;max-width:640px;margin:0 auto">
      <h2 style="color:#111144;margin:0 0 4px">New enquiry from ${esc(data.name)}</h2>
      <p style="color:#5b6fa6;margin:0 0 20px">Submitted via the ${esc(siteConfig.name)} contact form.</p>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([k, v]) =>
              `<tr>
                 <td style="padding:8px 12px;background:#f2f5fb;font-weight:bold;width:160px;border:1px solid #e7ecf6">${esc(k)}</td>
                 <td style="padding:8px 12px;border:1px solid #e7ecf6">${esc(v)}</td>
               </tr>`
          )
          .join("")}
      </table>
      <h3 style="color:#111144;margin:24px 0 6px">Message</h3>
      <p style="white-space:pre-wrap;line-height:1.6;margin:0">${esc(data.message)}</p>
    </div>`;

  const attachments = file
    ? [{ filename: file.name, content: Buffer.from(await file.arrayBuffer()).toString("base64") }]
    : undefined;

  await sendEmail({
    subject: `New enquiry from ${data.name} — ${data.interest}`,
    replyTo: data.email,
    html,
    attachments,
  });
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid form data." }, { status: 400 });
  }

  const payload = {
    name: form.get("name"),
    email: form.get("email"),
    phone: form.get("phone"),
    company: form.get("company") ?? "",
    interest: form.get("interest"),
    budget: form.get("budget"),
    source: form.get("source") ?? "",
    message: form.get("message"),
    nda: form.get("nda") === "true",
  };

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  // Validate the optional attachment, if present.
  const fileEntry = form.get("file");
  const file = fileEntry instanceof File && fileEntry.size > 0 ? fileEntry : null;
  if (file) {
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json({ ok: false, error: "File too large." }, { status: 422 });
    }
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json({ ok: false, error: "Unsupported file type." }, { status: 422 });
    }
  }

  if (resendConfigured()) {
    try {
      await sendEnquiryEmail(parsed.data, file);
    } catch (err) {
      console.error("[contact] email delivery failed", err);
      return NextResponse.json(
        { ok: false, error: "We couldn't send your message right now. Please email us directly." },
        { status: 502 }
      );
    }
  } else {
    console.warn("[contact] RESEND_API_KEY not set — enquiry validated but NOT emailed:", {
      name: parsed.data.name,
      email: parsed.data.email,
      interest: parsed.data.interest,
      budget: parsed.data.budget,
      hasFile: Boolean(file),
    });
  }

  return NextResponse.json({ ok: true });
}
