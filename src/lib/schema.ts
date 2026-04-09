/**
 * Unified Schema.org / JSON-LD Knowledge Graph for Яблоко Clinic.
 * All entities use @id references to form a connected graph.
 */

const SITE_URL = "https://yabloko-clinic.ru";
const CLINIC_ID = `${SITE_URL}/#clinic`;
const LOGO_URL = `${SITE_URL}/logo.png`;

/* ── Organization Entity (Knowledge Graph root) ── */

const ORG_ID = `${SITE_URL}/#organization`;

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Клиника «Яблоко»",
    alternateName: "Яблоко — клиника дерматологии и косметологии",
    url: SITE_URL,
    logo: LOGO_URL,
    image: LOGO_URL,
    description:
      "Клиника дерматологии и косметологии в Краснодаре. Красота через здоровье.",
    telephone: "+7-918-412-85-85",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. 70-летия Октября, 1/2",
      addressLocality: "Краснодар",
      addressRegion: "Краснодарский край",
      postalCode: "350000",
      addressCountry: "RU",
    },
    sameAs: [
      "https://www.instagram.com/yabloko_clinic_krd/",
      "https://wa.me/79184128585",
      "https://t.me/yabloko_clinic",
      "https://vk.com/yabloko_clinic",
    ],
  };
}

/* ── Base Clinic Entity ─────────────────────────── */

export function getClinicSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": CLINIC_ID,
    name: "Клиника «Яблоко»",
    alternateName: "Яблоко — клиника дерматологии и косметологии",
    url: SITE_URL,
    logo: LOGO_URL,
    image: LOGO_URL,
    description:
      "Клиника дерматологии и косметологии в Краснодаре. Красота через здоровье — комплексный подход к лечению кожи, волос и Anti-Age медицине.",
    telephone: "+7-918-412-85-85",
    priceRange: "₽₽",
    currenciesAccepted: "RUB",
    paymentAccepted: "Cash, Credit Card",
    parentOrganization: { "@id": ORG_ID },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "21:00",
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. 70-летия Октября, 1/2",
      addressLocality: "Краснодар",
      addressRegion: "Краснодарский край",
      postalCode: "350000",
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.026234,
      longitude: 38.904027,
    },
    medicalSpecialty: [
      "Dermatology",
      "Cosmetic Medicine",
      "Trichology",
    ],
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/#booking`,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      result: {
        "@type": "Reservation",
        name: "Запись на приём",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "6517",
      bestRating: "5",
    },
  };
}

/* ── Physician Entity ───────────────────────────── */

interface PhysicianSchemaInput {
  slug: string;
  name: string;
  specialty: string;
  bio?: string | null;
  experience?: string;
  education?: { year: string; text: string }[];
  knowsAbout?: string[];
  faq?: { question: string; answer: string }[];
}

export function getPhysicianSchema(doc: PhysicianSchemaInput) {
  const physicianId = `${SITE_URL}/doctor/${doc.slug}#physician`;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": physicianId,
    name: doc.name,
    jobTitle: doc.specialty,
    url: `${SITE_URL}/doctor/${doc.slug}`,
    description: `${doc.name} — ${doc.specialty}. ${doc.bio || ""}`.trim(),
    medicalSpecialty: doc.specialty,
    worksFor: { "@id": CLINIC_ID },
    memberOf: {
      "@type": "MedicalOrganization",
      name: "Российское общество дерматовенерологов и косметологов",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "48",
      bestRating: "5",
    },
  };

  if (doc.experience) {
    schema.description = `${doc.name} — ${doc.specialty}, стаж ${doc.experience}. ${doc.bio || ""}`.trim();
  }

  if (doc.education?.length) {
    schema.alumniOf = doc.education.map((e) => ({
      "@type": "EducationalOrganization",
      name: e.text,
    }));
  }

  if (doc.knowsAbout?.length) {
    schema.knowsAbout = doc.knowsAbout;
  }

  return schema;
}

/* ── Physician FAQ (separate FAQPage entity) ───── */

export function getPhysicianFAQSchema(faq: { question: string; answer: string }[]) {
  if (!faq.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: truncateAnswer(f.answer),
      },
    })),
  };
}

/* ── MedicalTherapy Entity ──────────────────────── */

interface TherapySchemaInput {
  slug: string;
  title: string;
  subtitle: string;
  priceFrom?: string;
  indications?: string[];
  doctorSlugs?: string[];
  faq?: { question: string; answer: string }[];
}

export function getTherapySchema(therapy: TherapySchemaInput) {
  const therapyId = `${SITE_URL}/services/${therapy.slug}#therapy`;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    "@id": therapyId,
    name: therapy.title,
    url: `${SITE_URL}/services/${therapy.slug}`,
    description: therapy.subtitle,
    provider: { "@id": CLINIC_ID },
  };

  if (therapy.priceFrom) {
    schema.offers = {
      "@type": "Offer",
      priceCurrency: "RUB",
      price: therapy.priceFrom.replace(/[^\d]/g, ""),
      availability: "https://schema.org/InStock",
    };
  }

  if (therapy.indications?.length) {
    schema.relevantCondition = therapy.indications.slice(0, 5).map((ind) => ({
      "@type": "MedicalCondition",
      name: ind,
    }));
  }

  if (therapy.doctorSlugs?.length) {
    schema.performer = therapy.doctorSlugs.map((s) => ({
      "@id": `${SITE_URL}/doctor/${s}#physician`,
    }));
  }

  return schema;
}

/* ── Service FAQ (voice-optimised) ──────────────── */

export function getServiceFAQSchema(faq: { question: string; answer: string }[]) {
  if (!faq.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: truncateAnswer(f.answer),
      },
    })),
  };
}

/* ── MedicalWebPage (Knowledge Base articles) ───── */

interface ArticleSchemaInput {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  authorName: string;
  authorSlug?: string;
  reviewedByName?: string;
  reviewedBySlug?: string;
}

export function getArticleSchema(article: ArticleSchemaInput) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    headline: article.title,
    url: `${SITE_URL}/advice/${article.slug}`,
    datePublished: article.publishedAt,
    description: article.excerpt,
    publisher: { "@id": CLINIC_ID },
    inLanguage: "ru",
  };

  if (article.authorSlug) {
    schema.author = { "@id": `${SITE_URL}/doctor/${article.authorSlug}#physician` };
  } else {
    schema.author = { "@type": "Person", name: article.authorName };
  }

  if (article.reviewedBySlug) {
    schema.reviewedBy = { "@id": `${SITE_URL}/doctor/${article.reviewedBySlug}#physician` };
  } else if (article.reviewedByName) {
    schema.reviewedBy = { "@type": "Person", name: article.reviewedByName };
  }

  return schema;
}

/* ── BreadcrumbList ──────────────────────────────── */

interface BreadcrumbItem {
  name: string;
  url?: string;
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}` } : {}),
    })),
  };
}

/* ── WebSite Schema (Sitelinks Search Box) ──────── */

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Клиника «Яблоко»",
    url: SITE_URL,
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/services?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/* ── Review Schema (UI-matched individual reviews) ── */

interface ReviewInput {
  name: string;
  text: string;
  rating: number;
  source: string;
  date: string;
}

export function getReviewsSchema(reviews: ReviewInput[]) {
  return reviews.map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.name },
    reviewBody: r.text,
    reviewRating: {
      "@type": "Rating",
      ratingValue: String(r.rating),
      bestRating: "5",
    },
    publisher: { "@type": "Organization", name: r.source },
    itemReviewed: { "@id": CLINIC_ID },
  }));
}

/* ── Helpers ─────────────────────────────────────── */

/** Truncate FAQ answer to ~50 words for AIO/Voice Search compliance */
function truncateAnswer(text: string, maxWords = 50): string {
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "…";
}
