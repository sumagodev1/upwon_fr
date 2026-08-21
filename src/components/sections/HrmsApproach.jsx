import { m as motion } from 'framer-motion';
import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';

/*
  HRMS "UpWon's Approach" — the pivot. One HR system built for a manufacturing
  workforce shape from the start: multi-shift attendance, contract labour,
  a mixed workforce — not an office-first product adapted after the fact. A
  simple hub diagram: Factory Floor + Office + Franchise Outlets → one HR &
  payroll core.
*/

const EASE = [0.22, 1, 0.3, 1];

const ORANGE = '#E85A2A';
const BLUE = '#1D4ED8';

function Panel({ title, headerBg, img, accent, children }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-cream-300 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-enterprise">
      <div
        className="px-6 py-3 text-center text-[15px] font-extrabold uppercase tracking-[0.12em] text-white"
        style={{ background: headerBg }}
      >
        {title}
      </div>
      <img src={img} alt={title} loading="lazy" decoding="async" className="h-40 w-full object-cover" />
      <div className="p-6" style={{ '--dot': accent }}>
        {children}
      </div>
    </div>
  );
}

function Bullet({ children, accent }) {
  return (
    <li className="flex items-center gap-3 border-b border-cream-200 py-2.5 last:border-0">
      <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: accent }} />
      <span className="text-[14px] font-semibold text-navy-900">{children}</span>
    </li>
  );
}

export default function HrmsApproach() {
  return (
    <section className="relative overflow-hidden bg-[#f5f6fa] py-12 md:py-16">
      <Container>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <Eyebrow className="justify-center">UpWon&apos;s Approach</Eyebrow>
          <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            We Didn&apos;t Build HR Software for an Office.{' '}
            <span className="gradient-text-orange">
              We Built It for a Factory With an Office Attached.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            HREasy was designed around multi-shift attendance, contract labour compliance and a mixed
            workforce — not adapted from an office-first product after the fact.
          </p>
        </motion.div>

        {/* Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="relative mt-14"
        >
          {/* Top row — Factory | Hub | Office */}
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-12">
            <Panel title="Factory Floor" headerBg={ORANGE} img="/images/hrms_factory_floor.webp" accent={ORANGE}>
              <ul>
                <Bullet accent={ORANGE}>Multi-Shift Attendance</Bullet>
                <Bullet accent={ORANGE}>Biometric Tracking</Bullet>
                <Bullet accent={ORANGE}>Contract Labour Management</Bullet>
                <Bullet accent={ORANGE}>Compliance Ready</Bullet>
              </ul>
            </Panel>

            {/* Hub */}
            <div className="relative mx-auto">
              {/* connectors (desktop) — line + triangular arrowhead into the hub */}
              {/* Factory → hub (orange, points right) */}
              <div className="absolute right-full top-1/2 hidden w-12 -translate-y-1/2 items-center lg:flex">
                <span className="h-1 flex-1 rounded-full" style={{ background: ORANGE }} />
                <span
                  className="h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent"
                  style={{ borderLeftColor: ORANGE }}
                />
              </div>
              {/* Office → hub (blue, points left) */}
              <div className="absolute left-full top-1/2 hidden w-12 -translate-y-1/2 items-center lg:flex">
                <span
                  className="h-0 w-0 border-y-[7px] border-r-[11px] border-y-transparent"
                  style={{ borderRightColor: BLUE }}
                />
                <span className="h-1 flex-1 rounded-full" style={{ background: BLUE }} />
              </div>
              {/* Franchise → hub (blue, node at hub + line all the way down to the card) */}
              <div className="absolute left-1/2 top-full hidden h-[150px] -translate-x-1/2 flex-col items-center lg:flex">
                <span
                  className="h-3.5 w-3.5 shrink-0 rounded-full border-[3px] bg-white"
                  style={{ borderColor: BLUE }}
                />
                <span className="w-1 flex-1 rounded-full" style={{ background: BLUE }} />
              </div>

              <div className="rounded-full bg-gradient-to-r from-orange-500 to-blue-600 p-1.5">
                <div className="grid h-56 w-56 place-items-center rounded-full bg-navy-950 text-center md:h-64 md:w-64">
                  <div className="px-6">
                    <p className="h-display text-2xl tracking-tight">
                      <span className="text-orange-500">Up</span>
                      <span className="text-white">Won</span>
                    </p>
                    <p className="mt-2 text-lg font-extrabold leading-tight text-white">
                      HR &amp; PAYROLL
                      <br />
                      CORE
                    </p>
                    <p className="mt-3 text-[11px] font-semibold tracking-wide text-cream-100/70">
                      ONE WORKFORCE.
                      <br />
                      ONE SYSTEM.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Panel title="Office" headerBg={BLUE} img="/images/hrmsoffice.webp" accent={BLUE}>
              <ul>
                <Bullet accent={BLUE}>Employee Management</Bullet>
                <Bullet accent={BLUE}>Leave &amp; Attendance</Bullet>
                <Bullet accent={BLUE}>Payroll &amp; Claims</Bullet>
                <Bullet accent={BLUE}>Performance &amp; ESS</Bullet>
              </ul>
            </Panel>
          </div>

          {/* Franchise — below the hub */}
          <div className="mx-auto mt-16 max-w-3xl">
            <Panel title="Franchise Outlets" headerBg={BLUE} img="/images/hrms_franchiese.webp" accent={BLUE}>
              <ul className="grid grid-cols-2 gap-x-6 sm:grid-cols-4 sm:gap-x-4">
                <Bullet accent={BLUE}>Distributed Workforce</Bullet>
                <Bullet accent={BLUE}>Outlet Attendance</Bullet>
                <Bullet accent={BLUE}>Centralized Payroll</Bullet>
                <Bullet accent={BLUE}>Performance Visibility</Bullet>
              </ul>
            </Panel>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
