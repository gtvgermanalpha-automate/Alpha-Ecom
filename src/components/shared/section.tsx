import * as React from "react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/container";

type Tone = "white" | "luster" | "luster-strong" | "navy";

const toneClass: Record<Tone, string> = {
  white: "bg-white text-foreground",
  luster: "bg-aster-50 text-foreground",
  "luster-strong": "bg-aster-100 text-navy",
  navy: "bg-navy text-white",
};

/**
 * Standard section wrapper — locks vertical rhythm and background tone so every
 * section across the site stays visually consistent.
 */
export function Section({
  children,
  tone = "white",
  className,
  containerClassName,
  id,
  bare = false,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  id?: string;
  /** Skip the inner Container (when a section needs full-bleed children). */
  bare?: boolean;
}) {
  return (
    <section id={id} className={cn("relative py-20 lg:py-28", toneClass[tone], className)}>
      {bare ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}
