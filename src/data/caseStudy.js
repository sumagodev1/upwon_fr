export const MONGINIS_CASE = {
  id: 'monginis',
  slug: 'monginis',
  brand: 'Monginis',
  category: 'Bakery & Confectionery',
  location: 'Sambhajinagar',
  tagline: 'Flagship Bakery & Confectionery Brand',
  scale: '16 Plants · 200+ Outlets · 5,000+ Orders/Day',
  duration: '30-day go-live · multi-year scale partnership',
  // headline: 'How Monginis scaled from 35 to 200+ outlets — without growing their back-office team.',
  headline: '35 outlets to 200+. Same back-office team. Zero chaos.',
  challengeOneLine: 'Excel-based manual processing across 16 plants and growing franchise network.',
  hero: {
    challenge:
      'Excel-based manual processing, order consolidation issues, restricted ordering windows, and retail sales invisible to HQ — at a scale where every operational gap compounded into margin leakage.',
    transformation:
      'UpWon deployed FMS, OPS, POS together with Core ERP across every Monginis plant — unifying production, warehouse, distribution, franchise and HRMS on a single operational spine.',
  },
  challenges: [
    {
      title: 'Excel-based Manual Processing',
      desc: 'Order consolidation done on spreadsheets across plants, distributors and outlets — slow, error-prone, brittle.',
    },
    {
      title: 'Restricted Ordering Windows',
      desc: 'Franchise outlets could only place orders within tight windows, limiting growth and creating end-of-day chaos.',
    },
    {
      title: 'Retail Sales Invisibility',
      desc: 'No visibility into outlet-level sales, expiry, or sell-through. Replenishment ran on intuition, not data.',
    },
    {
      title: 'Inconsistent Outlet Operations',
      desc: 'SOPs varied outlet-to-outlet. Audit scoring was reactive rather than preventive.',
    },
    {
      title: 'Margin Leakage at Scale',
      desc: 'Expiry write-offs, manual errors and order drops compounded silently every month at 200+ outlets.',
    },
  ],
  whyUpwon:
    'Before UpWon, the team evaluated several global ERPs. SAP Business One was overkill on cost and timeline. Tally was incapable of franchise operations. Generic Odoo lacked food vertical depth. UpWon was chosen because it shipped with bakery-specific workflows, hub-spoke franchise model, and an India-native delivery commitment.',
  delivered: [
    { week: 'Week 1', title: 'Discovery & SOP mapping', detail: 'Mapped 18 plant-floor SOPs and 9 outlet workflows in 5 days.' },
    { week: 'Week 2-3', title: 'Configuration', detail: 'Core ERP, FMS, OPS, POS configured plant-by-plant.' },
    { week: 'Week 4', title: 'UAT + training', detail: '90%+ first-pass UAT clearance. Train-the-trainer for outlet managers.' },
    { week: 'Day 30', title: 'Go-live + 90-day hyper-care', detail: 'Plant-by-plant wave rollout with on-site SPOC. Zero P1 incidents.' },
    { week: 'Month 4+', title: 'Scale', detail: 'Rolled across 200+ outlets, 3 factories. Daily transactions crossed ₹20L.' },
  ],
  // outcomes: [
  //   { value: '35 → 200+', label: 'Outlets grown without adding headcount' },
  //   { value: '1 → 3', label: 'Factories expanded on UpWon' },
  //   { value: '₹20 L+', label: 'Daily transactions handled on platform' },
  //   { value: '16', label: 'Plants unified on one operational spine' },
  //   { value: '5,000+', label: 'Orders processed per day' },
  //   { value: 'Zero', label: 'P1 incidents during go-live' },
  // ],

  outcomes: [
    { value: '35 → 200+', label: 'Scaled without adding headcount' },
    { value: '1 → 3', label: 'Plants expanded, same platform' },
    { value: '₹20 L+', label: 'Daily transactions, fully automated' },
    { value: '16', label: 'Plants unified on one operational spine' },
    { value: '5,000+', label: 'Orders processed per day' },
    { value: 'Zero', label: 'P1 incidents during go-live' },
  ],
  timeline: [
    { week: 'Week 1', title: 'Discovery', detail: 'Walked plants and outlets. Mapped SOPs across production, dispatch and franchise.' },
    { week: 'Week 2-3', title: 'Configuration', detail: 'Modules wired across 16 plants. Master data migrated, integrations built.' },
    { week: 'Week 4', title: 'UAT & Training', detail: 'Operations leaders ran scenario UAT. Franchise audits trained on SOP playbooks.' },
    { week: 'Day 30', title: 'Go-Live', detail: 'Plant-by-plant wave rollout with on-site SPOC support. Zero P1 incidents.' },
    { week: 'Month 4+', title: 'Scale', detail: 'Rolled across 200+ outlets, 3 factories. Daily transactions crossed ₹20L.' },
  ],
  testimonial: {
    quote:
      'UpWon did not just replace software. It rebuilt how we run a bakery business at scale — one operational spine, one source of truth, one set of SOPs.',
    author: 'Operations Leadership',
    role: 'Monginis',
  },
};

export const KAKA_HALWAI_CASE = {
  id: 'kaka-halwai',
  slug: 'kaka-halwai',
  brand: 'Kaka Halwai',
  category: 'Sweets & Namkeen',
  location: 'Pune',
  tagline: 'Heritage Sweets Brand · 130 Years',
  scale: '25+ Outlets · 700+ Orders/Day · 5,000+ Invoices/Day',
  duration: '45-day go-live · 60-day full ROI',
  // headline: 'How a 130-year-old sweets brand reduced wastage by 18% in 60 days.',
  headline: '130 years of legacy. 18% less wastage in just 60 days',
  challengeOneLine: 'Multi-software stack across 3 plants with no batch traceability.',
  hero: {
    challenge:
      'Three plants running on three different software systems. Perishable goods management was manual. Recipe consistency drift. Billing time average 11 minutes per customer.',
    transformation:
      'Core ERP + FMS deployed across 3 integrated plants. Backward and forward integration of RM, semi-finished and finished goods. Counter POS with weight-based pricing.',
  },
  challenges: [
    {
      title: 'Multiple software systems',
      desc: 'Three plants on three platforms with manual reconciliation between them.',
    },
    {
      title: 'Perishable goods management',
      desc: 'FEFO not enforced. Expiry write-offs visible only at month-end.',
    },
    {
      title: 'Recipe consistency drift',
      desc: '130-year recipes managed in personal notebooks. Drift went unnoticed.',
    },
    {
      title: 'Counter POS chaos',
      desc: 'Festival rush + multi-SKU + weight-based pricing = billing bottleneck.',
    },
  ],
  whyUpwon:
    'The decision came down to UpWon\'s FEFO logic and counter POS specifically designed for sweets billing. SAP B1 was eliminated on cost and time. Tally was eliminated because counter billing was unworkable.',
  delivered: [
    { week: 'Week 1', title: 'Discovery', detail: 'Mapped 3 plant operations and 25 outlet workflows.' },
    { week: 'Week 2-4', title: 'Configuration', detail: 'ERP + FMS configured across all 3 plants. Counter POS deployed.' },
    { week: 'Week 5-6', title: 'UAT + training', detail: 'Counter staff trained on weight-based POS. Plant operators trained on FEFO.' },
    { week: 'Day 45', title: 'Go-live', detail: 'Phased plant rollout. Full integration achieved.' },
  ],
  // outcomes: [
  //   { value: '18%', label: 'Wastage reduction in 60 days' },
  //   { value: '48%', label: 'Billing time reduced' },
  //   { value: '3 plants', label: 'Backward & forward integrated' },
  //   { value: '5,000+', label: 'Invoices/day handled' },
  //   { value: '700+', label: 'Orders/day processed' },
  //   { value: '60 days', label: 'Full ROI realised' },
  // ],

  outcomes: [
    { value: '18%', label: 'Wastage reduction in 60 days.' },
    { value: '48%', label: 'Faster billing' },
    { value: '3 plants', label: 'Full supply chain integrated' },
    { value: '5,000+', label: 'Invoices/day handled' },
    { value: '700+', label: 'Orders/day processed' },
    { value: '60 days', label: 'Full ROI realised' },
  ],

  timeline: [
    { week: 'Week 1', title: 'Discovery', detail: '3 plant audits, 25 outlet workflows mapped.' },
    { week: 'Week 2-4', title: 'Configuration', detail: 'ERP + FMS across all 3 plants. POS deployed.' },
    { week: 'Week 5-6', title: 'UAT & Training', detail: 'Counter and plant staff trained.' },
    { week: 'Day 45', title: 'Go-Live', detail: 'Phased plant rollout completed.' },
  ],
  testimonial: {
    quote:
      'We have been running this business for 130 years. UpWon is the first system that finally speaks our language — sweet by sweet, counter by counter, plant by plant.',
    author: 'Plant Operations Head',
    role: 'Kaka Halwai',
  },
};

export const U2_CAKE_CASE = {
  id: 'u2-cake',
  slug: 'u2-cake',
  brand: 'U2 Cake & Burger',
  category: 'QSR & Franchise F&B',
  location: 'Mumbai',
  tagline: 'High-volume QSR & Bakery Franchise',
  scale: '250+ Outlets · 6,000+ Orders/Day · ₹23 L Daily Txns',
  duration: '30-day go-live · scale-ready architecture',
  // headline: 'Processing ₹23 lakh in daily transactions across 250+ outlets — on one screen.',
  headline: '₹23L in daily transactions. 250+ outlets. One screen.',
  challengeOneLine: 'High order drop rate, poor inventory visibility, tedious manual billing.',
  hero: {
    challenge:
      'Manual order consolidation across 250+ outlets. High order drop rate during peak. Poor inventory visibility across hub-spoke. Tedious billing operations. Blind spots in business at scale.',
    transformation:
      'FMS suite with cloud POS and advanced order management. Aggregator integration with Swiggy, Zomato, ONDC. Hub-spoke inventory allocation across all 250+ outlets.',
  },
  challenges: [
    {
      title: 'Manual order consolidation',
      desc: 'Each outlet placed orders independently — duplicated, dropped, mismatched.',
    },
    {
      title: 'Order drop rate',
      desc: 'High drop rate during peak windows because orders couldn\'t be processed fast enough.',
    },
    {
      title: 'Inventory blind spots',
      desc: 'Hub-spoke inventory tracking was reactive — gaps surfaced as outlet stockouts.',
    },
    {
      title: 'Tedious billing',
      desc: 'Manual billing slowed counters during peak. Customer experience suffered.',
    },
  ],
  whyUpwon:
    'UpWon FMS was the only platform that could handle 250+ outlets with native Swiggy/Zomato integration and cloud POS — without enterprise-grade pricing or 18-month timeline.',
  delivered: [
    { week: 'Week 1', title: 'Discovery', detail: 'Outlet operations audit, aggregator integration plan.' },
    { week: 'Week 2-3', title: 'Configuration', detail: 'FMS + POS + aggregator connectors built.' },
    { week: 'Week 4', title: 'UAT + training', detail: 'Outlet manager training, KDS rollout.' },
    { week: 'Day 30', title: 'Go-live', detail: 'Wave rollout across 250+ outlets with on-site SPOC.' },
  ],
  // outcomes: [
  //   { value: '₹23 L', label: 'Daily transactions on platform' },
  //   { value: '6,000+', label: 'Orders processed per day' },
  //   { value: '250+', label: 'Outlets unified' },
  //   { value: 'Live', label: 'Swiggy / Zomato / ONDC integrations' },
  //   { value: 'Cloud', label: 'POS deployed at every counter' },
  //   { value: 'Zero', label: 'Proportional staff growth at scale' },
  // ],

   outcomes: [
    { value: '₹23 L', label: 'Daily transactions on platform' },
    { value: '6,000+', label: 'Orders processed per day' },
    { value: '250+', label: 'Outlets unified' },
    { value: 'Live', label: 'Swiggy / Zomato / ONDC integrations' },
    { value: 'Cloud', label: 'POS deployed at every counter' },
    { value: 'Zero', label: 'Proportional staff growth at scale' },
  ],

  timeline: [
    { week: 'Week 1', title: 'Discovery', detail: 'Outlet audits, aggregator integration design.' },
    { week: 'Week 2-3', title: 'Configuration', detail: 'FMS + POS + connectors built.' },
    { week: 'Week 4', title: 'UAT & Training', detail: 'Outlet managers trained on FMS and POS.' },
    { week: 'Day 30', title: 'Go-Live', detail: 'Wave rollout with on-site SPOC support.' },
  ],
  testimonial: {
    quote:
      'We needed a system that could scale to 250 outlets without breaking — and that could integrate with Swiggy and Zomato natively. UpWon was the only platform that delivered both.',
    author: 'Franchise Operations',
    role: 'U2 Cake & Burger',
  },
};

export const ALL_CASES = [MONGINIS_CASE, KAKA_HALWAI_CASE, U2_CAKE_CASE];

export const OTHER_CASES = [
  {
    id: 'u2',
    brand: 'U2 Cake & Burger',
    location: 'Mumbai',
    scale: '250+ Outlets · 6,000+ Orders/Day · ₹23 L Daily Txns',
    challenge:
      'Manual order consolidation, high order drop rate, poor inventory visibility, tedious billing, blind spots in business.',
    solution: 'FMS suite with cloud POS and advanced order management.',
    outcomes: [
      'Rapid scaling without compromising quality',
      'Operational efficiency without proportional staff increase',
      'Streamlined advanced & special cake ordering',
      'Data-driven customer experience',
    ],
    tag: 'Franchise',
  },
  {
    id: 'kakahalwai',
    brand: 'Kaka Halwai',
    location: 'Pune',
    scale: '25+ Outlets · 700+ Orders/Day · 5,000+ Invoices/Day',
    challenge:
      'Multiple software systems, multi-plant integration gaps, perishable goods management, recipe consistency.',
    solution: 'Core ERP + FMS across 3 integrated plants.',
    outcomes: [
      'Total backward & forward integration of 3 plants',
      'Batch tracking of RM, semi-finished & finished goods',
      '18% wastage reduction achieved',
      'Billing time reduced by 48%',
    ],
    tag: 'Sweets',
  },
];
