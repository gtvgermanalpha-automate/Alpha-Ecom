import type { Metadata } from "next";
import { Mail, Phone, Clock, Check, MapPin } from "lucide-react";

import { offices } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { PageHero } from "@/components/sections/page-hero";
import { FAQ } from "@/components/sections/faq";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact Us — Start your project",
  description:
    "Tell us about your products and goals and we'll reply within one business day with a clear plan. Book a free 60-minute strategy session. Offices in the USA, UK, UAE and India.",
  alternates: { canonical: "/contact" },
};

const consultationPoints = [
  "A channel-by-channel review of where your store stands today",
  "Honest advice on scope, pricing and the fastest path to growth",
  "A clear next step — no pressure, no jargon, no obligation",
];

const contactMethods = [
  {
    icon: Mail,
    label: "Email us",
    value: siteConfig.email,
    hint: "We reply within one business day",
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Phone,
    label: "Call us",
    value: siteConfig.phone,
    hint: "Mon–Fri, for a quick chat",
    href: `tel:${siteConfig.phoneHref}`,
  },
  {
    icon: Clock,
    label: "Office hours",
    value: "9am–6pm (your timezone)",
    hint: "Monday to Friday",
    href: undefined,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Let's grow your store"
        description="Tell us about your products and goals — we'll reply within one business day with a clear plan."
        breadcrumbs={[{ label: "Contact" }]}
      />

      {/* Consultation + form */}
      <section className="bg-luster-50 py-20 lg:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-5">
            {/* LEFT — consultation card + contact methods */}
            <div className="lg:col-span-2">
              <Reveal direction="left">
                <div className="relative overflow-hidden rounded-3xl bg-navy p-8 text-white shadow-card">
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-habanero/30 blur-3xl"
                    aria-hidden
                  />
                  <div className="relative">
                    <span className="eyebrow text-habanero">
                      <span className="h-px w-6 bg-habanero" aria-hidden />
                      Free consultation
                    </span>
                    <h2 className="mt-4 text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                      Book a 60-minute strategy session
                    </h2>
                    <p className="mt-3 leading-relaxed text-white/70">
                      Hop on a call with a marketplace specialist and walk away with a plan you can
                      act on — whether you work with us or not.
                    </p>

                    <ul className="mt-7 space-y-4">
                      {consultationPoints.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-aster-100 text-aster">
                            <Check className="size-3.5" strokeWidth={3} />
                          </span>
                          <span className="text-sm leading-relaxed text-white/80">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>

              {/* Contact-method cards */}
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {contactMethods.map((method, i) => {
                  const MethodIcon = method.icon;
                  const inner = (
                    <div className="flex items-start gap-4 rounded-2xl border border-border bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-aster hover:shadow-card">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-habanero-50 text-habanero">
                        <MethodIcon className="size-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {method.label}
                        </p>
                        <p className="mt-1 truncate font-semibold text-navy">{method.value}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{method.hint}</p>
                      </div>
                    </div>
                  );
                  return (
                    <Reveal key={method.label} direction="up" delay={i + 1}>
                      {method.href ? (
                        <a href={method.href} className="block">
                          {inner}
                        </a>
                      ) : (
                        inner
                      )}
                    </Reveal>
                  );
                })}
              </div>
            </div>

            {/* RIGHT — form */}
            <div className="lg:col-span-3">
              <Reveal direction="right">
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Offices */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="Our offices"
            title="Find us around the world"
            description="Four hubs across four time zones — there's always a team awake and shipping for your store."
            className="mb-14"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {offices.map((office, i) => (
              <Reveal key={office.country} direction="up" delay={i + 1}>
                <article className="h-full rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-aster hover:shadow-card">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl leading-none" aria-hidden>
                      {office.flag}
                    </span>
                    <span className="grid size-9 place-items-center rounded-lg bg-habanero-50 text-habanero">
                      <MapPin className="size-4" />
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-navy">{office.city}</h3>
                  <p className="text-sm font-semibold text-habanero">{office.country}</p>
                  <p className="mt-3 border-t border-border pt-3 text-sm leading-relaxed text-muted-foreground">
                    {office.address}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <FAQ />
    </>
  );
}
