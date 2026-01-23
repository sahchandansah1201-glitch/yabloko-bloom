import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Percent, ArrowRight } from "lucide-react";

interface PromoSectionProps {
  onBookingClick: () => void;
}

export function PromoSection({ onBookingClick }: PromoSectionProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Calculate end of month
    const now = new Date();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const updateTimer = () => {
      const now = new Date();
      const diff = endOfMonth.getTime() - now.getTime();

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

  const promos = [
    {
      title: "Скидка -30%",
      subtitle: "на лечение акне",
      description: "Комплексное лечение с гарантией результата",
      badge: "ХИТ",
    },
    {
      title: "Диспорт",
      subtitle: "126 руб/ед",
      description: "Коррекция мимических морщин",
      badge: "ВЫГОДНО",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-accent text-accent-foreground">
            <Percent className="h-3.5 w-3.5 mr-1" />
            Специальные предложения
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Акции и скидки
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Успейте воспользоваться выгодными предложениями до конца месяца
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-4 bg-accent/10 border border-accent/30 rounded-2xl px-6 py-4">
            <Clock className="h-5 w-5 text-accent" />
            <span className="text-sm font-medium text-foreground">Акция до конца месяца:</span>
            <div className="flex items-center gap-2">
              {[
                { value: timeLeft.days, label: "дн" },
                { value: timeLeft.hours, label: "ч" },
                { value: timeLeft.minutes, label: "м" },
                { value: timeLeft.seconds, label: "с" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div className="bg-accent text-accent-foreground font-heading font-bold text-lg w-10 h-10 rounded-lg flex items-center justify-center">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Promo Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {promos.map((promo, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-card to-accent/5 p-6 md:p-8 hover:border-accent/50 hover:shadow-accent transition-all duration-300"
            >
              {/* Badge */}
              <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                {promo.badge}
              </Badge>

              {/* Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-accent">
                    {promo.title}
                  </h3>
                  <p className="font-heading text-xl font-semibold text-foreground">
                    {promo.subtitle}
                  </p>
                </div>
                <p className="text-muted-foreground">
                  {promo.description}
                </p>
                <Button
                  onClick={onBookingClick}
                  className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Записаться
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
