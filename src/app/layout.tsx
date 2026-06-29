import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import "./globals.css";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

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
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn(inter.variable, montserrat.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-background antialiased">{children}</body>
    </html>
  );
}
