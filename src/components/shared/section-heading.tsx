import * as React from "react";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/reveal";

/** Eyebrow + title + optional description used at the top of sections. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  inverted = false,
  className,
  titleClassName,
  as: TitleTag = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  inverted?: boolean;
  className?: string;
  titleClassName?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "mx-auto max-w-3xl items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow ? (
        <span className={cn("eyebrow", inverted && "text-habanero")}>
          <span className="h-px w-6 bg-habanero" aria-hidden />
          {eyebrow}
        </span>
      ) : null}
      <TitleTag
        className={cn(
          "text-3xl font-extrabold leading-[1.12] sm:text-4xl lg:text-[2.7rem]",
          inverted ? "text-white" : "text-navy",
          titleClassName
        )}
      >
        {title}
      </TitleTag>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-lg leading-relaxed",
            inverted ? "text-white/70" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
