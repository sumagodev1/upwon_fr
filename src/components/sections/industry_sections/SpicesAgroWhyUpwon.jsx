import { m as motion, useReducedMotion } from 'framer-motion';
import { Leaf, Eye, BarChart3 } from 'lucide-react';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

const PROMISES = [
  { label: 'Greater Coordination', Icon: Leaf },
  { label: 'Better Visibility', Icon: Eye },
  { label: 'Smoother Operations', Icon: BarChart3 },
];

// The artwork leaves its middle empty, so the platform line sits in it. The
// figures are percentages of the 1293x1224 artwork and the type scales with
// it through a container query.
const HUB = { left: '49.7%', top: '46.7%', width: '30%' };
const HUB_TITLE_SIZE = 'clamp(15px, 4cqw, 30px)';
const HUB_NOTE_SIZE = 'clamp(7px, 1.55cqw, 12px)';

export default function SpicesAgroWhyUpwon() {
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
        <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10 xl:gap-14">
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
              Built to Keep Processing Operations{' '}
              <span className="gradient-text-orange">Moving as One.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
            >
              In spices and agro-processing operations, disconnected
              procurement, quality, production, inventory, warehouse, sales, and
              distribution workflows can create delays and reduce visibility.
              UpWon brings these workflows closer together—helping teams operate
              with greater coordination and control.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-7 border-l-[3px] border-orange-500 pl-4"
            >
              <p className="h-display text-[16px] font-bold leading-snug text-navy-950 sm:text-[17px]">
                One connected platform.
              </p>

              <p className="mt-1 text-[14.5px] leading-snug text-navy-500 sm:text-[15px]">
                From raw materials to every sales channel.
              </p>
            </motion.div>

            <motion.div
              variants={group}
              className="mt-8 flex items-center gap-x-4 sm:gap-x-5"
            >
              {PROMISES.map(({ label, Icon }, index) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  className={`flex min-w-0 items-center gap-2.5 ${
                    index > 0 ? 'border-l border-navy-950/[0.1] pl-4 sm:pl-5' : ''
                  }`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fff2e9] sm:h-10 sm:w-10">
                    <Icon
                      className="h-5 w-5 text-orange-500"
                      strokeWidth={1.7}
                    />
                  </span>

                  <span className="h-display min-w-0 text-[12.5px] font-semibold leading-snug text-navy-950 sm:text-[13.5px]">
                    {label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ================= RIGHT — CONNECTED RING ================= */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="relative min-w-0 [container-type:inline-size]"
          >
            <img
              src="/images/agro_why_upwon_sec.webp"
              alt="Procurement, quality, production, inventory, warehousing, distribution and reporting ringed around one connected platform"
              width={1293}
              height={1224}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />

            {/* The centring translate lives on this wrapper: the motion child
                animates transform, which would overwrite it */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
              style={{ left: HUB.left, top: HUB.top, width: HUB.width }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
              >
                <p
                  className="h-display font-bold leading-[1.15] text-navy-950"
                  style={{ fontSize: HUB_TITLE_SIZE }}
                >
                  One Connected{' '}
                  <span className="text-orange-500">Platform</span>
                </p>

                <span
                  aria-hidden="true"
                  className="mx-auto mt-[0.5em] block h-px w-[38%] bg-navy-950/15"
                />

                <p
                  className="mt-[0.6em] font-semibold uppercase leading-[1.5] tracking-[0.14em] text-navy-500"
                  style={{ fontSize: HUB_NOTE_SIZE }}
                >
                  From raw materials to every sales channel.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
