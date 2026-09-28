import {
  BadgeCheck,
  Banknote,
  Building2,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Clock3,
  Contact,
  CreditCard,
  FileCheck2,
  FileSearch,
  FileSpreadsheet,
  FileText,
  Gauge,
  Handshake,
  HelpCircle,
  Layers,
  Lock,
  MessageSquare,
  Package,
  PackageCheck,
  Percent,
  ReceiptText,
  Scale,
  ScrollText,
  Search,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingDown,
  TrendingUp,
  Truck,
  UserRoundCheck,
  UserRoundPlus,
  Users,
  Wallet,
} from 'lucide-react';

/**
 * The icons the Vendor Portal CMS can name.
 *
 * A record cannot hold a React component, so the API stores a name and this
 * is where it becomes one again. The keys are the server's allowlist
 * (modules/product-pages/vendor-portal-page/utils/icons.ts) - the server
 * rejects anything outside it, so a stored name always resolves here.
 *
 * Keep the two lists in step. An unknown name falls back to a question mark
 * rather than throwing: an icon from a newer release should leave the section
 * readable, not blank the page.
 */

const ICONS = {
  BadgeCheck,
  Banknote,
  Building2,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Clock3,
  Contact,
  CreditCard,
  FileCheck2,
  FileSearch,
  FileSpreadsheet,
  FileText,
  Gauge,
  Handshake,
  Layers,
  Lock,
  MessageSquare,
  Package,
  PackageCheck,
  Percent,
  ReceiptText,
  Scale,
  ScrollText,
  Search,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingDown,
  TrendingUp,
  Truck,
  UserRoundCheck,
  UserRoundPlus,
  Users,
  Wallet,
};

/** The component for a stored icon name, or a question mark for an unknown one. */
export function vmsIcon(name) {
  return ICONS[name] ?? HelpCircle;
}
