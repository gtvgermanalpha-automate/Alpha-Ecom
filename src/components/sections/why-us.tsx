import Link from "next/link";

import { whyUs } from "@/lib/content";
import { Icon } from "@/lib/icons";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { RevealCard } from "@/components/shared/reveal-card";
import { Button } from "@/components/ui/button";

// Background photo per why-us card.
const WHY_IMAGES = [
  "/images/about-team.jpg",
  "/images/case-tech.jpg",
  "/images/insight-amazon.jpg",
  "/images/case-beauty.jpg",
  "/images/case-vintage.jpg",
];

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
        {whyUs.map((f, i) => (
          <RevealItem key={f.title}>
            <RevealCard
              minHeight="min-h-[16rem]"
              image={WHY_IMAGES[i % WHY_IMAGES.length]}
              title={f.title}
              description={f.description}
              media={
                <span className="grid size-14 place-items-center rounded-xl bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm">
                  <Icon name={f.icon} className="size-7" />
                </span>
              }
            />
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
