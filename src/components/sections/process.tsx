import { processSteps } from "@/lib/content";
import { Icon } from "@/lib/icons";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";

export function Process() {
  return (
    <Section tone="white">
      <SectionHeading
        eyebrow="How it works"
        title="From idea to income in four simple steps"
        description="A clear, transparent path from first call to a store that sells."
        className="mb-16"
      />

      <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Connector line (desktop) */}
        <div
          className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block"
          aria-hidden
        />

        <RevealGroup className="contents" stagger={0.12}>
          {processSteps.map((step) => (
            <RevealItem key={step.number} className="flex flex-col items-center text-center">
              <span className="relative z-10 grid size-16 place-items-center rounded-2xl border border-border bg-white text-habanero shadow-soft">
                <Icon name={step.icon} className="size-7" />
                <span className="absolute -right-2 -top-2 grid size-7 place-items-center rounded-full bg-navy text-xs font-bold text-white">
                  {step.number}
                </span>
              </span>
              <h3 className="mt-5 text-lg font-bold text-navy">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
