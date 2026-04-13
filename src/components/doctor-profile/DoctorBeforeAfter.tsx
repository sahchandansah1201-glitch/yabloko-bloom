import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { BeforeAfterCase } from "@/data/doctorProfiles";

interface DoctorBeforeAfterProps {
  cases: BeforeAfterCase[];
  doctorName: string;
}

export function DoctorBeforeAfter({ cases, doctorName }: DoctorBeforeAfterProps) {
  if (!cases.length) return null;

  const shortName = doctorName.split(" ").slice(0, 2).join(" ");

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
            Результаты лечения
          </h2>

          <Carousel className="max-w-3xl mx-auto">
            <CarouselContent>
              {cases.map((c, i) => (
                <CarouselItem key={i}>
                  <div className="rounded-2xl border bg-card p-4 md:p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative aspect-square rounded-xl bg-muted flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <p className="font-heading font-semibold text-lg">До</p>
                          <p className="text-xs mt-1">{c.title}</p>
                        </div>
                        <div className="absolute bottom-2 left-2 rounded bg-foreground/70 px-2 py-0.5 text-xs text-background font-semibold">
                          До
                        </div>
                      </div>
                      <div className="relative aspect-square rounded-xl bg-muted flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <p className="font-heading font-semibold text-lg">После</p>
                          <p className="text-xs mt-1">{c.title}</p>
                        </div>
                        <div className="absolute bottom-2 right-2 rounded bg-primary px-2 py-0.5 text-xs text-primary-foreground font-semibold">
                          После
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-center text-sm text-muted-foreground italic">
                      {c.title}{c.sessions ? ` · ${c.sessions}` : ""}
                    </p>
                    <p className="text-center text-xs text-muted-foreground/60 mt-1">
                      Работа врача {shortName}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4" />
            <CarouselNext className="-right-4" />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
