import { faqs } from "@/lib/content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

export function FAQ() {
  return (
    <Section tone="white">
      <SectionHeading
        eyebrow="FAQ"
        title="Questions, answered"
        description="Everything you need to know before getting started."
        className="mb-12"
      />
      <Reveal className="mx-auto max-w-3xl">
        <Accordion
          type="single"
          collapsible
          className="rounded-2xl border border-border bg-white px-6"
        >
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </Section>
  );
}
