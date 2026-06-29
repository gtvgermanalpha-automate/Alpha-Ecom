import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

import { footerColumns, offices } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/layout/logo";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icons";

const socials = [
  { key: "linkedin", href: siteConfig.social.linkedin, label: "LinkedIn" },
  { key: "twitter", href: siteConfig.social.twitter, label: "Twitter / X" },
  { key: "instagram", href: siteConfig.social.instagram, label: "Instagram" },
  { key: "facebook", href: siteConfig.social.facebook, label: "Facebook" },
  { key: "youtube", href: siteConfig.social.youtube, label: "YouTube" },
];

export function Footer() {
  const year = 2026;

  return (
    <footer className="bg-navy text-white">
      {/* Consultation strip */}
      <div className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-aster/25 blur-3xl" aria-hidden />
        <Container className="relative flex flex-col items-center justify-between gap-6 py-12 text-center lg:flex-row lg:text-left">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Ready to grow on every marketplace?
            </h2>
            <p className="mt-2 text-white/70">
              Book a free 60-minute consultation — no pressure, just a plan.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {offices.map((o) => (
              <span
                key={o.country}
                className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/80 transition-colors hover:border-aster hover:text-aster"
              >
                {o.flag} {o.country}
              </span>
            ))}
            <Button asChild size="lg" className="ml-1">
              <Link href="/contact">
                Get a Free Quote <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </div>

      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo inverted />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">{siteConfig.description}</p>
            <NewsletterForm />
            <div className="mt-6 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-10 place-items-center rounded-full border border-white/15 text-white/80 transition-all hover:-translate-y-0.5 hover:border-aster hover:bg-aster hover:text-navy"
                >
                  <Icon name={s.key} className="size-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {footerColumns.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">{col.heading}</h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-white/65 transition-colors hover:text-aster">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-6 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {offices.map((office) => (
            <div key={office.country} className="flex gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-aster-700" />
              <div>
                <p className="text-sm font-semibold text-white">
                  {office.flag} {office.country} — {office.city}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-white/60">{office.address}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-white/55">
            © {siteConfig.foundedYear}–{year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-white/55">
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-1.5 hover:text-aster">
              <Mail className="size-3.5" /> {siteConfig.email}
            </a>
            <a href={`tel:${siteConfig.phoneHref}`} className="flex items-center gap-1.5 hover:text-aster">
              <Phone className="size-3.5" /> {siteConfig.phone}
            </a>
          </div>
          <div className="flex items-center gap-4 text-xs text-white/55">
            <Link href="/" className="hover:text-aster">Privacy</Link>
            <Link href="/" className="hover:text-aster">Terms</Link>
            <Link href="/" className="hover:text-aster">Sitemap</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
