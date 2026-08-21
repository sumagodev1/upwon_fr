import { m as motion } from 'framer-motion';
import { Settings, GraduationCap, Rocket, Headset, Printer, ScanLine, Tablet, Check } from 'lucide-react';
import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';

/*
  POS "Implementation & Partnership" — addresses the counter-level fear that any
  downtime at the till costs money immediately. Counter software goes live in
  days, not weeks: a four-step timeline + a hardware-compatibility strip to
  pre-empt the "will it work with my printer?" objection.
*/

const EASE = [0.22, 1, 0.3, 1];
const ORANGE = '#E85A2A';
const TINT = 'rgba(232,90,42,0.1)';

const STEPS = [
  {
    n: '01',
    icon: Settings,
    img: '/images/setup.webp',
    title: 'Setup & Menu / Recipe Configuration',
    desc: 'We set up your business and configure your menu, recipes, ingredients, pricing and inventory rules.',
  },
  {
    n: '02',
    icon: GraduationCap,
    img: '/images/training.webp',
    title: 'Staff Training',
    desc: 'Hands-on training ensures your team is confident and ready to use UpWon POS.',
  },
  {
    n: '03',
    icon: Rocket,
    img: '/images/go_lives.webp',
    title: 'Go-Live',
    desc: 'We go live together and make sure everything runs perfectly from day one.',
  },
  {
    n: '04',
    icon: Headset,
    img: '/images/ongoing_support.webp',
    title: 'Ongoing Support',
    desc: 'Our support team stays with you to keep your business running seamlessly.',
  },
];

const HARDWARE = [
  { icon: Printer, label: 'Receipt printers' },
  { icon: ScanLine, label: 'Barcode scanners' },
  { icon: Tablet, label: 'Tablets & displays' },
];

const BRANDS = [
  { name: 'Epson', logo: '/images/epson.webp' },
  { name: 'Zebra', logo: '/images/zebra.webp' },
  { name: 'Honeywell', logo: '/images/honeywell.webp' },
  { name: 'iMin', logo: '/images/imin.webp' },
];

export default function PosImplementation() {
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
          <Eyebrow className="justify-center">Implementation &amp; Partnership</Eyebrow>
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            Live at Your Counter in{' '}
            <span className="gradient-text-orange">Days, Not Weeks.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            Counter software goes live far faster than a full ERP rollout — a smooth onboarding
            designed to get your counter up and running, fast and stress-free.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* dashed connector through the number badges — draws in (lg only) */}
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="pointer-events-none absolute inset-x-[8%] top-[18px] hidden origin-left border-t-2 border-dashed border-orange-300 lg:block"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.22, ease: EASE }}
                  className="relative flex flex-col rounded-3xl border border-cream-300 bg-white p-6 pt-10 text-center shadow-sm"
                >
                  {/* number badge on the line — with a blinking beacon pulse */}
                  <span className="absolute -top-1 left-1/2 z-10 flex h-9 w-9 -translate-x-1/2 items-center justify-center">
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full"
                      style={{ background: ORANGE }}
                      animate={{ scale: [1, 2], opacity: [0.55, 0] }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: 'easeOut',
                        delay: 0.4 + i * 0.3,
                      }}
                    />
                    <span
                      className="relative grid h-9 w-9 place-items-center rounded-full text-[14px] font-black text-white shadow-md ring-4 ring-[#f5f6fa]"
                      style={{ background: ORANGE }}
                    >
                      {s.n}
                    </span>
                  </span>

                  {/* icon */}
                  <span
                    className="mx-auto grid h-16 w-16 place-items-center rounded-full"
                    style={{ background: TINT, color: ORANGE }}
                  >
                    <Icon className="h-8 w-8" strokeWidth={1.6} />
                  </span>

                  <h3 className="mt-4 text-[15px] font-bold leading-tight text-navy-950">{s.title}</h3>
                  <span className="mx-auto mt-3 block h-[3px] w-8 rounded-full" style={{ background: ORANGE }} />
                  <p className="mt-3 text-[14px] leading-relaxed text-navy-600">{s.desc}</p>

                  <div className="mt-auto pt-5">
                    <div className="overflow-hidden rounded-2xl border border-cream-200">
                      <img
                        src={s.img}
                        alt={s.title}
                        loading="lazy"
                        decoding="async"
                        className="h-48 w-full object-cover md:h-56"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Hardware compatibility strip */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mt-6 rounded-3xl border border-cream-300 bg-white p-6 shadow-sm md:p-8"
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h3 className="h-display text-xl tracking-tight text-navy-950">
                Works with Your Existing Hardware
              </h3>
              <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-navy-600">
                UpWon POS is compatible with most leading receipt printers, barcode scanners, cash
                drawers, customer displays and tablets.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {HARDWARE.map((h) => {
                  const Icon = h.icon;
                  return (
                    <span
                      key={h.label}
                      className="inline-flex items-center gap-2 rounded-full border border-cream-300 px-3 py-1.5 text-[14px] font-semibold text-navy-800"
                    >
                      <Icon className="h-4 w-4" style={{ color: ORANGE }} strokeWidth={1.9} />
                      {h.label}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {BRANDS.map((b) => (
                <span
                  key={b.name}
                  className="grid h-20 min-w-[160px] place-items-center rounded-xl border border-cream-300 bg-white px-6"
                >
                  <img
                    src={b.logo}
                    alt={`${b.name} logo`}
                    loading="lazy"
                    decoding="async"
                    className="max-h-14 w-auto max-w-[150px] object-contain"
                  />
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 border-t border-cream-300 pt-5">
            <Check className="h-4 w-4 shrink-0" style={{ color: ORANGE }} strokeWidth={2.6} />
            <p className="text-[14px] font-bold text-navy-900">
              Plug in and play. Easy to integrate. Built to work the way you do.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
