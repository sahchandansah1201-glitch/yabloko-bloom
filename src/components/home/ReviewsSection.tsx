import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

export function ReviewsSection() {
  const reviews = [
    {
      name: "Анна К.",
      text: "Лучшая клиника в Краснодаре! Наконец-то избавилась от акне после многих лет борьбы. Спасибо доктору Павлюк!",
      rating: 5,
      source: "Яндекс",
      date: "Январь 2024",
    },
    {
      name: "Елена М.",
      text: "Dr. Pavlyuk is a genius! Результат превзошел все ожидания. Рекомендую всем!",
      rating: 5,
      source: "2ГИС",
      date: "Декабрь 2023",
    },
    {
      name: "Ольга П.",
      text: "Очень довольна процедурой биоревитализации. Кожа просто сияет. Персонал вежливый и профессиональный.",
      rating: 5,
      source: "Яндекс",
      date: "Январь 2024",
    },
    {
      name: "Мария С.",
      text: "Прохожу лечение у трихолога. Волосы стали заметно гуще. Индивидуальный подход к каждому пациенту.",
      rating: 5,
      source: "2ГИС",
      date: "Ноябрь 2023",
    },
    {
      name: "Татьяна В.",
      text: "Современное оборудование, уютная атмосфера. Лазерная эпиляция прошла безболезненно!",
      rating: 5,
      source: "Яндекс",
      date: "Декабрь 2023",
    },
    {
      name: "Ирина Д.",
      text: "Комплексный подход к красоте и здоровью. Нутрициолог помог нормализовать питание, что отразилось на коже.",
      rating: 5,
      source: "2ГИС",
      date: "Октябрь 2023",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-primary text-primary">
            Отзывы пациентов
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Нам доверяют
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Более 5000 довольных пациентов. Рейтинг 5.0 на Яндекс Картах.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {reviews.map((review, index) => (
            <Card
              key={index}
              className="break-inside-avoid border-border/50 bg-card hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-primary/20 mb-4" />

                {/* Review Text */}
                <p className="text-foreground mb-4 leading-relaxed">
                  "{review.text}"
                </p>

                {/* Rating */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {review.source}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "5.0", label: "Рейтинг Яндекс" },
            { value: "4.8", label: "Рейтинг 2ГИС" },
            { value: "5000+", label: "Довольных пациентов" },
            { value: "98%", label: "Рекомендуют нас" },
          ].map((stat, i) => (
            <div key={i} className="text-center p-4 rounded-xl bg-secondary/50">
              <p className="font-heading text-2xl md:text-3xl font-bold text-primary">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
