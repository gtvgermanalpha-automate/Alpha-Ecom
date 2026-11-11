import type { Metadata } from "next";

import { legal, pageCopy, seo } from "@/lib/content";
import { ogFor } from "@/lib/og";
import { LegalPage } from "@/components/shared/legal-page";

export const metadata: Metadata = {
  title: seo.privacy.title,
  description: seo.privacy.description,
  alternates: { canonical: "/privacy-policy" },
  openGraph: ogFor("/privacy-policy"),
};

export default function PrivacyPolicyPage() {
  return <LegalPage banner={pageCopy.privacy} doc={legal.privacy} />;
}
