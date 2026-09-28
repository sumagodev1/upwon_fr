import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import { sweetsIcon } from '../../../../lib/sweetsIcons.js';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.15 };

function ClientLogo({ client }) {
  return (
    <div className="flex h-[58px] w-[140px] shrink-0 items-center justify-center sm:w-[165px]">
      <img
        src={client.src}
        alt={client.name}
        loading="lazy"
        decoding="async"
        className="max-h-[46px] w-auto max-w-full object-contain transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}

/**
 * CMS-only: the copy, the logo marquee and the figures come from the CMS via
 * the page. With nothing published - or the API unreachable - the section
 * renders nothing rather than falling back to built-in content.
 *
 * @param {{ section?: object | null }} props - the published trust section.
 */
export default function SweetsProofStripSection({ section = null }) {
  const reduceMotion = useReducedMotion();

  const d = (value) => (reduceMotion ? 0 : value);
  const stagger = (value) => (reduceMotion ? 0 : value);

  /* ================= VARIANTS ================= */

  const headingGroup = {
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

  const statsGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.08), delayChildren: 0.1 },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, y: d(18) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };

  if (!section) return null;

  const clients = section.logos;
  const stats = section.stats;

  return (
    <section className="relative overflow-hidden bg-[#fdf4ea] py-12 sm:py-16 lg:py-20">
      {/* ================= BACKGROUND ================= */}
      {/* The artwork is a decorative border of sweets and namkeen bowls, so it
          is anchored to fill the frame with the copy sitting over its centre. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/images/sweet_proof_strip_back.webp')",
          backgroundSize: '100% 100%',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-[#fdf4ea]/45" />
      </div>

      <Container className="relative z-10">
        {/* ================= HEADING ================= */}
        <motion.div
          variants={headingGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto max-w-4xl text-center"
        >
          {section.eyebrow && (
            <motion.div variants={fadeIn}>
              <Eyebrow className="justify-center">{section.eyebrow}</Eyebrow>
            </motion.div>
          )}

          <motion.h2
            variants={fadeUp}
            className="mt-4 h-display text-[30px] leading-[1.1] tracking-tight text-navy-950 sm:text-[34px] lg:text-[36.8px]"
          >
            <HeadingLines lines={section.headingLines} />
          </motion.h2>


          {section.subtext && (
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
            >
              {section.subtext}
            </motion.p>
          )}
        </motion.div>

        {/* ================= CLIENT MARQUEE ================= */}
        {/* Two identical copies with animate-ticker shifting the track -50%,
            so the loop is seamless. The second copy is decorative. */}
        {clients.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: d(18) }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          className="mx-auto mt-9 max-w-6xl overflow-hidden rounded-[22px] border border-[#f0dfcc] bg-white/80 py-5 shadow-[0_12px_35px_rgba(120,70,35,0.07)] backdrop-blur-sm sm:mt-11"
        >
          <div className="mask-fade-lr relative overflow-hidden">
            <div
              className={`flex w-max items-center gap-10 px-6 md:gap-16 ${
                reduceMotion
                  ? ''
                  : 'animate-ticker [animation-duration:38s] hover:[animation-play-state:paused]'
              }`}
            >
              {clients.map((client, index) => (
                <ClientLogo key={`${client.name}-${index}`} client={client} />
              ))}

              <div
                className="flex items-center gap-10 md:gap-16"
                aria-hidden="true"
              >
                {clients.map((client, index) => (
                  <ClientLogo key={`dup-${client.name}-${index}`} client={client} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        )}

        {/* ================= STATS ================= */}
        {stats.length > 0 && (
        <motion.div
          variants={statsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto mt-5 grid max-w-6xl grid-cols-2 overflow-hidden rounded-[22px] border border-[#f0dfcc] bg-white/80 shadow-[0_14px_40px_rgba(120,70,35,0.08)] backdrop-blur-sm sm:mt-6 sm:grid-cols-3 lg:grid-cols-6"
        >
          {stats.map(({ value, label, icon }, index) => {
            const Icon = sweetsIcon(icon);
            return (
            <motion.div
              key={`${label}-${index}`}
              variants={statVariants}
              className={`flex flex-col items-center px-3 py-7 text-center sm:px-4 ${
                index !== stats.length - 1
                  ? 'border-b border-[#f2e5d6] sm:border-b-0 lg:border-r'
                  : ''
              }`}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#fbe3ce]">
                <Icon className="h-7 w-7 text-[#8a4a12]" strokeWidth={1.7} />
              </span>

              <p className="mt-4 h-display text-[24px] font-bold leading-none text-navy-950 sm:text-[27px]">
                {value}
              </p>

              <p className="mt-2 max-w-[150px] text-xs leading-relaxed text-navy-600">
                {label}
              </p>

            </motion.div>
            );
          })}
        </motion.div>
        )}
      </Container>
    </section>
  );
}
