"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Icon } from "@/lib/icons";
import { projects, portfolioCategories, type PortfolioCategory } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";

const EASE = [0.22, 1, 0.36, 1] as const;

export function PortfolioGrid({
  limit,
  showFilters = true,
  heading = true,
  tone = "white",
}: {
  limit?: number;
  showFilters?: boolean;
  heading?: boolean;
  tone?: "white" | "luster";
}) {
  const [category, setCategory] = React.useState<PortfolioCategory>("All");
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const filtered = React.useMemo(() => {
    const matched =
      category === "All" ? projects : projects.filter((p) => p.category === category);
    return typeof limit === "number" ? matched.slice(0, limit) : matched;
  }, [category, limit]);

  const close = React.useCallback(() => setActiveIndex(null), []);
  const navigate = React.useCallback(
    (dir: number) =>
      setActiveIndex((i) => (i === null ? i : (i + dir + filtered.length) % filtered.length)),
    [filtered.length]
  );

  // Keyboard controls + body scroll-lock while the lightbox is open.
  React.useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") navigate(1);
      else if (e.key === "ArrowLeft") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeIndex, close, navigate]);

  const active = activeIndex === null ? null : filtered[activeIndex];

  return (
    <section
      id="case-studies"
      className={cn(tone === "luster" ? "bg-luster-50" : "bg-white", "py-20 lg:py-28")}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {heading ? (
          <SectionHeading
            eyebrow="Case studies"
            title="Real stores, real results"
            description="A look at the marketplace stores we've launched, fixed and scaled."
            className="mb-12"
          />
        ) : null}

        {showFilters ? (
          <div className="mb-10 flex flex-wrap justify-center gap-2.5">
            {portfolioCategories.map((cat) => {
              const isActive = cat === category;
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    setCategory(cat);
                    setActiveIndex(null);
                  }}
                  className={cn(
                    "rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300",
                    isActive
                      ? "bg-habanero text-white shadow-glow"
                      : "border border-border bg-white text-navy hover:border-aster hover:text-habanero"
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        ) : null}

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.button
                key={project.slug}
                layout
                type="button"
                onClick={() => setActiveIndex(i)}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, ease: EASE }}
                aria-label={`View ${project.title} case study`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white text-left outline-none transition-all duration-300 hover:-translate-y-1 hover:border-aster hover:shadow-card focus-visible:ring-[3px] focus-visible:ring-aster/60"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} — ${project.category} project`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* navy gradient overlay on hover */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {/* marketplace logo tile */}
                  <span className="absolute left-3 top-3 grid place-items-center rounded-lg bg-white p-1.5 ring-1 ring-border">
                    <Image
                      src={project.marketplaceLogo}
                      alt={`${project.category} logo`}
                      width={28}
                      height={28}
                      className="size-7 object-contain"
                    />
                  </span>
                  <span className="absolute bottom-3 right-3 grid size-10 translate-y-2 place-items-center rounded-full bg-habanero text-white opacity-0 shadow-glow transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <Icon name="arrow-up-right" className="size-5" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <Badge variant="secondary" className="w-fit">
                    {project.category}
                  </Badge>
                  <h3 className="mt-3 text-lg font-bold text-navy">{project.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {project.excerpt}
                  </p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[60] grid place-items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${active.title} case study`}
          >
            {/* backdrop */}
            <button
              type="button"
              aria-label="Close case study"
              onClick={close}
              className="absolute inset-0 bg-navy/70 backdrop-blur-sm"
            />

            <motion.div
              className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-card"
              initial={{ opacity: 0, scale: 0.95, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {/* Close */}
              <button
                type="button"
                onClick={close}
                aria-label="Close case study"
                className="absolute right-4 top-4 z-20 grid size-10 place-items-center rounded-full bg-white/90 text-navy ring-1 ring-border backdrop-blur transition-colors hover:bg-aster hover:text-navy"
              >
                <Icon name="x" className="size-5" />
              </button>

              {/* Prev / Next */}
              {filtered.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    aria-label="Previous case study"
                    className="absolute left-3 top-[calc(25%-1.25rem)] z-20 grid size-10 place-items-center rounded-full bg-white/90 text-navy ring-1 ring-border backdrop-blur transition-colors hover:bg-aster hover:text-navy lg:top-1/2 lg:-translate-y-1/2"
                  >
                    <Icon name="chevron-left" className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(1)}
                    aria-label="Next case study"
                    className="absolute right-3 top-[calc(25%-1.25rem)] z-20 grid size-10 place-items-center rounded-full bg-white/90 text-navy ring-1 ring-border backdrop-blur transition-colors hover:bg-aster hover:text-navy lg:top-1/2 lg:-translate-y-1/2"
                  >
                    <Icon name="chevron-right" className="size-5" />
                  </button>
                </>
              ) : null}

              <div className="grid lg:grid-cols-2">
                {/* Image */}
                <div className="relative aspect-[4/3] lg:aspect-auto">
                  <Image
                    src={active.image}
                    alt={`${active.title} — ${active.category} project`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col p-7 sm:p-9">
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-9 place-items-center rounded-lg bg-white p-1 ring-1 ring-border">
                      <Image
                        src={active.marketplaceLogo}
                        alt={`${active.category} logo`}
                        width={28}
                        height={28}
                        className="size-7 object-contain"
                      />
                    </span>
                    <Badge variant="secondary">{active.category}</Badge>
                  </div>

                  <h3 className="mt-5 text-2xl font-bold text-navy">{active.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{active.description}</p>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    {active.results.map((r) => (
                      <div key={r.label} className="rounded-xl bg-luster-50 p-4">
                        <p className="font-display text-2xl font-extrabold text-habanero">
                          {r.value}
                        </p>
                        <p className="mt-1 text-xs font-medium text-muted-foreground">{r.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {active.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-auto pt-7">
                    <Button asChild className="w-full sm:w-auto">
                      <Link href="/contact">
                        Start a similar project <Icon name="arrow-up-right" className="size-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
