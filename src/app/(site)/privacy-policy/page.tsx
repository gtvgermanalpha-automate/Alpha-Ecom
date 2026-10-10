import type { Metadata } from "next";

import { siteConfig, fullAddress } from "@/lib/site";
import { LegalPage, type LegalSection } from "@/components/shared/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, stores and protects your personal information when you use our website and services.`,
  alternates: { canonical: "/privacy-policy" },
};

const UPDATED = "10 October 2026";

const sections: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    body: [
      `${siteConfig.legalName}, trading as ${siteConfig.name} ("we", "us", "our"), respects your privacy and is committed to protecting your personal information. This Privacy Policy explains what information we collect when you visit our website or engage our marketplace store creation and management services, how we use it, and the choices you have.`,
      "By using our website or services you agree to the practices described in this policy. If you do not agree, please do not use the website or submit your information to us.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: [
      "We collect information you give us directly and information collected automatically when you use the website.",
      [
        "Contact details — your name, email address, phone number, company name and website when you complete our contact form, request a quote or book a consultation.",
        "Project information — details about your products, marketplaces, goals, budget and any files you attach to an enquiry.",
        "Newsletter data — your email address when you subscribe to our newsletter.",
        "Account and store data — where you engage us to create or manage a store, information needed to perform the work, such as marketplace account access you grant us, product catalogues, pricing, order and advertising data.",
        "Technical data — IP address, browser type, device, pages visited and referring URLs, collected through server logs and analytics cookies.",
      ],
    ],
  },
  {
    id: "how-we-use-information",
    title: "How we use your information",
    body: [
      "We use your information to:",
      [
        "Respond to your enquiries and provide quotes, proposals and consultations.",
        "Deliver, manage and improve the services you engage us for.",
        "Send our newsletter and marketing communications where you have opted in. You can unsubscribe at any time.",
        "Operate, secure and improve our website and understand how it is used.",
        "Comply with legal obligations and enforce our agreements.",
      ],
      "We do not sell your personal information to third parties.",
    ],
  },
  {
    id: "legal-basis",
    title: "Legal basis for processing",
    body: [
      "Where data-protection laws such as the UK GDPR or EU GDPR apply, we process your information on the basis of your consent (for example, newsletter subscriptions), the performance of a contract with you (delivering our services), our legitimate interests (responding to enquiries, securing and improving the website) and compliance with legal obligations.",
    ],
  },
  {
    id: "sharing",
    title: "How we share information",
    body: [
      "We share personal information only with trusted service providers who help us run our business, and only to the extent necessary:",
      [
        "Email delivery providers that send our transactional emails, enquiry notifications and newsletters.",
        "Hosting and infrastructure providers that serve this website.",
        "Marketplace platforms (such as Amazon, eBay, Etsy, OnBuy, TikTok Shop and Shopify) when we act on your behalf within accounts you have authorised us to manage.",
        "Professional advisers, regulators or law enforcement where required by law.",
      ],
      "Our providers are contractually required to protect your information and use it only for the services they provide to us.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and analytics",
    body: [
      "Our website uses strictly necessary cookies to function, and may use analytics cookies to understand how visitors use the site so we can improve it. You can control cookies through your browser settings; disabling some cookies may affect how the site works.",
    ],
  },
  {
    id: "retention",
    title: "Data retention",
    body: [
      "We keep personal information only for as long as needed for the purposes described above. Enquiry data is generally retained for up to 24 months after our last contact with you; client data is retained for the duration of our engagement and for any period required by law or to resolve disputes. Newsletter data is kept until you unsubscribe.",
    ],
  },
  {
    id: "security",
    title: "Security",
    body: [
      "We use appropriate technical and organisational measures to protect your information, including encrypted connections (HTTPS), access controls and reputable third-party providers. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.",
    ],
  },
  {
    id: "international-transfers",
    title: "International transfers",
    body: [
      "We serve clients in the USA, UK and UAE and may process information in countries other than your own. Where we transfer information internationally we take steps to ensure it receives an adequate level of protection, such as using providers that offer appropriate contractual safeguards.",
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: [
      "Depending on where you live, you may have the right to:",
      [
        "Access the personal information we hold about you.",
        "Ask us to correct inaccurate or incomplete information.",
        "Ask us to delete your information, subject to legal exceptions.",
        "Object to or restrict certain processing, including direct marketing.",
        "Withdraw consent at any time where processing is based on consent.",
        "Lodge a complaint with your local data-protection authority.",
      ],
      `To exercise any of these rights, email ${siteConfig.email}. We will respond within the timeframe required by applicable law.`,
    ],
  },
  {
    id: "children",
    title: "Children",
    body: [
      "Our website and services are intended for businesses and individuals aged 18 or over. We do not knowingly collect information from children. If you believe a child has provided us with personal information, please contact us and we will delete it.",
    ],
  },
  {
    id: "third-party-links",
    title: "Third-party links",
    body: [
      "Our website may link to third-party websites, including marketplace platforms and social networks. We are not responsible for the privacy practices of those sites and encourage you to read their policies.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: [
      'We may update this Privacy Policy from time to time. The "Last updated" date at the top of this page shows when it was last revised. Significant changes will be highlighted on this page.',
    ],
  },
  {
    id: "contact",
    title: "Contact us",
    body: [
      `If you have questions about this Privacy Policy or how we handle your information, contact ${siteConfig.legalName} at ${siteConfig.email} or ${siteConfig.phone}, or write to our head office at ${fullAddress}.`,
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      description="How we collect, use and protect your information when you use our website and services."
      updated={UPDATED}
      sections={sections}
    />
  );
}
