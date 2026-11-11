import type { Metadata } from "next";

import { seo } from "@/lib/content";
import { siteConfig } from "@/lib/site";

/** Social-share preview: a custom image from the CMS, or the generated default card. */
export const socialImage = {
  url: seo.social.image || "/og-default",
  width: 1200,
  height: 630,
  alt: seo.social.title,
};

/**
 * Open Graph block for a page. Next.js replaces (does not merge) a parent's
 * `openGraph`, so every page passes its own path here to get an `og:url`
 * that points at itself while keeping the shared title, text and image.
 */
export function ogFor(path: string): NonNullable<Metadata["openGraph"]> {
  return {
    type: "website",
    locale: "en_US",
    url: path,
    siteName: siteConfig.name,
    title: seo.social.title,
    description: seo.social.description,
    images: [socialImage],
  };
}
