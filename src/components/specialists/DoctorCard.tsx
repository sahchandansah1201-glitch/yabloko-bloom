import { User, Star, Award, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
  return (
    <Card
      className={cn(
        "group cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/50",
        isTopSpecialist && "ring-2 ring-primary/20 bg-gradient-to-br from-primary/5 to-background"
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="relative">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                className="h-20 w-20 rounded-full object-cover ring-2 ring-border"
                loading="lazy"
                width={80}
                height={80}
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary ring-2 ring-border">
                <User className="h-10 w-10 text-muted-foreground" />
              </div>
            )}
            {isTopSpecialist && (
              <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary">
                <Star className="h-4 w-4 fill-primary-foreground text-primary-foreground" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {name}
                </h3>
                <p className="text-sm text-muted-foreground">{specialty}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
            </div>

            {isTopSpecialist && (
              <Badge variant="secondary" className="mt-2 gap-1">
                <Award className="h-3 w-3" />
                Ведущий специалист
              </Badge>
            )}

            {bio && (
              <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                {bio}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
