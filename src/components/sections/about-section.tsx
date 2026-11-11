import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, TrendingUp } from "lucide-react";

import { aboutContent } from "@/lib/content";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";

export function AboutSection() {
  return (
    <Section tone="luster">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Left: copy */}
        <Reveal direction="right">
          <span className="eyebrow">{aboutContent.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">{aboutContent.title}</h2>

          {aboutContent.paragraphs.map((paragraph, i) => (
            <p
              key={paragraph}
              className={`${i === 0 ? "mt-5" : "mt-4"} text-base leading-relaxed text-muted-foreground`}
            >
              {paragraph}
            </p>
          ))}

          <ul className="mt-7 space-y-3">
            {aboutContent.checklist.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-aster-100">
                  <Check className="size-4 text-aster-700" strokeWidth={3} />
                </span>
                <span className="font-medium text-navy">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button asChild>
              <Link href={aboutContent.cta.href}>
                {aboutContent.cta.label} <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Reveal>

        {/* Right: framed visual + floating stat */}
        <Reveal direction="left" delay={1}>
          <div className="relative">
            {/* Blurred glow behind the frame */}
            <div
              className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-aster/15 to-aster/25 blur-2xl"
              aria-hidden
            />

            {/* Framed visual */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border shadow-card">
              <Image
                src={aboutContent.image}
                alt={aboutContent.imageAlt}
                fill
                sizes="(min-width: 1024px) 40rem, 100vw"
                className="object-cover"
              />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-5 left-5 rounded-2xl bg-white p-4 shadow-card ring-1 ring-border">
              <div className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-aster-100">
                  <TrendingUp className="size-5 text-aster-700" />
                </span>
                <div>
                  <p className="font-display text-xl font-extrabold leading-none text-navy">
                    {aboutContent.statValue}
                  </p>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">
                    {aboutContent.statLabel}
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
