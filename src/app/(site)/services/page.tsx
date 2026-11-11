import type { Metadata } from "next";

import { seo, pageCopy } from "@/lib/content";
import { ogFor } from "@/lib/og";
import { PageHero } from "@/components/sections/page-hero";
import { ServicesGrid } from "@/components/sections/services";
import { MarketplaceShowcase } from "@/components/sections/marketplace-showcase";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: seo.services.title,
  description: seo.services.description,
  alternates: { canonical: "/services" },
  openGraph: ogFor("/services"),
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow={pageCopy.services.eyebrow}
        title={pageCopy.services.title}
        description={pageCopy.services.description}
        breadcrumbs={[{ label: "Services" }]}
        image={pageCopy.services.image}
      />
      <ServicesGrid heading tone="white" />
      <MarketplaceShowcase />
      <FAQ />
      <CTA
        title={pageCopy.services.ctaTitle || undefined}
        description={pageCopy.services.ctaDescription || undefined}
      />
    </>
  );
}
