import { m as motion, useReducedMotion } from 'framer-motion';
import {
  ShoppingCart,
  Package,
  ClipboardList,
  CookingPot,
  Store,
  Warehouse,
  TrendingUp,
  MapPin,
  Users,
  Truck,
  Receipt,
  PieChart,
  Link2,
} from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

const WORKFLOWS = [
  { label: 'Procurement & Purchasing', Icon: ShoppingCart },
  { label: 'Ingredient & Inventory Management', Icon: Package },
  { label: 'Recipe & Bill of Materials Management', Icon: ClipboardList },
  { label: 'Central Kitchen & Production Management', Icon: CookingPot },
  { label: 'Outlet & Store Operations', Icon: Store },
  { label: 'Warehouse Operations', Icon: Warehouse },
  { label: 'Sales & Order Management', Icon: TrendingUp },
  { label: 'Franchise & Multi-Location Operations', Icon: MapPin },
  { label: 'Workforce & Shift Management', Icon: Users },
  { label: 'Distribution & Dispatch', Icon: Truck },
  { label: 'Finance & Reporting', Icon: Receipt },
  { label: 'Business Performance Insights', Icon: PieChart },
];

export default function QsrHowUpwonHelps() {
  const reduceMotion = useReducedMotion();

  const d = (value) => (reduceMotion ? 0 : value);
  const stagger = (value) => (reduceMotion ? 0 : value);

  /* ================= VARIANTS ================= */

  const group = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.1), delayChildren: 0.05 },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.55, ease: EASE } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: d(16) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  const listGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.05), delayChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: d(14) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
    hover: { y: d(-4), transition: { duration: 0.25, ease: EASE } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
      <Container className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 xl:gap-14">
          {/* ================= LEFT — COPY + WORKFLOWS ================= */}
          <div className="min-w-0">
            <motion.div
              variants={group}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              <motion.div variants={fadeIn}>
                <Eyebrow>HOW UPWON HELPS</Eyebrow>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
              >
                One Connected Platform for Your{' '}
                <span className="gradient-text-orange">
                  QSR &amp; Franchise F&amp;B Operations
                </span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-4 max-w-xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
              >
                UpWon connects the key workflows behind multi-outlet and
                franchise-led food businesses—helping teams manage the movement
                of ingredients, products, inventory, orders, people,
                information, and operations through one unified platform.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="mt-7 h-display text-[16px] font-semibold text-navy-950 sm:text-[17px]"
              >
                Connected Workflows Across:
              </motion.p>
            </motion.div>

            {/* Twelve workflows, three across */}
            <motion.div
              variants={listGroup}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {WORKFLOWS.map(({ label, Icon }) => (
                <motion.div
                  key={label}
                  variants={itemVariants}
                  whileHover="hover"
                  className="flex min-w-0 flex-col rounded-[12px] border border-navy-950/[0.07] bg-white p-3.5 shadow-[0_6px_20px_rgba(25,35,55,0.05)] transition-shadow duration-300 hover:shadow-[0_12px_28px_rgba(25,35,55,0.1)]"
                >
                  <Icon className="h-6 w-6 text-orange-500" strokeWidth={1.6} />

                  <span className="mt-2.5 min-w-0 text-[13px] font-semibold leading-snug text-navy-950">
                    {label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Closing line, as in the layout */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="mt-7 flex items-center gap-4"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-500">
                <Link2 className="h-5 w-5 text-white" strokeWidth={2} />
              </span>

              <div className="min-w-0 border-l border-navy-950/[0.08] pl-4">
                <p className="h-display text-[15px] font-bold leading-snug text-navy-950">
                  All Workflows. One Platform.
                </p>

                <p className="mt-1 text-[13px] leading-snug text-navy-600">
                  Connect. Control. Grow.
                </p>
              </div>
            </motion.div>
          </div>

          {/* ================= RIGHT — APP ARTWORK ================= */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="min-w-0"
          >
            <img
              src="/images/qsr_how_upwon_help.webp"
              alt="The UpWon app showing outlets, orders, wastage, on-time dispatch and a weekly operations overview"
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
