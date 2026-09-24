import {
  Award,
  BadgeCheck,
  Boxes,
  Building2,
  Check,
  CircleCheck,
  Factory,
  FileCheck,
  FileText,
  GitBranch,
  Globe,
  HelpCircle,
  Layers,
  Link2,
  MapPin,
  Network,
  Package,
  Route,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Share2,
  Sparkles,
  Store,
  Target,
  TrendingUp,
  Truck,
  UserRound,
  Users,
  Warehouse,
  Workflow,
} from 'lucide-react';

/**
 * The icons the SFA-DMS CMS can name.
 *
 * A record cannot hold a React component, so the API stores a name and this is
 * where it becomes one again. The keys are the server's allowlist
 * (modules/product-pages/sfa-dms-page/utils/icons.ts) - the server rejects
 * anything outside it, so a stored name always resolves here.
 *
 * Keep the two lists in step. An unknown name falls back to a question mark
 * rather than throwing: an icon from a newer release should leave the section
 * readable, not blank the page.
 */

/**
 * A field sales rep: a person with a map pin clipped to the corner.
 *
 * lucide has no single icon for this, so the card composes it from two. It is
 * allowlisted under the name 'FieldRep' like any other icon, because from an
 * editor's side that is all it is.
 */
function FieldRep({ className, strokeWidth = 1.7 }) {
  return (
    <span className="relative inline-flex">
      <UserRound className={className} strokeWidth={strokeWidth} />
      <MapPin className="absolute -bottom-1 -right-2 h-4 w-4" strokeWidth={strokeWidth} />
    </span>
  );
}

const ICONS = {
  FieldRep,
  Award,
  BadgeCheck,
  Boxes,
  Building2,
  Check,
  CircleCheck,
  Factory,
  FileCheck,
  FileText,
  GitBranch,
  Globe,
  Layers,
  Link2,
  MapPin,
  Network,
  Package,
  Route,
  Settings,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Store,
  Target,
  TrendingUp,
  Truck,
  UserRound,
  Users,
  Warehouse,
  Workflow,
};

/**
 * Resolves a stored icon name to its component.
 *
 * @param {string} name
 * @returns {import('react').ComponentType<{className?: string, strokeWidth?: number}>}
 */
export function sfaIcon(name) {
  return ICONS[name] ?? HelpCircle;
}

/**
 * The card's accent at a given alpha, for the icon tint and the badge border.
 *
 * Derived rather than stored: one colour is authored, and the two washes of it
 * are computed here, so they cannot drift apart. A malformed value falls back
 * to transparent, which loses the tint but leaves the card readable.
 *
 * @param {string} hex a six-digit #RRGGBB, as the server validates
 * @param {number} alpha
 */
export function accentTint(hex, alpha) {
  if (typeof hex !== 'string' || !/^#[0-9a-fA-F]{6}$/.test(hex)) return 'transparent';
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
