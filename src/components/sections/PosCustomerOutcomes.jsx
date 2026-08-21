import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { m as motion } from 'framer-motion';
import { ChevronRight, ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';

/*
  POS "Customer Outcomes" — a ClickUp-style testimonial marquee. Each card is a
  wide panel: a customer photo on the left, and on the right the brand logo, the
  quote, the attribution and a "Read case study" link. The row scrolls
  continuously, full-bleed, looping seamlessly. Hover pauses the motion.
*/

const EASE = [0.22, 1, 0.3, 1];

const CASES = [
  {
    logo: '/images/testimonial/u2cake.webp',
    logoAlt: 'U2 Cake',
    href: '/clients/u2-cake',
    photo: '/images/fms_hero2.webp',
    quote:
      'Every order, every outlet, every minute — fully visible on one screen. 6,000+ orders a day now run through UpWon POS without a single manual stock count.',
    name: 'U2 Cake Leadership Team',
    role: 'Bakery Chain · 250+ Outlets',
  },
  {
    logo: '/images/testimonial/kaka%20halwai.webp',
    logoAlt: 'Kaka Halwai',
    href: '/clients/kaka-halwai',
    photo: '/images/fms_hero1.webp',
    quote:
      'Billing at the counter is 48% faster and our stock finally matches reality. Recipe-level deduction means we know our true food cost on every sale, instantly.',
    name: 'Kaka Halwai Operations',
    role: 'Namkeen & Sweets',
  },
  {
    logo: '/images/testimonial/u2cake.webp',
    logoAlt: 'U2 Cake',
    href: '/clients/u2-cake',
    photo: '/images/fms_hero3.webp',
    quote:
      '₹23 Lakh+ of daily business runs on one system — counter, kitchen and finance all reading the same numbers. Our margins are no longer a month-end guess.',
    name: 'U2 Cake Finance Team',
    role: 'Bakery Chain',
  },
];

// Duplicate the set so the marquee can loop seamlessly (translate 0 → -50%).
const TRACK = [...CASES, ...CASES];

function Card({ c }) {
  return (
    <div className="relative w-[86vw] shrink-0 overflow-hidden rounded-[28px] border border-cream-300 bg-cream-50 shadow-sm sm:w-[620px] md:min-h-[420px] lg:w-[720px]">
      <div className="flex h-full flex-col md:flex-row md:items-stretch">
        {/* Photo */}
        <div className="relative w-full shrink-0 md:w-[42%]">
          <img
            src={c.photo}
            alt={c.logoAlt}
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
              alt={`${c.logoAlt} logo`}
              className="h-8 w-auto max-w-[150px] object-contain"
            />
            <ChevronRight className="h-5 w-5 text-navy-400" strokeWidth={2.2} />
          </div>

          <p className="mt-5 text-[15px] font-medium leading-relaxed text-navy-800 md:text-[17px]">
            &ldquo;{c.quote}&rdquo;
          </p>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[14px] font-bold text-navy-950">{c.name}</p>
              <p className="mt-0.5 text-[14px] text-navy-500">{c.role}</p>
            </div>
            <Link
              to={c.href}
              className="group/link inline-flex items-center gap-1.5 text-[14px] font-semibold text-navy-900 underline-offset-4 transition-colors hover:text-orange-600 hover:underline"
            >
              Read case study
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

export default function PosCustomerOutcomes() {
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
          <Eyebrow className="justify-center">Customer Outcomes</Eyebrow>
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.08] tracking-tight text-navy-950">
            Software replaced. <span className="gradient-text-orange">Results delivered.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            The receipts from real F&amp;B brands running their counter on UpWon POS.
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
          {TRACK.map((c, i) => (
            <Card key={`${c.name}-${i}`} c={c} />
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
