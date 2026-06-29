"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { Check, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { capabilities } from "@/lib/content";
import { Icon } from "@/lib/icons";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";

const EASE = [0.22, 1, 0.36, 1] as const;

export function PlatformTabs() {
  const reduce = useReducedMotion();
  const count = capabilities.length;
  const [active, setActive] = React.useState(0);
  const [mounted, setMounted] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  React.useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Pinned scroll-telling only on desktop with motion allowed.
  const pinned = mounted && isDesktop && !reduce;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!pinned) return;
    const i = Math.min(count - 1, Math.max(0, Math.floor(p * count)));
    setActive((prev) => (prev === i ? prev : i));
  });

  // Scroll the window so the chosen tab's segment is in view (or just switch on mobile).
  const goTo = React.useCallback(
    (i: number) => {
      setActive(i);
      const el = sectionRef.current;
      if (!el || !pinned) return;
      const travel = el.offsetHeight - window.innerHeight;
      const top = window.scrollY + el.getBoundingClientRect().top;
      window.scrollTo({ top: top + (travel * (i + 0.5)) / count, behavior: "smooth" });
    },
    [count, pinned]
  );

  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    let next = active;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (active + 1) % count;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (active - 1 + count) % count;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = count - 1;
    else return;
    e.preventDefault();
    goTo(next);
    tabRefs.current[next]?.focus();
  }

  const current = capabilities[active];

  return (
    <section
      ref={sectionRef}
      className="relative bg-navy"
      style={pinned ? { height: `${count * 46}vh` } : undefined}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          pinned ? "sticky top-0 flex h-screen items-center" : "py-20 lg:py-28"
        )}
      >
        {/* Decorative layers */}
        <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-60" aria-hidden />
        <div className="pointer-events-none absolute -left-24 top-1/4 size-[26rem] rounded-full bg-aster/20 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -right-24 bottom-0 size-[28rem] rounded-full bg-aster/25 blur-3xl" aria-hidden />

        <Container className="relative w-full">
          <SectionHeading
            inverted
            eyebrow="What we handle"
            title="Your whole channel, managed end-to-end"
            description="Scroll through everything we take off your plate."
            align="center"
            className="mb-10 mx-auto"
          />

          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Tab list */}
            <div
              role="tablist"
              aria-label="Capabilities"
              aria-orientation="vertical"
              className="flex gap-2 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0"
            >
              {capabilities.map((tab, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={tab.key}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`cap-tab-${tab.key}`}
                    aria-selected={isActive}
                    aria-controls={`cap-panel-${tab.key}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => goTo(i)}
                    onKeyDown={handleKeyDown}
                    className={cn(
                      "group relative flex w-full shrink-0 items-center gap-3 rounded-2xl px-5 py-4 text-left transition-all duration-300",
                      isActive ? "bg-white text-navy shadow-card" : "text-white/70 hover:bg-white/10"
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-lg transition-colors",
                        isActive ? "bg-aster-700 text-white" : "bg-white/10 text-white"
                      )}
                    >
                      <Icon name={tab.icon} className="size-5" />
                    </span>
                    <span className="font-semibold">{tab.label}</span>
                    {/* active progress accent (desktop) */}
                    {isActive ? (
                      <motion.span
                        layoutId="tab-accent"
                        className="absolute inset-y-2 left-0 hidden w-1 rounded-full bg-aster lg:block"
                        aria-hidden
                      />
                    ) : null}
                    <ChevronRight
                      className={cn(
                        "ml-auto hidden size-4 shrink-0 transition-all lg:block",
                        isActive
                          ? "translate-x-0 text-aster-700 opacity-100"
                          : "-translate-x-1 text-white/40 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      )}
                      aria-hidden
                    />
                  </button>
                );
              })}
            </div>

            {/* Content pane */}
            <div className="mt-4 lg:col-span-8 lg:mt-0">
              <div className="min-h-[19rem] rounded-3xl bg-white p-8 shadow-card">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    role="tabpanel"
                    id={`cap-panel-${current.key}`}
                    aria-labelledby={`cap-tab-${current.key}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.32, ease: EASE }}
                  >
                    <span className="grid size-12 place-items-center rounded-xl bg-aster-100 text-aster-700">
                      <Icon name={current.icon} className="size-6" />
                    </span>
                    <h3 className="mt-5 text-2xl font-bold text-navy">{current.heading}</h3>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                      {current.description}
                    </p>

                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {current.points.map((point) => (
                        <div
                          key={point}
                          className="flex items-start gap-3 rounded-xl border border-border bg-aster-50 p-4"
                        >
                          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-aster-100">
                            <Check className="size-3.5 text-aster-700" strokeWidth={3} />
                          </span>
                          <span className="text-sm font-medium leading-snug text-navy/80">
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
