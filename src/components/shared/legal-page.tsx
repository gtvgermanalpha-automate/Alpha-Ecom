import Link from "next/link";

import { siteConfig, fullAddress } from "@/lib/site";
import { slugify } from "@/lib/cms/limits";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";

export type LegalSection = {
  title: string;
  /** Ordered blocks: a line starting with "- " is a bullet, anything else is a paragraph. */
  body: string[];
};

export type LegalDoc = { updated: string; sections: LegalSection[] };
export type LegalBanner = { eyebrow: string; title: string; description: string; image: string };

/** Group consecutive "- " lines into bullet lists; everything else is a paragraph. */
function LegalBody({ blocks }: { blocks: string[] }) {
  const out: React.ReactNode[] = [];
  for (let i = 0; i < blocks.length; ) {
    if (blocks[i].startsWith("- ")) {
      const items: string[] = [];
      while (i < blocks.length && blocks[i].startsWith("- ")) items.push(blocks[i++].slice(2));
      out.push(
        <ul key={i} className="mt-4 space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
          {items.map((item, j) => (
            <li key={j} className="list-disc">
              {item}
            </li>
          ))}
        </ul>
      );
    } else {
      out.push(
        <p key={i} className="mt-4 text-base leading-relaxed text-muted-foreground">
          {blocks[i]}
        </p>
      );
      i++;
    }
  }
  return <>{out}</>;
}

/** Shared layout for the Privacy Policy and Terms & Conditions pages (content comes from the CMS). */
export function LegalPage({ banner, doc }: { banner: LegalBanner; doc: LegalDoc }) {
  const sections = doc.sections.map((s, i) => ({ ...s, id: slugify(s.title) || `section-${i + 1}` }));

  return (
    <>
      <PageHero
        eyebrow={banner.eyebrow}
        title={banner.title}
        description={banner.description}
        breadcrumbs={[{ label: banner.title }]}
        image={banner.image}
      />

      <section className="bg-aster-50 py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          {/* Table of contents */}
          <aside className="lg:col-span-4">
            <div className="rounded-2xl border border-border bg-white p-6 lg:sticky lg:top-28">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Last updated
              </p>
              <p className="mt-1 font-semibold text-navy">{doc.updated}</p>
              <nav aria-label="On this page" className="mt-6">
                <ol className="space-y-2 text-sm">
                  {sections.map((s, i) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="flex gap-2 text-muted-foreground transition-colors hover:text-aster-700"
                      >
                        <span className="w-5 shrink-0 font-semibold text-aster-700">{i + 1}.</span>
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
              <div className="mt-6 border-t border-border pt-5 text-sm text-muted-foreground">
                Questions? Email{" "}
                <a href={`mailto:${siteConfig.email}`} className="font-semibold text-navy hover:text-aster-700">
                  {siteConfig.email}
                </a>{" "}
                or call{" "}
                <a href={`tel:${siteConfig.phoneHref}`} className="font-semibold text-navy hover:text-aster-700">
                  {siteConfig.phone}
                </a>
                .
                <p className="mt-3">
                  <span className="font-semibold text-navy">Head office:</span> {fullAddress}
                </p>
              </div>
            </div>
          </aside>

          {/* Body */}
          <article className="rounded-3xl border border-border bg-white p-7 sm:p-10 lg:col-span-8">
            {sections.map((s, i) => (
              <Reveal key={s.id} as="section" className={i === 0 ? "" : "mt-12"}>
                <h2 id={s.id} className="scroll-mt-32 text-2xl font-bold text-navy">
                  <span className="mr-2 text-aster-700">{i + 1}.</span>
                  {s.title}
                </h2>
                <LegalBody blocks={s.body} />
              </Reveal>
            ))}

            <div className="mt-12 rounded-2xl bg-aster-50 p-6 text-sm text-muted-foreground">
              This document is provided by {siteConfig.legalName}. See also our{" "}
              <Link href="/privacy-policy" className="font-semibold text-navy hover:text-aster-700">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms-and-conditions" className="font-semibold text-navy hover:text-aster-700">
                Terms &amp; Conditions
              </Link>
              .
            </div>
          </article>
        </Container>
      </section>
    </>
  );
}
