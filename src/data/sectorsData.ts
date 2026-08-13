import { IndustrySector } from '../types';

export const SECTORS: IndustrySector[] = [
  {
    id: 'healthcare',
    title: 'Healthcare & Hospitals',
    subtitle: 'Pathogen elimination, operating theater sterilization, and NRCS virucidal infection control.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    keyChallenges: [
      'Eliminating hospital-acquired infections (HAIs)',
      'Meeting strict NRCS VC8054 disinfectant standards',
      'Non-corrosive sanitation for sensitive medical hardware',
      'Maintaining 24/7 odor-free patient wards'
    ],
    recommendedRanges: ['housekeeping', 'covid-hygiene', 'floor-care', 'laundry'],
    clientTypes: ['Provincial Hospitals', 'Private Clinics', 'Surgical Centers', 'Care Homes', 'Laboratories'],
    complianceRequirements: ['NRCS Registered Disinfectants', 'SABS ISO 9001', 'Hazardous Chemical Substances Regulations'],
    statMetric: '99.999%',
    statLabel: 'Broad-Spectrum Pathogen Kill Rate'
  },
  {
    id: 'food-beverage',
    title: 'Food Processing & Dairies',
    subtitle: 'Intertek & N.H.I.T Halaal / Kosher certified CIP cleaners, crate washes, and food contact sanitizers.',
    image: 'https://images.unsplash.com/photo-1584263347416-85a696b4eda7?auto=format&fit=crop&w=800&q=80',
    keyChallenges: [
      'Preventing bacterial biofilms (Listeria, E. coli, Salmonella)',
      'Ensuring zero chemical residue on food contact equipment',
      'Strict compliance with Intertek, Halaal, and Kosher mandates',
      'Managing high-volume CIP recirculation tanks'
    ],
    recommendedRanges: ['food-processing', 'kitchen', 'pest-control', 'eco-green'],
    clientTypes: ['Dairy Processing Plants', 'Meat Abattoirs', 'Beverage Bottlers', 'Bakery Facilities', 'Catering Logistics'],
    complianceRequirements: ['Intertek Certified Food Safe', 'N.H.I.T Halaal', 'Kosher Kashrut', 'HACCP Standard'],
    statMetric: '0 PPM',
    statLabel: 'Post-Rinse Chemical Residue Tolerance'
  },
  {
    id: 'hospitality',
    title: 'Hospitality & Lodges',
    subtitle: 'Five-star housekeeping, crisp stain-free laundry, commercial kitchen grease traps, and eco-lodge solutions.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    keyChallenges: [
      'Delivering spotless white linen and towel softness',
      'Commercial kitchen hood & oven grease buildup',
      'Eco-friendly formulas for sensitive bush lodges and nature reserves',
      'Fast room turnover with lasting fresh aromas'
    ],
    recommendedRanges: ['housekeeping', 'kitchen', 'laundry', 'eco-green', 'floor-care'],
    clientTypes: ['Game Lodging & Safari Resorts', 'Boutique Hotels', 'Conference Centers', 'Restaurants'],
    complianceRequirements: ['SABS ISO 9001', 'Intertek Kitchen Approval', 'Eco-Biodegradable Clearance'],
    statMetric: '35%',
    statLabel: 'Linen Replacement Cost Reduction'
  },
  {
    id: 'facilities-management',
    title: 'Facilities Management & Malls',
    subtitle: 'High-traffic floor polishes, janitorial supplies, restroom hygiene hardware, and contract cleaning chemicals.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    keyChallenges: [
      'High-gloss scuff-resistant floor finishes for heavy foot traffic',
      'Bulk chemical cost control across multi-building campuses',
      'Controlling cleaning staff chemical dosing and dilution ratios',
      'Ethical contract cleaner compliance with NCCA guidelines'
    ],
    recommendedRanges: ['floor-care', 'housekeeping', 'industrial', 'training', 'third-party'],
    clientTypes: ['Shopping Malls', 'Office Complexes', 'Government Campuses', 'Contract Cleaning Enterprises'],
    complianceRequirements: ['NCCA Membership Standards', 'SABS ISO 9001', 'BBBEE Procurement Credit'],
    statMetric: '135%',
    statLabel: 'BBBEE Procurement Recognition'
  },
  {
    id: 'mortuaries',
    title: 'Mortuaries & Funeral Homes',
    subtitle: 'Specialized heavy bio-decontamination, formaldehyderesistant sanitizers, and embalming hygiene.',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    keyChallenges: [
      'Decontaminating high-risk biological fluids & pathogens',
      'Neutralizing severe decomposition organic odors',
      'Protecting stainless steel dissection tables from pitting',
      'Ensuring staff safety during mortuary deep cleaning'
    ],
    recommendedRanges: ['covid-hygiene', 'industrial', 'housekeeping', 'pest-control'],
    clientTypes: ['Municipal Mortuaries', 'Private Funeral Parlors', 'Forensic Pathology Labs', 'Anatomy Faculties'],
    complianceRequirements: ['NRCS Registered Disinfectants', 'Hazardous Biological Agents Regulations'],
    statMetric: '100%',
    statLabel: 'Bio-Pathogen Neutralization Rate'
  },
  {
    id: 'automotive',
    title: 'Automotive & Motor Car Wash',
    subtitle: 'High-foaming wash shampoos, wheel degreasers, engine compartment gels, and interior conditioners.',
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80',
    keyChallenges: [
      'High foam stability for automatic pressure washer foam cannons',
      'Removing stubborn tar, road grime, and baked brake dust',
      'Paint-safe pH balanced formulations that protect clear coats',
      'Quick drying streak-free glass and tire shine finishing'
    ],
    recommendedRanges: ['automotive', 'industrial', 'eco-green'],
    clientTypes: ['Commercial Car Wash Bays', 'Auto Dealership Fleet Care', 'Logistics Depots', 'Detailing Centers'],
    complianceRequirements: ['SABS ISO 9001', 'Paint Safe Clear-Coat Compliance'],
    statMetric: '2x',
    statLabel: 'Faster Fleet Bay Cycle Speeds'
  },
  {
    id: 'institutional',
    title: 'Institutional & Schools',
    subtitle: 'Safe, affordable bulk hygiene for universities, schools, government departments, and correctional facilities.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    keyChallenges: [
      'Affordable bulk supply within strict public tender budgets',
      'Safe non-toxic cleaning chemicals for children & students',
      'Reliable local supply continuity from Limpopo manufacturing plant',
      'Comprehensive janitorial training for institutional staff'
    ],
    recommendedRanges: ['housekeeping', 'floor-care', 'training', 'kitchen'],
    clientTypes: ['Public & Private Schools', 'Universities', 'Government Ministries', 'Correctional Facilities'],
    complianceRequirements: ['SABS ISO 9001', 'NRCS Approved', 'Level 1 BBBEE Accredited'],
    statMetric: '15+',
    statLabel: 'Years Local Limpopo Government Trust'
  },
  {
    id: 'laundry-commercial',
    title: 'Commercial & Industrial Laundry',
    subtitle: 'High-yield enzymatic detergents, oxygen destainers, and auto-dosing systems for commercial laundries.',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80',
    keyChallenges: [
      'Removing difficult grease, oil, blood, and medical stains',
      'Optimizing water and thermal heating energy per wash cycle',
      'Preventing chemical degradation of linen fiber tensile strength',
      'Precise automated peristaltic pump dosing integration'
    ],
    recommendedRanges: ['laundry', 'industrial', 'training'],
    clientTypes: ['Commercial Laundry Plants', 'Hospital Linen Services', 'Hotel Laundries', 'Workwear Cleaners'],
    complianceRequirements: ['SABS ISO 9001', 'Industrial Laundry Fabric Tensile Clearance'],
    statMetric: '28%',
    statLabel: 'Average Wash Cycle Cost Saving'
  }
];
