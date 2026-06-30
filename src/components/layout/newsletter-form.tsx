"use client";

import * as React from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "done" | "error";

/** Newsletter capture — posts to /api/newsletter (Resend). */
export function NewsletterForm() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
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
            if (status !== "loading") setStatus("idle");
          }}
          placeholder="you@company.com"
          className="h-11 w-full min-w-0 rounded-full border border-white/15 bg-white/10 px-4 text-sm text-white placeholder:text-white/50 outline-none transition-colors focus-visible:border-aster focus-visible:ring-[3px] focus-visible:ring-aster/40"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          disabled={status === "loading"}
          className={cn(
            "grid size-11 shrink-0 place-items-center rounded-full bg-habanero text-white transition-all hover:bg-aster hover:text-navy disabled:opacity-70",
            !valid && status !== "loading" && "opacity-60"
          )}
        >
          {status === "loading" ? (
            <Loader2 className="size-5 animate-spin" />
          ) : status === "done" ? (
            <Check className="size-5" />
          ) : (
            <ArrowRight className="size-5" />
          )}
        </button>
      </div>
      <p className="mt-2 h-4 text-xs text-white/60" aria-live="polite">
        {status === "done"
          ? "Thanks! You're subscribed."
          : status === "error"
            ? "Something went wrong — please try again."
            : ""}
      </p>
    </form>
  );
}
