import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Stethoscope, Scissors, HeartPulse } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBookingBar } from "@/components/layout/MobileBookingBar";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { TrustBar } from "@/components/services/TrustBar";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { serviceCategories, getAllServices, type ServiceItem } from "@/data/servicesData";

const categoryIcons: Record<string, React.ReactNode> = {
  cosmetology: <Sparkles className="h-4 w-4" />,
  dermatology: <Stethoscope className="h-4 w-4" />,
  trichology: <Scissors className="h-4 w-4" />,
  health: <HeartPulse className="h-4 w-4" />,
};

const validTabs = serviceCategories.map((c) => c.id);
export default function ServicesHub() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const tabFromUrl = searchParams.get("tab");
  const activeTab = validTabs.includes(tabFromUrl ?? "") ? tabFromUrl! : "cosmetology";

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value }, { replace: true });
  };

  const allServices = useMemo(() => getAllServices(), []);

  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    return allServices.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        (s.problems && s.problems.some((p) => p.toLowerCase().includes(q)))
    );
  }, [searchQuery, allServices]);

  const isSearching = searchQuery.trim().length > 0;

  return (
    <>
      <Helmet>
        <title>Услуги и цены — клиника «Яблоко» в Краснодаре</title>
        <meta
          name="description"
          content="Каталог услуг клиники «Яблоко»: косметология, дерматология, трихология, остеопатия. Актуальные цены, описание процедур. Запись онлайн в Краснодаре."
        />
        <link rel="canonical" href="https://yabloko-clinic.ru/services" />
      </Helmet>

      <Header onBookingClick={() => setIsBookingOpen(true)} />

      <main className="min-h-screen bg-background scroll-mt-24">
        {/* Hero + Search */}
        <section className="bg-gradient-to-b from-secondary to-background py-16 md:py-24">
          <div className="container max-w-3xl text-center">
            <h1 className="font-heading text-fluid-4xl font-bold text-foreground mb-4">
              Услуги клиники «Яблоко» в Краснодаре
            </h1>
            <p className="text-fluid-lg text-muted-foreground mb-8">
              Подберите процедуру по проблеме — от акне и морщин до восстановления волос и коррекции фигуры
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Какую проблему вы хотите решить? (акне, морщины, выпадение волос)..."
                className="h-14 rounded-2xl pl-12 pr-4 text-base bg-card border-2 border-border focus-visible:border-primary shadow-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-xl mx-auto">
              {["акне", "морщины", "дерматолог", "выпадение волос", "остеопат", "невролог", "массаж", "родинки", "бородавки", "папилломы", "диетолог"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(searchQuery.toLowerCase() === tag ? "" : tag)}
                  className={`px-3.5 py-1.5 rounded-full text-sm border transition-colors cursor-pointer ${searchQuery.toLowerCase() === tag ? "bg-primary text-primary-foreground border-primary" : "border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary"}`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <TrustBar />
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16 scroll-mt-24">
          <div className="container max-w-4xl">
            <AnimatePresence mode="wait">
              {isSearching ? (
                <motion.div
                  key="search-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="text-sm text-muted-foreground mb-6">
                    Найдено: {filteredServices?.length ?? 0}
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {filteredServices?.map((s) => (
                      <ServiceCard
                        key={s.slug}
                        service={s}
                        onNavigate={() => navigate(`/services/${s.slug}`)}
                        onBook={() => setIsBookingOpen(true)}
                      />
                    ))}
                  </div>
                  {filteredServices?.length === 0 && (
                    <p className="text-center text-muted-foreground py-12">
                      Ничего не найдено. Попробуйте другой запрос.
                    </p>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="tabs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Tabs value={activeTab} onValueChange={handleTabChange}>
                    <TabsList className="w-full justify-start gap-1 bg-transparent p-0 mb-8 flex-wrap">
                      {serviceCategories.map((cat) => (
                        <TabsTrigger
                          key={cat.id}
                          value={cat.id}
                          className="gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary transition-all"
                        >
                          {categoryIcons[cat.id]}
                          {cat.label}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {serviceCategories.map((cat) => (
                      <TabsContent key={cat.id} value={cat.id}>
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.25 }}
                            className="grid gap-4 sm:grid-cols-2"
                          >
                            {cat.services.map((s) => (
                              <ServiceCard
                                key={s.slug}
                                service={s}
                                onNavigate={() => navigate(`/services/${s.slug}`)}
                                onBook={() => setIsBookingOpen(true)}
                              />
                            ))}
                          </motion.div>
                        </AnimatePresence>
                      </TabsContent>
                    ))}
                  </Tabs>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />
      <MobileBookingBar onBookingClick={() => setIsBookingOpen(true)} />
      <BookingWizard isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}
