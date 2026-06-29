import { capabilities } from "@/lib/content";
import { Icon } from "@/lib/icons";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { RevealCard } from "@/components/shared/reveal-card";

// Background photo per capability card.
const CAP_IMAGES: Record<string, string> = {
  setup: "/images/case-home.jpg",
  listing: "/images/insight-amazon.jpg",
  ads: "/images/insight-tiktok.jpg",
  operations: "/images/case-warehouse.jpg",
  health: "/images/case-tech.jpg",
  design: "/images/insight-etsy.jpg",
};

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
            <RevealCard
              id={c.key}
              className="scroll-mt-28"
              minHeight="min-h-[22rem]"
              image={CAP_IMAGES[c.key] ?? "/images/case-tech.jpg"}
              title={c.label}
              description={c.description}
              points={c.points}
              media={
                <span className="grid size-14 place-items-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm">
                  <Icon name={c.icon} className="size-7" />
                </span>
              }
            />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
