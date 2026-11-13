import type { Metadata } from "next";

import { seo, pageCopy } from "@/lib/content";
import { shareMeta } from "@/lib/og";
import { PageHero } from "@/components/sections/page-hero";
import { ServicesGrid } from "@/components/sections/services";
import { MarketplaceShowcase } from "@/components/sections/marketplace-showcase";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";
import { Sized } from "@/components/shared/sized";

const title = seo.services.title;
const description = seo.services.description;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  ...shareMeta("/services", title, description),
};

export default function ServicesPage() {
  return (
    <Sized page="services">
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
    </Sized>
  );
}
