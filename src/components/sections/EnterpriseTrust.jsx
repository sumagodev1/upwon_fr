import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Container from '../ui/Container.jsx';

/*
  Enterprise-trust showcase (monday.com "Trusted by enterprises" layout):
  a centred headline over two panels —
    • a wide "enterprise-grade security" card with a client-logo marquee,
    • a 4-up stat counter of UpWon's real operational proof.
  Content is UpWon's real proof (no fabricated third-party analyst claims).
*/

const EASE = [0.22, 1, 0.3, 1];

// Client logos for the marquee inside the security card.
const LOGOS = [
  { src: '/images/testimonial/gokul.webp', alt: 'Gokul' },
  { src: '/images/testimonial/kaka%20halwai.webp', alt: 'Kaka Halwai' },
  { src: '/images/testimonial/mongignis.webp', alt: 'Monginis' },
  { src: '/images/testimonial/ofc.webp', alt: 'OFC' },
  { src: '/images/testimonial/u2cake.webp', alt: 'U2 Cake' },
  { src: '/images/testimonial/winni.webp', alt: 'Winni' },
];

// Horizontal 4-up stat counter.
const STATS = [
  { value: '5,000+', label: 'Distribution users' },
  { value: '40%', label: 'Faster order processing' },
  { value: '40%', label: 'Higher distributor fill rates (GT & MT)' },
  { value: '50+', label: 'Brands live' },
];

function StatCard({ value, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      className="flex h-full flex-col items-center justify-center rounded-3xl border border-cream-300 bg-white p-6 text-center shadow-sm"
    >
      <p className="num-display text-4xl text-navy-950 md:text-5xl">{value}</p>
      <p className="mt-2.5 max-w-[14rem] text-[14px] leading-snug text-navy-600 md:text-sm">
        {label}
      </p>
    </motion.div>
  );
}

export default function EnterpriseTrust() {
  return (
    <section className="relative overflow-hidden bg-slate-soft py-14 md:py-20">
      <Container className="relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange-600">
            Proof, not promises
          </p>
 <h2 className="mt-4 h-display text-[36.8px] leading-[1.08] tracking-tight text-navy-950">
            Not a Pitch.{' '}
            <span className="gradient-text-orange">Just What&apos;s Already Running.</span>
          </h2>
        </motion.div>

        {/* Security card + 4-up stat counter */}
        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
          {/* Wide security card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, ease: EASE }}
            className="flex h-full flex-col rounded-3xl border border-cream-300 bg-white p-8 shadow-sm md:p-10"
          >
            <h3 className="h-display text-2xl tracking-tight text-navy-950 md:text-[1.7rem]">
              Already live in the field.
            </h3>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-navy-600">
              Not a pilot and not a promise — real food &amp; FMCG brands run their daily beats,
              order booking and distribution on UpWon SFA-DMS across India, every single day.
            </p>
            <Link
              to="/clients"
              className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-navy-900 underline decoration-navy-300 underline-offset-4 transition-colors hover:text-orange-600 hover:decoration-orange-400"
            >
              See our clients
              <ArrowRight className="h-4 w-4" />
            </Link>

            {/* Client logo marquee */}
            <div className="mt-auto pt-12">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-navy-400">
                Trusted by
              </p>
              <div className="relative mt-4 overflow-hidden mask-fade-lr">
                <div
                  className="flex w-max items-center gap-8 md:gap-10"
                  style={{ animation: 'ticker 26s linear infinite' }}
                >
                  {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
                    <img
                      key={`${logo.alt}-${i}`}
                      src={logo.src}
                      alt={logo.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-12 w-auto max-w-[130px] shrink-0 object-contain md:h-14"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* 4-up stat counter */}
          <div className="grid h-full grid-cols-2 grid-rows-2 gap-4 lg:gap-5">
            {STATS.map((s, i) => (
              <StatCard key={s.label} value={s.value} label={s.label} delay={0.1 + i * 0.06} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
