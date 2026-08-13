import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Globe, 
  ChevronRight,
  Calculator
} from 'lucide-react';

interface FooterProps {
  onOpenQuote: () => void;
  onOpenAIAdvisor: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenQuote,
  onOpenAIAdvisor,
  onNavigateSection
}) => {
  return (
    <footer className="bg-[#064e3b] text-[#f0fdf4] pt-16 pb-12 rounded-t-3xl border-t-4 border-[#6ee7b7] font-sans">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* Top CTA Row */}
        <div className="bg-white/10 p-8 sm:p-10 rounded-3xl border-2 border-[#6ee7b7]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans">
              Ready to Upgrade Your Facility’s Chemical Performance?
            </h3>
            <p className="text-sm text-[#6ee7b7]">
              Request a free on-site consultation, calculate an instant B2B quotation, or consult our AI Chemical Engineer.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenQuote}
              className="px-6 py-3.5 rounded-full bg-[#6ee7b7] hover:bg-[#fda4af] text-[#064e3b] font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition-all"
            >
              <Calculator className="w-4 h-4" />
              <span>Launch Quote Estimator</span>
            </button>
            <button
              onClick={onOpenAIAdvisor}
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-[#6ee7b7]/40 transition-all"
            >
              Ask AI Advisor
            </button>
          </div>
        </div>

        {/* Main Footer Links & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 text-xs">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white p-1 flex items-center justify-center shadow-md border-2 border-[#6ee7b7] overflow-hidden">
                <img 
                  src="https://res.cloudinary.com/dkyg07qvv/image/upload/c_crop,g_center,w_0.8,h_0.8/v1786456993/BBH_logo_ed5qt5.png" 
                  alt="Bold Bald Heads Logo" 
                  className="w-full h-full object-contain scale-110 mix-blend-multiply"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="font-extrabold tracking-tight text-base sm:text-lg uppercase flex items-center gap-1 font-sans">
                  <span className="text-[#ea580c]">BOLD</span>
                  <span className="text-[#6ee7b7]">BALD</span>
                  <span className="text-[#38bdf8]">HEADS</span>
                </div>
                <div className="text-[10px] sm:text-[11px] text-[#fda4af] uppercase tracking-widest font-bold">
                  Industrial & Speciality Chemicals (Pty) Ltd
                </div>
              </div>
            </div>

            <p className="text-[#6ee7b7] leading-relaxed text-xs">
              100% Black-Owned, Level 1 BBBEE-accredited South African chemical manufacturer and distributor. Supplying SABS ISO 9001 certified industrial cleaning detergents, NRCS disinfectants, Intertek food processing sanitizers, pest control, and third-party contract manufacturing.
            </p>

            <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold text-[#064e3b]">
              <span className="bg-[#6ee7b7] px-3 py-1 rounded-full">Level 1 BBBEE</span>
              <span className="bg-[#6ee7b7] px-3 py-1 rounded-full">ISO 9001 Quality</span>
              <span className="bg-[#6ee7b7] px-3 py-1 rounded-full">NRCS & Intertek</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <div className="font-bold text-[#fda4af] uppercase tracking-wider text-xs border-b border-[#6ee7b7]/30 pb-2">
              Navigation
            </div>
            <ul className="space-y-2 text-[#6ee7b7] font-medium">
              <li>
                <button onClick={() => onNavigateSection('about')} className="hover:text-white flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-[#fda4af]" /> About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('products')} className="hover:text-white flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-[#fda4af]" /> Product Ranges
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('services')} className="hover:text-white flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-[#fda4af]" /> Services & Solutions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('sectors')} className="hover:text-white flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-[#fda4af]" /> Industry Sectors
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('case-studies')} className="hover:text-white flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-[#fda4af]" /> Case Studies
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('credentials')} className="hover:text-white flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-[#fda4af]" /> Certifications
                </button>
              </li>
            </ul>
          </div>

          {/* Product Ranges Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <div className="font-bold text-[#fda4af] uppercase tracking-wider text-xs border-b border-[#6ee7b7]/30 pb-2">
              Product Categories
            </div>
            <ul className="grid grid-cols-1 gap-1.5 text-[#6ee7b7] text-[11px] font-medium">
              <li>• Industrial Degreasers & Descalers</li>
              <li>• Housekeeping & Multi-Surface Disinfectants</li>
              <li>• Food Processing & CIP Sanitizers (Intertek)</li>
              <li>• Commercial Kitchen & Dishwashing Gels</li>
              <li>• Commercial Laundry Bio-Detergents</li>
              <li>• Floor Care Strippers & Polymer Finishes</li>
              <li>• Eco / Green Bio-Degradable Range</li>
              <li>• Automotive & Motor Car Wash Range</li>
              <li>• Pest Control Management (PCIPC)</li>
              <li>• Third Party Contract Manufacturing</li>
            </ul>
          </div>

          {/* Official Contact Info */}
          <div className="lg:col-span-3 space-y-3">
            <div className="font-bold text-[#fda4af] uppercase tracking-wider text-xs border-b border-[#6ee7b7]/30 pb-2">
              Thohoyandou Headquarters
            </div>
            
            <div className="space-y-2 text-[#6ee7b7] font-medium text-[11px]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#fda4af] shrink-0" />
                <span className="text-white font-bold">Thohoyandou, Limpopo Province</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#fda4af] shrink-0" />
                <span>015 969 1102 / 072 389 1816</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#fda4af] shrink-0" />
                <span>067 147 9043 (Customer Desk)</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#fda4af] shrink-0" />
                <span className="text-white font-bold">info@bbhchemicals.co.za</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#fda4af] shrink-0" />
                <span className="text-white font-bold">bbhchemicals@gmail.com</span>
              </div>

              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[#fda4af] shrink-0" />
                <span>www.bbhchemicals.co.za</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-[#6ee7b7]/30 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-[#6ee7b7]">
          <div>
            © {new Date().getFullYear()} Bold Bald Heads Industrial & Speciality Chemicals (Pty) Ltd. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 font-bold">
            <span>ISO 9001 Quality</span>
            <span>•</span>
            <span>NRCS Compliant</span>
            <span>•</span>
            <span>Level 1 BBBEE</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
