import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import cosmetologyImg from "@/assets/services/cosmetology-circle.jpg";
import dermatologyImg from "@/assets/services/dermatology-circle.jpg";
import trichologyImg from "@/assets/services/trichology-circle.jpg";
import healthImg from "@/assets/services/health-circle.jpg";

interface ServicesGridProps {
  onBookingClick: () => void;
}

const services = [
  {
    id: "cosmetology",
    title: "Косметология",
    problems: [
      "Морщины и заломы",
      "Потеря упругости кожи",
      "Тусклый цвет лица",
      "Рубцы и шрамы",
    ],
    image: cosmetologyImg,
  },
  {
    id: "dermatology",
    title: "Дерматология",
    problems: [
      "Акне (угревая болезнь)",
      "Папилломы и бородавки",
      "Проверка и удаление родинок",
      "Купероз (сосуды)",
    ],
    image: dermatologyImg,
  },
  {
    id: "trichology",
    title: "Трихология",
    problems: [
      "Выпадение волос (алопеция)",
      "Перхоть и шелушение",
      "Истончение волос",
      "Зуд кожи головы",
    ],
    image: trichologyImg,
  },
  {
    id: "health",
    title: "Здоровье и Тело",
    problems: [
      "Остеопатией",
      "Неврологией",
      "Диетологией",
      "Массажем",
    ],
    image: healthImg,
  },
];

export function ServicesGrid({ onBookingClick }: ServicesGridProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mb-10 max-w-2xl md:mb-14">
          <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
            Решаем ваши проблемы
          </h2>
          <p className="mt-3 text-muted-foreground">
            Выберите направление для детального изучения услуг и цен.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
              <Link
              key={service.id}
              to={`/services?tab=${service.id}`}
              className="group relative overflow-hidden rounded-xl border border-border/40 bg-background p-7 shadow-[0_2px_8px_-2px_hsl(var(--foreground)/0.08)] transition-all duration-300 hover:border-primary hover:shadow-[0_6px_20px_-4px_hsl(var(--primary)/0.18)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_1px_4px_-1px_hsl(var(--foreground)/0.1)] md:p-8"
            >
              {/* Text content */}
              <div className="relative z-10 pr-28 md:pr-36">
                <h3 className="font-heading text-xl font-bold text-foreground md:text-2xl">
                  {service.title}
                </h3>

                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Решаем проблемы:
                </p>

                <ul className="mt-2 space-y-1.5">
                  {service.problems.map((problem) => (
                    <li key={problem} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-sm leading-snug text-foreground/80">
                        {problem}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-primary transition-colors group-hover:underline">
                  <span>Узнать цены и методы</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>

              {/* Circular image */}
              <img
                src={service.image}
                alt={service.title}
                className="absolute bottom-6 right-6 h-24 w-24 rounded-full border-4 border-card object-cover shadow-sm transition-transform duration-500 group-hover:scale-110 md:h-32 md:w-32"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
