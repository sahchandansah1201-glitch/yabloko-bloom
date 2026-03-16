import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { DoctorHero } from "@/components/doctor-profile/DoctorHero";
import { DoctorStickyBar } from "@/components/doctor-profile/DoctorStickyBar";
import { EmpathyBlock } from "@/components/doctor-profile/EmpathyBlock";
import { ExpertiseServices } from "@/components/doctor-profile/ExpertiseServices";
import { EducationTimeline } from "@/components/doctor-profile/EducationTimeline";
import { DoctorBeforeAfter } from "@/components/doctor-profile/DoctorBeforeAfter";
import { DoctorReviews } from "@/components/doctor-profile/DoctorReviews";
import { DoctorFAQ } from "@/components/doctor-profile/DoctorFAQ";
import { InlineBookingForm } from "@/components/doctor-profile/InlineBookingForm";

const PAVLYUK_DOCTOR_ID = "5be37782-65c6-4b1c-8981-7a3432335035";

const physicianJsonLd = {
  "@context": "https://schema.org",
  "@type": "Physician",
  name: "Павлюк Мария Олеговна",
  jobTitle: "Главный врач, дерматовенеролог, косметолог, трихолог",
  medicalSpecialty: ["Dermatology", "Cosmetology", "Trichology"],
  worksFor: {
    "@type": "MedicalClinic",
    name: "Клиника «Яблоко»",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. 70-летия Октября, 1/2",
      addressLocality: "Краснодар",
      addressCountry: "RU",
    },
    telephone: "+7 (918) 412-85-85",
  },
  description:
    "Врач-дерматовенеролог, косметолог, трихолог с 15-летним стажем. Главный врач клиники «Яблоко» в Краснодаре.",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "120",
    bestRating: "5",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "С какими проблемами чаще всего обращаются к Марии Олеговне?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Чаще всего пациенты обращаются с проблемами акне и постакне, пигментации, возрастных изменений кожи, выпадения волос, а также для проведения инъекционных процедур и лазерных процедур.",
      },
    },
    {
      "@type": "Question",
      name: "Нужно ли сдавать анализы перед приемом косметолога?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Для первичной консультации анализы не требуются. Врач проведёт осмотр и, при необходимости, назначит дополнительные исследования.",
      },
    },
    {
      "@type": "Question",
      name: "Как проходит первичная консультация?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Первичная консультация длится 30–40 минут. Врач проводит детальный осмотр кожи, собирает анамнез и составляет персональный план лечения.",
      },
    },
  ],
};

export default function DoctorPavlyuk() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  return (
    <>
      <Helmet>
        <title>Врач-косметолог, дерматолог Павлюк Мария Олеговна | Клиника Яблоко Краснодар</title>
        <meta
          name="description"
          content="Павлюк Мария Олеговна — главный врач клиники «Яблоко», дерматовенеролог, косметолог, трихолог со стажем 15 лет. Запись онлайн в Краснодаре."
        />
        <meta name="keywords" content="Павлюк Мария Олеговна, дерматолог Краснодар, косметолог Краснодар, главный врач Яблоко" />
        <link rel="canonical" href="https://yabloko-clinic.ru/doctor/pavlyuk" />
        <script type="application/ld+json">{JSON.stringify(physicianJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <div className="flex min-h-screen flex-col">
        <Header onBookingClick={openBooking} />

        <main className="flex-1 pb-20 md:pb-0">
          <DoctorHero onBookingClick={openBooking} />
          <EmpathyBlock />
          <ExpertiseServices />
          <EducationTimeline />
          <DoctorBeforeAfter />
          <DoctorReviews />
          <DoctorFAQ />
          <InlineBookingForm />
        </main>

        <Footer />
        <DoctorStickyBar onBookingClick={openBooking} />
        <BookingWizard
          isOpen={isBookingOpen}
          onClose={closeBooking}
          preselectedDoctorId={PAVLYUK_DOCTOR_ID}
        />
      </div>
    </>
  );
}
