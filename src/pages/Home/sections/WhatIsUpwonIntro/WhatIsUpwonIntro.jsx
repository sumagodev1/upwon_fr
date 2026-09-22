import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Sparkles,
  ScanBarcode,
  Truck,
  Store,
  Wallet,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  MessageSquareText,
  Network,
} from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';

// Pain points food and FMCG operators tell us — every day, verbatim.
// Each card shows the pain in plain language plus the cost it carries.
// const PAIN_POINTS = [
//   {
//     icon: ScanBarcode,
//     name: 'Invisible wastage',
//     pain: 'You lose 15-20% to wastage every month — and you only find out at month-end.',
//     cost: '₹2L+ leaked monthly',
//   },
//   {
//     icon: Truck,
//     name: 'Blind on distribution',
//     pain: 'Your distributor data arrives 30 days late, often wrong. You plan on guesswork.',
//     cost: '30-day blind spot',
//   },
//   {
//     icon: Store,
//     name: 'Scaling = hiring more',
//     pain: 'Every new outlet needs 3 more back-office people just to keep up.',
//     cost: '3× staff per outlet',
//   },
//   {
//     icon: Wallet,
//     name: 'Books always late',
//     pain: 'You close your books 15 days after month-end. Decisions wait for finance.',
//     cost: '15 days behind',
//   },
//   // Cards 5-7 added per brief §1.3 — the "situations every food business owner
//   // tells us" set. These echo the exact verbatim language sales hears most
//   // often: month-end costing, fragmented sales tooling, disconnected outlets.
//   {
//     icon: FileSpreadsheet,
//     name: 'Costing only at month-end',
//     pain: "Are you calculating production costs at month-end? You're flying blind all month.",
//     cost: '30-day cost lag',
//   },
//   {
//     icon: MessageSquareText,
//     name: 'WhatsApp + Tally + Excel',
//     pain: 'Salesman orders on WhatsApp, stock on Tally, claims on Excel — and your team reconciles every Sunday.',
//     cost: '4 hrs/week per rep',
//   },
//   {
//     icon: Network,
//     name: 'Outlets that don’t talk to HQ',
//     pain: "Your franchise outlets run systems that don’t talk to your HQ — every metric is a phone call away.",
//     cost: 'Zero live visibility',
//   },
// ];


const PAIN_POINTS = [
  {
    icon: ScanBarcode,
    name: 'Invisible wastage',
    pain: 'You are bleeding margin and dont know it',
    cost: '₹2L+ leaked monthly',
  },
  {
    icon: Truck,
    name: 'Blind on distribution',
    pain: 'Distributor data thats always 30 days late',
    cost: 'Guesswork, not strategy',
  },
  {
    icon: Store,
    name: 'Scaling = hiring more',
    pain: 'Every new outlet needs 3 more back-office heads',
    cost: '3× cost, same chaos',
  },
  {
    icon: Wallet,
    name: 'Books always late',
    pain: 'Finance closes 15 days after month-end',
    cost: 'Every decision waits',
  },
  // Cards 5-7 added per brief §1.3 — the "situations every food business owner
  // tells us" set. These echo the exact verbatim language sales hears most
  // often: month-end costing, fragmented sales tooling, disconnected outlets.
  {
    icon: FileSpreadsheet,
    name: 'Costing only at month-end',
    pain: "You don't know your margins until it's too late",
    cost: '30-day cost blind spot',
  },
  {
    icon: MessageSquareText,
    name: 'WhatsApp + Tally + Excel',
    pain: '3 tools. Zero sync. Every Sunday lost to reconciliation',
    cost: '4 hrs/week per rep',
  },
  {
    icon: Network,
    name: 'Outlets that don’t talk to HQ',
    pain: "Every outlet metric needs a phone call to find out",
    cost: 'Zero live visibility across your network',
  },
];

// Short, punchy pillars — what UpWon is, in one line each
const PILLARS = [
  'Seven integrated platforms — one data spine',
  'Built for food, FMCG and franchise — not retrofitted',
  'Live in 30-45 days — implementation included',
  '50+ businesses · 36,500+ daily users · ₹16 Cr+ daily',
];

export default function WhatIsUpwonIntro() {
  return (
    <section className="relative overflow-hidden bg-white section-pad">
      <div className="absolute inset-0 grid-bg-light opacity-40" />

      <Container className="relative">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.22em] text-orange-700"
          >
            <Sparkles className="h-3 w-3" />
            Meet UpWon
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 h-display text-balance text-[1.9rem] leading-[1.1] text-navy-950 md:text-4xl lg:text-[2.6rem]"
          >
            Your business has problems.{' '}
            <span className="gradient-text-orange">UpWon has answers.</span>
          </motion.h2>
        </div>

        {/* TOP — What UpWon is (compact horizontal card) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-10 rounded-3xl border border-orange-300 bg-white p-7 md:p-9"
        >

          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-10">
            {/* Left: title + tagline */}
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-300 bg-orange-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-orange-700">
                What it is
              </span>
              <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-navy-950 md:text-3xl">
                {/* Your{' '}
                <span className="gradient-text-orange">Business Growth Suite.</span> */}
                Not a{' '}
                <span className="gradient-text-orange">generic ERP. A food-first operating system.</span>
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-navy-700">
                One platform where production, distribution, retail, HR and
                finance run on the same data — the way Indian food businesses
                actually operate.
              </p>
              {/* Navy-outlined so it reads clearly as a CTA, not body text
                  (per home-page design review). Inherits the global secondary
                  hover (fills orange on hover). */}
              <Link to="/what-is-upwon" className="btn-secondary mt-4 !text-sm">
                The 5-minute intro
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Right: 4 quick pillars in a 2-col grid */}
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {PILLARS.map((p, i) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.4,
                    delay: 0.15 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-start gap-2 rounded-xl border border-orange-200 bg-white/80 px-3 py-2.5 text-[14px] leading-snug text-navy-800 backdrop-blur"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
                  <span>{p}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* BOTTOM — Problems we hear every week (pain-first cards, no products) */}
        <div className="mt-10">
          <div className="mb-5 flex items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.22em] text-rose-700">
              <AlertTriangle className="h-3 w-3" />
              Problems we hear every week
            </div>
          </div>

          {/* Single-line horizontal marquee — all 7 cards auto-scroll left
              continuously, pause on hover. Cards are duplicated in the track
              so the translate(-50%) loop is seamless (no visible reset). The
              `mask-fade-lr` utility softly fades the left/right edges so cards
              "appear" and "disappear" instead of hard-clipping at the
              container border. On mobile users can also scroll/drag the
              track horizontally. */}
          <div
            className="group/marquee relative overflow-x-clip py-3 mask-fade-lr"
            // Track CSS var lets us tweak speed without editing the keyframe.
            // 38s is comfortable for 7 cards — fast enough to feel alive,
            // slow enough to actually read each card.
            style={{ '--marquee-speed': '38s' }}
          >
            <div
              className="flex w-max gap-4 pr-4"
              style={{
                animation: 'ticker var(--marquee-speed) linear infinite',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
              onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
            >
              {[...PAIN_POINTS, ...PAIN_POINTS].map((row, i) => (
                <PainCard key={`${row.name}-${i}`} row={row} index={i % PAIN_POINTS.length} />
              ))}
            </div>
          </div>

          {/* Single line that bridges to the solution — no product names */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.4 }}
            className="mx-auto mt-6 max-w-2xl text-center text-[14px] text-navy-700"
          >
            <span className="font-semibold text-navy-950">UpWon solves all seven — and more — in one platform.</span>{' '}
            That's the whole point.
          </motion.p>
        </div>

        {/* Bottom demo-CTA band removed per home-page design review — it
            duplicated the sitewide footer CTA (RootLayout), so it was redundant
            this far up the page. */}
      </Container>
    </section>
  );
}

// Individual pain card — extracted so the marquee track can render the same
// card markup twice (for a seamless loop) without duplicating ~30 lines of
// JSX inline. Width is fixed at ~280–320px so cards stay readable as they
// scroll past, and the marquee timing is predictable.
function PainCard({ row, index }) {
  const Icon = row.icon;
  return (
    <div className="group relative flex w-[280px] shrink-0 flex-col overflow-hidden rounded-2xl border border-rose-200 bg-gradient-to-br from-white to-rose-50/30 p-6 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-rose-300 sm:w-[300px] md:w-[320px]">
      {/* Top accent + soft corner glow on hover */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-rose-500/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-rose-500/0 blur-2xl transition-colors duration-700 group-hover:bg-rose-500/12" />

      {/* Header: icon + numeral */}
      <div className="relative flex items-start justify-between">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-100 text-rose-600 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-rose-600 group-hover:text-white">
          <Icon className="h-6 w-6" />
        </div>
        <span className="num-display text-3xl font-bold leading-none text-rose-500/15 transition-colors duration-500 group-hover:text-rose-500/40">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Problem name — big, bold */}
      <h3 className="relative mt-5 font-display text-lg font-bold leading-tight text-navy-950">
        {row.name}
      </h3>

      {/* Pain description */}
      <p className="relative mt-2 text-[14px] leading-relaxed text-navy-700">
        {row.pain}
      </p>

      {/* Cost badge — visceral red number */}
      <div className="relative mt-auto pt-5">
        <div className="inline-flex items-center gap-1.5 rounded-lg bg-rose-50 px-2.5 py-1.5 ring-1 ring-rose-200">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse-slow" />
          <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-rose-700">
            {row.cost}
          </span>
        </div>
      </div>
    </div>
  );
}
