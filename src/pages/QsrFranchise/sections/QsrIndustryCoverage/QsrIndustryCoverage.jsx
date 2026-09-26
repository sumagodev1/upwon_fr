import { useEffect, useRef, useState } from 'react';
import { m as motion, useReducedMotion } from 'framer-motion';
import {
  Sandwich,
  UtensilsCrossed,
  Store,
  Coffee,
  ChefHat,
  Cloud,
  Building2,
  CakeSlice,
  IceCreamCone,
  Bike,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import { fetchQsrFranchiseCoverageSection } from '../../../../lib/qsrFranchisePage.js';
import { qsrFranchiseIcon } from '../../../../lib/qsrFranchiseIcons.js';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.15 };

// Gap between cards, kept in one place so the arrows step by exactly one card
const CARD_GAP = 20;

// How fast the row drifts on its own, in pixels per second
const DRIFT_SPEED = 40;

const SUBTEXT =
  'UpWon can support connected workflows across a wide range of food-service and multi-location business formats, including:';

/*
  The fallback: the published formats are the CMS's, and these are what the
  section shows during the SSG build, while the fetch is in flight, and
  whenever the API is unreachable.
*/
const FORMATS = [
  {
    label: 'Quick Service Restaurants (QSRs)',
    photo: '/images/quick_service_rest.webp',
    Icon: Sandwich,
  },
  {
    label: 'Restaurant Chains',
    photo: '/images/rest_chains.webp',
    Icon: UtensilsCrossed,
  },
  {
    label: 'Franchise-Led Food Brands',
    photo: '/images/franchise_led.webp',
    Icon: Store,
  },
  {
    label: 'Multi-Outlet Cafés',
    photo: '/images/cafe_outlet.webp',
    Icon: Coffee,
  },
  {
    label: 'Central Kitchen Operations',
    photo: '/images/qsr_central_kitchan_oper.webp',
    Icon: ChefHat,
  },
  {
    label: 'Cloud Kitchen Networks',
    photo: '/images/cloud_kitcha_net.webp',
    Icon: Cloud,
  },
  {
    label: 'Food Courts & Multi-Brand Food Concepts',
    photo: '/images/food_courts.webp',
    Icon: Building2,
  },
  {
    label: 'Bakery & Dessert Chains',
    photo: '/images/bakery_dessert_chains.webp',
    Icon: CakeSlice,
  },
  {
    label: 'Ice Cream & Frozen Dessert Parlours',
    photo: '/images/dessert_parlor.webp',
    Icon: IceCreamCone,
  },
  {
    label: 'Beverage & Café Chains',
    photo: '/images/beverage_cafe_chains.webp',
    Icon: Coffee,
  },
  {
    label: 'Takeaway & Delivery-First Brands',
    photo: '/images/delivery_first_brands.webp',
    Icon: Bike,
  },
  {
    label: 'Multi-Location F&B Businesses',
    photo: '/images/f_b_businesses.webp',
    Icon: Store,
  },
];

export default function QsrIndustryCoverage() {
  const reduceMotion = useReducedMotion();
  const [cms, setCms] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchQsrFranchiseCoverageSection().then((section) => {
      if (!cancelled && section) setCms(section);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const formats = cms
    ? cms.categories.map((category) => ({
        label: category.label,
        photo: category.photo,
        Icon: qsrFranchiseIcon(category.icon),
      }))
    : FORMATS;

  /* ================= CAROUSEL ================= */

  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);

  // The row drifts continuously rather than stepping card to card. Once it
  // passes the first copy of the set it rewinds by exactly that width, which
  // lands on an identical frame — so the loop never shows a seam. Hovering or
  // focusing it holds the row still.
  useEffect(() => {
    if (reduceMotion || paused) return undefined;

    let frame = 0;
    let last = performance.now();

    const tick = (now) => {
      const track = trackRef.current;

      if (track) {
        const half = track.scrollWidth / 2;
        let next = track.scrollLeft + (DRIFT_SPEED * (now - last)) / 1000;

        if (half > 0 && next >= half) next -= half;

        track.scrollLeft = next;
      }

      last = now;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [reduceMotion, paused]);

  // One card per press, so the row never skips past a format
  const step = (direction) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector('[data-card]');
    const distance = card ? card.offsetWidth + CARD_GAP : track.clientWidth;

    track.scrollBy({
      left: direction * distance,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

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

  /* ================= CARD ================= */

  const renderCard = ({ label, photo, Icon }, index, isCopy = false) => (
    <article
      key={isCopy ? `copy-${index}-${label}` : `${index}-${label}`}
      data-card
      aria-hidden={isCopy ? 'true' : undefined}
      className="flex w-[190px] shrink-0 flex-col rounded-[16px] border border-navy-950/[0.06] bg-white p-2.5 shadow-[0_10px_28px_rgba(25,35,55,0.07)] transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(25,35,55,0.12)] xl:w-[206px]"
    >
      {/* The icon badge straddles the photo's bottom edge */}
      <div className="relative">
        <img
          src={photo}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="block h-[150px] w-full rounded-[12px] object-cover object-center"
        />

        <span className="absolute -bottom-6 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-[#fff2e9] shadow-[0_8px_20px_rgba(25,35,55,0.12)]">
          <Icon className="h-5 w-5 text-orange-500" strokeWidth={1.7} />
        </span>
      </div>

      <h3 className="px-2 pb-2 pt-9 text-center text-[13px] font-semibold leading-snug text-navy-950">
        {label}
      </h3>
    </article>
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fffaf6] via-white to-[#fffaf6] py-12 sm:py-16 lg:py-20">
      <Container className="relative z-10">
        {/* ================= HEADING ================= */}
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto max-w-3xl text-center"
        >
          {(!cms || cms.eyebrow) && (
            <motion.div variants={fadeIn}>
              <Eyebrow className="justify-center">
                {cms ? cms.eyebrow : 'INDUSTRY COVERAGE'}
              </Eyebrow>
            </motion.div>
          )}

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
          >
            {cms ? (
              <HeadingLines lines={cms.headingLines} />
            ) : (
              <>
                Built for a Wide Range of QSR &amp;{' '}
                <span className="gradient-text-orange">
                  Franchise F&amp;B Businesses.
                </span>
              </>
            )}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
          >
            {cms ? cms.subtext : SUBTEXT}
          </motion.p>
        </motion.div>
      </Container>

      {/* ================= FORMATS ================= */}
      {/* Wider than the shared Container so the row reads as a long shelf */}
      <div className="relative z-10 mx-auto mt-10 w-full max-w-[1700px] px-4 sm:px-6 lg:px-8">
        {/* The arrows sit either side of the row rather than over it */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous formats"
            className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-navy-950/[0.08] bg-white text-navy-800 shadow-[0_8px_22px_rgba(25,35,55,0.1)] transition-colors duration-300 hover:border-navy-950/25 sm:flex"
          >
            <ChevronLeft className="h-[18px] w-[18px]" strokeWidth={2.2} />
          </button>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: EASE }}
            ref={trackRef}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
            className="flex min-w-0 flex-1 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ gap: CARD_GAP }}
          >
            {formats.map((format, index) => renderCard(format, index))}

            {/* Second copy of the set, so the drift wraps without a seam */}
            {formats.map((format, index) => renderCard(format, index, true))}
          </motion.div>

          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next formats"
            className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-navy-950/[0.08] bg-white text-navy-800 shadow-[0_8px_22px_rgba(25,35,55,0.1)] transition-colors duration-300 hover:border-navy-950/25 sm:flex"
          >
            <ChevronRight className="h-[18px] w-[18px]" strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </section>
  );
}
