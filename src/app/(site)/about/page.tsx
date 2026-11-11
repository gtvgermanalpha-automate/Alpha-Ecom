import type { Metadata } from "next";

import { seo, pageCopy } from "@/lib/content";
import { PageHero } from "@/components/sections/page-hero";
import { AboutSection } from "@/components/sections/about-section";
import { WhyUs } from "@/components/sections/why-us";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: seo.about.title,
  description: seo.about.description,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={pageCopy.about.eyebrow}
        title={pageCopy.about.title}
        description={pageCopy.about.description}
        breadcrumbs={[{ label: "About" }]}
        image={pageCopy.about.image}
      />
      <AboutSection />
      <WhyUs />
      <Testimonials />
      <CTA
        title={pageCopy.about.ctaTitle || undefined}
        description={pageCopy.about.ctaDescription || undefined}
      />
    </>
  );
}
