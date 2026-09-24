/**
 * "UPWON vs the Alternatives" - the grid's built-in content.
 *
 * Written in exactly the shape the CMS returns, so the component renders one
 * thing and never has to know which source it came from. It is the fallback,
 * not the source of truth: the admin panel owns this content, and this copy is
 * what the page shows while the fetch is in flight, during the SSG build, and
 * whenever the API is unreachable.
 *
 * Column ids are plain strings here rather than the database's UUIDs - the grid
 * only ever uses them to look a cell up against its column, so any stable
 * identifier does.
 */

export const FALLBACK_COPY = {
  eyebrow: 'UPWON vs the Alternatives',
  headingLines: [
    [
      { text: 'Enterprise-Grade Depth. ', accent: false },
      { text: 'Without the Enterprise Price or Timeline.', accent: true },
    ],
  ],
  subtext:
    'No formal feature bake-off required — just a plain-language look at how UPWON compares with global ERPs and generic platforms on the things food and FMCG operators actually care about.',
};

/** The header above the parameter names. Not one of the columns. */
export const FALLBACK_LEADER = {
  label: 'How They Compare',
  description: 'On what food & FMCG operators care about',
};

export const FALLBACK_COLUMNS = [
  {
    id: 'upwon',
    name: 'UPWON',
    description: 'Built for food & FMCG',
    logo: null,
    logoAlt: '',
    highlight: true,
  },
  {
    id: 'global',
    name: 'Global ERPs',
    description: 'SAP · Oracle · Dynamics',
    logo: null,
    logoAlt: '',
    highlight: false,
  },
  {
    id: 'generic',
    name: 'Generic / Open-Source',
    description: 'Odoo · ERPNext · Zoho · Tally',
    logo: null,
    logoAlt: '',
    highlight: false,
  },
];

export const FALLBACK_CATEGORIES = [
  {
    name: 'Cost & rollout',
    rows: [
      {
        parameter: 'Cost & time to go-live',
        values: {
          upwon: '30–45 days, a fraction of enterprise TCO',
          global: '12–18 months, high licence + SI cost',
          generic: 'Varies — heavy customisation to fit food',
        },
      },
      {
        parameter: '3-year total cost of ownership',
        values: {
          upwon: 'A fraction of SAP B1 / Oracle NetSuite',
          global: 'High licence + implementation',
          generic: 'Lower licence, high build & maintain cost',
        },
      },
    ],
  },
  {
    name: 'Food & compliance',
    rows: [
      {
        parameter: 'Food- & FSSAI-specific workflows',
        values: {
          upwon: 'Built in — recipe/BOM, batch, FEFO, FSSAI',
          global: 'Add-ons or a custom build',
          generic: 'Not food-specific — build it yourself',
        },
      },
      {
        parameter: 'GST & e-invoice, native',
        values: {
          upwon: 'Native',
          global: 'Localisation packs',
          generic: 'Plugin or manual',
        },
      },
    ],
  },
  {
    name: 'India distribution',
    rows: [
      {
        parameter: 'GT/MT distribution logic',
        values: {
          upwon: 'Native GT/MT',
          global: 'Partner add-ons',
          generic: 'Limited or manual',
        },
      },
      {
        parameter: 'SFA-DMS field force',
        values: {
          upwon: 'Built in',
          global: 'Third-party integration',
          generic: 'Separate tool',
        },
      },
    ],
  },
  {
    name: 'Partnership & support',
    rows: [
      {
        parameter: 'Access to the team building the product',
        values: {
          upwon: 'Direct access to the product team',
          global: 'Via SI partners and support tickets',
          generic: 'Community or third-party vendors',
        },
      },
    ],
  },
];
