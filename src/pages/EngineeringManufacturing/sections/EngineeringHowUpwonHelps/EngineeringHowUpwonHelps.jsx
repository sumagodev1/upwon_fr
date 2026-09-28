import { useEffect, useState } from 'react';
import { m as motion, useReducedMotion } from 'framer-motion';
import {
  ShoppingCart,
  Boxes,
  FileText,
  Settings,
  ShieldCheck,
  Database,
  Warehouse,
  ClipboardList,
  Truck,
  Users,
  UserCog,
  BarChart3,
} from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import { fetchEngineeringPlatformSection } from '../../../../lib/engineeringManufacturingPage.js';
import { engineeringIcon } from '../../../../lib/engineeringIcons.js';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

/*
  The fallback: the published workflows are the CMS's, and these are what the
  section shows during the SSG build, while the fetch is in flight, and
  whenever the API is unreachable. Colours are hex so both sources render
  through the same inline style (#E85A2A is the theme's orange-500).
*/
const WORKFLOWS = [
  {
    label: 'Procurement & Purchasing',
    Icon: ShoppingCart,
    tint: '#fdf0e6',
    ink: '#E85A2A',
  },
  {
    label: 'Raw Material & Department Store Management',
    Icon: Boxes,
    tint: '#e9f1fd',
    ink: '#2f6fed',
  },
  {
    label: 'Bill of Materials Management',
    Icon: FileText,
    tint: '#f2ecfd',
    ink: '#7c3aed',
  },
  {
    label: 'Production Planning & Management',
    Icon: Settings,
    tint: '#e8f7ed',
    ink: '#1f9d55',
  },
  {
    label: 'Quality Inspection',
    Icon: ShieldCheck,
    tint: '#fdf6e0',
    ink: '#c8820a',
  },
  {
    label: 'Inventory & Stock Management',
    Icon: Database,
    tint: '#e9f1fd',
    ink: '#2f6fed',
  },
  {
    label: 'Warehouse Operations',
    Icon: Warehouse,
    tint: '#fdeef0',
    ink: '#dc2626',
  },
  {
    label: 'Sales & Order Management',
    Icon: ClipboardList,
    tint: '#fdeef0',
    ink: '#dc2626',
  },
  {
    label: 'Dispatch & Logistics',
    Icon: Truck,
    tint: '#f2ecfd',
    ink: '#7c3aed',
  },
  {
    label: 'Vendor Management',
    Icon: Users,
    tint: '#e8f7ed',
    ink: '#1f9d55',
  },
  {
    label: 'Workforce Operations',
    Icon: UserCog,
    tint: '#fdf6e0',
    ink: '#c8820a',
  },
  {
    label: 'Finance & Reporting',
    Icon: BarChart3,
    tint: '#e9f1fd',
    ink: '#2f6fed',
  },
];

const IMAGE_SRC = '/images/eng_how_upwon.webp';
const IMAGE_ALT =
  'A connected plant view with procurement, production planning, quality, raw materials, inventory and dispatch running through one UpWon dashboard';
const LIST_LABEL = 'Connected Workflows Across';

export default function EngineeringHowUpwonHelps() {
  const reduceMotion = useReducedMotion();
  const [cms, setCms] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchEngineeringPlatformSection().then((section) => {
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
        Icon: engineeringIcon(workflow.icon),
        tint: workflow.tintColor,
        ink: workflow.accentColor,
      }))
    : WORKFLOWS;
  // A CMS without a panel keeps the shipped illustration and label.
  const image = cms?.image ?? IMAGE_SRC;
  const imageAlt = cms?.image ? (cms.imageAlt ?? IMAGE_ALT) : IMAGE_ALT;
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

  const imageVariants = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.96 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: EASE } },
  };

  const listGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.045), delayChildren: 0.2 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: d(16) },
    visible: { opacity: 1, x: 0, transition: { duration: 0.42, ease: EASE } },
    hover: { x: d(3), transition: { duration: 0.25, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#fafbfd] to-white py-10 sm:py-12 lg:py-14">
      {/* Wider than the shared Container so the three columns breathe */}
      <div className="relative z-10 mx-auto w-full max-w-[1700px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.78fr_1.3fr] lg:gap-8 xl:grid-cols-[0.72fr_1.42fr_0.82fr] xl:gap-8">
          {/* ================= LEFT — COPY ================= */}
          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="min-w-0"
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
                    Engineering &amp; Manufacturing
                  </span>{' '}
                  Operations
                </>
              )}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
            >
              {cms
                ? cms.subtext
                : 'UpWon connects the key workflows behind engineering and manufacturing businesses—helping teams manage the movement of materials, production information, inventory, products, people, and operations through one unified platform.'}
            </motion.p>
          </motion.div>

          {/* ================= CENTRE — CONNECTED PLANT ================= */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="min-w-0"
          >
            <img
              src={image}
              alt={imageAlt}
              width={1536}
              height={1024}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
          </motion.div>

          {/* ================= RIGHT — WORKFLOWS ================= */}
          <motion.div
            variants={listGroup}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="min-w-0 lg:col-span-2 xl:col-span-1"
          >
            {listLabel && (
              <motion.p
                variants={fadeIn}
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-500"
              >
                {listLabel}
              </motion.p>
            )}

            <div className={`${listLabel ? 'mt-4 ' : ''}grid gap-2 sm:grid-cols-2 xl:grid-cols-1`}>
              {workflows.map(({ label, Icon, tint, ink }) => (
                <motion.div
                  key={label}
                  variants={rowVariants}
                  whileHover="hover"
                  className="flex min-w-0 items-center gap-3 rounded-[10px] border border-navy-950/[0.06] bg-white px-3 py-2.5 shadow-[0_4px_14px_rgba(25,35,55,0.04)] transition-shadow duration-300 hover:shadow-[0_10px_24px_rgba(25,35,55,0.09)]"
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px]"
                    style={{ background: tint }}
                  >
                    <Icon className="h-4 w-4" style={{ color: ink }} strokeWidth={1.8} />
                  </span>

                  <span className="min-w-0 text-[12.5px] font-medium leading-snug text-navy-800">
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
