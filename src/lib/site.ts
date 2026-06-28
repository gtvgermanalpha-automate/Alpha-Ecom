/** Central site configuration used across metadata, header, footer and structured data. */
export const siteConfig = {
  name: "Alpha E-Commerce",
  shortName: "Alpha",
  legalName: "Alpha Digital Solutions",
  // In a real deployment set NEXT_PUBLIC_SITE_URL; falls back to a sensible default for SEO/OG tags.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://alpha-ecommerce.example.com",
  tagline: "Marketplace store creation & management",
  description:
    "Alpha E-Commerce creates and manages online stores across Amazon, eBay, Etsy, OnBuy, TikTok Shop and Shopify — from setup and listings to advertising, orders and account health.",
  email: "alphaecommerce99@gmail.com",
  phone: "+1 (555) 014-7890",
  phoneHref: "+15550147890",
  foundedYear: 2013,
  ogImage: "/og.png",
  social: {
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com",
  },
} as const;

export type SiteConfig = typeof siteConfig;
