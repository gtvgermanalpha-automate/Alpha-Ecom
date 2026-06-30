import { type FieldSpec, validateCollection, type ValidationResult } from "@/lib/cms/validate";

export type CollectionMode = "object" | "list";

export type Collection = {
  id: string; // URL-safe id used in API + edit routes
  label: string; // shown in the dashboard
  description: string;
  file: string; // repo-relative path
  mode: CollectionMode;
  idField?: string; // list entries are addressed by this field (default "slug")
  titleField?: string; // which field to show as an entry's title in lists
  fields: FieldSpec[];
  validate: (data: unknown) => ValidationResult;
};

const ctaFields: FieldSpec[] = [
  { key: "label", type: "string", required: true },
  { key: "href", type: "string", required: true },
];

const socialFields: FieldSpec[] = [
  { key: "facebook", type: "string", format: "url" },
  { key: "linkedin", type: "string", format: "url" },
  { key: "instagram", type: "string", format: "url" },
  { key: "twitter", type: "string", format: "url" },
  { key: "youtube", type: "string", format: "url" },
];

const PORTFOLIO_CATEGORIES = ["Amazon", "eBay", "Etsy", "Shopify", "TikTok Shop"] as const;

const defs: Omit<Collection, "validate">[] = [
  {
    id: "settings",
    label: "Site settings",
    description: "Company name, contact details and social links.",
    file: "src/content/settings.json",
    mode: "object",
    fields: [
      { key: "name", type: "string", required: true },
      { key: "shortName", type: "string" },
      { key: "legalName", type: "string" },
      { key: "url", type: "string", format: "url" },
      { key: "tagline", type: "string" },
      { key: "description", type: "text", required: true },
      { key: "email", type: "string", format: "email", required: true },
      { key: "phone", type: "string", required: true },
      { key: "phoneHref", type: "string", required: true },
      { key: "foundedYear", type: "number" },
      { key: "ogImage", type: "string" },
      { key: "social", type: "object", fields: socialFields },
    ],
  },
  {
    id: "home",
    label: "Home & hero copy",
    description: "Hero headline, subtitle, CTAs and contact-form options.",
    file: "src/content/home.json",
    mode: "object",
    fields: [
      { key: "badge", type: "string", required: true },
      { key: "titleLead", type: "string", required: true },
      { key: "titleRotators", type: "string[]", required: true },
      { key: "titleTail", type: "string", required: true },
      { key: "subtitle", type: "text", required: true },
      { key: "primaryCta", type: "object", required: true, fields: ctaFields },
      { key: "secondaryCta", type: "object", required: true, fields: ctaFields },
      { key: "interestOptions", type: "string[]", required: true },
      { key: "budgetOptions", type: "string[]", required: true },
      { key: "sourceOptions", type: "string[]", required: true },
    ],
  },
  {
    id: "marketplaces",
    label: "Marketplaces",
    description: "The six marketplace services shown across the site.",
    file: "src/content/marketplaces.json",
    mode: "list",
    titleField: "name",
    fields: [
      { key: "slug", type: "string", format: "slug", required: true },
      { key: "name", type: "string", required: true },
      { key: "logo", type: "string", required: true },
      { key: "blurb", type: "text", required: true },
      { key: "description", type: "text", required: true },
      { key: "features", type: "string[]", required: true },
      { key: "accent", type: "string", format: "hex", required: true },
      {
        key: "stat",
        type: "object",
        required: true,
        fields: [
          { key: "value", type: "string", required: true },
          { key: "label", type: "string", required: true },
        ],
      },
    ],
  },
  {
    id: "capabilities",
    label: "Capabilities",
    description: '"What we handle" tabs and the capabilities grid.',
    file: "src/content/capabilities.json",
    mode: "list",
    titleField: "label",
    fields: [
      { key: "slug", type: "string", format: "slug", required: true },
      { key: "key", type: "string", required: true },
      { key: "label", type: "string", required: true },
      { key: "icon", type: "string", required: true },
      { key: "heading", type: "string", required: true },
      { key: "description", type: "text", required: true },
      { key: "points", type: "string[]", required: true },
    ],
  },
  {
    id: "case-studies",
    label: "Case studies",
    description: "Portfolio projects with photos, tags and results.",
    file: "src/content/case-studies.json",
    mode: "list",
    titleField: "title",
    fields: [
      { key: "slug", type: "string", format: "slug", required: true },
      { key: "title", type: "string", required: true },
      { key: "category", type: "string", required: true, enum: PORTFOLIO_CATEGORIES },
      { key: "marketplaceLogo", type: "string", required: true },
      { key: "tags", type: "string[]", required: true },
      { key: "excerpt", type: "text", required: true },
      { key: "description", type: "text", required: true },
      { key: "image", type: "string", required: true },
      {
        key: "results",
        type: "object[]",
        fields: [
          { key: "label", type: "string", required: true },
          { key: "value", type: "string", required: true },
        ],
      },
    ],
  },
  {
    id: "testimonials",
    label: "Testimonials",
    description: "Client quotes shown in the slider.",
    file: "src/content/testimonials.json",
    mode: "list",
    titleField: "name",
    fields: [
      { key: "slug", type: "string", format: "slug", required: true },
      { key: "quote", type: "text", required: true },
      { key: "name", type: "string", required: true },
      { key: "role", type: "string", required: true },
      { key: "company", type: "string", required: true },
      { key: "rating", type: "number", required: true },
      { key: "initials", type: "string", required: true },
    ],
  },
  {
    id: "insights",
    label: "Insights",
    description: "Blog/guide cards.",
    file: "src/content/insights.json",
    mode: "list",
    titleField: "title",
    fields: [
      { key: "slug", type: "string", format: "slug", required: true },
      { key: "title", type: "string", required: true },
      { key: "category", type: "string", required: true },
      { key: "readingTime", type: "string", required: true },
      { key: "date", type: "string" },
      { key: "excerpt", type: "text", required: true },
      { key: "image", type: "string", required: true },
      { key: "body", type: "string[]" },
    ],
  },
  {
    id: "faqs",
    label: "FAQs",
    description: "Questions and answers.",
    file: "src/content/faqs.json",
    mode: "list",
    titleField: "question",
    fields: [
      { key: "slug", type: "string", format: "slug", required: true },
      { key: "question", type: "string", required: true },
      { key: "answer", type: "text", required: true },
    ],
  },
  {
    id: "offices",
    label: "Offices",
    description: "Office locations in the footer and contact page.",
    file: "src/content/offices.json",
    mode: "list",
    titleField: "country",
    fields: [
      { key: "slug", type: "string", format: "slug", required: true },
      { key: "country", type: "string", required: true },
      { key: "flag", type: "string", required: true },
      { key: "city", type: "string", required: true },
      { key: "address", type: "text", required: true },
    ],
  },
  {
    id: "why-us",
    label: "Why-us points",
    description: 'The differentiators in the "Why Alpha" section.',
    file: "src/content/why-us.json",
    mode: "list",
    titleField: "title",
    fields: [
      { key: "slug", type: "string", format: "slug", required: true },
      { key: "icon", type: "string", required: true },
      { key: "title", type: "string", required: true },
      { key: "description", type: "text", required: true },
    ],
  },
  {
    id: "process",
    label: "Process steps",
    description: "The how-it-works steps.",
    file: "src/content/process.json",
    mode: "list",
    titleField: "title",
    fields: [
      { key: "slug", type: "string", format: "slug", required: true },
      { key: "number", type: "string", required: true },
      { key: "title", type: "string", required: true },
      { key: "description", type: "text", required: true },
      { key: "icon", type: "string", required: true },
    ],
  },
  {
    id: "milestones",
    label: "Milestones",
    description: "The company timeline entries.",
    file: "src/content/milestones.json",
    mode: "list",
    titleField: "title",
    fields: [
      { key: "slug", type: "string", format: "slug", required: true },
      { key: "year", type: "string", required: true },
      { key: "title", type: "string", required: true },
      { key: "description", type: "text", required: true },
    ],
  },
  {
    id: "awards",
    label: "Awards & badges",
    description: "Recognition badges in the awards strip.",
    file: "src/content/awards.json",
    mode: "list",
    titleField: "title",
    fields: [
      { key: "slug", type: "string", format: "slug", required: true },
      { key: "title", type: "string", required: true },
      { key: "subtitle", type: "string", required: true },
      { key: "icon", type: "string", required: true },
      { key: "logo", type: "string" },
    ],
  },
];

export const collections: Collection[] = defs.map((d) => ({
  ...d,
  idField: d.mode === "list" ? (d.idField ?? "slug") : undefined,
  validate: (data: unknown) =>
    validateCollection({ mode: d.mode, idField: d.idField ?? "slug", fields: d.fields }, data),
}));

const byId = Object.fromEntries(collections.map((c) => [c.id, c]));
export const getCollection = (id: string): Collection | undefined => byId[id];

/** Map a repo file path back to its collection (for labelling diffs). */
export const collectionByFile = (file: string) =>
  collections.find((c) => c.file === file || file.endsWith(c.file));
