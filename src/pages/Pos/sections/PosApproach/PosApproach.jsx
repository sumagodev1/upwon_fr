import { Fragment } from 'react';
import { m as motion } from 'framer-motion';
import { Layers, ShoppingCart, Package, BarChart3 } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

/*
  POS "UpWon's Approach" — the pivot: a counter system that understands what's
  actually in the product. One sale flows through four connected stages on a
  single data core: Counter Sale → Recipe-Level Stock Deduction → Real Food Cost
  → Finance. Full-width statement + a simple followable diagram.
*/

const EASE = [0.22, 1, 0.3, 1];
const ORANGE = '#E85A2A';

const STAGES = [
  {
    n: '01',
    img: '/images/Counter%20Sale.webp',
    title: 'Counter Sale',
    desc: 'Billing completed in seconds at your counter.',
  },
  {
    n: '02',
    img: '/images/Recipe-Level%20Stock%20Deduction.webp',
    title: 'Recipe-Level Stock Deduction',
    desc: 'Real ingredients are consumed automatically.',
  },
  {
    n: '03',
    img: '/images/Real%20Food%20Cost.webp',
    title: 'Real Food Cost',
    desc: 'Know the actual cost of every sale instantly.',
  },
  {
    n: '04',
    img: '/images/Finance.webp',
    title: 'Finance & Business Insights',
    desc: 'Accurate profitability, reporting and decisions.',
  },
];

// Connector icon shown between consecutive stages.
const CONNECTORS = [ShoppingCart, Package, BarChart3];

function NumberBadge({ n }) {
  return (
    <span
      className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-black text-white"
      style={{ background: ORANGE }}
    >
      {n}
    </span>
  );
}

function StageHeader({ stage }) {
  return (
    <div className="flex items-start gap-3">
      <NumberBadge n={stage.n} />
      <div>
        <h3 className="text-[15px] font-bold leading-tight text-navy-950">{stage.title}</h3>
        <p className="mt-1 text-[14px] leading-snug text-navy-600">{stage.desc}</p>
      </div>
    </div>
  );
}

// Horizontal connector: a line with the stage's icon centered, at image height.
function Connector({ icon: Icon }) {
  return (
    <div className="flex w-20 shrink-0 items-center">
      <span className="h-[2px] flex-1" style={{ background: `${ORANGE}44` }} />
      <span
        className="mx-1 grid h-11 w-11 shrink-0 place-items-center rounded-full border bg-white"
        style={{ color: ORANGE, borderColor: `${ORANGE}33` }}
      >
        <Icon className="h-5 w-5" strokeWidth={1.9} />
      </span>
      <span className="h-[2px] flex-1" style={{ background: `${ORANGE}44` }} />
    </div>
  );
}

export default function PosApproach() {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      <Container>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-4xl text-center"
        >
          <Eyebrow className="justify-center">UpWon&apos;s Approach</Eyebrow>
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.08] tracking-tight text-navy-950">
            Your Counter, Talking to Your Kitchen and Your Stock —{' '}
            <span className="gradient-text-orange">Not Just Your Till.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            A sale at the counter deducts real recipe-level inventory, so food cost is a fact, not a
            monthly guess — and because it shares a data model with UpWon ERP and FMS, it&apos;s a
            foundation to grow on, not a system to outgrow.
          </p>

          {/* One Data Core pill */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-cream-100 px-6 py-3">
            <Layers className="h-6 w-6" style={{ color: ORANGE }} strokeWidth={1.9} />
            <span className="h-display text-xl tracking-tight" style={{ color: ORANGE }}>
              One Data Core
            </span>
          </div>
        </motion.div>

        {/* Flow diagram — desktop (aligned headers row + images/connectors row) */}
        <div className="mt-14 hidden lg:block">
          {/* headers */}
          <div className="flex">
            {STAGES.map((s, i) => (
              <Fragment key={`h-${s.n}`}>
                <div className="flex-1 px-3">
                  <StageHeader stage={s} />
                </div>
                {i < STAGES.length - 1 && <div className="w-20 shrink-0" />}
              </Fragment>
            ))}
          </div>
          {/* images + connectors */}
          <div className="mt-8 flex items-center">
            {STAGES.map((s, i) => (
              <Fragment key={`i-${s.n}`}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: EASE }}
                  className="flex-1 px-3"
                >
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    decoding="async"
                    className="mx-auto w-full max-w-[320px] object-contain"
                  />
                </motion.div>
                {i < STAGES.length - 1 && <Connector icon={CONNECTORS[i]} />}
              </Fragment>
            ))}
          </div>
        </div>

        {/* Flow — mobile stacked */}
        <div className="mt-12 space-y-8 lg:hidden">
          {STAGES.map((s) => (
            <div key={s.n}>
              <StageHeader stage={s} />
              <img
                src={s.img}
                alt={s.title}
                loading="lazy"
                decoding="async"
                className="mx-auto mt-4 w-full max-w-[280px] object-contain"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
