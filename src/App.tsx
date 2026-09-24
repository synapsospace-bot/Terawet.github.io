import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/lib/languageContext";
import Layout from "@/components/Layout";
import ElevenLabsWidget from "@/components/ElevenLabsWidget";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import About from "./pages/About";
import Application from "./pages/Application";
import Contacts from "./pages/Contacts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/about" element={<About />} />
              <Route path="/application" element={<Application />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
        <ElevenLabsWidget />
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
