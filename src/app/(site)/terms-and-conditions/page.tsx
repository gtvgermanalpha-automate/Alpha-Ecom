import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";
import { LegalPage, type LegalSection } from "@/components/shared/legal-page";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The terms that govern your use of the ${siteConfig.name} website and our marketplace store creation and management services.`,
  alternates: { canonical: "/terms-and-conditions" },
};

const UPDATED = "10 October 2026";

const sections: LegalSection[] = [
  {
    id: "agreement",
    title: "Agreement to these terms",
    body: [
      `These Terms & Conditions ("Terms") govern your use of the ${siteConfig.name} website and the services provided by ${siteConfig.legalName}, trading as ${siteConfig.name} ("we", "us", "our"). By accessing the website or engaging our services you agree to be bound by these Terms and our Privacy Policy.`,
      "Where you sign a separate proposal, statement of work or service agreement with us, that document takes precedence over these Terms to the extent of any conflict.",
    ],
  },
  {
    id: "services",
    title: "Our services",
    body: [
      "We provide marketplace store creation and management services across Amazon, eBay, Etsy, OnBuy, TikTok Shop and Shopify, including store setup, listing optimisation, advertising management, order and inventory support and account health management.",
      "The scope, deliverables, timelines and fees for any engagement are set out in the proposal or agreement we issue to you. Work outside the agreed scope will be quoted separately.",
    ],
  },
  {
    id: "client-responsibilities",
    title: "Your responsibilities",
    body: [
      "To allow us to deliver the services you agree to:",
      [
        "Provide accurate, complete and timely information, content, product data and approvals.",
        "Grant and maintain the marketplace account access we reasonably need, and keep that access secure.",
        "Hold all rights, licences and permissions for the products, brands, images and content you ask us to use.",
        "Comply with the policies of each marketplace and with all applicable laws, including consumer, tax and product-safety requirements.",
        "Pay our fees on time in accordance with the agreed payment terms.",
      ],
    ],
  },
  {
    id: "marketplace-accounts",
    title: "Marketplace accounts and third-party platforms",
    body: [
      "Marketplace accounts remain yours at all times. We act on your behalf within the permissions you grant us. Marketplaces are operated by independent third parties whose policies, fees, algorithms and decisions (including listing removals, account suspensions and Buy Box eligibility) are outside our control.",
      "We will use reasonable skill and care to keep your account compliant, but we do not guarantee any particular ranking, sales volume, approval, reinstatement or outcome on any platform.",
    ],
  },
  {
    id: "fees",
    title: "Fees and payment",
    body: [
      "Fees are stated in your proposal or agreement and are exclusive of taxes unless stated otherwise. Advertising spend, marketplace fees, subscription fees and other third-party costs are payable by you in addition to our fees unless we agree otherwise in writing.",
      "Invoices are due by the date shown on the invoice. We may suspend work on overdue accounts and charge reasonable interest and recovery costs on late payments. Fees paid for work already performed are non-refundable.",
    ],
  },
  {
    id: "term",
    title: "Term and termination",
    body: [
      "Ongoing management services continue for the period stated in your agreement and renew automatically unless either party gives the notice set out there (30 days by default). Either party may terminate immediately if the other commits a material breach that is not remedied within 14 days of written notice.",
      "On termination you remain liable for fees for work performed up to the termination date, and we will hand back any account access, credentials and materials belonging to you.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    body: [
      "You retain ownership of your brand, products, content and data. Upon full payment, you own the deliverables we create specifically for you (such as listing copy, images and store designs).",
      "We retain ownership of our methods, templates, tools, know-how and any pre-existing materials, and grant you a licence to use them as part of the deliverables. The website, its design and its content are owned by us and may not be copied or reused without permission.",
      "You grant us permission to reference you as a client and to showcase non-confidential results in our portfolio unless you tell us otherwise in writing.",
    ],
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    body: [
      "Each party will keep the other's confidential information (including pricing, sales data, credentials and business plans) secure and use it only to perform or receive the services. This obligation survives termination of our engagement.",
    ],
  },
  {
    id: "website-use",
    title: "Use of the website",
    body: [
      "You may use our website for lawful purposes only. You must not attempt to gain unauthorised access to any part of the site, interfere with its operation, scrape its content or submit false or misleading information through our forms.",
      'The website is provided on an "as is" basis. We aim to keep it available and accurate but do not guarantee uninterrupted access or that all content is error-free.',
    ],
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: [
      "To the fullest extent permitted by law, we are not liable for any indirect, consequential or special loss, loss of profit, revenue, sales or goodwill, or for losses caused by marketplace decisions, platform outages, changes to third-party policies or your failure to meet your responsibilities.",
      "Our total liability to you arising from any engagement is limited to the fees you paid us for that engagement in the 12 months before the event giving rise to the claim. Nothing in these Terms limits liability that cannot be limited by law, including for fraud or death or personal injury caused by negligence.",
    ],
  },
  {
    id: "indemnity",
    title: "Indemnity",
    body: [
      "You agree to indemnify us against claims, losses and costs arising from the products you sell, the content and materials you supply, your breach of marketplace policies or applicable law, or your breach of these Terms.",
    ],
  },
  {
    id: "general",
    title: "General",
    body: [
      "These Terms, together with your proposal or agreement and our Privacy Policy, form the entire agreement between us. If any provision is found unenforceable the remainder continues in effect. Neither party is liable for delays caused by events beyond its reasonable control. We may update these Terms from time to time; the version published on this page at the time of your engagement applies.",
      `These Terms are governed by the laws of the jurisdiction in which ${siteConfig.legalName} is registered, and the courts of that jurisdiction have exclusive jurisdiction over any dispute, unless your service agreement states otherwise.`,
    ],
  },
  {
    id: "contact",
    title: "Contact us",
    body: [
      `Questions about these Terms? Contact ${siteConfig.legalName} at ${siteConfig.email} or ${siteConfig.phone}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms & Conditions"
      description="The terms that govern your use of our website and our marketplace services."
      updated={UPDATED}
      sections={sections}
    />
  );
}
