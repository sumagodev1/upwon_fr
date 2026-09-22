import { useCallback, useEffect, useRef, useState } from 'react';
import { m as motion, useReducedMotion } from 'framer-motion';
import {
  ShoppingCart,
  ClipboardList,
  Package,
  Settings,
  ShieldCheck,
  Truck,
  Store,
  ChevronRight,
} from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.12 };

// Seconds between one step landing and the next
const STEP_DELAY = 0.16;

const STEPS = [
  {
    number: '01',
    title: 'Procure',
    description:
      'Source milk, ingredients, raw materials, and packaging materials based on production requirements and inventory needs.',
    photo: '/images/dairy_procure.webp',
    Icon: ShoppingCart,
  },
  {
    number: '02',
    title: 'Receive',
    description:
      'Record incoming materials and bring inventory into the right production, storage, or warehouse location.',
    photo: '/images/dairy_receive.webp',
    Icon: ClipboardList,
  },
  {
    number: '03',
    title: 'Store & Manage',
    description:
      'Maintain organized visibility across raw materials, ingredients, packaging materials, and inventory locations.',
    photo: '/images/dairy_store_manage.webp',
    Icon: Package,
  },
  {
    number: '04',
    title: 'Process & Produce',
    description:
      'Coordinate production activities and the movement of materials into dairy and ice cream products.',
    photo: '/images/dairy_process_produce.webp',
    Icon: Settings,
  },
  {
    number: '05',
    title: 'Quality & Batch Control',
    description:
      'Maintain visibility across production batches and quality inspection touchpoints throughout operations.',
    photo: '/images/dairy_batch_control.webp',
    Icon: ShieldCheck,
  },
  {
    number: '06',
    title: 'Store & Dispatch',
    description:
      'Coordinate finished-product storage, warehouse movement, dispatch, and distribution activities.',
    photo: '/images/dairy_store_dispatch.webp',
    Icon: Truck,
  },
  {
    number: '07',
    title: 'Sell & Replenish',
    description:
      'Manage movement to distributors, retailers, parlours, customers, and other sales channels while supporting ongoing replenishment decisions.',
    photo: '/images/dairy_sell_replenish.webp',
    Icon: Store,
  },
];

const ROW_ONE = STEPS.slice(0, 4);
const ROW_TWO = STEPS.slice(4);

/*
  The serpentine rail is built from plain divs: straight runs are 3px bars and
  each turn is a 40px box carrying two adjacent borders plus a full corner
  radius, which renders as a clean quarter arc.

  Where those runs sit is measured from the cards themselves rather than
  assumed — card heights shift with the viewport, and a hardcoded offset drifts
  off the card centres as soon as the copy rewraps.
*/
const R = 40; // corner radius of each turn
const RAIL = 3; // rail thickness
const RAIL_OUTSET = 32; // how far the rail runs past the cards on each side
const RAIL_COLOR = '#d7dcf1';

// The icon badge straddles the card's top edge, so the card's own centre sits
// half that overhang below the middle of the article that wraps it.
const ICON_PAD = 28;
const CARD_CENTER = `calc(50% + ${ICON_PAD / 2}px)`;

// The rail only makes sense once both rows sit side by side
const RAIL_MIN_WIDTH = 1280;

// Layout offset up to an ancestor. Measured through offsetTop rather than
// getBoundingClientRect because the cards animate in on a transform, and a
// rect read mid-flight would pin the rail to wherever a card happened to be.
const offsetWithin = (node, ancestor) => {
  let y = 0;
  let el = node;

  while (el && el !== ancestor) {
    y += el.offsetTop;
    el = el.offsetParent;
  }

  return y;
};

export default function DairyRawToSales() {
  const reduceMotion = useReducedMotion();

  const d = (value) => (reduceMotion ? 0 : value);
  const delay = (index) => (reduceMotion ? 0 : index * STEP_DELAY);

  /* ================= RAIL GEOMETRY ================= */

  const flowRef = useRef(null);
  const rowOneRef = useRef(null);
  const rowTwoRef = useRef(null);
  const [rail, setRail] = useState(null);

  const measure = useCallback(() => {
    const flow = flowRef.current;
    const one = rowOneRef.current?.querySelector('[data-card]');
    const two = rowTwoRef.current?.querySelector('[data-card]');

    if (!flow || !one || !two || window.innerWidth < RAIL_MIN_WIDTH) {
      setRail(null);
      return;
    }

    const aTop = offsetWithin(one, flow);
    const bTop = offsetWithin(two, flow);

    setRail({
      rowOne: Math.round(aTop + one.offsetHeight / 2),
      rowTwo: Math.round(bTop + two.offsetHeight / 2),
      band: Math.round((aTop + one.offsetHeight + bTop) / 2),
    });
  }, []);

  useEffect(() => {
    measure();

    const observer = new ResizeObserver(measure);
    if (flowRef.current) observer.observe(flowRef.current);
    if (rowOneRef.current) observer.observe(rowOneRef.current);
    if (rowTwoRef.current) observer.observe(rowTwoRef.current);

    window.addEventListener('resize', measure);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

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
    hidden: { opacity: 0, y: d(16) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  /* ================= RAIL PIECES ================= */

  const bar = (key, style) => (
    <span
      key={key}
      aria-hidden="true"
      className="absolute rounded-full"
      style={{ backgroundColor: RAIL_COLOR, ...style }}
    />
  );

  const arc = (key, corner, style) => (
    <span
      key={key}
      aria-hidden="true"
      className={`absolute h-10 w-10 ${corner}`}
      style={{ borderColor: RAIL_COLOR, ...style }}
    />
  );

  const chevron = (side) => (
    <span
      className={`absolute ${side} z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-navy-950/[0.06] bg-white shadow-[0_6px_16px_rgba(25,35,55,0.1)] xl:flex`}
      style={{ top: CARD_CENTER }}
    >
      <ChevronRight className="h-4 w-4 text-navy-800" strokeWidth={2.4} />
    </span>
  );

  /* ================= CARD ================= */

  const renderCard = (
    { number, title, description, photo, Icon },
    index,
    showChevron
  ) => (
    <motion.article
      key={number}
      initial={{ opacity: 0, y: d(26) }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.55, ease: EASE, delay: delay(index) }}
      className="relative flex min-w-0 flex-col"
      style={{ paddingTop: ICON_PAD }}
    >
      {/* Icon badge, straddling the top edge of the card */}
      <span className="absolute left-1/2 top-0 z-20 flex h-[68px] w-[68px] -translate-x-1/2 items-center justify-center rounded-full bg-white shadow-[0_10px_26px_rgba(25,35,55,0.13)]">
        <Icon className="h-8 w-8 text-orange-500" strokeWidth={1.6} />
      </span>

      <div
        data-card
        className="relative flex min-h-[380px] flex-1 flex-col overflow-hidden rounded-[16px] border border-navy-950/[0.06] bg-gradient-to-b from-[#f8f9fd] to-white px-5 pt-9 shadow-[0_10px_30px_rgba(25,35,55,0.06)] transition-shadow duration-300 hover:shadow-[0_18px_42px_rgba(25,35,55,0.12)]"
      >
        <div>
          <p className="h-display text-[26px] font-bold leading-none text-orange-500">
            {number}
          </p>

          <h3 className="mt-3 h-display text-[15px] font-semibold leading-snug text-navy-950 sm:text-base">
            {title}
          </h3>

          <p className="mt-2.5 text-[12.5px] leading-relaxed text-navy-700 sm:text-[13px]">
            {description}
          </p>
        </div>

        {/* The photo takes whatever height the copy leaves and bleeds to the
            card edges, so it never sits under the text. Only its top edge is
            feathered — the rest stays at full clarity. */}
        <div className="relative -mx-5 mt-4 min-h-[130px] flex-1">
          <img
            src={photo}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            onLoad={measure}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white via-white/70 to-transparent" />
        </div>
      </div>

      {/* Step chevrons live in the gutters, so only where the rail shows */}
      {showChevron && chevron('-right-12')}
    </motion.article>
  );

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
      <Container className="relative z-10">
        {/* ================= HEADING ================= */}
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <motion.div variants={fadeIn}>
            <Eyebrow>FROM RAW MATERIALS TO EVERY SALES CHANNEL</Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
          >
            A Connected Flow for{' '}
            <span className="gradient-text-orange">Every Product Movement</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-2xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
          >
            From procurement to replenishment, every stage stays connected—so
            materials, batches, and finished products keep moving with visibility
            across your operations.
          </motion.p>
        </motion.div>

        {/* ================= FLOW ================= */}
        <div ref={flowRef} className="relative mt-10 sm:mt-12">
          {/* ---------- Serpentine rail ---------- */}
          {rail && (
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="pointer-events-none absolute inset-y-0"
              style={{ left: -RAIL_OUTSET, right: -RAIL_OUTSET }}
            >
              {/* start dot */}
              {bar('dot', {
                left: 0,
                top: rail.rowOne - 7,
                height: 14,
                width: 14,
              })}

              {/* row one, then the turn down the right side */}
              {bar('row-one', {
                left: 0,
                right: R,
                top: rail.rowOne,
                height: RAIL,
              })}
              {arc('turn-tr', 'rounded-tr-[40px] border-r-[3px] border-t-[3px]', {
                right: 0,
                top: rail.rowOne,
              })}
              {bar('down-right', {
                right: 0,
                top: rail.rowOne + R,
                height: Math.max(0, rail.band - R - (rail.rowOne + R)),
                width: RAIL,
              })}
              {arc('turn-br', 'rounded-br-[40px] border-b-[3px] border-r-[3px]', {
                right: 0,
                top: rail.band - R,
              })}

              {/* back across the band, then down the left side */}
              {bar('band', {
                left: R,
                right: R,
                top: rail.band - RAIL,
                height: RAIL,
              })}
              {arc('turn-tl', 'rounded-tl-[40px] border-l-[3px] border-t-[3px]', {
                left: 0,
                top: rail.band - RAIL,
              })}
              {bar('down-left', {
                left: 0,
                top: rail.band - RAIL + R,
                height: Math.max(0, rail.rowTwo - R - (rail.band - RAIL + R)),
                width: RAIL,
              })}
              {arc('turn-bl', 'rounded-bl-[40px] border-b-[3px] border-l-[3px]', {
                left: 0,
                top: rail.rowTwo - R,
              })}

              {/* row two */}
              {bar('row-two', {
                left: R,
                right: 0,
                top: rail.rowTwo - RAIL,
                height: RAIL,
              })}
            </motion.div>
          )}

          {/* ---------- Row one — steps 01-04 ---------- */}
          <div
            ref={rowOneRef}
            className="relative z-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-14"
          >
            {ROW_ONE.map((step, index) =>
              renderCard(step, index, index < ROW_ONE.length - 1)
            )}
          </div>

          {/* ---------- Row two — steps 05-07 ---------- */}
          {/* Inset a little so the run reads as a return leg, as in the layout */}
          <div
            ref={rowTwoRef}
            className="relative z-10 mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:mx-[6%] xl:mt-16 xl:gap-x-14"
          >
            {ROW_TWO.map((step, index) => (
              <div key={step.number} className="relative min-w-0">
                {/* leading chevron, ahead of step 05 */}
                {index === 0 && chevron('-left-12')}

                {renderCard(
                  step,
                  index + ROW_ONE.length,
                  index < ROW_TWO.length - 1
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
