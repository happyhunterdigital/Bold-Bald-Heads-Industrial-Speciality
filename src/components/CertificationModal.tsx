import React from 'react';
import { Certification } from '../types';
import { Award, ShieldCheck, CheckCircle2, X, ExternalLink, Building2 } from 'lucide-react';

interface CertificationModalProps {
  certification: Certification | null;
  onClose: () => void;
}

export const CertificationModal: React.FC<CertificationModalProps> = ({ certification, onClose }) => {
  if (!certification) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <div className="bg-white border-2 border-[#6ee7b7] rounded-3xl w-full max-w-lg text-[#064e3b] shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#064e3b] px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#6ee7b7] text-[#064e3b]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#6ee7b7] uppercase">
                Compliance Verification Certificate
              </span>
              <h3 className="text-base font-bold text-white font-sans">{certification.title}</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs sm:text-sm">
          
          <div className="bg-[#f0fdf4] p-4 rounded-2xl border border-[#6ee7b7] space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-[#047857]">Badge Identifier:</span>
              <span className="text-[#064e3b]">{certification.badgeCode}</span>
            </div>
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-[#047857]">Issuing Body:</span>
              <span className="text-[#064e3b]">{certification.issuingBody}</span>
            </div>
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-[#047857]">Category:</span>
              <span className="text-[#064e3b]">{certification.category}</span>
            </div>
          </div>

          <div>
            <div className="text-xs font-bold text-[#064e3b] uppercase mb-1">
              Regulatory Context & Scope
            </div>
            <p className="text-[#047857] leading-relaxed text-xs font-semibold">
              {certification.description}
            </p>
          </div>

          <div className="bg-[#f0fdf4] p-4 rounded-2xl border border-[#6ee7b7] text-xs font-bold space-y-1">
            <div className="text-[#064e3b] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#064e3b]" /> Audit Verification Standard:
            </div>
            <div className="text-[#047857]">{certification.registrationDetails}</div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-[#f0fdf4] px-6 py-4 border-t border-[#6ee7b7] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#6ee7b7] hover:bg-[#fda4af] text-[#064e3b] font-bold text-xs uppercase tracking-wider"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
