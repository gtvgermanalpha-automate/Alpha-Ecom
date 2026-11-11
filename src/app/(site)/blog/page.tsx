import type { Metadata } from "next";

import { insights, seo, pageCopy } from "@/lib/content";
import { Section } from "@/components/shared/section";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { BlogCard } from "@/components/shared/blog-card";
import { PageHero } from "@/components/sections/page-hero";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: seo.blog.title,
  description: seo.blog.description,
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <>
      <PageHero
        eyebrow={pageCopy.blog.eyebrow}
        title={pageCopy.blog.title}
        description={pageCopy.blog.description}
        breadcrumbs={[{ label: "Blog" }]}
        image={pageCopy.blog.image}
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
        title={pageCopy.blog.ctaTitle || undefined}
        description={pageCopy.blog.ctaDescription || undefined}
      />
    </>
  );
}
