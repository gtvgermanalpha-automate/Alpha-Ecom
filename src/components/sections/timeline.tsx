import { milestones } from "@/lib/content";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

export function Timeline() {
  return (
    <Section tone="luster">
      <SectionHeading
        eyebrow="Our journey"
        title="A decade of marketplace growth"
        description="The milestones that shaped Alpha."
        className="mb-16"
      />

      <div className="relative mx-auto max-w-3xl">
        {/* Vertical line */}
        <div
          className="absolute bottom-0 left-4 top-2 w-px bg-border sm:left-1/2 sm:-translate-x-1/2"
          aria-hidden
        />

        <ol className="space-y-10">
          {milestones.map((m, i) => (
            <Reveal key={m.year} delay={i} as="li">
              <div
                className={`relative flex items-start gap-6 sm:gap-0 ${
                  i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <span
                  className="absolute left-4 top-1.5 z-10 size-3 -translate-x-1/2 rounded-full bg-aster ring-4 ring-aster-50 sm:left-1/2"
                  aria-hidden
                />

                {/* Content */}
                <div
                  className={`w-full pl-12 sm:w-1/2 sm:pl-0 ${
                    i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12"
                  }`}
                >
                  <span className="inline-block font-display text-2xl font-extrabold text-navy">
                    {m.year}
                  </span>
                  <h3 className="mt-1 text-lg font-bold text-navy">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {m.description}
                  </p>
                </div>
                <div className="hidden sm:block sm:w-1/2" aria-hidden />
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
