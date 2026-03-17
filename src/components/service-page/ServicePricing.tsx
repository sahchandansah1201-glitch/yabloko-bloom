import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface PricingItem {
  name: string;
  price: string;
  valueTag?: string;
}

interface ServicePricingProps {
  pricing: PricingItem[];
}

export function ServicePricing({ pricing }: ServicePricingProps) {
  if (!pricing.length) return null;

  return (
    <section className="py-12 md:py-16">
      <div className="container max-w-3xl">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
          Стоимость
        </h2>
        <div className="space-y-3">
          {pricing.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
            >
              <Card className="flex items-center justify-between gap-4 p-5 hover:shadow-md hover:border-primary/30 transition-all">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{p.name}</p>
                  {p.valueTag && (
                    <Badge variant="secondary" className="mt-1.5 gap-1 text-xs font-normal">
                      <Sparkles className="h-3 w-3 text-primary" />
                      {p.valueTag}
                    </Badge>
                  )}
                </div>
                <span className="text-lg font-bold text-primary whitespace-nowrap">{p.price}</span>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
