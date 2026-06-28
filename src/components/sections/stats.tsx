import { stats } from "@/lib/content";
import { Icon } from "@/lib/icons";
import { Container } from "@/components/shared/container";
import { Counter } from "@/components/shared/counter";
import { Reveal } from "@/components/shared/reveal";

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-navy py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-dots-light opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-0 size-96 -translate-x-1/2 rounded-full bg-habanero/20 blur-3xl"
        aria-hidden
      />
      <Container className="relative">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i} className="text-center">
              <span className="mx-auto grid size-12 place-items-center rounded-xl bg-white/10 text-habanero">
                <Icon name={s.icon} className="size-6" />
              </span>
              <p className="mt-4 font-display text-4xl font-extrabold text-white sm:text-5xl">
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-sm text-white/60">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
