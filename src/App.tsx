/**
 * Bold Bald Heads Industrial & Speciality Chemicals (Pty) Ltd
 * Primary Application Component
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CertificationsTicker } from './components/CertificationsTicker';
import { ProductCatalog } from './components/ProductCatalog';
import { QuoteEstimator } from './components/QuoteEstimator';
import { ServicesSection } from './components/ServicesSection';
import { SectorsSection } from './components/SectorsSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { AIAssistantModal } from './components/AIAssistantModal';
import { SDSModal } from './components/SDSModal';
import { CertificationModal } from './components/CertificationModal';
import { Footer } from './components/Footer';

import { Product, QuoteItem, Certification } from './types';
import { PRODUCTS } from './data/productsData';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  
  // Quote Cart Items State
  const [cartItems, setCartItems] = useState<QuoteItem[]>([
    // Default initial item to demonstrate quote calculation
    {
      product: PRODUCTS[0], // BoldClean Solvent Degreaser
      quantity: 50,
      packSize: '25 Litres',
      frequency: 'Monthly'
    },
    {
      product: PRODUCTS[3], // All-Surface Fresh Disinfectant
      quantity: 100,
      packSize: '5 Litres',
      frequency: 'Monthly'
    }
  ]);

  // Modals state
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isAIAdvisorOpen, setIsAIAdvisorOpen] = useState(false);
  const [selectedProductSDS, setSelectedProductSDS] = useState<Product | null>(null);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  // Cart Handler Functions
  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 25 }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          quantity: 25,
          packSize: product.packSizes[0] || '25 Litres',
          frequency: 'Monthly'
        }
      ];
    });
  };

  const handleUpdateQuantity = (productId: string, qty: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(5, qty) }
          : item
      )
    );
  };

  const handleUpdateFrequency = (productId: string, frequency: QuoteItem['frequency']) => {
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, frequency }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleNavigateSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cartProductIds = cartItems.map(item => item.product.id);

  return (
    <div className="min-h-screen bg-[#f0fdf4] text-[#064e3b] font-sans selection:bg-[#6ee7b7] selection:text-[#064e3b]">
      
      {/* Top Fixed Navigation Header */}
      <Header
        onOpenQuote={() => setIsQuoteOpen(true)}
        onOpenAIAdvisor={() => setIsAIAdvisorOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        quoteItemCount={cartItems.length}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          onOpenQuote={() => setIsQuoteOpen(true)}
          onOpenAIAdvisor={() => setIsAIAdvisorOpen(true)}
          onExploreProducts={() => handleNavigateSection('products')}
        />

        {/* Accreditation Ticker */}
        <CertificationsTicker
          onSelectCert={(cert) => setSelectedCert(cert)}
        />

        {/* Product & Service Catalog */}
        <ProductCatalog
          onSelectProductSDS={(product) => setSelectedProductSDS(product)}
          onAddToCart={handleAddToCart}
          cartProductIds={cartProductIds}
        />

        {/* Specialized Services Section */}
        <ServicesSection
          onOpenAuditForm={() => handleNavigateSection('contact')}
          onOpenAIAdvisor={() => setIsAIAdvisorOpen(true)}
        />

        {/* Industry Sectors Served */}
        <SectorsSection
          onSelectSectorQuote={(sectorId) => {
            setIsQuoteOpen(true);
          }}
        />

        {/* Case Studies & Testimonials */}
        <CaseStudiesSection />

        {/* Company History & Profile */}
        <AboutSection />

        {/* Contact Us & On-Site Consultation Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenQuote={() => setIsQuoteOpen(true)}
        onOpenAIAdvisor={() => setIsAIAdvisorOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Modals */}
      <QuoteEstimator
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onUpdateFrequency={handleUpdateFrequency}
        onRemoveItem={handleRemoveItem}
        onAddItem={handleAddToCart}
        onClearCart={handleClearCart}
      />

      <AIAssistantModal
        isOpen={isAIAdvisorOpen}
        onClose={() => setIsAIAdvisorOpen(false)}
      />

      <SDSModal
        product={selectedProductSDS}
        onClose={() => setSelectedProductSDS(null)}
        onAddToCart={handleAddToCart}
      />

      <CertificationModal
        certification={selectedCert}
        onClose={() => setSelectedCert(null)}
      />

    </div>
  );
}
