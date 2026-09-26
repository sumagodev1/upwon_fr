import { Box, ClipboardList, MapPin, Warehouse } from 'lucide-react';
import { erpIcon } from './erpIcons.js';

/**
 * The icons the Dairy & Ice Cream capability cards and benefits can name.
 *
 * The server's allowlist for this page (modules/industry-pages/dairy-page/
 * utils/icons.ts) is the ERP list plus these, so this is the ERP lookup plus
 * them. Keep the lists in step: a name the server accepts must resolve here, or
 * the item draws the fallback question mark.
 */
const EXTRA = {
  Box,
  ClipboardList,
  MapPin,
  Warehouse,
};

export function dairyIcon(name) {
  return EXTRA[name] ?? erpIcon(name);
}
