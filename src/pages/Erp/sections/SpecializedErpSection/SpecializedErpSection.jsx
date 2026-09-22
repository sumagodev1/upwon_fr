import { useEffect, useRef, useState } from 'react';
import {
  m as motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  Cake,
  IceCream,
  CupSoda,
  Popcorn,
  Soup,
  Pill,
  Truck,
  CalendarClock,
  Timer,
  Settings,
  Store,
  FlaskConical,
  ShieldCheck,
  Snowflake,
  Boxes,
  Factory,
  Droplets,
  Package,
  Route,
  Users,
  ClipboardCheck,
  Target,
  TrendingUp,
  Rocket,
  ArrowRight,
} from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

// "Why use generic ERPs when a specialized system is available?" — a two-pane
// industry switcher. Left: pick an industry. Right: that industry's ERP detail
// over its own background photo, with a shared dashboard mockup as the showcase.

const EASE = [0.16, 1, 0.3, 1];

const INDUSTRIES = [
  {
    id: 'bakery',
    name: 'Bakery & Confectionery',
    tag: 'Shelf-life planning, recipe management & production costing.',
    icon: Cake,
    bg: '/images/bakery.webp',
    erpTitle: 'Bakery & Confectionery ERP',
    erpDesc: 'End-to-end control across recipes, batches, shelf-life and outlet billing.',
    cta: 'Explore Bakery ERP',
    features: [
      { icon: FlaskConical, title: 'Recipe & BOM Costing', desc: 'Ingredient-level recipe, batch and yield costing with real-time margins on every product.' },
      { icon: Timer, title: 'Shelf-life & Freshness', desc: 'Expiry dates, FEFO rotation and freshness control across every counter and outlet.' },
      { icon: Settings, title: 'Production Planning', desc: 'Demand-driven batch production planning with wastage, rework and yield tracking.' },
      { icon: Store, title: 'Counter POS', desc: 'Outlet billing, offers, loyalty and daily sales on one fast, offline-ready counter POS.' },
      { icon: Truck, title: 'Multi-Outlet Distribution', desc: 'Central bakery to outlet dispatch, indenting and live stock visibility, every day.' },
      { icon: TrendingUp, title: 'Costing & Reports', desc: 'Product costing, GST billing and daily MIS reports for every branch on one dashboard.' },
    ],
  },
  {
    id: 'dairy',
    name: 'Dairy & Ice Cream',
    tag: 'FEFO management, expiry tracking & milk procurement.',
    icon: IceCream,
    bg: '/images/dairy.webp',
    erpTitle: 'Dairy & Ice Cream ERP',
    erpDesc: 'End-to-end visibility across procurement, production, quality, inventory and distribution.',
    cta: 'Explore Dairy ERP',
    features: [
      { icon: CalendarClock, title: 'FEFO & Expiry Management', desc: 'Automated FEFO, shelf-life tracking and expiry alerts.' },
      { icon: Truck, title: 'Milk Procurement', desc: 'Milk collection, testing, fat/SNF management & supplier tracking.' },
      { icon: Settings, title: 'Production Management', desc: 'Batch-wise production, formula management & yield tracking.' },
      { icon: ShieldCheck, title: 'Quality Control', desc: 'QC checks, lab integration and compliance management.' },
      { icon: Snowflake, title: 'Cold Chain & Distribution', desc: 'Temperature tracking, cold storage & route optimization.' },
      { icon: TrendingUp, title: 'Reports & Analytics', desc: 'Procurement, yield and sales dashboards.' },
    ],
  },
  {
    id: 'beverages',
    name: 'Beverages',
    tag: 'Batch production, formula management & dispatch tracking.',
    icon: CupSoda,
    bg: '/images/beverage.webp',
    erpTitle: 'Beverages ERP',
    erpDesc: 'Formula-driven batch production with full dispatch and distribution visibility.',
    cta: 'Explore Beverages ERP',
    features: [
      { icon: FlaskConical, title: 'Formula Management', desc: 'Version-controlled formulas and batch recipes with precise ingredient ratios.' },
      { icon: Factory, title: 'Batch Production', desc: 'Line-wise production, filling and yield tracking across every shift and SKU.' },
      { icon: ShieldCheck, title: 'Quality Control', desc: 'In-line QC checks, lab integration and full FSSAI compliance management.' },
      { icon: Package, title: 'Dispatch Tracking', desc: 'Warehouse-to-route dispatch visibility with real-time delivery status.' },
      { icon: Boxes, title: 'Inventory & Expiry', desc: 'Batch-wise stock with shelf-life control and automated expiry alerts.' },
      { icon: TrendingUp, title: 'Costing & Margins', desc: 'SKU-level costing and margin analytics across every pack size and channel.' },
    ],
  },
  {
    id: 'namkeen',
    name: 'Snacks & Namkeen',
    tag: 'Recipe control, oil management & wastage tracking.',
    icon: Popcorn,
    bg: '/images/namkeens.webp',
    erpTitle: 'Snacks & Namkeen ERP',
    erpDesc: 'Recipe-accurate production with tight oil, yield and wastage control.',
    cta: 'Explore Namkeen ERP',
    features: [
      { icon: FlaskConical, title: 'Recipe Control', desc: 'Standardised recipes and batch consistency across every kitchen and shift.' },
      { icon: Droplets, title: 'Oil & Consumption', desc: 'Frying oil usage, top-up and consumption norms tracked against every batch.' },
      { icon: Timer, title: 'Wastage Tracking', desc: 'Real-time wastage and yield variance alerts to protect your margins.' },
      { icon: Package, title: 'Packing & Dispatch', desc: 'Pack-size costing, weighment and dispatch control for every SKU.' },
      { icon: ShieldCheck, title: 'Quality & Compliance', desc: 'FSSAI compliance, batch QC checks and full lot traceability.' },
      { icon: TrendingUp, title: 'Costing & Reports', desc: 'SKU-level costing and daily MIS reports across every plant and channel.' },
    ],
  },
  {
    id: 'spices',
    name: 'Spices & Condiments',
    tag: 'Lot traceability, quality compliance & lab testing.',
    icon: Soup,
    bg: '/images/spices.webp',
    erpTitle: 'Spices & Condiments ERP',
    erpDesc: 'Farm-to-pack lot traceability with lab-grade quality compliance.',
    cta: 'Explore Spices ERP',
    features: [
      { icon: ClipboardCheck, title: 'Lot Traceability', desc: 'Full forward and backward lot tracing from raw material to finished pack.' },
      { icon: FlaskConical, title: 'Lab Testing', desc: 'Moisture, purity and contaminant testing with lab-grade QC records.' },
      { icon: ShieldCheck, title: 'Quality Compliance', desc: 'FSSAI, spice-board and export compliance managed end to end.' },
      { icon: Factory, title: 'Grinding & Blending', desc: 'Blend recipes and batch grinding control with precise ratio management.' },
      { icon: Package, title: 'Packing & Dispatch', desc: 'Pack-size costing, weighment and dispatch control for every SKU.' },
      { icon: TrendingUp, title: 'Costing & Reports', desc: 'Blend costing, quality reports and MIS dashboards on one platform.' },
    ],
  },
  {
    id: 'nutra',
    name: 'Nutraceuticals',
    tag: 'Regulatory compliance, batch validation & formula tracking.',
    icon: Pill,
    bg: '/images/Nutraceutical.webp',
    erpTitle: 'Nutraceuticals ERP',
    erpDesc: 'Validated, compliant manufacturing with full formula and batch genealogy.',
    cta: 'Explore Nutra ERP',
    features: [
      { icon: ShieldCheck, title: 'Regulatory Compliance', desc: 'GMP, FSSAI and audit-ready documentation maintained automatically.' },
      { icon: ClipboardCheck, title: 'Batch Validation', desc: 'Batch records, genealogy and release control for every production lot.' },
      { icon: FlaskConical, title: 'Formula Tracking', desc: 'Actives, potency and formulation versioning with full change history.' },
      { icon: Boxes, title: 'Inventory & Expiry', desc: 'Lot-wise stock with strict expiry enforcement and near-expiry alerts.' },
      { icon: Factory, title: 'Production Control', desc: 'Line-wise manufacturing, in-process checks and yield tracking.' },
      { icon: TrendingUp, title: 'Reports & Analytics', desc: 'Batch, QC and inventory dashboards for complete plant visibility.' },
    ],
  },
  {
    id: 'fmcg',
    name: 'FMCG Distribution',
    tag: 'Secondary sales, distributor management & order automation.',
    icon: Truck,
    bg: '/images/fmcg_ind.webp',
    erpTitle: 'FMCG Distribution ERP',
    erpDesc: 'Primary-to-secondary visibility with automated ordering and claims.',
    cta: 'Explore FMCG ERP',
    features: [
      { icon: TrendingUp, title: 'Secondary Sales', desc: 'Outlet-level secondary sales visibility across every beat and territory.' },
      { icon: Users, title: 'Distributor Management', desc: 'Distributor stock, claims and settlement tracked in real time.' },
      { icon: Route, title: 'Order Automation', desc: 'Beat-wise ordering and auto-replenishment straight from the field.' },
      { icon: Package, title: 'Stock & Dispatch', desc: 'Multi-warehouse stock, picking and dispatch control on one system.' },
      { icon: Target, title: 'Schemes & Claims', desc: 'Scheme automation and fast, accurate claim settlement for every partner.' },
      { icon: TrendingUp, title: 'Reports & Analytics', desc: 'Sales, stock and distributor dashboards with same-day visibility.' },
    ],
  },
];

const BENEFITS = [
  { icon: Target, title: 'Industry Best Practices Built-in' },
  { icon: TrendingUp, title: 'Higher Efficiency & Lower Waste' },
  { icon: ShieldCheck, title: 'Compliance Assured' },
  { icon: Rocket, title: 'Scalable as You Grow' },
];

function IndustryButton({ industry, active, onClick }) {
  const Icon = industry.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-300 ${
        active
          ? 'border-orange-300 bg-orange-50/70 shadow-sm'
          : 'border-cream-300 bg-white hover:border-orange-200 hover:bg-cream-100'
      }`}
    >
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border ${
          active ? 'border-orange-200 bg-white text-orange-500' : 'border-cream-300 bg-cream-100 text-navy-700'
        }`}
      >
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-bold leading-tight text-navy-950">{industry.name}</p>
        <p className="mt-0.5 truncate text-[14px] text-navy-600">{industry.tag}</p>
      </div>
      <ArrowRight
        className={`h-4 w-4 shrink-0 transition-transform ${
          active ? 'text-orange-500' : 'text-navy-400 group-hover:translate-x-0.5'
        }`}
      />
    </button>
  );
}

function DetailPane({ industry }) {
  const Icon = industry.icon;

  // Scroll-linked reveal — the dashboard sits in a short fixed window and its
  // background pans from top to bottom as the user scrolls the page, so it
  // reads as the dashboard scrolling inside the frame.
  const paneRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: paneRef,
    offset: ['start end', 'end start'],
  });
  const dashPos = useTransform(scrollYProgress, [0, 1], ['50% 0%', '50% 100%']);

  return (
    <div
      ref={paneRef}
      className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-cream-300 bg-white shadow-sm"
    >
      {/* Desktop — full industry photo (no crop), anchored top-right and bleeding
          to the edges. Every image is 3:2, so showing it whole keeps all seven
          industries framed consistently. White fades blend the left/bottom. */}
      <div className="pointer-events-none absolute right-0 top-0 hidden w-[56%] md:block">
        <img
          src={industry.bg}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="block w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/5 to-white" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Mobile — full image banner on top. */}
      <img
        src={industry.bg}
        alt={industry.name}
        loading="lazy"
        decoding="async"
        className="block w-full md:hidden"
      />

      <div className="relative flex flex-1 flex-col p-4 sm:p-5 md:p-6 lg:p-8">
        {/* Header — icon + title + desc. Kept to the left so it sits clear of
            the top-right photo on desktop. */}
        <div className="flex items-start gap-3 md:max-w-[46%]">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-cream-300 bg-white text-orange-500 shadow-sm">
            <Icon className="h-6 w-6" strokeWidth={1.6} />
          </span>
          <div>
            <h3 className="h-display text-lg font-bold leading-tight text-navy-950 lg:text-xl">
              {industry.erpTitle}
            </h3>
            <p className="mt-1 text-[14px] leading-relaxed text-navy-600">
              {industry.erpDesc}
            </p>
          </div>
        </div>

        {/* Body — feature list (left) + dashboard showcase (right, overlapping
            the photo on desktop). */}
        <div className="mt-4 grid gap-4 lg:grid-cols-2 lg:gap-8">
          <div className="min-w-0">
            <div className="h-px w-16 bg-orange-400" />
            <div className="mt-4 space-y-2.5">
              {industry.features.map((f) => {
                const FIcon = f.icon;
                return (
                  <div key={f.title} className="flex items-start gap-2.5">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-cream-300 bg-white text-orange-500 shadow-sm">
                      <FIcon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[14px] font-bold text-navy-950">{f.title}</p>
                      <p className="mt-0.5 text-[14px] leading-snug text-navy-600">{f.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dashboard — sits in a fixed window; its background pans top → bottom
              as the user scrolls, so it reads as the dashboard scrolling. */}
          <div className="md:mt-16 lg:mt-24">
            <motion.div
              role="img"
              aria-label="UPWON ERP dashboard"
              style={{
                backgroundImage: "url('/images/dashboard.webp')",
                backgroundSize: '112% auto',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: dashPos,
              }}
              className="h-[150px] overflow-hidden rounded-2xl border border-cream-300 bg-white shadow-xl md:h-[170px] lg:h-[200px]"
            />
          </div>
        </div>

        {/* Benefits strip — pinned to the bottom of the card so it fills the
            full height alongside the taller selector column. */}
        <div className="mt-auto grid grid-cols-2 gap-3 border-t border-cream-300 pt-5 lg:grid-cols-4">
          {BENEFITS.map((b) => {
            const BIcon = b.icon;
            return (
              <div key={b.title} className="flex min-w-0 items-center gap-2.5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-orange-200 bg-white text-orange-500 shadow-sm">
                  <BIcon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <p className="min-w-0 text-[14px] font-bold leading-snug text-navy-950">{b.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function SpecializedErpSection() {
  const [active, setActive] = useState(0); // Bakery & Confectionery shown by default
  const hovering = useRef(false); // pause the auto-cycle while the pointer is over the list

  // Auto-advance one by one; pauses on hover, resumes when the pointer leaves.
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    const id = setInterval(() => {
      if (!hovering.current) setActive((a) => (a + 1) % INDUSTRIES.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const select = (i) => setActive(i);

  return (
    <section className="relative overflow-hidden bg-white py-8 md:py-10 lg:py-8">
      <div className="pointer-events-none absolute inset-0 grid-bg-light opacity-40" />

      <Container className="relative">
        <div className="grid gap-6 md:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] md:gap-6 lg:gap-10">
          {/* LEFT — heading + industry selector */}
          <div className="min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <Eyebrow>Industry Recognition</Eyebrow>
 <h2 className="mt-2 h-display text-[36.8px] leading-[1.12] tracking-tight text-navy-950 sm:leading-[1.1]">
                Why Use Generic ERPs when{' '}
                <span className="gradient-text-orange">Specialized System</span> is Available?
              </h2>
              <p className="mt-3 max-w-md text-[14px] leading-relaxed text-navy-600 md:text-sm lg:text-base">
                Explore the domain-specialized ERP versions — not retrofitted for them.
              </p>
            </motion.div>

            <div
              className="mt-5 space-y-2.5"
              onMouseEnter={() => {
                hovering.current = true;
              }}
              onMouseLeave={() => {
                hovering.current = false;
              }}
            >
              {INDUSTRIES.map((ind, i) => (
                <IndustryButton
                  key={ind.id}
                  industry={ind}
                  active={i === active}
                  onClick={() => select(i)}
                />
              ))}
            </div>
          </div>

          {/* RIGHT — active industry detail pane */}
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={INDUSTRIES[active].id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="h-full"
              >
                <DetailPane industry={INDUSTRIES[active]} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
