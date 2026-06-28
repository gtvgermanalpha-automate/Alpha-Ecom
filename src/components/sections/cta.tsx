import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Magnetic } from "@/components/shared/magnetic";

export function CTA({
  title = "Ready to grow on every marketplace?",
  description = "Book a free 60-minute consultation. We'll review your products, pick the right channels and show you the fastest path to more sales.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-14 text-center sm:px-12 lg:py-20">
            {/* Decorative layers */}
            <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-60" aria-hidden />
            <div
              className="pointer-events-none absolute -left-24 -top-24 size-[26rem] rounded-full bg-habanero/30 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-24 -right-20 size-[24rem] rounded-full bg-aster/30 blur-3xl"
              aria-hidden
            />

            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                {title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/70">{description}</p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Magnetic>
                  <Button asChild size="xl">
                    <Link href="/contact">
                      Get a Free Quote <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </Magnetic>
                <Button asChild size="xl" variant="outline-white">
                  <a href={`tel:${siteConfig.phoneHref}`}>
                    <Phone className="size-4" /> {siteConfig.phone}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
