import { m as motion, useReducedMotion } from 'framer-motion';
import {
  FileCheck2,
  BarChart3,
  Share2,
  ArrowUpRight,
  Check,
  FileText,
} from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

/*
  Why UpWon — Proof & Results

  Three statistic cards, each carrying its own small visual: an automation
  checklist, a trend line, and a hub-and-spoke of connected modules.

  NOTE ON THE NUMBERS
  `stat` below is the only place the headline figures live. They are the
  brief's suggested results, not verified customer data — if UpWon cannot
  back a figure with its own study or customer results, swap that one
  `stat` string for a value-based phrase ('Less', 'Faster', 'Connected')
  and the card layout carries on unchanged.
*/

const RESULTS = [
  {
    stat: '30%',
    title: 'Less Manual Work',
    detail:
      'Reduce repetitive processes and spend more time focusing on meaningful work.',
    Icon: FileCheck2,
    panel: 'from-[#f2faf5] via-[#f8fcfa] to-[#e9f6ef]',
    edge: 'ring-[#d7ebe0]',
    tile: 'bg-[#dcf0e5]',
    ink: 'text-[#0f7a4a]',
    statInk: 'text-[#0f7a4a]',
    visual: 'checklist',
    from: -20,
  },
  {
    stat: '2× Faster',
    title: 'Decision Making',
    detail:
      'Access connected information and insights without waiting for data from multiple systems.',
    Icon: BarChart3,
    panel: 'from-[#f4f8fd] via-[#fafbfe] to-[#eaf1fb]',
    edge: 'ring-[#d9e4f3]',
    tile: 'bg-[#dbe8fb]',
    ink: 'text-[#2f6fed]',
    statInk: 'text-[#1f5fe0]',
    visual: 'trend',
    from: 0,
  },
  {
    stat: '100%',
    title: 'Connected Workflows',
    detail:
      'Create a more connected environment across critical business operations.',
    Icon: Share2,
    panel: 'from-[#fff8f1] via-[#fffcf8] to-[#fdf0e4]',
    edge: 'ring-[#f2e1cd]',
    tile: 'bg-[#fdead6]',
    ink: 'text-[#e85a2a]',
    statInk: 'text-[#e85a2a]',
    visual: 'hub',
    from: 20,
  },
];

/* Card 1 — the repetitive work that stops being manual */
const AUTOMATED = ['Purchase Orders', 'Invoice Processing', 'Data Entry'];

/* One height for all three card visuals — the hub artwork is near-square and
   sets the floor, so the checklist and the chart are grown to match it. */
const VISUAL_H = 'h-[300px]';

export default function WhyUpwonResults() {
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

  const cardsGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.12), delayChildren: 0.18 },
    },
  };

  const cardFrom = (offset) => ({
    hidden: { opacity: 0, x: d(offset), y: d(18) },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.65, ease: EASE },
    },
  });

  const rowsGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.09), delayChildren: 0.35 },
    },
  };

  const rowIn = {
    hidden: { opacity: 0, x: d(-12) },
    visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
  };

  /* ================= CARD VISUALS ================= */

  const visuals = {
    /* Repetitive work, ticked off */
    checklist: (
      <motion.ul
        variants={rowsGroup}
        className={`flex flex-col gap-2.5 rounded-[12px] bg-white/80 p-3 ring-1 ring-[#d7ebe0] ${VISUAL_H}`}
      >
        {AUTOMATED.map((label) => (
          <motion.li
            key={label}
            variants={rowIn}
            className="flex flex-1 items-center gap-3 rounded-[10px] bg-white px-3 py-2 ring-1 ring-navy-950/[0.05]"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] bg-[#eef3fb]">
              <FileText className="h-4 w-4 text-[#2f6fed]" strokeWidth={2} />
            </span>

            <span className="min-w-0 flex-1">
              {/* Wraps rather than truncates: at 320px the row leaves roughly
                  100px of text width, which would clip "Invoice Processing".
                  The rows are flex-1 inside a fixed-height panel, so a second
                  line costs nothing. */}
              <span className="block text-[12.5px] font-semibold leading-tight text-navy-950 sm:text-[13.5px]">
                {label}
              </span>
              <span className="mt-0.5 block text-[11.5px] leading-tight text-navy-500">
                Automated
              </span>
            </span>

            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#19a463]">
              <Check className="h-3.5 w-3.5 text-white" strokeWidth={3.4} />
            </span>
          </motion.li>
        ))}
      </motion.ul>
    ),

    /* One connected trend instead of five reports */
    trend: (
      <div
        className={`relative flex flex-col rounded-[12px] bg-white p-3.5 ring-1 ring-[#d9e4f3] ${VISUAL_H}`}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="text-[13.5px] font-semibold text-navy-950">
            Business Insights
          </span>

          <span className="rounded-[6px] bg-[#f1f5fc] px-2 py-1 text-[11px] font-semibold text-navy-600">
            Last 30 days
          </span>
        </div>

        {/* The plot takes whatever height is left, so the panel matches the
            other two cards' visuals however tall they are */}
        <div className="relative mt-3 min-h-0 flex-1">
          <svg
            viewBox="0 0 300 200"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="h-full w-full"
          >
            <defs>
              <linearGradient id="upwon-trend-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2f6fed" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#2f6fed" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* The flat, disconnected baseline */}
            <path
              d="M 4 157 C 46 143, 74 161, 108 139 S 176 126, 208 113 S 264 96, 296 87"
              fill="none"
              stroke="#e4e9f2"
              strokeWidth="2.4"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />

            <path
              d="M 4 170 C 46 152, 72 161, 106 122 S 168 117, 200 83 S 262 48, 296 26 L 296 200 L 4 200 Z"
              fill="url(#upwon-trend-fill)"
            />

            <path
              d="M 4 170 C 46 152, 72 161, 106 122 S 168 117, 200 83 S 262 48, 296 26"
              fill="none"
              stroke="#2f6fed"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />

            <line
              x1="200"
              y1="83"
              x2="200"
              y2="200"
              stroke="#c3d3ee"
              strokeWidth="1.4"
              strokeDasharray="3 4"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Point marker and its callout live outside the SVG so the
              stretched viewBox cannot squash them into ellipses */}
          <span
            aria-hidden="true"
            className="absolute left-[66.7%] top-[41.5%] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2f6fed] ring-4 ring-[#2f6fed]/15"
          />

          <span className="absolute left-[66.7%] top-[41.5%] -translate-x-1/2 -translate-y-[150%] rounded-[8px] bg-white px-2.5 py-1.5 text-[11px] font-semibold leading-tight text-navy-800 shadow-[0_6px_18px_rgba(25,35,55,0.12)] ring-1 ring-navy-950/[0.06]">
            Faster decisions
            <span className="block font-medium text-navy-500">
              Better outcomes
            </span>
          </span>
        </div>
      </div>
    ),

    /* Every module reporting to the same centre */
    hub: (
      <img
        src="/images/why_conn_workflow.webp"
        alt="Purchase, inventory, people, reports, finance and settings all connected to UpWon at the centre"
        width={1263}
        height={1246}
        loading="lazy"
        decoding="async"
        /* Near-square (1263x1246), so it is capped by WIDTH rather than set
           to VISUAL_H by height. A fixed height with `w-auto max-w-full`
           squashes the artwork on narrow screens, where the intrinsic width
           at 300px tall exceeds the card. At 300px wide it lands ~296px
           tall, which matches the other two visuals. */
        className="mx-auto block h-auto w-full max-w-[300px]"
      />
    ),
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#fbfaf8] to-white py-10 sm:py-12 lg:py-14">
      <Container className="relative z-10 !max-w-[1700px]">
        {/* ================= HEADING ================= */}
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="max-w-3xl"
        >
          <motion.div variants={fadeIn}>
            <Eyebrow>BUILT FOR BETTER OPERATIONS</Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
          >
            Less Complexity. More Control.
            <br className="hidden sm:block" />{' '}
            <span className="gradient-text-orange">Better Outcomes.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
          >
            By connecting workflows and improving visibility, businesses can
            reduce unnecessary manual work and make decisions with greater
            confidence.
          </motion.p>
        </motion.div>

        {/* ================= RESULT CARDS ================= */}
        <motion.div
          variants={cardsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-8 grid gap-5 md:grid-cols-2 lg:mt-10 lg:grid-cols-3"
        >
          {RESULTS.map(
            ({
              stat,
              title,
              detail,
              Icon,
              panel,
              edge,
              tile,
              ink,
              statInk,
              visual,
              from,
            }) => (
              <motion.article
                key={title}
                variants={cardFrom(from)}
                className={`flex min-w-0 flex-col rounded-[20px] bg-gradient-to-br ${panel} p-5 ring-1 ${edge} sm:p-6`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[13px] ${tile}`}
                  >
                    <Icon className={`h-[22px] w-[22px] ${ink}`} strokeWidth={1.9} />
                  </span>

                  {/* Visual echo of the layout's corner marker — decorative */}
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-white/80 ring-1 ring-navy-950/[0.06]"
                  >
                    <ArrowUpRight className="h-4 w-4 text-navy-500" strokeWidth={2} />
                  </span>
                </div>

                <p
                  className={`mt-5 h-display text-[34px] leading-none tracking-tight sm:text-[38px] ${statInk}`}
                >
                  {stat}
                </p>

                <h3 className="mt-2 h-display text-[18px] font-bold leading-tight tracking-tight text-navy-950 sm:text-[19px]">
                  {title}
                </h3>

                <p className="mt-2 text-[13.5px] leading-relaxed text-navy-600 sm:text-[14px]">
                  {detail}
                </p>

                {/* Each card's own small proof, pinned to the bottom so the
                    three line up however long the copy runs */}
                <div className="mt-auto pt-6">{visuals[visual]}</div>
              </motion.article>
            ),
          )}
        </motion.div>
      </Container>
    </section>
  );
}
