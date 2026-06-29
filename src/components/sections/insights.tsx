import Image from "next/image";
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
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
                <Badge variant="secondary" className="absolute left-4 top-4">
                  {post.category}
                </Badge>
              </div>

              <div className="p-6">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="size-3.5" />
                  {post.readingTime}
                </span>

                <h3 className="mt-2 text-lg font-bold text-navy transition-colors group-hover:text-aster-700">
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
