import { Building2, Candy } from 'lucide-react';
import { erpIcon } from './erpIcons.js';

/**
 * The icons the Sweets & Namkeen trust figures can name.
 *
 * The server's allowlist for this page (modules/industry-pages/sweets-page/
 * utils/icons.ts) is the ERP list plus Candy and Building2, so this is the ERP
 * lookup plus those two. Keep the three lists in step: a name the server
 * accepts must resolve here, or the figure draws the fallback question mark.
 */
const EXTRA = { Building2, Candy };

export function sweetsIcon(name) {
  return EXTRA[name] ?? erpIcon(name);
}
