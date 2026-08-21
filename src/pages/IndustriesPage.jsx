import Container from '../components/ui/Container.jsx';
import PageHero from '../components/sections/PageHero.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import ConcentricRings from '../components/sections/ConcentricRings.jsx';
import DemoCtaCompact from '../components/sections/DemoCtaCompact.jsx';
import IndustryCard from '../components/sections/IndustryCard.jsx';
import { INDUSTRIES } from '../data/industries.js';
import Seo from '../components/common/Seo.jsx';

export default function IndustriesHubPage() {
  return (
    <>
      <Seo
        title="Industries — 8 Food Sub-sectors + 2 Adjacencies"
        description="Vertical-specific process libraries, KPI sets and integration patterns — bakery, dairy, sweets, spices, beverages, food processing, QSR, FMCG and adjacent verticals."
        canonical="https://upwon.in/industries"
      />
      <PageHero
        breadcrumb={[
          { label: 'Home', to: '/' },
          { label: 'Industries' },
        ]}
        eyebrow="Industry Solutions"
        title={
          <>
            Built vertical-first.{' '}
            <span className="gradient-text-orange">
              Eight food sub-sectors. Two adjacencies.
            </span>
          </>
        }
        description="UpWon ships with vertical-specific process libraries, KPI sets, and integration patterns. Each industry comes calibrated to its operating realities — not retrofitted from generic ERP."
      />

      {/* All industries grid */}
      <section className="relative overflow-hidden bg-cream-100 section-pad">
        <div className="absolute inset-0 grid-bg-light opacity-50" />
        <Container className="relative">
          <SectionHeading
            align="center"
            variant="light"
            eyebrow="Choose your vertical"
            title="Tell us your industry. We'll show you what changes."
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind, i) => (
              <IndustryCard
                key={ind.id}
                industry={ind}
                index={i}
                href={`/industries/${ind.slug}`}
                showQuote
                showWorkflows={false}
              />
            ))}
          </div>
        </Container>
      </section>

      <ConcentricRings />

      <DemoCtaCompact />
    </>
  );
}
