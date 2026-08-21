import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  PhoneCall,
  MessageSquare,
  FileText,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import Container from '../ui/Container.jsx';
import { COMPANY } from '../../data/company.js';

const STEPS = [
  {
    icon: MessageSquare,
    title: '1. Tell us your shape',
    desc: 'Plants, outlets, distributors, modules. Three-minute form or 15-min call — your choice.',
  },
  {
    icon: FileText,
    title: '2. We engineer a quote',
    desc: 'Fixed-price proposal with module-level breakdown, go-live timeline and ROI projection.',
  },
  {
    icon: CheckCircle2,
    title: '3. You decide on your terms',
    desc: 'No follow-up pestering. Email when you are ready. Price honoured for 30 days.',
  },
];

const TRUST_BADGES = [
  { icon: ShieldCheck, label: 'Fixed-price, not hourly' },
  { icon: Clock, label: '24-hour SLA on every quote' },
  { icon: CheckCircle2, label: 'No demo required to see numbers' },
];

export default function QuoteIn24Section() {
  const tollFreeDigits = COMPANY.contact.tollFree?.replace(/\D/g, '') || '';

  return (
    <section className="relative overflow-hidden bg-navy-950 section-pad">
      {/* Ambient orange glow + grid */}
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[400px] w-[400px] rounded-full bg-orange-500/[0.15] blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-orange-500/[0.10] blur-[120px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-400" />
            </span>
            No 6-month sales cycle
          </motion.p>

          {/* Headline with massive "24" anchor */}
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 h-display text-balance text-3xl leading-[1.1] text-white md:text-5xl lg:text-[3.5rem]"
          >
            Get your custom quote in{' '}
            <span className="num-display gradient-text-orange text-[3.5rem] leading-none md:text-[5rem] lg:text-[6rem]">
              24
            </span>{' '}
            hours.
          </motion.h2>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: 0.28 }}
            className="mt-5 text-balance text-base leading-relaxed text-white/70 md:text-lg"
          >
            Tell us your business size and the modules you need. We'll send back a{' '}
            <span className="font-semibold text-white">fixed-price proposal</span>{' '}
            within 24 business hours — no demo required to see numbers.
          </motion.p>
        </div>

        {/* 3-step process cards */}
        <div className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-3">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: 0.35 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-colors duration-300 hover:border-orange-400/30 hover:bg-white/[0.06]"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20 text-orange-300 ring-1 ring-orange-400/30">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            to="/pricing"
            className="btn-primary-glow !px-7 !py-4 !text-[15px]"
          >
            Request 24-Hour Quote
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          {tollFreeDigits && (
            <a
              href={`tel:${tollFreeDigits}`}
              className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/[0.04] px-6 py-4 text-[14px] font-semibold text-white transition-colors hover:border-orange-400/40 hover:bg-white/[0.08]"
            >
              <PhoneCall className="h-4 w-4 text-orange-300" />
              Or call sales {COMPANY.contact.tollFree}
            </a>
          )}
        </motion.div>

        {/* Trust badges row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {TRUST_BADGES.map((b) => {
            const Icon = b.icon;
            return (
              <span
                key={b.label}
                className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white/50"
              >
                <Icon className="h-3 w-3 text-orange-300" />
                {b.label}
              </span>
            );
          })}
        </div>

        {/* Competitive trust line */}
        <p className="mt-6 text-center text-[14px] leading-relaxed text-white/60">
          vs <span className="font-medium text-white/70">4–6 week sales cycle</span> at
          SAP / NetSuite ·{' '}
          <span className="font-medium text-white/70">6-month evaluation</span> at Oracle
        </p>
      </Container>
    </section>
  );
}
