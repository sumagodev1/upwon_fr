import { useEffect, useState } from 'react';
import { m as motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import { ALL_CASES } from '../../../../data/caseStudy.js';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.15 };

/* How long a testimonial holds before the next one comes round */
const INTERVAL = 6500;

/*
  Why UpWon — Customer Trust & Testimonials

  The quotes are not written here: they come from the published case
  studies in src/data/caseStudy.js, so the page can never drift from what
  those studies say. Attribution follows the site's convention — the role
  and the company, not an invented individual.
*/
const LOGOS = {
  monginis: '/images/testimonial/mongignis.webp',
  'kaka-halwai': '/images/testimonial/kaka%20halwai.webp',
  'u2-cake': '/images/testimonial/u2cake.webp',
};

const TESTIMONIALS = ALL_CASES.filter((item) => item.testimonial).map(
  (item) => ({
    quote: item.testimonial.quote,
    author: item.testimonial.author,
    role: item.testimonial.role,
    brand: item.brand,
    category: item.category,
    location: item.location,
    slug: item.slug,
    logo: LOGOS[item.slug],
  }),
);

/* The full client wall, as it appears on the industry proof strips */
const CLIENTS = [
  { name: 'Winni', src: '/images/testimonial/winni.webp' },
  { name: 'U2 Cake', src: '/images/testimonial/u2cake.webp' },
  { name: 'OFC', src: '/images/testimonial/ofc.webp' },
  { name: 'Monginis', src: '/images/testimonial/mongignis.webp' },
  { name: 'Kaka Halwai', src: '/images/testimonial/kaka%20halwai.webp' },
  { name: 'Gokul', src: '/images/testimonial/gokul.webp' },
];

export default function WhyUpwonCustomerTrust() {
  const reduceMotion = useReducedMotion();

  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = TESTIMONIALS.length;
  const active = TESTIMONIALS[idx];

  // Auto-advance, held while the card is hovered or focused
  useEffect(() => {
    if (reduceMotion || paused || count < 2) return undefined;

    const id = setInterval(() => setIdx((i) => (i + 1) % count), INTERVAL);
    return () => clearInterval(id);
  }, [reduceMotion, paused, count]);

  const step = (direction) =>
    setIdx((i) => (i + direction + count) % count);

  /* ================= VARIANTS ================= */

  const group = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.55, ease: EASE } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  const swap = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: reduceMotion ? 0 : -8 },
    transition: { duration: 0.45, ease: EASE },
  };

  const arrowButton =
    'flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300';

  if (!count) return null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#fafbfe] to-white py-10 sm:py-12 lg:py-14">
      <Container className="relative z-10 !max-w-[1700px]">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
          {/* ================= LEFT — the claim ================= */}
          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="min-w-0"
          >
            <motion.div variants={fadeIn}>
              <Eyebrow>CUSTOMER TRUST &amp; TESTIMONIALS</Eyebrow>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-4 text-[15.5px] font-medium text-navy-600 sm:text-base"
            >
              Trusted by Forward-Thinking Businesses
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="mt-2 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
            >
              Built Around the Way Modern Businesses{' '}
              <span className="gradient-text-orange">Work.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
            >
              From growing manufacturers to multi-plant enterprises, businesses
              trust UpWon to simplify operations, improve visibility, and run
              from one connected system.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-7">
              <Link
                to="/clients"
                className="group inline-flex items-center gap-4 rounded-[10px] bg-navy-950 py-1.5 pl-6 pr-1.5 text-[14.5px] font-semibold text-white transition-colors duration-300 hover:bg-navy-900"
              >
                See Customer Stories
                <span className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-orange-500 transition-colors duration-300 group-hover:bg-orange-600">
                  <ArrowRight className="h-[18px] w-[18px]" strokeWidth={2.2} />
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* ================= RIGHT — the featured quote ================= */}
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
            className="grid min-w-0 overflow-hidden rounded-[20px] bg-white shadow-[0_18px_50px_rgba(25,35,55,0.09)] ring-1 ring-navy-950/[0.05] sm:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)]"
          >
            {/* Client plate — the logo stands in for a portrait */}
            <div className="flex flex-col items-center justify-center gap-5 bg-gradient-to-br from-[#eef3fb] via-[#f5f8fd] to-[#e9eff9] px-6 py-8">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`logo-${active.slug}`}
                  src={active.logo}
                  alt={active.brand}
                  loading="lazy"
                  decoding="async"
                  {...swap}
                  className="block h-[64px] w-auto max-w-[150px] object-contain"
                />
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.p
                  key={`meta-${active.slug}`}
                  {...swap}
                  className="text-center text-[11.5px] font-semibold uppercase leading-relaxed tracking-[0.14em] text-navy-500"
                >
                  {active.category}
                  <span className="mt-1 block font-medium normal-case tracking-normal text-navy-400">
                    {active.location}
                  </span>
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Quote */}
            <div className="flex min-w-0 flex-col p-6 sm:p-7 lg:p-8">
              <span
                aria-hidden="true"
                className="h-display text-[54px] leading-[0.6] text-orange-500/25"
              >
                &ldquo;
              </span>

              <div className="mt-4 min-h-[132px] sm:min-h-[148px]">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={`quote-${active.slug}`}
                    {...swap}
                    className="h-display text-[16px] font-semibold leading-[1.5] tracking-tight text-navy-950 sm:text-[17.5px]"
                  >
                    &ldquo;{active.quote}&rdquo;
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`by-${active.slug}`}
                  {...swap}
                  className="mt-5 min-w-0"
                >
                  <span className="block text-[14.5px] font-bold leading-tight text-navy-950">
                    {active.author}
                  </span>
                  <span className="mt-0.5 block text-[13px] leading-tight text-navy-500">
                    {active.role}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              <div className="mt-auto flex items-center justify-between gap-4 pt-7">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous testimonial"
                    className={`${arrowButton} bg-navy-950/[0.05] text-navy-700 hover:bg-navy-950/[0.09] hover:text-navy-950`}
                  >
                    <ChevronLeft className="h-[17px] w-[17px]" strokeWidth={2.2} />
                  </button>

                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next testimonial"
                    className={`${arrowButton} bg-orange-500 text-white hover:bg-orange-600`}
                  >
                    <ChevronRight className="h-[17px] w-[17px]" strokeWidth={2.2} />
                  </button>
                </div>

                <p className="text-[13px] font-semibold tabular-nums text-navy-400">
                  <span className="text-navy-950">
                    {String(idx + 1).padStart(2, '0')}
                  </span>{' '}
                  / {String(count).padStart(2, '0')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ================= CLIENT WALL ================= */}
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-10 lg:mt-14"
        >
          <motion.p
            variants={fadeIn}
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-navy-500"
          >
            Trusted by leading brands
          </motion.p>

          {/* The wall runs as a loop rather than a fixed row, so it reads as
              "and more" without needing to say it. Two copies of the set sit
              end to end and the track slides by exactly one copy, which lands
              on an identical frame — no seam. Hovering holds it still. */}
          <motion.div
            variants={fadeUp}
            className="group relative mt-5 overflow-hidden border-t border-navy-950/[0.07] pt-6 [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]"
          >
            <div
              className={`flex w-max items-center ${
                reduceMotion ? '' : 'upwon-brand-marquee'
              }`}
            >
              {[...CLIENTS, ...CLIENTS].map(({ name, src }, i) => (
                <div
                  key={`${name}-${i}`}
                  aria-hidden={i >= CLIENTS.length ? 'true' : undefined}
                  className="flex items-center"
                >
                  <span
                    aria-hidden="true"
                    className="mr-1 h-8 w-px shrink-0 bg-navy-950/[0.08]"
                  />

                  <span className="flex h-[52px] w-[136px] shrink-0 items-center justify-center px-2 sm:w-[158px]">
                    <img
                      src={src}
                      alt={i >= CLIENTS.length ? '' : name}
                      loading="lazy"
                      decoding="async"
                      className="max-h-full w-auto max-w-full object-contain"
                    />
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>

      <style>{`
        @keyframes upwon-brand-drift {
          to { transform: translateX(-50%); }
        }

        .upwon-brand-marquee {
          animation: upwon-brand-drift 34s linear infinite;
          will-change: transform;
        }

        .group:hover .upwon-brand-marquee {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .upwon-brand-marquee { animation: none; }
        }
      `}</style>
    </section>
  );
}
