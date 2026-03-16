import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Sparkles, Stethoscope, Scissors, HeartPulse } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBookingBar } from "@/components/layout/MobileBookingBar";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { serviceCategories, getAllServices, type ServiceItem } from "@/data/servicesData";

const categoryIcons: Record<string, React.ReactNode> = {
  cosmetology: <Sparkles className="h-4 w-4" />,
  dermatology: <Stethoscope className="h-4 w-4" />,
  trichology: <Scissors className="h-4 w-4" />,
  health: <HeartPulse className="h-4 w-4" />,
};

function ServiceCard({ service, onClick }: { service: ServiceItem; onClick: () => void }) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="group flex items-center justify-between gap-4 rounded-xl border bg-card p-5 text-left transition-all duration-200 hover:shadow-lg hover:border-primary/40"
    >
      <div className="min-w-0">
        <h3 className="font-heading text-base font-semibold text-foreground group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        <p className="mt-1 text-sm font-medium text-primary">{service.priceFrom}</p>
      </div>
      <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
    </motion.button>
  );
}

export default function ServicesHub() {
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("cosmetology");

  const allServices = useMemo(() => getAllServices(), []);

  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    return allServices.filter((s) => s.title.toLowerCase().includes(q));
  }, [searchQuery, allServices]);

  const isSearching = searchQuery.trim().length > 0;

  return (
    <>
      <Helmet>
        <title>Услуги и цены клиники Яблоко | Косметология, Дерматология в Краснодаре</title>
        <meta
          name="description"
          content="Полный каталог услуг клиники Яблоко: косметология, дерматология, трихология. Цены, описания процедур, запись онлайн."
        />
      </Helmet>

      <Header onBookingClick={() => setIsBookingOpen(true)} />

      <main className="min-h-screen bg-background">
        {/* Hero + Search */}
        <section className="bg-gradient-to-b from-secondary to-background py-16 md:py-24">
          <div className="container max-w-3xl text-center">
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Услуги и цены клиники Яблоко
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Найдите нужную процедуру или выберите направление
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
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16">
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
                  <div className="grid gap-3 sm:grid-cols-2">
                    {filteredServices?.map((s) => (
                      <ServiceCard
                        key={s.slug}
                        service={s}
                        onClick={() => navigate(`/services/${s.slug}`)}
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
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
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
                            className="grid gap-3 sm:grid-cols-2"
                          >
                            {cat.services.map((s) => (
                              <ServiceCard
                                key={s.slug}
                                service={s}
                                onClick={() => navigate(`/services/${s.slug}`)}
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
