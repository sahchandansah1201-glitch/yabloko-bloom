import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

interface HeroSectionProps {
  onBookingClick: () => void;
}

export function HeroSection({ onBookingClick }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-apple-green-light via-background to-background py-16 md:py-24 lg:py-32">
      {/* Background decoration */}
      <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      
      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* Trust badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-md animate-fade-in">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              5.0 на Яндекс Картах
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-heading text-3xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl animate-slide-up">
            <span className="text-primary">Вернём вам годы</span>
            <br />
            <span className="text-foreground">за один час</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground md:text-xl animate-slide-up stagger-1">
            <strong className="text-foreground">Красота через здоровье.</strong>
            {" "}Интегративная дерматология и косметология в Краснодаре.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row animate-slide-up stagger-2">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={onBookingClick}
              className="w-full sm:w-auto"
            >
              Записаться на приём
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="w-full sm:w-auto"
            >
              Узнать о клинике
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 animate-fade-in stagger-3">
            {[
              { value: "10+", label: "лет опыта" },
              { value: "5000+", label: "пациентов" },
              { value: "50+", label: "процедур" },
              { value: "5.0", label: "рейтинг" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-heading text-2xl font-bold text-primary md:text-3xl">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
