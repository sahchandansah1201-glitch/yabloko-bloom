import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Heart, ShieldCheck, Award, ArrowRight, Star, FileText,
  Calendar, Phone, ChevronRight, Sparkles, Zap, Sun
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { InteriorCarousel } from "@/components/about/InteriorCarousel";
import { MobileBookingBar } from "@/components/layout/MobileBookingBar";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { pavlyukMaria } from "@/assets/doctors";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const philosophyCards = [
  {
    icon: Heart,
    title: "Интегративный подход",
    text: "Мы объединили косметологию, дерматологию, нутрициологию и остеопатию для комплексного результата.",
  },
  {
    icon: ShieldCheck,
    title: "Абсолютная безопасность",
    text: "Только сертифицированные препараты и строгое соблюдение протоколов СанПиН.",
  },
  {
    icon: Award,
    title: "Команда экспертов",
    text: "Врачи с высшим образованием, регулярно проходящие стажировки в РФ и за рубежом.",
  },
];

const equipmentCards = [
  {
    name: "Candela (США)",
    description: "Золотой стандарт лазерной эпиляции",
    icon: Zap,
  },
  {
    name: "Ultraformer III",
    description: "Безоперационный SMAS-лифтинг",
    icon: Sparkles,
  },
  {
    name: "Nordlys",
    description: "Фотоомоложение и лечение сосудов",
    icon: Sun,
  },
];

const About = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>О клинике Яблоко — Красота через здоровье | Краснодар</title>
        <meta
          name="description"
          content="Клиника «Яблоко» — концептуальный центр эстетической и интегративной медицины в Краснодаре. Лицензированные врачи, оригинальное оборудование, безопасность."
        />
      </Helmet>

      <Header onBookingClick={() => setIsBookingOpen(true)} />

      <main className="pt-32">
        {/* ─── SECTION 1: Mission Hero ─── */}
        <section className="bg-background py-16 md:py-24">
          <div className="container">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                <motion.h1
                  custom={0}
                  variants={fadeUp}
                  className="font-heading text-fluid-4xl font-bold leading-tight"
                >
                  Красота через здоровье
                </motion.h1>
                <motion.p
                  custom={1}
                  variants={fadeUp}
                  className="mt-4 max-w-lg text-fluid-lg text-muted-foreground"
                >
                  Клиника «Яблоко» — это концептуальный центр эстетической и
                  интегративной медицины в Краснодаре, где мы лечим причины, а не
                  маскируем следствия.
                </motion.p>

                <motion.div
                  custom={2}
                  variants={fadeUp}
                  className="mt-6 flex flex-wrap gap-3"
                >
                  <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-sm">
                    Основана в 2018 году
                  </Badge>
                  <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-sm">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Медицинская лицензия РФ
                  </Badge>
                  <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-sm">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    Рейтинг 5.0
                  </Badge>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-secondary"
              >
                <img
                  src={pavlyukMaria}
                  alt="Главный врач клиники Яблоко — Павлюк Мария Олеговна"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 1.5: Interior Carousel ─── */}
        <InteriorCarousel />

        {/* ─── SECTION 2: Philosophy ─── */}
        <section className="py-16 md:py-24">
          <div className="container">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              custom={0}
              variants={fadeUp}
              viewport={{ once: true }}
              className="text-center font-heading text-fluid-2xl font-bold"
            >
              Почему выбирают нас
            </motion.h2>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {philosophyCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial="hidden"
                  whileInView="visible"
                  custom={i + 1}
                  variants={fadeUp}
                  viewport={{ once: true }}
                  className="rounded-3xl border border-border bg-card p-8 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary">
                    <card.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-fluid-lg font-semibold">{card.title}</h3>
                  <p className="mt-2 text-fluid-sm leading-relaxed text-muted-foreground">
                    {card.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: Equipment ─── */}
        <section className="bg-secondary py-16 md:py-24">
          <div className="container">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              custom={0}
              variants={fadeUp}
              viewport={{ once: true }}
              className="text-center font-heading text-fluid-2xl font-bold"
            >
              Оригинальное оборудование мирового уровня
            </motion.h2>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {equipmentCards.map((eq, i) => (
                <motion.div
                  key={eq.name}
                  initial="hidden"
                  whileInView="visible"
                  custom={i + 1}
                  variants={fadeUp}
                  viewport={{ once: true }}
                  className="rounded-3xl border border-border bg-card p-8 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                    <eq.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-fluid-lg font-semibold">{eq.name}</h3>
                  <p className="mt-1 text-fluid-sm text-muted-foreground">{eq.description}</p>
                  <Link
                    to="/services"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    Узнать стоимость процедуры
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: Leadership ─── */}
        <section className="py-16 md:py-24">
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm"
            >
              <div className="grid items-center md:grid-cols-5">
                <div className="relative aspect-[3/4] md:col-span-2">
                  <img
                    src={pavlyukMaria}
                    alt="Павлюк Мария Олеговна — главный врач клиники Яблоко"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <motion.div custom={1} variants={fadeUp} className="p-8 md:col-span-3 md:p-12">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Главный врач</span>
                  </div>

                  <blockquote className="mt-4 border-l-4 border-primary pl-5 text-fluid-lg italic text-muted-foreground">
                    «Все в наших руках, поэтому их нельзя опускать» — Коко Шанель.
                    Это наш девиз. Моя задача как главного врача — обеспечить вам
                    безопасный, комфортный и предсказуемый результат на долгие годы.
                  </blockquote>

                  <p className="mt-6 font-heading text-lg font-semibold">
                    Павлюк Мария Олеговна
                  </p>
                  <p className="text-sm text-muted-foreground">Главный врач</p>

                  <div className="mt-8">
                    <Link to="/specialists">
                      <Button variant="outline" size="lg" className="gap-2">
                        Познакомиться со всеми врачами
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── SECTION 5: Legal Transparency ─── */}
        <section className="bg-secondary py-16 md:py-24">
          <div className="container">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              custom={0}
              variants={fadeUp}
              viewport={{ once: true }}
              className="text-center font-heading text-2xl font-bold md:text-3xl"
            >
              Лицензии и документы
            </motion.h2>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Лицензия на осуществление медицинской деятельности",
                "Сертификат соответствия СанПиН",
                "Свидетельство о регистрации",
              ].map((doc, i) => (
                <motion.div
                  key={doc}
                  initial="hidden"
                  whileInView="visible"
                  custom={i + 1}
                  variants={fadeUp}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{doc}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Документ доступен по запросу
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: Conversion CTA ─── */}
        <section className="py-16 md:py-24">
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-3xl bg-primary/10 px-8 py-12 text-center md:px-16 md:py-20"
            >
              <motion.h2
                custom={0}
                variants={fadeUp}
                className="font-heading text-2xl font-bold md:text-3xl"
              >
                Доверьте свою красоту профессионалам
              </motion.h2>
              <motion.p
                custom={1}
                variants={fadeUp}
                className="mx-auto mt-4 max-w-md text-muted-foreground"
              >
                Запишитесь на консультацию — мы составим индивидуальный план и
                подберём оптимальное решение.
              </motion.p>
              <motion.div custom={2} variants={fadeUp} className="mt-8">
                <Button
                  variant="hero"
                  size="xl"
                  className="gap-2"
                  onClick={() => setIsBookingOpen(true)}
                >
                  <Calendar className="h-5 w-5" />
                  Записаться на консультацию
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Bottom padding for mobile bar */}
        <div className="h-20 md:hidden" />
      </main>

      <Footer />
      <MobileBookingBar onBookingClick={() => setIsBookingOpen(true)} />
      <BookingWizard
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
};

export default About;
