import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Calendar, Shield, Award } from "lucide-react";

interface DoctorHeroProps {
  onBookingClick: () => void;
}

export function DoctorHero({ onBookingClick }: DoctorHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary/50 py-12 md:py-20">
      <div className="container">
        <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-16">
          {/* Left: Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-sm md:max-w-none"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-muted shadow-xl ring-4 ring-primary/10">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-primary/5 to-primary/15 p-8 text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-12 w-12 text-primary" />
                </div>
                <p className="font-heading text-lg font-semibold text-foreground">Фото врача</p>
                <p className="text-sm text-muted-foreground">Павлюк Мария Олеговна</p>
              </div>
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -bottom-4 left-4 right-4 rounded-2xl bg-card p-4 shadow-lg border"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <span className="font-heading font-bold">4.8</span>
                  <span className="text-sm text-muted-foreground">ПроДокторов</span>
                </div>
                <div className="h-4 w-px bg-border" />
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <span className="font-heading font-bold">5.0</span>
                  <span className="text-sm text-muted-foreground">Яндекс</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Data */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 pt-6 md:pt-0"
          >
            <div className="flex flex-wrap gap-2">
              <Badge className="gap-1 bg-primary text-primary-foreground">
                <Award className="h-3 w-3" />
                Главный врач
              </Badge>
              <Badge variant="secondary" className="gap-1">
                Стаж 15 лет
              </Badge>
            </div>

            <h1 className="font-heading text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
              Павлюк Мария Олеговна
            </h1>

            <div className="flex flex-wrap gap-2">
              {["Дерматовенеролог", "Косметолог", "Трихолог", "Специалист Anti-Age медицины"].map((spec) => (
                <span
                  key={spec}
                  className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground"
                >
                  {spec}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span>ПроДокторов: 4.8 ⭐ | Яндекс: 5.0 ⭐</span>
              <span className="text-xs">(Основано на 120+ отзывах)</span>
            </div>

            <Button
              size="lg"
              className="gap-2 rounded-full px-8 text-base shadow-primary"
              onClick={onBookingClick}
            >
              <Calendar className="h-5 w-5" />
              Записаться к врачу
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
