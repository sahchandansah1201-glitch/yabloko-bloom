import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Shield, Zap, Heart, Eye, Crosshair, Activity,
  Droplets, Sparkles, ScanLine, Thermometer, Lock, RefreshCw
} from "lucide-react";
import {
  aramoSg, lazmik03, rds3, galatea,
  ehvch20, ehvch100, abc02, venusViva,
} from "@/assets/equipment";
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
    image: "", // handled separately as legacy placeholder
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

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.4, ease: "easeOut" as const },
  }),
};

function SharpLightPlaceholder() {
  return (
    <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/30">
      <div className="text-center p-6">
        <Zap className="h-14 w-14 text-primary/30 mx-auto mb-2" />
        <p className="text-xs text-muted-foreground font-medium">SharpLight Technology</p>
      </div>
    </div>
  );
}

function EquipmentCard({ device, index }: { device: EquipmentDevice; index: number }) {
  const isSharpLight = device.id === "sharplight";

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-secondary/20">
        {isSharpLight ? (
          <SharpLightPlaceholder />
        ) : (
          <img
            src={device.image}
            alt={device.name}
            className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-heading text-base md:text-lg font-bold text-foreground mb-2 leading-tight">
          {device.name}
        </h3>
        <p className="text-sm text-primary font-medium mb-4 leading-snug">
          {device.argument}
        </p>

        {/* Benefits */}
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
    </motion.article>
  );
}

export function EquipmentArsenal() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
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
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {devices.map((device, index) => (
            <EquipmentCard key={device.id} device={device} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
