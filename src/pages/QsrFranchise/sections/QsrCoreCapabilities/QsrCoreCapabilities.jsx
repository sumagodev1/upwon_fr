import { useCallback, useEffect, useRef, useState } from 'react';
import { m as motion, useReducedMotion } from 'framer-motion';
import {
  ShoppingCart,
  Factory,
  FileText,
  Store,
  Package,
  BarChart3,
  Users,
  PieChart,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.15 };

// Gap between cards, kept in one place so the arrows step by exactly one card
const CARD_GAP = 20;

// How fast the row drifts on its own, in pixels per second
const DRIFT_SPEED = 42;

const CAPABILITIES = [
  {
    number: '01',
    title: 'Centralized Procurement & Inventory Control',
    description:
      'Get a clearer view of ingredients, raw materials, packaging materials, semi-finished goods, finished products, and stock movement across central kitchens, warehouses, and outlets.',
    Icon: ShoppingCart,
    tint: 'bg-[#fff3ec]',
    ink: 'text-orange-500',
  },
  {
    number: '02',
    title: 'Connected Central Kitchen Operations',
    description:
      'Bring production requirements, recipes, materials, production activities, and outlet demand closer together with better visibility across central kitchen workflows.',
    Icon: Factory,
    tint: 'bg-[#eef4fd]',
    ink: 'text-[#2f6fed]',
  },
  {
    number: '03',
    title: 'Recipe, Production & Cost Visibility',
    description:
      'Maintain better visibility across recipes, ingredient requirements, production activities, consumption, and operational cost-related workflows.',
    Icon: FileText,
    tint: 'bg-[#eef8f1]',
    ink: 'text-[#1f9d55]',
  },
  {
    number: '04',
    title: 'Multi-Outlet & Franchise Operations',
    description:
      'Bring company-owned outlets, franchise locations, kitchens, warehouses, and operational teams onto one connected system.',
    Icon: Store,
    tint: 'bg-[#fdeef4]',
    ink: 'text-[#d6336c]',
  },
  {
    number: '05',
    title: 'Outlet Inventory & Stock Movement',
    description:
      'Support connected workflows for stock receipt, transfers, issues, returns, consumption, replenishment, and movement between locations.',
    Icon: Package,
    tint: 'bg-[#f4eefd]',
    ink: 'text-[#7c3aed]',
  },
  {
    number: '06',
    title: 'Smarter Sales & Order Management',
    description:
      'Manage orders and sales activity through connected workflows with better visibility across outlets, channels, and operational teams.',
    Icon: BarChart3,
    tint: 'bg-[#fff3ec]',
    ink: 'text-orange-500',
  },
  {
    number: '07',
    title: 'Connected Workforce Operations',
    description:
      'Support employees across kitchens, outlets, offices, and other locations with connected workflows for attendance, shifts, payroll, leave, and workforce visibility.',
    Icon: Users,
    tint: 'bg-[#eef4fd]',
    ink: 'text-[#2f6fed]',
  },
  {
    number: '08',
    title: 'Real-Time Business Insights',
    description:
      'Access dashboards and reports that provide visibility into inventory, outlet activity, sales, production, location performance, and overall business operations.',
    Icon: PieChart,
    tint: 'bg-[#eef8f1]',
    ink: 'text-[#1f9d55]',
  },
];

export default function QsrCoreCapabilities() {
  const reduceMotion = useReducedMotion();

  /* ================= CAROUSEL ================= */

  const trackRef = useRef(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const [paused, setPaused] = useState(false);

  // The track holds two copies of the set for the loop, so position is read
  // against one copy's width.
  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track || !track.clientWidth) return;

    const half = track.scrollWidth / 2;
    const total = Math.max(1, Math.ceil(half / track.clientWidth));

    setPages(total);
    setPage(
      Math.min(total - 1, Math.round((track.scrollLeft % half) / track.clientWidth))
    );
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    track.addEventListener('scroll', measure, { passive: true });

    return () => {
      observer.disconnect();
      track.removeEventListener('scroll', measure);
    };
  }, [measure]);

  const behavior = reduceMotion ? 'auto' : 'smooth';

  // One card per press, so the row never skips past a capability
  const step = (direction) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector('[data-card]');
    const distance = card ? card.offsetWidth + CARD_GAP : track.clientWidth;

    track.scrollBy({ left: direction * distance, behavior });
  };

  const goToPage = (index) => {
    const track = trackRef.current;
    if (!track) return;

    track.scrollTo({ left: index * track.clientWidth, behavior });
  };

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

  const imageVariants = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.96 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: EASE } },
  };

  /* ================= CARD ================= */

  const renderCard = (
    { number, title, description, Icon, tint, ink },
    index,
    isCopy = false
  ) => (
    <article
      key={isCopy ? `copy-${number}` : number}
      data-card
      aria-hidden={isCopy ? 'true' : undefined}
      /* A third of the track less its share of the gaps, so exactly three
         cards sit fully in view at a time */
      className={`flex w-[82%] shrink-0 flex-col rounded-[16px] border p-5 transition-shadow duration-300 hover:shadow-[0_16px_38px_rgba(25,35,55,0.11)] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-13.34px)] ${
        index === 0
          ? 'border-orange-500/40 bg-[#fff7f2]'
          : 'border-navy-950/[0.07] bg-white shadow-[0_8px_24px_rgba(25,35,55,0.05)]'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="h-display text-[26px] font-extrabold leading-none tracking-tight text-navy-950">
          {number}
        </p>

        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${tint}`}
        >
          <Icon className={`h-5 w-5 ${ink}`} strokeWidth={1.7} />
        </span>
      </div>

      <h3 className="mt-4 h-display text-[15.5px] font-semibold leading-snug text-navy-950">
        {title}
      </h3>

      <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-navy-600">
        {description}
      </p>
    </article>
  );

  return (
    <section className="relative overflow-hidden bg-[#fbfcfe] py-12 sm:py-16 lg:py-20">
      <Container className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-10 xl:gap-12">
          {/* ================= LEFT — ARTWORK ================= */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="min-w-0"
          >
            <img
              src="/images/qsr_core_capabilities.webp"
              alt="A chef reviewing the UpWon dashboard, surrounded by procurement, production, recipes, outlets, inventory, sales and workforce workflows"
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
          </motion.div>

          {/* ================= RIGHT — HEADING + CAROUSEL ================= */}
          <div className="min-w-0">
            <motion.div
              variants={group}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="text-center"
            >
              <motion.div variants={fadeIn}>
                <Eyebrow className="justify-center">CORE CAPABILITIES</Eyebrow>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="mt-3 h-display text-[26px] leading-[1.12] tracking-tight text-navy-950 sm:text-[30px] lg:text-[34px]"
              >
                Built to Power Every Part of Your{' '}
                <span className="gradient-text-orange">F&amp;B Operations</span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mx-auto mt-3 max-w-2xl text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
              >
                From ingredients to outlets, people to performance — UpWon
                brings all your key operations together in one connected
                platform.
              </motion.p>
            </motion.div>

            {/* ---------- Controls ---------- */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="mt-6 flex justify-end gap-2.5"
            >
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous capabilities"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-950/[0.1] bg-white text-navy-800 transition-colors duration-300 hover:border-navy-950/25"
              >
                <ChevronLeft className="h-[18px] w-[18px]" strokeWidth={2.2} />
              </button>

              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next capabilities"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white transition-colors duration-300 hover:bg-orange-600"
              >
                <ChevronRight className="h-[18px] w-[18px]" strokeWidth={2.2} />
              </button>
            </motion.div>

            {/* ---------- Track ---------- */}
            {/* Native horizontal scroll, so a trackpad or touch swipe works
                the same as the arrows */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              ref={trackRef}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocusCapture={() => setPaused(true)}
              onBlurCapture={() => setPaused(false)}
              className="mt-4 flex overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              style={{ gap: CARD_GAP }}
            >
              {CAPABILITIES.map((capability, index) =>
                renderCard(capability, index)
              )}

              {/* Second copy of the set, so the drift wraps without a seam */}
              {CAPABILITIES.map((capability, index) =>
                renderCard(capability, index, true)
              )}
            </motion.div>

            {/* ---------- Position ---------- */}
            <div className="mt-5 flex items-center justify-center gap-2">
              {Array.from({ length: pages }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToPage(index)}
                  aria-label={`Go to capabilities ${index + 1}`}
                  className={`h-[4px] rounded-full transition-all duration-500 ${
                    index === page
                      ? 'w-8 bg-orange-500'
                      : 'w-5 bg-navy-950/[0.14] hover:bg-navy-950/25'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
