"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Phone, Mail } from "lucide-react";

import { cn } from "@/lib/utils";
import { mainNav } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { Icon } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Logo } from "@/components/layout/logo";

export function MobileNav({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  React.useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div className={cn("xl:hidden", open ? "" : "pointer-events-none")} aria-hidden={!open}>
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-50 bg-navy/50 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0"
        )}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-[min(22rem,90vw)] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid size-10 place-items-center rounded-full text-navy transition-colors hover:bg-aster-100"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
          <Accordion type="multiple" className="w-full">
            {mainNav.map((item) =>
              item.columns ? (
                <AccordionItem key={item.label} value={item.label} className="border-border">
                  <AccordionTrigger className="px-2 text-base">{item.label}</AccordionTrigger>
                  <AccordionContent className="pr-2">
                    <div className="flex flex-col gap-1">
                      {item.columns.flatMap((col) => col.items).map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={onClose}
                          className="flex items-center gap-3 rounded-xl px-2 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-aster-50 hover:text-navy"
                        >
                          {child.logo ? (
                            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white p-1 ring-1 ring-border">
                              <Image src={child.logo} alt="" width={32} height={32} className="size-full object-contain" />
                            </span>
                          ) : child.icon ? (
                            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-aster-100 text-aster-700">
                              <Icon name={child.icon} className="size-4" />
                            </span>
                          ) : null}
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center border-b border-border px-2 py-5 text-base font-semibold transition-colors",
                    pathname === item.href ? "text-aster-700" : "text-navy hover:text-aster-700"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </Accordion>
        </nav>

        <div className="space-y-3 border-t border-border p-5">
          <Button asChild size="lg" className="w-full">
            <Link href="/contact" onClick={onClose}>
              Get a Free Quote
            </Link>
          </Button>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <a href={`tel:${siteConfig.phoneHref}`} className="flex items-center gap-2 hover:text-aster-700">
              <Phone className="size-4 text-aster-700" /> {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 hover:text-aster-700">
              <Mail className="size-4 text-aster-700" /> {siteConfig.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
