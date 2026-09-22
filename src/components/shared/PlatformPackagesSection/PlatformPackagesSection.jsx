import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import Container from '../Container/Container.jsx';
import SectionHeading from '../SectionHeading/SectionHeading.jsx';
import { getPlatformPackages } from '../../../data/modules.js';

// Per-platform 3-tier packages — brief §2.11 "Pricing Teaser".
// Renders Starter / Growth / Enterprise cards with the platform's accent
// threaded through (header bar, highlight glow, CTA button). Growth is
// always the highlighted middle card (most-popular).
//
// Props:
//   slug   — platform slug used to look up PLATFORM_PACKAGES
//   theme  — { accent, accentSoft, tint, glow } from getPlatformTheme(slug)
//   productCode — used to title the section
export default function PlatformPackagesSection({ slug, theme, productCode }) {
  const block = getPlatformPackages(slug);
  if (!block) return null;

  const accent = theme?.accent || '#E85A2A';
  const accentSoft = theme?.accentSoft || '#FF7340';
  const tint = theme?.tint || '#FFF1EC';

  return (
    <section className="relative overflow-hidden bg-cream-100 section-pad">
      <div className="pointer-events-none absolute inset-0 grid-bg-light opacity-30" />
      <div
        className="pointer-events-none absolute -right-32 top-1/3 h-[420px] w-[420px] rounded-full blur-[140px]"
        style={{ background: `${accent}14` }}
      />

      <Container className="relative">
        <SectionHeading
          align="center"
          variant="light"
          eyebrow={`${productCode || 'Platform'} packages`}
          title={
            <>
              Flexible packages —{' '}
              <span style={{ color: accent }}>sized to your stage.</span>
            </>
          }
          description={block.intro}
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
          {block.tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-enterprise-lg md:scale-100"
              style={{
                borderColor: tier.highlight ? accent : '#E4E7EB',
                boxShadow: tier.highlight
                  ? `0 24px 60px -20px ${accent}55`
                  : undefined,
                transform: tier.highlight ? 'scale(1.025)' : undefined,
                zIndex: tier.highlight ? 2 : 1,
              }}
            >
              {/* Most-popular ribbon on highlighted tier */}
              {tier.highlight && (
                <div
                  className="absolute -top-px left-1/2 -translate-x-1/2 rounded-b-2xl px-5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.22em] text-white"
                  style={{ background: accent }}
                >
                  <Sparkles className="mr-1 inline-block h-3 w-3" />
                  Most Popular
                </div>
              )}

              {/* Header — name + who-for */}
              <div
                className="px-6 pt-9 pb-5"
                style={{ background: tier.highlight ? tint : '#fff' }}
              >
                <p
                  className="text-[10.5px] font-bold uppercase tracking-[0.22em]"
                  style={{ color: tier.highlight ? accent : '#666677' }}
                >
                  {tier.name}
                </p>
                <p className="mt-3 font-display text-[26px] font-bold leading-tight text-navy-950">
                  {tier.price}
                </p>
                <p className="mt-2 text-[14px] leading-snug text-navy-600">
                  {tier.for}
                </p>
                <p
                  className="mt-3 inline-block rounded-full px-2.5 py-1 text-[14px] font-bold"
                  style={{ background: '#F1F3F5', color: '#23295e' }}
                >
                  {tier.users}
                </p>
              </div>

              {/* Feature list */}
              <ul className="flex-1 space-y-2.5 border-t border-cream-200 px-6 py-6">
                {tier.features.map((f) => {
                  const isContinuation = f.startsWith('Everything in');
                  return (
                    <li
                      key={f}
                      className={`flex items-start gap-2 ${
                        isContinuation ? 'font-semibold text-navy-950' : ''
                      }`}
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0"
                        strokeWidth={2.5}
                        style={{ color: accent }}
                      />
                      <span className="text-[14px] leading-snug text-navy-800">
                        {f}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {/* CTA */}
              <div className="px-6 pb-6">
                {tier.highlight ? (
                  <Link
                    to="/demo"
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-md px-4 py-3 text-[14px] font-semibold text-white transition-colors"
                    style={{
                      background: `linear-gradient(135deg, ${accent}, ${accentSoft})`,
                    }}
                  >
                    Book a Demo
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ) : tier.name === 'Enterprise' ? (
                  <Link
                    to="/contact"
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-navy-200 bg-white px-4 py-3 text-[14px] font-semibold text-navy-900 transition-colors hover:bg-cream-100"
                  >
                    Contact Sales
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ) : (
                  <Link
                    to="/demo"
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-md border bg-white px-4 py-3 text-[14px] font-semibold transition-colors"
                    style={{ borderColor: `${accent}66`, color: accent }}
                  >
                    Get Started
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust line */}
        <p className="mt-10 text-center text-[14px] text-navy-600">
          <span className="font-semibold text-navy-950">No setup fees</span> ·{' '}
          <span className="font-semibold text-navy-950">Free data migration</span> ·{' '}
          <span className="font-semibold text-navy-950">Dedicated onboarding</span> ·{' '}
          <span className="font-semibold text-navy-950">Typical payback 6–8 months</span>
        </p>
      </Container>
    </section>
  );
}
