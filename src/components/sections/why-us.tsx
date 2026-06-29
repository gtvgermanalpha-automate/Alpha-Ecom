import Link from "next/link";

import { whyUs } from "@/lib/content";
import { Icon } from "@/lib/icons";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";

export function WhyUs() {
  return (
    <Section tone="luster">
      <SectionHeading
        eyebrow="Why Alpha"
        title="Everything your store needs, handled by one team"
        description="From setup to scale, every part of your marketplace channel is covered by specialists who treat your store like their own."
        className="mb-14"
      />

      <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
        {whyUs.map((f) => (
          <RevealItem key={f.title}>
            <article className="group flex h-full flex-col rounded-2xl border border-border bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-aster hover:shadow-card">
              <span className="grid size-14 place-items-center rounded-xl bg-aster-100 text-aster-700 transition-transform duration-300 group-hover:-translate-y-0.5">
                <Icon name={f.icon} className="size-7" />
              </span>
              <h3 className="mt-6 text-lg font-bold text-navy">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
            </article>
          </RevealItem>
        ))}

        {/* 6th cell — habanero CTA card to fill the 3-col grid cleanly */}
        <RevealItem>
          <div className="flex h-full flex-col justify-between rounded-2xl bg-navy p-7 text-white shadow-soft">
            <div>
              <span className="grid size-14 place-items-center rounded-xl bg-white/15 text-white">
                <Icon name="rocket" className="size-7" />
              </span>
              <p className="mt-6 text-lg font-bold leading-snug">Ready to scale your store?</p>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
                Tell us your goals and we&apos;ll map the fastest route to profitable growth.
              </p>
            </div>
            <Button variant="navy" asChild className="mt-7 self-start">
              <Link href="/contact">
                Talk to us
                <Icon name="arrow-right" className="size-4" />
              </Link>
            </Button>
          </div>
        </RevealItem>
      </RevealGroup>
    </Section>
  );
}
