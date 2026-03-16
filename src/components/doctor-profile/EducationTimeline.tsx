import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, FileCheck, MapPin } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const timeline = [
  { year: "2005–2011", text: "Кубанский Государственный Медицинский Университет (КубГМУ)" },
  { year: "2008", text: "Начало практики в косметологии (НПЛ Шарм Клео)" },
  { year: "2017", text: "Повышение квалификации по Дерматовенерологии" },
  { year: "2018", text: "Повышение квалификации по Косметологии" },
];

const internships = [
  "Кафедра Эстетической медицины РУДН (г. Москва)",
];

const certificates = [
  "Диплом КубГМУ — Лечебное дело",
  "Сертификат специалиста по дерматовенерологии",
  "Сертификат специалиста по косметологии",
  "Сертификат по инъекционным методам омоложения",
  "Сертификат по работе с лазерным оборудованием",
  "Сертификат по трихологии",
];

export function EducationTimeline() {
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl mb-8 text-center">
            Образование и сертификаты
          </h2>

          <Tabs defaultValue="education" className="max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="education" className="gap-2">
                <GraduationCap className="h-4 w-4" />
                Образование
              </TabsTrigger>
              <TabsTrigger value="certificates" className="gap-2">
                <FileCheck className="h-4 w-4" />
                Сертификаты
              </TabsTrigger>
            </TabsList>

            <TabsContent value="education" className="mt-6 space-y-6">
              {/* Timeline */}
              <div className="relative space-y-6 pl-8 before:absolute before:left-3 before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-border">
                {timeline.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative"
                  >
                    <div className="absolute -left-8 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                      <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                    </div>
                    <p className="text-xs font-semibold text-primary">{item.year}</p>
                    <p className="text-sm text-foreground">{item.text}</p>
                  </motion.div>
                ))}
              </div>

              {/* Internships */}
              <div className="rounded-xl bg-secondary/60 border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <p className="font-heading text-sm font-semibold">Стажировки</p>
                </div>
                {internships.map((item, i) => (
                  <p key={i} className="text-sm text-muted-foreground">{item}</p>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="certificates" className="mt-6">
              <ul className="space-y-3">
                {certificates.map((cert, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3 text-sm"
                  >
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    {cert}
                  </motion.li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>

          {/* Certificate Gallery Carousel */}
          <div className="mt-12 max-w-3xl mx-auto">
            <h3 className="font-heading text-lg font-semibold mb-4 text-center">Дипломы и сертификаты</h3>
            <Carousel className="w-full">
              <CarouselContent>
                {[1, 2, 3, 4].map((i) => (
                  <CarouselItem key={i} className="basis-1/2 md:basis-1/3">
                    <div className="aspect-[3/4] rounded-xl bg-muted border flex items-center justify-center">
                      <div className="text-center text-muted-foreground p-4">
                        <FileCheck className="mx-auto mb-2 h-8 w-8" />
                        <p className="text-xs">Сертификат {i}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-4" />
              <CarouselNext className="-right-4" />
            </Carousel>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
