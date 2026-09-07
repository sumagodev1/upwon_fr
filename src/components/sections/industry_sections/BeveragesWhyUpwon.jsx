import { m as motion, useReducedMotion } from 'framer-motion';
import { Share2, Eye, Users, Clock } from 'lucide-react';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

/*
  The artwork draws the hub, the connectors, the icons and the numbers, but
  carries no labels — so those are laid over it. Each row's position is a
  percentage of the 1576x998 artwork, and the type scales with it through a
  container query.
*/
const OUTCOMES = [
  {
    number: '01',
    title: 'Unified Operations',
    detail: 'Connect procurement to distribution',
    Icon: Share2,
    tint: 'bg-[#fdece0]',
    ink: 'text-orange-500',
    top: '22.9%',
  },
  {
    number: '02',
    title: 'Better Visibility',
    detail: 'Real-time view across every stage',
    Icon: Eye,
    tint: 'bg-[#f1e9fd]',
    ink: 'text-[#7c3aed]',
    top: '40.2%',
  },
  {
    number: '03',
    title: 'Greater Coordination',
    detail: 'Teams, locations and processes in sync',
    Icon: Users,
    tint: 'bg-[#e4f0fd]',
    ink: 'text-[#2f6fed]',
    top: '57.3%',
  },
  {
    number: '04',
    title: 'Reduced Delays',
    detail: 'Smoother workflows and faster decisions',
    Icon: Clock,
    tint: 'bg-[#e6f6ea]',
    ink: 'text-[#1f9d55]',
    top: '75.2%',
  },
];

// Where the copy sits inside a row, clear of the icon and number the artwork
// already draws
const LABEL_ZONE = { left: '61%', width: '34%' };
const TITLE_SIZE = 'clamp(12px, 2.1cqw, 20px)';
const DETAIL_SIZE = 'clamp(10px, 1.5cqw, 15px)';

export default function BeveragesWhyUpwon() {
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

  const imageVariants = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.96 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE } },
  };

  const rowsGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.08), delayChildren: 0.3 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: d(14) },
    visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: d(14) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#fdf8f3] to-white py-12 sm:py-16 lg:py-20">
      <Container className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-6 xl:gap-8">
          {/* ================= LEFT — COPY ================= */}
          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="min-w-0"
          >
            <motion.div variants={fadeIn}>
              <Eyebrow>WHY UPWON</Eyebrow>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
            >
              Built to Keep Beverage Operations{' '}
              <span className="gradient-text-orange">Moving as One.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
            >
              In beverage and juice operations, disconnected procurement,
              production, quality, packaging, inventory, warehouse, sales, and
              distribution workflows can create delays and reduce visibility.
              UpWon brings these workflows closer together—helping teams operate
              with greater coordination and control.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-7 inline-flex items-center gap-4 rounded-full bg-white py-3 pl-3 pr-6 shadow-[0_12px_30px_rgba(25,35,55,0.1)]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-500">
                <Share2 className="h-5 w-5 text-white" strokeWidth={1.9} />
              </span>

              <span className="min-w-0">
                <span className="block h-display text-[14.5px] font-bold leading-snug text-navy-950">
                  One connected platform.
                </span>

                <span className="mt-0.5 block text-[13.5px] leading-snug text-navy-600">
                  From ingredients to every sales channel.
                </span>
              </span>
            </motion.div>
          </motion.div>

          {/* ================= RIGHT — CONNECTED HUB ================= */}
          {/* Container query unit, so the overlaid copy tracks the artwork */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="relative hidden min-w-0 [container-type:inline-size] lg:block"
          >
            <img
              src="/images/bev_why_upwon.webp"
              alt="UpWon at the centre of unified operations, better visibility, greater coordination and reduced delays"
              width={1576}
              height={998}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />

            <motion.div
              variants={rowsGroup}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="absolute inset-0"
            >
              {/* The centring translate lives on a plain wrapper: the motion
                  child animates transform, which would overwrite it */}
              {OUTCOMES.map(({ number, title, detail, top }) => (
                <div
                  key={number}
                  className="absolute -translate-y-1/2"
                  style={{ ...LABEL_ZONE, top }}
                >
                  <motion.div variants={rowVariants}>
                    <p
                      className="h-display font-bold leading-tight text-navy-950"
                      style={{ fontSize: TITLE_SIZE }}
                    >
                      {title}
                    </p>

                    <p
                      className="mt-[0.35em] leading-tight text-navy-600"
                      style={{ fontSize: DETAIL_SIZE }}
                    >
                      {detail}
                    </p>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ---------- The hub's rows are unreadable at these widths, so the
               same four outcomes stack as cards ---------- */}
          <motion.div
            variants={rowsGroup}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="grid gap-3 sm:grid-cols-2 lg:hidden"
          >
            {OUTCOMES.map(({ number, title, detail, Icon, tint, ink }) => (
              <motion.div
                key={number}
                variants={cardVariants}
                className="flex min-w-0 items-center gap-3.5 rounded-[14px] border border-navy-950/[0.06] bg-white p-4 shadow-[0_8px_24px_rgba(25,35,55,0.06)]"
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${tint}`}
                >
                  <Icon className={`h-5 w-5 ${ink}`} strokeWidth={1.8} />
                </span>

                <span className="min-w-0">
                  <span className="block h-display text-[14.5px] font-bold leading-snug text-navy-950">
                    {title}
                  </span>

                  <span className="mt-1 block text-[12.5px] leading-snug text-navy-600">
                    {detail}
                  </span>
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
