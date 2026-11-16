import * as React from "react";
import Link from "next/link";

/**
 * Tiny inline formatter for CMS text (blog article body):
 *   **bold**   *italic*   [link text](https://example.com)
 * and, as a whole line, an image:  ![description](/uploads/photo.jpg)
 * Anything else is shown as plain text, so nothing here can inject markup.
 */

const INLINE = /\*\*(.+?)\*\*|\*([^*\s][^*]*?)\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
const IMAGE_LINE = /^!\[([^\]]*)\]\(([^)\s]+)\)$/;

/** Only web, mail, phone and same-site links are allowed. */
function safeHref(href: string): string | null {
  return /^(https?:\/\/|mailto:|tel:|\/|#)/i.test(href) ? href : null;
}

export function RichInline({ text }: { text: string }): React.ReactNode {
  const out: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of text.matchAll(INLINE)) {
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    if (m[1] !== undefined) {
      out.push(
        <strong key={key++} className="font-semibold text-navy">
          <RichInline text={m[1]} />
        </strong>
      );
    } else if (m[2] !== undefined) {
      out.push(
        <em key={key++}>
          <RichInline text={m[2]} />
        </em>
      );
    } else {
      const href = safeHref(m[4]);
      const cls = "font-medium text-aster-700 underline underline-offset-2 hover:text-navy";
      if (!href) out.push(m[3]);
      else if (href.startsWith("/") || href.startsWith("#"))
        out.push(
          <Link key={key++} href={href} className={cls}>
            <RichInline text={m[3]} />
          </Link>
        );
      else
        out.push(
          <a key={key++} href={href} className={cls} target="_blank" rel="noopener noreferrer">
            <RichInline text={m[3]} />
          </a>
        );
    }
    last = at + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

/** If the whole block is an image line, return its parts. */
export function parseImageLine(block: string): { alt: string; src: string } | null {
  const m = IMAGE_LINE.exec(block.trim());
  if (!m) return null;
  const src = /^(https?:\/\/|\/)/i.test(m[2]) ? m[2] : null;
  return src ? { alt: m[1], src } : null;
}
