import {
  Award,
  BadgeCheck,
  BarChart3,
  Beef,
  Boxes,
  Cake,
  CalendarClock,
  Check,
  CheckCircle2,
  CircleCheck,
  ClipboardCheck,
  Coffee,
  CupSoda,
  Droplets,
  Factory,
  FileCheck,
  Flame,
  FlaskConical,
  Headset,
  HelpCircle,
  IceCream,
  Leaf,
  Milk,
  Package,
  Pill,
  Popcorn,
  Rocket,
  Route,
  Scale,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Snowflake,
  Soup,
  Sparkles,
  Store,
  Target,
  Thermometer,
  Timer,
  TrendingUp,
  Truck,
  Users,
  Wheat,
  Wrench,
} from 'lucide-react';

/**
 * The icons the ERP CMS can name.
 *
 * A record cannot hold a React component, so the API stores a name and this is
 * where it becomes one again. The keys are the server's allowlist
 * (modules/erp-page/utils/icons.ts) - the server rejects anything outside it,
 * so a stored name always resolves here.
 *
 * Keep the two lists in step. An unknown name falls back to a question mark
 * rather than throwing: an icon from a newer release should leave the section
 * readable, not blank the page.
 */

const ICONS = {
  Award,
  BadgeCheck,
  BarChart3,
  Beef,
  Boxes,
  Cake,
  CalendarClock,
  Check,
  CheckCircle2,
  CircleCheck,
  ClipboardCheck,
  Coffee,
  CupSoda,
  Droplets,
  Factory,
  FileCheck,
  Flame,
  FlaskConical,
  Headset,
  IceCream,
  Leaf,
  Milk,
  Package,
  Pill,
  Popcorn,
  Rocket,
  Route,
  Scale,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Snowflake,
  Soup,
  Sparkles,
  Store,
  Target,
  Thermometer,
  Timer,
  TrendingUp,
  Truck,
  Users,
  Wheat,
  Wrench,
};

/**
 * Resolves a stored icon name to its component.
 *
 * @param {string} name
 * @returns {import('react').ComponentType<{className?: string, strokeWidth?: number}>}
 */
export function erpIcon(name) {
  return ICONS[name] ?? HelpCircle;
}
