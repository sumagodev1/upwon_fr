import { m as motion, useReducedMotion } from 'framer-motion';
import {
  Users,
  BarChart3,
  Package,
  Database,
  FileBarChart,
  FileText,
  Eye,
  Clock,
  X,
} from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

/*
  The five departments, each its own card, joined by connectors that are
  deliberately broken — that break is the point of the section.
*/
const STAGES = [
  {
    label: 'Sales',
    detail: 'Orders & Customers',
    Icon: Users,
    panel: 'bg-[#eef8f2]',
    tile: 'bg-[#1c9f6b]',
  },
  {
    label: 'Production',
    detail: 'Planning & Output',
    Icon: BarChart3,
    panel: 'bg-[#eef1fb]',
    tile: 'bg-[#2a3a8f]',
  },
  {
    label: 'Inventory',
    detail: 'Stock & Materials',
    Icon: Package,
    panel: 'bg-[#eef8f2]',
    tile: 'bg-[#1c9f6b]',
  },
  {
    label: 'Finance',
    detail: 'Costs & Payments',
    Icon: Database,
    panel: 'bg-[#fdf2ea]',
    tile: 'bg-orange-500',
  },
  {
    label: 'Reports',
    detail: 'Business Insights',
    Icon: FileBarChart,
    panel: 'bg-[#f1f3f7]',
    tile: 'bg-[#2a3a8f]',
  },
];

/*
  What goes wrong between two stages. `kind` picks the break marker: a
  cross where the handoff fails outright, dots where it simply trails off.
*/
const GAPS = [
  { label: 'Manual Entry', kind: 'cross' },
  { label: 'Data Gap', kind: 'dots' },
  { label: 'Sync Delay', kind: 'cross' },
  { label: 'Multiple Sources', kind: 'dots' },
];

const FRICTIONS = [
  {
    title: 'Disconnected Information',
    detail:
      'Important business data is spread across multiple systems and departments.',
    Icon: Database,
  },
  {
    title: 'Manual Processes',
    detail:
      'Teams spend valuable time updating spreadsheets and transferring information between tools.',
    Icon: FileText,
  },
  {
    title: 'Limited Visibility',
    detail:
      'Decision-makers do not always have a complete, real-time view of business operations.',
    Icon: Eye,
  },
  {
    title: 'Delayed Decisions',
    detail:
      'When data is difficult to access, responding quickly becomes more difficult.',
    Icon: Clock,
  },
];

export default function WhyUpwonProblemSection() {
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

  const flowGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.07), delayChildren: 0.1 },
    },
  };

  const stageVariants = {
    hidden: { opacity: 0, y: d(18) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
    hover: { y: d(-4), transition: { duration: 0.28, ease: EASE } },
  };

  const gapVariants = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: EASE } },
  };

  const frictionGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.08), delayChildren: 0.12 },
    },
  };

  /* ================= PIECES ================= */

  const renderStage = ({ label, detail, Icon, panel, tile }) => (
    <motion.article
      key={label}
      variants={stageVariants}
      whileHover="hover"
      className={`flex min-w-0 flex-1 items-center gap-3.5 rounded-[16px] ${panel} px-4 py-4 lg:px-3.5 xl:gap-4 xl:px-4`}
    >
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] ${tile} shadow-[0_6px_16px_rgba(25,35,55,0.14)]`}
      >
        <Icon className="h-[22px] w-[22px] text-white" strokeWidth={1.8} />
      </span>

      <div className="min-w-0">
        <h3 className="h-display text-[16px] font-bold leading-tight tracking-tight text-navy-950 xl:text-[17px]">
          {label}
        </h3>

        <p className="mt-1 text-[12.5px] leading-snug text-navy-600">
          {detail}
        </p>
      </div>
    </motion.article>
  );

  /*
    One broken link: a pale label sitting above a dashed rule that is
    interrupted mid-way by the break marker.
  */
  const renderGap = ({ label, kind }) => (
    <motion.div
      key={label}
      variants={gapVariants}
      className="relative hidden w-[104px] shrink-0 self-center lg:block xl:w-[128px]"
    >
      <span className="mx-auto block w-fit whitespace-nowrap rounded-full bg-[#fdeee4] px-2.5 py-1 text-[10.5px] font-semibold leading-none text-[#c2410c]">
        {label}
      </span>

      <div className="relative mt-3 flex items-center">
        <span
          aria-hidden="true"
          className="h-px flex-1 border-t border-dashed border-navy-950/20"
        />

        {kind === 'cross' ? (
          <span className="mx-1.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-orange-500 shadow-[0_4px_10px_rgba(232,90,42,0.35)]">
            <X className="h-3 w-3 text-white" strokeWidth={3} />
          </span>
        ) : (
          <span
            aria-hidden="true"
            className="mx-1.5 flex shrink-0 items-center gap-1"
          >
            <span className="h-[5px] w-[5px] rounded-full bg-orange-500" />
            <span className="h-[5px] w-[5px] rounded-full bg-orange-500/70" />
            <span className="h-[5px] w-[5px] rounded-full bg-orange-500/40" />
          </span>
        )}

        <span
          aria-hidden="true"
          className="h-px flex-1 border-t border-dashed border-navy-950/20"
        />
      </div>
    </motion.div>
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#fcfdff] to-white py-10 sm:py-12 lg:py-14">
      {/* Soft arc in the upper right, as in the layout */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-[#eef2f8] opacity-70 blur-[2px]"
      />

      <Container className="relative z-10">
        {/* ================= HEADING ================= */}
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="min-w-0"
        >
          <motion.div variants={fadeIn}>
            <Eyebrow>THE CHALLENGE</Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
          >
            When Your Systems Don&rsquo;t Connect,
            <br className="hidden sm:block" />{' '}
            <span className="gradient-text-orange">
              Your Business Slows Down.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
          >
            As manufacturing operations grow, teams often depend on multiple
            systems, spreadsheets, and manual processes to manage their work.
            Sales, production, inventory, finance, and reporting operate across
            disconnected tools, making it difficult to maintain visibility and
            make fast, informed decisions.
          </motion.p>
        </motion.div>

        {/* ================= BROKEN WORKFLOW ================= */}
        {/* Connectors only appear once the row is genuinely horizontal;
            below lg the stages stack and the breaks would read as noise. */}
        <motion.div
          variants={flowGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-12 lg:flex lg:items-stretch lg:gap-0"
        >
          {STAGES.map((stage, index) => (
            <div
              key={stage.label}
              className="contents lg:flex lg:min-w-0 lg:flex-1 lg:items-stretch"
            >
              {renderStage(stage)}
              {GAPS[index] && renderGap(GAPS[index])}
            </div>
          ))}
        </motion.div>

        {/* ================= WHERE THE FRICTION STARTS ================= */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-10 border-t border-navy-950/[0.07] pt-8 lg:mt-12"
        >
          <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-navy-500">
            <span
              aria-hidden="true"
              className="h-[2px] w-8 rounded-full bg-orange-500"
            />
            Where the friction starts
          </p>
        </motion.div>

        {/* ================= PAIN POINTS ================= */}
        <motion.div
          variants={frictionGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-7 grid auto-rows-fr gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-navy-950/[0.07]"
        >
          {FRICTIONS.map(({ title, detail, Icon }, index) => (
            <motion.article
              key={title}
              variants={fadeUp}
              className="flex h-full min-w-0 items-start gap-4 lg:pl-8 lg:first:pl-0"
            >
              <span className="num-display shrink-0 pt-0.5 text-[26px] font-bold leading-none tracking-tight text-navy-950/20">
                0{index + 1}
              </span>

              {/* The cross badge marks each of these as a break, tying the
                  pain points back to the workflow above */}
              <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fdeee4]">
                <Icon className="h-5 w-5 text-orange-500" strokeWidth={1.8} />

                <span className="absolute -bottom-0.5 -right-0.5 flex h-[17px] w-[17px] items-center justify-center rounded-full border-2 border-white bg-orange-500">
                  <X className="h-2.5 w-2.5 text-white" strokeWidth={3.5} />
                </span>
              </span>

              <div className="min-w-0">
                <h3 className="h-display text-[15px] font-bold leading-snug tracking-tight text-navy-950">
                  {title}
                </h3>

                <p className="mt-2 text-[13px] leading-relaxed text-navy-600">
                  {detail}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
