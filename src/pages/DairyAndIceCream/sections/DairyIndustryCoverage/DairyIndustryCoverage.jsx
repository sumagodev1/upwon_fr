import { useCallback, useEffect, useRef, useState } from 'react';
import {
  m as motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.2 };

const CATEGORIES = [
  { label: 'Milk Processing', photo: '/images/ind_cov_milk_process.webp' },
  { label: 'Flavoured Milk', photo: '/images/ind_cov_flavered_milk.webp' },
  {
    label: 'Yogurt & Cultured Products',
    photo: '/images/ind_cov_yogert.webp',
  },
  { label: 'Cheese & Paneer', photo: '/images/ind_cov_cheese_paneer.webp' },
  { label: 'Butter & Ghee', photo: '/images/ind_cov_butter_ghee.webp' },
  {
    label: 'Cream & Dairy Ingredients',
    photo: '/images/ind_cov_cream_dairy.webp',
  },
  {
    label: 'Ice Cream Manufacturing',
    photo: '/images/ind_cov_icecream_manfact.webp',
  },
  { label: 'Frozen Desserts', photo: '/images/ind_cov_frozen_desert.webp' },
  {
    label: 'Ice Cream Parlours',
    photo: '/images/ind_cov_icecream_parlor.webp',
  },
  { label: 'Dairy Distribution', photo: '/images/ind_cov_dairy_distrub.webp' },
  {
    label: 'Dairy Retail Operations',
    photo: '/images/ind_cov_dairy_retail.webp',
  },
  {
    label: 'Multi-Location Dairy & Ice Cream Businesses',
    photo: '/images/ind_cov_multi_loc.webp',
  },
];

const HEADING = (
  <>
    Built for a Wide Range of
    {/* Held to two lines rather than one long run at desktop widths */}
    <br className="hidden sm:block" />{' '}
    <span className="gradient-text-orange">
      Dairy &amp; Ice Cream Businesses.
    </span>
  </>
);

const SUBTEXT =
  'UpWon can support connected workflows across dairy and frozen product categories, including:';

function CategoryCard({ label, photo, className = '' }) {
  return (
    <article
      className={`flex min-w-0 flex-col overflow-hidden rounded-[16px] border border-navy-950/[0.06] bg-white shadow-[0_10px_30px_rgba(25,35,55,0.07)] transition-shadow duration-300 hover:shadow-[0_18px_42px_rgba(25,35,55,0.12)] ${className}`}
    >
      <img
        src={photo}
        alt={label}
        loading="lazy"
        decoding="async"
        className="block h-[190px] w-full object-cover object-center"
      />

      <h3 className="h-display px-4 py-4 text-[14.5px] font-semibold leading-snug text-navy-950">
        {label}
      </h3>
    </article>
  );
}

export default function DairyIndustryCoverage() {
  const reduceMotion = useReducedMotion();

  /* ================= HORIZONTAL SCROLL ================= */

  // The track is translated by however much it overflows its frame, and the
  // section is made that much taller — so the pinned frame consumes exactly
  // the vertical scroll the track needs, then releases.
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const trackRef = useRef(null);
  const [distance, setDistance] = useState(0);

  const measure = useCallback(() => {
    const frame = frameRef.current;
    const track = trackRef.current;

    if (!frame || !track) return;

    setDistance(Math.max(0, track.scrollWidth - frame.clientWidth));
  }, []);

  useEffect(() => {
    measure();

    const observer = new ResizeObserver(measure);
    if (frameRef.current) observer.observe(frameRef.current);
    if (trackRef.current) observer.observe(trackRef.current);

    window.addEventListener('resize', measure);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const progress = useTransform(scrollYProgress, [0, 1], [0.04, 1]);

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

  const heading = (
    <motion.div
      variants={group}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className="min-w-0"
    >
      <motion.div variants={fadeIn}>
        <Eyebrow>INDUSTRY COVERAGE</Eyebrow>
      </motion.div>

      <motion.h2
        variants={fadeUp}
        className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
      >
        {HEADING}
      </motion.h2>

      <motion.p
        variants={fadeUp}
        className="mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
      >
        {SUBTEXT}
      </motion.p>
    </motion.div>
  );

  return (
    <>
      {/* =========================================================
          DESKTOP — the frame pins while the categories travel
          sideways, the way the reference layout reads. Opted out of
          the layout's section fade: that transform would fight the
          sticky frame on the way in.
      ========================================================= */}
      <section
        ref={sectionRef}
        data-no-fade
        className="relative hidden bg-white lg:block"
        style={{
          height: reduceMotion ? undefined : `calc(100vh + ${distance}px)`,
        }}
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pb-4 pt-14">
          <Container className="w-full">{heading}</Container>

          {/* The frame sits inside the shared container, so the first card
              starts on the heading's left edge and the row stays centred on
              the page — the padded wrapper holds the width, the inner box
              does the clipping. */}
          <div className="container-max container-px mt-8">
            <div ref={frameRef} className="w-full overflow-hidden">
              <motion.div
                ref={trackRef}
                style={{ x: reduceMotion ? 0 : x }}
                className="flex w-max gap-6"
              >
                {CATEGORIES.map((category) => (
                  <CategoryCard
                    key={category.label}
                    {...category}
                    className="w-[290px] shrink-0 xl:w-[310px]"
                  />
                ))}
              </motion.div>
            </div>
          </div>

          {/* Travelled-so-far rail */}
          <Container className="mt-6 w-full">
            <div className="h-[3px] w-full overflow-hidden rounded-full bg-navy-950/[0.08]">
              <motion.div
                style={{ scaleX: reduceMotion ? 1 : progress }}
                className="h-full w-full origin-left rounded-full bg-gradient-to-r from-orange-400 to-orange-500"
              />
            </div>
          </Container>
        </div>
      </section>

      {/* =========================================================
          MOBILE / TABLET — pinning a viewport-tall frame is hostile
          on a small screen, so the same categories lay out as a grid.
      ========================================================= */}
      <section className="relative bg-white py-12 sm:py-16 lg:hidden">
        <Container>
          {heading}

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {CATEGORIES.map((category) => (
              <CategoryCard key={category.label} {...category} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
