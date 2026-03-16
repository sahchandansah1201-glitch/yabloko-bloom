import { User, Star, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { doctorPhotos } from "@/assets/doctors";

interface DoctorCardProps {
  id: string;
  name: string;
  specialty: string;
  bio: string | null;
  imageUrl: string | null;
  isTopSpecialist: boolean;
  onClick: () => void;
}

export function DoctorCard({
  name,
  specialty,
  bio,
  imageUrl,
  isTopSpecialist,
  onClick,
}: DoctorCardProps) {
  const photo = imageUrl || doctorPhotos[name];

  return (
    <Card
      className={cn(
        "group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/50",
        isTopSpecialist && "ring-2 ring-primary/20"
      )}
      onClick={onClick}
    >
      {/* Large photo */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-secondary">
        {photo ? (
          <img
            src={photo}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <User className="h-16 w-16 text-muted-foreground" />
          </div>
        )}
        {isTopSpecialist && (
          <Badge className="absolute top-3 left-3 gap-1 bg-primary text-primary-foreground shadow-md">
            <Star className="h-3 w-3 fill-current" />
            Ведущий специалист
          </Badge>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-heading text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{specialty}</p>
        {bio && (
          <p className="mt-2 text-xs text-muted-foreground/80 line-clamp-2">{bio}</p>
        )}
      </div>
    </Card>
  );
}
