import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Specialists from "./pages/Specialists";
import DoctorPavlyuk from "./pages/DoctorPavlyuk";
import DoctorPage from "./pages/DoctorPage";
import ServicesHub from "./pages/ServicesHub";
import ServicePage from "./pages/ServicePage";
import NotFound from "./pages/NotFound";
import PasswordGate from "./components/PasswordGate";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <PasswordGate>
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
            <Route path="/doctor/pavlyuk" element={<DoctorPavlyuk />} />
            <Route path="/doctor/:slug" element={<DoctorPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
