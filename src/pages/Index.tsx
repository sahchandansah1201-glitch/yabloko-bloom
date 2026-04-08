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

import { getClinicSchema, getOrganizationSchema } from "@/lib/schema";

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
        <title>Клиника дерматологии и косметологии "Яблоко" | Краснодар</title>
        <meta 
          name="description" 
          content="Клиника дерматологии и косметологии Яблоко в Краснодаре — центр медицины кожи, где красота достигается через здоровье. Косметология, дерматология, трихология. Запись онлайн." 
        />
        <link rel="canonical" href="https://yabloko-clinic.ru/" />
        <script type="application/ld+json">{JSON.stringify(getClinicSchema())}</script>
        <script type="application/ld+json">{JSON.stringify(getOrganizationSchema())}</script>
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
