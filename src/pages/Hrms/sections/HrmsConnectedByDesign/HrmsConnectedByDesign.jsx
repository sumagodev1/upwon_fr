import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Fingerprint,
  Wallet,
  TrendingUp,
  Boxes,
  Users,
  BarChart3,
  ShieldCheck,
  Network,
  ArrowRight,
} from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';

/*
  HRMS "Connected by Design" — makes the ERP-connection story concrete: Attendance
  → Payroll → Labour Cost is a component that CAN sit alongside Production Cost in
  the shared UpWon data model. Framed as a connection PATH (verify before it's a
  live integration claim), per the brief. Built as a flow diagram, no imagery.
*/

const EASE = [0.22, 1, 0.3, 1];

const BLUE = '#2563EB';
const ORANGE = '#E85A2A';
const GREEN = '#16A34A';

function Op({ children }) {
  return (
    <div className="flex shrink-0 items-center justify-center py-1 text-2xl font-light text-orange-500 lg:py-0">
      {children}
    </div>
  );
}

function FlowCard({ icon: Icon, iconTint, iconColor, title, subtitle, stats, badge }) {
  return (
    <div className="flex-1 rounded-2xl border border-cream-300 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-enterprise">
      <span
        className="grid h-11 w-11 place-items-center rounded-xl"
        style={{ background: iconTint, color: iconColor }}
      >
        <Icon className="h-5 w-5" strokeWidth={1.9} />
      </span>
      <p className="mt-4 text-[12px] font-bold uppercase tracking-[0.14em] text-navy-950">{title}</p>
      <p className="mt-1.5 text-[13px] leading-snug text-navy-500">{subtitle}</p>

      <div className="mt-4 space-y-3 border-t border-cream-200 pt-4">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="num-display text-2xl" style={{ color: s.color }}>
              {s.value}
            </p>
            <p className="text-[12px] text-navy-500">{s.label}</p>
          </div>
        ))}
        {badge && (
          <span
            className="inline-block rounded-md px-2.5 py-1 text-[11px] font-semibold"
            style={{ background: 'rgba(22,163,74,0.1)', color: GREEN }}
          >
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}

function MiniCard({ icon: Icon, label, highlight }) {
  return (
    <div
      className={`flex flex-1 flex-col items-center justify-center gap-2 rounded-xl px-2 py-4 text-center ${
        highlight ? 'bg-orange-500' : 'bg-white/[0.06]'
      }`}
    >
      <Icon className="h-6 w-6" strokeWidth={1.8} />
      <span className="text-[11px] font-bold uppercase leading-tight tracking-[0.1em]">{label}</span>
    </div>
  );
}

export default function HrmsConnectedByDesign() {
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
          <p className="flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-orange-600">
            <Network className="h-4 w-4" />
            Connected by Design
          </p>
          <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            Your HR Data, Sitting Next to Your Production Data —{' '}
            <span className="gradient-text-orange">Not in a Separate System.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            Because HREasy shares the same data model with UpWon ERP, labour cost has a real path to
            sit alongside production cost.
          </p>
        </motion.div>

        {/* Flow diagram */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mt-12 flex flex-col items-stretch gap-3 lg:flex-row"
        >
          <FlowCard
            icon={Fingerprint}
            iconTint="rgba(232,90,42,0.12)"
            iconColor={ORANGE}
            title="Attendance"
            subtitle="Capture every work hour"
            stats={[
              { value: '248', label: 'Employees', color: BLUE },
              { value: '18,420', label: 'Total Hours', color: ORANGE },
            ]}
          />

          <Op>+</Op>

          <FlowCard
            icon={Wallet}
            iconTint="rgba(37,99,235,0.12)"
            iconColor={BLUE}
            title="Payroll"
            subtitle="Process payroll accurately"
            stats={[{ value: '₹ 42.8 L', label: 'Monthly Payroll', color: BLUE }]}
          />

          <Op>+</Op>

          <FlowCard
            icon={TrendingUp}
            iconTint="rgba(22,163,74,0.12)"
            iconColor={GREEN}
            title="Labour Cost"
            subtitle="Convert payroll into true labour cost"
            stats={[{ value: '₹ 231', label: 'Cost per Hour', color: GREEN }]}
            badge="Department / Unit wise"
          />

          <Op>=</Op>

          {/* Dark ERP card */}
          <div className="rounded-2xl bg-navy-950 p-6 text-white lg:flex-[1.6]">
            <p className="text-center text-xl font-extrabold tracking-tight">
              Up<span className="text-orange-500">Won</span> ERP
            </p>
            <p className="mt-1 text-center text-[13px] text-cream-100/55">
              Unified Business Data Model
            </p>

            <div className="mt-5 flex items-stretch gap-2">
              <MiniCard icon={Boxes} label="Material Cost" />
              <div className="flex items-center text-lg font-light text-cream-100/50">+</div>
              <MiniCard icon={Users} label="Labour Cost" highlight />
              <div className="flex items-center text-lg font-light text-cream-100/50">=</div>
              <MiniCard icon={BarChart3} label="Production Cost" />
            </div>

            <p className="mt-5 text-center text-[15px] font-semibold">
              Labour + Material = True Production Cost
            </p>
            <p className="text-center text-[13px] text-cream-100/55">
              One source of truth. One version of data.
            </p>
          </div>
        </motion.div>

        {/* Verify note */}
        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-cream-300 bg-cream-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-orange-500/10 text-orange-600">
              <ShieldCheck className="h-5 w-5" strokeWidth={1.9} />
            </span>
            <div>
              <p className="text-[14px] font-bold text-navy-900">
                This is a data model connection path.
              </p>
              <p className="text-[13px] text-navy-600">
                Verify current reporting depth before publishing as a live integration claim.
              </p>
            </div>
          </div>
          <Link
            to="/products/erp"
            className="group inline-flex shrink-0 items-center gap-1.5 text-[14px] font-semibold text-orange-600"
          >
            Learn more about our data model
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
