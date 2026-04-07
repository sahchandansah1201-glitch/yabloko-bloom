import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Stethoscope, Scissors } from "lucide-react";

const iconMap: Record<string, typeof Sparkles> = {
  sparkles: Sparkles,
  stethoscope: Stethoscope,
  scissors: Scissors,
};

interface Props {
  services: { icon: string; title: string; items: string[] }[];
}

/**
 * Maps doctor profile service item names to service page slugs.
 * Handles cases where profile names differ from servicesData titles.
 */
const itemSlugMap: Record<string, string> = {
  // Cosmetology
  "ботулинотерапия": "botoks",
  "контурная пластика": "konturnaya-plastika",
  "anti-age": "anti-age",
  "биоревитализация": "biorevitalizatsiya",
  "пилинги": "pilingi",
  "мезотерапия": "mezoterapiya-golovy",
  "плазмотерапия": "plazmoterapiya",
  "лазерная эпиляция": "lazernaya-epilyatsiya",
  "чистки лица": "chistka-litsa",
  "чистка лица": "chistka-litsa",
  "уходовые процедуры": "chistka-litsa",
  "массаж лица": "massazh-litsa",
  "миофасциальный массаж лица": "miofastsialnyy-massazh-litsa",
  "нитевой лифтинг": "nitevoy-lifting",
  "фотоомоложение": "fotoомоlozhenie",
  "rf-лифтинг": "rf-lifting",
  "коррекция фигуры": "korrektsiya-figury",
  "генетическое тестирование": "geneticheskoe-testirovanie",
  // Dermatology
  "лечение угревой болезни (акне)": "lechenie-akne",
  "лечение акне": "lechenie-akne",
  "дерматоскопия": "consult-derm",
  "удаление новообразований": "udalenie-papillom",
  "диагностика кожных заболеваний": "consult-derm",
  "лечение дерматитов": "consult-derm",
  "лечение пигментации": "pigmentatsiya",
  "удаление папиллом": "udalenie-papillom",
  "удаление родинок": "udalenie-rodinok",
  // Trichology
  "диагностика выпадения волос": "diagnostika-volos",
  "лечение выпадения волос": "diagnostika-volos",
  "трихоскопия": "diagnostika-volos",
  "мезотерапия кожи головы": "mezoterapiya-golovy",
  "лечение алопеции": "inyektsionnaya-trikhologiya",
  // Health
  "краниосакральная терапия": "osteopat",
  "висцеральная остеопатия": "osteopat",
  "структуральная остеопатия": "osteopat",
  "лечебный массаж": "massazh",
  "спортивный массаж": "massazh",
  "лимфодренажный массаж": "massazh",
  "персональные планы питания": "dietolog",
  "коррекция веса": "dietolog",
  "нутритивная поддержка": "dietolog",
  "подбор витаминов и бадов": "dietolog",
  "антивозрастная нутрициология": "dietolog",
  "диагностика неврологических заболеваний": "nevrolog",
  "лечение головных болей": "nevrolog",
  "лечение болей в спине": "nevrolog",
  "реабилитация": "nevrolog",
  // Misc
  "ассистирование при инъекционных процедурах": "consult-cosm",
};

export function DoctorProfileServices({ services }: Props) {
  const navigate = useNavigate();

  const handleItemClick = (itemName: string) => {
    const slug = itemSlugMap[itemName.toLowerCase()];
    if (slug) {
      navigate(`/services/${slug}`);
    } else {
      navigate("/services");
    }
  };

  return (
    <section className="py-12 md:py-16 bg-secondary/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-fluid-2xl font-bold text-foreground mb-8 text-center">
            Специализация и услуги
          </h2>
          <div className={`grid gap-6 ${services.length >= 3 ? "md:grid-cols-3" : services.length === 2 ? "md:grid-cols-2 max-w-3xl mx-auto" : "max-w-md mx-auto"}`}>
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] || Stethoscope;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 mb-2">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="font-heading text-fluid-lg">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {service.items.map((item) => (
                          <button
                            key={item}
                            onClick={() => handleItemClick(item)}
                            className="cursor-pointer rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
