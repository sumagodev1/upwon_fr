/**
 * "UPWON ERP - Benefits for Everyone" - the section's built-in content.
 *
 * Written in exactly the shape the CMS returns, so the component renders one
 * thing and never has to know which source it came from. It is the fallback,
 * not the source of truth: the admin panel owns this content, and this copy is
 * what the page shows while the fetch is in flight, during the SSG build, and
 * whenever the API is unreachable.
 *
 * Icons are names rather than components, again matching the API - they are
 * resolved through lib/erpIcons.js at render time. Each audience's eyebrow is
 * the composed sentence the API sends, not the role and context separately.
 */

/** The label, heading and description that head the section. */
export const FALLBACK_COPY = {
  eyebrow: 'From Plant Floor to Boardroom',
  headingLines: [
    [
      { text: 'UPWON ERP — Benefits for ', accent: false },
      { text: 'Everyone', accent: true },
    ],
  ],
  subtext:
    'Tangible and intangible outcomes from the core UPWON ERP — from the plant floor to the boardroom.',
};

const tick = (text) => ({ text, icon: 'CheckCircle2' });

export const FALLBACK_PERSONAS = [
  {
    eyebrow: 'For the Operator · Plant floor, QC, stores & gate',
    title: 'Cut wastage, bill same-day',
    description:
      'The plant floor, QC, stores, billing and gate recorded in-system — not on paper, not revalidated by hand.',
    metric: { countTo: 18, text: null, prefix: '', suffix: '%' },
    metricLabel: 'wastage reduction within the first year (Kaka Foods)',
    authorDesignation: 'Plant Operations Head',
    authorCompany: 'Kaka Foods',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=70',
    avatarAlt: 'Plant Operations Head',
    avatarColor: '#C8820A',
    outcomes: [
      tick('Credit notes cut from 5–6 days and 3 staff to same-day (Kaka Foods)'),
      tick('18% wastage reduction within the first year (Kaka Foods)'),
      tick('Billing 48% faster at the point of dispatch (Kaka Foods)'),
      tick('Batch and expiry tracked automatically via FEFO — no manual log'),
    ],
    points: [
      'Recipe/BOM and batch costing calculated by the system, not revalidated by hand',
      'In-process QC and batch hold/release built into the workflow, not a separate paper trail',
      'Vendor GRN matched against PO and quality gate automatically',
      'Gate entry, exit and dispatch recorded digitally instead of a logbook',
    ],
  },
  {
    eyebrow: 'For the Manager · Production, QC & Finance',
    title: 'See every plant in real time',
    description:
      'No real-time view of yield or quality holds, multi-plant stock invisible from one place, month-end close taking weeks.',
    metric: { countTo: null, text: '50–80%', prefix: '', suffix: '' },
    metricLabel: 'reduction in operational leakage within plant operations',
    authorDesignation: 'Production & QC Manager',
    authorCompany: 'Kaka Foods',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=70',
    avatarAlt: 'Production & QC Manager',
    avatarColor: '#006D77',
    outcomes: [
      tick('50–80% reduction in operational leakage within plant operations'),
      tick('20–35% higher dispatch and fulfilment accuracy from the plant'),
      tick('Month-end close taken from weeks to a single, real-time process (Kaka Foods)'),
      tick('Cost per batch and per SKU visible same-day, not reconstructed at month-end'),
    ],
    points: [
      'Multi-plant inventory and production visible from one screen',
      'Quality holds and rejects flagged in real time, not discovered after dispatch',
      'Wastage and yield variance visible by batch, shift and SKU',
      'Cost Centre and Asset Management tracked in-system, not on parallel spreadsheets',
    ],
  },
  {
    eyebrow: 'For the CTO · Technology & data architecture',
    title: 'One connected data model',
    description:
      'Stitched-together point systems, unclear data architecture and mounting integration debt.',
    metric: { countTo: 10, text: null, prefix: '', suffix: '' },
    metricLabel: 'connected modules on one data model',
    authorDesignation: 'Technology Lead',
    authorCompany: 'Live UPWON deployment',
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=70',
    avatarAlt: 'Technology Lead',
    avatarColor: '#2E7D32',
    outcomes: [
      tick(
        '10 connected modules — Procurement, Production, Quality, Inventory, Dispatch, Sales & Billing, Finance, Cost Centre, Gate, Asset Management — on one data model',
      ),
      tick('3,500+ daily ERP users live today — proven at real transaction volume, not a pilot'),
      tick('FSSAI, GST and e-invoice compliance built into the core data model, not a bolt-on'),
      tick('Live accounting-system interoperability with Tally, SAP, Oracle and MS Dynamics'),
    ],
    points: [
      'One data model across procurement through finance — no separate systems to sync',
      'Production numbers flow into inventory and finance automatically, no manual reconciliation',
      'SOP-documented go-live process, not an ad hoc customisation project',
      'Working toward ISO 27001 readiness and DPDP Act alignment (in progress, not yet certified)',
    ],
  },
  {
    eyebrow: 'For the CFO · Cost, compliance & return',
    title: 'Live cost and margin visibility',
    description:
      'Unclear ROI, statutory risk, and working capital tied up in slow reconciliation.',
    metric: { countTo: null, text: '8–18%', prefix: '', suffix: '' },
    metricLabel: 'profitability improvement within 6–12 months',
    authorDesignation: 'Finance Director',
    authorCompany: 'Kaka Foods',
    avatar:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=70',
    avatarAlt: 'Finance Director',
    avatarColor: '#E85A2A',
    outcomes: [
      tick('8–18% profitability improvement within 6–12 months'),
      tick('50–80% reduction in plant-level operational leakage'),
      tick('Credit note cycle: 5–6 days and 3 staff, down to same-day (Kaka Foods)'),
      tick(
        'A fraction of the 3-year total cost of ownership of SAP B1 or Oracle NetSuite at comparable ERP depth',
      ),
    ],
    points: [
      'Cost per batch and per SKU visible in real time, not reconstructed at month-end',
      'GST, e-invoice and FSSAI compliance native — lower statutory and audit exposure',
      'Asset Management and Cost Centre MIS remove the need for parallel finance trackers',
      'Faster, more predictable close instead of a multi-week scramble',
    ],
  },
  {
    eyebrow: 'For the CEO / Founder · Scaling the plant',
    title: 'Scale without the chaos',
    description:
      'A new plant adds headcount and chaos before it adds output; production truth scattered across registers, Excel and memory.',
    metric: { countTo: 8, text: null, prefix: '', suffix: ' yrs' },
    metricLabel: 'of live production deployment — proven, not a first-time bet',
    authorDesignation: 'Founder & CEO',
    authorCompany: 'Kaka Foods',
    avatar:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=70',
    avatarAlt: 'Founder & CEO',
    avatarColor: '#1565C0',
    outcomes: [
      tick('8–18% profitability improvement within 6–12 months'),
      tick('18% wastage reduction within the first year at a live plant (Kaka Foods)'),
      tick('3,500+ people running the ERP daily, across live plants'),
      tick('8 years of live production deployment — proven, not a first-time bet'),
    ],
    points: [
      'A new plant can be added without adding proportional back-office headcount',
      'Production, quality and finance trusted as one source, not reconciled from silos',
      'Margin visible at the batch level, not discovered at month-end',
      'Leadership time shifts from firefighting the plant to running the business',
    ],
  },
];

/**
 * The company-wide figures beside each audience's own headline metric.
 *
 * The same three show whichever audience is selected.
 */
export const FALLBACK_STATS = [
  { value: '3,500+', label: 'Daily ERP users' },
  { value: '10', label: 'Connected modules' },
  { value: '8 yrs', label: 'Live deployment' },
];
