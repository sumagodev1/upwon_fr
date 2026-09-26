// The blog's category icon registry: the site's copy of the backend's
// BLOG_CATEGORY_ICON_NAMES allowlist (modules/blog/utils/icons.ts), which the
// admin panel's icon picker mirrors too.
//
// A record cannot hold a React component, so the API stores an icon as a NAME
// and this file turns the name back into a component, the way lib/erpIcons.js
// does for the ERP page and lib/socialIcons.jsx does for the footer. The keys
// below must match the backend list exactly: a name the backend accepts but
// this file does not know renders as HelpCircle rather than as nothing, so a
// missed name is visible instead of silent — and an icon from a newer release
// leaves the chip readable rather than blanking the page.
//
// Every name is a lucide-react 0.460 export (checked against node_modules when
// the list was written). The first six are the icons data/blog.js's built-in
// CATEGORIES draw, so a seeded category looks exactly like its built-in twin.

import {
  BarChart3,
  BookOpen,
  Boxes,
  Cake,
  Coffee,
  Cpu,
  Factory,
  Globe,
  HelpCircle,
  Leaf,
  Lightbulb,
  Milk,
  Newspaper,
  PackageCheck,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Store,
  TrendingUp,
  Truck,
  UserCog,
  Users,
  Warehouse,
  Wheat,
} from 'lucide-react';

// Same names, same order as BLOG_CATEGORY_ICON_NAMES.
const ICONS = {
  Factory,
  Truck,
  Store,
  UserCog,
  PackageCheck,
  TrendingUp,
  Boxes,
  ShoppingCart,
  Warehouse,
  Wheat,
  Milk,
  Cake,
  Coffee,
  Leaf,
  BarChart3,
  ShieldCheck,
  Users,
  Settings,
  Lightbulb,
  BookOpen,
  Newspaper,
  Sparkles,
  Globe,
  Cpu,
};

/**
 * The component for an allowlisted icon name; HelpCircle for anything else,
 * including null (a category that arrived with no icon at all).
 *
 * @param {string|null|undefined} name
 * @returns {import('react').ComponentType<{className?: string, strokeWidth?: number}>}
 */
export function blogIcon(name) {
  // An own-property check, so a stored 'constructor' or 'toString' cannot
  // resolve to something off Object.prototype.
  return (
    (typeof name === 'string' && Object.prototype.hasOwnProperty.call(ICONS, name) && ICONS[name]) ||
    HelpCircle
  );
}
