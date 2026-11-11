import type { Metadata } from "next";

import { seo, pageCopy } from "@/lib/content";
import { ogFor } from "@/lib/og";
import { PageHero } from "@/components/sections/page-hero";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: seo.caseStudies.title,
  description: seo.caseStudies.description,
  alternates: { canonical: "/portfolio" },
  openGraph: ogFor("/portfolio"),
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow={pageCopy.caseStudies.eyebrow}
        title={pageCopy.caseStudies.title}
        description={pageCopy.caseStudies.description}
        breadcrumbs={[{ label: "Case Studies" }]}
        image={pageCopy.caseStudies.image}
      />
      <PortfolioGrid showFilters heading />
      <Testimonials />
      <CTA
        title={pageCopy.caseStudies.ctaTitle || undefined}
        description={pageCopy.caseStudies.ctaDescription || undefined}
      />
    </>
  );
}
