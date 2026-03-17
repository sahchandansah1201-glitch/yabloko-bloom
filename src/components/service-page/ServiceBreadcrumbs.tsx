import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface ServiceBreadcrumbsProps {
  categoryLabel?: string;
  categorySlug?: string;
  serviceTitle: string;
}

export function ServiceBreadcrumbs({ categoryLabel, serviceTitle }: ServiceBreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-1 text-sm text-muted-foreground flex-wrap">
      <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
      <ChevronRight className="h-3 w-3 shrink-0" />
      <Link to="/services" className="hover:text-primary transition-colors">Услуги</Link>
      {categoryLabel && (
        <>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="text-muted-foreground">{categoryLabel}</span>
        </>
      )}
      <ChevronRight className="h-3 w-3 shrink-0" />
      <span className="text-foreground font-medium truncate">{serviceTitle}</span>
    </nav>
  );
}
