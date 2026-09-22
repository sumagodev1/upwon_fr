import {
  Workflow,
  Boxes,
  ShieldCheck,
  ScanBarcode,
  Smartphone,
  ShieldQuestion,
  ClipboardCheck,
  Activity,
  Network,
  Tablet,
  Sparkles,
  BarChart3,
} from 'lucide-react';
// Brief-spec custom platform icons (Option A from the UpWon Platform Identity
// Brief v1.0). These replace the generic lucide icons that were used for the
// 7 brief platforms; mobile-apps still uses the lucide `Tablet`.
import {
  ErpConnectedBrain,
  SfaLivingRouteMap,
  FmsHubSpokeCrown,
  PosSmartTerminal,
  HrmsLifecycleArc,
  WmsPrecisionGrid,
  VmsPartnershipBridge,
} from '../components/shared/PlatformIcons/PlatformIcons.jsx';

// Per-platform identity colours from the UpWon Platform Identity Brief (v1.0).
// Each platform owns a distinct accent that always pairs with UpWon Navy #1E2461
// and Orange #E85A2A at the master-brand layer. Tailwind chip/border classes are
// kept neutral-orange so they harmonise with the master brand mark; the platform
// accent is applied via inline styles to text, glows and gradients.
const BASE_THEME = {
  chipBg: 'bg-orange-50',
  chipText: 'text-orange-700',
  chipBorder: 'border-orange-200',
  ring: 'ring-orange-500/20',
  border: 'border-orange-300',
  heroFrom: 'from-navy-950',
  heroTo: 'to-navy-900',
  panelBorder: 'border-orange-500/30',
  panelGlow: 'bg-orange-500/15',
};

export const PLATFORM_THEMES = {
  erp: {
    ...BASE_THEME,
    accent: '#1565C0', accentSoft: '#4A8FE0', accentDark: '#0D47A1',
    tint: '#E3F2FD', glow: 'rgba(21,101,192,0.18)',
    label: 'Intelligence · Decisiveness',
  },
  // TODO(brand): SFA-DMS colour is provisional. The Platform Identity Brief
  // v1.0 explicitly flags "Please give thought to color – need one more
  // option" for this platform. Forest Green is what's on the spec sheet,
  // but a final brand-team review is pending before this becomes locked.
  'sfa-dms': {
    ...BASE_THEME,
    accent: '#2E7D32', accentSoft: '#5BAA5E', accentDark: '#1B5E20',
    tint: '#E8F5E9', glow: 'rgba(46,125,50,0.18)',
    label: 'Speed · Real-Time',
  },
  'fms': {
    ...BASE_THEME,
    accent: '#6A1B9A', accentSoft: '#9B4BC8', accentDark: '#4A148C',
    tint: '#F3E5F5', glow: 'rgba(106,27,154,0.18)',
    label: 'Omnipresence · Scale',
  },
  // TODO(brand): POS colour is provisional. Brief v1.0 notes "One colour
  // option required" — Crimson Red is the spec-sheet value but is awaiting
  // a confirming review from the brand team alongside the SFA decision.
  pos: {
    ...BASE_THEME,
    accent: '#C62828', accentSoft: '#E55757', accentDark: '#8E1818',
    tint: '#FFEBEE', glow: 'rgba(198,40,40,0.18)',
    label: 'Brand Experience',
  },
  hrms: {
    ...BASE_THEME,
    accent: '#00695C', accentSoft: '#3A9489', accentDark: '#004D40',
    tint: '#E0F2F1', glow: 'rgba(0,105,92,0.18)',
    label: 'Less Admin · More Impact',
  },
  wms: {
    ...BASE_THEME,
    accent: '#E65100', accentSoft: '#FF7F33', accentDark: '#B23A00',
    tint: '#FBE9E7', glow: 'rgba(230,81,0,0.18)',
    label: 'Precision · Specificity',
  },
  'vendor-portal': {
    ...BASE_THEME,
    accent: '#37474F', accentSoft: '#62757F', accentDark: '#1C313A',
    tint: '#ECEFF1', glow: 'rgba(55,71,79,0.18)',
    label: 'Partnership · Collaboration',
  },
  // Mobile Apps is an UpWon-wide capability (BizPulse, GateMaster, Franchise
  // Audit, Van Sales) — not one of the 7 brief platforms — so it carries the
  // master brand orange rather than a dedicated platform colour.
  'mobile-apps': {
    ...BASE_THEME,
    accent: '#E85A2A', accentSoft: '#FF7340', accentDark: '#C44B1C',
    tint: '#FFF1EC', glow: 'rgba(232,90,42,0.18)',
    label: 'Mobility',
  },
};

export const getPlatformTheme = (slug) => PLATFORM_THEMES[slug] || PLATFORM_THEMES.erp;

// 9-11 sub-systems per platform with "Result:" outcome highlight
const SUBSYSTEMS = {
  erp: [
    { icon: '⚙️', name: 'Production & Planning System', bullets: ['BOM-based work order generation', 'Multi-plant shift scheduling', 'Real-time yield vs planned tracking', 'Work-in-progress (WIP) control'], outcome: 'Production visibility before the shift ends, not the next morning' },
    { icon: '🔬', name: 'Quality Control & Lab System', bullets: ['Incoming material QC with rejection workflow', 'In-process quality checkpoints', 'Batch-level QC traceability', 'FSSAI compliance documentation'], outcome: 'Pass food safety audits with one click — not one week of paper-chase' },
    { icon: '📋', name: 'Procurement Management System', bullets: ['PR → PO → GRN automated flow', 'Vendor rate contracts', 'Auto-reorder with min/max rules', '3-way invoice matching'], outcome: 'Zero stockouts — procurement triggered by consumption, not memory' },
    { icon: '📦', name: 'Inventory Management System', bullets: ['Raw material + packing material tracking', 'FEFO / FIFO stock control', 'Shelf life and expiry alerts', 'Multi-warehouse stock view'], outcome: 'Never dispatch expired stock — FEFO enforced automatically' },
    { icon: '🚚', name: 'Dispatch & Logistics System', bullets: ['Sales order to dispatch flow', 'Vehicle load planning', 'Delivery challan and e-way bill', 'Customer return management'], outcome: 'Every dispatch tracked from dock to delivery confirmation' },
    { icon: '💰', name: 'Finance & Accounts System', bullets: ['GST-compliant invoicing', 'Cost centre reporting by plant', 'Accounts receivable and payable', 'Tally integration available'], outcome: "CFO sees today's P&L today — not next month's version of last month" },
    { icon: '📊', name: 'Recipe & BOM Engine', bullets: ['Multi-level BOM with substitutions', 'Allergen flagging built-in', 'Version control on recipes', 'Cost roll-up per SKU per batch'], outcome: 'Recipe changes traceable through every batch — never another flavour drift' },
    { icon: '🧾', name: 'Compliance Manager', bullets: ['FSSAI license tracker', 'GST e-invoice + e-way bill', 'Statutory return calendar', 'Audit-ready document vault'], outcome: 'Compliance lives in the system — not in a senior employee\'s head' },
    { icon: '📈', name: 'Operational MIS', bullets: ['Real-time KPI dashboards by role', 'Drill-down to batch / shift / SKU', 'Auto exception alerts', 'Custom report builder'], outcome: 'Decisions on live data — not on yesterday\'s spreadsheet' },
  ],
  'sfa-dms': [
    { icon: '🗺️', name: 'Beat & Route Planning', bullets: ['Territory and beat assignment per rep', 'PJP setup, tracking and deviation alerts', 'Outlet coverage planning with visit frequency', 'Beat compliance MIS — planned vs actual', 'Unvisited outlet alerts with reason capture'], outcome: "Every rep's day is planned, tracked and measurable — not reported after the fact" },
    { icon: '📱', name: 'Outlet Order Booking', bullets: ['Mobile order booking with inventory check', 'Product catalogue with images & schemes', 'Order approval for non-standard pricing', 'Order vs target tracking', 'Outlet-wise history and trend'], outcome: 'Orders captured at outlet — no phone calls, no transcription errors' },
    { icon: '📍', name: 'Employee Attendance', bullets: ['GPS-tagged daily attendance', 'Outlet check-in / check-out timestamps', 'Daily Activity Report on mobile', 'Leave management workflow', 'Field productivity MIS'], outcome: 'Know where every rep is, right now — not at EOD' },
    { icon: '🏭', name: 'Distributor Management', bullets: ['Distributor stock visibility — SKU-wise, live', 'Credit limit and outstanding tracking', 'Primary sales end-to-end', 'Distributor performance scoring', 'Claims and debit note management'], outcome: 'No distributor claim surprises — full stock and financial visibility, always' },
    { icon: '💰', name: 'Scheme & Discount Engine', bullets: ['Trade scheme by product, region, channel', 'Auto-calculation of benefits at order level', 'Retailer / distributor eligibility', 'Leakage detection — phantom claims flagged', 'Scheme ROI per territory'], outcome: 'Every scheme rupee tracked — zero phantom claims' },
    { icon: '📈', name: 'Secondary Sales Capture', bullets: ['Retailer-level sales captured on mobile', 'Real-time outlet coverage', 'DMS invoice-level secondary billing', 'Fill rate by outlet / SKU / area', 'Market share & competitor tracking'], outcome: "Secondary sales visible same day — not on the 10th of next month" },
    { icon: '🚐', name: 'Van Sales & Pre-Sales', bullets: ['Van loading plan & pre-departure check', 'Delivery execution with digital POD', 'Cash collection & receipt at outlet', 'Goods return at point of delivery', 'EOD van stock vs sales reconciliation'], outcome: 'Van reconciliation in 5 minutes — not 2 hours with a calculator' },
    { icon: '📊', name: 'Sales Performance MIS', bullets: ['Target vs achievement at every level', 'Day / week / month performance cascades', 'Rep productivity & conversion rate', 'Customer-wise trend & gap analysis', 'Custom dashboards for NSM / RSM / ASM'], outcome: 'Sales reviews on live data — not spreadsheets assembled the night before' },
    { icon: '🧾', name: 'Expense Management', bullets: ['Daily expense claim with bill upload', 'GPS route validation for travel claims', 'TA/DA policy by grade & region', 'Manager approval on mobile', 'Monthly expense vs budget MIS'], outcome: 'Expense claims verified in minutes — not rubber-stamped' },
  ],
  'fms': [
    { icon: '📝', name: 'Franchisee Onboarding', bullets: ['Franchise agreement & KYC digitally', 'Territory allocation with map boundaries', 'Brand standards documentation', 'Security deposit & fee tracking', 'Stage-gate approval workflow'], outcome: 'Every franchisee onboarded consistently — no paper, no compliance gaps' },
    { icon: '📦', name: 'Central Order Processing', bullets: ['Outlet-to-HQ ordering on mobile / web', 'Central kitchen demand consolidation', 'Hub-spoke order allocation', 'Product-wise order modification workflow', 'Delivery schedule & advance planning'], outcome: 'Central kitchen plans from digital orders — not from WhatsApp messages' },
    { icon: '🧾', name: 'Outlet POS Billing', bullets: ['Touch-screen POS — online and offline', 'Barcode & QR scanning', 'KOT for dine-in & quick service', 'Table management for restaurants', 'Multi-tender — cash, card, UPI, split'], outcome: 'Every sale visible at HQ in real time — no EOD report-chasing' },
    { icon: '🚛', name: 'Hub-Spoke Dispatch', bullets: ['Production to hub dispatch tracking', 'Hub-to-outlet with vehicle assignment', 'Dispatch challan & digital proof', 'Short supply claim management', 'Delivery confirmation by outlet'], outcome: 'Every product tracked production to shelf — no disputes' },
    { icon: '💸', name: 'Royalty & Margin Management', bullets: ['Royalty on percentage of outlet sales', 'Outlet-wise P&L dashboard', 'Commission & incentive tracking', 'Monthly statement generation', 'Outlet performance benchmarking'], outcome: 'Royalty calculated automatically from POS data — zero disputes' },
    { icon: '✅', name: 'SOP Audit & Compliance', bullets: ['Digital audit checklist by category', 'Photo / video evidence on mobile', 'Non-compliance alerts & corrective action', 'Hygiene, branding, operational score', 'Trend reports per outlet'], outcome: 'Brand standards enforced across every outlet — without visiting each manually' },
    { icon: '📊', name: 'Franchise MIS & Analytics', bullets: ['Outlet-wise sales performance live', 'Best/worst outlet ranking', 'Product category performance', 'Day-part & peak-hour analysis', 'Benchmarking across similar outlets'], outcome: 'Data-driven decisions for every franchise conversation' },
    { icon: '💬', name: 'Grievance Management', bullets: ['Franchisee complaint registration', 'SLA tracking — response & resolution', 'Escalation workflow with mgmt visibility', 'Franchisee satisfaction score', 'Grievance trend analysis'], outcome: 'Franchisee complaints resolved on time — SLA tracked, mgmt alerted' },
    { icon: '📱', name: 'Franchisee Self-Service App', bullets: ['Daily order placement from outlet', 'Own outlet P&L dashboard', 'Stock availability check', 'Billing & payment history', 'Communication channel with HO'], outcome: 'Franchisees feel in control — engaged partners, not uninformed operators' },
  ],
  hrms: [
    { icon: '👤', name: 'Employee Lifecycle', bullets: ['Recruitment to retirement workflow', 'Document management & verification', 'Probation & confirmation tracking', 'Transfer & promotion records', 'Full & final settlement'], outcome: 'Every employee event captured digitally — no paper files' },
    { icon: '⏱️', name: 'Attendance & Time', bullets: ['Biometric / mobile / web attendance', 'Shift planning & roster', 'Overtime calculation', 'Late / early-exit policies', 'Multi-location consolidation'], outcome: 'Real-time attendance from every plant and outlet — one screen' },
    { icon: '💰', name: 'Payroll Engine', bullets: ['Gross-to-net calculation', 'Multi-state payroll processing', 'Statutory deductions (PF, ESIC, PT, TDS)', 'Bonus, increment, arrear management', 'Payslip portal & email distribution'], outcome: 'Monthly payroll runs in hours — not days' },
    { icon: '📋', name: 'Statutory Compliance', bullets: ['PF challan auto-generation', 'ESIC contribution returns', 'PT, LWF, Gratuity tracking', 'Form 16 & Form 24Q automation', 'Statutory return calendar'], outcome: 'Compliance filings on time — every time, automatically' },
    { icon: '🏖️', name: 'Leave Management', bullets: ['Policy-driven leave accrual', 'Multi-level approval workflow', 'Compensatory off tracking', 'Leave encashment calculation', 'Leave balance on employee app'], outcome: 'Leave decisions on mobile — not on a paper register' },
    { icon: '🎯', name: 'Performance & KRA', bullets: ['KRA-KPI cascade from org to individual', 'Quarterly / annual review cycles', '360-degree feedback collection', 'Calibration meetings support', 'Increment recommendation engine'], outcome: 'Performance reviews on data — not on memory' },
    { icon: '📱', name: 'Employee Self-Service', bullets: ['Mobile attendance & leave', 'Payslip & Form 16 download', 'Reimbursement claims with bills', 'Policy & document access', 'Helpdesk & query management'], outcome: 'HR queries resolved without HR — self-service first' },
    { icon: '🏭', name: 'Factory Workforce', bullets: ['Contract labour register', 'Shift change & overtime tracking', 'Worker production-linked incentive', 'Safety training & PPE compliance', 'Factory Act compliance reports'], outcome: 'Factory Act compliance built-in — not bolted on' },
  ],
  wms: [
    { icon: '📦', name: 'Inbound & GRN', bullets: ['Vehicle gate-in & unloading', 'PO-based GRN with QC integration', 'Putaway suggestion engine', 'Barcode label generation', 'Rejection workflow with vendor claim'], outcome: 'Every receipt tracked from gate to bin — full audit trail' },
    { icon: '🏷️', name: 'Bin & Zone Management', bullets: ['Multi-zone warehouse layout', 'Temperature zone tracking', 'Bin capacity & velocity rules', 'ABC analysis-based placement', 'Slot optimisation engine'], outcome: 'Pick path optimised by zone, not by guess' },
    { icon: '🔄', name: 'FEFO / FIFO Engine', bullets: ['Strict FEFO enforcement for perishables', 'Expiry alerts at 7/15/30 day windows', 'Batch-level traceability', 'Quarantine workflow for near-expiry', 'Auto-rotation suggestions'], outcome: 'Zero expiry write-offs on dispatched stock — FEFO is non-negotiable' },
    { icon: '🚚', name: 'Outbound & Dispatch', bullets: ['Pick-list generation with wave planning', 'Pack station configuration', 'Vehicle load optimisation', 'E-way bill auto-generation', 'POD capture on driver app'], outcome: 'Dispatch waves run on plan — not on phone calls' },
    { icon: '📊', name: 'Stock Valuation', bullets: ['Multi-method valuation (FIFO, WAC)', 'Real-time stock value by location', 'Slow-mover & dead-stock alerts', 'Stock ageing analysis', 'Audit trail of every movement'], outcome: 'Stock value matches the system — every audit, every year' },
    { icon: '📲', name: 'Mobile Scanner', bullets: ['Android / iOS scanner app', 'Pick & pack execution on mobile', 'Cycle count & inventory audit', 'Putaway confirmation', 'Damaged stock reporting'], outcome: 'Warehouse runs on scanners — not on registers' },
    { icon: '🔗', name: '3PL Integration', bullets: ['Outsourced warehouse connector', 'Real-time stock sync with 3PL', 'Order routing to nearest warehouse', 'Cost-per-line tracking', 'SLA monitoring & reporting'], outcome: 'In-house and 3PL warehouses on one platform' },
    { icon: '📈', name: 'Warehouse MIS', bullets: ['Order fulfilment rate', 'Pick accuracy & productivity', 'Dock-to-stock time', 'Inventory turns by SKU', 'Custom reporting'], outcome: 'Operations KPIs on one screen — for the warehouse manager and the CEO' },
  ],
  'vendor-portal': [
    { icon: '🤝', name: 'Vendor Onboarding', bullets: ['Digital KYC & GST verification', 'Bank account & PAN validation', 'Compliance document upload', 'Capability assessment', 'Tiered vendor classification'], outcome: 'Every vendor onboarded with full documentation — auditable forever' },
    { icon: '📑', name: 'RFQ & Quotations', bullets: ['Multi-vendor RFQ broadcast', 'Quotation comparison matrix', 'Negotiation with version history', 'Award workflow with approval', 'Reverse auction support'], outcome: 'Best-price discovery in days — not weeks of emails' },
    { icon: '📜', name: 'Rate Contract Management', bullets: ['Annual rate contracts by vendor', 'Tiered pricing by volume', 'Auto-rate refresh on PO', 'Contract renewal alerts', 'Compliance to negotiated terms'], outcome: 'Procurement at contracted rates — not at whatever the invoice says' },
    { icon: '📦', name: 'PO & ASN', bullets: ['PO confirmation by vendor', 'Advance shipment notice', 'Dispatch tracking with timestamps', 'Vehicle & driver details', 'Delivery date commitment'], outcome: 'Goods arrive when they should — visibility from PO to dock' },
    { icon: '🔬', name: 'Vendor QC Self-Certification', bullets: ['Vendor uploads pre-dispatch QC reports', 'Lab test certificates per batch', 'Compliance certificate library', 'Auto-acceptance rules', 'QC dispute workflow'], outcome: 'Inbound QC bottleneck eliminated — vendors certify before dispatch' },
    { icon: '💵', name: 'Payment Visibility', bullets: ['Invoice submission portal', '3-way matching automation', 'Payment cycle visibility', 'TDS deduction tracking', 'GST input credit reconciliation'], outcome: 'No vendor follow-up emails — payment status always visible' },
    { icon: '⭐', name: 'Performance Scorecards', bullets: ['On-time delivery score', 'Quality acceptance rate', 'Price competitiveness index', 'Documentation accuracy', 'Quarterly vendor review reports'], outcome: 'Vendor performance reviews on data — not on relationships' },
    { icon: '📊', name: 'Procurement MIS', bullets: ['Spend analysis by category & vendor', 'Price trend tracking', 'Maverick spend detection', 'Savings opportunity reports', 'Procurement KPI dashboard'], outcome: 'Procurement decisions on data — not on commodity prices the buyer remembers' },
  ],
  pos: [
    { icon: '🧾', name: 'Touch-Screen POS Billing', bullets: ['Online + offline-resilient billing', 'Barcode & QR scanning', 'KOT for dine-in & quick service', 'Table management for restaurants', 'Multi-tender — cash, card, UPI, split'], outcome: 'Every sale captured at the counter — even when internet drops' },
    { icon: '📡', name: 'Real-Time HQ Visibility', bullets: ['Live outlet sales feed to HQ', 'Hourly / day-part / SKU breakdown', 'Cash reconciliation per outlet per shift', 'Discount & wastage tracking', 'CEO mobile dashboard'], outcome: 'HQ sees every outlet sale as it happens — no EOD report-chasing' },
    { icon: '🍔', name: 'Menu & Pricing Control', bullets: ['Menu sync from HQ to every outlet', 'Location-based pricing', 'Combo & upsell engine', 'Temporary day-part menus', 'Recipe-linked stock deduction'], outcome: 'One menu change at HQ propagates to every outlet — in seconds' },
    { icon: '🤝', name: 'Loyalty & CRM', bullets: ['Customer profile across outlets', 'Points, vouchers, tier benefits', 'Birthday & lapsed customer triggers', 'WhatsApp & SMS campaigns', 'Repeat-rate dashboards'], outcome: 'Customers recognised at every outlet — not just where they first signed up' },
    { icon: '🛵', name: 'Aggregator Integration', bullets: ['Swiggy, Zomato, ONDC native', 'Single tablet for all channels', 'Menu & price sync across aggregators', 'Auto-acknowledgement & KOT', 'Reconciliation with payouts'], outcome: 'Aggregator orders flow into the same POS — no separate tablets, no missed orders' },
    { icon: '💳', name: 'Payment & Settlement', bullets: ['UPI, card, wallet, BNPL support', 'Pine Labs / Paytm / Razorpay terminals', 'Auto-settlement reconciliation', 'Refund & void workflow with approval', 'Tip & service charge handling'], outcome: 'Every rupee accounted for — UPI rec done at EOD, not Sunday morning' },
    { icon: '🧮', name: 'GST & Compliance', bullets: ['GST-compliant invoice format', 'Multi-GSTIN by outlet / state', 'E-invoice trigger above threshold', 'Daily GST liability report', 'Audit-ready invoice vault'], outcome: 'Tax filings ready every month — outlet by outlet, automatically' },
    { icon: '📊', name: 'Outlet Performance Analytics', bullets: ['Hour-of-day sales heat map', 'Top sellers & worst sellers per outlet', 'Cashier productivity tracking', 'Footfall vs conversion analysis', 'Weather & event-day overlay'], outcome: 'Outlet manager sees what is and isn\'t working — daily, not quarterly' },
    { icon: '🎟️', name: 'Discount, Voucher & Promo', bullets: ['Voucher generation & redemption', 'Time-bound flash promos', 'Coupon code validation at POS', 'Manager approval for over-limit discounts', 'Promo ROI per outlet'], outcome: 'Promos run with discipline — no leaked discounting, no manual workarounds' },
  ],
  'mobile-apps': [
    { icon: '📊', name: 'BizPulse — Owner Pulse', bullets: ['Daily revenue, orders, wastage on phone', 'Plant-wise production status', 'Outlet sales by hour', 'CXO alerts on threshold breach', 'Drill-down to batch / shift / SKU'], outcome: 'CXOs check live data on their phone at 7am — every day' },
    { icon: '🛡️', name: 'GateMaster — Security & Gate', bullets: ['Vehicle entry & exit register', 'Vendor visit gate-pass', 'Material movement tracking', 'Visitor management', 'Photo evidence capture'], outcome: 'Gate operations digital — every entry & exit traceable' },
    { icon: '✅', name: 'Franchise Audit — Brand Compliance', bullets: ['Digital audit checklist on tablet', 'Photo & video evidence', 'SOP score per outlet', 'Corrective action assignment', 'Audit history & trend'], outcome: 'SOP compliance enforced across outlets — no paper, no missed follow-ups' },
    { icon: '🚐', name: 'Van Sales — Field Sales', bullets: ['Beat plan execution', 'Order booking at outlet', 'Cash collection & receipt', 'Stock load & reconciliation', 'Scheme application'], outcome: 'Van salesman runs entire day on the app — no end-of-day chaos' },
    { icon: '🎫', name: 'Field Service App', bullets: ['Service ticket assignment', 'Customer site check-in', 'Parts consumption tracking', 'Photo-based job completion', 'Customer signature capture'], outcome: 'Field service jobs tracked end-to-end — not lost in email' },
    { icon: '📋', name: 'Inspector App', bullets: ['Outlet / supplier inspection forms', 'Custom audit checklists', 'Photo evidence & geo-tagging', 'Auto-scoring & reports', 'Corrective action follow-up'], outcome: 'Inspections digital — auditable, scored, actionable' },
    { icon: '🏭', name: 'Shop-Floor Tablet', bullets: ['Production order start / stop', 'Batch yield entry on tablet', 'Quality checkpoint sign-off', 'Maintenance request raise', 'Shift handover notes'], outcome: 'Shop floor runs on tablets — not on paper rounds' },
    { icon: '🚛', name: 'Driver / Delivery App', bullets: ['Trip allocation & route', 'Delivery confirmation with POD', 'Cash collection at delivery', 'Vehicle fuel & expense', 'Trip P&L reporting'], outcome: 'Every trip accounted for — from dispatch to driver settlement' },
  ],
};

// 7 UpWon platforms — fully expanded with theming + sub-systems
export const PLATFORM_MODULES = [
  {
    id: 'erp', slug: 'erp', code: 'UPWON ERP', icon: ErpConnectedBrain,
    title: 'UPWON ERP', hero: 'Where Data Becomes Decisions.',
    short: 'Manufacturing · Finance · Procurement · Compliance · Quality',
    purpose: 'Production control that eliminates the guesswork — and the wastage.',
    primaryUser: 'Plant head · Operations Director',
    pain: "I can't see what's happening until it's too late.",
    // description (previous):
    //   'The operational backbone of food manufacturing. Batch-driven production planning, recipe-aware BOM, multi-plant control, finance, and FSSAI/GST compliance — built in, not bolted on.',
    description:
      'The operational backbone for food manufacturers. Batch-driven production planning, recipe-aware BOM, multi-plant control, finance and FSSAI/GST compliance — built in, not bolted on.',
    seoTitle: 'Food Manufacturing ERP Software – Batch & FSSAI | UPWON',
    metaDescription:
      'Batch-driven ERP for food manufacturers — recipe BOM, yield tracking, FSSAI & GST compliance and multi-plant finance. Go live in 30–45 days. Book a free demo',
    signatureCapabilities: [
      'Batch costing down to the gram — actual vs budgeted cost per SKU, per batch.',
      'FSSAI dossier auto-generated per batch; audits become a one-click export.',
      'One data layer from forecast to dispatch — zero spreadsheet reconciliation.',
    ],
    builtFor:
      'Bakery & confectionery, dairy & milk processing, sweets & namkeen, snacks, beverages & juices, spices & masala, and formulation pharma.',
    whyUpWon:
      'Built only for food — batch, FEFO, QC and recipe out of the box, live in 30–45 days. Generic ERPs (SAP B1, Odoo, ERPNext) need costly food add-ons; Tally + Excel can\'t run production or batch traceability.',
    features: [
      'Batch production planning & scheduling',
      'Recipe / BOM with ingredient substitution',
      'Quality control & lab testing workflows',
      'Shelf life & expiry date management',
      'Multi-plant operations control',
      'Financial accounting & cost centres',
      'Purchase, GRN & vendor reconciliation',
      'FSSAI & GST compliance native',
    ],
    subsystems: SUBSYSTEMS.erp,
    modules: [
      { name: 'Production Planning', desc: 'Master production schedule, BOM, batch creation, yield tracking, sub-contracting' },
      { name: 'Quality Management', desc: 'In-process QC, batch release/hold, COA generation, FEFO enforcement' },
      { name: 'Inventory & Stores', desc: 'Multi-location, raw/WIP/FG tracking, expiry, FEFO, stock valuation' },
      { name: 'Purchase & Procurement', desc: 'Vendor management, PR/PO, 3-way matching, commodity price alerts' },
      { name: 'Sales & Order Management', desc: 'B2B orders, price book, scheme management, dispatch planning' },
      { name: 'Finance & Accounts', desc: 'Multi-GSTIN, P&L, balance sheet, bank rec, TDS, e-invoicing' },
      { name: 'Compliance Management', desc: 'FSSAI tracker, renewal alerts, inspection log, recall workflow' },
    ],
    differentiator: 'Food-specific BOM with allergen flagging and FSSAI-native compliance — absent in Odoo, requires custom build in ERPNext, costly addon in SAP.',
    quickStats: [
      { value: '50+', label: 'Food companies on UPWON ERP' },
      { value: '45 days', label: 'Average time to go-live' },
      { value: '18%', label: 'Avg wastage reduction (Year 1)' },
    ],
    heroSlides: [
      {
        eyebrow: 'Business Transformation',
        headline: "UPWON ERP Isn't Just Another IT Product — It's a Business Transformation Tool.",
        subhead: 'To scale your business, use a proven scaling engine.',
        cta: { label: 'Talk to an Industry Specialist', to: '/demo' },
        secondaryCta: { label: 'Watch 2-Min Product Tour', to: '/resources' },
        microTrust: 'Integrated ERP managing 50+ food & FMCG brands.',
        bg: '/images/erp_hero1.webp',
      },
      {
        eyebrow: 'Built for Food',
        headline: 'The Only ERP — That Thinks Like a Food Manufacturer.',
        subhead: 'Recipe, batch, FEFO and FSSAI — built in, not bolted on.',
        cta: { label: 'Talk to an Industry Specialist', to: '/demo' },
        secondaryCta: { label: 'Watch 2-Min Product Tour', to: '/resources' },
        microTrust: 'Integrated ERP managing 50+ food & FMCG brands.',
        bg: '/images/erp_hero2.webp',
      },
      {
        eyebrow: 'Stop the Leakage',
        headline: "Fixing Business Leakages Doesn't Just Grow the Bottom Line — It Opens Business Scaling Opportunities.",
        subhead: 'Business scaling is only possible when operational complexities are taken care of.',
        cta: { label: 'Talk to an Industry Specialist', to: '/demo' },
        secondaryCta: { label: 'Watch 2-Min Product Tour', to: '/resources' },
        microTrust: 'Integrated ERP managing 50+ food & FMCG brands.',
        bg: '/images/erp_hero3.webp',
      },
      {
        eyebrow: 'Cost Intelligence',
        headline: 'Knowing Exact Batch Cost, Every SKU, Real-Time — Is Not Just Production Control, It Lets You Drive Market Strategies.',
        subhead: 'Making profits before production is only possible when you know your exact cost.',
        cta: { label: 'Talk to an Industry Specialist', to: '/demo' },
        secondaryCta: { label: 'Watch 2-Min Product Tour', to: '/resources' },
        microTrust: 'Integrated ERP managing 50+ food & FMCG brands.',
        bg: '/images/erp_hero4.webp',
      },
      {
        eyebrow: 'One Connected Operation',
        headline: 'Run Every Batch, Every Order, Every Outlet From One Place — Brings Visibility and Peace of Mind.',
        subhead: 'UPWON enables you to take your business into autopilot mode.',
        cta: { label: 'Talk to an Industry Specialist', to: '/demo' },
        secondaryCta: { label: 'Watch 2-Min Product Tour', to: '/resources' },
        microTrust: 'Integrated ERP managing 50+ food & FMCG brands.',
        bg: '/images/erp_hero5.webp',
      },
    ],
  },
  {
    id: 'sfa-dms', slug: 'sfa-dms', code: 'UpWon SFA-DMS', icon: SfaLivingRouteMap,
    title: 'UpWon SFA & DMS', hero: 'Every Beat. Every Order. Real-Time.',
    short: 'Sales Force Automation · Distribution Management',
    purpose: 'Your field team on mobile. Your distributor data in real time. No more surprises.',
    primaryUser: 'Sales head · NSM · RSM',
    pain: "My field team's data is always late and always wrong.",
    // description (previous):
    //   'Factory gate to retail shelf. Complete visibility for GT, MT and all FMCG distribution models — distributor billing, claims, beat productivity, secondary sales captured at the outlet.',
    description:
      'From factory gate to retail shelf — complete visibility across general trade, modern trade, cold-chain and institutional sales, captured at the outlet and settled at the warehouse.',
    seoTitle: 'SFA & DMS Software for FMCG Distribution | UpWon',
    metaDescription:
      'Sales force automation + distributor management for FMCG. Beat planning, real-time secondary sales, schemes & claims and van/pre-sales — one platform. Book a free demo.',
    signatureCapabilities: [
      'Beat & PJP planning with real-time secondary sales captured at the outlet.',
      'Schemes that calculate — and claim — themselves, ending claim disputes.',
      'Live distributor stock, credit and claim visibility; target vs achievement MIS.',
    ],
    builtFor:
      'FMCG food brands, dairy route-to-market, beverages, confectionery & snacks, spices & staples, personal care, and pharma stockists.',
    whyUpWon:
      'Closed-loop primary→secondary visibility built for Indian distribution — right for FMCG brands and distributors running 50–800 reps. Heavy MNC SFA tools are overkill; single-distributor setups under 10 reps don\'t need it.',
    features: [
      'Beat & route planning · PJP compliance', 'Real-time secondary sales capture',
      'Trade scheme & discount management', 'Distributor stock · credit · claim visibility',
      'Van sales · pre-sales · cash collection', 'Target vs achievement MIS',
      'Modern Trade module · planogram compliance', 'Outlet health scoring',
    ],
    subsystems: SUBSYSTEMS['sfa-dms'],
    modules: [
      { name: 'Sales Force Automation', desc: 'Beat planning, call reporting, order capture, scheme enforcement, van sales' },
      { name: 'Distribution Management', desc: 'Secondary sales tracking, distributor inventory, scheme settlement, claims' },
      { name: 'Modern Trade Module', desc: 'MT pricing, promo execution, in-store activation, planogram compliance' },
    ],
    differentiator: 'India-specific beat plan model and secondary sales visibility at retailer level — no global ERP captures sell-out, only sell-in.',
    quickStats: [
      { value: '40%', label: 'Faster order processing across deployments' },
      { value: '80%', label: 'Reduction in manual data entry for sales teams' },
      { value: 'Same day', label: 'Secondary sales — not 30 days later' },
    ],
    // Enterprise-trust showcase (security + recognition cards).
    enterpriseTrust: true,
    // "Why standalone SFA-DMS fall short" — disconnected → connected story.
    structuralGap: true,
    // "Grows with you" — phased SFA → DMS → Suite adoption stepper.
    growsWithYou: true,
    // "Implementation & Partnership" — phased go-live timeline over artwork.
    implPartnership: true,
    // "Trust Establishers" — built-in compliance + connected ecosystem.
    complianceEcosystem: true,
    // "Customer Outcomes" — named case-study testimonial carousel.
    outcomeStory: true,
    // "UpWon vs the Alternatives" — honest plain-language distinction.
    upwonVsAlternatives: true,
    // SFA-DMS due-diligence FAQ accordion.
    sfaFaqs: true,
    // Final CTA — low-pressure invitation over navy band + dashboard.
    sfaFinalCta: true,
    // Product video section (Odoo-style playback bar) below the trust section.
    videoIntro: {
      eyebrow: 'Every route to market',
      lead: 'Built for Distribution —',
      accent: 'Food, FMCG, FMEG and Beyond',
      subtext:
        'One platform for every route to market — from food and FMCG to FMEG distribution, across every channel and every pincode in India.',
    },
    heroSlides: [
      {
        eyebrow: 'AI-Powered SFA-DMS Suite',
        headline: 'UPWON SFA–DMS Suite (AI-Powered) — Take Your Business Into Every Pincode of the Region.',
        subhead: 'Field-force automation and distributor management on one AI-driven platform — expand reach into every town without losing control.',
        cta: { label: 'Talk to an Industry Specialist', to: '/demo' },
        secondaryCta: { label: 'Watch 2-Min Product Tour', to: '/resources' },
        microTrust: 'SFA-DMS trusted by FMCG brands and distributors across India.',
        bg: '/images/sfa_dms_hero1.webp',
      },
      {
        eyebrow: 'Real-Time Orders',
        headline: "See Every Order the Moment It's Booked — Not the Next Morning.",
        subhead: "Every rep's order flows to your dashboard live, so you plan dispatch and stock on today's demand — not yesterday's.",
        cta: { label: 'Talk to an Industry Specialist', to: '/demo' },
        secondaryCta: { label: 'Watch 2-Min Product Tour', to: '/resources' },
        microTrust: 'SFA-DMS trusted by FMCG brands and distributors across India.',
        bg: '/images/sfa_dms_hero2.webp',
      },
      {
        eyebrow: 'True Sell-Out Visibility',
        headline: 'Know Which Distributor Is Actually Selling — Not Just Stocking.',
        subhead: 'Track secondary sales at the outlet and see real off-take, instead of primary billing that only hides dead stock.',
        cta: { label: 'Talk to an Industry Specialist', to: '/demo' },
        secondaryCta: { label: 'Watch 2-Min Product Tour', to: '/resources' },
        microTrust: 'SFA-DMS trusted by FMCG brands and distributors across India.',
        bg: '/images/sfa_dms_hero3.webp',
      },
      {
        eyebrow: 'Scheme Control',
        headline: 'Stop Scheme Leakage — Before It Eats Your Margin.',
        subhead: 'Schemes that calculate and claim themselves — no inflated claims, no disputes, no silent margin bleed.',
        cta: { label: 'Talk to an Industry Specialist', to: '/demo' },
        secondaryCta: { label: 'Watch 2-Min Product Tour', to: '/resources' },
        microTrust: 'SFA-DMS trusted by FMCG brands and distributors across India.',
        bg: '/images/sfa_dms_hero4.webp',
      },
      {
        eyebrow: 'Beat Discipline',
        headline: 'One Beat Plan, Every Rep, Every Day — No Blind Spots.',
        subhead: 'PJP compliance tracked live, so no outlet is skipped and every route runs exactly to plan.',
        cta: { label: 'Talk to an Industry Specialist', to: '/demo' },
        secondaryCta: { label: 'Watch 2-Min Product Tour', to: '/resources' },
        microTrust: 'SFA-DMS trusted by FMCG brands and distributors across India.',
        bg: '/images/sfa_dms_hero5.webp',
      },
      {
        eyebrow: 'Field to Dashboard, Live',
        headline: 'From the Field to Your Dashboard, in Real Time — Not Real Late.',
        subhead: 'Sales, stock and collections update as they happen, so you act on today\'s ground reality — not week-old reports.',
        cta: { label: 'Talk to an Industry Specialist', to: '/demo' },
        secondaryCta: { label: 'Watch 2-Min Product Tour', to: '/resources' },
        microTrust: 'SFA-DMS trusted by FMCG brands and distributors across India.',
        bg: '/images/sfa_dms_hero6.webp',
      },
    ],
  },
  {
    id: 'fms', slug: 'fms', code: 'UpWon FMS', icon: FmsHubSpokeCrown,
    title: 'UpWon FMS & POS', hero: "Run 50 Outlets Like You're Standing in Each One.",
    // Combined platform — surfaces both brief-recommended taglines: FMS leads,
    // POS appears as the outlet-experience sub-tagline.
    secondaryTagline: 'Every Transaction. A Brand Experience.',
    secondaryTaglineLabel: 'At every outlet POS',
    short: 'Franchise Operations · Outlet POS',
    primaryUser: 'Franchise head · Brand owner',
    pain: 'Every new outlet adds three new problems.',
    purpose: 'Manage 5 to 500 outlets from one command centre — brand consistency, real-time visibility, operational control as the network grows.',
    // description (previous):
    //   'Complete franchisee lifecycle for food chains, QSR, bakeries and hub-spoke delivery models — from outlet onboarding to royalty management. Indian aggregator-native.',
    description:
      'Multi-brand, multi-location franchise and cloud-kitchen control — from outlet onboarding to royalty management — with live outlet performance analytics and Indian aggregator integrations.',
    seoTitle: 'Franchise Management Software for Food Chains | UpWon',
    metaDescription:
      'Franchise management software for food chains & QSR — outlet onboarding, central kitchen, POS, royalty and SOP audits. Swiggy/Zomato/ONDC-ready. Book a free demo.',
    signatureCapabilities: [
      'Central kitchen plans production from real outlet demand, not guesses.',
      'Royalty calculated straight from POS — no month-end arguments.',
      'Run every outlet from one cockpit with enforced SOPs and audit scoring.',
    ],
    builtFor:
      'Bakery-café chains, Indian & global QSR, mithai franchises, cloud/ghost kitchens, ice-cream parlour chains, and snack & street-food franchises.',
    whyUpWon:
      'Purpose-built for franchise chains running 10–500 outlets on central-kitchen or hub-spoke models, with native Swiggy/Zomato/ONDC links. Single-outlet operators with no expansion plans won\'t need the full suite.',
    features: [
      'Franchisee onboarding & contracts', 'Order processing from outlet to HO',
      'Outlet POS with daily reconciliation', 'Hub-spoke inventory allocation',
      'SOP enforcement & audit tracking', 'Royalty & margin management',
      'Swiggy / Zomato / ONDC integrations', 'Kitchen Display Systems',
    ],
    subsystems: SUBSYSTEMS['fms'],
    modules: [
      { name: 'Franchise Operations', desc: 'Outlet onboarding, ops compliance, audit scoring, menu and pricing control' },
      { name: 'POS & Outlet Sales', desc: 'Cloud POS, multi-tender, KDS, loyalty, delivery aggregator integration' },
    ],
    differentiator: 'Hub-spoke franchise model with ops compliance scoring + native Swiggy/Zomato integration — no ERP has this natively.',
    quickStats: [
      { value: '200+', label: 'Outlets on UpWon FMS across bakery clients' },
      { value: '3×', label: 'Outlet growth without proportional team growth' },
      { value: 'Zero', label: 'Manual royalty calculation errors post-implementation' },
    ],
    heroSlides: [
      {
        eyebrow: 'Built to Scale',
        headline: 'Your Product Is Built to Scale — Now Build the System That Scales With It.',
        subhead: 'The recipe works. Make the operating system work just as hard — across every outlet you open.',
        cta: { label: 'Talk to a Franchise Specialist', to: '/demo' },
        secondaryCta: { label: 'Watch 2-Min Product Tour', to: '/resources' },
        microTrust: 'Monginis scaled from 35 to 200+ outlets on this system — same back-office team.',
        bg: '/images/fms_hero1.webp',
      },
      {
        eyebrow: 'Consistency at Scale',
        headline: 'Your 200th Outlet Will Run as Smooth as Your 5th — With UPWON FMS.',
        subhead: 'Same recipes, same standards, same numbers — whether it is outlet #5 or outlet #200.',
        cta: { label: 'Talk to a Franchise Specialist', to: '/demo' },
        secondaryCta: { label: 'Watch 2-Min Product Tour', to: '/resources' },
        microTrust: 'Monginis scaled from 35 to 200+ outlets on this system — same back-office team.',
        bg: '/images/fms_hero2.webp',
      },
      {
        eyebrow: 'Frictionless Expansion',
        headline: 'Open Outlets — Not Problems.',
        subhead: 'Standardise onboarding, supply and reporting so every new outlet opens clean — not chaotic.',
        cta: { label: 'Talk to a Franchise Specialist', to: '/demo' },
        secondaryCta: { label: 'Watch 2-Min Product Tour', to: '/resources' },
        microTrust: 'Monginis scaled from 35 to 200+ outlets on this system — same back-office team.',
        bg: '/images/fms_hero3.webp',
      },
      {
        eyebrow: 'Cost Control',
        headline: 'Control — As If You Are Standing in Every Shop.',
        subhead: 'Royalty calculated automatically, from real production cost — not an Excel guess.',
        cta: { label: 'Talk to a Franchise Specialist', to: '/demo' },
        secondaryCta: { label: 'Watch 2-Min Product Tour', to: '/resources' },
        microTrust: 'Monginis scaled from 35 to 200+ outlets on this system — same back-office team.',
        bg: '/images/fms_hero4.webp',
      },
    ],
  },
  // POS — split out per client brief: "treat POS as a separate platform … POS is a
  // part of FMS as well but we can sell POS individually also." So POS lives as
  // its own product page while still being available inside the FMS bundle.
  {
    id: 'pos', slug: 'pos', code: 'UpWon POS', icon: PosSmartTerminal,
    title: 'UpWon POS', hero: 'Every Transaction. A Brand Experience.',
    short: 'Outlet POS · Aggregators · Loyalty · Settlement',
    purpose: 'A POS built for Indian F&B — online, offline, aggregator-native.',
    primaryUser: 'Outlet manager · Cashier · COO',
    pain: "Every outlet's POS is a different black box.",
    // description (previous):
    //   'A purpose-built point-of-sale for restaurants, cafés, bakeries, sweet shops and retail chains — online or offline, single store or 200 outlets, with HQ visibility on every transaction.',
    description:
      'A purpose-built POS for restaurants, cafés, bakeries, sweet shops and retail chains — online or offline, single store or 200 outlets, with HQ visibility on every transaction.',
    seoTitle: 'Restaurant & Retail POS Software | UpWon',
    metaDescription:
      'Cloud POS for restaurants, cafés, bakeries & sweet shops. Offline-resilient billing, Swiggy/Zomato/ONDC, loyalty and GST — one tablet, HQ visibility. Book a free demo.',
    signatureCapabilities: [
      'Offline-first billing — sales never stop when the internet does.',
      'Swiggy, Zomato, ONDC, walk-ins and loyalty on one screen, one tablet.',
      'MDR-aware tender routing plus multi-GSTIN compliance at the counter.',
    ],
    builtFor:
      'QSR counters, bakery & patisserie retail, mithai outlets, cafés & coffee shops, ice-cream & dessert counters, casual & fine dining, and pharmacy retail.',
    whyUpWon:
      'Reliability plus HQ analytics for multi-outlet F&B and retail chains. A standalone QSR with a single payment provider and cash-heavy tender can start simpler, but scales onto the same POS.',
    features: [
      'Online + offline-resilient billing', 'Barcode & QR scanning',
      'KOT for dine-in & QSR', 'Swiggy / Zomato / ONDC native',
      'UPI, card, wallet, BNPL', 'Loyalty & vouchers',
      'Multi-GSTIN compliance', 'Hourly sales heat-map',
    ],
    subsystems: SUBSYSTEMS.pos,
    modules: [
      { name: 'Counter Billing', desc: 'Touch-screen POS, KOT, barcode, table management, multi-tender' },
      { name: 'Aggregator Hub', desc: 'Swiggy / Zomato / ONDC in one tablet — menu, pricing, order, settlement' },
      { name: 'Loyalty & CRM', desc: 'Customer profile across outlets, points, tiers, vouchers, WhatsApp campaigns' },
      { name: 'Outlet MIS', desc: 'Sales heat-map, cashier productivity, top sellers, footfall vs conversion' },
    ],
    differentiator: 'Standalone POS that works offline yet streams every sale to HQ — and ships with Swiggy / Zomato / ONDC integrations live on day one.',
    quickStats: [
      { value: '200+', label: 'Live POS terminals across UpWon clients' },
      { value: 'Offline', label: 'Bills keep printing even when internet drops' },
      { value: '4-in-1', label: 'POS + aggregator + loyalty + settlement on one tablet' },
    ],
    heroSlides: [
      {
        eyebrow: 'Retail Sales Engine',
        headline: 'Your Retail Sales — Growth Engine.',
        subhead: 'Swiggy, Zomato, CRM, WhatsApp and loyalty — advanced features that turn every counter into a growth engine.',
        cta: { label: 'Talk to a Retail Specialist', to: '/demo' },
        secondaryCta: { label: 'Watch 2-Min Product Tour', to: '/resources' },
        microTrust: '250+ outlets, 6,000+ orders a day, running on this system today.',
        bg: '/images/pos_hero1.webp',
      },
      {
        eyebrow: 'Control from Anywhere',
        headline: 'Walk Away from the Counter — Not from the Business.',
        subhead: 'A secure working environment, role-based access and a detailed DSR — full control even when you are away from the till.',
        cta: { label: 'Talk to a Retail Specialist', to: '/demo' },
        secondaryCta: { label: 'Watch 2-Min Product Tour', to: '/resources' },
        microTrust: '250+ outlets, 6,000+ orders a day, running on this system today.',
        bg: '/images/pos_hero2.webp',
      },
      {
        eyebrow: 'One Screen',
        headline: 'One Screen for Your Counter — Your Kitchen and Your Stock.',
        subhead: 'One centralised screen. Absolute control from anywhere, everywhere.',
        cta: { label: 'Talk to a Retail Specialist', to: '/demo' },
        secondaryCta: { label: 'Watch 2-Min Product Tour', to: '/resources' },
        microTrust: '250+ outlets, 6,000+ orders a day, running on this system today.',
        bg: '/images/pos_hero3.webp',
      },
      {
        eyebrow: 'Protected Profit',
        headline: 'Accurate Stock — Protected Profit.',
        subhead: 'POS-level recipe management makes it possible — every sale deducts the real ingredients behind it.',
        cta: { label: 'Talk to a Retail Specialist', to: '/demo' },
        secondaryCta: { label: 'Watch 2-Min Product Tour', to: '/resources' },
        microTrust: '250+ outlets, 6,000+ orders a day, running on this system today.',
        bg: '/images/pos_hero4.webp',
      },
      {
        eyebrow: 'Peak-Hour Speed',
        headline: 'Bill in Seconds — Even at Peak Hour.',
        subhead: 'Online and offline billing with auto-sync — the queue never stops, even when the internet does.',
        cta: { label: 'Talk to a Retail Specialist', to: '/demo' },
        secondaryCta: { label: 'Watch 2-Min Product Tour', to: '/resources' },
        microTrust: '250+ outlets, 6,000+ orders a day, running on this system today.',
        bg: '/images/pos_hero5.webp',
      },
    ],
  },
  {
    id: 'hreasy', slug: 'hrms', code: 'UpWon HREasy', icon: HrmsLifecycleArc,
    title: 'UpWon HREasy', hero: 'Less Admin. More Impact. Better People.',
    short: 'Core HR · Payroll · Statutory',
    purpose: 'Full employee lifecycle — recruit to retire — with every statutory complexity handled invisibly, so HR focuses on people, not paperwork.',
    primaryUser: 'HR head · CFO · Compliance',
    pain: 'Every month-end is a compliance emergency.',
    // description (previous):
    //   'Full-cycle HR for food manufacturing — factory floor to statutory compliance. Biometric attendance, multi-location payroll, PF/ESIC/PT/LWF built in.',
    description:
      'Full-cycle HR for food and manufacturing — factory floor to statutory compliance. Recruitment, onboarding, biometric attendance, multi-location payroll, performance and exit on one platform.',
    seoTitle: 'HRMS & Payroll Software for Manufacturing | UpWon',
    metaDescription:
      'HRMS & payroll for manufacturing — biometric attendance, multi-location payroll and PF/ESIC/PT/LWF, plus piecework & daily-wage. Hire-to-retire automation. Book a free demo.',
    signatureCapabilities: [
      'Piecework, daily-wage and salaried staff in one payroll run.',
      'PF, ESIC, PT, TDS and LWF filed before the deadline, every month.',
      'Biometric attendance across plants, field staff and offices.',
    ],
    builtFor:
      'Food & beverage, pharma and FMCG manufacturing, plus IT services, hospitals, universities, and retail chains.',
    whyUpWon:
      'Built for manufacturers and FMCG with 50–5,000 employees and mixed pay types, including Factories Act and contract-labour rules. White-collar SMBs with only salaried payroll can run a lighter setup.',
    features: [
      'Recruitment to retirement lifecycle', 'Biometric attendance integration',
      'PF · ESIC · PT · LWF · Gratuity', 'Multi-location payroll processing',
      'Leave, shift & OT management', 'KRA-KPI based performance',
      'Form 16 · PF challan · ESIC reports', 'Factories Act / contract labour rules',
    ],
    subsystems: SUBSYSTEMS.hrms,
    modules: [
      { name: 'Core HR', desc: 'Employee master, org structure, leave, attendance, performance, document mgmt' },
      { name: 'Payroll', desc: 'Gross-to-net, PF, ESIC, PT, TDS, full & final, payslip portal' },
    ],
    differentiator: 'Indian HR compliance — Factories Act attendance, contract labour rules, multi-state labour laws — all native.',
    quickStats: [
      { value: '36,500+', label: 'Workforce platform users daily' },
      { value: 'Zero', label: 'Statutory filing delays post go-live' },
      { value: '8 hrs', label: 'Monthly payroll cycle — down from days' },
    ],
    heroSlides: [
      {
        eyebrow: 'Scaled Operations',
        headline: 'Scaled Operations, Complex Rules — All in one UpWon HRMS',
        subhead: 'Piecework, daily-wage and salaried staff — every pay type in one payroll run that understands Indian labour law.',
        cta: { label: 'Talk to an HR Systems Specialist', to: '/demo' },
        secondaryCta: { label: 'Watch 2-Min Product Tour', to: '/resources' },
        microTrust: '95% fewer HR errors at Luft Food, across 3 business verticals.',
        bg: '/images/upwon_hrms.webp',
      },
      {
        eyebrow: 'Live, Real-time',
        headline: 'See Your Whole Workforce on One System — Live, Real-time',
        subhead: 'Biometric attendance at the gate, leave requests from a phone — same system.',
        cta: { label: 'Talk to an HR Systems Specialist', to: '/demo' },
        secondaryCta: { label: 'Watch 2-Min Product Tour', to: '/resources' },
        microTrust: '95% fewer HR errors at Luft Food, across 3 business verticals.',
        bg: '/images/live_realtime.webp',
      },
      {
        eyebrow: 'Comprehensive HRMS',
        headline: 'Beyond Payroll & Compliance — Comprehensive HRMS',
        subhead: 'Recruitment, onboarding, attendance, payroll, performance and exit — the whole lifecycle on one platform.',
        cta: { label: 'Talk to an HR Systems Specialist', to: '/demo' },
        secondaryCta: { label: 'Watch 2-Min Product Tour', to: '/resources' },
        microTrust: '95% fewer HR errors at Luft Food, across 3 business verticals.',
        bg: '/images/comprehensive_hrms.webp',
      },
      {
        eyebrow: 'One Platform',
        headline: 'ESS + Payroll + Compliance + EIS + PMS',
        subhead: "One login for HR, whether they're on the floor or in the office — plus a mobile ESS app in every employee's pocket.",
        cta: { label: 'Talk to an HR Systems Specialist', to: '/demo' },
        secondaryCta: { label: 'Watch 2-Min Product Tour', to: '/resources' },
        microTrust: '95% fewer HR errors at Luft Food, across 3 business verticals.',
        bg: '/images/eis_pms.webp',
      },
      {
        eyebrow: 'Multi-State, Hassle-free',
        headline: 'Managing Multi-State Operations & Compliances — Hassle-free',
        subhead: 'PF, ESI, PT, TDS calculated automatically, for every shift, in every state.',
        cta: { label: 'Talk to an HR Systems Specialist', to: '/demo' },
        secondaryCta: { label: 'Watch 2-Min Product Tour', to: '/resources' },
        microTrust: '95% fewer HR errors at Luft Food, across 3 business verticals.',
        bg: '/images/hassle_free.webp',
      },
    ],
  },
  {
    id: 'wms', slug: 'wms', code: 'UpWon WMS', icon: WmsPrecisionGrid,
    title: 'UpWon WMS', hero: 'Every Box. Every Batch. Exactly Where It Should Be.',
    short: 'Advanced Warehouse Management',
    purpose: 'End-to-end warehouse precision — GRN, FIFO/FEFO, lot tracking, pick-pack-dispatch and real-time multi-location stock visibility.',
    primaryUser: 'Warehouse manager · Supply chain head',
    pain: "We lose product to expiry and we don't know why.",
    // description (previous):
    //   'Precision inventory for perishables. Barcode-driven FEFO from GRN through put-away to dispatch. Temperature-zone aware.',
    description:
      'Precision inventory for perishables — barcode-driven FEFO from GRN through put-away to dispatch, temperature-zone aware, with real-time stock at every step.',
    seoTitle: 'Warehouse Management Software for Food | UpWon',
    metaDescription:
      'Warehouse management for perishables — barcode-driven FEFO from GRN to dispatch, temperature zones and live stock valuation. Multi-location & 3PL. Book a free demo.',
    signatureCapabilities: [
      'FEFO enforced at pick — the system blocks the wrong batch.',
      'Ten warehouses, one live stock view, with temperature-zone control.',
      'Dock-to-stock in minutes, pick-to-ship in hours, real-time valuation.',
    ],
    builtFor:
      'Food manufacturing and FMCG distribution warehouses, cold-chain, pharma C&F, 3PL multi-client, e-commerce fulfilment, and auto/engineering parts stores.',
    whyUpWon:
      'Right for multi-location warehouses with 500–50,000 SKUs and perishable or batch needs. Single SKU-light warehouses may not need it; 100k+ SKU operations with a dedicated EWM team sit at the enterprise edge.',
    features: [
      'FEFO-based picking for perishables', 'Multi-location warehouse control',
      'GRN · QC · put-away workflows', 'Pick/pack/ship with barcode',
      'Vendor performance scorecards', '3PL integration',
      'Temperature zone management', 'Real-time stock valuation',
    ],
    subsystems: SUBSYSTEMS.wms,
    modules: [
      { name: 'Warehouse Management', desc: 'FEFO putaway, zone management, pick/pack/ship, barcode/QR, dock scheduling' },
    ],
    differentiator: 'Food-grade FEFO logic with temperature zone management — absent in standard WMS.',
    quickStats: [
      { value: '99.4%', label: 'Stock accuracy post barcode rollout' },
      { value: '70%', label: 'Faster putaway via suggested-bin engine' },
      { value: 'Zero', label: 'Expiry-related dispatch errors' },
    ],
    heroSlides: [
      {
        eyebrow: 'More Powerful, More Advanced',
        headline: 'UpWon WMS — More Powerful & More Advanced',
        subhead: 'A food-grade WMS engineered around batch and shelf life — FEFO, cold-chain zones and lot traceability, not a fashion-warehouse tool bent to fit.',
        cta: { label: 'Talk to a Warehouse Specialist', to: '/demo' },
        secondaryCta: { label: 'Watch 2-Min Product Tour', to: '/resources' },
        microTrust: '99.4% stock accuracy and zero expiry-related dispatch errors after go-live.',
        bg: '/images/more_advance.webp',
      },
      {
        eyebrow: 'Optimum Space Utilization',
        headline: 'Optimum Space Utilization — More Profits',
        subhead: 'Suggested-bin put-away and zone logic pack every rack tighter — more stock in the same footprint, more margin per square foot.',
        cta: { label: 'Talk to a Warehouse Specialist', to: '/demo' },
        secondaryCta: { label: 'Watch 2-Min Product Tour', to: '/resources' },
        microTrust: '99.4% stock accuracy and zero expiry-related dispatch errors after go-live.',
        bg: '/images/more_profit.webp',
      },
      {
        eyebrow: 'Employee Work Tracking',
        headline: 'Employee Work Tracking — More Productivity',
        subhead: 'Task-level visibility on every picker and put-away move — measure throughput, cut idle time and lift output per shift.',
        cta: { label: 'Talk to a Warehouse Specialist', to: '/demo' },
        secondaryCta: { label: 'Watch 2-Min Product Tour', to: '/resources' },
        microTrust: '99.4% stock accuracy and zero expiry-related dispatch errors after go-live.',
        bg: '/images/more_productivity.webp',
      },
      {
        eyebrow: 'Expiry Intelligence',
        headline: "Know Exactly What's About to Expire — Before It Does.",
        subhead: 'FEFO enforced automatically — oldest stock moves first, every time — with expiry alerts before product turns into a write-off.',
        cta: { label: 'Talk to a Warehouse Specialist', to: '/demo' },
        secondaryCta: { label: 'Watch 2-Min Product Tour', to: '/resources' },
        microTrust: '99.4% stock accuracy and zero expiry-related dispatch errors after go-live.',
        bg: '/images/before_it_does.webp',
      },
      {
        eyebrow: 'Batch & Shelf Life',
        headline: 'Built Around Batch and Shelf Life — Not Just SKU Counts.',
        subhead: 'Every batch traceable from raw material to dispatch, cold-chain zones monitored — not just labelled.',
        cta: { label: 'Talk to a Warehouse Specialist', to: '/demo' },
        secondaryCta: { label: 'Watch 2-Min Product Tour', to: '/resources' },
        microTrust: '99.4% stock accuracy and zero expiry-related dispatch errors after go-live.',
        bg: '/images/sku_counts.webp',
      },
    ],
  },
  {
    id: 'vendor-portal', slug: 'vendor-portal', code: 'UpWon Vendor Portal', icon: VmsPartnershipBridge,
    title: 'UpWon Vendor Portal', hero: 'Your Vendors. Your Partners. One Shared Platform.',
    short: 'Supplier Collaboration · Procurement',
    purpose: 'Vendor collaboration & procurement intelligence — digital PO, ASN, invoices, quality scorecards and performance analytics in one shared portal.',
    primaryUser: 'Procurement head · Purchase manager',
    pain: 'Our supplier relationships run on WhatsApp and memory.',
    // description (previous):
    //   'Supplier onboarding, RFQ, PO confirmation, ASN, quality self-certification and payment status — all in one portal.',
    description:
      'Supplier onboarding, RFQ, PO confirmation, ASN, quality self-certification and payment status — one shared portal that ends the daily follow-up calls.',
    seoTitle: 'Vendor Management Portal Software | UpWon',
    metaDescription:
      'Vendor portal software — onboarding, RFQ, PO & ASN, quality self-certification and payment visibility. End the daily follow-up calls. Book a free demo.',
    signatureCapabilities: [
      'Vendors update themselves — every PO, ASN and invoice — with zero coordination calls.',
      'RFQ and quotation comparison plus rate contracts in one place.',
      'Commodity price alerts and scorecards to renegotiate from data, not gut feel.',
    ],
    builtFor:
      'Food & FMCG and pharma manufacturers, supermarket & retail chains, IT services, real-estate developers, hospital groups, and engineering manufacturers.',
    whyUpWon:
      'Built for manufacturers and FMCG with 50–500 active vendors who want self-service procurement. Global enterprises with central procurement teams or sub-25-vendor relationship buying are at the edges of the fit.',
    features: [
      'Vendor onboarding & contracts', 'RFQ & quotation comparison',
      'PO confirmation & ASN', 'Quality self-certification',
      'Payment status visibility', 'Commodity price alerts',
      'Seasonal hedging built in', 'Performance scorecards',
    ],
    subsystems: SUBSYSTEMS['vendor-portal'],
    modules: [
      { name: 'Supplier Collaboration', desc: 'Vendor onboarding, RFQ, PO, ASN, quality self-certification, payment status' },
    ],
    differentiator: 'Supplier quality self-certification portal — reduces inbound QC bottleneck in food manufacturing.',
    quickStats: [
      { value: '500+', label: 'Active vendors on the portal' },
      { value: '60%', label: 'Faster PO-to-GRN cycle' },
      { value: 'Auto', label: '3-way matching at scale' },
    ],
    heroSlides: [
      {
        eyebrow: 'Procurement Teams',
        headline: 'Your vendors — always informed. Your team — always in control.',
        subhead: 'PO tracking, delivery confirmation, invoice processing, quality ratings — vendor self-service that ends the daily follow-up calls.',
        cta: { label: 'See Vendor Portal', to: '/products/vendor-portal' },
        secondaryCta: { label: 'Book a Demo', to: '/demo' },
        bg: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000&q=70',
      },
      {
        eyebrow: 'Manufacturing Companies',
        headline: '50 vendors. One portal — Zero phone calls.',
        subhead: 'Vendor onboarding, PO acknowledgement, ASN, GRN matching and performance scorecards — replace the WhatsApp groups.',
        cta: { label: 'Book a Demo', to: '/demo' },
        secondaryCta: { label: 'See Modules', to: '#modules' },
        bg: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=2000&q=70',
      },
      {
        eyebrow: 'FMCG & Distribution',
        headline: 'Vendor performance data — for every renegotiation.',
        subhead: 'Quality scorecards, delivery-reliability ratings, invoice dispute history — walk into the next price talk armed with data.',
        cta: { label: 'Explore Portal', to: '/products/vendor-portal' },
        secondaryCta: { label: 'Book a Demo', to: '/demo' },
        bg: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=2000&q=70',
      },
    ],
  },
];

// IMPORTANT: Mobile Apps is NOT a platform — it is a cross-cutting mobile
// experience layer that surfaces four role-specific apps (BizPulse, GateMaster,
// Franchise Audit, Van Sales) on top of the 7 platforms above. It used to live
// inside PLATFORM_MODULES, which inflated the platform count to 8 and confused
// the Products mega-menu, the homepage deck and the brief's "7 platforms"
// positioning. It now lives here as a standalone export so the legacy
// /products/mobile-apps route still resolves (ProductPage merges this in
// when resolving slugs) but the mega-menu and platform deck only iterate
// PLATFORM_MODULES (7 entries).
export const MOBILE_EXPERIENCE = {
  id: 'mobile', slug: 'mobile-apps', code: 'UpWon Mobile Experience', icon: Tablet,
  title: 'UpWon Mobile Experience', hero: 'Your business in your pocket. Everywhere you are.',
  short: 'BizPulse · GateMaster · Franchise Audit · Van Sales',
  purpose: 'Cross-cutting mobile layer over the 7 UpWon platforms.',
  primaryUser: 'CEO · Field teams · Gate staff',
  pain: "I only know what's happening when I'm in the office.",
  // description (previous):
  //   'Role-specific mobile apps — for CXOs, plant security, outlet auditors and field sales. Not a platform of its own — each app surfaces data from the underlying UpWon platform that already runs that workflow.',
  description:
    'Role-specific mobile apps for CXOs, plant security, outlet auditors and field sales — each surfaces data from the UpWon platform that already runs that workflow. Designed for patchy plant, route and outlet connectivity.',
  seoTitle: 'Field & Ops Mobile Apps for Food & FMCG | UpWon',
  metaDescription:
    'Role-based mobile apps for CXOs, gate security, outlet auditors and field sales. Offline-first, syncs automatically, native iOS & Android. Book a free demo.',
  signatureCapabilities: [
    'Offline-capable execution — every app keeps working and reconciles when back online.',
    'Photo-evidence workflows for audits, gate entry and inspections.',
    'Push notifications and alerts, native on iOS and Android.',
  ],
  builtFor:
    'Food & beverage manufacturing, FMCG distribution, QSR & franchise chains, warehouse operations, field service, pharma distribution, and retail outlet staff.',
  whyUpWon:
    'Not a platform of its own — each app is the mobile face of the UpWon module that already runs that job, so data is consistent and there\'s no separate system to maintain.',
  features: [
    'BizPulse — owner pulse dashboard', 'GateMaster — gate-pass & vendor entry',
    'Franchise Audit — SOP scoring', 'Van Sales — beat & invoice on the go',
    'Offline-capable execution', 'Photo-evidence workflows',
    'Push notifications & alerts', 'Native iOS + Android',
  ],
  subsystems: SUBSYSTEMS['mobile-apps'],
  modules: [
    { name: 'BizPulse', desc: 'For Owners & CXOs — real-time business pulse on your phone' },
    { name: 'GateMaster', desc: 'For Plant Security — gate-pass workflows, vehicle entry, asset movement' },
    { name: 'Franchise Audit', desc: 'For Outlet Auditors — SOP scoring, hygiene audits, photo evidence' },
    { name: 'Van Sales', desc: 'For Field Sales — beat execution, secondary sales, scheme application' },
  ],
  differentiator: 'Four role-specific apps connected natively to one core. CEO can see what\'s happening at every outlet — without calling anyone.',
  quickStats: [
    { value: '4', label: 'Role-specific apps deployed natively' },
    { value: 'Offline', label: 'All apps work without connectivity' },
    { value: 'iOS + Android', label: 'Single codebase, every device' },
  ],
  heroSlides: [
    {
      eyebrow: 'For Owners & CXOs',
      headline: 'Your business in your pocket — Every morning, 7 a.m.',
      subhead: 'BizPulse delivers live revenue, batch status, outlet performance and distributor health — on the phone, before the day starts.',
      cta: { label: 'See Mobile Suite', to: '/products/mobile-apps' },
      secondaryCta: { label: 'Book a Demo', to: '/demo' },
      bg: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2000&q=70',
    },
    {
      eyebrow: 'For Plant & Outlet Teams',
      headline: 'Gate-pass, audit, beat — all on a single device.',
      subhead: 'GateMaster, Franchise Audit and Van Sales replace paper rounds with photo-evidence workflows tied straight into the ERP.',
      cta: { label: 'See All Apps', to: '/products/mobile-apps' },
      secondaryCta: { label: 'Book a Demo', to: '/demo' },
      bg: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=2000&q=70',
    },
    {
      eyebrow: 'Built for India',
      headline: 'Works offline. Syncs when it can — Never loses a record.',
      subhead: 'Designed for patchy connectivity at plants, on routes and inside outlets — every app keeps working and reconciles when back online.',
      cta: { label: 'Book a Demo', to: '/demo' },
      secondaryCta: { label: 'Explore Apps', to: '/products/mobile-apps' },
      bg: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=2000&q=70',
    },
  ],
};

// Helper for routing: find a product by slug across the 7 platforms PLUS the
// mobile experience layer. Use this in ProductPage so /products/mobile-apps
// still resolves even though it's not in PLATFORM_MODULES.
export const findProductBySlug = (slug) =>
  PLATFORM_MODULES.find((p) => p.slug === slug) ||
  (slug === MOBILE_EXPERIENCE.slug ? MOBILE_EXPERIENCE : undefined);

export const PLATFORM_CAPABILITIES = [
  { icon: Workflow, title: 'One Data Flow', desc: 'Master data managed once, consumed everywhere. Zero integration cost between platforms.' },
  { icon: BarChart3, title: 'Operational Intelligence', desc: 'Pre-built KPIs for batch yield, fill-rate, OTIF, wastage, secondary sales, beat productivity — out of the box.' },
  { icon: ShieldCheck, title: 'Compliance Native', desc: 'FSSAI, GST, e-invoice, FMCG regulations — built in. ISO-aligned, CMM Level 3 process rigour.' },
  { icon: Network, title: 'Open Integrations', desc: 'Zomato, Swiggy, ONDC, Pine Labs, Paytm, UPI, SAP, Tally, eSSL biometric — pre-built connectors live.' },
  { icon: Boxes, title: 'Modular Adoption', desc: 'Start with one platform. Add others as you grow. Native, not bolted on. Everything connects.' },
  { icon: Sparkles, title: 'AI-Powered', desc: 'Demand forecasting, NL Copilot, quality alerts, anomaly detection — intelligence at every step.' },
  { icon: ScanBarcode, title: 'Barcode & IoT Native', desc: 'Scanner-first execution flows from RM intake through batch traceability to outlet dispatch.' },
];

export const MOBILE_APPS = [
  { icon: Smartphone, title: 'BizPulse', role: 'For Owners & CXOs', desc: 'Real-time business pulse on your phone — revenue, batch status, outlet performance, distributor health.' },
  { icon: ShieldQuestion, title: 'GateMaster', role: 'For Plant Security', desc: 'Gate-pass workflows, vendor check-in, vehicle entry, asset movement — tied to your ERP in real time.' },
  { icon: ClipboardCheck, title: 'Franchise Audit', role: 'For Outlet Auditors', desc: 'SOP scoring, hygiene audits, photo evidence, action tracking — outlet-by-outlet compliance.' },
  { icon: Activity, title: 'Van Sales', role: 'For Field Sales', desc: 'Beat execution, secondary sales, scheme application, cash collection, on-route invoicing.' },
];

// ─────────────────────────────────────────────────────────────────────────────
// HONEST_COMPARISON — per-platform 3-way honest comparison
// Each entry has the rows (criteria + 3 columns) AND the competitor labels
// shown in the table header. Rows reuse the keys { upwon, sap, tally,
// sapTone, tallyTone } for backward compatibility — those are now generic
// "left competitor" and "right competitor" buckets regardless of the actual
// labels. Tones: 'crit' (red), 'warn' (amber), 'neutral' (cream), 'good'
// (green).
// ─────────────────────────────────────────────────────────────────────────────
export const HONEST_COMPARISON = {
  erp: {
    competitorA: 'SAP Business One',
    competitorB: 'Tally + Excel',
    rows: [
      { criteria: 'Food industry fit', upwon: 'Built exclusively for food — batch, FEFO, QC, recipe out of the box', sap: 'Generic ERP — food customisations are expensive add-ons', tally: 'Accounting only — no production, no batch, no QC', sapTone: 'crit', tallyTone: 'warn' },
      { criteria: 'Implementation time', upwon: '30–45 days to fully live', sap: '12–24 months typical for food companies', tally: 'Immediate — but stays limited forever', sapTone: 'crit', tallyTone: 'neutral' },
      { criteria: 'Implementation cost', upwon: 'Included in contract — no surprise bills', sap: '₹20–50 lakh billed separately by partner', tally: 'Cheap upfront — costly when you try to scale', sapTone: 'crit', tallyTone: 'warn' },
      { criteria: 'Multi-plant support', upwon: 'Designed for it — Monginis: 16 plants, one login', sap: 'Supported but expensive to configure', tally: 'One Tally file per plant — nightmare to consolidate', sapTone: 'neutral', tallyTone: 'crit' },
      { criteria: 'Mobile access', upwon: 'Full BizPulse mobile dashboard included', sap: 'Available at extra cost via mobile client', tally: 'None — desktop-only, no real-time view', sapTone: 'neutral', tallyTone: 'crit' },
      { criteria: 'Right fit for', upwon: 'Food companies ₹5–200 Cr wanting food-specific ERP in 45 days', sap: 'Enterprises above ₹200 Cr with dedicated IT teams', tally: 'Very small businesses with simple accounting needs', sapTone: 'neutral', tallyTone: 'neutral' },
    ],
  },
  'sfa-dms': {
    competitorA: 'Bizom / BeatRoute',
    competitorB: 'WhatsApp + Excel',
    rows: [
      { criteria: 'Native DMS integration', upwon: 'Same data layer as your ERP — secondary sales, primary, stock are one chain', sap: 'SFA only — DMS sold separately; integration is your problem', tally: 'No integration — orders re-keyed into Tally manually', sapTone: 'warn', tallyTone: 'crit' },
      { criteria: 'Scheme engine', upwon: 'Auto-claim with phantom-claim leakage detection', sap: 'Configurable but limited; complex schemes need custom code', tally: 'Calculated by hand; settlement disputes routine', sapTone: 'warn', tallyTone: 'crit' },
      { criteria: 'Offline mode', upwon: 'Full offline-first — order, attendance, photo sync on reconnect', sap: 'Offline order capture; photos and beat data drop frequently', tally: 'No mobile — desktop-tied', sapTone: 'warn', tallyTone: 'crit' },
      { criteria: 'Implementation time', upwon: '21–30 days for ≤200 reps', sap: '60–90 days; principal-system integration adds more', tally: 'No SFA — built ad-hoc on spreadsheets and chat', sapTone: 'warn', tallyTone: 'neutral' },
      { criteria: 'Secondary sales visibility', upwon: 'Same-day, drill-down to outlet × SKU × rep', sap: 'Visible weekly after distributor uploads', tally: 'Visible monthly when distributor files claims', sapTone: 'warn', tallyTone: 'crit' },
      { criteria: 'Right fit for', upwon: 'FMCG brands & distributors 50–800 reps wanting closed-loop primary→secondary visibility', sap: 'Large MNCs with dedicated SFA admin team', tally: 'Single-distributor operations with <10 reps', sapTone: 'neutral', tallyTone: 'neutral' },
    ],
  },
  fms: {
    competitorA: 'Petpooja / Posist',
    competitorB: 'WhatsApp + Tally',
    rows: [
      { criteria: 'Hub-spoke central kitchen', upwon: 'Central kitchen demand consolidation built-in — production plan auto-generated', sap: 'Limited — kitchen module is bolt-on; consolidation manual', tally: 'No central kitchen module — WhatsApp orders, Excel planning', sapTone: 'warn', tallyTone: 'crit' },
      { criteria: 'Outlet POS + back-office', upwon: 'Same UI, same data — POS to royalty in one platform', sap: 'POS only — back-office is separate integration project', tally: 'No POS — third-party billing software needed', sapTone: 'warn', tallyTone: 'crit' },
      { criteria: 'Royalty automation', upwon: 'Auto-calculated from POS daily — franchisee statement on the 1st', sap: 'POS data must be exported and reconciled monthly', tally: 'Manual calculation; dispute-prone', sapTone: 'warn', tallyTone: 'crit' },
      { criteria: 'Aggregator integration', upwon: 'Swiggy, Zomato, ONDC native — orders + settlement auto-matched', sap: 'Aggregator orders need plug-ins per platform', tally: 'No integration — settlement reconciled manually', sapTone: 'warn', tallyTone: 'crit' },
      { criteria: 'Multi-outlet visibility', upwon: 'Live across 200+ outlets — sales, stock, KOT throughput', sap: 'Visible outlet-by-outlet; consolidation is a report job', tally: 'No consolidation — outlets call HQ for status', sapTone: 'warn', tallyTone: 'crit' },
      { criteria: 'Right fit for', upwon: 'Franchise chains 10–500 outlets running CK or hub-spoke', sap: 'Single-outlet or small chains with simple menus', tally: 'Owner-operated single outlets with no expansion plans', sapTone: 'neutral', tallyTone: 'neutral' },
    ],
  },
  pos: {
    competitorA: 'Petpooja / inResto',
    competitorB: 'Standalone billing SW',
    rows: [
      { criteria: 'Offline-first reliability', upwon: 'Sales captured locally; sync on reconnect with zero loss', sap: 'Offline supported; conflict resolution can lose lines', tally: 'Stops working on internet outage', sapTone: 'warn', tallyTone: 'crit' },
      { criteria: 'KOT routing & KDS', upwon: 'Order routed to right station; KDS bumps when prepared', sap: 'Available but extra licence; KDS often add-on', tally: 'Printed KOT only — no kitchen visibility', sapTone: 'warn', tallyTone: 'crit' },
      { criteria: 'EOD reconciliation', upwon: 'Cash + card + UPI + wallet auto-matched at shift close', sap: 'Manual matching per tender type', tally: 'End-of-day tally manual; cashier disputes common', sapTone: 'warn', tallyTone: 'crit' },
      { criteria: 'Loyalty & customer DB', upwon: 'Customer + loyalty + analytics tied to bill at counter', sap: 'Loyalty module separate licence', tally: 'No customer DB at counter', sapTone: 'warn', tallyTone: 'crit' },
      { criteria: 'Tender mix optimisation', upwon: 'MDR routing to lowest-cost rail per bill', sap: 'Static tender setup; manual optimisation', tally: 'No MDR awareness', sapTone: 'warn', tallyTone: 'crit' },
      { criteria: 'Right fit for', upwon: 'Multi-outlet F&B and retail chains needing reliability + analytics', sap: 'Standalone QSR or café with a single payment provider', tally: 'Very small outlet with cash-dominant tender mix', sapTone: 'neutral', tallyTone: 'neutral' },
    ],
  },
  hrms: {
    competitorA: 'Keka / Darwinbox',
    competitorB: 'Tally Payroll',
    rows: [
      { criteria: 'Mixed-workforce payroll', upwon: 'Piecework + daily-wage + salaried + contractor — single run', sap: 'Each pay type often a separate module', tally: 'Salaried payroll only; piecework manual', sapTone: 'warn', tallyTone: 'crit' },
      { criteria: 'Statutory automation', upwon: 'PF + ESIC + PT + LWF + TDS auto-filed; Form 16/24Q/26Q generated', sap: 'Auto-calc; filing often manual via JSON download', tally: 'PF/ESIC manual; TDS basic; LWF rarely supported', sapTone: 'warn', tallyTone: 'crit' },
      { criteria: 'Biometric & GPS attendance', upwon: 'eSSL / Mantra + GPS-tagged mobile attendance native', sap: 'Biometric supported; GPS attendance often extra', tally: 'No native attendance — third-party feed needed', sapTone: 'warn', tallyTone: 'crit' },
      { criteria: 'ESS (Employee Self Service)', upwon: 'Mobile app — leave, payslip, claims, reimbursement', sap: 'ESS available; mobile app is separate', tally: 'No ESS — employees email HR for everything', sapTone: 'warn', tallyTone: 'crit' },
      { criteria: 'Performance management', upwon: 'Goals → check-ins → 360° → appraisal → salary linkage', sap: 'Available as separate module', tally: 'Not available', sapTone: 'warn', tallyTone: 'crit' },
      { criteria: 'Right fit for', upwon: 'Manufacturers & FMCG with 50–5,000 employees and mixed pay types', sap: 'White-collar SMBs with simple salaried payroll', tally: 'Sub-25 employees on salaried payroll only', sapTone: 'neutral', tallyTone: 'neutral' },
    ],
  },
  wms: {
    competitorA: 'SAP EWM',
    competitorB: 'Excel + Manual',
    rows: [
      { criteria: 'FEFO for perishables', upwon: 'Enforced at pick — system blocks non-FEFO picks', sap: 'Configurable but rarely enforced in practice', tally: 'No expiry awareness — manual stock rotation', sapTone: 'warn', tallyTone: 'crit' },
      { criteria: 'Pick strategies', upwon: 'Discrete / batch / zone / wave / cluster — pick chosen per order profile', sap: 'Supports all — but configuration is expensive', tally: 'Single strategy — usually first-found', sapTone: 'warn', tallyTone: 'crit' },
      { criteria: 'Dock-to-stock time', upwon: 'Tracked live; alerts on overshoot', sap: 'Reported, not enforced', tally: 'Not measured', sapTone: 'warn', tallyTone: 'crit' },
      { criteria: 'Cycle counting', upwon: 'Rolling perpetual — no annual stock-take needed', sap: 'Supported but requires scheduling discipline', tally: 'Annual physical count only', sapTone: 'warn', tallyTone: 'crit' },
      { criteria: 'Mobile / scanner native', upwon: 'Barcode + handheld + voice-pick supported', sap: 'Supported with proprietary devices and SAP licences', tally: 'Manual entry; barcode rarely used', sapTone: 'warn', tallyTone: 'crit' },
      { criteria: 'Right fit for', upwon: 'Multi-location warehouses 500–50,000 SKUs with perishable / batch needs', sap: 'Enterprise WMS for 100k+ SKU operations with EWM team', tally: 'Single-warehouse SKU-light operations', sapTone: 'neutral', tallyTone: 'neutral' },
    ],
  },
  'vendor-portal': {
    competitorA: 'SAP Ariba / Coupa',
    competitorB: 'Email + Excel',
    rows: [
      { criteria: 'Vendor self-onboarding', upwon: 'Digital KYC + GST + PAN validation in a single workflow', sap: 'Robust but complex; vendor often needs support', tally: 'Vendor master maintained in your Tally; vendor offline', sapTone: 'warn', tallyTone: 'crit' },
      { criteria: 'RFQ / reverse auction', upwon: 'Built-in — RFI → RFQ → reverse auction → PO', sap: 'Available; configuration adds months', tally: 'Not available — quotes captured via email', sapTone: 'warn', tallyTone: 'crit' },
      { criteria: '3-way match (PO/GRN/Invoice)', upwon: 'Auto-matched with TDS/GST validation before AP release', sap: 'Available; setup complex', tally: 'Manual matching; AP cycle 7–10 days', sapTone: 'warn', tallyTone: 'crit' },
      { criteria: 'Vendor scorecard', upwon: 'On-time + quality + price + docs — live, exportable', sap: 'Available; configuration billed', tally: 'Subjective — based on AP team memory', sapTone: 'warn', tallyTone: 'crit' },
      { criteria: 'MSME compliance', upwon: 'MSMED Act ≤45-day payment auto-tracked + alerted', sap: 'Reportable; not enforced by default', tally: 'Not tracked — risk of penalty', sapTone: 'warn', tallyTone: 'crit' },
      { criteria: 'Right fit for', upwon: 'Manufacturers & FMCG with 50–500 active vendors', sap: 'Global enterprises with central procurement teams', tally: 'Sub-25 vendor count with relationship-driven buying', sapTone: 'neutral', tallyTone: 'neutral' },
    ],
  },
};

// Per-platform FAQ — brief §2.12 (8 product-specific questions). Rendered on
// each ProductPage at the #faq anchor and also emitted as FAQPage schema, so
// the on-page accordion and the structured data never drift apart.
export const PRODUCT_FAQS = {
  erp: [
    { q: 'How long does UpWon ERP take to implement for a food manufacturer?', a: 'Most food manufacturers go live in 30–45 days. Because batch, recipe, FSSAI and FEFO workflows ship out-of-box, we configure rather than custom-build — Monginis went live across 16 plants in 30 days, Kaka Halwai across 3 plants in 45.' },
    { q: 'Can we migrate our data from Tally or Excel?', a: 'Yes. Tally, Marg, Busy, Excel and custom systems are all standard migrations. We map and clean your existing data, migrate masters first then transactions, and run a week of parallel validation before cutover — you sign off only at 100% reconciliation.' },
    { q: 'Does it support multi-plant, multi-location operations?', a: 'It is designed for it. Multiple plants run on one login with consolidated production, inventory, costing and finance — no separate files to reconcile, no per-plant data silos.' },
    { q: 'How is FSSAI compliance handled across product categories?', a: 'Natively. Licence tracking with renewal alerts, batch-level traceability, allergen flagging on recipes, and audit-ready documents per category — so an inspection is one click, not a week of paper-chase.' },
    { q: 'Is there a mobile app for production-floor supervisors?', a: 'Yes — a shop-floor tablet app for production start/stop, batch yield entry, QC sign-off and shift handover, plus the BizPulse owner app for live plant status on the phone. Both work offline and sync when connectivity returns.' },
    { q: 'Cloud or on-premise — and where does our data live?', a: 'Cloud-native, hosted in the AWS Mumbai region so your data stays in India, with role-based access and encrypted backups. No server room or in-house IT team needed to run it.' },
    { q: 'Can it handle piecework and daily-wage payroll for factory workers?', a: 'Yes, through the connected HREasy module — salaried, daily-wage, piecework and contract labour are all handled in a single payroll run with PF/ESIC/PT and Factories Act compliance built in.' },
    { q: 'What does support look like after go-live?', a: '90-day hyper-care with a dedicated SPOC and 1-hour P1 SLA is included by default, followed by a named Customer Success Manager and priority ticketed support. We do not disappear after launch.' },
  ],
  'sfa-dms': [
    { q: 'Will our field team actually adopt the salesman app?', a: 'Adoption is typically high because order booking takes under 60 seconds and works offline. Reps see retailer history, outstanding and eligible schemes at the point of sale, and GPS logs the visit automatically — most teams are live within 2 days with near-zero training.' },
    { q: 'Does the app work without internet on the beat?', a: 'Yes. It is offline-first — orders, visits and collections are captured on patchy connectivity and sync automatically when the device is back online, so no data is lost in low-signal markets.' },
    { q: 'How does scheme management eliminate claim disputes?', a: 'Schemes (flat, slab, quantity, combo, seasonal) are auto-applied at order booking and claims are auto-computed at month-end. The distributor sees the same numbers you do in real time, so reconciliation drops from weeks to days and phantom claims are flagged.' },
    { q: 'Can it integrate with our principal brand’s DMS and our Tally?', a: 'Yes — it connects to major principal DMS systems, Tally, GST and the e-way bill portal, plus WhatsApp for order confirmations. SFA and DMS share one data layer, so secondary sales and stock are always consistent.' },
    { q: 'How quickly do we get secondary-sales visibility?', a: 'Same day. Retailer-level sell-out is captured on the mobile app and reflected on the dashboard immediately — not consolidated from Excel on the 10th of next month.' },
    { q: 'What hardware does the salesman need?', a: 'Any Android smartphone — the app is built to run well on entry-level (~₹8,000) devices, so you do not have to buy new hardware for the field force.' },
    { q: 'Does it cover van sales and pre-sales models?', a: 'Both. Van loading, delivery with digital POD, cash collection and end-of-day stock-vs-sales reconciliation are built in, alongside the pre-sell beat workflow — switchable per territory.' },
    { q: 'How long before the distribution team is fully live?', a: 'Typical SFA-DMS rollouts go live in 30–45 days including distributor onboarding, with average payback of 4–6 months for distributors running 10+ salesmen.' },
  ],
  'fms': [
    { q: 'How many outlets can UpWon FMS scale to?', a: 'From 5 to 500+. U2 Cake & Burger runs 250+ outlets and Monginis 200+, all on one HQ dashboard with hub-spoke ordering, central-kitchen consolidation and outlet rollups.' },
    { q: 'Does the outlet POS work offline?', a: 'Yes — billing keeps running through internet drops and every sale streams to HQ the moment connectivity returns, so you never lose a transaction during peak hours.' },
    { q: 'How is franchise royalty calculated?', a: 'Automatically, from verified POS sales — not franchisee-submitted reports. Both franchisor and franchisee see the same numbers, which removes the monthly royalty dispute entirely.' },
    { q: 'Does it integrate with Swiggy, Zomato and ONDC?', a: 'Natively. Aggregator orders flow into the same POS and KDS as walk-ins on a single tablet, with menu/price sync and payout reconciliation — no separate device per channel.' },
    { q: 'How does it keep SOPs consistent across every outlet?', a: 'A digital audit app scores hygiene, branding and operational SOPs per outlet with photo evidence, flags non-compliance and assigns corrective actions — so the 200th outlet runs like the first without a manual visit.' },
    { q: 'Can the central kitchen plan production from outlet demand?', a: 'Yes. Outlet orders are consolidated into an auto production plan with FEFO dispatch and route-wise delivery — replacing the WhatsApp ordering and the “where is my order” calls.' },
    { q: 'What POS hardware is required?', a: 'A standard Android tablet runs the full POS, KOT/KDS and aggregator hub. Receipt printers, barcode scanners and UPI/card terminals (Pine Labs, Paytm) are supported out of the box.' },
    { q: 'How long does a franchise rollout take?', a: '30–45 days for the platform, then a phased wave rollout across outlets with on-site support — U2 Cake went live across 250+ outlets in 30 days with zero P1 incidents.' },
  ],
  pos: [
    { q: 'Does the POS keep working when the internet goes down?', a: 'Yes — it is offline-first. Bills keep printing and orders keep flowing, then every sale syncs to HQ automatically when connectivity returns. You never stop billing during a peak rush.' },
    { q: 'Can one tablet handle Swiggy, Zomato, walk-ins and loyalty?', a: 'It is built for exactly that — counter orders, aggregator orders, loyalty and settlement all run on one screen, so staff stop juggling four tablets at the till.' },
    { q: 'Is the POS GST-compliant for multi-outlet brands?', a: 'Yes. Multi-GSTIN by outlet/state, GST-format invoices, e-invoice trigger above threshold and a daily GST liability report are all built in.' },
    { q: 'How does HQ see outlet sales?', a: 'In real time — live sales feed by hour/day-part/SKU, cash reconciliation per shift, and a CEO mobile dashboard. No end-of-day report chasing.' },
    { q: 'Can we sell POS without the full franchise suite?', a: 'Yes. POS is sold standalone for single stores or chains and also ships inside the FMS bundle — start with POS and add franchise operations later without re-platforming.' },
    { q: 'Which payment methods and terminals are supported?', a: 'UPI, cards, wallets and BNPL via Pine Labs, Paytm and Razorpay terminals, with auto-settlement reconciliation and an approval-gated refund/void workflow.' },
    { q: 'Does it support menu and pricing control from HQ?', a: 'Yes — one menu/price change at HQ propagates to every outlet in seconds, with location-based pricing, combos and time-bound day-part menus.' },
    { q: 'How fast can a new outlet be live on POS?', a: 'A new outlet can be configured and billing within a day once the menu and tax masters are set, because the POS inherits the chain’s central configuration.' },
  ],
  hrms: [
    { q: 'Can HREasy handle mixed workforces — salaried, daily-wage and piecework?', a: 'Yes — that is its core strength. Salaried staff, daily-wage workers, piecework labour and contract employees are processed in a single payroll run, which is exactly the manufacturing reality generic HR tools miss.' },
    { q: 'Which Indian statutory requirements are automated?', a: 'PF, ESIC, PT, LWF, TDS and gratuity are auto-calculated and filed, with PF challans, ESIC returns, Form 16 and 24Q auto-generated and a statutory calendar that alerts before every deadline.' },
    { q: 'How does attendance work across plants, field staff and offices?', a: 'Biometric devices for plants, geo-tagged mobile punch for field staff and web for office — all consolidated to one screen, with shift rosters, overtime and multi-location policies handled centrally.' },
    { q: 'How long does monthly payroll take after go-live?', a: 'Hours, not days. Salary auto-computes from attendance, deductions apply automatically and bank-transfer files plus payslips generate in one pass — customers report month-end going from 5 days to under a day.' },
    { q: 'Is there an employee self-service app?', a: 'Yes — mobile attendance and leave, payslip and Form 16 download, reimbursement claims with bill upload, and a helpdesk, so routine HR queries are resolved without HR.' },
    { q: 'Does it cover the full hire-to-retire lifecycle?', a: 'Recruitment, onboarding, attendance, payroll, performance (KRA/KPI with 360 feedback), learning and exit/full-and-final — all on one employee master, so data is never re-entered between modules.' },
    { q: 'Does it support multi-state payroll?', a: 'Yes — multi-state PT, state-specific labour rules and multi-location consolidation are built in, so a workforce spread across states runs on one system.' },
    { q: 'Can it run standalone or only with UpWon ERP?', a: 'Either. HREasy works as a standalone HR & payroll platform for any business type, or connected to UpWon ERP/FMS so factory and outlet attendance feed payroll directly.' },
  ],
  wms: [
    { q: 'How does FEFO enforcement actually work?', a: 'The system picks the oldest/earliest-expiry batch first at pick-list generation — it is enforced, not advisory — with expiry alerts at 30/60/90-day windows and a quarantine workflow for near-expiry stock. The result is zero short-expiry write-offs on dispatched goods.' },
    { q: 'Can it run without the full UpWon ERP?', a: 'Yes — WMS deploys standalone for a warehouse or 3PL operation, or connected to ERP so production batch numbers carry through for full traceability.' },
    { q: 'Does it support multi-location and 3PL warehouses?', a: 'Unlimited locations on one dashboard, inter-location transfers, location-wise valuation and a 3PL connector with real-time stock sync — in-house and outsourced warehouses on one platform.' },
    { q: 'What hardware is needed for scanning?', a: 'Android/iOS handheld scanners or phones run GRN, put-away, picking, cycle count and damage reporting. No specialised proprietary hardware is required to start.' },
    { q: 'Does it handle cold-chain and temperature zones?', a: 'Yes — multi-zone layouts with temperature-zone tracking and integration with temperature logs, built for dairy, frozen and pharma-grade perishable storage.' },
    { q: 'How much faster is GRN and putaway?', a: 'Barcode-driven receiving with a suggested-bin engine typically cuts GRN time by ~50% and speeds putaway ~70%, while pushing stock accuracy above 99% after rollout.' },
    { q: 'Can it value stock accurately for audits?', a: 'Yes — multi-method valuation (FIFO, weighted average), real-time value by location, ageing and dead-stock alerts, and a full movement audit trail so the system matches the physical count every year.' },
    { q: 'How quickly can WMS go live?', a: 'A focused WMS rollout is typically live in about 4 weeks, including bin mapping, master migration and scanner training.' },
  ],
  'vendor-portal': [
    { q: 'What does the vendor self-service portal remove?', a: 'It replaces the PO-by-email, acknowledge-on-WhatsApp, deliver-on-call cycle with a single auditable flow — vendors confirm POs, upload ASNs and invoices and see payment status themselves, so your team stops chasing.' },
    { q: 'How does vendor quality self-certification work?', a: 'Vendors upload pre-dispatch QC reports and batch lab certificates against auto-acceptance rules, which removes the inbound-QC bottleneck while keeping a full compliance trail and a dispute workflow.' },
    { q: 'Does it handle PO, ASN and 3-way matching?', a: 'Yes — PO confirmation, advance shipment notice, GRN and automated 3-way matching with TDS tracking and GST input-credit reconciliation, so invoice processing drops from days to about a day.' },
    { q: 'Can we score and compare vendor performance?', a: 'Every vendor gets an on-time-delivery, quality-acceptance, price-competitiveness and documentation-accuracy scorecard, exportable for renegotiation — performance reviews run on data, not relationships.' },
    { q: 'Does it integrate with UpWon ERP procurement?', a: 'Yes — it shares the ERP’s vendor masters, rate contracts and commodity price alerts, so procurement, GRN and finance all work from one source of truth.' },
    { q: 'How many vendors can it manage?', a: 'It scales from 50 to several hundred active vendors with tiered classification, RFQ broadcasts and reverse-auction support for best-price discovery.' },
    { q: 'Is vendor onboarding compliant and auditable?', a: 'Onboarding captures digital KYC, GST and PAN validation and compliance documents with tiered approval, so every vendor is fully documented and auditable from day one.' },
    { q: 'What payback do procurement teams typically see?', a: 'Customers report ~60% fewer coordination calls, a 5-day to 1-day invoice cycle, and around 8% procurement savings from data-backed renegotiation.' },
  ],
  'mobile-apps': [
    { q: 'Which role-specific apps are included?', a: 'BizPulse for owners/CXOs, GateMaster for plant security, Franchise Audit for outlet auditors and Van Sales for field reps — each connected natively to the core platform, plus shop-floor, driver and inspector apps.' },
    { q: 'Do the apps work offline?', a: 'Yes — all apps are offline-capable. They keep working through patchy connectivity at plants, on routes and inside outlets, and reconcile automatically when back online so no record is lost.' },
    { q: 'What does the BizPulse owner app show?', a: 'Live revenue, plant-wise production status, outlet sales by hour and distributor health on your phone — with CXO alerts on threshold breaches and drill-down to batch, shift or SKU.' },
    { q: 'Are the apps available on both iOS and Android?', a: 'Yes — a single codebase ships to both iOS and Android, so every device in the field runs the same up-to-date app.' },
    { q: 'How do the apps connect to the core platform?', a: 'They are not separate products — each app reads and writes to the same UpWon data layer in real time, so a gate entry, an audit score or a field order appears in the ERP immediately.' },
    { q: 'Can outlet audits capture photo and video evidence?', a: 'Yes — the Franchise Audit app records photo/video evidence against a digital checklist, scores each outlet, and assigns corrective actions with follow-up tracking.' },
    { q: 'Do field reps need separate logins per app?', a: 'No — a role determines which apps and data a user sees under one identity, so a rep, auditor or security guard each gets the right app without managing multiple accounts.' },
    { q: 'Is there a cost for the mobile apps?', a: 'The four role apps are included with the platform — not a paid add-on — so mobile access ships with your UpWon deployment.' },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PLATFORM_VOCABULARY — expert glossary per platform
// One block per platform, ~15-25 terms each. Drives the on-page vocabulary
// block beneath IntegrationsSection so each product page speaks the exact
// language a buyer in that workflow already uses.
// Shape mirrors INDUSTRY_VOCABULARY in industryExtras.js: { term, full, context }
// ─────────────────────────────────────────────────────────────────────────────
export const PLATFORM_VOCABULARY = {
  erp: {
    label: 'ERP — Food Manufacturing',
    blurb: 'The expert language of plant operations, batch production and food-safety compliance.',
    terms: [
      { term: 'BOM', full: 'Bill of Materials', context: 'recipe / formulation that defines every raw and packing input per finished SKU' },
      { term: 'BPR', full: 'Batch Production Record', context: 'regulatory document capturing actual quantities, conditions and yields per batch' },
      { term: 'MRP', full: 'Material Requirements Planning', context: 'auto-generates POs and work orders from sales forecasts and stock-on-hand' },
      { term: 'MPS', full: 'Master Production Schedule', context: 'consolidates demand into a time-phased plant load by shift and line' },
      { term: 'Yield %', full: 'Output as % of input', context: '"bakery yield is 92% — 8% process loss"; tracked per batch, shift, operator' },
      { term: 'Process Loss', full: 'Material lost during production', context: 'peeling, trimming, cooking, spillage; gap between BOM and actual' },
      { term: 'OEE', full: 'Overall Equipment Effectiveness', context: 'Availability × Performance × Quality — the line manager’s headline KPI' },
      { term: 'Changeover', full: 'Changeover time', context: 'minutes lost between SKUs; SMED-led reduction is a yield lever' },
      { term: 'FIFO / FEFO', full: 'First In First Out / First Expired First Out', context: 'stock-rotation rule; FEFO supersedes FIFO for perishable food' },
      { term: 'RM / PM / FG / WIP', full: 'Raw / Packing / Finished / Work In Progress', context: 'standard material classes for any ERP inventory ledger' },
      { term: 'COA', full: 'Certificate of Analysis', context: 'lab-test results tied to a batch — required for QC release' },
      { term: 'Retained Sample', full: 'Retained Sample', context: 'mandatory GMP — sample kept until shelf-life + 6 months' },
      { term: 'CAPA', full: 'Corrective and Preventive Action', context: 'workflow that converts a quality deviation into a logged root-cause fix' },
      { term: 'GMP / HACCP', full: 'Good Manufacturing Practice / Hazard Analysis Critical Control Points', context: 'FSSAI-mandated food-safety frameworks; ERP holds the auditable trail' },
      { term: 'ISO 22000 / FSSC 22000', full: 'Food Safety Management Standards', context: 'global certifications enforced through ERP’s document and CAPA modules' },
      { term: 'Mock Recall', full: 'Mock Recall', context: 'periodic exercise — forward + backward trace in under 2 minutes' },
      { term: 'e-Invoice / e-Way Bill', full: 'GST e-invoice & e-way bill', context: 'auto-generated at dispatch — IRN, QR, transporter ID built in' },
      { term: 'Traceability', full: 'Lot-level traceability', context: 'finished SKU → batch → raw material lot → vendor; required for recall' },
      { term: 'Cost Roll-Up', full: 'Cost Roll-Up', context: 'live material + labour + overhead cost per SKU per batch' },
    ],
  },
  'sfa-dms': {
    label: 'SFA-DMS — Field Sales & Distribution',
    blurb: 'The language of the field rep, the distributor and the FMCG sales hierarchy.',
    terms: [
      { term: 'PJP', full: 'Permanent Journey Plan', context: 'the predefined route a rep walks each day; the SFA enforces compliance' },
      { term: 'Beat', full: 'Beat', context: 'pre-defined outlet sequence on a PJP — "Nashik East beat, Mon"' },
      { term: 'Beat Productivity', full: 'Beat Productivity', context: 'revenue per beat per day — the primary rep KPI' },
      { term: 'Productive Call', full: 'Productive Call', context: 'outlet visit that ends in an order; productivity = productive calls ÷ total calls' },
      { term: 'Outlet Universe', full: 'Outlet Universe', context: 'total addressable retail outlets in a defined territory' },
      { term: 'ECO', full: 'Effective Coverage Outlets', context: 'outlets that bought in the last 30 days — a real coverage measure' },
      { term: 'Numeric Distribution', full: 'Numeric Distribution', context: '% of outlets selling your SKU' },
      { term: 'Weighted Distribution', full: 'Weighted Distribution', context: '% of category sales coming from outlets stocking your brand' },
      { term: 'Primary / Secondary / Tertiary Sales', full: 'Channel sell-in / sell-through / sell-out', context: 'manufacturer → distributor → retailer → consumer; closed loop in DMS' },
      { term: 'Offtake', full: 'Offtake', context: 'true consumer pull — secondary or tertiary, never primary' },
      { term: 'PTR / PTS / PTC', full: 'Price to Retailer / Stockist / Chemist', context: 'tiered pricing per channel — managed by the scheme engine' },
      { term: 'Wet / Dry Scheme', full: 'Wet vs Dry Scheme', context: 'wet = cash discount; dry = free goods. DMS auto-applies and claims back' },
      { term: 'Scheme Claim', full: 'Scheme Claim', context: 'distributor → company reimbursement on scheme payout; leakage flagged' },
      { term: 'Debit / Credit Note', full: 'DN / CN', context: 'distributor raises DN for damage / scheme / shortage; company issues CN' },
      { term: 'SOH', full: 'Stock on Hand', context: 'live distributor inventory by SKU — drives auto-replenishment' },
      { term: 'DOS', full: 'Days of Stock', context: 'SOH ÷ avg daily sales; SFA targets 15–20 days' },
      { term: 'AOV / LPC', full: 'Average Order Value / Lines Per Call', context: 'per-call quality metrics — bigger AOV, more lines, fewer calls win' },
      { term: 'DSR', full: 'Daily Sales Report', context: 'auto-generated from rep app — no manual entry by EOD' },
      { term: 'JBP', full: 'Joint Business Plan', context: 'annual plan with key distributors/MT — tracked module-by-module' },
      { term: 'Geofencing', full: 'Geofencing', context: 'GPS boundary that confirms the rep is at the outlet before order capture' },
    ],
  },
  fms: {
    label: 'FMS — Franchise Operations',
    blurb: 'The vocabulary of multi-outlet franchise operators, central kitchens and hub-spoke networks.',
    terms: [
      { term: 'Hub-Spoke', full: 'Hub-Spoke Model', context: 'central production (hub) ships to outlets (spokes) on a fixed cadence' },
      { term: 'CK / Central Kitchen', full: 'Central Kitchen', context: 'consolidates outlet demand into one production plan' },
      { term: 'Commissary', full: 'Commissary Kitchen', context: 'shared production facility serving multiple brands or franchisees' },
      { term: 'Cloud Kitchen', full: 'Cloud / Ghost / Dark Kitchen', context: 'delivery-only outlet; no dine-in; aggregator-driven' },
      { term: 'KOT', full: 'Kitchen Order Ticket', context: 'order routed from POS / aggregator to the right station' },
      { term: 'KDS', full: 'Kitchen Display System', context: 'paperless KOT — bumps when prepared; ties to throughput KPI' },
      { term: 'KOT-to-Bill Time', full: 'KOT-to-Bill Time', context: 'minutes from order accept to bill close — the QSR speed KPI' },
      { term: 'Table Turns', full: 'Table Turns', context: 'how many times a table is occupied per service period' },
      { term: 'AUV / ASP / ATC', full: 'Avg Unit Volume / Avg Selling Price / Avg Transaction Count', context: 'core outlet performance KPIs' },
      { term: 'Royalty %', full: 'Royalty %', context: 'franchise fee as % of outlet sales — auto-calculated from POS' },
      { term: 'CAM', full: 'Common Area Maintenance', context: 'mall / food-court overhead billed by sqft to outlet P&L' },
      { term: 'FDD', full: 'Franchise Disclosure Document', context: 'legal pack issued to franchisees pre-agreement' },
      { term: 'SOP Audit', full: 'SOP Audit', context: 'digital checklist + photo evidence at each outlet visit' },
      { term: 'Four-Walls Profitability', full: 'Four-Walls Profitability', context: 'outlet-level P&L excluding HO overhead — the franchisee’s real number' },
      { term: 'Hub-Throughput', full: 'Hub Throughput', context: 'orders / hour the CK can produce — drives outlet allocation' },
      { term: 'FoSCoS', full: 'Food Safety Compliance System', context: 'FSSAI online portal — license per outlet, tracked in FMS' },
      { term: 'Wastage %', full: 'Wastage %', context: 'CK + outlet wastage as % of dispatch; FEFO drives it down' },
      { term: 'Aggregator', full: 'Aggregator', context: 'Swiggy / Zomato / ONDC — integrated for order, settlement, reconciliation' },
      { term: '3PO', full: 'Third Party Operations', context: 'outsourced outlet or kitchen management' },
    ],
  },
  pos: {
    label: 'POS — Point of Sale',
    blurb: 'The counter, the cashier, the customer transaction — speed and reconciliation language.',
    terms: [
      { term: 'GMV', full: 'Gross Merchandise Value', context: 'top-line outlet sales before discounts and returns' },
      { term: 'NMV', full: 'Net Merchandise Value', context: 'after discounts, returns, voids — the line accounting cares about' },
      { term: 'ASP', full: 'Average Selling Price', context: 'bill value ÷ items; the basket-size KPI' },
      { term: 'ATV / ABV', full: 'Average Transaction Value / Avg Bill Value', context: 'revenue ÷ transactions per shift' },
      { term: 'Tender Mix', full: 'Tender Mix', context: '% of revenue by cash / card / UPI / wallet — drives MDR cost planning' },
      { term: 'Void Rate', full: 'Void Rate', context: '% of bills voided post-print; high voids signal training or fraud' },
      { term: 'KOT', full: 'Kitchen Order Ticket', context: 'F&B POS sends KOT to kitchen, KDS or printer at the right station' },
      { term: 'EOD Reconciliation', full: 'End-of-Day Reconciliation', context: 'cash + card + UPI + wallet vs sales; auto-matched at shift close' },
      { term: 'MDR', full: 'Merchant Discount Rate', context: 'card / UPI processing fee; tender-mix routing minimises it' },
      { term: 'Offline-First', full: 'Offline-First POS', context: 'sales captured locally during net outage, sync on reconnect' },
      { term: 'Split Bill', full: 'Split Bill', context: 'one order, multiple tenders or customers; common in dine-in' },
      { term: 'Loyalty Tier', full: 'Loyalty Tier', context: 'customer segmentation by lifetime spend; points + perks engine' },
      { term: 'BOPIS', full: 'Buy Online Pickup In Store', context: 'aggregator/D2C order picked up at counter; ties to POS inventory' },
      { term: 'Counter Throughput', full: 'Counter Throughput', context: 'bills per hour per counter — the line-management KPI' },
      { term: 'Cash Drop', full: 'Cash Drop', context: 'mid-shift cash transfer to safe; logged against cashier ID' },
      { term: 'PCI-DSS', full: 'Payment Card Industry – Data Security Standard', context: 'compliance frame for card-data handling' },
    ],
  },
  hrms: {
    label: 'HRMS — HR & Payroll',
    blurb: 'The language of statutory compliance, payroll automation and lifecycle HR.',
    terms: [
      { term: 'CTC', full: 'Cost to Company', context: 'gross + benefits + statutory; the salary headline number' },
      { term: 'Gross / Net', full: 'Gross vs Net pay', context: 'gross = pre-deduction; net = take-home after PF, ESIC, PT, TDS' },
      { term: 'PF / EPF', full: 'Provident Fund', context: '12% employer + 12% employee; auto-filed via UAN' },
      { term: 'ESIC', full: 'Employee State Insurance', context: 'medical / disability cover for ≤₹21k wage employees' },
      { term: 'PT', full: 'Professional Tax', context: 'state-level salary tax; rates vary by Maharashtra / Karnataka etc.' },
      { term: 'TDS', full: 'Tax Deducted at Source', context: 'monthly income-tax deduction; Form 16 generated annually' },
      { term: 'LWF', full: 'Labour Welfare Fund', context: 'state-mandated welfare deduction' },
      { term: 'Gratuity', full: 'Gratuity', context: 'lump-sum payable on 5+ years of service; HRMS provisions monthly' },
      { term: 'F&F', full: 'Full and Final Settlement', context: 'exit settlement — pending salary, leave encashment, gratuity, recoveries' },
      { term: 'ESS', full: 'Employee Self Service', context: 'employees apply for leave, view payslips, raise claims via mobile' },
      { term: 'OD / CL / PL / SL', full: 'On-Duty / Casual / Privilege / Sick Leave', context: 'standard Indian leave types; configurable per grade' },
      { term: 'LOP', full: 'Loss of Pay', context: 'unpaid leave; auto-prorated in payroll' },
      { term: 'Biometric Sync', full: 'Biometric Sync', context: 'eSSL / Mantra device sync — attendance, OT, late mark' },
      { term: 'GPS-Tagged Attendance', full: 'GPS-Tagged Attendance', context: 'field staff mark attendance with location; SFA-grade compliance' },
      { term: 'Form 16 / 24Q / 26Q', full: 'Form 16 / 24Q / 26Q', context: 'annual & quarterly TDS returns; auto-generated' },
      { term: 'PMS', full: 'Performance Management System', context: 'goals, check-ins, 360° feedback, appraisal → salary linkage' },
      { term: 'Headcount Bridge', full: 'Headcount Bridge', context: 'open + hires + exits + transfers; the CHRO board view' },
      { term: 'CTC-to-Cash', full: 'CTC-to-Cash', context: 'how much of CTC actually hits employee account; the trust KPI' },
    ],
  },
  wms: {
    label: 'WMS — Warehouse Management',
    blurb: 'The language of bins, lots, expiry, picking strategies and warehouse throughput.',
    terms: [
      { term: 'GRN', full: 'Goods Receipt Note', context: 'document confirming receipt against PO; triggers QC + putaway' },
      { term: 'ASN', full: 'Advance Shipment Notice', context: 'vendor pre-notifies dispatch; dock plan + bay assignment in advance' },
      { term: 'Putaway', full: 'Putaway', context: 'directed move of received stock to its assigned bin' },
      { term: 'Bin / Rack / Zone', full: 'Bin / Rack / Zone hierarchy', context: 'storage geometry — drives slotting, walk-time minimisation' },
      { term: 'Slotting', full: 'Slotting Strategy', context: 'fast-movers near pick-face; ABC analysis drives rebalancing' },
      { term: 'FIFO / FEFO / LIFO', full: 'First In/Out, First Expired/Out, Last In/Out', context: 'pick rule per SKU class; FEFO mandatory for perishable food' },
      { term: 'Pick Strategy', full: 'Pick Strategy', context: 'discrete / batch / zone / wave / cluster — chosen by order profile' },
      { term: 'Wave Picking', full: 'Wave Picking', context: 'groups orders by ship-cut into one pick sweep' },
      { term: 'Cycle Count', full: 'Cycle Count', context: 'rolling perpetual inventory; replaces annual stock-take' },
      { term: 'Cross-Dock', full: 'Cross-Dock', context: 'inbound → outbound with no putaway; shortens cold-chain dwell' },
      { term: 'Dock-to-Stock', full: 'Dock-to-Stock', context: 'minutes from truck arrival to bin-locked; the inbound KPI' },
      { term: 'OTIF', full: 'On-Time In-Full', context: '% of orders shipped complete and on date — outbound headline KPI' },
      { term: 'Fill Rate', full: 'Fill Rate', context: '% of ordered units actually shipped; quality of dispatch' },
      { term: 'Shrinkage', full: 'Shrinkage', context: 'unexplained inventory loss; cycle counts isolate root cause' },
      { term: 'Lot / Batch', full: 'Lot / Batch tracking', context: 'every receipt tagged; supports traceability and recall' },
      { term: 'Pick-by-Voice / Pick-by-Light', full: 'Hands-free picking', context: 'voice / light-directed picking for high-throughput warehouses' },
      { term: '3PL', full: 'Third-Party Logistics', context: 'outsourced warehousing; WMS exposes vendor portal for joint ops' },
      { term: 'Quarantine', full: 'Quarantine Stock', context: 'received-but-not-released stock; awaiting QC clearance' },
    ],
  },
  'vendor-portal': {
    label: 'Vendor Portal — Procurement',
    blurb: 'The vocabulary of strategic procurement, vendor scorecards and supplier collaboration.',
    terms: [
      { term: 'RFI', full: 'Request for Information', context: 'pre-RFQ vendor discovery / qualification' },
      { term: 'RFQ', full: 'Request for Quotation', context: 'priced bid against a defined spec — drives negotiation' },
      { term: 'RFP', full: 'Request for Proposal', context: 'broader than RFQ — solution + commercial response' },
      { term: 'Reverse Auction', full: 'Reverse Auction', context: 'live downward bidding among shortlisted vendors' },
      { term: 'PO', full: 'Purchase Order', context: 'commercial contract; vendor acknowledges before dispatch' },
      { term: 'ASN', full: 'Advance Shipment Notice', context: 'vendor pre-notifies dispatch; receiving plans dock + QC' },
      { term: 'GRN', full: 'Goods Receipt Note', context: 'buyer side confirmation of received quantity + quality' },
      { term: '3-Way Match', full: 'PO / GRN / Invoice match', context: 'auto-match before payment release; cuts AP cycle' },
      { term: 'Vendor Scorecard', full: 'Vendor Scorecard', context: 'on-time-delivery + quality + price + docs; renegotiation lever' },
      { term: 'Rate Contract', full: 'Rate Contract', context: 'pre-agreed price for a period; PO drawn against it' },
      { term: 'TAT', full: 'Turnaround Time', context: 'days from PO to receipt; the procurement speed KPI' },
      { term: 'OTD', full: 'On-Time Delivery', context: '% deliveries on or before promised date; vendor reliability' },
      { term: 'Quality Acceptance %', full: 'Quality Acceptance %', context: '% of lots accepted without rework / rejection' },
      { term: 'MSME Compliance', full: 'MSME Compliance', context: 'MSMED Act mandates ≤45-day payment to MSME vendors' },
      { term: 'Spend Under Management', full: 'Spend Under Management', context: '% of total spend routed through formal procurement' },
      { term: 'Maverick Spend', full: 'Maverick Spend', context: 'off-contract purchases; vendor portal eliminates them' },
      { term: 'Self-Certification', full: 'Self-Certification', context: 'vendor uploads QC docs; reduces incoming inspection load' },
      { term: 'TDS / GST Validation', full: 'TDS / GST Validation', context: 'auto-validates vendor invoices for compliance' },
    ],
  },
};

export const getPlatformVocabulary = (slug) => PLATFORM_VOCABULARY[slug];

// ─────────────────────────────────────────────────────────────────────────────
// PLATFORM_FLOW — Connected Flow Diagram data per platform (brief §2.7)
// Each platform's end-to-end workflow as 6-8 steps. Renders as an animated
// horizontal infographic via ConnectedFlowDiagram, with a "Why this matters"
// callout that highlights the platform's headline benefit.
// Shape: { steps: [{ icon, title, sub }], callout: { title, body } }
// Icons reference lucide-react names (resolved in the component).
// ─────────────────────────────────────────────────────────────────────────────
export const PLATFORM_FLOW = {
  erp: {
    steps: [
      { icon: 'TrendingUp', title: 'Sales Forecast', sub: 'Demand-driven plan from history + seasonality' },
      { icon: 'ClipboardList', title: 'Production Plan', sub: 'BOM-aware work orders by shift, line, SKU' },
      { icon: 'Truck', title: 'Auto PO + GRN', sub: 'MRP fires POs; vendor ASN drives dock plan' },
      { icon: 'Factory', title: 'Batch Execution', sub: 'Live yield, BPR auto-captured per batch' },
      { icon: 'ShieldCheck', title: 'QC + Release', sub: 'COA, retained sample, FSSAI clearance' },
      { icon: 'Boxes', title: 'FG → Dispatch', sub: 'FEFO pick, e-invoice, e-way bill auto-issued' },
      { icon: 'BarChart3', title: 'P&L on the 1st', sub: 'Plant-wise cost roll-up; CFO views today’s P&L today' },
    ],
    callout: {
      title: 'One data layer. Zero reconciliation.',
      body: 'From demand forecast to dispatched truck — every step writes to the same ledger. No spreadsheet bridges, no nightly batch jobs.',
    },
  },
  'sfa-dms': {
    steps: [
      { icon: 'MapPin', title: 'Beat Plan', sub: 'PJP per rep — territory + frequency assigned' },
      { icon: 'Smartphone', title: 'Outlet Visit', sub: 'GPS geofenced check-in; offline-capable' },
      { icon: 'ScanBarcode', title: 'Order Capture', sub: 'Catalogue + scheme auto-applied at outlet' },
      { icon: 'Truck', title: 'Primary to DB', sub: 'Distributor stock + credit limit validated' },
      { icon: 'Store', title: 'Secondary Sale', sub: 'Outlet stock-in captured same day on app' },
      { icon: 'TrendingUp', title: 'Live MIS', sub: 'NSM dashboard: coverage, productivity, leakage' },
    ],
    callout: {
      title: 'Same-day secondary visibility.',
      body: 'No more 10th-of-the-month reports. The outlet that bought today shows on the NSM dashboard tonight.',
    },
  },
  fms: {
    steps: [
      { icon: 'ClipboardList', title: 'Outlet Orders', sub: 'Mobile order placed against menu by 9pm' },
      { icon: 'ChefHat', title: 'CK Production', sub: 'Consolidated demand → production plan by midnight' },
      { icon: 'Truck', title: 'Hub-Spoke Dispatch', sub: 'Route + vehicle + driver assigned; ASN to outlets' },
      { icon: 'Store', title: 'Outlet POS', sub: 'KOT, KDS, multi-tender billing — live to HQ' },
      { icon: 'ClipboardCheck', title: 'SOP Audit', sub: 'Outlet auditor app — photo evidence + score' },
      { icon: 'TrendingUp', title: 'Royalty Auto-Calc', sub: 'Statement on the 1st — auto from POS data' },
    ],
    callout: {
      title: 'Run every outlet from one cockpit.',
      body: 'Central kitchen, outlets, royalty, audits — all sharing one data layer. The 200th outlet is as easy to run as the first.',
    },
  },
  pos: {
    steps: [
      { icon: 'Smartphone', title: 'Customer Walk-in', sub: 'Loyalty tier identified on phone or face' },
      { icon: 'ScanBarcode', title: 'Item Add', sub: 'Scanner / KOT for F&B, weighing-scale aware' },
      { icon: 'Sparkles', title: 'Offer Engine', sub: 'Live scheme, bundle, loyalty redemption' },
      { icon: 'Wallet', title: 'Tender Choice', sub: 'MDR-aware routing — cash, card, UPI, wallet' },
      { icon: 'CheckCircle2', title: 'Bill + e-Invoice', sub: 'GST-compliant, IRN auto-generated' },
      { icon: 'BarChart3', title: 'EOD Reconcile', sub: 'Tender match + cash drop + shift close' },
    ],
    callout: {
      title: 'Offline-first. Real-time at HQ.',
      body: 'No internet? POS still bills. Sync on reconnect. HQ sees every outlet bill the moment it prints.',
    },
  },
  hrms: {
    steps: [
      { icon: 'UserPlus', title: 'Hire & Onboard', sub: 'Digital offer, KYC, doc vault, day-1 ESS' },
      { icon: 'Fingerprint', title: 'Attendance', sub: 'Biometric + GPS-tagged mobile mark' },
      { icon: 'Clock', title: 'Shift + OT', sub: 'Roster, OT cap, piecework, daily-wage handled' },
      { icon: 'Calculator', title: 'Payroll Run', sub: 'PF, ESIC, PT, LWF, TDS auto-calculated' },
      { icon: 'Banknote', title: 'Bank Disbursal', sub: 'NEFT / IMPS file generated per bank' },
      { icon: 'FileCheck', title: 'Statutory Filing', sub: 'PF / ESIC / TDS challan + return auto-filed' },
      { icon: 'TrendingUp', title: 'Performance', sub: 'Goals → check-ins → 360° → appraisal' },
    ],
    callout: {
      title: 'Hire-to-retire on autopilot.',
      body: 'Every employee event — joining, attendance, leave, payroll, exit — captured once and reused everywhere. Zero double-entry.',
    },
  },
  wms: {
    steps: [
      { icon: 'Truck', title: 'ASN + Dock Plan', sub: 'Vendor pre-notice → bay + receiving slot' },
      { icon: 'CheckCircle2', title: 'GRN + QC', sub: 'Receipt confirmed; quarantine until release' },
      { icon: 'PackagePlus', title: 'Putaway', sub: 'Directed to assigned bin; barcode-confirmed' },
      { icon: 'Grid3X3', title: 'Storage + Slot', sub: 'Slotting rebalances against pick frequency' },
      { icon: 'ClipboardList', title: 'Pick List', sub: 'FEFO / wave / batch — picked by strategy' },
      { icon: 'Boxes', title: 'Pack + Ship', sub: 'OTIF tracked; load plan optimised' },
      { icon: 'BarChart3', title: 'Live Inventory', sub: 'Cycle counts keep numbers honest, daily' },
    ],
    callout: {
      title: 'Dock-to-stock in minutes. Pick-to-ship in hours.',
      body: 'Every movement is a barcode event. FEFO enforced at pick — perishables can never be picked out of order.',
    },
  },
  'vendor-portal': {
    steps: [
      { icon: 'UserPlus', title: 'Onboarding', sub: 'KYC + GST + PAN validated digitally' },
      { icon: 'MessageSquareText', title: 'RFQ / Auction', sub: 'Bid, counter, reverse-auction in-portal' },
      { icon: 'FileCheck', title: 'PO + Acknowledge', sub: 'Vendor confirms terms inside portal' },
      { icon: 'Truck', title: 'ASN + GRN', sub: 'Pre-notice + receiving confirmation' },
      { icon: 'Calculator', title: '3-Way Match', sub: 'PO + GRN + invoice auto-matched' },
      { icon: 'Banknote', title: 'Payment + MSME', sub: 'AP release on match; MSME 45-day enforced' },
      { icon: 'TrendingUp', title: 'Scorecard', sub: 'OTD, quality, price, docs — live ranking' },
    ],
    callout: {
      title: 'Zero coordination calls.',
      body: 'Every vendor interaction — RFQ, PO, ASN, invoice, payment status — lives in one shared workspace. No emails, no chasing.',
    },
  },
};

export const getPlatformFlow = (slug) => PLATFORM_FLOW[slug];

// ─────────────────────────────────────────────────────────────────────────────
// PLATFORM_PACKAGES — Starter / Growth / Enterprise per platform (brief §2.11)
// Each platform's packaging into 3 tiers with users, included modules,
// implementation, support and a representative price band. "Growth" is
// always the highlighted tier (most-popular badge). Prices are
// representative indicative bands — final pricing is contract-driven and
// surfaced via /contact.
// ─────────────────────────────────────────────────────────────────────────────
export const PLATFORM_PACKAGES = {
  erp: {
    intro: "Three packages — sized to where your food business is today, ready for where it's going.",
    tiers: [
      {
        name: 'Starter',
        for: 'Single-plant manufacturers up to ₹25 Cr turnover',
        price: 'From ₹4.5L / year',
        users: 'Up to 25 users',
        highlight: false,
        features: [
          'Production, Procurement, Inventory, Finance',
          'FSSAI compliance + e-invoice + e-way bill',
          'Tally integration kept live',
          'BizPulse mobile dashboard for the owner',
          'Go-live in 30–45 days',
          '12 months of post-go-live support',
        ],
      },
      {
        name: 'Growth',
        for: 'Multi-plant or scaling food businesses ₹25–150 Cr',
        price: 'From ₹9L / year',
        users: 'Up to 100 users',
        highlight: true,
        features: [
          'Everything in Starter, plus:',
          'Multi-plant + multi-warehouse + multi-GSTIN',
          'Quality lab + COA + stability studies',
          'Recipe & BOM engine with allergen flags',
          'Vendor portal access (read-only)',
          'Dedicated CSM + quarterly business review',
        ],
      },
      {
        name: 'Enterprise',
        for: 'Large food groups ₹150 Cr+ with central IT',
        price: 'Custom — contract-driven',
        users: 'Unlimited',
        highlight: false,
        features: [
          'Everything in Growth, plus:',
          'Custom workflow + integration scope',
          'Single sign-on + LDAP + audit-grade RBAC',
          'Private deployment options (cloud / on-prem)',
          'Named CSM + 24×7 P1 support',
          'Joint roadmap + early access to new modules',
        ],
      },
    ],
  },
  'sfa-dms': {
    intro: 'Sized to your field force and distributor network — start lean, scale to a 500+ rep operation.',
    tiers: [
      {
        name: 'Starter',
        for: 'Up to 50 field reps + 25 distributors',
        price: 'From ₹3L / year',
        users: 'Up to 50 reps + 25 DBs',
        highlight: false,
        features: [
          'Beat plan + outlet order booking',
          'Scheme engine + auto-claim',
          'Distributor stock + secondary sales',
          'Offline-first mobile app',
          'NSM live dashboard',
          'Go-live in 21–30 days',
        ],
      },
      {
        name: 'Growth',
        for: '50–250 reps + multi-state distribution',
        price: 'From ₹7L / year',
        users: 'Up to 250 reps + 100 DBs',
        highlight: true,
        features: [
          'Everything in Starter, plus:',
          'GPS-tagged beat compliance + selfie attendance',
          'Van sales + pre-sales + cash collection',
          'Multi-principal scheme support',
          'Retail audit + competitor share tracking',
          'Dedicated CSM + integration with principal DMS',
        ],
      },
      {
        name: 'Enterprise',
        for: '250+ reps, MNC FMCG, multi-channel',
        price: 'Custom — contract-driven',
        users: 'Unlimited',
        highlight: false,
        features: [
          'Everything in Growth, plus:',
          'GT + MT + e-commerce + HoReCa channels',
          'AI-driven beat optimisation + churn prediction',
          'Custom reports + data-warehouse export',
          '24×7 P1 support + named TAM',
          'Joint quarterly business review with brand HQ',
        ],
      },
    ],
  },
  fms: {
    intro: 'Built for chains from 5 outlets to 500. Pick the tier that matches your network today.',
    tiers: [
      {
        name: 'Starter',
        for: '5–25 outlets — single brand',
        price: 'From ₹3.5L / year',
        users: 'Up to 25 outlets',
        highlight: false,
        features: [
          'Outlet POS + KOT routing',
          'Central kitchen demand consolidation',
          'Hub-spoke dispatch',
          'Royalty auto-calculation',
          'Swiggy / Zomato integration',
          'Go-live in 30 days',
        ],
      },
      {
        name: 'Growth',
        for: '25–150 outlets — multi-brand or multi-city',
        price: 'From ₹8L / year',
        users: 'Up to 150 outlets',
        highlight: true,
        features: [
          'Everything in Starter, plus:',
          'Multi-brand + multi-city + multi-format support',
          'SOP audit app + photo evidence',
          'Outlet P&L + four-walls profitability',
          'Loyalty + customer DB at counter',
          'Dedicated CSM + onboarding wave manager',
        ],
      },
      {
        name: 'Enterprise',
        for: '150+ outlets, master-franchise or QSR national',
        price: 'Custom — contract-driven',
        users: 'Unlimited',
        highlight: false,
        features: [
          'Everything in Growth, plus:',
          'Master-franchise + sub-franchise hierarchy',
          'AI-driven demand forecast at outlet level',
          'Custom integrations (loyalty, CRM, aggregator)',
          '24×7 P1 support + named TAM',
          'Joint roadmap with new-format pilots',
        ],
      },
    ],
  },
  pos: {
    intro: 'POS that fits a single counter or a 1,000-outlet chain — same UI, same reliability.',
    tiers: [
      {
        name: 'Starter',
        for: 'Single outlet or up to 10 counters',
        price: 'From ₹50k / year per outlet',
        users: 'Up to 10 counters',
        highlight: false,
        features: [
          'Touch + barcode + weighing POS',
          'GST + e-invoice on every bill',
          'Multi-tender — cash, card, UPI, wallet',
          'Offline-first reliability',
          'EOD reconciliation',
          'Go-live in 1 week',
        ],
      },
      {
        name: 'Growth',
        for: '10–100 counters across outlets',
        price: 'From ₹35k / year per counter',
        users: 'Up to 100 counters',
        highlight: true,
        features: [
          'Everything in Starter, plus:',
          'KOT + KDS routing for F&B',
          'Loyalty + customer DB at counter',
          'MDR-optimised tender routing',
          'Central menu + price control',
          'Dedicated CSM',
        ],
      },
      {
        name: 'Enterprise',
        for: '100+ counters or chain-wide POS',
        price: 'Custom — contract-driven',
        users: 'Unlimited',
        highlight: false,
        features: [
          'Everything in Growth, plus:',
          'Custom hardware certification (terminals, scanners)',
          'PCI-DSS hardened deployment',
          'AI-driven tender + offer optimisation',
          '24×7 P1 support + onsite SLA',
          'Joint roadmap on payment innovation',
        ],
      },
    ],
  },
  hrms: {
    intro: 'Payroll, compliance and HR for 50 to 5,000 employees — across mixed workforce types.',
    tiers: [
      {
        name: 'Starter',
        for: 'Single-location, salaried payroll, ≤200 staff',
        price: 'From ₹2.5L / year',
        users: 'Up to 200 employees',
        highlight: false,
        features: [
          'Payroll + PF + ESIC + PT + TDS',
          'Biometric attendance + leave',
          'ESS mobile app',
          'Form 16 / 24Q / 26Q auto-filed',
          'Tally integration',
          'Go-live in 21 days',
        ],
      },
      {
        name: 'Growth',
        for: 'Multi-location, mixed workforce, 200–1500 staff',
        price: 'From ₹6L / year',
        users: 'Up to 1,500 employees',
        highlight: true,
        features: [
          'Everything in Starter, plus:',
          'Piecework + daily-wage + contractor payroll',
          'GPS-tagged field attendance',
          'Performance management + 360° feedback',
          'Loan + advance + reimbursement workflows',
          'Dedicated CSM',
        ],
      },
      {
        name: 'Enterprise',
        for: 'Manufacturers ≥1,500 staff with central HR',
        price: 'Custom — contract-driven',
        users: 'Unlimited',
        highlight: false,
        features: [
          'Everything in Growth, plus:',
          'Multi-entity + cross-state statutory engine',
          'Custom appraisal workflows + succession planning',
          'SSO + RBAC + audit logs',
          '24×7 P1 support + named TAM',
          'Joint roadmap with new statutory rollouts',
        ],
      },
    ],
  },
  wms: {
    intro: 'From a single warehouse to a national network — barcode-driven, FEFO-enforced, scanner-native.',
    tiers: [
      {
        name: 'Starter',
        for: 'Single warehouse, ≤2,000 SKUs',
        price: 'From ₹2.5L / year',
        users: 'Up to 25 users',
        highlight: false,
        features: [
          'GRN + QC + putaway + pick + pack + ship',
          'FEFO / FIFO enforcement',
          'Barcode scanning native',
          'Cycle counting',
          'Tally + ERP integration',
          'Go-live in 30 days',
        ],
      },
      {
        name: 'Growth',
        for: 'Multi-warehouse, 2,000–20,000 SKUs',
        price: 'From ₹6.5L / year',
        users: 'Up to 100 users',
        highlight: true,
        features: [
          'Everything in Starter, plus:',
          'Multi-location with inter-warehouse transfer',
          'Wave + zone + cluster picking',
          'Cold-chain temperature logging',
          'OTIF + fill-rate live dashboards',
          'Dedicated CSM',
        ],
      },
      {
        name: 'Enterprise',
        for: '20,000+ SKUs, 3PL or pan-India warehousing',
        price: 'Custom — contract-driven',
        users: 'Unlimited',
        highlight: false,
        features: [
          'Everything in Growth, plus:',
          'Pick-by-voice / pick-by-light',
          '3PL onboarding portal + multi-tenant',
          'Custom WMS-to-TMS integration',
          '24×7 P1 support + named TAM',
          'Joint roadmap with automation pilots',
        ],
      },
    ],
  },
  'vendor-portal': {
    intro: 'Procurement collaboration sized to your active vendor count — from 50 vendors to 500+.',
    tiers: [
      {
        name: 'Starter',
        for: '≤50 active vendors',
        price: 'From ₹1.5L / year',
        users: 'Up to 50 vendors',
        highlight: false,
        features: [
          'Digital onboarding + KYC',
          'PO + ASN + GRN workflow',
          '3-way match + AP release',
          'MSME 45-day compliance tracker',
          'Tally / ERP integration',
          'Go-live in 21 days',
        ],
      },
      {
        name: 'Growth',
        for: '50–250 vendors, multi-category sourcing',
        price: 'From ₹4L / year',
        users: 'Up to 250 vendors',
        highlight: true,
        features: [
          'Everything in Starter, plus:',
          'RFQ + reverse auction',
          'Rate contracts + commodity price alerts',
          'Vendor scorecard + renegotiation export',
          'Multi-category buyer workflows',
          'Dedicated CSM',
        ],
      },
      {
        name: 'Enterprise',
        for: '250+ vendors, strategic sourcing teams',
        price: 'Custom — contract-driven',
        users: 'Unlimited',
        highlight: false,
        features: [
          'Everything in Growth, plus:',
          'Custom approval workflows (matrix + delegation)',
          'Spend analytics + savings tracking',
          'API + SAP / Oracle integration',
          '24×7 P1 support + named TAM',
          'Joint roadmap with category playbooks',
        ],
      },
    ],
  },
};

export const getPlatformPackages = (slug) => PLATFORM_PACKAGES[slug];

// ─────────────────────────────────────────────────────────────────────────────
// PLATFORM_PAINS — Pain Amplification (brief §2.3)
// 3 pain pairs per platform: LEFT "The reality" (current pain) + RIGHT "What
// it costs you" (financial / operational impact, quantified where possible).
// Voice: business advisor, not corporate. Specific, visceral, loss-framed.
// ─────────────────────────────────────────────────────────────────────────────
export const PLATFORM_PAINS = {
  erp: [
    { reality: 'Recipe costs calculated on Excel, updated manually when supplier prices change.', cost: "You don't know your real margin per SKU until month-end. By then, you've already shipped at a loss." },
    { reality: 'Production planning disconnected from procurement.', cost: 'Simultaneous stockouts and overstock. Your purchase manager is reactive, not planned.' },
    { reality: 'FSSAI compliance managed on reminder notes and paper checklists.', cost: 'One failed audit or contamination event can cost more than 3 years of ERP investment.' },
  ],
  'sfa-dms': [
    { reality: 'Salesman orders captured on WhatsApp; entered into Tally on Monday.', cost: 'Distributor stock surprises every Tuesday. Schemes burnt on the wrong outlets every Friday.' },
    { reality: 'Secondary sales data arrives on the 10th of next month — if at all.', cost: 'You plan supply on guesswork. Beat productivity is reported, not measured. Phantom claims drain 5–8% of trade spend.' },
    { reality: 'No idea where reps are during the day — only what they claim at EOD.', cost: 'Half your beats are skipped or shortened. The other half are unproductive. Coverage looks great on paper, terrible at the outlet.' },
  ],
  fms: [
    { reality: 'Outlets order on WhatsApp groups. Kitchen builds production from screenshots.', cost: 'Central kitchen over-produces by 15–25%. Outlets stock-out by 6pm. Both sides blame each other every Monday.' },
    { reality: 'Recipes drift outlet by outlet — same dish, different taste in each city.', cost: 'Brand reputation erodes quietly. Repeat customers stop returning. SOP audits happen only when a complaint goes viral.' },
    { reality: 'Royalty calculated on monthly statements pieced together from POS exports.', cost: 'Royalty disputes every month. Franchisee trust frays. Settlement takes 7+ days. Cash flow at HQ is reactive.' },
  ],
  pos: [
    { reality: 'Internet drops at the counter — billing stops. Customers walk.', cost: 'Lost revenue per outage hour. Cashier abandons the bill. Day-end reconciliation skews — finance flags it weeks later.' },
    { reality: 'EOD cash + card + UPI matching done manually on Excel.', cost: 'Cashier disputes once a month. ₹500–₹2,000 unexplained per outlet per week — adds up to lakhs across 50 outlets.' },
    { reality: 'No customer DB at the counter — every walk-in starts from zero.', cost: 'No loyalty hook, no repeat triggers, no targeted offers. Customer LTV stays flat while CAC keeps rising.' },
  ],
  hrms: [
    { reality: 'Payroll runs across Excel + Tally + the senior HR person\'s memory.', cost: 'PF, ESIC, PT deductions get challenged every quarter. ₹50k–₹2L in statutory penalties per year is "the cost of doing business".' },
    { reality: 'Attendance for plant workers on punch cards; field staff on WhatsApp selfies.', cost: 'Overtime claims unverifiable. LOP disputes monthly. Mixed-workforce payroll takes 5 days every month — and still has errors.' },
    { reality: 'Performance reviews on paper, once a year, untied to salary.', cost: 'Top performers leave silently. Average performers stay because nothing tracks them. Compensation feels arbitrary to everyone.' },
  ],
  wms: [
    { reality: 'Perishable picks done by whoever\'s nearest the bin, not by expiry date.', cost: 'Near-expiry stock dispatched to wrong outlets. Write-offs of 3–8% per month per warehouse. Customer complaints on freshness.' },
    { reality: 'Annual stock-take takes 3 days. Numbers off by 5–10% every time.', cost: 'Phantom stock blocks working capital. Real stock-outs missed. Operations runs on the gap between system and ground.' },
    { reality: 'Dock-to-stock measured in days, not hours. No visibility on incoming truck queue.', cost: 'Trucks wait at the gate, drivers charge demurrage, RM hits the line 24+ hours late. Production plan slips weekly.' },
  ],
  'vendor-portal': [
    { reality: 'POs sent on email. Vendor confirms on WhatsApp. ASN arrives by SMS — sometimes.', cost: 'Receiving has no idea what\'s coming when. Bay planning is reactive. Vendor disputes on quantities every other week.' },
    { reality: 'Invoice → PO → GRN matching done by an AP clerk on Excel.', cost: 'AP cycle is 5–10 days. MSME 45-day deadlines missed routinely. Penalties + interest on delays drain ₹L per year.' },
    { reality: 'Vendor performance lives in the procurement head\'s head.', cost: 'Renegotiation conversations are subjective. Bad vendors stay too long. Good vendors get under-rewarded. Spend creeps up 6–10% YoY without anyone noticing.' },
  ],
};

export const getPlatformPains = (slug) => PLATFORM_PAINS[slug];

// ─────────────────────────────────────────────────────────────────────────────
// PLATFORM_DEEP_DIVES — Feature Deep-Dives (brief §2.5 + §2.6)
// Two signature feature blocks per platform — each rendered as a full-width
// alternating zigzag (text/visual). Block A is the platform's headline
// capability; Block B is the second highest-value capability. Shape:
//   { a: { eyebrow, title, sub, bullets[5], pullQuote, ctaLabel },
//     b: { eyebrow, title, sub, bullets[5], pullQuote, ctaLabel } }
// Pull quotes use anonymised role + city when a named client isn't available.
// ─────────────────────────────────────────────────────────────────────────────
export const PLATFORM_DEEP_DIVES = {
  erp: {
    a: {
      eyebrow: 'Batch & Recipe',
      title: 'Batch costing — down to the gram.',
      sub: 'Know exactly what every batch costs — before it goes into production, and after it comes out.',
      bullets: [
        'Real-time recipe scaling for any batch size',
        'Ingredient substitution with live cost impact',
        'Batch yield vs standard — variance alerts in shift',
        'Cost per unit: actual vs budgeted, per SKU per batch',
        'Expiry + shelf-life linked to FEFO dispatch',
      ],
      pullQuote: {
        text: 'We finally know our real margin per product — not a guess, the actual number calculated by the system.',
        attrib: 'Plant Head, Mid-size bakery, Pune',
      },
      ctaLabel: 'Watch the 3-min Batch module demo',
    },
    b: {
      eyebrow: 'FSSAI Compliance',
      title: 'FSSAI compliance — without the paperwork.',
      sub: 'Every batch links to its FSSAI dossier automatically. Audits go from a one-week scramble to a one-click export.',
      bullets: [
        'Auto-generated FSSAI batch reports per SKU',
        'Allergen + additive tracking per recipe',
        'Vendor quality scorecards tied to incoming QC',
        'Digital QC checklists replace paper binders',
        'QC hold/release with full forward+backward trace',
      ],
      pullQuote: {
        text: 'FSSAI audit went from three sleepless nights to a 20-minute walkthrough. Auditor asked for the recall test — we ran one in under 2 minutes.',
        attrib: 'Quality Head, Dairy processor, Nashik',
      },
      ctaLabel: 'Download the FSSAI 47-point checklist',
    },
  },
  'sfa-dms': {
    a: {
      eyebrow: 'Scheme engine',
      title: 'Schemes that calculate themselves — and claim themselves.',
      sub: 'Configure once. Apply at order capture. Auto-claim at month-end. Phantom claims flagged before settlement.',
      bullets: [
        'Wet, dry, slabbed, QPS, channel-tiered schemes',
        'Auto-applied at order capture — no rep maths',
        'Outlet + product + region eligibility enforced',
        'Phantom claim detection — flagged pre-settlement',
        'Scheme ROI per territory + per scheme',
      ],
      pullQuote: {
        text: 'Scheme leakage dropped from 7% to under 1% in the first quarter. We can finally run aggressive schemes without losing sleep.',
        attrib: 'NSM, Multi-state FMCG distributor',
      },
      ctaLabel: 'Watch the Scheme engine demo',
    },
    b: {
      eyebrow: 'Salesman app',
      title: 'The salesman app reps actually use — even at 5am.',
      sub: 'Offline-first. Geofenced. Built around the rep\'s real day. Adoption: 30% in week 1, 90% by week 6.',
      bullets: [
        'Offline order, attendance, photo — sync on reconnect',
        'GPS-geofenced check-in before order capture',
        '60-second order placement on the rep\'s phone',
        'Auto-scheme display + best-value combo prompts',
        'Daily target vs actual on home screen',
      ],
      pullQuote: {
        text: 'We tried 3 SFAs before UpWon. The reps abandoned each one in 2 months. UpWon — they actually open it before leaving home.',
        attrib: 'RSM, Regional snacks brand, Maharashtra',
      },
      ctaLabel: 'See the Salesman app in action',
    },
  },
  fms: {
    a: {
      eyebrow: 'Hub-Spoke',
      title: 'Central kitchen plans from your outlets — not your guesses.',
      sub: 'Outlets order by 9pm. Central kitchen sees consolidated demand by midnight. Production plan generated before the shift starts.',
      bullets: [
        'Outlet-to-HQ digital ordering on mobile',
        'Demand consolidation by SKU, by route, by outlet',
        'Production plan auto-generated per shift',
        'FEFO dispatch — perishables shipped oldest-first',
        'Hub throughput KPI live for the CK head',
      ],
      pullQuote: {
        text: 'WhatsApp ordering vanished overnight. The central kitchen now plans 24 hours ahead — wastage dropped 22% in 60 days.',
        attrib: 'Operations Head, 45-outlet bakery chain, Bengaluru',
      },
      ctaLabel: 'Watch the Central Kitchen demo',
    },
    b: {
      eyebrow: 'Royalty automation',
      title: 'Royalty calculated from POS — not from arguments.',
      sub: 'Every outlet bill flows to HQ live. Royalty computes nightly. Statement reaches the franchisee on the 1st — same number both sides see.',
      bullets: [
        'Royalty rules per franchise type / format',
        'Auto-statement on the 1st of every month',
        'CAM + marketing fund + brand royalty separated',
        'Franchisee P&L dashboard — outlet-level',
        'Dispute window with audit trail per line item',
      ],
      pullQuote: {
        text: 'Royalty disputes dropped to zero. Franchisees trust the number because they see the bills as they ring up.',
        attrib: 'Franchise Head, QSR chain, Mumbai',
      },
      ctaLabel: 'See the Royalty engine demo',
    },
  },
  pos: {
    a: {
      eyebrow: 'Offline-first',
      title: 'Sales never stop — even when the internet does.',
      sub: 'Bills captured locally, KOTs routed to kitchen printers, tenders accepted. Sync on reconnect — zero losses.',
      bullets: [
        'Local-first billing with full GST + e-invoice',
        'KOT routing to kitchen + KDS even offline',
        'Multi-tender (cash, card, UPI, wallet, loyalty)',
        'Reconnect sync with conflict resolution',
        'Outlet uptime monitored from HQ',
      ],
      pullQuote: {
        text: 'Old POS used to lock up every monsoon. Three years on UpWon — not a single lost bill in any outlet.',
        attrib: 'IT Head, 200-counter retail chain',
      },
      ctaLabel: 'See the Offline-first POS demo',
    },
    b: {
      eyebrow: 'Tender mix routing',
      title: 'Right tender for right bill — MDR-aware at the counter.',
      sub: 'POS picks the lowest-cost rail every time. Saves 0.2–0.4% on processing across the chain — a quiet bottom-line gain.',
      bullets: [
        'Bin-aware card → cheapest acquirer',
        'UPI app routing for lowest MDR partner',
        'Loyalty + voucher stacking with caps',
        'Cashier override audit log',
        'Daily MDR savings report to finance',
      ],
      pullQuote: {
        text: '0.3% MDR savings across ₹120Cr GMV — pays for the entire POS deployment in 8 months.',
        attrib: 'CFO, F&B chain, Pune',
      },
      ctaLabel: 'See Tender-mix routing in action',
    },
  },
  hrms: {
    a: {
      eyebrow: 'Mixed-workforce payroll',
      title: 'Piecework. Daily wage. Salaried. One payroll run.',
      sub: 'Plant workers on piecework, field staff on daily wage, managers on salary — all in one engine. PF, ESIC, PT, LWF, TDS auto-handled.',
      bullets: [
        'Piecework rates per operation + per shift',
        'Daily-wage with attendance + OT cap rules',
        'Salaried with grade-wise statutory engine',
        'Contractor payouts with TDS + GST validation',
        'One run — bank file generated per bank',
      ],
      pullQuote: {
        text: 'We had 3 separate payroll Excels. UpWon collapsed them into one button. Payroll day went from 5 days to 4 hours.',
        attrib: 'HR Head, Food manufacturer, 450 employees',
      },
      ctaLabel: 'Watch the Payroll engine demo',
    },
    b: {
      eyebrow: 'Statutory automation',
      title: 'PF. ESIC. PT. TDS. LWF. Filed before the deadline — every month.',
      sub: 'Returns generated automatically. Challans posted. Form 16 ready on the 31st of March. Statutory penalties: zero.',
      bullets: [
        'PF return + UAN sync auto-monthly',
        'ESIC + state-wise PT + LWF engine',
        'TDS 24Q / 26Q + Form 16 auto-generated',
        'Multi-state operations — state-wise compliance',
        'Audit log on every statutory action',
      ],
      pullQuote: {
        text: 'We used to pay ₹1.2L in penalties every year. Three years on UpWon — total: ₹0.',
        attrib: 'Finance Head, Manufacturing company, 800 employees',
      },
      ctaLabel: 'See Statutory compliance in action',
    },
  },
  wms: {
    a: {
      eyebrow: 'FEFO enforcement',
      title: 'FEFO at pick — system blocks the wrong batch.',
      sub: 'Picker scans a non-FEFO batch — POS refuses the pick. Perishables can\'t go out of order. Write-offs collapse.',
      bullets: [
        'FEFO mandatory at pick — system enforced',
        'Batch + lot tracking per SKU per location',
        'Expiry alerts at 30 / 14 / 7 days',
        'MAP / cold-chain stock segregation',
        'Forward + backward trace in under 2 minutes',
      ],
      pullQuote: {
        text: 'Near-expiry write-offs dropped from 4.2% to 0.6% in the first 90 days. The system literally won\'t let the pickers cheat.',
        attrib: 'Warehouse Head, Dairy company, 4 locations',
      },
      ctaLabel: 'See FEFO enforcement in action',
    },
    b: {
      eyebrow: 'Multi-location inventory',
      title: 'Ten warehouses. One stock view. Live.',
      sub: 'Stock-on-hand by location, by SKU, by lot — refreshed on every scan. Inter-location transfers driven by stock-out signals.',
      bullets: [
        'Live stock-on-hand per SKU per location',
        'Inter-location transfer with TAT tracking',
        'Slotting strategy auto-rebalanced ABC-wise',
        'Cycle counting — rolling, perpetual',
        'OTIF + Fill Rate dashboard per warehouse',
      ],
      pullQuote: {
        text: 'Inventory accuracy went from "we think 92%" to "verified 99.4%". Working capital tied up in dead stock dropped by ₹3 Cr.',
        attrib: 'Supply Chain Head, FMCG distributor',
      },
      ctaLabel: 'See Multi-location inventory live',
    },
  },
  'vendor-portal': {
    a: {
      eyebrow: 'Vendor self-service',
      title: 'Your vendors update themselves — every PO, every ASN, every invoice.',
      sub: 'Vendor logs in. Confirms PO. Uploads ASN. Submits invoice. Tracks payment. Your AP clerk vanishes from the loop.',
      bullets: [
        'Digital KYC + GST + PAN onboarding',
        'PO acknowledgment + delivery commitment',
        'ASN upload with packing detail',
        'Invoice submission + payment status portal',
        'Vendor support tickets — closed loop',
      ],
      pullQuote: {
        text: 'Coordination calls dropped 60%. Invoice processing went from 5 days to 1. Vendors trust the system because they own the data.',
        attrib: 'Procurement Head, Food manufacturer',
      },
      ctaLabel: 'See Vendor self-service in action',
    },
    b: {
      eyebrow: 'Performance scorecard',
      title: 'Renegotiate from data — not from gut feel.',
      sub: 'On-time delivery, quality acceptance, price competitiveness, doc accuracy — scored monthly, exportable to renegotiation.',
      bullets: [
        'On-time delivery % per vendor per category',
        'Quality acceptance % per lot',
        'Price competitiveness vs market benchmark',
        'Documentation accuracy + dispute rate',
        'Scorecard PDF — renegotiation-ready',
      ],
      pullQuote: {
        text: 'Annual procurement renegotiation used to be a 4-week war. Now it\'s a 2-day data review. Savings: 8% on net procurement spend.',
        attrib: 'CFO, FMCG manufacturer',
      },
      ctaLabel: 'See the Vendor scorecard demo',
    },
  },
};

export const getPlatformDeepDives = (slug) => PLATFORM_DEEP_DIVES[slug];

// ─────────────────────────────────────────────────────────────────────────────
// PLATFORM_CASE_STUDIES — Full Case Study (brief §2.9)
// One same-industry case study per platform, in 3-panel format:
// Challenge | Solution | Result. Plus a pull quote with named role + city.
// ─────────────────────────────────────────────────────────────────────────────
export const PLATFORM_CASE_STUDIES = {
  erp: {
    company: 'Mid-size bakery group',
    location: 'Pune, Maharashtra',
    turnover: '₹80 Cr',
    employees: '320',
    industryTag: 'Bakery & Confectionery',
    challenge: 'Three bakery plants. Recipe costs maintained on three different Excel files. No consolidated view of margin per SKU until the 15th of the next month. Two failed FSSAI surveillance audits in the same year — driven by gaps in batch traceability across plants.',
    solution: 'UpWon ERP Core deployed across all 3 plants in 38 days. Recipe + BOM engine consolidated. FEFO dispatch enforced. FSSAI batch trace auto-generated per SKU. Tally kept live for the first 6 months — full cut-over after.',
    results: [
      { metric: '28%', label: 'reduction in raw material wastage' },
      { metric: '100%', label: 'recipe standardisation across plants' },
      { metric: '< 2 min', label: 'FSSAI batch trace — forward + backward' },
    ],
    quote: {
      text: 'We finally know our real margin per SKU — not a guess, the actual number calculated by the system. FSSAI audit went from a one-week scramble to a one-click export.',
      attrib: 'Plant Head, Pune',
    },
    pdfLabel: 'Download the full case study (PDF)',
  },
  'sfa-dms': {
    company: 'Multi-state FMCG distributor',
    location: 'Mumbai, Maharashtra',
    turnover: '₹120 Cr',
    employees: '180 (18 field reps)',
    industryTag: 'FMCG Distribution',
    challenge: 'WhatsApp ordering led to ₹4–6L per month in scheme disputes. Secondary sales reports arrived on the 12th of next month — too late for any planning. Half the salesmen claimed beats they had not actually walked.',
    solution: 'UpWon SFA-DMS deployed across 4 states in 26 days. Geofenced beat compliance, auto-scheme engine, same-day secondary capture. Principal DMS integration kept live.',
    results: [
      { metric: '40%', label: 'more productive salesman calls' },
      { metric: 'Zero', label: 'scheme disputes since go-live' },
      { metric: 'Same-day', label: 'secondary sales visibility at NSM' },
    ],
    quote: {
      text: 'We can finally see what sold yesterday — not what shipped 25 days ago. The reps love the app because schemes auto-apply at the counter.',
      attrib: 'NSM, Multi-state FMCG distributor',
    },
    pdfLabel: 'Download the full case study (PDF)',
  },
  fms: {
    company: 'Bakery-café franchise chain',
    location: 'Bengaluru, Karnataka',
    turnover: '₹65 Cr',
    employees: '45 outlets',
    industryTag: 'QSR / Franchise F&B',
    challenge: '45 outlets running on WhatsApp ordering. Central kitchen guessed daily production. Royalty calculation took 5 days every month and ended in arguments with franchisees.',
    solution: 'UpWon FMS deployed across all 45 outlets in 32 days. Outlet-to-HQ digital ordering, central kitchen demand consolidation, FEFO hub-spoke dispatch, auto royalty engine.',
    results: [
      { metric: '100%', label: 'outlet order visibility — live' },
      { metric: '22%', label: 'reduction in kitchen wastage' },
      { metric: '3 days → 3 hours', label: 'royalty settlement cycle' },
    ],
    quote: {
      text: 'WhatsApp ordering vanished overnight. Royalty disputes dropped to zero. We added 12 outlets without adding back-office headcount.',
      attrib: 'Operations Head, 45-outlet bakery chain',
    },
    pdfLabel: 'Download the full case study (PDF)',
  },
  pos: {
    company: 'F&B chain',
    location: 'Pune, Maharashtra',
    turnover: '₹120 Cr GMV',
    employees: '85 counters across 32 outlets',
    industryTag: 'F&B Multi-outlet',
    challenge: 'Old POS used to lock up during monsoon outages — lost bills every week. Cashier-side cash reconciliation took 90 min per outlet. MDR cost was rising 0.4% YoY with no visibility per tender type.',
    solution: 'UpWon POS rolled out across 32 outlets in 6 weeks. Offline-first, KOT + KDS, MDR-aware tender routing, EOD auto-reconciliation. Single dashboard for finance.',
    results: [
      { metric: '0', label: 'lost bills in 3 years of operation' },
      { metric: '0.3%', label: 'MDR savings across ₹120 Cr GMV' },
      { metric: '6 min', label: 'EOD reconciliation per outlet (from 90 min)' },
    ],
    quote: {
      text: '0.3% MDR savings across our GMV paid for the entire POS deployment in 8 months. The offline-first piece is the real story — reliability is a brand promise now.',
      attrib: 'CFO, F&B chain, Pune',
    },
    pdfLabel: 'Download the full case study (PDF)',
  },
  hrms: {
    company: 'Food manufacturer',
    location: 'Bhiwadi, Rajasthan',
    turnover: '₹95 Cr',
    employees: '450',
    industryTag: 'Food Manufacturing',
    challenge: 'Three payroll Excels — one for plant piecework, one for field staff daily-wage, one for salaried managers. Payroll took 5 days every month and still had ₹1.2L in statutory penalties per year.',
    solution: 'UpWon HRMS deployed in 21 days. All three workforce types unified. Biometric + GPS attendance, statutory engine for PF, ESIC, PT, LWF, TDS. ESS app for all 450 employees.',
    results: [
      { metric: '5 days → 4 hours', label: 'monthly payroll runtime' },
      { metric: '₹0', label: 'statutory penalties since go-live' },
      { metric: '100%', label: 'employees on ESS mobile app' },
    ],
    quote: {
      text: 'We had three payroll Excels. UpWon collapsed them into one button. The plant manager and the HR head finally agree on numbers.',
      attrib: 'HR Head, Food manufacturer, 450 employees',
    },
    pdfLabel: 'Download the full case study (PDF)',
  },
  wms: {
    company: 'Dairy company',
    location: '4 warehouses across Maharashtra',
    turnover: '₹140 Cr',
    employees: '4 warehouse sites',
    industryTag: 'Dairy & Perishables',
    challenge: 'Near-expiry write-offs running at 4.2% of dispatch. Stock-take took 3 days at each warehouse, off by 7–9% every time. Cold-chain dispatch occasionally missed FEFO — outlets received near-expiry SKUs.',
    solution: 'UpWon WMS deployed across 4 sites in 40 days. FEFO mandatory at pick, barcode + handheld scanners, cycle counting replaced annual stock-take, cold-chain logger integration.',
    results: [
      { metric: '4.2% → 0.6%', label: 'near-expiry write-offs' },
      { metric: '99.4%', label: 'inventory accuracy — verified' },
      { metric: '₹3 Cr', label: 'working capital released from dead stock' },
    ],
    quote: {
      text: 'The system literally won\'t let the pickers cheat. FEFO is enforced — not a guideline. Customer freshness complaints went to zero.',
      attrib: 'Warehouse Head, Dairy company',
    },
    pdfLabel: 'Download the full case study (PDF)',
  },
  'vendor-portal': {
    company: 'Food manufacturer',
    location: 'Indore, Madhya Pradesh',
    turnover: '₹75 Cr',
    employees: '180 active vendors',
    industryTag: 'Food Manufacturing',
    challenge: 'POs sent on email, ASNs by WhatsApp. AP cycle 7–10 days. MSME 45-day deadlines missed routinely — ₹3L in interest penalties per year. Vendor performance lived in the procurement head\'s head.',
    solution: 'UpWon Vendor Portal deployed in 24 days. Digital onboarding, PO + ASN + GRN + 3-way match workflow, MSME compliance tracker, vendor scorecards. ERP integration for real-time AP visibility.',
    results: [
      { metric: '60%', label: 'reduction in coordination calls' },
      { metric: '5 days → 1 day', label: 'invoice processing cycle' },
      { metric: '8%', label: 'savings on net procurement spend' },
    ],
    quote: {
      text: 'Vendors trust the system because they own the data. The annual renegotiation used to be a 4-week war — now it\'s a 2-day data review.',
      attrib: 'Procurement Head, Food manufacturer',
    },
    pdfLabel: 'Download the full case study (PDF)',
  },
};

export const getPlatformCaseStudy = (slug) => PLATFORM_CASE_STUDIES[slug];
