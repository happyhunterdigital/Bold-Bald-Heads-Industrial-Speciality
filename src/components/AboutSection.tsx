import React from 'react';
import { 
  Building2, 
  Award, 
  Target, 
  Eye, 
  CheckCircle2, 
  ShieldCheck, 
  History,
  GraduationCap
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#f0fdf4] text-[#064e3b]">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#6ee7b7]/30 text-[#064e3b] text-xs font-bold border border-[#6ee7b7]">
            <Building2 className="w-4 h-4 text-[#064e3b]" />
            Company Profile & Heritage
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#064e3b] font-sans">
            Bold Bald Heads Industrial & Speciality Chemicals
          </h2>
          <div className="w-24 h-2 bg-[#fda4af] rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-[#047857]">
            A 100% Black-Owned, Level 1 BBBEE-accredited South African B2B chemical supply and manufacturing enterprise.
          </p>
        </div>

        {/* Company History & Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border-2 border-[#6ee7b7]/40 space-y-5 shadow-xl">
            <div className="flex items-center gap-2 text-[#047857] font-bold text-xs uppercase tracking-widest">
              <History className="w-4 h-4 text-[#064e3b]" /> Company Origins & Establishment
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-[#064e3b] font-sans">
              From Local Sole Proprietorship to ISO 9001 National Supplier
            </h3>

            <p className="text-sm text-[#047857] leading-relaxed">
              The company supplies and distributes industrial and specialty cleaning detergents, disinfectants, aerosols, maintenance chemicals, consumables, laundry detergents, health and hygiene hardware, health and hygiene cleaning including COVID-19 Disinfection. The company does third party manufacturing, and Pest Control Management Services.
            </p>

            <p className="text-sm text-[#047857] leading-relaxed">
              The company was established in March 2011 as a Sole Proprietor and later registered as a private company in 2016. It is a <strong className="text-[#064e3b]">100% black owned</strong>, and is a <strong className="text-[#064e3b]">Level 1 accredited BBBEE Company</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-[#f0fdf4] p-4 rounded-2xl border border-[#6ee7b7]/40 text-xs text-[#047857] space-y-1">
                <div className="font-bold text-[#064e3b] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#064e3b]" /> ISO 9001 Quality Standards
                </div>
                <div>All products are manufactured and packaged according to ISO 9001 quality control standards.</div>
              </div>

              <div className="bg-[#f0fdf4] p-4 rounded-2xl border border-[#6ee7b7]/40 text-xs text-[#047857] space-y-1">
                <div className="font-bold text-[#064e3b] flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#064e3b]" /> On-Site Janitorial Training
                </div>
                <div>Empowers cleaning and housekeeping staff with product knowledge and efficient cleaning solutions.</div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-8 rounded-3xl border-2 border-[#6ee7b7]/40 space-y-6 shadow-xl">
              <div className="flex items-center gap-4 border-b border-[#6ee7b7]/30 pb-4">
                <div className="w-14 h-14 rounded-2xl bg-white p-1 flex items-center justify-center border-2 border-[#6ee7b7] shrink-0 overflow-hidden shadow-sm">
                  <img 
                    src="https://res.cloudinary.com/dkyg07qvv/image/upload/c_crop,g_center,w_0.8,h_0.8/v1786456993/BBH_logo_ed5qt5.png" 
                    alt="Bold Bald Heads Logo" 
                    className="w-full h-full object-contain scale-110 mix-blend-multiply"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#064e3b] uppercase tracking-wider">
                    Core Credentials
                  </div>
                  <div className="text-xs font-bold">
                    <span className="text-[#ea580c]">BOLD</span>{' '}
                    <span className="text-[#15803d]">BALD</span>{' '}
                    <span className="text-[#0284c7]">HEADS</span>{' '}
                    <span className="text-[#047857]">Industrial & Speciality Chemicals</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center bg-[#f0fdf4] p-3.5 rounded-2xl border border-[#6ee7b7]/30 font-semibold">
                  <span className="text-[#047857]">Establishment:</span>
                  <span className="text-[#064e3b] font-bold">March 2011 / 2016 (Pty Ltd)</span>
                </div>

                <div className="flex justify-between items-center bg-[#f0fdf4] p-3.5 rounded-2xl border border-[#6ee7b7]/30 font-semibold">
                  <span className="text-[#047857]">BBBEE Level:</span>
                  <span className="text-[#064e3b] font-bold">Level 1 Accredited (135%)</span>
                </div>

                <div className="flex justify-between items-center bg-[#f0fdf4] p-3.5 rounded-2xl border border-[#6ee7b7]/30 font-semibold">
                  <span className="text-[#047857]">Ownership:</span>
                  <span className="text-[#064e3b] font-bold">100% Black-Owned</span>
                </div>

                <div className="flex justify-between items-center bg-[#f0fdf4] p-3.5 rounded-2xl border border-[#6ee7b7]/30 font-semibold">
                  <span className="text-[#047857]">Headquarters:</span>
                  <span className="text-[#064e3b] font-bold">Thohoyandou, Limpopo</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Mission */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border-2 border-[#6ee7b7]/40 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-[#064e3b] font-bold text-xs uppercase tracking-widest">
              <Target className="w-5 h-5 text-[#064e3b]" /> OUR MISSION
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-[#047857] font-semibold">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#064e3b] shrink-0 mt-0.5" />
                <span>Ensure that our products and services add value to our customer’s business competitively and professionally.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#064e3b] shrink-0 mt-0.5" />
                <span>Exceed our customer’s expectations with real understanding of their business.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#064e3b] shrink-0 mt-0.5" />
                <span>Deliver superior services with a high level and uncompromised honesty and integrity.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#064e3b] shrink-0 mt-0.5" />
                <span>Continuously improve in every aspect of the business and expand the business footprint locally and nationally.</span>
              </li>
            </ul>
          </div>

          {/* Vision */}
          <div className="bg-[#064e3b] text-white p-8 sm:p-10 rounded-3xl border-4 border-[#6ee7b7]/30 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#fda4af] font-bold text-xs uppercase tracking-widest">
                <Eye className="w-5 h-5 text-[#6ee7b7]" /> OUR VISION
              </div>

              <blockquote className="text-2xl sm:text-3xl font-bold font-sans leading-tight text-white">
                "We Create Clean, Fresh and Healthy Environments for our customers"
              </blockquote>
            </div>

            <p className="text-xs text-[#6ee7b7] pt-4 border-t border-[#6ee7b7]/30 leading-relaxed font-semibold">
              Achieved through high performance chemicals that are highly effective and site specific for specific problem areas at affordable costs with guaranteed performance and workmanship.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
