import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BadgeCheck, ArrowRight, User } from "lucide-react";
import { useDoctors } from "@/hooks/useDoctors";
import { doctorPhotos } from "@/assets/doctors";

interface DoctorsCarouselProps {
  onBookingClick: (doctorId?: string) => void;
}

export function DoctorsCarousel({ onBookingClick }: DoctorsCarouselProps) {
  const { data: doctors, isLoading } = useDoctors();

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center">
            <div className="h-8 w-64 bg-muted animate-pulse rounded mx-auto mb-4" />
            <div className="h-4 w-96 bg-muted animate-pulse rounded mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-primary text-primary">
            Наша команда
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Врачи — наша гордость
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Команда сертифицированных специалистов с многолетним опытом работы
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {doctors?.map((doctor) => (
              <CarouselItem key={doctor.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden border-border/50 bg-card hover:shadow-lg transition-all duration-300 group h-full">
                  <CardContent className="p-0">
                    {/* Doctor Photo */}
                    <div className="relative aspect-[3/4] bg-gradient-to-br from-apple-green-light to-secondary overflow-hidden">
                      {(doctor.image_url || doctorPhotos[doctor.name]) ? (
                        <img
                          src={doctor.image_url || doctorPhotos[doctor.name]}
                          alt={doctor.name}
                          className="absolute inset-0 h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <User className="h-24 w-24 text-primary/30" />
                        </div>
                      )}
                      
                      {/* Verified Badge */}
                      {doctor.is_top_specialist && (
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-primary text-primary-foreground gap-1.5 shadow-md">
                            <BadgeCheck className="h-3.5 w-3.5" />
                            Ведущий специалист
                          </Badge>
                        </div>
                      )}
                      
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 w-full">
                          <Button
                            size="sm"
                            className="w-full bg-primary hover:bg-primary/90"
                            onClick={() => onBookingClick(doctor.id)}
                          >
                            Записаться
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Doctor Info */}
                    <div className="p-4">
                      <h3 className="font-heading font-semibold text-foreground mb-1">
                        {doctor.name}
                      </h3>
                      <p className="text-sm text-primary font-medium mb-2">
                        {doctor.specialty}
                      </p>
                      {doctor.bio && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {doctor.bio}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12" />
          <CarouselNext className="hidden md:flex -right-12" />
        </Carousel>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link to="/specialists">
            <Button variant="outline" size="lg" className="gap-2">
              Все специалисты
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
