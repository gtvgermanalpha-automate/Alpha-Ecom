import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";

import { marketplaces } from "@/lib/content";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/sections/page-hero";
import { Process } from "@/components/sections/process";
import { CTA } from "@/components/sections/cta";

// Per-service header photo.
const IMAGES: Record<string, string> = {
  amazon: "/images/case-home.jpg",
  ebay: "/images/case-vintage.jpg",
  etsy: "/images/case-handmade.jpg",
  onbuy: "/images/case-warehouse.jpg",
  "tiktok-shop": "/images/case-beauty.jpg",
  shopify: "/images/case-tech.jpg",
};

export function generateStaticParams() {
  return marketplaces.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = marketplaces.find((x) => x.slug === slug);
  if (!m) return {};
  return {
    title: `${m.name} Store Creation & Management`,
    description: m.description,
    alternates: { canonical: `/services/${m.slug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const m = marketplaces.find((x) => x.slug === slug);
  if (!m) notFound();

  return (
    <>
      <PageHero
        eyebrow="Service"
        title={`${m.name} Store Creation & Management`}
        description={m.blurb}
        breadcrumbs={[{ label: "Services", href: "/services" }, { label: m.name }]}
        image={IMAGES[m.slug] ?? "/images/case-tech.jpg"}
      />

      {/* Overview */}
      <Section tone="white">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal direction="right">
            <span className="eyebrow">Overview</span>
            <h2 className="mt-4 text-3xl font-bold text-navy sm:text-4xl">
              Your {m.name} channel, run end to end
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{m.description}</p>
            <div className="mt-8">
              <Button asChild>
                <Link href="/contact">
                  Get started on {m.name} <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Reveal>

          <Reveal direction="left" delay={1}>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-white p-10 shadow-card">
              <div className="pointer-events-none absolute inset-0 bg-dots opacity-60" aria-hidden />
              <div className="relative flex flex-col items-center gap-6 text-center">
                <Image
                  src={m.logo}
                  alt={`${m.name} logo`}
                  width={240}
                  height={104}
                  className="h-20 w-auto max-w-[12rem] object-contain"
                />
                <div>
                  <p className="font-display text-4xl font-extrabold text-navy">{m.stat.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{m.stat.label}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Detailed points */}
      <Section tone="luster-strong">
        <SectionHeading
          eyebrow="What we handle"
          title={`Everything your ${m.name} store needs`}
          description={`The full scope of what we manage for you on ${m.name}.`}
          className="mb-14"
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {m.features.map((f, i) => (
            <Reveal key={f} direction="up" delay={i}>
              <div className="flex h-full items-start gap-4 rounded-2xl border border-border bg-white p-6 shadow-soft">
                <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl bg-aster-100 text-aster-700">
                  <Check className="size-5" strokeWidth={3} />
                </span>
                <p className="font-semibold leading-snug text-navy">{f}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Process />

      <CTA
        title={`Ready to grow on ${m.name}?`}
        description={`Tell us about your products and we'll map the fastest path to profitable growth on ${m.name}.`}
      />
    </>
  );
}
