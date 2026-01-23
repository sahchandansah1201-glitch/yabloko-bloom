import { Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileBookingBarProps {
  onBookingClick: () => void;
}

export function MobileBookingBar({ onBookingClick }: MobileBookingBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card p-3 shadow-lg md:hidden">
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
    </div>
  );
}
