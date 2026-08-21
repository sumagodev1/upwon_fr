// ─────────────────────────────────────────────────────────────────────────────
// PLATFORM TOP 7 SECTORS
// Per-platform target-sector lists from the UpWon Platform-Sector Mapping
// workbook. Each platform's micro-site is supposed to surface its Top 7
// recommended sectors with strategic notes that match how the sales team
// positions UpWon to that buyer.
//
// Each entry: { name, summary, note, revenuePotential }
//   name     — sector label
//   summary  — 1-line use-case description (Business Description & Use Case col)
//   note     — strategic rationale (Strategic Notes for UpWon col)
//   revenuePotential — 'very-high' | 'high' | 'medium-high' | 'medium'
// ─────────────────────────────────────────────────────────────────────────────

import {
  Croissant,
  Milk,
  Sparkles,
  Coffee,
  Wheat,
  Soup,
  ShoppingBasket,
  Truck,
  Pill,
  Factory,
  Beer,
  Store,
  ChefHat,
  Building2,
  Hospital,
  GraduationCap,
  Briefcase,
  Snowflake,
  Package,
  Boxes,
  Code2,
  HardHat,
  Stethoscope,
  Wrench,
  CakeSlice,
  IceCream,
  UtensilsCrossed,
  Sprout,
} from 'lucide-react';

export const PLATFORM_TOP_SECTORS = {
  erp: [
    {
      name: 'Bakery & Confectionery',
      icon: Croissant,
      summary: 'Manufacturers, plant bakeries, artisan bakeries, cake-franchise production hubs',
      note: 'Core ICP — highest domain depth in UpWon ERP',
      revenuePotential: 'very-high',
    },
    {
      name: 'Dairy & Milk Processing',
      icon: Milk,
      summary: 'Milk chilling, pasteurisation, cheese, butter, ghee, flavoured milk, ice cream',
      note: 'Fat-content batch, FSSAI milk, cold chain — strong fit',
      revenuePotential: 'very-high',
    },
    {
      name: 'Sweets & Namkeen Mfg',
      icon: CakeSlice,
      summary: 'Mithai makers, namkeen plants, halwa manufacturers, festival sweet brands',
      note: 'Highly seasonal, recipe-based, FSSAI — exact fit',
      revenuePotential: 'high',
    },
    {
      name: 'Snacks & Extruded Products',
      icon: Soup,
      summary: 'Chips, wafers, puffed snacks, extruded snacks, popcorn, nachos',
      note: 'Short shelf-life, high SKU, seasonal — strong fit',
      revenuePotential: 'high',
    },
    {
      name: 'Beverages & Juices',
      icon: Coffee,
      summary: 'Fruit juices, nectars, energy drinks, flavoured water, syrups, concentrates',
      note: 'Batch, expiry, FSSAI, cold chain — good fit',
      revenuePotential: 'high',
    },
    {
      name: 'Spices & Masala',
      icon: Wheat,
      summary: 'Whole spices, ground masalas, blended masalas, spice extracts, condiments',
      note: 'Moisture content, FSSAI, export compliance — strong',
      revenuePotential: 'high',
    },
    {
      name: 'Formulation Pharma',
      icon: Pill,
      summary: 'Tablets, capsules, injectables, syrups, ointments — GMP manufacturing',
      note: 'FDA 21 CFR, WHO-GMP, batch records — very high ERP need',
      revenuePotential: 'very-high',
    },
  ],

  'sfa-dms': [
    {
      name: 'FMCG Food Brands Distribution',
      icon: ShoppingBasket,
      summary: 'Biscuits, snacks, noodles, sauces, oils — national/regional brand distribution',
      note: 'Highest-volume SFA market in India',
      revenuePotential: 'very-high',
    },
    {
      name: 'Dairy Route-to-Market',
      icon: Milk,
      summary: 'Milk, curd, butter, cheese, ghee — daily delivery, retailer beats, van sales',
      note: 'Daily beat cycle, cold chain, highly repetitive — perfect SFA',
      revenuePotential: 'very-high',
    },
    {
      name: 'Beverages Distribution',
      icon: Coffee,
      summary: 'Juices, soft drinks, energy drinks, water — GT/MT, horeca channel',
      note: 'High frequency, scheme-heavy, GT + MT mix',
      revenuePotential: 'high',
    },
    {
      name: 'Confectionery & Snacks Distribution',
      icon: CakeSlice,
      summary: 'Chocolate, candy, chips, biscuits — impulse category, wide retailer coverage',
      note: 'Wide beat, impulse visibility — SFA critical',
      revenuePotential: 'high',
    },
    {
      name: 'Spices & Staples Distribution',
      icon: Wheat,
      summary: 'Branded masalas, atta, pulses, oils — staples, tier 2/3 heavy',
      note: 'Deep GT rural distribution — SFA for retailer coverage',
      revenuePotential: 'high',
    },
    {
      name: 'Personal Care Distribution',
      icon: Sparkles,
      summary: 'Shampoo, soap, skin care, hair care — salon + GT + MT distribution',
      note: 'Scheme-heavy, promoter tracking — strong SFA fit',
      revenuePotential: 'high',
    },
    {
      name: 'Pharma Distributors / Stockists',
      icon: Pill,
      summary: 'Pharma C&F, stockists, MR call reporting — institutional + retail',
      note: 'Largest SFA market — 100,000+ MRs in India',
      revenuePotential: 'very-high',
    },
  ],

  'fms': [
    {
      name: 'Bakery-Café Franchise Chains',
      icon: Coffee,
      summary: 'Café bakery, artisan bread, patisserie chains with central kitchen',
      note: 'Highest UpWon FMS fit — core ICP',
      revenuePotential: 'very-high',
    },
    {
      name: 'QSR — Indian Food Chains',
      icon: UtensilsCrossed,
      summary: 'Biryani chains, dosa chains, thali formats, paratha chains',
      note: 'Fastest-growing India franchise format',
      revenuePotential: 'very-high',
    },
    {
      name: 'QSR — Global Fast Food (Indian ops)',
      icon: ChefHat,
      summary: 'Sub-franchisees of global QSR brands, licensed operators',
      note: 'Hub-spoke, strict SOP — strong FMS fit',
      revenuePotential: 'high',
    },
    {
      name: 'Sweet Shop Franchise (Mithai)',
      icon: CakeSlice,
      summary: 'Haldirams-style regional chains, mithai franchise networks',
      note: 'Seasonal peaks, central kitchen, recipe control',
      revenuePotential: 'high',
    },
    {
      name: 'Cloud Kitchen / Ghost Kitchen',
      icon: ChefHat,
      summary: 'Multi-brand dark kitchens, aggregator-first formats',
      note: 'Fastest-growing — multi-outlet control critical',
      revenuePotential: 'very-high',
    },
    {
      name: 'Ice Cream Parlour Chains',
      icon: IceCream,
      summary: 'Gelato, soft-serve, kulfi chains — franchise networks',
      note: 'Cold chain + hub-spoke + franchise',
      revenuePotential: 'medium-high',
    },
    {
      name: 'Snack & Street Food Franchise',
      icon: Soup,
      summary: 'Pani puri franchise, chaat chains, samosa brands, bhel',
      note: 'Very high India-specific franchise opportunity',
      revenuePotential: 'high',
    },
  ],

  pos: [
    {
      name: 'QSR — Fast Food Counters',
      icon: UtensilsCrossed,
      summary: 'Burger, pizza, biryani, fries counters — high volume, fast billing',
      note: 'KOT + loyalty + Swiggy/Zomato — perfect POS fit',
      revenuePotential: 'very-high',
    },
    {
      name: 'Bakery & Patisserie Retail',
      icon: Croissant,
      summary: 'Counter sales of breads, cakes, pastries — weight + unit billing',
      note: 'Core ICP — daily high transaction, loyalty, WhatsApp',
      revenuePotential: 'very-high',
    },
    {
      name: 'Sweet Shop Outlets (Mithai)',
      icon: CakeSlice,
      summary: 'Counter sales of sweets by weight — festive spikes, loyalty',
      note: 'Weight-based POS + festive promotions + loyalty',
      revenuePotential: 'very-high',
    },
    {
      name: 'Café & Coffee Shops',
      icon: Coffee,
      summary: 'Table service, counter service, custom orders — modifiers, loyalty',
      note: 'Menu customisation, loyalty, QR ordering — perfect',
      revenuePotential: 'high',
    },
    {
      name: 'Ice Cream & Dessert Counters',
      icon: IceCream,
      summary: 'Scoops, sundaes, custom desserts — combo billing',
      note: 'Flavour matrix billing + loyalty + WhatsApp alerts',
      revenuePotential: 'high',
    },
    {
      name: 'Casual & Fine Dining',
      icon: UtensilsCrossed,
      summary: 'Table service, KOT, split bills, valet — full POS',
      note: 'Full restaurant POS — table + kitchen + billing',
      revenuePotential: 'high',
    },
    {
      name: 'Pharmacy & Chemist Retail',
      icon: Pill,
      summary: 'Drug batch/expiry, GST, insurance — specialised POS',
      note: 'Regulatory POS + loyalty — large market',
      revenuePotential: 'very-high',
    },
  ],

  hrms: [
    {
      name: 'Food & Beverage Manufacturing',
      icon: Factory,
      summary: 'Factory workers, supervisors, QC staff, admin — all types',
      note: 'Core ICP — piecework + daily wage + salaried',
      revenuePotential: 'very-high',
    },
    {
      name: 'Pharmaceutical Manufacturing',
      icon: Pill,
      summary: 'GMP compliance for HR, licensed staff tracking, shift management',
      note: 'License tracking + shift + statutory = strong HRMS fit',
      revenuePotential: 'very-high',
    },
    {
      name: 'FMCG Manufacturing',
      icon: Building2,
      summary: 'Multi-plant, large field force, complex payroll structures',
      note: "Matches BETs' existing customer Monginis",
      revenuePotential: 'high',
    },
    {
      name: 'IT Services & Software',
      icon: Code2,
      summary: 'Flexi-time, remote work, ESOP, performance-linked pay',
      note: 'Large HRMS market — performance + payroll focus',
      revenuePotential: 'very-high',
    },
    {
      name: 'Hospitals & Nursing Homes',
      icon: Hospital,
      summary: 'Doctors, nurses, paramedics, admin — 3-shift operations',
      note: 'Shift HRMS + licensing compliance — high need',
      revenuePotential: 'very-high',
    },
    {
      name: 'Universities & Colleges',
      icon: GraduationCap,
      summary: 'Faculty, non-teaching, contractual — multiple salary types',
      note: 'Core target for HREasy education pitch',
      revenuePotential: 'high',
    },
    {
      name: 'Retail Chains & Supermarkets',
      icon: Store,
      summary: 'Store staff, part-time, seasonal, multi-location attendance',
      note: 'Geo-attendance + high-turnover payroll',
      revenuePotential: 'high',
    },
  ],

  wms: [
    {
      name: 'Food Manufacturing Warehouses',
      icon: Factory,
      summary: 'RM store, FG store, packaging store — FEFO, lot tracking',
      note: 'Core ICP — FEFO + FSSAI traceability critical',
      revenuePotential: 'very-high',
    },
    {
      name: 'FMCG Distribution Warehouses',
      icon: Boxes,
      summary: 'C&F godowns, super-stockist warehouses — multi-SKU',
      note: 'High SKU, daily dispatch — WMS ROI immediate',
      revenuePotential: 'very-high',
    },
    {
      name: 'Cold Chain Warehouses (Food)',
      icon: Snowflake,
      summary: 'Dairy, frozen food, fresh produce cold stores',
      note: 'Temperature log + FEFO + cold chain — premium WMS',
      revenuePotential: 'very-high',
    },
    {
      name: 'Pharmaceutical C&F Warehouses',
      icon: Pill,
      summary: 'WHO-GDP, cold chain, batch/lot, serialisation',
      note: 'Heavily regulated — WMS with compliance = strong fit',
      revenuePotential: 'very-high',
    },
    {
      name: '3PL Multi-Client Warehouses',
      icon: Truck,
      summary: 'Multi-client, multi-product WMS-as-a-service',
      note: 'Multi-client WMS — high recurring revenue',
      revenuePotential: 'very-high',
    },
    {
      name: 'E-commerce Fulfillment Centres',
      icon: Package,
      summary: 'Multi-channel picking, returns, wave picking',
      note: 'Fastest-growing WMS segment in India',
      revenuePotential: 'very-high',
    },
    {
      name: 'Auto & Engineering Parts Stores',
      icon: Wrench,
      summary: 'BIN management, kitting, kanban, JIT replenishment',
      note: 'Part proliferation + kitting = WMS complexity',
      revenuePotential: 'high',
    },
  ],

  'vendor-portal': [
    {
      name: 'Food & FMCG Manufacturers',
      icon: Factory,
      summary: 'RM suppliers, packaging, contract processors, lab services',
      note: '50–150 vendors, FSSAI qualification, COA management',
      revenuePotential: 'very-high',
    },
    {
      name: 'Pharmaceutical Manufacturers',
      icon: Pill,
      summary: 'API suppliers, excipient vendors, contract packagers — GMP approval',
      note: 'Most regulated vendor qualification in any industry',
      revenuePotential: 'very-high',
    },
    {
      name: 'IT Services Companies',
      icon: Code2,
      summary: 'Software vendors, hardware, cloud, freelancers — digital procurement',
      note: 'Expectation of digital vendor portals — natural fit',
      revenuePotential: 'high',
    },
    {
      name: 'Supermarket & Retail Chains',
      icon: Store,
      summary: 'FMCG brands as vendors, private label vendors — vendor onboarding',
      note: '100s of vendor SKUs, quality + delivery scorecards',
      revenuePotential: 'high',
    },
    {
      name: 'Real Estate Developers',
      icon: HardHat,
      summary: 'Sub-contractors, material vendors, MEP contractors',
      note: 'Very high vendor count — low digital maturity = opportunity',
      revenuePotential: 'very-high',
    },
    {
      name: 'Hospital Groups',
      icon: Stethoscope,
      summary: 'Drug vendors, equipment suppliers, housekeeping vendors',
      note: 'Drug vendor compliance + quality scorecards',
      revenuePotential: 'high',
    },
    {
      name: 'Engineering Manufacturers',
      icon: Sprout,
      summary: 'Component suppliers, tooling vendors, MRO vendors',
      note: 'Vendor-managed inventory, kanban, JIT supply',
      revenuePotential: 'high',
    },
  ],

  // Mobile Apps — not in the workbook as a standalone platform; cross-cuts
  // every product. Map to a representative set of high-fit verticals so the
  // page doesn't render empty.
  'mobile-apps': [
    {
      name: 'Food & Beverage Manufacturing',
      icon: Factory,
      summary: 'Plant supervisor app, QC checklist, shift handover',
      note: 'Companion mobility for every food-mfg ERP customer',
      revenuePotential: 'high',
    },
    {
      name: 'FMCG Distribution',
      icon: Truck,
      summary: 'Field salesman app, beat plan, secondary sales capture',
      note: 'Highest mobile-app adoption in any India sector',
      revenuePotential: 'very-high',
    },
    {
      name: 'QSR & Franchise Chains',
      icon: ChefHat,
      summary: 'Outlet manager app, KOT, audit, central-kitchen dashboard',
      note: 'Mobility critical for multi-outlet visibility',
      revenuePotential: 'high',
    },
    {
      name: 'Warehouse Operations',
      icon: Package,
      summary: 'Pick/pack on handheld, GRN with barcode, cycle count',
      note: 'Companion app for every WMS deployment',
      revenuePotential: 'high',
    },
    {
      name: 'Field Service',
      icon: Wrench,
      summary: 'Service ticket assignment, on-site photo + signature, parts consumption',
      note: 'Companion mobility for B2B service brands',
      revenuePotential: 'medium-high',
    },
    {
      name: 'Pharma Distribution',
      icon: Pill,
      summary: 'MR call reporting, doctor visit, sample tracking',
      note: 'Standard pharma SFA mobile-app pattern',
      revenuePotential: 'high',
    },
    {
      name: 'Retail Outlet Staff',
      icon: Store,
      summary: 'Attendance, leave, payslip, shift roster on mobile',
      note: 'HRMS companion app for retail chains',
      revenuePotential: 'medium-high',
    },
  ],
};

// Quick getter so the component layer stays terse.
export function getTopSectorsForPlatform(slug) {
  return PLATFORM_TOP_SECTORS[slug] || [];
}

// Friendly platform-level subtitle, also from the workbook — used as the
// section eyebrow when rendering Top 7 sectors per platform.
export const PLATFORM_SECTOR_PITCH = {
  erp: 'Built for these 7 manufacturing sectors',
  'sfa-dms': 'Built for these 7 distribution & field-sales sectors',
  'fms': 'Built for these 7 franchise & multi-outlet formats',
  pos: 'Built for these 7 retail & foodservice formats',
  hrms: 'Built for these 7 workforce-heavy sectors',
  wms: 'Built for these 7 warehouse profiles',
  'vendor-portal': 'Built for these 7 procurement-heavy sectors',
  'mobile-apps': 'Built for these 7 field-operations profiles',
};
