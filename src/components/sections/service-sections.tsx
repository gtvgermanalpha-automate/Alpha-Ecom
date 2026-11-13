import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import type { ServiceSection } from "@/lib/content";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";

type Tone = "white" | "luster-strong";

function SectionButton({ label, href }: { label?: string; href?: string }) {
  if (!label?.trim()) return null;
  return (
    <Button asChild size="lg">
      <Link href={href?.trim() || "/contact"}>
        {label} <ArrowRight className="size-4" />
      </Link>
    </Button>
  );
}

/** Closing line + optional button shown under a centred section. */
function SectionFooter({ section }: { section: ServiceSection }) {
  if (!section.outro?.trim() && !section.ctaLabel?.trim()) return null;
  return (
    <Reveal className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-6 text-center">
      {section.outro?.trim() ? (
        <p className="text-lg leading-relaxed text-muted-foreground">{section.outro}</p>
      ) : null}
      <SectionButton label={section.ctaLabel} href={section.ctaHref} />
    </Reveal>
  );
}

function CardsSection({ section, tone }: { section: ServiceSection; tone: Tone }) {
  const items = section.items ?? [];
  return (
    <Section tone={tone}>
      <SectionHeading
        eyebrow={section.eyebrow || undefined}
        title={section.title}
        description={section.intro || undefined}
        className="mb-14"
      />
      <div
        className={cn(
          "grid gap-6 sm:grid-cols-2",
          items.length % 3 === 0 || items.length > 4 ? "lg:grid-cols-3" : ""
        )}
      >
        {items.map((item, i) => (
          <Reveal key={item.title} direction="up" delay={i % 3}>
            <div className="h-full rounded-2xl border border-border bg-white p-6 shadow-soft">
              <span className="grid size-10 place-items-center rounded-xl bg-aster-100 text-aster-700">
                <Check className="size-5" strokeWidth={3} />
              </span>
              <h3 className="mt-4 text-lg font-bold leading-snug text-navy">{item.title}</h3>
              {item.text?.trim() ? (
                <p className="mt-2 leading-relaxed text-muted-foreground">{item.text}</p>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>
      <SectionFooter section={section} />
    </Section>
  );
}

function ListSection({ section, tone }: { section: ServiceSection; tone: Tone }) {
  return (
    <Section tone={tone}>
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal direction="right" className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            {section.eyebrow?.trim() ? <span className="eyebrow">{section.eyebrow}</span> : null}
            <h2 className="mt-4 text-3xl font-bold text-navy sm:text-4xl">{section.title}</h2>
            {section.intro?.trim() ? (
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{section.intro}</p>
            ) : null}
            {section.outro?.trim() ? (
              <p className="mt-4 leading-relaxed text-muted-foreground">{section.outro}</p>
            ) : null}
            {section.ctaLabel?.trim() ? (
              <div className="mt-8">
                <SectionButton label={section.ctaLabel} href={section.ctaHref} />
              </div>
            ) : null}
          </div>
        </Reveal>
        <ul className="space-y-4 lg:col-span-7">
          {(section.items ?? []).map((item, i) => (
            <Reveal key={item.title} as="li" direction="up" delay={i % 3}>
              <div className="flex items-start gap-4 rounded-2xl border border-border bg-white p-6 shadow-soft">
                <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl bg-aster-100 text-aster-700">
                  <Check className="size-5" strokeWidth={3} />
                </span>
                <div>
                  <h3 className="text-lg font-bold leading-snug text-navy">{item.title}</h3>
                  {item.text?.trim() ? (
                    <p className="mt-1.5 leading-relaxed text-muted-foreground">{item.text}</p>
                  ) : null}
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function StepsSection({ section, tone }: { section: ServiceSection; tone: Tone }) {
  const items = section.items ?? [];
  return (
    <Section tone={tone}>
      <SectionHeading
        eyebrow={section.eyebrow || undefined}
        title={section.title}
        description={section.intro || undefined}
        className="mb-14"
      />
      <ol
        className={cn(
          "grid gap-6 sm:grid-cols-2",
          items.length === 3 ? "lg:grid-cols-3" : items.length >= 4 ? "lg:grid-cols-4" : ""
        )}
      >
        {items.map((item, i) => (
          <Reveal key={item.title} as="li" direction="up" delay={i % 4}>
            <div className="h-full rounded-2xl border border-border bg-white p-6 shadow-soft">
              <span className="grid size-11 place-items-center rounded-full bg-navy font-display text-lg font-extrabold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-bold leading-snug text-navy">{item.title}</h3>
              {item.text?.trim() ? (
                <p className="mt-2 leading-relaxed text-muted-foreground">{item.text}</p>
              ) : null}
            </div>
          </Reveal>
        ))}
      </ol>
      <SectionFooter section={section} />
    </Section>
  );
}

/** One CMS-defined content section of a service page, in the layout the editor picked. */
export function ServiceContentSection({ section, tone }: { section: ServiceSection; tone: Tone }) {
  const style = (section.style || "Cards").toLowerCase();
  if (style === "list") return <ListSection section={section} tone={tone} />;
  if (style === "steps") return <StepsSection section={section} tone={tone} />;
  return <CardsSection section={section} tone={tone} />;
}

/** FAQ accordion for a service page, with FAQPage structured data for search engines. */
export function ServiceFaq({
  title,
  faqs,
  tone,
}: {
  title: string;
  faqs: { question: string; answer: string }[];
  tone: Tone;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  return (
    <Section tone={tone} id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <SectionHeading eyebrow="FAQ" title={title} className="mb-12" />
      <Reveal className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="rounded-2xl border border-border bg-white px-6">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </Section>
  );
}
