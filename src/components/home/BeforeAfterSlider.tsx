import { useState, useCallback, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [activeIndex, setActiveIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="py-10 md:py-24 bg-secondary/30">
      <div className="container px-0 md:px-8">
        {/* Header */}
        <div className="text-center mb-6 md:mb-14 px-4">
          <Badge variant="outline" className="mb-3 md:mb-4 border-primary text-primary">
            Результаты лечения
          </Badge>
          <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground mb-2 md:mb-3">
            До и после
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            Реальные результаты наших пациентов
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {cases.map((c) => (
                <div key={c.id} className="flex-[0_0_100%] min-w-0">
                  <CaseCard caseData={c} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-3 mt-4 md:mt-5">
            {!isMobile && (
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-9 w-9"
                onClick={scrollPrev}
                aria-label="Предыдущий результат"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}

            <div className="flex items-center gap-2">
              {cases.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  aria-label={`Результат ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-6 h-2.5 bg-primary"
                      : "w-2.5 h-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>

            {!isMobile && (
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-9 w-9"
                onClick={scrollNext}
                aria-label="Следующий результат"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseCard({ caseData }: { caseData: BeforeAfterCase }) {
  return (
    <div className="bg-card overflow-hidden md:rounded-2xl md:border md:shadow-lg md:mx-0">
      {/* Images — full width, tall on mobile/tablet */}
      <div className="grid grid-cols-2">
        <div className="relative aspect-[3/4] md:aspect-[4/3] bg-gradient-to-br from-muted to-secondary/60">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-28 md:h-28 rounded-full bg-muted-foreground/15" />
          </div>
          <div className="absolute top-2 left-2">
            <Badge className="bg-foreground/70 text-background text-[10px] md:text-xs">До</Badge>
          </div>
        </div>

        <div className="relative aspect-[3/4] md:aspect-[4/3] bg-gradient-to-br from-primary/5 to-primary/15">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-28 md:h-28 rounded-full bg-primary/20" />
          </div>
          <div className="absolute top-2 right-2">
            <Badge className="bg-primary text-primary-foreground text-[10px] md:text-xs">После</Badge>
          </div>
        </div>
      </div>

      {/* Compact caption overlay */}
      <div className="p-3 md:p-5 text-center border-t bg-card">
        <p className="font-heading font-semibold text-foreground text-sm md:text-lg leading-tight">
          {caseData.title}
        </p>
        <p className="text-muted-foreground text-[11px] md:text-sm mt-0.5">
          {caseData.caption} · Врач: {caseData.doctor}
        </p>
      </div>
    </div>
  );
}
