import {
  Baby,
  Brush,
  ClipboardList,
  Droplet,
  Globe,
  HeartPulse,
  Home,
  Layers,
  MapPin,
  Monitor,
  PackageSearch,
  Scissors,
  ShoppingBasket,
  SprayCan,
  Warehouse,
  WashingMachine,
} from 'lucide-react';
import { erpIcon } from './erpIcons.js';

/**
 * The icons the Non-Food FMCG benefits and industry-coverage grids can name.
 *
 * The server's allowlist for this page (modules/industry-pages/non-food-fmcg-page/
 * utils/icons.ts) is the ERP list plus these, so this is the ERP lookup plus
 * them. Keep the lists in step: a name the server accepts must resolve here, or
 * the item draws the fallback question mark.
 */
const EXTRA = {
  Baby,
  Brush,
  ClipboardList,
  Droplet,
  Globe,
  HeartPulse,
  Home,
  Layers,
  MapPin,
  Monitor,
  PackageSearch,
  Scissors,
  ShoppingBasket,
  SprayCan,
  Warehouse,
  WashingMachine,
};

export function nonFoodFmcgIcon(name) {
  return EXTRA[name] ?? erpIcon(name);
}
