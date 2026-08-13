import React from 'react';
import { CASE_STUDIES } from '../data/caseStudiesData';
import { TESTIMONIALS } from '../data/testimonialsData';
import { FileCheck2, Quote, Star, MapPin, CheckCircle2 } from 'lucide-react';

export const CaseStudiesSection: React.FC = () => {
  return (
    <section id="case-studies" className="py-24 bg-[#f0fdf4] text-[#064e3b]">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#6ee7b7]/30 text-[#064e3b] text-xs font-bold border border-[#6ee7b7]">
            <FileCheck2 className="w-4 h-4 text-[#064e3b]" />
            Proven Provenance & Measured Results
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#064e3b] font-sans">
            Case Studies & Project Implementations
          </h2>
          <div className="w-24 h-2 bg-[#fda4af] rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-[#047857]">
            Real-world proof of how Bold Bald Heads Chemical formulations solve complex hygiene, compliance, and cost challenges across South Africa.
          </p>
        </div>

        {/* Case Studies Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((cs) => (
            <div
              key={cs.id}
              className="bg-white p-8 rounded-3xl border-2 border-[#6ee7b7]/40 hover:border-[#fda4af] transition-all duration-300 shadow-xl flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#f0fdf4] text-[#064e3b] border border-[#6ee7b7]">
                    {cs.clientSector}
                  </span>
                  <span className="text-xs text-[#047857] flex items-center gap-1 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-[#064e3b]" /> {cs.location}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#064e3b] font-sans leading-snug">
                  {cs.title}
                </h3>

                <div className="space-y-2 text-xs text-[#047857] font-semibold">
                  <div>
                    <strong className="text-[#064e3b]">The Challenge:</strong> {cs.challenge}
                  </div>
                  <div>
                    <strong className="text-[#064e3b]">BBH Solution:</strong> {cs.solution}
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 bg-[#f0fdf4] p-4 rounded-2xl border border-[#6ee7b7]/30">
                  {cs.results.map((res, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-base font-bold text-[#064e3b]">
                        {res.metric}
                      </div>
                      <div className="text-[10px] text-[#047857] leading-tight font-semibold">
                        {res.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial Quote */}
              <div className="pt-4 border-t border-[#6ee7b7]/30 space-y-2">
                <div className="flex items-start gap-2 text-xs italic text-[#047857]">
                  <Quote className="w-4 h-4 text-[#064e3b] shrink-0 mt-0.5" />
                  <span>"{cs.testimonialQuote}"</span>
                </div>
                <div className="text-xs font-bold text-[#064e3b] font-sans text-right">
                  — {cs.testimonialAuthor}, <span className="text-[#047857] font-normal">{cs.testimonialRole}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Client Testimonials Wall */}
        <div className="space-y-8 pt-8 border-t border-[#6ee7b7]/30">
          <div className="text-center space-y-2">
            <h3 className="text-3xl font-bold text-[#064e3b] font-sans">
              What Facility Managers & Hygiene Officers Say
            </h3>
            <p className="text-sm text-[#047857]">
              Trusted by commercial cleaning contractors, provincial health facilities, and hospitality establishments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white p-6 rounded-3xl border border-[#6ee7b7] space-y-3 flex flex-col justify-between shadow-md"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-[#064e3b]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-[#064e3b]" />
                    ))}
                  </div>
                  <p className="text-xs text-[#047857] italic leading-relaxed font-semibold">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#6ee7b7]/30 text-xs">
                  <div className="font-bold text-[#064e3b]">{t.clientName}</div>
                  <div className="text-xs text-[#047857] font-bold">{t.company}</div>
                  <div className="text-[10px] text-[#047857]/80">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
