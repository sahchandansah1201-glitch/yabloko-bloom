import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { interiorPhotos } from "@/assets/interiors";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export function InteriorCarousel() {
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
        </motion.div>
      </div>
    </section>
  );
}
