import type { Metadata } from "next";

import { seo, pageCopy } from "@/lib/content";
import { PageHero } from "@/components/sections/page-hero";
import { Capabilities } from "@/components/sections/capabilities";
import { PlatformTabs } from "@/components/sections/platform-tabs";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: seo.whatWeDo.title,
  description: seo.whatWeDo.description,
  alternates: { canonical: "/what-we-do" },
};

export default function WhatWeDoPage() {
  return (
    <>
      <PageHero
        eyebrow={pageCopy.whatWeDo.eyebrow}
        title={pageCopy.whatWeDo.title}
        description={pageCopy.whatWeDo.description}
        breadcrumbs={[{ label: "What We Do" }]}
        variant="capabilities"
        image={pageCopy.whatWeDo.image}
      />
      <Capabilities />
      <PlatformTabs />
      <FAQ />
      <CTA
        title={pageCopy.whatWeDo.ctaTitle || undefined}
        description={pageCopy.whatWeDo.ctaDescription || undefined}
      />
    </>
  );
}
