import { useEffect, useRef, useState } from 'react';
import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import { fetchErpOutcomesSection } from '../../../../lib/erpPage.js';
import { FALLBACK_CARDS, FALLBACK_COPY } from './customerOutcomesContent.js';

/*
  "Customer Outcomes" — specific, operational social proof before the final CTA,
  presented as a horizontal carousel of image cards (heading + CTA on top,
  prev/next arrows below).

  The content is the CMS's. This file renders it and nothing else: the copy and
  every card arrive as data, and the built-in set in customerOutcomesContent.js
  is only what the page shows before the fetch lands and whenever the API cannot
  be reached.

  ⚠️ PUBLICATION FLAG — see customerOutcomesContent.js. The shipped quotes are
  paraphrased research placeholders, not cleared customer statements, and the
  same caution applies to anything written in their place through the admin
  panel.
*/

const EASE = [0.22, 1, 0.3, 1];

function OutcomeCard({ card }) {
  const dark = false; // all cards use the same light tinted background
  return (
    <article
      data-card
      className={`group grid shrink-0 snap-start grid-cols-1 overflow-hidden rounded-3xl border shadow-sm sm:h-[360px] sm:grid-cols-[1.05fr_0.95fr] ${
        dark ? 'border-navy-900 bg-navy-950' : 'border-orange-100 bg-orange-50'
      } w-[88%] sm:w-[74%] lg:w-[560px]`}
    >
      {/* Content */}
      <div className="flex flex-col p-6 md:p-7">
        <div className="flex items-center justify-between">
          <span
            className={`rounded-full px-2.5 py-1 text-[14px] font-semibold ${
              dark ? 'bg-white/10 text-cream-100' : 'bg-white text-navy-700'
            }`}
          >
            {card.industry}
          </span>
          <Quote className={`h-6 w-6 ${dark ? 'text-orange-400' : 'text-orange-500'}`} strokeWidth={2} />
        </div>

        <div className="mt-4">
          <span
            className={`num-display text-[2.1rem] leading-none ${dark ? 'text-white' : 'text-navy-950'}`}
          >
            {card.stat}
          </span>
          <p className={`mt-1.5 text-[14px] leading-snug ${dark ? 'text-cream-100/70' : 'text-navy-600'}`}>
            {card.statLabel}
          </p>
        </div>

        <p
          className={`mt-4 flex-1 text-[14px] leading-relaxed ${dark ? 'text-cream-100/90' : 'text-navy-800'}`}
        >
          “{card.quote}”
        </p>

        <div className={`border-t pt-3 ${dark ? 'border-white/10' : 'border-orange-200/70'}`}>
          <p className={`text-[14px] font-bold ${dark ? 'text-white' : 'text-navy-950'}`}>
            {card.authorRole}
          </p>
          <p className={`text-[14px] ${dark ? 'text-cream-100/60' : 'text-navy-600'}`}>
            {card.authorCompany}
          </p>
        </div>
      </div>

      {/* Image — top banner on mobile, right half on sm+ */}
      <div className="relative order-first h-40 overflow-hidden sm:order-none sm:h-full">
        <img
          src={card.image}
          alt={card.imageAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </article>
  );
}

export default function CustomerOutcomes() {
  const [copy, setCopy] = useState(FALLBACK_COPY);
  const [cards, setCards] = useState(FALLBACK_CARDS);
  const trackRef = useRef(null);

  /*
   * One read on mount, guarded inside the fetcher so the SSG build never makes
   * it. Copy and cards are swapped in separately: a section whose heading has
   * been edited but whose cards have not should show the new heading over the
   * built-in carousel rather than an empty track.
   */
  useEffect(() => {
    let cancelled = false;
    fetchErpOutcomesSection().then((section) => {
      if (cancelled || !section) return;
      setCopy({ eyebrow: section.eyebrow, headingLines: section.headingLines });
      if (section.cards.length > 0) setCards(section.cards);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('[data-card]');
    const amount = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  // Nothing published and nothing built in - render nothing rather than an
  // empty track with arrows that do nothing.
  if (cards.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-white py-14 md:py-20">
      <div className="pointer-events-none absolute inset-0 grid-bg-light opacity-40" />

      <Container className="relative">
        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            {copy.eyebrow && <Eyebrow>{copy.eyebrow}</Eyebrow>}
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
              <HeadingLines lines={copy.headingLines} />
            </h2>
          </div>
          <Link
            to="/clients"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-navy-300 bg-white px-5 py-2.5 text-sm font-semibold text-navy-950 transition-all duration-300 hover:border-orange-500 hover:bg-orange-500 hover:text-white"
          >
            See customer stories
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </motion.div>

        {/* Carousel */}
        <div className="mt-10">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {cards.map((card) => (
              <OutcomeCard key={card.authorRole + card.authorCompany} card={card} />
            ))}
          </div>

          {/* Arrows */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Previous"
              className="grid h-11 w-11 place-items-center rounded-full border border-navy-300 text-navy-800 transition-colors hover:border-orange-500 hover:bg-orange-500 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Next"
              className="grid h-11 w-11 place-items-center rounded-full border border-navy-300 text-navy-800 transition-colors hover:border-orange-500 hover:bg-orange-500 hover:text-white"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
