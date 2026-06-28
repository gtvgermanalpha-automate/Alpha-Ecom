"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Phone, Star, Mail } from "lucide-react";

import { cn } from "@/lib/utils";
import { mainNav, type NavItem } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { Icon } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top utility bar */}
      <div
        className={cn(
          "hidden overflow-hidden bg-navy text-white transition-all duration-300 lg:block",
          scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        )}
      >
        <Container className="flex h-10 items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <a href={`tel:${siteConfig.phoneHref}`} className="flex items-center gap-1.5 text-white/80 transition-colors hover:text-aster">
              <Phone className="size-3.5" /> {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-1.5 text-white/80 transition-colors hover:text-aster">
              <Mail className="size-3.5" /> {siteConfig.email}
            </a>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <span className="flex items-center gap-0.5 text-habanero">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </span>
            Rated 5.0 by 120+ sellers
          </div>
        </Container>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "border-b transition-all duration-300",
          scrolled ? "border-border bg-white/90 shadow-soft backdrop-blur-md" : "border-transparent bg-white"
        )}
      >
        <Container
          className={cn(
            "flex items-center justify-between gap-4 transition-all duration-300",
            scrolled ? "h-16" : "h-18"
          )}
        >
          <Logo priority />

          <nav aria-label="Primary" className="hidden items-center gap-1 xl:flex">
            {mainNav.map((item) =>
              item.columns ? (
                <NavDropdown key={item.label} item={item} pathname={pathname} />
              ) : (
                <NavLink key={item.label} href={item.href} active={isActive(pathname, item.href)}>
                  {item.label}
                </NavLink>
              )
            )}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild className="hidden sm:inline-flex">
              <Link href="/contact">Get a Free Quote</Link>
            </Button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="grid size-11 place-items-center rounded-full text-navy transition-colors hover:bg-aster-100 xl:hidden"
            >
              <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </Container>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} />
    </header>
  );
}

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

function NavLink({ href, active, children }: { href: string; active?: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "link-underline relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
        active ? "text-habanero" : "text-navy hover:text-navy"
      )}
    >
      {children}
    </Link>
  );
}

function NavDropdown({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = React.useState(false);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const openNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 110);
  };

  const hasLogos = item.columns?.some((c) => c.items.some((i) => i.logo));

  return (
    <div
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onFocus={openNow}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <Link
        href={item.href}
        aria-haspopup="true"
        aria-expanded={open}
        className={cn(
          "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
          isActive(pathname, item.href) ? "text-habanero" : "text-navy hover:text-navy"
        )}
      >
        {item.label}
        <ChevronDown className={cn("size-4 transition-transform duration-200", open && "rotate-180 text-habanero")} />
      </Link>

      <div
        className={cn(
          "absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition-all duration-200",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        )}
      >
        <div
          className={cn(
            "grid gap-1 rounded-2xl border border-border bg-white p-3 shadow-card sm:grid-cols-2",
            hasLogos ? "w-[min(94vw,44rem)]" : "w-[min(92vw,40rem)]"
          )}
          role="menu"
        >
          {item.columns?.map((col, ci) => (
            <div key={ci} className="flex flex-col gap-1">
              {col.heading ? (
                <p className="px-3 pb-1 pt-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {col.heading}
                </p>
              ) : null}
              {col.items.map((child) => (
                <Link
                  key={child.label}
                  href={child.href}
                  role="menuitem"
                  className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-aster-50"
                >
                  {child.logo ? (
                    <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-lg bg-white p-1.5 ring-1 ring-border">
                      <Image src={child.logo} alt="" width={40} height={40} className="size-full object-contain" />
                    </span>
                  ) : child.icon ? (
                    <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-lg bg-habanero-50 text-habanero transition-colors group-hover:bg-habanero group-hover:text-white">
                      <Icon name={child.icon} className="size-5" />
                    </span>
                  ) : null}
                  <span className="flex flex-col">
                    <span className="text-sm font-semibold text-navy group-hover:text-habanero">{child.label}</span>
                    {child.description ? (
                      <span className="text-xs leading-snug text-muted-foreground">{child.description}</span>
                    ) : null}
                  </span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
