import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import ProductCatalogSection from './components/ProductCatalogSection';
import GallerySection from './components/GallerySection';
import PremiumQuoteBuilder from './components/PremiumQuoteBuilder';
import ContactSection from './components/ContactSection';
import AdminPanel from './components/AdminPanel';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import Footer from './components/Footer';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <ServicesSection />
        <ProductCatalogSection />
        <GallerySection />
        <PremiumQuoteBuilder />
        <ContactSection />
        <AdminPanel />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
      <Toaster />
    </div>
  );
}

export default App;
