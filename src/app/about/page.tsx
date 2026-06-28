import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { AboutSection } from "@/components/sections/about-section";
import { Stats } from "@/components/sections/stats";
import { WhyUs } from "@/components/sections/why-us";
import { Timeline } from "@/components/sections/timeline";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "About Us — Marketplace growth experts",
  description:
    "Since 2013, Alpha E-Commerce has helped 1,200+ brands launch and scale stores on Amazon, eBay, Etsy, OnBuy, TikTok Shop and Shopify. Meet the team behind the growth.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Alpha"
        title="We build & run marketplace stores that grow"
        description="Since 2013 we've helped 1,200+ brands launch and scale on the world's biggest marketplaces."
        breadcrumbs={[{ label: "About" }]}
      />
      <AboutSection />
      <Stats />
      <WhyUs />
      <Timeline />
      <Testimonials />
      <CTA />
    </>
  );
}
