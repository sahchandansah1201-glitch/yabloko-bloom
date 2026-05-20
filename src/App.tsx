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

// Retry dynamic imports once, then hard-reload to recover from stale chunk hashes after a deploy
const lazyWithReload = <T extends { default: React.ComponentType<any> }>(
  factory: () => Promise<T>
) =>
  lazy(() =>
    factory().catch((err) => {
      const key = "__chunk_reloaded__";
      if (typeof window !== "undefined" && !sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, "1");
        window.location.reload();
        return new Promise<T>(() => {});
      }
      throw err;
    })
  );

// Lazy-load all other pages
const Specialists = lazyWithReload(() => import("./pages/Specialists"));
const DoctorPavlyuk = lazyWithReload(() => import("./pages/DoctorPavlyuk"));
const DoctorPage = lazyWithReload(() => import("./pages/DoctorPage"));
const ServicesHub = lazyWithReload(() => import("./pages/ServicesHub"));
const ServicePage = lazyWithReload(() => import("./pages/ServicePage"));
const AdviceHub = lazyWithReload(() => import("./pages/AdviceHub"));
const ArticlePage = lazyWithReload(() => import("./pages/ArticlePage"));
const Contacts = lazyWithReload(() => import("./pages/Contacts"));
const About = lazyWithReload(() => import("./pages/About"));
const NotFound = lazyWithReload(() => import("./pages/NotFound"));
const Privacy = lazyWithReload(() => import("./pages/Privacy"));
const PricePage = lazyWithReload(() => import("./pages/PricePage"));
const PatientsInfo = lazyWithReload(() => import("./pages/PatientsInfo"));

// Clear the reload guard after a successful load
if (typeof window !== "undefined") {
  window.addEventListener("load", () => sessionStorage.removeItem("__chunk_reloaded__"));
}

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
