import React from 'react';
import { Product } from '../types';
import { FileText, ShieldAlert, Download, X, CheckCircle2, AlertTriangle, Beaker } from 'lucide-react';

interface SDSModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const SDSModal: React.FC<SDSModalProps> = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <div className="bg-white border-2 border-[#6ee7b7] rounded-3xl w-full max-w-2xl text-[#064e3b] shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#064e3b] px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#6ee7b7] text-[#064e3b]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#6ee7b7] uppercase">
                Safety & Technical Data Sheet (SDS / TDS)
              </span>
              <h3 className="text-xl font-bold text-white font-sans">{product.name}</h3>
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
        <div className="p-6 space-y-5 text-xs sm:text-sm max-h-[70vh] overflow-y-auto">
          
          {/* Metadata Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#f0fdf4] p-4 rounded-2xl border border-[#6ee7b7] font-semibold text-xs">
            <div>
              <span className="text-[#047857] block text-[10px]">SKU Code:</span>
              <span className="text-[#064e3b] font-bold">{product.sku}</span>
            </div>
            <div>
              <span className="text-[#047857] block text-[10px]">Chemical Base:</span>
              <span className="text-[#064e3b] font-bold">{product.base} Base</span>
            </div>
            <div>
              <span className="text-[#047857] block text-[10px]">pH Level:</span>
              <span className="text-[#064e3b] font-bold">
                {product.phLevel !== undefined ? `pH ${product.phLevel}` : 'Neutral pH'}
              </span>
            </div>
            <div>
              <span className="text-[#047857] block text-[10px]">ISO Standard:</span>
              <span className="text-[#064e3b] font-bold">SABS ISO 9001</span>
            </div>
          </div>

          {/* Plant Batch Status */}
          {product.stockStatus && (
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#f0fdf4] border border-[#6ee7b7] text-xs font-bold">
              <span className="text-[#047857]">Live Plant Batch Stock:</span>
              <span className="text-[#064e3b] font-bold flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#064e3b] animate-pulse"></span>
                {product.stockStatus}
              </span>
            </div>
          )}

          {/* pH Visual Spectrum Scale */}
          {product.phLevel !== undefined && (
            <div className="bg-[#f0fdf4] p-4 rounded-2xl border border-[#6ee7b7] space-y-1.5">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-[#047857]">Chemical pH Scale:</span>
                <span className="text-[#064e3b]">
                  pH {product.phLevel} ({product.phLevel < 6 ? 'Acidic' : product.phLevel > 8 ? 'Alkaline / Caustic' : 'Neutral'})
                </span>
              </div>
              <div className="relative h-3 rounded-full bg-gradient-to-r from-red-500 via-amber-400 via-emerald-400 via-cyan-400 to-purple-600 overflow-hidden">
                <div 
                  className="absolute top-0 bottom-0 w-2 bg-white border border-[#064e3b] rounded-full shadow-md transform -translate-x-1/2"
                  style={{ left: `${Math.min(100, Math.max(0, (product.phLevel / 14) * 100))}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-bold text-[#047857]">
                <span>0 Acidic</span>
                <span>7 Neutral</span>
                <span>14 Alkaline</span>
              </div>
            </div>
          )}

          {/* Active Ingredients & GHS Pictograms */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {product.activeIngredients && (
              <div className="bg-[#f0fdf4] p-4 rounded-2xl border border-[#6ee7b7]">
                <span className="text-xs font-bold text-[#064e3b] uppercase block mb-1">
                  Active Concentration
                </span>
                <p className="text-[#047857] text-xs font-semibold">{product.activeIngredients}</p>
              </div>
            )}

            {product.ghsPictograms && product.ghsPictograms.length > 0 && (
              <div className="bg-[#f0fdf4] p-4 rounded-2xl border border-[#6ee7b7]">
                <span className="text-xs font-bold text-[#064e3b] uppercase block mb-1">
                  GHS Hazard Classification
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.ghsPictograms.map((ghs, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full bg-white text-[#064e3b] font-bold text-[10px] border border-[#6ee7b7] flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3 text-[#064e3b]" />
                      {ghs}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Surface Compatibility & Contact Time */}
          {product.surfaceCompatibility && (
            <div className="bg-[#f0fdf4] p-4 rounded-2xl border border-[#6ee7b7] space-y-2">
              <span className="text-xs font-bold text-[#064e3b] uppercase block">
                Substrate & Surface Compatibility Matrix
              </span>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {product.surfaceCompatibility.map((surface, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full bg-white text-[#064e3b] font-bold text-[11px] border border-[#6ee7b7] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#064e3b]" /> {surface}
                  </span>
                ))}
              </div>
              {product.contactTime && (
                <div className="text-xs text-[#047857] pt-1 font-semibold">
                  Required Contact Time: <strong className="text-[#064e3b]">{product.contactTime}</strong>
                </div>
              )}
            </div>
          )}

          {/* Compliance & Approvals */}
          <div>
            <div className="text-xs font-bold text-[#064e3b] uppercase mb-1.5">
              Accreditations & Regulatory Clearances
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.compliance.map((c, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full bg-[#6ee7b7] text-[#064e3b] font-bold text-xs">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="text-xs font-bold text-[#064e3b] uppercase mb-1">
              Technical Description
            </div>
            <p className="text-[#047857] leading-relaxed text-xs font-semibold">
              {product.description}
            </p>
          </div>

          {/* Key Efficacy Features */}
          <div>
            <div className="text-xs font-bold text-[#064e3b] uppercase mb-1.5">
              Formulation Performance Attributes
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold">
              {product.keyFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-[#f0fdf4] p-2.5 rounded-xl border border-[#6ee7b7]">
                  <CheckCircle2 className="w-4 h-4 text-[#064e3b] shrink-0" />
                  <span className="text-[#064e3b]">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Application & Dilution Guide */}
          <div className="bg-[#f0fdf4] p-4 rounded-2xl border border-[#6ee7b7] space-y-2">
            <div className="text-xs font-bold text-[#064e3b] uppercase flex items-center gap-1.5">
              <Beaker className="w-4 h-4 text-[#064e3b]" /> Recommended Dilution Ratio & Application
            </div>
            <div className="text-xs text-[#064e3b] font-bold bg-white p-3 rounded-xl border border-[#6ee7b7]">
              {product.dilutionRatio}
            </div>
            <div className="text-xs text-[#047857] font-semibold">
              Available Packaging: <span className="text-[#064e3b] font-bold">{product.packSizes.join(', ')}</span>
            </div>
          </div>

          {/* Safety Warnings */}
          <div className="p-4 rounded-2xl bg-[#fda4af]/20 border border-[#fda4af] text-xs text-[#064e3b] flex items-start gap-2.5 font-semibold">
            <AlertTriangle className="w-4 h-4 text-[#064e3b] shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold block">Handling & PPE Guidelines:</strong>
              Wear appropriate PPE (gloves/eye protection) per COSHH safety standards. Always dilute into water. Store in original sealed containers between 5°C and 35°C.
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-[#f0fdf4] px-6 py-4 border-t border-[#6ee7b7] flex items-center justify-between gap-3">
          <button
            onClick={() => window.print()}
            className="px-5 py-2.5 rounded-full bg-white hover:bg-[#6ee7b7]/20 text-[#064e3b] border border-[#6ee7b7] font-bold text-xs flex items-center gap-1.5 transition-all"
          >
            <Download className="w-4 h-4 text-[#064e3b]" />
            <span>Download SDS PDF</span>
          </button>

          <button
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            className="px-6 py-2.5 rounded-full bg-[#6ee7b7] hover:bg-[#fda4af] text-[#064e3b] font-bold text-xs uppercase tracking-wider shadow-md transition-all"
          >
            Add to Quote Estimator
          </button>
        </div>

      </div>
    </div>
  );
};
