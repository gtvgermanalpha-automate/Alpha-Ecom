import type { Metadata } from "next";
import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock } from "lucide-react";

import { insights } from "@/lib/content";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { BlogCard } from "@/components/shared/blog-card";
import { PageHero } from "@/components/sections/page-hero";
import { CTA } from "@/components/sections/cta";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return insights.filter((p) => p.slug).map((p) => ({ slug: p.slug as string }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = insights.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — Alpha E-Commerce Blog`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

/** Render the article body: "## …" = heading, consecutive "- …" = bullet list, else paragraph. */
function ArticleBody({ blocks }: { blocks: string[] }) {
  const out: React.ReactNode[] = [];
  for (let i = 0; i < blocks.length; ) {
    const block = blocks[i];
    if (block.startsWith("## ")) {
      out.push(
        <h2 key={i} className="mt-12 text-2xl font-bold text-navy">
          {block.slice(3)}
        </h2>
      );
      i++;
    } else if (block.startsWith("- ")) {
      const items: string[] = [];
      while (i < blocks.length && blocks[i].startsWith("- ")) {
        items.push(blocks[i].slice(2));
        i++;
      }
      out.push(
        <ul key={i} className="mt-5 space-y-3">
          {items.map((it, j) => (
            <li key={j} className="flex items-start gap-3 text-navy/80">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-aster-100 text-aster-700">
                <Check className="size-3.5" strokeWidth={3} />
              </span>
              {it}
            </li>
          ))}
        </ul>
      );
    } else {
      out.push(
        <p key={i} className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {block}
        </p>
      );
      i++;
    }
  }
  return <>{out}</>;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = insights.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = insights.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        breadcrumbs={[{ label: "Blog", href: "/blog" }, { label: post.title }]}
        image={post.image}
      />

      <article className="bg-aster-50 py-16 lg:py-24">
        <Container className="max-w-3xl">
          {/* byline */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-border pb-6 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" /> {post.readingTime}
            </span>
            {post.date ? (
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-4" /> {post.date}
              </span>
            ) : null}
            <span className="inline-flex items-center gap-2">
              <span className="grid size-6 place-items-center rounded-full bg-navy text-[0.6rem] font-bold text-white">
                A
              </span>
              By the Alpha E-Commerce team
            </span>
          </div>

          {/* body */}
          {post.body && post.body.length ? (
            <ArticleBody blocks={post.body} />
          ) : (
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
          )}

          {/* footer actions */}
          <div className="mt-12 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Button asChild variant="outline">
              <Link href="/blog">
                <ArrowLeft className="size-4" /> All articles
              </Link>
            </Button>
            <Button asChild>
              <Link href="/contact">
                Get a free quote <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </article>

      {/* related */}
      {related.length ? (
        <Section tone="luster-strong">
          <SectionHeading eyebrow="Keep reading" title="More marketplace guides" className="mb-12" />
          <RevealGroup className="grid gap-6 md:grid-cols-3" stagger={0.08}>
            {related.map((post) => (
              <RevealItem key={post.slug}>
                <BlogCard post={post} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      ) : null}

      <CTA />
    </>
  );
}
