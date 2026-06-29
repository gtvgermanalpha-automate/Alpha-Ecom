/**
 * Single source of truth for field length limits + format checks.
 * Used by server-side validation AND the editor's live character counters,
 * so the UI and the server always agree.
 */

export const TEXT_LIMITS: Record<string, number> = {
  slug: 60,
  key: 60,
  name: 80,
  title: 120,
  label: 80,
  heading: 140,
  subtitle: 220,
  blurb: 200,
  excerpt: 280,
  description: 1200,
  quote: 600,
  answer: 1200,
  question: 180,
  body: 6000,
  role: 80,
  company: 80,
  initials: 4,
  value: 24,
  accent: 9,
  category: 40,
  readingTime: 24,
  year: 8,
  number: 6,
  flag: 8,
  city: 60,
  address: 200,
  icon: 40,
  logo: 200,
  image: 200,
  marketplaceLogo: 200,
  href: 200,
  email: 120,
  phone: 32,
  phoneHref: 32,
  url: 200,
  tagline: 120,
  badge: 120,
};

export const limitFor = (key: string) => TEXT_LIMITS[key] ?? 400;

/* ── Format checkers ─────────────────────────────────────── */
export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
export const isUrl = (v: string) => /^https?:\/\/\S+$/.test(v);
export const isSlug = (v: string) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v);
export const isHexColor = (v: string) => /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(v);

/** Make a URL-safe slug from arbitrary text. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, TEXT_LIMITS.slug);
}
