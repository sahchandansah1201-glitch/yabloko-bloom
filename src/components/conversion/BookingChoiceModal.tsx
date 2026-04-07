import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Phone, CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";

interface BookingChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuickContact: () => void;
  onFullBooking: () => void;
}

export function BookingChoiceModal({
  isOpen,
  onClose,
  onQuickContact,
  onFullBooking,
}: BookingChoiceModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden gap-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="font-heading text-xl text-center">
            Как вам удобнее?
          </DialogTitle>
          <DialogDescription className="text-center">
            Выберите подходящий способ связи
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-6 pt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              onClose();
              onQuickContact();
            }}
            className="group flex flex-col items-center gap-3 rounded-xl border-2 border-border bg-card p-6 text-center transition-colors hover:border-primary hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <p className="font-heading text-base font-bold text-foreground">
                Оставить контакты
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Мы перезвоним за&nbsp;15&nbsp;минут и&nbsp;поможем с&nbsp;выбором
              </p>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              onClose();
              onFullBooking();
            }}
            className="group flex flex-col items-center gap-3 rounded-xl border-2 border-primary bg-secondary p-6 text-center transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <CalendarCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="font-heading text-base font-bold text-foreground">
                Записаться онлайн
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Выберите услугу, врача и&nbsp;удобное время
              </p>
            </div>
          </motion.button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
