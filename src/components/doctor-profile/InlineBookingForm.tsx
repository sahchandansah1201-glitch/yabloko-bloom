import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, Loader2, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const PAVLYUK_DOCTOR_ID = "5be37782-65c6-4b1c-8981-7a3432335035";

const formSchema = z.object({
  name: z.string().min(2, "Введите ваше имя").max(100, "Имя слишком длинное"),
  phone: z.string()
    .regex(/^\+7\s?\(?\d{3}\)?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/, "Введите корректный номер телефона")
    .transform(val => val.replace(/[\s\(\)\-]/g, '')),
  consent: z.boolean().refine(val => val === true, "Необходимо согласие на обработку данных"),
});

type FormData = z.infer<typeof formSchema>;

export function InlineBookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", phone: "+7 ", consent: false },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("appointments").insert({
        doctor_id: PAVLYUK_DOCTOR_ID,
        appointment_date: new Date().toISOString(),
        guest_name: data.name,
        guest_phone: data.phone,
        consent_152fz: data.consent,
        status: "pending",
      });
      if (error) throw error;
      setIsSuccess(true);
      toast.success("Заявка отправлена!");
    } catch {
      toast.error("Произошла ошибка. Попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section className="py-12 md:py-16">
        <div className="container max-w-md text-center">
          <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-primary/10 mb-4">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-heading text-xl font-bold mb-2">Спасибо!</h3>
          <p className="text-sm text-muted-foreground">Мы свяжемся с вами для подтверждения записи.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16">
      <div className="container max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border bg-card p-6 md:p-8 shadow-lg"
        >
          <div className="text-center mb-6">
            <Calendar className="mx-auto mb-3 h-8 w-8 text-primary" />
            <h2 className="font-heading text-xl font-bold text-foreground">
              Записаться к Марии Олеговне
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Оставьте заявку — мы перезвоним</p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="inline-name">Ваше имя *</Label>
              <Input
                id="inline-name"
                placeholder="Иван Иванов"
                {...form.register("name")}
                className="mt-1"
              />
              {form.formState.errors.name && (
                <p className="mt-1 text-xs text-destructive">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="inline-phone">Телефон *</Label>
              <Input
                id="inline-phone"
                placeholder="+7 (999) 123-45-67"
                {...form.register("phone")}
                className="mt-1"
              />
              {form.formState.errors.phone && (
                <p className="mt-1 text-xs text-destructive">{form.formState.errors.phone.message}</p>
              )}
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-secondary p-3">
              <Checkbox
                id="inline-consent"
                checked={form.watch("consent")}
                onCheckedChange={(checked) =>
                  form.setValue("consent", checked === true, { shouldValidate: true })
                }
                className="mt-0.5"
              />
              <label htmlFor="inline-consent" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                Согласие на обработку персональных данных (152-ФЗ). Нажимая кнопку, вы соглашаетесь с{" "}
                <span className="underline">политикой конфиденциальности</span>.
              </label>
            </div>
            {form.formState.errors.consent && (
              <p className="text-xs text-destructive">{form.formState.errors.consent.message}</p>
            )}

            <Button type="submit" size="lg" className="w-full gap-2" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Calendar className="h-4 w-4" />}
              Подтвердить запись
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
