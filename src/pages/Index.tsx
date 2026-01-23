import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBookingBar } from "@/components/layout/MobileBookingBar";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustBadges } from "@/components/home/TrustBadges";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { ChiefDoctorSection } from "@/components/home/ChiefDoctorSection";
import { BookingWizard } from "@/components/booking/BookingWizard";

const Index = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  return (
    <>
      <Helmet>
        <title>Клиника дерматологии и косметологии "Яблоко" | Краснодар</title>
        <meta 
          name="description" 
          content="Клиника дерматологии и косметологии Яблоко в Краснодаре. Косметология, дерматология, трихология. Красота через здоровье. Запись онлайн." 
        />
      </Helmet>

      <div className="flex min-h-screen flex-col">
        <Header onBookingClick={openBooking} />
        
        <main className="flex-1 pb-20 md:pb-0">
          <HeroSection onBookingClick={openBooking} />
          <TrustBadges />
          <ServicesGrid onBookingClick={openBooking} />
          <ChiefDoctorSection onBookingClick={openBooking} />
        </main>

        <Footer />
        <MobileBookingBar onBookingClick={openBooking} />
        <BookingWizard isOpen={isBookingOpen} onClose={closeBooking} />
      </div>
    </>
  );
};

export default Index;
