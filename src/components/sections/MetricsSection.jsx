import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Briefcase, Boxes, Calendar, Heart, ArrowRight, Star } from 'lucide-react';
import Container from '../ui/Container.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import useCountUp from '../../hooks/useCountUp.js';
import TrustStrip from './TrustStrip.jsx';
import { SCALE_METRICS } from '../../data/metrics.js';

// Brief §1.6 — Social Proof.
// Two halves:
//   TOP — 4 count-up scale stats: 150+ Deployed · 7 Platforms · 12+ Years ·
//         98% Retention. Numbers animate when the section scrolls into view.
//   BOTTOM — Customer logo marquee (TrustStrip, embedded mode) + aggregate
//         star rating + "Read Customer Stories" CTA.
//
// Replaces the previous outcome-stat metrics block — those outcome metrics
// belong at §1.8 (ROI Teaser) per the brief, not here. SCALE_METRICS is the
// honest "are they established?" signal mid-market Indian buyers need before
// they'll trust a non-MNC vendor.
const ICONS = [Briefcase, Boxes, Calendar, Heart];

export default function MetricsSection() {
  return (
    <section
      id="social-proof"
      className="relative overflow-hidden bg-navy-950 text-white section-pad scroll-mt-32"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-orange-500/[0.08] blur-[140px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full bg-orange-400/[0.06] blur-[140px]" />

      <Container className="relative">
        <SectionHeading
          align="center"
          variant="dark"
          eyebrow="Trusted across the food belt"
          title={
            <>
              Trusted by growing food &amp; FMCG businesses{' '}
              <span className="gradient-text-orange">across India.</span>
            </>
          }
          description="Numbers we can defend in a customer review — not pitch-deck round-ups."
        />

        {/* 4 scale stats */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SCALE_METRICS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} icon={ICONS[i]} index={i} />
          ))}
        </div>

        {/* Customer logo strip — embedded TrustStrip */}
        <div className="mt-16">
          <p className="text-center text-[10.5px] font-bold uppercase tracking-[0.22em] text-white/55">
            8+ years · 50+ live deployments · One quiet success story per quarter
          </p>
          <div className="mt-6 -mx-4 md:mx-0">
            <TrustStrip embedded />
          </div>

          {/* Star rating aggregate + CTA */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 backdrop-blur-sm">
              <div className="flex">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star
                    key={s}
                    className="h-3.5 w-3.5"
                    fill="#FFA070"
                    stroke="#FFA070"
                  />
                ))}
              </div>
              <span className="text-[14px] font-bold text-white">4.7 / 5</span>
              <span className="text-[14px] text-white/60">
                · G2 · 180+ reviews
              </span>
            </div>
            <Link
              to="/clients"
              className="group inline-flex items-center gap-1.5 text-[14px] font-semibold text-orange-300 hover:text-orange-200"
            >
              Read customer stories
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

function StatCard({ stat, icon: Icon, index }) {
  const { ref, value } = useCountUp(stat.numeric, { duration: 1600 });
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.55,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.07]"
    >
      <span className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-orange-500/0 blur-2xl transition-colors duration-700 group-hover:bg-orange-500/20" />
      <span className="pointer-events-none absolute inset-x-0 -top-px h-px scale-x-0 origin-left bg-gradient-to-r from-transparent via-orange-400/50 to-transparent transition-transform duration-500 group-hover:scale-x-100" />

      <div className="grid h-11 w-11 place-items-center rounded-xl bg-orange-500/15 text-orange-300 ring-1 ring-orange-500/30 transition-transform duration-500 group-hover:scale-110">
        {Icon ? <Icon className="h-4 w-4" strokeWidth={1.75} /> : null}
      </div>

      <p className="num-display mt-5 text-5xl font-bold leading-none tracking-tightest text-white">
        {value}
        <span className="text-orange-400">{stat.suffix}</span>
      </p>
      <p className="mt-3 font-display text-[14px] font-bold leading-tight text-white">
        {stat.label}
      </p>
      <p className="mt-1.5 text-[14px] leading-snug text-white/60">
        {stat.sub}
      </p>
    </motion.article>
  );
}
