import { useEffect, useState } from 'react';
import { m as motion, useReducedMotion } from 'framer-motion';
import {
  ShoppingCart,
  Leaf,
  ClipboardList,
  ShieldCheck,
  Settings,
  Package,
  Boxes,
  Clock,
  Warehouse,
  BarChart3,
  Truck,
  MapPin,
  PieChart,
} from 'lucide-react';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import { fetchBeveragePlatformSection } from '../../../../lib/beveragePage.js';
import { beverageIcon } from '../../../../lib/beverageIcons.js';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

/*
  The fallback: the published workflows are the CMS's, and these are what the
  section shows during the SSG build, while the fetch is in flight, and
  whenever the API is unreachable.
*/
const WORKFLOWS = [
  { label: 'Procurement & Purchasing', Icon: ShoppingCart },
  { label: 'Raw Material & Ingredient Management', Icon: Leaf },
  { label: 'Recipe & Bill of Materials Management', Icon: ClipboardList },
  { label: 'Quality Inspection', Icon: ShieldCheck },
  { label: 'Production Management', Icon: Settings },
  { label: 'Packaging Management', Icon: Package },
  { label: 'Inventory & Stock Management', Icon: Boxes },
  { label: 'Shelf-Life Related Workflows', Icon: Clock },
  { label: 'Warehouse Operations', Icon: Warehouse },
  { label: 'Sales & Order Management', Icon: BarChart3 },
  { label: 'Dispatch & Distribution', Icon: Truck },
  { label: 'Multi-Location Operations', Icon: MapPin },
  { label: 'Finance & Reporting', Icon: PieChart },
];

const BACKGROUND_SRC = '/images/bev_how_upwon_help_bg.webp';
const LIST_LABEL = 'Connected Workflows Across:';

export default function BeveragesHowUpwonHelps() {
  const reduceMotion = useReducedMotion();
  const [cms, setCms] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchBeveragePlatformSection().then((section) => {
      if (!cancelled && section) setCms(section);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // The CMS's workflows, in the shape the built-in ones already have.
  const workflows = cms
    ? cms.workflows.map((workflow) => ({
        label: workflow.label,
        Icon: beverageIcon(workflow.icon),
      }))
    : WORKFLOWS;
  // A CMS without a panel keeps the shipped background and label.
  const background = cms?.image ?? BACKGROUND_SRC;
  const listLabel = cms && cms.listLabel !== null ? cms.listLabel : LIST_LABEL;

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
      transition: { staggerChildren: stagger(0.04), delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: d(12) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: EASE } },
    hover: { y: d(-4), transition: { duration: 0.25, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-white">
      {/* ================= BACKGROUND ================= */}
      {/* The banner carries the bottles and fruit on its right, so everything
          — copy and workflows alike — runs in the clear space on the left */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src={background}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover object-right"
        />

        <div className="absolute inset-0 bg-white/55 lg:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-white/85 from-18% via-white/25 via-48% to-transparent lg:block" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1700px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="min-w-0 lg:w-[62%] xl:w-[58%]">
          {/* ================= COPY ================= */}
          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {(!cms || cms.eyebrow) && (
              <motion.div variants={fadeIn}>
                <Eyebrow>{cms ? cms.eyebrow : 'HOW UPWON HELPS'}</Eyebrow>
              </motion.div>
            )}

            <motion.h2
              variants={fadeUp}
              className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[34px]"
            >
              {cms ? (
                <HeadingLines lines={cms.headingLines} />
              ) : (
                <>
                  One Connected Platform for Your{' '}
                  <span className="gradient-text-orange">
                    Beverages &amp; Juices
                  </span>{' '}
                  Operations
                </>
              )}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-4 text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
            >
              {cms
                ? cms.subtext
                : 'UpWon connects the key workflows behind beverage and juice operations—helping teams manage the movement of ingredients, batches, products, inventory, information, and operations through one unified platform.'}
            </motion.p>

            {listLabel && (
              <motion.div variants={fadeUp} className="mt-7">
                <p className="h-display text-[17px] font-bold text-navy-950 sm:text-[18px]">
                  {listLabel}
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* ================= WORKFLOWS ================= */}
          <motion.div
            variants={listGroup}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="mt-5 grid auto-rows-fr grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
          >
            {workflows.map(({ label, Icon }) => (
              <motion.div
                key={label}
                variants={itemVariants}
                whileHover="hover"
                className="flex h-full min-w-0 flex-col items-center rounded-[12px] border border-navy-950/[0.05] bg-white px-2.5 py-4 text-center shadow-[0_8px_22px_rgba(25,35,55,0.06)] transition-shadow duration-300 hover:shadow-[0_14px_30px_rgba(25,35,55,0.11)]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fdf0e4]">
                  <Icon className="h-5 w-5 text-orange-500" strokeWidth={1.7} />
                </span>

                <span className="mt-2.5 min-w-0 text-[12px] font-semibold leading-snug text-navy-900">
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
