export const COMPANY = {
  brand: 'UpWon',
  fullName: 'UpWon Business Growth Suite',
  tagline: 'Outdo. Scale. Win.',
  positionLine: 'Built for Food. Proven for FMCG. Ready for everything that follows.',
  positioning: "India's enterprise suite for food manufacturers, FMCG companies and franchise networks",
  parent: 'Byte Elephants Technologies Pvt Ltd',
  parentTagline: 'Technology & Beyond',
  founded: '2016',
  team: 30,
  productCount: 7,
  hq: 'Nashik, Maharashtra',
  vision:
    'To become the world\'s most trusted ERP platform for Food & FMCG manufacturers globally.',
  mission:
    'We build deeply specialised, AI-powered ERP software for India\'s Food & FMCG manufacturing sector — and then for the world\'s.',
  founder: {
    name: 'Neil SR Mashalkar',
    role: 'Founder & CEO',
    // Content update (About Page SEO doc) — old quote:
    // 'Eight years ago, I started with one belief: that food businesses in India deserved software built specifically for them. Not retrofitted. Not generic. Purpose-built.',
    quote:
      'Food businesses in India deserve software built for them — not retrofitted, not generic. Purpose-built.',
  },
  contact: {
    email: 'hello@upwon.in',
    phone: '+91 93568 98277',
    whatsapp: '+919356898277',
    // Sticky-header sales number. Replace with the real UpWon toll-free
    // once provisioned — keep the dashed display format; the tel: link
    // strips non-digits at use site.
    tollFree: '1800-123-4567',
    tollFreeLabel: 'Sales',
    website: 'www.upwon.in',
    address: 'Nashik, Maharashtra, India',
  },
  // The 100-word Master Brand Statement (verbatim from brand brief)
  masterStatement:
    "UpWon is India's enterprise suite for food manufacturers, FMCG companies and franchise networks — built from the ground up for the specific complexity of how food businesses actually operate. Not a generic ERP with a food module. Not a system built for corporations with 18-month implementation budgets. A precisely engineered platform that goes live in 30 days, speaks the language of your operations, integrates with everything you already use and scales from your first plant to your fiftieth outlet without changing platforms. Built in Nashik. Running across 10 states. Processing ₹16 crore of business daily. This is what operational excellence looks like for Indian food and FMCG businesses that are serious about scale.",
  offices: [
    { city: 'Nashik', label: 'Headquarters', note: "Heart of India's food processing belt" },
    { city: 'Pune', label: 'Delivery Hub', note: 'Implementation & customer success' },
    { city: 'Mumbai', label: 'Client Office', note: 'Enterprise accounts & partnerships' },
  ],
  // The 3 concentric rings from brand strategy
  rings: [
    {
      label: 'Core',
      title: 'Primary Authority',
      desc: 'Food Manufacturing and Food Processing — UpWon\'s deepest expertise.',
      items: [
        'Bakery & Confectionery',
        'Dairy & Milk Processing',
        'Sweets & Namkeen',
        'Spices & Agro',
        'Snacks & Ready-to-Eat',
        'Beverages & Juices',
        'Ice Cream & Frozen',
        'Food Processing & Packaging',
        'QSR & Franchise F&B',
        'Bakery Cake Franchise Chains',
      ],
    },
    {
      label: 'Extension',
      title: 'Secondary Authority',
      desc: 'Food FMCG Distribution and Commercial Operations.',
      items: [
        'Branded Food FMCG',
        'Regional brands going national',
        'FMCG Distribution Networks',
        'GT/MT Operations',
        'Cold Chain & Perishable',
        'Private Label Manufacturers',
        'Co-packing & Contract Mfg',
      ],
    },
    {
      label: 'Expansion',
      title: 'Emerging Authority',
      desc: 'Non-Food FMCG — SFA, DMS, WMS apply without modification.',
      items: [
        'Personal Care & Beauty',
        'Home Care & Cleaning',
        'Health & Wellness OTC',
        'Pharma OTC',
        'Stationery & Consumer Durables',
        'Agricultural Input FMCG',
      ],
    },
  ],
  // 5 product pillars (from PM-001 §3.3)
  pillars: [
    {
      no: '01',
      title: 'Vertical Intelligence',
      desc: 'Built for food. Every workflow speaks food manufacturing language.',
    },
    {
      no: '02',
      title: 'Compliance Native',
      desc: 'FSSAI, GST, e-Invoice, FMCG regulations — built in, not bolted on.',
    },
    {
      no: '03',
      title: 'AI-Powered Insights',
      desc: 'Demand forecasting, NL Copilot, quality alerts — intelligence at every step.',
    },
    {
      no: '04',
      title: 'Integrated Ecosystem',
      desc: 'ERP + SFA + FMS + HR + WMS + Vendor + Mobile — one platform, one truth.',
    },
    {
      no: '05',
      title: 'India Price, Global Grade',
      desc: 'SAP B1 depth. ERPNext speed. Indian pricing. Zero compromise.',
    },
  ],
};

// 6 storylines from brand strategy — different entry points to the same truth
export const STORYLINES = {
  ambition: {
    forWhom: 'Founders and business owners who are growth-oriented',
    hero: 'Your brand was built to scale. Now build the system that scales with it.',
    arc: 'You did not build this business to stay small. The ambition was always bigger. The constraint was never your product — it was the systems underneath.',
  },
  legacy: {
    forWhom: 'Family businesses, heritage brands, multi-generational food companies',
    hero: 'Your recipe took generations to perfect. Your operations should be too.',
    arc: 'You inherited something extraordinary. The question is whether your systems are worthy of your legacy.',
  },
  control: {
    forWhom: 'Operators who feel their business is running ahead of their visibility',
    hero: 'You built the business. UpWon lets you run it.',
    arc: 'Decisions that should take minutes take days because the data is in three different places. UpWon gives you one place where everything is visible.',
  },
  precision: {
    forWhom: 'Operations leaders focused on efficiency, waste, margin',
    hero: 'In food, precision is profit. UpWon is precision.',
    arc: 'Every percentage point of wastage is profit walking out of your factory. Kaka Halwai reduced wastage by 18% in 60 days.',
  },
  scale: {
    forWhom: 'Franchise networks, multi-outlet brands, geographic expansion',
    hero: 'The 200th outlet should be as easy to run as the first. UpWon makes it so.',
    arc: 'Monginis went from 35 outlets to 200 without growing their back-office team. That is not a coincidence — it is a system.',
  },
  sovereignty: {
    forWhom: 'Premium positioning — control over business destiny',
    hero: 'Outdo. Scale. Win.',
    arc: 'Outdo your competition. Scale without proportional complexity. Win in your category, your market, your decade.',
  },
};

export const GLOBAL_MARKETS = [
  {
    region: 'Phase 1 · Fortress India',
    period: '2026–27',
    status: 'Active',
    statusColor: 'orange',
    detail: 'Maharashtra, Gujarat, Bihar, Delhi-NCR, Karnataka — 65%+ of India\'s food manufacturing output.',
  },
  {
    region: 'Phase 2 · Pan-India',
    period: '2027–28',
    status: 'Planned',
    statusColor: 'amber',
    detail: 'UP, Tamil Nadu, West Bengal, Punjab, Rajasthan. Food clusters: Indore, Hyderabad, Chennai, Amritsar.',
  },
  {
    region: 'Phase 3 · GCC & South Asia',
    period: '2028–30',
    status: 'In Conversation',
    statusColor: 'amber',
    detail: 'UAE, Saudi Arabia, Qatar. Bangladesh. GCC-specific edition with Arabic UI and customs compliance.',
  },
  {
    region: 'Phase 4 · Southeast Asia',
    period: '2030+',
    status: 'Roadmap',
    statusColor: 'slate',
    detail: 'Malaysia, Singapore, Indonesia — ASEAN food manufacturing opportunity.',
  },
];

export const GLOBAL_READINESS = [
  {
    title: 'Multi-Currency & Multi-Language',
    desc: 'Platform supports multiple currencies, languages and regional tax structures for cross-border operations.',
  },
  {
    title: 'Cloud-First Architecture',
    desc: 'Cloud-native delivery — teams in Dubai, London or Singapore access the same realtime data as Nashik.',
  },
  {
    title: 'F&B Expertise Is Universal',
    desc: 'Batch traceability, franchise management, distribution control — universal challenges in every geography.',
  },
  {
    title: 'API-First for Global Integrations',
    desc: 'Ready for global payment, logistics, and marketplace platforms — Shopify, Amazon, FedEx, Stripe and more.',
  },
];
