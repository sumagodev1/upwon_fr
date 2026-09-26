import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { m as motion } from 'framer-motion';
import { ChevronRight, ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';

/*
  POS "Customer Outcomes" — a ClickUp-style testimonial marquee. Each card is a
  wide panel: a customer photo on the left, and on the right the brand logo, the
  quote, the attribution and a "Read case study" link. The row scrolls
  continuously, full-bleed, looping seamlessly. Hover pauses the motion.
*/

const EASE = [0.22, 1, 0.3, 1];

/*
  The built-in copy, written in the shape the API sends so that a CMS section
  and the shipped one take one identical path through the render below.
*/
const EYEBROW = 'Customer Outcomes';
const HEADING_LINES = [
  [
    { text: 'Software replaced. ', accent: false },
    { text: 'Results delivered.', accent: true },
  ],
];
const SUBTEXT = 'The receipts from real F&B brands running their counter on UpWon POS.';

const CASES = [
  {
    slug: 'u2-cake-visibility',
    name: 'U2 Cake',
    logo: '/images/testimonial/u2cake.webp',
    photo: '/images/fms_hero2.webp',
    quote:
      'Every order, every outlet, every minute — fully visible on one screen. 6,000+ orders a day now run through UpWon POS without a single manual stock count.',
    personName: 'U2 Cake Leadership Team',
    personCompany: 'Bakery Chain · 250+ Outlets',
    linkLabel: 'Read case study',
    linkHref: '/clients/u2-cake',
  },
  {
    slug: 'kaka-halwai-billing',
    name: 'Kaka Halwai',
    logo: '/images/testimonial/kaka%20halwai.webp',
    photo: '/images/fms_hero1.webp',
    quote:
      'Billing at the counter is 48% faster and our stock finally matches reality. Recipe-level deduction means we know our true food cost on every sale, instantly.',
    personName: 'Kaka Halwai Operations',
    personCompany: 'Namkeen & Sweets',
    linkLabel: 'Read case study',
    linkHref: '/clients/kaka-halwai',
  },
  {
    slug: 'u2-cake-margins',
    name: 'U2 Cake',
    logo: '/images/testimonial/u2cake.webp',
    photo: '/images/fms_hero3.webp',
    quote:
      '₹23 Lakh+ of daily business runs on one system — counter, kitchen and finance all reading the same numbers. Our margins are no longer a month-end guess.',
    personName: 'U2 Cake Finance Team',
    personCompany: 'Bakery Chain',
    linkLabel: 'Read case study',
    linkHref: '/clients/u2-cake',
  },
];

function Card({ c }) {
  return (
    <div className="relative w-[86vw] shrink-0 overflow-hidden rounded-[28px] border border-cream-300 bg-cream-50 shadow-sm sm:w-[620px] md:min-h-[420px] lg:w-[720px]">
      <div className="flex h-full flex-col md:flex-row md:items-stretch">
        {/* Photo */}
        <div className="relative w-full shrink-0 md:w-[42%]">
          <img
            src={c.photo}
            alt={c.name}
            loading="lazy"
            decoding="async"
            className="h-48 w-full object-cover md:h-full"
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-center p-6 md:p-9">
          <div className="flex items-center gap-1.5">
            <img
              src={c.logo}
              alt={`${c.name} logo`}
              className="h-8 w-auto max-w-[150px] object-contain"
            />
            <ChevronRight className="h-5 w-5 text-navy-400" strokeWidth={2.2} />
          </div>

          <p className="mt-5 text-[15px] font-medium leading-relaxed text-navy-800 md:text-[17px]">
            &ldquo;{c.quote}&rdquo;
          </p>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[14px] font-bold text-navy-950">{c.personName}</p>
              <p className="mt-0.5 text-[14px] text-navy-500">{c.personCompany}</p>
            </div>
            <Link
              to={c.linkHref}
              className="group/link inline-flex items-center gap-1.5 text-[14px] font-semibold text-navy-900 underline-offset-4 transition-colors hover:text-orange-600 hover:underline"
            >
              {c.linkLabel}
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                strokeWidth={2.2}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PosCustomerOutcomes({ section = null }) {
  const scroller = useRef(null);
  const paused = useRef(false);

  // Continuous auto-scroll; loops seamlessly by wrapping at the halfway point
  // (the track is duplicated). Pauses on hover or while a nudge is animating.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return undefined;
    let raf;
    const tick = () => {
      if (!paused.current) {
        const half = el.scrollWidth / 2;
        el.scrollLeft = el.scrollLeft >= half ? el.scrollLeft - half : el.scrollLeft + 0.6;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const nudge = (dir) => {
    const el = scroller.current;
    if (!el) return;
    // Pause the drift briefly so the manual scroll reads cleanly.
    paused.current = true;
    el.scrollBy({ left: dir * (el.clientWidth * 0.6), behavior: 'smooth' });
    window.setTimeout(() => {
      paused.current = false;
    }, 700);
  };

  /*
    A published set replaces the built-in one wholesale: a marquee mixing
    authored cards with shipped ones would quote customers nobody chose.
  */
  const stories = section && section.stories.length > 0 ? section.stories : CASES;
  const eyebrow = section ? section.eyebrow : EYEBROW;
  const headingLines = section ? section.headingLines : HEADING_LINES;
  const subtext = section ? section.subtext : SUBTEXT;

  // Duplicated so the marquee loops seamlessly (it wraps at the halfway point).
  const track = [...stories, ...stories];

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      <Container>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          {eyebrow && <Eyebrow className="justify-center">{eyebrow}</Eyebrow>}
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.08] tracking-tight text-navy-950">
            <HeadingLines lines={headingLines} />
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            {subtext}
          </p>
        </motion.div>
      </Container>

      {/* Full-bleed continuous marquee */}
      <div className="relative mt-12 w-full">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent md:w-28" />

        <div
          ref={scroller}
          onMouseEnter={() => {
            paused.current = true;
          }}
          onMouseLeave={() => {
            paused.current = false;
          }}
          className="flex gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {track.map((c, i) => (
            <Card key={`${c.slug}-${i}`} c={c} />
          ))}
        </div>
      </div>

      {/* Scroll arrows */}
      <Container>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label="Scroll to previous stories"
            className="grid h-11 w-11 place-items-center rounded-full border border-cream-300 text-navy-700 transition-colors hover:border-navy-900 hover:text-navy-950"
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label="Scroll to next stories"
            className="grid h-11 w-11 place-items-center rounded-full border border-cream-300 text-navy-700 transition-colors hover:border-navy-900 hover:text-navy-950"
          >
            <ArrowRight className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      </Container>
    </section>
  );
}
