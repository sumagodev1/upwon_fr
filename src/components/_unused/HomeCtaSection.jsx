import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  PlayCircle,
  Calendar,
  ShieldCheck,
  Zap,
  Headset,
  Lock,
  Sparkles,
  Star,
} from 'lucide-react';
import Container from '../shared/Container/Container.jsx';

// Final call-to-action, sits directly above the site footer. The navy /
// orange-grid artwork with floating 3D tiles lives in the background image;
// the white card carries the copy, CTAs, trust row and rating banner.

const EASE = [0.16, 1, 0.3, 1];

const TRUST = [
  { icon: ShieldCheck, label: 'No Credit Card Required' },
  { icon: Zap, label: 'Quick Onboarding' },
  { icon: Headset, label: 'Expert Support' },
  { icon: Lock, label: 'Enterprise-Grade Security' },
];

// Simple avatar stack — initials on brand-tinted circles (no external assets).
const AVATARS = [
  { initials: 'RK', from: '#f97316', to: '#ea580c' },
  { initials: 'SP', from: '#1e2461', to: '#2b3576' },
  { initials: 'AM', from: '#0f766e', to: '#0d9488' },
  { initials: 'NV', from: '#b45309', to: '#f59e0b' },
];

export default function HomeCtaSection() {
  return (
    <section className="relative overflow-hidden bg-navy-950">
      {/* Background artwork — navy grid + floating tiles. */}
      <img
        src="/images/cta_back.jpg.webp"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative py-6 md:py-8">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mx-auto max-w-4xl rounded-[1.75rem] border border-white/40 bg-[#faf8f4] px-5 py-7 text-center shadow-2xl sm:px-8 md:rounded-[2.25rem] md:px-10 md:py-8"
          >
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-orange-600 shadow-sm sm:text-xs">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              All-in-One Business Platform
            </span>

            {/* Heading */}
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.08] tracking-tight text-navy-950">
              Your Business.
              <br />
              Run Smarter with <span className="gradient-text-orange">UPWON.</span>
            </h2>

            {/* Subtext */}
            <p className="mx-auto mt-3 max-w-xl text-balance text-[14px] leading-relaxed text-navy-600 md:text-base">
              Unify operations, empower your teams and accelerate growth with
              AI-powered modules built for modern businesses.
            </p>

            {/* CTAs */}
            <div className="mt-5 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Link to="/demo" className="btn-secondary !px-6 !py-3.5">
                <PlayCircle className="h-4 w-4 text-orange-500 group-hover:text-white" />
                Start Free Trial
              </Link>
              <Link to="/demo" className="btn-primary-glow !px-6 !py-3.5">
                <Calendar className="h-4 w-4" />
                Book a Demo
              </Link>
            </div>

            {/* Trust row */}
            <div className="mx-auto mt-5 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-4">
              {TRUST.map((t) => {
                const Icon = t.icon;
                return (
                  <div key={t.label} className="flex min-w-0 items-center gap-2.5 text-left">
                    <Icon className="h-5 w-5 shrink-0 text-orange-500" strokeWidth={1.75} />
                    <span className="text-[14px] font-semibold leading-tight text-navy-800">
                      {t.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Rating banner */}
            <div className="mt-5 flex flex-col items-center gap-4 rounded-2xl border border-orange-100 bg-orange-50/70 p-4 text-left md:flex-row md:gap-6 md:p-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-orange-100 text-orange-600">
                <Sparkles className="h-6 w-6" />
              </span>
              <div className="min-w-0 flex-1 text-center md:text-left">
                <p className="h-display text-base font-bold text-navy-950 md:text-lg">
                  Ready to see UPWON in action?
                </p>
                <p className="mt-1 text-[14px] leading-relaxed text-navy-600">
                  Join hundreds of businesses transforming the way they work.
                </p>
              </div>

              <div className="hidden h-12 w-px bg-orange-200 md:block" />

              <div className="flex shrink-0 items-center gap-3">
                <div className="flex -space-x-2.5">
                  {AVATARS.map((a) => (
                    <span
                      key={a.initials}
                      className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#faf8f4] text-[14px] font-bold text-white"
                      style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})` }}
                    >
                      {a.initials}
                    </span>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="mt-0.5 text-[14px] font-semibold text-navy-700">
                    4.9/5 from 300+ businesses
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
