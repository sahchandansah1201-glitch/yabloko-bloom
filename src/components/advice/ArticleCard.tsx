import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { doctorPhotos } from "@/assets/doctors";
import type { Article } from "@/data/articlesData";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const photo = doctorPhotos[article.authorName];

  return (
    <Link
      to={`/advice/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
    >
      {/* Cover */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={article.coverImage}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <Badge className="absolute left-3 top-3 bg-secondary text-secondary-foreground border-0 text-xs font-medium">
          {article.categoryLabel}
        </Badge>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="mb-2 font-heading text-base font-semibold leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-2">
          {article.excerpt}
        </p>

        {/* Author & Meta */}
        <div className="flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-7 w-7">
              {photo && <AvatarImage src={photo} alt={article.authorName} />}
              <AvatarFallback className="text-[10px] bg-secondary text-secondary-foreground">
                {article.authorName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground truncate max-w-[140px]">
              {article.authorName.split(" ").slice(0, 2).join(" ")}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>{article.readingTime} мин</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
