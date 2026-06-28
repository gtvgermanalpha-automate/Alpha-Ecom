"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { capabilities } from "@/lib/content";
import { Icon } from "@/lib/icons";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";

export function PlatformTabs() {
  const [active, setActive] = React.useState(0);
  const current = capabilities[active];
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    const count = capabilities.length;
    let next = active;
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        next = (active + 1) % count;
        break;
      case "ArrowUp":
      case "ArrowLeft":
        next = (active - 1 + count) % count;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = count - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section className="relative overflow-hidden bg-navy py-20 lg:py-28">
      {/* Decorative layers */}
      <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-60" aria-hidden />
      <div className="pointer-events-none absolute -left-24 top-1/4 size-[26rem] rounded-full bg-habanero/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-24 bottom-0 size-[28rem] rounded-full bg-aster/25 blur-3xl" aria-hidden />

      <Container className="relative">
        <SectionHeading
          inverted
          eyebrow="What we handle"
          title="Your whole channel, managed end-to-end"
          description="Click through everything we take off your plate."
          align="center"
          className="mb-12 mx-auto"
        />

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Tab list */}
          <div
            role="tablist"
            aria-label="Capabilities"
            aria-orientation="vertical"
            className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0 lg:col-span-4"
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
                  onClick={() => setActive(i)}
                  onKeyDown={handleKeyDown}
                  className={cn(
                    "group flex w-full shrink-0 items-center gap-3 rounded-2xl px-5 py-4 text-left transition-all",
                    isActive
                      ? "bg-white text-navy shadow-card"
                      : "text-white/70 hover:bg-white/10"
                  )}
                >
                  <span
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-lg transition-colors",
                      isActive ? "bg-habanero text-white" : "bg-white/10 text-white"
                    )}
                  >
                    <Icon name={tab.icon} className="size-5" />
                  </span>
                  <span className="font-semibold">{tab.label}</span>
                  <ChevronRight
                    className={cn(
                      "ml-auto hidden size-4 shrink-0 transition-all lg:block",
                      isActive
                        ? "text-habanero translate-x-0 opacity-100"
                        : "-translate-x-1 text-white/40 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                    )}
                    aria-hidden
                  />
                </button>
              );
            })}
          </div>

          {/* Content pane */}
          <div className="mt-4 lg:mt-0 lg:col-span-8">
            <div className="min-h-[18rem] rounded-3xl bg-white p-8 shadow-card">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  role="tabpanel"
                  id={`cap-panel-${current.key}`}
                  aria-labelledby={`cap-tab-${current.key}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="text-2xl font-bold text-navy">{current.heading}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {current.description}
                  </p>

                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {current.points.map((point) => (
                      <div
                        key={point}
                        className="flex items-start gap-3 rounded-xl border border-border bg-luster-50 p-4"
                      >
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-habanero/10">
                          <Check className="size-3.5 text-habanero" strokeWidth={3} />
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
    </section>
  );
}
