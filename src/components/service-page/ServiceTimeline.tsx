import { motion } from "framer-motion";
import { ScanSearch, ClipboardList, Sparkles, HeartHandshake } from "lucide-react";

interface ServiceTimelineProps {
  steps: string[];
}

const defaultSteps = [
  { icon: ScanSearch, label: "Цифровая диагностика" },
  { icon: ClipboardList, label: "Персональный план" },
  { icon: Sparkles, label: "Процедура" },
  { icon: HeartHandshake, label: "Постпроцедурная поддержка" },
];

export function ServiceTimeline({ steps }: ServiceTimelineProps) {
  const displaySteps = steps.length > 0
    ? steps.map((s, i) => ({ icon: defaultSteps[i]?.icon ?? Sparkles, label: s }))
    : defaultSteps;

  return (
    <section className="py-12 md:py-16">
      <div className="container max-w-4xl">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3 text-center">
          Путь к вашей красоте
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-10">
          Каждый этап — под контролем вашего врача
        </p>

        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-border z-0" />

          {displaySteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="relative z-10 group"
              >
                <div className="flex flex-col items-center text-center bg-card rounded-2xl border border-border p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 group-hover:-translate-y-1">
                  {/* Step circle */}
                  <div className="relative mb-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold shadow-sm">
                      {i + 1}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground leading-snug">{step.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
