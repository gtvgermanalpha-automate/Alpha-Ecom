// Generates branded SVG artwork (strict palette) for case studies + about.
// Palette: navy #111144, habanero #F98513, aster #9BACD8, luster #DAD1C8, white.
// Run with: npm run gen:assets
import { mkdir, writeFile, readdir, rm } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = resolve(root, "public");
const portfolioDir = resolve(publicDir, "portfolio");

const NAVY = "#111144";
const NAVY2 = "#15153f";
const HAB = "#F98513";
const ASTER = "#9BACD8";

const esc = (s) => s.replace(/&/g, "&amp;");

function grid(stroke = "rgba(255,255,255,0.06)") {
  let g = `<g fill="none" stroke="${stroke}" stroke-width="1">`;
  for (let i = 0; i <= 16; i++) g += `<line x1="${i * 50}" y1="0" x2="${i * 50}" y2="600"/>`;
  for (let i = 0; i <= 12; i++) g += `<line x1="0" y1="${i * 50}" x2="800" y2="${i * 50}"/>`;
  return g + `</g>`;
}

function caseSvg({ slug, title, category, primary }) {
  const p = primary === "aster" ? ASTER : HAB;
  const q = primary === "aster" ? HAB : ASTER;
  const bars = [44, 66, 52, 80, 60, 92, 74];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600" role="img" aria-label="${esc(title)}">
  <defs>
    <linearGradient id="bg-${slug}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${NAVY2}"/><stop offset="1" stop-color="${NAVY}"/>
    </linearGradient>
    <linearGradient id="scrim-${slug}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0.4" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.5"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#bg-${slug})"/>
  ${grid()}
  <circle cx="660" cy="120" r="150" fill="${p}" fill-opacity="0.22"/>
  <circle cx="120" cy="500" r="110" fill="${q}" fill-opacity="0.16"/>

  <g transform="translate(150 150)">
    <rect width="500" height="300" rx="24" fill="#ffffff" fill-opacity="0.10" stroke="#ffffff" stroke-opacity="0.18"/>
    <rect x="30" y="30" width="150" height="16" rx="8" fill="#ffffff" fill-opacity="0.8"/>
    <rect x="30" y="56" width="230" height="10" rx="5" fill="${ASTER}" fill-opacity="0.6"/>
    <rect x="360" y="26" width="110" height="40" rx="20" fill="${HAB}"/>
    <text x="415" y="52" fill="#fff" font-family="'Segoe UI',system-ui,sans-serif" font-size="20" font-weight="700" text-anchor="middle">+212%</text>
    <g transform="translate(30 120)">
      ${bars.map((h, i) => `<rect x="${i * 64}" y="${150 - h}" width="42" height="${h}" rx="8" fill="${i % 2 ? q : p}" fill-opacity="${i % 2 ? 0.7 : 1}"/>`).join("")}
      <polyline points="${bars.map((h, i) => `${i * 64 + 21},${150 - h - 14}`).join(" ")}" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-opacity="0.85"/>
    </g>
  </g>

  <rect width="800" height="600" fill="url(#scrim-${slug})"/>
  <g font-family="'Segoe UI', system-ui, sans-serif">
    <rect x="48" y="470" width="${category.length * 11 + 36}" height="32" rx="16" fill="#ffffff" fill-opacity="0.16"/>
    <text x="66" y="491" fill="#fff" font-size="16" font-weight="600">${esc(category)}</text>
    <text x="48" y="544" fill="#fff" font-size="40" font-weight="800">${esc(title)}</text>
  </g>
</svg>
`;
}

const cases = [
  { slug: "case-amazon", title: "Northwind Home", category: "Amazon", primary: "habanero" },
  { slug: "case-ebay", title: "Vintage Loft", category: "eBay", primary: "aster" },
  { slug: "case-etsy", title: "Maker & Moss", category: "Etsy", primary: "habanero" },
  { slug: "case-shopify", title: "Brightline Tech", category: "Shopify", primary: "aster" },
  { slug: "case-tiktok", title: "Glow Collective", category: "TikTok Shop", primary: "habanero" },
  { slug: "case-multichannel", title: "Harbor Goods", category: "Multichannel", primary: "aster" },
];

const aboutSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600" role="img" aria-label="Alpha team managing marketplaces">
  <defs><linearGradient id="ab" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${NAVY2}"/><stop offset="1" stop-color="${NAVY}"/></linearGradient></defs>
  <rect width="800" height="600" fill="url(#ab)"/>
  ${grid()}
  <circle cx="120" cy="120" r="150" fill="${HAB}" fill-opacity="0.22"/>
  <circle cx="700" cy="520" r="150" fill="${ASTER}" fill-opacity="0.18"/>
  <g transform="translate(150 120)">
    <rect width="500" height="290" rx="26" fill="#fff" fill-opacity="0.96"/>
    <rect x="34" y="34" width="160" height="18" rx="9" fill="${NAVY}"/>
    <rect x="34" y="64" width="240" height="12" rx="6" fill="${ASTER}"/>
    <g transform="translate(34 116)">
      <rect x="0" y="40" width="46" height="120" rx="8" fill="${ASTER}"/>
      <rect x="64" y="12" width="46" height="148" rx="8" fill="${HAB}"/>
      <rect x="128" y="68" width="46" height="92" rx="8" fill="${ASTER}"/>
      <rect x="192" y="34" width="46" height="126" rx="8" fill="${HAB}"/>
      <rect x="256" y="86" width="46" height="74" rx="8" fill="${ASTER}"/>
      <rect x="320" y="20" width="46" height="140" rx="8" fill="${NAVY}"/>
      <rect x="384" y="58" width="46" height="102" rx="8" fill="${HAB}"/>
    </g>
  </g>
  <g font-family="'Segoe UI', system-ui, sans-serif" font-weight="700" font-size="26" fill="#fff" text-anchor="middle">
    <g transform="translate(90 430)"><circle r="40" fill="${HAB}"/><text y="9">SM</text></g>
    <g transform="translate(700 150)"><circle r="36" fill="${ASTER}"/><text y="9" fill="${NAVY}">DO</text></g>
    <g transform="translate(640 470)"><circle r="32" fill="#fff"/><text y="8" fill="${NAVY}">ER</text></g>
  </g>
</svg>
`;

async function main() {
  // Clean old multicolour portfolio assets.
  try {
    const existing = await readdir(portfolioDir);
    for (const f of existing) await rm(resolve(portfolioDir, f));
  } catch {
    /* dir may not exist yet */
  }
  await mkdir(portfolioDir, { recursive: true });

  for (const c of cases) {
    await writeFile(resolve(portfolioDir, `${c.slug}.svg`), caseSvg(c), "utf8");
  }
  await writeFile(resolve(publicDir, "about.svg"), aboutSvg, "utf8");
  console.log(`Generated ${cases.length} case-study assets + about.svg (strict palette)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
