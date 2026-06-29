import Image from "next/image";

import { Container } from "@/components/shared/container";
import { Marquee } from "@/components/shared/marquee";
import { marketplaces } from "@/lib/content";

/**
 * Trust strip: an infinite marquee of the six marketplace logos we build &
 * manage stores on. Logos render large and borderless (no tile/ring) for
 * prominence. Server component — no interactivity beyond the CSS marquee.
 */
export function PartnerMarquee() {
  return (
    <section className="border-y border-border bg-white py-14">
      <Container>
        <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          We create &amp; manage stores on the world&apos;s biggest marketplaces
        </p>
        <Marquee itemClassName="gap-20">
          {marketplaces.map((m) => (
            <Image
              key={m.name}
              src={m.logo}
              alt={`${m.name} logo`}
              width={260}
              height={104}
              className="h-20 w-auto max-w-[15rem] shrink-0 object-contain transition-transform duration-300 hover:scale-110"
            />
          ))}
        </Marquee>
      </Container>
    </section>
  );
}
