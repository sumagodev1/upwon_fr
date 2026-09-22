import { m as motion } from 'framer-motion';
import Container from '../shared/Container/Container.jsx';
import SectionHeading from '../shared/SectionHeading/SectionHeading.jsx';
import { INDUSTRIES } from '../../data/industries.js';

const SUITES = [
  { key: 'erp', label: 'Core ERP' },
  { key: 'sfa', label: 'SFA & DMS' },
  { key: 'pos', label: 'FMS · POS' },
  { key: 'hrms', label: 'HRMS' },
  { key: 'wms', label: 'WMS · Vendor' },
];

function Dot({ filled, variant = 'orange' }) {
  const filledCls = variant === 'orange' ? 'bg-orange-500' : 'bg-white';
  const emptyCls = variant === 'orange' ? 'bg-navy-200' : 'bg-white/30';
  return (
    <span
      className={`inline-block h-1.5 w-1.5 rounded-full ${
        filled ? filledCls : emptyCls
      }`}
    />
  );
}

function Cell({ level }) {
  const intensity = [
    'bg-white',
    'bg-orange-50',
    'bg-orange-200/70',
    'bg-orange-500',
  ][level];
  const border = level === 0 ? 'border-navy-100' : 'border-orange-300/60';
  const dotVariant = level === 3 ? 'white' : 'orange';
  const label = ['—', 'Applicable', 'High value', 'Core'][level];
  return (
    <div
      className={`flex flex-col items-center justify-center gap-1.5 border ${border} ${intensity} px-2 py-3.5 text-center transition-colors`}
      title={label}
    >
      <span className="flex gap-0.5">
        {[1, 2, 3].map((i) => (
          <Dot key={i} filled={i <= level} variant={dotVariant} />
        ))}
      </span>
      <span
        className={`hidden text-[9.5px] font-semibold uppercase tracking-[0.14em] sm:block ${
          level === 0
            ? 'text-navy-400'
            : level === 3
            ? 'text-white'
            : 'text-orange-700'
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export default function SuiteSectorMatrix() {
  return (
    <section className="relative overflow-hidden bg-white section-pad">
      <div className="absolute inset-0 grid-bg-light opacity-50" />

      <Container className="relative">
        <SectionHeading
          align="center"
          variant="light"
          eyebrow="Suite × Sector Suitability"
          title="Which UpWon suites your business needs — at a glance."
          description="Each vertical is calibrated to its operating realities. Use this matrix to see at-a-glance which suites carry the load for your sub-sector."
        />

        <div className="mt-14 overflow-x-auto">
          <div className="min-w-[560px] md:min-w-[760px] overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-enterprise">
            {/* Header */}
            <div className="grid grid-cols-[1.5fr_repeat(5,1fr)] gap-px bg-navy-100">
              <div className="bg-navy-950 px-5 py-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-400">
                  Sub-sector / Business
                </p>
              </div>
              {SUITES.map((s) => (
                <div key={s.key} className="bg-navy-950 px-3 py-4 text-center">
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Rows */}
            {INDUSTRIES.map((ind, i) => (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="grid grid-cols-[1.5fr_repeat(5,1fr)] gap-px bg-navy-100"
              >
                <div className="flex items-center gap-3 bg-white px-5 py-3">
                  <div className="grid h-8 w-8 place-items-center rounded-md border border-navy-100 bg-navy-50 text-orange-600">
                    <ind.icon className="h-4 w-4" />
                  </div>
                  <div className="leading-tight">
                    <p className="text-[14px] font-semibold text-navy-950">{ind.name}</p>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-navy-500">
                      {ind.tag}
                    </p>
                  </div>
                </div>
                {SUITES.map((s) => (
                  <div key={s.key} className="bg-white">
                    <Cell level={ind.suites[s.key] ?? 0} />
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[14px] text-navy-600">
          <span className="flex items-center gap-1.5">
            <span className="flex gap-0.5">
              <Dot filled />
              <Dot filled />
              <Dot filled />
            </span>
            Core requirement
          </span>
          <span className="flex items-center gap-1.5">
            <span className="flex gap-0.5">
              <Dot filled />
              <Dot filled />
              <Dot />
            </span>
            High value
          </span>
          <span className="flex items-center gap-1.5">
            <span className="flex gap-0.5">
              <Dot filled />
              <Dot />
              <Dot />
            </span>
            Applicable
          </span>
        </div>
      </Container>
    </section>
  );
}
