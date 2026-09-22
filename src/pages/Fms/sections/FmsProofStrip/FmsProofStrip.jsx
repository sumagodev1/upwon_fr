import { m as motion } from 'framer-motion';
import { Store, Factory, ShoppingCart } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

/*
  FMS Proof Strip — de-risks the visit with real, sourced franchise-network
  numbers. Left: an animated wall of live franchise/multi-outlet brand marks.
  Right: a 2×2 stat-card grid. Honest, not inflated.
*/

const EASE = [0.22, 1, 0.3, 1];

const STATS = [
  {
    icon: Store,
    label: 'Outlets on one platform',
    sub: 'Monginis',
    value: '200+',
    color: '#1D6FE0',
    tint: 'rgba(29,111,224,0.1)',
  },
  {
    icon: Store,
    label: 'Outlets, real-time visibility',
    sub: 'U2 Cake',
    value: '250+',
    color: '#22A45D',
    tint: 'rgba(34,164,93,0.1)',
  },
  {
    icon: Factory,
    label: 'Plants connected',
    sub: 'To the outlet network',
    value: '16',
    color: '#7C5CFC',
    tint: 'rgba(124,92,252,0.1)',
  },
  {
    icon: ShoppingCart,
    label: 'Orders processed daily',
    sub: 'Across live deployments',
    value: '1.5L+',
    color: '#E85A2A',
    tint: 'rgba(232,90,42,0.1)',
  },
];

const LOGOS = [
  { name: 'Monginis', src: '/images/testimonial/mongignis.webp' },
  { name: 'Kaka Halwai', src: '/images/testimonial/kaka%20halwai.webp' },
  { name: 'U2 Cake', src: '/images/testimonial/u2cake.webp' },
  { name: 'Gokul', src: '/images/testimonial/gokul.webp' },
  { name: 'OFC', src: '/images/testimonial/ofc.webp' },
  { name: 'Winni', src: '/images/testimonial/winni.webp' },
];

// Rotate the full set into each column so every column stays dense (no blank
// gaps as it scrolls) while each shows a different order.
const rotate = (arr, n) => [...arr.slice(n), ...arr.slice(0, n)];
const COLUMNS = [rotate(LOGOS, 0), rotate(LOGOS, 2), rotate(LOGOS, 4)];

function BrandCard({ logo }) {
  return (
    <div className="grid h-24 shrink-0 place-items-center rounded-2xl border border-cream-300 bg-white px-6 shadow-sm">
      <img
        src={logo.src}
        alt={`${logo.name} logo`}
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
          <BrandCard key={`${b.name}-${i}`} logo={b} />
        ))}
      </motion.div>
    </div>
  );
}

export default function FmsProofStrip() {
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
          <Eyebrow className="justify-center">Proof Strip</Eyebrow>
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            Not a Pitch.{' '}
            <span className="gradient-text-orange">Just What&apos;s Already Running.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            Franchise-network-specific proof, shown honestly — not inflated to compete on
            headline-grabbing restaurant counts.
          </p>
        </motion.div>

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Left — animated brand wall */}
          <div className="relative h-[420px] overflow-hidden md:h-[460px]">
            <div className="grid h-full grid-cols-3 gap-4">
              <MarqueeColumn items={COLUMNS[0]} dir={1} duration={24} />
              <MarqueeColumn items={COLUMNS[1]} dir={-1} duration={20} />
              <MarqueeColumn items={COLUMNS[2]} dir={1} duration={26} />
            </div>
            {/* fade top/bottom */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#f5f6fa] to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#f5f6fa] to-transparent" />
          </div>

          {/* Right — 2×2 stat cards */}
          <div className="grid grid-cols-2 gap-4 md:gap-5">
            {STATS.map((s, i) => {
              const Icon = s.icon;
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
                    style={{ background: s.tint, color: s.color }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <p className="mt-4 text-[14px] font-bold text-navy-950">{s.label}</p>
                  <p className="text-[14px] text-navy-500">{s.sub}</p>
                  <p className="num-display mt-3 text-3xl text-navy-950 md:text-4xl">{s.value}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
