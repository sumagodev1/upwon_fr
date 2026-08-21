import { m as motion } from 'framer-motion';
import {
  Users,
  Route,
  ShoppingCart,
  Database,
  Warehouse,
  Boxes,
  Factory,
  Share2,
  Smartphone,
  Store,
} from 'lucide-react';
import Container from '../ui/Container.jsx';

/*
  "Why Standalone SFA-DMS Fall Short" — a DISCONNECTED → CONNECTED transformation
  story (not a comparison table). Left: a fragmented standalone architecture with
  a broken sync + stock mismatch. Right: UpWon's one connected operational core
  with solid, flowing data links and a single live stock number shared across
  ERP · DMS · SFA. Light, premium, subtle contrast — no red/green error styling,
  no competitor names.
*/

const EASE = [0.22, 1, 0.3, 1];
const BG = '#E9EDF7';
const BG_IMAGE = '/images/structural_gap.webp';

// One node in an architecture chain.
function Node({ icon: Icon, label, sub, tone = 'base' }) {
  const isCore = tone === 'core';
  return (
    <div
      className={`flex w-full max-w-[240px] items-center gap-2.5 rounded-lg border px-3.5 py-2 shadow-sm ${
        isCore ? 'border-orange-500/40 bg-orange-50' : 'border-cream-300 bg-white'
      }`}
    >
      <span
        className={`grid h-7 w-7 shrink-0 place-items-center rounded-md ${
          isCore ? 'bg-orange-500/15 text-orange-600' : 'bg-cream-200 text-navy-600'
        }`}
      >
        <Icon className="h-4 w-4" strokeWidth={1.8} />
      </span>
      <div className="min-w-0">
        <p className="truncate text-[14px] font-semibold text-navy-950">{label}</p>
        {sub && <p className="truncate text-[14px] text-navy-500">{sub}</p>}
      </div>
    </div>
  );
}

// A solid connector with a data particle flowing down it.
function FlowConnector({ active = false }) {
  return (
    <div className="relative my-0.5 h-4 w-px">
      <div
        className={`absolute inset-0 ${
          active ? 'bg-gradient-to-b from-orange-500/60 to-orange-400/25' : 'bg-navy-950/15'
        }`}
      />
      <motion.span
        aria-hidden
        animate={{ y: [0, 16], opacity: [0, 1, 0] }}
        transition={{ duration: active ? 1.5 : 2.4, repeat: Infinity, ease: 'linear' }}
        className={`absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full ${
          active
            ? 'bg-orange-500 shadow-[0_0_8px_rgba(232,90,42,0.7)]'
            : 'bg-navy-400'
        }`}
      />
    </div>
  );
}

function Chip({ children }) {
  return (
    <span className="rounded-full border border-cream-300 bg-cream-100 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-navy-500">
      {children}
    </span>
  );
}

function MiniStock({ system, value, muted }) {
  return (
    <div className="rounded-lg border border-cream-300 bg-cream-100 px-3 py-2 text-center">
      <p className="text-[10px] uppercase tracking-wide text-navy-400">{system}</p>
      <p className={`text-[14px] font-bold ${muted ? 'text-amber-600' : 'text-navy-900'}`}>
        Available: {value}
      </p>
    </div>
  );
}

// LEFT — standalone / disconnected architecture.
function DisconnectedPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE }}
      className="flex flex-col rounded-3xl border border-navy-300/60 bg-transparent p-5 md:p-6"
    >
      <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-navy-500">
        Standalone SFA-DMS
      </p>

      <div className="mt-4 flex flex-1 flex-col items-center">
        <Node icon={Users} label="Field Sales Rep" sub="On-ground execution" />
        <FlowConnector />
        <Node icon={Route} label="Beat Plan" sub="Routes · coverage" />
        <FlowConnector />
        <Node icon={ShoppingCart} label="Orders · Distributor" sub="Secondary sales" />

        {/* Broken sync gap */}
        <div className="relative my-1.5 flex w-full flex-col items-center py-1.5">
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-l border-dashed border-navy-300" />
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-1.5">
            <Chip>Sync</Chip>
            <Chip>Delay</Chip>
            <Chip>Reconciliation</Chip>
          </div>
          <div className="relative z-10 mt-2.5 flex items-center gap-2">
            <MiniStock system="SFA-DMS" value="500" />
            <span className="text-sm text-navy-400">≠</span>
            <MiniStock system="ERP" value="280" muted />
          </div>
        </div>

        <Node icon={Database} label="ERP" sub="Business records" />
        <FlowConnector />
        <Node icon={Warehouse} label="Stock · Warehouse" sub="Physical reality" />
      </div>

      <div className="mt-5 border-t border-cream-300 pt-3 text-center">
        <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-navy-700">
          Disconnected model
        </p>
        <p className="mt-1 text-[14px] text-navy-500">
          Field execution separated from business reality
        </p>
      </div>
    </motion.div>
  );
}

// The subtle bridge between the two states.
function TransitionBridge() {
  return (
    <div className="flex flex-row items-center justify-center gap-3 py-2 lg:flex-col lg:py-0">
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-navy-400">
        Disconnected
      </span>
      <div className="relative h-px w-20 overflow-hidden lg:h-28 lg:w-px">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/10 via-orange-500/40 to-orange-500 lg:bg-gradient-to-b" />
        <motion.span
          aria-hidden
          animate={{ x: ['-10%', '110%'] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(232,90,42,0.7)] lg:hidden"
        />
        <motion.span
          aria-hidden
          animate={{ y: ['-10%', '110%'] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
          className="absolute left-1/2 hidden h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(232,90,42,0.7)] lg:block"
        />
      </div>
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange-600">
        Connected
      </span>
    </div>
  );
}

// RIGHT — UpWon one connected operational core.
function ConnectedPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
      className="relative flex flex-col overflow-hidden rounded-3xl border border-orange-500/30 bg-transparent p-5 md:p-6"
    >
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-orange-500/10 blur-[90px]" />

      <p className="relative text-center text-[11px] font-bold uppercase tracking-[0.2em] text-orange-600">
        UpWon Connected Core
      </p>

      <div className="relative mt-4 flex flex-1 flex-col items-center">
        <div className="mb-3 w-fit rounded-full border border-orange-500/30 bg-orange-50 px-4 py-1.5 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-orange-700">
          One Connected Operational Core
        </div>

        <Node icon={Factory} label="Production" sub="Batches · output" />
        <FlowConnector active />
        <Node icon={Boxes} label="Inventory" tone="core" sub="Real-time stock" />
        <FlowConnector active />
        <Node icon={Database} label="ERP" tone="core" sub="One data model" />
        <FlowConnector active />
        <Node icon={Share2} label="DMS" tone="core" sub="Distribution" />
        <FlowConnector active />
        <Node icon={Smartphone} label="SFA" tone="core" sub="Field force" />
        <FlowConnector active />
        <Node icon={Store} label="Distributor" sub="Route to market" />

        {/* Live shared stock */}
        <div className="mt-4 w-full max-w-[300px] rounded-xl border border-cream-300 bg-cream-100 p-3.5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wide text-navy-400">
                SKU · Premium Product
              </p>
              <p className="mt-0.5 text-xl font-bold text-navy-950">
                280 <span className="text-sm font-medium text-navy-500">Cases</span>
              </p>
              <p className="text-[14px] text-navy-500">Available stock</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[14px] font-semibold text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Inventory
            </span>
          </div>
          <p className="mt-2.5 border-t border-cream-300 pt-2 text-[14px] text-navy-500">
            The same number, visible across ERP · DMS · SFA.
          </p>
        </div>
      </div>

      <div className="relative mt-5 border-t border-cream-300 pt-3 text-center">
        <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-orange-700">
          One connected source of truth
        </p>
        <p className="mt-1 text-[14px] text-navy-500">
          Field execution and production reality on one core
        </p>
      </div>
    </motion.div>
  );
}

export default function StructuralGapSection() {
  return (
    <section className="relative overflow-hidden py-10 md:py-14" style={{ backgroundColor: BG }}>
      {/* Full-bleed background artwork — `bg-fixed` on desktop pins it to the
          viewport, so the artwork stays still while the content scrolls over it
          (parallax), like the home "Who We Are" section. Mobile keeps a normal
          scrolling background — iOS Safari doesn't honour bg-fixed and it causes
          repaint jank on phones. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat lg:bg-fixed lg:[background-size:100%_auto]"
        style={{ backgroundImage: `url(${BG_IMAGE})` }}
      />
      {/* Vertical fade — tall solid section-colour bands at top/bottom hide the
          gaps the shorter (full-width) image leaves as it translates, with a
          clear middle so the parallax movement is clearly visible. Doubles as a
          light legibility wash. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, #E9EDF7 0%, #E9EDF7 18%, rgba(233,237,247,0.15) 42%, rgba(233,237,247,0.15) 58%, #E9EDF7 82%, #E9EDF7 100%)',
        }}
      />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-orange-500/[0.06] blur-[160px]" />

      <Container className="relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-orange-600">
            The Structural Gap
          </p>
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.08] tracking-tight text-navy-950">
            A Great Beat Plan Doesn&apos;t Help If It&apos;s{' '}
            <span className="gradient-text-orange">Guessing at Your Stock.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[14px] leading-relaxed text-navy-600 md:text-[15px]">
            Most SFA-DMS tools are excellent at the field-force layer but remain disconnected from
            everything upstream. UpWon connects SFA, DMS, ERP, inventory, warehouse and production
            into one connected operational core.
          </p>
        </motion.div>

        {/* DISCONNECTED → CONNECTED */}
        <div className="mt-8 grid items-stretch gap-5 lg:grid-cols-[1fr_auto_1fr] lg:gap-4">
          <DisconnectedPanel />
          <TransitionBridge />
          <ConnectedPanel />
        </div>
      </Container>
    </section>
  );
}
