import { motion } from "framer-motion";
import { Quote, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";

export function EmpathyBlock() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <section className="py-12 md:py-16">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl bg-secondary/60 border p-8 md:p-12"
          >
            <Quote className="absolute top-6 left-6 h-10 w-10 text-primary/20" />
            <blockquote className="relative z-10 text-lg leading-relaxed text-foreground md:text-xl">
              «Моя главная цель — не просто устранить эстетический дефект, а найти его внутреннюю причину. Красота кожи всегда начинается со здоровья организма.»
            </blockquote>
            <p className="mt-4 font-heading font-semibold text-muted-foreground">— М.О. Павлюк</p>

            <Button
              variant="outline"
              className="mt-6 gap-2 rounded-full"
              onClick={() => setIsVideoOpen(true)}
            >
              <Play className="h-4 w-4" />
              Смотреть видео-визитку
            </Button>
          </motion.div>
        </div>
      </section>

      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Видео-визитка</DialogTitle>
            <DialogDescription>Павлюк Мария Олеговна — главный врач клиники «Яблоко»</DialogDescription>
          </DialogHeader>
          <div className="flex aspect-video items-center justify-center rounded-lg bg-muted">
            <div className="text-center text-muted-foreground">
              <Play className="mx-auto mb-2 h-12 w-12" />
              <p>Видео будет доступно скоро</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
