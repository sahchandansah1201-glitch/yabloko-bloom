import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ArticleCard } from "./ArticleCard";
import { getLatestArticles } from "@/data/articlesData";

interface RecentInsightsProps {
  category?: string;
  count?: number;
}

export function RecentInsights({ category = "cosmetology", count = 3 }: RecentInsightsProps) {
  const latest = getLatestArticles(count, category);
  if (latest.length === 0) return null;

  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-heading text-2xl font-bold text-foreground">Советы экспертов</h2>
          <Link
            to="/advice"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Все статьи <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
