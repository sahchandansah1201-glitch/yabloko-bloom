import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { interiorPhotos } from "@/assets/interiors";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export function InteriorCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          custom={0}
          variants={fadeUp}
          viewport={{ once: true }}
          className="text-center font-heading text-2xl font-bold md:text-3xl"
        >
          Интерьер клиники
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          custom={1}
          variants={fadeUp}
          viewport={{ once: true }}
          className="mx-auto mt-3 max-w-lg text-center text-muted-foreground"
        >
          Уютная атмосфера и современное оснащение для вашего комфорта
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          custom={2}
          variants={fadeUp}
          viewport={{ once: true }}
          className="mt-10"
        >
          <Carousel
            setApi={setApi}
            opts={{ align: "start", loop: true }}
            className="mx-auto w-full max-w-5xl"
          >
            <CarouselContent className="-ml-4">
              {interiorPhotos.map((photo, i) => (
                <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
                    <div className="aspect-[3/2]">
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 hidden md:flex" />
            <CarouselNext className="-right-4 hidden md:flex" />
          </Carousel>

          {/* Dot indicators — visible on mobile */}
          {count > 1 && (
            <div className="mt-4 flex items-center justify-center gap-2 md:hidden">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => api?.scrollTo(i)}
                  aria-label={`Перейти к фото ${i + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    current === i
                      ? "w-6 bg-primary"
                      : "w-2 bg-primary/30"
                  )}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
