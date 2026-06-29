import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Renders a marketplace logo on a clean white tile so every logo (transparent
 * PNG or white-background JPG) displays consistently.
 */
export function MarketplaceTile({
  src,
  name,
  size = "md",
  className,
}: {
  src: string;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const box = {
    sm: "size-12 p-2.5 rounded-xl",
    md: "size-16 p-3 rounded-2xl",
    lg: "size-20 p-4 rounded-2xl",
    xl: "size-28 p-5 rounded-3xl",
  }[size];

  return (
    <span
      className={cn(
        "relative grid place-items-center bg-white shadow-soft ring-1 ring-border",
        box,
        className
      )}
    >
      <Image
        src={src}
        alt={`${name} logo`}
        width={120}
        height={120}
        className="size-full object-contain"
      />
    </span>
  );
}
