import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import Container from '../Container/Container.jsx';
import SectionHeading from '../SectionHeading/SectionHeading.jsx';
import {
  getTopSectorsForPlatform,
  PLATFORM_SECTOR_PITCH,
} from '../../../data/platformSectors.js';
import { REVENUE_POTENTIAL_LABELS } from '../../../data/industries.js';

// Surfaces a platform's Top 7 recommended sectors from the Platform-Sector
// Mapping workbook. Each card shows: sector name, 1-line use case, strategic
// note, and a revenue-potential star rating. Rendered on every ProductPage
// between the modules section and the mid-CTA / comparison block.
export default function TopSectorsForProduct({ productSlug, productCode, accent = '#E85A2A' }) {
  const sectors = getTopSectorsForPlatform(productSlug);
  if (!sectors || sectors.length === 0) return null;

  const pitch = PLATFORM_SECTOR_PITCH[productSlug] || 'Built for these 7 sectors';

  return (
    <section className="relative overflow-hidden bg-cream-100 section-pad">
      <div className="absolute inset-0 grid-bg-light opacity-40" />
      <div
        className="pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full blur-[120px]"
        style={{ background: `${accent}14` }}
      />

      <Container className="relative">
        <SectionHeading
          align="center"
          variant="light"
          eyebrow="Sector fit"
          title={
            <>
              {pitch.split(' ').slice(0, -3).join(' ')}{' '}
              <span className="gradient-text-orange">
                {pitch.split(' ').slice(-3).join(' ')}
              </span>
            </>
          }
          description={`${productCode} is sold into many industries — these are the seven where it's the deepest fit, where deployments compound, and where revenue potential is highest.`}
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sectors.map((sector, i) => (
            <SectorCard
              key={sector.name}
              sector={sector}
              index={i}
              accent={accent}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/industries"
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-orange-600 hover:text-orange-700"
          >
            Explore all UpWon industry verticals
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

function SectorCard({ sector, index, accent }) {
  const revenue = REVENUE_POTENTIAL_LABELS[sector.revenuePotential];
  const Icon = sector.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-cream-300 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-enterprise"
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl ring-1"
          style={{
            background: `${accent}14`,
            color: accent,
            borderColor: `${accent}55`,
          }}
        >
          {Icon ? <Icon className="h-5 w-5" /> : null}
        </span>
        {revenue && (
          <span
            className="inline-flex items-center gap-0.5 rounded-full border border-amber-300/70 bg-amber-50 px-2 py-0.5 text-amber-400"
            title={`Revenue potential: ${revenue.label}`}
          >
            {Array.from({ length: revenue.stars }).map((_, s) => (
              <Star key={s} className="h-2.5 w-2.5" fill="currentColor" />
            ))}
          </span>
        )}
      </div>

      <h3 className="mt-4 font-display text-[15.5px] font-bold leading-tight text-navy-950">
        {sector.name}
      </h3>
      <p className="mt-1.5 text-[14px] leading-relaxed text-navy-600">
        {sector.summary}
      </p>

      <div className="mt-auto pt-4">
        <p
          className="text-[10.5px] font-semibold uppercase tracking-[0.14em]"
          style={{ color: accent }}
        >
          Strategic fit
        </p>
        <p className="mt-1 text-[14px] italic leading-snug text-navy-700">
          {sector.note}
        </p>
      </div>
    </motion.article>
  );
}
