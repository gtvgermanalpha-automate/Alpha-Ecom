import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { marketplaces } from "@/lib/content";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { MarketplaceTile } from "@/components/shared/marketplace-tile";
import { Button } from "@/components/ui/button";

export function MarketplaceShowcase() {
  return (
    <div className="bg-aster-50">
      {marketplaces.map((m, i) => {
        const odd = i % 2 === 1;

        return (
          <section
            key={m.slug}
            id={m.slug}
            className={cn("scroll-mt-28 py-16 lg:py-24", odd ? "bg-aster-100" : "bg-aster-50")}
          >
            <Container>
              <div className="grid items-center gap-12 lg:grid-cols-2">
                {/* TEXT side */}
                <Reveal
                  direction={odd ? "left" : "right"}
                  className={cn(odd && "lg:order-2")}
                >
                  <MarketplaceTile src={m.logo} name={m.name} size="lg" />

                  <h2 className="mt-6 text-3xl font-bold text-navy sm:text-4xl">
                    {m.name} Store Creation &amp; Management
                  </h2>

                  <p className="mt-4 text-lg text-muted-foreground">{m.description}</p>

                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {m.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 size-4 shrink-0 text-aster-700" strokeWidth={3} />
                        <span className="text-sm font-medium text-navy">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button asChild>
                      <Link href="/contact">
                        Get started on {m.name}
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href={`/services/${m.slug}`}>Explore Service</Link>
                    </Button>
                  </div>
                </Reveal>

                {/* VISUAL side */}
                <Reveal
                  direction={odd ? "right" : "left"}
                  delay={1}
                  className={cn("relative", odd && "lg:order-1")}
                >
                  {/* blurred glow behind the card */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-aster/20 via-aster/10 to-transparent blur-2xl"
                  />

                  <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-3xl border border-border bg-white shadow-card">
                    <div className="pointer-events-none absolute inset-0 bg-dots opacity-60" aria-hidden />

                    <Image
                      src={m.logo}
                      alt={`${m.name} logo`}
                      width={220}
                      height={120}
                      className="relative max-h-28 w-auto object-contain"
                    />

                    {/* floating stat chip */}
                    <div className="absolute bottom-6 right-6 rounded-2xl bg-white px-4 py-3 shadow-card ring-1 ring-border">
                      <p className="font-display text-2xl font-extrabold text-navy">{m.stat.value}</p>
                      <p className="text-xs text-muted-foreground">{m.stat.label}</p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </Container>
          </section>
        );
      })}
    </div>
  );
}
