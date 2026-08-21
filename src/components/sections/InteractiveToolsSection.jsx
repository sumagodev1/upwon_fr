import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Calculator,
  ClipboardCheck,
  Scale,
  Stethoscope,
  ArrowRight,
} from 'lucide-react';
import Container from '../ui/Container.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import { srcSet } from '../../lib/img.js';

// Mirrors Tebra's "Interactive Tools" card grid (EHR Calculator, Billing
// Calculator, Competitive Scanner, Efficiency Grader). Each card is a
// self-serve, no-login tool that captures mid-funnel buyers who aren't
// ready for a sales call yet. All four destinations already exist as
// pages in this repo — this section just promotes them together as a
// single "what can I do without talking to sales" toolbox.
const TOOLS = [
  {
    id: 'roi',
    Icon: Calculator,
    eyebrow: 'Quantify the case',
    title: 'ROI Calculator',
    desc: '8 inputs · 2 minutes. See the rupee impact across wastage, billing time and finance close — for your numbers, not ours.',
    cta: 'Calculate your savings',
    to: '/roi-calculator',
    accent: 'from-orange-500 to-orange-400',
    preview:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
    badge: '~2 min',
  },
  {
    id: 'self-eval',
    Icon: ClipboardCheck,
    eyebrow: 'Find your starting point',
    title: 'Self-Evaluation',
    desc: '8 honest questions about your operations. We tell you which UpWon platform fits — and the gain you should expect first.',
    cta: 'Start evaluation',
    to: '/self-evaluation',
    accent: 'from-amber-500 to-orange-400',
    preview:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    badge: '8 questions',
  },
  {
    id: 'vs-others',
    Icon: Scale,
    eyebrow: 'Honest comparison',
    title: 'UpWon vs The Rest',
    desc: 'SAP, Tally + Zoho, Odoo, ERPNext — where each one fits, where each one breaks. Pick a vendor, see the side-by-side.',
    cta: 'Compare vendors',
    to: '/compare/upwon-vs-others',
    accent: 'from-blue-500 to-indigo-500',
    preview:
      'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=1200&q=80',
    badge: '4 vendors',
  },
  {
    id: 'free-audit',
    Icon: Stethoscope,
    eyebrow: 'Get a free read',
    title: 'Free Operations Audit',
    desc: 'Share your current setup. Our food-industry team returns a one-page audit with the top 3 leaks and the highest-ROI fix.',
    cta: 'Request audit',
    to: '/free-audit',
    accent: 'from-emerald-500 to-teal-500',
    preview:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    badge: 'No-cost',
  },
];

export default function InteractiveToolsSection() {
  return (
    <section className="relative overflow-hidden bg-white section-pad">
      <div className="absolute inset-0 grid-bg-light opacity-30" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-orange-500/[0.05] blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-[320px] w-[320px] rounded-full bg-blue-500/[0.04] blur-[120px]" />

      <Container className="relative">
        <SectionHeading
          align="center"
          variant="light"
          eyebrow="Self-serve toolbox"
          title={
            <>
              Try it before you{' '}
              <span className="gradient-text-orange">talk to us.</span>
            </>
          }
          description="Four interactive tools. No login. No sales call. Quantify the case, find your fit, compare vendors and get an outside read on your operations — all on your own time."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {TOOLS.map((t, i) => (
            <ToolCard key={t.id} tool={t} index={i} />
          ))}
        </div>

        <p className="mt-12 text-center text-[14px] text-navy-500">
          Want a guided walkthrough instead?{' '}
          <Link
            to="/demo"
            className="font-semibold text-orange-600 hover:text-orange-700"
          >
            Book a 30-minute demo →
          </Link>
        </p>
      </Container>
    </section>
  );
}

function ToolCard({ tool, index }) {
  const { Icon } = tool;
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-cream-300 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200"
    >
      {/* Preview tile — soft gradient with the tool's icon centred so each
          card has a distinct "thumbnail" without needing real screenshots. */}
      <Link to={tool.to} className="block">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <img
            src={tool.preview}
            srcSet={srcSet(tool.preview)}
            sizes="(max-width: 768px) 100vw, 50vw"
            alt=""
            aria-hidden
            loading="lazy" decoding="async"
            className="absolute inset-0 block h-full w-full object-cover opacity-25 transition-transform duration-700 group-hover:scale-105"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${tool.accent} opacity-95`} />
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-25" />

          {/* Centred icon medallion */}
          <div className="absolute inset-0 grid place-items-center">
            <div className="grid h-16 w-16 place-items-center rounded-2xl border border-white/30 bg-white/15 text-white shadow-lg backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
              <Icon className="h-7 w-7" strokeWidth={1.7} />
            </div>
          </div>

          {/* Duration / scope badge */}
          <span className="absolute right-3 top-3 inline-flex items-center rounded-full border border-white/30 bg-white/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
            {tool.badge}
          </span>
        </div>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange-600">
          {tool.eyebrow}
        </p>
        <h3 className="mt-2 font-display text-[17px] font-bold leading-tight text-navy-950">
          {tool.title}
        </h3>
        <p className="mt-2 line-clamp-4 text-[14px] leading-relaxed text-navy-700">
          {tool.desc}
        </p>

        <Link
          to={tool.to}
          className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[14px] font-semibold text-orange-600 hover:text-orange-700"
        >
          {tool.cta}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}
