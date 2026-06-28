/**
 * Single source of truth for site content.
 * Alpha E-Commerce is a marketplace store-creation & management agency.
 * The six services we offer: Amazon, eBay, Etsy, OnBuy, TikTok Shop, Shopify.
 * Icons are string keys resolved through `@/lib/icons`.
 */

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
};

export const marketplaces: Marketplace[] = [
  {
    slug: "amazon",
    name: "Amazon",
    logo: "/amazon-logo-amazon-icon-transparent-free-png.webp",
    blurb: "Launch, optimize and scale your Amazon Seller Central or Vendor account.",
    description:
      "From a brand-new Seller Central account to a fully optimized catalog, we run your Amazon channel end to end — listings, A+ content, Brand Registry, PPC and account health.",
    features: [
      "Seller Central & FBA setup",
      "Listing & A+ content optimization",
      "Sponsored Products & DSP ads",
      "Brand Registry & account health",
    ],
    accent: "#FF9900",
    stat: { value: "3.2x", label: "Avg. revenue lift" },
  },
  {
    slug: "ebay",
    name: "eBay",
    logo: "/ebayjpg.jpg",
    blurb: "Full eBay store setup, listing optimization and Promoted Listings.",
    description:
      "We build and manage high-performing eBay stores — bulk listing, SEO-rich titles, Promoted Listings campaigns and best-match optimization that keeps you top of search.",
    features: [
      "Store design & setup",
      "Bulk listing & templates",
      "Promoted Listings management",
      "Best Match SEO optimization",
    ],
    accent: "#E53238",
    stat: { value: "+58%", label: "Search visibility" },
  },
  {
    slug: "etsy",
    name: "Etsy",
    logo: "/Etsy.png",
    blurb: "Etsy shop creation, SEO and ads for handmade & creative brands.",
    description:
      "We help makers and creative brands stand out on Etsy with keyword-rich listings, branded shop design, Etsy Ads management and a strategy tuned to the Etsy algorithm.",
    features: [
      "Shop branding & setup",
      "Listing SEO & tags",
      "Etsy Ads management",
      "Review & order growth",
    ],
    accent: "#F45800",
    stat: { value: "+41%", label: "Shop conversion" },
  },
  {
    slug: "onbuy",
    name: "OnBuy",
    logo: "/OnBuy.png",
    blurb: "Get selling fast on the UK's fastest-growing marketplace.",
    description:
      "OnBuy is one of the fastest-growing marketplaces in the UK. We handle onboarding, catalog integration, pricing strategy and Boost ads so you capture demand early.",
    features: [
      "Seller onboarding & setup",
      "Catalog & feed integration",
      "Competitive pricing strategy",
      "OnBuy Boost campaigns",
    ],
    accent: "#3E7BFA",
    stat: { value: "5 days", label: "Avg. time to live" },
  },
  {
    slug: "tiktok-shop",
    name: "TikTok Shop",
    logo: "/tiktokjpg.jpg",
    blurb: "Set up TikTok Shop and turn short-form content into sales.",
    description:
      "We launch your TikTok Shop, connect product catalogs, set up affiliate and live-shopping, and pair it with creator partnerships that turn views into checkout.",
    features: [
      "Shop setup & catalog sync",
      "Affiliate & creator program",
      "LIVE & video shopping",
      "Spark Ads management",
    ],
    accent: "#111111",
    stat: { value: "7.5%", label: "Live-stream CVR" },
  },
  {
    slug: "shopify",
    name: "Shopify",
    logo: "/Shopify.png",
    blurb: "Custom Shopify storefronts built to convert and easy to run.",
    description:
      "Your own branded home base — we design and build fast, conversion-focused Shopify stores, integrate apps and payments, and connect every marketplace back to one dashboard.",
    features: [
      "Custom theme design & build",
      "App, payment & shipping setup",
      "CRO & speed optimization",
      "Multichannel integration",
    ],
    accent: "#5E8E3E",
    stat: { value: "+47%", label: "Store conversion" },
  },
];

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
    href: "/services",
    columns: [
      {
        items: [
          { label: "Store Creation & Setup", href: "/services", description: "Launch on any marketplace, fast", icon: "store" },
          { label: "Listing & SEO", href: "/services", description: "Rank higher, convert more", icon: "search" },
          { label: "Advertising / PPC", href: "/services", description: "Profitable, managed ad spend", icon: "megaphone" },
        ],
      },
      {
        items: [
          { label: "Order & Inventory", href: "/services", description: "Stay in stock, ship on time", icon: "package" },
          { label: "Account Health", href: "/services", description: "Stay compliant and protected", icon: "shield-check" },
          { label: "Branding & Design", href: "/services", description: "Stores that look the part", icon: "palette" },
        ],
      },
    ],
  },
  { label: "Case Studies", href: "/portfolio" },
  { label: "About", href: "/about" },
];

/* ------------------------------------------------------------------ */
/* Hero / generic copy                                                 */
/* ------------------------------------------------------------------ */

export const hero = {
  badge: "Marketplace growth, handled end-to-end",
  titleLead: "We Create & Manage Your",
  titleRotators: ["Amazon", "eBay", "Etsy", "OnBuy", "TikTok Shop", "Shopify"],
  titleTail: "Store",
  subtitle:
    "Alpha E-Commerce builds, optimizes and runs your online stores across the world's biggest marketplaces — so you sell more and manage less.",
  primaryCta: { label: "Get a Free Quote", href: "/contact" },
  secondaryCta: { label: "View Case Studies", href: "/portfolio" },
};

/* ------------------------------------------------------------------ */
/* Awards / certifications (carousel)                                  */
/* ------------------------------------------------------------------ */

export type Award = { title: string; subtitle: string; icon: IconKey };

export const awards: Award[] = [
  { title: "Amazon SPN", subtitle: "Verified Service Provider", icon: "shield-check" },
  { title: "Shopify Partner", subtitle: "Certified Store Builder", icon: "store" },
  { title: "eBay Approved", subtitle: "Marketplace Partner", icon: "badge-check" },
  { title: "Top Rated 2026", subtitle: "Marketplace Agency", icon: "award" },
  { title: "5.0 on Clutch", subtitle: "120+ Reviews", icon: "star" },
  { title: "Meta & TikTok", subtitle: "Ads Partner", icon: "megaphone" },
];

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

export type Feature = { icon: IconKey; title: string; description: string };

export const whyUs: Feature[] = [
  {
    icon: "layers",
    title: "Truly end-to-end",
    description: "Setup, listings, ads, orders and support — one team handles your entire channel.",
  },
  {
    icon: "search",
    title: "Listings that rank",
    description: "Keyword-driven titles, rich content and SEO tuned to each marketplace's algorithm.",
  },
  {
    icon: "megaphone",
    title: "Profitable ad spend",
    description: "Data-led PPC management focused on ACoS, ROAS and real, sustainable margin.",
  },
  {
    icon: "shield-check",
    title: "Account health first",
    description: "We keep you compliant, protected from suspensions and ready to scale safely.",
  },
  {
    icon: "users-round",
    title: "A dedicated manager",
    description: "One expert who knows your business, with transparent weekly reporting.",
  },
];

/* ------------------------------------------------------------------ */
/* What we handle (platform tabs)                                      */
/* ------------------------------------------------------------------ */

export type CapabilityTab = { key: string; label: string; icon: IconKey; heading: string; description: string; points: string[] };

export const capabilities: CapabilityTab[] = [
  {
    key: "setup",
    label: "Store Creation",
    icon: "store",
    heading: "Launch on any marketplace, the right way",
    description: "We open and configure your store correctly from day one, so there's nothing to redo later.",
    points: ["Account registration & verification", "Catalog & category setup", "Tax, shipping & payment config", "Brand & storefront design"],
  },
  {
    key: "listing",
    label: "Listing & SEO",
    icon: "search",
    heading: "Listings engineered to rank and convert",
    description: "Every listing is built around the keywords your buyers actually search.",
    points: ["Keyword & competitor research", "Title, bullet & description copy", "Image & A+ / rich content", "Variation & catalog structure"],
  },
  {
    key: "ads",
    label: "Advertising",
    icon: "megaphone",
    heading: "Ad management focused on profit",
    description: "We manage spend toward your target ROAS — not vanity impressions.",
    points: ["Sponsored Products & Brands", "TikTok Spark & Promoted Listings", "Bid & budget optimization", "Weekly performance reporting"],
  },
  {
    key: "operations",
    label: "Orders & Inventory",
    icon: "package",
    heading: "Operations that just run",
    description: "Stay in stock and ship on time across every channel, from one place.",
    points: ["Inventory & restock planning", "Order & returns handling", "FBA / fulfillment coordination", "Multichannel sync"],
  },
  {
    key: "health",
    label: "Account Health",
    icon: "shield-check",
    heading: "Compliant, protected, scalable",
    description: "We monitor metrics and policy so a single issue never derails your growth.",
    points: ["Policy & compliance monitoring", "Suspension prevention & appeals", "Performance metric management", "Buyer-message & feedback handling"],
  },
  {
    key: "design",
    label: "Branding & Design",
    icon: "palette",
    heading: "Stores that look the part",
    description: "Cohesive branding that builds trust and lifts conversion across channels.",
    points: ["Storefront & banner design", "Listing image & infographics", "Brand guidelines & assets", "Shopify theme customization"],
  },
];

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

export type ProcessStep = { number: string; title: string; description: string; icon: IconKey };

export const processSteps: ProcessStep[] = [
  { number: "01", title: "Discovery & Audit", description: "We learn your goals and audit your products, channels and competitors.", icon: "search" },
  { number: "02", title: "Strategy & Setup", description: "We pick the right marketplaces and build your stores the right way.", icon: "pencil-ruler" },
  { number: "03", title: "Launch & Optimize", description: "Listings go live, ads switch on, and we tune for ranking and conversion.", icon: "rocket" },
  { number: "04", title: "Scale & Report", description: "We grow profitably and keep you informed with transparent weekly reports.", icon: "trending-up" },
];

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

export const projects: Project[] = [
  {
    slug: "northwind-home",
    title: "Northwind Home",
    category: "Amazon",
    marketplaceLogo: "/amazon-logo-amazon-icon-transparent-free-png.webp",
    tags: ["FBA", "PPC", "A+ Content"],
    excerpt: "Scaled a homeware brand from launch to 7 figures on Amazon.",
    description:
      "We rebuilt this homeware brand's Seller Central from the ground up — new A+ content, a restructured catalog and a profit-focused PPC program that tripled revenue in nine months.",
    image: "/portfolio/case-amazon.svg",
    results: [
      { label: "Revenue", value: "+212%" },
      { label: "ACoS", value: "-34%" },
    ],
  },
  {
    slug: "vintage-loft",
    title: "Vintage Loft",
    category: "eBay",
    marketplaceLogo: "/ebayjpg.jpg",
    tags: ["Bulk Listing", "Promoted Listings"],
    excerpt: "Turned a hobby eBay store into a full-time business.",
    description:
      "Bulk-listing automation, SEO-rich titles and a tuned Promoted Listings strategy took this reseller from a few sales a week to consistent daily order volume.",
    image: "/portfolio/case-ebay.svg",
    results: [
      { label: "Monthly orders", value: "6x" },
      { label: "Search visibility", value: "+73%" },
    ],
  },
  {
    slug: "maker-and-moss",
    title: "Maker & Moss",
    category: "Etsy",
    marketplaceLogo: "/Etsy.png",
    tags: ["Etsy SEO", "Etsy Ads"],
    excerpt: "Helped a handmade brand hit Star Seller status.",
    description:
      "A full shop rebrand, listing-SEO overhaul and disciplined Etsy Ads management lifted conversion and earned this maker Star Seller status within two quarters.",
    image: "/portfolio/case-etsy.svg",
    results: [
      { label: "Conversion", value: "+41%" },
      { label: "Star Seller", value: "Achieved" },
    ],
  },
  {
    slug: "brightline-tech",
    title: "Brightline Tech",
    category: "Shopify",
    marketplaceLogo: "/Shopify.png",
    tags: ["Shopify Build", "CRO"],
    excerpt: "A custom Shopify store that doubled conversion rate.",
    description:
      "We designed and built a fast, branded Shopify storefront, wired in every marketplace, and ran a CRO program that doubled the store's conversion rate at launch.",
    image: "/portfolio/case-shopify.svg",
    results: [
      { label: "Conversion", value: "2x" },
      { label: "Page speed", value: "-48%" },
    ],
  },
  {
    slug: "glow-collective",
    title: "Glow Collective",
    category: "TikTok Shop",
    marketplaceLogo: "/tiktokjpg.jpg",
    tags: ["TikTok Shop", "Creators"],
    excerpt: "Launched a beauty brand to viral TikTok sales.",
    description:
      "We set up TikTok Shop, recruited an affiliate creator network and ran LIVE shopping events that turned a new beauty brand into a repeatable, viral revenue channel.",
    image: "/portfolio/case-tiktok.svg",
    results: [
      { label: "Units / month", value: "18k+" },
      { label: "Creator ROAS", value: "4.6x" },
    ],
  },
  {
    slug: "harbor-goods",
    title: "Harbor Goods",
    category: "Amazon",
    marketplaceLogo: "/amazon-logo-amazon-icon-transparent-free-png.webp",
    tags: ["Multichannel", "Brand Registry"],
    excerpt: "Unified five channels under one managed program.",
    description:
      "We consolidated Amazon, eBay and Shopify into one managed, synced program — protecting margins, the brand and inventory while doubling total order volume.",
    image: "/portfolio/case-multichannel.svg",
    results: [
      { label: "Total orders", value: "2.1x" },
      { label: "Channels", value: "5 unified" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

export type Testimonial = { quote: string; name: string; role: string; company: string; rating: number; initials: string };

export const testimonials: Testimonial[] = [
  {
    quote:
      "Alpha took our messy Amazon account and turned it into our single biggest revenue channel. They genuinely run it like it's their own business.",
    name: "Sarah Mitchell",
    role: "Founder",
    company: "Northwind Home",
    rating: 5,
    initials: "SM",
  },
  {
    quote:
      "We went from a side-hustle eBay store to full-time income in months. The listing and Promoted Listings work paid for itself almost immediately.",
    name: "David Okafor",
    role: "Owner",
    company: "Vintage Loft",
    rating: 5,
    initials: "DO",
  },
  {
    quote:
      "Our Etsy shop finally looks and ranks the way it should. We hit Star Seller and haven't looked back. The team is responsive and truly cares.",
    name: "Elena Rossi",
    role: "Maker",
    company: "Maker & Moss",
    rating: 5,
    initials: "ER",
  },
  {
    quote:
      "The TikTok Shop launch was a different league. Creators, LIVE selling, ads — all handled. We sold out our first drop in a weekend.",
    name: "James Carter",
    role: "Co-founder",
    company: "Glow Collective",
    rating: 5,
    initials: "JC",
  },
];

/* ------------------------------------------------------------------ */
/* Timeline                                                            */
/* ------------------------------------------------------------------ */

export type Milestone = { year: string; title: string; description: string };

export const milestones: Milestone[] = [
  { year: "2013", title: "Alpha is founded", description: "We start out helping small brands sell on Amazon and eBay." },
  { year: "2016", title: "Etsy & Shopify added", description: "We expand into creative marketplaces and custom Shopify builds." },
  { year: "2019", title: "Full-service management", description: "We launch end-to-end account management and ad services." },
  { year: "2022", title: "OnBuy & TikTok Shop", description: "We add the fastest-growing UK and social marketplaces." },
  { year: "2026", title: "1,200+ stores launched", description: "Today we manage 9-figure annual sales across six marketplaces." },
];

/* ------------------------------------------------------------------ */
/* Insights / blog                                                     */
/* ------------------------------------------------------------------ */

export type Insight = { title: string; category: string; readingTime: string; excerpt: string };

export const insights: Insight[] = [
  {
    title: "How to win the Amazon Buy Box in 2026",
    category: "Amazon",
    readingTime: "6 min read",
    excerpt: "The pricing, fulfillment and account-health signals that decide who owns the Buy Box.",
  },
  {
    title: "TikTok Shop: a launch checklist for new brands",
    category: "TikTok Shop",
    readingTime: "5 min read",
    excerpt: "Everything you need to set up Shop, connect creators and run your first LIVE.",
  },
  {
    title: "Etsy SEO: ranking your listings the right way",
    category: "Etsy",
    readingTime: "7 min read",
    excerpt: "How tags, titles and attributes work together inside the Etsy search algorithm.",
  },
];

/* ------------------------------------------------------------------ */
/* Offices                                                             */
/* ------------------------------------------------------------------ */

export type Office = { country: string; flag: string; city: string; address: string };

export const offices: Office[] = [
  { country: "USA", flag: "🇺🇸", city: "Austin", address: "600 Congress Ave, Suite 1400, Austin, TX 78701" },
  { country: "UK", flag: "🇬🇧", city: "London", address: "1 Poultry, London EC2R 8EJ, United Kingdom" },
  { country: "UAE", flag: "🇦🇪", city: "Dubai", address: "Business Bay, Bay Square, Dubai, United Arab Emirates" },
  { country: "India", flag: "🇮🇳", city: "Jaipur", address: "5th Floor, Crystal Mall, Jaipur, Rajasthan 302017" },
];

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "Which marketplaces do you work with?",
    answer:
      "We create and manage stores on Amazon, eBay, Etsy, OnBuy, TikTok Shop and Shopify. We can run a single channel or manage all of them together from one place.",
  },
  {
    question: "Do you just set up the store, or manage it too?",
    answer:
      "Both. We can do a one-off store creation, or run your channel end-to-end — listings, advertising, orders, account health and reporting. Most clients choose ongoing management.",
  },
  {
    question: "How much does it cost?",
    answer:
      "It depends on the marketplaces and the level of management you need. After a short discovery call we'll send a clear, fixed proposal with no surprises.",
  },
  {
    question: "How quickly can my store go live?",
    answer:
      "A new marketplace store is typically live within 5–10 business days, depending on verification and catalog size. We'll give you an exact timeline up front.",
  },
  {
    question: "Can you fix or recover an existing account?",
    answer:
      "Yes. We regularly audit, clean up and recover under-performing or suspended accounts, then rebuild them into healthy, profitable channels.",
  },
];

/* ------------------------------------------------------------------ */
/* Contact form options                                                */
/* ------------------------------------------------------------------ */

export const interestOptions = [
  "Amazon",
  "eBay",
  "Etsy",
  "OnBuy",
  "TikTok Shop",
  "Shopify",
  "Multiple marketplaces",
];

export const budgetOptions = [
  "Under $1,000 / mo",
  "$1,000 – $2,500 / mo",
  "$2,500 – $5,000 / mo",
  "$5,000 – $10,000 / mo",
  "$10,000+ / mo",
];

export const sourceOptions = ["Google Search", "Social Media", "Referral", "Clutch / Reviews", "Other"];

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export type FooterColumn = { heading: string; links: { label: string; href: string }[] };

export const footerColumns: FooterColumn[] = [
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Case Studies", href: "/portfolio" },
      { label: "Careers", href: "/contact" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    heading: "Marketplaces",
    links: marketplaces.map((m) => ({ label: m.name, href: `/services#${m.slug}` })),
  },
  {
    heading: "What we do",
    links: [
      { label: "Store Creation", href: "/services" },
      { label: "Listing & SEO", href: "/services" },
      { label: "Advertising / PPC", href: "/services" },
      { label: "Account Management", href: "/services" },
    ],
  },
];
