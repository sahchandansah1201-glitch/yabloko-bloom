import { Badge } from "@/components/ui/badge";
import { Check, Zap, Shield, Thermometer } from "lucide-react";

export function TechnologySection() {
  const features = [
    {
      icon: Thermometer,
      title: "Охлаждение до -10°C",
      description: "Без боли во время процедуры",
    },
    {
      icon: Zap,
      title: "Удаление 95% волос",
      description: "Гарантированный результат за курс",
    },
    {
      icon: Shield,
      title: "Безопасно для загорелой кожи",
      description: "Подходит для всех фототипов",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary shadow-xl">
              {/* Placeholder for technology image */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-apple-green-light via-background to-secondary">
                <div className="text-center p-8">
                  <Zap className="h-20 w-20 text-primary/40 mx-auto mb-4" />
                  <p className="text-muted-foreground text-sm">SharpLight Technology</p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 left-6 bg-card rounded-xl shadow-lg p-4 border border-border/50">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-foreground">FDA одобрено</p>
                  <p className="text-xs text-muted-foreground">Сертифицировано</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <Badge variant="outline" className="mb-4 border-primary text-primary">
              Передовое оборудование
            </Badge>
            
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Технологии SharpLight
              <span className="text-primary"> (Израиль)</span>
            </h2>
            
            <p className="text-muted-foreground text-lg mb-8">
              Используем только сертифицированное оборудование премиум-класса для достижения 
              максимального результата при полной безопасности процедур.
            </p>

            {/* Features List */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="h-12 w-12 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
