/**
 * The industry recognition section's built-in content.
 *
 * Written in exactly the shape the CMS returns, so the component renders one
 * thing and never has to know which source it came from. It is the fallback,
 * not the source of truth: the admin panel owns this content, and this copy is
 * what the page shows while the fetch is in flight, during the SSG build, and
 * whenever the API is unreachable.
 *
 * Icons are names rather than components, again matching the API - they are
 * resolved through lib/erpIcons.js at render time.
 */

const DASHBOARD = '/images/dashboard.webp';
const DASHBOARD_ALT = 'UPWON ERP dashboard';

/** The label, heading and description that head the section. */
export const FALLBACK_COPY = {
  eyebrow: 'Industry Recognition',
  headingLines: [
    [
      { text: 'Why Use Generic ERPs when ', accent: false },
      { text: 'Specialized System', accent: true },
      { text: ' is Available?', accent: false },
    ],
  ],
  subtext: 'Explore the domain-specialized ERP versions — not retrofitted for them.',
};

export const FALLBACK_INDUSTRIES = [
  {
    slug: 'bakery',
    name: 'Bakery & Confectionery',
    icon: 'Cake',
    shortDescription: 'Shelf-life planning, recipe management & production costing.',
    erpTitle: 'Bakery & Confectionery ERP',
    erpDescription:
      'End-to-end control across recipes, batches, shelf-life and outlet billing.',
    image: '/images/bakery.webp',
    imageAlt: 'Bakery & Confectionery',
    dashboard: DASHBOARD,
    dashboardAlt: DASHBOARD_ALT,
    features: [
      {
        icon: 'FlaskConical',
        title: 'Recipe & BOM Costing',
        description:
          'Ingredient-level recipe, batch and yield costing with real-time margins on every product.',
      },
      {
        icon: 'Timer',
        title: 'Shelf-life & Freshness',
        description:
          'Expiry dates, FEFO rotation and freshness control across every counter and outlet.',
      },
      {
        icon: 'Settings',
        title: 'Production Planning',
        description:
          'Demand-driven batch production planning with wastage, rework and yield tracking.',
      },
      {
        icon: 'Store',
        title: 'Counter POS',
        description:
          'Outlet billing, offers, loyalty and daily sales on one fast, offline-ready counter POS.',
      },
      {
        icon: 'Truck',
        title: 'Multi-Outlet Distribution',
        description:
          'Central bakery to outlet dispatch, indenting and live stock visibility, every day.',
      },
      {
        icon: 'TrendingUp',
        title: 'Costing & Reports',
        description:
          'Product costing, GST billing and daily MIS reports for every branch on one dashboard.',
      },
    ],
  },
  {
    slug: 'dairy',
    name: 'Dairy & Ice Cream',
    icon: 'IceCream',
    shortDescription: 'FEFO management, expiry tracking & milk procurement.',
    erpTitle: 'Dairy & Ice Cream ERP',
    erpDescription:
      'End-to-end visibility across procurement, production, quality, inventory and distribution.',
    image: '/images/dairy.webp',
    imageAlt: 'Dairy & Ice Cream',
    dashboard: DASHBOARD,
    dashboardAlt: DASHBOARD_ALT,
    features: [
      {
        icon: 'CalendarClock',
        title: 'FEFO & Expiry Management',
        description: 'Automated FEFO, shelf-life tracking and expiry alerts.',
      },
      {
        icon: 'Truck',
        title: 'Milk Procurement',
        description: 'Milk collection, testing, fat/SNF management & supplier tracking.',
      },
      {
        icon: 'Settings',
        title: 'Production Management',
        description: 'Batch-wise production, formula management & yield tracking.',
      },
      {
        icon: 'ShieldCheck',
        title: 'Quality Control',
        description: 'QC checks, lab integration and compliance management.',
      },
      {
        icon: 'Snowflake',
        title: 'Cold Chain & Distribution',
        description: 'Temperature tracking, cold storage & route optimization.',
      },
      {
        icon: 'TrendingUp',
        title: 'Reports & Analytics',
        description: 'Procurement, yield and sales dashboards.',
      },
    ],
  },
  {
    slug: 'beverages',
    name: 'Beverages',
    icon: 'CupSoda',
    shortDescription: 'Batch production, formula management & dispatch tracking.',
    erpTitle: 'Beverages ERP',
    erpDescription:
      'Formula-driven batch production with full dispatch and distribution visibility.',
    image: '/images/beverage.webp',
    imageAlt: 'Beverages',
    dashboard: DASHBOARD,
    dashboardAlt: DASHBOARD_ALT,
    features: [
      {
        icon: 'FlaskConical',
        title: 'Formula Management',
        description:
          'Version-controlled formulas and batch recipes with precise ingredient ratios.',
      },
      {
        icon: 'Factory',
        title: 'Batch Production',
        description:
          'Line-wise production, filling and yield tracking across every shift and SKU.',
      },
      {
        icon: 'ShieldCheck',
        title: 'Quality Control',
        description:
          'In-line QC checks, lab integration and full FSSAI compliance management.',
      },
      {
        icon: 'Package',
        title: 'Dispatch Tracking',
        description:
          'Warehouse-to-route dispatch visibility with real-time delivery status.',
      },
      {
        icon: 'Boxes',
        title: 'Inventory & Expiry',
        description:
          'Batch-wise stock with shelf-life control and automated expiry alerts.',
      },
      {
        icon: 'TrendingUp',
        title: 'Costing & Margins',
        description:
          'SKU-level costing and margin analytics across every pack size and channel.',
      },
    ],
  },
  {
    slug: 'namkeen',
    name: 'Snacks & Namkeen',
    icon: 'Popcorn',
    shortDescription: 'Recipe control, oil management & wastage tracking.',
    erpTitle: 'Snacks & Namkeen ERP',
    erpDescription: 'Recipe-accurate production with tight oil, yield and wastage control.',
    image: '/images/namkeens.webp',
    imageAlt: 'Snacks & Namkeen',
    dashboard: DASHBOARD,
    dashboardAlt: DASHBOARD_ALT,
    features: [
      {
        icon: 'FlaskConical',
        title: 'Recipe Control',
        description:
          'Standardised recipes and batch consistency across every kitchen and shift.',
      },
      {
        icon: 'Droplets',
        title: 'Oil & Consumption',
        description:
          'Frying oil usage, top-up and consumption norms tracked against every batch.',
      },
      {
        icon: 'Timer',
        title: 'Wastage Tracking',
        description:
          'Real-time wastage and yield variance alerts to protect your margins.',
      },
      {
        icon: 'Package',
        title: 'Packing & Dispatch',
        description: 'Pack-size costing, weighment and dispatch control for every SKU.',
      },
      {
        icon: 'ShieldCheck',
        title: 'Quality & Compliance',
        description: 'FSSAI compliance, batch QC checks and full lot traceability.',
      },
      {
        icon: 'TrendingUp',
        title: 'Costing & Reports',
        description:
          'SKU-level costing and daily MIS reports across every plant and channel.',
      },
    ],
  },
  {
    slug: 'spices',
    name: 'Spices & Condiments',
    icon: 'Soup',
    shortDescription: 'Lot traceability, quality compliance & lab testing.',
    erpTitle: 'Spices & Condiments ERP',
    erpDescription: 'Farm-to-pack lot traceability with lab-grade quality compliance.',
    image: '/images/spices.webp',
    imageAlt: 'Spices & Condiments',
    dashboard: DASHBOARD,
    dashboardAlt: DASHBOARD_ALT,
    features: [
      {
        icon: 'ClipboardCheck',
        title: 'Lot Traceability',
        description:
          'Full forward and backward lot tracing from raw material to finished pack.',
      },
      {
        icon: 'FlaskConical',
        title: 'Lab Testing',
        description: 'Moisture, purity and contaminant testing with lab-grade QC records.',
      },
      {
        icon: 'ShieldCheck',
        title: 'Quality Compliance',
        description: 'FSSAI, spice-board and export compliance managed end to end.',
      },
      {
        icon: 'Factory',
        title: 'Grinding & Blending',
        description:
          'Blend recipes and batch grinding control with precise ratio management.',
      },
      {
        icon: 'Package',
        title: 'Packing & Dispatch',
        description: 'Pack-size costing, weighment and dispatch control for every SKU.',
      },
      {
        icon: 'TrendingUp',
        title: 'Costing & Reports',
        description: 'Blend costing, quality reports and MIS dashboards on one platform.',
      },
    ],
  },
  {
    slug: 'nutra',
    name: 'Nutraceuticals',
    icon: 'Pill',
    shortDescription: 'Regulatory compliance, batch validation & formula tracking.',
    erpTitle: 'Nutraceuticals ERP',
    erpDescription:
      'Validated, compliant manufacturing with full formula and batch genealogy.',
    image: '/images/Nutraceutical.webp',
    imageAlt: 'Nutraceuticals',
    dashboard: DASHBOARD,
    dashboardAlt: DASHBOARD_ALT,
    features: [
      {
        icon: 'ShieldCheck',
        title: 'Regulatory Compliance',
        description: 'GMP, FSSAI and audit-ready documentation maintained automatically.',
      },
      {
        icon: 'ClipboardCheck',
        title: 'Batch Validation',
        description:
          'Batch records, genealogy and release control for every production lot.',
      },
      {
        icon: 'FlaskConical',
        title: 'Formula Tracking',
        description:
          'Actives, potency and formulation versioning with full change history.',
      },
      {
        icon: 'Boxes',
        title: 'Inventory & Expiry',
        description:
          'Lot-wise stock with strict expiry enforcement and near-expiry alerts.',
      },
      {
        icon: 'Factory',
        title: 'Production Control',
        description: 'Line-wise manufacturing, in-process checks and yield tracking.',
      },
      {
        icon: 'TrendingUp',
        title: 'Reports & Analytics',
        description: 'Batch, QC and inventory dashboards for complete plant visibility.',
      },
    ],
  },
  {
    slug: 'fmcg',
    name: 'FMCG Distribution',
    icon: 'Truck',
    shortDescription: 'Secondary sales, distributor management & order automation.',
    erpTitle: 'FMCG Distribution ERP',
    erpDescription: 'Primary-to-secondary visibility with automated ordering and claims.',
    image: '/images/fmcg_ind.webp',
    imageAlt: 'FMCG Distribution',
    dashboard: DASHBOARD,
    dashboardAlt: DASHBOARD_ALT,
    features: [
      {
        icon: 'TrendingUp',
        title: 'Secondary Sales',
        description:
          'Outlet-level secondary sales visibility across every beat and territory.',
      },
      {
        icon: 'Users',
        title: 'Distributor Management',
        description: 'Distributor stock, claims and settlement tracked in real time.',
      },
      {
        icon: 'Route',
        title: 'Order Automation',
        description: 'Beat-wise ordering and auto-replenishment straight from the field.',
      },
      {
        icon: 'Package',
        title: 'Stock & Dispatch',
        description: 'Multi-warehouse stock, picking and dispatch control on one system.',
      },
      {
        icon: 'Target',
        title: 'Schemes & Claims',
        description:
          'Scheme automation and fast, accurate claim settlement for every partner.',
      },
      {
        icon: 'TrendingUp',
        title: 'Reports & Analytics',
        description: 'Sales, stock and distributor dashboards with same-day visibility.',
      },
    ],
  },
];

/** The strip along the bottom of the card - the same four for every industry. */
export const FALLBACK_BENEFITS = [
  { icon: 'Target', title: 'Industry Best Practices Built-in' },
  { icon: 'TrendingUp', title: 'Higher Efficiency & Lower Waste' },
  { icon: 'ShieldCheck', title: 'Compliance Assured' },
  { icon: 'Rocket', title: 'Scalable as You Grow' },
];
