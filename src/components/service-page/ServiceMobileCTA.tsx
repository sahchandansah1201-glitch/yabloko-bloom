import { useState, useEffect } from "react";
import { Calendar, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ServiceMobileCTAProps {
  price: string;
  onBook: () => void;
}

export function ServiceMobileCTA({ price, onBook }: ServiceMobileCTAProps) {
  const [pulse, setPulse] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 600);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

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
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/90 backdrop-blur-md p-3 shadow-lg md:hidden"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground whitespace-nowrap">{price}</span>
            <a
              href="tel:+78612001234"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-secondary transition-colors"
            >
              <Phone className="h-4 w-4" />
            </a>
            <Button
              variant="hero"
              className={cn(
                "flex-1 rounded-full transition-all",
                pulse && "scale-[1.03] shadow-lg"
              )}
              onClick={onBook}
            >
              <Calendar className="h-4 w-4" />
              Записаться
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
