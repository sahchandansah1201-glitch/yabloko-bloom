import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useIsMobile } from "@/hooks/use-mobile";
import { doctorPhotos } from "@/assets/doctors";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { 
  Sparkles, 
  Stethoscope, 
  Scissors, 
  Heart, 
  ArrowLeft, 
  ArrowRight,
  CalendarIcon,
  CheckCircle2,
  Loader2,
  User,
  Clock
} from "lucide-react";
import { toast } from "sonner";

interface BookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDoctorId?: string | null;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image_url: string | null;
}

interface Service {
  id: string;
  category: string;
  title: string;
  price_start: number | null;
  description: string | null;
}

const categories = [
  { id: "Косметология", label: "Косметология", icon: Sparkles, description: "Инъекции, пилинги, уход" },
  { id: "Дерматология", label: "Дерматология", icon: Stethoscope, description: "Лечение кожных заболеваний" },
  { id: "Трихология", label: "Трихология", icon: Scissors, description: "Здоровье волос" },
  { id: "Здоровье", label: "Здоровье", icon: Heart, description: "Остеопатия, питание" },
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"
];

const contactSchema = z.object({
  name: z.string().min(2, "Введите ваше имя").max(100, "Имя слишком длинное"),
  phone: z.string()
    .regex(/^\+7\s?\(?\d{3}\)?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/, "Введите корректный номер телефона")
    .transform(val => val.replace(/[\s\(\)\-]/g, '')),
  email: z.string().email("Введите корректный email").optional().or(z.literal("")),
  consent: z.boolean().refine(val => val === true, "Необходимо согласие на обработку данных"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function BookingWizard({ isOpen, onClose, preselectedDoctorId }: BookingWizardProps) {
  const isMobile = useIsMobile();
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "+7 ",
      email: "",
      consent: false,
    },
  });

  // Load data
  useEffect(() => {
    async function loadData() {
      const [doctorsRes, servicesRes] = await Promise.all([
        supabase.from("doctors").select("*"),
        supabase.from("services").select("*"),
      ]);

      if (doctorsRes.data) setDoctors(doctorsRes.data);
      if (servicesRes.data) setServices(servicesRes.data);
    }
    loadData();
  }, []);

  // Handle preselected doctor
  useEffect(() => {
    if (preselectedDoctorId && isOpen) {
      setSelectedDoctor(preselectedDoctorId);
      // Skip to step 1 (category selection) but doctor is pre-filled
    }
  }, [preselectedDoctorId, isOpen]);

  // Filter services by category
  useEffect(() => {
    if (selectedCategory) {
      setFilteredServices(services.filter(s => s.category === selectedCategory));
    }
  }, [selectedCategory, services]);

  const resetWizard = () => {
    setStep(1);
    setSelectedCategory(null);
    setSelectedService(null);
    setSelectedDoctor(null);
    setSelectedDate(undefined);
    setSelectedTime(null);
    setIsSuccess(false);
    form.reset();
  };

  const handleClose = () => {
    resetWizard();
    onClose();
  };

  const goBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const goNext = () => {
    if (step < 5) setStep(step + 1);
  };

  // Auto-advance: on mobile single tap selects & advances; on desktop double-click advances
  const selectAndAdvance = useCallback((setter: (id: string) => void, id: string) => {
    setter(id);
    // Small delay so user sees the selection highlight before advancing
    setTimeout(() => setStep(prev => Math.min(prev + 1, 5)), 200);
  }, []);

  const canProceed = () => {
    switch (step) {
      case 1: return !!selectedCategory;
      case 2: return !!selectedService;
      case 3: return !!selectedDoctor;
      case 4: return !!selectedDate && !!selectedTime;
      case 5: return form.formState.isValid;
      default: return false;
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    if (!selectedService || !selectedDoctor || !selectedDate || !selectedTime) {
      toast.error("Пожалуйста, заполните все поля");
      return;
    }

    setIsSubmitting(true);

    try {
      const [hours, minutes] = selectedTime.split(":").map(Number);
      const appointmentDate = new Date(selectedDate);
      appointmentDate.setHours(hours, minutes, 0, 0);

      const { error } = await supabase.from("appointments").insert({
        service_id: selectedService,
        doctor_id: selectedDoctor,
        appointment_date: appointmentDate.toISOString(),
        guest_name: data.name,
        guest_phone: data.phone,
        guest_email: data.email || null,
        consent_152fz: data.consent,
        status: "pending",
      });

      if (error) throw error;

      setIsSuccess(true);
      toast.success("Заявка успешно отправлена!");
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Произошла ошибка. Попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedServiceData = services.find(s => s.id === selectedService);
  const selectedDoctorData = doctors.find(d => d.id === selectedDoctor);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] flex flex-col overflow-hidden sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">
            {isSuccess ? "Заявка отправлена!" : "Запись на приём"}
          </DialogTitle>
          <DialogDescription>
            {isSuccess 
              ? "Мы свяжемся с вами для подтверждения" 
              : `Шаг ${step} из 5`
            }
          </DialogDescription>
        </DialogHeader>

        {/* Progress bar */}
        {!isSuccess && (
          <div className="mb-4 space-y-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors",
                    s <= step ? "bg-primary" : "bg-muted"
                  )}
                />
              ))}
            </div>
            {step <= 4 && (
              <p className="text-[11px] text-muted-foreground/70 text-center">
                {isMobile
                  ? "Нажмите на пункт для выбора и перехода"
                  : "Двойной клик — выбор и переход к следующему шагу"}
              </p>
            )}
          </div>
        )}

        {/* Success State */}
        {isSuccess ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="font-heading text-lg font-semibold">Спасибо за вашу заявку!</h3>
              <p className="text-sm text-muted-foreground">
                Наш администратор свяжется с вами в ближайшее время для подтверждения записи.
              </p>
            </div>
            {selectedDoctorData && selectedServiceData && selectedDate && selectedTime && (
              <div className="mt-4 w-full rounded-lg bg-secondary p-4 text-left text-sm">
                <p><strong>Услуга:</strong> {selectedServiceData.title}</p>
                <p><strong>Специалист:</strong> {selectedDoctorData.name}</p>
                <p><strong>Дата:</strong> {format(selectedDate, "d MMMM yyyy", { locale: ru })}</p>
                <p><strong>Время:</strong> {selectedTime}</p>
              </div>
            )}
            <Button onClick={handleClose} className="mt-4">
              Закрыть
            </Button>
          </div>
        ) : (
          <div className="flex flex-col overflow-hidden">
            {/* Step 1: Category */}
          <div className="overflow-y-auto flex-1 min-h-0 pr-1">
            {step === 1 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => isMobile ? selectAndAdvance(setSelectedCategory, cat.id) : setSelectedCategory(cat.id)}
                    onDoubleClick={() => !isMobile && selectAndAdvance(setSelectedCategory, cat.id)}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all hover:border-primary hover:bg-secondary",
                      selectedCategory === cat.id 
                        ? "border-primary bg-secondary" 
                        : "border-border"
                    )}
                  >
                    <cat.icon className={cn(
                      "h-8 w-8",
                      selectedCategory === cat.id ? "text-primary" : "text-muted-foreground"
                    )} />
                    <span className="font-semibold">{cat.label}</span>
                    <span className="text-xs text-muted-foreground">{cat.description}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Step 2: Service */}
            {step === 2 && (
              <div className="space-y-2">
                {filteredServices.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => isMobile ? selectAndAdvance(setSelectedService, service.id) : setSelectedService(service.id)}
                    onDoubleClick={() => !isMobile && selectAndAdvance(setSelectedService, service.id)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg border-2 p-4 text-left transition-all hover:border-primary hover:bg-secondary",
                      selectedService === service.id 
                        ? "border-primary bg-secondary" 
                        : "border-border"
                    )}
                  >
                    <div>
                      <p className="font-medium">{service.title}</p>
                      {service.description && (
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      )}
                    </div>
                    {service.price_start && (
                      <span className="ml-4 whitespace-nowrap text-sm font-semibold text-primary">
                        от {service.price_start.toLocaleString()} ₽
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Step 3: Doctor */}
            {step === 3 && (
              <div className="space-y-2">
                {doctors.map((doctor) => {
                  const photo = doctor.image_url || doctorPhotos[doctor.name];
                  return (
                    <button
                      key={doctor.id}
                      onClick={() => isMobile ? selectAndAdvance(setSelectedDoctor, doctor.id) : setSelectedDoctor(doctor.id)}
                      onDoubleClick={() => !isMobile && selectAndAdvance(setSelectedDoctor, doctor.id)}
                      className={cn(
                        "flex w-full items-center gap-4 rounded-lg border-2 p-3 text-left transition-all hover:border-primary hover:bg-secondary",
                        selectedDoctor === doctor.id 
                          ? "border-primary bg-secondary" 
                          : "border-border"
                      )}
                    >
                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-muted">
                        {photo ? (
                          <img
                            src={photo}
                            alt={doctor.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <User className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{doctor.name}</p>
                        <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Step 4: Date & Time */}
            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">Выберите дату</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate
                          ? format(selectedDate, "d MMMM yyyy", { locale: ru })
                          : "Выберите дату"
                        }
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) =>
                          date < new Date() ||
                          date.getDay() === 0
                        }
                        initialFocus
                        className="pointer-events-auto p-3"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label className="mb-2 block">Выберите время</Label>
                  {selectedDate ? (
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => isMobile ? selectAndAdvance(setSelectedTime, time) : setSelectedTime(time)}
                          onDoubleClick={() => !isMobile && selectAndAdvance(setSelectedTime, time)}
                          className={cn(
                            "flex items-center justify-center gap-1 rounded-md border py-2 text-sm transition-all hover:border-primary",
                            selectedTime === time
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-card"
                          )}
                        >
                          <Clock className="h-3 w-3" />
                          {time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Сначала выберите дату</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 5: Contact Form */}
            {step === 5 && (
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="name">Ваше имя *</Label>
                  <Input
                    id="name"
                    placeholder="Иван Иванов"
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
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input
                    id="phone"
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

                <div>
                  <Label htmlFor="email">Email (необязательно)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    {...form.register("email")}
                    className="mt-1"
                  />
                  {form.formState.errors.email && (
                    <p className="mt-1 text-xs text-destructive">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">Пришлём подтверждение и ответим на вопросы по почте</p>

                <div className="flex items-start gap-3 rounded-lg bg-secondary p-4">
                  <Checkbox
                    id="consent"
                    checked={form.watch("consent")}
                    onCheckedChange={(checked) => 
                      form.setValue("consent", checked === true, { shouldValidate: true })
                    }
                    className="mt-0.5"
                  />
                  <Label htmlFor="consent" className="text-sm leading-relaxed">
                    Я согласен на обработку персональных данных согласно{" "}
                    <a href="/privacy" className="text-primary underline" target="_blank">
                      Федеральному закону №152-ФЗ
                    </a>
                  </Label>
                </div>
                {form.formState.errors.consent && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.consent.message}
                  </p>
                )}
              </form>
            )}

          </div>

            {/* Navigation */}
            <div className="mt-4 flex gap-3 shrink-0 border-t pt-4 border-border">
              {step > 1 && (
                <Button variant="outline" onClick={goBack} className="flex-1">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Назад
                </Button>
              )}
              
              {step < 5 ? (
                <Button 
                  onClick={goNext} 
                  disabled={!canProceed()}
                  className="flex-1"
                >
                  Далее
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={!form.watch("consent") || isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    "Записаться"
                  )}
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
