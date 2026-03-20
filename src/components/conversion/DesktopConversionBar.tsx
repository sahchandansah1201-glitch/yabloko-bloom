import { useState, useEffect } from "react";
import { Calendar, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DesktopConversionBarProps {
  onBookingClick: () => void;
}

export function DesktopConversionBar({ onBookingClick }: DesktopConversionBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-[60] hidden md:block transition-transform duration-300",
        visible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="bg-primary text-primary-foreground">
        <div className="container flex h-10 items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="h-4 w-4" />
              Без предоплаты
            </span>
            <span className="hidden lg:inline opacity-80">•</span>
            <span className="hidden lg:inline opacity-80">Перезвоним за 15 минут</span>
          </div>
          <Button
            size="sm"
            variant="secondary"
            className="h-7 gap-1.5 rounded-full text-xs font-bold"
            onClick={onBookingClick}
          >
            <Calendar className="h-3.5 w-3.5" />
            Записаться на приём
          </Button>
        </div>
      </div>
    </div>
  );
}
