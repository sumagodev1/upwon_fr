import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { m as motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Container from '../Container/Container.jsx';
import Eyebrow from '../Eyebrow/Eyebrow.jsx';
import HeadingLines from '../HeadingLines/HeadingLines.jsx';

/*
  "Customer Outcomes" — a "designed for all teams"-style card carousel: heading +
  CTAs up top, then a peeking row of outcome cards (a portrait tile, a punchy
  title, the story, attribution, and a circular arrow to the full case study).

  CMS-driven when a `section` is passed, and falls back to the constants
  otherwise — the same arrangement the page's other sections use, so the SSG
  build and an unreachable API both render the carousel the site ships.

  PUBLICATION FLAG: the KBJ Foods story below is PARAPHRASED FROM RESEARCH, not a
  sign-off-ready quote, and the remaining cards are DUMMY PLACEHOLDER content for
  layout only. That is what the fallback holds; the published set is the CMS's,
  so confirming wording and consent is now an edit rather than a deploy.
*/

const EASE = [0.22, 1, 0.3, 1];

/*
  Every card is tinted with the section's orange. It is the site's brand colour
  rather than something authored per story, so it stays here rather than being
  a field an editor could set to something off-palette.
*/
const ACCENT = '#E85A2A';

/*
  The built-in copy, written in the shape the API sends so that a CMS section
  and the shipped one take one identical path through the render below.
*/
const EYEBROW = 'Customer Outcomes';
const HEADING_LINES = [
  [
    { text: 'Real Outcomes for Every ', accent: false },
    { text: 'Distribution Team.', accent: true },
  ],
];

const BUTTONS = {
  primary: { label: 'Get started', href: '/demo' },
  secondary: { label: 'View all stories', href: '/clients' },
};

const STORIES = [
  {
    title: 'He found his weakest distributor in the data — not at year-end.',
    body: 'As SKU count and route coverage outran manual dispatch and pricing control, Pravesh read the numbers instead of waiting for the year-end review — identified an underperforming distributor territory and cut it by 50%. Distributor profitability rose within the year, and distributors began proactively calling head office, instead of the other way round.',
    name: 'Pravesh Kumar',
    role: 'Sales & Distribution Head',
    company: 'KBJ Foods',
    photo: '/images/parvesh_kumar.webp',
    href: '/clients',
  },
  {
    title: 'Route coverage went up — without adding a single feet-on-street.',
    body: 'Beat plans that used to live in a supervisor’s notebook now run in the app. Reps follow optimised routes, head office sees live coverage, and the same team services 30% more outlets a week — with no extra hiring.',
    name: 'Anita Sharma',
    role: 'National Sales Manager',
    company: 'Sunrise Beverages',
    photo: '/images/anita_sharma.webp',
    href: '/clients',
  },
  {
    title: 'Secondary sales visibility, finally in real time.',
    body: 'Primary billing was always clear; what happened after the distributor was a black box. With order-to-outlet capture, secondary sales now update daily — so forecasting, schemes and stock decisions are made on real demand, not a month-old guess.',
    name: 'Rahul Mehta',
    role: 'Distribution Lead',
    company: 'Metro Foods',
    photo: '/images/rahul_mehata.webp',
    href: '/clients',
  },
  {
    title: 'Scheme claims settled in days, not weeks.',
    body: 'Distributor claims used to bounce between email, Excel and finance for weeks. Now they are raised, validated against sales and approved inside one flow — settlement time dropped sharply and disputes fell with it.',
    name: 'Vikram Rao',
    role: 'Channel Head',
    company: 'GreenLeaf FMCG',
    photo: '/images/vikram_rao.webp',
    href: '/clients',
  },
];

export default function CustomerOutcomesStory({ section = null }) {
  const viewportRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [index, setIndex] = useState(0);

  const eyebrow = section ? section.eyebrow : EYEBROW;
  const headingLines = section ? section.headingLines : HEADING_LINES;
  // An authored section may leave the buttons unset; the page keeps its own
  // pair then, because a heading with cards under it is still the section.
  const buttons = (section && section.buttons) || BUTTONS;
  const stories = section ? section.cards : STORIES;

  const count = stories.length;

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return undefined;
    const update = () => setWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /*
    A shorter published list can strand the carousel past its own end - the
    admin panel can deactivate the card the visitor is looking at.
  */
  useEffect(() => {
    setIndex((current) => Math.min(current, Math.max(0, count - 1)));
  }, [count]);

  const GAP = 24;
  // Wide card, leaving the next one peeking on the right.
  const cardW = width ? Math.min(880, Math.max(280, width - 90)) : 840;
  const step = cardW + GAP;
  const maxIndex = count - 1;
  const trackX = -Math.min(index, Math.max(0, maxIndex)) * step;

  return (
    <section className="px-4 py-8 md:px-6 md:py-10 lg:px-8">
      <div
        className="relative overflow-hidden rounded-[2.5rem] py-16 md:py-24"
        style={{
          background:
            'radial-gradient(120% 85% at 18% 100%, #EBE9FB 0%, #F4F2FE 42%, #FFFFFF 82%)',
        }}
      >
        <Container>
        {/* Top row — heading + CTAs */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.05] tracking-tight text-navy-950">
              <HeadingLines lines={headingLines} />
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="flex flex-wrap items-center gap-3"
          >
            <Link
              to={buttons.primary.href}
              className="inline-flex items-center justify-center rounded-full bg-navy-950 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-navy-900"
            >
              {buttons.primary.label}
            </Link>
            <Link
              to={buttons.secondary.href}
              className="inline-flex items-center justify-center rounded-full border border-navy-300 bg-white px-6 py-3 text-sm font-bold text-navy-900 transition-colors hover:bg-cream-100"
            >
              {buttons.secondary.label}
            </Link>
          </motion.div>
        </div>

        {/* Card carousel */}
        <div ref={viewportRef} className="mt-10 overflow-hidden md:mt-12">
          <motion.div
            className="flex items-stretch"
            style={{ gap: GAP }}
            animate={{ x: trackX }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {stories.map((s, i) => {
              const isActive = i === index;
              return (
                <motion.div
                  key={`${s.company}-${s.name}`}
                  className="relative shrink-0 rounded-[28px] bg-white p-5 shadow-sm md:p-6"
                  style={{ width: cardW }}
                  animate={{ opacity: isActive ? 1 : 0.55 }}
                  transition={{ duration: 0.7, ease: EASE }}
                >
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-stretch">
                    {/* Portrait tile */}
                    <div
                      className="grid aspect-square w-full shrink-0 place-items-center overflow-hidden rounded-2xl sm:w-56 md:w-64"
                      style={{ background: `${ACCENT}1A` }}
                    >
                      <img
                        src={s.photo}
                        alt={s.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col pb-8 pr-8 sm:justify-center">
                      <h3 className="h-display text-[1.35rem] leading-snug tracking-tight text-navy-950 md:text-[1.7rem]">
                        {s.title}
                      </h3>
                      <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-navy-600">
                        {s.body}
                      </p>
                      <div className="mt-6">
                        <p className="text-[15px] font-bold text-navy-950">{s.name}</p>
                        <p className="text-sm font-semibold" style={{ color: ACCENT }}>
                          {s.role}
                        </p>
                        <p className="text-sm text-navy-500">{s.company}</p>
                      </div>
                    </div>
                  </div>

                  {/* Circular arrow → case study */}
                  {s.href && (
                    <Link
                      to={s.href}
                      aria-label={`Read the ${s.company} case study`}
                      className="absolute bottom-5 right-5 grid h-14 w-14 place-items-center rounded-full bg-navy-950 text-white transition-colors hover:bg-navy-900 md:bottom-6 md:right-6"
                    >
                      <ArrowUpRight className="h-6 w-6" strokeWidth={2.2} />
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Dot pagination */}
        <div className="mt-8 flex items-center justify-center gap-2.5">
          {stories.map((s, i) => (
            <button
              key={`${s.company}-${s.name}-dot`}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to story ${i + 1}`}
              className="h-2.5 rounded-full transition-all"
              style={{
                width: i === index ? 26 : 10,
                background: i === index ? '#0F1535' : '#c9cdda',
              }}
            />
          ))}
        </div>
        </Container>
      </div>
    </section>
  );
}
