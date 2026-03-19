import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Clock, Car, Copy, Check, ExternalLink, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const PHONE = "+79184128585";
const PHONE_DISPLAY = "+7 (918) 412-85-85";
const ADDRESS = "г. Краснодар, ул. 70-летия Октября, 1/2";
const WHATSAPP_URL = "https://wa.me/79184128585";
const YANDEX_MAP_URL = "https://yandex.ru/maps/?pt=38.904027,45.026234&z=17&l=map";
const YANDEX_NAVI_URL = "https://yandex.ru/navi/?whatshere[point]=38.904027,45.026234&whatshere[zoom]=17";

const SCHEDULE = [
  { day: "Понедельник", hours: "9:00 – 20:00" },
  { day: "Вторник", hours: "9:00 – 20:00" },
  { day: "Среда", hours: "9:00 – 20:00" },
  { day: "Четверг", hours: "9:00 – 20:00" },
  { day: "Пятница", hours: "9:00 – 20:00" },
  { day: "Суббота", hours: "9:00 – 20:00" },
  { day: "Воскресенье", hours: "Выходной" },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function useIsOpen() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const now = new Date();
    const day = now.getDay(); // 0=Sun
    const hour = now.getHours();
    // Mon-Sat (1-6), 9-20
    setIsOpen(day >= 1 && day <= 6 && hour >= 9 && hour < 20);
  }, []);
  return isOpen;
}

const Contacts = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const isOpen = useIsOpen();

  const copyAddress = () => {
    navigator.clipboard.writeText(ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Клиника Яблоко",
    description: "Клиника дерматологии и косметологии в Краснодаре",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. 70-летия Октября, 1/2",
      addressLocality: "Краснодар",
      addressCountry: "RU",
    },
    telephone: "+7-918-412-85-85",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "20:00",
      },
    ],
    geo: { "@type": "GeoCoordinates", latitude: 45.026234, longitude: 38.904027 },
    url: "https://yabloko-bloom.lovable.app/contacts",
  };

  return (
    <>
      <Helmet>
        <title>Контакты — Клиника Яблоко | Краснодар</title>
        <meta name="description" content="Контакты клиники дерматологии и косметологии Яблоко в Краснодаре. Адрес, телефон, график работы, карта проезда." />
        <link rel="canonical" href="https://yabloko-bloom.lovable.app/contacts" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Header onBookingClick={() => setIsBookingOpen(true)} />

      {/* Mobile quick actions */}
      <div className="md:hidden sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-3 flex gap-2">
        <Button asChild variant="hero" size="lg" className="flex-1 gap-2">
          <a href={`tel:${PHONE}`}>
            <Phone className="h-5 w-5" />
            Позвонить
          </a>
        </Button>
        <Button asChild size="lg" className="flex-1 gap-2 bg-[hsl(142_69%_58%)] hover:bg-[hsl(142_69%_48%)] text-white">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="h-5 w-5" />
            WhatsApp
          </a>
        </Button>
      </div>

      <main className="container py-8 md:py-14">
        {/* Page heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="font-heading text-fluid-3xl font-bold text-foreground mb-2">
            Ждём вас в клинике Яблоко
          </h1>
          <p className="text-muted-foreground text-fluid-lg mb-8 md:mb-12 max-w-xl">
            Красота через здоровье — запишитесь на приём или свяжитесь с нами удобным способом.
          </p>
        </motion.div>

        {/* Two-column grid */}
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
          {/* LEFT — Info (3 cols) */}
          <div className="lg:col-span-3 space-y-8">
            {/* Phone */}
            <section className="space-y-3">
              <h2 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" /> Телефон
              </h2>
              <a
                href={`tel:${PHONE}`}
                className="inline-block text-2xl md:text-3xl font-bold text-foreground hover:text-primary transition-colors"
              >
                {PHONE_DISPLAY}
              </a>
            </section>

            {/* Messengers */}
            <section className="space-y-3">
              <h2 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" /> Мессенджеры
              </h2>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="gap-2 bg-[hsl(142_69%_58%)] hover:bg-[hsl(142_69%_48%)] text-white">
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon className="h-5 w-5" />
                    Написать в WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <a href="https://t.me/yabloko_clinic" target="_blank" rel="noopener noreferrer">
                    <TelegramIcon className="h-5 w-5" />
                    Telegram
                  </a>
                </Button>
              </div>
            </section>

            {/* Address */}
            <section className="space-y-3">
              <h2 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" /> Адрес
              </h2>
              <div className="flex items-center gap-3">
                <p className="text-foreground text-base">{ADDRESS}</p>
                <button
                  onClick={copyAddress}
                  className="shrink-0 rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-primary transition-colors"
                  aria-label="Скопировать адрес"
                >
                  {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </section>

            {/* Schedule */}
            <section className="space-y-3">
              <h2 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" /> График работы
                {isOpen ? (
                  <Badge className="bg-primary/15 text-primary border-0 ml-1">● Мы открыты</Badge>
                ) : (
                  <Badge variant="secondary" className="ml-1">Сейчас закрыто</Badge>
                )}
              </h2>
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {SCHEDULE.map((row, i) => {
                      const isSunday = row.hours === "Выходной";
                      return (
                        <tr key={row.day} className={i < SCHEDULE.length - 1 ? "border-b border-border" : ""}>
                          <td className="px-4 py-3 font-medium text-foreground">{row.day}</td>
                          <td className={`px-4 py-3 text-right ${isSunday ? "text-muted-foreground" : "text-foreground"}`}>
                            {row.hours}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Parking */}
            <section className="space-y-3">
              <h2 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
                <Car className="h-5 w-5 text-primary" /> Информация о парковке
              </h2>
              <p className="text-muted-foreground">
                Бесплатная парковка доступна на прилегающей территории. Заезд со стороны ул. 70-летия Октября.
              </p>
            </section>
          </div>

          {/* RIGHT — Visual (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Clinic photo placeholder */}
            <div className="rounded-2xl overflow-hidden bg-muted aspect-[4/3] flex items-center justify-center">
              <div className="text-center text-muted-foreground space-y-2 p-6">
                <MapPin className="h-10 w-10 mx-auto opacity-40" />
                <p className="text-sm">Фото входа в клинику</p>
              </div>
            </div>

            {/* How to find us */}
            <div className="rounded-xl bg-secondary p-5 space-y-2">
              <h3 className="font-heading font-semibold text-foreground">Как нас найти</h3>
              <ul className="text-sm text-muted-foreground space-y-1.5">
                <li>• Главный вход со стороны ул. 70-летия Октября</li>
                <li>• 1-й этаж, вывеска «Яблоко»</li>
                <li>• Ориентир — рядом с остановкой «70-летия Октября»</li>
              </ul>
            </div>

            {/* Booking CTA */}
            <Button
              variant="hero"
              size="xl"
              className="w-full"
              onClick={() => setIsBookingOpen(true)}
            >
              Записаться на приём
            </Button>
          </div>
        </div>

        {/* Map section */}
        <motion.section
          className="mt-12 md:mt-16 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">
              Мы на карте
            </h2>
            <Button asChild variant="outline" size="sm" className="gap-2">
              <a href={YANDEX_NAVI_URL} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Открыть в Навигаторе
              </a>
            </Button>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=38.904027%2C45.026234&z=16&pt=38.904027%2C45.026234%2Cpm2rdl1&l=map"
              className="w-full h-[300px] md:h-[450px]"
              allowFullScreen
              title="Клиника Яблоко на карте — Краснодар, ул. 70-летия Октября, 1/2"
              loading="lazy"
              style={{ border: 0 }}
            />
          </div>
        </motion.section>
      </main>

      <Footer />
      <BookingWizard isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
};

export default Contacts;
