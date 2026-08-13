import { Testimonial, FAQItem } from '../types';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-01',
    clientName: 'Ndivhuwo Nemudzivhadi',
    company: 'Vhembe Facilities Management',
    sector: 'Facilities Management',
    quote: 'Bold Bald Heads Chemicals provides top-class industrial degreasers and floor care polishes at prices that make commercial sense. Being a Level 1 BBBEE vendor with ISO 9001 quality makes our procurement score seamless.',
    rating: 5,
    location: 'Thohoyandou, Limpopo'
  },
  {
    id: 't-02',
    clientName: 'Grace Tshivhase',
    company: 'Savanah Luxury Hotel & Conference Center',
    sector: 'Hospitality',
    quote: 'Their housekeeping range and laundry bio-liquids keep our hotel linens brilliant white and smelling immaculate. Their on-site training for our cleaning team reduced chemical wastage by over 25%.',
    rating: 5,
    location: 'Polokwane, Limpopo'
  },
  {
    id: 't-03',
    clientName: 'Dumisani Khumalo',
    company: 'Northern Fleet Motor Car Wash',
    sector: 'Automotive',
    quote: 'The high-foam AutoShine shampoo and engine degreasers from BBH Chemicals transformed our wash bay turnover. The shine lasts and our clients keep coming back!',
    rating: 5,
    location: 'Makhado (Louis Trichardt)'
  },
  {
    id: 't-04',
    clientName: 'Sister P. Baloyi',
    company: 'Limpopo Community Health Center',
    sector: 'Healthcare',
    quote: 'Their NRCS registered disinfectants and COVID-19 fogging services give our healthcare workers and patients complete confidence. Excellent technical advice and fast delivery.',
    rating: 5,
    location: 'Giyani, Limpopo'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'Are all BBH chemical disinfectants registered with NRCS in South Africa?',
    answer: 'Yes! All BBH disinfectant formulations and sanitizers are officially registered with the National Regulator for Compulsory Specifications (NRCS) under compulsory specification VC8054. Safety Data Sheets (SDS) are provided with all orders.',
    category: 'Compliance'
  },
  {
    question: 'Does BBH Chemicals hold Halaal and Kosher certifications for food processing?',
    answer: 'Yes, our food processing, kitchen, and surface sanitization products hold official N.H.I.T Halaal certification and Kosher Kashrut clearance, as well as Intertek certification for direct and indirect food contact hygiene.',
    category: 'Compliance'
  },
  {
    question: 'What is BBH Chemical’s BBBEE empowerment rating?',
    answer: 'Bold Bald Heads Industrial & Speciality Chemicals (Pty) Ltd is a 100% Black-Owned, Level 1 BBBEE-accredited company. Procurement from us qualifies for 135% preferential procurement recognition.',
    category: 'Compliance'
  },
  {
    question: 'Can BBH Chemicals manufacture custom private-label chemicals for my company?',
    answer: 'Yes! Our Third-Party Contract Manufacturing division handles toll blending, custom chemical formulation, viscosity/scent matching, bottling, and custom label printing at our ISO 9001 certified plant in Limpopo.',
    category: 'Services'
  },
  {
    question: 'Do you offer on-site staff training and chemical dosage equipment?',
    answer: 'Yes. We provide on-site janitorial product knowledge training, chemical safety wall charts, and install automated dilution dispensers for long-term contract clients to guarantee optimal performance and prevent wastage.',
    category: 'Services'
  },
  {
    question: 'How does the automated quoting system work on this website?',
    answer: 'You can use our online Chemical Quote Estimator to choose your industry sector, select required product ranges or services, input facility metrics, and generate an instant itemized official quotation request for instant submission.',
    category: 'Ordering'
  }
];
