"use client";

import * as React from "react";
import { ArrowRight, Check } from "lucide-react";

import { cn } from "@/lib/utils";

/** Lightweight, self-contained newsletter capture with optimistic success state. */
export function NewsletterForm() {
  const [email, setEmail] = React.useState("");
  const [done, setDone] = React.useState(false);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    setDone(true);
    setEmail("");
  }

  return (
    <form onSubmit={onSubmit} className="mt-4" noValidate>
      <label htmlFor="newsletter-email" className="text-sm font-semibold text-white">
        Get growth insights monthly
      </label>
      <div className="mt-2 flex gap-2">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setDone(false);
          }}
          placeholder="you@company.com"
          className="h-11 w-full min-w-0 rounded-full border border-white/15 bg-white/10 px-4 text-sm text-white placeholder:text-white/50 outline-none transition-colors focus-visible:border-aster focus-visible:ring-[3px] focus-visible:ring-aster/40"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className={cn(
            "grid size-11 shrink-0 place-items-center rounded-full bg-habanero text-white transition-all hover:bg-aster hover:text-navy",
            !valid && "opacity-60"
          )}
        >
          {done ? <Check className="size-5" /> : <ArrowRight className="size-5" />}
        </button>
      </div>
      <p className="mt-2 h-4 text-xs text-white/60" aria-live="polite">
        {done ? "Thanks! You're subscribed." : ""}
      </p>
    </form>
  );
}
