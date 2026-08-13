import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/productsData';
import { SECTORS } from '../data/sectorsData';
import { Product, QuoteItem, QuoteCalculation } from '../types';
import { 
  Calculator, 
  Plus, 
  Trash2, 
  Send, 
  CheckCircle2, 
  Download, 
  Sparkles, 
  ShieldCheck, 
  Building2, 
  FileText, 
  X,
  Truck,
  Award,
  AlertCircle
} from 'lucide-react';

interface QuoteEstimatorProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: QuoteItem[];
  onUpdateQuantity: (productId: string, qty: number) => void;
  onUpdateFrequency: (productId: string, freq: QuoteItem['frequency']) => void;
  onRemoveItem: (productId: string) => void;
  onAddItem: (product: Product) => void;
  onClearCart: () => void;
}

export const QuoteEstimator: React.FC<QuoteEstimatorProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onUpdateFrequency,
  onRemoveItem,
  onAddItem,
  onClearCart
}) => {
  const [sector, setSector] = useState('healthcare');
  const [facilitySize, setFacilitySize] = useState('Medium Facility (100 - 300 Personnel)');
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Thohoyandou, Limpopo');
  const [bbbeeCertNeeded, setBbbeeCertNeeded] = useState(true);
  const [specialNotes, setSpecialNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submittedQuote, setSubmittedQuote] = useState<any>(null);
  const [showPdfView, setShowPdfView] = useState(false);

  // Reference number for active quote
  const quoteRef = useMemo(() => {
    if (submittedQuote?.referenceNumber) return submittedQuote.referenceNumber;
    return `BBH-QT-${Math.floor(100000 + Math.random() * 900000)}`;
  }, [submittedQuote]);

  // Available products for adding to quote
  const [selectedProductToAdd, setSelectedProductToAdd] = useState('');

  // Calculate pricing breakdown
  const quoteCalculation: QuoteCalculation = useMemo(() => {
    let subtotal = 0;
    let totalVolumeLitres = 0;

    cartItems.forEach(item => {
      const price = item.product.estPricePerLitre || 30.0;
      subtotal += price * item.quantity;
      if (item.product.estPricePerLitre && item.product.estPricePerLitre > 0) {
        totalVolumeLitres += item.quantity;
      }
    });

    // Volume discount tiers
    let volumeDiscountPercentage = 0;
    if (totalVolumeLitres >= 2500) {
      volumeDiscountPercentage = 15;
    } else if (totalVolumeLitres >= 1000) {
      volumeDiscountPercentage = 10;
    } else if (totalVolumeLitres >= 300) {
      volumeDiscountPercentage = 5;
    }

    const volumeDiscountAmount = Math.round((subtotal * volumeDiscountPercentage) / 100);
    const deliveryEstimated = subtotal > 0 ? (subtotal > 5000 ? 0 : 350) : 0; // Free delivery for orders > R5000

    const estimatedTotal = Math.max(0, subtotal - volumeDiscountAmount + deliveryEstimated);

    return {
      items: cartItems,
      subtotal,
      volumeDiscountPercentage,
      volumeDiscountAmount,
      deliveryEstimated,
      includesFreeTraining: totalVolumeLitres >= 200 || cartItems.length >= 3,
      includesFreeAudit: true,
      estimatedTotal
    };
  }, [cartItems]);

  const handleAddSelectedProduct = () => {
    if (!selectedProductToAdd) return;
    const prod = PRODUCTS.find(p => p.id === selectedProductToAdd);
    if (prod) {
      onAddItem(prod);
      setSelectedProductToAdd('');
    }
  };

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !email || !phone) {
      alert('Please fill in your Company Name, Contact Person, Email, and Phone number.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName,
          contactPerson,
          email,
          phone,
          location,
          sector,
          facilitySize,
          bbbeeCertNeeded,
          specialNotes,
          quoteCalculation,
          itemCount: cartItems.length
        })
      });

      const data = await response.json();
      setSubmitting(false);

      if (data.success) {
        setSubmittedQuote(data.quoteDetails);
      } else {
        alert(data.message || 'Failed to generate quote. Please contact info@bbhchemicals.co.za directly.');
      }
    } catch (err) {
      setSubmitting(false);
      console.error('Quote submission error:', err);
      // Fallback offline reference code
      setSubmittedQuote({
        referenceNumber: `BBH-QT-${Math.floor(100000 + Math.random() * 900000)}`,
        companyName,
        contactPerson,
        email,
        phone,
        location,
        quoteCalculation,
        submittedAt: new Date().toISOString()
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-md overflow-y-auto">
      <div className="bg-white border-2 border-[#6ee7b7] rounded-3xl w-full max-w-5xl text-[#064e3b] shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-[#064e3b] px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#6ee7b7] text-[#064e3b] font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-sans">
                Automated B2B Chemical Quote Estimator
              </h2>
              <p className="text-xs text-[#6ee7b7]">
                Bold Bald Heads Industrial & Speciality Chemicals (Pty) Ltd
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {showPdfView ? (
          /* Printable A4 PDF Quote Letterhead View */
          <div className="p-4 sm:p-6 space-y-4 max-h-[85vh] overflow-y-auto bg-slate-950">
            {/* Top Toolbar Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800 print:hidden">
              <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                <FileText className="w-4 h-4 text-teal-400" />
                <span>PDF Quotation Preview (Ref: <strong className="text-white">{quoteRef}</strong>)</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download / Print PDF</span>
                </button>

                <a
                  href={`mailto:info@bbhchemicals.co.za?subject=Official Quotation ${quoteRef} - ${companyName || 'Procurement'}&body=Please find our chemical quotation summary attached (Ref: ${quoteRef}). Total: R ${(quoteCalculation.estimatedTotal * 1.15).toFixed(2)} Incl VAT.`}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Email to Procurement</span>
                </a>

                <button
                  onClick={() => setShowPdfView(false)}
                  className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Back to Estimator
                </button>
              </div>
            </div>

            {/* Printable Document Sheet */}
            <div className="bg-white text-slate-900 p-6 sm:p-10 rounded-xl shadow-2xl border border-slate-300 max-w-4xl mx-auto space-y-6 font-sans text-xs print:shadow-none print:border-none print:p-0">
              
              {/* Official Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b-2 border-slate-900 pb-5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white p-1 flex items-center justify-center shrink-0 border-2 border-[#6ee7b7] overflow-hidden shadow-sm">
                    <img 
                      src="https://res.cloudinary.com/dkyg07qvv/image/upload/c_crop,g_center,w_0.8,h_0.8/v1786456993/BBH_logo_ed5qt5.png" 
                      alt="Bold Bald Heads Logo"
                      className="w-full h-full object-contain scale-110 mix-blend-multiply"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h1 className="text-base sm:text-lg font-black text-slate-950 tracking-tight uppercase leading-tight font-sans">
                      <span className="text-[#ea580c]">BOLD</span>{' '}
                      <span className="text-[#15803d]">BALD</span>{' '}
                      <span className="text-[#0284c7]">HEADS</span>{' '}
                      <span>Industrial & Speciality Chemicals (Pty) Ltd</span>
                    </h1>
                    <p className="text-[11px] text-teal-800 font-bold font-mono">
                      Level 1 BBBEE Accredited • 100% Black-Owned Enterprise
                    </p>
                    <p className="text-[10px] text-slate-600 font-mono mt-0.5">
                      Reg No: 2021/849201/07 • VAT Reg No: 4920193821 • ISO 9001 Batch Certified
                    </p>
                  </div>
                </div>

                <div className="text-right sm:text-right text-[11px] text-slate-700 font-mono space-y-0.5 shrink-0">
                  <div className="font-bold text-slate-900 text-xs">Thohoyandou Factory HQ</div>
                  <div>Stand No. 123 Industrial Area</div>
                  <div>Thohoyandou, Limpopo, 0950</div>
                  <div>Tel: 015 969 1102 / 072 389 1816</div>
                  <div className="text-teal-800 font-semibold">info@bbhchemicals.co.za</div>
                </div>
              </div>

              {/* Quotation Title & Reference Banner */}
              <div className="bg-slate-100 p-4 rounded-lg border border-slate-300 flex flex-wrap justify-between items-center gap-2">
                <div>
                  <h2 className="text-sm font-extrabold text-slate-950 uppercase tracking-wide">
                    OFFICIAL B2B CHEMICAL QUOTATION & SPECIFICATION SUMMARY
                  </h2>
                  <p className="text-[11px] text-slate-600">Generated for client procurement assessment and tender submission.</p>
                </div>
                <div className="text-right font-mono">
                  <div className="text-xs font-black text-teal-800 bg-teal-50 px-2.5 py-1 rounded border border-teal-300 inline-block">
                    QUOTE REF: {quoteRef}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    Date: {new Date().toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <div className="text-[10px] text-slate-500">Valid for: 30 Days</div>
                </div>
              </div>

              {/* Client & Facility Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div>
                  <div className="text-[10px] uppercase font-mono font-bold text-slate-500 mb-1">Prepared For (Client):</div>
                  <div className="font-bold text-slate-900 text-sm">{companyName || 'Procurement Department'}</div>
                  <div className="text-slate-700">Attn: {contactPerson || 'Purchasing / Facility Manager'}</div>
                  <div className="text-slate-600">Email: {email || 'procurement@company.co.za'}</div>
                  <div className="text-slate-600">Phone: {phone || 'N/A'}</div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-mono font-bold text-slate-500 mb-1">Site & Delivery Details:</div>
                  <div className="text-slate-800 font-medium">Delivery Location: {location || 'Thohoyandou, Limpopo'}</div>
                  <div className="text-slate-800">Target Industry Sector: <span className="capitalize font-semibold">{sector}</span></div>
                  <div className="text-slate-800">Facility Scale: {facilitySize}</div>
                  <div className="text-emerald-800 font-bold text-[11px] mt-1">BBBEE Procurement Rating: Level 1 (135% Recognition)</div>
                </div>
              </div>

              {/* Itemized Table */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                  Itemized Chemical Formulations & Supply Schedule
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-[11px]">
                    <thead>
                      <tr className="bg-slate-900 text-white font-mono text-[10px] uppercase">
                        <th className="p-2 border border-slate-900">#</th>
                        <th className="p-2 border border-slate-900">SKU</th>
                        <th className="p-2 border border-slate-900">Formulation / Service Description</th>
                        <th className="p-2 border border-slate-900">Base</th>
                        <th className="p-2 border border-slate-900">Schedule</th>
                        <th className="p-2 border border-slate-900 text-right">Qty (L/kg)</th>
                        <th className="p-2 border border-slate-900 text-right">Est. Unit Rate</th>
                        <th className="p-2 border border-slate-900 text-right">Line Total (Excl VAT)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, index) => {
                        const price = item.product.estPricePerLitre || 30.0;
                        const lineTotal = price * item.quantity;
                        return (
                          <tr key={item.product.id} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                            <td className="p-2 border border-slate-200 font-mono text-center">{index + 1}</td>
                            <td className="p-2 border border-slate-200 font-mono font-bold text-teal-800">{item.product.sku}</td>
                            <td className="p-2 border border-slate-200 font-bold text-slate-900">
                              {item.product.name}
                              <div className="text-[10px] font-normal text-slate-600 line-clamp-1">{item.product.category}</div>
                            </td>
                            <td className="p-2 border border-slate-200 font-mono">{item.product.base}</td>
                            <td className="p-2 border border-slate-200 font-mono">{item.frequency}</td>
                            <td className="p-2 border border-slate-200 font-mono text-right font-bold">{item.quantity.toLocaleString('en-ZA')}</td>
                            <td className="p-2 border border-slate-200 font-mono text-right">R {price.toFixed(2)}</td>
                            <td className="p-2 border border-slate-200 font-mono text-right font-bold text-slate-950">
                              R {lineTotal.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pricing & VAT Summary Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 pt-2">
                {/* Free Included Accreditation Notes */}
                <div className="sm:col-span-7 bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2 text-[11px]">
                  <div className="font-bold text-slate-900 uppercase font-mono">Value-Add Inclusions & Compliance</div>
                  <ul className="space-y-1 text-slate-700">
                    <li className="flex items-center gap-1.5 text-emerald-800 font-medium">
                      ✓ Level 1 BBBEE Certificate attached for 135% procurement score
                    </li>
                    <li className="flex items-center gap-1.5 text-teal-800 font-medium">
                      ✓ Free On-Site Dilution Dosing Setup & Staff Safety Training
                    </li>
                    <li className="flex items-center gap-1.5 text-slate-800">
                      ✓ SABS ISO 9001:2015 Quality & NRCS VC8054 Disinfectant Compliance
                    </li>
                    <li className="flex items-center gap-1.5 text-slate-800">
                      ✓ Safety Data Sheets (SDS) & Certificates of Analysis (COA) provided with delivery
                    </li>
                  </ul>
                </div>

                {/* Calculation Totals */}
                <div className="sm:col-span-5 space-y-1.5 font-mono text-xs text-right bg-slate-100 p-4 rounded-lg border border-slate-300">
                  <div className="flex justify-between text-slate-700">
                    <span>Subtotal (Excl. VAT):</span>
                    <span>R {quoteCalculation.subtotal.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</span>
                  </div>

                  {quoteCalculation.volumeDiscountAmount > 0 && (
                    <div className="flex justify-between text-emerald-800 font-bold">
                      <span>Volume Discount ({quoteCalculation.volumeDiscountPercentage}%):</span>
                      <span>- R {quoteCalculation.volumeDiscountAmount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-700">
                    <span>Freight / Delivery Fee:</span>
                    <span>
                      {quoteCalculation.deliveryEstimated === 0 ? 'FREE' : `R ${quoteCalculation.deliveryEstimated.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-800 font-semibold border-t border-slate-300 pt-1">
                    <span>Net Amount (Excl. VAT):</span>
                    <span>R {quoteCalculation.estimatedTotal.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</span>
                  </div>

                  <div className="flex justify-between text-slate-800 font-semibold">
                    <span>SA VAT (15%):</span>
                    <span>R {(quoteCalculation.estimatedTotal * 0.15).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</span>
                  </div>

                  <div className="flex justify-between text-sm font-black text-slate-950 border-t-2 border-slate-950 pt-1">
                    <span>TOTAL INCL. VAT:</span>
                    <span className="text-teal-900 text-base">
                      R {(quoteCalculation.estimatedTotal * 1.15).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Banking EFT Details & Signoff */}
              <div className="border-t border-slate-300 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-[10px] font-mono">
                <div className="bg-slate-50 p-3 rounded border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900 uppercase">EFT Banking Details for Direct Payment:</div>
                  <div>Account Name: Bold Bald Heads Industrial & Speciality Chemicals</div>
                  <div>Bank: First National Bank (FNB) / Standard Bank SA</div>
                  <div>Account No: 6289 1042 991 | Branch Code: 250655</div>
                  <div>Reference: <strong className="text-teal-800">{quoteRef}</strong></div>
                </div>

                <div className="flex flex-col justify-between p-3 bg-slate-50 rounded border border-slate-200">
                  <div className="font-bold text-slate-900 uppercase">Procurement Approval Sign-off:</div>
                  <div className="pt-6 border-b border-slate-400 flex justify-between text-slate-500">
                    <span>Authorized Signature</span>
                    <span>Date</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ) : submittedQuote ? (
          /* Submission Success State */
          <div className="p-8 text-center space-y-6 max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-teal-400 bg-slate-950 px-3 py-1 rounded-full border border-teal-500/30">
                REFERENCE: {submittedQuote.referenceNumber}
              </span>
              <h3 className="text-2xl font-bold text-white mt-3 font-sans">
                Official Quote Request Received!
              </h3>
              <p className="text-sm text-slate-300 mt-2">
                Thank you <strong className="text-white">{submittedQuote.contactPerson}</strong> from <strong className="text-white">{submittedQuote.companyName}</strong>. Your quotation request has been routed to our Thohoyandou, Limpopo sales engineering team.
              </p>
            </div>

            {/* Itemized Summary Card */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-left space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Total Estimated Value:</span>
                <span className="text-teal-400 font-bold text-sm">
                  R {submittedQuote.quoteCalculation?.estimatedTotal?.toLocaleString('en-ZA') || 0}.00 (Excl VAT)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Items Count:</span>
                <span className="text-slate-200">{cartItems.length} Chemical Formulation(s)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">BBBEE Level 1 Certificate:</span>
                <span className="text-emerald-400 font-bold">Attached to Quote Package</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Free On-Site Training:</span>
                <span className="text-teal-300">Included (Workmanship Guarantee)</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setShowPdfView(true)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg"
              >
                <Download className="w-4 h-4" /> Download PDF Quote
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 border border-slate-700"
              >
                <Download className="w-4 h-4 text-teal-400" /> Print Summary
              </button>
              <button
                onClick={() => {
                  setSubmittedQuote(null);
                  setShowPdfView(false);
                  onClearCart();
                  onClose();
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
              >
                Close & Return to Catalog
              </button>
            </div>
          </div>
        ) : (
          /* Form & Items Grid */
          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 max-h-[80vh] overflow-y-auto">
            
            {/* Left Col: Cart Items & Product Selector */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Sector & Facility Selector */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="text-xs font-mono font-bold text-teal-400 uppercase">
                  Step 1: Facility Profile
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Industry Sector</label>
                    <select
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                      className="w-full bg-slate-900 text-white text-xs p-2.5 rounded-lg border border-slate-800 focus:border-teal-400 focus:outline-none"
                    >
                      {SECTORS.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Facility Size / Scale</label>
                    <select
                      value={facilitySize}
                      onChange={(e) => setFacilitySize(e.target.value)}
                      className="w-full bg-slate-900 text-white text-xs p-2.5 rounded-lg border border-slate-800 focus:border-teal-400 focus:outline-none"
                    >
                      <option value="Small Facility">Small Facility (&lt; 50 Personnel)</option>
                      <option value="Medium Facility">Medium Facility (50 - 300 Personnel)</option>
                      <option value="Large Plant / Campus">Large Industrial Plant / Hospital Campus</option>
                      <option value="Contract Fleet / Multi-Site">Contract Fleet / Multi-Site Operation</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Add Product Dropdown */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-mono font-bold text-teal-400 uppercase">
                  Step 2: Add Chemical Formulations to Quote
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedProductToAdd}
                    onChange={(e) => setSelectedProductToAdd(e.target.value)}
                    className="flex-1 bg-slate-900 text-white text-xs p-2.5 rounded-lg border border-slate-800 focus:border-teal-400 focus:outline-none"
                  >
                    <option value="">Select a chemical formulation or service range...</option>
                    {PRODUCTS.map((p) => (
                      <option key={p.id} value={p.id}>
                        [{p.sku}] {p.name} ({p.base} Base)
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleAddSelectedProduct}
                    disabled={!selectedProductToAdd}
                    className="px-4 py-2.5 rounded-lg bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-1 shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
              </div>

              {/* Cart List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Selected Items ({cartItems.length})</span>
                  {cartItems.length > 0 && (
                    <button onClick={onClearCart} className="text-red-400 hover:underline">
                      Clear All
                    </button>
                  )}
                </div>

                {cartItems.length > 0 ? (
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {cartItems.map((item) => (
                      <div
                        key={item.product.id}
                        className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex-1">
                          <div className="font-bold text-white font-sans">{item.product.name}</div>
                          <div className="text-[10px] text-teal-400 font-mono">
                            SKU: {item.product.sku} • {item.product.base} Base
                          </div>
                        </div>

                        {/* Quantity & Frequency */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-slate-400">Qty (L/kg):</span>
                            <input
                              type="number"
                              min="5"
                              step="5"
                              value={item.quantity}
                              onChange={(e) => onUpdateQuantity(item.product.id, parseInt(e.target.value) || 5)}
                              className="w-16 bg-slate-900 border border-slate-700 text-white font-mono p-1 text-center rounded focus:border-teal-400 text-xs"
                            />
                          </div>

                          <select
                            value={item.frequency}
                            onChange={(e) => onUpdateFrequency(item.product.id, e.target.value as any)}
                            className="bg-slate-900 text-slate-200 border border-slate-700 p-1 rounded text-[11px]"
                          >
                            <option value="Once-off">Once-off</option>
                            <option value="Monthly">Monthly Supply</option>
                            <option value="Annual Contract">Annual Contract</option>
                          </select>

                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center bg-slate-950/50 rounded-xl border border-slate-800 text-slate-400 text-xs space-y-2">
                    <AlertCircle className="w-8 h-8 text-teal-400/80 mx-auto" />
                    <div>Your quote list is currently empty.</div>
                    <p className="text-[11px] text-slate-500">
                      Select products from the dropdown above or browse the catalog to add items.
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* Right Col: Calculation & Company Contact Details Form */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Financial Calculation Box */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-teal-500/30 space-y-3 font-mono text-xs">
                <div className="text-sm font-bold text-white font-sans border-b border-slate-800 pb-2 flex items-center justify-between">
                  <span>Estimated Cost Summary</span>
                  <span className="text-[10px] text-teal-400 font-mono">ZAR (R)</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-slate-300">
                    <span>Products Subtotal:</span>
                    <span>R {quoteCalculation.subtotal.toLocaleString('en-ZA')}.00</span>
                  </div>

                  {quoteCalculation.volumeDiscountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-bold">
                      <span>Volume Discount ({quoteCalculation.volumeDiscountPercentage}%):</span>
                      <span>- R {quoteCalculation.volumeDiscountAmount.toLocaleString('en-ZA')}.00</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-300">
                    <span>Delivery (SA Freight):</span>
                    <span>
                      {quoteCalculation.deliveryEstimated === 0 ? (
                        <strong className="text-emerald-400">FREE</strong>
                      ) : (
                        `R ${quoteCalculation.deliveryEstimated}.00`
                      )}
                    </span>
                  </div>

                  <div className="border-t border-slate-800 pt-2 flex justify-between text-sm font-bold text-white">
                    <span>Estimated Total:</span>
                    <span className="text-teal-300 text-base">
                      R {quoteCalculation.estimatedTotal.toLocaleString('en-ZA')}.00
                    </span>
                  </div>
                </div>

                {/* Free Perks Included */}
                <div className="pt-2 border-t border-slate-800 space-y-1.5 text-[11px]">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>BBBEE Level 1 Procurement Certificate</span>
                  </div>
                  {quoteCalculation.includesFreeTraining && (
                    <div className="flex items-center gap-1.5 text-teal-300">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Free On-Site Janitorial Training Included</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                    <span>Product Performance & Workmanship Guarantee</span>
                  </div>
                </div>
              </div>

              {/* Company Contact Details Form */}
              <form onSubmit={handleSubmitQuote} className="space-y-3">
                <div className="text-xs font-mono font-bold text-teal-400 uppercase">
                  Step 3: Company Contact Info
                </div>

                <div>
                  <input
                    type="text"
                    required
                    placeholder="Company / Institution Name *"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-slate-950 text-white text-xs p-2.5 rounded-lg border border-slate-800 focus:border-teal-400 focus:outline-none placeholder-slate-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Contact Person *"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="bg-slate-950 text-white text-xs p-2.5 rounded-lg border border-slate-800 focus:border-teal-400 focus:outline-none placeholder-slate-500"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-slate-950 text-white text-xs p-2.5 rounded-lg border border-slate-800 focus:border-teal-400 focus:outline-none placeholder-slate-500"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    required
                    placeholder="Official Business Email *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 text-white text-xs p-2.5 rounded-lg border border-slate-800 focus:border-teal-400 focus:outline-none placeholder-slate-500"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Delivery Town / Location (e.g. Thohoyandou, Polokwane, JHB)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-950 text-white text-xs p-2.5 rounded-lg border border-slate-800 focus:border-teal-400 focus:outline-none placeholder-slate-500"
                  />
                </div>

                <div>
                  <textarea
                    rows={2}
                    placeholder="Special requirements, site problem details or tender specs..."
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    className="w-full bg-slate-950 text-white text-xs p-2 rounded-lg border border-slate-800 focus:border-teal-400 focus:outline-none placeholder-slate-500"
                  />
                </div>

                {/* Tender / RFQ File Attachment */}
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <label className="text-[11px] font-mono font-bold text-teal-400 flex items-center justify-between">
                    <span>Upload Tender / RFQ Specifications (Optional):</span>
                    <span className="text-[10px] text-slate-500">PDF, DOCX, XLSX (&lt; 20MB)</span>
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    className="w-full text-[11px] text-slate-400 file:mr-3 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-[10px] file:font-mono file:font-bold file:bg-slate-800 file:text-teal-300 hover:file:bg-slate-700 cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-1 gap-2 pt-1">
                  <button
                    type="submit"
                    disabled={submitting || cartItems.length === 0}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 hover:from-teal-400 hover:to-emerald-400 disabled:opacity-50 text-slate-950 font-extrabold text-sm shadow-lg shadow-teal-950/50 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Generating Official Quote...' : 'Submit Official Quote Request'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowPdfView(true)}
                    disabled={cartItems.length === 0}
                    className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 disabled:opacity-40 text-teal-300 font-bold text-xs border border-teal-500/30 hover:border-teal-400 transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4 text-teal-400" />
                    <span>Download PDF Quote Summary</span>
                  </button>
                </div>
              </form>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
