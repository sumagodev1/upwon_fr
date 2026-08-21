import { Compass, Settings2, ClipboardCheck, Rocket } from 'lucide-react';

// Brand brief: 30-45 days · 4 phases (not 5 · 12 weeks)
export const IMPLEMENTATION_PHASES = [
  {
    id: 'discovery',
    icon: Compass,
    week: 'Days 1–7',
    title: 'Discovery & Setup',
    description:
      'Detailed Business Requirements Specification (BRS), process mapping, gap analysis and a signed-off scope. Master data templates issued.',
    deliverables: [
      'BRS document & process map',
      'Gap analysis & solution blueprint',
      'Integration architecture',
      'Master data templates',
    ],
  },
  {
    id: 'configuration',
    icon: Settings2,
    week: 'Days 8–21',
    title: 'Configuration & Data',
    description:
      'Platforms configured against the signed-off scope. Master data loaded. Integrations wired. Customisations developed where needed.',
    deliverables: [
      'Platform configuration',
      'Master data migration',
      'Integration build & test',
      'Customisations (if any)',
    ],
  },
  {
    id: 'uat',
    icon: ClipboardCheck,
    week: 'Days 22–35',
    title: 'Training & UAT',
    description:
      'User acceptance testing with operations leaders. SOP handover, train-the-trainer sessions, outlet and depot readiness audits.',
    deliverables: [
      'UAT scripts & sign-off',
      'SOP playbooks handover',
      'Train-the-trainer sessions',
      'Outlet/depot readiness audit',
    ],
  },
  {
    id: 'golive',
    icon: Rocket,
    week: 'Day 36+',
    title: 'Go-Live & 90-Day Support',
    description:
      'Controlled go-live with on-site SPOC support. 90-day hyper-care included as standard — not an add-on.',
    deliverables: [
      'Cutover with parallel-run',
      'On-site SPOC support',
      '90-day hyper-care',
      'KPI baselining & QBR setup',
    ],
  },
];

export const GOVERNANCE = [
  {
    title: 'Dedicated SPOC from Day 1',
    desc: 'One senior contact owns your journey from kick-off to steady state. No ticket bouncing, ever.',
  },
  {
    title: 'Implementation Included',
    desc: 'Implementation, training, and 90-day hyper-care are part of the contract — not separate line items.',
  },
  {
    title: 'SOP-Driven Delivery',
    desc: 'Every phase governed by versioned SOPs and sign-offs. CMM Level 3 process rigour.',
  },
  {
    title: 'Customisation Capable',
    desc: 'Where standard configuration ends, our team can build — transparently, at cost.',
  },
];
