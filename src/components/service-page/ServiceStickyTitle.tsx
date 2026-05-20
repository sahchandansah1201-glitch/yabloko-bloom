import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ServiceStickyTitleProps {
  title: string;
  categoryId?: string;
}

export function ServiceStickyTitle({ title, categoryId }: ServiceStickyTitleProps) {
  const [visible, setVisible] = useState(false);
  const [headerBottom, setHeaderBottom] = useState(64);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 340;
      setVisible(scrolled);

      const header = document.querySelector("header");
      if (header) {
        const rect = header.getBoundingClientRect();
        setHeaderBottom(rect.bottom);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBack = () => {
    const target = categoryId ? `/services?tab=${categoryId}` : "/services";
    navigate(target);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="fixed left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-b border-border shadow-sm"
          style={{ top: headerBottom }}
        >
          <div className="container py-2.5 flex items-center gap-3">
            <button
              type="button"
              onClick={handleBack}
              aria-label="Назад к списку услуг"
              className="flex items-center gap-1.5 shrink-0 text-sm font-medium text-muted-foreground hover:text-primary transition-colors min-h-[44px] -my-2 pr-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Назад</span>
            </button>
            <div className="h-5 w-px bg-border shrink-0" />
            <p className="font-heading text-sm md:text-base font-semibold text-foreground truncate">
              {title}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
