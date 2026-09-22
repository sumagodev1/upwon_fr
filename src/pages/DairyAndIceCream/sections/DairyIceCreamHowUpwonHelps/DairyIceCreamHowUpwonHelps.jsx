import { m as motion, useReducedMotion } from 'framer-motion';
import {
  ShoppingCart,
  Milk,
  Cog,
  ClipboardList,
  ShieldCheck,
  ClipboardCheck,
  Package,
  Snowflake,
  Warehouse,
  ShoppingBag,
  Truck,
  MapPin,
  BarChart3,
} from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

const WORKFLOWS = [
  { label: 'Procurement & Purchasing', Icon: ShoppingCart },
  { label: 'Raw Material & Ingredient Management', Icon: Milk },
  { label: 'Production Management', Icon: Cog },
  { label: 'Recipe & Bill of Materials Management', Icon: ClipboardList },
  { label: 'Quality Inspection', Icon: ShieldCheck },
  { label: 'Batch Visibility', Icon: ClipboardCheck },
  { label: 'Inventory Management', Icon: Package },
  { label: 'Cold Storage Operations', Icon: Snowflake },
  { label: 'Warehouse Operations', Icon: Warehouse },
  { label: 'Sales & Order Management', Icon: ShoppingBag },
  { label: 'Distribution & Dispatch', Icon: Truck },
  { label: 'Multi-Location Operations', Icon: MapPin },
  { label: 'Finance & Reporting', Icon: BarChart3 },
];

// Two explicit columns so the list reads top-to-bottom down each side, the
// way a row-major grid would not. Thirteen does not divide evenly, so the
// last one sits centred beneath the two columns of six.
const COLUMNS = [WORKFLOWS.slice(0, 6), WORKFLOWS.slice(6, 12)];
const LAST_WORKFLOW = WORKFLOWS[WORKFLOWS.length - 1];

export default function DairyIceCreamHowUpwonHelps() {
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
    hidden: { opacity: 0, x: d(-18) },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
    hover: { y: d(-4), transition: { duration: 0.25, ease: EASE } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.94 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: EASE } },
  };

  const renderWorkflow = ({ label, Icon }) => (
    <motion.div
      key={label}
      variants={itemVariants}
      whileHover="hover"
      className="flex min-w-0 items-center gap-3 rounded-[12px] border border-navy-950/[0.06] bg-white px-3 py-3 shadow-[0_6px_20px_rgba(25,35,55,0.05)] transition-shadow duration-300 hover:shadow-[0_12px_28px_rgba(25,35,55,0.1)]"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#fff2e9]">
        <Icon className="h-5 w-5 text-orange-500" strokeWidth={1.7} />
      </span>

      <span className="min-w-0 text-[13px] font-medium leading-snug text-navy-800 sm:text-[13.5px]">
        {label}
      </span>
    </motion.div>
  );

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
      {/* ================= BACKGROUND ================= */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/images/dairy_how_upwon_bg.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-white/78" />
      </div>

      <Container className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-8 xl:gap-10">
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
                One <span className="gradient-text-orange">Connected Platform</span>{' '}
                for Your Dairy &amp; Ice Cream Operations
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-4 max-w-xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
              >
                UpWon connects the key workflows behind dairy and ice cream
                operations—helping teams manage the movement of raw materials,
                batches, products, inventory, information, and operations
                through one unified platform.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="mt-7 h-display text-[16px] font-semibold text-navy-950 sm:text-[17px]"
              >
                Connected Workflows Across:
              </motion.p>
            </motion.div>

            {/* Thirteen items split into two columns, six then seven */}
            <motion.div
              variants={listGroup}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="mt-4"
            >
              <div className="grid gap-3 sm:grid-cols-2 sm:gap-x-4">
                {COLUMNS.map((column, columnIndex) => (
                  <div key={columnIndex} className="space-y-3">
                    {column.map(renderWorkflow)}
                  </div>
                ))}
              </div>

              {/* Thirteenth card, centred under the two columns */}
              <div className="mt-3 flex justify-center">
                <div className="w-full sm:w-[calc(50%-0.5rem)]">
                  {renderWorkflow(LAST_WORKFLOW)}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ================= RIGHT — WORKFLOW WHEEL ================= */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="min-w-0"
          >
            <img
              src="/images/dairy_how_upwon.webp"
              alt="UpWon connecting procurement, production, quality, cold storage, distribution and reporting for dairy and ice cream"
              width={1278}
              height={1230}
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
