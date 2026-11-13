import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";

import { marketplaces } from "@/lib/content";
import { shareMeta } from "@/lib/og";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/sections/page-hero";
import { CTA } from "@/components/sections/cta";
import { GrowthChart } from "@/components/shared/growth-chart";
import { Sized } from "@/components/shared/sized";
import {
  ServiceContentSection,
  ServiceFaq,
} from "@/components/sections/service-sections";

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
  const title =
    m.seoTitle?.trim() ||
    m.heroTitle?.trim() ||
    `${m.name} Store Creation & Management`;
  const description = m.seoDescription?.trim() || m.description;
  return {
    title,
    description,
    alternates: { canonical: `/services/${m.slug}` },
    ...shareMeta(`/services/${m.slug}`, title, description),
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

  const intro = (m.intro ?? []).filter((p) => p.trim());
  const sections = (m.sections ?? []).filter((s) => s.title?.trim());
  const faqs = (m.faqs ?? []).filter(
    (f) => f.question?.trim() && f.answer?.trim(),
  );
  // Sections alternate background tone, starting after the (light) overview.
  const toneAt = (i: number) =>
    (i % 2 === 0 ? "luster-strong" : "white") as "luster-strong" | "white";

  return (
    <Sized heading={m.headingSize} text={m.textSize}>
      <PageHero
        eyebrow="Service"
        title={m.heroTitle?.trim() || `${m.name} Store Creation & Management`}
        description={m.blurb}
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: m.name },
        ]}
        image={IMAGES[m.slug] ?? "/images/case-tech.jpg"}
      />

        {/* Overview */}
        <Section tone="white">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal direction="right">
              <span className="eyebrow">Overview</span>
              <h2 className="mt-4 text-3xl font-bold text-navy sm:text-4xl">
                {m.overviewTitle?.trim() ||
                  `Your ${m.name} channel, run end to end`}
              </h2>
              {(intro.length ? intro : [m.description]).map((p) => (
                <p
                  key={p}
                  className="mt-5 text-lg leading-relaxed text-muted-foreground"
                >
                  {p}
                </p>
              ))}
              <div className="mt-8">
                <Button asChild>
                  <Link href="/contact">
                    {m.ctaLabel?.trim() || `Get started on ${m.name}`}{" "}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>

            <Reveal direction="left" delay={1}>
              <div className="flex flex-col items-center gap-5 text-center">
                <Image
                  src={m.logo}
                  alt={`${m.name} logo`}
                  width={240}
                  height={104}
                  className="h-16 w-auto max-w-[11rem] object-contain"
                />
                <GrowthChart className="w-44" />
              </div>
            </Reveal>
          </div>
        </Section>

        {/* Default feature grid: shown until custom sections are added in the CMS */}
        {sections.length === 0 ? (
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
        ) : null}

        {sections.map((section, i) => (
          <ServiceContentSection
            key={section.title}
            section={section}
            tone={toneAt(i)}
          />
        ))}

        {faqs.length ? (
          <ServiceFaq
            title={
              m.faqTitle?.trim() ||
              `${m.name} store management: frequently asked questions`
            }
            faqs={faqs}
            tone={toneAt(Math.max(sections.length, 1))}
          />
        ) : null}

      <CTA
        title={m.ctaTitle?.trim() || `Ready to grow on ${m.name}?`}
        description={
          m.ctaDescription?.trim() ||
          `Tell us about your products and we'll map the fastest path to profitable growth on ${m.name}.`
        }
      />
    </Sized>
  );
}
