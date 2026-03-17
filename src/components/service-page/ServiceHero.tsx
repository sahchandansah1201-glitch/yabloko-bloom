import { motion } from "framer-motion";
import { Clock, ShieldCheck, BadgeCheck, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  duration: string;
  recovery: string;
  onBook: () => void;
}

export function ServiceHero({ title, subtitle, duration, recovery, onBook }: ServiceHeroProps) {
  return (
    <section className="py-12 md:py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
        >
          {/* Left */}
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
                {duration}
              </Badge>
              <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-sm">
                <ShieldCheck className="h-3.5 w-3.5" />
                {recovery}
              </Badge>
              <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-sm">
                <BadgeCheck className="h-3.5 w-3.5" />
                Сертифицировано
              </Badge>
            </div>
            <Button variant="hero" size="xl" onClick={onBook} className="rounded-full">
              <Calendar className="h-5 w-5" />
              Записаться онлайн
            </Button>
          </div>

          {/* Right — image placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative aspect-[4/3] rounded-[24px] overflow-hidden bg-secondary border border-border"
          >
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30">
              <ShieldCheck className="h-20 w-20" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
