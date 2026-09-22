import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Factory,
  Package,
  Truck,
  Store,
  TrendingUp,
  ShieldCheck,
  Trash2,
  BarChart3,
} from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

/*
  FMS "Recognition" — a category map that lets a bakery central-kitchen
  franchisor, a heritage sweets brand, a cold-chain ice-cream network and a QSR
  chain each see their own operating model named within seconds. Tabs across the
  top; the selected sub-vertical expands into a "how it works for you" flow.
*/

const EASE = [0.22, 1, 0.3, 1];

const CATEGORIES = [
  {
    id: 'bakery',
    title: 'Bakery & Confectionery',
    tag: 'Central Kitchen',
    color: '#E85A2A',
    tint: 'rgba(232,90,42,0.12)',
    solid: '#fbe9e2',
    icon: '/images/bakery icon.webp',
    img: '/images/bakery img.webp',
    exploreLabel: 'Explore Bakery Model',
    desc: 'Manage recipes, production and outlet demand from one place — reducing waste and maximizing freshness.',
    steps: [
      { icon: Factory, title: 'Central Kitchen', desc: 'Plan production based on recipes and demand.' },
      { icon: Package, title: 'Batch Production', desc: 'Standardized batches with quality control.' },
      { icon: Truck, title: 'Dispatch', desc: 'Timely dispatch to maintain product quality.' },
      { icon: Store, title: 'Outlet', desc: 'Outlets receive fresh stock as per demand.' },
      { icon: TrendingUp, title: 'Sales', desc: 'Better availability drives higher sales and happiness.' },
    ],
    benefits: [
      { icon: ShieldCheck, title: 'Consistent Quality', desc: 'Same taste and quality across all outlets.' },
      { icon: Trash2, title: 'Lower Wastage', desc: 'Batch-wise tracking helps reduce losses.' },
      { icon: BarChart3, title: 'Higher Performance', desc: 'Better control leads to more profitable operations.' },
    ],
  },
  {
    id: 'sweets',
    title: 'Sweets & Namkeen',
    tag: 'Multi-State',
    color: '#E85A2A',
    tint: 'rgba(232,90,42,0.12)',
    solid: '#fbe9e2',
    icon: '/images/sweet namkin icon.webp',
    img: '/images/sweet and namkin img.webp',
    exploreLabel: 'Explore Sweets Model',
    desc: 'Keep royalty structures and product consistency intact as you expand from legacy stores to new franchise partners across states.',
    steps: [
      { icon: Factory, title: 'Central Production', desc: 'One recipe-controlled source for every partner.' },
      { icon: Package, title: 'Festive Planning', desc: 'Demand-aware batches for peak-season spikes.' },
      { icon: Truck, title: 'Multi-State Dispatch', desc: 'Supply legacy and new stores on one plan.' },
      { icon: Store, title: 'Franchise Outlet', desc: 'Consistent range at every franchise counter.' },
      { icon: TrendingUp, title: 'Royalty & Sales', desc: 'Accurate royalty capture on every sale.' },
    ],
    benefits: [
      { icon: ShieldCheck, title: 'Brand Consistency', desc: 'Same range and quality in every state.' },
      { icon: Package, title: 'Festive-Ready Supply', desc: 'Plan ahead for demand surges with confidence.' },
      { icon: BarChart3, title: 'Royalty Accuracy', desc: 'Transparent settlement across all partners.' },
    ],
  },
  {
    id: 'icecream',
    title: 'Ice Cream & Desserts',
    tag: 'Cold-Chain',
    color: '#E85A2A',
    tint: 'rgba(232,90,42,0.12)',
    solid: '#fbe9e2',
    icon: '/images/icon icecream.webp',
    img: '/images/ice cream img.webp',
    exploreLabel: 'Explore Ice Cream Model',
    desc: 'Cold-chain-linked replenishment from central production to parlour, with spoilage-risk visibility at every hop.',
    steps: [
      { icon: Factory, title: 'Central Production', desc: 'Produce and freeze to strict quality specs.' },
      { icon: Package, title: 'Cold Storage', desc: 'Temperature-controlled stock, always monitored.' },
      { icon: Truck, title: 'Cold-Chain Dispatch', desc: 'Replenish parlours without breaking the chain.' },
      { icon: Store, title: 'Parlour', desc: 'Right SKUs, fresh, exactly when needed.' },
      { icon: TrendingUp, title: 'Profitability', desc: 'Parlour-level margins tracked in real time.' },
    ],
    benefits: [
      { icon: ShieldCheck, title: 'Spoilage Control', desc: 'Spoilage-risk flagged before it costs you.' },
      { icon: Truck, title: 'Cold-Chain Visibility', desc: 'See every hop from plant to parlour.' },
      { icon: BarChart3, title: 'Parlour Profitability', desc: 'Know which outlets truly make money.' },
    ],
  },
  {
    id: 'qsr',
    title: 'QSR & Franchise F&B',
    tag: 'High-Turnover',
    color: '#E85A2A',
    tint: 'rgba(232,90,42,0.12)',
    solid: '#fbe9e2',
    icon: '/images/QSR icon.webp',
    img: '/images/QSR img.webp',
    exploreLabel: 'Explore QSR Model',
    desc: 'Enforce SOPs across every outlet with KOT and POS integration and real-time central production visibility.',
    steps: [
      { icon: Factory, title: 'Central Kitchen', desc: 'Prep and portion to a single standard.' },
      { icon: Package, title: 'SOP & Prep', desc: 'Enforced recipes and portions per outlet.' },
      { icon: Truck, title: 'Dispatch', desc: 'Fast replenishment for high-turnover demand.' },
      { icon: Store, title: 'Outlet KOT / POS', desc: 'Kitchen and billing connected end to end.' },
      { icon: TrendingUp, title: 'Sales', desc: 'Faster service, higher throughput per outlet.' },
    ],
    benefits: [
      { icon: ShieldCheck, title: 'SOP Enforcement', desc: 'Same experience across every franchise outlet.' },
      { icon: Package, title: 'KOT + POS Sync', desc: 'No gaps between kitchen and counter.' },
      { icon: BarChart3, title: 'Central Visibility', desc: 'Live view of production across the network.' },
    ],
  },
];

function StepArrow() {
  return (
    <div className="hidden shrink-0 items-center px-1 pt-6 md:flex">
      <span className="border-t border-dashed border-orange-300 w-4" />
      <ArrowRight className="h-3.5 w-3.5 text-orange-400" strokeWidth={2.4} />
    </div>
  );
}

const AUTOPLAY_MS = 3500;

export default function FranchiseCategories() {
  const [activeId, setActiveId] = useState(CATEGORIES[0].id);
  const paused = useRef(false);
  const active = CATEGORIES.find((c) => c.id === activeId) || CATEGORIES[0];

  // Auto-advance through the categories; pauses on hover. Respects reduced-motion.
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return undefined;
    const id = setInterval(() => {
      if (paused.current) return;
      setActiveId((cur) => {
        const i = CATEGORIES.findIndex((c) => c.id === cur);
        return CATEGORIES[(i + 1) % CATEGORIES.length].id;
      });
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-[#f5f6fa] py-16 md:py-24"
      onMouseEnter={() => {
        paused.current = true;
      }}
      onMouseLeave={() => {
        paused.current = false;
      }}
    >
      <Container>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <Eyebrow className="justify-center">Recognition</Eyebrow>
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            Special Extensions for{' '}
            <span className="gradient-text-orange">Bakery, Sweets, Ice Cream and QSR Franchises…</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            Domain-specific models built for how your franchise really works. Choose a category to
            see how UpWon adapts to your operations.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {CATEGORIES.map((c) => {
            const isActive = c.id === activeId;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveId(c.id)}
                className={`group relative flex flex-col items-center rounded-2xl px-4 py-6 text-center transition-colors ${
                  isActive ? 'bg-white shadow-sm' : 'hover:bg-white/60'
                }`}
              >
                <span
                  className="grid h-16 w-16 place-items-center rounded-2xl transition-colors"
                  style={{ background: isActive ? c.color : c.tint }}
                >
                  <img
                    src={c.icon}
                    alt=""
                    aria-hidden="true"
                    className={`h-8 w-8 object-contain transition ${isActive ? 'brightness-0 invert' : ''}`}
                  />
                </span>
                <span
                  className="mt-3 text-[15px] font-bold leading-tight"
                  style={{ color: isActive ? c.color : '#1a2340' }}
                >
                  {c.title}
                </span>
                <span className="mt-1 text-[14px] text-navy-500">{c.tag}</span>
                {isActive && (
                  <motion.span
                    layoutId="franchiseTabUnderline"
                    className="absolute -bottom-px h-[3px] w-10 rounded-full"
                    style={{ background: c.color }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mt-8 grid gap-4 rounded-[2rem] bg-white p-4 shadow-sm md:p-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]"
          >
            {/* Left — selected category */}
            <div
              className="relative flex min-h-[360px] overflow-hidden rounded-3xl bg-cover bg-center"
              style={{ backgroundImage: `url('${active.img}')` }}
            >
              {/* Tint wash — solid over the text, fading to reveal the full photo on the right */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `linear-gradient(to right, ${active.solid} 0%, ${active.solid} 34%, ${active.solid}cc 50%, transparent 82%)`,
                }}
              />
              <div className="relative z-10 flex flex-col p-7 md:p-8 lg:max-w-[56%]">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-navy-500">
                  Selected Category
                </p>
                <h3 className="mt-2 h-display text-2xl leading-tight tracking-tight text-navy-950 md:text-[1.75rem]">
                  {active.title}
                </h3>
                <p className="mt-1 text-sm font-bold" style={{ color: active.color }}>
                  {active.tag}
                </p>
                <p className="mt-4 text-[14px] leading-relaxed text-navy-700">{active.desc}</p>
                <Link
                  to="/demo"
                  className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-bold transition-colors"
                  style={{ color: active.color }}
                >
                  {active.exploreLabel}
                  <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
                </Link>
              </div>
            </div>

            {/* Right — how it works */}
            <div className="flex flex-col rounded-3xl p-5 md:p-6">
              <p className="text-[15px] font-bold text-navy-950">How it works for you</p>

              {/* Steps flow */}
              <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-0">
                {active.steps.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.title} className="contents md:flex md:flex-1 md:items-start">
                      <div className="flex flex-1 flex-col items-start md:items-center md:text-center">
                        <span
                          className="grid h-12 w-12 place-items-center rounded-2xl"
                          style={{ background: active.tint, color: active.color }}
                        >
                          <Icon className="h-5 w-5" strokeWidth={1.9} />
                        </span>
                        <span className="mt-2 text-[14px] font-bold text-navy-400">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="mt-1 text-[14px] font-bold text-navy-950">{s.title}</span>
                        <span className="mt-1 text-[14px] leading-snug text-navy-500 md:max-w-[8rem]">
                          {s.desc}
                        </span>
                      </div>
                      {i < active.steps.length - 1 && <StepArrow />}
                    </div>
                  );
                })}
              </div>

              {/* Benefits */}
              <div className="mt-6 grid gap-3 rounded-2xl p-4 sm:grid-cols-3" style={{ background: active.tint }}>
                {active.benefits.map((b) => {
                  const Icon = b.icon;
                  return (
                    <div key={b.title} className="flex items-start gap-2.5">
                      <span
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white"
                        style={{ color: active.color }}
                      >
                        <Icon className="h-4 w-4" strokeWidth={2} />
                      </span>
                      <div>
                        <p className="text-[14px] font-bold text-navy-950">{b.title}</p>
                        <p className="mt-0.5 text-[14px] leading-snug text-navy-600">{b.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
