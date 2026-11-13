import type { Metadata } from "next";

import { seo, pageCopy } from "@/lib/content";
import { shareMeta } from "@/lib/og";
import { PageHero } from "@/components/sections/page-hero";
import { AboutSection } from "@/components/sections/about-section";
import { WhyUs } from "@/components/sections/why-us";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";
import { Sized } from "@/components/shared/sized";

const title = seo.about.title;
const description = seo.about.description;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  ...shareMeta("/about", title, description),
};

export default function AboutPage() {
  return (
    <Sized page="about">
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
    </Sized>
  );
}
