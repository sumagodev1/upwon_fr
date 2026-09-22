import { m as motion } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Boxes,
  Factory,
  Truck,
  ShoppingCart,
  Map,
  Layers,
  PieChart,
} from 'lucide-react';
import Container from '../shared/Container/Container.jsx';
import SectionHeading from '../shared/SectionHeading/SectionHeading.jsx';

export default function ProductExperienceSection() {
  return (
    <section className="relative overflow-hidden bg-navy-975 section-pad">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-navy-400/[0.06] blur-[120px]" />

      <Container className="relative">
        <SectionHeading
          align="center"
          variant="dark"
          eyebrow="UpWon Product Experience"
          title="Mission control for every operational layer."
          description="Purpose-built dashboards for production, distribution, franchise, warehouse and workforce — each calibrated to the decisions you need to make today."
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-12">
          {/* Big card: production */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-md"
          >
            <DashHeader icon={Factory} title="Production Planning" tag="Manufacturing" />
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { l: 'Today Output', v: '24,860 u', d: '+8.2%', up: true },
                { l: 'Yield', v: '94.6%', d: '+2.1%', up: true },
                { l: 'Wastage', v: '1.8%', d: '-0.4%', up: false },
              ].map((s) => (
                <div key={s.l} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{s.l}</p>
                  <p className="mt-1.5 text-base font-bold text-white">{s.v}</p>
                  <p
                    className={`mt-1 inline-flex items-center gap-1 text-[14px] ${
                      s.up ? 'text-emerald-400' : 'text-orange-400'
                    }`}
                  >
                    {s.up ? <ArrowUpRight className="h-2.5 w-2.5" /> : <ArrowDownRight className="h-2.5 w-2.5" />}
                    {s.d}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-[14px] text-slate-400">
                <span>Batch progress</span>
                <span>14 active · 3 queued</span>
              </div>
              <div className="space-y-2">
                {[
                  { name: 'Cake-base · B2148', p: 92 },
                  { name: 'Cream-mix · B2151', p: 64 },
                  { name: 'Pastry-shell · B2153', p: 41 },
                  { name: 'Filling-A · B2155', p: 24 },
                ].map((b, i) => (
                  <div key={i} className="grid grid-cols-[1fr_auto] items-center gap-3">
                    <div>
                      <p className="text-[14px] text-slate-200">{b.name}</p>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${b.p}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-orange-500 to-orange-300"
                        />
                      </div>
                    </div>
                    <span className="w-9 text-right text-[14px] font-semibold text-white">{b.p}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right column: 2 stacked */}
          <div className="lg:col-span-5 grid gap-5">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-md"
            >
              <DashHeader icon={Truck} title="Distribution Heatmap" tag="Distribution" />
              <div className="mt-5 grid grid-cols-7 gap-1.5">
                {Array.from({ length: 35 }).map((_, i) => {
                  const intensity = ((i * 7 + 5) % 10) / 10;
                  return (
                    <div
                      key={i}
                      className="aspect-square rounded-sm"
                      style={{
                        background: `rgba(249, 115, 22, ${0.08 + intensity * 0.7})`,
                      }}
                    />
                  );
                })}
              </div>
              <div className="mt-4 flex items-center justify-between text-[14px] text-slate-400">
                <span>OTIF · zone-level</span>
                <span className="text-emerald-400">97.2% nationwide</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-md"
            >
              <DashHeader icon={Boxes} title="Inventory Health" tag="Warehouse" />
              <div className="mt-4 flex items-center gap-5">
                <DonutChart percent={86} />
                <ul className="flex-1 space-y-1.5 text-[14px]">
                  <Legend dot="bg-emerald-400" label="Within norm" value="86%" />
                  <Legend dot="bg-amber-300" label="Reorder soon" value="9%" />
                  <Legend dot="bg-orange-500" label="Stock-out risk" value="3%" />
                  <Legend dot="bg-rose-400" label="Expiry < 7d" value="2%" />
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Bottom row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-md"
          >
            <DashHeader icon={ShoppingCart} title="Outlet P&L" tag="Franchise" />
            <p className="mt-5 text-3xl font-bold text-white">₹38.4L</p>
            <p className="text-[14px] text-emerald-400">+14.6% MoM · top quartile</p>
            <div className="mt-5 grid grid-cols-12 items-end gap-1 h-20">
              {[40, 55, 48, 62, 58, 70, 68, 74, 80, 76, 84, 92].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.04 }}
                  className={`rounded-t-sm ${
                    i === 11 ? 'bg-orange-500' : 'bg-white/15'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="lg:col-span-4 relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-md"
          >
            <DashHeader icon={Activity} title="Workforce Pulse" tag="HRMS" />
            <ul className="mt-5 space-y-3 text-[14px]">
              {[
                { l: 'On shift now', v: '4,218', c: 'text-white' },
                { l: 'Absenteeism (7d)', v: '2.4%', c: 'text-emerald-400' },
                { l: 'Overtime hours', v: '618 h', c: 'text-orange-400' },
                { l: 'Open positions', v: '37', c: 'text-white' },
              ].map((r) => (
                <li key={r.l} className="flex items-center justify-between border-b border-white/[0.05] pb-2 last:border-0 last:pb-0">
                  <span className="text-slate-400">{r.l}</span>
                  <span className={`font-semibold ${r.c}`}>{r.v}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-4 relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-md"
          >
            <DashHeader icon={PieChart} title="Revenue Mix" tag="Analytics" />
            <ul className="mt-5 space-y-2.5 text-[14px]">
              {[
                { l: 'Modern Trade', v: 38, c: 'bg-orange-500' },
                { l: 'General Trade', v: 27, c: 'bg-emerald-400' },
                { l: 'Franchise / QSR', v: 22, c: 'bg-blue-400' },
                { l: 'Online / D2C', v: 13, c: 'bg-violet-400' },
              ].map((r, i) => (
                <li key={r.l}>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">{r.l}</span>
                    <span className="font-semibold text-white">{r.v}%</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${r.v * 2}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.15 + i * 0.08 }}
                      className={`h-full ${r.c}`}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function DashHeader({ icon: Icon, title, tag }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="grid h-8 w-8 place-items-center rounded-md bg-orange-500/15 text-orange-400">
          <Icon className="h-4 w-4" />
        </div>
        <p className="text-sm font-semibold text-white">{title}</p>
      </div>
      <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[14px] font-medium text-slate-400">
        {tag}
      </span>
    </div>
  );
}

function DonutChart({ percent = 80 }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  const off = c - (percent / 100) * c;
  return (
    <div className="relative h-24 w-24 shrink-0">
      <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
        <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
        <motion.circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          stroke="#F97316"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: off }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <p className="text-lg font-bold text-white">{percent}%</p>
      </div>
    </div>
  );
}

function Legend({ dot, label, value }) {
  return (
    <li className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2 text-slate-300">
        <span className={`h-2 w-2 rounded-full ${dot}`} />
        {label}
      </span>
      <span className="font-semibold text-white">{value}</span>
    </li>
  );
}
