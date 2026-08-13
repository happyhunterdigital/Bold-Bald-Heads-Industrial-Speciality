import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Calculator, 
  Bot, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles, 
  PhoneCall, 
  FileCheck2,
  Factory,
  Beaker,
  Truck
} from 'lucide-react';

interface HeroProps {
  onOpenQuote: () => void;
  onOpenAIAdvisor: () => void;
  onExploreProducts: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenQuote,
  onOpenAIAdvisor,
  onExploreProducts
}) => {
  return (
    <section id="hero" className="relative w-full min-h-[85vh] flex items-center bg-[#064e3b] text-white overflow-hidden pt-8 pb-32">
      {/* Background Soft Blobs & Ambient Light */}
      <div className="absolute -right-20 top-20 w-96 h-96 bg-[#6ee7b7] rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute -left-20 bottom-20 w-96 h-96 bg-[#fda4af] rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        
        {/* Left Column: Headline & Value Propositions */}
        <div className="lg:col-span-7 space-y-6 relative text-left">
          <div className="inline-flex items-center gap-2 bg-[#fda4af]/20 text-[#fda4af] px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm">
            <Award className="w-4 h-4 text-[#fda4af]" />
            <span>Level 1 BBBEE • ISO 9001 • 100% Black-Owned</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight font-sans">
            <span className="text-[#ea580c]">BOLD</span>{' '}
            <span className="text-[#6ee7b7]">BALD</span>{' '}
            <span className="text-[#38bdf8]">HEADS</span> <br />
            <span className="text-[#f0fdf4] text-3xl sm:text-4xl lg:text-5xl font-semibold">Industrial & Speciality Chemicals</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#6ee7b7] max-w-xl font-medium leading-relaxed">
            Protecting Spaces, Empowering People with gentle yet powerful industrial solutions. South Africa’s trusted manufacturer of detergents, disinfectants, sanitizers & contract blending.
          </p>

          {/* Key Accreditations Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-[#f0fdf4] font-semibold">
            <div className="flex items-center gap-2 bg-white/10 p-3 rounded-2xl backdrop-blur-sm border border-[#6ee7b7]/20">
              <CheckCircle2 className="w-5 h-5 text-[#6ee7b7] shrink-0" />
              <span>NRCS & Intertek Registered Sanitizers</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 p-3 rounded-2xl backdrop-blur-sm border border-[#6ee7b7]/20">
              <CheckCircle2 className="w-5 h-5 text-[#6ee7b7] shrink-0" />
              <span>Halaal, Kosher & ISO 9001 Certified</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 p-3 rounded-2xl backdrop-blur-sm border border-[#6ee7b7]/20">
              <CheckCircle2 className="w-5 h-5 text-[#6ee7b7] shrink-0" />
              <span>Thohoyandou Limpopo Manufacturing Plant</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 p-3 rounded-2xl backdrop-blur-sm border border-[#6ee7b7]/20">
              <CheckCircle2 className="w-5 h-5 text-[#6ee7b7] shrink-0" />
              <span>Complimentary On-Site Chemical Audits</span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={onOpenQuote}
              className="bg-[#6ee7b7] text-[#064e3b] px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-white transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 gap-2 text-sm"
            >
              <Calculator className="w-5 h-5 text-[#064e3b]" />
              <span>Request Quote</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreProducts}
              className="bg-white/10 hover:bg-white/20 text-[#f0fdf4] px-6 py-4 rounded-full font-bold uppercase tracking-wider border border-[#6ee7b7]/40 transition-all flex items-center justify-center gap-2 text-sm"
            >
              <Beaker className="w-4 h-4 text-[#6ee7b7]" />
              <span>Browse Catalog</span>
            </button>

            <button
              onClick={onOpenAIAdvisor}
              className="bg-[#fda4af]/20 hover:bg-[#fda4af] text-[#fda4af] hover:text-[#064e3b] px-6 py-4 rounded-full font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 text-sm"
            >
              <Bot className="w-4 h-4" />
              <span>AI Advisor</span>
            </button>
          </div>

          {/* Contact Bar */}
          <div className="pt-2 text-xs text-[#6ee7b7] flex flex-wrap items-center gap-x-4 gap-y-1 font-medium">
            <span>Direct Hotline: <strong className="text-white">015 969 1102</strong></span>
            <span>•</span>
            <span>Cell: <strong className="text-white">072 389 1816</strong></span>
            <span>•</span>
            <span className="text-[#fda4af]">info@bbhchemicals.co.za</span>
          </div>
        </div>

        {/* Right Column: Morphing Blob & Facility Showcase Video */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl bg-white/10 p-4 border-4 border-[#6ee7b7]/30 shadow-2xl backdrop-blur-md overflow-hidden">
            
            {/* Facility Video */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#6ee7b7]/40 bg-[#064e3b] aspect-video group mb-4 shadow-xl">
              <video
                src="https://res.cloudinary.com/dkyg07qvv/video/upload/v1786456309/BBH_Hero_section_video_zht0tr.mp4"
                autoPlay
                loop
                muted
                playsInline
                controls
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#064e3b]/90 backdrop-blur-md border border-[#6ee7b7] text-[11px] text-white font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#6ee7b7] animate-pulse"></span>
                  <span>BBH Plant Showcase</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#fda4af] text-[#064e3b] font-bold text-[10px] uppercase tracking-wider shadow-md">
                  ISO 9001
                </span>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 p-3 rounded-2xl text-center border border-white/10">
                <div className="text-2xl font-bold text-[#6ee7b7]">12+</div>
                <div className="text-[11px] text-[#f0fdf4] font-medium">Speciality Chemical Ranges</div>
              </div>
              <div className="bg-white/10 p-3 rounded-2xl text-center border border-white/10">
                <div className="text-2xl font-bold text-[#fda4af]">Level 1</div>
                <div className="text-[11px] text-[#f0fdf4] font-medium">BBBEE Accreditation</div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Organic Bottom Wave Shape */}
      <div className="wave-bottom">
        <svg data-name="Layer 1" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <path className="shape-fill" d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};
