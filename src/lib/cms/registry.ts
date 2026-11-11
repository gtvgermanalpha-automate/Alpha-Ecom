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

const headingFields: FieldSpec[] = [
  { key: "eyebrow", label: "Small label", type: "string", required: true, max: 60 },
  { key: "title", type: "string", required: true },
  { key: "description", label: "Intro line", type: "text", max: 300 },
];

const seoFields: FieldSpec[] = [
  { key: "title", label: "SEO title (aim for 50-60 characters)", type: "string", required: true, max: 90 },
  { key: "description", label: "Meta description (aim for 140-160 characters)", type: "text", required: true, max: 220 },
];

const seoOverrideFields: FieldSpec[] = [
  { key: "seoTitle", label: "SEO title (optional - leave empty to use the default)", type: "string", max: 90 },
  { key: "seoDescription", label: "Meta description (optional - leave empty to use the default)", type: "text", max: 220 },
];

const bannerFields: FieldSpec[] = [
  { key: "eyebrow", label: "Small label", type: "string", required: true, max: 60 },
  { key: "title", label: "Banner title", type: "string", required: true },
  { key: "description", label: "Banner intro line", type: "text", required: true, max: 300 },
  { key: "image", label: "Background image", type: "string", required: true },
];

const bannerWithCtaFields: FieldSpec[] = [
  ...bannerFields,
  { key: "ctaTitle", label: "Bottom banner title (optional - empty uses the default)", type: "string" },
  { key: "ctaDescription", label: "Bottom banner text (optional - empty uses the default)", type: "text", max: 300 },
];

const linkFields: FieldSpec[] = [
  { key: "label", type: "string", required: true },
  { key: "href", label: "Link (e.g. /about)", type: "string", required: true },
];

const legalDocFields: FieldSpec[] = [
  { key: "updated", label: "Last updated date", type: "string", required: true, max: 40 },
  {
    key: "sections",
    label: "Sections",
    type: "object[]",
    required: true,
    fields: [
      { key: "title", label: "Section title", type: "string", required: true },
      { key: "body", label: 'Paragraphs (start a line with "- " for a bullet point)', type: "string[]", required: true, max: 1500 },
    ],
  },
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
      {
        key: "address",
        type: "object",
        fields: [
          { key: "street", type: "string", required: true },
          { key: "city", type: "string", required: true },
          { key: "country", type: "string", required: true },
          { key: "countryCode", type: "string", required: true },
        ],
      },
      { key: "officeHours", type: "string" },
      { key: "timezone", type: "string" },
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
    id: "about",
    label: "About Alpha section",
    description: 'The "About Alpha" block on the home and About pages.',
    file: "src/content/about.json",
    mode: "object",
    fields: [
      { key: "eyebrow", label: "Small label above the title", type: "string", required: true, max: 60 },
      { key: "title", type: "string", required: true },
      { key: "paragraphs", label: "Paragraphs", type: "string[]", required: true, max: 800 },
      { key: "checklist", label: "Tick-list points", type: "string[]", required: true, max: 80 },
      { key: "cta", label: "Button", type: "object", required: true, fields: ctaFields },
      { key: "image", type: "string", required: true },
      { key: "imageAlt", label: "Image description (alt text)", type: "string", required: true, max: 160 },
      { key: "statValue", label: "Floating stat - number", type: "string", required: true, max: 24 },
      { key: "statLabel", label: "Floating stat - caption", type: "string", required: true, max: 40 },
    ],
  },
  {
    id: "sections",
    label: "Section headings",
    description: "The small label, title and intro line above each section of the site.",
    file: "src/content/sections.json",
    mode: "object",
    fields: [
      { key: "marqueeLine", label: "Line above the marketplace logos", type: "string", required: true, max: 120 },
      { key: "services", label: "Marketplaces grid (home)", type: "object", required: true, fields: headingFields },
      { key: "whyUs", label: "Why Alpha", type: "object", required: true, fields: headingFields },
      { key: "platformTabs", label: "What we handle (scrolling tabs)", type: "object", required: true, fields: headingFields },
      { key: "caseStudies", label: "Case studies", type: "object", required: true, fields: headingFields },
      { key: "testimonials", label: "Testimonials", type: "object", required: true, fields: headingFields },
      { key: "insights", label: "Insights / blog", type: "object", required: true, fields: headingFields },
      { key: "faq", label: "FAQ", type: "object", required: true, fields: headingFields },
      { key: "capabilities", label: "Capabilities (What we do page)", type: "object", required: true, fields: headingFields },
      { key: "locations", label: "Locations (Contact page)", type: "object", required: true, fields: headingFields },
      {
        key: "cta",
        label: "Bottom call-to-action banner",
        type: "object",
        required: true,
        fields: [
          { key: "title", type: "string", required: true },
          { key: "description", type: "text", required: true, max: 300 },
        ],
      },
    ],
  },
  {
    id: "seo",
    label: "SEO titles & descriptions",
    description:
      'Search-engine title and meta description for each page. " | Alpha Digital Solutions" is added after every title automatically, except the home page. Service pages and blog articles have their own SEO fields inside each Marketplaces / Insights entry.',
    file: "src/content/seo.json",
    mode: "object",
    fields: [
      { key: "home", label: "Home page (full title, no suffix added)", type: "object", required: true, fields: seoFields },
      { key: "services", label: "Services page", type: "object", required: true, fields: seoFields },
      { key: "whatWeDo", label: "What We Do page", type: "object", required: true, fields: seoFields },
      { key: "caseStudies", label: "Case Studies page", type: "object", required: true, fields: seoFields },
      { key: "about", label: "About page", type: "object", required: true, fields: seoFields },
      { key: "contact", label: "Contact page", type: "object", required: true, fields: seoFields },
      { key: "blog", label: "Blog index page", type: "object", required: true, fields: seoFields },
      { key: "privacy", label: "Privacy Policy page", type: "object", required: true, fields: seoFields },
      { key: "terms", label: "Terms & Conditions page", type: "object", required: true, fields: seoFields },
      {
        key: "social",
        label: "Social sharing preview for the home page (WhatsApp, Facebook, LinkedIn, X). Other pages show their own SEO title and description; the image is used on every page",
        type: "object",
        required: true,
        fields: [
          { key: "title", label: "Preview title", type: "string", required: true, max: 90 },
          { key: "description", label: "Preview description", type: "text", required: true, max: 220 },
          { key: "image", label: "Preview image (1200 x 630 px - empty uses the default card)", type: "string" },
        ],
      },
      { key: "keywords", label: "Site keywords", type: "string[]", max: 60 },
    ],
  },
  {
    id: "pages",
    label: "Page banners",
    description: "The banner at the top of each inner page (label, title, intro line, background image) and the call-to-action banner at the bottom.",
    file: "src/content/pages.json",
    mode: "object",
    fields: [
      { key: "services", label: "Services page", type: "object", required: true, fields: bannerWithCtaFields },
      { key: "whatWeDo", label: "What We Do page", type: "object", required: true, fields: bannerWithCtaFields },
      { key: "caseStudies", label: "Case Studies page", type: "object", required: true, fields: bannerWithCtaFields },
      { key: "about", label: "About page", type: "object", required: true, fields: bannerWithCtaFields },
      { key: "blog", label: "Blog page", type: "object", required: true, fields: bannerWithCtaFields },
      { key: "contact", label: "Contact page", type: "object", required: true, fields: bannerFields },
      { key: "privacy", label: "Privacy Policy page", type: "object", required: true, fields: bannerFields },
      { key: "terms", label: "Terms & Conditions page", type: "object", required: true, fields: bannerFields },
    ],
  },
  {
    id: "footer",
    label: "Footer",
    description: "The consultation strip, newsletter heading and link columns in the footer. Contact details and social links live in Site settings.",
    file: "src/content/footer.json",
    mode: "object",
    fields: [
      { key: "stripTitle", label: "Consultation strip - title", type: "string", required: true },
      { key: "stripText", label: "Consultation strip - text", type: "string", required: true, max: 200 },
      { key: "stripButton", label: "Consultation strip - button", type: "object", required: true, fields: linkFields },
      { key: "newsletterHeading", label: "Newsletter heading", type: "string", required: true, max: 80 },
      {
        key: "columns",
        label: "Link columns",
        type: "object[]",
        required: true,
        fields: [
          { key: "heading", label: "Column heading", type: "string", required: true, max: 40 },
          { key: "links", label: "Links", type: "object[]", required: true, fields: linkFields },
        ],
      },
    ],
  },
  {
    id: "legal",
    label: "Legal pages",
    description: "The full text of the Privacy Policy and Terms & Conditions pages.",
    file: "src/content/legal.json",
    mode: "object",
    fields: [
      { key: "privacy", label: "Privacy Policy", type: "object", required: true, fields: legalDocFields },
      { key: "terms", label: "Terms & Conditions", type: "object", required: true, fields: legalDocFields },
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
      ...seoOverrideFields,
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
      ...seoOverrideFields,
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
    description: "Countries we operate in (flag + name) shown in the footer and contact page.",
    file: "src/content/offices.json",
    mode: "list",
    titleField: "country",
    fields: [
      { key: "slug", type: "string", format: "slug", required: true },
      { key: "country", type: "string", required: true },
      { key: "flag", type: "string", required: true },
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
