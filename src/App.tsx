import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FloatingActionButton } from "@/components/messenger/FloatingActionButton";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import Index from "./pages/Index";
import Specialists from "./pages/Specialists";
import DoctorPavlyuk from "./pages/DoctorPavlyuk";
import DoctorPage from "./pages/DoctorPage";
import ServicesHub from "./pages/ServicesHub";
import ServicePage from "./pages/ServicePage";
import AdviceHub from "./pages/AdviceHub";
import ArticlePage from "./pages/ArticlePage";
import Contacts from "./pages/Contacts";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import PricePage from "./pages/PricePage";
import PatientsInfo from "./pages/PatientsInfo";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
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
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <FloatingActionButton />
        </TooltipProvider>
      </QueryClientProvider>
    </AccessibilityProvider>
  </HelmetProvider>
);

export default App;
