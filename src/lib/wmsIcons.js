import {
  Barcode,
  Boxes,
  Building2,
  CalendarDays,
  ClipboardCheck,
  ChartNoAxesCombined,
  ClipboardList,
  Clock,
  Clock3,
  Container,
  Forklift,
  Gauge,
  HelpCircle,
  Layers,
  Lock,
  MapPin,
  Package,
  PackageCheck,
  PackageOpen,
  PackageSearch,
  QrCode,
  Refrigerator,
  Route,
  Ruler,
  Scale,
  ScanLine,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Target,
  Thermometer,
  Timer,
  TrendingUp,
  Truck,
  Warehouse,
} from 'lucide-react';

/**
 * The icons the WMS CMS can name.
 *
 * A record cannot hold a React component, so the API stores a name and this is
 * where it becomes one again. The keys are the server's allowlist
 * (modules/product-pages/wms-page/utils/icons.ts) - the server rejects
 * anything outside it, so a stored name always resolves here.
 *
 * Keep the two lists in step. An unknown name falls back to a question mark
 * rather than throwing: an icon from a newer release should leave the section
 * readable, not blank the page.
 */

const ICONS = {
  Barcode,
  Boxes,
  Building2,
  CalendarDays,
  ChartNoAxesCombined,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Clock3,
  Container,
  Forklift,
  Gauge,
  Layers,
  Lock,
  MapPin,
  Package,
  PackageCheck,
  PackageOpen,
  PackageSearch,
  QrCode,
  Refrigerator,
  Route,
  Ruler,
  Scale,
  ScanLine,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Target,
  Thermometer,
  Timer,
  TrendingUp,
  Truck,
  Warehouse,
};

/** The component for a stored icon name, or a question mark for an unknown one. */
export function wmsIcon(name) {
  return ICONS[name] ?? HelpCircle;
}
