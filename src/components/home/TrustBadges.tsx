import { Star, Shield, Award } from "lucide-react";

export function TrustBadges() {
  return (
    <section className="border-y border-border bg-card py-4">
      <div className="container">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
          {/* Yandex Rating */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm font-medium">
              <span className="font-bold text-primary">5.0</span>
              <span className="text-muted-foreground"> на Яндекс</span>
            </span>
          </div>

          {/* ProDoctorov Rating */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className={`h-4 w-4 ${i <= 4 ? "fill-amber-400 text-amber-400" : "fill-amber-400/50 text-amber-400/50"}`} />
              ))}
            </div>
            <span className="text-sm font-medium">
              <span className="font-bold text-primary">4.8</span>
              <span className="text-muted-foreground"> на ProDoctorov</span>
            </span>
          </div>

          {/* Licensed */}
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Лицензированная клиника
            </span>
          </div>

          {/* Experience */}
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              10+ лет опыта
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
