import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Percent, ArrowRight, ImageIcon } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface PromoSectionProps {
  onBookingClick: () => void;
}

const promos = [
  {
    title: "Скидка -30%",
    subtitle: "на лечение акне",
    description: "Комплексное лечение с гарантией результата",
    badge: "ХИТ",
    color: "from-accent/10 to-accent/5",
  },
  {
    title: "Диспорт",
    subtitle: "126 руб/ед",
    description: "Коррекция мимических морщин. Опытные врачи-косметологи",
    badge: "ВЫГОДНО",
    color: "from-primary/10 to-primary/5",
  },
  {
    title: "Биоревитализация",
    subtitle: "от 4 900 ₽",
    description: "Глубокое увлажнение кожи препаратами гиалуроновой кислоты",
    badge: "ПОПУЛЯРНО",
    color: "from-accent/10 to-accent/5",
  },
  {
    title: "Лазерная эпиляция",
    subtitle: "скидка -20%",
    description: "Безболезненное удаление нежелательных волос на аппарате SharpLight",
    badge: "СЕЗОН",
    color: "from-primary/10 to-primary/5",
  },
  {
    title: "Пилинг PRX-T33",
    subtitle: "от 3 500 ₽",
    description: "Безинъекционная биоревитализация. Мгновенное сияние кожи",
    badge: "НОВИНКА",
    color: "from-accent/10 to-accent/5",
  },
  {
    title: "Контурная пластика",
    subtitle: "от 12 000 ₽",
    description: "Коррекция носогубных складок и моделирование губ",
    badge: "ТОП",
    color: "from-primary/10 to-primary/5",
  },
  {
    title: "Чек-ап кожи",
    subtitle: "Бесплатно",
    description: "Консультация дерматолога + дерматоскопия при первом визите",
    badge: "ПОДАРОК",
    color: "from-accent/10 to-accent/5",
  },
  {
    title: "Мезотерапия",
    subtitle: "от 3 200 ₽",
    description: "Витаминные коктейли для лица, шеи и зоны декольте",
    badge: "ВЫГОДНО",
    color: "from-primary/10 to-primary/5",
  },
  {
    title: "Ботокс + Пилинг",
    subtitle: "Комплекс -25%",
    description: "Комбинированный anti-age протокол с двойным эффектом",
    badge: "КОМБО",
    color: "from-accent/10 to-accent/5",
  },
];

export function PromoSection({ onBookingClick }: PromoSectionProps) {
  const isMobile = useIsMobile();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const now = new Date();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    const updateTimer = () => {
      const diff = endOfMonth.getTime() - new Date().getTime();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <Badge className="mb-3 md:mb-4 bg-accent text-accent-foreground">
            <Percent className="h-3.5 w-3.5 mr-1" />
            Специальные предложения
          </Badge>
          <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground mb-3">
            Акции и скидки
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            Успейте воспользоваться выгодными предложениями до конца месяца
          </p>
        </div>

        {/* Countdown */}
        <div className="flex justify-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 md:gap-4 bg-accent/10 border border-accent/30 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4">
            <Clock className="h-4 w-4 md:h-5 md:w-5 text-accent" />
            <span className="text-xs md:text-sm font-medium text-foreground hidden sm:inline">До конца месяца:</span>
            <div className="flex items-center gap-1.5 md:gap-2">
              {[
                { value: timeLeft.days, label: "дн" },
                { value: timeLeft.hours, label: "ч" },
                { value: timeLeft.minutes, label: "м" },
                { value: timeLeft.seconds, label: "с" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-0.5 md:gap-1">
                  <div className="bg-accent text-accent-foreground font-heading font-bold text-sm md:text-lg w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <span className="text-[10px] md:text-xs text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Promo Cards Grid */}
        {isMobile ? (
          <MobilePromoCarousel promos={promos} onBookingClick={onBookingClick} />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {promos.map((promo, index) => (
              <PromoCard key={index} promo={promo} onBookingClick={onBookingClick} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function MobilePromoCarousel({
  promos: promoItems,
  onBookingClick,
}: {
  promos: PromoItem[];
  onBookingClick: () => void;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
  });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <div>
      <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
        <div className="flex gap-3">
          {promos.map((promo, index) => (
            <div key={index} className="flex-[0_0_85%] min-w-0">
              <PromoCard promo={promo} onBookingClick={onBookingClick} />
            </div>
          ))}
        </div>
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-5">
        {promos.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-5 h-2 bg-primary"
                : "w-2 h-2 bg-muted-foreground/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

interface PromoItem {
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  color: string;
}

interface PromoCardProps {
  promo: PromoItem;
  onBookingClick: () => void;
}

function PromoCard({ promo, onBookingClick }: PromoCardProps) {
  return (
    <div className={`group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${promo.color} hover:border-accent/50 hover:shadow-lg transition-all duration-300 flex flex-col`}>
      {/* Image placeholder */}
      <div className="relative aspect-[16/9] bg-muted/50 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <ImageIcon className="h-8 w-8 text-muted-foreground/30" />
        </div>
        <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] md:text-xs">
          {promo.badge}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5 flex flex-col flex-1">
        <h3 className="font-heading text-xl md:text-2xl font-bold text-accent leading-tight">
          {promo.title}
        </h3>
        <p className="font-heading text-base md:text-lg font-semibold text-foreground mt-0.5">
          {promo.subtitle}
        </p>
        <p className="text-muted-foreground text-xs md:text-sm mt-2 flex-1">
          {promo.description}
        </p>
        <Button
          onClick={onBookingClick}
          size="sm"
          className="w-full mt-4 bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          Записаться
          <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
        </Button>
      </div>
    </div>
  );
}
