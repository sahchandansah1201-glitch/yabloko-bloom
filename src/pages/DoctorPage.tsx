import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { useDoctor } from "@/hooks/useDoctor";
import { getDoctorProfileData, getDoctorPhoto } from "@/data/doctorProfiles";
import { DoctorBeforeAfter } from "@/components/doctor-profile/DoctorBeforeAfter";
import { DoctorProfileHero } from "@/components/doctor-profile/DoctorProfileHero";
import { DoctorProfileEmpathy } from "@/components/doctor-profile/DoctorProfileEmpathy";
import { DoctorProfileServices } from "@/components/doctor-profile/DoctorProfileServices";
import { DoctorProfileEducation } from "@/components/doctor-profile/DoctorProfileEducation";
import { DoctorProfileFAQ } from "@/components/doctor-profile/DoctorProfileFAQ";
import { DoctorProfileReviews } from "@/components/doctor-profile/DoctorProfileReviews";
import { DoctorProfileBookingForm } from "@/components/doctor-profile/DoctorProfileBookingForm";
import { DoctorStickyBar } from "@/components/doctor-profile/DoctorStickyBar";
import { Skeleton } from "@/components/ui/skeleton";
import { getPhysicianSchema, getPhysicianFAQSchema, getBreadcrumbSchema } from "@/lib/schema";

export default function DoctorPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: doctor, isLoading, error } = useDoctor(slug);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  if (error) {
    navigate("/specialists", { replace: true });
    return null;
  }

  if (isLoading || !doctor) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header onBookingClick={() => setIsBookingOpen(true)} />
        <main className="flex-1 py-20">
          <div className="container space-y-8">
            <Skeleton className="h-80 rounded-3xl" />
            <Skeleton className="h-40 max-w-3xl mx-auto rounded-2xl" />
            <Skeleton className="h-60 rounded-2xl" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const profileData = getDoctorProfileData(slug || "");
  const photo = getDoctorPhoto(doctor.name) || doctor.image_url;
  const openBooking = () => setIsBookingOpen(true);

  const physicianJsonLd = getPhysicianSchema({
    slug: slug || "",
    name: doctor.name,
    specialty: doctor.specialty,
    bio: doctor.bio,
    experience: profileData.experience,
    imageUrl: photo,
    education: profileData.timeline,
    knowsAbout: profileData.services?.flatMap((s) => s.items),
    faq: profileData.faq,
  });

  const faqJsonLd = getPhysicianFAQSchema(profileData.faq || [], slug);

  const shortName = doctor.name.split(" ").slice(0, 2).join(" ");

  return (
    <>
      <Helmet>
        <title>{`${doctor.specialty} ${shortName} — клиника «Яблоко» Краснодар`}</title>
        <meta
          name="description"
          content={`${doctor.name} — ${doctor.specialty} клиники «Яблоко» в Краснодаре. ${doctor.bio ? doctor.bio.slice(0, 100) : "Запись онлайн без предоплаты."}`}
        />
        <link rel="canonical" href={`https://yabloko-clinic.ru/doctor/${slug}`} />
        <script type="application/ld+json">{JSON.stringify(physicianJsonLd)}</script>
        {faqJsonLd && (
          <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        )}
        <script type="application/ld+json">{JSON.stringify(getBreadcrumbSchema([
          { name: "Главная", url: "/" },
          { name: "Специалисты", url: "/specialists" },
          { name: doctor.name },
        ]))}</script>
      </Helmet>

      <div className="flex min-h-screen flex-col">
        <Header onBookingClick={openBooking} />
        <main className="flex-1 pb-20 md:pb-0">
          <DoctorProfileHero
            name={doctor.name}
            specialty={doctor.specialty}
            photo={photo}
            isTopSpecialist={doctor.is_top_specialist}
            experience={profileData.experience}
            onBookingClick={openBooking}
          />
          {profileData.quote && (
            <DoctorProfileEmpathy
              quote={profileData.quote}
              author={profileData.quoteAuthor || shortName}
            />
          )}
          {profileData.services && profileData.services.length > 0 && (
            <DoctorProfileServices services={profileData.services} />
          )}
          {(profileData.timeline || profileData.certificates || profileData.education || profileData.accreditation) && (
            <DoctorProfileEducation
              timeline={profileData.timeline}
              internships={profileData.internships}
              certificates={profileData.certificates}
              education={profileData.education}
              accreditation={profileData.accreditation}
            />
          )}
          {profileData.faq && profileData.faq.length > 0 && (
            <DoctorProfileFAQ faq={profileData.faq} />
          )}
          {profileData.beforeAfter && profileData.beforeAfter.length > 0 && (
            <DoctorBeforeAfter cases={profileData.beforeAfter} doctorName={doctor.name} />
          )}
          {profileData.reviews && profileData.reviews.length > 0 && (
            <DoctorProfileReviews reviews={profileData.reviews} />
          )}
          <DoctorProfileBookingForm doctorId={doctor.id} doctorName={doctor.name} />
        </main>
        <Footer />
        <DoctorStickyBar onBookingClick={openBooking} doctorName={shortName} specialty={doctor.specialty} />
        <BookingWizard
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          preselectedDoctorId={doctor.id}
        />
      </div>
    </>
  );
}
