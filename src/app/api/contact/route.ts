import { NextResponse } from "next/server";

import { contactSchema, MAX_FILE_BYTES, ACCEPTED_FILE_TYPES } from "@/lib/validations";

export const runtime = "nodejs";

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
  const file = form.get("file");
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json({ ok: false, error: "File too large." }, { status: 422 });
    }
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json({ ok: false, error: "Unsupported file type." }, { status: 422 });
    }
  }

  // In production, forward this to email / CRM / database here.
  // We log a safe summary so the submission is observable in dev.
  console.info("[contact] new enquiry", {
    name: parsed.data.name,
    email: parsed.data.email,
    interest: parsed.data.interest,
    budget: parsed.data.budget,
    hasFile: file instanceof File && file.size > 0,
  });

  return NextResponse.json({ ok: true });
}
