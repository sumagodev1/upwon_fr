import { useState } from 'react';
import { m as motion } from 'framer-motion';
import {
  TrendingUp, ClipboardList, Truck, Factory, ShieldCheck, Boxes, BarChart3,
  MapPin, Smartphone, ScanBarcode, Store, ChefHat, ClipboardCheck, Wallet,
  Sparkles, CheckCircle2, UserPlus, Fingerprint, Clock, Calculator, Banknote,
  FileCheck, PackagePlus, Grid3X3, MessageSquareText, Workflow,
} from 'lucide-react';
import Container from '../ui/Container.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import { getPlatformFlow } from '../../data/modules.js';

// Connected Flow Diagram — the brief §2.7 infographic. Renders a per-platform
// end-to-end workflow as an animated horizontal flow chart, with a "Why this
// matters" callout below.
//
// Behaviour:
//   - Horizontal flow on desktop, vertical stack on mobile
//   - On scroll into view, the dashed connector line draws left-to-right
//     (animated width 0 → 100%)
//   - Each step fades + scales in with a 60ms stagger
//   - Active / hovered step lifts the connected portion of the line
//   - Below the diagram: tone-coloured callout card with the platform's
//     headline benefit message

const ICON_MAP = {
  TrendingUp, ClipboardList, Truck, Factory, ShieldCheck, Boxes, BarChart3,
  MapPin, Smartphone, ScanBarcode, Store, ChefHat, ClipboardCheck, Wallet,
  Sparkles, CheckCircle2, UserPlus, Fingerprint, Clock, Calculator, Banknote,
  FileCheck, PackagePlus, Grid3X3, MessageSquareText, Workflow,
};

export default function ConnectedFlowDiagram({ slug, theme }) {
  const flow = getPlatformFlow(slug);
  const [hoverIdx, setHoverIdx] = useState(-1);
  if (!flow) return null;

  const accent = theme?.accent || '#E85A2A';
  const accentSoft = theme?.accentSoft || '#FF7340';
  const tint = theme?.tint || '#FFF1EC';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream-100 to-white section-pad">
      <div className="pointer-events-none absolute inset-0 grid-bg-light opacity-30" />
      <div
        className="pointer-events-none absolute -left-32 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full blur-[140px]"
        style={{ background: `${accent}10` }}
      />

      <Container className="relative">
        <SectionHeading
          align="center"
          variant="light"
          eyebrow="End-to-end flow"
          title={
            <>
              One platform, every step —{' '}
              <span style={{ color: accent }}>connected.</span>
            </>
          }
          description="Hover any node to see what happens. This is the same data layer the operator, the auditor and the CFO see — at the same time."
        />

        {/* Flow track */}
        <div className="relative mt-16">
          {/* Animated connector line — draws on scroll into view (desktop only) */}
          <div className="pointer-events-none absolute inset-x-6 top-9 hidden h-0.5 md:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="h-full origin-left rounded-full"
              style={{
                background: `repeating-linear-gradient(90deg, ${accent}66 0 6px, transparent 6px 12px)`,
              }}
            />
          </div>

          {/* Mobile: vertical stack (grid-cols-1). Desktop: flex row with
              even distribution. Using flex instead of dynamic grid-cols-N
              avoids Tailwind JIT failing on string-built class names. */}
          <div className="relative flex flex-col gap-4 md:flex-row md:items-stretch md:gap-2">
            {flow.steps.map((step, i) => {
              const Icon = ICON_MAP[step.icon] || Workflow;
              const isHover = hoverIdx === i;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 18, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onMouseEnter={() => setHoverIdx(i)}
                  onMouseLeave={() => setHoverIdx(-1)}
                  className="relative flex flex-1 flex-col items-center text-center"
                >
                  {/* Icon + badge wrapper — anchoring the badge to this
                      relative element (not the whole step container) keeps
                      the "1/2/3" pill stuck to the corner of the circle on
                      EVERY layout. On the previous build the badge used
                      `right-0` on the step container, which on mobile
                      stretched to full width and pushed the badge to the
                      page edge instead of the icon. */}
                  <div className="relative">
                    {/* Step badge — top-right of the icon circle */}
                    <span
                      className="absolute -right-1.5 -top-1.5 z-10 grid h-6 w-6 place-items-center rounded-full text-[14px] font-bold text-white shadow-md ring-2 ring-white"
                      style={{ background: accent }}
                    >
                      {i + 1}
                    </span>

                    {/* Icon node — circular, accent-coloured, lifts on hover */}
                    <motion.div
                      animate={isHover ? { scale: 1.12, y: -4 } : { scale: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="grid h-[72px] w-[72px] place-items-center rounded-full border-2 bg-white shadow-md md:h-[80px] md:w-[80px]"
                      style={{
                        borderColor: isHover ? accent : `${accent}66`,
                        boxShadow: isHover
                          ? `0 16px 40px -10px ${accent}66`
                          : `0 6px 20px -8px ${accent}33`,
                      }}
                    >
                      <Icon
                        className="h-7 w-7"
                        style={{ color: isHover ? accent : accentSoft }}
                        strokeWidth={1.75}
                      />
                    </motion.div>
                  </div>

                  {/* Step title + sub */}
                  <p className="mt-3 font-display text-[14px] font-bold leading-tight text-navy-950 md:text-[14px]">
                    {step.title}
                  </p>
                  <p className="mt-1 max-w-[220px] text-[14px] leading-snug text-navy-600 md:max-w-[140px] md:text-[14px]">
                    {step.sub}
                  </p>

                  {/* Mobile vertical connector — taller + thicker than before
                      so the flow reads clearly when stacked. */}
                  {i < flow.steps.length - 1 && (
                    <span
                      className="my-4 h-10 w-[3px] rounded-full md:hidden"
                      style={{
                        background: `repeating-linear-gradient(180deg, ${accent}66 0 5px, transparent 5px 10px)`,
                      }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Why this matters — callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 max-w-3xl rounded-2xl border bg-white p-7 shadow-enterprise md:p-9"
          style={{ borderColor: `${accent}33` }}
        >
          <div className="flex items-start gap-4">
            <div
              className="grid h-12 w-12 shrink-0 place-items-center rounded-xl"
              style={{ background: tint, color: accent }}
            >
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p
                className="text-[10.5px] font-bold uppercase tracking-[0.22em]"
                style={{ color: accent }}
              >
                Why this matters
              </p>
              <h3 className="mt-1 font-display text-lg font-bold text-navy-950 md:text-xl">
                {flow.callout.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-navy-700">
                {flow.callout.body}
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
