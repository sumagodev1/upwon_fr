import {
  Award,
  BadgeCheck,
  BarChart3,
  Bean,
  Boxes,
  Building2,
  Citrus,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Droplets,
  Factory,
  Flame,
  Gauge,
  Globe,
  HelpCircle,
  Layers,
  Leaf,
  MapPin,
  Network,
  Nut,
  Package,
  PieChart,
  Receipt,
  Route,
  Scale,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Sprout,
  Store,
  Target,
  Thermometer,
  Tractor,
  TrendingUp,
  Truck,
  Users,
  Warehouse,
  Wheat,
  Workflow,
} from 'lucide-react';

/**
 * The icons the Spices & Agro Processing CMS can name.
 *
 * A record cannot hold a React component, so the API stores a name and this is
 * where it becomes one again. The keys are the server's allowlist
 * (modules/industry-pages/spices-agro-page/utils/icons.ts) - the server rejects
 * anything outside it, so a stored name always resolves here.
 *
 * Keep the two lists in step. An unknown name falls back to a question mark
 * rather than throwing, the same as lib/beverageIcons.js.
 */

const ICONS = {
  Award,
  BadgeCheck,
  BarChart3,
  Bean,
  Boxes,
  Building2,
  Citrus,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Droplets,
  Factory,
  Flame,
  Gauge,
  Globe,
  Layers,
  Leaf,
  MapPin,
  Network,
  Nut,
  Package,
  PieChart,
  Receipt,
  Route,
  Scale,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Sprout,
  Store,
  Target,
  Thermometer,
  Tractor,
  TrendingUp,
  Truck,
  Users,
  Warehouse,
  Wheat,
  Workflow,
};

export function spicesAgroIcon(name) {
  return ICONS[name] ?? HelpCircle;
}
