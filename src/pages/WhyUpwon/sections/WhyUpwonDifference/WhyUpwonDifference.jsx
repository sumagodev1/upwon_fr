import { m as motion, useReducedMotion } from 'framer-motion';
import {
  Users,
  BarChart3,
  Package,
  Database,
  FileBarChart,
  FileText,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

/* ============================================================
   LEFT — "Disconnected Systems"

   The scatter is laid out in percentages inside a fixed-aspect box, so
   the departments, the warning pills and the dashed paths all keep their
   relationship at every width. Type is sized in `cqw` against that same
   box, so it scales with the artwork instead of jumping at breakpoints.
   ============================================================ */

const BEFORE_CARDS = [
  {
    label: 'Production',
    detail: 'Planning & Production',
    Icon: BarChart3,
    tile: 'bg-[#eef1fb]',
    ink: 'text-[#2a3a8f]',
    box: { left: '34.8%', top: '0%', width: '31%' },
  },
  {
    label: 'Sales',
    detail: 'Orders & Customers',
    Icon: Users,
    tile: 'bg-[#e8f5ee]',
    ink: 'text-[#1c9f6b]',
    box: { left: '0%', top: '27.8%', width: '33.7%' },
  },
  {
    label: 'Inventory',
    detail: 'Stock & Materials',
    Icon: Package,
    tile: 'bg-[#e8f5ee]',
    ink: 'text-[#1c9f6b]',
    box: { left: '68.7%', top: '27.2%', width: '31.3%' },
  },
  {
    label: 'Finance',
    detail: 'Accounting & Payments',
    Icon: Database,
    tile: 'bg-orange-500',
    ink: 'text-white',
    box: { left: '9.8%', top: '66.1%', width: '34.8%' },
  },
  {
    label: 'Reports',
    detail: 'Business Insights',
    Icon: FileBarChart,
    tile: 'bg-[#eef1fb]',
    ink: 'text-[#2a3a8f]',
    box: { left: '58.5%', top: '66.1%', width: '32%' },
  },
];

const BEFORE_PILLS = [
  { label: 'Manual data entry', box: { left: '4.4%', top: '3.3%' } },
  { label: 'Delayed information', box: { left: '74.7%', top: '2.8%' } },
  { label: 'Data silos', box: { left: '44.3%', top: '45%' } },
  { label: 'Multiple spreadsheets', box: { left: '4.1%', top: '92.2%' } },
  { label: 'Limited visibility', box: { left: '74.7%', top: '92.2%' } },
];

// Drawn in the scatter box's own 632 x 360 coordinate space
const BEFORE_PATHS = [
  'M 150 108 C 192 62, 236 42, 262 36',
  'M 416 46 C 470 62, 500 92, 512 112',
  'M 108 164 C 108 200, 130 230, 152 246',
  'M 520 160 C 512 200, 494 226, 482 238',
  'M 282 276 C 320 286, 348 280, 370 272',
  'M 300 62 C 250 122, 200 180, 178 236',
  'M 434 130 C 380 142, 300 146, 214 136',
];

// Stray paperwork sitting on the broken links
const BEFORE_DOCS = [
  { left: '25.5%', top: '13%' },
  { left: '76%', top: '13%' },
  { left: '14.5%', top: '55%' },
  { left: '44%', top: '19%' },
  { left: '78.5%', top: '55%' },
];

/* ============================================================
   RIGHT — "Everything Connects"

   The hub, the five cards and the connectors are baked into
   why_everything_connect.webp. Only the copy is laid over it, positioned
   against the artwork's own 952 x 576 geometry.
   ============================================================ */

/*
  The file carries a wide empty margin all round, which left its cards
  small relative to the canvas and pushed the copy outside them. We crop
  to the artwork's content box — 110,70 → 857,500 of the original
  952 x 576 — which scales the cards up by about 1.27x. Every percentage
  below is measured against that crop window, not the raw file.
*/
const CROP = {
  width: `${(952 / 747) * 100}%`,
  height: `${(576 / 430) * 100}%`,
  left: `${(-110 / 747) * 100}%`,
  top: `${(-70 / 430) * 100}%`,
};

const CONNECT_CARDS = [
  {
    title: 'Connected Teams',
    detail: 'Keep departments aligned with shared information.',
    box: { left: '45.8%', right: '35.2%', top: '5.8%', height: '18.8%' },
  },
  {
    title: 'Automated Workflows',
    detail: 'Reduce repetitive work and create smoother processes.',
    box: { left: '14.3%', right: '68.5%', top: '36.5%', height: '20.7%' },
  },
  {
    title: 'Real-Time Visibility',
    detail: 'Access the information you need, when you need it.',
    box: { left: '79.9%', right: '3.2%', top: '36.7%', height: '19.1%' },
  },
  {
    title: 'Scalable Operations',
    detail: 'Build workflows that can support your business as it grows.',
    box: { left: '17.1%', right: '63.9%', top: '74.9%', height: '19.3%' },
  },
  {
    title: 'Faster Decisions',
    detail: 'Turn connected data into clearer insights and faster decision-making.',
    box: { left: '75.1%', right: '5.9%', top: '74.9%', height: '19.3%' },
  },
];

/* Type sized against each artwork box, so it tracks the visual */
const CARD_TITLE = 'clamp(10px, 1.55cqw, 15px)';
const CARD_DETAIL = 'clamp(8.5px, 1.25cqw, 12.5px)';
const SCATTER_TITLE = 'clamp(10px, 1.9cqw, 14px)';
const SCATTER_DETAIL = 'clamp(8px, 1.45cqw, 11.5px)';
const SCATTER_PILL = 'clamp(7.5px, 1.4cqw, 10.5px)';

export default function WhyUpwonDifference() {
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

  const panelFrom = (offset) => ({
    hidden: { opacity: 0, x: d(offset) },
    visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
  });

  const scatterGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.07), delayChildren: 0.2 },
    },
  };

  const popIn = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.92, y: d(10) },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: EASE },
    },
  };

  const overlayGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.09), delayChildren: 0.3 },
    },
  };

  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-12 lg:py-14">
      {/* Wider than the shared container so both panels keep their density */}
      <Container className="relative z-10 !max-w-[1700px]">
        {/* ================= HEADING ================= */}
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeIn}>
            <Eyebrow className="justify-center">THE UPWON DIFFERENCE</Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
          >
            One Connected Platform.{' '}
            <span className="gradient-text-orange">One Source of Truth.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-3xl text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
          >
            UpWon brings your people, processes, and business data together so
            every team can work from the same connected system. Instead of
            managing disconnected tools, your business gains a unified view of
            operations.
          </motion.p>
        </motion.div>

        {/* ================= BEFORE / AFTER ================= */}
        <div className="mt-8 grid items-stretch gap-6 lg:mt-9 lg:grid-cols-[1fr_auto_1.1fr] lg:gap-0">
          {/* ---------------- LEFT PANEL ---------------- */}
          <motion.div
            variants={panelFrom(-24)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="why-panel-left relative order-1 min-w-0 overflow-hidden rounded-[24px] bg-gradient-to-br from-[#fdf0ec] via-[#fdf6f3] to-[#fbfcfd]"
          >
            <div className="relative p-6 sm:p-7 lg:p-8">
              <span className="inline-flex items-center rounded-full bg-[#fde3e3] px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#d0433f]">
                Before
              </span>

              <h3 className="mt-4 h-display text-[22px] font-bold leading-tight tracking-tight text-navy-950 sm:text-[26px]">
                Disconnected Systems
              </h3>

              <p className="mt-1.5 text-[14px] leading-snug text-navy-600 sm:text-[15px]">
                Multiple tools. Scattered data. Slower growth.
              </p>

              {/* ---------- Scatter ---------- */}
              <motion.div
                variants={scatterGroup}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT}
                className="relative mt-6 aspect-[632/380] w-full [container-type:inline-size] sm:mt-7"
              >
                {/* Dashed links, drawn behind everything and marching slowly
                    so the broken flow reads as movement without pulling focus */}
                <svg
                  viewBox="0 0 632 360"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full"
                >
                  {BEFORE_PATHS.map((path, index) => (
                    <path
                      key={path}
                      d={path}
                      fill="none"
                      stroke="rgba(25,35,55,0.22)"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeDasharray="6 7"
                      style={
                        reduceMotion
                          ? undefined
                          : {
                              animation: `upwon-dash 2.4s linear infinite`,
                              animationDelay: `${index * 0.18}s`,
                            }
                      }
                    />
                  ))}
                </svg>

                {BEFORE_DOCS.map(({ left, top }) => (
                  <span
                    key={`${left}-${top}`}
                    aria-hidden="true"
                    className="absolute -translate-x-1/2 -translate-y-1/2 text-navy-950/25"
                    style={{ left, top }}
                  >
                    <FileText
                      strokeWidth={1.6}
                      style={{
                        width: 'clamp(10px, 2.2cqw, 17px)',
                        height: 'clamp(10px, 2.2cqw, 17px)',
                      }}
                    />
                  </span>
                ))}

                {BEFORE_CARDS.map(({ label, detail, Icon, tile, ink, box }) => (
                  <motion.article
                    key={label}
                    variants={popIn}
                    className="absolute flex min-w-0 items-center gap-[3cqw] rounded-[12px] bg-white px-[3cqw] py-[2.4cqw] shadow-[0_8px_22px_rgba(25,35,55,0.09)]"
                    style={box}
                  >
                    <span
                      className={`flex shrink-0 items-center justify-center rounded-[9px] ${tile}`}
                      style={{
                        width: 'clamp(26px, 5.6cqw, 42px)',
                        height: 'clamp(26px, 5.6cqw, 42px)',
                      }}
                    >
                      <Icon
                        className={ink}
                        strokeWidth={1.9}
                        style={{
                          width: 'clamp(13px, 2.9cqw, 21px)',
                          height: 'clamp(13px, 2.9cqw, 21px)',
                        }}
                      />
                    </span>

                    <span className="min-w-0">
                      <span
                        className="block h-display font-bold leading-tight tracking-tight text-navy-950"
                        style={{ fontSize: SCATTER_TITLE }}
                      >
                        {label}
                      </span>

                      <span
                        className="block leading-snug text-navy-600"
                        style={{ fontSize: SCATTER_DETAIL, marginTop: '0.6cqw' }}
                      >
                        {detail}
                      </span>
                    </span>
                  </motion.article>
                ))}

                {BEFORE_PILLS.map(({ label, box }) => (
                  <motion.span
                    key={label}
                    variants={popIn}
                    className="absolute inline-flex items-center gap-[1.4cqw] whitespace-nowrap rounded-full bg-[#fdeaea] px-[2.2cqw] py-[1.2cqw] font-semibold leading-none text-[#d0433f]"
                    style={{ ...box, fontSize: SCATTER_PILL }}
                  >
                    <AlertCircle
                      strokeWidth={2.2}
                      style={{
                        width: 'clamp(9px, 2.1cqw, 15px)',
                        height: 'clamp(9px, 2.1cqw, 15px)',
                      }}
                    />
                    {label}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* ---------------- CENTRE ---------------- */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="order-2 flex min-w-0 flex-row items-center justify-center gap-4 lg:w-[112px] lg:flex-col lg:gap-5"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-navy-950/[0.07] bg-white shadow-[0_10px_26px_rgba(25,35,55,0.12)]">
              <ArrowRight className="h-5 w-5 text-orange-500" strokeWidth={2.2} />
            </span>

            <p className="text-[10px] font-semibold uppercase leading-[1.7] tracking-[0.2em] text-navy-500 lg:text-center">
              From
              <br className="hidden lg:block" /> Complexity
              <br className="hidden lg:block" /> To
              <br className="hidden lg:block" /> Clarity
            </p>
          </motion.div>

          {/* ---------------- RIGHT PANEL ---------------- */}
          <motion.div
            variants={panelFrom(24)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="why-panel-right order-3 min-w-0 overflow-hidden rounded-[24px] bg-[#edf6f3]"
          >
            <div className="p-6 pb-0 sm:p-7 sm:pb-0 lg:p-8 lg:pb-0">
              <span className="inline-flex items-center rounded-full bg-[#d4ece0] px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#1b7a55]">
                With UpWon
              </span>

              <h3 className="mt-4 h-display text-[22px] font-bold leading-tight tracking-tight text-navy-950 sm:text-[26px]">
                Everything Connects
              </h3>

              <p className="mt-1.5 text-[14px] leading-snug text-navy-600 sm:text-[15px]">
                One platform. Unified data. A stronger business.
              </p>
            </div>

            {/* ---------- Hub artwork + overlaid copy ---------- */}
            <motion.div
              variants={overlayGroup}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              /* Inset a little so the panel's angled left edge clears the
                 artwork's leftmost card */
              className="relative mx-3 mt-4 aspect-[747/430] overflow-hidden [container-type:inline-size] sm:mx-4 lg:mx-5"
            >
              <img
                src="/images/why_everything_connect.webp"
                alt="The five UpWon benefits connected around one central platform"
                width={952}
                height={576}
                loading="lazy"
                decoding="async"
                className="absolute max-w-none"
                style={CROP}
              />

              {/* Plain elements on their own layer above the artwork. The copy
                  has to be legible the moment the artwork is, so it carries no
                  entrance state of its own. */}
              {CONNECT_CARDS.map(({ title, detail, box }) => (
                <div
                  key={title}
                  className="absolute z-10 flex flex-col justify-center"
                  style={box}
                >
                  <span
                    className="block h-display font-bold leading-tight tracking-tight text-navy-950"
                    style={{ fontSize: CARD_TITLE }}
                  >
                    {title}
                  </span>

                  <span
                    className="block leading-[1.3] text-navy-600"
                    style={{ fontSize: CARD_DETAIL, marginTop: '0.45cqw' }}
                  >
                    {detail}
                  </span>
                </div>
              ))}
            </motion.div>

            <div className="flex items-center gap-4 px-6 pb-6 sm:px-7 sm:pb-7 lg:px-8 lg:pb-8">
              <span
                aria-hidden="true"
                className="h-px flex-1 bg-navy-950/[0.09]"
              />

              <p className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.2em] text-navy-500">
                Same people. A stronger tomorrow.
              </p>

              <span
                aria-hidden="true"
                className="h-px flex-1 bg-navy-950/[0.09]"
              />
            </div>
          </motion.div>
        </div>
      </Container>

      <style>{`
        @keyframes upwon-dash {
          to { stroke-dashoffset: -26; }
        }

        /* The two panels interlock around the centre arrow. Only once they
           actually sit side by side — stacked, the angles would clip copy. */
        @media (min-width: 1024px) {
          .why-panel-left {
            clip-path: polygon(0 0, 96% 0, 100% 50%, 93% 100%, 0 100%);
          }
          .why-panel-right {
            clip-path: polygon(3% 0, 100% 0, 100% 100%, 3.5% 100%, 0 50%);
          }
        }
      `}</style>
    </section>
  );
}
