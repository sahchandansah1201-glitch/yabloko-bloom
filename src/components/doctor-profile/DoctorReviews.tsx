import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const reviews = [
  {
    text: "Очень тактичная и компетентная. Назначила правильное лечение, препараты вызывают доверие.",
    author: "Анна К.",
    source: "ПроДокторов",
    rating: 5,
  },
  {
    text: "Приходили с сыном на диагностику родинок. Врач все подробно объяснила, очень уютная атмосфера.",
    author: "Ольга М.",
    source: "Яндекс",
    rating: 5,
  },
  {
    text: "Лучший дерматолог в Краснодаре. Результат после лечения акне превзошёл все ожидания.",
    author: "Ирина С.",
    source: "2ГИС",
    rating: 5,
  },
  {
    text: "Мария Олеговна — настоящий профессионал. Подробная консультация, индивидуальный подход.",
    author: "Елена Д.",
    source: "ПроДокторов",
    rating: 5,
  },
];

const sourceColors: Record<string, string> = {
  "ПроДокторов": "bg-primary/10 text-primary",
  "Яндекс": "bg-amber-100 text-amber-700",
  "2ГИС": "bg-emerald-100 text-emerald-700",
};

export function DoctorReviews() {
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl mb-8 text-center">
            Отзывы пациентов
          </h2>

          <div className="columns-1 gap-4 md:columns-2 max-w-3xl mx-auto">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="mb-4 break-inside-avoid"
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: review.rating }).map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed text-foreground">«{review.text}»</p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-xs font-medium text-muted-foreground">{review.author}</p>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${sourceColors[review.source] || "bg-muted text-muted-foreground"}`}>
                        {review.source}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
