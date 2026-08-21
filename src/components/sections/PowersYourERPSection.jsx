import { useState } from 'react';
import { m as motion } from 'framer-motion';
import {
  Truck,
  Store,
  Users,
  Warehouse,
  Smartphone,
  Network,
  ArrowRight,
  ArrowDown,
  Boxes,
  Layers,
  Plug,
} from 'lucide-react';
import Container from '../ui/Container.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';

// Host ERPs UpWon plugs into
const HOST_ERPS = [
  { name: 'SAP',             logo: 'https://cdn.simpleicons.org/sap/1B6FAE',          color: '#1B6FAE' },
  { name: 'Oracle NetSuite', logo: 'https://cdn.simpleicons.org/oracle/F80000',        color: '#F80000' },
  { name: 'MS Dynamics NAV', logo: 'https://cdn.simpleicons.org/microsoft/5E5E5E',     color: '#0078D4' },
  { name: 'TCS iON',         logo: null,                                               color: '#E31E24' },
  { name: 'Tally',           logo: null,                                               color: '#0F2C5A' },
  { name: 'Other ERPs',      logo: null,                                               color: '#2D3870', icon: Boxes },
];

function ErpChip({ erp, index }) {
  const [imgFailed, setImgFailed] = useState(false);
  const initials = erp.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();
  const showImg = erp.logo && !imgFailed;
  const Icon = erp.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      whileHover={{ y: -3 }}
      className="group relative flex shrink-0 cursor-default flex-col items-center justify-center gap-1.5 rounded-xl border border-navy-100 bg-white px-3 py-3 text-center shadow-sm transition-all duration-300 hover:border-navy-300"
    >
      <div
        className="grid h-9 w-9 place-items-center overflow-hidden rounded-md"
        style={showImg ? undefined : { backgroundColor: `${erp.color}14` }}
      >
        {showImg ? (
          <img
            src={erp.logo}
            alt={`${erp.name} logo`}
            loading="lazy" decoding="async"
            className="h-6 w-6 object-contain"
            onError={() => setImgFailed(true)}
          />
        ) : Icon ? (
          <Icon className="h-4 w-4" style={{ color: erp.color }} />
        ) : (
          <span
            className="font-display text-[14px] font-extrabold tracking-tight"
            style={{ color: erp.color }}
          >
            {initials}
          </span>
        )}
      </div>
      <p className="font-display text-[14px] font-semibold leading-tight text-navy-800">
        {erp.name}
      </p>
    </motion.div>
  );
}

const EXTENSIONS = [
  {
    icon: Truck,
    title: 'SFA & Secondary Sales',
    desc: 'Field sales · beat plans · secondary sales',
    tint: { iconBg: 'bg-teal-100', iconText: 'text-teal-600' },
  },
  {
    icon: Store,
    title: 'Franchise & POS',
    desc: 'Outlet ops · POS · hub-spoke ordering',
    tint: { iconBg: 'bg-pink-100', iconText: 'text-pink-600' },
  },
  {
    icon: Network,
    title: 'Distribution & DMS',
    desc: 'Distributor stock · claims · van sales',
    tint: { iconBg: 'bg-sky-100', iconText: 'text-sky-600' },
  },
  {
    icon: Users,
    title: 'HRMS & Payroll',
    desc: 'Biometric · payroll · ESS · statutory',
    tint: { iconBg: 'bg-emerald-100', iconText: 'text-emerald-600' },
  },
  {
    icon: Warehouse,
    title: 'Advanced WMS',
    desc: 'FEFO · barcode · live space tracking',
    tint: { iconBg: 'bg-amber-100', iconText: 'text-amber-700' },
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    desc: 'BizPulse · GateMaster · Van Sales · Audit',
    tint: { iconBg: 'bg-violet-100', iconText: 'text-violet-600' },
  },
];

export default function PowersYourERPSection() {
  return (
    <section className="relative overflow-hidden bg-slate-soft section-pad">
      <div className="absolute inset-0 grid-bg-light opacity-60" />

      <Container className="relative">
        <SectionHeading
          align="center"
          variant="light"
          eyebrow="Augment, Don't Replace"
          title={
            <>
              Keep your ERP. Add the food &amp; FMCG depth{' '}
              <span className="gradient-text-orange">it never had.</span>
            </>
          }
          description="UpWon plugs into the ERP you already run. No rip-and-replace. No migration risk. Just the operational layer your business has been missing."
        />

        {/* 3-tier architecture stack — visualises the augment story */}
        <div className="relative mx-auto mt-12 max-w-5xl">
          {/* Vertical connector line running through the centre (desktop) */}
          <div className="pointer-events-none absolute left-1/2 top-[68px] hidden h-[calc(100%-160px)] w-px -translate-x-1/2 bg-gradient-to-b from-navy-300 via-orange-400 to-navy-200 lg:block" />

          {/* TIER 1 — Your ERP keeps running */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-2xl border border-navy-100 bg-white p-5 shadow-sm md:p-6"
          >
            <div className="flex items-center gap-3 md:flex-row">
              <div className="flex shrink-0 items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-navy-100 text-navy-700">
                  <Layers className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy-500">
                    Tier 1
                  </p>
                  <p className="font-display text-lg font-bold leading-tight text-navy-950 md:text-xl">
                    Keep your ERP running
                  </p>
                </div>
              </div>

              {/* ERP logos — horizontally scrollable on mobile, inline on desktop */}
              <div className="ml-auto flex-1 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex w-max items-stretch justify-end gap-2 md:gap-2.5">
                  {HOST_ERPS.map((erp, i) => (
                    <ErpChip key={erp.name} erp={erp} index={i} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* CONNECTOR — animated arrow flowing down */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{ transformOrigin: 'top' }}
            className="my-3 flex justify-center"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-orange-300 bg-white shadow-sm">
              <ArrowDown className="h-3.5 w-3.5 text-orange-600" />
            </div>
          </motion.div>

          {/* TIER 2 — UpWon connector layer (the bridge) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="shine-effect relative rounded-2xl border border-orange-500/40 bg-gradient-to-br from-orange-500 to-orange-600 p-5 text-white shadow-glow-orange md:p-6"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/15 blur-2xl" />

            <div className="relative flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/20 text-white backdrop-blur">
                  <Plug className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-100">
                    Tier 2
                  </p>
                  <p className="font-display text-xl font-bold leading-tight md:text-2xl">
                    UpWon plugs in — no rip-and-replace
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 md:justify-end">
                {['Real-time sync', 'Master data unified', 'Pre-built connectors'].map(
                  (b) => (
                    <span
                      key={b}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[14px] font-semibold backdrop-blur"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      {b}
                    </span>
                  ),
                )}
              </div>
            </div>
          </motion.div>

          {/* CONNECTOR — second arrow */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ transformOrigin: 'top' }}
            className="my-3 flex justify-center"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-orange-300 bg-white shadow-sm">
              <ArrowDown className="h-3.5 w-3.5 text-orange-600" />
            </div>
          </motion.div>

          {/* TIER 3 — What UpWon adds on top */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-2xl border border-cream-300 bg-white p-5 shadow-sm md:p-6"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-orange-100 text-orange-600">
                <Boxes className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600">
                  Tier 3
                </p>
                <p className="font-display text-lg font-bold leading-tight text-navy-950 md:text-xl">
                  The food &amp; FMCG depth your ERP never had
                </p>
              </div>
            </div>

            {/* Extension cards — compact, focused on names */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {EXTENSIONS.map((e, i) => (
                <motion.div
                  key={e.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{
                    duration: 0.45,
                    delay: 0.3 + (i % 3) * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -3 }}
                  className="group flex items-start gap-3 rounded-xl border border-cream-300 bg-cream-100/40 p-4 transition-all duration-300 hover:border-orange-500/30 hover:bg-white hover:shadow-sm"
                >
                  <div
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg transition-all duration-300 group-hover:scale-110 ${e.tint.iconBg} ${e.tint.iconText}`}
                  >
                    <e.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-[15px] font-bold leading-tight text-navy-950 md:text-base">
                      {e.title}
                    </p>
                    <p className="mt-1 text-[14px] leading-snug text-navy-500">
                      {e.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Closing CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-8 flex max-w-5xl flex-col items-start gap-3 rounded-2xl border border-orange-300 bg-gradient-to-br from-orange-50 to-orange-100/40 p-5 shadow-sm md:flex-row md:items-center md:justify-between md:p-6"
        >
          <p className="max-w-2xl text-[14px] text-navy-900 md:text-[15px]">
            <span className="font-semibold">Your ERP investment stays.</span>{' '}
            UpWon plugs in and gives you the operational depth your food
            business actually runs on.
          </p>
          <a href="/contact" className="btn-primary shrink-0 !text-[14px]">
            Discuss your ERP setup
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
