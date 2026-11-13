import * as React from "react";

import { textSizes } from "@/lib/content";

/**
 * Wraps a page so the heading / paragraph sizes picked in the CMS apply to it.
 * The sizes themselves are plain CSS (see `.sized` in globals.css).
 */
export function Sized({
  page,
  heading,
  text,
  children,
}: {
  /** Key in the "Text sizes" CMS collection. */
  page?: keyof typeof textSizes;
  /** Explicit values (used by service pages, which store their own). */
  heading?: string;
  text?: string;
  children: React.ReactNode;
}) {
  const fromCms = page ? textSizes[page] : undefined;
  return (
    <div
      className="sized"
      data-heading-size={heading || fromCms?.headingSize || "Medium"}
      data-text-size={text || fromCms?.textSize || "Medium"}
    >
      {children}
    </div>
  );
}
