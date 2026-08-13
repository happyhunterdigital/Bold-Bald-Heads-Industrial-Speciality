import React, { useState } from 'react';
import { SECTORS } from '../data/sectorsData';
import { IndustrySector } from '../types';
import { Building2, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

interface SectorsSectionProps {
  onSelectSectorQuote: (sectorId: string) => void;
}

export const SectorsSection: React.FC<SectorsSectionProps> = ({ onSelectSectorQuote }) => {
  const [activeSector, setActiveSector] = useState<IndustrySector>(SECTORS[0]);

  return (
    <section id="sectors" className="py-24 bg-[#f0fdf4] text-[#064e3b]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#6ee7b7]/30 text-[#064e3b] text-xs font-bold border border-[#6ee7b7]">
            <Building2 className="w-4 h-4 text-[#064e3b]" />
            Tailored Industry Efficacy
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#064e3b] font-sans">
            Industry Sectors Served
          </h2>
          <div className="w-24 h-2 bg-[#fda4af] rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-[#047857]">
            From hospital operating theaters and food processing plants to mortuaries and commercial laundries, BBH Chemicals supplies site-specific formulations.
          </p>
        </div>

        {/* Sector Nav Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin">
          {SECTORS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSector(sec)}
              className={`px-5 py-3 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
                activeSector.id === sec.id
                  ? 'bg-[#064e3b] text-white shadow-lg'
                  : 'bg-white text-[#047857] hover:bg-[#6ee7b7]/20 border border-[#6ee7b7]/40'
              }`}
            >
              <span>{sec.title}</span>
            </button>
          ))}
        </div>

        {/* Active Sector Showcase Detail Card */}
        <div className="bg-white rounded-3xl border-2 border-[#6ee7b7]/40 p-8 sm:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Text Details */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div>
              <span className="text-xs font-bold text-[#047857] uppercase tracking-widest">
                Sector Overview
              </span>
              <h3 className="text-3xl font-bold text-[#064e3b] font-sans mt-1">
                {activeSector.title}
              </h3>
              <p className="text-sm text-[#047857] mt-2 leading-relaxed">
                {activeSector.subtitle}
              </p>
            </div>

            {/* Key Challenges */}
            <div className="space-y-2 bg-[#f0fdf4] p-5 rounded-2xl border border-[#6ee7b7]/40">
              <div className="text-xs font-bold text-[#064e3b] uppercase">
                Key Sector Challenges We Solve:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#047857] font-semibold">
                {activeSector.keyChallenges.map((challenge, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#064e3b] shrink-0" />
                    <span>{challenge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance Requirements */}
            <div className="space-y-1.5">
              <div className="text-xs font-bold text-[#047857] uppercase">
                Mandatory Compliance Standards:
              </div>
              <div className="flex flex-wrap gap-2">
                {activeSector.complianceRequirements.map((req, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#f0fdf4] text-[#064e3b] border border-[#6ee7b7]"
                  >
                    {req}
                  </span>
                ))}
              </div>
            </div>

            {/* Client Types */}
            <div className="text-xs text-[#047857]">
              <strong className="text-[#064e3b] font-bold">Establishments Served:</strong>{' '}
              {activeSector.clientTypes.join(' • ')}
            </div>

            <button
              onClick={() => onSelectSectorQuote(activeSector.id)}
              className="px-8 py-4 rounded-full bg-[#6ee7b7] hover:bg-[#fda4af] text-[#064e3b] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all"
            >
              <span>Request {activeSector.title} Quote Package</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Image & Metric Highlight */}
          <div className="lg:col-span-5 relative space-y-4">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#6ee7b7] h-64 sm:h-80 shadow-xl">
              <img
                src={activeSector.image}
                alt={activeSector.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Stat Callout Card */}
            <div className="bg-[#f0fdf4] p-5 rounded-3xl border border-[#6ee7b7] flex items-center justify-between shadow-md">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#064e3b]">
                  {activeSector.statMetric}
                </div>
                <div className="text-xs text-[#047857] font-semibold">
                  {activeSector.statLabel}
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white text-[#064e3b] border border-[#6ee7b7]">
                <ShieldCheck className="w-6 h-6 text-[#064e3b]" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
