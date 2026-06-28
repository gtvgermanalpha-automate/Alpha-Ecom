import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Infinite, CSS-driven marquee. Duplicates its children once so the loop is
 * seamless; pauses on hover. Honors prefers-reduced-motion via globals.css.
 */
export function Marquee({
  children,
  reverse = false,
  className,
  itemClassName,
  pauseOnHover = true,
}: {
  children: React.ReactNode;
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
  pauseOnHover?: boolean;
}) {
  return (
    <div className={cn("group relative overflow-hidden mask-fade-x", className)}>
      <div
        className={cn(
          "flex w-max items-center gap-12",
          reverse ? "animate-marquee-rev" : "animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        <div className={cn("flex shrink-0 items-center gap-12", itemClassName)} aria-hidden={false}>
          {children}
        </div>
        <div className={cn("flex shrink-0 items-center gap-12", itemClassName)} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
