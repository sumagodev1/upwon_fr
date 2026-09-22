import { m as motion, useReducedMotion } from 'framer-motion';
import {
  Boxes,
  ShoppingCart,
  Factory,
  ShieldCheck,
  Package,
  Warehouse,
  ClipboardCheck,
  BarChart3,
} from 'lucide-react';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

const CAPABILITIES = [
  {
    number: '01',
    title: 'Centralized Raw Material & Inventory Control',
    description:
      'Get a clearer view of raw materials, ingredients, packaging materials, work-in-process items, finished products, and stock movement across processing locations and warehouses.',
    Icon: Boxes,
  },
  {
    number: '02',
    title: 'Connected Procurement Workflows',
    description:
      'Bring supplier requirements, purchasing activity, incoming materials, inspection touchpoints, and inventory availability closer together.',
    Icon: ShoppingCart,
  },
  {
    number: '03',
    title: 'Production & Processing Management',
    description:
      'Connect production requirements, material availability, processing activities, and finished-product movement with better visibility across operational workflows.',
    Icon: Factory,
  },
  {
    number: '04',
    title: 'Quality Inspection & Operational Compliance',
    description:
      'Maintain connected visibility across quality inspection touchpoints, product records, and operational requirements throughout procurement and production.',
    Icon: ShieldCheck,
  },
  {
    number: '05',
    title: 'Batch & Product Movement Visibility',
    description:
      'Maintain clearer visibility as materials and products move through processing, storage, warehouse, dispatch, and distribution workflows.',
    Icon: Package,
  },
  {
    number: '06',
    title: 'Warehouse & Storage Operations',
    description:
      'Support day-to-day activities including material receipt, storage, transfers, stock tracking, picking, dispatch, and product movement.',
    Icon: Warehouse,
  },
  {
    number: '07',
    title: 'Smarter Sales & Order Management',
    description:
      'Manage customer and channel orders through connected workflows with greater visibility from order processing to fulfillment.',
    Icon: ClipboardCheck,
  },
  {
    number: '08',
    title: 'Real-Time Business Insights',
    description:
      'Access dashboards and reports that provide visibility into procurement, inventory, production, stock movement, sales, location activity, and overall business operations.',
    Icon: BarChart3,
  },
];

export default function SpicesAgroCoreCapabilities() {
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

  const panelVariants = {
    hidden: { opacity: 0, y: d(24) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };

  const itemsGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.06), delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: d(14) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-[#fdfaf6] py-12 sm:py-16 lg:py-20">
      {/* ================= BACKGROUND ================= */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/images/agro_core_capability_back.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1700px] px-4 sm:px-6 lg:px-8">
        {/* The panel sits on the artwork, so the spices and leaves frame it */}
        <motion.div
          variants={panelVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="rounded-[22px] bg-navy-950 px-6 py-8 shadow-[0_24px_60px_rgba(15,21,53,0.28)] sm:px-8 sm:py-10 lg:px-10"
        >
          <div className="grid gap-8 lg:grid-cols-[0.34fr_1.66fr] lg:gap-10">
            {/* ================= LEFT — COPY ================= */}
            <motion.div
              variants={group}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="min-w-0 lg:border-r lg:border-white/10 lg:pr-8"
            >
              <motion.div variants={fadeIn}>
                <Eyebrow variant="dark">CORE CAPABILITIES</Eyebrow>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="mt-4 h-display text-[26px] leading-[1.14] tracking-tight text-white sm:text-[30px] lg:text-[32px]"
              >
                Built to Power Every Step of Your{' '}
                <span className="text-orange-500">
                  Spices &amp; Agro Processing Business
                </span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-4 text-[14px] leading-relaxed text-white/70 sm:text-[15px]"
              >
                End-to-end capabilities to simplify operations, improve
                visibility, and support the growth of your spices and
                agro-processing business.
              </motion.p>
            </motion.div>

            {/* ================= RIGHT — CAPABILITIES ================= */}
            {/* Hairlines between the columns and rows, as in the layout */}
            <motion.div
              variants={itemsGroup}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="grid min-w-0 auto-rows-fr gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-4 xl:gap-x-0 xl:gap-y-0"
            >
              {CAPABILITIES.map(
                ({ number, title, description, Icon }, index) => (
                  <motion.article
                    key={number}
                    variants={itemVariants}
                    className={`flex min-w-0 gap-3.5 xl:px-5 xl:py-5 ${
                      index % 4 === 0 ? '' : 'xl:border-l xl:border-white/10'
                    } ${index >= 4 ? 'xl:border-t xl:border-white/10' : ''}`}
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.07]">
                      <Icon
                        className="h-5 w-5 text-orange-400"
                        strokeWidth={1.6}
                      />
                    </span>

                    <div className="min-w-0">
                      <p className="h-display text-[17px] font-bold leading-none text-orange-500">
                        {number}
                      </p>

                      <h3 className="mt-1.5 h-display text-[13.5px] font-semibold leading-snug text-white">
                        {title}
                      </h3>

                      <p className="mt-2 text-[11.5px] leading-relaxed text-white/65">
                        {description}
                      </p>
                    </div>
                  </motion.article>
                )
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
