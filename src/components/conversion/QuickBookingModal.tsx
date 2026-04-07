import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { TrustAnchors } from "./TrustAnchors";

const schema = z.object({
  name: z.string().min(2, "Введите ваше имя"),
  phone: z
    .string()
    .regex(
      /^\+7\s?\(?\d{3}\)?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/,
      "Введите корректный номер телефона"
    )
    .transform((v) => v.replace(/[\s()\-]/g, "")),
  consent: z
    .boolean()
    .refine((v) => v, "Необходимо согласие на обработку данных"),
});

type FormData = z.infer<typeof schema>;

interface QuickBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void;
  serviceName?: string;
}

export function QuickBookingModal({
  isOpen,
  onClose,
  onBack,
  serviceName,
}: QuickBookingModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "+7 ", consent: false },
  });

  const handleClose = () => {
    form.reset();
    setSuccess(false);
    onClose();
  };

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const { error } = await supabase.from("appointments").insert({
        guest_name: data.name,
        guest_phone: data.phone,
        consent_152fz: data.consent,
        appointment_date: new Date().toISOString(),
        status: "pending",
      });
      if (error) throw error;
      setSuccess(true);
      toast.success("Заявка отправлена!");
    } catch {
      toast.error("Ошибка. Попробуйте позже или позвоните нам.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {onBack && !success && (
              <button
                type="button"
                onClick={() => { handleClose(); onBack(); }}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Назад"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
            <div>
              <DialogTitle className="font-heading text-xl">
                {success ? "Заявка принята!" : "Быстрая запись"}
              </DialogTitle>
              <DialogDescription>
                {success
                  ? "Мы перезвоним в течение 15 минут"
                  : serviceName
                    ? `${serviceName} — без предоплаты`
                    : "Без предоплаты • Перезвоним за 15 мин"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-7 w-7 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              Администратор свяжется с вами для уточнения даты и времени.
            </p>
            <Button onClick={handleClose}>Закрыть</Button>
          </div>
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="qb-name">Ваше имя</Label>
              <Input
                id="qb-name"
                placeholder="Иван"
                {...form.register("name")}
                className="mt-1"
              />
              {form.formState.errors.name && (
                <p className="mt-1 text-xs text-destructive">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="qb-phone">Телефон</Label>
              <Input
                id="qb-phone"
                placeholder="+7 (999) 123-45-67"
                {...form.register("phone")}
                className="mt-1"
              />
              {form.formState.errors.phone && (
                <p className="mt-1 text-xs text-destructive">
                  {form.formState.errors.phone.message}
                </p>
              )}
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-secondary p-3">
              <Checkbox
                id="qb-consent"
                checked={form.watch("consent")}
                onCheckedChange={(c) =>
                  form.setValue("consent", c === true, { shouldValidate: true })
                }
                className="mt-0.5"
              />
              <label
                htmlFor="qb-consent"
                className="text-xs leading-relaxed text-muted-foreground cursor-pointer"
              >
                Даю согласие на обработку персональных данных в соответствии с
                ФЗ-152
              </label>
            </div>

            <Button
              type="submit"
              variant="hero"
              className="w-full"
              disabled={submitting}
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Записаться
            </Button>

            <div className="pt-2">
              <TrustAnchors />
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
