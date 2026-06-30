import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { insights } from "@/lib/content";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { BlogCard } from "@/components/shared/blog-card";
import { Button } from "@/components/ui/button";

export function Insights() {
  return (
    <Section tone="luster">
      <SectionHeading
        eyebrow="Insights"
        title="Marketplace playbooks & guides"
        description="Practical tips from the team that runs stores every day."
        className="mb-14"
      />

      <RevealGroup className="grid gap-6 md:grid-cols-3" stagger={0.08}>
        {insights.map((post) => (
          <RevealItem key={post.slug}>
            <BlogCard post={post} />
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-12 flex justify-center">
        <Button asChild variant="outline">
          <Link href="/blog">
            View all articles <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
