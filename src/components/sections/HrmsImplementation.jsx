import { useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';

/*
  HRMS "Implementation & Partnership" — addresses the specific fear of a payroll
  switch: any error hits real salaries immediately. A structured migration that
  protects payroll continuity, shown as a Clay-style carousel of the five stages
  with a tab rail beneath. The parallel-run practice is called out explicitly to
  de-risk the first live payroll cycle.
*/

const EASE = [0.22, 1, 0.3, 1];

const STAGES = [
  {
    label: 'Current-State Audit',
    title: 'Current-State Audit',
    desc: 'We analyze your existing processes, payroll structure, rules, integrations and compliance requirements.',
    card: '/images/hrms_audit.webp',
    icon: '/images/audit_hrms.webp',
  },
  {
    label: 'Data Migration',
    title: 'Data Migration & Parallel Run',
    desc: 'We migrate your data securely and run payroll in parallel with your current system to ensure 100% accuracy.',
    card: '/images/hrms_datamigration.webp',
    icon: '/images/datamigration_hrms.webp',
  },
  {
    label: 'Go-Live',
    title: 'Go-Live',
    desc: 'Once parallel-run results are validated and matched, we switch you to HREasy with complete confidence.',
    card: '/images/hrms_golive.webp',
    icon: '/images/golive__hrms.webp',
  },
  {
    label: 'First Payroll Cycle',
    title: 'First Payroll Cycle',
    desc: 'We process your first live payroll cycle with controlled checks and expert supervision.',
    card: '/images/hrms_payroll.webp',
    icon: '/images/payroll__hrms.webp',
  },
  {
    label: 'Ongoing Support',
    title: 'Ongoing Support',
    desc: 'Continuous payroll support, issue resolution and process optimization to ensure long-term success.',
    card: '/images/hrms_ongoingsupport.webp',
    icon: '/images/ongoingsupport__hrms.webp',
  },
];

const N = STAGES.length;
const mod = (n) => ((n % N) + N) % N;

function Strip({ stage, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="hidden w-[92px] shrink-0 overflow-hidden rounded-2xl md:block lg:w-[120px]"
      aria-label={stage.label}
    >
      <img src={stage.card} alt="" aria-hidden className="h-full w-full scale-[1.14] object-cover" />
    </button>
  );
}

export default function HrmsImplementation() {
  const [active, setActive] = useState(0);
  const cur = STAGES[active];

  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16">
      <Container>
        {/* Heading — big left headline, subtext on the right */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16"
        >
          <div>
            <Eyebrow>Implementation &amp; Partnership</Eyebrow>
            <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
              Switch Payroll Systems{' '}
              <span className="gradient-text-orange">Without Missing a Single Salary Cycle.</span>
            </h2>
          </div>

          <div>
            <p className="text-base leading-relaxed text-navy-600">
              A structured migration that protects the most sensitive part of any HR switch — payroll
              continuity. We run your new payroll in parallel with your existing system for a full
              cycle — so the first live salary run is reconciled and verified before a single employee
              is paid.
            </p>
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="mt-12">
          <div className="flex items-stretch justify-center gap-3">
            {/* Left peek */}
            <Strip stage={STAGES[mod(active - 2)]} onClick={() => setActive(mod(active - 2))} />
            <Strip stage={STAGES[mod(active - 1)]} onClick={() => setActive(mod(active - 1))} />

            {/* Centre */}
            <div className="relative aspect-[16/10] w-full max-w-3xl overflow-hidden rounded-3xl shadow-enterprise">
              <AnimatePresence>
                <motion.img
                  key={cur.card}
                  src={cur.card}
                  alt={cur.label}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1.03 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>

              {/* Readability scrim */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/25 to-transparent" />

              {/* Title + description overlay */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={cur.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="absolute inset-x-0 bottom-0 p-6 md:p-8"
                >
                  <h3 className="h-display text-2xl leading-tight tracking-tight text-white md:text-[1.9rem]">
                    {cur.title}
                  </h3>
                  <p className="mt-2 max-w-md text-[14px] leading-snug text-white/85 md:text-[15px]">
                    {cur.desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              <Link
                to="/demo"
                aria-label="Talk to an implementation specialist"
                className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-xl border border-white/25 bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25"
              >
                <ArrowUpRight className="h-5 w-5" />
              </Link>
            </div>

            {/* Right peek */}
            <Strip stage={STAGES[mod(active + 1)]} onClick={() => setActive(mod(active + 1))} />
            <Strip stage={STAGES[mod(active + 2)]} onClick={() => setActive(mod(active + 2))} />
          </div>

          {/* Tab rail */}
          <div className="mt-8 border-t border-cream-300 pt-6">
            <div className="grid grid-cols-5 gap-2 md:gap-4">
              {STAGES.map((s, i) => {
                const on = i === active;
                return (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => setActive(i)}
                    className="relative flex flex-col items-center gap-2.5 px-1 pt-3 text-center"
                  >
                    {on && (
                      <span className="absolute -top-[25px] h-2.5 w-2.5 rotate-45 rounded-[2px] bg-orange-500" />
                    )}
                    <img
                      src={s.icon}
                      alt=""
                      aria-hidden
                      className={`h-8 w-8 object-contain transition-opacity ${on ? 'opacity-100' : 'opacity-35'}`}
                    />
                    <span
                      className={`text-[11px] font-bold uppercase leading-tight tracking-[0.08em] transition-colors md:text-[13px] ${
                        on ? 'text-navy-950' : 'text-navy-400'
                      }`}
                    >
                      {s.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
