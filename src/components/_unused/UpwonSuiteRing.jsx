import { m as motion } from 'framer-motion';
import Container from '../shared/Container/Container.jsx';
import Eyebrow from '../shared/Eyebrow/Eyebrow.jsx';

// "Seven platforms. One UpWon." — a segmented cycle ring (à la a customer-
// journey wheel): a coloured donut with each platform's icon on the ring, its
// label radiating outward, and the UpWon mark in the centre.

const EASE = [0.16, 1, 0.3, 1];

// Ring order, clockwise from the top.
const MODULES = [
  { id: 'sfa', name: 'SFA-DMS', img: '/icons/SFA-DMS.svg', color: '#2563EB', desc: 'Beat plans, secondary sales and distributor stock on one live dashboard.' },
  { id: 'wms', name: 'WMS', img: '/icons/WMS.svg', color: '#0EA5E9', desc: 'FEFO putaway, expiry alerts and temperature zones — for perishable warehouses.' },
  { id: 'fms', name: 'FMS', img: '/icons/FMS-OPS.svg', color: '#10B981', desc: 'Franchise onboarding, royalty, outlet POS and Swiggy / Zomato — every store in sync.' },
  { id: 'vms', name: 'VMS', img: '/icons/VMS.svg', color: '#14B8A6', desc: 'Supplier onboarding, RFQs, PO confirmation and quality self-certification, in one place.' },
  { id: 'hrms', name: 'HRMS', img: '/icons/HRMS.svg', color: '#8B5CF6', desc: 'Multi-state payroll, biometric attendance, PF / ESIC / TDS — fully automated.' },
  { id: 'pos', name: 'POS', img: '/icons/POS.svg', color: '#6366F1', desc: 'Offline-first counter billing with native Swiggy, Zomato and loyalty in one tablet.' },
  { id: 'erp', name: 'ERP', img: '/icons/ERP.svg', color: '#E85A2A', desc: 'Finance, accounting, inventory, projects and compliance in one core.' },
];

const N = MODULES.length;
const SEG = 360 / N;
const GAP = 2.4; // white sliver between segments (deg)

// Build the coloured donut as a conic-gradient, each segment centred on its node.
const CONIC = (() => {
  const stops = [];
  for (let i = 0; i < N; i++) {
    const start = i * SEG;
    const end = (i + 1) * SEG;
    stops.push(`${MODULES[i].color} ${start}deg ${end - GAP}deg`);
    stops.push(`#ffffff ${end - GAP}deg ${end}deg`);
  }
  return `conic-gradient(from ${-SEG / 2}deg, ${stops.join(', ')})`;
})();

// Node + label geometry (percentages of the square wheel).
const NODE_R = 34;
const LABEL_R = 52;

function polar(angleDeg, r) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: 50 + r * Math.sin(a), y: 50 - r * Math.cos(a) };
}

export default function UpwonSuiteRing() {
  return (
    <section className="relative overflow-hidden bg-white section-pad">
      <div className="pointer-events-none absolute inset-0 grid-bg-light opacity-40" />

      <Container className="relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <Eyebrow>The UpWon Suite</Eyebrow>
 <h2 className="mt-3 h-display text-[36.8px] text-balance leading-[1.1] tracking-tight text-navy-950">
            Seven platforms. <span className="gradient-text-orange">One UpWon.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-base leading-relaxed text-navy-600">
            Every operational layer your food &amp; FMCG business runs on — connected around one
            core, on one database.
          </p>
        </motion.div>

        {/* Wheel — lg and up */}
        <div className="relative mx-auto mt-16 hidden aspect-square w-full max-w-[720px] lg:block">
          {/* Coloured donut */}
          <div
            className="absolute inset-[8%] rounded-full"
            style={{
              background: CONIC,
              WebkitMaskImage:
                'radial-gradient(circle, transparent 58%, #000 59%, #000 100%)',
              maskImage: 'radial-gradient(circle, transparent 58%, #000 59%, #000 100%)',
            }}
          />
          {/* Inner white disc + centre logo */}
          <div className="absolute left-1/2 top-1/2 flex h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_20px_60px_-30px_rgba(15,23,42,0.5)] ring-1 ring-slate-100">
            <img src="/icons/upwon_circle.png" alt="UpWon" className="h-[62%] w-[62%] object-contain" />
          </div>

          {/* Nodes + labels */}
          {MODULES.map((m, i) => {
            const angle = i * SEG;
            const node = polar(angle, NODE_R);
            const lab = polar(angle, LABEL_R);
            const dx = Math.sin((angle * Math.PI) / 180);
            const dy = -Math.cos((angle * Math.PI) / 180);
            const tx = dx > 0.3 ? '0%' : dx < -0.3 ? '-100%' : '-50%';
            const ty = dy < -0.3 ? '-100%' : dy > 0.3 ? '0%' : '-50%';
            const align = dx > 0.3 ? 'left' : dx < -0.3 ? 'right' : 'center';
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: 0.15 + i * 0.08, ease: EASE }}
              >
                {/* Icon node sitting on the ring */}
                <div
                  className="absolute z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-slate-100"
                  style={{ left: `${node.x}%`, top: `${node.y}%`, boxShadow: `0 10px 30px -12px ${m.color}80` }}
                >
                  <img src={m.img} alt={m.name} className="h-8 w-8 object-contain" />
                </div>

                {/* Radiating label */}
                <div
                  className="absolute w-52"
                  style={{ left: `${lab.x}%`, top: `${lab.y}%`, transform: `translate(${tx}, ${ty})`, textAlign: align }}
                >
                  <p className="text-sm font-bold" style={{ color: m.color }}>
                    {m.name}
                  </p>
                  <p className="mt-1 text-[14px] leading-snug text-navy-600">{m.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stacked list — below lg (the wheel labels won't fit on small screens) */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:hidden">
          {MODULES.map((m) => (
            <div
              key={m.id}
              className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50"
                style={{ boxShadow: `0 8px 22px -12px ${m.color}90` }}
              >
                <img src={m.img} alt={m.name} className="h-7 w-7 object-contain" />
              </span>
              <div>
                <p className="text-[15px] font-bold" style={{ color: m.color }}>
                  {m.name}
                </p>
                <p className="mt-0.5 text-[14px] leading-relaxed text-navy-600">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
