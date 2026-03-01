import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import ProductCatalogSection from './components/ProductCatalogSection';
import PricingSection from './components/PricingSection';
import GallerySection from './components/GallerySection';
import ContractorZoneSection from './components/ContractorZoneSection';
import PremiumQuoteBuilder from './components/PremiumQuoteBuilder';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import AdminPanel from './components/AdminPanel';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = () => {
      const hash = window.location.hash;
      const search = window.location.search;
      if (hash === '#admin' || search.includes('admin')) {
        setShowAdmin(true);
      } else {
        setShowAdmin(false);
      }
    };
    checkAdmin();
    window.addEventListener('hashchange', checkAdmin);
    window.addEventListener('popstate', checkAdmin);
    return () => {
      window.removeEventListener('hashchange', checkAdmin);
      window.removeEventListener('popstate', checkAdmin);
    };
  }, []);

  const handleAdminClose = () => {
    window.location.hash = '';
    setShowAdmin(false);
  };

  if (showAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <AdminPanel onClose={handleAdminClose} />
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section id="hero">
          <HeroSection />
        </section>
        <section id="services">
          <ServicesSection />
        </section>
        <section id="products">
          <ProductCatalogSection />
        </section>
        <section id="pricing">
          <PricingSection />
        </section>
        <section id="gallery">
          <GallerySection />
        </section>
        <section id="contractor-zone">
          <ContractorZoneSection />
        </section>
        <section id="quote-builder">
          <PremiumQuoteBuilder />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
      </main>
      <Footer />
      <FloatingWhatsAppButton />
      <Toaster />
    </div>
  );
}
