import { motion } from "framer-motion";

interface ServiceTimelineProps {
  steps: string[];
}

export function ServiceTimeline({ steps }: ServiceTimelineProps) {
  if (!steps.length) return null;

  return (
    <section className="py-12 md:py-16">
      <div className="container max-w-4xl">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
          Как проходит процедура
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="relative flex flex-col items-center text-center"
            >
              {/* Step number */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold mb-4 shadow-md">
                {i + 1}
              </div>
              {/* Connector line (hidden on last) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-[calc(50%+28px)] w-[calc(100%-56px)] h-px bg-border" />
              )}
              <p className="text-sm text-muted-foreground leading-relaxed">{step}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
