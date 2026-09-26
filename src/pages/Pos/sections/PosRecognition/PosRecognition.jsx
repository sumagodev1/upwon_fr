import { m as motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import { posIcon } from '../../../../lib/posIcons.js';

/*
  POS "Recognition" — a category map that signals fit across every counter type
  this page targets (broader than the FMS franchise-only audience). Navy
  "premium features" layout: a sticky left heading beside a grid of dark cards.

  CMS-driven when a `section` is passed, and falls back to the constants
  otherwise — the same arrangement the page's other sections use, so the SSG
  build and an unreachable API both render the map the site ships.
*/

const EASE = [0.22, 1, 0.3, 1];
const ORANGE = '#E85A2A';

/*
  The built-in copy, written in the shape the API sends so that a CMS section
  and the shipped one take one identical path through the render below - icons
  included, which are names here as they are in the payload and resolved
  through posIcon() at render time.
*/
const EYEBROW = 'Recognition';
const HEADING_LINES = [
  [
    { text: 'Built for Bakery Counters, Sweets Shops, Dine-In, QSR and ', accent: false },
    { text: 'Every Food Retail Business in Between.', accent: true },
  ],
];
const SUBTEXT =
  'A quick category map so a range of counter-level buyers — not just franchisors — see themselves immediately.';

const CATEGORIES = [
  { icon: 'Croissant', title: 'Bakery & Confectionery', description: 'Manage fresh batches, combos and counter sales seamlessly.' },
  { icon: 'Candy', title: 'Sweets & Namkeen', description: 'Track weight-based items, pricing tiers and festive sales.' },
  { icon: 'Sandwich', title: 'QSR & Cafés', description: 'KOT speed and delivery-aggregator orders on one screen.' },
  { icon: 'IceCreamCone', title: 'Ice Cream & Dessert Parlours', description: 'Handle flavours, toppings, combos and seasonal offers.' },
  { icon: 'ShoppingBag', title: 'General Food Retail', description: 'Streamline billing, stock and loyalty at the counter.' },
  { icon: 'UtensilsCrossed', title: 'Dine-In Restaurants', description: 'Table billing, split bills and smooth dine-in operations.' },
  { icon: 'ChefHat', title: 'Cloud Kitchens & Takeaway', description: 'Manage online orders, packaging and quick counter pickups.' },
  { icon: 'CupSoda', title: 'Beverage & Juice Bars', description: 'Add-ons, variations and fast billing at busy hours.' },
  { icon: 'Store', title: 'Food Kiosks & Food Courts', description: 'Compact setups with powerful billing and stock control.' },
  { icon: 'Sparkles', title: 'Other Businesses', description: 'A flexible solution for any counter that needs speed and control.' },
];

export default function PosRecognition({ section = null }) {
  const eyebrow = section ? section.eyebrow : EYEBROW;
  const headingLines = section ? section.headingLines : HEADING_LINES;
  const subtext = section ? section.subtext : SUBTEXT;
  const categories = section ? section.categories : CATEGORIES;

  return (
    <section
      className="relative bg-navy-950 pb-28 pt-28 md:pb-36 md:pt-36"
      style={{ clipPath: 'polygon(0 0, 100% 5rem, 100% 100%, 0 calc(100% - 5rem))' }}
    >
      {/* Depth: navy gradient + faint grid */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#13234a] via-navy-950 to-[#0a1122]" />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.12]" />

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_2fr] lg:gap-14">
          {/* Left — heading */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            {eyebrow && <Eyebrow className="justify-start">{eyebrow}</Eyebrow>}
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.06] tracking-tight text-white">
              <HeadingLines lines={headingLines} />
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-slate-300">
              {subtext}
            </p>
          </motion.div>

          {/* Right — category cards */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((c, i) => {
              const Icon = posIcon(c.icon);
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: (i % 3) * 0.06, ease: EASE }}
                  className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.07]"
                >
                  <Icon className="h-7 w-7" style={{ color: ORANGE }} strokeWidth={1.7} />
                  <h3 className="mt-5 text-[16px] font-bold leading-tight text-white">{c.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-slate-400">{c.description}</p>
                  <ChevronRight
                    className="mt-auto pt-5 opacity-70 transition-opacity group-hover:opacity-100"
                    style={{ color: ORANGE }}
                    size={28}
                    strokeWidth={2}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
