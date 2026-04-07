import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Calendar } from "lucide-react";

interface PricingItem {
  name: string;
  price: string;
  valueTag?: string;
}

interface ServicePricingProps {
  pricing: PricingItem[];
  onBook?: (serviceName: string) => void;
}

export function ServicePricing({ pricing, onBook }: ServicePricingProps) {
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
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-lg font-bold text-primary whitespace-nowrap">{p.price}</span>
                  {onBook && (
                    <Button
                      size="sm"
                      variant="hero"
                      className="text-xs h-8 px-3 gap-1"
                      onClick={() => onBook(p.name)}
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Записаться</span>
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
