"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ExternalLink, LogOut, Loader2, UploadCloud, Undo2, FileText, Database } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  discardDraft,
  getStatus,
  logout,
  publishDraft,
  type StatusInfo,
} from "@/components/admin/cms-client";

type NavItem = { id: string; label: string; mode: "object" | "list" };

type Ctx = { status: StatusInfo | null; refresh: () => void };
const StatusContext = React.createContext<Ctx>({ status: null, refresh: () => {} });
export const useCmsStatus = () => React.useContext(StatusContext);

export function AdminShell({ nav, children }: { nav: NavItem[]; children: React.ReactNode }) {
  const pathname = usePathname();
  const [status, setStatus] = React.useState<StatusInfo | null>(null);

  const refresh = React.useCallback(() => {
    getStatus()
      .then(setStatus)
      .catch(() => setStatus(null));
  }, []);

  React.useEffect(() => {
    if (pathname === "/admin/login") return;
    refresh();
  }, [pathname, refresh]);

  // The login page renders without the admin chrome.
  if (pathname === "/admin/login") return <>{children}</>;

  const objects = nav.filter((n) => n.mode === "object");
  const lists = nav.filter((n) => n.mode === "list");

  return (
    <StatusContext.Provider value={{ status, refresh }}>
      <div className="min-h-dvh bg-aster-50">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-white px-4 sm:px-6">
          <Link href="/admin" className="flex items-center gap-2 font-display font-extrabold text-navy">
            Alpha<span className="text-habanero">.</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">CMS</span>
          </Link>
          <div className="flex items-center gap-2 text-sm">
            {status ? (
              <span className="hidden items-center gap-1.5 rounded-full bg-aster-100 px-3 py-1 text-xs font-semibold text-aster-700 sm:inline-flex">
                {status.mode === "github" ? "GitHub" : "Local"} mode
              </span>
            ) : null}
            <Link href="/" target="_blank" className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium text-navy hover:bg-aster-100">
              <ExternalLink className="size-4" /> View site
            </Link>
            <LogoutButton />
          </div>
        </header>

        <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6">
          <aside className="hidden w-56 shrink-0 lg:block">
            <nav className="sticky top-20 space-y-6">
              <Link
                href="/admin"
                className={cn(
                  "block rounded-lg px-3 py-2 text-sm font-semibold",
                  pathname === "/admin" ? "bg-navy text-white" : "text-navy hover:bg-aster-100"
                )}
              >
                Dashboard
              </Link>
              <NavGroup title="Site" icon={<FileText className="size-3.5" />} items={objects} pathname={pathname} />
              <NavGroup title="Collections" icon={<Database className="size-3.5" />} items={lists} pathname={pathname} />
            </nav>
          </aside>

          <main className="min-w-0 flex-1 pb-28">{children}</main>
        </div>

        <PublishBar />
      </div>
    </StatusContext.Provider>
  );
}

function NavGroup({
  title,
  icon,
  items,
  pathname,
}: {
  title: string;
  icon: React.ReactNode;
  items: NavItem[];
  pathname: string;
}) {
  return (
    <div>
      <p className="mb-1.5 flex items-center gap-1.5 px-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {icon} {title}
      </p>
      <ul className="space-y-0.5">
        {items.map((n) => {
          const active = pathname === `/admin/${n.id}` || pathname.startsWith(`/admin/${n.id}/`);
          return (
            <li key={n.id}>
              <Link
                href={`/admin/${n.id}`}
                className={cn(
                  "block rounded-lg px-3 py-1.5 text-sm font-medium",
                  active ? "bg-aster-100 text-aster-700" : "text-navy/80 hover:bg-aster-100"
                )}
              >
                {n.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function LogoutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={async () => {
        await logout().catch(() => {});
        router.push("/admin/login");
        router.refresh();
      }}
      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium text-navy hover:bg-aster-100"
    >
      <LogOut className="size-4" /> Logout
    </button>
  );
}

function PublishBar() {
  const { status, refresh } = useCmsStatus();
  const [busy, setBusy] = React.useState<"publish" | "discard" | null>(null);
  const [msg, setMsg] = React.useState<string | null>(null);

  if (!status || status.mode !== "github" || status.pending <= 0) return null;

  async function run(kind: "publish" | "discard") {
    if (kind === "discard" && !window.confirm("Discard all unpublished changes?")) return;
    setBusy(kind);
    setMsg(null);
    try {
      if (kind === "publish") {
        await publishDraft();
        setMsg("Published — the site is rebuilding.");
      } else {
        await discardDraft();
        setMsg("Drafts discarded.");
      }
      refresh();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Action failed");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-3 sm:flex-row sm:items-center sm:px-6">
        <p className="text-sm text-navy">
          <span className="font-bold text-habanero">{status.pending}</span> unpublished change
          {status.pending === 1 ? "" : "s"}
          {msg ? <span className="ml-2 text-muted-foreground">· {msg}</span> : null}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => run("discard")}
            disabled={busy !== null}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold text-navy hover:border-destructive hover:text-destructive disabled:opacity-60"
          >
            {busy === "discard" ? <Loader2 className="size-4 animate-spin" /> : <Undo2 className="size-4" />} Discard
          </button>
          <button
            type="button"
            onClick={() => run("publish")}
            disabled={busy !== null}
            className="inline-flex items-center gap-1.5 rounded-full bg-habanero px-5 py-2 text-sm font-semibold text-white shadow-glow hover:bg-aster hover:text-navy disabled:opacity-60"
          >
            {busy === "publish" ? <Loader2 className="size-4 animate-spin" /> : <UploadCloud className="size-4" />}
            Publish {status.pending}
          </button>
        </div>
      </div>
    </div>
  );
}
