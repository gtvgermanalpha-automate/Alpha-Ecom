import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Case Studies — Marketplace success stories",
  description:
    "Real marketplace results across Amazon, eBay, Etsy, Shopify and TikTok Shop. Browse Alpha E-Commerce case studies by channel and open any project to see the strategy and outcomes.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="Stores we've grown"
        description="Real marketplace results across Amazon, eBay, Etsy, Shopify and TikTok Shop. Filter by channel and open any project."
        breadcrumbs={[{ label: "Case Studies" }]}
        image="/images/case-home.jpg"
      />
      <PortfolioGrid showFilters heading />
      <Testimonials />
      <CTA title="Want to see your store here?" />
    </>
  );
}
