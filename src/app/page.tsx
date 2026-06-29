import type { Metadata } from "next";

import { Hero } from "@/components/sections/hero";
import { Awards } from "@/components/sections/awards";
import { AboutSection } from "@/components/sections/about-section";
import { ServicesGrid } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";
import { PlatformTabs } from "@/components/sections/platform-tabs";
import { Process } from "@/components/sections/process";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { Testimonials } from "@/components/sections/testimonials";
import { Timeline } from "@/components/sections/timeline";
import { PartnerMarquee } from "@/components/sections/partner-marquee";
import { Insights } from "@/components/sections/insights";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
  description:
    "Alpha E-Commerce creates and manages your online stores on Amazon, eBay, Etsy, OnBuy, TikTok Shop and Shopify — setup, listings, ads, orders and account health, all handled by one expert team.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Awards />
      <AboutSection />
      <ServicesGrid />
      <WhyUs />
      <PlatformTabs />
      <Process />
      <PortfolioGrid limit={6} showFilters={false} heading tone="luster" />
      <Testimonials />
      <Timeline />
      <PartnerMarquee />
      <Insights />
      <FAQ />
      <CTA />
    </>
  );
}
