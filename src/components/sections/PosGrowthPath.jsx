import { Link } from 'react-router-dom';
import { m as motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';

/*
  POS "Module Versions & Growth Path" — a low-risk entry point and a visible
  upgrade path, addressing the fear of outgrowing a system. Three tiers as
  pricing-style cards (middle highlighted). "Talk to us" instead of prices.

  FLAG: proposed structure — needs product & pricing sign-off before publishing.
*/

const EASE = [0.22, 1, 0.3, 1];
const ORANGE = '#E85A2A';

const TIERS = [
  {
    tier: 'Core',
    heading: 'Essential counter billing',
    scope: 'Single outlet or up to 10 counters',
    chip: 'Up to 10 counters',
    featuresLabel: 'Includes',
    features: [
      'Cloud POS — touch, barcode & weighing',
      'Multi-tender billing — cash, card, UPI, wallet',
      'GST-compliant invoicing',
      'Item & category management',
      'Daily sales & Z-reports',
      'Offline-first reliability',
    ],
    popular: false,
  },
  {
    tier: 'Pro',
    heading: 'Kitchen, loyalty & delivery',
    scope: '10–100 counters across outlets',
    chip: 'Up to 100 counters',
    featuresLabel: 'Everything in Core, plus',
    features: [
      'KOT & Kitchen Display',
      'Table & order management',
      'Loyalty & repeat-customer tracking',
      'Discounts, offers & combos',
      'Delivery aggregator integration (Zomato, Swiggy, ONDC)',
      'Multi-counter, multi-outlet billing',
    ],
    popular: true,
  },
  {
    tier: 'Plus',
    heading: 'Inventory, analytics & upgrade path',
    scope: '100+ counters or chain-wide POS',
    chip: 'Unlimited',
    featuresLabel: 'Everything in Pro, plus',
    features: [
      'Recipe-level inventory deduction',
      'Purchase & vendor management',
      'Multi-outlet dashboard & analytics',
      'Central kitchen & stock transfers',
      'Role-based access & audit trail',
      'Direct upgrade path into UpWon ERP & FMS',
    ],
    popular: false,
  },
];

export default function PosGrowthPath() {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      <Container>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <Eyebrow className="justify-center">Module Versions &amp; Growth Path</Eyebrow>
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            Start With Billing.{' '}
            <span className="gradient-text-orange">Grow Into Your Full Kitchen and Stock.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            POS that fits a single counter or a 1,000-outlet chain — same UI, same reliability. Start
            small and switch modules on as you grow.
          </p>
        </motion.div>

        {/* Tier cards */}
        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-3">
          {TIERS.map((t, i) => (
            <motion.div
              key={t.tier}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              className={`relative flex flex-col rounded-3xl border p-7 md:p-8 ${
                t.popular
                  ? 'border-orange-300 bg-orange-50/70 shadow-enterprise'
                  : 'border-cream-300 bg-white shadow-sm'
              }`}
            >
              {t.popular && (
                <span
                  className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-white"
                  style={{ background: ORANGE }}
                >
                  <Sparkles className="h-3.5 w-3.5" strokeWidth={2.2} />
                  Most Popular
                </span>
              )}

              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-navy-500">
                {t.tier}
              </p>
              <h3 className="mt-3 h-display text-[1.5rem] leading-tight tracking-tight text-navy-950 md:min-h-[3.75rem]">
                {t.heading}
              </h3>
              <p className="mt-2 text-[14px] text-navy-500">{t.scope}</p>
              <span className="mt-4 inline-flex w-fit rounded-full border border-cream-300 bg-white px-3 py-1.5 text-[14px] font-bold text-navy-800">
                {t.chip}
              </span>

              <div className="mt-6 border-t border-cream-300 pt-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-navy-500">
                  {t.featuresLabel}
                </p>
                <ul className="mt-4 space-y-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[14px] text-navy-800">
                      <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ORANGE }} strokeWidth={2.6} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-8">
                <Link
                  to="/demo"
                  className={`flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold transition-colors ${
                    t.popular
                      ? 'text-white'
                      : 'border border-navy-300 text-navy-900 hover:bg-navy-900/5'
                  }`}
                  style={t.popular ? { background: ORANGE } : undefined}
                >
                  Talk to us
                  <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Growth-path line */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="mx-auto mt-10 max-w-2xl text-center text-[14.5px] font-semibold text-navy-800"
        >
          Start with Core today. Move to Plus — or into full UpWon ERP —{' '}
          <span style={{ color: ORANGE }}>without re-entering a single record.</span>
        </motion.p>
      </Container>
    </section>
  );
}
