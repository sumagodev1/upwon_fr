import {
  Croissant,
  Milk,
  ShoppingBasket,
  UtensilsCrossed,
  Coffee,
  Wheat,
  CakeSlice,
  Soup,
  Sparkles,
  Settings,
} from 'lucide-react';

// Hero photos per industry id — used by the homepage & industries page cards
export const INDUSTRY_IMAGES = {
  bakery:
    'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=900&q=70',
  dairy:
    'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=70',
  fmcg:
    'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=900&q=70',
  qsr:
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=70',
  sweets:
    'https://images.unsplash.com/photo-1605197788044-5d1cc4f81d97?auto=format&fit=crop&w=900&q=70',
  spices:
    'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=900&q=70',
  'food-processing':
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=70',
  beverages:
    'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=70',
  'non-food-fmcg':
    'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=900&q=70',
  engineering:
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=70',
};

export const INDUSTRY_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=70';

// 10 industries — first 8 are food sub-verticals, 9-10 are non-food extensions
export const INDUSTRIES = [
  {
    id: 'bakery',
    slug: 'bakery',
    icon: Croissant,
    name: 'Bakery & Confectionery',
    tag: 'Featured',
    code: 'SV-01',
    // insiderHero (previous): 'You bake the cake. We run the bakery.',
    insiderHero: 'Bakery & confectionery ERP — you bake the cake, we run the bakery.',
    insiderPain: '4 challenges we hear from every bakery owner',
    // description (previous):
    //   'Recipe-driven production, expiry-sensitive distribution, and franchise outlet operations engineered for high-SKU bakery chains.',
    description:
      'Recipe-driven production, expiry-sensitive distribution and franchise outlet operations engineered for high-SKU bakery chains.',
    seoTitle: 'Bakery & Confectionery ERP Software | UpWon',
    metaDescription:
      'Food-first ERP for bakery & confectionery chains — recipe costing, FEFO expiry control, FSSAI compliance and outlet POS. Cut wastage 15–20%. Book a free demo.',
    intro:
      'One platform for production, FEFO dispatch, outlet POS and FSSAI compliance — purpose-built for bakeries running multiple plants and outlets.',
    proof:
      'Multi-outlet bakery (Pune): 20% less raw-material wastage, 100% recipe standardisation, FSSAI batch trace in under 2 minutes.',
    // pains: [
    //   { title: 'Wastage you cannot see', desc: 'Daily wastage runs 15-20% across batch, dispatch and shelf — invisible until month-end.' },
    //   { title: 'Cake orders on WhatsApp', desc: 'Custom and special cake orders go through chats, get lost, get duplicated.' },
    //   { title: 'Outlet billing chaos', desc: 'Counter staff handle Excel + manual + POS — reconciliation eats hours every evening.' },
    //   { title: 'Franchise inconsistency', desc: 'Every outlet operates its own SOPs. Brand consistency runs on goodwill.' },
    //   { title: 'Seasonal demand swings', desc: 'Wedding-week + festival peaks spike orders 3-5× — planning runs on memory, not data.' },
    // ],

    pains: [
      { title: 'Invisible wastage ', desc: '15–20% daily across batch, dispatch and shelf, unseen until month-end.' },
      { title: 'Cake orders on WhatsApp ', desc: 'Custom orders get lost or duplicated in chats.' },
      { title: 'Outlet billing chaos ', desc: 'Excel + manual + POS; evenings lost to reconciliation.' },
      { title: 'Franchise inconsistency ', desc: 'Every outlet runs its own SOPs.' },
      { title: 'Seasonal swings', desc: 'Wedding and festival peaks spike orders 3–5×, planned from memory.' },
    ],
    // capabilities: [
    //   'Recipe & Formulation with ingredient substitution',
    //   'Shelf-life and expiry tracking (FEFO)',
    //   'Batch-level traceability for food safety recalls',
    //   'Bulk ingredient procurement and wastage tracking',
    //   'Sugar, maida, ghee commodity price hedging alerts',
    //   'FSSAI license-wise production compliance',
    //   'Retail + distributor + quick-commerce dispatch from one screen',
    // ],

    // capabilities (previous):
    // capabilities: [
    //   'Recipe & formulation with ingredient substitution and live cost impact.',
    //   'Shelf-life and expiry tracking with FEFO dispatch.',
    //   'Batch-level traceability for food-safety recalls.',
    //   'Bulk ingredient procurement and wastage tracking',
    //   'Sugar, maida, ghee commodity price hedging alerts',
    //   'FSSAI license-wise production compliance',
    //   'Retail, distributor and quick-commerce dispatch from one screen.',
    // ],
    capabilities: [
      'Recipe & formulation with ingredient substitution and live cost impact.',
      'Shelf-life and expiry tracking with FEFO dispatch.',
      'Batch-level traceability for food-safety recalls.',
      'Bulk procurement with wastage tracking and commodity alerts (sugar, maida, ghee).',
      'FSSAI licence-wise production compliance.',
      'Retail, distributor and quick-commerce dispatch from one screen.',
    ],

    metrics: [
      { label: 'Wastage reduction', value: '15–20%' },
      { label: 'Outlets on UpWon', value: '500+' },
      { label: 'Billing time reduced', value: '48%' },
    ],
    workflows: [
      'Recipe & batch consistency',
      'Shelf-life & expiry control',
      'Franchise order management',
      'Perishable wastage control',
    ],
    suites: { erp: 3, sfa: 3, pos: 3, hrms: 2, wms: 3 },
    relevantPlatforms: ['erp', 'fms', 'wms', 'mobile'],
    featuredClient: 'Monginis',
  },
  {
    id: 'dairy',
    slug: 'dairy',
    icon: Milk,
    name: 'Dairy & Ice Cream',
    tag: 'Vertical',
    code: 'SV-02',
    // insiderHero (previous): 'Cold chain. Fat percentages. Short shelf lives. We get it.',
    insiderHero: 'Dairy & ice cream ERP — cold chain, fat percentages, short shelf lives.',
    insiderPain: '4 challenges we hear from every dairy operator',
    // description (previous):
    //   'Procurement-to-pack milk operations with chilling centre integration, fat-% control, route-level traceability, and FEFO dispatch.',
    description:
      'Procurement-to-pack milk operations with chilling-centre integration, fat-% control, route-level traceability and FEFO dispatch.',
    seoTitle: 'Dairy & Ice Cream ERP Software | UpWon',
    metaDescription:
      'Dairy & ice cream ERP — fat/SNF control, chilling-centre traceability, cold-chain alerts and FEFO dispatch. Pre-configured, live in 30–45 days. Book a free demo.',
    intro:
      'From raw-milk reception to FEFO dispatch — fat/SNF control, cold-chain compliance and co-operative procurement on one platform, pre-configured for dairy.',
    proof:
      'Dairy processor: near-expiry write-offs cut from 4% to 0.6%, 99.4% inventory accuracy, 100% FSSAI returns filed on time.',
    // pains (previous):
    // pains: [
    //   { title: 'Fat / SNF variation invisible', desc: 'Quality parameters tracked on paper, blended on intuition.' },
    //   { title: 'Cold chain breaks unrecorded', desc: 'Temperature deviations between plant and depot go unnoticed.' },
    //   { title: 'Returns at route level', desc: 'Return milk handling absorbs margin without visibility.' },
    //   { title: 'Procurement pricing volatility', desc: 'Seasonal fat variation in farmer pricing is impossible to model.' },
    //   { title: 'Short shelf-life dispatch errors', desc: 'Non-FEFO picks ship near-expiry SKUs to outlets — freshness complaints and 3-5% write-offs every week.' },
    // ],
    pains: [
      { title: 'Fat/SNF variation invisible', desc: 'Quality tracked on paper, blended on intuition.' },
      { title: 'Cold-chain breaks unrecorded', desc: 'Plant-to-depot temperature deviations go unnoticed.' },
      { title: 'Route-level returns', desc: 'Return-milk handling absorbs margin without visibility.' },
      { title: 'Procurement volatility', desc: 'Seasonal fat-based farmer pricing is hard to model.' },
      { title: 'Dispatch errors', desc: 'Non-FEFO picks ship near-expiry SKUs, driving 3–5% weekly write-offs.' },
    ],
    // capabilities (previous):
    // capabilities: [
    //   'Fat % / SNF % capture per intake — Gerber, Milko-Tester, MBRT, COB-test results logged per batch',
    //   'RMRD (Raw Milk Reception Dock) to BMC (Bulk Milk Cooler) to chilling centre to plant traceability',
    //   'Toned, Double-Toned, Standardised, Full Cream, Skimmed milk grade-wise SKU management',
    //   'HTST and UHT pasteurisation batch records, homogenisation logs, Tetra Pak / aseptic fill compliance',
    //   'CIP (Cleaning In Place) cycle scheduling, GHP/GMP/HACCP audit trail, FSSAI dairy returns',
    //   'Cold chain compliance — vehicle temperature logger integration, breach alerts, route-level traceability',
    //   'Co-operative model support — DCS / village dairy society / federation hierarchies (Amul / GCMMF style)',
    //   'Ghee, paneer (incl. MAP paneer), curd, lassi, SMP / WMP, ice cream (overrun % tracking) — full product range',
    //   'Breed-wise (Gir, Sahiwal, A2) farmer procurement with seasonal flush vs lean pricing',
    //   'Short shelf-life FEFO dispatch enforced — pasteurisation timestamp drives oldest-first',
    // ],
    capabilities: [
      'Fat % / SNF capture per intake (Gerber, MBRT, COB) logged per batch.',
      'Reception-dock to chilling-centre to plant traceability, grade-wise SKU management.',
      'HTST / UHT pasteurisation and CIP records with GMP/HACCP/FSSAI audit trail.',
      'Cold-chain compliance — vehicle temperature loggers, breach alerts, route-level traceability.',
      'Co-operative / DCS / federation hierarchy support and breed-wise farmer procurement.',
      'Short-shelf-life FEFO dispatch driven by the pasteurisation timestamp.',
    ],
    metrics: [
      { label: 'Higher fulfilment accuracy', value: '20–35%' },
      { label: 'Procurement centres', value: '120+' },
      { label: 'Route delivery accuracy', value: '99.4%' },
    ],
    workflows: [
      'Cold chain visibility',
      'Fat % & quality batches',
      'Multi-route milk collection',
      'Seasonal production planning',
    ],
    suites: { erp: 3, sfa: 2, pos: 2, hrms: 2, wms: 3 },
    relevantPlatforms: ['erp', 'wms', 'sfa-dms', 'mobile'],
    featuredClient: 'Vatsalya Dairy',
  },
  {
    id: 'fmcg',
    slug: 'fmcg-distribution',
    icon: ShoppingBasket,
    name: 'FMCG Distribution',
    tag: 'Distribution',
    code: 'SV-08',
    // insiderHero (previous): 'Sell-in is what you bill. Sell-out is what you win.',
    insiderHero: 'FMCG distribution software — sell-in is what you bill, sell-out is what you win.',
    insiderPain: '4 challenges we hear from every FMCG distribution head',
    // description (previous):
    //   'Closed-loop primary and secondary sales with secondary visibility, scheme leakage control, beat optimisation and distributor credit management.',
    description:
      'Closed-loop primary and secondary sales with secondary visibility, scheme-leakage control, beat optimisation and distributor credit management.',
    seoTitle: 'FMCG Distribution Management Software | UpWon',
    metaDescription:
      'FMCG distribution software — closed-loop secondary sales, scheme-leakage control, beat productivity and distributor credit. Live in 30–45 days. Book a free demo.',
    intro:
      'Closed-loop primary-to-secondary visibility, automated trade schemes and beat productivity on one platform — built for FMCG brands and distributors.',
    proof:
      'FMCG distributor: 40% more productive salesman calls, zero scheme disputes since go-live, same-day secondary-sales visibility at NSM level.',
    // pains (previous):
    // pains: [
    //   { title: 'Secondary sales blindspot', desc: 'You sell to distributors. You guess at outlet sell-through.' },
    //   { title: 'Scheme leakage', desc: 'Trade schemes calculated manually — settlement takes weeks, errors compound.' },
    //   { title: 'Beat productivity unknown', desc: 'Field force runs on memory. PJP compliance is reported, not measured.' },
    //   { title: 'Distributor credit risk', desc: 'Credit limits, ageing and recovery managed in disconnected Excel sheets.' },
    //   { title: 'WhatsApp + Tally + Excel', desc: 'Salesman orders on WhatsApp, stock on Tally, claims on Excel — and your team reconciles every Sunday.' },
    // ],
    pains: [
      { title: 'Secondary-sales blindspot', desc: 'You sell to distributors and guess at outlet sell-through.' },
      { title: 'Scheme leakage', desc: 'Schemes calculated manually; settlement takes weeks and errors compound.' },
      { title: 'Beat productivity unknown', desc: 'PJP compliance is reported, not measured.' },
      { title: 'Distributor credit risk', desc: 'Limits, ageing and recovery live in disconnected Excel.' },
      { title: 'WhatsApp + Tally + Excel', desc: 'Orders, stock and claims split across three tools, reconciled every Sunday.' },
    ],
    // capabilities (previous):
    // capabilities: [
    //   'GT (General Trade) + MT (Modern Trade) multi-principal stock and CPG SKU management',
    //   'Trade Margin, MRP, PTR (Price to Retailer), PTS (Price to Stockist), PTC (Price to Chemist) per brand',
    //   'Wet Scheme, Dry Scheme, QPS, Slabbed Scheme, Pull & Push Strategy — auto-calculated, leakage flagged',
    //   'Beat / PJP execution, Productive Call ratio, Beat Productivity, Outlet Universe & Coverage tracking',
    //   'Numeric Distribution, Weighted Distribution, Depth of Distribution, Range Selling, Facing audit',
    //   'POSM (Point of Sale Materials), Planogram compliance, Visicooler / merchandiser audit',
    //   'Primary, Secondary, Tertiary Sales visibility with Offtake — closed-loop sell-in vs sell-out',
    //   'Van Sales / Pre-sell / Ready-stock SFA with DSR (Daily Sales Report), DPL, JBP, KRA tracking',
    //   'AOV (Average Order Value), LPC (Lines Per Call), Drop Size, ECO (Effective Coverage Outlets) KPIs',
    //   'MT credit/debit notes, promotional claim, scheme settlement, distributor credit & ROI management',
    // ],
    capabilities: [
      'GT + MT multi-principal stock and SKU management with PTR / PTS / PTC pricing.',
      'Auto-calculated trade schemes (wet, dry, QPS, slab) with leakage flagged.',
      'Beat / PJP execution, productive-call ratio and outlet-coverage tracking.',
      'Numeric & weighted distribution, planogram and visicooler audits.',
      'Closed-loop primary / secondary / tertiary sales visibility with offtake.',
      'Distributor credit, ageing, ROI and scheme-settlement management.',
    ],
    metrics: [
      { label: 'Faster order processing', value: '40%' },
      { label: 'Operational leakage cut', value: '50–80%' },
      { label: 'Higher distributor fill rates', value: '40%' },
    ],
    workflows: [
      'Secondary sales visibility',
      'Scheme leakage control',
      'Beat & route optimisation',
      'Distributor credit management',
    ],
    suites: { erp: 2, sfa: 3, pos: 1, hrms: 3, wms: 3 },
    relevantPlatforms: ['sfa-dms', 'erp', 'wms', 'mobile'],
    featuredClient: 'Multi-brand FMCG distributor network',
  },
  {
    id: 'qsr',
    slug: 'qsr-franchise',
    icon: UtensilsCrossed,
    name: 'QSR & Franchise F&B',
    tag: 'Franchise',
    code: 'SV-04',
    // insiderHero (previous): 'The 200th outlet should be as easy to run as the first.',
    insiderHero: 'QSR & franchise software — the 200th outlet as easy to run as the first.',
    insiderPain: '4 challenges we hear from every QSR franchise head',
    description:
      'SOP enforcement across hundreds of outlets, KOT and POS integration, royalty management and central production visibility for QSR networks.',
    seoTitle: 'QSR & Franchise Management Software | UpWon',
    metaDescription:
      'QSR & franchise software — SOP enforcement, KOT/POS, Swiggy/Zomato/ONDC and royalty management across hundreds of outlets. Live in 30–45 days. Book a free demo.',
    intro:
      'Cloud POS, aggregator reconciliation, central-kitchen visibility and POS-driven royalty on one platform — built to scale QSR and franchise networks.',
    proof:
      'QSR network: 100% live outlet-order visibility, 22% less kitchen wastage, royalty settlement cut from 3 days to 3 hours.',
    // pains (previous):
    // pains: [
    //   { title: 'Aggregator reconciliation', desc: 'Swiggy, Zomato, ONDC — each with their own statement, all reconciled manually.' },
    //   { title: 'Royalty calculation', desc: 'Franchise royalties depend on accurate POS data — which is often disputed.' },
    //   { title: 'SOP drift', desc: 'Outlet number 5 follows the SOP. Outlet number 150 has invented its own.' },
    //   { title: 'Central kitchen visibility', desc: 'Outlets order. Hub fulfils. Nobody sees the gap until it shows up as wastage.' },
    //   { title: 'Recipe inconsistency at outlets', desc: 'Same dish, different taste in each city. Customer-experience drift is invisible until reviews surface.' },
    // ],
    pains: [
      { title: 'Aggregator reconciliation', desc: 'Swiggy, Zomato and ONDC statements reconciled by hand.' },
      { title: 'Royalty disputes', desc: 'Franchise royalties hinge on POS data that’s often contested.' },
      { title: 'SOP drift', desc: 'Outlet 5 follows the SOP; outlet 150 invented its own.' },
      { title: 'Central-kitchen blind spots', desc: 'The outlet-to-hub gap shows up only as wastage.' },
      { title: 'Recipe inconsistency', desc: 'The same dish tastes different city to city.' },
    ],
    // capabilities (previous):
    // capabilities: [
    //   'QSR / CDR / FDR / FSR outlet onboarding with ops & HACCP compliance',
    //   'Cloud POS with multi-tender + KDS, KOT (Kitchen Order Ticket) routing, Table Turns / Dwell Time analytics',
    //   'Aggregator integration — Swiggy / Zomato / ONDC / Dark Store / 3PO with self-delivery option',
    //   'Central Kitchen (CK) / Commissary, Hub-Spoke dispatch, Cloud / Ghost Kitchen, Multi-Brand CK support',
    //   'Recipe Card, Portion Control, Menu Engineering (Stars / Plowhorses / Puzzles / Dogs) — margin tooling',
    //   'COGS, Food Cost %, Labour Cost %, EBITDA %, Four-Walls Profitability, Revenue per Sq Ft tracking',
    //   'Covers, AUV (Avg Unit Volume), ASP (Avg Selling Price), ATC (Avg Transaction Count), Throughput KPIs',
    //   'CSAT, NPS, Customer Repeat Rate capture via QR / aggregator / loyalty app',
    //   'FSSAI / FoSCoS licensing, HACCP, 5S, GMP, FIFO / Par Level / Wastage % control, Cold Chain integrity',
    //   'Royalty %, CAM, Franchise Disclosure Document (FDD), Zonal Manager SOP & audit scoring',
    //   'FLTO (cost per Full-Time Labour Output), OEE for CK kitchen equipment, Recipe Adherence %',
    // ],
    capabilities: [
      'Cloud POS with multi-tender, KOT routing, KDS and table-turn analytics.',
      'Aggregator integration — Swiggy, Zomato, ONDC, dark store and self-delivery.',
      'Central kitchen / commissary and hub-spoke dispatch, multi-brand CK support.',
      'Recipe cards, portion control and menu engineering for margin.',
      'Outlet SOP enforcement, zonal audit scoring and HACCP/FSSAI compliance.',
      'POS-driven royalty %, CAM and franchise-disclosure management — dispute-free.',
    ],
    metrics: [
      { label: 'Outlets unified', value: '700+' },
      { label: 'Aggregator integrations', value: 'Live' },
      { label: 'Daily orders processed', value: '1.2M+' },
    ],
    workflows: [
      'SOP enforcement across outlets',
      'KOT & POS integration',
      'Royalty & margin management',
      'Central production visibility',
    ],
    suites: { erp: 2, sfa: 1, pos: 3, hrms: 2, wms: 1 },
    relevantPlatforms: ['fms', 'mobile', 'erp', 'hreasy'],
    featuredClient: 'U2 Cake & Burger',
  },
  {
    id: 'sweets',
    slug: 'sweets-namkeen',
    icon: CakeSlice,
    name: 'Sweets & Namkeen',
    tag: 'Heritage',
    code: 'SV-06',
    // insiderHero (previous): 'Your recipe took generations to perfect. Your operations should be too.',
    insiderHero: 'Sweets & namkeen ERP + POS — generations of recipe, modern operations.',
    insiderPain: '4 challenges we hear from every sweets manufacturer',
    // description (previous):
    //   'Perishable FEFO inventory, festival demand spikes, franchise consistency, and counter-side POS billing — engineered for sweet shops at scale.',
    description:
      'Perishable FEFO inventory, festival demand spikes, franchise consistency and counter-side POS billing — engineered for sweet shops at scale.',
    seoTitle: 'Sweets & Namkeen ERP & POS Software | UpWon',
    metaDescription:
      'Sweets & namkeen ERP + POS — festive surge planning, FEFO perishables, weight-based counter billing and recipe versioning. Cut wastage 18%. Book a free demo.',
    intro:
      'FEFO perishables, festive surge planning, weight-based counter POS and locked heritage recipes on one platform — built for mithai and namkeen brands.',
    proof:
      'Mithai chain: 18% less festive wastage, 5,000+ invoices/day handled at the counter, 100% recipe consistency across 14 outlets.',
    // pains (previous):
    // pains: [
    //   { title: 'Festival demand surge', desc: 'Diwali, Eid, Onam — demand spikes 4-5×. Production planning runs on memory.' },
    //   { title: 'Counter POS chaos', desc: 'Multiple SKUs, multiple sizes, weight-based pricing — billing is slow and error-prone.' },
    //   { title: 'Heritage recipe protection', desc: '130-year recipes drift when shop-floor changes. No versioning, no traceability.' },
    //   { title: 'Outlet consistency', desc: 'Every outlet tastes slightly different. Brand suffers silently.' },
    //   { title: 'Packaging SKU explosion', desc: '100g, 250g, 500g, 1kg, gift boxes, festival packs — every variant a separate code, every change a stockout risk.' },
    // ],
    pains: [
      { title: 'Festival surge', desc: 'Diwali, Eid and Onam spike demand 4–5×, planned from memory.' },
      { title: 'Counter POS chaos', desc: 'Multi-SKU, multi-size, weight-based billing is slow and error-prone.' },
      { title: 'Heritage recipe drift', desc: '100-year recipes change with the shop floor; no versioning.' },
      { title: 'Outlet inconsistency', desc: 'Every outlet tastes slightly different and the brand suffers.' },
      { title: 'Packaging SKU explosion', desc: '100g to gift packs; every variant a stockout risk.' },
    ],
    // capabilities (previous):
    // capabilities: [
    //   'Perishable FEFO inventory with MFD (Mfg Date) / Best Before / Use By date enforcement',
    //   'Festive surge planning — Diwali ×5–8 normal volume modelling for mithai & namkeen',
    //   'Central Kitchen (CK) → outlet hub-spoke with festival pre-build & weight-based packing lines',
    //   'Counter POS with weight-based billing — gulab jamun, laddu, barfi, kalakand, rasgulla, soan papdi',
    //   'Recipe versioning, role-based access, dual-approval edit — 100-year recipes locked',
    //   'Franchise royalty for mithai chains, Mithai Chain SOP audit, Bengali / Marwari / South sweet variants',
    //   'Cold chain for dairy-based sweets, shelf-life by category, NSF (Non-Fat Solids) in processed cheese',
    //   'Multi-SKU, multi-size (100g, 250g, 500g, 1kg box), FSSAI batch label printing with lot number',
    // ],
    capabilities: [
      'Perishable FEFO inventory with MFD / best-before / use-by enforcement.',
      'Festive surge planning — model Diwali ×5–8 normal volume.',
      'Central-kitchen to outlet hub-spoke with weight-based packing lines.',
      'Counter POS with weight-based billing across multi-size SKUs.',
      'Recipe versioning with role-based, dual-approval edits — heritage recipes locked.',
      'Franchise royalty, mithai-chain SOP audits and FSSAI batch-label printing.',
    ],
    metrics: [
      { label: 'Wastage reduction', value: '18%' },
      { label: 'Billing time cut', value: '48%' },
      { label: 'Invoices/day handled', value: '5,000+' },
    ],
    workflows: [
      'Perishable inventory FEFO',
      'Festival demand spikes',
      'Franchise consistency',
      'Billing & POS at counters',
    ],
    suites: { erp: 2, sfa: 2, pos: 3, hrms: 1, wms: 2 },
    relevantPlatforms: ['fms', 'erp', 'wms', 'mobile'],
    featuredClient: 'Kaka Halwai',
  },
  {
    id: 'spices',
    slug: 'spices-agro',
    icon: Wheat,
    name: 'Spices & Agro Processing',
    tag: 'Manufacturing',
    code: 'SV-05',
    // insiderHero (previous): 'From mandi to masala — full traceability, every batch.',
    insiderHero: 'Spices & agro ERP — from mandi to masala, full traceability every batch.',
    insiderPain: '4 challenges we hear from every spice manufacturer',
    // description (previous):
    //   'Procurement-to-pack agro operations with moisture and grade control, mandi accounting, contract farming, and export compliance.',
    description:
      'Procurement-to-pack agro operations with moisture and grade control, mandi accounting, contract farming and export compliance.',
    seoTitle: 'Spices & Agro Processing ERP Software | UpWon',
    metaDescription:
      'Spices & agro ERP — mandi procurement, moisture & grade control, blend BOM and FSSAI/IEC/APEDA export compliance, fully traceable. Book a free demo.',
    intro:
      'Mandi procurement, moisture and grade control, blend BOM and export-grade traceability on one platform — built for spice and agro processors.',
    proof:
      'Spice exporter: end-to-end farm-to-container traceability, zero export shipments stalled in 12 months, FSSAI/IEC/APEDA documents auto-generated.',
    // pains (previous):
    // pains: [
    //   { title: 'Moisture variation', desc: 'Each batch comes in at different moisture — drying yields are hard to predict.' },
    //   { title: 'Adulterant testing manual', desc: 'Natural colour and adulterant prevention runs on lab notebooks.' },
    //   { title: 'Mandi procurement', desc: 'Farmer-level procurement with broker margins is impossible to audit.' },
    //   { title: 'Export compliance', desc: 'FSSAI + IEC + buyer-specific certs — every shipment is a paperwork ordeal.' },
    //   { title: 'Aflatoxin / MRL holds', desc: 'One failed lab test and the entire export shipment stalls — buyer trust + working capital both bleed.' },
    // ],
    pains: [
      { title: 'Moisture variation', desc: 'Batches arrive at different moisture; drying yields are hard to predict.' },
      { title: 'Manual adulterant testing', desc: 'Colour and adulterant checks run on lab notebooks.' },
      { title: 'Mandi procurement', desc: 'Farmer-level buying with broker margins is hard to audit.' },
      { title: 'Export compliance', desc: 'FSSAI + IEC + buyer certs make every shipment a paperwork ordeal.' },
      { title: 'Aflatoxin / MRL holds', desc: 'One failed test stalls the whole export shipment.' },
    ],
    // capabilities (previous):
    // capabilities: [
    //   'Mandi / APMC procurement with grade-wise pricing, MSP reference, broker commission, FPO sourcing',
    //   'Moisture % (wet basis) at intake, drying, post-grinding — milling recovery, cleaning efficiency tracked',
    //   'ASTA colour value (for chilli), volatile oil content (for cardamom), mesh size (60, 80, 100), microbial counts (TPC, yeast/mould)',
    //   'Blend BOM with multiple raw spices, ratio variance, oleoresin / essential oil extraction yield',
    //   'Adulteration / Aflatoxin / Pesticide MRL (Maximum Residue Limit) lab testing — APEDA export hold rules',
    //   'Kharif / Rabi / Zaid crop-cycle aware procurement; HYV / OPV seed variant tracking',
    //   'NPK fertiliser, micronutrients, biostimulants, agrochemical input for contract farming programmes',
    //   'FSSAI permitted colour & additive list compliance; export COO, phytosanitary, IEC documents',
    //   'Spice processing — cleaning, drying, grinding (steam, ETO, irradiation), sortex, pickle / chutney plants',
    // ],
    capabilities: [
      'Mandi / APMC procurement with grade-wise pricing, broker commission and FPO sourcing.',
      'Moisture %, milling recovery and cleaning efficiency tracked intake to grind.',
      'Quality testing — ASTA colour, volatile oil, mesh size and microbial counts.',
      'Blend BOM with ratio variance and oleoresin / essential-oil extraction yield.',
      'Adulteration, aflatoxin and pesticide-MRL testing with APEDA export holds.',
      'FSSAI compliance plus COO, phytosanitary and IEC export documents.',
    ],
    metrics: [
      { label: 'Batch traceability', value: 'End-to-end' },
      { label: 'Export compliance', value: 'FSSAI · IEC' },
      { label: 'Grade & moisture', value: 'Tracked' },
    ],
    workflows: [
      'Moisture & grade control',
      'Procurement from farmers',
      'Export compliance',
      'Batch traceability',
    ],
    suites: { erp: 3, sfa: 2, pos: 1, hrms: 1, wms: 2 },
    relevantPlatforms: ['erp', 'wms', 'vendor-portal', 'hreasy'],
    featuredClient: 'Pan-India spices exporter',
  },
  {
    id: 'food-processing',
    slug: 'food-processing',
    icon: Soup,
    name: 'Food Processing',
    tag: 'Manufacturing',
    code: 'SV-07',
    // insiderHero (previous): 'Seasonal raw material. Multi-plant batches. One spine.',
    insiderHero: 'Food processing ERP — seasonal raw material, multi-plant batches, one spine.',
    insiderPain: '4 challenges we hear from every food processor',
    // description (previous):
    //   'Seasonal raw material handling, yield and conversion tracking, FSSAI and export compliance, multi-plant batch control.',
    description:
      'Seasonal raw-material handling, yield and conversion tracking, FSSAI and export compliance, and multi-plant batch control.',
    seoTitle: 'Food Processing ERP Software | UpWon',
    metaDescription:
      'Food processing ERP — seasonal raw material, yield & conversion tracking, multi-plant batch control and FSSAI/export compliance. Live in 30–45 days. Book a free demo.',
    intro:
      'Yield, batch records and recall traceability across every plant on one spine — built for food processors handling seasonal inputs and global compliance.',
    proof:
      'Food processor: 12% yield improvement across 4 plants, quarterly mock-recall trace in under 2 minutes, 100% co-pack hand-offs documented.',
    // pains (previous):
    // pains: [
    //   { title: 'Yield variance', desc: 'Conversion ratios swing with input quality — but variance is reported weeks late.' },
    //   { title: 'Multi-plant inventory', desc: 'Inventory split across plants is tracked on emails and phone calls.' },
    //   { title: 'GMP documentation', desc: 'Good Manufacturing Practice compliance runs on physical files.' },
    //   { title: 'Recall readiness', desc: 'Batch traceability is theoretical — until a recall is needed.' },
    //   { title: 'Co-packing scope creep', desc: 'Third-party manufacturing jobs lack clear hand-offs — yield, BOM and quality split between partners is dispute-prone.' },
    // ],
    pains: [
      { title: 'Yield variance', desc: 'Conversion ratios swing with input quality, reported weeks late.' },
      { title: 'Multi-plant inventory', desc: 'Stock split across plants tracked on emails and calls.' },
      { title: 'GMP documentation', desc: 'Compliance runs on physical files.' },
      { title: 'Recall readiness', desc: 'Batch traceability is theoretical until a recall is needed.' },
      { title: 'Co-packing scope creep', desc: 'Third-party jobs lack clear yield, BOM and quality hand-offs.' },
    ],
    // capabilities (previous):
    // capabilities: [
    //   'FPI (Food Processing Industry) operations — MOFPI / PLI Scheme / Mega Food Park / PMKSY scheme support',
    //   'BOM, BPR (Batch Production Record), Yield %, Process Loss, Line Efficiency, OEE (Availability × Performance × Quality)',
    //   'Downtime, SMED, Changeover, Run Rate, Filling Speed (units/min), Shift-wise productivity tracking',
    //   'CIP / COP / SSOP cleaning protocols, GMP, HACCP, ISO 22000, FSSC 22000, BRC, SQF, IFS global standards',
    //   'FSSAI licence, COA (Certificate of Analysis), Retained Sample, FIFO / FEFO, RM / PM / FG / WIP material control',
    //   'Aseptic, Retort, Spray Drying, Freeze Drying, HPP (High Pressure Processing), Extrusion, Cold Press tech',
    //   'MAP (Modified Atmosphere Packaging), Nitrogen Flush, Vitamin Fortification (A+D, atta, salt — per FSSAI)',
    //   'Traceability — mock recall, recall protocol, expiry / best before / MFD logic, lot-level forward & backward trace',
    //   'Co-Packing, Private Label, Contract Manufacturing — third-party manufacturing (3PM) workflow',
    //   'Multi-plant, multi-state, multi-GSTIN with state-specific compliance and ERP-driven planning',
    // ],
    capabilities: [
      'BOM, batch production records, yield %, process loss and OEE tracking.',
      'Multi-plant, multi-state, multi-GSTIN batch control on one spine.',
      'GMP, HACCP, ISO 22000, FSSC 22000 and BRC / SQF / IFS compliance.',
      'COA, retained samples and FIFO/FEFO across RM, PM, WIP and FG.',
      'Lot-level forward & backward traceability with mock recall in minutes.',
      'Co-packing / private-label / contract-manufacturing (3PM) workflows.',
    ],
    metrics: [
      { label: 'Yield & conversion', value: 'Tracked' },
      { label: 'Multi-plant batch', value: 'Unified' },
      { label: 'FSSAI · export', value: 'Compliant' },
    ],
    workflows: [
      'Seasonal raw material',
      'Yield & conversion ratios',
      'FSSAI / export compliance',
      'Multi-plant batch control',
    ],
    suites: { erp: 3, sfa: 2, pos: 1, hrms: 1, wms: 3 },
    relevantPlatforms: ['erp', 'wms', 'vendor-portal'],
    featuredClient: 'Multi-plant food processor',
  },
  {
    id: 'beverages',
    slug: 'beverage',
    icon: Coffee,
    name: 'Beverages & Juices',
    tag: 'Vertical',
    code: 'SV-03',
    // insiderHero (previous): 'Brix to bottle. Concentrate to consumer.',
    insiderHero: 'Beverage & juice ERP — Brix to bottle, concentrate to consumer.',
    insiderPain: '4 challenges we hear from every beverage manufacturer',
    description:
      'High-velocity SKU operations with blend formulation control, carbonation and fill management, GT/MT distribution and scheme control.',
    seoTitle: 'Beverage & Juice Manufacturing ERP | UpWon',
    metaDescription:
      'ERP for beverage & juice makers — Brix/pH batch control, returnable-crate tracking, fill-line scheduling and GT/MT distribution. FSSC 22000 ready. Book a free demo.',
    intro:
      'Formulation, fill-line scheduling, returnable-asset tracking and distribution on one platform — built for beverage and juice plants running many SKUs at speed.',
    proof:
      'Beverage operator: +40% distributor fill rate, 60% fewer returnable-container losses, scheme leakage eliminated.',
    // pains (previous):
    // pains: [
    //   { title: 'Returnable containers', desc: 'Bottles and crates leave; many don\'t return. Deposits and losses go untracked.' },
    //   { title: 'CO2 and preservative tracking', desc: 'Compliance documentation lives in physical files.' },
    //   { title: 'Multi-flavour scheduling', desc: 'Production line changeovers are slow and unpredictable.' },
    //   { title: 'Export certificates', desc: 'FSSC 22000 documentation managed manually.' },
    //   { title: 'Multi-plant recipe drift', desc: 'Same SKU made in 3 plants — Brix, pH and flavour balance vary. Brand consistency depends on luck, not control.' },
    // ],
    pains: [
      { title: 'Returnable containers', desc: 'Bottles and crates leave, many don’t return; deposits go untracked.' },
      { title: 'CO2 & preservative tracking', desc: 'Compliance documentation lives in physical files.' },
      { title: 'Multi-flavour scheduling', desc: 'Line changeovers are slow and unpredictable.' },
      { title: 'Export certificates', desc: 'FSSC 22000 documentation managed manually.' },
      { title: 'Multi-plant recipe drift', desc: 'Same SKU varies in Brix, pH and flavour across plants.' },
    ],
    // capabilities (previous):
    // capabilities: [
    //   'Concentrate / juice / nectar (25–99% fruit content) / fruit drink (<25%) / RTS (Ready to Serve) ratio control',
    //   'Brix (sugar solids %), pH, Turbidity (NTU), Dissolved Oxygen (DO), Carbonation level (CO2 vol) tested per batch',
    //   'CSD (Carbonated Soft Drink), JNSD (Juice / Nectar / Still Drink), Energy Drink, Isotonic, Sparkling Water — full SKU mix',
    //   'Aseptic Fill, Hot Fill, Cold Fill, PET blow-fill-seal line, Tetra Pak, glass bottle line scheduling',
    //   'Returnable bottle / crate management — deposits, route reconciliation, breakage / loss tracking',
    //   'CO2 vol, preservative under FSSAI permitted limits, B Natural / B3 Natural style clean-label compliance',
    //   'Multi-flavour line changeover sequencing — minimise CIP cycles, maximise throughput per shift',
    //   'FSSC 22000 export certificates, importing-country labels, BRC / HACCP for B2B HoReCa supply',
    // ],
    capabilities: [
      'Blend formulation control — concentrate / juice / nectar / RTS ratio with consistency across plants.',
      'Per-batch quality: Brix, pH, carbonation and dissolved-oxygen testing.',
      'Fill-line scheduling (aseptic, hot, cold, PET, Tetra Pak) with fast multi-flavour changeovers.',
      'Returnable bottle / crate management — deposits, route reconciliation and breakage tracking.',
      'CO2 and preservative compliance within FSSAI permitted limits.',
      'FSSC 22000 / BRC / HACCP export documentation and importing-country labels.',
    ],
    metrics: [
      { label: 'Distributor fill rates', value: '+40%' },
      { label: 'Returnables tracked', value: 'Live' },
      { label: 'Scheme leakage', value: 'Eliminated' },
    ],
    workflows: [
      'Blend formulation control',
      'Carbonation & fill management',
      'GT/MT distribution',
      'Scheme & discount control',
    ],
    suites: { erp: 3, sfa: 3, pos: 1, hrms: 2, wms: 2 },
    relevantPlatforms: ['erp', 'sfa-dms', 'wms'],
    featuredClient: 'Regional beverage brand',
  },
  // Non-Food FMCG extension
  {
    id: 'non-food-fmcg',
    slug: 'non-food-fmcg',
    icon: Sparkles,
    name: 'Non-Food FMCG',
    tag: 'Extension',
    code: 'EX-01',
    insiderHero: 'Different products. Same operational reality.',
    insiderPain: '4 challenges we hear from every non-food FMCG operator',
    description:
      'Personal care, home care, OTC, agricultural input — distribution, field force and compliance challenges that mirror food FMCG exactly.',
    pains: [
      { title: 'Multi-brand portfolio', desc: 'Personal care + home care under one distribution — scheme math becomes brutal.' },
      { title: 'MT/GT split inventory', desc: 'Modern Trade allocation vs General Trade — manual reconciliation eats margin.' },
      { title: 'Outlet coverage gaps', desc: 'Beat plans exist on paper. Real coverage is reported, not measured.' },
      { title: 'OTC compliance', desc: 'Pharma-adjacent OTC has its own regulatory regime — currently managed offline.' },
      { title: 'Agri-input seasonality', desc: 'Kharif / Rabi cycles compress 80% of sales into 3 months — overstocking + stockouts hit the same season.' },
    ],
    capabilities: [
      'Multi-principal CPG stock — personal care, home care, OTC, agri-input, stationery in one platform',
      'FMEG (Fast Moving Electrical Goods) extension — LED lighting, fans, SDA, switches, wires via electrical dealers',
      'D2C (Direct to Consumer) channel — Shopify / WhatsApp Commerce / marketplace + GT integration (omnichannel)',
      'Scheme engine — Wet / Dry / QPS / slabbed; GT-MT split, Numeric + Weighted Distribution measurement',
      'Beat / PJP / Productive Call / Outlet Universe / Coverage with secondary & tertiary sales capture',
      'Van Sales SFA, DSR, AOV, LPC, JBP — FMCG-grade KPI tooling for non-food categories',
      'Agri-input seasonal demand (Kharif / Rabi / Zaid), licence management, FPO programmes, MSP-linked planning',
      'OTC batch & expiry compliance (CDSCO-adjacent), BIS / ISI Mark and BEE Star Rating for FMEG SKUs',
      'MT credit note, CN/DN, claim accuracy, retail audit (Nielsen / IMRB-style), outlet health scoring',
    ],
    metrics: [
      { label: 'SFA platforms', value: 'GT · MT · Van' },
      { label: 'Distributor coverage', value: 'Tracked' },
      { label: 'OTC compliance', value: 'Native' },
    ],
    workflows: [
      'Multi-principal stock',
      'Beat plan execution',
      'Secondary sales tracking',
      'MT-GT split management',
    ],
    suites: { erp: 2, sfa: 3, pos: 1, hrms: 2, wms: 2 },
    relevantPlatforms: ['sfa-dms', 'wms', 'mobile'],
    featuredClient: 'Multi-category FMCG distributor',
  },
  {
    id: 'engineering',
    slug: 'engineering-manufacturing',
    icon: Settings,
    name: 'Engineering Manufacturing',
    tag: 'Adjacent',
    code: 'EX-02',
    insiderHero: 'Discrete manufacturing. The same operational rigour.',
    insiderPain: '4 challenges we hear from engineering manufacturers',
    description:
      'Build-to-order, discrete manufacturing, multi-level BOM, project costing — UpWon\'s Core ERP extends naturally to engineering manufacturing.',
    pains: [
      { title: 'Multi-level BOM complexity', desc: 'Sub-assemblies, parent items, alternates — tracked in disconnected systems.' },
      { title: 'Project costing', desc: 'Cost roll-up by project is theoretical until invoicing reveals the gaps.' },
      { title: 'Sub-contracting visibility', desc: 'Outsourced work-in-progress goes dark.' },
      { title: 'Quality at receipt', desc: 'GRN inspection paperwork-driven; supplier scorecards are absent.' },
      { title: 'On-time delivery slippage', desc: 'Job-card delays surface only at dispatch. OTD KPI is a lagging report, not a planning input.' },
    ],
    capabilities: [
      'Multi-level BOM management',
      'Project & job costing',
      'Sub-contracting workflow',
      'GRN with quality gate',
      'Vendor performance scorecards',
      'Multi-warehouse inventory',
    ],
    metrics: [
      { label: 'BOM levels supported', value: 'Unlimited' },
      { label: 'Project costing', value: 'Real-time' },
      { label: 'Sub-contract visibility', value: 'End-to-end' },
    ],
    workflows: [
      'Multi-level BOM',
      'Project costing',
      'Sub-contracting',
      'Vendor scorecards',
    ],
    suites: { erp: 3, sfa: 1, pos: 0, hrms: 2, wms: 3 },
    relevantPlatforms: ['erp', 'wms', 'vendor-portal'],
    featuredClient: 'Mid-size engineering manufacturer',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HOMEPAGE TOP 7 STRATEGY
// Drives which sectors the homepage IndustrySelector shows, in which order,
// and with which spreadsheet-prescribed headlines. Industries not in this
// map keep their routes (Bakery, Spices, Engineering) for deep-link traffic
// but no longer compete for homepage attention.
// ─────────────────────────────────────────────────────────────────────────────

export const HOMEPAGE_TOP_7_RANKS = {
  'food-processing': 1, // Food Manufacturing (umbrella)
  fmcg: 2,              // FMCG Distribution & Channel Mgmt
  dairy: 3,             // Dairy & Milk Processing
  qsr: 4,               // QSR & Food Franchise Chains
  sweets: 5,            // Sweets, Namkeen & Snacks
  beverages: 6,         // Beverages, Juices & Drinks
  'non-food-fmcg': 7,   // Non-Food FMCG
};

// Prescribed homepage display copy per sector (from Top 7 strategy sheet).
// Used by IndustrySelector when a Top 7 sector is active.
export const HOMEPAGE_HEADLINES = {
  'food-processing': {
    rankLabel: 'Food Manufacturing',
    headline: 'Built for the Way Food Gets Made',
    subheadline:
      'Bakery, dairy, snacks, beverages, spices, sweets — every process, every compliance, one platform',
    marketSize: '₹18+ lakh crore Indian food processing industry',
  },
  fmcg: {
    rankLabel: 'FMCG Distribution & Channel Mgmt',
    headline: 'Own Your Channel. Control Your Market.',
    subheadline:
      'FMCG distributors, C&F agents, super-stockists — GT/MT operations, scheme automation, secondary sales visibility',
    marketSize: '₹4.5 lakh crore organised FMCG distribution',
  },
  dairy: {
    rankLabel: 'Dairy & Milk Processing',
    headline: 'From Farm Gate to Last-Mile — Fully Connected',
    subheadline:
      'Milk procurement, fat-content batch tracking, FSSAI milk compliance, cold chain distribution',
    marketSize: '₹9 lakh crore Indian dairy industry',
  },
  qsr: {
    rankLabel: 'QSR & Food Franchise Chains',
    headline: "Scale Every Outlet Like It's Your Only One",
    subheadline:
      'QSR chains, bakery-café networks, sweet shop franchises — central kitchen control, outlet POS, brand consistency',
    marketSize: '₹1.5 lakh crore QSR + organised F&B market',
  },
  sweets: {
    rankLabel: 'Sweets, Namkeen & Snacks',
    headline: 'Every Recipe. Every Season. Every Outlet.',
    subheadline:
      'Sweets manufacturers, namkeen producers, snack brands — recipe control, seasonal planning, franchise outlet management',
    marketSize: '₹2 lakh crore sweets & namkeen industry',
  },
  beverages: {
    rankLabel: 'Beverages, Juices & Drinks',
    headline: 'Every Flavour. Every Channel. Real-Time.',
    subheadline:
      'Juice brands, energy drinks, nectars, flavoured water — production, multi-city distribution, retailer coverage',
    marketSize: '₹1.8 lakh crore Indian beverage market',
  },
  'non-food-fmcg': {
    rankLabel: 'Non-Food FMCG',
    headline: 'FMCG Distribution, Perfected.',
    subheadline:
      'Personal care, home care, OTC health brands — distribution management, secondary sales, retailer coverage',
    marketSize: '₹3 lakh crore non-food FMCG',
  },
};

// Revenue-potential rating per sector — drives the optional star indicator
// on the homepage and Industries hub. 5★ = Very High, 4★ = High, etc.
// Sourced from the Platform-Sector Mapping workbook.
export const INDUSTRY_REVENUE_POTENTIAL = {
  'food-processing': 'very-high',
  fmcg: 'very-high',
  dairy: 'very-high',
  qsr: 'very-high',
  sweets: 'very-high',
  beverages: 'high',
  'non-food-fmcg': 'high',
  bakery: 'very-high',
  spices: 'high',
  engineering: 'medium-high',
};

export const REVENUE_POTENTIAL_LABELS = {
  'very-high': { label: 'Very High', stars: 5 },
  high: { label: 'High', stars: 4 },
  'medium-high': { label: 'Medium-High', stars: 3 },
  medium: { label: 'Medium', stars: 2 },
  low: { label: 'Low', stars: 1 },
};

// Strategic rationale per sector — short note used on industry pages and
// product-page sector grids. Pulled verbatim from the workbook so the site
// expresses the same positioning the sales team uses.
export const INDUSTRY_STRATEGIC_NOTES = {
  'food-processing':
    'Largest ICP segment, deepest UpWon domain depth, highest product-market fit across ERP + SFA + POS + WMS',
  fmcg:
    'Massive India opportunity — 100,000+ FMCG distributors still running on Tally + Excel + WhatsApp',
  dairy:
    '₹9 lakh crore industry growing 8%+ CAGR — extreme compliance need, very low digital penetration',
  qsr:
    'India QSR market growing at 23% CAGR — franchise operators desperately need hub-spoke technology',
  sweets:
    '₹2 lakh crore organised market — very high growth, largely underserved by software',
  beverages:
    'Fastest-growing food category — brands scaling rapidly need ERP + SFA simultaneously',
  'non-food-fmcg':
    'SFA-DMS engine applies directly without modification — fastest path to extension revenue',
  bakery: 'Core ICP — highest domain depth in UpWon ERP',
  spices:
    'Moisture content, FSSAI, export compliance — strong specialised fit for spices manufacturers',
  engineering:
    'Discrete manufacturing extension — UpWon ERP applies to BOM, project costing, sub-contracting',
};

// Helper: returns the Top 7 industries in homepage display order.
export function getHomepageTop7() {
  return INDUSTRIES.filter((ind) => HOMEPAGE_TOP_7_RANKS[ind.id]).sort(
    (a, b) => HOMEPAGE_TOP_7_RANKS[a.id] - HOMEPAGE_TOP_7_RANKS[b.id],
  );
}
