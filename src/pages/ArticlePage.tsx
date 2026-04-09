import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Clock, Calendar, Phone } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArticleCard } from "@/components/advice/ArticleCard";
import { getArticleBySlug, articles } from "@/data/articlesData";
import { doctorPhotos } from "@/assets/doctors";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/schema";
import NotFound from "./NotFound";

/* ── inline markdown helpers ── */
function renderInline(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">$1</a>');
}

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const article = slug ? getArticleBySlug(slug) : undefined;

  /* auto-related: use relatedSlugs if present, else same-category */
  const related = useMemo(() => {
    if (!article) return [];
    if (article.relatedSlugs?.length) {
      return article.relatedSlugs
        .map((s) => articles.find((a) => a.slug === s))
        .filter(Boolean) as typeof articles;
    }
    return articles
      .filter((a) => a.category === article.category && a.slug !== article.slug)
      .slice(0, 3);
  }, [article]);

  if (!article) return <NotFound />;

  const photo = doctorPhotos[article.authorName];

  const formattedDate = new Date(article.publishedAt).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  /* ── content renderer with links + CTA banners ── */
  const renderContent = (text: string) => {
    const lines = text.split("\n");
    const elements: JSX.Element[] = [];
    let i = 0;
    let ctaInserted = false;

    while (i < lines.length) {
      const trimmed = lines[i].trim();

      if (!trimmed) { elements.push(<br key={i} />); i++; continue; }

      // H2 — inject mid-article CTA after the second H2
      if (trimmed.startsWith("## ")) {
        const h2Count = elements.filter((e) => e.type === "h2").length;
        if (h2Count === 1 && !ctaInserted) {
          ctaInserted = true;
          elements.push(
            <div key={`cta-${i}`} className="my-8 rounded-xl bg-primary/5 border border-primary/20 p-5 sm:p-6 text-center">
              <p className="mb-2 font-heading text-base font-semibold text-foreground">
                Хотите индивидуальный план?
              </p>
              <p className="mb-4 text-sm text-muted-foreground">
                Наши специалисты подберут оптимальное решение для вашей ситуации.
              </p>
              <Button variant="hero" size="default" onClick={() => setIsBookingOpen(true)}>
                Записаться на консультацию
              </Button>
            </div>
          );
        }
        elements.push(
          <h2 key={i} className="mt-8 mb-4 font-heading text-2xl font-bold text-foreground">
            {trimmed.slice(3)}
          </h2>
        );
        i++; continue;
      }

      if (trimmed.startsWith("### ")) {
        elements.push(
          <h3 key={i} className="mt-6 mb-3 font-heading text-xl font-semibold text-foreground">
            {trimmed.slice(4)}
          </h3>
        );
        i++; continue;
      }

      // Blockquote
      if (trimmed.startsWith("> ")) {
        elements.push(
          <div key={i} className="my-6 rounded-xl border-l-4 border-primary bg-secondary/60 p-4 sm:p-5">
            <p className="text-sm text-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: renderInline(trimmed.slice(2)) }} />
          </div>
        );
        i++; continue;
      }

      // Unordered list
      if (trimmed.startsWith("- ")) {
        elements.push(
          <li key={i} className="ml-4 text-foreground/80 leading-relaxed list-disc" dangerouslySetInnerHTML={{ __html: renderInline(trimmed.slice(2)) }} />
        );
        i++; continue;
      }

      // Numbered list
      const numMatch = trimmed.match(/^(\d+)\.\s\*\*(.*?)\*\*\s*[—–-]\s*(.*)/);
      if (numMatch) {
        elements.push(
          <li key={i} className="ml-4 text-foreground/80 leading-relaxed list-decimal">
            <strong>{numMatch[2]}</strong> — {numMatch[3]}
          </li>
        );
        i++; continue;
      }

      // Paragraph with inline links
      elements.push(
        <p key={i} className="text-foreground/80 leading-relaxed mb-2" dangerouslySetInnerHTML={{ __html: renderInline(trimmed) }} />
      );
      i++;
    }
    return elements;
  };

  const articleJsonLd = getArticleSchema({
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    publishedAt: article.publishedAt,
    authorName: article.authorName,
    authorSlug: article.authorSlug,
    reviewedByName: article.authorName,
    reviewedBySlug: article.authorSlug,
  });

  return (
    <>
      <Helmet>
        <title>{`${article.title} — советы врачей клиники «Яблоко»`}</title>
        <meta name="description" content={`${article.excerpt.slice(0, 140)}${article.excerpt.length > 140 ? '…' : ''} Читайте на сайте клиники «Яблоко».`} />
        <link rel="canonical" href={`https://yabloko-clinic.ru/advice/${article.slug}`} />
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(getBreadcrumbSchema([
          { name: "Главная", url: "/" },
          { name: "Блог", url: "/advice" },
          { name: article.title },
        ]))}</script>
      </Helmet>

      <Header onBookingClick={() => setIsBookingOpen(true)} />

      <main className="min-h-screen bg-background pt-6 md:pt-8 pb-20 md:pb-16">
        <div className="container">
          {/* Breadcrumbs */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
            <span>/</span>
            <Link to="/advice" className="hover:text-primary transition-colors">Советы экспертов</Link>
            <span>/</span>
            <span className="truncate max-w-[200px]">{article.title}</span>
          </nav>

          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Main Content */}
            <article className="flex-1 max-w-3xl">
              {/* Meta */}
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <Badge className="bg-secondary text-secondary-foreground border-0">{article.categoryLabel}</Badge>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" /> {formattedDate}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> {article.readingTime} мин чтения
                </span>
              </div>

              <h1 className="mb-6 font-heading text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl leading-tight">
                {article.title}
              </h1>

              {/* Author inline */}
              <div className="mb-8 flex items-center gap-3 rounded-xl bg-card border border-border p-4">
                <Avatar className="h-12 w-12">
                  {photo && <AvatarImage src={photo} alt={article.authorName} />}
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    {article.authorName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-foreground">{article.authorName}</p>
                  <p className="text-xs text-muted-foreground">{article.authorTitle}</p>
                </div>
                {article.authorSlug && (
                  <Link
                    to={`/doctor/${article.authorSlug}`}
                    className="ml-auto text-xs font-medium text-primary hover:underline hidden sm:inline"
                  >
                    Профиль врача →
                  </Link>
                )}
              </div>

              {/* Body */}
              <div className="prose-custom">{renderContent(article.content)}</div>

              {/* Tags */}
              <div className="mt-8 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="mt-10 rounded-xl bg-primary/5 border border-primary/20 p-6 text-center">
                <p className="mb-3 font-heading text-lg font-semibold text-foreground">Остались вопросы?</p>
                <p className="mb-4 text-sm text-muted-foreground">
                  Запишитесь на консультацию к нашим специалистам — ответим на все вопросы лично.
                </p>
                <Button variant="hero" size="lg" onClick={() => setIsBookingOpen(true)}>
                  Записаться на консультацию
                </Button>
              </div>

              {/* Medical Disclaimer */}
              <p className="mt-6 text-xs text-muted-foreground/70 leading-relaxed">
                Информация носит ознакомительный характер и не заменяет консультацию специалиста. Имеются противопоказания.
              </p>
            </article>

            {/* Sidebar — hidden on mobile, sticky on desktop */}
            <aside className="hidden lg:block w-80 shrink-0">
              <div className="sticky top-28 space-y-6">
                <div className="rounded-xl border border-border bg-card p-5 text-center shadow-sm">
                  <Avatar className="mx-auto h-20 w-20 mb-3">
                    {photo && <AvatarImage src={photo} alt={article.authorName} />}
                    <AvatarFallback className="text-lg bg-secondary text-secondary-foreground">
                      {article.authorName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <p className="font-heading text-sm font-semibold">{article.authorName}</p>
                  <p className="mb-4 text-xs text-muted-foreground">{article.authorTitle}</p>
                  {article.authorSlug && (
                    <Link to={`/doctor/${article.authorSlug}`}>
                      <Button variant="outline" size="sm" className="w-full mb-2">Профиль врача</Button>
                    </Link>
                  )}
                  <Button variant="hero" size="sm" className="w-full" onClick={() => setIsBookingOpen(true)}>
                    Записаться к врачу
                  </Button>
                </div>

                <Link
                  to="/advice"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Все статьи
                </Link>
              </div>
            </aside>
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="mb-6 font-heading text-xl font-bold text-foreground">Читайте также</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-md p-3 lg:hidden">
        <div className="flex items-center gap-2">
          <a
            href="tel:+78612006848"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-secondary"
            aria-label="Позвонить"
          >
            <Phone className="h-4 w-4" />
          </a>
          <Button variant="hero" className="flex-1 h-10" onClick={() => setIsBookingOpen(true)}>
            Записаться к врачу
          </Button>
        </div>
      </div>

      <BookingWizard isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}
