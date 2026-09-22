import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CalendarDays,
  Package,
  ArrowRight,
  ShieldCheck,
  Lock,
  Clock,
} from 'lucide-react';

const EASE = [0.22, 1, 0.3, 1];

const TRUST = [
  {
    icon: Package,
    a: 'Built for modern',
    b: 'warehouse operations',
  },
  {
    icon: ShieldCheck,
    a: 'Accurate, traceable',
    b: 'inventory control',
  },
  {
    icon: Lock,
    a: 'Your warehouse data',
    b: 'safe and secure',
  },
  {
    icon: Clock,
    a: 'Real warehouse insights',
    b: 'in just 30 minutes',
  },
];

export default function WmsCta() {
  return (
    <section className="relative overflow-hidden bg-white">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative min-h-[580px] overflow-hidden"
      >
        {/* =========================
            BACKGROUND
        ========================== */}
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet="/images/wms_cta_mb.webp"
          />
          <img
            src="/images/wms_CTA.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </picture>

        {/* =========================
            LEFT SIDE OVERLAY
            Keeps text clearly visible
        ========================== */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8f5f0]/98 via-[#f8f5f0]/94 via-[42%] to-transparent to-[72%]" />

        {/* Mobile readability overlay */}
        <div className="absolute inset-0 bg-[#f8f5f0]/20 md:hidden" />

        {/* =========================
            CONTENT
        ========================== */}
        <div className="relative flex min-h-[580px] w-full items-center">
          {/* =========================
              FIRST / LEFT COLUMN
              CENTERED IN LEFT AREA
          ========================== */}
          <div className="flex w-full justify-center px-5 py-12 sm:px-8 md:w-[48%] md:px-8 lg:w-[46%] lg:px-10 xl:w-[45%] xl:px-12">
            <div className="w-full max-w-[650px] text-left">
              {/* Eyebrow */}
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-600 md:text-[12px]">
                Let&apos;s Talk About Your Warehouse
              </p>

              {/* Headline */}
              <h2 className="mt-5 max-w-[620px] h-display text-[2rem] leading-[1.08] tracking-tight text-navy-950 md:mt-6 md:text-[2.9rem]">
                See Your Warehouse on UpWon —{' '}
                <span className="text-orange-500">
                  Live, in 30 Minutes.
                </span>
              </h2>

              {/* Subtext */}
              <p className="mt-4 max-w-[570px] text-[15px] leading-relaxed text-navy-600 md:text-base">
                Let&apos;s understand your warehouse, your challenges and your
                goals. We&apos;ll show you the impact UpWon WMS can deliver for
                your actual operations.
              </p>

              {/* =========================
                  CTA BUTTONS
              ========================== */}
              <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                {/* Primary CTA */}
                <Link
                  to="/demo"
                  className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-orange-500 px-6 py-4 text-[14px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 sm:px-7 sm:text-[15px]"
                >
                  <CalendarDays className="h-5 w-5 shrink-0" />

                  <span>Talk to a Warehouse Specialist</span>

                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                {/* Secondary CTA */}
                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-center gap-3 rounded-2xl border border-navy-200 bg-white/75 px-6 py-4 text-[14px] font-semibold text-navy-900 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-navy-400 hover:bg-white sm:px-7 sm:text-[15px]"
                >
                  <Package className="h-5 w-5 shrink-0" />

                  <span>See How This Fits Your Warehouse</span>

                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* =========================
                  TRUST STRIP
              ========================== */}
              <div className="mt-10 grid max-w-[650px] grid-cols-2 gap-y-6 sm:grid-cols-4">
                {TRUST.map(({ icon: Icon, a, b }, i) => (
                  <div
                    key={a}
                    className={`flex items-center gap-2.5 px-3 ${
                      i === 0 ? 'pl-0' : 'sm:border-l sm:border-navy-900/10'
                    }`}
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-orange-200 bg-white text-orange-500">
                      <Icon className="h-4 w-4" strokeWidth={1.9} />
                    </span>

                    <p className="text-left text-[11px] font-semibold leading-[1.35] text-navy-800 md:text-[12px]">
                      {a}
                      <br />
                      {b}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}