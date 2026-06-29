"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { testimonials } from "@/lib/content";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

const AUTOPLAY_MS = 6000;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = testimonials.length;

  const goTo = useCallback(
    (i: number) => setIndex(((i % count) + count) % count),
    [count]
  );
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, count]);

  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Client love"
          title="Sellers grow with Alpha"
          description="Founders and store owners on what it's like to work with us."
          className="mb-14"
        />

        <Reveal direction="up">
        <div
          className="mx-auto max-w-3xl overflow-hidden rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-aster focus-visible:ring-offset-2"
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          tabIndex={0}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              prev();
            } else if (e.key === "ArrowRight") {
              e.preventDefault();
              next();
            }
          }}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
            aria-live="polite"
          >
            {testimonials.map((t, i) => (
              <figure
                key={t.name}
                className="w-full shrink-0 px-1"
                aria-hidden={i !== index}
              >
                <div className="relative overflow-hidden rounded-3xl border border-border bg-white p-8 shadow-soft sm:p-12">
                  <Quote
                    className="pointer-events-none absolute right-6 top-6 size-16 text-aster/10 sm:size-20"
                    aria-hidden="true"
                  />

                  <div
                    className="flex items-center gap-1"
                    aria-label={`Rated ${t.rating} out of 5`}
                  >
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star
                        key={s}
                        className="size-5 fill-habanero text-habanero"
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <blockquote className="relative mt-6 text-xl font-medium text-navy sm:text-2xl">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  <figcaption className="mt-8 flex items-center gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-navy font-bold text-white">
                      {t.initials}
                    </span>
                    <span className="flex flex-col">
                      <span className="font-bold text-navy">{t.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {t.role}, {t.company}
                      </span>
                    </span>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
        </Reveal>

        <Reveal direction="up" delay={1} className="mt-8 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="grid size-11 place-items-center rounded-full border border-border bg-white text-navy transition-colors duration-200 hover:border-aster hover:text-aster-700"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-2" aria-label="Choose testimonial">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300",
                  i === index ? "w-7 bg-aster" : "w-2.5 bg-navy/20 hover:bg-navy/40"
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="grid size-11 place-items-center rounded-full border border-border bg-white text-navy transition-colors duration-200 hover:border-aster hover:text-aster-700"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </Reveal>
      </Container>
    </section>
  );
}
