import { Button } from "@/components/ui/button";
import { ArrowRight, Star, MessageCircle } from "lucide-react";

interface HeroSectionProps {
  onBookingClick: () => void;
}

export function HeroSection({ onBookingClick }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-apple-green-light via-background to-background py-20 md:py-28 lg:py-36">
      {/* Background decoration */}
      <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/3 blur-[100px]" />
      
      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Trust badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-card px-5 py-2.5 shadow-lg animate-fade-in border border-border/50">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              5.0 на Яндекс Картах • Более 5000 пациентов
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-heading text-fluid-4xl font-bold leading-tight tracking-tight animate-slide-up">
            <span className="text-foreground">Клиника «</span>
            <span className="text-primary">Яблоко</span>
            <span className="text-foreground">» — это центр медицины кожи,</span>
            <br className="hidden md:block" />
            <span className="text-foreground"> где </span>
            <span className="bg-gradient-to-r from-primary to-apple-green-dark bg-clip-text text-transparent">
              красота достигается через здоровье
            </span>
            <span className="text-foreground">.</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-fluid-lg text-muted-foreground animate-slide-up stagger-1">
            Мы решаем все проблемы кожи — от заболеваний до эстетики.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-slide-up stagger-2">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={onBookingClick}
              className="w-full sm:w-auto shadow-primary"
            >
              Записаться онлайн
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <a href="https://wa.me/79184128585" target="_blank" rel="noopener noreferrer">
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto border-2 bg-card/50 backdrop-blur-sm"
              >
                <MessageCircle className="mr-2 h-5 w-5 text-[#25D366]" />
                Написать в WhatsApp
              </Button>
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4 animate-fade-in stagger-3">
            {[
              { value: "15+", label: "лет опыта" },
              { value: "5000+", label: "пациентов" },
              { value: "50+", label: "процедур" },
              { value: "5.0", label: "рейтинг" },
            ].map((stat, i) => (
              <div key={i} className="text-center p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/30 shadow-sm">
                <div className="font-heading text-fluid-2xl font-bold text-primary">
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
