import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBookingBar } from "@/components/layout/MobileBookingBar";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { DoctorCard } from "@/components/specialists/DoctorCard";
import { DoctorProfile } from "@/components/specialists/DoctorProfile";
import { useDoctors, Doctor } from "@/hooks/useDoctors";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Award, Stethoscope } from "lucide-react";

export default function Specialists() {
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [preselectedDoctorId, setPreselectedDoctorId] = useState<string | null>(null);

  const { data: doctors, isLoading, error } = useDoctors();

  const topSpecialists = doctors?.filter(d => d.is_top_specialist) || [];
  const otherDoctors = doctors?.filter(d => !d.is_top_specialist) || [];

  const handleOpenProfile = (doctor: Doctor) => {
    if (doctor.slug) {
      navigate(`/doctor/${doctor.slug}`);
    } else {
      setSelectedDoctor(doctor);
      setIsProfileOpen(true);
    }
  };

  const handleBookWithDoctor = (doctorId: string) => {
    setPreselectedDoctorId(doctorId);
    setIsProfileOpen(false);
    setIsBookingOpen(true);
  };

  const handleOpenBooking = () => {
    setPreselectedDoctorId(null);
    setIsBookingOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Специалисты клиники Яблоко | Врачи-дерматологи и косметологи в Краснодаре</title>
        <meta
          name="description"
          content="Команда опытных врачей клиники Яблоко в Краснодаре: дерматологи, косметологи, трихологи. Записывайтесь к ведущим специалистам онлайн."
        />
        <meta name="keywords" content="дерматолог Краснодар, косметолог Краснодар, врач трихолог, клиника Яблоко специалисты" />
      </Helmet>

      <Header onBookingClick={handleOpenBooking} />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-secondary to-background py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Наши специалисты
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Команда врачей клиники «Яблоко» — это профессионалы с многолетним опытом, 
                которые постоянно совершенствуют свои навыки и следят за последними достижениями медицины.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12 max-w-2xl mx-auto">
              <div className="text-center p-4 rounded-xl bg-card border">
                <p className="font-heading text-2xl md:text-3xl font-bold text-primary">5+</p>
                <p className="text-sm text-muted-foreground mt-1">Врачей</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-card border">
                <p className="font-heading text-2xl md:text-3xl font-bold text-primary">15+</p>
                <p className="text-sm text-muted-foreground mt-1">Лет опыта</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-card border">
                <p className="font-heading text-2xl md:text-3xl font-bold text-primary">5000+</p>
                <p className="text-sm text-muted-foreground mt-1">Пациентов</p>
              </div>
            </div>
          </div>
        </section>

        {/* Top Specialists */}
        {topSpecialists.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container">
              <div className="flex items-center gap-2 mb-8">
                <Award className="h-6 w-6 text-primary" />
                <h2 className="font-heading text-2xl font-bold">Ведущие специалисты</h2>
              </div>

              {isLoading ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {[1, 2].map(i => (
                    <Skeleton key={i} className="h-36 rounded-xl" />
                  ))}
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {topSpecialists.map(doctor => (
                    <DoctorCard
                      key={doctor.id}
                      id={doctor.id}
                      name={doctor.name}
                      specialty={doctor.specialty}
                      bio={doctor.bio}
                      imageUrl={doctor.image_url}
                      isTopSpecialist={doctor.is_top_specialist || false}
                      onClick={() => handleOpenProfile(doctor)}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* All Doctors */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container">
            <div className="flex items-center gap-2 mb-8">
              <Stethoscope className="h-6 w-6 text-primary" />
              <h2 className="font-heading text-2xl font-bold">Все специалисты</h2>
            </div>

            {isLoading ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4].map(i => (
                  <Skeleton key={i} className="h-36 rounded-xl" />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>Не удалось загрузить список специалистов.</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {otherDoctors.map(doctor => (
                  <DoctorCard
                    key={doctor.id}
                    id={doctor.id}
                    name={doctor.name}
                    specialty={doctor.specialty}
                    bio={doctor.bio}
                    imageUrl={doctor.image_url}
                    isTopSpecialist={doctor.is_top_specialist || false}
                    onClick={() => handleOpenProfile(doctor)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
              Не знаете, к какому специалисту записаться?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Позвоните нам или оставьте заявку — мы поможем подобрать врача под ваши потребности.
            </p>
            <button
              onClick={handleOpenBooking}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-background text-foreground px-8 py-4 font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Записаться на консультацию
            </button>
          </div>
        </section>
      </main>

      <Footer />
      <MobileBookingBar onBookingClick={handleOpenBooking} />

      {/* Doctor Profile Modal */}
      <DoctorProfile
        doctor={selectedDoctor}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onBook={handleBookWithDoctor}
      />

      {/* Booking Wizard */}
      <BookingWizard
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedDoctorId={preselectedDoctorId}
      />
    </>
  );
}
