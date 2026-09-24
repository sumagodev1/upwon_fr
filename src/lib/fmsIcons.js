import {
  Award,
  BadgeCheck,
  BarChart3,
  Boxes,
  Building2,
  Cake,
  ChefHat,
  Clock,
  Coins,
  Factory,
  Globe,
  Handshake,
  HelpCircle,
  IndianRupee,
  Layers,
  MapPin,
  Network,
  Package,
  Percent,
  Receipt,
  Route,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Store,
  Target,
  Trash2,
  TrendingUp,
  Truck,
  Users,
  Utensils,
  Warehouse,
  Workflow,
} from 'lucide-react';

/**
 * The icons the FMS CMS can name.
 *
 * A record cannot hold a React component, so the API stores a name and this is
 * where it becomes one again. The keys are the server's allowlist
 * (modules/product-pages/fms-page/utils/icons.ts) - the server rejects anything
 * outside it, so a stored name always resolves here.
 *
 * Keep the two lists in step. An unknown name falls back to a question mark
 * rather than throwing: an icon from a newer release should leave the section
 * readable, not blank the page.
 */

const ICONS = {
  Award,
  BadgeCheck,
  BarChart3,
  Boxes,
  Building2,
  Cake,
  ChefHat,
  Clock,
  Coins,
  Factory,
  Globe,
  Handshake,
  IndianRupee,
  Layers,
  MapPin,
  Network,
  Package,
  Percent,
  Receipt,
  Route,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Store,
  Target,
  Trash2,
  TrendingUp,
  Truck,
  Users,
  Utensils,
  Warehouse,
  Workflow,
};

/**
 * Resolves a stored icon name to its component.
 *
 * @param {string} name
 * @returns {import('react').ComponentType<{className?: string, strokeWidth?: number}>}
 */
export function fmsIcon(name) {
  return ICONS[name] ?? HelpCircle;
}

/**
 * The accent at a given alpha, for the tint behind a figure's icon.
 *
 * Derived rather than stored: one colour is authored and the wash of it is
 * computed here, so they cannot drift apart. A malformed value falls back to
 * transparent, which loses the tint but leaves the card readable.
 *
 * @param {string} hex a six-digit #RRGGBB, as the server validates
 * @param {number} alpha
 */
export function fmsAccentTint(hex, alpha) {
  if (typeof hex !== 'string' || !/^#[0-9a-fA-F]{6}$/.test(hex)) return 'transparent';
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
