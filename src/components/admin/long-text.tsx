"use client";

import * as React from "react";

/**
 * One big text box for a list of text blocks (the blog article body).
 * Every line is one block: a paragraph, a "## " heading or a "- " bullet point.
 * Pasting from Google Docs or Word keeps headings and bullet points.
 */

const BULLET = /^\s*(?:[-*•●○▪■–—]|\d+[.)])\s+/;

/** Text box content -> blocks: one per non-empty line, bullets normalised to "- ". */
export function textToBlocks(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.replace(/ /g, " ").trim())
    .filter(Boolean)
    .map((line) => (/^#{1,6}\s+/.test(line) ? line.replace(/^#{1,6}\s+/, "## ") : line))
    .map((line) => (BULLET.test(line) && !/^\d/.test(line) ? line.replace(BULLET, "- ") : line));
}

export const blocksToText = (blocks: string[]) => blocks.join("\n\n");

/** Rich clipboard HTML (Google Docs, Word, web pages) -> lines using the "## " / "- " markers. */
function htmlToLines(html: string): string[] {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const lines: string[] = [];
  const clean = (s: string | null) => (s ?? "").replace(/\s+/g, " ").trim();
  const blocks = doc.body.querySelectorAll("h1, h2, h3, h4, h5, h6, p, li");
  blocks.forEach((el) => {
    // A paragraph inside a list item is covered by the list item itself.
    if (el.tagName === "P" && el.closest("li")) return;
    const text = clean(el.textContent);
    if (!text) return;
    if (/^H[1-6]$/.test(el.tagName)) lines.push(`## ${text}`);
    else if (el.tagName === "LI") lines.push(`- ${text}`);
    else lines.push(text);
  });
  return lines;
}

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

  function onPaste(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    const html = e.clipboardData.getData("text/html");
    if (!html) return; // plain text: let the browser paste it as usual
    const lines = htmlToLines(html);
    if (!lines.length) return;
    e.preventDefault();
    const el = e.currentTarget;
    const before = text.slice(0, el.selectionStart);
    const after = text.slice(el.selectionEnd);
    const pasted = lines.join("\n\n");
    const glueBefore = before && !before.endsWith("\n") ? "\n\n" : "";
    const glueAfter = after && !after.startsWith("\n") ? "\n\n" : "";
    update(before + glueBefore + pasted + glueAfter + after);
  }

  const blocks = textToBlocks(text);
  const tooLong = blocks.filter((b) => b.length > max).length;
  const words = blocks.join(" ").split(/\s+/).filter(Boolean).length;

  return (
    <div>
      <textarea
        ref={ref}
        className="min-h-96 w-full resize-y rounded-lg border border-border bg-white px-3 py-2 text-sm leading-relaxed text-navy outline-none transition-colors focus:border-aster focus:ring-2 focus:ring-aster/30"
        value={text}
        placeholder={"Paste or type the whole article here.\n\n## A heading\n\nA paragraph.\n\n- A bullet point"}
        onChange={(e) => update(e.target.value)}
        onPaste={onPaste}
      />
      <p className="mt-1.5 text-xs text-muted-foreground">
        Paste the whole article from Google Docs: headings and bullet points are kept. Each line is one
        paragraph. Start a line with <b>##</b> for a heading or <b>-</b> for a bullet point. Bold, links and
        images are not carried over. {words} words, {blocks.length} blocks.
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
