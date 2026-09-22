import { m as motion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

/*
  "UPWON vs the Alternatives" — an honest, plain-language comparison against
  global ERPs and generic/open-source platforms. Matter-of-fact cell values
  (no star ratings, no "best in class"). The column header row is sticky, so it
  stays visible while the grouped rows scroll past (like the reference).
  Desktop: a 4-column table. Mobile: grouped cards.
*/

const EASE = [0.22, 1, 0.3, 1];

const COLUMNS = [
  { key: 'upwon', label: 'UPWON', sub: 'Built for food & FMCG', highlight: true },
  { key: 'global', label: 'Global ERPs', sub: 'SAP · Oracle · Dynamics' },
  { key: 'generic', label: 'Generic / Open-Source', sub: 'Odoo · ERPNext · Zoho · Tally' },
];

const GROUPS = [
  {
    title: 'Cost & rollout',
    rows: [
      {
        feature: 'Cost & time to go-live',
        upwon: '30–45 days, a fraction of enterprise TCO',
        global: '12–18 months, high licence + SI cost',
        generic: 'Varies — heavy customisation to fit food',
      },
      {
        feature: '3-year total cost of ownership',
        upwon: 'A fraction of SAP B1 / Oracle NetSuite',
        global: 'High licence + implementation',
        generic: 'Lower licence, high build & maintain cost',
      },
    ],
  },
  {
    title: 'Food & compliance',
    rows: [
      {
        feature: 'Food- & FSSAI-specific workflows',
        upwon: 'Built in — recipe/BOM, batch, FEFO, FSSAI',
        global: 'Add-ons or a custom build',
        generic: 'Not food-specific — build it yourself',
      },
      {
        feature: 'GST & e-invoice, native',
        upwon: 'Native',
        global: 'Localisation packs',
        generic: 'Plugin or manual',
      },
    ],
  },
  {
    title: 'India distribution',
    rows: [
      {
        feature: 'GT/MT distribution logic',
        upwon: 'Native GT/MT',
        global: 'Partner add-ons',
        generic: 'Limited or manual',
      },
      {
        feature: 'SFA-DMS field force',
        upwon: 'Built in',
        global: 'Third-party integration',
        generic: 'Separate tool',
      },
    ],
  },
  {
    title: 'Partnership & support',
    rows: [
      {
        feature: 'Access to the team building the product',
        upwon: 'Direct access to the product team',
        global: 'Via SI partners and support tickets',
        generic: 'Community or third-party vendors',
      },
    ],
  },
];

const COLS = 'grid grid-cols-[1.5fr_1fr_1fr_1fr]';

function ColHeader({ col }) {
  return (
    <div className="flex flex-col">
      <span
        className={`text-sm font-extrabold ${col.highlight ? 'text-orange-600' : 'text-navy-900'} md:text-base`}
      >
        {col.label}
      </span>
      <span className="mt-0.5 text-[14px] text-navy-500">{col.sub}</span>
    </div>
  );
}

export default function AlternativesComparison() {
  return (
    <section className="relative bg-cream-100 py-14 md:py-20">
      <div className="pointer-events-none absolute inset-0 grid-bg-light opacity-40" />

      <Container className="relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <Eyebrow className="justify-center">UPWON vs the Alternatives</Eyebrow>
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            Enterprise-Grade Depth.{' '}
            <span className="gradient-text-orange">Without the Enterprise Price or Timeline.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            No formal feature bake-off required — just a plain-language look at how UPWON compares
            with global ERPs and generic platforms on the things food and FMCG operators actually
            care about.
          </p>
        </motion.div>

        {/* ===== Desktop table (sticky header, scrolling rows) ===== */}
        <div className="mx-auto mt-12 hidden max-w-5xl rounded-2xl border border-cream-300 bg-white shadow-sm md:block">
          {/* Sticky header */}
          <div className={`${COLS} sticky top-[112px] z-20 rounded-t-2xl bg-white shadow-[0_6px_16px_-12px_rgba(15,21,53,0.25)]`}>
            <div className="flex flex-col justify-center p-5">
              <span className="text-sm font-extrabold text-navy-900 md:text-base">
                How They Compare
              </span>
              <span className="mt-0.5 text-[14px] text-navy-500">
                On what food &amp; FMCG operators care about
              </span>
            </div>
            {COLUMNS.map((col) => (
              <div
                key={col.key}
                className={`p-5 ${col.highlight ? 'border-x border-orange-100 bg-orange-50' : ''}`}
              >
                <ColHeader col={col} />
              </div>
            ))}
          </div>

          {/* Groups */}
          {GROUPS.map((group) => (
            <div key={group.title}>
              {/* Category label row — sticky under the header until the next group */}
              <div className={`${COLS} sticky top-[186px] z-10 border-t border-cream-300 bg-white shadow-[0_5px_12px_-10px_rgba(15,21,53,0.3)]`}>
                <div className="px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-navy-500">
                  {group.title}
                </div>
                <div className="border-x border-orange-100 bg-orange-50" />
                <div className="bg-white" />
                <div className="bg-white" />
              </div>

              {/* Rows */}
              {group.rows.map((row) => (
                <div key={row.feature} className={`${COLS} border-t border-cream-300`}>
                  <div className="p-5 text-[14px] font-semibold leading-snug text-navy-900">
                    {row.feature}
                  </div>
                  <div className="border-x border-orange-100 bg-orange-50 p-5">
                    <span className="flex items-start gap-2 text-[14px] font-semibold leading-snug text-navy-950">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                      {row.upwon}
                    </span>
                  </div>
                  <div className="p-5 text-[14px] leading-snug text-navy-600">{row.global}</div>
                  <div className="p-5 text-[14px] leading-snug text-navy-600">{row.generic}</div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* ===== Mobile — grouped cards ===== */}
        <div className="mt-10 space-y-8 md:hidden">
          {GROUPS.map((group) => (
            <div key={group.title}>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-navy-400">
                {group.title}
              </p>
              <div className="space-y-4">
                {group.rows.map((row) => (
                  <motion.div
                    key={row.feature}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="rounded-2xl border border-cream-300 bg-white p-5 shadow-sm"
                  >
                    <p className="text-[14px] font-bold leading-snug text-navy-950">{row.feature}</p>
                    <div className="mt-3 space-y-2">
                      <div className="rounded-xl border border-orange-100 bg-orange-50/70 p-3">
                        <p className="text-[11px] font-bold uppercase tracking-wide text-orange-600">
                          UPWON
                        </p>
                        <p className="mt-0.5 text-[14px] font-semibold text-navy-950">{row.upwon}</p>
                      </div>
                      <div className="rounded-xl border border-cream-300 p-3">
                        <p className="text-[11px] font-bold uppercase tracking-wide text-navy-500">
                          Global ERPs
                        </p>
                        <p className="mt-0.5 text-[14px] text-navy-600">{row.global}</p>
                      </div>
                      <div className="rounded-xl border border-cream-300 p-3">
                        <p className="text-[11px] font-bold uppercase tracking-wide text-navy-500">
                          Generic / Open-Source
                        </p>
                        <p className="mt-0.5 text-[14px] text-navy-600">{row.generic}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
