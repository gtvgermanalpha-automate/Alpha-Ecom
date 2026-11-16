"use client";

import * as React from "react";
import { Bold, ImageUp, Italic, Link2, Loader2 } from "lucide-react";

import { uploadImage } from "@/components/admin/cms-client";

/**
 * One big text box for a list of text blocks (the blog article body).
 * Every line is one block: a paragraph, a "## " heading, a "- " bullet point
 * or an image line "![description](/uploads/x.jpg)". Inside a line:
 * **bold**, *italic* and [link text](https://...).
 * Pasting from Google Docs or Word keeps headings, bullets, bold, italics and links.
 */

const BULLET = /^\s*[-*•●○▪■–—]\s+/;

/** Text box content -> blocks: one per non-empty line, bullets normalised to "- ". */
export function textToBlocks(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.replace(/ /g, " ").trim())
    .filter(Boolean)
    .map((line) => (/^#{1,6}\s+/.test(line) ? line.replace(/^#{1,6}\s+/, "## ") : line))
    .map((line) => (BULLET.test(line) && !line.startsWith("**") ? line.replace(BULLET, "- ") : line));
}

export const blocksToText = (blocks: string[]) => blocks.join("\n\n");

/** Google Docs wraps links as google.com/url?q=<real link>; unwrap those. */
function cleanHref(href: string): string {
  try {
    const u = new URL(href);
    if (/(^|\.)google\.com$/.test(u.hostname) && u.pathname === "/url") return u.searchParams.get("q") || href;
  } catch {
    /* relative or malformed: keep as typed */
  }
  return href;
}

/** Wrap text in a marker, keeping any leading/trailing spaces outside it. */
function wrap(inner: string, mark: string): string {
  const core = inner.trim();
  if (!core) return inner;
  const lead = inner.slice(0, inner.length - inner.trimStart().length);
  const trail = inner.slice(inner.trimEnd().length);
  return `${lead}${mark}${core}${mark}${trail}`;
}

/** Inline HTML -> text with **bold**, *italic* and [text](link) markers. */
function inline(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) return (node.textContent ?? "").replace(/\s+/g, " ");
  if (!(node instanceof HTMLElement)) return "";
  const tag = node.tagName;
  if (tag === "IMG" || tag === "SCRIPT" || tag === "STYLE") return "";
  if (tag === "BR") return " ";
  let text = Array.from(node.childNodes).map(inline).join("");

  const weight = node.style.fontWeight;
  const boldStyle = weight === "bold" || Number(weight) >= 600;
  // Google Docs wraps the whole clipboard in <b style="font-weight:normal">, which is not bold.
  const boldTag = (tag === "B" || tag === "STRONG") && !(weight === "normal" || (weight && Number(weight) < 600));
  const italic = tag === "I" || tag === "EM" || node.style.fontStyle === "italic";

  if (boldStyle || boldTag) text = wrap(text, "**");
  if (italic) text = wrap(text, "*");
  if (tag === "A") {
    const href = cleanHref(node.getAttribute("href") ?? "");
    const label = text.trim();
    if (href && label && /^(https?:\/\/|mailto:|tel:|\/)/i.test(href)) text = `[${label}](${href})`;
  }
  return text;
}

const tidy = (s: string) =>
  s
    .replace(/\*\*\*\*/g, "") // two bold runs side by side -> one
    .replace(/\*\* \*\*/g, " ") // ...or separated by one space
    .replace(/\s+/g, " ")
    .trim();

/** Rich clipboard HTML (Google Docs, Word, web pages) -> lines using the markers above. */
function htmlToLines(html: string): string[] {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const lines: string[] = [];
  doc.body.querySelectorAll("h1, h2, h3, h4, h5, h6, p, li").forEach((el) => {
    // A paragraph inside a list item is covered by the list item itself.
    if (el.tagName === "P" && el.closest("li")) return;
    if (/^H[1-6]$/.test(el.tagName)) {
      const text = tidy(el.textContent ?? "");
      if (text) lines.push(`## ${text}`);
      return;
    }
    const text = tidy(inline(el));
    if (!text) return;
    lines.push(el.tagName === "LI" ? `- ${text}` : text);
  });
  return lines;
}

const toolBtn =
  "inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-2.5 py-1.5 text-xs font-semibold text-navy transition-colors hover:border-aster hover:text-aster-700 disabled:opacity-60";

export function LongTextField({
  values,
  onChange,
  max,
}: {
  values: string[];
  onChange: (v: string[]) => void;
  max: number;
}) {
  const [text, setText] = React.useState(() => blocksToText(values));
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);
  const ref = React.useRef<HTMLTextAreaElement>(null);

  // Re-sync only when the saved value changes from outside (load, reset), not while typing.
  React.useEffect(() => {
    setText((current) =>
      JSON.stringify(textToBlocks(current)) === JSON.stringify(values) ? current : blocksToText(values)
    );
  }, [values]);

  const update = (next: string) => {
    setText(next);
    onChange(textToBlocks(next));
  };

  /** Replace the current selection and put the cursor after the inserted text. */
  function replaceSelection(make: (selected: string) => string, ownLine = false) {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const before = text.slice(0, start);
    const after = text.slice(end);
    let piece = make(text.slice(start, end));
    if (ownLine) {
      const glueBefore = before && !before.endsWith("\n") ? "\n\n" : "";
      const glueAfter = after && !after.startsWith("\n") ? "\n\n" : "";
      piece = glueBefore + piece + glueAfter;
    }
    update(before + piece + after);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + piece.length, start + piece.length);
    });
  }

  function onPaste(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    const html = e.clipboardData.getData("text/html");
    if (!html) return; // plain text: let the browser paste it as usual
    const lines = htmlToLines(html);
    if (!lines.length) return;
    e.preventDefault();
    replaceSelection(() => lines.join("\n\n"), true);
  }

  function addLink() {
    const url = window.prompt("Link address (https://...)")?.trim();
    if (!url) return;
    replaceSelection((sel) => `[${sel.trim() || "link text"}](${url})`);
  }

  async function onImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    setErr(null);
    try {
      const { url } = await uploadImage(file);
      const alt = window.prompt("Describe the image in a few words (for SEO and screen readers)")?.trim() ?? "";
      replaceSelection(() => `![${alt.replace(/[\[\]]/g, "")}](${url})`, true);
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  const blocks = textToBlocks(text);
  const tooLong = blocks.filter((b) => b.length > max).length;
  const words = blocks.join(" ").split(/\s+/).filter(Boolean).length;

  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <button type="button" className={toolBtn} title="Bold" onClick={() => replaceSelection((s) => `**${s.trim() || "bold text"}**`)}>
          <Bold className="size-3.5" /> Bold
        </button>
        <button type="button" className={toolBtn} title="Italic" onClick={() => replaceSelection((s) => `*${s.trim() || "italic text"}*`)}>
          <Italic className="size-3.5" /> Italic
        </button>
        <button type="button" className={toolBtn} title="Turn the selected text into a link" onClick={addLink}>
          <Link2 className="size-3.5" /> Link
        </button>
        <label className={`${toolBtn} cursor-pointer`}>
          {busy ? <Loader2 className="size-3.5 animate-spin" /> : <ImageUp className="size-3.5" />} Insert image
          <input type="file" accept="image/*" className="sr-only" onChange={onImage} disabled={busy} />
        </label>
      </div>
      <textarea
        ref={ref}
        className="min-h-96 w-full resize-y rounded-lg border border-border bg-white px-3 py-2 text-sm leading-relaxed text-navy outline-none transition-colors focus:border-aster focus:ring-2 focus:ring-aster/30"
        value={text}
        placeholder={
          "Paste or type the whole article here.\n\n## A heading\n\nA paragraph with **bold text** and a [link](https://example.com).\n\n- A bullet point"
        }
        onChange={(e) => update(e.target.value)}
        onPaste={onPaste}
      />
      {err ? <p className="mt-1 text-xs text-destructive">{err}</p> : null}
      <p className="mt-1.5 text-xs text-muted-foreground">
        Paste the whole article from Google Docs: headings, bullet points, bold, italics and links are kept.
        Images are not pasted; put the cursor where the image should go and use <b>Insert image</b>. Each
        line is one paragraph. By hand: <b>##</b> heading, <b>-</b> bullet, <b>**bold**</b>, <b>*italic*</b>,{" "}
        <b>[text](link)</b>. {words} words, {blocks.length} blocks.
      </p>
      {tooLong ? (
        <p className="mt-1 text-xs text-destructive">
          {tooLong} paragraph{tooLong > 1 ? "s are" : " is"} longer than {max} characters. Split{" "}
          {tooLong > 1 ? "them" : "it"} into shorter paragraphs.
        </p>
      ) : null}
    </div>
  );
}
