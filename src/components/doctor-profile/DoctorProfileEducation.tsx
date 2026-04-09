import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, FileCheck, MapPin, ShieldCheck } from "lucide-react";

interface Props {
  timeline?: { year: string; text: string }[];
  internships?: string[];
  certificates?: string[];
  education?: string;
  accreditation?: { title: string; validUntil?: string }[];
}

export function DoctorProfileEducation({ timeline, internships, certificates, education, accreditation }: Props) {
  const hasTimeline = timeline && timeline.length > 0;
  const hasCerts = certificates && certificates.length > 0;
  const hasAccreditation = accreditation && accreditation.length > 0;

  if (!hasTimeline && !hasCerts && !education && !hasAccreditation) return null;

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

          <Tabs defaultValue={hasTimeline ? "education" : "certificates"} className="max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="education" className="gap-2" disabled={!hasTimeline}>
                <GraduationCap className="h-4 w-4" />
                Образование
              </TabsTrigger>
              <TabsTrigger value="certificates" className="gap-2" disabled={!hasCerts}>
                <FileCheck className="h-4 w-4" />
                Сертификаты
              </TabsTrigger>
            </TabsList>

            {hasTimeline && (
              <TabsContent value="education" className="mt-6 space-y-6">
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
                {internships && internships.length > 0 && (
                  <div className="rounded-xl bg-secondary/60 border p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <p className="font-heading text-sm font-semibold">Стажировки</p>
                    </div>
                    {internships.map((item, i) => (
                      <p key={i} className="text-sm text-muted-foreground">{item}</p>
                    ))}
                  </div>
                )}
              </TabsContent>
            )}

            {hasCerts && (
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
            )}
          </Tabs>

          {/* Qualification block */}
          {(education || hasAccreditation) && (
            <div className="mt-8 max-w-3xl mx-auto rounded-xl border bg-secondary/40 p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <h3 className="font-heading text-base font-semibold">Квалификация</h3>
              </div>
              {education && (
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground/60 mb-1">Уровень образования</p>
                  <p className="text-sm text-foreground">{education}</p>
                </div>
              )}
              {hasAccreditation && (
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground/60 mb-2">Аккредитация / Сертификаты</p>
                  <ul className="space-y-2">
                    {accreditation!.map((acc, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                        <span>
                          {acc.title}
                          {acc.validUntil && (
                            <span className="ml-2 text-xs text-muted-foreground">(действ. до {acc.validUntil})</span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
