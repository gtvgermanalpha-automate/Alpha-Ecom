import type { Metadata } from "next";

import { legal, pageCopy, seo } from "@/lib/content";
import { shareMeta } from "@/lib/og";
import { LegalPage } from "@/components/shared/legal-page";

const title = seo.terms.title;
const description = seo.terms.description;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/terms-and-conditions" },
  ...shareMeta("/terms-and-conditions", title, description),
};

export default function TermsPage() {
  return <LegalPage banner={pageCopy.terms} doc={legal.terms} />;
}
