// Lightweight navigation manifest for the 7 UpWon platforms.
//
// Navbar and Footer render in the eager (initial) bundle, so everything they
// import is downloaded and parsed on first paint. They only need each
// platform's slug, display `code`, one-line `short` and icon + accent colour
// — NOT the full catalogue (subsystems, hero slides, deep dives, packages,
// FAQs, case studies) that lives in `modules.js` (~150 KB raw).
//
// Keeping this thin projection in its own file means the nav/footer no longer
// pull `modules.js` into the entry chunk; the heavy file now loads only with
// the lazy route chunks that actually render it (ProductPage, PlatformPage,
// IndustryPage, …).
//
// IMPORTANT: this mirrors PLATFORM_MODULES (slug/code/short/icon) and
// PLATFORM_THEMES (accent) in `modules.js`, in the same order. If a platform's
// slug, code, short or accent changes there, update it here too.

import {
  ErpConnectedBrain,
  SfaLivingRouteMap,
  FmsHubSpokeCrown,
  PosSmartTerminal,
  HrmsLifecycleArc,
  WmsPrecisionGrid,
  VmsPartnershipBridge,
} from '../components/shared/PlatformIcons/PlatformIcons.jsx';

export const PLATFORM_NAV = [
  {
    id: 'erp',
    slug: 'erp',
    code: 'UpWon ERP',
    icon: ErpConnectedBrain,
    short: 'Manufacturing · Finance · Procurement · Compliance · Quality',
    accent: '#1565C0',
  },
  {
    id: 'sfa-dms',
    slug: 'sfa-dms',
    code: 'UpWon SFA-DMS',
    icon: SfaLivingRouteMap,
    short: 'Sales Force Automation · Distribution Management',
    accent: '#2E7D32',
  },
  {
    id: 'fms',
    slug: 'fms',
    code: 'UpWon FMS',
    icon: FmsHubSpokeCrown,
    short: 'Franchise Operations · Outlet POS',
    accent: '#6A1B9A',
  },
  {
    id: 'pos',
    slug: 'pos',
    code: 'UpWon POS',
    icon: PosSmartTerminal,
    short: 'Outlet POS · Aggregators · Loyalty · Settlement',
    accent: '#C62828',
  },
  {
    id: 'hreasy',
    slug: 'hrms',
    code: 'UpWon HREasy',
    icon: HrmsLifecycleArc,
    short: 'Core HR · Payroll · Statutory',
    accent: '#00695C',
  },
  {
    id: 'wms',
    slug: 'wms',
    code: 'UpWon WMS',
    icon: WmsPrecisionGrid,
    short: 'Advanced Warehouse Management',
    accent: '#E65100',
  },
  {
    id: 'vendor-portal',
    slug: 'vendor-portal',
    code: 'UpWon Vendor Portal',
    icon: VmsPartnershipBridge,
    short: 'Supplier Collaboration · Procurement',
    accent: '#37474F',
  },
];
