"use client";

import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, PlayCircle, Star } from "lucide-react";
import * as React from "react";

import { hero, marketplaces } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { Magnetic } from "@/components/shared/magnetic";

const EASE = [0.22, 1, 0.36, 1] as const;

// eBay logo letter colours (e, b, a, y) — used to render the hero word multi-coloured.
const EBAY_LETTER_COLORS = ["#E53238", "#0064D2", "#F5AF02", "#86B817"];

// Decorative float positions + parallax depth for the marketplace logo tiles.
const floats = [
  { className: "left-[5%] top-[18%]", delay: 0, depth: 38 },
  { className: "left-[11%] bottom-[16%]", delay: 0.6, depth: 26 },
  { className: "left-[20%] top-[46%]", delay: 1.2, depth: 48 },
  { className: "right-[5%] top-[16%]", delay: 0.3, depth: 34 },
  { className: "right-[11%] bottom-[18%]", delay: 0.9, depth: 22 },
  { className: "right-[19%] top-[44%]", delay: 1.5, depth: 44 },
];

export function Hero() {
  const [idx, setIdx] = React.useState(0);
  // Rotate the marketplace name in the headline, each in its own brand colour.
  const rotators = marketplaces.map((m) => ({ label: m.name, color: m.accent, slug: m.slug }));
  const reduce = useReducedMotion();

  const sectionRef = React.useRef<HTMLElement>(null);

  // Scroll-driven parallax (blobs drift, content settles as you scroll past).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const blobA = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const blobB = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0]);

  // Cursor parallax for the floating tiles.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 90, damping: 18, mass: 0.5 });
  const smy = useSpring(my, { stiffness: 90, damping: 18, mass: 0.5 });

  function onMouseMove(e: React.MouseEvent) {
    if (reduce) return;
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  }
  function onMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  React.useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % rotators.length), 2200);
    return () => clearInterval(t);
  }, [rotators.length]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative overflow-hidden bg-aster-50"
    >
      {/* Decorative layers */}
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-70" aria-hidden />
      <motion.div
        style={{ y: blobA }}
        className="pointer-events-none absolute -left-32 -top-24 size-[28rem] rounded-full bg-aster/20 blur-3xl"
        aria-hidden
      />
      <motion.div
        style={{ y: blobB }}
        className="pointer-events-none absolute -right-24 top-1/3 size-[26rem] rounded-full bg-aster/30 blur-3xl"
        aria-hidden
      />

      {/* Floating marketplace logos (desktop) */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
        {marketplaces.map((m, i) => (
          <FloatingTile key={m.slug} logo={m.logo} cfg={floats[i]} index={i} smx={smx} smy={smy} reduce={!!reduce} />
        ))}
      </div>

      <Container className="relative">
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="flex flex-col items-center py-20 text-center lg:py-28"
        >
          <motion.span
            className="eyebrow rounded-full bg-white/70 px-4 py-1.5 shadow-soft ring-1 ring-border backdrop-blur"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Star className="size-3.5 fill-habanero text-habanero" />
            {hero.badge}
          </motion.span>

          <motion.h1
            className="mt-7 max-w-4xl text-4xl font-extrabold leading-[1.08] text-navy sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.06 }}
          >
            {hero.titleLead}{" "}
            <span
              className="relative inline-flex h-[1.15em] items-center justify-center overflow-hidden align-bottom transition-colors duration-300"
              style={{ color: rotators[idx].color }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={rotators[idx].label}
                  className="whitespace-nowrap"
                  initial={{ y: "0.9em", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-0.9em", opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  {rotators[idx].slug === "ebay"
                    ? rotators[idx].label
                        .split("")
                        .map((ch, i) => (
                          <span key={i} style={{ color: EBAY_LETTER_COLORS[i] ?? "currentColor" }}>
                            {ch}
                          </span>
                        ))
                    : rotators[idx].label}
                </motion.span>
              </AnimatePresence>
              <span className="caret ml-1.5" aria-hidden />
            </span>{" "}
            {hero.titleTail}
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 22, filter: reduce ? "blur(0px)" : "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.14 }}
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          >
            <Magnetic>
              <Button asChild size="xl">
                <Link href={hero.primaryCta.href}>
                  {hero.primaryCta.label} <ArrowRight className="size-4" />
                </Link>
              </Button>
            </Magnetic>
            <Button asChild size="xl" variant="outline">
              <Link href={hero.secondaryCta.href}>
                <PlayCircle className="size-5" /> {hero.secondaryCta.label}
              </Link>
            </Button>
          </motion.div>

          {/* Trust row */}
          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {["#F98513", "#9BACD8", "#111144", "#e5740a"].map((c, i) => (
                  <span
                    key={i}
                    className="grid size-9 place-items-center rounded-full border-2 border-luster-50 text-xs font-bold text-white"
                    style={{ backgroundColor: c }}
                  >
                    {["S", "D", "E", "J"][i]}
                  </span>
                ))}
              </div>
              <div className="text-left text-sm">
                <div className="flex items-center gap-2">
                  <Image src="/google.png" alt="Google reviews" width={64} height={22} className="h-5 w-auto object-contain" />
                  <div className="flex items-center gap-0.5" style={{ color: "#FBBC05" }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="mt-0.5 font-semibold text-navy">5.0 rating · 1,200+ stores launched</p>
              </div>
            </div>
          </motion.div>

          {/* Marketplace logo strip (mobile-friendly) */}
          <motion.div
            className="mt-12 w-full lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.36 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Stores we create &amp; manage
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
              {marketplaces.map((m) => (
                <span key={m.slug} className="grid h-14 place-items-center rounded-xl bg-white p-2.5 shadow-soft ring-1 ring-border">
                  <Image src={m.logo} alt={m.name} width={64} height={64} className="max-h-full w-auto object-contain" />
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

function FloatingTile({
  logo,
  cfg,
  index,
  smx,
  smy,
  reduce,
}: {
  logo: string;
  cfg: { className: string; delay: number; depth: number };
  index: number;
  smx: MotionValue<number>;
  smy: MotionValue<number>;
  reduce: boolean;
}) {
  const tx = useTransform(smx, (v) => v * cfg.depth);
  const ty = useTransform(smy, (v) => v * cfg.depth);

  return (
    <motion.div
      className={`absolute ${cfg.className}`}
      style={{ x: tx, y: ty }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 + index * 0.1, duration: 0.6, ease: EASE }}
    >
      <motion.span
        animate={reduce ? undefined : { y: [0, -14, 0] }}
        transition={{ duration: 5 + cfg.delay, repeat: Infinity, ease: "easeInOut", delay: cfg.delay }}
        className="grid size-16 place-items-center rounded-2xl bg-white p-3 shadow-card ring-1 ring-border"
      >
        <Image src={logo} alt="" width={64} height={64} className="size-full object-contain" />
      </motion.span>
    </motion.div>
  );
}
