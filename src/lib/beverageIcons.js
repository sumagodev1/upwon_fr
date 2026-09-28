import {
  Apple,
  Award,
  BadgeCheck,
  BarChart3,
  Boxes,
  Building2,
  Citrus,
  ClipboardList,
  Clock,
  CupSoda,
  Droplet,
  Droplets,
  Factory,
  FlaskConical,
  Gauge,
  GlassWater,
  Grape,
  HeartPulse,
  HelpCircle,
  Layers,
  Leaf,
  MapPin,
  Milk,
  Network,
  Package,
  PieChart,
  Receipt,
  Route,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Snowflake,
  Sparkles,
  Store,
  Target,
  Thermometer,
  TrendingUp,
  Truck,
  Users,
  Warehouse,
  Wine,
  Workflow,
  Zap,
} from 'lucide-react';

/**
 * The icons the Beverages & Juices CMS can name.
 *
 * A record cannot hold a React component, so the API stores a name and this is
 * where it becomes one again. The keys are the server's allowlist
 * (modules/industry-pages/beverage-page/utils/icons.ts) - the server rejects
 * anything outside it, so a stored name always resolves here.
 *
 * Keep the two lists in step. An unknown name falls back to a question mark
 * rather than throwing, the same as lib/engineeringIcons.js.
 */

const ICONS = {
  Apple,
  Award,
  BadgeCheck,
  BarChart3,
  Boxes,
  Building2,
  Citrus,
  ClipboardList,
  Clock,
  CupSoda,
  Droplet,
  Droplets,
  Factory,
  FlaskConical,
  Gauge,
  GlassWater,
  Grape,
  HeartPulse,
  Layers,
  Leaf,
  MapPin,
  Milk,
  Network,
  Package,
  PieChart,
  Receipt,
  Route,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Snowflake,
  Sparkles,
  Store,
  Target,
  Thermometer,
  TrendingUp,
  Truck,
  Users,
  Warehouse,
  Wine,
  Workflow,
  Zap,
};

export function beverageIcon(name) {
  return ICONS[name] ?? HelpCircle;
}
