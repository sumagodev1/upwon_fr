import { m as motion, useReducedMotion } from 'framer-motion';
import {
  MapPin,
  ClipboardCheck,
  Warehouse,
  CalendarDays,
  TrendingUp,
  Users,
  Globe,
  LineChart,
} from 'lucide-react';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.2 };

const IMPROVEMENTS = [
  { title: 'Inventory visibility across locations', Icon: MapPin },
  { title: 'Order processing and fulfillment coordination', Icon: ClipboardCheck },
  { title: 'Warehouse and stock movement control', Icon: Warehouse },
  { title: 'Batch and expiry visibility', Icon: CalendarDays },
  { title: 'Replenishment planning', Icon: TrendingUp },
  { title: 'Distributor and channel coordination', Icon: Users },
  { title: 'Multi-location operational visibility', Icon: Globe },
  { title: 'Access to real-time business insights', Icon: LineChart },
];

// Two explicit columns so the list reads top-to-bottom down each side,
// the way a row-major grid would not.
const COLUMNS = [IMPROVEMENTS.slice(0, 4), IMPROVEMENTS.slice(4)];

export default function FmcgBenefitsSection() {
  const reduceMotion = useReducedMotion();

  const d = (value) => (reduceMotion ? 0 : value);
  const stagger = (value) => (reduceMotion ? 0 : value);

  /* ================= VARIANTS ================= */

  const contentGroup = {
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

  const imageVariants = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 1.04 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE } },
  };

  const listGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.07), delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: d(14) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-[#f7f8fa] py-12 sm:py-16 lg:py-20">
      {/* ================= BACKGROUND DECORATION ================= */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-180px] top-[100px] h-[420px] w-[420px] rounded-full bg-[#dce6f5]/50 blur-[120px]" />
        <div className="absolute bottom-[80px] right-[-180px] h-[420px] w-[420px] rounded-full bg-[#e8eefb]/60 blur-[120px]" />
      </div>

      {/* Full-bleed panel — steps outside the shared Container so the card
          spans the viewport rather than the 1440px content column. */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={contentGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto w-full max-w-[1660px] rounded-[24px] border border-navy-950/[0.07] bg-white p-4 shadow-[0_18px_55px_rgba(25,35,55,0.09)] sm:rounded-[28px] sm:p-6 lg:p-10 xl:p-12"
        >
          <div className="grid items-center gap-8 lg:grid-cols-[0.6fr_1.4fr] lg:gap-12 xl:gap-16">
            {/* ================= LEFT IMAGE ================= */}
            <motion.div
              variants={imageVariants}
              className="overflow-hidden rounded-[18px] sm:rounded-[22px]"
            >
              <img
                src="/images/benfit_sec.webp"
                alt="Cartons loaded onto a pallet truck beside a distribution vehicle"
                loading="lazy"
                decoding="async"
                className="block h-full min-h-[260px] w-full object-cover object-center sm:min-h-[340px] lg:min-h-[540px]"
              />
            </motion.div>

            {/* ================= RIGHT CONTENT ================= */}
            <div className="min-w-0">
              <motion.div variants={fadeIn}>
                <Eyebrow>BENEFITS SECTION</Eyebrow>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="mt-4 h-display text-[26px] leading-[1.15] tracking-tight text-navy-950 sm:text-[30px] lg:text-[32px]"
              >
                Greater Control Over Every Movement.{' '}
                <span className="gradient-text-orange">
                  Better Visibility Across Every Channel.
                </span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
              >
                With UpWon, FMCG distribution businesses can connect their core
                operations and reduce the complexity of managing fast-moving
                products across multiple teams and locations.
              </motion.p>

              <motion.h3
                variants={fadeUp}
                className="mt-7 h-display text-[17px] font-semibold text-navy-950 sm:text-[18px]"
              >
                Improve:
              </motion.h3>

              {/* ================= IMPROVEMENT LIST ================= */}
              <motion.div
                variants={listGroup}
                className="mt-3 grid sm:grid-cols-2 sm:gap-x-10"
              >
                {COLUMNS.map((column, columnIndex) => (
                  <ul
                    key={columnIndex}
                    className={`divide-y divide-navy-950/10 ${
                      columnIndex === 1
                        ? 'border-t border-navy-950/10 sm:border-t-0'
                        : ''
                    }`}
                  >
                    {column.map(({ title, Icon }) => (
                      <motion.li
                        key={title}
                        variants={itemVariants}
                        className="flex items-center gap-3.5 py-3.5"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-900 text-white">
                          <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                        </span>

                        <span className="min-w-0 text-[13.5px] leading-snug text-navy-700 sm:text-sm">
                          {title}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      
    </section>
  );
}

