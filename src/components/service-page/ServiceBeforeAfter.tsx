import { motion } from "framer-motion";

export function ServiceBeforeAfter() {
  return (
    <section className="py-12 md:py-16">
      <div className="container max-w-4xl">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
          Результаты: До и После
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden border border-border bg-card p-2"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden bg-secondary">
                <span className="absolute bottom-2 left-2 text-xs font-medium bg-card/90 backdrop-blur-sm px-2 py-1 rounded-md text-foreground">
                  До
                </span>
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden bg-secondary">
                <span className="absolute bottom-2 left-2 text-xs font-medium bg-primary/90 backdrop-blur-sm px-2 py-1 rounded-md text-primary-foreground">
                  После
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
