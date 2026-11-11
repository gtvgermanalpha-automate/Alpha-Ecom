import type { MetadataRoute } from "next";

import { insights, marketplaces } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-10");
  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/what-we-do", priority: 0.8 },
    { path: "/portfolio", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
    { path: "/blog", priority: 0.7 },
    { path: "/privacy-policy", priority: 0.3 },
    { path: "/terms-and-conditions", priority: 0.3 },
    // One entry per service page and per blog article, straight from the CMS.
    ...marketplaces.map((m) => ({ path: `/services/${m.slug}`, priority: 0.8 })),
    ...insights.filter((p) => p.slug).map((p) => ({ path: `/blog/${p.slug}`, priority: 0.6 })),
  ];

  return routes.map(({ path, priority }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
