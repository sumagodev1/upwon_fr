import { useEffect, useState } from 'react';
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
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import { fetchQsrFranchisePlatformSection } from '../../../../lib/qsrFranchisePage.js';
import { qsrFranchiseIcon } from '../../../../lib/qsrFranchiseIcons.js';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

/*
  The fallback: the published copy, workflows and artwork are the CMS's, and
  these are what the section shows during the SSG build, while the fetch is in
  flight, and whenever the API is unreachable.
*/
const SUBTEXT =
  'UpWon connects the key workflows behind multi-outlet and franchise-led food businesses—helping teams manage the movement of ingredients, products, inventory, orders, people, information, and operations through one unified platform.';

const LIST_LABEL = 'Connected Workflows Across:';
const CLOSING_TITLE = 'All Workflows. One Platform.';
const CLOSING_SUBTEXT = 'Connect. Control. Grow.';

const ARTWORK_SRC = '/images/qsr_how_upwon_help.webp';
const ARTWORK_ALT =
  'The UpWon app showing outlets, orders, wastage, on-time dispatch and a weekly operations overview';

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
  const [cms, setCms] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchQsrFranchisePlatformSection().then((section) => {
      if (!cancelled && section) setCms(section);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const workflows = cms
    ? cms.workflows.map((workflow) => ({
        label: workflow.label,
        Icon: qsrFranchiseIcon(workflow.icon),
      }))
    : WORKFLOWS;
  // Null means no panel was authored - keep the built-in lines. '' turns one off.
  const listLabel = cms?.listLabel ?? LIST_LABEL;
  const closingTitle = cms?.closingTitle ?? CLOSING_TITLE;
  const closingSubtext = cms?.closingSubtext ?? CLOSING_SUBTEXT;
  // A CMS without artwork of its own keeps the shipped one.
  const artworkSrc = cms?.image ?? ARTWORK_SRC;
  const artworkAlt = cms?.image ? (cms.imageAlt ?? ARTWORK_ALT) : ARTWORK_ALT;

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
              {(!cms || cms.eyebrow) && (
                <motion.div variants={fadeIn}>
                  <Eyebrow>{cms ? cms.eyebrow : 'HOW UPWON HELPS'}</Eyebrow>
                </motion.div>
              )}

              <motion.h2
                variants={fadeUp}
                className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
              >
                {cms ? (
                  <HeadingLines lines={cms.headingLines} />
                ) : (
                  <>
                    One Connected Platform for Your{' '}
                    <span className="gradient-text-orange">
                      QSR &amp; Franchise F&amp;B Operations
                    </span>
                  </>
                )}
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-4 max-w-xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
              >
                {cms ? cms.subtext : SUBTEXT}
              </motion.p>

              {listLabel && (
                <motion.p
                  variants={fadeUp}
                  className="mt-7 h-display text-[16px] font-semibold text-navy-950 sm:text-[17px]"
                >
                  {listLabel}
                </motion.p>
              )}
            </motion.div>

            {/* Twelve workflows, three across */}
            <motion.div
              variants={listGroup}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {workflows.map(({ label, Icon }, index) => (
                <motion.div
                  key={`${label}-${index}`}
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
            {closingTitle && (
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
                    {closingTitle}
                  </p>

                  {closingSubtext && (
                    <p className="mt-1 text-[13px] leading-snug text-navy-600">
                      {closingSubtext}
                    </p>
                  )}
                </div>
              </motion.div>
            )}
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
              src={artworkSrc}
              alt={artworkAlt}
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
