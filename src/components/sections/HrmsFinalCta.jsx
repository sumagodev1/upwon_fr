import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CalendarDays, Users, ArrowRight, ShieldCheck, Lock, Clock } from 'lucide-react';

/*
  HRMS "Final CTA" — converts accumulated confidence into a low-pressure next
  step. An invitation to a conversation about the buyer's actual workforce, not a
  demo-request form. Centred CTA band over the workforce banner image, with a
  no-pressure micro-trust line and a supporting trust strip.
*/

const EASE = [0.22, 1, 0.3, 1];

const TRUST = [
  { icon: Users, a: 'Built for factories,', b: 'offices & field teams' },
  { icon: ShieldCheck, a: 'Trusted by businesses', b: 'across industries' },
  { icon: Lock, a: 'Your data is safe', b: 'and confidential' },
  { icon: Clock, a: 'Real-world insights', b: 'in just 30 minutes' },
];

export default function HrmsFinalCta() {
  return (
    <section className="relative overflow-hidden bg-white">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative overflow-hidden"
      >
        {/* Banner background */}
        <img
          src="/images/hrms_cta.webp"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Content */}
        <div className="relative mx-auto max-w-6xl px-5 py-16 text-center md:px-10 md:py-20">
            {/* Eyebrow */}
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-orange-600">
              Let&apos;s Talk About Your Workforce
            </p>

            {/* Headline */}
            <h2 className="mx-auto mt-6 max-w-3xl h-display text-[2rem] leading-[1.08] tracking-tight text-navy-950 md:text-[2.9rem]">
              See Your Whole Workforce on One System —{' '}
              <span className="text-orange-500">Live, in 30 Minutes.</span>
            </h2>

            {/* Subtext */}
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
              A conversation about your people, your process and your goals. We&apos;ll show you
              what&apos;s possible — for your actual workforce.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Link
                to="/demo"
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-orange-500 px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-orange-600"
              >
                <CalendarDays className="h-5 w-5" />
                Talk to an HR Systems Specialist
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/demo"
                className="group inline-flex items-center justify-center gap-3 rounded-2xl border border-navy-200 bg-white/70 px-7 py-4 text-[15px] font-semibold text-navy-900 backdrop-blur transition-colors hover:border-navy-400 hover:bg-white"
              >
                <Users className="h-5 w-5" />
                See How This Fits Your Workforce
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Trust strip */}
            <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-y-6 sm:grid-cols-4">
              {TRUST.map(({ icon: Icon, a, b }, i) => (
                <div
                  key={a}
                  className={`flex items-center justify-center gap-2.5 px-3 ${
                    i > 0 ? 'sm:border-l sm:border-navy-900/10' : ''
                  }`}
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-orange-200 bg-white text-orange-500">
                    <Icon className="h-4 w-4" strokeWidth={1.9} />
                  </span>
                  <p className="text-left text-[12px] font-semibold leading-tight text-navy-800">
                    {a}
                    <br />
                    {b}
                  </p>
                </div>
              ))}
            </div>
        </div>
      </motion.div>
    </section>
  );
}
