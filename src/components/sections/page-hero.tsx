import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Icon } from "@/lib/icons";

type Crumb = { label: string; href?: string };

// Two soft organic blob silhouettes used as decorative, floating background shapes.
const BLOB_A =
  "M43.3,-74.6C55.9,-67.1,65.5,-55.3,73.2,-42.1C80.9,-28.9,86.7,-14.5,86.8,0.1C86.9,14.6,81.3,29.2,73.4,42.3C65.5,55.4,55.3,67,42.4,74.6C29.5,82.2,14.8,85.8,-0.2,86.1C-15.1,86.4,-30.2,83.4,-43.4,75.9C-56.6,68.4,-67.9,56.4,-75.6,42.5C-83.3,28.6,-87.4,14.3,-87.3,0C-87.2,-14.3,-82.9,-28.6,-75.2,-41.7C-67.5,-54.8,-56.4,-66.7,-43.2,-74.3C-30,-81.9,-15,-85.2,0.2,-85.5C15.3,-85.8,30.6,-82.1,43.3,-74.6Z";
const BLOB_B =
  "M39.9,-68.1C52.4,-61.3,63.5,-51.8,71.4,-39.6C79.3,-27.4,84,-13.7,83.9,-0.1C83.8,13.6,78.9,27.1,71,39.3C63.1,51.5,52.2,62.3,39.4,69.8C26.6,77.3,13.3,81.5,-0.8,82.9C-14.9,84.3,-29.8,82.9,-42.8,75.6C-55.8,68.3,-66.9,55.1,-74.3,40.4C-81.7,25.7,-85.4,9.5,-83.9,-6.1C-82.4,-21.7,-75.7,-36.7,-65.6,-48.6C-55.5,-60.5,-42,-69.3,-28.1,-74.4C-14.2,-79.5,0.1,-80.9,13.7,-77.6C27.3,-74.3,40.2,-66.3,39.9,-68.1Z";

// Per-page placement presets so each header reads a little differently.
const presets = [
  { a: "-right-32 -top-40", b: "-bottom-44 -left-28", ring: "right-[14%] top-[26%]" },
  { a: "-left-36 -top-44", b: "-bottom-40 -right-24", ring: "right-[10%] bottom-[18%]" },
  { a: "-right-24 -bottom-48", b: "-top-44 -left-32", ring: "left-[12%] top-[30%]" },
  { a: "-right-40 top-[-20%]", b: "-bottom-48 left-[-10%]", ring: "right-[20%] top-[18%]" },
];

/** Organic, gently-animated hero used at the top of inner pages, with breadcrumbs. */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs = [],
  variant,
  image,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
  variant?: string;
  /** optional background photo, shown under a dark navy overlay. */
  image?: string;
}) {
  const seed = [...(variant ?? title)].reduce((a, c) => a + c.charCodeAt(0), 0);
  const p = presets[seed % presets.length];

  return (
    <section className="relative overflow-hidden bg-navy text-white">
      {image ? (
        <>
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" aria-hidden />
          {/* dark overlay keeps the white text legible; heavier on the left where the copy sits */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/60" aria-hidden />
          <div className="absolute inset-0 bg-navy/40" aria-hidden />
        </>
      ) : null}
      <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-70" aria-hidden />

      {/* Organic floating blobs */}
      <svg
        className={cn("pointer-events-none absolute size-[42rem] text-aster/20 blur-2xl animate-float-slow", p.a)}
        viewBox="-100 -100 200 200"
        aria-hidden
      >
        <path d={BLOB_A} fill="currentColor" />
      </svg>
      <svg
        className={cn("pointer-events-none absolute size-[34rem] text-aster/15 blur-2xl animate-float", p.b)}
        viewBox="-100 -100 200 200"
        aria-hidden
      >
        <path d={BLOB_B} fill="currentColor" />
      </svg>
      {/* Crisp dashed organic outline for detail (desktop) */}
      <svg
        className={cn("pointer-events-none absolute hidden size-44 text-aster/30 animate-float lg:block", p.ring)}
        viewBox="-100 -100 200 200"
        aria-hidden
      >
        <path d={BLOB_A} fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 12" />
      </svg>

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
