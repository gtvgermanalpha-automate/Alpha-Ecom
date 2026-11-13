/**
 * Icons for the points on service pages.
 * The editor can pick one per point in the CMS; "Auto" guesses from the point's title.
 */

/** Options offered in the CMS dropdown (keys of `iconMap` in lib/icons). Empty = pick from the title. */
export const SERVICE_ICONS = [
  "store",
  "search",
  "pencil-ruler",
  "trending-up",
  "layers",
  "megaphone",
  "package-check",
  "truck",
  "headphones",
  "shield-check",
  "heart-pulse",
  "rocket",
  "building-2",
  "globe",
  "users-round",
  "bar-chart",
  "line-chart",
  "dollar-sign",
  "percent",
  "calendar-clock",
  "list-checks",
  "settings",
  "target",
  "tag",
  "star",
  "award",
  "handshake",
  "lightbulb",
  "palette",
  "shopping-cart",
  "eye",
  "zap",
  "clock",
  "mail",
  "check",
] as const;

/** First match wins, so the more specific words come first. */
const KEYWORDS: [RegExp, string][] = [
  [/research|keyword/i, "search"],
  [/seo|optimi[sz]|rank|visib/i, "trending-up"],
  [/setup|set-up|storefront|launch/i, "store"],
  [/brand|design|creative/i, "palette"],
  [/catalog|inventory|stock|variation/i, "layers"],
  [/\bads?\b|advert|promot|campaign|ppc|sponsor/i, "megaphone"],
  [/order|fulfil/i, "package-check"],
  [/shipping|deliver|logistic/i, "truck"],
  [/customer|support|return|message/i, "headphones"],
  [/health|monitor/i, "heart-pulse"],
  [/polic|safe|secur|complian|protect|access/i, "shield-check"],
  [/listing|content|copy|description/i, "pencil-ruler"],
  [/\bnew\b|start/i, "rocket"],
  [/established|business|enterprise/i, "building-2"],
  [/multi|channel|global|international/i, "globe"],
  [/dedicated|manager|team|expert/i, "users-round"],
  [/report|update|analytic|insight|data/i, "bar-chart"],
  [/profit|pric|fee|cost|revenue|sales/i, "dollar-sign"],
  [/consult|call|meeting/i, "calendar-clock"],
  [/plan|roadmap|strategy|terms/i, "list-checks"],
  [/grow|scal/i, "line-chart"],
  [/daily|manage|operation/i, "settings"],
  [/review|rating|feedback/i, "star"],
  [/fast|quick|speed/i, "zap"],
];

/** Icon key for a point: the editor's choice, or a guess from the title, or a tick. */
export function serviceIconFor(title: string, chosen?: string): string {
  if (chosen && chosen !== "Auto") return chosen;
  return KEYWORDS.find(([re]) => re.test(title))?.[1] ?? "check";
}
