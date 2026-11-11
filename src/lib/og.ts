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
 * Social-share tags (Open Graph + X/Twitter) for a page. Next.js replaces
 * (does not merge) a parent's `openGraph` / `twitter`, so every page calls this
 * with its own path, title and description. The home page omits the last two
 * and gets the "Social sharing preview" text from the CMS.
 */
export function shareMeta(
  path: string,
  title: string = seo.social.title,
  description: string = seo.social.description
): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type: "website",
      locale: "en_US",
      url: path,
      siteName: siteConfig.name,
      title,
      description,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage.url],
    },
  };
}
