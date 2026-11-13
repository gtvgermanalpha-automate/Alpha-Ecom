/**
 * Single source of truth for site content.
 * Alpha Digital Solutions is a marketplace store-creation & management agency.
 * The six services we offer: Amazon, eBay, Etsy, OnBuy, TikTok Shop, Shopify.
 * Icons are string keys resolved through `@/lib/icons`.
 *
 * Data now lives in JSON files under `@/content` (a git-backed JSON CMS).
 * This module imports that JSON, casts it to the existing TypeScript types
 * and re-exports everything under the same names so consumers are unchanged.
 */

import marketplacesData from "@/content/marketplaces.json";
import capabilitiesData from "@/content/capabilities.json";
import caseStudiesData from "@/content/case-studies.json";
import testimonialsData from "@/content/testimonials.json";
import insightsData from "@/content/insights.json";
import faqsData from "@/content/faqs.json";
import officesData from "@/content/offices.json";
import whyUsData from "@/content/why-us.json";
import processData from "@/content/process.json";
import awardsData from "@/content/awards.json";
import homeData from "@/content/home.json";
import aboutData from "@/content/about.json";
import sectionsData from "@/content/sections.json";
import seoData from "@/content/seo.json";
import pagesData from "@/content/pages.json";
import footerData from "@/content/footer.json";
import legalData from "@/content/legal.json";

export type IconKey = string;

/* ------------------------------------------------------------------ */
/* Marketplaces (the six services)                                     */
/* ------------------------------------------------------------------ */

export type Marketplace = {
  slug: string;
  name: string;
  logo: string; // path in /public
  blurb: string; // short, for grids
  description: string; // longer, for detail
  features: string[];
  accent: string; // brand-ish accent for subtle theming (kept within neutral usage)
  stat: { value: string; label: string };
  /** Optional SEO overrides for the /services/[slug] page. */
  seoTitle?: string;
  seoDescription?: string;
  /* Optional long-form content for the /services/[slug] page (all editable in the CMS). */
  heroTitle?: string;
  overviewTitle?: string;
  intro?: string[];
  ctaLabel?: string;
  sections?: ServiceSection[];
  faqTitle?: string;
  faqs?: { question: string; answer: string }[];
  ctaTitle?: string;
  ctaDescription?: string;
};

export type ServiceItem = { title: string; text?: string };
export type ServiceSection = {
  /** "Cards" = grid of cards, "List" = heading beside a list, "Steps" = numbered process. */
  style?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  items?: ServiceItem[];
  outro?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export const marketplaces = marketplacesData as Marketplace[];

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export type NavChild = { label: string; href: string; description?: string; logo?: string; icon?: IconKey };
export type NavColumn = { heading?: string; items: NavChild[] };
export type NavItem = { label: string; href: string; columns?: NavColumn[] };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    columns: [
      {
        heading: "Marketplace management",
        items: marketplaces.slice(0, 3).map((m) => ({
          label: m.name,
          href: `/services#${m.slug}`,
          description: m.blurb,
          logo: m.logo,
        })),
      },
      {
        heading: "More channels",
        items: marketplaces.slice(3).map((m) => ({
          label: m.name,
          href: `/services#${m.slug}`,
          description: m.blurb,
          logo: m.logo,
        })),
      },
    ],
  },
  {
    label: "What we do",
    href: "/what-we-do",
    columns: [
      {
        items: [
          { label: "Store Creation & Setup", href: "/what-we-do#setup", description: "Launch on any marketplace, fast", icon: "store" },
          { label: "Listing & SEO", href: "/what-we-do#listing", description: "Rank higher, convert more", icon: "search" },
          { label: "Advertising / PPC", href: "/what-we-do#ads", description: "Profitable, managed ad spend", icon: "megaphone" },
        ],
      },
      {
        items: [
          { label: "Order & Inventory", href: "/what-we-do#operations", description: "Stay in stock, ship on time", icon: "package" },
          { label: "Account Health", href: "/what-we-do#health", description: "Stay compliant and protected", icon: "shield-check" },
          { label: "Branding & Design", href: "/what-we-do#design", description: "Stores that look the part", icon: "palette" },
        ],
      },
    ],
  },
  { label: "Case Studies", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

/* ------------------------------------------------------------------ */
/* Hero / generic copy                                                 */
/* ------------------------------------------------------------------ */

export const hero = {
  badge: homeData.badge,
  titleLead: homeData.titleLead,
  titleRotators: homeData.titleRotators,
  titleTail: homeData.titleTail,
  subtitle: homeData.subtitle,
  primaryCta: homeData.primaryCta,
  secondaryCta: homeData.secondaryCta,
};

/* ------------------------------------------------------------------ */
/* Awards / certifications (carousel)                                  */
/* ------------------------------------------------------------------ */

export type Award = { slug?: string; title: string; subtitle: string; icon: IconKey; logo?: string };

export const awards = awardsData as Award[];

/* ------------------------------------------------------------------ */
/* Stats / counters                                                    */
/* ------------------------------------------------------------------ */

export type Stat = { value: number; suffix?: string; prefix?: string; label: string; icon: IconKey };

export const stats: Stat[] = [
  { value: 1200, suffix: "+", label: "Stores launched", icon: "store" },
  { value: 9, prefix: "$", suffix: "M+", label: "Monthly sales managed", icon: "trending-up" },
  { value: 6, label: "Marketplaces mastered", icon: "globe" },
  { value: 98, suffix: "%", label: "Client retention", icon: "smile" },
];

/* ------------------------------------------------------------------ */
/* Why choose us (differentiators)                                     */
/* ------------------------------------------------------------------ */

export type Feature = { slug?: string; icon: IconKey; title: string; description: string };

export const whyUs = whyUsData as Feature[];

/* ------------------------------------------------------------------ */
/* What we handle (platform tabs)                                      */
/* ------------------------------------------------------------------ */

export type CapabilityTab = { slug?: string; key: string; label: string; icon: IconKey; heading: string; description: string; points: string[] };

export const capabilities = capabilitiesData as CapabilityTab[];

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

export type ProcessStep = { slug?: string; number: string; title: string; description: string; icon: IconKey };

export const processSteps = processData as ProcessStep[];

/* ------------------------------------------------------------------ */
/* Case studies / success stories (carousel)                          */
/* ------------------------------------------------------------------ */

export const portfolioCategories = ["All", "Amazon", "eBay", "Etsy", "Shopify", "TikTok Shop"] as const;
export type PortfolioCategory = (typeof portfolioCategories)[number];

export type Project = {
  slug: string;
  title: string;
  category: Exclude<PortfolioCategory, "All">;
  marketplaceLogo: string;
  tags: string[];
  excerpt: string;
  description: string;
  image: string;
  results: { label: string; value: string }[];
};

export const projects = caseStudiesData as Project[];

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

export type Testimonial = { slug?: string; quote: string; name: string; role: string; company: string; rating: number; initials: string };

export const testimonials = testimonialsData as Testimonial[];

/* ------------------------------------------------------------------ */
/* Insights / blog                                                     */
/* ------------------------------------------------------------------ */

export type Insight = {
  slug?: string;
  title: string;
  category: string;
  readingTime: string;
  excerpt: string;
  image: string;
  date?: string;
  /** Article body as an ordered list of blocks: "## …" = heading, "- …" = bullet, else paragraph. */
  body?: string[];
  /** Optional SEO overrides for the article page. */
  seoTitle?: string;
  seoDescription?: string;
};

export const insights = insightsData as Insight[];

/* ------------------------------------------------------------------ */
/* Offices                                                             */
/* ------------------------------------------------------------------ */

export type Office = { slug?: string; country: string; flag: string };

export const offices = officesData as Office[];

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export type Faq = { slug?: string; question: string; answer: string };

export const faqs = faqsData as Faq[];

/* ------------------------------------------------------------------ */
/* Contact form options                                                */
/* ------------------------------------------------------------------ */

export const interestOptions = homeData.interestOptions;

export const budgetOptions = homeData.budgetOptions;

export const sourceOptions = homeData.sourceOptions;

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export type FooterColumn = { heading: string; links: { label: string; href: string }[] };

/** Footer copy + link columns, edited under "Footer" in the CMS. */
export const footerContent = footerData;

export const footerColumns: FooterColumn[] = footerData.columns;

/* ------------------------------------------------------------------ */
/* About section + section headings (CMS-editable copy)                */
/* ------------------------------------------------------------------ */

export type SectionCopy = { eyebrow: string; title: string; description: string };

export const aboutContent = aboutData;

/** Eyebrow / title / intro line for each section, edited under "Section headings" in the CMS. */
export const sectionCopy = sectionsData;

/* ------------------------------------------------------------------ */
/* SEO titles + meta descriptions (CMS-editable)                       */
/* ------------------------------------------------------------------ */

/** Per-page SEO title + meta description, edited under "SEO" in the CMS. */
export const seo = seoData;

/* ------------------------------------------------------------------ */
/* Page banners + legal pages (CMS-editable)                           */
/* ------------------------------------------------------------------ */

/** Top banner (and bottom call-to-action) copy for each inner page. */
export const pageCopy = pagesData;

/** Privacy Policy + Terms & Conditions text. */
export const legal = legalData;
