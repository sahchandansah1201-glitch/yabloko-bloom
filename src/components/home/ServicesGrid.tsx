import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import cosmetologyImg from "@/assets/services/cosmetology-item.png";
import dermatologyImg from "@/assets/services/dermatology-item.png";
import trichologyImg from "@/assets/services/trichology-item.png";
import healthImg from "@/assets/services/health-item.png";

interface ServicesGridProps {
  onBookingClick: () => void;
}

const services = [
  {
    id: "cosmetology",
    title: "Косметология",
    tags: "Омоложение, инъекции, эстетика",
    image: cosmetologyImg,
    bg: "bg-[hsl(152_40%_95%)]",
    bgHover: "hover:bg-[hsl(152_40%_90%)]",
  },
  {
    id: "dermatology",
    title: "Дерматология",
    tags: "Лечение акне, удаление новообразований, розацеа",
    image: dermatologyImg,
    bg: "bg-[hsl(35_40%_95%)]",
    bgHover: "hover:bg-[hsl(35_40%_90%)]",
  },
  {
    id: "trichology",
    title: "Трихология",
    tags: "Выпадение волос, лечение кожи головы",
    image: trichologyImg,
    bg: "bg-[hsl(205_50%_95%)]",
    bgHover: "hover:bg-[hsl(205_50%_90%)]",
  },
  {
    id: "health",
    title: "Здоровье",
    tags: "Остеопатия, диетология, неврология",
    image: healthImg,
    bg: "bg-[hsl(230_30%_95%)]",
    bgHover: "hover:bg-[hsl(230_30%_90%)]",
  },
];

export function ServicesGrid({ onBookingClick }: ServicesGridProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        {/* Section header */}
        <div className="mb-10 max-w-2xl md:mb-14">
          <h2 className="font-heading text-2xl font-bold text-[hsl(210_24%_16%)] md:text-3xl lg:text-4xl">
            Решаем ваши проблемы
          </h2>
          <p className="mt-3 text-muted-foreground">
            Выберите направление для детального изучения услуг и цен.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {services.map((service) => (
            <Link
              key={service.id}
              to={`/services/${service.id}`}
              className={`group relative flex min-h-[220px] overflow-hidden rounded-2xl ${service.bg} ${service.bgHover} p-7 transition-all duration-300 md:min-h-[260px] md:p-8 lg:p-10`}
            >
              {/* Text content — constrained to left 2/3 */}
              <div className="relative z-10 flex w-2/3 flex-col justify-between">
                <div>
                  <h3 className="font-heading text-xl font-bold text-[hsl(210_24%_16%)] md:text-2xl lg:text-[1.75rem]">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[hsl(210_10%_35%)] md:text-base">
                    {service.tags}
                  </p>
                </div>

                {/* CTA arrow */}
                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary transition-colors group-hover:text-primary/80">
                  <span>Подробнее</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>

              {/* Decorative image — absolutely positioned bottom-right */}
              <img
                src={service.image}
                alt=""
                aria-hidden="true"
                className="absolute bottom-0 right-2 h-36 w-36 object-contain opacity-90 transition-transform duration-500 group-hover:scale-105 md:right-4 md:h-44 md:w-44 lg:h-52 lg:w-52"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
