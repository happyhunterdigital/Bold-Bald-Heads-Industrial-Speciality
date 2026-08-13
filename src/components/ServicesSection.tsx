import React from 'react';
import { 
  Cog, 
  Bug, 
  Crosshair, 
  GraduationCap, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Beaker,
  Award,
  Sparkles
} from 'lucide-react';

interface ServicesSectionProps {
  onOpenAuditForm: () => void;
  onOpenAIAdvisor: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenAuditForm,
  onOpenAIAdvisor
}) => {
  const services = [
    {
      id: 'third-party',
      title: 'Third-Party Contract Manufacturing & Toll Blending',
      icon: <Cog className="w-6 h-6 text-teal-400" />,
      badge: 'Private Label & Toll',
      description: 'Produce your own branded chemical line at our ISO 9001 certified plant in Limpopo. We handle custom chemical formulation, viscosity/color/fragrance matching, bottling, and custom SDS generation.',
      highlights: [
        'Full R&D laboratory custom chemical formulation',
        'Batch Certificate of Analysis (COA) provided',
        'Scalable batch runs from 500L to 50,000L monthly',
        'Custom bottle blow-molding & label printing'
      ]
    },
    {
      id: 'pest-control',
      title: 'Pest Control Management Services (PCIPC Accredited)',
      icon: <Bug className="w-6 h-6 text-emerald-400" />,
      badge: 'PCIPC Licensed',
      description: 'Comprehensive structural pest management executed by PCIPC licensed technicians. Protects commercial premises, food plants, and hospitality lodges from pests, termites, flies, and rodents.',
      highlights: [
        'PCIPC qualified & licensed operators',
        'HACCP & Intertek audit-compliant documentation',
        'Non-toxic eco-safe baiting options',
        'Quarterly or monthly commercial service contracts'
      ]
    },
    {
      id: 'hygiene-covid',
      title: 'Hygiene Cleaning & COVID-19 Disinfection',
      icon: <Crosshair className="w-6 h-6 text-cyan-400" />,
      badge: 'NRCS Broad Spectrum',
      description: 'Specialized deep decontamination services for infection outbreaks, viral pathogens, mortuaries, and healthcare facilities. Uses NRCS registered broad-spectrum virucidal agents.',
      highlights: [
        'ULV cold fogging microscopic droplet technology',
        'NRCS registered virucidal agents (VC8054)',
        '30-minute rapid facility turnaround',
        'Ideal for hospital wards, schools & mortuaries'
      ]
    },
    {
      id: 'training-field',
      title: 'Janitorial Training & In-Field Consultation',
      icon: <GraduationCap className="w-6 h-6 text-amber-400" />,
      badge: 'Guaranteed Performance',
      description: 'Empowers cleaning personnel with optimal dilution ratios, chemical safety (PPE), and efficient cleaning techniques to reduce waste, prevent chemical damage, and guarantee workmanship results.',
      highlights: [
        'Reduces chemical waste by up to 35%',
        'Chemical safety wall charts & automated dilution dosing',
        'Site-specific problem area audits',
        'Guaranteed product performance & workmanship'
      ]
    }
  ];

  return (
    <section id="services" className="py-24 bg-[#f0fdf4] text-[#064e3b] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#6ee7b7]/30 text-[#064e3b] text-xs font-bold border border-[#6ee7b7] mb-4">
          <Sparkles className="w-4 h-4 text-[#064e3b]" />
          Specialized Industrial Capabilities
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-[#064e3b] font-sans mb-3">
          Services & Manufacturing Solutions
        </h2>
        <div className="w-24 h-2 bg-[#fda4af] rounded-full mb-6"></div>
        <p className="text-lg text-[#047857] max-w-2xl">
          Beyond chemical supply, Bold Bald Heads provides full-scope manufacturing, pest management, hygiene decontamination, and on-site technical consulting with guaranteed performance.
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 relative z-10">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl hover:shadow-2xl border-t-4 border-[#6ee7b7] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-4 rounded-2xl bg-[#f0fdf4] border border-[#6ee7b7] group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#fda4af]/20 text-[#064e3b] border border-[#fda4af]/40">
                  {service.badge}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-[#064e3b] font-sans">
                {service.title}
              </h3>

              <p className="text-sm text-[#047857] leading-relaxed">
                {service.description}
              </p>

              <div className="space-y-2 pt-3 border-t border-[#6ee7b7]/30">
                {service.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-[#047857]">
                    <CheckCircle2 className="w-4 h-4 text-[#064e3b] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#6ee7b7]/30 mt-6">
              <button
                onClick={onOpenAuditForm}
                className="w-full py-3 px-6 rounded-full bg-[#6ee7b7] hover:bg-[#fda4af] text-[#064e3b] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>Inquire About Service</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Guaranteed Workmanship Banner */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="bg-[#064e3b] text-white p-8 sm:p-12 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border-4 border-[#6ee7b7]/30">
          <div className="space-y-3 text-left">
            <span className="text-xs font-bold text-[#fda4af] uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#6ee7b7]" />
              BBH Value Proposition & Workmanship Guarantee
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-sans text-white">
              High Performance Chemicals at Affordable Costs — Guaranteed.
            </h3>
            <p className="text-sm sm:text-base text-[#6ee7b7] max-w-2xl leading-relaxed">
              We provide site-specific chemicals for specific problem areas across all industries. Product performance and cleaning workmanship are 100% guaranteed.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={onOpenAuditForm}
              className="px-8 py-4 rounded-full bg-[#6ee7b7] hover:bg-white text-[#064e3b] font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
            >
              Request On-Site Audit
            </button>
            <button
              onClick={onOpenAIAdvisor}
              className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-[#f0fdf4] font-bold text-xs uppercase tracking-wider border border-[#6ee7b7]/40 transition-all"
            >
              Ask AI Chemical Engineer
            </button>
          </div>
        </div>
      </div>

    </section>
  );
};
