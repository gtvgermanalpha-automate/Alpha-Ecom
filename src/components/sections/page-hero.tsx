import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Icon } from "@/lib/icons";

type Crumb = { label: string; href?: string };

/** Compact hero used at the top of inner pages, with breadcrumbs. */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs = [],
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-habanero/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-16 size-80 rounded-full bg-aster/20 blur-3xl"
        aria-hidden
      />

      <Container className="relative py-16 lg:py-20">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/60">
            <li>
              <Link href="/" className="transition-colors hover:text-aster">
                Home
              </Link>
            </li>
            {breadcrumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-1.5">
                <Icon name="chevron-right" className="size-3.5 text-white/40" aria-hidden />
                {c.href ? (
                  <Link href={c.href} className="transition-colors hover:text-aster">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white" aria-current="page">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {eyebrow ? (
          <Reveal direction="up">
            <Badge variant="white" className="mb-5 uppercase">
              {eyebrow}
            </Badge>
          </Reveal>
        ) : null}

        <Reveal direction="up" delay={1}>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl">
            {title}
          </h1>
        </Reveal>

        {description ? (
          <Reveal direction="up" delay={2}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">{description}</p>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
