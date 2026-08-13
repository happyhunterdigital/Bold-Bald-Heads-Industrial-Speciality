export type ChemicalBase = 'Water' | 'Solvent' | 'Oil' | 'Powder' | 'Gel';

export type CategoryId = 
  | 'industrial'
  | 'housekeeping'
  | 'food-processing'
  | 'kitchen'
  | 'laundry'
  | 'floor-care'
  | 'eco-green'
  | 'pest-control'
  | 'third-party'
  | 'covid-hygiene'
  | 'training'
  | 'consultation'
  | 'automotive';

export interface ProductCategory {
  id: CategoryId;
  name: string;
  iconName: string; // Lucide icon string
  shortDesc: string;
  fullDesc: string;
  badge?: string;
  bgGradient?: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: CategoryId;
  base: ChemicalBase;
  compliance: string[]; // e.g. ['NRCS Registered', 'SABS ISO 9001', 'Halaal', 'Kosher', 'Intertek Certified']
  description: string;
  keyFeatures: string[];
  dilutionRatio: string;
  dilutionRatioNumeric?: number; // e.g. 50 for 1:50, 100 for 1:100
  packSizes: string[];
  recommendedSectors: string[];
  safetyClass: string;
  sdsAvailable: boolean;
  featured?: boolean;
  estPricePerLitre?: number; // Estimated ZAR per L/kg for quotation calculation
  
  // Advanced Technical Chemical Procurement Specs
  phLevel?: number; // e.g. 1.5, 7.0, 13.5
  activeIngredients?: string; // e.g. "Benzalkonium Chloride 10%, Isopropanol"
  ghsPictograms?: string[]; // e.g. ['GHS05 Corrosive', 'GHS07 Irritant']
  contactTime?: string; // e.g. "5 Minutes Virucidal Kill"
  surfaceCompatibility?: string[]; // e.g. ['Stainless Steel', 'PVC', 'Ceramic']
  stockStatus?: string; // e.g. "Thohoyandou Facility: 15,000L Ready"
}

export interface Certification {
  id: string;
  title: string;
  badgeCode: string;
  issuingBody: string;
  description: string;
  category: 'Quality' | 'Safety & Environment' | 'Religious & Cultural' | 'Industry Body' | 'Empowerment';
  icon: string;
  registrationDetails: string;
}

export interface IndustrySector {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  keyChallenges: string[];
  recommendedRanges: CategoryId[];
  clientTypes: string[];
  complianceRequirements: string[];
  statMetric: string;
  statLabel: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  clientSector: string;
  location: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    label: string;
  }[];
  testimonialQuote: string;
  testimonialAuthor: string;
  testimonialRole: string;
  certifiedCompliance: string[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  sector: string;
  quote: string;
  rating: number;
  location: string;
}

export interface QuoteItem {
  product: Product;
  quantity: number; // In litres / kg / units
  packSize: string;
  frequency: 'Once-off' | 'Monthly' | 'Quarterly' | 'Annual Contract';
}

export interface QuoteCalculation {
  items: QuoteItem[];
  subtotal: number;
  volumeDiscountPercentage: number;
  volumeDiscountAmount: number;
  deliveryEstimated: number;
  includesFreeTraining: boolean;
  includesFreeAudit: boolean;
  estimatedTotal: number;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Products' | 'Compliance' | 'Ordering' | 'Services';
}
