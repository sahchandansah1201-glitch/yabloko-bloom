import { Phone, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DoctorStickyBarProps {
  onBookingClick: () => void;
}

export function DoctorStickyBar({ onBookingClick }: DoctorStickyBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-sm p-3 shadow-lg md:hidden">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <User className="h-5 w-5 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">Павлюк М.О.</p>
          <p className="text-xs text-muted-foreground">Главный врач</p>
        </div>
        <Button
          size="sm"
          className="shrink-0 gap-1.5 rounded-full px-4"
          onClick={onBookingClick}
        >
          <Calendar className="h-4 w-4" />
          Записаться на прием
        </Button>
      </div>
    </div>
  );
}
