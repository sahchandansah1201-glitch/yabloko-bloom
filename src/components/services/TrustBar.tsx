import { ShieldCheck, Star, UserCheck } from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    text: "Медицинская лицензия № ЛО-23-01-014846",
  },
  {
    icon: Star,
    text: "Яндекс 5.0 · ПроДокторов 4.8",
  },
  {
    icon: UserCheck,
    text: "Врачи со стажем от 8 лет",
  },
];

export function TrustBar() {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
      {items.map((item) => (
        <div key={item.text} className="flex items-center gap-2 text-sm text-muted-foreground">
          <item.icon className="h-4 w-4 shrink-0 text-lime-400" />
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
}
