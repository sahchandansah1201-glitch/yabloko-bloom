import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Quote, ArrowRight, Award, Shield } from "lucide-react";
import { pavlyukMaria } from "@/assets/doctors";

interface ChiefDoctorSectionProps {
  onBookingClick: () => void;
}

export function ChiefDoctorSection({ onBookingClick }: ChiefDoctorSectionProps) {
  return (
    <section className="bg-gradient-to-br from-secondary to-background py-16 md:py-24">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Image placeholder */}
          <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 lg:order-2">
            <img
              src={pavlyukMaria}
              alt="Павлюк Мария Олеговна — главный врач клиники Яблоко"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-primary/20 blur-2xl" />
            <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />
          </div>

          {/* Content */}
          <div className="lg:order-1">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Главный врач</span>
            </div>

            <h2 className="font-heading text-2xl font-bold md:text-3xl lg:text-4xl">
              Павлюк Мария Олеговна
            </h2>
            
            <p className="mt-2 text-lg text-primary">
              Дерматолог • Трихолог • Anti-Age эксперт
            </p>

            {/* Quote */}
            <div className="relative mt-6 rounded-xl bg-card p-6 shadow-sm">
              <Quote className="absolute -left-2 -top-2 h-8 w-8 text-primary/20" />
              <p className="text-muted-foreground italic">
                "Настоящая красота — это здоровье. Мы не просто устраняем недостатки, 
                мы ищем причину проблемы и работаем с ней комплексно. Только такой 
                подход даёт долгосрочный результат."
              </p>
            </div>

            {/* Credentials */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-lg bg-card p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                  <span className="font-heading text-lg font-bold text-primary">15+</span>
                </div>
                <span className="text-sm text-muted-foreground">лет опыта</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-card p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                  <span className="font-heading text-lg font-bold text-primary">3000+</span>
                </div>
                <span className="text-sm text-muted-foreground">пациентов</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Button variant="hero" size="lg" onClick={onBookingClick}>
                Записаться к врачу
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link to="/specialists/maria-pavlyuk">
                <Button variant="outline" size="lg">
                  Подробнее о враче
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
