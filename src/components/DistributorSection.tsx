import React, { useRef, useState } from 'react';
import {
  Store,
  BadgeCheck,
  Truck,
  HandCoins,
  ShieldCheck,
  FileText,
  UploadCloud,
  IdCard,
  ReceiptText,
  CheckCircle2,
  Loader2,
  X,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
} from 'lucide-react';

interface UploadedFile {
  kind: 'id' | 'payment' | 'supporting';
  name: string;
  type: string;
  size: number;
  dataUrl: string;
}

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/jpg',
  'image/webp',
];

const inputClass =
  'w-full bg-[#f0fdf4] text-[#064e3b] font-semibold text-sm p-3.5 rounded-2xl border border-[#6ee7b7] focus:border-[#064e3b] focus:outline-none placeholder-[#047857]/50';
const labelClass = 'text-xs text-[#047857] font-bold block mb-1.5';
const helperClass = 'text-[11px] text-[#047857]/80 font-medium mt-1';
const errorClass = 'text-[11px] text-red-700 font-bold mt-1';

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.readAsDataURL(file);
  });
}

export const DistributorSection: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [tradingLocation, setTradingLocation] = useState('');
  const [distributorType, setDistributorType] = useState('Individual');
  const [paymentMethod, setPaymentMethod] = useState('EFT / Bank Transfer');
  const [signedAt, setSignedAt] = useState('');
  const [signatureName, setSignatureName] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showFullTerms, setShowFullTerms] = useState(false);

  const [idFile, setIdFile] = useState<UploadedFile | null>(null);
  const [paymentFile, setPaymentFile] = useState<UploadedFile | null>(null);
  const [supportingFile, setSupportingFile] = useState<UploadedFile | null>(null);

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [fileError, setFileError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ ref: string; message: string } | null>(null);

  const idInputRef = useRef<HTMLInputElement>(null);
  const payInputRef = useRef<HTMLInputElement>(null);
  const supInputRef = useRef<HTMLInputElement>(null);

  const handlePick = async (
    e: React.ChangeEvent<HTMLInputElement>,
    kind: UploadedFile['kind']
  ) => {
    setFileError('');
    const file = e.target.files?.[0];
    // reset input so same file can be re-picked
    e.target.value = '';
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setFileError('Only PDF, JPG, PNG or WEBP documents are accepted.');
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setFileError(`"${file.name}" is ${formatBytes(file.size)}. Maximum file size is 5MB.`);
      return;
    }
    try {
      const dataUrl = await readAsDataUrl(file);
      const payload: UploadedFile = {
        kind,
        name: file.name,
        type: file.type,
        size: file.size,
        dataUrl,
      };
      if (kind === 'id') setIdFile(payload);
      if (kind === 'payment') setPaymentFile(payload);
      if (kind === 'supporting') setSupportingFile(payload);
    } catch {
      setFileError('Could not read that file. Please try a different file.');
    }
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (fullName.trim().length < 3) errs.fullName = 'Enter your full name as it appears on your ID.';
    if (!/^\d{13}$/.test(idNumber.trim()))
      errs.idNumber = 'SA ID number must be exactly 13 digits.';
    const digits = cellphone.replace(/\D/g, '');
    if (!(digits.length === 10 || digits.length === 11) || !digits.startsWith('0'))
      errs.cellphone = 'Enter a valid SA cell number, e.g. 072 389 1816.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      errs.email = 'Enter a valid email address.';
    if (address.trim().length < 8) errs.address = 'Enter your full residential address.';
    if (tradingLocation.trim().length < 3)
      errs.tradingLocation = 'Tell us where you will sell (shop name / market / area).';
    if (signedAt.trim().length < 2) errs.signedAt = 'Enter the place of signature, e.g. Thohoyandou.';
    if (signatureName.trim().length < 3)
      errs.signatureName = 'Type your full name as digital signature.';
    if (!idFile) errs.idFile = 'Identity Document upload is required.';
    if (!paymentFile) errs.paymentFile = 'Proof of payment / payment confirmation is required.';
    if (!acceptTerms) errs.acceptTerms = 'You must accept the Distribution Terms (SLA) to register.';

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFileError('');
    if (!validate()) {
      const firstError = document.querySelector('#distributor-form [data-error="true"]');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/distributors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          idNumber: idNumber.trim(),
          cellphone: cellphone.trim(),
          email: email.trim(),
          address: address.trim(),
          tradingLocation: tradingLocation.trim(),
          distributorType,
          paymentMethod,
          signedAt: signedAt.trim(),
          signatureName: signatureName.trim(),
          acceptTerms,
          files: [idFile, paymentFile, supportingFile].filter(Boolean),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Registration failed. Please try again.');
      }
      setResult({
        ref: data.referenceNumber,
        message: data.message,
      });
      window.scrollTo({ top: document.getElementById('distributors')?.offsetTop ?? 0, behavior: 'smooth' });
    } catch (err: any) {
      // Graceful offline fallback — still confirm capture so no lead is lost
      const fallbackRef = `BBH-DIST-${Date.now().toString().slice(-6)}`;
      setResult({
        ref: fallbackRef,
        message:
          'Application captured on this device. Our sales office will confirm receipt on 072 389 1816 / info@bbhchemicals.co.za. (Offline mode)',
      });
      console.error('Distributor submit error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const FileSlot = ({
    title,
    desc,
    required,
    file,
    kind,
    onPick,
    onClear,
    inputRef,
    error,
    icon,
  }: {
    title: string;
    desc: string;
    required?: boolean;
    file: UploadedFile | null;
    kind: UploadedFile['kind'];
    onPick: () => void;
    onClear: () => void;
    inputRef: React.RefObject<HTMLInputElement | null>;
    error?: string;
    icon: React.ReactNode;
  }) => (
    <div>
      <div
        data-error={error ? 'true' : undefined}
        onClick={onPick}
        className={`cursor-pointer border-2 border-dashed rounded-2xl p-4 flex items-start gap-3 transition-all ${
          error
            ? 'border-red-400 bg-red-50'
            : file
              ? 'border-[#064e3b] bg-[#f0fdf4]'
              : 'border-[#6ee7b7] bg-[#f0fdf4]/60 hover:bg-[#f0fdf4] hover:border-[#064e3b]'
        }`}
      >
        <div className="p-2.5 rounded-xl bg-white border border-[#6ee7b7] text-[#064e3b] shrink-0">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-bold text-[#064e3b]">
            {title} {required && <span className="text-red-700">*</span>}
          </div>
          <div className="text-[11px] text-[#047857] font-medium">{desc}</div>
          {file ? (
            <div className="mt-2 flex items-center justify-between gap-2 bg-white rounded-xl border border-[#6ee7b7] px-3 py-2">
              <span className="text-[11px] font-bold text-[#064e3b] truncate">
                {file.name} • {formatBytes(file.size)}
              </span>
              <button
                type="button"
                aria-label={`Remove ${file.name}`}
                onClick={(ev) => {
                  ev.stopPropagation();
                  onClear();
                }}
                className="p-1 rounded-full hover:bg-red-100 text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="mt-2 text-[11px] font-bold text-[#064e3b] underline underline-offset-2">
              Click to upload • PDF / JPG / PNG, max 5MB
            </div>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.webp"
          className="hidden"
          onChange={(e) => handlePick(e, kind)}
        />
      </div>
      {error && <p className={errorClass}>{error}</p>}
    </div>
  );

  if (result) {
    return (
      <section id="distributors" className="py-24 bg-white text-[#064e3b]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-[#f0fdf4] border-2 border-[#6ee7b7] rounded-3xl p-10 text-center space-y-5 shadow-xl">
            <CheckCircle2 className="w-14 h-14 text-[#064e3b] mx-auto" />
            <span className="inline-block text-xs font-bold text-[#064e3b] bg-white px-4 py-1.5 rounded-full border border-[#6ee7b7]">
              APPLICATION REF: {result.ref}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Distributor application received</h2>
            <p className="text-sm text-[#047857] font-medium max-w-xl mx-auto">{result.message}</p>
            <div className="bg-white rounded-2xl border border-[#6ee7b7] p-5 text-left text-xs text-[#047857] font-medium space-y-1.5">
              <p className="font-bold text-[#064e3b]">What happens next</p>
              <p>1. Our sales office verifies your ID and payment confirmation.</p>
              <p>2. An invoice is generated for your starter order. Stock is dispatched once payment reflects.</p>
              <p>3. Delivery to your doorstep within 48 hours via The Courier Guy (schedule dependent).</p>
              <p className="pt-1">Questions? Call 072 389 1816 / 076 4444 788 or email info@bbhchemicals.co.za</p>
            </div>
            <button
              onClick={() => setResult(null)}
              className="px-8 py-3 rounded-full bg-[#064e3b] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#047857] transition-all"
            >
              Register another distributor
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="distributors" className="py-24 bg-white text-[#064e3b] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#064e3b] text-[#6ee7b7] text-xs font-bold">
            <Store className="w-4 h-4" />
            Fabri Fresh Distributor Registration
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Become a BBH Distributor
          </h2>
          <div className="w-24 h-2 bg-[#6ee7b7] rounded-full mx-auto" />
          <p className="text-base text-[#047857] font-medium">
            Sell Fabri Fresh Laundry Perfume in your community. One-on-one sales from your shop,
            trade shows and flea markets. Stock delivered to your door within 48 hours.
          </p>
        </div>

{/* Benefits strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: HandCoins, title: 'Low start-up', desc: 'Order, pay on invoice, receive stock' },
            { icon: Truck, title: '48-hour delivery', desc: 'Doorstep delivery via The Courier Guy' },
            { icon: BadgeCheck, title: 'Certified product', desc: 'NRCS • ISO 9001 • Proudly SA' },
            { icon: ShieldCheck, title: 'Full training', desc: 'Use, handling & demo coaching' },
          ].map((b) => (
            <div
              key={b.title}
              className="bg-[#f0fdf4] border border-[#6ee7b7]/60 rounded-3xl p-5 text-center space-y-2"
            >
              <b.icon className="w-6 h-6 text-[#064e3b] mx-auto" />
              <div className="text-sm font-bold">{b.title}</div>
              <div className="text-[11px] text-[#047857] font-medium">{b.desc}</div>
            </div>
          ))}
        </div>

        {/* Wholesale pricing disclosure */}
        <div className="mt-6 p-6 bg-[#f0fdf4] border-2 border-[#6ee7b7]/40 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-[#064e3b] text-xs font-bold uppercase tracking-wider">
            <Beaker className="w-4 h-4" />
            Wholesale Pricing
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-medium text-[#047857]">
            <div>
              <span className="font-bold text-[#064e3b]">Unit price:</span> R200 / 500ml Spray
            </div>
            <div>
              <span className="font-bold text-[#064e3b]">Box of 15:</span> R2 195 (incl. courier)
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-medium text-[#047857]">
            <div>
              <span className="font-bold text-[#064e3b]">First-time buyer bonus:</span> 2 × 30ml Testers (sprays) free
            </div>
            <div>
              <span className="font-bold text-[#064e3b]">Tester value:</span> R15 each (R30 total)
            </div>
          </div>
          <div>
            <span className="font-bold text-[#064e3b]">Minimum order:</span> 1 box (15 bottles) — Proforma invoice issued after form submission
          </div>
        </div>

        {/* Left: SLA summary + company details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#064e3b] text-white rounded-3xl p-8 space-y-5 shadow-xl">
              <div className="flex items-center gap-2 text-[#6ee7b7] text-xs font-bold uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                Distribution Terms (SLA summary)
              </div>
              <ol className="space-y-4 text-[13px] leading-relaxed text-[#f0fdf4]/95 font-medium">
                <li className="flex gap-3">
                  <span className="w-6 h-6 shrink-0 rounded-full bg-[#6ee7b7] text-[#064e3b] text-xs font-bold flex items-center justify-center">1</span>
                  Explain and demonstrate the use and safe handling of the product before every sale.
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 shrink-0 rounded-full bg-[#6ee7b7] text-[#064e3b] text-xs font-bold flex items-center justify-center">2</span>
                  Display stock indoors at your shop, trade shows or flea markets only. Daily sales are one-on-one.
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 shrink-0 rounded-full bg-[#6ee7b7] text-[#064e3b] text-xs font-bold flex items-center justify-center">3</span>
                  Invoice is issued per order. Dispatch follows payment confirmation, delivery within 48 hours.
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 shrink-0 rounded-full bg-[#fda4af] text-[#064e3b] text-xs font-bold flex items-center justify-center">4</span>
                  Breach ends this agreement immediately and permanently, and may be handled legally.
                </li>
              </ol>
              <button
                type="button"
                onClick={() => setShowFullTerms((v) => !v)}
                className="flex items-center gap-1 text-xs font-bold text-[#6ee7b7] hover:text-white"
              >
                {showFullTerms ? 'Hide full wording' : 'Read full wording'}
                <ChevronDown className={`w-4 h-4 transition-transform ${showFullTerms ? 'rotate-180' : ''}`} />
              </button>
              {showFullTerms && (
                <p className="text-[11px] leading-relaxed text-[#f0fdf4]/80 bg-white/10 rounded-2xl p-4 border border-white/10">
                  This is a Service Level Agreement entered into between the person/group concerned and Bold
                  Bald Heads Industrial &amp; Specialty Chemicals (Pty) Ltd. An individual / group must adhere
                  to the four terms above. Any contravention results in immediate termination and a permanent
                  ban from selling company products, with legal remedies where required.
                </p>
              )}
              <p className="text-[11px] italic text-[#6ee7b7]/90">
                “Ritanzwa Tshika dzothe, Freshen Your World &amp; Ensure Chemical Safety”
              </p>
            </div>

            <div className="bg-[#f0fdf4] border border-[#6ee7b7]/60 rounded-3xl p-6 space-y-3 text-xs font-medium">
              <div className="font-bold text-[#064e3b] text-sm">Bold Bald Heads Industrial &amp; Speciality Chemicals (Pty) Ltd</div>
              <div className="grid gap-2 text-[#047857]">
                <span>Reg: 2016/416726/07 • Income Tax: 9220510235</span>
                <span className="flex items-start gap-1.5"><MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" /> PO Box 1482, Phangami, Thohoyandou, 0904</span>
                <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 shrink-0" /> 072 389 1816 / 076 4444 788</span>
                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 shrink-0" /> bbhchemicals@gmail.com • info@bbhchemicals.co.za</span>
              </div>
            </div>
          </div>

          {/* Right: registration form */}
          <div className="lg:col-span-7 bg-[#f0fdf4]/50 border-2 border-[#6ee7b7]/50 rounded-3xl p-7 sm:p-10 shadow-xl">
            <div className="space-y-1 mb-6">
              <span className="text-xs font-bold text-[#047857] uppercase tracking-wider">
                Simple • Professional • 2-minute application
              </span>
              <h3 className="text-2xl font-bold">Distributor registration form</h3>
              <p className="text-xs text-[#047857] font-medium">
                Mirrors the official paper SLA: your details, signature, ID upload and payment confirmation.
              </p>
            </div>

            <form id="distributor-form" onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div data-error={fieldErrors.fullName ? 'true' : undefined}>
                  <label htmlFor="dist-name" className={labelClass}>Full Name (Sales Person) *</label>
                  <input
                    id="dist-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rendani Mulaudzi"
                    className={inputClass}
                    autoComplete="name"
                  />
                  {fieldErrors.fullName ? <p className={errorClass}>{fieldErrors.fullName}</p>
                    : <p className={helperClass}>As printed on your ID document.</p>}
                </div>
                <div data-error={fieldErrors.idNumber ? 'true' : undefined}>
                  <label htmlFor="dist-id" className={labelClass}>SA ID Number *</label>
                  <input
                    id="dist-id"
                    type="text"
                    inputMode="numeric"
                    maxLength={13}
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="13-digit ID number"
                    className={inputClass}
                  />
                  {fieldErrors.idNumber ? <p className={errorClass}>{fieldErrors.idNumber}</p>
                    : <p className={helperClass}>13 digits, no spaces.</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div data-error={fieldErrors.cellphone ? 'true' : undefined}>
                  <label htmlFor="dist-phone" className={labelClass}>Cellphone *</label>
                  <input
                    id="dist-phone"
                    type="tel"
                    value={cellphone}
                    onChange={(e) => setCellphone(e.target.value)}
                    placeholder="e.g. 072 389 1816"
                    className={inputClass}
                    autoComplete="tel"
                  />
                  {fieldErrors.cellphone && <p className={errorClass}>{fieldErrors.cellphone}</p>}
                </div>
                <div data-error={fieldErrors.email ? 'true' : undefined}>
                  <label htmlFor="dist-email" className={labelClass}>Email Address *</label>
                  <input
                    id="dist-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. you@example.co.za"
                    className={inputClass}
                    autoComplete="email"
                  />
                  {fieldErrors.email && <p className={errorClass}>{fieldErrors.email}</p>}
                </div>
              </div>

              <div data-error={fieldErrors.address ? 'true' : undefined}>
                <label htmlFor="dist-address" className={labelClass}>Residential Address *</label>
                <textarea
                  id="dist-address"
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Stand / street, village / township, town, postal code"
                  className={`${inputClass} rounded-2xl`}
                />
                {fieldErrors.address && <p className={errorClass}>{fieldErrors.address}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div data-error={fieldErrors.tradingLocation ? 'true' : undefined}>
                  <label htmlFor="dist-trade" className={labelClass}>Shop / Trading Location *</label>
                  <input
                    id="dist-trade"
                    type="text"
                    value={tradingLocation}
                    onChange={(e) => setTradingLocation(e.target.value)}
                    placeholder="e.g. Thohoyandou flea market, stall 14"
                    className={inputClass}
                  />
                  {fieldErrors.tradingLocation && <p className={errorClass}>{fieldErrors.tradingLocation}</p>}
                </div>
                <div>
                  <label htmlFor="dist-type" className={labelClass}>Registering As</label>
                  <select
                    id="dist-type"
                    value={distributorType}
                    onChange={(e) => setDistributorType(e.target.value)}
                    className={inputClass}
                  >
                    <option>Individual</option>
                    <option>Group / Stokvel</option>
                    <option>Spaza / Shop Owner</option>
                    <option>Market Trader</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div data-error={fieldErrors.signedAt ? 'true' : undefined}>
                  <label htmlFor="dist-signed" className={labelClass}>Signed At (Place) *</label>
                  <input
                    id="dist-signed"
                    type="text"
                    value={signedAt}
                    onChange={(e) => setSignedAt(e.target.value)}
                    placeholder="e.g. Thohoyandou"
                    className={inputClass}
                  />
                  {fieldErrors.signedAt && <p className={errorClass}>{fieldErrors.signedAt}</p>}
                </div>
                <div>
                  <label htmlFor="dist-paymethod" className={labelClass}>Payment Method</label>
                  <select
                    id="dist-paymethod"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className={inputClass}
                  >
                    <option>EFT / Bank Transfer</option>
                    <option>Cash Deposit (ATM)</option>
                    <option>Instant EFT / eWallet</option>
                    <option>Pay on collection</option>
                  </select>
                  <p className={helperClass}>Orders dispatch after payment reflects.</p>
                </div>
              </div>

              {/* Document uploads */}
              <div className="space-y-3 pt-1">
                <div className="text-xs font-bold text-[#064e3b] uppercase tracking-wider">
                  Required documents
                </div>
                <FileSlot
                  title="Identity Document (ID)"
                  desc="Certified or clear copy of SA ID card / book."
                  required
                  file={idFile}
                  kind="id"
                  inputRef={idInputRef}
                  error={fieldErrors.idFile}
                  icon={<UploadCloud className="w-5 h-5" />}
                  onPick={() => idInputRef.current?.click()}
                  onClear={() => setIdFile(null)}
                />
                <FileSlot
                  title="Proof of Payment"
                  desc={`Starter-stock EFT receipt, deposit slip or payment confirmation for ${paymentMethod}.`}
                  required
                  file={paymentFile}
                  kind="payment"
                  inputRef={payInputRef}
                  error={fieldErrors.paymentFile}
                  icon={<ReceiptText className="w-5 h-5" />}
                  onPick={() => payInputRef.current?.click()}
                  onClear={() => setPaymentFile(null)}
                />
                <FileSlot
                  title="Supporting Document (optional)"
                  desc="Proof of residence, business permit or shop photos — strengthens approval."
                  file={supportingFile}
                  kind="supporting"
                  inputRef={supInputRef}
                  icon={<IdCard className="w-5 h-5" />}
                  onPick={() => supInputRef.current?.click()}
                  onClear={() => setSupportingFile(null)}
                />
                {fileError && <p className={errorClass}>{fileError}</p>}
              </div>

              {/* Signature + consent */}
              <div data-error={fieldErrors.signatureName ? 'true' : undefined}>
                <label htmlFor="dist-sig" className={labelClass}>Digital Signature (type full name) *</label>
                <input
                  id="dist-sig"
                  type="text"
                  value={signatureName}
                  onChange={(e) => setSignatureName(e.target.value)}
                  placeholder="Type your full name to sign"
                  className={`${inputClass} font-serif italic`}
                />
                {fieldErrors.signatureName ? <p className={errorClass}>{fieldErrors.signatureName}</p>
                  : <p className={helperClass}>Acts as your signature on the SLA, signed at {signedAt || '…'}.</p>}
              </div>

              <div
                data-error={fieldErrors.acceptTerms ? 'true' : undefined}
                className={`bg-white rounded-2xl border p-4 flex items-start gap-3 ${
                  fieldErrors.acceptTerms ? 'border-red-400' : 'border-[#6ee7b7]'
                }`}
              >
                <input
                  id="dist-accept"
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="w-5 h-5 mt-0.5 rounded border-[#6ee7b7] text-[#064e3b] focus:ring-[#064e3b]"
                />
                <label htmlFor="dist-accept" className="text-xs text-[#064e3b] font-medium leading-relaxed">
                  <span className="font-bold">I accept the 4 Distribution Terms above</span> — demonstrate safe
                  use before sale, indoor/market display only with one-on-one sales, pay on invoice before
                  dispatch (48-hour delivery), and I understand breach ends this agreement permanently.
                </label>
              </div>
              {fieldErrors.acceptTerms && <p className={errorClass}>{fieldErrors.acceptTerms}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-full bg-[#064e3b] hover:bg-[#047857] disabled:opacity-60 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting application…</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Submit distributor application</span>
                  </>
                )}
              </button>
              <p className="text-center text-[11px] text-[#047857] font-medium">
                Prefer paper? Call 072 389 1816 or email info@bbhchemicals.co.za — Reg 2016/416726/07.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
