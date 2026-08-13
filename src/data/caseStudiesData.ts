import { CaseStudy } from '../types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-01',
    title: 'Hospital Pathogen Control & Infection Eradication across 12 Limpopo Regional Clinics',
    clientSector: 'Healthcare & Hospitals',
    location: 'Vhembe & Mopani Districts, Limpopo',
    challenge: 'A network of regional provincial clinics faced recurrent surface bacterial contamination and rising hospital-acquired infection (HAI) rates due to inconsistent dilution of unverified cleaning agents.',
    solution: 'BBH Chemicals conducted an on-site audit, installed automated wall dilution dispensers, supplied NRCS-registered All-Surface Fresh Disinfectants, and delivered accredited janitorial staff training.',
    results: [
      { metric: '99.8%', label: 'HAI Surface Bio-burden Reduction' },
      { metric: '100%', label: 'NRCS VC8054 Regulatory Audit Clearance' },
      { metric: '30%', label: 'Chemical Wastage Reduction via Auto-Dosing' }
    ],
    testimonialQuote: 'BBH Chemicals did not just supply us with NRCS-registered disinfectants; their hands-on training for our cleaning personnel transformed our infection control standards completely.',
    testimonialAuthor: 'Dr. M. Ramovha',
    testimonialRole: 'Quality Assurance Director, Regional Health Services',
    certifiedCompliance: ['NRCS VC8054', 'SABS ISO 9001', 'NCCA Trained']
  },
  {
    id: 'cs-02',
    title: 'Intertek Food Safety Compliance & 40% Wash Efficiency for Regional Dairy Bottler',
    clientSector: 'Food Processing & Dairies',
    location: 'Thohoyandou Industrial Zone, Limpopo',
    challenge: 'A major dairy processing plant required Intertek, Halaal, and Kosher certified Clean-In-Place (CIP) chemicals to pass an urgent international food safety exporter audit while managing high milk stone scale in processing pipes.',
    solution: 'Deployed BBH FoodSafe Intertek-certified CIP Alkaline Cleaners and BioSan QAC-Free No-Rinse Sanitizer, coupled with custom CIP recirculation temperature and dosing guidelines.',
    results: [
      { metric: 'Pass', label: 'Intertek & N.H.I.T Halaal Audit Grade A' },
      { metric: '42%', label: 'Faster CIP Cleaning Cycle Duration' },
      { metric: '0 PPM', label: 'Zero Post-Rinse Chemical Trace Residue' }
    ],
    testimonialQuote: 'The technical accuracy of BBH Chemical formulations allowed us to pass our international export audit effortlessly. Their N.H.I.T Halaal and Kosher certifications were essential for our broad market.',
    testimonialAuthor: 'T. Mudau',
    testimonialRole: 'Operations Manager, Limpopo Fresh Dairy',
    certifiedCompliance: ['Intertek Certified', 'N.H.I.T Halaal', 'Kosher Certified', 'SABS ISO 9001']
  },
  {
    id: 'cs-03',
    title: '35% Laundry Chemical Cost Savings & Eco-Lodge Sustainability Integration',
    clientSector: 'Hospitality & Lodges',
    location: 'Kruger Park Boundary Eco-Resort',
    challenge: 'A premier 120-room luxury safari resort needed bio-degradable, eco-friendly housekeeping chemicals to protect local groundwater while removing tough red dust and organic stains from guest linen.',
    solution: 'Replaced traditional harsh chlorine bleaches with BBH EcoGreen Bio-Degradable All-Purpose Cleaner, BoldLaundry Bio Liquid Detergent, and OxyBleach Oxygen Destainer.',
    results: [
      { metric: '35%', label: 'Linen Tensile Life Extension' },
      { metric: '100%', label: 'Septic & Groundwater Ecosystem Safety' },
      { metric: 'R185,000', label: 'Annual Chemical & Water Savings' }
    ],
    testimonialQuote: 'BBH Eco/Green range delivers five-star luxury freshness without harming our fragile bushveld ecosystem. Their performance guarantee gives us complete peace of mind.',
    testimonialAuthor: 'S. Van der Merwe',
    testimonialRole: 'Group Executive Housekeeper, Bushveld Reserve Lodges',
    certifiedCompliance: ['100% Bio-Degradable', 'SABS ISO 9001', 'Proudly South African']
  }
];
