import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBookingBar } from "@/components/layout/MobileBookingBar";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustBadges } from "@/components/home/TrustBadges";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { DoctorsCarousel } from "@/components/home/DoctorsCarousel";
import { EquipmentArsenal } from "@/components/home/EquipmentArsenal";
import { BeforeAfterSlider } from "@/components/home/BeforeAfterSlider";
import { PromoSection } from "@/components/home/PromoSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { ChiefDoctorSection } from "@/components/home/ChiefDoctorSection";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { BookingChoiceModal } from "@/components/conversion/BookingChoiceModal";
import { QuickBookingModal } from "@/components/conversion/QuickBookingModal";

import { getClinicSchema, getOrganizationSchema, getWebSiteSchema, getReviewsSchema } from "@/lib/schema";

const HOME_REVIEWS = [
  { name: "Анна К.", text: "Лучшая клиника в Краснодаре! Наконец-то избавилась от акне после многих лет борьбы. Спасибо доктору Павлюк!", rating: 5, source: "Яндекс", date: "2024-01" },
  { name: "Елена М.", text: "Dr. Pavlyuk is a genius! Результат превзошел все ожидания. Рекомендую всем!", rating: 5, source: "2ГИС", date: "2023-12" },
  { name: "Ольга П.", text: "Очень довольна процедурой биоревитализации. Кожа просто сияет. Персонал вежливый и профессиональный.", rating: 5, source: "Яндекс", date: "2024-01" },
  { name: "Мария С.", text: "Прохожу лечение у трихолога. Волосы стали заметно гуще. Индивидуальный подход к каждому пациенту.", rating: 5, source: "2ГИС", date: "2023-11" },
  { name: "Татьяна В.", text: "Современное оборудование, уютная атмосфера. Лазерная эпиляция прошла безболезненно!", rating: 5, source: "Яндекс", date: "2023-12" },
  { name: "Ирина Д.", text: "Комплексный подход к красоте и здоровью. Нутрициолог помог нормализовать питание, что отразилось на коже.", rating: 5, source: "2ГИС", date: "2023-10" },
];

const Index = () => {
  const [isChoiceOpen, setIsChoiceOpen] = useState(false);
  const [isQuickOpen, setIsQuickOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedDoctorId, setPreselectedDoctorId] = useState<string | null>(null);

  const openChoice = () => setIsChoiceOpen(true);

  const openBookingDirect = (doctorId?: string) => {
    if (doctorId) setPreselectedDoctorId(doctorId);
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    setPreselectedDoctorId(null);
  };

  return (
    <>
      <Helmet>
        <title>Косметология и дерматология в Краснодаре — Клиника Яблоко</title>
        <meta 
          name="description" 
          content="Клиника «Яблоко» в Краснодаре: косметология, дерматология, трихология. Цифровая дерматоскопия, лазерные технологии, рейтинг 5.0. Запись онлайн." 
        />
        <link rel="canonical" href="https://yabloko-clinic.ru/" />
        <script type="application/ld+json">{JSON.stringify(getClinicSchema())}</script>
        <script type="application/ld+json">{JSON.stringify(getOrganizationSchema())}</script>
        <script type="application/ld+json">{JSON.stringify(getWebSiteSchema())}</script>
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "ItemList", itemListElement: getReviewsSchema(HOME_REVIEWS) })}</script>
      </Helmet>

      <div className="flex min-h-screen flex-col">
        <Header onBookingClick={openChoice} />
        
        <main className="flex-1 pb-20 md:pb-0">
          <HeroSection onBookingClick={openChoice} />
          <TrustBadges />
          <ServicesGrid onBookingClick={openChoice} />
          <DoctorsCarousel onBookingClick={(doctorId?: string) => {
            if (doctorId) {
              openBookingDirect(doctorId);
            } else {
              openChoice();
            }
          }} />
          <EquipmentArsenal />
          <BeforeAfterSlider />
          <PromoSection onBookingClick={openChoice} />
          <ReviewsSection />
          <ChiefDoctorSection onBookingClick={openChoice} />
        </main>

        <Footer />
        
        <MobileBookingBar onBookingClick={openChoice} />

        <BookingChoiceModal
          isOpen={isChoiceOpen}
          onClose={() => setIsChoiceOpen(false)}
          onQuickContact={() => setIsQuickOpen(true)}
          onFullBooking={() => setIsBookingOpen(true)}
        />
        <QuickBookingModal
          isOpen={isQuickOpen}
          onClose={() => setIsQuickOpen(false)}
          onBack={() => setIsChoiceOpen(true)}
        />
        <BookingWizard 
          isOpen={isBookingOpen} 
          onClose={closeBooking}
          onBack={() => setIsChoiceOpen(true)}
          preselectedDoctorId={preselectedDoctorId}
        />
      </div>
    </>
  );
};

export default Index;
