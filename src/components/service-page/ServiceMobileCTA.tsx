import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceMobileCTAProps {
  price: string;
  onBook: () => void;
}

export function ServiceMobileCTA({ price, onBook }: ServiceMobileCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/90 backdrop-blur-md p-3 shadow-lg md:hidden">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-foreground">{price}</span>
        <Button variant="hero" className="flex-1 rounded-full" onClick={onBook}>
          <Calendar className="h-4 w-4" />
          Записаться
        </Button>
      </div>
    </div>
  );
}
