import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Search } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { ArticleCard } from "@/components/advice/ArticleCard";
import { Input } from "@/components/ui/input";
import { articles, articleCategories } from "@/data/articlesData";

export default function AdviceHub() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let result = activeCategory === "all" ? articles : articles.filter((a) => a.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, [activeCategory, searchQuery]);

  return (
    <>
      <Helmet>
        <title>Советы экспертов | Клиника Яблоко Краснодар</title>
        <meta name="description" content="Экспертные статьи врачей клиники Яблоко: косметология, дерматология, трихология. Полезные советы и разборы процедур." />
      </Helmet>

      <Header onBookingClick={() => setIsBookingOpen(true)} />

      <main className="min-h-screen bg-background pt-28 pb-16">
        <div className="container">
          {/* Hero */}
          <div className="mb-10 text-center">
            <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Советы экспертов
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Полезные статьи от врачей клиники «Яблоко». Разбираем процедуры, развенчиваем мифы и делимся реальными кейсами.
            </p>
          </div>

          {/* Search */}
          <div className="mx-auto mb-8 max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по статьям..."
                className="pl-10 h-11 rounded-full border-border bg-card"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {articleCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-card text-muted-foreground border border-border hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">Статьи не найдены. Попробуйте другой запрос.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />

      <BookingWizard isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}
