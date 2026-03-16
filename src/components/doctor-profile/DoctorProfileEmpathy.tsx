import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface Props {
  quote: string;
  author: string;
}

export function DoctorProfileEmpathy({ quote, author }: Props) {
  return (
    <section className="py-12 md:py-16">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl bg-secondary/60 border p-8 md:p-12"
        >
          <Quote className="absolute top-6 left-6 h-10 w-10 text-primary/20" />
          <blockquote className="relative z-10 text-lg leading-relaxed text-foreground md:text-xl">
            «{quote}»
          </blockquote>
          <p className="mt-4 font-heading font-semibold text-muted-foreground">— {author}</p>
        </motion.div>
      </div>
    </section>
  );
}
