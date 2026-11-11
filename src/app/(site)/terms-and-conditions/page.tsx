import type { Metadata } from "next";

import { legal, pageCopy, seo } from "@/lib/content";
import { ogFor } from "@/lib/og";
import { LegalPage } from "@/components/shared/legal-page";

export const metadata: Metadata = {
  title: seo.terms.title,
  description: seo.terms.description,
  alternates: { canonical: "/terms-and-conditions" },
  openGraph: ogFor("/terms-and-conditions"),
};

export default function TermsPage() {
  return <LegalPage banner={pageCopy.terms} doc={legal.terms} />;
}
