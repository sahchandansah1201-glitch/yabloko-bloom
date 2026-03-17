import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Clock, Calendar, User, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArticleCard } from "@/components/advice/ArticleCard";
import { getArticleBySlug, articles } from "@/data/articlesData";
import { doctorPhotos } from "@/assets/doctors";
import NotFound from "./NotFound";

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const article = slug ? getArticleBySlug(slug) : undefined;
  if (!article) return <NotFound />;

  const photo = doctorPhotos[article.authorName];
  const related = (article.relatedSlugs ?? [])
    .map((s) => articles.find((a) => a.slug === s))
    .filter(Boolean) as typeof articles;

  const formattedDate = new Date(article.publishedAt).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Simple markdown-like rendering for content
  const renderContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <br key={i} />;

      // H2
      if (trimmed.startsWith("## "))
        return <h2 key={i} className="mt-8 mb-4 font-heading text-2xl font-bold text-foreground">{trimmed.slice(3)}</h2>;

      // H3
      if (trimmed.startsWith("### "))
        return <h3 key={i} className="mt-6 mb-3 font-heading text-xl font-semibold text-foreground">{trimmed.slice(4)}</h3>;

      // Blockquote (expert tip)
      if (trimmed.startsWith("> ")) {
        const content = trimmed.slice(2).replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        return (
          <div key={i} className="my-6 rounded-xl border-l-4 border-primary bg-secondary/60 p-4 sm:p-5">
            <p className="text-sm text-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        );
      }

      // List item
      if (trimmed.startsWith("- ")) {
        const content = trimmed.slice(2).replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        return (
          <li key={i} className="ml-4 text-foreground/80 leading-relaxed list-disc" dangerouslySetInnerHTML={{ __html: content }} />
        );
      }

      // Numbered list
      const numMatch = trimmed.match(/^(\d+)\.\s\*\*(.*?)\*\*\s*[—–-]\s*(.*)/);
      if (numMatch) {
        return (
          <li key={i} className="ml-4 text-foreground/80 leading-relaxed list-decimal">
            <strong>{numMatch[2]}</strong> — {numMatch[3]}
          </li>
        );
      }

      // Bold paragraph
      const boldLine = trimmed.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      return <p key={i} className="text-foreground/80 leading-relaxed mb-2" dangerouslySetInnerHTML={{ __html: boldLine }} />;
    });
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    author: { "@type": "Person", name: article.authorName, jobTitle: article.authorTitle },
    datePublished: article.publishedAt,
    publisher: { "@type": "Organization", name: "Клиника Яблоко" },
  };

  return (
    <>
      <Helmet>
        <title>{article.title} | Клиника Яблоко</title>
        <meta name="description" content={article.excerpt} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <Header onBookingClick={() => setIsBookingOpen(true)} />

      <main className="min-h-screen bg-background pt-28 pb-16">
        <div className="container">
          {/* Breadcrumbs */}
          <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Главная</Link>
            <span>/</span>
            <Link to="/advice" className="hover:text-primary">Советы экспертов</Link>
            <span>/</span>
            <span className="truncate max-w-[200px]">{article.title}</span>
          </div>

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
              <div className="prose-custom">
                {renderContent(article.content)}
              </div>

              {/* Tags */}
              <div className="mt-8 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-10 rounded-xl bg-primary/5 border border-primary/20 p-6 text-center">
                <p className="mb-3 font-heading text-lg font-semibold text-foreground">Остались вопросы?</p>
                <p className="mb-4 text-sm text-muted-foreground">
                  Запишитесь на консультацию к нашим специалистам — ответим на все вопросы лично.
                </p>
                <Button variant="hero" size="lg" onClick={() => setIsBookingOpen(true)}>
                  Записаться на консультацию
                </Button>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="w-full lg:w-80 shrink-0">
              <div className="sticky top-28 space-y-6">
                {/* Doctor Card */}
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

                {/* Back link */}
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

      <BookingWizard isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}
