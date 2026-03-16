import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "С какими проблемами чаще всего обращаются к Марии Олеговне?",
    a: "Чаще всего пациенты обращаются с проблемами акне и постакне, пигментации, возрастных изменений кожи, выпадения волос, а также для проведения инъекционных процедур (ботулинотерапия, контурная пластика) и лазерных процедур.",
  },
  {
    q: "Нужно ли сдавать анализы перед приемом косметолога?",
    a: "Для первичной консультации анализы не требуются. Врач проведёт осмотр и, при необходимости, назначит дополнительные исследования — анализы крови, гормональный профиль или дерматоскопию — для составления индивидуального плана лечения.",
  },
  {
    q: "Как проходит первичная консультация?",
    a: "Первичная консультация длится 30–40 минут. Врач проводит детальный осмотр кожи, собирает анамнез, обсуждает ваши жалобы и пожелания. По итогам составляется персональный план лечения или процедур с указанием сроков и стоимости.",
  },
];

export function DoctorFAQ() {
  return (
    <section className="py-12 md:py-16 bg-secondary/30">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl mb-8 text-center">
            Часто задаваемые вопросы
          </h2>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-base hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
