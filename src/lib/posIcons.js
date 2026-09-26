import {
  Award,
  BadgeCheck,
  Banknote,
  BarChart3,
  Calculator,
  Candy,
  ChefHat,
  Clock,
  Coins,
  CreditCard,
  Croissant,
  CupSoda,
  Eye,
  FileCheck,
  Gift,
  HelpCircle,
  IceCreamCone,
  IndianRupee,
  Layers,
  Lock,
  MapPin,
  Monitor,
  Package,
  Percent,
  Printer,
  QrCode,
  Receipt,
  RefreshCcw,
  Sandwich,
  Scan,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Store,
  Tag,
  Target,
  Timer,
  TrendingUp,
  UserRound,
  Users,
  Utensils,
  UtensilsCrossed,
  Wallet,
  Zap,
} from 'lucide-react';

/**
 * The icons the POS CMS can name.
 *
 * A record cannot hold a React component, so the API stores a name and this is
 * where it becomes one again. The keys are the server's allowlist
 * (modules/product-pages/pos-page/utils/icons.ts) - the server rejects anything
 * outside it, so a stored name always resolves here.
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
  Calculator,
  Candy,
  ChefHat,
  Clock,
  Coins,
  CreditCard,
  Croissant,
  CupSoda,
  Eye,
  FileCheck,
  Gift,
  IceCreamCone,
  IndianRupee,
  Layers,
  Lock,
  MapPin,
  Monitor,
  Package,
  Percent,
  Printer,
  QrCode,
  Receipt,
  RefreshCcw,
  Sandwich,
  Scan,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Store,
  Tag,
  Target,
  Timer,
  TrendingUp,
  UserRound,
  Users,
  Utensils,
  UtensilsCrossed,
  Wallet,
  Zap,
};

/** The component for a stored icon name, or a question mark for an unknown one. */
export function posIcon(name) {
  return ICONS[name] ?? HelpCircle;
}
