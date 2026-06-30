import type { Metadata } from "next";

import { insights } from "@/lib/content";
import { Section } from "@/components/shared/section";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { BlogCard } from "@/components/shared/blog-card";
import { PageHero } from "@/components/sections/page-hero";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Blog — Marketplace insights & guides",
  description:
    "Practical marketplace playbooks and guides from the Alpha E-Commerce team — Amazon, eBay, Etsy, OnBuy, TikTok Shop and Shopify.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Marketplace insights & guides"
        description="Practical playbooks from the team that builds and runs marketplace stores every day."
        breadcrumbs={[{ label: "Blog" }]}
        image="/images/insight-amazon.jpg"
      />

      <Section tone="white">
        <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {insights.map((post) => (
            <RevealItem key={post.slug}>
              <BlogCard post={post} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CTA
        title="Want this handled for you?"
        description="Tell us your products and goals and we'll map the fastest path to growth across your marketplaces."
      />
    </>
  );
}
