import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Calendar, Award } from "lucide-react";

interface DoctorProfileHeroProps {
  name: string;
  specialty: string;
  photo: string | null | undefined;
  isTopSpecialist: boolean | null;
  experience?: string;
  onBookingClick: () => void;
}

export function DoctorProfileHero({ name, specialty, photo, isTopSpecialist, experience, onBookingClick }: DoctorProfileHeroProps) {
  const specialties = specialty.split(",").map(s => s.trim());

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary/50 py-12 md:py-20">
      <div className="container">
        <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-sm md:max-w-none"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-muted shadow-xl ring-4 ring-primary/10">
              {photo ? (
                <img src={photo} alt={name} className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-primary/5 to-primary/15">
                  <span className="font-heading text-4xl font-bold text-primary/30">
                    {name.split(" ").map(w => w[0]).join("")}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 pt-6 md:pt-0"
          >
            <div className="flex flex-wrap items-center gap-3">
              {experience && <Badge variant="secondary">Стаж {experience}</Badge>}
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-medium text-muted-foreground">5.0</span>
              </div>
            </div>

            <h1 className="font-heading text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
              {name}
            </h1>

            <div className="flex flex-wrap gap-2">
              {specialties.map((spec) => (
                <span key={spec} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground">
                  {spec}
                </span>
              ))}
            </div>

            <Button size="lg" className="gap-2 rounded-full px-8 text-base" onClick={onBookingClick}>
              <Calendar className="h-5 w-5" />
              Записаться к врачу
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
