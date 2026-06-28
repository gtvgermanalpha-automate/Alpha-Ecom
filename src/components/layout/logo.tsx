import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

/**
 * Brand wordmark. On dark backgrounds pass `inverted` to render a white
 * monochrome version of the logo.
 */
export function Logo({
  inverted = false,
  priority = false,
  className,
}: {
  inverted?: boolean;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — home`}
      className={cn("inline-flex items-center transition-opacity hover:opacity-90", className)}
    >
      <Image
        src="/alpha-logo-wordmark.png"
        alt={siteConfig.legalName}
        width={600}
        height={219}
        priority={priority}
        sizes="180px"
        className={cn("h-9 w-auto sm:h-10", inverted && "brightness-0 invert")}
      />
    </Link>
  );
}
