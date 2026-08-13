import React from 'react';
import { CERTIFICATIONS } from '../data/certificationsData';
import { Certification } from '../types';
import { 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  UtensilsCrossed, 
  Sparkles, 
  Check, 
  Building2, 
  Bug, 
  Flag, 
  ExternalLink 
} from 'lucide-react';

interface CertificationsTickerProps {
  onSelectCert: (cert: Certification) => void;
}

export const CertificationsTicker: React.FC<CertificationsTickerProps> = ({ onSelectCert }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award': return <Award className="w-5 h-5 text-[#064e3b]" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5 text-[#064e3b]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-[#064e3b]" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-5 h-5 text-[#064e3b]" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#064e3b]" />;
      case 'Check': return <Check className="w-5 h-5 text-[#064e3b]" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-[#064e3b]" />;
      case 'Bug': return <Bug className="w-5 h-5 text-[#064e3b]" />;
      case 'Flag': return <Flag className="w-5 h-5 text-[#064e3b]" />;
      default: return <ShieldCheck className="w-5 h-5 text-[#064e3b]" />;
    }
  };

  return (
    <section id="credentials" className="bg-[#f0fdf4] border-y border-[#6ee7b7]/40 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold text-[#047857] tracking-wider uppercase mb-1">
              Verified Compliance & Quality Assurance
            </div>
            <h2 className="text-3xl font-bold text-[#064e3b] font-sans">
              Our Industry Certifications & Credentials
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#047857] font-medium max-w-md">
            Click any certification badge to verify compliance standards, registration details, and issuing authority specs.
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-3">
          {CERTIFICATIONS.map((cert) => (
            <button
              key={cert.id}
              onClick={() => onSelectCert(cert)}
              className="flex flex-col items-center text-center p-4 rounded-2xl bg-white hover:bg-[#f0fdf4] border border-[#6ee7b7] hover:border-[#fda4af] transition-all duration-200 group cursor-pointer shadow-sm hover:shadow-md"
            >
              <div className="p-2.5 rounded-xl bg-[#f0fdf4] group-hover:bg-white transition-colors mb-2">
                {getIcon(cert.icon)}
              </div>
              <span className="text-xs font-bold text-[#064e3b] group-hover:text-[#047857] tracking-tight line-clamp-1">
                {cert.badgeCode}
              </span>
              <span className="text-[10px] text-[#047857] line-clamp-1 mt-0.5 font-semibold">
                {cert.issuingBody.split(' ')[0]}
              </span>
              <span className="mt-2 text-[10px] font-bold text-[#064e3b] flex items-center gap-0.5">
                Verify <ExternalLink className="w-2.5 h-2.5" />
              </span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
