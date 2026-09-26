import { m as motion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import { posIcon } from '../../../../lib/posIcons.js';

/*
  POS Proof Strip — de-risks the visit with real, sourced counter-level numbers.
  Left: an auto-scrolling wall of live client logos. Right: a 4-up stat counter.
  Transaction-level proof, not an inflated outlet count. POS crimson theme.

  CMS-driven when a `section` is passed, and falls back to the constants
  otherwise — the same arrangement the page's other sections use, so the SSG
  build and an unreachable API both render the strip the site ships.
*/

const EASE = [0.22, 1, 0.3, 1];
const ORANGE = '#E85A2A';
const TINT = 'rgba(232,90,42,0.1)';

/*
  The built-in copy, written in the shape the API sends so that a CMS section
  and the shipped one take one identical path through the render below - icons
  included, which are names here as they are in the payload and resolved
  through posIcon() at render time.

  The accent is deliberately not per figure: this strip draws one divided row
  in a single colour, so there is nothing for a stored accent to change.
*/
const EYEBROW = 'Proof Strip';
const HEADING_LINES = [
  [
    { text: 'Not a Pitch. ', accent: false },
    { text: "Just What's Already Running.", accent: true },
  ],
];
const SUBTEXT =
  'Real transaction-level proof from live counters — not an inflated outlet count to win a headline war.';

const STATS = [
  { icon: 'ShoppingBag', value: '6,000+', label: 'orders processed daily (U2 Cake)' },
  { icon: 'Wallet', value: '₹23L+', label: 'daily transaction value' },
  { icon: 'Timer', value: '48%', label: 'faster billing (Kaka Halwai)' },
  { icon: 'Store', value: '250+', label: 'outlets running live' },
];

const LOGOS = [
  { alt: 'Monginis', image: '/images/testimonial/mongignis.webp' },
  { alt: 'Kaka Halwai', image: '/images/testimonial/kaka%20halwai.webp' },
  { alt: 'U2 Cake', image: '/images/testimonial/u2cake.webp' },
  { alt: 'Gokul', image: '/images/testimonial/gokul.webp' },
  { alt: 'OFC', image: '/images/testimonial/ofc.webp' },
  { alt: 'Winni', image: '/images/testimonial/winni.webp' },
];

function LogoCard({ logo }) {
  return (
    <div className="grid h-20 w-[150px] shrink-0 place-items-center rounded-2xl border border-cream-300 bg-white px-5 shadow-sm">
      <img
        src={logo.image}
        alt={`${logo.alt} logo`}
        loading="lazy"
        decoding="async"
        className="max-h-11 w-auto max-w-[120px] object-contain"
      />
    </div>
  );
}

// A horizontally auto-scrolling logo row (duplicated for a seamless loop).
function MarqueeRow({ items, dir = 1, duration = 26 }) {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex w-max gap-4"
        animate={{ x: dir > 0 ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {loop.map((l, i) => (
          <LogoCard key={`${l.alt}-${i}`} logo={l} />
        ))}
      </motion.div>
    </div>
  );
}

export default function PosProofStrip({ section = null }) {
  const eyebrow = section ? section.eyebrow : EYEBROW;
  const headingLines = section ? section.headingLines : HEADING_LINES;
  const subtext = section ? section.subtext : SUBTEXT;
  const logos = section ? section.logos : LOGOS;
  const stats = section ? section.stats : STATS;

  return (
    <section className="relative overflow-hidden bg-[#f5f6fa] py-16 md:py-24">
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
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            <HeadingLines lines={headingLines} />
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            {subtext}
          </p>
        </motion.div>

        {/* Card: logo marquee + 4-up stats */}
        <div className="mt-12 grid items-center gap-8 rounded-3xl border border-cream-300 bg-white p-6 shadow-sm md:p-8 lg:grid-cols-[0.85fr_1.4fr] lg:gap-10">
          {/* Left — logo marquee */}
          {logos.length > 0 && (
            <div className="relative min-w-0 overflow-hidden">
              <div className="flex flex-col gap-4">
                <MarqueeRow items={logos} dir={1} duration={26} />
                <MarqueeRow items={[...logos].reverse()} dir={-1} duration={30} />
              </div>
              {/* edge fades */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent" />
            </div>
          )}

          {/* Right — stat counter */}
          {stats.length > 0 && (
            <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-y-0 lg:border-l lg:border-cream-300 lg:pl-4">
              {stats.map((s, i) => {
                const Icon = posIcon(s.icon);
                return (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                    className={`px-4 text-center sm:px-5 ${i > 0 ? 'sm:border-l sm:border-cream-300' : ''}`}
                  >
                    <span
                      className="mx-auto grid h-14 w-14 place-items-center rounded-full"
                      style={{ background: TINT, color: ORANGE }}
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.8} />
                    </span>
                    <p className="num-display mt-4 text-3xl md:text-[2.1rem]" style={{ color: ORANGE }}>
                      {s.value}
                    </p>
                    <p className="mt-1 text-[14px] leading-snug text-navy-600">{s.label}</p>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
