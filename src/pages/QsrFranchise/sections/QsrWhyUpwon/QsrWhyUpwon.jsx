import { m as motion, useReducedMotion } from 'framer-motion';
import { Link2, ShieldCheck, MapPin } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

/*
  The hub artwork carries its own captions, but the bottom strip is drawn
  without them — so those are laid over it. The positions are percentages of
  the strip and the type scales with it through a container query, so they
  hold their place at any width.
*/
const FLOW_LABELS = [
  { label: 'Central Kitchen', left: '14.5%' },
  { label: 'Company-Owned Outlets', left: '41%' },
  { label: 'Franchise Locations', left: '67.5%' },
  { label: 'Unified Visibility', left: '89.5%' },
];

const PROMISES = [
  { label: 'One connected platform', Icon: Link2 },
  { label: 'Centralized control', Icon: ShieldCheck },
  { label: 'Connected outlet operations', Icon: MapPin },
];

const FLOW_LABEL_SIZE = 'clamp(11px, 1.2cqw, 18px)';

export default function QsrWhyUpwon() {
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
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
      <Container className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-10 xl:gap-14">
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
              Built to Keep Growing Food Brands{' '}
              <span className="gradient-text-orange">Moving as One.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
            >
              In QSR and franchise-led F&amp;B operations, disconnected
              procurement, kitchen, inventory, outlet, workforce, sales, and
              reporting workflows can quickly create delays and reduce
              operational consistency.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-3.5 max-w-xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
            >
              <span className="font-semibold text-navy-900">UpWon</span> brings
              these workflows together—helping growing food brands operate with
              greater coordination and control.
            </motion.p>

            <motion.ul
              variants={group}
              className="mt-7 space-y-3 border-t border-navy-950/[0.08] pt-6"
            >
              {PROMISES.map(({ label, Icon }) => (
                <motion.li
                  key={label}
                  variants={fadeUp}
                  className="flex min-w-0 items-center gap-3"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fff2e9]">
                    <Icon className="h-4 w-4 text-orange-500" strokeWidth={1.9} />
                  </span>

                  <span className="min-w-0 text-[14.5px] font-medium text-navy-800">
                    {label}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* ================= RIGHT — CONNECTED HUB ================= */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="min-w-0"
          >
            <img
              src="/images/qsr_why_upwon_right.webp"
              alt="UpWon at the centre of procurement, central kitchen, inventory, outlets, workforce, sales and reporting workflows"
              width={1536}
              height={1024}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
          </motion.div>
        </div>

        {/* ================= CENTRAL KITCHEN TO OUTLET ================= */}
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-10 rounded-[18px] border border-navy-950/[0.06] bg-white px-4 py-6 shadow-[0_12px_34px_rgba(25,35,55,0.06)] sm:px-8 sm:py-8"
        >
          <motion.div
            variants={fadeUp}
            className="relative [container-type:inline-size]"
          >
            <img
              src="/images/qsr_why_upwon_bottom.webp"
              alt="Central kitchen supplying company-owned outlets and franchise locations, with unified visibility on one dashboard"
              width={2172}
              height={724}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />

            {/* The strip is drawn without its labels, so they sit under each
                illustration */}
            <div className="relative mt-2 h-9 sm:h-11">
              {FLOW_LABELS.map(({ label, left }) => (
                <span
                  key={label}
                  className="absolute top-0 w-[24%] -translate-x-1/2 text-center font-semibold leading-tight text-navy-900"
                  style={{ left, fontSize: FLOW_LABEL_SIZE }}
                >
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
