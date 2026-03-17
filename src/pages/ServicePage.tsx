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
import { ServicePatientStories } from "@/components/service-page/ServicePatientStories";
import { ServiceCrossSell } from "@/components/service-page/ServiceCrossSell";
import { ServiceFAQ } from "@/components/service-page/ServiceFAQ";
import { ServiceMobileCTA } from "@/components/service-page/ServiceMobileCTA";
import { RecentInsights } from "@/components/advice/RecentInsights";
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

  // Add value tags to first pricing item
  const pricingWithTags = pricing.map((p, i) => ({
    ...p,
    valueTag: i === 0 ? "Включает генетическое картирование кожи (опционально)" : undefined,
  }));

  const category = serviceCategories.find((c) =>
    c.services.some((s) => s.slug === slug)
  );

  const relatedDoctors = allDoctors?.filter((d) =>
    pageData?.doctorSlugs?.includes(d.slug ?? "")
  ) ?? [];

  const openBookingForDoctor = (doctorId: string) => {
    setPreselectedDoctorId(doctorId);
    setIsBookingOpen(true);
  };

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
        <div className="container">
          <ServiceBreadcrumbs categoryLabel={category?.label} serviceTitle={title} />
        </div>

        <ServiceHero
          title={title}
          subtitle={subtitle}
          duration={duration}
          recovery={recovery}
          onBook={() => setIsBookingOpen(true)}
        />

        <ServiceContent
          description={pageData?.description}
          indications={pageData?.indications}
          benefits={pageData?.benefits}
          contraindications={pageData?.contraindications}
        />

        <ServiceTimeline steps={pageData?.howItWorks ?? []} />

        <ServiceDoctors
          doctors={relatedDoctors}
          onBookDoctor={openBookingForDoctor}
        />

        <ServiceBeforeAfter />

        <ServicePatientStories />

        <ServicePricing pricing={pricingWithTags} />

        <ServiceCrossSell items={crossSell} />

        <ServiceFAQ faq={faq} />
      </main>

      <Footer />

      <ServiceMobileCTA price={displayPrice} onBook={() => setIsBookingOpen(true)} />

      <BookingWizard
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedDoctorId={preselectedDoctorId}
      />
    </>
  );
}
