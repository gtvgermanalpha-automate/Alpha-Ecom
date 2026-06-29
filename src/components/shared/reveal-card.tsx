import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Before/after "reveal" card (agency-reference style).
 *  - FRONT (the "before"): a dark photo card — a background picture with a navy
 *    overlay, the media tile, title and a short summary.
 *  - BACK  (the "after"):  a light aster-blue panel that slides in HORIZONTALLY
 *    from the right on hover/focus (desktop), revealing the full details.
 *
 * On touch / small screens there's no hover, so the full details render inline on
 * the photo (white-styled) — nothing is hidden from mobile users or assistive tech.
 * Honors prefers-reduced-motion via the global transition-duration reset.
 */
function Points({ points, tone }: { points: string[]; tone: "light" | "dark" }) {
  return (
    <ul className="space-y-2">
      {points.map((p) => (
        <li
          key={p}
          className={cn("flex items-start gap-2 text-sm", tone === "light" ? "text-white/90" : "text-navy/80")}
        >
          <Check
            className={cn("mt-0.5 size-4 shrink-0", tone === "light" ? "text-aster-200" : "text-aster-700")}
            strokeWidth={3}
          />
          {p}
        </li>
      ))}
    </ul>
  );
}

function Cta({ label, tone }: { label: string; tone: "light" | "dark" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-bold",
        tone === "light" ? "text-white" : "text-navy"
      )}
    >
      {label}
      <ArrowRight className="size-4" />
    </span>
  );
}

export function RevealCard({
  title,
  summary,
  description,
  image,
  media,
  badge,
  points,
  cta,
  href,
  id,
  className,
  minHeight = "min-h-[20rem]",
}: {
  title: string;
  /** short line shown on the front (the "before"); falls back to description. */
  summary?: string;
  /** full text revealed on the aster panel (the "after"). */
  description: string;
  /** background photo for the front. */
  image: string;
  /** icon / logo node shown top-left on the dark front (style for a dark bg). */
  media?: React.ReactNode;
  /** small accent top-right on the front, e.g. a stat (style for a dark bg). */
  badge?: React.ReactNode;
  /** bullet details — rendered white on the mobile front and navy on the desktop back. */
  points?: string[];
  /** CTA label — rendered white on the mobile front and navy on the desktop back. */
  cta?: string;
  href?: string;
  id?: string;
  className?: string;
  minHeight?: string;
}) {
  const cls = cn(
    "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card",
    minHeight,
    className
  );

  const inner = (
    <>
      {/* hover accent bar (left edge, hints the horizontal reveal) */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1 origin-top scale-y-0 bg-aster transition-transform duration-300 group-hover:scale-y-100"
      />

      {/* FRONT — dark photo background + navy overlay (the "before") */}
      <Image
        src={image}
        alt=""
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/55 to-navy/95" aria-hidden />

      <div className="relative z-0 flex h-full flex-col p-7 text-white">
        <div className="flex items-start justify-between gap-4">
          {media}
          {badge}
        </div>
        <h3 className="mt-6 text-xl font-bold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/85">{summary ?? description}</p>

        {/* mobile (no hover): full details inline, light-styled over the photo */}
        {(summary && summary !== description) || points || cta ? (
          <div className="mt-4 space-y-4 lg:hidden">
            {summary && summary !== description ? (
              <p className="text-sm leading-relaxed text-white/85">{description}</p>
            ) : null}
            {points ? <Points points={points} tone="light" /> : null}
            {cta ? <Cta label={cta} tone="light" /> : null}
          </div>
        ) : null}
      </div>

      {/* BACK — light aster panel, slides in from the right on hover/focus (desktop) */}
      <div
        className={cn(
          "absolute inset-0 z-10 hidden translate-x-full flex-col bg-gradient-to-br from-aster to-aster-200 p-7 text-navy",
          "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "group-hover:translate-x-0 group-focus-within:translate-x-0 lg:flex"
        )}
      >
        <h3 className="text-xl font-bold text-navy">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-navy/80">{description}</p>
        {points ? <div className="mt-4"><Points points={points} tone="dark" /></div> : null}
        {cta ? <div className="mt-auto pt-5"><Cta label={cta} tone="dark" /></div> : null}
      </div>
    </>
  );

  return href ? (
    <Link href={href} id={id} className={cls}>
      {inner}
    </Link>
  ) : (
    <article id={id} className={cls}>
      {inner}
    </article>
  );
}
