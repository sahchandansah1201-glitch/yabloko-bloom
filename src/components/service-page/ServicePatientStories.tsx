import { motion } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Story {
  name: string;
  rating: number;
  text: string;
  date: string;
}

const mockStories: Story[] = [
  { name: "Анна М.", rating: 5, text: "Очень довольна результатом! Врач подробно объяснила каждый этап, абсолютно комфортная процедура.", date: "Март 2026" },
  { name: "Екатерина В.", rating: 5, text: "Уже после первого сеанса виден эффект. Обязательно вернусь на повторную процедуру!", date: "Февраль 2026" },
  { name: "Мария С.", rating: 5, text: "Прекрасная клиника и внимательный персонал. Рекомендую всем подругам.", date: "Январь 2026" },
];

export function ServicePatientStories() {
  return (
    <section className="py-12 md:py-16 bg-secondary/30">
      <div className="container max-w-4xl">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
          Истории пациентов
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-8">
          Реальные отзывы наших пациентов
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {mockStories.map((story, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <Card className="p-5 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                      {story.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold text-foreground">{story.name}</span>
                      <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-[11px] text-muted-foreground">{story.date}</span>
                  </div>
                </div>
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: story.rating }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                {/* Text */}
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{story.text}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
