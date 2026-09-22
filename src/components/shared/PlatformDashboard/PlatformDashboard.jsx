import { useState } from 'react';
import { m as motion } from 'framer-motion';
import {
  Factory,
  Truck,
  Store,
  Users,
  Warehouse,
  HandshakeIcon,
  Smartphone,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Activity,
  ShieldQuestion,
  ClipboardCheck,
} from 'lucide-react';
import BrowserFrame from '../BrowserFrame/BrowserFrame.jsx';

// Single component that renders the right dashboard mock based on slug
export default function PlatformDashboard({ slug, theme }) {
  const map = {
    erp: <ErpDashboard theme={theme} />,
    'sfa-dms': <SfaDashboard theme={theme} />,
    fms: <FmsDashboard theme={theme} />,
    hrms: <HreasyDashboard theme={theme} />,
    wms: <WmsDashboard theme={theme} />,
    'vendor-portal': <VendorDashboard theme={theme} />,
    'mobile-apps': <MobileDashboard theme={theme} />,
  };

  return (
    <BrowserFrame
      url={`upwon.in/${slug}`}
      title={`UpWon · ${slug.toUpperCase()}`}
      accentBorder={`border-[${theme.accent}]/30`}
    >
      {map[slug] || <ErpDashboard theme={theme} />}
    </BrowserFrame>
  );
}

/* ============ ERP ============ */
function ErpDashboard({ theme }) {
  const [tab, setTab] = useState('production');
  const tabs = [
    { id: 'production', label: 'Production' },
    { id: 'procurement', label: 'Procurement' },
    { id: 'quality', label: 'Quality' },
    { id: 'finance', label: 'Finance' },
  ];

  return (
    <div>
      <div className="flex border-b border-white/[0.06] bg-white/[0.02]">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="relative px-5 py-3 text-[11.5px] font-semibold uppercase tracking-[0.12em] font-display"
            style={{ color: tab === t.id ? '#fff' : '#9098B5' }}
          >
            {t.label}
            {tab === t.id && (
              <motion.span
                layoutId="erp-tab"
                className="absolute inset-x-2 bottom-0 h-0.5"
                style={{ backgroundColor: theme.accent }}
              />
            )}
          </button>
        ))}
      </div>
      <div className="p-5">
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Today's Output" value="4,280" sub="↑ 12% vs plan" subColor="#3A9E5A" accent={theme.accent} />
          <StatCard label="Active Batches" value="23" sub="across 3 plants" subColor="#9098B5" accent={theme.accent} />
          <StatCard label="Wastage Today" value="2.1%" sub="↓ 0.4% vs yesterday" subColor="#F0A500" accent={theme.accent} />
        </div>

        <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream-100/50">
          Live Batch Tracker
        </p>
        <div className="mt-2 overflow-hidden rounded-lg border border-white/[0.06]">
          <div className="grid grid-cols-[1.4fr_1fr_0.7fr_1fr] bg-white/[0.04] px-3 py-2 text-[9.5px] font-semibold uppercase tracking-[0.1em] text-cream-100/50">
            <span>Batch ID</span><span>SKU</span><span className="text-right">Yield</span><span className="text-right">Status</span>
          </div>
          {[
            { id: 'BT-2026-0814', sku: 'Vanilla Cake', yield: '98.2%', status: 'On Track', good: true },
            { id: 'BT-2026-0815', sku: 'Choc Truffle', yield: '94.8%', status: 'Review', good: false },
            { id: 'BT-2026-0816', sku: 'Fresh Bread', yield: '99.1%', status: 'On Track', good: true },
            { id: 'BT-2026-0817', sku: 'Butter Cake', yield: '97.6%', status: 'Dispatched', good: true },
          ].map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="grid grid-cols-[1.4fr_1fr_0.7fr_1fr] items-center bg-white/[0.02] px-3 py-2.5 text-[14px]"
              style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
            >
              <span className="text-white font-medium">{r.id}</span>
              <span className="text-cream-100/70">{r.sku}</span>
              <span className="text-right font-semibold" style={{ color: r.good ? '#4CAF50' : '#F0A500' }}>{r.yield}</span>
              <span className="text-right font-semibold" style={{ color: r.good ? '#4CAF50' : '#F0A500' }}>{r.status}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============ SFA & DMS ============ */
function SfaDashboard({ theme }) {
  const reps = [
    { name: 'Ravi Kumar', area: 'Nashik East', status: 'Active', outlets: '12/18', orders: '₹34K', good: true },
    { name: 'Suresh P', area: 'Nashik West', status: 'Active', outlets: '9/15', orders: '₹28K', good: true },
    { name: 'Amit Shah', area: 'Pune Route', status: 'En Route', outlets: '7/22', orders: '₹18K', good: false },
    { name: 'Priya M', area: 'Mumbai N', status: 'Active', outlets: '14/20', orders: '₹42K', good: true },
  ];
  const distributors = [
    { name: 'Patil Traders, Nashik', stockDays: '12 days', coverage: '94%', status: 'Healthy', good: true },
    { name: 'Krishna Agencies, Pune', stockDays: '18 days', coverage: '88%', status: 'Healthy', good: true },
    { name: 'Mumbai Dist. Co.', stockDays: '7 days', coverage: '71%', status: 'Review', good: false },
  ];

  return (
    <div className="p-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cream-100/50">
        Field Team · Live · 14 May, 11:42 AM
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {reps.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rounded-lg border border-white/[0.07] bg-white/[0.04] p-3"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[14px] font-semibold text-white">{r.name}</span>
              <span
                className="rounded-full px-2 py-0.5 text-[14px] font-semibold"
                style={{
                  background: r.good ? 'rgba(46,125,50,0.2)' : 'rgba(240,160,0,0.15)',
                  color: r.good ? '#4CAF50' : '#F0A500',
                }}
              >
                {r.status}
              </span>
            </div>
            <p className="mt-1 text-[14px] text-cream-100/60">{r.area}</p>
            <div className="mt-2 flex gap-3">
              <div>
                <p className="font-display text-sm font-bold text-white">{r.outlets}</p>
                <p className="text-[14px] text-cream-100/50">Outlets</p>
              </div>
              <div>
                <p className="font-display text-sm font-bold text-white">{r.orders}</p>
                <p className="text-[14px] text-cream-100/50">Orders</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream-100/50">
        Distributor Stock Visibility
      </p>
      <div className="mt-2 space-y-1.5">
        {distributors.map((d) => (
          <div
            key={d.name}
            className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center rounded-md border border-white/[0.05] bg-white/[0.02] px-3 py-2 text-[14px]"
          >
            <span className="text-white font-medium">{d.name}</span>
            <span className="text-right font-semibold" style={{ color: d.good ? '#4CAF50' : '#F0A500' }}>{d.stockDays}</span>
            <span className="text-right font-semibold" style={{ color: d.good ? '#4CAF50' : '#F0A500' }}>{d.coverage}</span>
            <span className="text-right font-semibold" style={{ color: d.good ? '#4CAF50' : '#F0A500' }}>{d.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ FMS & POS ============ */
function FmsDashboard({ theme }) {
  const outlets = [
    { name: 'Nashik 1', sales: '₹28.4K', good: true },
    { name: 'Nashik 2', sales: '₹22.1K', good: true },
    { name: 'Pune Main', sales: '₹41.8K', good: true },
    { name: 'Pune East', sales: '₹9.2K', good: false },
    { name: 'Mumbai 1', sales: '₹58.3K', good: true },
    { name: 'Mumbai 2', sales: '₹44.6K', good: true },
    { name: 'Mumbai 3', sales: '₹37.9K', good: true },
    { name: 'Aurangabad', sales: '₹19.4K', good: true },
  ];

  return (
    <div className="p-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cream-100/50">
        Outlet Network · Today's Performance
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {outlets.map((o, i) => (
          <motion.div
            key={o.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
            className="rounded-md border p-2.5 text-center"
            style={{
              borderColor: o.good ? 'rgba(46,125,50,0.4)' : 'rgba(240,160,0,0.4)',
              background: o.good ? 'rgba(46,125,50,0.07)' : 'rgba(240,160,0,0.07)',
            }}
          >
            <p className="text-[14px] font-semibold text-cream-100/80">{o.name}</p>
            <p className="font-display text-[14px] font-bold" style={{ color: theme.accentSoft }}>{o.sales}</p>
            <p className="text-[14px]" style={{ color: o.good ? '#4CAF50' : '#F0A500' }}>
              {o.good ? '✓ Active' : '⚠ Low Sales'}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          { v: '₹2.61L', l: 'Total today' },
          { v: '248', l: 'Orders today' },
          { v: '7/8', l: 'Outlets active' },
          { v: '94%', l: 'Avg SOP score' },
        ].map((s) => (
          <div key={s.l} className="rounded-md border border-white/[0.06] bg-white/[0.03] p-2.5 text-center">
            <p className="font-display text-base font-bold" style={{ color: theme.accentSoft }}>{s.v}</p>
            <p className="text-[14px] text-cream-100/50">{s.l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ HREasy ============ */
function HreasyDashboard({ theme }) {
  return (
    <div className="p-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cream-100/50">
        Workforce Pulse · 14 May, 09:32 AM
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {[
          { n: '4,218', l: 'On shift now', c: theme.accentSoft },
          { n: '94', l: 'Late punch-ins', c: '#F0A500' },
          { n: '37', l: 'On leave', c: '#9098B5' },
          { n: '2.4%', l: 'Absenteeism (7d)', c: '#4CAF50' },
        ].map((s) => (
          <div key={s.l} className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-3 text-center">
            <p className="font-display text-lg font-bold" style={{ color: s.c }}>{s.n}</p>
            <p className="text-[14px] text-cream-100/60">{s.l}</p>
          </div>
        ))}
      </div>

      <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream-100/50">
        Today's Punches · Plant Floor
      </p>
      <div className="mt-2 space-y-1.5">
        {[
          { id: 'EMP-1042', name: 'Sunita Patel', shift: 'A · 07:00', status: 'On Time' },
          { id: 'EMP-1118', name: 'Ramesh K', shift: 'A · 07:00', status: 'Late · 0:14' },
          { id: 'EMP-1240', name: 'Anita S', shift: 'A · 07:00', status: 'On Time' },
        ].map((r) => (
          <div
            key={r.id}
            className="grid grid-cols-[1fr_1.4fr_1fr_1fr] items-center rounded-md border border-white/[0.05] bg-white/[0.02] px-3 py-2 text-[14px]"
          >
            <span className="text-cream-100/60">{r.id}</span>
            <span className="text-white font-medium">{r.name}</span>
            <span className="text-cream-100/70 text-right">{r.shift}</span>
            <span
              className="text-right font-semibold"
              style={{ color: r.status.includes('Late') ? '#F0A500' : '#4CAF50' }}
            >
              {r.status}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-white/[0.06] bg-white/[0.03] p-3.5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cream-100/50">
          Payroll · This Month
        </p>
        <div className="mt-2 grid grid-cols-3 gap-2 text-center">
          <div><p className="font-display text-base font-bold text-white">₹2.84 Cr</p><p className="text-[14px] text-cream-100/50">Run total</p></div>
          <div><p className="font-display text-base font-bold" style={{ color: theme.accentSoft }}>92%</p><p className="text-[14px] text-cream-100/50">Processed</p></div>
          <div><p className="font-display text-base font-bold" style={{ color: '#F0A500' }}>328</p><p className="text-[14px] text-cream-100/50">Pending review</p></div>
        </div>
      </div>
    </div>
  );
}

/* ============ WMS ============ */
function WmsDashboard({ theme }) {
  return (
    <div className="p-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cream-100/50">
        Warehouse Operations · Live
      </p>
      <div className="mt-3 grid grid-cols-3 gap-3">
        <StatCard label="Stock Value" value="₹14.2 Cr" sub="Across 4 warehouses" subColor="#9098B5" accent={theme.accent} />
        <StatCard label="FEFO Compliance" value="99.4%" sub="↑ 0.6% vs last week" subColor="#4CAF50" accent={theme.accent} />
        <StatCard label="Dispatch Waves" value="6 of 8" sub="2 in progress" subColor="#F0A500" accent={theme.accent} />
      </div>

      <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream-100/50">
        Zone Utilisation
      </p>
      <div className="mt-2 grid grid-cols-6 gap-1.5">
        {['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2', 'E1', 'E2', 'F1', 'F2'].map((z, i) => {
          const pct = [82, 96, 74, 88, 91, 67, 55, 78, 84, 92, 71, 86][i];
          return (
            <div
              key={z}
              className="rounded-md border border-white/[0.06] p-2 text-center"
              style={{
                background: pct > 90 ? 'rgba(232,93,38,0.18)' : pct > 75 ? 'rgba(240,160,0,0.12)' : 'rgba(46,125,50,0.1)',
              }}
            >
              <p className="text-[14px] font-semibold text-cream-100/70">{z}</p>
              <p className="font-display text-[14px] font-bold text-white">{pct}%</p>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream-100/50">
        Dispatch Wave Status
      </p>
      <div className="mt-2 space-y-1.5">
        {[
          { w: 'Wave 3 · Mumbai depot', outlets: '42 outlets', units: '8,420 u', status: 'Loading', good: true },
          { w: 'Wave 4 · Pune route', outlets: '38 outlets', units: '6,180 u', status: 'In Transit', good: true },
          { w: 'Wave 5 · Nashik direct', outlets: '24 outlets', units: '4,920 u', status: 'Hold · QC', good: false },
        ].map((d) => (
          <div
            key={d.w}
            className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center rounded-md border border-white/[0.05] bg-white/[0.02] px-3 py-2 text-[14px]"
          >
            <span className="text-white font-medium">{d.w}</span>
            <span className="text-cream-100/60 text-right">{d.outlets}</span>
            <span className="text-cream-100/60 text-right">{d.units}</span>
            <span className="text-right font-semibold" style={{ color: d.good ? '#4CAF50' : '#F0A500' }}>{d.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ Vendor Portal ============ */
function VendorDashboard({ theme }) {
  return (
    <div className="p-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cream-100/50">
        Active RFQs
      </p>
      <div className="mt-2 space-y-2">
        {[
          { id: 'RFQ-241', item: 'Refined Wheat Flour · 2,000 MT', vendors: 8, status: 'Responses In', good: true },
          { id: 'RFQ-242', item: 'Premium Sugar · 800 MT', vendors: 5, status: 'Negotiating', good: true },
          { id: 'RFQ-243', item: 'Cocoa Powder · 120 MT', vendors: 3, status: 'Awaiting', good: false },
        ].map((r) => (
          <div
            key={r.id}
            className="grid grid-cols-[1fr_2fr_0.8fr_1fr] items-center rounded-md border border-white/[0.06] bg-white/[0.03] px-3 py-2.5 text-[14px]"
          >
            <span className="font-display font-semibold" style={{ color: theme.accentSoft }}>{r.id}</span>
            <span className="text-white">{r.item}</span>
            <span className="text-cream-100/60 text-right">{r.vendors} vendors</span>
            <span className="text-right font-semibold" style={{ color: r.good ? '#4CAF50' : '#F0A500' }}>{r.status}</span>
          </div>
        ))}
      </div>

      <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream-100/50">
        Top Suppliers · Scorecard
      </p>
      <div className="mt-2 space-y-2">
        {[
          { name: 'AgroMills Pvt Ltd', score: 94, otd: 'On-time 96%', quality: 'QC pass 99.2%' },
          { name: 'Premier Sugar Co.', score: 88, otd: 'On-time 91%', quality: 'QC pass 98.4%' },
          { name: 'Global Cocoa Imports', score: 76, otd: 'On-time 82%', quality: 'QC pass 96.1%' },
        ].map((s) => (
          <div
            key={s.name}
            className="rounded-md border border-white/[0.06] bg-white/[0.03] px-3 py-2.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-semibold text-white">{s.name}</span>
              <span className="font-display text-sm font-bold" style={{ color: theme.accentSoft }}>{s.score}</span>
            </div>
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/[0.08]">
              <div className="h-full rounded-full" style={{ width: `${s.score}%`, background: theme.accent }} />
            </div>
            <div className="mt-1.5 flex justify-between text-[14px] text-cream-100/50">
              <span>{s.otd}</span><span>{s.quality}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ Mobile Apps ============ */
function MobileDashboard({ theme }) {
  const apps = [
    { icon: Activity, name: 'BizPulse', sub: 'Owner Dashboard', stat: '₹23.4L', statL: "Today's revenue", trend: '↑ 12%' },
    { icon: ShieldQuestion, name: 'GateMaster', sub: 'Security', stat: '247', statL: 'Today entries', trend: '32 vendors' },
    { icon: ClipboardCheck, name: 'Franchise Audit', sub: 'SOP Audit', stat: '94%', statL: 'Avg SOP score', trend: '4 audits today' },
    { icon: TrendingUp, name: 'Van Sales', sub: 'Field App', stat: '₹4.2L', statL: 'Day collection', trend: '128 outlets' },
  ];

  return (
    <div className="p-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cream-100/50">
        UpWon Mobile · 4 Role-Specific Apps
      </p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {apps.map((a, i) => (
          <motion.div
            key={a.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.04] p-4"
          >
            {/* phone frame mini */}
            <div className="mx-auto mb-3 h-24 w-16 rounded-lg border border-white/15 bg-navy-975 p-1.5">
              <div className="absolute top-1.5 left-1/2 hidden h-0.5 w-4 -translate-x-1/2 rounded-full bg-white/20" />
              <div
                className="h-full w-full rounded-md p-1.5"
                style={{ background: `linear-gradient(180deg, ${theme.accent} 0%, ${theme.accentDark} 100%)` }}
              >
                <div className="grid h-5 w-5 place-items-center rounded bg-white/25">
                  <a.icon className="h-3 w-3 text-white" />
                </div>
                <div className="mt-1 h-0.5 w-9 rounded-full bg-white/40" />
                <div className="mt-1 h-0.5 w-6 rounded-full bg-white/25" />
                <div className="mt-1.5 grid grid-cols-2 gap-0.5">
                  <div className="h-2 rounded-sm bg-white/15" />
                  <div className="h-2 rounded-sm bg-white/15" />
                </div>
              </div>
            </div>
            <p className="text-center text-[14px] font-semibold text-white">{a.name}</p>
            <p className="mt-0.5 text-center text-[14px] text-cream-100/50">{a.sub}</p>
            <div className="mt-2 rounded-md bg-white/[0.05] p-2 text-center">
              <p className="font-display text-base font-bold" style={{ color: theme.accentSoft }}>{a.stat}</p>
              <p className="text-[14px] text-cream-100/50">{a.statL}</p>
              <p className="mt-1 text-[14px]" style={{ color: '#4CAF50' }}>{a.trend}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, subColor, accent }) {
  return (
    <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-3">
      <p className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-cream-100/50">{label}</p>
      <p className="font-display mt-1.5 text-lg font-bold text-white">{value}</p>
      <p className="mt-0.5 text-[14px]" style={{ color: subColor }}>{sub}</p>
    </div>
  );
}
