import { Star, ShieldCheck, Award, Users } from "lucide-react";

export function TrustAnchors() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
      <span className="flex items-center gap-1.5 font-medium text-foreground">
        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
        <span className="ml-1">4.9</span>
      </span>
      <span className="flex items-center gap-1.5">
        <ShieldCheck className="h-4 w-4 text-primary" />
        Лицензия Минздрава
      </span>
      <span className="flex items-center gap-1.5">
        <Award className="h-4 w-4 text-primary" />
        Членство РОДВК
      </span>
      <span className="flex items-center gap-1.5">
        <Users className="h-4 w-4 text-primary" />
        8+ лет практики
      </span>
    </div>
  );
}
