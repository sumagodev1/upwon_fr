import { m as motion } from 'framer-motion';
import { ShieldCheck, MapPin, FileText } from 'lucide-react';
import Container from '../ui/Container.jsx';

/*
  HRMS "Secure, Compliant, Accountable" — addresses statutory compliance risk
  directly, the highest-stakes trust question in HR software.
*/

const EASE = [0.22, 1, 0.3, 1];

const ORANGE = '#E85A2A';
const BLUE = '#2563EB';
const GREEN = '#16A34A';
const PURPLE = '#7C3AED';

const CARDS = [
  {
    color: ORANGE,
    label: 'PF / ESI / PT / TDS Auto-Deduction',
    img: '/images/hrms_pf_deduction.webp',
  },
  {
    color: BLUE,
    label: 'Multi-State Statutory Support',
    img: '/images/hrms_multistate.webp',
  },
  {
    color: GREEN,
    label: 'ISO-Aligned Processes',
    img: '/images/hrms_iso.webp',
  },
  {
    color: PURPLE,
    label: 'CMMI Level 3 Process Rigour',
    img: '/images/hrms_cmmlevel.webp',
  },
];

const STATS = [
  { icon: MapPin, num: '29+', label: 'States / UTs Supported' },
  { icon: FileText, num: '50+', label: 'Statutory Laws Supported' },
  { icon: ShieldCheck, num: '100%', label: 'Compliance Focus' },
];

export default function HrmsSecurity() {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16">
      <Container>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="flex items-center justify-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-orange-600">
            <ShieldCheck className="h-4 w-4" />
            Secure, Compliant, Accountable
          </p>

          <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            PF, ESI, PT, TDS — Calculated Right,{' '}
            <span className="gradient-text-orange">
              Every Time, Every State.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            HREasy ensures statutory compliance with accuracy, automation and
            audit-ready reports across India.
          </p>
        </motion.div>
      </Container>

      {/* Cards */}
      <div className="mx-auto mt-12 grid max-w-[1560px] grid-cols-2 gap-5 px-4 sm:px-6 lg:grid-cols-[repeat(4,minmax(0,1fr))_1.6fr] lg:px-8">
        {CARDS.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.5,
              delay: i * 0.08,
              ease: EASE,
            }}
            className="flex flex-col items-center rounded-2xl border border-cream-300 bg-cream-100 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-enterprise"
          >
            <img
              src={c.img}
              alt=""
              aria-hidden
              className="w-full rounded-xl object-contain"
            />

            <span
              className="mt-6 block h-[3px] w-10 rounded-full"
              style={{ background: c.color }}
            />

            <p className="mt-6 text-base font-bold leading-snug text-navy-950">
              {c.label}
            </p>
          </motion.div>
        ))}

        {/* Statutory coverage card */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 0.5,
            delay: CARDS.length * 0.08,
            ease: EASE,
          }}
          className="col-span-2 flex flex-col justify-center rounded-2xl border border-cream-300 bg-cream-100 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-enterprise lg:col-span-1"
        >
          <p className="text-center text-[15px] font-bold text-navy-950">
            Statutory Coverage Across India
          </p>

          <span className="mx-auto mt-3 block h-[3px] w-8 rounded-full bg-orange-500" />

          <div className="mt-5 flex items-center gap-5">
            {/* Indian Map Image */}
            <div className="flex h-32 w-[110px] shrink-0 items-center justify-center">
              <img
                src="/images/hrms_indian_map.webp"
                alt="Statutory coverage across India"
                className="h-full w-full object-contain"
              />
            </div>

            {/* Stats */}
            <div className="flex-1 space-y-3">
              {STATS.map(({ icon: Icon, num, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <Icon className="h-4 w-4 shrink-0 text-navy-400" />

                  <p className="text-[14px] text-navy-700">
                    <span className="font-bold text-navy-950">{num}</span>{' '}
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}