import type { Metadata } from "next";

import { seo } from "@/lib/content";
import { Hero } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about-section";
import { ServicesGrid } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";
import { PlatformTabs } from "@/components/sections/platform-tabs";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { Testimonials } from "@/components/sections/testimonials";
import { PartnerMarquee } from "@/components/sections/partner-marquee";
import { Insights } from "@/components/sections/insights";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";
import { Sized } from "@/components/shared/sized";

export const metadata: Metadata = {
  description: seo.home.description,
};

export default function HomePage() {
  return (
    <Sized page="home">
      <Hero />
      <PartnerMarquee />
      <AboutSection />
      <ServicesGrid />
      <WhyUs />
      <PlatformTabs />
      <PortfolioGrid limit={6} showFilters={false} heading />
      <Testimonials />
      <Insights />
      <FAQ />
      <CTA />
    </Sized>
  );
}
