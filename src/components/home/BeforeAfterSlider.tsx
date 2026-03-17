import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BeforeAfterCase {
  id: number;
  title: string;
  doctor: string;
  caption: string;
}

const cases: BeforeAfterCase[] = [
  {
    id: 1,
    title: "Лечение акне",
    doctor: "Павлюк М.О.",
    caption: "Курс лечения 3 месяца. Комплексная терапия.",
  },
  {
    id: 2,
    title: "Anti-Age терапия",
    doctor: "Павлюк М.О.",
    caption: "Биоревитализация + ботулинотерапия. 2 процедуры.",
  },
  {
    id: 3,
    title: "Удаление пигментации",
    doctor: "Грачёва В.А.",
    caption: "Лазерная шлифовка. 1 процедура.",
  },
  {
    id: 4,
    title: "Контурная пластика",
    doctor: "Павлюк М.О.",
    caption: "Коррекция носогубных складок. Филлеры.",
  },
  {
    id: 5,
    title: "Лечение рубцов",
    doctor: "Игитханян О.Г.",
    caption: "Фракционное лазерное омоложение. 4 процедуры.",
  },
];

export function BeforeAfterSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (index: number) => {
    setActiveIndex(index);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? cases.length - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev === cases.length - 1 ? 0 : prev + 1));
  };

  const activeCase = cases[activeIndex];

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <Badge variant="outline" className="mb-4 border-primary text-primary">
            Результаты лечения
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
            До и после
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Реальные результаты наших пациентов. Нажмите на карточку для просмотра.
          </p>
        </div>

        {/* Featured Case — Large */}
        <div className="max-w-4xl mx-auto mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCase.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl border bg-card overflow-hidden shadow-lg"
            >
              <div className="grid grid-cols-2">
                {/* Before */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-muted to-secondary/60">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center px-4">
                      <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-muted-foreground/15 mx-auto mb-3" />
                      <p className="text-muted-foreground text-sm md:text-base font-medium">
                        До лечения
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-foreground/70 text-background text-xs">До</Badge>
                  </div>
                </div>

                {/* After */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/5 to-primary/15">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center px-4">
                      <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-primary/20 mx-auto mb-3" />
                      <p className="text-primary text-sm md:text-base font-medium">
                        После лечения
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-primary text-primary-foreground text-xs">После</Badge>
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div className="p-4 md:p-6 text-center border-t">
                <h3 className="font-heading font-semibold text-foreground text-lg md:text-xl mb-1">
                  {activeCase.title}
                </h3>
                <p className="text-muted-foreground text-sm">{activeCase.caption}</p>
                <p className="text-xs text-muted-foreground/60 mt-1">
                  Врач: {activeCase.doctor}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-9 w-9"
              onClick={goPrev}
              aria-label="Предыдущий результат"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground tabular-nums">
              {activeIndex + 1} / {cases.length}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-9 w-9"
              onClick={goNext}
              aria-label="Следующий результат"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="flex justify-center gap-3 overflow-x-auto pb-2 px-4 -mx-4 scrollbar-hide">
          {cases.map((c, i) => (
            <button
              key={c.id}
              onClick={() => goTo(i)}
              className={`flex-shrink-0 rounded-xl border-2 transition-all duration-200 overflow-hidden ${
                i === activeIndex
                  ? "border-primary shadow-md scale-[1.02]"
                  : "border-transparent opacity-60 hover:opacity-90"
              }`}
            >
              <div className="w-28 md:w-36">
                <div className="grid grid-cols-2 aspect-[2/1]">
                  <div className="bg-muted" />
                  <div className="bg-primary/10" />
                </div>
                <div className="px-2 py-1.5 bg-card">
                  <p className="text-[10px] md:text-xs font-medium text-foreground truncate">
                    {c.title}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
