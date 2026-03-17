import { useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { ServiceBreadcrumbs } from "@/components/service-page/ServiceBreadcrumbs";
import { ServiceHero } from "@/components/service-page/ServiceHero";
import { ServiceContent } from "@/components/service-page/ServiceContent";
import { ServiceTimeline } from "@/components/service-page/ServiceTimeline";
import { ServiceDoctors } from "@/components/service-page/ServiceDoctors";
import { ServiceBeforeAfter } from "@/components/service-page/ServiceBeforeAfter";
import { ServicePricing } from "@/components/service-page/ServicePricing";
import { ServiceCrossSell } from "@/components/service-page/ServiceCrossSell";
import { ServiceFAQ } from "@/components/service-page/ServiceFAQ";
import { ServiceMobileCTA } from "@/components/service-page/ServiceMobileCTA";
import { getServicePageData, getServiceBySlug, serviceCategories } from "@/data/servicesData";
import { useDoctors } from "@/hooks/useDoctors";
import NotFound from "./NotFound";

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedDoctorId, setPreselectedDoctorId] = useState<string | null>(null);

  const pageData = slug ? getServicePageData(slug) : undefined;
  const serviceItem = slug ? getServiceBySlug(slug) : undefined;
  const { data: allDoctors } = useDoctors();

  if (!pageData && !serviceItem) return <NotFound />;

  const title = pageData?.title ?? serviceItem?.title ?? "";
  const subtitle = pageData?.subtitle ?? "";
  const duration = pageData?.duration ?? "30 мин";
  const recovery = pageData?.recovery ?? "Без реабилитации";
  const pricing = pageData?.pricing ?? [];
  const faq = pageData?.faq ?? [];
  const crossSell = pageData?.crossSell ?? [];

  // Find category label
  const category = serviceCategories.find((c) =>
    c.services.some((s) => s.slug === slug)
  );

  // Match doctors by slug
  const relatedDoctors = allDoctors?.filter((d) =>
    pageData?.doctorSlugs?.includes(d.slug ?? "")
  ) ?? [];

  const openBookingForDoctor = (doctorId: string) => {
    setPreselectedDoctorId(doctorId);
    setIsBookingOpen(true);
  };

  // FAQ Schema
  const faqSchema = faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  } : null;

  const displayPrice = pricing[0]?.price ?? serviceItem?.priceFrom ?? "";

  return (
    <>
      <Helmet>
        <title>{title} | Клиника Яблоко Краснодар</title>
        <meta name="description" content={`${title} в клинике Яблоко. ${subtitle} Запишитесь онлайн.`} />
        {faqSchema && (
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        )}
      </Helmet>

      <Header onBookingClick={() => setIsBookingOpen(true)} />

      <main className="min-h-screen bg-background pt-28 scroll-mt-32 pb-20 md:pb-0">
        {/* Breadcrumbs */}
        <div className="container">
          <ServiceBreadcrumbs
            categoryLabel={category?.label}
            serviceTitle={title}
          />
        </div>

        {/* 1. Hero */}
        <ServiceHero
          title={title}
          subtitle={subtitle}
          duration={duration}
          recovery={recovery}
          onBook={() => setIsBookingOpen(true)}
        />

        {/* 2. Description, Indications, Benefits, Contraindications */}
        <ServiceContent
          description={pageData?.description}
          indications={pageData?.indications}
          benefits={pageData?.benefits}
          contraindications={pageData?.contraindications}
        />

        {/* 3. How it Works Timeline */}
        <ServiceTimeline steps={pageData?.howItWorks ?? []} />

        {/* 4. Doctors */}
        <ServiceDoctors
          doctors={relatedDoctors}
          onBookDoctor={openBookingForDoctor}
        />

        {/* 5. Before & After */}
        <ServiceBeforeAfter />

        {/* 6. Pricing */}
        <ServicePricing pricing={pricing} />

        {/* 7. Cross-sell */}
        <ServiceCrossSell items={crossSell} />

        {/* 8. FAQ */}
        <ServiceFAQ faq={faq} />
      </main>

      <Footer />

      {/* 9. Mobile Sticky CTA */}
      <ServiceMobileCTA price={displayPrice} onBook={() => setIsBookingOpen(true)} />

      <BookingWizard
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedDoctorId={preselectedDoctorId}
      />
    </>
  );
}
