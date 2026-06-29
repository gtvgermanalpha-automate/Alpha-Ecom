import Image from "next/image";

import { marketplaces, type Marketplace } from "@/lib/content";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { RevealCard } from "@/components/shared/reveal-card";

// Background photo per marketplace card (the case study run on that channel).
const CARD_IMAGES: Record<string, string> = {
  amazon: "/images/case-home.jpg",
  ebay: "/images/case-vintage.jpg",
  etsy: "/images/case-handmade.jpg",
  onbuy: "/images/case-warehouse.jpg",
  "tiktok-shop": "/images/case-beauty.jpg",
  shopify: "/images/case-tech.jpg",
};

export function ServicesGrid({
  heading = true,
  tone = "white",
}: {
  heading?: boolean;
  tone?: "white" | "luster";
}) {
  return (
    <Section id="services" tone={tone}>
      {heading ? (
        <SectionHeading
          eyebrow="What we offer"
          title="Six marketplaces. One expert team."
          description="We create, optimize and fully manage your stores across the channels your customers already shop on — so you can focus on the product, not the platform."
          className="mb-14"
        />
      ) : null}

      <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
        {marketplaces.map((m) => (
          <RevealItem key={m.slug}>
            <ServiceCard marketplace={m} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

function ServiceCard({ marketplace }: { marketplace: Marketplace }) {
  return (
    <RevealCard
      href={`/services#${marketplace.slug}`}
      minHeight="min-h-[24rem]"
      image={CARD_IMAGES[marketplace.slug] ?? "/images/case-home.jpg"}
      title={marketplace.name}
      summary={marketplace.blurb}
      description={marketplace.description}
      media={
        <Image
          src={marketplace.logo}
          alt={`${marketplace.name} logo`}
          width={180}
          height={88}
          className="h-14 w-auto max-w-[10rem] object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
        />
      }
      badge={
        <div className="text-right">
          <p className="font-display text-2xl font-extrabold text-white">{marketplace.stat.value}</p>
          <p className="text-xs font-medium text-white/70">{marketplace.stat.label}</p>
        </div>
      }
      points={marketplace.features.slice(0, 3)}
      cta={`Manage my ${marketplace.name} store`}
    />
  );
}
