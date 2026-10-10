/** Central site configuration used across metadata, header, footer and structured data. */
import settings from "@/content/settings.json";

export const siteConfig = {
  ...settings,
  // In a real deployment set NEXT_PUBLIC_SITE_URL; falls back to the value in
  // settings.json for SEO/OG tags.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? settings.url,
} as const;

/** One-line head-office address for the footer, contact page and legal pages. */
export const fullAddress = `${settings.address.street}, ${settings.address.city}, ${settings.address.country}`;

export type SiteConfig = typeof siteConfig;
