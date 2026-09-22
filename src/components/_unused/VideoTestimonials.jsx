import { useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, X, ArrowRight, ArrowUpRight } from 'lucide-react';
import Eyebrow from '../shared/Eyebrow/Eyebrow.jsx';

/*
  Client video testimonials — a rounded panel with a continuously auto-scrolling
  (left) 2-row marquee of uniform testimonial cards. Each card is a video still
  with the customer's quote + name overlaid and a play button. Play opens a
  modal that falls back to a "read the story" link where the mp4 isn't available.
*/

const EASE = [0.22, 1, 0.3, 1];

const TESTIMONIALS = [
  {
    brand: 'Monginis',
    role: 'Operations Leadership · Bakery',
    quote: 'UPWON rebuilt how we run a bakery business at scale.',
    poster:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=75',
    video: '/videos/monginis-testimonial.mp4',
  },
  {
    brand: 'Regional FMCG',
    role: 'National Sales Head · Distribution',
    quote: 'Profitability by territory — finally visible and actionable.',
    poster:
      'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=75',
    video: '/videos/fmcg-testimonial.mp4',
  },
  {
    brand: 'Vatsalya Dairy',
    role: 'Supply Chain Head · Dairy',
    quote: 'Expiry write-offs went to zero with automatic FEFO.',
    poster:
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=900&q=75',
    video: '/videos/vatsalya-testimonial.mp4',
  },
  {
    brand: 'Kaka Halwai',
    role: 'Plant Operations Head · Sweets',
    quote: 'The first system that finally speaks our language.',
    poster:
      'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=900&q=75',
    video: '/videos/kaka-halwai-testimonial.mp4',
  },
  {
    brand: 'Gokul',
    role: 'Retail Operations · Sweets',
    quote: 'Counter billing went from 11 minutes to 5.',
    poster:
      'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=900&q=75',
    video: '/videos/gokul-testimonial.mp4',
  },
  {
    brand: 'Winni',
    role: 'Finance · Gifting',
    quote: 'Credit notes that took days now close same-day.',
    poster:
      'https://images.unsplash.com/photo-1522124624696-7ea32eb9592c?auto=format&fit=crop&w=900&q=75',
    video: '/videos/winni-testimonial.mp4',
  },
  {
    brand: 'U2 Cake & Burger',
    role: 'Franchise Operations · QSR',
    quote: 'We scaled to 250 outlets without breaking.',
    poster:
      'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=900&q=75',
    video: '/videos/u2-cake-testimonial.mp4',
  },
  {
    brand: 'OFC',
    role: 'Operations · Food',
    quote: 'Real-time visibility across every plant, finally.',
    poster:
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=75',
    video: '/videos/ofc-testimonial.mp4',
  },
];

// Which cards span 2 columns — a scattered mix so widths vary across both rows.
// Keyed by stable index (not the duplicated loop index) so the marquee loops seamlessly.
const WIDE_PATTERN = [true, false, true, false, false, true, true, false];

// One video-testimonial card — still image + quote/name overlay + play.
// `wide` spans 2 columns so card sizes vary across the row.
function TestimonialCard({ t, wide, onPlay }) {
  return (
    <article
      onClick={t.video ? onPlay : undefined}
      className={`group relative h-[280px] overflow-hidden rounded-2xl shadow-sm ${
        t.video ? 'cursor-pointer' : ''
      } ${wide ? 'col-span-2' : ''}`}
    >
      <img
        src={t.poster}
        alt={t.brand}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/25 to-navy-950/10" />

      {/* Play — only on cards that have a video */}
      {t.video && (
        <button
          type="button"
          onClick={onPlay}
          aria-label={`Play ${t.brand} testimonial`}
          className="absolute left-1/2 top-[38%] grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-navy-950 shadow-enterprise-lg transition-transform group-hover:scale-105"
        >
          <Play className="ml-0.5 h-5 w-5 fill-current" />
        </button>
      )}

      {/* Quote + attribution */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="text-[14px] font-medium leading-snug text-white">“{t.quote}”</p>
        <p className="mt-2 text-[14px] font-bold text-white">{t.brand}</p>
        <p className="text-[14px] text-cream-100/70">{t.role}</p>
      </div>
    </article>
  );
}

export default function VideoTestimonials() {
  const [modal, setModal] = useState(null); // testimonial object or null

  return (
    <section className="relative bg-white py-6 md:py-10">
      <div className="relative mx-4 overflow-hidden rounded-[2rem] bg-navy-50 py-14 md:mx-6 md:py-20 lg:mx-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-12">
          {/* LEFT — heading + description + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="w-full shrink-0 px-6 sm:px-10 lg:w-[36%] lg:pl-10 xl:pl-16 2xl:pl-24"
          >
            <Eyebrow>Client Testimonials</Eyebrow>
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.08] tracking-tight text-navy-950">
              Discover how food brands{' '}
              <span className="gradient-text-orange">drive impact.</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-navy-600">
              Food and FMCG businesses across India run on UPWON — cutting wastage, closing books
              faster, and scaling without the chaos. Hear it in their own words.
            </p>
            <Link
              to="/clients"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
            >
              Explore all stories
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </motion.div>

          {/* RIGHT — 2-row marquee, auto-scrolls left, bleeds off the panel edge */}
          <div className="min-w-0 flex-1 overflow-hidden pl-6 sm:pl-10 lg:pl-0">
            <div className="grid w-max grid-flow-col-dense grid-rows-2 gap-4 auto-cols-[280px] animate-ticker [animation-duration:70s] hover:[animation-play-state:paused]">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <TestimonialCard
                  key={`${t.brand}-${i}`}
                  t={t}
                  wide={WIDE_PATTERN[i % TESTIMONIALS.length]}
                  onPlay={() => setModal(t)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-navy-950/85 p-4"
            onClick={() => setModal(null)}
          >
            <div className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setModal(null)}
                aria-label="Close"
                className="absolute -top-11 right-0 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-navy-950 hover:bg-white"
              >
                <X className="h-4 w-4" strokeWidth={2.25} />
              </button>

              {modal.video ? (
                <video
                  src={modal.video}
                  poster={modal.poster}
                  controls
                  autoPlay
                  playsInline
                  className="aspect-video max-h-[82vh] w-full rounded-2xl bg-black object-cover shadow-enterprise-lg"
                />
              ) : (
                <div className="grid place-items-center rounded-2xl bg-white p-10 text-center shadow-enterprise-lg">
                  <p className="text-lg font-bold text-navy-950">{modal.brand}’s story</p>
                  <p className="mt-2 max-w-md text-sm text-navy-600">“{modal.quote}”</p>
                  <Link
                    to="/clients"
                    onClick={() => setModal(null)}
                    className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
                  >
                    Read customer stories
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
