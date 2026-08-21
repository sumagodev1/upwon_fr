import { useState } from 'react';
import { Quote, Star } from 'lucide-react';
import Container from '../ui/Container.jsx';

/**
 * Continuous horizontal-scrolling testimonials. Two rows, same direction,
 * no hover-pause. Each card carries a 5-star rating, the quote, an avatar
 * photo of the author and their role + brand.
 *
 * Reusable across home, product, industry and clients pages — pass a custom
 * `eyebrow` / `title` to retitle the strip.
 */
const TESTIMONIALS = [
  {
    quote:
      'UpWon did not just replace software. It rebuilt how we run a bakery business at scale.',
    author: 'Operations Leadership',
    role: 'Monginis',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=70',
    fallbackColor: '#E85A2A',
  },
  {
    quote:
      'We have been running this business for 130 years. UpWon is the first system that finally speaks our language.',
    author: 'Plant Operations Head',
    role: 'Kaka Halwai',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=70',
    fallbackColor: '#C8820A',
  },
  {
    quote:
      'We needed a system that could scale to 250 outlets without breaking — UpWon delivered.',
    author: 'Franchise Operations',
    role: 'U2 Cake & Burger',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=70',
    fallbackColor: '#E91E63',
  },
  {
    quote:
      'Our 16-plant footprint runs on one operational spine. The CFO sees today\'s P&L today.',
    author: 'Finance Director',
    role: 'Monginis',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=70',
    fallbackColor: '#E85A2A',
  },
  {
    quote:
      'FEFO enforced automatically. Expiry write-offs went to zero in our perishable lines.',
    author: 'Supply Chain Head',
    role: 'Vatsalya Dairy',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=70',
    fallbackColor: '#1565C0',
  },
  {
    quote:
      'Every rep\'s day is planned, tracked and measurable — not reported after the fact.',
    author: 'National Sales Manager',
    role: 'Regional FMCG brand',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=70',
    fallbackColor: '#006D77',
  },
  {
    quote:
      'Counter staff went from 11-minute average bills to 5. Festival queues stopped breaking us.',
    author: 'Retail Operations',
    role: 'Kaka Halwai',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=70',
    fallbackColor: '#C8820A',
  },
  {
    quote:
      'We went live in 32 days. No rip-and-replace. No surprise bills. Promised, delivered.',
    author: 'CIO',
    role: 'Mid-cap food manufacturer',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=70',
    fallbackColor: '#2E7D32',
  },
];

// Inline 5-star row — gold filled stars
function StarRow({ rating = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating ? 'fill-amber-400 text-amber-400' : 'fill-cream-300 text-cream-300'
          }`}
        />
      ))}
    </div>
  );
}

// Avatar with image + initials fallback if the photo fails to load
function Avatar({ src, name, color }) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (!src || failed) {
    return (
      <div
        className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full ring-2 ring-cream-300"
        style={{ backgroundColor: `${color}1A`, color }}
      >
        <span className="font-display text-[14px] font-bold">{initials}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      loading="lazy" decoding="async"
      onError={() => setFailed(true)}
      className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-cream-300"
    />
  );
}

function TestimonialCard({ t }) {
  return (
    <article className="flex w-[340px] shrink-0 flex-col rounded-2xl border border-cream-300 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-enterprise md:w-[400px]">
      {/* Top: rating + quote icon */}
      <div className="flex items-center justify-between">
        <StarRow rating={t.rating} />
        <Quote className="h-4 w-4 text-orange-500/50" />
      </div>

      {/* Quote */}
      <p className="mt-4 text-[14px] leading-relaxed text-navy-900 md:text-[15px]">
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Footer: avatar + author */}
      <div className="mt-5 flex items-center gap-3 border-t border-cream-200 pt-4">
        <Avatar src={t.avatar} name={t.author} color={t.fallbackColor} />
        <div className="min-w-0 leading-tight">
          <p className="truncate text-[14px] font-semibold text-navy-950">
            {t.author}
          </p>
          <p className="truncate text-[14px] text-navy-600">{t.role}</p>
        </div>
      </div>
    </article>
  );
}

function MarqueeRow({ items, direction = 'left', duration = 50 }) {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent md:w-32" />

      <div
        className="flex w-max items-stretch gap-5 py-2"
        style={{
          animation: `ticker ${duration}s linear infinite`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {loop.map((t, i) => (
          <TestimonialCard key={`${t.role}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsMarquee({
  eyebrow = 'In their words',
  title,
  description,
}) {
  // Split testimonials into two rows, second row shifted so the two don't
  // mirror each other (more organic feel)
  const half = Math.ceil(TESTIMONIALS.length / 2);
  const rowA = TESTIMONIALS.slice(0, half);
  const rowB = [
    ...TESTIMONIALS.slice(half),
    ...TESTIMONIALS.slice(0, 2),
  ];

  return (
    <section className="relative overflow-hidden bg-white section-pad">
      <div className="absolute inset-0 grid-bg-light opacity-30" />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-orange-600">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse-slow" />
            {eyebrow}
          </p>
 <h2 className="mt-4 h-display text-[36.8px] text-balance text-navy-950">
            {title || (
              <>
                Operators talk.{' '}
                <span className="gradient-text-orange">We listen.</span>
              </>
            )}
          </h2>
          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-balance text-base leading-relaxed text-navy-600 md:text-lg">
              {description}
            </p>
          )}
        </div>
      </Container>

      {/* Two-row marquee — both rows scroll the same direction (single-direction
          animation per design review); differing speeds keep them from locking. */}
      <div className="mt-10 space-y-4">
        <MarqueeRow items={rowA} direction="left" duration={50} />
        {/* <MarqueeRow items={rowB} direction="right" duration={55} /> */}
        {/* <MarqueeRow items={rowB} direction="left" duration={55} /> */}
      </div>
    </section>
  );
}
