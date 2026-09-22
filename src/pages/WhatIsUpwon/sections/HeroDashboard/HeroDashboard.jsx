import { m as motion } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Factory,
  Truck,
  Store,
  Activity,
  Boxes,
  PackageCheck,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';

const TICKER_BARS = [42, 58, 36, 70, 48, 82, 64, 76, 55, 90, 62, 78, 50, 84, 68];

export default function HeroDashboard() {
  return (
    <div className="relative">
      <div className="absolute -inset-x-4 -inset-y-4 rounded-2xl bg-gradient-to-tr from-orange-500/20 via-transparent to-blue-500/10 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.01] shadow-enterprise-lg backdrop-blur-xl">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-white/[0.06] bg-navy-900/40 px-5 py-3.5">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <span className="text-[14px] font-medium text-slate-400">
              UpWon · Mission Control
            </span>
          </div>
          <div className="hidden items-center gap-3 text-[14px] text-slate-500 sm:flex">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live · 24 plants · 700 outlets
            </span>
            <span>v4.18.2</span>
          </div>
        </div>

        <div className="grid gap-4 p-4 md:p-5 lg:grid-cols-12">
          {/* Left rail — Modules */}
          <div className="lg:col-span-3">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <p className="px-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Modules
              </p>
              <ul className="mt-2 space-y-1">
                {[
                  { icon: Factory, label: 'Manufacturing', active: true },
                  { icon: Truck, label: 'Distribution' },
                  { icon: Store, label: 'Franchise' },
                  { icon: Boxes, label: 'Warehouse' },
                  { icon: Activity, label: 'HRMS' },
                ].map((m, i) => (
                  <li
                    key={i}
                    className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[14px] transition-colors ${
                      m.active
                        ? 'bg-orange-500/15 text-white'
                        : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
                    }`}
                  >
                    <m.icon
                      className={`h-3.5 w-3.5 ${
                        m.active ? 'text-orange-400' : 'text-slate-500'
                      }`}
                    />
                    {m.label}
                  </li>
                ))}
              </ul>

              <div className="mt-3 border-t border-white/[0.06] pt-3">
                <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Workspace
                </p>
                <div className="mt-2 flex items-center gap-2 rounded-lg bg-white/[0.04] px-2.5 py-2">
                  <div className="grid h-6 w-6 place-items-center rounded-md bg-orange-500/20 text-[14px] font-bold text-orange-300">
                    M
                  </div>
                  <div className="leading-tight">
                    <p className="text-[14px] font-medium text-white">Monginis</p>
                    <p className="text-[14px] text-slate-500">700 outlets · 5 hubs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main area */}
          <div className="grid grid-cols-12 gap-4 lg:col-span-9">
            {/* KPI strip */}
            {[
              {
                label: 'Today’s Revenue',
                value: '₹4.82 Cr',
                delta: '+12.4%',
                up: true,
                color: 'text-emerald-400',
              },
              {
                label: 'Production Yield',
                value: '94.6%',
                delta: '+2.1%',
                up: true,
                color: 'text-emerald-400',
              },
              {
                label: 'Wastage',
                value: '1.8%',
                delta: '-0.4%',
                up: false,
                color: 'text-orange-400',
              },
              {
                label: 'OTIF',
                value: '97.2%',
                delta: '+0.6%',
                up: true,
                color: 'text-emerald-400',
              },
            ].map((k, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.06 }}
                className="col-span-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 md:col-span-3"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {k.label}
                </p>
                <p className="mt-2 text-xl font-bold text-white md:text-2xl">
                  {k.value}
                </p>
                <p className={`mt-1 inline-flex items-center gap-1 text-[14px] font-medium ${k.color}`}>
                  {k.up ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {k.delta} vs yesterday
                </p>
              </motion.div>
            ))}

            {/* Chart card */}
            <div className="col-span-12 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 md:col-span-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Secondary Sales · Today
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    Realtime outlet sell-through · 18 zones
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[14px] font-medium text-emerald-300">
                  <TrendingUp className="h-3 w-3" />
                  Trending up
                </span>
              </div>

              <div className="mt-5 flex h-32 items-end gap-1.5">
                {TICKER_BARS.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.8, delay: 0.6 + i * 0.04, ease: 'easeOut' }}
                    className={`flex-1 rounded-t-sm ${
                      i === TICKER_BARS.length - 1
                        ? 'bg-orange-500'
                        : 'bg-gradient-to-t from-orange-500/30 to-orange-500/70'
                    }`}
                  />
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between text-[14px] text-slate-500">
                <span>09:00</span>
                <span>12:00</span>
                <span>15:00</span>
                <span>18:00</span>
                <span className="text-white">21:00 · live</span>
              </div>
            </div>

            {/* Side ops feed */}
            <div className="col-span-12 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 md:col-span-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Ops Feed
              </p>
              <ul className="mt-3 space-y-2.5">
                {[
                  {
                    icon: CheckCircle2,
                    color: 'text-emerald-400',
                    text: 'Batch B-2148 cleared QC · Mumbai Hub',
                    time: '2m',
                  },
                  {
                    icon: PackageCheck,
                    color: 'text-orange-400',
                    text: 'Dispatch wave 3 · 142 outlets',
                    time: '6m',
                  },
                  {
                    icon: AlertTriangle,
                    color: 'text-amber-300',
                    text: 'Outlet O-318 indent below threshold',
                    time: '11m',
                  },
                  {
                    icon: CheckCircle2,
                    color: 'text-emerald-400',
                    text: 'Aggregator recon closed for Y-24',
                    time: '18m',
                  },
                ].map((e, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[14px]">
                    <e.icon className={`mt-0.5 h-3.5 w-3.5 ${e.color}`} />
                    <span className="flex-1 text-slate-300">{e.text}</span>
                    <span className="shrink-0 text-slate-500">{e.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Floating chips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        className="absolute -left-6 top-1/3 hidden rounded-lg border border-white/10 bg-navy-900/80 px-3 py-2 text-[14px] font-medium text-slate-200 shadow-enterprise backdrop-blur md:block"
      >
        <span className="mr-1.5 inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-emerald-400 animate-pulse" />
        24 plants online
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1 }}
        className="absolute -right-4 bottom-10 hidden rounded-lg border border-white/10 bg-navy-900/80 px-3 py-2 text-[14px] font-medium text-slate-200 shadow-enterprise backdrop-blur md:block"
      >
        <span className="mr-1.5 inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-orange-500 animate-pulse" />
        ₹1.42L / minute
      </motion.div>
    </div>
  );
}
