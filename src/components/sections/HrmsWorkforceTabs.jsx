import { useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Factory,
  Store,
  MapPin,
  Building2,
  Check,
  Fingerprint,
  CalendarClock,
  ShieldCheck,
  BarChart3,
  Wallet,
  UserCog,
  WifiOff,
  Smartphone,
  Clock,
  UserRound,
  Target,
} from 'lucide-react';
import Container from '../ui/Container.jsx';

/*
  HRMS "Built for Every Kind of Employee" — proves depth per workforce type
  instead of treating 'employee' as one undifferentiated category. A tabbed
  deep-dive: Plant & Factory, Franchise & Outlet, Field & Distribution, and
  Corporate & Office — each with its own role-specific experience, all on one
  HRMS. Each tab shows a photo+dashboard, its capabilities, a phone mock and a
  quick-benefit strip in the workforce's accent colour.
*/

const EASE = [0.22, 1, 0.3, 1];

const WORKFORCES = [
  {
    key: 'plant',
    tab: 'Plant & Factory',
    icon: Factory,
    color: '#E85A2A',
    heading: 'Plant & Factory Workforce',
    left: '/images/plant1.webp',
    phone: '/images/plant2.webp',
    features: [
      { t: 'Biometric & Geo Attendance', d: 'Accurate attendance from the shop floor with biometric and geo-fencing.' },
      { t: 'Multi-Shift Rostering', d: 'Create, manage and communicate complex shift patterns with ease.' },
      { t: 'Contract Labour Compliance', d: 'Track contract workers, documentation and compliance in one place.' },
      { t: 'Real-time Visibility', d: 'Live dashboards for attendance, overtime and labour productivity.' },
    ],
    strip: [
      { icon: Fingerprint, t: 'Biometric Attendance', d: 'Accurate from the shop floor.' },
      { icon: CalendarClock, t: 'Multi-Shift Ready', d: 'Complex rosters made simple.' },
      { icon: ShieldCheck, t: 'Contract Compliant', d: 'Factories Act & contract labour.' },
      { icon: BarChart3, t: 'Real-time Visibility', d: 'Live shop-floor dashboards.' },
    ],
  },
  {
    key: 'franchise',
    tab: 'Franchise & Outlet',
    icon: Store,
    color: '#8B5CF6',
    heading: 'Franchise & Outlet Workforce',
    left: '/images/franchiese1.webp',
    phone: '/images/franchiese2.webp',
    features: [
      { t: 'Distributed Attendance', d: 'Manage attendance across multiple outlets with location tagging and shift alignment.' },
      { t: 'Multi-Location Payroll', d: 'Run payroll for all outlets with different policies, pay cycles and compliance.' },
      { t: 'Outlet-wise Reports', d: 'Real-time visibility into attendance, labour cost and productivity by outlet.' },
      { t: 'Role-based Access', d: 'Give outlet managers the right access to manage their teams independently.' },
    ],
    strip: [
      { icon: Store, t: 'Multi-Outlet Ready', d: 'One system across every outlet.' },
      { icon: MapPin, t: 'Location-Tagged', d: 'Accurate check-ins by outlet.' },
      { icon: Wallet, t: 'Outlet-wise Payroll', d: 'Different policies, one run.' },
      { icon: UserCog, t: 'Role-Based Access', d: 'Managers see only their outlet.' },
    ],
  },
  {
    key: 'field',
    tab: 'Field & Distribution',
    icon: MapPin,
    color: '#16A34A',
    heading: 'Field & Distribution Workforce',
    left: '/images/field1.webp',
    phone: '/images/field2.webp',
    features: [
      { t: 'Mobile-First Experience', d: 'Designed for employees who are always on the move.' },
      { t: 'Geo & Location Attendance', d: 'Accurate attendance with geofencing and location tagging.' },
      { t: 'Route & Visit Management', d: 'Plan routes, track visits and capture real-time activity in the field.' },
      { t: 'Self-Service on the Go', d: 'Apply leave, view payslip, mark attendance and more — anytime, anywhere.' },
    ],
    strip: [
      { icon: WifiOff, t: 'Works Offline', d: 'Syncs when back online.' },
      { icon: Smartphone, t: 'Lightweight App', d: 'Low data usage, high performance.' },
      { icon: ShieldCheck, t: 'Secure & Compliant', d: 'Enterprise-grade security.' },
      { icon: Clock, t: 'Real-time Visibility', d: "Know what's happening, always." },
    ],
  },
  {
    key: 'corporate',
    tab: 'Corporate & Office',
    icon: Building2,
    color: '#3B82F6',
    heading: 'Corporate & Office Workforce',
    left: '/images/corporate1.webp',
    phone: '/images/corporate2.webp',
    features: [
      { t: 'Complete Employee Self-Service', d: 'Empower employees to manage attendance, leaves, documents and more.' },
      { t: 'Performance Management', d: 'Set goals, track progress, give feedback and drive performance.' },
      { t: 'Expense Management', d: 'Submit, approve and track expenses with policy compliance.' },
      { t: 'Document & Policy Access', d: 'Access company policies, documents and important updates in one place.' },
    ],
    strip: [
      { icon: UserRound, t: 'All-in-One Self Service', d: 'Everything employees need, at their fingertips.' },
      { icon: Target, t: 'Performance Driven', d: 'Align goals, track progress, recognize impact.' },
      { icon: Wallet, t: 'Expense Made Simple', d: 'Easy submissions, approvals and reimbursements.' },
      { icon: ShieldCheck, t: 'Secure & Compliant', d: 'Enterprise-grade security and policy compliance.' },
    ],
  },
];

const tint = (hex, a) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};

export default function HrmsWorkforceTabs() {
  const [active, setActive] = useState(0);
  const wf = WORKFORCES[active];

  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16">
      <Container>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-orange-600">
            <Users className="h-4 w-4" />
            Built for Every Kind of Employee
          </p>
          <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            A Machine Operator and a Marketing Manager Don&apos;t Need the Same Login Experience.{' '}
            <span className="gradient-text-orange">They Need the Same System.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            HREasy adapts to every workforce with role-specific experiences, while keeping everyone
            connected on one powerful HRMS.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {WORKFORCES.map((w, i) => {
            const Icon = w.icon;
            const on = i === active;
            return (
              <button
                key={w.key}
                type="button"
                onClick={() => setActive(i)}
                className="relative flex items-center gap-3 overflow-hidden rounded-2xl border bg-white px-4 py-4 text-left transition-all"
                style={{ borderColor: on ? w.color : '#e6e3da' }}
              >
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                  style={{ background: tint(w.color, 0.1), color: w.color }}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.9} />
                </span>
                <span className="text-[15px] font-bold leading-tight text-navy-950">{w.tab}</span>
              </button>
            );
          })}
        </div>

        {/* Active panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={wf.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mt-6 rounded-3xl bg-white p-4 md:p-6"
          >
            <div className="grid items-center gap-6 lg:grid-cols-[1.05fr_1fr_0.7fr]">
              {/* Photo + dashboard card */}
              <img
                src={wf.left}
                alt={`${wf.heading} in the app`}
                loading="lazy"
                decoding="async"
                className="w-full rounded-2xl object-cover"
              />

              {/* Capabilities */}
              <div>
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                    style={{ background: tint(wf.color, 0.1), color: wf.color }}
                  >
                    <wf.icon className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <h3 className="h-display text-[1.5rem] leading-tight tracking-tight text-navy-950">
                    {wf.heading}
                  </h3>
                </div>

                <ul className="mt-6 space-y-5">
                  {wf.features.map((f) => (
                    <li key={f.t} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full"
                        style={{ background: tint(wf.color, 0.12), color: wf.color }}
                      >
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      <div>
                        <p className="text-[15px] font-bold text-navy-950">{f.t}</p>
                        <p className="mt-1 text-[14px] leading-snug text-navy-600">{f.d}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Phone */}
              <img
                src={wf.phone}
                alt={`${wf.heading} mobile app`}
                loading="lazy"
                decoding="async"
                className="mx-auto max-h-[460px] w-auto object-contain"
              />
            </div>

            {/* Quick-benefit strip */}
            <div
              className="mt-4 grid grid-cols-2 gap-y-6 rounded-2xl px-5 py-6 sm:grid-cols-4"
              style={{ background: tint(wf.color, 0.06) }}
            >
              {wf.strip.map(({ icon: Icon, t, d }, i) => (
                <div
                  key={t}
                  className={`flex items-start gap-3 px-4 ${
                    i > 0 ? 'sm:border-l sm:border-navy-900/10' : ''
                  }`}
                >
                  <span className="mt-0.5 shrink-0" style={{ color: wf.color }}>
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="text-[14px] font-bold text-navy-950">{t}</p>
                    <p className="mt-0.5 text-[13px] leading-snug text-navy-600">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
