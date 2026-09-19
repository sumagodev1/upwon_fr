import { m as motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.15 };

/*
  Why UpWon — Industry Trust

  The manufacturing environments UpWon runs in, laid out so the whole set
  reads in one view rather than scrolling. Each card points at the industry
  page that actually covers it — several of the engineering categories share
  one page, which is deliberate.
*/
const INDUSTRIES = [
  {
    label: 'Engineering Components Manufacturing',
    photo: '/images/why_comp_manfacturing.webp',
    to: '/industries/engineering-manufacturing',
  },
  {
    label: 'Industrial Equipment Manufacturing',
    photo: '/images/why_ind_equ_manfacturing.webp',
    to: '/industries/engineering-manufacturing',
  },
  {
    label: 'Machine & Machinery Manufacturing',
    photo: '/images/why_machine_and_machinary.webp',
    to: '/industries/engineering-manufacturing',
  },
  {
    label: 'Automotive Components',
    photo: '/images/why_automotive_components.webp',
    to: '/industries/engineering-manufacturing',
  },
  {
    label: 'Electrical & Electronics Manufacturing',
    photo: '/images/why_electrical_manfacturing.webp',
    to: '/industries/engineering-manufacturing',
  },
  {
    label: 'Beverage & Food Manufacturing',
    photo: '/images/why_beverage_manfacturing.webp',
    to: '/industries/beverage',
  },
  {
    label: 'Consumer Product Manufacturing',
    photo: '/images/why_consumer_product_manfacturing.webp',
    to: '/industries/non-food-fmcg',
  },
];

export default function WhyUpwonIndustryTrust() {
  const reduceMotion = useReducedMotion();

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

  const cardsGroup = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.07,
        delayChildren: 0.18,
      },
    },
  };

  const cardIn = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-12 lg:py-14">
      {/* Soft light in the top-right corner, as in the layout */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-[#f1f5fc] opacity-70 blur-[100px]"
      />

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
            <Eyebrow>BUILT FOR GROWING BUSINESSES</Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
          >
            Designed to Support Complex{' '}
            <span className="gradient-text-orange">
              Manufacturing Operations.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
          >
            UpWon can support connected workflows across a wide range of
            engineering and manufacturing environments.
          </motion.p>
        </motion.div>

        {/* ================= INDUSTRIES ================= */}
        {/* All seven sit on one row from xl, and reflow to fewer columns
            below it rather than scrolling sideways */}
        <motion.div
          variants={cardsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:mt-10 lg:grid-cols-4 lg:gap-5 xl:grid-cols-7"
        >
          {INDUSTRIES.map(({ label, photo, to }) => (
            <motion.div key={label} variants={cardIn} className="min-w-0">
              <Link
                to={to}
                className="group flex h-full min-w-0 flex-col rounded-[16px] border border-navy-950/[0.06] bg-white p-2.5 shadow-[0_10px_28px_rgba(25,35,55,0.07)] transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(25,35,55,0.13)]"
              >
                <img
                  src={photo}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="block h-[150px] w-full rounded-[12px] object-cover object-center"
                />

                <div className="mt-3.5 flex flex-1 items-end justify-between gap-2.5 px-1.5 pb-1.5">
                  <h3 className="min-w-0 text-[12.5px] font-semibold leading-snug text-navy-950 sm:text-[13.5px]">
                    {label}
                  </h3>

                  {/* Hidden below sm: two cards fit across a 320px screen with
                      roughly 96px of text width each, and the 32px arrow plus
                      its gap would take half of that. It is decorative, so
                      dropping it gives the label the room it needs. */}
                  <span
                    aria-hidden="true"
                    className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-950/[0.05] text-navy-700 transition-colors duration-300 group-hover:bg-orange-500 group-hover:text-white sm:flex"
                  >
                    <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
