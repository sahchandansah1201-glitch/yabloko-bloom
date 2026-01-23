import { useState, useRef, useCallback } from "react";
import { Badge } from "@/components/ui/badge";

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-primary text-primary">
            Результаты лечения
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            До и после
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Реальные результаты наших пациентов. Перетащите ползунок для сравнения.
          </p>
        </div>

        {/* Comparison Slider */}
        <div className="max-w-3xl mx-auto">
          <div
            ref={containerRef}
            className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl cursor-ew-resize select-none"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            {/* Before Image (Background) */}
            <div className="absolute inset-0 bg-gradient-to-br from-muted to-secondary">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-muted-foreground/20 mx-auto mb-4" />
                  <p className="text-muted-foreground font-medium">Состояние кожи до лечения</p>
                </div>
              </div>
            </div>

            {/* After Image (Clipped overlay) */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-apple-green-light to-primary/20"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-primary/30 mx-auto mb-4" />
                  <p className="text-primary font-medium">Результат после курса</p>
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 z-10">
              <Badge className="bg-foreground/80 text-background">До</Badge>
            </div>
            <div className="absolute top-4 right-4 z-10">
              <Badge className="bg-primary text-primary-foreground">После</Badge>
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-card shadow-lg z-20"
              style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
            >
              {/* Handle circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card shadow-xl border-4 border-primary flex items-center justify-center">
                <div className="flex gap-0.5">
                  <div className="w-0.5 h-4 bg-primary rounded-full" />
                  <div className="w-0.5 h-4 bg-primary rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Caption */}
          <div className="text-center mt-6">
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">Результат лечения акне.</span>
              {" "}Врач: Павлюк М.О.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
