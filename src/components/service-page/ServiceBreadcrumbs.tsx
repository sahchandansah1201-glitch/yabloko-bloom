import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, ArrowLeft } from "lucide-react";

interface ServiceBreadcrumbsProps {
  categoryLabel?: string;
  categoryId?: string;
  categorySlug?: string;
  serviceTitle: string;
}

export function ServiceBreadcrumbs({ categoryLabel, categoryId, serviceTitle }: ServiceBreadcrumbsProps) {
  const navigate = useNavigate();
  const backTarget = categoryId ? `/services?tab=${categoryId}` : "/services";

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(backTarget);
    }
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <button
        type="button"
        onClick={handleBack}
        aria-label="Назад к списку услуг"
        className="group inline-flex items-center gap-2 rounded-full border-2 border-primary bg-primary/10 px-4 py-2 text-sm font-semibold text-primary shadow-sm hover:bg-primary hover:text-primary-foreground hover:shadow-primary transition-all min-h-[44px] shrink-0"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        <span>Назад</span>
      </button>
      <div className="h-4 w-px bg-border shrink-0" />
      <nav className="flex items-center gap-1 text-sm text-muted-foreground flex-wrap">
        <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
        <ChevronRight className="h-3 w-3 shrink-0" />
        <Link to={backTarget} className="hover:text-primary transition-colors">Услуги</Link>
        {categoryLabel && (
          <>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <span className="text-muted-foreground">{categoryLabel}</span>
          </>
        )}
        <ChevronRight className="h-3 w-3 shrink-0" />
        <span className="text-foreground font-medium truncate">{serviceTitle}</span>
      </nav>
    </div>
  );
}
