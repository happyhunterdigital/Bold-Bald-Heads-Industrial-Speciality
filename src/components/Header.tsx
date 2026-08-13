import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Bot, 
  Calculator, 
  Menu, 
  X, 
  Award, 
  ChevronRight,
  FileText
} from 'lucide-react';

interface HeaderProps {
  onOpenQuote: () => void;
  onOpenAIAdvisor: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  quoteItemCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenQuote,
  onOpenAIAdvisor,
  activeSection,
  setActiveSection,
  quoteItemCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Product Ranges' },
    { id: 'services', label: 'Services & Solutions' },
    { id: 'sectors', label: 'Sectors Served' },
    { id: 'case-studies', label: 'Case Studies' },
    { id: 'credentials', label: 'Certifications' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md rounded-b-3xl shadow-md border-b border-[#6ee7b7]/40 text-[#064e3b]">
      {/* Top Utility Contact Strip */}
      <div className="bg-[#064e3b] text-[#f0fdf4] text-xs py-2 px-4 rounded-b-xl">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#6ee7b7] font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Level 1 BBBEE Accredited • 100% Black-Owned • ISO 9001
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-[#f0fdf4]/80">
              <MapPin className="w-3.5 h-3.5 text-[#6ee7b7]" />
              Thohoyandou, Limpopo Province, South Africa
            </span>
          </div>

          <div className="flex items-center gap-4 font-bold text-[#f0fdf4]">
            <a href="tel:0159691102" className="flex items-center gap-1 hover:text-[#6ee7b7] transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#6ee7b7]" />
              <span>015 969 1102</span>
            </a>
            <a href="tel:0723891816" className="flex items-center gap-1 hover:text-[#6ee7b7] transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#6ee7b7]" />
              <span>072 389 1816</span>
            </a>
            <a href="mailto:info@bbhchemicals.co.za" className="hidden sm:flex items-center gap-1 hover:text-[#6ee7b7] transition-colors">
              <Mail className="w-3.5 h-3.5 text-[#6ee7b7]" />
              <span>info@bbhchemicals.co.za</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNavClick('hero')}
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white p-1 flex items-center justify-center shadow-md border-2 border-[#6ee7b7] group-hover:scale-105 transition-transform overflow-hidden">
            <img 
              src="https://res.cloudinary.com/dkyg07qvv/image/upload/c_crop,g_center,w_0.8,h_0.8/v1786456993/BBH_logo_ed5qt5.png" 
              alt="Bold Bald Heads Chemicals Logo"
              className="w-full h-full object-contain scale-110 mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <div className="font-extrabold tracking-tight text-base sm:text-lg leading-tight uppercase font-sans flex items-center gap-1">
              <span className="text-[#ea580c]">BOLD</span>
              <span className="text-[#15803d]">BALD</span>
              <span className="text-[#0284c7]">HEADS</span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-[#047857] uppercase tracking-widest font-mono font-bold">
              Industrial & Speciality Chemicals
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-2 xl:gap-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`px-3 py-2 text-xs xl:text-sm font-bold rounded-full transition-colors ${
                activeSection === link.id
                  ? 'text-[#064e3b] bg-[#6ee7b7]/30 border border-[#6ee7b7]'
                  : 'text-[#047857] hover:text-[#fda4af] hover:bg-[#f0fdf4]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Actions CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Chemical Advisor Button */}
          <button
            onClick={onOpenAIAdvisor}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#f0fdf4] hover:bg-[#6ee7b7] text-[#064e3b] text-xs font-bold uppercase border border-[#6ee7b7] transition-all shadow-sm group"
            title="Ask AI Chemical Consultant"
          >
            <Bot className="w-4 h-4 text-[#064e3b] group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">AI Advisor</span>
          </button>

          {/* Automated Quote Estimator CTA */}
          <button
            onClick={onOpenQuote}
            className="relative flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#6ee7b7] text-[#064e3b] font-bold text-xs uppercase tracking-wider hover:bg-[#fda4af] hover:text-[#064e3b] transition-all shadow-md transform hover:-translate-y-0.5"
          >
            <Calculator className="w-4 h-4" />
            <span>Request Quote</span>
            {quoteItemCount > 0 && (
              <span className="ml-1 w-5 h-5 rounded-full bg-[#064e3b] text-[#6ee7b7] text-[11px] font-bold flex items-center justify-center">
                {quoteItemCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-full bg-[#f0fdf4] text-[#064e3b] hover:bg-[#6ee7b7] border border-[#6ee7b7]/50 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#6ee7b7]/30 px-4 pt-2 pb-6 space-y-3 rounded-b-3xl shadow-xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-center justify-between px-4 py-3 text-sm font-bold rounded-2xl text-left ${
                  activeSection === link.id
                    ? 'bg-[#6ee7b7]/30 text-[#064e3b] border-l-4 border-[#064e3b]'
                    : 'text-[#047857] hover:bg-[#f0fdf4]'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-[#047857]" />
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#6ee7b7]/30 space-y-2">
            <div className="text-xs text-[#047857] font-mono px-2 font-bold">CONTACT DIRECTLY:</div>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <a href="tel:0159691102" className="flex items-center gap-1.5 p-2.5 rounded-xl bg-[#f0fdf4] text-[#064e3b] border border-[#6ee7b7]/40">
                <Phone className="w-3.5 h-3.5 text-[#047857]" /> 015 969 1102
              </a>
              <a href="tel:0723891816" className="flex items-center gap-1.5 p-2.5 rounded-xl bg-[#f0fdf4] text-[#064e3b] border border-[#6ee7b7]/40">
                <Phone className="w-3.5 h-3.5 text-[#047857]" /> 072 389 1816
              </a>
            </div>
            <a href="mailto:info@bbhchemicals.co.za" className="flex items-center justify-center gap-2 w-full p-2.5 rounded-xl bg-[#f0fdf4] text-[#064e3b] text-xs font-bold border border-[#6ee7b7]/40">
              <Mail className="w-4 h-4" /> info@bbhchemicals.co.za
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
