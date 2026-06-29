"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Loader2, Pencil, Plus, Trash2, AlertCircle } from "lucide-react";

import {
  createEntry,
  deleteEntry,
  getContent,
  saveEntry,
  saveObject,
  type CollectionMeta,
} from "@/components/admin/cms-client";
import { ObjectForm } from "@/components/admin/fields";
import { useCmsStatus } from "@/components/admin/admin-shell";

type Save = "idle" | "saving" | "saved" | "error";

/** Edits an object collection, or a single entry of a list collection (when `slug` is given). */
export function CollectionEditor({ id, slug }: { id: string; slug?: string }) {
  const { refresh } = useCmsStatus();
  const [meta, setMeta] = React.useState<CollectionMeta | null>(null);
  const [value, setValue] = React.useState<Record<string, unknown>>({});
  const [save, setSave] = React.useState<Save>("idle");
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let active = true;
    getContent(id)
      .then((m) => {
        if (!active) return;
        setMeta(m);
        if (m.mode === "object") {
          setValue((m.data as Record<string, unknown>) ?? {});
        } else {
          const idField = m.idField ?? "slug";
          const entry = (m.data as Record<string, unknown>[]).find((e) => e?.[idField] === slug);
          setValue(entry ?? {});
        }
      })
      .catch((e) => setError(e.message));
    return () => {
      active = false;
    };
  }, [id, slug]);

  async function onSave() {
    if (!meta) return;
    setSave("saving");
    setError(null);
    try {
      if (meta.mode === "object") await saveObject(id, value, meta.sha);
      else await saveEntry(id, value, meta.sha);
      // refresh sha so subsequent saves don't 409
      const fresh = await getContent(id);
      setMeta(fresh);
      setSave("saved");
      refresh();
      setTimeout(() => setSave("idle"), 2000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
      setSave("error");
    }
  }

  if (error && !meta) return <Notice kind="error">{error}</Notice>;
  if (!meta) return <Loading />;

  const idField = meta.idField ?? "slug";
  const isList = meta.mode === "list";

  return (
    <div className="mx-auto max-w-3xl">
      {isList ? (
        <Link href={`/admin/${id}`} className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-aster-700">
          <ArrowLeft className="size-4" /> Back to {meta.label}
        </Link>
      ) : null}

      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">{meta.label}</h1>
          {isList ? <p className="text-sm text-muted-foreground">{slug}</p> : null}
        </div>
        <SaveButton state={save} onClick={onSave} />
      </div>

      {error ? <Notice kind="error" className="mb-4">{error}</Notice> : null}

      <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
        <ObjectForm
          fields={meta.fields}
          value={value}
          onChange={setValue}
          hiddenKeys={isList ? [idField] : []}
        />
      </div>

      <div className="mt-6 flex justify-end">
        <SaveButton state={save} onClick={onSave} />
      </div>
    </div>
  );
}

/** Lists the entries of a list collection with New / Edit / Delete. */
export function CollectionIndex({ id }: { id: string }) {
  const router = useRouter();
  const { refresh } = useCmsStatus();
  const [meta, setMeta] = React.useState<CollectionMeta | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  const load = React.useCallback(() => {
    getContent(id)
      .then(setMeta)
      .catch((e) => setError(e.message));
  }, [id]);

  React.useEffect(() => load(), [load]);

  async function onNew() {
    setBusy(true);
    try {
      const title = window.prompt(`New ${meta?.label ?? "entry"} — title?`)?.trim();
      if (!title) return;
      const { slug } = await createEntry(id, title);
      refresh();
      router.push(`/admin/${id}/${slug}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Create failed");
    } finally {
      setBusy(false);
    }
  }

  async function onDelete(slug: string) {
    if (!window.confirm(`Delete "${slug}"? This can be discarded before publishing.`)) return;
    try {
      await deleteEntry(id, slug);
      refresh();
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  }

  if (error && !meta) return <Notice kind="error">{error}</Notice>;
  if (!meta) return <Loading />;

  const idField = meta.idField ?? "slug";
  const titleField = meta.fields.find((f) => f.key !== idField)?.key ?? idField;
  const entries = (meta.data as Record<string, unknown>[]) ?? [];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">{meta.label}</h1>
          <p className="text-sm text-muted-foreground">{entries.length} entries</p>
        </div>
        <button
          type="button"
          onClick={onNew}
          disabled={busy}
          className="inline-flex items-center gap-1.5 rounded-full bg-habanero px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-aster hover:text-navy disabled:opacity-60"
        >
          {busy ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />} New
        </button>
      </div>

      {error ? <Notice kind="error" className="mb-4">{error}</Notice> : null}

      <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white">
        {entries.map((e) => {
          const slug = String(e[idField]);
          return (
            <li key={slug} className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate font-semibold text-navy">{String(e[titleField] ?? slug)}</p>
                <p className="truncate text-xs text-muted-foreground">{slug}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <Link
                  href={`/admin/${id}/${slug}`}
                  className="grid size-9 place-items-center rounded-lg border border-border text-navy transition-colors hover:border-aster hover:text-aster-700"
                  aria-label="Edit"
                >
                  <Pencil className="size-4" />
                </Link>
                <button
                  type="button"
                  onClick={() => onDelete(slug)}
                  className="grid size-9 place-items-center rounded-lg border border-border text-navy transition-colors hover:border-destructive hover:text-destructive"
                  aria-label="Delete"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function SaveButton({ state, onClick }: { state: Save; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={state === "saving"}
      className="inline-flex items-center gap-2 rounded-full bg-habanero px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-aster hover:text-navy disabled:opacity-60"
    >
      {state === "saving" ? (
        <>
          <Loader2 className="size-4 animate-spin" /> Saving…
        </>
      ) : state === "saved" ? (
        <>
          <Check className="size-4" /> Saved
        </>
      ) : (
        "Save"
      )}
    </button>
  );
}

function Notice({ kind, children, className }: { kind: "error"; children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex items-start gap-2 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive ${className ?? ""}`}>
      <AlertCircle className="mt-0.5 size-4 shrink-0" />
      <pre className="whitespace-pre-wrap font-sans">{children}</pre>
    </div>
  );
}

function Loading() {
  return (
    <div className="grid place-items-center py-20 text-muted-foreground">
      <Loader2 className="size-6 animate-spin" />
    </div>
  );
}
