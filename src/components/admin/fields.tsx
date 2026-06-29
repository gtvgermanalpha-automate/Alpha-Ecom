"use client";

import * as React from "react";
import { Plus, Trash2, ArrowUp, ArrowDown, ImageUp, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { limitFor } from "@/lib/cms/limits";
import { uploadImage, type FieldSpec } from "@/components/admin/cms-client";

const inputCls =
  "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-navy outline-none transition-colors focus:border-aster focus:ring-2 focus:ring-aster/30";

const IMAGE_KEYS = new Set(["logo", "image", "marketplaceLogo", "ogImage"]);

function FieldShell({
  field,
  value,
  children,
}: {
  field: FieldSpec;
  value?: unknown;
  children: React.ReactNode;
}) {
  const label = field.label ?? field.key;
  const max = field.max ?? limitFor(field.key);
  const len = typeof value === "string" ? value.length : null;
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between gap-2">
        <span className="text-sm font-semibold capitalize text-navy">
          {label}
          {field.required ? <span className="text-habanero"> *</span> : null}
        </span>
        {len !== null && (field.type === "string" || field.type === "text") ? (
          <span className={cn("text-xs", len > max ? "text-destructive" : "text-muted-foreground")}>
            {len}/{max}
          </span>
        ) : null}
      </span>
      {children}
      {field.format ? (
        <span className="mt-1 block text-xs text-muted-foreground">format: {field.format}</span>
      ) : null}
    </label>
  );
}

export function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FieldSpec;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  // Image fields (string keys that hold an asset path)
  if (field.type === "string" && IMAGE_KEYS.has(field.key)) {
    return (
      <FieldShell field={field} value={value}>
        <ImageField value={(value as string) ?? ""} onChange={onChange} />
      </FieldShell>
    );
  }

  switch (field.type) {
    case "string":
      if (field.enum) {
        return (
          <FieldShell field={field} value={value}>
            <select className={inputCls} value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)}>
              {field.enum.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </FieldShell>
        );
      }
      return (
        <FieldShell field={field} value={value}>
          <input className={inputCls} value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} />
        </FieldShell>
      );
    case "text":
      return (
        <FieldShell field={field} value={value}>
          <textarea
            className={cn(inputCls, "min-h-24 resize-y")}
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
          />
        </FieldShell>
      );
    case "number":
      return (
        <FieldShell field={field} value={value}>
          <input
            type="number"
            className={inputCls}
            value={value === undefined || value === null ? "" : (value as number)}
            onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
          />
        </FieldShell>
      );
    case "boolean":
      return (
        <label className="flex items-center gap-2 py-1">
          <input
            type="checkbox"
            className="size-4 accent-[var(--habanero)]"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
          />
          <span className="text-sm font-semibold capitalize text-navy">{field.label ?? field.key}</span>
        </label>
      );
    case "string[]":
      return (
        <FieldShell field={field}>
          <StringList values={(value as string[]) ?? []} onChange={onChange} max={field.max ?? limitFor(field.key)} />
        </FieldShell>
      );
    case "object":
      return (
        <fieldset className="rounded-xl border border-border bg-aster-50/50 p-4">
          <legend className="px-1 text-sm font-bold capitalize text-navy">{field.label ?? field.key}</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            {(field.fields ?? []).map((sf) => (
              <FieldInput
                key={sf.key}
                field={sf}
                value={(value as Record<string, unknown>)?.[sf.key]}
                onChange={(v) => onChange({ ...((value as object) ?? {}), [sf.key]: v })}
              />
            ))}
          </div>
        </fieldset>
      );
    case "object[]":
      return (
        <FieldShell field={field}>
          <ObjectArray
            items={(value as Record<string, unknown>[]) ?? []}
            fields={field.fields ?? []}
            onChange={onChange}
          />
        </FieldShell>
      );
    default:
      return null;
  }
}

function StringList({ values, onChange, max }: { values: string[]; onChange: (v: string[]) => void; max: number }) {
  const set = (i: number, v: string) => onChange(values.map((x, j) => (j === i ? v : x)));
  const remove = (i: number) => onChange(values.filter((_, j) => j !== i));
  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= values.length) return;
    const next = values.slice();
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <div className="space-y-2">
      {values.map((v, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <input className={inputCls} value={v} maxLength={max + 20} onChange={(e) => set(i, e.target.value)} />
          <IconBtn onClick={() => move(i, -1)} title="Move up"><ArrowUp className="size-4" /></IconBtn>
          <IconBtn onClick={() => move(i, 1)} title="Move down"><ArrowDown className="size-4" /></IconBtn>
          <IconBtn onClick={() => remove(i)} title="Remove" danger><Trash2 className="size-4" /></IconBtn>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...values, ""])}
        className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-1.5 text-sm font-medium text-navy hover:border-aster hover:text-aster-700"
      >
        <Plus className="size-4" /> Add item
      </button>
    </div>
  );
}

function ObjectArray({
  items,
  fields,
  onChange,
}: {
  items: Record<string, unknown>[];
  fields: FieldSpec[];
  onChange: (v: Record<string, unknown>[]) => void;
}) {
  const blank = () => Object.fromEntries(fields.map((f) => [f.key, f.type === "string[]" ? [] : ""]));
  const setItem = (i: number, v: Record<string, unknown>) => onChange(items.map((x, j) => (j === i ? v : x)));
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-border bg-white p-3">
          <div className="mb-2 flex justify-end">
            <IconBtn onClick={() => onChange(items.filter((_, j) => j !== i))} title="Remove" danger>
              <Trash2 className="size-4" />
            </IconBtn>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {fields.map((f) => (
              <FieldInput
                key={f.key}
                field={f}
                value={item[f.key]}
                onChange={(v) => setItem(i, { ...item, [f.key]: v })}
              />
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, blank()])}
        className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-1.5 text-sm font-medium text-navy hover:border-aster hover:text-aster-700"
      >
        <Plus className="size-4" /> Add
      </button>
    </div>
  );
}

function ImageField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);
  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setErr(null);
    try {
      const { url } = await uploadImage(file);
      onChange(url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="size-14 shrink-0 rounded-lg border border-border object-contain p-1" />
        ) : (
          <span className="grid size-14 shrink-0 place-items-center rounded-lg border border-dashed border-border text-muted-foreground">
            <ImageUp className="size-5" />
          </span>
        )}
        <input className={inputCls} value={value} placeholder="/images/…" onChange={(e) => onChange(e.target.value)} />
      </div>
      <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-navy hover:border-aster hover:text-aster-700">
        {busy ? <Loader2 className="size-4 animate-spin" /> : <ImageUp className="size-4" />}
        Upload image
        <input type="file" accept="image/*" className="sr-only" onChange={onFile} disabled={busy} />
      </label>
      {err ? <p className="text-xs text-destructive">{err}</p> : null}
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  title,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-white text-navy transition-colors hover:border-aster",
        danger && "hover:border-destructive hover:text-destructive"
      )}
    >
      {children}
    </button>
  );
}

/** Renders a full set of fields for an object/entry. */
export function ObjectForm({
  fields,
  value,
  onChange,
  hiddenKeys = [],
}: {
  fields: FieldSpec[];
  value: Record<string, unknown>;
  onChange: (v: Record<string, unknown>) => void;
  hiddenKeys?: string[];
}) {
  return (
    <div className="grid gap-5">
      {fields
        .filter((f) => !hiddenKeys.includes(f.key))
        .map((f) => (
          <FieldInput
            key={f.key}
            field={f}
            value={value[f.key]}
            onChange={(v) => onChange({ ...value, [f.key]: v })}
          />
        ))}
    </div>
  );
}
