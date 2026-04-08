import { useState, useEffect } from "react";
import { Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface MobileBookingBarProps {
  onBookingClick: () => void;
}

export function MobileBookingBar({ onBookingClick }: MobileBookingBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card p-3 shadow-lg md:hidden"
        >
          <div className="flex gap-3">
            <a 
              href="tel:+79184128585" 
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-primary bg-transparent py-3 font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Phone className="h-5 w-5" />
              Позвонить
            </a>
            <Button 
              variant="hero" 
              className="flex-1 py-6"
              onClick={onBookingClick}
            >
              <Calendar className="h-5 w-5" />
              Записаться
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
