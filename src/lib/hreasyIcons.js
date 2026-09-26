import {
  Award,
  BadgeCheck,
  Banknote,
  BarChart3,
  Briefcase,
  Building2,
  CalendarCheck,
  CalendarDays,
  ClipboardList,
  Clock,
  Coins,
  Factory,
  FileCheck,
  Fingerprint,
  Gauge,
  GraduationCap,
  HandCoins,
  HeartHandshake,
  HelpCircle,
  IndianRupee,
  Layers,
  Lock,
  MapPin,
  Receipt,
  Scale,
  Settings,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  UserCheck,
  UserPlus,
  Users,
  Wallet,
  Workflow,
} from 'lucide-react';

/**
 * The icons the HREasy CMS can name.
 *
 * A record cannot hold a React component, so the API stores a name and this is
 * where it becomes one again. The keys are the server's allowlist
 * (modules/product-pages/hreasy-page/utils/icons.ts) - the server rejects
 * anything outside it, so a stored name always resolves here.
 *
 * Keep the two lists in step. An unknown name falls back to a question mark
 * rather than throwing: an icon from a newer release should leave the section
 * readable, not blank the page.
 */

const ICONS = {
  Award,
  BadgeCheck,
  Banknote,
  BarChart3,
  Briefcase,
  Building2,
  CalendarCheck,
  CalendarDays,
  ClipboardList,
  Clock,
  Coins,
  Factory,
  FileCheck,
  Fingerprint,
  Gauge,
  GraduationCap,
  HandCoins,
  HeartHandshake,
  IndianRupee,
  Layers,
  Lock,
  MapPin,
  Receipt,
  Scale,
  Settings,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  UserCheck,
  UserPlus,
  Users,
  Wallet,
  Workflow,
};

/** The component for a stored icon name, or a question mark for an unknown one. */
export function hreasyIcon(name) {
  return ICONS[name] ?? HelpCircle;
}
