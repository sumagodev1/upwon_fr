import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertOctagon, Wrench, TrendingUp, Quote, Download, ArrowRight } from 'lucide-react';
import Container from '../Container/Container.jsx';
import SectionHeading from '../SectionHeading/SectionHeading.jsx';
import { getPlatformCaseStudy } from '../../../data/modules.js';

// Brief §2.9 — Case Study Full Format.
// 3-panel layout: Challenge | Solution | Result. Panel headers are tone-
// coloured (red / teal / green). Below the panels: large pull quote with
// attribution, then a gated PDF download CTA + a routed page CTA to book a
// demo "configured for your business".
//
// This component is the brief's stated "most powerful single conversion
// element on the product page" so it gets generous whitespace and an
// honest, scan-friendly information architecture.
//
// Now also serves the industry version (brief §X.7) — pass an inline `study`
// object (and `eyebrow` / `title` overrides) instead of `slug` to render an
// industry-specific case study without going through PLATFORM_CASE_STUDIES.
export default function CaseStudyFullCard({
  slug,
  theme,
  productCode,
  study: studyOverride,
  eyebrowOverride,
  titleOverride,
}) {
  const study = studyOverride || (slug ? getPlatformCaseStudy(slug) : null);
  if (!study) return null;

  const accent = theme?.accent || '#E85A2A';

  return (
    <section
      id="case-study"
      className="relative overflow-hidden bg-cream-100 section-pad scroll-mt-32"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg-light opacity-30" />

      <Container className="relative">
        <SectionHeading
          align="center"
          variant="light"
          eyebrow={eyebrowOverride || 'Case study — same industry, same problem'}
          title={
            titleOverride || (
              <>
                {study.industryTag} —{' '}
                <span style={{ color: accent }}>same playbook, real numbers.</span>
              </>
            )
          }
          description={`How a ${study.industryTag.toLowerCase()} operator used ${productCode || 'UpWon'} to fix the same problems you're reading about today.`}
        />

        {/* Header strip — company context */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl border border-cream-300 bg-white shadow-enterprise"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cream-200 bg-gradient-to-r from-cream-100 to-white px-6 py-5 md:px-8">
            <div>
              <p
                className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.22em]"
                style={{ background: `${accent}1f`, color: accent }}
              >
                {study.industryTag}
              </p>
              <p className="mt-2 font-display text-lg font-bold text-navy-950 md:text-xl">
                {study.company} · {study.location}
              </p>
            </div>
            <div className="flex flex-wrap gap-6">
              <Stat label="Turnover" value={study.turnover} />
              <Stat label="Employees" value={study.employees} />
            </div>
          </div>

          {/* 3-panel grid */}
          <div className="grid gap-px bg-cream-200 md:grid-cols-3">
            <Panel
              tone="challenge"
              icon={AlertOctagon}
              header="The Challenge"
              body={study.challenge}
            />
            <Panel
              tone="solution"
              icon={Wrench}
              header="The Solution"
              body={study.solution}
            />
            <Panel
              tone="result"
              icon={TrendingUp}
              header="The Result"
              bullets={study.results}
            />
          </div>

          {/* Pull quote */}
          <div className="relative px-6 py-9 md:px-12 md:py-12">
            <Quote
              className="absolute left-6 top-6 h-7 w-7 opacity-30 md:left-12 md:top-9"
              style={{ color: accent }}
              strokeWidth={2.5}
            />
            <p className="mx-auto max-w-3xl text-center font-display text-[1.25rem] italic leading-relaxed text-navy-900 md:text-[1.45rem]">
              &ldquo;{study.quote.text}&rdquo;
            </p>
            <p
              className="mt-4 text-center text-[11.5px] font-bold uppercase tracking-[0.22em]"
              style={{ color: accent }}
            >
              — {study.quote.attrib}
            </p>
          </div>

          {/* Footer CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 border-t border-cream-200 bg-cream-100 px-6 py-5 md:px-8">
            <Link
              to="/resources"
              className="inline-flex items-center gap-1.5 rounded-md border bg-white px-4 py-2.5 text-[14px] font-semibold transition-colors hover:bg-cream-50"
              style={{ borderColor: `${accent}40`, color: accent }}
            >
              <Download className="h-3.5 w-3.5" />
              {study.pdfLabel}
            </Link>
            <Link
              to="/demo"
              className="inline-flex items-center gap-1.5 rounded-md px-4 py-2.5 text-[14px] font-semibold text-white transition-colors"
              style={{ background: accent }}
            >
              Book a demo configured for your business
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <p className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-navy-500">
        {label}
      </p>
      <p className="mt-0.5 font-display text-[15px] font-bold text-navy-950">
        {value}
      </p>
    </div>
  );
}

const PANEL_TONE = {
  challenge: {
    header: 'bg-rose-100 text-rose-700',
    iconBg: 'bg-rose-50 text-rose-700 ring-rose-200',
    body: 'bg-rose-50/30',
  },
  solution: {
    header: 'bg-teal-100 text-teal-700',
    iconBg: 'bg-teal-50 text-teal-700 ring-teal-200',
    body: 'bg-teal-50/30',
  },
  result: {
    header: 'bg-emerald-100 text-emerald-700',
    iconBg: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    body: 'bg-emerald-50/30',
  },
};

function Panel({ tone, icon: Icon, header, body, bullets }) {
  const t = PANEL_TONE[tone];
  return (
    <div className={`relative flex flex-col ${t.body}`}>
      <div className={`flex items-center gap-2 px-6 py-4 ${t.header}`}>
        <span
          className={`grid h-7 w-7 place-items-center rounded-lg ring-1 ${t.iconBg}`}
        >
          <Icon className="h-3.5 w-3.5" />
        </span>
        <p className="text-[10.5px] font-bold uppercase tracking-[0.22em]">
          {header}
        </p>
      </div>
      <div className="flex-1 px-6 py-6 md:px-7">
        {body && (
          <p className="text-[14px] leading-relaxed text-navy-800">
            {body}
          </p>
        )}
        {bullets && (
          <ul className="grid gap-4">
            {bullets.map((b, i) => (
              <li key={`${b.label}-${i}`}>
                <p className="num-display text-2xl font-bold leading-none text-navy-950 md:text-3xl">
                  {b.metric}
                </p>
                <p className="mt-1.5 text-[14px] leading-snug text-navy-700">
                  {b.label}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
