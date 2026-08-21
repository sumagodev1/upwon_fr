import { useEffect, useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Award,
  Star,
  BadgeCheck,
  Sparkles,
  Trophy,
  ShieldCheck,
  Flag,
  ArrowRight,
} from 'lucide-react';
import Container from '../ui/Container.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';

// How long each badge holds the "spotlight" before the highlight rotates
// to the next one. Tuned for ~14s full cycle across 8 badges.
const SPOTLIGHT_MS = 1750;

// Static Tailwind class map — never compute class names with template
// literals or JIT will not pick them up.
const TONES = {
  red: {
    iconBg: 'bg-red-50',
    iconText: 'text-red-600',
    iconBorder: 'border-red-200',
    ribbon: 'from-red-500 to-red-600',
  },
  orange: {
    iconBg: 'bg-orange-50',
    iconText: 'text-orange-600',
    iconBorder: 'border-orange-200',
    ribbon: 'from-orange-500 to-orange-600',
  },
  amber: {
    iconBg: 'bg-amber-50',
    iconText: 'text-amber-700',
    iconBorder: 'border-amber-200',
    ribbon: 'from-amber-500 to-amber-600',
  },
  blue: {
    iconBg: 'bg-blue-50',
    iconText: 'text-blue-700',
    iconBorder: 'border-blue-200',
    ribbon: 'from-blue-500 to-blue-600',
  },
  emerald: {
    iconBg: 'bg-emerald-50',
    iconText: 'text-emerald-700',
    iconBorder: 'border-emerald-200',
    ribbon: 'from-emerald-500 to-emerald-600',
  },
  gold: {
    iconBg: 'bg-gold-50',
    iconText: 'text-gold-700',
    iconBorder: 'border-gold-200',
    ribbon: 'from-gold-500 to-gold-600',
  },
  navy: {
    iconBg: 'bg-navy-50',
    iconText: 'text-navy-700',
    iconBorder: 'border-navy-200',
    ribbon: 'from-navy-700 to-navy-900',
  },
};

const BADGES = [
  { issuer: 'G2',               award: 'Leader',           period: 'Mid-Market · Winter 2026', Icon: Award,       tone: 'red' },
  { issuer: 'G2',               award: 'High Performer',   period: 'Asia Pacific · 2025',      Icon: Star,        tone: 'red' },
  { issuer: 'Software Suggest', award: 'Top ERP',          period: 'India · 2025',             Icon: Star,        tone: 'orange' },
  { issuer: 'Capterra',         award: 'Shortlist',        period: 'ERP Software · 2025',      Icon: BadgeCheck,  tone: 'blue' },
  { issuer: 'GetApp',           award: 'Category Leader',  period: 'Food & Beverage · 2025',   Icon: Sparkles,    tone: 'emerald' },
  { issuer: 'FICCI',            award: 'Innovation Award', period: 'Food Manufacturing · 2024',Icon: Trophy,      tone: 'amber' },
  { issuer: 'ISO / IEC',        award: '27001 : 2022',     period: 'Information Security',     Icon: ShieldCheck, tone: 'navy' },
  { issuer: 'DPIIT',            award: 'Startup India',    period: 'Recognised · 2023',        Icon: Flag,        tone: 'orange' },
];

export default function AwardsBadgesSection() {
  // Rotating "spotlight" — one badge at a time gets a soft halo + icon
  // pulse, cycling through all 8. Pauses automatically when the user
  // hovers any badge (handled per-card via onMouseEnter/Leave).
  const [spotlightIdx, setSpotlightIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => {
      setSpotlightIdx((i) => (i + 1) % BADGES.length);
    }, SPOTLIGHT_MS);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section className="relative overflow-hidden bg-cream-100 section-pad">
      <div className="absolute inset-0 grid-bg-light opacity-30" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[400px] w-[400px] rounded-full bg-orange-500/[0.06] blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-[300px] w-[300px] rounded-full bg-navy-500/[0.05] blur-[120px]" />

      <Container className="relative">
        <SectionHeading
          align="center"
          variant="light"
          eyebrow="Recognized by"
          title={
            <>
              Awards. Reviews.{' '}
              <span className="gradient-text-orange">Recognitions.</span>
            </>
          }
          description="Where industry analysts, customer review platforms and certifying bodies have placed UpWon."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {BADGES.map((b, i) => {
            const tone = TONES[b.tone] || TONES.orange;
            const Icon = b.Icon;
            const isActive = i === spotlightIdx;

            return (
              <motion.article
                key={`${b.issuer}-${b.award}`}
                initial={{ opacity: 0, y: 28, scale: 0.92, rotate: -3 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, scale: 1.03 }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                className={`group relative flex flex-col items-center overflow-visible rounded-2xl border bg-white p-5 text-center shadow-sm transition-colors duration-500 animate-float-slow ${
                  isActive
                    ? 'border-orange-300 shadow-glow-orange'
                    : 'border-cream-300 hover:border-orange-200 hover:shadow-enterprise'
                }`}
                style={{
                  // Stagger the idle float so each badge bobs out of sync
                  animationDelay: `${(i * 0.6) % 3}s`,
                  animationDuration: `${8 + (i % 3) * 1.5}s`,
                }}
              >
                {/* Spotlight halo — only behind the currently-active badge.
                    Blurred orange glow that fades in/out, plus a slow-spinning
                    conic-gradient ring so the highlight feels alive. */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      key="halo"
                      aria-hidden
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="pointer-events-none absolute -inset-3 -z-10 rounded-[1.5rem]"
                    >
                      <div className="absolute inset-0 rounded-[1.5rem] bg-orange-500/20 blur-2xl" />
                      <div className="absolute inset-0 rounded-[1.5rem] animate-spin-slow bg-[conic-gradient(from_0deg,rgba(232,93,38,0.0),rgba(232,93,38,0.35),rgba(232,93,38,0.0)_60%)] opacity-60" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Ribbon tab — extends and brightens when active */}
                <motion.span
                  aria-hidden
                  animate={
                    isActive
                      ? { width: 64, opacity: 1 }
                      : { width: 56, opacity: 0.9 }
                  }
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`pointer-events-none absolute -top-px left-1/2 h-3 -translate-x-1/2 rounded-b-full bg-gradient-to-b ${tone.ribbon}`}
                />

                {/* Issuer icon ring — pulses + scales when active */}
                <motion.div
                  animate={
                    isActive
                      ? { scale: [1, 1.12, 1.06], rotate: [0, 6, -3, 0] }
                      : { scale: 1, rotate: 0 }
                  }
                  transition={{
                    duration: 1.4,
                    ease: 'easeInOut',
                    repeat: isActive ? Infinity : 0,
                    repeatType: 'reverse',
                  }}
                  className={`relative grid h-14 w-14 place-items-center rounded-full border ${tone.iconBorder} ${tone.iconBg} ${tone.iconText} shadow-sm`}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.8} />

                  {/* Pulse ring around the icon when active */}
                  {isActive && (
                    <span className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-orange-400/30" />
                  )}
                </motion.div>

                {/* Sparkle accent — tiny twinkle in the top-right of the active card */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      key="sparkle"
                      initial={{ opacity: 0, scale: 0, rotate: -20 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0, rotate: 20 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="pointer-events-none absolute right-3 top-3 text-orange-500"
                    >
                      <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.22em] text-navy-500">
                  {b.issuer}
                </p>
                <p className="mt-1 font-display text-[15px] font-bold leading-tight text-navy-950">
                  {b.award}
                </p>
                <p className="mt-1.5 text-[14px] leading-snug text-navy-600">
                  {b.period}
                </p>

                {/* Hover sheen line at bottom */}
                <div className="pointer-events-none absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.article>
            );
          })}
        </div>

        {/* Footer line */}
        <div className="mt-12 flex flex-col items-center gap-2 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-navy-500">
            Across review platforms · Industry awards · Compliance certifications
          </p>
          <Link
            to="/clients"
            className="group inline-flex items-center gap-1.5 text-[14px] font-semibold text-orange-600 hover:text-orange-700"
          >
            See verified reviews &amp; case studies
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
