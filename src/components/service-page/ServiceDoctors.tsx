import { useNavigate } from "react-router-dom";
import { Star, Calendar, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { doctorPhotos } from "@/assets/doctors";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  slug: string | null;
}

interface ServiceDoctorsProps {
  doctors: Doctor[];
  onBookDoctor: (doctorId: string) => void;
}

export function ServiceDoctors({ doctors, onBookDoctor }: ServiceDoctorsProps) {
  const navigate = useNavigate();
  if (!doctors.length) return null;

  return (
    <section className="py-12 md:py-16 bg-secondary/30">
      <div className="container">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
          Процедуру выполняют
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {doctors.map((doc) => {
            const photo = doctorPhotos[doc.name];
            return (
              <Card key={doc.id} className="overflow-hidden transition-all hover:shadow-lg hover:border-primary/40">
                <div
                  className="relative aspect-[3/4] w-full overflow-hidden bg-secondary cursor-pointer"
                  onClick={() => doc.slug && navigate(`/doctor/${doc.slug}`)}
                >
                  {photo ? (
                    <img src={photo} alt={doc.name} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <User className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  <Badge className="absolute top-3 left-3 gap-1 bg-card/90 text-foreground backdrop-blur-sm shadow-sm border-0">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    5.0
                  </Badge>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-heading text-sm font-semibold text-foreground line-clamp-1">{doc.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{doc.specialty}</p>
                  </div>
                  <Button size="sm" variant="hero" className="w-full" onClick={() => onBookDoctor(doc.id)}>
                    <Calendar className="h-4 w-4 mr-1" />
                    Записаться к врачу
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
