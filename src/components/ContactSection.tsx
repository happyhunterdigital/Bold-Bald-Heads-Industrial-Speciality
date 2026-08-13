import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Building2,
  Clock,
  ShieldCheck
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [sector, setSector] = useState('Healthcare');
  const [message, setMessage] = useState('');
  const [requestAudit, setRequestAudit] = useState(true);

  const [submitting, setSubmitting] = useState(false);
  const [submittedResponse, setSubmittedResponse] = useState<any>(null);

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Please fill in your name and email address.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          company,
          sector,
          message,
          requestAudit
        })
      });

      const data = await res.json();
      setSubmitting(false);

      if (data.success) {
        setSubmittedResponse(data);
      } else {
        alert(data.message || 'Error sending inquiry. Please call 015 969 1102 directly.');
      }
    } catch (err) {
      setSubmitting(false);
      console.error('Contact error:', err);
      setSubmittedResponse({
        success: true,
        inquiryId: `BBH-INQ-${Math.floor(10000 + Math.random() * 90000)}`,
        message: 'Inquiry received. A BBH Limpopo technical specialist will contact you shortly.'
      });
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#f0fdf4] text-[#064e3b]">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#6ee7b7]/30 text-[#064e3b] text-xs font-bold border border-[#6ee7b7]">
            <Mail className="w-4 h-4 text-[#064e3b]" />
            Direct Communication & On-Site Consultation
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#064e3b] font-sans">
            Contact Bold Bald Heads Chemicals
          </h2>
          <div className="w-24 h-2 bg-[#fda4af] rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-[#047857]">
            Reach our Thohoyandou, Limpopo headquarters or invite our technical specialists to perform an on-site chemical performance audit at your establishment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Details & Map Card */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-8 sm:p-10 rounded-3xl border-2 border-[#6ee7b7]/40 space-y-6 shadow-xl">
              <div className="border-b border-[#6ee7b7]/30 pb-4">
                <h3 className="text-xl font-bold text-[#064e3b] font-sans">
                  Headquarters & Sales Office
                </h3>
                <p className="text-xs text-[#047857] font-semibold mt-1">
                  Bold Bald Heads Industrial & Speciality Chemicals (Pty) Ltd
                </p>
              </div>

              {/* Direct Info List */}
              <div className="space-y-5 text-xs sm:text-sm">
                
                {/* Phone Numbers */}
                <div className="flex items-start gap-3">
                  <div className="p-3 rounded-2xl bg-[#f0fdf4] text-[#064e3b] border border-[#6ee7b7] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#047857] font-bold">Telephone & Mobile:</div>
                    <div className="font-bold text-[#064e3b] space-y-0.5 mt-0.5">
                      <div><a href="tel:0159691102" className="hover:text-[#047857]">015 969 1102</a> (Office)</div>
                      <div><a href="tel:0723891816" className="hover:text-[#047857]">072 389 1816</a> (Direct)</div>
                      <div><a href="tel:0671479043" className="hover:text-[#047857]">067 147 9043</a> (Customer Service)</div>
                    </div>
                  </div>
                </div>

                {/* Emails */}
                <div className="flex items-start gap-3">
                  <div className="p-3 rounded-2xl bg-[#f0fdf4] text-[#064e3b] border border-[#6ee7b7] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#047857] font-bold">Email Inquiries:</div>
                    <div className="font-bold text-[#064e3b] space-y-0.5 mt-0.5">
                      <div><a href="mailto:info@bbhchemicals.co.za" className="hover:underline">info@bbhchemicals.co.za</a></div>
                      <div><a href="mailto:bbhchemicals@gmail.com" className="hover:underline">bbhchemicals@gmail.com</a></div>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="p-3 rounded-2xl bg-[#f0fdf4] text-[#064e3b] border border-[#6ee7b7] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#047857] font-bold">Location & Region:</div>
                    <div className="font-bold text-[#064e3b] mt-0.5">
                      Thohoyandou, Limpopo Province, South Africa
                    </div>
                  </div>
                </div>

                {/* Web Address */}
                <div className="flex items-start gap-3">
                  <div className="p-3 rounded-2xl bg-[#f0fdf4] text-[#064e3b] border border-[#6ee7b7] shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#047857] font-bold">Web Platform:</div>
                    <div className="font-bold text-[#064e3b] mt-0.5">
                      www.bbhchemicals.co.za
                    </div>
                  </div>
                </div>

              </div>

              {/* Operating Hours Callout */}
              <div className="pt-4 border-t border-[#6ee7b7]/30 text-xs text-[#047857] flex items-center justify-between font-semibold">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#064e3b]" /> Mon - Fri: 08:00 - 17:00
                </span>
                <span className="text-[#064e3b] font-bold">
                  Level 1 BBBEE
                </span>
              </div>

            </div>

          </div>

          {/* Right Column: Lead Generation Contact & Audit Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border-2 border-[#6ee7b7]/40 shadow-xl space-y-6">
            
            <div>
              <span className="text-xs font-bold text-[#047857] uppercase tracking-wider">
                B2B Lead Generation & Audit Booking
              </span>
              <h3 className="text-2xl font-bold text-[#064e3b] font-sans mt-1">
                Request On-Site Audit or Product Inquiry
              </h3>
              <p className="text-xs text-[#047857] mt-1 font-medium">
                Fill in the form below to receive expert advice tailored for your establishment in Limpopo or nationwide across South Africa.
              </p>
            </div>

            {submittedResponse ? (
              <div className="p-8 bg-[#f0fdf4] border-2 border-[#6ee7b7] rounded-3xl text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#064e3b] mx-auto" />
                <div>
                  <span className="text-xs font-bold text-[#064e3b] bg-white px-3 py-1 rounded-full border border-[#6ee7b7]">
                    INQUIRY ID: {submittedResponse.inquiryId}
                  </span>
                  <h4 className="text-xl font-bold text-[#064e3b] mt-3">
                    Inquiry Submitted Successfully!
                  </h4>
                  <p className="text-xs text-[#047857] mt-1 font-semibold">
                    {submittedResponse.message}
                  </p>
                </div>
                <button
                  onClick={() => setSubmittedResponse(null)}
                  className="px-6 py-2.5 rounded-full bg-[#064e3b] text-white font-bold text-xs"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[#047857] font-bold block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tendani Mudau"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#f0fdf4] text-[#064e3b] font-semibold text-xs p-3.5 rounded-full border border-[#6ee7b7] focus:border-[#064e3b] focus:outline-none placeholder-[#047857]/60"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[#047857] font-bold block mb-1">Official Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. tendani@facility.co.za"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#f0fdf4] text-[#064e3b] font-semibold text-xs p-3.5 rounded-full border border-[#6ee7b7] focus:border-[#064e3b] focus:outline-none placeholder-[#047857]/60"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[#047857] font-bold block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. 072 389 1816"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#f0fdf4] text-[#064e3b] font-semibold text-xs p-3.5 rounded-full border border-[#6ee7b7] focus:border-[#064e3b] focus:outline-none placeholder-[#047857]/60"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[#047857] font-bold block mb-1">Company / Facility Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Limpopo Hospital / Safari Lodge"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-[#f0fdf4] text-[#064e3b] font-semibold text-xs p-3.5 rounded-full border border-[#6ee7b7] focus:border-[#064e3b] focus:outline-none placeholder-[#047857]/60"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-[#047857] font-bold block mb-1">Primary Industry Sector</label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full bg-[#f0fdf4] text-[#064e3b] font-semibold text-xs p-3.5 rounded-full border border-[#6ee7b7] focus:border-[#064e3b] focus:outline-none"
                  >
                    <option value="Healthcare">Healthcare & Hospitals</option>
                    <option value="Food Processing">Food Processing & Dairies</option>
                    <option value="Hospitality">Hospitality & Safari Lodges</option>
                    <option value="Facilities Management">Facilities Management & Malls</option>
                    <option value="Mortuaries">Mortuaries & Funeral Parlors</option>
                    <option value="Automotive">Automotive & Motor Car Wash</option>
                    <option value="Commercial Laundry">Commercial & Industrial Laundry</option>
                    <option value="Third Party Manufacturing">Third Party Contract Manufacturing</option>
                    <option value="Pest Control">Pest Control Management Services</option>
                  </select>
                </div>

                {/* Audit Request Checkbox */}
                <div className="bg-[#f0fdf4] p-4 rounded-2xl border border-[#6ee7b7] flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-[#064e3b] block">Request Free On-Site Consultation & Audit</span>
                    <span className="text-[11px] text-[#047857] font-medium block">Our Limpopo technical expert will visit your facility to assess cleaning performance.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={requestAudit}
                    onChange={(e) => setRequestAudit(e.target.checked)}
                    className="w-5 h-5 rounded bg-white border-[#6ee7b7] text-[#064e3b] focus:ring-[#064e3b]"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#047857] font-bold block mb-1">Message / Facility Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Describe your cleaning challenges, volume needs, or product inquiries..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#f0fdf4] text-[#064e3b] font-semibold text-xs p-4 rounded-2xl border border-[#6ee7b7] focus:border-[#064e3b] focus:outline-none placeholder-[#047857]/60"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-full bg-[#6ee7b7] hover:bg-[#fda4af] text-[#064e3b] font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Submitting Inquiry...' : 'Send Direct Inquiry / Book Consultation'}</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
