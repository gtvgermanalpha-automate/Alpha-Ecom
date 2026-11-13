import type { FieldSpec } from "@/lib/cms/validate";

type Guide = NonNullable<FieldSpec["guide"]>;

/**
 * "Where does this show up?" panel shown at the top of each dashboard section:
 * a diagram key (see components/admin/guide.tsx) plus numbered directions.
 * Marketplaces and Text sizes carry their guides on individual fields instead.
 */
export const COLLECTION_GUIDES: Record<string, Guide> = {
  settings: {
    diagram: "settings",
    title: "Site settings: details used all over the site",
    steps: [
      "Phone and email: the dark bar at the very top, the Contact page and the footer.",
      "Address, office hours and time zone: the footer and the Contact page.",
      "Social links: the round icons in the footer.",
      "Name is the brand name used in page titles and the copyright line. Url is the live site address; do not change it unless the domain changes.",
    ],
  },
  home: {
    diagram: "homeHero",
    title: "Home page: the first screen visitors see",
    steps: [
      "Badge: the small pill above the headline.",
      "Headline: Title lead, then the rotating words (one shows at a time), then Title tail.",
      "Subtitle: the sentence under the headline.",
      "Primary and secondary buttons.",
      "Interest, budget and source options: the dropdown choices in the contact form.",
    ],
  },
  about: {
    diagram: "about",
    title: "About Alpha: the block on the home page and About page",
    steps: [
      "Image, with the stat badge (value and label) on top of it.",
      "Small label and title.",
      "Paragraphs. Add one item per paragraph.",
      "Checklist: the short ticked points.",
      "Button text and link.",
    ],
  },
  sections: {
    diagram: "heading",
    title: "Section headings: the text above each block on the home page",
    steps: [
      "Small label: the short line in capitals.",
      "Title: the large heading.",
      "Intro line: the sentence under the heading.",
      "Each group below is one block of the page (Services, Why us, Case studies, FAQ and so on).",
    ],
  },
  seo: {
    diagram: "seo",
    title: "SEO: how each page looks in Google",
    steps: [
      "SEO title: the blue link. \" | Alpha Digital Solutions\" is added automatically, except on the home page.",
      "Meta description: the grey text under it. This is also the text shown when the page is shared.",
    ],
  },
  pages: {
    diagram: "hero",
    title: "Page banners: the dark banner at the top of each inner page",
    steps: [
      "Banner title, with the small label above it.",
      "Banner intro line. The image is the photo behind the banner.",
      "Bottom banner title and text change the closing banner near the end of that page.",
    ],
  },
  footer: {
    diagram: "footer",
    title: "Footer: the bottom of every page",
    steps: [
      "Strip: the title, short text and button just above the footer.",
      "Newsletter heading.",
      "Link columns: each column has a heading and a list of links.",
    ],
  },
  legal: {
    diagram: "legal",
    title: "Legal pages: Privacy Policy and Terms & Conditions",
    steps: [
      "Last updated date, shown in the box on the left.",
      "Section title. The numbered list on the left is built from these.",
      "Paragraphs. Start a line with \"- \" to make it a bullet point.",
    ],
  },
  capabilities: {
    diagram: "tabs",
    title: "Capabilities: the \"What we handle\" tabs",
    steps: [
      "Label and icon: the tab button.",
      "Heading shown when the tab is open.",
      "Description.",
      "Points: the short list beside it.",
    ],
  },
  "case-studies": {
    diagram: "caseStudy",
    title: "Case studies: the project cards",
    steps: [
      "Image.",
      "Category and marketplace logo. The category is also the filter button on the Case Studies page.",
      "Title.",
      "Excerpt: the short text on the card. Description is the longer text shown when the project is opened.",
    ],
  },
  testimonials: {
    diagram: "testimonial",
    title: "Testimonials: the client review cards",
    steps: [
      "Quote.",
      "Rating: the number of stars (1 to 5).",
      "Name, role and company. Initials show in the round badge.",
    ],
  },
  insights: {
    diagram: "blogCard",
    title: "Insights: blog articles",
    steps: [
      "Image: used on the card and at the top of the article.",
      "Category, date and reading time.",
      "Title.",
      "Excerpt: the short text on the card.",
      "Body: the article. Start a line with \"## \" for a heading or \"- \" for a bullet point.",
    ],
  },
  faqs: {
    diagram: "faq",
    title: "FAQs: the question list on the home page",
    steps: ["The heading is edited under Section headings.", "Question and answer. One entry per question."],
  },
  offices: {
    diagram: "flags",
    title: "Offices: the \"Serving brands in\" country pills",
    steps: ["Flag: the two-letter country code (US, GB, AE).", "Country name."],
  },
  "why-us": {
    diagram: "featureCards",
    title: "Why-us points: the reasons cards on the home page",
    steps: ["Icon.", "Title.", "Description."],
  },
  process: {
    diagram: "steps",
    title: "Process steps: the numbered \"how we work\" steps",
    steps: ["Number.", "Title, with its icon.", "Description."],
  },
  awards: {
    diagram: "badges",
    title: "Awards & badges: the moving row of badges",
    steps: ["Icon or logo. A logo replaces the icon when one is set.", "Title.", "Subtitle."],
  },
};

/** Guide for one group of fields inside the SEO section. */
export const SHARE_GUIDE: Guide = {
  diagram: "share",
  title: "Social sharing preview: the card shown when the home page is shared",
  steps: [
    "Preview image (1200 x 630 px). Used for every page.",
    "Preview title.",
    "Preview description. Other pages use their own SEO title and description here.",
  ],
};
