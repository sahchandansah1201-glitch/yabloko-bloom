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
import { DesktopConversionBar } from "@/components/conversion/DesktopConversionBar";
import { getClinicSchema, getOrganizationSchema } from "@/lib/schema";

const Index = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedDoctorId, setPreselectedDoctorId] = useState<string | null>(null);

  const openBooking = (doctorId?: string) => {
    if (doctorId) {
      setPreselectedDoctorId(doctorId);
    }
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
        <Header onBookingClick={() => openBooking()} />
        
        <main className="flex-1 pb-20 md:pb-0">
          <HeroSection onBookingClick={() => openBooking()} />
          <TrustBadges />
          <ServicesGrid onBookingClick={() => openBooking()} />
          <DoctorsCarousel onBookingClick={openBooking} />
          <TechnologySection />
          <BeforeAfterSlider />
          <PromoSection onBookingClick={() => openBooking()} />
          <ReviewsSection />
          <ChiefDoctorSection onBookingClick={() => openBooking()} />
        </main>

        <Footer />
        <DesktopConversionBar onBookingClick={() => openBooking()} />
        <MobileBookingBar onBookingClick={() => openBooking()} />
        <BookingWizard 
          isOpen={isBookingOpen} 
          onClose={closeBooking}
          preselectedDoctorId={preselectedDoctorId}
        />
      </div>
    </>
  );
};

export default Index;
