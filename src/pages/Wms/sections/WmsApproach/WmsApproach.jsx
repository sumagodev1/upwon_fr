import { m as motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

/*
  WMS "UpWon's Approach" — the pivot. Food-grade warehouse logic is the
  foundation, not an add-on: FEFO putaway, batch traceability and temperature
  zones are core to the design. A large editorial statement on the left, and a
  simple four-step flow on the right — Receiving → FEFO Putaway → Zone-Aware
  Storage → Batch-Traceable Dispatch.
*/

const EASE = [0.22, 1, 0.3, 1];

const STEPS = [
  {
    num: '01',
    title: 'Receiving',
    desc: 'Goods arrive. Batch captured from day one.',
    img: '/images/reciving.webp',
  },
  {
    num: '02',
    title: 'FEFO Putaway',
    desc: 'The earliest-expiring stock gets the right location first.',
    img: '/images/fefo_putaway.webp',
  },
  {
    num: '03',
    title: 'Zone-Aware Storage',
    desc: 'Inventory knows where it belongs.',
    img: '/images/zonw_aware_storage.webp',
  },
  {
    num: '04',
    title: 'Batch-Traceable Dispatch',
    desc: 'Every outbound item can be traced back. Batch → Order → Customer.',
    img: '/images/batch_tracable.webp',
  },
];

function Step({ s, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: i * 0.35, ease: EASE }}
      className="group flex-1"
    >
      <div className="flex h-44 w-full items-center justify-center overflow-hidden rounded-xl border border-cream-200 bg-white p-4">
        <img
          src={s.img}
          alt={s.title}
          loading="lazy"
          decoding="async"
          className="max-h-full w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mt-4 flex min-h-[3.75rem] items-start gap-2.5">
        <span className="num-display text-2xl text-orange-500">{s.num}</span>
        <h3 className="text-[15px] font-extrabold uppercase leading-tight tracking-[0.06em] text-navy-950">
          {s.title}
        </h3>
      </div>

      <p className="text-[14px] leading-snug text-navy-600">{s.desc}</p>
    </motion.div>
  );
}

export default function WmsApproach() {
  return (
    <section className="relative overflow-hidden bg-[#f5f6fa] py-12 md:py-16">
      <div className="mx-auto max-w-[1720px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-16">
          {/* Statement */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Eyebrow>UpWon&apos;s Approach</Eyebrow>
            <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
              We Built the Warehouse App Around{' '}
              <span className="gradient-text-orange">Domain Needs.</span>
            </h2>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-navy-600">
              FEFO putaway, batch traceability and temperature-zone management are core to UpWon
              WMS&apos;s design, not retrofitted.
            </p>
          </motion.div>

          {/* Flow */}
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-3">
            {STEPS.map((s, i) => (
              <div key={s.num} className="flex flex-1 items-start gap-3">
                <Step s={s} i={i} />
                {i < STEPS.length - 1 && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.35 }}
                    className="mt-16 hidden shrink-0 text-cream-400 sm:block"
                  >
                    <ArrowRight className="h-6 w-6" strokeWidth={1.5} />
                  </motion.span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
