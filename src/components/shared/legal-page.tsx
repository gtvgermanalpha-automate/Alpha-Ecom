import Link from "next/link";

import { siteConfig, fullAddress } from "@/lib/site";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";

export type LegalSection = {
  id: string;
  title: string;
  /** Paragraphs and bullet lists. A string renders as a paragraph; an array renders as a list. */
  body: (string | string[])[];
};

/** Shared layout for the Privacy Policy and Terms & Conditions pages. */
export function LegalPage({
  eyebrow,
  title,
  description,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        breadcrumbs={[{ label: title }]}
        image="/images/about-team.jpg"
      />

      <section className="bg-aster-50 py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          {/* Table of contents */}
          <aside className="lg:col-span-4">
            <div className="rounded-2xl border border-border bg-white p-6 lg:sticky lg:top-28">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Last updated
              </p>
              <p className="mt-1 font-semibold text-navy">{updated}</p>
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
                {s.body.map((block, j) =>
                  Array.isArray(block) ? (
                    <ul key={j} className="mt-4 space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
                      {block.map((item) => (
                        <li key={item} className="list-disc">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p key={j} className="mt-4 text-base leading-relaxed text-muted-foreground">
                      {block}
                    </p>
                  )
                )}
              </Reveal>
            ))}

            <div className="mt-12 rounded-2xl bg-aster-50 p-6 text-sm text-muted-foreground">
              This document is provided by {siteConfig.legalName}, trading as {siteConfig.name}. See also our{" "}
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
