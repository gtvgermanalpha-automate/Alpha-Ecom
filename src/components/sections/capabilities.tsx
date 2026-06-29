import { Check } from "lucide-react";

import { capabilities } from "@/lib/content";
import { Icon } from "@/lib/icons";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";

export function Capabilities() {
  return (
    <Section tone="white">
      <SectionHeading
        eyebrow="What we do"
        title="Everything it takes to run a marketplace store"
        description="Pick one piece or hand us the whole operation — here's the full scope of what we manage for you."
        className="mb-14"
      />

      <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
        {capabilities.map((c) => (
          <RevealItem key={c.key}>
            <article
              id={c.key}
              className="group h-full scroll-mt-28 rounded-2xl border border-border bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-aster hover:shadow-card"
            >
              <span className="grid size-14 place-items-center rounded-2xl bg-aster-100 text-aster-700 transition-colors group-hover:bg-aster group-hover:text-navy">
                <Icon name={c.icon} className="size-7" />
              </span>
              <h3 className="mt-6 text-xl font-bold text-navy">{c.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
              <ul className="mt-5 space-y-2.5">
                {c.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-navy/80">
                    <Check className="mt-0.5 size-4 shrink-0 text-aster-700" strokeWidth={3} />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
