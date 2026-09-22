import { m as motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.15 };

const WORKFLOWS = [
  'Procurement & Purchasing',
  'Product & Inventory Management',
  'Production Management',
  'Warehouse Operations',
  'Sales & Order Management',
  'Distributor Management',
  'Field Sales Operations',
  'Retail & Market Execution',
  'Distribution & Dispatch',
  'Returns Management',
  'Multi-Location Operations',
  'Finance & Reporting',
];

export default function NonFoodFmcgHowUpwonHelps() {
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
    hidden: { opacity: 0, x: d(-16) },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.96 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
      <Container className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* ================= LEFT — COPY + WORKFLOWS ================= */}
          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="min-w-0"
          >
            <motion.div variants={fadeIn}>
              <Eyebrow>HOW UPWON HELPS</Eyebrow>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
            >
              One <span className="gradient-text-orange">Connected Platform</span>{' '}
              for Your Non-Food FMCG Operations
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
            >
              UpWon connects the key workflows behind non-food FMCG
              businesses—helping teams manage the movement of products, orders,
              inventory, information, people, and operations through one unified
              platform.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-7 h-display text-[15px] font-semibold text-navy-950 sm:text-base"
            >
              Connected workflows across:
            </motion.p>

            {/* Twelve items would run long in a single column, so they split
                into two from sm up. */}
            <motion.ul
              variants={listGroup}
              className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2"
            >
              {WORKFLOWS.map((workflow) => (
                <motion.li
                  key={workflow}
                  variants={itemVariants}
                  className="flex items-start gap-2.5"
                >
                  <CheckCircle2
                    className="mt-[2px] h-[18px] w-[18px] shrink-0 text-orange-500"
                    strokeWidth={2}
                  />

                  <span className="min-w-0 text-[13.5px] leading-snug text-navy-700 sm:text-[14px]">
                    {workflow}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* ================= RIGHT — DASHBOARD ================= */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="min-w-0"
          >
            <img
              src="/images/non_fmcg_how_upwon_helps.webp"
              alt="UpWon dashboard showing product, inventory, order and distribution activity"
              width={1536}
              height={1024}
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
