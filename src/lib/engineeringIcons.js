import {
  Activity,
  Award,
  BadgeCheck,
  BarChart3,
  Bot,
  Boxes,
  Building2,
  Car,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Cog,
  Cpu,
  Database,
  Factory,
  FileText,
  Gauge,
  Globe,
  Hammer,
  Handshake,
  HelpCircle,
  Layers,
  MapPin,
  Network,
  Package,
  Route,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Target,
  TrendingUp,
  Truck,
  UserCog,
  Users,
  Warehouse,
  WashingMachine,
  Workflow,
  Wrench,
} from 'lucide-react';

/**
 * The icons the Engineering & Manufacturing CMS can name.
 *
 * A record cannot hold a React component, so the API stores a name and this is
 * where it becomes one again. The keys are the server's allowlist
 * (modules/industry-pages/engineering-manufacturing-page/utils/icons.ts) - the
 * server rejects anything outside it, so a stored name always resolves here.
 *
 * Keep the two lists in step. An unknown name falls back to a question mark
 * rather than throwing, the same as lib/fmsIcons.js.
 */

const ICONS = {
  Activity,
  Award,
  BadgeCheck,
  BarChart3,
  Bot,
  Boxes,
  Building2,
  Car,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Cog,
  Cpu,
  Database,
  Factory,
  FileText,
  Gauge,
  Globe,
  Hammer,
  Handshake,
  Layers,
  MapPin,
  Network,
  Package,
  Route,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Target,
  TrendingUp,
  Truck,
  UserCog,
  Users,
  Warehouse,
  WashingMachine,
  Workflow,
  Wrench,
};

export function engineeringIcon(name) {
  return ICONS[name] ?? HelpCircle;
}
