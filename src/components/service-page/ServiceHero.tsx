import { motion } from "framer-motion";
import { Clock, ShieldCheck, BadgeCheck, Calendar, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  duration: string;
  recovery: string;
  certification?: string;
  onBook: () => void;
}

export function ServiceHero({ title, subtitle, duration, recovery, certification = "Зарегистрировано в качестве медицинского изделия", onBook }: ServiceHeroProps) {
  const isConsultation = certification === "Аккредитованный врач";
  const normalizedDuration = duration.endsWith('.') ? duration : `${duration}.`;
  const durationLabel = isConsultation ? duration : `${normalizedDuration} длительность`;
  const recoveryLabel = isConsultation ? recovery : `${recovery} реабилитация`;
  return (
    <section className="py-12 md:py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
        >
          {/* Left — Value Proposition */}
          <div>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{subtitle}</p>
            )}
            <div className="flex flex-wrap gap-3 mb-8">
              <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-sm">
                <Clock className="h-3.5 w-3.5" />
                {durationLabel}
              </Badge>
              <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-sm">
                <ShieldCheck className="h-3.5 w-3.5" />
                {recoveryLabel}
              </Badge>
              <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-sm">
                <BadgeCheck className="h-3.5 w-3.5" />
                {certification}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="hero" size="xl" onClick={onBook} className="rounded-full">
                <Calendar className="h-5 w-5" />
                Записаться онлайн
              </Button>
              <button
                type="button"
                className="group flex items-center gap-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/5 text-primary group-hover:bg-primary/10 group-hover:border-primary/50 transition-all">
                  <Play className="h-4 w-4 ml-0.5" />
                </span>
                Как мы работаем
              </button>
            </div>
          </div>

          {/* Right — Video / Image placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative aspect-[4/3] rounded-[24px] overflow-hidden bg-secondary border border-border group"
          >
            {/* Simulated video overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg group-hover:scale-110 transition-transform cursor-pointer">
                <Play className="h-7 w-7 ml-1" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">Видео консультации</span>
            </div>
            {/* Subtle animated dots to simulate a "live" feel */}
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-medium text-muted-foreground">Клиника Яблоко</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
