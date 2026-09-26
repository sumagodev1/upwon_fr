import { useEffect, useState } from 'react';
import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.2 };

// Seconds each stat holds before the card turns over
const CARD_INTERVAL = 4200;

/**
 * CMS-only: the copy, the client logos and the figures - each with the
 * photograph the card shows while it is up - come from the CMS via the page.
 * With nothing published, or the API unreachable, the section renders nothing
 * rather than falling back to built-in content.
 *
 * @param {{ section?: object | null }} props - the published section.
 */
export default function DairyProofStrip({ section = null }) {
  const reduceMotion = useReducedMotion();
  const [tick, setTick] = useState(0);
  const clients = section?.logos ?? [];
  const stats = section?.stats ?? [];

  // One clock for the strip: the card turns over to its next stat and the
  // logo tiles cross-fade to their next brand on the same beat. Reduced
  // motion holds the opening arrangement.
  useEffect(() => {
    if (reduceMotion || !section) return undefined;

    const id = window.setInterval(
      () => setTick((current) => current + 1),
      CARD_INTERVAL
    );

    return () => window.clearInterval(id);
  }, [reduceMotion, section]);

  if (!section) return null;

  // Guarded: a section can be published with logos and no figures.
  const active = stats.length > 0 ? tick % stats.length : 0;

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

  const tilesGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.06), delayChildren: 0.12 },
    },
  };

  const tileVariants = {
    hidden: { opacity: 0, y: d(14) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.97 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
  };

  const stat = stats[active];

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-14 lg:py-16">
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
            {section.eyebrow && <Eyebrow>{section.eyebrow}</Eyebrow>}
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[24px] leading-[1.14] tracking-tight text-navy-950 sm:text-[28px] lg:text-[32px]"
          >
            <HeadingLines lines={section.headingLines} />
          </motion.h2>

          {section.subtext && (
            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
            >
              {section.subtext}
            </motion.p>
          )}
        </motion.div>

        {/* ================= LOGOS + STAT CARD ================= */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.55fr_0.85fr] lg:items-stretch">
          {/* ---------- Client grid ---------- */}
          {/* Cells overlap by a pixel so shared edges read as one hairline */}
          {clients.length > 0 && (
          <motion.div
            variants={tilesGroup}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="-m-px grid min-w-0 grid-cols-2 sm:grid-cols-3"
          >
            {clients.map((_, tileIndex) => {
              const showing = (tileIndex + tick) % clients.length;

              return (
                <motion.div
                  key={tileIndex}
                  variants={tileVariants}
                  className="group relative -mb-px -mr-px h-[120px] overflow-hidden border border-navy-950/[0.07] bg-white sm:h-[140px]"
                >
                  {clients.map((client, index) => (
                    <motion.div
                      key={`${client.name}-${index}`}
                      animate={{
                        opacity: index === showing ? 1 : 0,
                        y: index === showing ? 0 : d(6),
                      }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.6,
                        ease: EASE,
                        delay: reduceMotion ? 0 : tileIndex * 0.07,
                      }}
                      className="absolute inset-0 flex items-center justify-center px-5"
                    >
                      <img
                        src={client.src}
                        alt={index === showing ? client.name : ''}
                        aria-hidden={index === showing ? undefined : 'true'}
                        loading="lazy"
                        decoding="async"
                        className="max-h-[52px] w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105 sm:max-h-[58px]"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              );
            })}
          </motion.div>
          )}

          {/* ---------- Stat card ---------- */}
          {stat && (
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="relative min-h-[260px] min-w-0 overflow-hidden rounded-[16px] bg-navy-950 lg:min-h-0"
          >
            {stats.map((item, index) => (
              <motion.img
                key={`${item.photo}-${index}`}
                src={item.photo}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                animate={{ opacity: index === active ? 1 : 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE }}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            ))}

            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/45 to-navy-950/10" />

            <div className="relative flex h-full flex-col justify-end p-6">
              <motion.p
                key={`v-${active}`}
                initial={{ opacity: 0, y: d(10) }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="h-display text-[44px] font-extrabold leading-none tracking-tight text-white sm:text-[52px]"
              >
                {stat.value}
              </motion.p>

              <motion.p
                key={`l-${active}`}
                initial={{ opacity: 0, y: d(10) }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.06, ease: EASE }}
                className="mt-2 max-w-[85%] text-[13px] leading-snug text-white/80 sm:text-[13.5px]"
              >
                {stat.label}
              </motion.p>

              {/* Which stat is showing */}
              <div className="mt-5 flex items-center gap-1.5">
                {stats.map((item, index) => (
                  <span
                    key={`${item.photo}-${index}`}
                    aria-hidden="true"
                    className={`h-[3px] rounded-full transition-all duration-500 ${
                      index === active ? 'w-6 bg-orange-500' : 'w-2.5 bg-white/35'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}
