import { ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ServiceContentProps {
  description?: string[];
  indications?: string[];
  benefits?: string[];
  contraindications?: string[];
  title?: string;
}

export function ServiceContent({ description, indications, benefits, contraindications }: ServiceContentProps) {
  const hasIndicationsOrBenefits = (indications && indications.length > 0) || (benefits && benefits.length > 0);

  return (
    <>
      {/* Description */}
      {description && description.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container max-w-3xl">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">О процедуре</h2>
            <div className="space-y-4">
              {description.map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Indications & Benefits */}
      {hasIndicationsOrBenefits && (
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container max-w-4xl">
            <div className="grid md:grid-cols-2 gap-8">
              {indications && indications.length > 0 && (
                <div>
                  <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-4">Показания</h2>
                  <ul className="space-y-2">
                    {indications.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {benefits && benefits.length > 0 && (
                <div>
                  <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-4">Преимущества</h2>
                  <ul className="space-y-2">
                    {benefits.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ShieldCheck className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Contraindications */}
      {contraindications && contraindications.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container max-w-3xl">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">Противопоказания</h2>
            <Card className="p-6">
              <ul className="space-y-2">
                {contraindications.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-destructive shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>
      )}
    </>
  );
}
