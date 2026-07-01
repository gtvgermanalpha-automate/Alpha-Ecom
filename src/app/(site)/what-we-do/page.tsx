import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { Capabilities } from "@/components/sections/capabilities";
import { PlatformTabs } from "@/components/sections/platform-tabs";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "What We Do — End-to-end marketplace management",
  description:
    "Store creation, listing & SEO, advertising, orders & inventory, account health and branding & design — everything Alpha E-Commerce manages so you can focus on your products.",
  alternates: { canonical: "/what-we-do" },
};

export default function WhatWeDoPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Everything your store needs, handled end-to-end"
        description="From first listing to account health, we run the day-to-day of your marketplace channels so you can focus on the product and the brand."
        breadcrumbs={[{ label: "What We Do" }]}
        variant="capabilities"
        image="/images/case-warehouse.jpg"
      />
      <Capabilities />
      <PlatformTabs />
      <FAQ />
      <CTA title="Not sure where to start?" description="Tell us your goals and we'll map the exact services your store needs to grow." />
    </>
  );
}
