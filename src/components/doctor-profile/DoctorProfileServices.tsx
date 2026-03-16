import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Stethoscope, Scissors } from "lucide-react";

const iconMap: Record<string, typeof Sparkles> = {
  sparkles: Sparkles,
  stethoscope: Stethoscope,
  scissors: Scissors,
};

interface Props {
  services: { icon: string; title: string; items: string[] }[];
}

export function DoctorProfileServices({ services }: Props) {
  return (
    <section className="py-12 md:py-16 bg-secondary/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl mb-8 text-center">
            Специализация и услуги
          </h2>
          <div className={`grid gap-6 ${services.length >= 3 ? "md:grid-cols-3" : services.length === 2 ? "md:grid-cols-2 max-w-3xl mx-auto" : "max-w-md mx-auto"}`}>
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] || Stethoscope;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 mb-2">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="font-heading text-lg">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {service.items.map((item) => (
                          <span
                            key={item}
                            className="cursor-pointer rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
