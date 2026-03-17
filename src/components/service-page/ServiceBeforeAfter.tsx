import { useState } from "react";
import { motion } from "framer-motion";
import { GripVertical } from "lucide-react";

interface BeforeAfterCase {
  label: string;
  sessions: string;
}

const mockCases: BeforeAfterCase[] = [
  { label: "Антивозрастная терапия", sessions: "3 сеанса" },
  { label: "Коррекция пигментации", sessions: "5 сеансов" },
];

export function ServiceBeforeAfter() {
  return (
    <section className="py-12 md:py-16">
      <div className="container max-w-4xl">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
          Результаты: До и После
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-8">
          Реальные результаты наших пациентов
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {mockCases.map((c, i) => (
            <SliderCard key={i} label={c.label} sessions={c.sessions} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SliderCard({ label, sessions, index }: { label: string; sessions: string; index: number }) {
  const [position, setPosition] = useState(50);

  const handleMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setPosition(x);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="rounded-2xl overflow-hidden border border-border bg-card"
    >
      {/* Interactive slider area */}
      <div
        className="relative aspect-[4/3] cursor-col-resize select-none overflow-hidden bg-secondary"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
      >
        {/* "Before" side */}
        <div className="absolute inset-0 bg-secondary/80" />
        {/* "After" overlay clipped */}
        <div
          className="absolute inset-0 bg-primary/10"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        />

        {/* Divider handle */}
        <div
          className="absolute top-0 bottom-0 z-10 flex items-center"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          <div className="h-full w-0.5 bg-primary/70" />
          <div className="absolute top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-card border-2 border-primary shadow-md">
            <GripVertical className="h-4 w-4 text-primary" />
          </div>
        </div>

        {/* Labels */}
        <span className="absolute bottom-3 left-3 text-xs font-medium bg-card/90 backdrop-blur-sm px-2 py-1 rounded-md text-foreground z-20">
          До
        </span>
        <span className="absolute bottom-3 right-3 text-xs font-medium bg-primary/90 backdrop-blur-sm px-2 py-1 rounded-md text-primary-foreground z-20">
          После
        </span>
      </div>

      {/* Meta */}
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-xs text-muted-foreground">{sessions}</span>
      </div>
    </motion.div>
  );
}
