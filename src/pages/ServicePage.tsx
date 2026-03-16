import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Clock, ShieldCheck, Calendar, ArrowRight, Star, ChevronRight,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBookingBar } from "@/components/layout/MobileBookingBar";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { getServicePageData, getServiceBySlug } from "@/data/servicesData";
import { useDoctor } from "@/hooks/useDoctor";
import { useDoctors } from "@/hooks/useDoctors";
import { doctorPhotos } from "@/assets/doctors";
import { User } from "lucide-react";
import NotFound from "./NotFound";

/* ── Mini Doctor Card ──────────────────────────────── */
function ServiceDoctorCard({
  name,
  specialty,
  slug,
  onBook,
}: {
  name: string;
  specialty: string;
  slug: string | null;
  onBook: () => void;
}) {
  const photo = doctorPhotos[name];
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:border-primary/40">
      {/* Photo */}
      <div
        className="relative aspect-[3/4] w-full overflow-hidden bg-secondary cursor-pointer"
        onClick={() => slug && navigate(`/doctor/${slug}`)}
      >
        {photo ? (
          <img src={photo} alt={name} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <User className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        <Badge className="absolute top-3 left-3 gap-1 bg-card/90 text-foreground backdrop-blur-sm shadow-sm border-0">
          <Star className="h-3 w-3 fill-primary text-primary" />
          5.0
        </Badge>
      </div>

      {/* Info */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-heading text-sm font-semibold text-foreground line-clamp-1">{name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{specialty}</p>
        </div>
        <Button size="sm" className="w-full" onClick={onBook}>
          <Calendar className="h-4 w-4 mr-1" />
          Записаться
        </Button>
      </div>
    </Card>
  );
}

/* ── Service Page ──────────────────────────────────── */
export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedDoctorId, setPreselectedDoctorId] = useState<string | null>(null);

  const pageData = slug ? getServicePageData(slug) : undefined;
  const serviceItem = slug ? getServiceBySlug(slug) : undefined;
  const { data: allDoctors } = useDoctors();

  if (!pageData && !serviceItem) return <NotFound />;

  const title = pageData?.title ?? serviceItem?.title ?? "";
  const subtitle = pageData?.subtitle ?? "";
  const duration = pageData?.duration ?? "30 мин";
  const recovery = pageData?.recovery ?? "Без реабилитации";
  const pricing = pageData?.pricing ?? [];
  const faq = pageData?.faq ?? [];
  const crossSell = pageData?.crossSell ?? [];

  // Match doctors by slug
  const relatedDoctors = allDoctors?.filter((d) =>
    pageData?.doctorSlugs?.includes(d.slug ?? "")
  ) ?? [];

  const openBookingForDoctor = (doctorId: string) => {
    setPreselectedDoctorId(doctorId);
    setIsBookingOpen(true);
  };

  // FAQ Schema
  const faqSchema = faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  } : null;

  return (
    <>
      <Helmet>
        <title>{title} | Клиника Яблоко Краснодар</title>
        <meta name="description" content={`${title} в клинике Яблоко. ${subtitle} Запишитесь онлайн.`} />
        {faqSchema && (
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        )}
      </Helmet>

      <Header onBookingClick={() => setIsBookingOpen(true)} />

      <main className="min-h-screen bg-background">
        {/* Breadcrumbs */}
        <div className="container pt-4">
          <nav className="flex items-center gap-1 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/services" className="hover:text-primary transition-colors">Услуги</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium truncate">{title}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="py-12 md:py-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
            >
              {/* Left */}
              <div>
                <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-lg text-muted-foreground mb-6">{subtitle}</p>
                )}
                <div className="flex flex-wrap gap-3 mb-8">
                  <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-sm">
                    <Clock className="h-3.5 w-3.5" />
                    {duration}
                  </Badge>
                  <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-sm">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Реабилитация: {recovery}
                  </Badge>
                </div>
                <Button
                  variant="hero"
                  size="xl"
                  onClick={() => setIsBookingOpen(true)}
                >
                  <Calendar className="h-5 w-5" />
                  Записаться на процедуру
                </Button>
              </div>

              {/* Right — placeholder image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-secondary">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/40">
                  <ShieldCheck className="h-20 w-20" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Description */}
        {pageData?.description && pageData.description.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container max-w-3xl">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                О процедуре
              </h2>
              <div className="space-y-4">
                {pageData.description.map((p, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Indications & Benefits side-by-side */}
        {(pageData?.indications || pageData?.benefits) && (
          <section className="py-12 md:py-16 bg-secondary/30">
            <div className="container max-w-4xl">
              <div className="grid md:grid-cols-2 gap-8">
                {pageData?.indications && pageData.indications.length > 0 && (
                  <div>
                    <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-4">
                      Показания
                    </h2>
                    <ul className="space-y-2">
                      {pageData.indications.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {pageData?.benefits && pageData.benefits.length > 0 && (
                  <div>
                    <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-4">
                      Преимущества
                    </h2>
                    <ul className="space-y-2">
                      {pageData.benefits.map((item, i) => (
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

        {/* How it works */}
        {pageData?.howItWorks && pageData.howItWorks.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container max-w-3xl">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">
                Как проходит процедура
              </h2>
              <div className="space-y-4">
                {pageData.howItWorks.map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {i + 1}
                    </span>
                    <p className="text-muted-foreground pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Contraindications */}
        {pageData?.contraindications && pageData.contraindications.length > 0 && (
          <section className="py-12 md:py-16 bg-secondary/30">
            <div className="container max-w-3xl">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                Противопоказания
              </h2>
              <Card className="p-6">
                <ul className="space-y-2">
                  {pageData.contraindications.map((item, i) => (
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

        {/* Doctors */}
        {relatedDoctors.length > 0 && (
          <section className="py-12 md:py-16 bg-secondary/30">
            <div className="container">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">
                Врачи, выполняющие процедуру
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {relatedDoctors.map((doc) => (
                  <ServiceDoctorCard
                    key={doc.id}
                    name={doc.name}
                    specialty={doc.specialty}
                    slug={doc.slug}
                    onBook={() => openBookingForDoctor(doc.id)}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Pricing */}
        {pricing.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container max-w-3xl">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">
                Стоимость
              </h2>
              <Card className="overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Услуга</TableHead>
                      <TableHead className="text-right">Цена</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pricing.map((p, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{p.name}</TableCell>
                        <TableCell className="text-right font-semibold text-primary whitespace-nowrap">
                          {p.price}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </section>
        )}

        {/* Cross-sell */}
        {crossSell.length > 0 && (
          <section className="py-12 md:py-16 bg-secondary/30">
            <div className="container max-w-3xl">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                Часто сочетают с…
              </h2>
              <div className="flex flex-wrap gap-3">
                {crossSell.map((cs) => (
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
        )}

        {/* FAQ */}
        {faq.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container max-w-3xl">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">
                Частые вопросы
              </h2>
              <Accordion type="single" collapsible className="space-y-2">
                {faq.map((f, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border rounded-xl px-5 bg-card">
                    <AccordionTrigger className="text-left font-medium hover:no-underline">
                      {f.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {f.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        )}

        {/* Sticky Mobile CTA */}
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card p-3 shadow-lg md:hidden">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-foreground">
              {pricing[0]?.price ?? serviceItem?.priceFrom ?? ""}
            </span>
            <Button variant="hero" className="flex-1" onClick={() => setIsBookingOpen(true)}>
              <Calendar className="h-4 w-4" />
              Записаться
            </Button>
          </div>
        </div>
      </main>

      <Footer />

      <BookingWizard
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedDoctorId={preselectedDoctorId}
      />
    </>
  );
}
