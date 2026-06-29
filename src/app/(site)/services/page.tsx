import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { ServicesGrid } from "@/components/sections/services";
import { MarketplaceShowcase } from "@/components/sections/marketplace-showcase";
import { Process } from "@/components/sections/process";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Services — Marketplace store creation & management",
  description:
    "One partner to build, optimize and run your stores across Amazon, eBay, Etsy, OnBuy, TikTok Shop and Shopify — from setup and listings to advertising, orders and account health.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Marketplace store creation & management"
        description="One partner to build, optimize and run your stores across Amazon, eBay, Etsy, OnBuy, TikTok Shop and Shopify."
        breadcrumbs={[{ label: "Services" }]}
        image="/images/case-tech.jpg"
      />
      <ServicesGrid heading tone="white" />
      <MarketplaceShowcase />
      <Process />
      <FAQ />
      <CTA title="Ready to launch on a new marketplace?" />
    </>
  );
}
