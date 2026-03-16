export interface ServiceItem {
  slug: string;
  title: string;
  icon: string;
  priceFrom: string;
  category: string;
}

export interface ServiceCategory {
  id: string;
  label: string;
  icon: string;
  services: ServiceItem[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "cosmetology",
    label: "Косметология",
    icon: "sparkles",
    services: [
      { slug: "biorevitalizatsiya", title: "Биоревитализация", icon: "droplets", priceFrom: "от 5 000 ₽", category: "cosmetology" },
      { slug: "botoks", title: "Ботокс / Диспорт", icon: "syringe", priceFrom: "от 4 500 ₽", category: "cosmetology" },
      { slug: "konturnaya-plastika", title: "Контурная пластика", icon: "pen-tool", priceFrom: "от 12 000 ₽", category: "cosmetology" },
      { slug: "lazernaya-shlifovka", title: "Лазерная шлифовка", icon: "zap", priceFrom: "от 3 000 ₽", category: "cosmetology" },
      { slug: "chistka-litsa", title: "Чистка лица", icon: "sparkle", priceFrom: "от 3 500 ₽", category: "cosmetology" },
      { slug: "pilingi", title: "Пилинги", icon: "layers", priceFrom: "от 2 500 ₽", category: "cosmetology" },
    ],
  },
  {
    id: "dermatology",
    label: "Дерматология",
    icon: "stethoscope",
    services: [
      { slug: "lechenie-akne", title: "Лечение акне", icon: "shield-check", priceFrom: "от 3 000 ₽", category: "dermatology" },
      { slug: "udalenie-papillom", title: "Удаление папиллом", icon: "scissors", priceFrom: "от 500 ₽", category: "dermatology" },
      { slug: "udalenie-rodinok", title: "Удаление родинок", icon: "circle-dot", priceFrom: "от 1 000 ₽", category: "dermatology" },
      { slug: "udalenie-sosudov", title: "Удаление сосудов", icon: "activity", priceFrom: "от 2 000 ₽", category: "dermatology" },
    ],
  },
  {
    id: "trichology",
    label: "Трихология",
    icon: "scissors",
    services: [
      { slug: "diagnostika-volos", title: "Диагностика волос", icon: "search", priceFrom: "от 2 000 ₽", category: "trichology" },
      { slug: "inyektsionnaya-trikhologiya", title: "Инъекционная трихология", icon: "syringe", priceFrom: "от 4 000 ₽", category: "trichology" },
      { slug: "mezoterapiya-golovy", title: "Мезотерапия головы", icon: "droplets", priceFrom: "от 3 500 ₽", category: "trichology" },
    ],
  },
  {
    id: "health",
    label: "Здоровье",
    icon: "heart-pulse",
    services: [
      { slug: "osteopat", title: "Остеопат", icon: "hand", priceFrom: "от 4 000 ₽", category: "health" },
      { slug: "dietolog", title: "Диетолог", icon: "apple", priceFrom: "от 3 000 ₽", category: "health" },
      { slug: "nevrolog", title: "Невролог", icon: "brain", priceFrom: "от 3 000 ₽", category: "health" },
      { slug: "massazh", title: "Массаж", icon: "hand", priceFrom: "от 2 500 ₽", category: "health" },
    ],
  },
];

export function getAllServices(): ServiceItem[] {
  return serviceCategories.flatMap((c) => c.services);
}

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return getAllServices().find((s) => s.slug === slug);
}

export interface ServicePageData {
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
  recovery: string;
  heroImage?: string;
  doctorSlugs: string[];
  pricing: { name: string; price: string }[];
  crossSell: { slug: string; title: string }[];
  faq: { question: string; answer: string }[];
}

export const servicePages: Record<string, ServicePageData> = {
  "lechenie-akne": {
    slug: "lechenie-akne",
    title: "Лечение акне (угревой болезни)",
    subtitle: "Комплексный медицинский подход к чистой коже без рубцов и постакне.",
    duration: "от 40 мин",
    recovery: "1–3 дня",
    heroImage: "/placeholder.svg",
    doctorSlugs: ["pavlyuk", "allam", "raykova", "gracheva"],
    pricing: [
      { name: "Первичный приём дерматолога", price: "3 000 ₽" },
      { name: "Чистка лица комбинированная", price: "от 4 500 ₽" },
      { name: "Пилинг (салициловый / ретиноевый)", price: "от 2 500 ₽" },
      { name: "Мезотерапия лица", price: "от 5 000 ₽" },
      { name: "Лазерное лечение акне", price: "от 3 000 ₽" },
    ],
    crossSell: [
      { slug: "dietolog", title: "Диетолог (Коррекция питания)" },
      { slug: "pilingi", title: "Пилинги" },
      { slug: "chistka-litsa", title: "Чистка лица" },
    ],
    faq: [
      { question: "Это больно?", answer: "Большинство процедур по лечению акне безболезненны или сопровождаются минимальным дискомфортом. При необходимости используется местная анестезия." },
      { question: "Сколько сеансов потребуется?", answer: "Количество сеансов зависит от степени тяжести акне. В среднем курс составляет 4–8 процедур с интервалом 2–4 недели. План лечения составляется индивидуально." },
      { question: "Как подготовиться к процедуре?", answer: "За 3 дня до процедуры рекомендуется отказаться от скрабов и пилингов. В день процедуры приходите с чистой кожей без декоративной косметики." },
      { question: "Можно ли полностью вылечить акне?", answer: "Да, при комплексном подходе (наружное лечение + коррекция питания + при необходимости системная терапия) можно добиться стойкой ремиссии и значительного улучшения состояния кожи." },
    ],
  },
  botoks: {
    slug: "botoks",
    title: "Ботокс / Диспорт",
    subtitle: "Быстрое и безопасное разглаживание мимических морщин.",
    duration: "20–30 мин",
    recovery: "Без реабилитации",
    heroImage: "/placeholder.svg",
    doctorSlugs: ["pavlyuk", "igithanyan", "gracheva"],
    pricing: [
      { name: "Ботулинотерапия (1 зона)", price: "от 4 500 ₽" },
      { name: "Ботулинотерапия (2 зоны)", price: "от 8 000 ₽" },
      { name: "Ботулинотерапия (3 зоны)", price: "от 11 000 ₽" },
    ],
    crossSell: [
      { slug: "biorevitalizatsiya", title: "Биоревитализация" },
      { slug: "konturnaya-plastika", title: "Контурная пластика" },
    ],
    faq: [
      { question: "Это больно?", answer: "Процедура практически безболезненна. Используются тонкие иглы, а при необходимости — аппликационная анестезия." },
      { question: "Как долго сохраняется результат?", answer: "Эффект длится от 4 до 6 месяцев в зависимости от индивидуальных особенностей." },
    ],
  },
  biorevitalizatsiya: {
    slug: "biorevitalizatsiya",
    title: "Биоревитализация",
    subtitle: "Глубокое увлажнение и восстановление кожи гиалуроновой кислотой.",
    duration: "30–40 мин",
    recovery: "1–2 дня",
    heroImage: "/placeholder.svg",
    doctorSlugs: ["pavlyuk", "igithanyan", "gracheva"],
    pricing: [
      { name: "Биоревитализация лица", price: "от 5 000 ₽" },
      { name: "Биоревитализация лицо + шея", price: "от 7 000 ₽" },
    ],
    crossSell: [
      { slug: "botoks", title: "Ботокс / Диспорт" },
      { slug: "pilingi", title: "Пилинги" },
    ],
    faq: [
      { question: "Когда виден результат?", answer: "Первый результат заметен уже после первой процедуры. Максимальный эффект — после курса из 3–4 процедур." },
    ],
  },
};

export function getServicePageData(slug: string): ServicePageData | undefined {
  return servicePages[slug];
}
