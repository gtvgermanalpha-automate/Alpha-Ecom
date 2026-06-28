import { Container } from "@/components/shared/container";
import { Marquee } from "@/components/shared/marquee";
import { MarketplaceTile } from "@/components/shared/marketplace-tile";
import { marketplaces } from "@/lib/content";

/**
 * Trust strip: an infinite marquee of the six marketplace logos we build &
 * manage stores on. Server component — no interactivity beyond the CSS marquee.
 */
export function PartnerMarquee() {
  return (
    <section className="border-y border-border bg-white py-14">
      <Container>
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          We create &amp; manage stores on the world&apos;s biggest marketplaces
        </p>
        <Marquee>
          {marketplaces.map((m) => (
            <MarketplaceTile key={m.name} src={m.logo} name={m.name} size="lg" />
          ))}
        </Marquee>
      </Container>
    </section>
  );
}
