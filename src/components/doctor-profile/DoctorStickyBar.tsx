import { useState, useEffect } from "react";
import { Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface DoctorStickyBarProps {
  onBookingClick: () => void;
  doctorName?: string;
  specialty?: string;
}

export function DoctorStickyBar({ onBookingClick, doctorName, specialty }: DoctorStickyBarProps) {
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
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-sm p-3 shadow-lg md:hidden"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{doctorName || "Павлюк М.О."}</p>
              <p className="text-xs text-muted-foreground">{specialty || "Главный врач"}</p>
            </div>
            <Button size="sm" className="shrink-0 gap-1.5 rounded-full px-4" onClick={onBookingClick}>
              <Calendar className="h-4 w-4" />
              Записаться
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
