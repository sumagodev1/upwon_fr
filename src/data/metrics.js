// Hero strip metrics (Brand Brief: 36,500+ users, ₹16Cr+, 50+ deployments, 10 states, 30-45 day go-live, 93% on-time)
export const HERO_METRICS = [
  { value: '50+', num: 50, prefix: '', suffix: '+', label: 'Enterprise Deployments' },
  { value: '36,500+', num: 36500, prefix: '', suffix: '+', label: 'Daily Active Users' },
  { value: '10', num: 10, prefix: '', suffix: '', label: 'States Across India' },
  { value: '₹16 Cr+', num: 16, prefix: '₹', suffix: ' Cr+', label: 'Daily Transactions Processed' },
];

export const TRUST_STRIP = [
  'No implementation risk — 93% on-time delivery',
  'Live in 30-45 days',
  '36,500+ daily users',
  '₹16Cr+ daily transactions',
];

// SCALE_METRICS — brief §1.6 Social Proof: 4 company-scale stats rendered on
// the homepage as the "are they established?" trust signal. Numbers must be
// honest and easily defensible — the brief warns aggressive rounding destroys
// trust faster than smaller numbers would. Each item has:
//   value     — display string (with "+" / "%" as needed)
//   numeric   — the count-up target (used by useCountUp hook)
//   suffix    — appended to the animated value
//   label     — primary headline
//   sub       — one-line context shown beneath the label
export const SCALE_METRICS = [
  {
    value: '150+',
    numeric: 150,
    suffix: '+',
    label: 'Businesses Deployed',
    sub: 'Across food, FMCG and franchise verticals',
  },
  {
    value: '7',
    numeric: 7,
    suffix: '',
    label: 'Enterprise Platforms',
    sub: 'ERP · SFA-DMS · FMS · POS · HRMS · WMS · Vendor Portal',
  },
  {
    value: '12+',
    numeric: 12,
    suffix: '+',
    label: 'Years Domain Expertise',
    sub: 'Inside India\'s food belt — 2016 to today',
  },
  {
    value: '98%',
    numeric: 98,
    suffix: '%',
    label: 'Customer Retention',
    sub: 'Yearly. Verified across deployed accounts.',
  },
];

export const RESULT_METRICS = [
  {
    value: '18%',
    label: 'Wastage Reduction',
    detail: 'Kaka Halwai, Pune — within 60 days',
  },
  {
    value: '40%',
    label: 'Faster Order Processing',
    detail: 'Across 50+ deployments',
  },
  {
    value: '3×',
    label: 'Outlet Expansion · Same Headcount',
    detail: 'Monginis — 35 to 200+ outlets',
  },
  {
    value: '48%',
    label: 'Reduction in Billing Time',
    detail: 'Kaka Halwai, Pune',
  },
  {
    value: '90%+',
    label: 'User Adoption Rate',
    detail: 'All deployments',
  },
  {
    value: '12 mo',
    label: 'Full ROI Payback',
    detail: 'vs 24-36 month industry average',
  },
];

export const USER_METRICS = [
  { value: '3,500+', label: 'ERP daily active users' },
  { value: '3,000+', label: 'Franchise ops users' },
  { value: '5,000+', label: 'Distribution ecosystem users' },
  { value: '25,000+', label: 'Workforce platform users' },
];

export const TRUST_LOGOS = [
  'Monginis',
  'Kaka Halwai',
  'U2 Cake',
  'U2 Burger',
  'Gokul',
  'Winni',
  'BrownBear',
  'Dairy Don',
  'CakeCarnival',
  'Mrs. Foodrite',
  'Mr. Puff',
  'Vatsalya Dairy',
  'Kekiz',
  'Fantasy Bakery',
  'Jolliz',
  'OFC',
];

export const DEPLOYED_CITIES = [
  'Sambhajinagar',
  'Baroda',
  'Nagpur',
  'Surat',
  'Patna',
  'Kolhapur',
  'Delhi',
  'Mumbai',
  'Pune',
  'Kolkata',
  'Ahmedabad',
  'Hyderabad',
  'Bhubaneshwar',
  'Lucknow',
  'Ranchi',
];

export const DEPLOYED_STATES = [
  'Maharashtra',
  'Gujarat',
  'Rajasthan',
  'West Bengal',
  'Bihar',
  'Odisha',
  'Telangana',
  'Karnataka',
  'Madhya Pradesh',
  'Delhi NCR',
];

// Integrations — each has a brand colour and (where a public mark exists)
// a simple-icons CDN logo URL. Consumers render the logo when present and
// fall back to coloured initials. Single source of truth used by both the
// homepage IntegrationsSection and the product-page integrations strip.
export const INTEGRATIONS = [
  // Food Delivery
  { name: 'Zomato',           category: 'Food Delivery', logo: 'https://cdn.simpleicons.org/zomato/E23744',     color: '#E23744' },
  { name: 'Swiggy',           category: 'Food Delivery', logo: 'https://cdn.simpleicons.org/swiggy/FC8019',     color: '#FC8019' },
  { name: 'ONDC',             category: 'Food Delivery', logo: null,                                            color: '#1A6E3A' },
  { name: 'Foodpanda',        category: 'Food Delivery', logo: 'https://cdn.simpleicons.org/foodpanda/D70F64', color: '#D70F64' },
  { name: 'Dunzo',            category: 'Food Delivery', logo: null,                                            color: '#00D290' },
  // Payments & PoS
  { name: 'Pine Labs',        category: 'Payments',      logo: null,                                            color: '#0F2C5A' },
  { name: 'Paytm',            category: 'Payments',      logo: 'https://cdn.simpleicons.org/paytm/00BAF2',     color: '#00BAF2' },
  { name: 'UPI',              category: 'Payments',      logo: null,                                            color: '#097939' },
  { name: 'PhonePe',          category: 'Payments',      logo: 'https://cdn.simpleicons.org/phonepe/5F259F',   color: '#5F259F' },
  { name: 'BharatPe',         category: 'Payments',      logo: null,                                            color: '#1D49A7' },
  { name: 'Google Pay',       category: 'Payments',      logo: 'https://cdn.simpleicons.org/googlepay/4285F4', color: '#4285F4' },
  // Accounting & ERP
  { name: 'SAP',              category: 'ERP',           logo: 'https://cdn.simpleicons.org/sap/0FAAFF',       color: '#0FAAFF' },
  { name: 'Tally',            category: 'ERP',           logo: null,                                            color: '#0F2C5A' },
  { name: 'Oracle',           category: 'ERP',           logo: 'https://cdn.simpleicons.org/oracle/F80000',    color: '#F80000' },
  { name: 'MS Dynamics',      category: 'ERP',           logo: 'https://cdn.simpleicons.org/microsoft/5E5E5E', color: '#5E5E5E' },
  { name: 'TCS iON',          category: 'ERP',           logo: null,                                            color: '#E31E24' },
  // Hardware & Ops
  { name: 'eSSL Biometric',   category: 'Hardware',      logo: null,                                            color: '#23295E' },
  { name: 'Epson Printers',   category: 'Hardware',      logo: 'https://cdn.simpleicons.org/epson/003399',     color: '#003399' },
  { name: 'Barcode Scanners', category: 'Hardware',      logo: null,                                            color: '#2D3870' },
  { name: 'CCTV Integration', category: 'Hardware',      logo: null,                                            color: '#1E2461' },
];

// Competitive comparison matrix from PM-001 §7.1
export const COMPETITORS = [
  {
    capability: 'Food vertical depth (native)',
    upwon: 5,
    sap: 3,
    netsuite: 3,
    odoo: 2,
    erpnext: 1,
    zoho: 1,
  },
  {
    capability: 'FSSAI compliance (native)',
    upwon: 5,
    sap: 0,
    netsuite: 0,
    odoo: 0,
    erpnext: 0,
    zoho: 0,
  },
  {
    capability: 'Indian statutory compliance',
    upwon: 5,
    sap: 2,
    netsuite: 2,
    odoo: 3,
    erpnext: 3,
    zoho: 4,
  },
  {
    capability: 'AI / demand forecasting',
    upwon: 4,
    sap: 3,
    netsuite: 3,
    odoo: 2,
    erpnext: 1,
    zoho: 1,
  },
  {
    capability: 'Implementation speed',
    upwon: 5,
    sap: 1,
    netsuite: 2,
    odoo: 3,
    erpnext: 3,
    zoho: 4,
  },
  {
    capability: 'SFA-DMS (India GT/MT model)',
    upwon: 5,
    sap: 0,
    netsuite: 0,
    odoo: 2,
    erpnext: 1,
    zoho: 0,
  },
  {
    capability: 'Franchise / outlet management',
    upwon: 5,
    sap: 0,
    netsuite: 0,
    odoo: 1,
    erpnext: 0,
    zoho: 0,
  },
  {
    capability: 'Indian pricing affordability',
    upwon: 5,
    sap: 1,
    netsuite: 1,
    odoo: 3,
    erpnext: 5,
    zoho: 4,
  },
  {
    capability: 'Enterprise scalability',
    upwon: 4,
    sap: 5,
    netsuite: 5,
    odoo: 3,
    erpnext: 3,
    zoho: 2,
  },
  {
    capability: 'Mobile-first SFA',
    upwon: 5,
    sap: 2,
    netsuite: 3,
    odoo: 3,
    erpnext: 2,
    zoho: 3,
  },
  {
    capability: 'Sub-vertical editions',
    upwon: 5,
    sap: 2,
    netsuite: 2,
    odoo: 1,
    erpnext: 0,
    zoho: 0,
  },
];

export const COMPETITOR_LABELS = ['UpWon', 'SAP B1', 'Oracle NetSuite', 'Odoo', 'ERPNext', 'Zoho Books'];
export const COMPETITOR_KEYS = ['upwon', 'sap', 'netsuite', 'odoo', 'erpnext', 'zoho'];

export const COMPETING_TOOLS = [
  'SAP',
  'Oracle',
  'Tally',
  'Microsoft Dynamics',
  'TCS iON',
  'Zoho ERP',
  'Busy',
  'Marg',
  'Epicor',
  'Odoo',
  'NetSuite',
  'QuickBooks',
];

// Brand Brief target customer segments (PM-001 §4.2)
export const SEGMENTS = [
  {
    name: 'Starter',
    revenue: '₹2–25 Crore',
    profile: 'Small-to-medium food manufacturer: bakeries, sweets, namkeen, dairy, spices, beverages',
    whyUpwon: 'Need FSSAI compliance, basic production planning, GST, basic DMS. UpWon Starter out-of-box.',
  },
  {
    name: 'Growth',
    revenue: '₹25–200 Crore',
    profile: 'Growing manufacturer scaling distribution: FMCG brands, ice cream, sauce, biscuit, snack brands',
    whyUpwon: 'Need SFA-DMS, demand forecasting, multi-plant, multi-depot. UpWon Growth + SFA + WMS.',
  },
  {
    name: 'Enterprise',
    revenue: '₹200 Crore+',
    profile: 'Large food conglomerates, regional/national FMCG brands with complex manufacturing and distribution',
    whyUpwon: 'Need SAP-grade depth without SAP pricing + 18-month implementation. UpWon Enterprise + AI.',
  },
  {
    name: 'GCC & Export',
    revenue: 'Any size',
    profile: 'Indian food manufacturers exporting to GCC (UAE, Saudi, Qatar) and Bangladesh',
    whyUpwon: 'Need multi-currency, customs, export compliance, Arabic UI. UpWon\'s GCC Edition (Year 2).',
  },
];
