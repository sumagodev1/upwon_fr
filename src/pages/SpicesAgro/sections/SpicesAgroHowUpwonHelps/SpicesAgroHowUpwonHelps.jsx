import { useEffect, useState } from 'react';
import { m as motion, useReducedMotion } from 'framer-motion';
import {
  ShoppingCart,
  Boxes,
  ClipboardCheck,
  Factory,
  Warehouse,
  Truck,
} from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import { fetchSpicesAgroPlatformSection } from '../../../../lib/spicesAgroPage.js';
import { spicesAgroIcon } from '../../../../lib/spicesAgroIcons.js';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

// The six cards from the layout, each covering a group of the workflows
// listed below them.
//
// The fallback now: the published groups are the CMS's, and these are what the
// section shows during the SSG build, while the fetch is in flight, and
// whenever the API is unreachable. CMS groups are numbered by position.
const GROUPS = [
  {
    number: '01',
    title: 'Procurement & Purchasing',
    description:
      'Manage supplier requirements, purchase activity, and raw material availability.',
    Icon: ShoppingCart,
  },
  {
    number: '02',
    title: 'Raw Material & Store Management',
    description:
      'Track and manage incoming materials, stores, and stock availability.',
    Icon: Boxes,
  },
  {
    number: '03',
    title: 'Quality Inspection',
    description:
      'Keep quality checkpoints and batch-level visibility across all stages.',
    Icon: ClipboardCheck,
  },
  {
    number: '04',
    title: 'Production & Processing Management',
    description:
      'Connect raw-material requirements, processing activities, and production planning.',
    Icon: Factory,
  },
  {
    number: '05',
    title: 'Inventory & Warehouse Operations',
    description:
      'Track raw materials, work-in-process, finished goods, storage, and warehouse movement.',
    Icon: Warehouse,
  },
  {
    number: '06',
    title: 'Sales, Logistics & Multi-Location Operations',
    description:
      'Manage orders, dispatch, logistics, and operations across multiple locations.',
    Icon: Truck,
  },
];

const BACKGROUND_SRC = '/images/agro_how_upwon_bg.webp';

export default function SpicesAgroHowUpwonHelps() {
  const reduceMotion = useReducedMotion();
  const [cms, setCms] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchSpicesAgroPlatformSection().then((section) => {
      if (!cancelled && section) setCms(section);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // The CMS's groups, in the shape the built-in ones already have.
  const groups = cms
    ? cms.groups.map((group, index) => ({
        number: String(index + 1).padStart(2, '0'),
        title: group.title,
        description: group.description,
        Icon: spicesAgroIcon(group.icon),
      }))
    : GROUPS;
  // A CMS without a background keeps the shipped illustration.
  const background = cms?.background ?? BACKGROUND_SRC;

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

  const cardsGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.07), delayChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: d(22) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
    hover: { y: d(-6), transition: { duration: 0.28, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-[#fdf7f0] py-12 sm:py-16 lg:py-20">
      {/* ================= BACKGROUND ================= */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src={background}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover object-center"
        />
      </div>

      <Container className="relative z-10">
        {/* ================= HEADING ================= */}
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto max-w-3xl text-center"
        >
          {(!cms || cms.eyebrow) && (
            <motion.div variants={fadeIn}>
              <Eyebrow className="justify-center">{cms ? cms.eyebrow : 'HOW UPWON HELPS'}</Eyebrow>
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
                  Spices &amp; Agro Processing Operations
                </span>
              </>
            )}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
          >
            {cms
              ? cms.subtext
              : 'UpWon connects the key workflows behind spices and agro-processing businesses—helping teams manage the movement of raw materials, batches, products, inventory, information, and operations through one unified platform.'}
          </motion.p>
        </motion.div>

        {/* ================= WORKFLOW GROUPS ================= */}
        {/* pt leaves room for the number badge straddling each card's top */}
        <motion.div
          variants={cardsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-14 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-4"
        >
          {groups.map(({ number, title, description, Icon }) => (
            <motion.article
              key={number}
              variants={cardVariants}
              whileHover="hover"
              className="relative flex h-full min-w-0 flex-col items-center rounded-[16px] border border-navy-950/[0.05] bg-white px-4 pb-5 pt-9 text-center shadow-[0_10px_30px_rgba(25,35,55,0.07)] transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(25,35,55,0.13)]"
            >
              <span className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-orange-500 text-[12px] font-bold text-white shadow-[0_6px_16px_rgba(232,90,42,0.35)]">
                {number}
              </span>

              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#fdf1e7]">
                <Icon className="h-7 w-7 text-navy-900" strokeWidth={1.5} />
              </span>

              <h3 className="mt-4 h-display text-[14.5px] font-semibold leading-snug text-navy-950">
                {title}
              </h3>

              <p className="mt-2.5 text-[12.5px] leading-relaxed text-navy-600">
                {description}
              </p>

              <span
                aria-hidden="true"
                className="mt-auto block h-[3px] w-9 rounded-full bg-orange-500"
              />
            </motion.article>
          ))}
        </motion.div>

      </Container>
    </section>
  );
}
