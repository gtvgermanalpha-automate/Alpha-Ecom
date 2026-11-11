import type { Metadata } from "next";

import { seo, pageCopy } from "@/lib/content";
import { shareMeta } from "@/lib/og";
import { PageHero } from "@/components/sections/page-hero";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";

const title = seo.caseStudies.title;
const description = seo.caseStudies.description;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/portfolio" },
  ...shareMeta("/portfolio", title, description),
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
