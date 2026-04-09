import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FloatingActionButton } from "@/components/messenger/FloatingActionButton";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";

// Eager-load the landing page for instant first paint
import Index from "./pages/Index";

// Lazy-load all other pages
const Specialists = lazy(() => import("./pages/Specialists"));
const DoctorPavlyuk = lazy(() => import("./pages/DoctorPavlyuk"));
const DoctorPage = lazy(() => import("./pages/DoctorPage"));
const ServicesHub = lazy(() => import("./pages/ServicesHub"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const AdviceHub = lazy(() => import("./pages/AdviceHub"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const Contacts = lazy(() => import("./pages/Contacts"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Privacy = lazy(() => import("./pages/Privacy"));
const PricePage = lazy(() => import("./pages/PricePage"));
const PatientsInfo = lazy(() => import("./pages/PatientsInfo"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <HelmetProvider>
    <AccessibilityProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<div className="min-h-screen" />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/specialists" element={<Specialists />} />
                <Route path="/services" element={<ServicesHub />} />
                <Route path="/services/:slug" element={<ServicePage />} />
                <Route path="/advice" element={<AdviceHub />} />
                <Route path="/advice/:slug" element={<ArticlePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/doctor/pavlyuk" element={<DoctorPavlyuk />} />
                <Route path="/doctor/:slug" element={<DoctorPage />} />
                <Route path="/price" element={<PricePage />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/patients" element={<PatientsInfo />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
          <FloatingActionButton />
        </TooltipProvider>
      </QueryClientProvider>
    </AccessibilityProvider>
  </HelmetProvider>
);

export default App;
