import { useState, useMemo, useRef, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, ChevronDown } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBookingBar } from "@/components/layout/MobileBookingBar";
import { BookingChoiceModal } from "@/components/conversion/BookingChoiceModal";
import { QuickBookingModal } from "@/components/conversion/QuickBookingModal";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { getClinicSchema } from "@/lib/schema";
import {
  priceCategories,
  getAllPriceItems,
  getTotalPriceCount,
  type PriceCategory,
  type PriceItem,
} from "@/data/priceData";

const today = new Date().toLocaleDateString("ru-RU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function PricePage() {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isQuickBookingOpen, setIsQuickBookingOpen] = useState(false);
  const [isChoiceOpen, setIsChoiceOpen] = useState(false);
  const [bookingService, setBookingService] = useState("");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const allItems = useMemo(() => getAllPriceItems(), []);
  const totalCount = useMemo(() => getTotalPriceCount(), []);

  const isSearching = searchQuery.trim().length > 1;

  const searchResults = useMemo(() => {
    if (!isSearching) return null;
    const q = searchQuery.toLowerCase();
    return allItems.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.categoryTitle.toLowerCase().includes(q) ||
        item.subcategoryTitle.toLowerCase().includes(q)
    );
  }, [searchQuery, allItems, isSearching]);

  const displayCategories = useMemo(() => {
    if (activeCategory) return priceCategories.filter((c) => c.id === activeCategory);
    return priceCategories;
  }, [activeCategory]);

  const scrollToCategory = useCallback((id: string) => {
    setActiveCategory(null);
    setMobileDropdownOpen(false);
    setTimeout(() => {
      sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, []);

  const handleBook = useCallback((serviceName: string) => {
    setBookingService(serviceName);
    setIsChoiceOpen(true);
  }, []);

  const handleChoiceQuick = useCallback(() => {
    setIsChoiceOpen(false);
    setIsQuickBookingOpen(true);
  }, []);

  const handleChoiceFull = useCallback(() => {
    setIsChoiceOpen(false);
    setIsBookingOpen(true);
  }, []);

  const handleBackToChoice = useCallback(() => {
    setIsQuickBookingOpen(false);
    setIsBookingOpen(false);
    setIsChoiceOpen(true);
  }, []);

  // Schema.org
  const clinicSchema = getClinicSchema();
  const priceSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": clinicSchema["@id"],
    name: clinicSchema.name,
    url: "https://yabloko-clinic.ru/price",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Прайс-лист клиники Яблоко",
      itemListElement: priceCategories.map((cat) => ({
        "@type": "OfferCatalog",
        name: cat.title,
        itemListElement: cat.subcategories.flatMap((sub) =>
          sub.items.slice(0, 3).map((item) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "MedicalTherapy",
              name: item.name,
            },
            priceCurrency: "RUB",
            price: item.price.replace(/[^\d]/g, "") || undefined,
            availability: "https://schema.org/InStock",
          }))
        ),
      })),
    },
  };

  const activeCatLabel = activeCategory
    ? priceCategories.find((c) => c.id === activeCategory)?.title ?? "Все направления"
    : "Все направления";

  return (
    <>
      <Helmet>
        <title>Цены на услуги клиники Яблоко в Краснодаре | Полный прайс-лист 2026</title>
        <meta
          name="description"
          content={`Актуальный прайс-лист клиники Яблоко: ${totalCount}+ услуг. Дерматология, косметология, трихология, аппаратные процедуры. Цены от 85 ₽.`}
        />
        <link rel="canonical" href="https://yabloko-clinic.ru/price" />
        <script type="application/ld+json">{JSON.stringify(priceSchema)}</script>
      </Helmet>

      <Header onBookingClick={() => { setBookingService(""); setIsChoiceOpen(true); }} />

      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-gradient-to-b from-secondary to-background py-14 md:py-20">
          <div className="container max-w-3xl text-center">
            <h1 className="font-heading text-fluid-4xl font-bold text-foreground mb-3">
              Цены на услуги
            </h1>
            <p className="text-fluid-lg text-muted-foreground mb-8">
              Полный прайс-лист клиники — {totalCount}+ позиций
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Найти услугу по названию…"
                className="h-14 rounded-2xl pl-12 pr-4 text-base bg-card border-2 border-border focus-visible:border-primary shadow-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="container max-w-6xl">
            <div className="flex gap-8">
              {/* Sidebar — Desktop */}
              {!isMobile && (
                <nav className="hidden md:block w-64 shrink-0">
                  <div className="sticky top-24 space-y-1">
                    <button
                      onClick={() => setActiveCategory(null)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        !activeCategory
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary text-foreground"
                      }`}
                    >
                      Все направления
                    </button>
                    {priceCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => scrollToCategory(cat.id)}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                          activeCategory === cat.id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-secondary text-foreground"
                        }`}
                      >
                        {cat.title}
                      </button>
                    ))}
                  </div>
                </nav>
              )}

              {/* Mobile Dropdown */}
              {isMobile && !isSearching && (
                <div className="w-full mb-4 md:hidden relative">
                  <button
                    onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-border bg-card text-sm font-medium"
                  >
                    {activeCatLabel}
                    <ChevronDown className={`h-4 w-4 transition-transform ${mobileDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {mobileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="absolute z-20 top-full mt-1 w-full bg-card border border-border rounded-xl shadow-lg overflow-hidden"
                      >
                        <button
                          onClick={() => { setActiveCategory(null); setMobileDropdownOpen(false); }}
                          className="w-full text-left px-4 py-3 text-sm hover:bg-secondary border-b border-border"
                        >
                          Все направления
                        </button>
                        {priceCategories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => scrollToCategory(cat.id)}
                            className="w-full text-left px-4 py-3 text-sm hover:bg-secondary border-b border-border last:border-0"
                          >
                            {cat.title}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Main Content */}
              <div className="flex-1 min-w-0">
                <AnimatePresence mode="wait">
                  {isSearching ? (
                    <motion.div
                      key="search"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <p className="text-sm text-muted-foreground mb-4">
                        Найдено: {searchResults?.length ?? 0}
                      </p>
                      {searchResults && searchResults.length > 0 ? (
                        <div className="space-y-2">
                          {searchResults.map((item, i) => (
                            <PriceRow
                              key={`${item.categoryId}-${item.name}-${i}`}
                              item={item}
                              onBook={item.bookable ? () => handleBook(item.name) : undefined}
                              badge={item.categoryTitle}
                            />
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-muted-foreground py-12">
                          Ничего не найдено. Попробуйте другой запрос.
                        </p>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="categories"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-10"
                    >
                      {displayCategories.map((cat) => (
                        <CategorySection
                          key={cat.id}
                          category={cat}
                          ref={(el) => { sectionRefs.current[cat.id] = el; }}
                          onBook={handleBook}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* E-E-A-T footer */}
                <div className="mt-12 border-t border-border pt-6">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Цены актуальны на {today} и включают все необходимые медицинские расходные материалы.
                    Окончательная стоимость определяется врачом на приёме после осмотра.
                    Клиника оставляет за собой право корректировать цены. Подробную информацию уточняйте по телефону{" "}
                    <a href="tel:+79184128585" className="text-primary hover:underline">
                      +7 918 412-85-85
                    </a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileBookingBar onBookingClick={() => { setBookingService(""); setIsChoiceOpen(true); }} />

      <BookingChoiceModal
        isOpen={isChoiceOpen}
        onClose={() => setIsChoiceOpen(false)}
        onQuickBooking={handleChoiceQuick}
        onFullBooking={handleChoiceFull}
      />
      <QuickBookingModal
        isOpen={isQuickBookingOpen}
        onClose={() => setIsQuickBookingOpen(false)}
        onBack={handleBackToChoice}
        prefilledService={bookingService}
      />
      <BookingWizard isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}

/* ── Category Section ── */

import { forwardRef } from "react";

interface CategorySectionProps {
  category: PriceCategory;
  onBook: (name: string) => void;
}

const CategorySection = forwardRef<HTMLElement, CategorySectionProps>(
  ({ category, onBook }, ref) => (
    <section ref={ref} className="scroll-mt-28">
      <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-5 pb-2 border-b border-border">
        {category.title}
      </h2>
      <div className="space-y-6">
        {category.subcategories.map((sub) => (
          <div key={sub.title}>
            {category.subcategories.length > 1 && (
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                {sub.title}
              </h3>
            )}
            <div className="space-y-1.5">
              {sub.items.map((item, i) => (
                <PriceRow
                  key={`${item.name}-${i}`}
                  item={item}
                  onBook={item.bookable ? () => onBook(item.name) : undefined}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
);
CategorySection.displayName = "CategorySection";

/* ── Price Row ── */

function PriceRow({
  item,
  onBook,
  badge,
}: {
  item: PriceItem;
  onBook?: () => void;
  badge?: string;
}) {
  return (
    <Card className="flex items-center gap-3 px-4 py-3 hover:shadow-sm hover:border-primary/20 transition-all">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground leading-snug">{item.name}</p>
        {badge && (
          <Badge variant="secondary" className="mt-1 text-[10px] font-normal">
            {badge}
          </Badge>
        )}
      </div>
      <div className="flex items-center gap-2.5 shrink-0">
        <span className="text-sm md:text-base font-bold text-primary whitespace-nowrap">
          {item.price}
        </span>
        {onBook && (
          <Button
            size="sm"
            variant="hero"
            className="text-xs h-7 px-2.5 gap-1"
            onClick={onBook}
          >
            <Calendar className="h-3 w-3" />
            <span className="hidden sm:inline">Записаться</span>
          </Button>
        )}
      </div>
    </Card>
  );
}
