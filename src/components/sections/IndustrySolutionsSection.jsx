import { useEffect, useRef, useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import {
  Croissant,
  Milk,
  ShoppingBasket,
  CupSoda,
  IceCreamCone,
  UtensilsCrossed,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';

// "Built for the way your business actually runs." — a two-pane industry
// selector: pick an industry on the left, see its out-of-box workflow on the
// right. Auto-cycles through the industries; hover / interaction pauses it.
// Light theme, matches the site's navy/orange system.

const EASE = [0.16, 1, 0.3, 1];
const AUTOPLAY_MS = 3500;

const INDUSTRIES = [
  {
    id: 'bakeries',
    name: 'Bakeries',
    tag: 'Batch · freshness · POS',
    icon: Croissant,
    href: '/industries/bakery',
    desc: 'From batch production to the fresh counter — costing, shelf-life and POS on one system.',
    steps: [
      { title: 'Batch production', desc: 'Recipe, batch and yield costing.' },
      { title: 'Freshness & shelf-life', desc: 'Expiry and stock rotation control.' },
      { title: 'Counter POS', desc: 'Billing, offers and daily sales.' },
    ],
  },
  {
    id: 'dairies',
    name: 'Dairies',
    tag: 'Procurement · routes · cold chain',
    icon: Milk,
    href: '/industries/dairy',
    desc: 'From farm procurement to doorstep route — fat-SNF to settlement on one platform.',
    steps: [
      { title: 'Procurement', desc: 'Fat-SNF based milk procurement and payouts.' },
      { title: 'Route distribution', desc: 'Crate and route settlement, every day.' },
      { title: 'Cold-chain stock', desc: 'Temperature-sensitive stock with expiry.' },
    ],
  },
  {
    id: 'fmcg',
    name: 'FMCG Distribution',
    tag: 'Primary · secondary · GT/MT',
    icon: ShoppingBasket,
    href: '/industries/fmcg-distribution',
    desc: 'Primary to secondary, with full GT and MT coverage and same-day visibility.',
    steps: [
      { title: 'Primary sales', desc: 'Depot to distributor orders and dispatch.' },
      { title: 'Secondary sales', desc: 'Salesman beat, orders and schemes.' },
      { title: 'GT / MT coverage', desc: 'Outlet coverage with claims and returns.' },
    ],
  },
  {
    id: 'beverage',
    name: 'Beverage Brands',
    tag: 'SKU · returnables · depot',
    icon: CupSoda,
    href: '/industries/beverages',
    desc: 'SKU-heavy portfolios with returnable crates and depot stock, fully tracked.',
    steps: [
      { title: 'SKU & pricing', desc: 'Multi-SKU catalogue and price lists.' },
      { title: 'Returnables', desc: 'Crate and bottle deposit tracking.' },
      { title: 'Depot stock', desc: 'Depot-wise inventory and dispatch.' },
    ],
  },
  {
    id: 'sweets',
    name: 'Sweet Shops',
    tag: 'Counter · kitchen · festive',
    icon: IceCreamCone,
    href: '/industries/sweets',
    desc: 'Counter, central kitchen and festive rushes — margins protected end to end.',
    steps: [
      { title: 'Counter sales', desc: 'Fast billing with GST and offers.' },
      { title: 'Central kitchen', desc: 'Production and inter-outlet transfers.' },
      { title: 'Festive demand', desc: 'Seasonal planning and pre-orders.' },
    ],
  },
  {
    id: 'restaurants',
    name: 'Restaurant Chains',
    tag: 'Franchise · aggregators · costing',
    icon: UtensilsCrossed,
    href: '/industries/restaurants',
    desc: 'Franchise outlets, aggregators and recipe costing under one roof.',
    steps: [
      { title: 'Franchise ops', desc: 'Outlet SOPs, royalty and audits.' },
      { title: 'Aggregators', desc: 'Zomato / Swiggy orders reconciled.' },
      { title: 'Recipe costing', desc: 'Plate cost and menu margins.' },
    ],
  },
];

export default function IndustrySolutionsSection() {
  const [active, setActive] = useState(0);
  const paused = useRef(false);
  const cur = INDUSTRIES[active];
  const CurIcon = cur.icon;

  // Auto-advance through the industries; pauses on hover/focus. Respects the
  // user's reduced-motion preference.
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return undefined;
    const id = setInterval(() => {
      if (!paused.current) setActive((a) => (a + 1) % INDUSTRIES.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-10 md:py-14">
      <Container className="relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <Eyebrow>Industry Solutions</Eyebrow>
 <h2 className="mt-3 h-display text-[36.8px] text-balance leading-[1.1] tracking-tight text-navy-950">
            Built for the way your{' '}
            <span className="gradient-text-orange">business actually runs.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-base leading-relaxed text-navy-600">
            Not a generic ERP with a food module bolted on. Every workflow below ships out-of-box —
            shaped around how each food and FMCG business really operates.
          </p>
        </motion.div>

        {/* Selector */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-2 lg:gap-8"
          onMouseEnter={() => {
            paused.current = true;
          }}
          onMouseLeave={() => {
            paused.current = false;
          }}
        >
          {/* Left — industry list */}
          <div className="flex min-w-0 flex-col gap-3">
            {INDUSTRIES.map((item, i) => {
              const Icon = item.icon;
              const on = active === i;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                  className={`group flex items-center gap-4 rounded-2xl border p-4 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-900/40 ${
                    on
                      ? 'border-navy-900 bg-white shadow-[0_16px_40px_-24px_rgba(15,23,42,0.5)]'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      on ? 'bg-navy-900 text-white' : 'bg-slate-100 text-navy-900 group-hover:bg-slate-200'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-bold text-navy-950">{item.name}</span>
                    <span className="block truncate text-[14px] text-slate-500">{item.tag}</span>
                  </span>
                  <ChevronRight
                    className={`h-5 w-5 shrink-0 transition-all ${
                      on ? 'text-navy-900' : 'text-slate-300 group-hover:translate-x-0.5'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right — detail panel */}
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={cur.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.5)] md:p-9"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-navy-900">
                    <CurIcon className="h-7 w-7" />
                  </span>
                  <h3 className="text-2xl font-bold text-navy-950">{cur.name}</h3>
                </div>

                <p className="mt-5 text-[15px] leading-relaxed text-navy-600">{cur.desc}</p>

                <p className="mt-7 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  Ships out-of-box
                </p>

                <div className="mt-4">
                  {cur.steps.map((s, idx) => (
                    <div key={s.title} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-900 text-[14px] font-bold text-white">
                          {idx + 1}
                        </span>
                        {idx < cur.steps.length - 1 && <span className="my-1 w-px flex-1 bg-slate-200" />}
                      </div>
                      <div className={idx < cur.steps.length - 1 ? 'pb-5' : ''}>
                        <p className="text-[15px] font-bold text-navy-950">{s.title}</p>
                        <p className="mt-0.5 text-[14px] leading-relaxed text-navy-600">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href={cur.href}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 transition-all hover:gap-2.5"
                >
                  Explore solution <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
