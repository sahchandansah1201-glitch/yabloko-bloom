import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBookingBar } from "@/components/layout/MobileBookingBar";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { BookingChoiceModal } from "@/components/conversion/BookingChoiceModal";
import { QuickBookingModal } from "@/components/conversion/QuickBookingModal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import {
  FileText,
  Building2,
  Shield,
  ScrollText,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";

export default function PatientsInfo() {
  const [isChoiceOpen, setIsChoiceOpen] = useState(false);
  const [isQuickOpen, setIsQuickOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openChoice = () => setIsChoiceOpen(true);

  return (
    <>
      <Helmet>
        <title>Информация для пациентов — клиника «Яблоко»</title>
        <meta
          name="description"
          content="Правовая информация клиники «Яблоко» в Краснодаре: лицензия № ЛО-23-01-014846, реквизиты, контролирующие органы, права пациентов по ФЗ-323."
        />
        <link rel="canonical" href="https://yabloko-clinic.ru/patients" />
      </Helmet>

      <Header onBookingClick={openChoice} />

      <main className="min-h-screen bg-background">
        <section className="bg-gradient-to-b from-secondary to-background py-16 md:py-24">
          <div className="container max-w-3xl text-center">
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="font-heading text-fluid-4xl font-bold text-foreground mb-4">
              Информация для пациентов клиники «Яблоко»
            </h1>
            <p className="text-fluid-lg text-muted-foreground">
              Лицензии, реквизиты, контролирующие органы и Ваши права — в соответствии с приказом Минздрава № 118н
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container max-w-3xl">
            <Accordion type="multiple" className="space-y-4">
              {/* Реквизиты и лицензии */}
              <AccordionItem value="requisites" className="rounded-xl border bg-card px-6">
                <AccordionTrigger className="text-lg font-heading font-semibold hover:no-underline gap-3">
                  <span className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-primary shrink-0" />
                    Реквизиты и Лицензии
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4 pb-6">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground/60 mb-1">Полное наименование</p>
                      <p className="text-foreground font-medium">ООО «Яблоко»</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground/60 mb-1">Директор</p>
                      <p className="text-foreground font-medium">Павлюк Мария Олеговна</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground/60 mb-1">Юридический адрес</p>
                      <p className="text-foreground">г. Краснодар, ул. 70-летия Октября, д. 1/2</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground/60 mb-1">ИНН / ОГРН</p>
                      <p className="text-foreground">ИНН: — / ОГРН: —</p>
                    </div>
                  </div>

                  <hr className="border-border" />

                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground/60 mb-2">Лицензия на осуществление медицинской деятельности</p>
                    <p className="text-foreground font-medium">№ ЛО-23-01-014846</p>
                    <p className="text-sm">Выдана Министерством здравоохранения Краснодарского края</p>
                  </div>

                  <div className="p-4 rounded-lg bg-secondary/50 border border-border/50 text-sm">
                    📄 Сканы лицензий доступны по запросу в клинике или могут быть загружены ниже (при наличии).
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Контролирующие органы */}
              <AccordionItem value="authorities" className="rounded-xl border bg-card px-6">
                <AccordionTrigger className="text-lg font-heading font-semibold hover:no-underline gap-3">
                  <span className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary shrink-0" />
                    Контролирующие органы
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-6 pb-6">
                  {[
                    {
                      name: "Министерство здравоохранения Краснодарского края",
                      address: "350000, г. Краснодар, ул. Коммунаров, 267",
                      phone: "+7 (861) 992-52-00",
                      url: "https://minzdrav.krasnodar.ru",
                    },
                    {
                      name: "Территориальный орган Росздравнадзора по Краснодарскому краю",
                      address: "350020, г. Краснодар, ул. Красная, 180",
                      phone: "+7 (861) 259-73-18",
                      url: "https://roszdravnadzor.gov.ru",
                    },
                    {
                      name: "Управление Роспотребнадзора по Краснодарскому краю",
                      address: "350000, г. Краснодар, ул. Рашпилевская, 100",
                      phone: "+7 (861) 259-36-12",
                      url: "https://23.rospotrebnadzor.ru",
                    },
                  ].map((org) => (
                    <div key={org.name} className="space-y-1.5">
                      <p className="text-foreground font-semibold">{org.name}</p>
                      <p className="flex items-start gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        {org.address}
                      </p>
                      <p className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-primary shrink-0" />
                        <a href={`tel:${org.phone.replace(/[^\d+]/g, "")}`} className="hover:text-primary">
                          {org.phone}
                        </a>
                      </p>
                      <a
                        href={org.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        {org.url.replace("https://", "")}
                      </a>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>

              {/* Правила и документы */}
              <AccordionItem value="documents" className="rounded-xl border bg-card px-6">
                <AccordionTrigger className="text-lg font-heading font-semibold hover:no-underline gap-3">
                  <span className="flex items-center gap-3">
                    <ScrollText className="h-5 w-5 text-primary shrink-0" />
                    Правила и Документы
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-4 pb-6">
                  {[
                    { title: "Устав организации", description: "Учредительный документ ООО «Яблоко»" },
                    { title: "Правила внутреннего распорядка для пациентов", description: "Порядок оказания медицинской помощи" },
                    { title: "Права и обязанности пациентов", description: "В соответствии с ФЗ-323 «Об основах охраны здоровья граждан»" },
                    { title: "Политика обработки персональных данных", description: "В соответствии с ФЗ-152", href: "/privacy" },
                    { title: "Информированное добровольное согласие", description: "Формы ИДС на медицинские вмешательства" },
                  ].map((doc) => (
                    <div
                      key={doc.title}
                      className="flex items-start gap-3 p-4 rounded-lg border border-border/50 bg-secondary/30 hover:bg-secondary/60 transition-colors"
                    >
                      <FileText className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        {doc.href ? (
                          <a href={doc.href} className="font-medium text-foreground hover:text-primary">
                            {doc.title}
                          </a>
                        ) : (
                          <p className="font-medium text-foreground">{doc.title}</p>
                        )}
                        <p className="text-sm mt-0.5">{doc.description}</p>
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>

      <Footer />
      <MobileBookingBar onBookingClick={openChoice} />

      <BookingChoiceModal
        isOpen={isChoiceOpen}
        onClose={() => setIsChoiceOpen(false)}
        onQuickContact={() => setIsQuickOpen(true)}
        onFullBooking={() => setIsBookingOpen(true)}
      />
      <QuickBookingModal
        isOpen={isQuickOpen}
        onClose={() => setIsQuickOpen(false)}
        onBack={() => setIsChoiceOpen(true)}
      />
      <BookingWizard
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onBack={() => setIsChoiceOpen(true)}
      />
    </>
  );
}
