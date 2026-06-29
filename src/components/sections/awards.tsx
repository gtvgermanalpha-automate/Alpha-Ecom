import Image from "next/image";

import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Marquee } from "@/components/shared/marquee";
import { Reveal } from "@/components/shared/reveal";
import { Icon } from "@/lib/icons";
import { awards } from "@/lib/content";

export function Awards() {
  return (
    <section className="bg-white py-12 lg:py-14">
      <Container>
        <SectionHeading
          eyebrow="Recognition"
          title="Trusted, certified & rated 5 stars by sellers"
          className="mb-10"
        />

        <Reveal direction="up" delay={1}>
          <Marquee>
            {awards.map((a) => (
              <div
                key={a.title}
                className="flex shrink-0 items-center gap-4 rounded-2xl border border-border bg-white px-6 py-4 shadow-soft transition-colors duration-300 hover:border-aster"
              >
                {a.logo ? (
                  <Image
                    src={a.logo}
                    alt={`${a.title} logo`}
                    width={140}
                    height={56}
                    className="h-11 w-auto max-w-[7rem] object-contain"
                  />
                ) : (
                  <Icon name={a.icon} className="size-10 text-aster-700" />
                )}
                <span className="flex flex-col">
                  <span className="text-sm font-bold text-navy">{a.title}</span>
                  <span className="text-xs text-muted-foreground">{a.subtitle}</span>
                </span>
              </div>
            ))}
          </Marquee>
        </Reveal>
      </Container>
    </section>
  );
}
