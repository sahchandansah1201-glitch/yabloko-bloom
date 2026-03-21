import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Shield, Zap, Heart, Eye, Crosshair, Activity,
  Droplets, Sparkles, ScanLine, Thermometer, Lock, RefreshCw,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import {
  aramoSg, lazmik03, rds3, galatea,
  ehvch20, ehvch100, abc02, venusViva, sharplight,
} from "@/assets/equipment";
import useEmblaCarousel from "embla-carousel-react";
import { useIsMobile } from "@/hooks/use-mobile";
import type { LucideIcon } from "lucide-react";

interface EquipmentBenefit {
  icon: LucideIcon;
  text: string;
}

interface EquipmentDevice {
  id: string;
  name: string;
  image: string;
  argument: string;
  benefits: EquipmentBenefit[];
}

const devices: EquipmentDevice[] = [
  {
    id: "sharplight",
    name: "SharpLight (Израиль)",
    image: sharplight,
    argument: "Лазерная эпиляция и фотоомоложение мирового уровня.",
    benefits: [
      { icon: Thermometer, text: "Охлаждение до -10°C — без боли во время процедуры" },
      { icon: Zap, text: "Удаление 95% волос — гарантированный результат за курс" },
      { icon: Shield, text: "Безопасно для загорелой кожи — все фототипы" },
    ],
  },
  {
    id: "venus-viva",
    name: "Venus Viva",
    image: venusViva,
    argument: "Революционное обновление текстуры и тона кожи с минимальной реабилитацией.",
    benefits: [
      { icon: Sparkles, text: "NanoFractional RF для глубокого стимулирования коллагена" },
      { icon: RefreshCw, text: "Улучшение текстуры, сужение пор и разглаживание рубцов" },
      { icon: Shield, text: "Безопасно для всех типов кожи (Fitzpatrick I–VI)" },
    ],
  },
  {
    id: "aramo-sg",
    name: "Дерматоскоп Aramo SG Skin",
    image: aramoSg,
    argument: "Глубокий цифровой анализ вашей кожи за 5 минут.",
    benefits: [
      { icon: Activity, text: "Точное измерение влажности, эластичности и жирности" },
      { icon: Eye, text: "Раннее выявление пигментации и чувствительности" },
      { icon: Shield, text: "Беспроводная, полностью гигиеничная процедура" },
    ],
  },
  {
    id: "lazmik-03",
    name: "ЛАЗМИК-03",
    image: lazmik03,
    argument: "Сила лазера для безболезненного восстановления клеток.",
    benefits: [
      { icon: Heart, text: "Мощное противовоспалительное и обезболивающее действие" },
      { icon: RefreshCw, text: "Ускорение регенерации тканей (лечение акне, рубцов)" },
      { icon: Sparkles, text: "Неинвазивное омоложение без реабилитации" },
    ],
  },
  {
    id: "rds-3",
    name: "Дерматоскоп РДС-3",
    image: rds3,
    argument: "Цифровое «зрение» эксперта для защиты вашей кожи.",
    benefits: [
      { icon: Shield, text: "Бесконтактный осмотр — максимальная гигиена" },
      { icon: ScanLine, text: "Сверхвысокое разрешение для обнаружения малейших изменений" },
      { icon: Eye, text: "Цифровой архив снимков для отслеживания динамики лечения" },
    ],
  },
  {
    id: "galatea",
    name: "Электрокоагулятор КРИСТИ «Галатея»",
    image: galatea,
    argument: "Мгновенное и бесследное удаление несовершенств.",
    benefits: [
      { icon: Shield, text: "Минимальное повреждение окружающих тканей" },
      { icon: Crosshair, text: "Точный контроль глубины воздействия" },
      { icon: Heart, text: "Быстрое заживление и отсутствие кровотечений" },
    ],
  },
  {
    id: "ehvch-20",
    name: "ЭХВЧ-20 МТУСИ",
    image: ehvch20,
    argument: "Хирургическая точность на микроуровне.",
    benefits: [
      { icon: Crosshair, text: "Ультра-точное удаление самых мелких новообразований" },
      { icon: Eye, text: "Идеально для деликатных зон лица" },
      { icon: Lock, text: "Безопасное, контролируемое воздействие энергии" },
    ],
  },
  {
    id: "ehvch-100",
    name: "ЭХВЧ-100 МТУСИ",
    image: ehvch100,
    argument: "Универсальная мощь и безопасность для сложных случаев.",
    benefits: [
      { icon: Zap, text: "Различные режимы для широкого спектра операций" },
      { icon: Shield, text: "Многоступенчатая система контроля безопасности" },
      { icon: Activity, text: "Надежный результат даже при глубоких вмешательствах" },
    ],
  },
  {
    id: "abc-02",
    name: "ABC-02 МЕДАСС",
    image: abc02,
    argument: "Глубокий взгляд внутрь: диагностика гидратации и питания вашей кожи.",
    benefits: [
      { icon: Droplets, text: "Объективное измерение уровня увлажнённости кожи изнутри" },
      { icon: Activity, text: "Персонализированный план лечения на основе данных" },
      { icon: Heart, text: "Отслеживание влияния питания на здоровье кожи" },
    ],
  },
];

function EquipmentCard({ device }: { device: EquipmentDevice }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 h-full">
      <div className="relative overflow-hidden bg-secondary/20">
        <img
          src={device.image}
          alt={device.name}
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-heading text-base md:text-lg font-bold text-foreground mb-2 leading-tight">
          {device.name}
        </h3>
        <p className="text-sm text-primary font-medium mb-4 leading-snug">
          {device.argument}
        </p>
        <ul className="mt-auto space-y-2.5">
          {device.benefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <benefit.icon className="h-3 w-3 text-primary" />
              </span>
              <span className="text-xs md:text-sm text-muted-foreground leading-snug">
                {benefit.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function EquipmentArsenal() {
  const isMobile = useIsMobile();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: isMobile ? 1 : 3,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14"
        >
          <Badge variant="outline" className="mb-4 border-primary text-primary">
            Передовое оборудование
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Арсенал технологий клиники
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Только сертифицированное оборудование премиум-класса для точной диагностики,
            эффективного лечения и безопасных процедур.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4 md:-ml-6">
            {devices.map((device) => (
              <div
                key={device.id}
                className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-4 md:pl-6"
              >
                <EquipmentCard device={device} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-3 mt-6 md:mt-8">
          {!isMobile && (
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-9 w-9"
              onClick={scrollPrev}
              aria-label="Предыдущее оборудование"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}

          <div className="flex items-center gap-2">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Страница ${i + 1}`}
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
              aria-label="Следующее оборудование"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
