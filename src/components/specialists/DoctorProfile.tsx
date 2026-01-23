import { User, Star, Award, Phone, Calendar, GraduationCap, FileCheck, Briefcase } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  bio: string | null;
  image_url: string | null;
  is_top_specialist: boolean | null;
}

interface DoctorProfileProps {
  doctor: Doctor | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: (doctorId: string) => void;
}

// Mock education/certificates data - in production this would come from DB
const getDoctorEducation = (doctorId: string) => {
  const educationData: Record<string, { education: string[]; certificates: string[]; experience: string }> = {
    // Павлюк Мария Олеговна
    "5be37782-65c6-4b1c-8981-7a3432335035": {
      education: [
        "Кубанский государственный медицинский университет, лечебное дело (2008)",
        "Ординатура по дерматовенерологии, КГМУ (2010)",
        "Профессиональная переподготовка по косметологии (2012)",
        "Повышение квалификации по трихологии (2015)",
      ],
      certificates: [
        "Сертификат специалиста по дерматовенерологии",
        "Сертификат специалиста по косметологии",
        "Сертификат по инъекционным методам омоложения",
        "Сертификат по работе с лазерным оборудованием",
      ],
      experience: "15 лет",
    },
    // Аллам Алиса Хусейновна
    "b9d1a8eb-1c52-4335-ac66-a91ff36b59b8": {
      education: [
        "Ростовский государственный медицинский университет (2012)",
        "Ординатура по дерматовенерологии (2014)",
      ],
      certificates: [
        "Сертификат специалиста по дерматовенерологии",
        "Сертификат по дерматоскопии",
      ],
      experience: "10 лет",
    },
    // Ковалев Игорь Петрович
    "023cdc51-ed42-478c-b281-3cfb56f30317": {
      education: [
        "Московский государственный медицинский университет (2009)",
        "Специализация по остеопатии, Институт остеопатии (2012)",
      ],
      certificates: [
        "Сертификат остеопата",
        "Сертификат по мануальной терапии",
      ],
      experience: "13 лет",
    },
    // Медведкова Наргиза Ахматиллаевна
    "b274bc11-d811-423b-9e15-67f7cfe8cb65": {
      education: [
        "Кубанский государственный медицинский университет, лечебное дело (2015)",
        "Профессиональная переподготовка по диетологии (2017)",
      ],
      certificates: [
        "Сертификат врача-терапевта",
        "Сертификат нутрициолога",
      ],
      experience: "8 лет",
    },
    // Райкова Светлана Александровна
    "132b5047-9d17-4231-b8cb-751d6547cedc": {
      education: [
        "Ставропольский государственный медицинский университет (2011)",
        "Ординатура по дерматовенерологии (2013)",
      ],
      certificates: [
        "Сертификат специалиста по дерматовенерологии",
        "Сертификат по трихологии",
      ],
      experience: "11 лет",
    },
  };

  return educationData[doctorId] || {
    education: ["Высшее медицинское образование"],
    certificates: ["Сертификат специалиста"],
    experience: "5+ лет",
  };
};

export function DoctorProfile({ doctor, isOpen, onClose, onBook }: DoctorProfileProps) {
  if (!doctor) return null;

  const details = getDoctorEducation(doctor.id);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader className="sr-only">
          <DialogTitle>{doctor.name}</DialogTitle>
          <DialogDescription>{doctor.specialty}</DialogDescription>
        </DialogHeader>

        {/* Hero Section */}
        <div className="flex flex-col items-center text-center pb-6 border-b">
          <div className="relative mb-4">
            {doctor.image_url ? (
              <img
                src={doctor.image_url}
                alt={doctor.name}
                className="h-28 w-28 rounded-full object-cover ring-4 ring-primary/20"
                loading="lazy"
                width={112}
                height={112}
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-secondary ring-4 ring-primary/20">
                <User className="h-14 w-14 text-muted-foreground" />
              </div>
            )}
            {doctor.is_top_specialist && (
              <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-lg">
                <Star className="h-5 w-5 fill-primary-foreground text-primary-foreground" />
              </div>
            )}
          </div>

          <h2 className="font-heading text-xl font-bold text-foreground">
            {doctor.name}
          </h2>
          <p className="text-muted-foreground">{doctor.specialty}</p>

          {doctor.is_top_specialist && (
            <Badge className="mt-3 gap-1">
              <Award className="h-3 w-3" />
              Ведущий специалист клиники
            </Badge>
          )}

          <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
            <Briefcase className="h-4 w-4" />
            <span>Опыт работы: {details.experience}</span>
          </div>
        </div>

        {/* Bio */}
        {doctor.bio && (
          <div className="py-4 border-b">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {doctor.bio}
            </p>
          </div>
        )}

        {/* Education & Certificates Accordion */}
        <Accordion type="multiple" className="w-full" defaultValue={["education"]}>
          <AccordionItem value="education">
            <AccordionTrigger className="text-sm font-medium hover:no-underline">
              <span className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-primary" />
                Образование
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {details.education.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="certificates">
            <AccordionTrigger className="text-sm font-medium hover:no-underline">
              <span className="flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-primary" />
                Сертификаты и лицензии
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {details.certificates.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Sticky Book Button */}
        <div className="sticky bottom-0 pt-4 bg-background border-t mt-4">
          <Button
            size="lg"
            className="w-full gap-2"
            onClick={() => onBook(doctor.id)}
          >
            <Calendar className="h-4 w-4" />
            Записаться к {doctor.name.split(" ")[0]}
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-2">
            <Phone className="inline-block h-3 w-3 mr-1" />
            Или позвоните: +7 (918) 412-85-85
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
