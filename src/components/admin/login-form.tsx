"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

import { login } from "@/components/admin/cms-client";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await login(password);
      router.push("/admin");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login failed");
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-dvh place-items-center bg-aster-50 px-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-3xl border border-border bg-white p-8 shadow-card">
        <span className="grid size-12 place-items-center rounded-2xl bg-habanero text-white">
          <Lock className="size-6" />
        </span>
        <h1 className="mt-5 font-display text-2xl font-extrabold text-navy">
          Alpha<span className="text-habanero">.</span> CMS
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Sign in to manage site content.</p>

        <label className="mt-6 block text-sm font-semibold text-navy">
          Password
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-navy outline-none focus:border-aster focus:ring-2 focus:ring-aster/30"
          />
        </label>

        {error ? <p className="mt-3 whitespace-pre-wrap text-sm text-destructive">{error}</p> : null}

        <button
          type="submit"
          disabled={busy || !password}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-habanero px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-aster hover:text-navy disabled:opacity-60"
        >
          {busy ? <Loader2 className="size-4 animate-spin" /> : null}
          Sign in
        </button>
      </form>
    </div>
  );
}
