import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import "./globals.css";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/shared/scroll-progress";

// Self-hosted (latin) variable fonts — no build-time network dependency.
const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "400 700",
  fallback: ["system-ui", "arial", "sans-serif"],
});

const montserrat = localFont({
  src: "./fonts/montserrat-latin.woff2",
  variable: "--font-montserrat",
  display: "swap",
  weight: "500 800",
  fallback: ["system-ui", "arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Amazon, eBay, Etsy, Shopify & TikTok Shop Store Management`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Amazon store management",
    "eBay store management",
    "Etsy shop setup",
    "OnBuy seller",
    "TikTok Shop setup",
    "Shopify store creation",
    "marketplace management agency",
    "marketplace PPC management",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Marketplace Store Creation & Management`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Marketplace Store Creation & Management`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#111144",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    foundingDate: String(siteConfig.foundedYear),
    sameAs: Object.values(siteConfig.social),
  };

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn(inter.variable, montserrat.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-background antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-glow"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
