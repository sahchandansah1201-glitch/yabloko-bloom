import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface ServiceFAQProps {
  faq: { question: string; answer: string }[];
}

export function ServiceFAQ({ faq }: ServiceFAQProps) {
  const [search, setSearch] = useState("");

  if (!faq.length) return null;

  const filtered = search.trim()
    ? faq.filter(
        (f) =>
          f.question.toLowerCase().includes(search.toLowerCase()) ||
          f.answer.toLowerCase().includes(search.toLowerCase())
      )
    : faq;

  return (
    <section className="py-12 md:py-16">
      <div className="container max-w-3xl">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
          Частые вопросы
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Не нашли ответ? Задайте вопрос врачу
        </p>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Задайте свой вопрос…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 rounded-full border-border bg-card"
          />
        </div>

        <Accordion type="single" collapsible className="space-y-2">
          {filtered.map((f, i) => (
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

        {filtered.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">
            Ничего не найдено. Попробуйте другой запрос.
          </p>
        )}
      </div>
    </section>
  );
}
