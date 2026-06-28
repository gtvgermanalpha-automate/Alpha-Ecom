import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

import { insights } from "@/lib/content";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";

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
          <RevealItem key={post.title}>
            <article className="group h-full overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-aster hover:shadow-card">
              <div className="h-1.5 bg-habanero" />

              <div className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="size-3.5" />
                    {post.readingTime}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-bold text-navy transition-colors group-hover:text-habanero">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>

                <Link
                  href="#"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy"
                >
                  Read more
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
