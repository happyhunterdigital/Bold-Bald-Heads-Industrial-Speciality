import { Certification } from '../types';

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'bbbee',
    title: 'BB-BEE Level 1 Accredited',
    badgeCode: 'BBBEE-L1',
    issuingBody: 'Department of Trade, Industry and Competition (DTIC)',
    category: 'Empowerment',
    description: '100% Black-Owned, Level 1 BBBEE Company providing clients with 135% B-BBEE procurement recognition value for corporate supply chain transformation.',
    icon: 'Award',
    registrationDetails: 'Cert Ref: BBH-BBBEE-2026 / 100% Black Owned'
  },
  {
    id: 'iso9001',
    title: 'SABS ISO 9001 Manufacturing',
    badgeCode: 'ISO 9001:2015',
    issuingBody: 'South African Bureau of Standards (SABS) / ISO',
    category: 'Quality',
    description: 'All chemicals are manufactured, blended, and packaged strictly according to ISO 9001 quality management systems, guaranteeing batch-to-batch consistency.',
    icon: 'CheckCircle2',
    registrationDetails: 'Quality Standard: SABS ISO 9001 Certified Quality Control'
  },
  {
    id: 'nrcs',
    title: 'NRCS Registered Disinfectants',
    badgeCode: 'NRCS VC8054',
    issuingBody: 'National Regulator for Compulsory Specifications (NRCS)',
    category: 'Safety & Environment',
    description: 'All disinfectant formulations and sanitizers are registered with the NRCS under compulsory standard VC8054 for chemical disinfectants in South Africa.',
    icon: 'ShieldCheck',
    registrationDetails: 'Compulsory Specification Compliance: NRCS Act 5 of 2008'
  },
  {
    id: 'intertek',
    title: 'Intertek Food & Hygiene Certified',
    badgeCode: 'Intertek Food Safe',
    issuingBody: 'Intertek Testing Services',
    category: 'Safety & Environment',
    description: 'Certified detergents and disinfectant detergents explicitly approved for food processing plants, commercial kitchens, dairies, and hospitality food-prep environments.',
    icon: 'UtensilsCrossed',
    registrationDetails: 'Intertek Standard: Food Contact & Surface Sanitization Approval'
  },
  {
    id: 'halaal',
    title: 'N.H.I.T Halaal Certified',
    badgeCode: 'NHIT Halaal',
    issuingBody: 'National Halaal Independent Trust (N.H.I.T)',
    category: 'Religious & Cultural',
    description: 'Certified 100% Halaal compliant chemical formulations suitable for food manufacturing, abattoirs, meat processing facilities, and commercial kitchens.',
    icon: 'Sparkles',
    registrationDetails: 'Certification No: NHIT-BBH-88492'
  },
  {
    id: 'kosher',
    title: 'Kosher Kashrut Certified',
    badgeCode: 'Kosher Pareve',
    issuingBody: 'Kosher Kashrut Authority',
    category: 'Religious & Cultural',
    description: 'Certified Kosher compliant for food manufacturing lines, catering, and institutional food preparation adhering strictly to dietary law sanitation guidelines.',
    icon: 'Check',
    registrationDetails: 'Kosher Pareve Sanitation Clearance'
  },
  {
    id: 'ncca',
    title: 'NCCA Accredited Member',
    badgeCode: 'NCCA Member',
    issuingBody: 'National Contract Cleaners Association',
    category: 'Industry Body',
    description: 'Active member of the NCCA, upholding professional ethical standards, contract cleaning practices, and occupational health and safety protocols across South Africa.',
    icon: 'Building2',
    registrationDetails: 'NCCA Member ID: NCCA-ZA-1109'
  },
  {
    id: 'pcipc',
    title: 'PCIPC Registered Pest Control',
    badgeCode: 'PCIPC Operator',
    issuingBody: 'Pest Control Industries Professional Council',
    category: 'Industry Body',
    description: 'Fully certified and licensed pest control management technicians for structural pest elimination, fumigation, and vector management in commercial facilities.',
    icon: 'Bug',
    registrationDetails: 'Pest Control Professional License: PCIPC-P-2026'
  },
  {
    id: 'proudly-sa',
    title: 'Proudly South African Member',
    badgeCode: 'Proudly SA',
    issuingBody: 'Proudly South African Campaign',
    category: 'Empowerment',
    description: 'Official member of the Proudly South African campaign, supporting local manufacturing, employment creation in Limpopo, and premium local product development.',
    icon: 'Flag',
    registrationDetails: 'Member ID: PSA-BBH-LIMPOPO'
  }
];
