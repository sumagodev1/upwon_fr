import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Wallet,
  Heart,
  MapPin,
  ShieldCheck,
  Star,
  Award,
} from 'lucide-react';
import Container from '../shared/Container/Container.jsx';
import { COMPANY } from '../../data/company.js';

// Brief §19.1 — About page hero.
// Replaces the plain PageHero with a richer 2-column dark hero that delivers
// the brief's signature beats:
//   • Two-tone headline: "We build software that understands your business."
//     then "Because we've lived in it."
//   • Bootstrapped / Nashik-born / customer-funded trust pills
//   • Founder portrait card on the right with role + LinkedIn cue
//   • Floating proof chips (5★ G2, 27001 ISO, etc.)
//
// The dark navy background gives the page a story-mode opening that the old
// light-grey hero didn't — it sets up the "founder narrative" tone of the
// origin story section below.
export default function AboutHero() {
  const founderInitials = (COMPANY?.founder?.name || 'NM')
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <section
      id="about-hero"
      className="relative overflow-hidden bg-navy-950 text-white pt-32 pb-16 md:pt-40 md:pb-20"
    >
      {/* Backdrop layers */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
      <div className="pointer-events-none absolute -left-32 top-0 h-[520px] w-[520px] rounded-full bg-orange-500/[0.18] blur-[160px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[480px] w-[480px] rounded-full bg-orange-400/[0.10] blur-[160px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

      <Container className="relative">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-7 flex items-center gap-1.5 text-[14px] text-white/55"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <ArrowRight className="h-3 w-3" />
          <span className="text-white">About</span>
        </motion.nav>

        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          {/* LEFT — pitch */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.22em] text-orange-300">
              <Sparkles className="h-3 w-3" />
              About UpWon & Byte Elephants Technologies
            </p>

            <h1 className="mt-6 font-display text-balance text-[2.2rem] font-bold leading-[1.04] tracking-tightest md:text-[3rem] lg:text-[3.4rem]">
              We build software that{' '}
              <span className="gradient-text-orange">understands your business.</span>
              <br />
              Because we've{' '}
              <span className="relative inline-block">
                lived in it.
                <span
                  className="absolute inset-x-1 -bottom-1 h-[3px] origin-left rounded-full"
                  style={{
                    background:
                      'linear-gradient(90deg, #E85A2A, #FF7340, transparent)',
                  }}
                />
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-white/75">
              Built by operators who walked the factory floor, rode the
              delivery truck and stood behind the franchise counter — long
              before they wrote a line of code.
            </p>

            {/* Trust pill row */}
            <ul className="mt-7 flex flex-wrap gap-2.5">
              {[
                { icon: Wallet, label: '₹0 VC raised' },
                { icon: Heart, label: '100% customer-funded' },
                { icon: MapPin, label: 'Built in Nashik' },
                { icon: ShieldCheck, label: '9 yrs · same team' },
              ].map((p) => (
                <li
                  key={p.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-[14px] font-semibold text-white/80 backdrop-blur-sm"
                >
                  <p.icon className="h-3 w-3 text-orange-400" />
                  {p.label}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#discovery-call"
                className="inline-flex items-center gap-1.5 rounded-md px-5 py-3 text-[14px] font-bold text-white transition-transform duration-300 hover:scale-[1.02]"
                style={{
                  background:
                    'linear-gradient(135deg, #E85A2A 0%, #FF7340 100%)',
                  boxShadow: '0 16px 40px -12px rgba(232,93,38,0.55)',
                }}
              >
                Book a 20-min discovery call
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#team"
                className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-white/[0.05] px-5 py-3 text-[14px] font-semibold text-white/85 transition-colors hover:bg-white/[0.08]"
              >
                Meet the team
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>

          {/* RIGHT — founder card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative mx-auto w-full max-w-md"
          >
            {/* Decorative ring */}
            <div
              className="pointer-events-none absolute -inset-4 rounded-[2.2rem] opacity-60 blur-3xl"
              style={{
                background:
                  'conic-gradient(from 90deg, #E85A2A33, transparent 40%, #FF734033 70%, transparent)',
              }}
            />

            <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-gradient-to-br from-[#0F1535] via-navy-900 to-[#0a0e26] p-7 shadow-[0_36px_80px_-20px_rgba(0,0,0,0.55)]">
              <div className="absolute inset-0 grid-bg opacity-20" />
              {/* Top — founder portrait */}
              <div className="relative flex items-center gap-5">
                <div className="relative">
                  <div
                    className="absolute -inset-2 rounded-full opacity-90 blur-md"
                    style={{
                      background:
                        'conic-gradient(from 180deg, #E85A2A, #FF7340, #E85A2A)',
                    }}
                  />
                  <div
                    className="relative grid h-24 w-24 place-items-center rounded-full text-3xl font-display font-bold text-white"
                    style={{
                      background:
                        'linear-gradient(135deg, #E85A2A, #FF7340)',
                      boxShadow:
                        '0 16px 40px -10px rgba(232,93,38,0.55), inset 0 1px 0 rgba(255,255,255,0.2)',
                    }}
                  >
                    {founderInitials}
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-orange-300">
                    Founder &amp; CEO
                  </p>
                  <p className="mt-1 font-display text-xl font-bold leading-tight text-white">
                    {COMPANY?.founder?.name || 'Nikhil Mehta'}
                  </p>
                  <p className="mt-1 text-[14px] text-white/55">
                    {COMPANY?.founder?.role || 'Founder of Byte Elephants Technologies'}
                  </p>
                </div>
              </div>

              {/* Quote */}
              <div className="relative mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="font-display text-[14px] italic leading-relaxed text-white/85">
                  &ldquo;
                  {COMPANY?.founder?.quote ||
                    'We built UpWon because food businesses deserved software that thinks like them — not generic ERP made to fit by force.'}
                  &rdquo;
                </p>
              </div>

              {/* Mini fact grid */}
              <div className="relative mt-5 grid grid-cols-3 gap-3">
                {[
                  { k: '150+', v: 'Deployed' },
                  { k: '36.5k+', v: 'Daily users' },
                  { k: '₹16 Cr+', v: 'Daily txns' },
                ].map((f) => (
                  <div
                    key={f.v}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-center"
                  >
                    <p className="num-display text-base font-bold text-white">
                      {f.k}
                    </p>
                    <p className="mt-0.5 text-[14px] text-white/55">{f.v}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating proof chips */}
            <motion.div
              initial={{ opacity: 0, x: -16, y: -8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="pointer-events-none absolute -left-3 top-7 hidden rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1.5 text-[14px] font-bold text-emerald-200 backdrop-blur-md md:flex md:items-center md:gap-1.5"
            >
              <Star className="h-3 w-3 fill-emerald-300 text-emerald-300" />
              4.7 / 5 · G2
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 16, y: 8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="pointer-events-none absolute -right-3 bottom-12 hidden rounded-full border border-orange-400/30 bg-orange-500/15 px-3 py-1.5 text-[14px] font-bold text-orange-200 backdrop-blur-md md:flex md:items-center md:gap-1.5"
            >
              <Award className="h-3 w-3 text-orange-300" />
              ISO 27001 · InfoSec
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
