# Alpha E-Commerce

A production-ready, five-page marketing website for **Alpha E-Commerce** — a marketplace
**store-creation & management agency**. The site offers six services only:
**Amazon, eBay, Etsy, OnBuy, TikTok Shop and Shopify** store creation and handling.

The layout, section structure and interaction patterns follow a modern agency reference
(sticky mega-nav → hero → awards carousel → about + animated counters → services grid →
"why us" → "what we handle" tabs → process → case-study grid + lightbox → testimonials →
growth timeline → partner-logo marquee → insights → FAQ → multi-column footer with
consultation + geo strip), restyled in a **strict four-colour palette** with rich
scroll animations. All copy is original.

Built with **Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion + shadcn/ui +
Lucide + React Hook Form + Zod**.

---

## Strict colour system

Only four brand colours are used, each mapped to a fixed role:

| Role                     | Colour        | Hex       | Tailwind utilities             |
| ------------------------ | ------------- | --------- | ------------------------------ |
| Headings, dark sections, body text | Navy Blue   | `#111144` | `text-navy` `bg-navy`          |
| **Hovers**, focus, soft accents    | Aster Blue  | `#9BACD8` | `bg-aster` `text-aster` `aster-50/100/200` |
| Section backgrounds                | Luster White| `#DAD1C8` | `bg-luster` `bg-luster-50`     |
| **Buttons** & key accents          | Habanero    | `#F98513` | `bg-habanero` `text-habanero`  |

White is the neutral card/base colour. **No other colours appear anywhere** (verified — the
rendered HTML contains zero `orange-*`, `blue-*`, `green-*`, `cream-*`, etc.). Buttons are
Habanero and shift to Aster on hover; links, cards and nav also use Aster on hover.

All tokens live in [`src/app/globals.css`](src/app/globals.css) as Tailwind v4 `@theme` variables.

---

## Getting started

```bash
npm install      # install dependencies
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run gen:assets   # regenerate the in-palette case-study / about artwork
```

> **Corporate TLS note** — a project-local `.npmrc` sets `strict-ssl=false` so `npm install`
> works behind the HTTPS-inspecting firewall on this machine; delete it on a normal network.
> Fonts (Montserrat + Inter) are **self-hosted** in `src/app/fonts`, so the build/dev need
> no network access for fonts.

---

## Pages & key sections

| Route        | Highlights                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------- |
| `/`          | Animated hero with a **rotating marketplace word** + floating logo tiles, awards carousel, about + counters, the six-marketplace services grid, "why us", interactive **"what we handle" tabs**, process, featured case studies, testimonials slider, growth timeline, partner marquee, insights, FAQ, CTA |
| `/services`  | Service grid + **anchored detail rows per marketplace** (`#amazon` … `#shopify`), tabs, process, FAQ, CTA |
| `/about`     | Story, animated stats, "why us", journey timeline, testimonials, CTA                        |
| `/portfolio` | **Filterable case-study grid** with an accessible lightbox (Esc + arrow keys), stats, testimonials |
| `/contact`   | Free-consultation panel + **validated multi-field form** (file upload + NDA), offices, FAQ  |

Plus `not-found`, `sitemap.xml`, `robots.txt`, a dynamic `opengraph-image`, and an
`/api/contact` route handler that validates submissions server-side.

## Animation & interaction

- Scroll-triggered directional reveals + stagger ([`reveal.tsx`](src/components/shared/reveal.tsx)),
  parallax accents, animated counters, infinite logo marquees.
- Rotating hero headline word, autoplay testimonial carousel, animated tab switcher,
  filterable case-study grid with a keyboard-navigable lightbox.
- Sticky, scroll-aware mega-nav; respects `prefers-reduced-motion` globally.

## Brand assets

- Header/footer use your `alpha` wordmark (`/public/alpha-logo-wordmark.png`; white monochrome on dark).
- The six marketplace logos are rendered on white tiles across the services grid, nav mega-menu,
  hero, partner marquee and case-study cards.
- Case-study thumbnails and the about illustration are generated SVGs in the strict palette
  (`npm run gen:assets`).

---

## Structure

```
src/
├─ app/            layout, pages, api/contact, globals.css, fonts/, opengraph-image, sitemap/robots
├─ components/
│  ├─ layout/      header (sticky mega-nav), mobile-nav, footer (consultation + geo), logo, newsletter
│  ├─ sections/    hero, awards, about-section, stats, services, why-us, platform-tabs, process,
│  │               marketplace-showcase, portfolio-grid (+lightbox), testimonials, timeline,
│  │               partner-marquee, insights, faq, cta, page-hero
│  ├─ forms/       contact-form
│  ├─ shared/      section, section-heading, container, reveal, parallax, marquee, counter, marketplace-tile
│  └─ ui/          shadcn primitives (button, badge, input, select, checkbox, accordion, …)
└─ lib/            content.ts (all copy/data), icons.tsx, site.ts, validations.ts, utils.ts
```

All site content lives in [`src/lib/content.ts`](src/lib/content.ts) — edit there to update copy.
The `/api/contact` handler logs submissions in dev; wire it to email/CRM/DB for production.
