import { useEffect, useState } from 'react';
import { AnimatePresence, m as motion } from 'framer-motion';
import {
  Cloud,
  Printer,
  Users,
  Bike,
  Package,
  ShieldCheck,
  WifiOff,
  Zap,
  CreditCard,
  Send,
  Monitor,
  Utensils,
  UserCheck,
  Gift,
  MessageCircle,
  LayoutGrid,
  RefreshCw,
  CheckCircle2,
  Boxes,
  TrendingUp,
  Warehouse,
  Calculator,
  Building2,
  FileCheck,
  ArrowRight,
} from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

/*
  POS "Core Capabilities" — operational depth without a dry feature list,
  organised around what changes at the counter and behind it. Six outcome-framed
  capabilities: a left tab list drives a right panel (points + screenshot).
*/

const EASE = [0.22, 1, 0.3, 1];
const ORANGE = '#E85A2A';
const TINT = 'rgba(232,90,42,0.1)';
const DIR = '/images/pos_core_capabilities';

const CAPS = [
  {
    icon: Cloud,
    title: 'Cloud POS & Multi-Tender Billing',
    desc: 'Fast, reliable billing that works even offline.',
    pill: 'Offline Ready',
    img: `${DIR}/cloud%20pos%20img.webp`,
    points: [
      { icon: WifiOff, title: 'Works Online & Offline', desc: 'Billing continues even without internet.' },
      { icon: Zap, title: 'Fast & Reliable', desc: 'Lightning-fast billing at your counter.' },
      { icon: CreditCard, title: 'Multiple Payment Options', desc: 'Accept cash, UPI, card or split payments.' },
    ],
  },
  {
    icon: Printer,
    title: 'KOT & Kitchen Display',
    desc: 'Orders reach the kitchen instantly — no shouting across a counter.',
    pill: 'Kitchen Connected',
    img: `${DIR}/kot%20img.webp`,
    points: [
      { icon: Send, title: 'Instant Order Routing', desc: 'Every order hits the kitchen the moment it is placed.' },
      { icon: Monitor, title: 'Kitchen Display System', desc: 'Live tickets, prep status and timing on screen.' },
      { icon: Utensils, title: 'Dine-In & QSR Ready', desc: 'KOT for tables, takeaway and delivery alike.' },
    ],
  },
  {
    icon: Users,
    title: 'Loyalty & Repeat-Customer Tracking',
    desc: 'Know your regulars — automatically.',
    pill: 'Repeat Sales',
    img: `${DIR}/loyality%20img.webp`,
    points: [
      { icon: UserCheck, title: 'Auto Customer Profiles', desc: 'Every bill builds a customer history.' },
      { icon: Gift, title: 'Points & Rewards', desc: 'Tiers, points and vouchers out of the box.' },
      { icon: MessageCircle, title: 'WhatsApp Campaigns', desc: 'Reach regulars where they already are.' },
    ],
  },
  {
    icon: Bike,
    title: 'Delivery Aggregator Integration',
    desc: 'Zomato, Swiggy and ONDC orders on the same screen as walk-ins.',
    pill: 'Aggregator Native',
    img: `${DIR}/delevery%20aggaregator%20img.webp`,
    points: [
      { icon: LayoutGrid, title: 'One Unified Screen', desc: 'Aggregator and counter orders in one queue.' },
      { icon: RefreshCw, title: 'Menu & Price Sync', desc: 'Update once, reflect everywhere.' },
      { icon: CheckCircle2, title: 'Auto Order Accept', desc: 'No missed tickets at peak hour.' },
    ],
  },
  {
    icon: Package,
    title: 'Recipe-Level Inventory Deduction',
    desc: 'A sale deducts real ingredients — not just a SKU count.',
    pill: 'Protected Margin',
    img: `${DIR}/recipie%20level%20img.webp`,
    points: [
      { icon: Boxes, title: 'Recipe-Mapped SKUs', desc: 'Each product maps to its ingredients.' },
      { icon: TrendingUp, title: 'Real Food Cost', desc: 'Know true cost and margin per sale.' },
      { icon: Warehouse, title: 'Live Stock Accuracy', desc: 'Ingredients deplete as you sell.' },
    ],
  },
  {
    icon: ShieldCheck,
    title: 'GST-Compliant Invoicing',
    desc: 'Every bill correct and compliant — automatically.',
    pill: 'GST Ready',
    img: `${DIR}/gst%20compliance%20img.webp`,
    points: [
      { icon: Calculator, title: 'Auto GST Calculation', desc: 'Correct tax on every line, every time.' },
      { icon: Building2, title: 'Multi-GSTIN Support', desc: 'Bill across states and entities.' },
      { icon: FileCheck, title: 'E-Invoice Ready', desc: 'Compliant formats out of the box.' },
    ],
  },
];

export default function PosCoreCapabilities() {
  const [active, setActive] = useState(0);
  const cap = CAPS[active];

  // Auto-advance through capabilities; manual clicks reset the cycle.
  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % CAPS.length), 4500);
    return () => clearInterval(id);
  }, [active]);

  return (
    <section className="relative overflow-hidden bg-[#f5f6fa] py-16 md:py-24">
      <Container>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <Eyebrow className="justify-center">Core Capabilities</Eyebrow>
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            Everything Between Your Counter and Your Kitchen —{' '}
            <span className="gradient-text-orange">In One Flow.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            Operational depth organised around what changes at the counter and behind it — six
            outcome-framed capabilities.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[320px_1fr]">
          {/* Tab list */}
          <div className="flex flex-col gap-2">
            {CAPS.map((c, i) => {
              const Icon = c.icon;
              const isActive = i === active;
              return (
                <button
                  key={c.title}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition-colors ${
                    isActive
                      ? 'border-orange-200 bg-orange-50'
                      : 'border-transparent bg-white hover:bg-cream-50'
                  }`}
                >
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
                    style={{ background: isActive ? ORANGE : TINT, color: isActive ? '#fff' : ORANGE }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <span
                    className={`flex-1 text-[14px] font-bold leading-tight ${
                      isActive ? 'text-navy-950' : 'text-navy-700'
                    }`}
                  >
                    {c.title}
                  </span>
                  <span className="num-display text-sm text-navy-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {isActive && <ArrowRight className="h-4 w-4" style={{ color: ORANGE }} strokeWidth={2.4} />}
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div className="rounded-3xl border border-cream-300 bg-white p-6 shadow-sm md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="grid gap-8 lg:grid-cols-[0.85fr_1.2fr] lg:items-center"
              >
                {/* Text + points */}
                <div>
                  <h3 className="h-display text-[1.6rem] leading-tight tracking-tight text-navy-950">
                    {cap.title}
                  </h3>
                  <span className="mt-3 block h-[3px] w-10 rounded-full" style={{ background: ORANGE }} />
                  <p className="mt-4 text-[15px] leading-relaxed text-navy-600">{cap.desc}</p>

                  <div className="mt-6 space-y-4">
                    {cap.points.map((p) => {
                      const PIcon = p.icon;
                      return (
                        <div key={p.title} className="flex items-start gap-3">
                          <span
                            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                            style={{ background: TINT, color: ORANGE }}
                          >
                            <PIcon className="h-5 w-5" strokeWidth={1.8} />
                          </span>
                          <div>
                            <p className="text-[14px] font-bold text-navy-950">{p.title}</p>
                            <p className="mt-0.5 text-[14px] leading-snug text-navy-600">{p.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-cream-300 bg-white px-4 py-2 shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-[14px] font-bold text-navy-900">{cap.pill}</span>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="flex items-center justify-center">
                  <img
                    src={cap.img}
                    alt={cap.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full object-contain"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
