import { m as motion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import { fmsIcon, fmsAccentTint } from '../../../../lib/fmsIcons.js';

/*
  FMS Proof Strip — de-risks the visit with real, sourced franchise-network
  numbers. Left: an animated wall of live franchise/multi-outlet brand marks.
  Right: a 2×2 stat-card grid. Honest, not inflated.

  CMS-driven when a `section` is passed, and falls back to the constants
  otherwise — the same arrangement the page's other sections use, so the SSG
  build and an unreachable API both render the strip the site ships.
*/

const EASE = [0.22, 1, 0.3, 1];

/*
  The built-in copy, written in the shape the API sends so that a CMS section
  and the shipped one take one identical path through the render below - icons
  included, which are names here as they are in the payload and resolved through
  fmsIcon() at render time.
*/
const EYEBROW = 'Proof Strip';
const HEADING_LINES = [
  [
    { text: 'Not a Pitch. ', accent: false },
    { text: "Just What's Already Running.", accent: true },
  ],
];
const SUBTEXT =
  'Franchise-network-specific proof, shown honestly — not inflated to compete on headline-grabbing restaurant counts.';

const STATS = [
  {
    icon: 'Store',
    label: 'Outlets on one platform',
    subtext: 'Monginis',
    value: '200+',
    accentColor: '#1D6FE0',
  },
  {
    icon: 'Store',
    label: 'Outlets, real-time visibility',
    subtext: 'U2 Cake',
    value: '250+',
    accentColor: '#22A45D',
  },
  {
    icon: 'Factory',
    label: 'Plants connected',
    subtext: 'To the outlet network',
    value: '16',
    accentColor: '#7C5CFC',
  },
  {
    icon: 'ShoppingCart',
    label: 'Orders processed daily',
    subtext: 'Across live deployments',
    value: '1.5L+',
    accentColor: '#E85A2A',
  },
];

const LOGOS = [
  { alt: 'Monginis', image: '/images/testimonial/mongignis.webp' },
  { alt: 'Kaka Halwai', image: '/images/testimonial/kaka%20halwai.webp' },
  { alt: 'U2 Cake', image: '/images/testimonial/u2cake.webp' },
  { alt: 'Gokul', image: '/images/testimonial/gokul.webp' },
  { alt: 'OFC', image: '/images/testimonial/ofc.webp' },
  { alt: 'Winni', image: '/images/testimonial/winni.webp' },
];

// Rotate the full set into each column so every column stays dense (no blank
// gaps as it scrolls) while each shows a different order.
const rotate = (arr, n) => (arr.length === 0 ? [] : [...arr.slice(n), ...arr.slice(0, n)]);

function BrandCard({ logo }) {
  return (
    <div className="grid h-24 shrink-0 place-items-center rounded-2xl border border-cream-300 bg-white px-6 shadow-sm">
      <img
        src={logo.image}
        alt={`${logo.alt} logo`}
        loading="lazy"
        decoding="async"
        className="max-h-12 w-auto max-w-[130px] object-contain"
      />
    </div>
  );
}

// A vertically auto-scrolling column (duplicated for a seamless loop).
function MarqueeColumn({ items, dir = 1, duration = 22 }) {
  const loop = [...items, ...items];
  return (
    <div className="relative h-full overflow-hidden">
      <motion.div
        className="flex flex-col gap-4"
        animate={{ y: dir > 0 ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {loop.map((b, i) => (
          <BrandCard key={`${b.alt}-${i}`} logo={b} />
        ))}
      </motion.div>
    </div>
  );
}

export default function FmsProofStrip({ section = null }) {
  const eyebrow = section ? section.eyebrow : EYEBROW;
  const headingLines = section ? section.headingLines : HEADING_LINES;
  const subtext = section ? section.subtext : SUBTEXT;
  const logos = section ? section.logos : LOGOS;
  const stats = section ? section.stats : STATS;

  /*
    The rotations are derived rather than fixed, so a wall of three marks or of
    twenty still fills all three columns. With two or fewer the rotations
    collapse onto each other, which reads as three copies of a short list -
    correct, and the honest way to draw a wall that small.
  */
  const columns = [rotate(logos, 0), rotate(logos, 2), rotate(logos, 4)];

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

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Left — animated brand wall */}
          {logos.length > 0 && (
            <div className="relative h-[420px] overflow-hidden md:h-[460px]">
              <div className="grid h-full grid-cols-3 gap-4">
                <MarqueeColumn items={columns[0]} dir={1} duration={24} />
                <MarqueeColumn items={columns[1]} dir={-1} duration={20} />
                <MarqueeColumn items={columns[2]} dir={1} duration={26} />
              </div>
              {/* fade top/bottom */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#f5f6fa] to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#f5f6fa] to-transparent" />
            </div>
          )}

          {/* Right — 2×2 stat cards */}
          {stats.length > 0 && (
            <div className="grid grid-cols-2 gap-4 md:gap-5">
              {stats.map((s, i) => {
                const Icon = fmsIcon(s.icon);
                return (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                    className="rounded-3xl border border-cream-300 bg-white p-5 shadow-sm md:p-6"
                  >
                    <span
                      className="grid h-11 w-11 place-items-center rounded-2xl"
                      style={{
                        background: fmsAccentTint(s.accentColor, 0.1),
                        color: s.accentColor,
                      }}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.9} />
                    </span>
                    <p className="mt-4 text-[14px] font-bold text-navy-950">{s.label}</p>
                    <p className="text-[14px] text-navy-500">{s.subtext}</p>
                    <p className="num-display mt-3 text-3xl text-navy-950 md:text-4xl">
                      {s.value}
                    </p>
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
