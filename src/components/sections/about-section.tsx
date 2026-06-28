import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, TrendingUp } from "lucide-react";

import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";

const checklist = [
  "One team for every marketplace",
  "Senior, certified specialists",
  "Transparent weekly reporting",
];

export function AboutSection() {
  return (
    <Section tone="luster">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Left: copy */}
        <Reveal direction="right">
          <span className="eyebrow">About Alpha</span>
          <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">
            Your full-service marketplace partner since 2013
          </h2>

          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Alpha E-Commerce is a senior, hands-on team that builds and fully
            manages stores across all six major marketplaces — Amazon, eBay,
            Etsy, OnBuy, TikTok Shop and Shopify. We don&apos;t just launch and
            leave; we run your channels end to end so you can focus on the
            product, not the platform.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            With 1,200+ stores launched and nine-figure annual sales under
            management, every client gets a dedicated account manager and
            transparent weekly reporting — so you always know exactly where your
            business stands.
          </p>

          <ul className="mt-7 space-y-3">
            {checklist.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-habanero-50">
                  <Check className="size-4 text-habanero" strokeWidth={3} />
                </span>
                <span className="font-medium text-navy">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button asChild>
              <Link href="/about">
                More about Alpha <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Reveal>

        {/* Right: framed visual + floating stat */}
        <Reveal direction="left" delay={1}>
          <div className="relative">
            {/* Blurred glow behind the frame */}
            <div
              className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-habanero/15 to-aster/25 blur-2xl"
              aria-hidden
            />

            {/* Framed visual */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border shadow-card">
              <Image
                src="/about.svg"
                alt="Alpha E-Commerce specialists managing marketplace stores"
                fill
                sizes="(min-width: 1024px) 40rem, 100vw"
                className="object-cover"
              />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-5 left-5 rounded-2xl bg-white p-4 shadow-card ring-1 ring-border">
              <div className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-habanero-50">
                  <TrendingUp className="size-5 text-habanero" />
                </span>
                <div>
                  <p className="font-display text-xl font-extrabold leading-none text-navy">
                    $9M+ / mo
                  </p>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">
                    sales managed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
