import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface ServiceFAQProps {
  faq: { question: string; answer: string }[];
}

export function ServiceFAQ({ faq }: ServiceFAQProps) {
  if (!faq.length) return null;

  return (
    <section className="py-12 md:py-16">
      <div className="container max-w-3xl">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
          Частые вопросы
        </h2>
        <Accordion type="single" collapsible className="space-y-2">
          {faq.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border rounded-xl px-5 bg-card">
              <AccordionTrigger className="text-left font-medium hover:no-underline">
                {f.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {f.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
