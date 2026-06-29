import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { marketplaces, type Marketplace } from "@/lib/content";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { MarketplaceTile } from "@/components/shared/marketplace-tile";

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
    <Link
      href={`/services#${marketplace.slug}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white p-7",
        "transition-all duration-300 hover:-translate-y-2 hover:border-aster hover:shadow-card"
      )}
    >
      {/* hover accent wash */}
      <span className="pointer-events-none absolute inset-x-0 -top-px h-1 origin-left scale-x-0 bg-aster transition-transform duration-300 group-hover:scale-x-100" />

      <div className="flex items-start justify-between gap-4">
        <MarketplaceTile src={marketplace.logo} name={marketplace.name} size="md" />
        <div className="text-right">
          <p className="font-display text-2xl font-extrabold text-navy">{marketplace.stat.value}</p>
          <p className="text-xs font-medium text-muted-foreground">{marketplace.stat.label}</p>
        </div>
      </div>

      <h3 className="mt-6 text-xl font-bold text-navy">{marketplace.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{marketplace.blurb}</p>

      <ul className="mt-5 space-y-2">
        {marketplace.features.slice(0, 3).map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-navy/80">
            <Check className="mt-0.5 size-4 shrink-0 text-aster-700" strokeWidth={3} />
            {f}
          </li>
        ))}
      </ul>

      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors group-hover:text-aster-700">
        Manage my {marketplace.name} store
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
