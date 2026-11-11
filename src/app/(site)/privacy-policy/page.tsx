import type { Metadata } from "next";

import { legal, pageCopy, seo } from "@/lib/content";
import { shareMeta } from "@/lib/og";
import { LegalPage } from "@/components/shared/legal-page";

const title = seo.privacy.title;
const description = seo.privacy.description;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy-policy" },
  ...shareMeta("/privacy-policy", title, description),
};

export default function PrivacyPolicyPage() {
  return <LegalPage banner={pageCopy.privacy} doc={legal.privacy} />;
}
