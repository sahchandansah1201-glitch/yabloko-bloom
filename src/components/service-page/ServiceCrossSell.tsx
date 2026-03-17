import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ServiceCrossSellProps {
  items: { slug: string; title: string }[];
}

export function ServiceCrossSell({ items }: ServiceCrossSellProps) {
  if (!items.length) return null;

  return (
    <section className="py-12 md:py-16 bg-secondary/30">
      <div className="container max-w-3xl">
        <h2 className="font-heading text-2xl font-bold text-foreground mb-6 text-center">
          Часто сочетают с…
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {items.map((cs) => (
            <Link
              key={cs.slug}
              to={`/services/${cs.slug}`}
              className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:border-primary/40 hover:shadow-md"
            >
              {cs.title}
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
