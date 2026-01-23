import { Link } from "react-router-dom";
import { 
  Sparkles, 
  Stethoscope, 
  Scissors, 
  Heart,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServicesGridProps {
  onBookingClick: () => void;
}

const services = [
  {
    id: "cosmetology",
    icon: Sparkles,
    title: "Косметология",
    description: "Ботулинотерапия, биоревитализация, контурная пластика, пилинги",
    problems: ["Морщины?", "Усталый вид?", "Потеря объёма?"],
    color: "from-primary/20 to-primary/5",
  },
  {
    id: "dermatology",
    icon: Stethoscope,
    title: "Дерматология",
    description: "Лечение акне, удаление новообразований, лечение кожных заболеваний",
    problems: ["Акне?", "Пигментация?", "Высыпания?"],
    color: "from-accent/20 to-accent/5",
  },
  {
    id: "trichology",
    icon: Scissors,
    title: "Трихология",
    description: "Лечение выпадения волос, трихоскопия, мезотерапия кожи головы",
    problems: ["Выпадают волосы?", "Перхоть?", "Тусклые волосы?"],
    color: "from-primary/20 to-primary/5",
  },
  {
    id: "health",
    icon: Heart,
    title: "Здоровье",
    description: "Остеопатия, консультация нутрициолога, интегративный подход",
    problems: ["Боли в спине?", "Проблемы с питанием?", "Стресс?"],
    color: "from-accent/20 to-accent/5",
  },
];

export function ServicesGrid({ onBookingClick }: ServicesGridProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        {/* Section header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-bold md:text-3xl lg:text-4xl">
            Решаем ваши проблемы
          </h2>
          <p className="mt-4 text-muted-foreground">
            Выберите направление, и мы подберём оптимальное решение
          </p>
        </div>

        {/* Services grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.id}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${service.color} p-6 transition-all hover:shadow-lg md:p-8`}
            >
              {/* Icon */}
              <div className="mb-4 inline-flex rounded-xl bg-card p-3 shadow-sm">
                <service.icon className="h-6 w-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="font-heading text-xl font-semibold md:text-2xl">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {service.description}
              </p>

              {/* Problem tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {service.problems.map((problem, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-card px-3 py-1 text-xs font-medium text-foreground shadow-sm"
                  >
                    {problem}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="mt-6 flex flex-wrap gap-3">
                <Button 
                  size="sm" 
                  onClick={onBookingClick}
                >
                  Записаться
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
                <Link to={`/services/${service.id}`}>
                  <Button variant="ghost" size="sm">
                    Подробнее
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
