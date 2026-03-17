import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { pavlyukMaria, allamAlisa, grachevaVictoria } from "@/assets/doctors";
import type { ServiceItem } from "@/data/servicesData";

// Map category to a set of doctor avatars for social proof
const categoryDoctors: Record<string, { src: string; fallback: string }[]> = {
  cosmetology: [
    { src: pavlyukMaria, fallback: "МП" },
    { src: allamAlisa, fallback: "АА" },
    { src: grachevaVictoria, fallback: "ГВ" },
  ],
  dermatology: [
    { src: allamAlisa, fallback: "АА" },
    { src: pavlyukMaria, fallback: "МП" },
  ],
  trichology: [
    { src: grachevaVictoria, fallback: "ГВ" },
    { src: allamAlisa, fallback: "АА" },
  ],
  health: [
    { src: pavlyukMaria, fallback: "МП" },
    { src: grachevaVictoria, fallback: "ГВ" },
    { src: allamAlisa, fallback: "АА" },
  ],
};

interface ServiceCardProps {
  service: ServiceItem;
  onNavigate: () => void;
  onBook: () => void;
}

export function ServiceCard({ service, onNavigate, onBook }: ServiceCardProps) {
  const doctors = categoryDoctors[service.category] ?? categoryDoctors.cosmetology;
  const doctorCount = doctors.length;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
      className="group flex flex-col justify-between rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:shadow-lg hover:border-primary/40"
    >
      {/* Top: title + price, clickable to navigate */}
      <button onClick={onNavigate} className="text-left">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-heading text-base font-semibold text-foreground group-hover:text-primary transition-colors">
            {service.title}
          </h3>
          <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
        </div>
        <p className="mt-1.5 text-sm font-medium text-primary">{service.priceFrom}</p>
      </button>

      {/* Bottom: avatars + booking CTA */}
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/40 pt-3.5">
        {/* Doctor avatars */}
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {doctors.slice(0, 2).map((doc, i) => (
              <Avatar key={i} className="h-7 w-7 border-2 border-card">
                <AvatarImage src={doc.src} alt="Врач" className="object-cover" />
                <AvatarFallback className="text-[10px] bg-secondary text-muted-foreground">
                  {doc.fallback}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {doctorCount === 1 ? "Выполняет 1 врач" : `Выполняют ${doctorCount} врача`}
          </span>
        </div>

        {/* Booking button */}
        <Button
          size="sm"
          variant="hero"
          className="shrink-0 text-xs h-8 px-3"
          onClick={(e) => {
            e.stopPropagation();
            onBook();
          }}
        >
          Записаться
        </Button>
      </div>
    </motion.div>
  );
}
