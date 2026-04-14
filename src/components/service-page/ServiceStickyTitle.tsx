import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ServiceStickyTitleProps {
  title: string;
}

export function ServiceStickyTitle({ title }: ServiceStickyTitleProps) {
  const [visible, setVisible] = useState(false);
  const [headerBottom, setHeaderBottom] = useState(64);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 340;
      setVisible(scrolled);

      // Measure actual header bottom position
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
          <div className="container py-2.5">
            <p className="font-heading text-sm md:text-base font-semibold text-foreground truncate">
              {title}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
