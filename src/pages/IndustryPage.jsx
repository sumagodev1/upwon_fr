import { useParams, Navigate, Link } from 'react-router-dom';
import { m as motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, CheckCircle2, AlertTriangle, Star, TrendingUp } from 'lucide-react';
import Container from '../components/ui/Container.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import HeroSlider from '../components/ui/HeroSlider.jsx';
import JourneyCard from '../components/sections/JourneyCard.jsx';
import IndustryFaq from '../components/sections/IndustryFaq.jsx';
import ApplicabilityMatrix from '../components/sections/ApplicabilityMatrix.jsx';
import HonestComparison from '../components/sections/HonestComparison.jsx';
import WhatsTheSame from '../components/sections/WhatsTheSame.jsx';
import ExpansionGrid from '../components/sections/ExpansionGrid.jsx';
import AuthorityNoteStrip from '../components/sections/AuthorityNoteStrip.jsx';
import LeadHookPreview from '../components/sections/LeadHookPreview.jsx';
import IndustryRingPlacement from '../components/sections/IndustryRingPlacement.jsx';
import InteractiveToolsSection from '../components/sections/InteractiveToolsSection.jsx';
import Seo, { industryJsonLd, breadcrumbJsonLd, faqJsonLd } from '../components/common/Seo.jsx';
import {
  INDUSTRIES,
  INDUSTRY_IMAGES,
  INDUSTRY_FALLBACK_IMAGE,
  HOMEPAGE_TOP_7_RANKS,
  HOMEPAGE_HEADLINES,
  INDUSTRY_REVENUE_POTENTIAL,
  REVENUE_POTENTIAL_LABELS,
  INDUSTRY_STRATEGIC_NOTES,
} from '../data/industries.js';
import { PLATFORM_MODULES, getPlatformTheme, HONEST_COMPARISON } from '../data/modules.js';
import { INDUSTRY_FAQS, INDUSTRY_JOURNEYS, FRANCHISE_SPECTRUM, DISTRIBUTION_SPECTRUM, getIndustryCaseStudy } from '../data/industryExtras.js';
import CaseStudyFullCard from '../components/sections/CaseStudyFullCard.jsx';
import FeatureDeepDiveSection from '../components/sections/FeatureDeepDiveSection.jsx';
import IndustryPeerQuote from '../components/sections/IndustryPeerQuote.jsx';
import ProductDemoCta from '../components/sections/ProductDemoCta.jsx';

export default function IndustryPage() {
  const { slug } = useParams();
  const ind = INDUSTRIES.find((i) => i.slug === slug);
  if (!ind) return <Navigate to="/industries" replace />;

  // All the industryExtras data (FAQs, journeys, case studies, images, accent,
  // sub-segments) is keyed by industry `id` — NOT the URL `slug`. They differ
  // for 6 of the 10 industries (e.g. id 'fmcg' → slug 'fmcg-distribution'), so
  // every one of these lookups must use `ind.id`, or the section silently
  // falls back to empty/default for those industries.
  const key = ind.id;
  const faqs = INDUSTRY_FAQS[key] || [];
  const journey = INDUSTRY_JOURNEYS[key] || [];
  const industryCaseStudy = getIndustryCaseStudy(key);
  const relevantPlatforms = PLATFORM_MODULES.filter((p) =>
    ind.relevantPlatforms?.includes(p.id),
  );

  // Adapt color tone per industry
  const accentMap = {
    bakery: '#E85A2A',
    dairy: '#1565C0',
    fmcg: '#006D77',
    qsr: '#9C1B4A',
    sweets: '#C8820A',
    spices: '#E65100',
    'food-processing': '#2E7D32',
    beverages: '#1565C0',
    'non-food-fmcg': '#6A1B9A',
    engineering: '#37474F',
  };
  const accent = accentMap[key] || '#E85A2A';

  // Industry hero slides — brief §X.1 mandates 3 slides per industry page.
  // Synthesise from the industry's authored content so the slider stays in
  // sync with the canonical industry data and we don't fork 30+ slide objects.
  const indImg = INDUSTRY_IMAGES[key] || INDUSTRY_FALLBACK_IMAGE;
  const heroBg = indImg.replace(/w=900/, 'w=2000');
  const firstPain = ind.pains?.[0];
  const heroSlides = [
    {
      eyebrow: `${ind.code} · ${ind.tag}`,
      headline: ind.insiderHero,
      subhead: ind.description,
      cta: { label: `See UpWon for ${ind.name.split(' ')[0]}`, to: '/demo' },
      secondaryCta: ind.featuredClient
        ? { label: `See ${ind.featuredClient} story`, to: '/clients' }
        : { label: 'Industry capabilities', to: '#capabilities' },
      bg: heroBg,
      accent,
    },
    firstPain && {
      eyebrow: `${ind.name} — the real problem`,
      headline: firstPain.title,
      subhead: firstPain.desc,
      cta: { label: 'See how UpWon fixes this', to: '#capabilities' },
      secondaryCta: { label: 'Book a Demo', to: '/demo' },
      bg: heroBg,
      accent,
    },
    {
      eyebrow: `Built for ${ind.name}`,
      headline: 'One platform. Your workflows. Live in 30–45 days.',
      subhead: `ERP, distribution, outlet POS, HR and warehouse — pre-configured for ${ind.name.toLowerCase()} operations. No customisation marathon.`,
      cta: { label: 'Book an Industry-Configured Demo', to: '/demo' },
      secondaryCta: { label: 'See Clients', to: '/clients' },
      bg: heroBg,
      accent,
    },
  ].filter(Boolean);

  // Per-industry SEO — brief rule 8. Title + description derived from the
  // industry record so the SEO line evolves with the on-page hero.
  const seoTitle = ind.seoTitle || `${ind.name} — ${ind.insiderHero}`;
  const seoDesc = ind.metaDescription || ind.description;

  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDesc}
        canonical={`https://upwon.in/industries/${ind.slug}`}
        jsonLd={[
          industryJsonLd({ name: ind.name, description: seoDesc, slug: ind.slug }),
          breadcrumbJsonLd([
            { name: 'Home', to: '/' },
            { name: 'Industries', to: '/industries' },
            { name: ind.name, to: `/industries/${ind.slug}` },
          ]),
          faqJsonLd(faqs),
        ]}
      />

      {/* ========== INDUSTRY HERO — auto-scroll slider (brief §X.1) ========== */}
      <HeroSlider
        slides={heroSlides}
        variant="dark"
        intervalMs={5000}
        topPad="pt-32 md:pt-40"
        breadcrumb={
          <ol className="inline-flex items-center gap-1.5">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><ArrowRight className="h-3 w-3 opacity-60" /></li>
            <li><Link to="/industries" className="hover:text-white">Industries</Link></li>
            <li><ArrowRight className="h-3 w-3 opacity-60" /></li>
            <li className="text-white">{ind.name}</li>
          </ol>
        }
      />

      {/* ========== INDUSTRY OVERVIEW — breadcrumb, metrics, journey ========== */}
      <section className="relative overflow-hidden bg-navy-900 py-10 md:py-12">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div
          className="pointer-events-none absolute top-1/2 left-[-10%] h-[400px] w-[400px] rounded-full blur-[120px]"
          style={{ background: `${accent}14` }}
        />

        <Container className="relative">
          {/* Strategic context band — surfaces the Platform-Sector workbook
              positioning (Top 7 rank, revenue potential, market size,
              strategic note) so the page reads consistently with how the
              sales team pitches this vertical. */}
          {(() => {
            const homepageRank = HOMEPAGE_TOP_7_RANKS[ind.id];
            const homepageMeta = HOMEPAGE_HEADLINES[ind.id];
            const revenue =
              REVENUE_POTENTIAL_LABELS[INDUSTRY_REVENUE_POTENTIAL[ind.id]];
            const strategicNote = INDUSTRY_STRATEGIC_NOTES[ind.id];
            if (!homepageRank && !revenue && !strategicNote) return null;
            return (
              <div className="mx-auto mb-10 max-w-4xl text-center">
                <div className="inline-flex flex-wrap items-center justify-center gap-2">
                  {homepageRank && (
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full border border-orange-400/40 bg-orange-500/15 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.18em] text-orange-200"
                      title="Sector position in UpWon's homepage Top 7"
                    >
                      <Star className="h-3 w-3" fill="currentColor" />
                      Homepage Top 7 · Rank #{homepageRank}
                    </span>
                  )}
                  {revenue && (
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.18em] text-white/85"
                      title={`Revenue potential per Platform-Sector workbook: ${revenue.label}`}
                    >
                      <span className="inline-flex">
                        {Array.from({ length: revenue.stars }).map((_, s) => (
                          <Star
                            key={s}
                            className="h-2.5 w-2.5 text-orange-300"
                            fill="currentColor"
                          />
                        ))}
                      </span>
                      Revenue: {revenue.label}
                    </span>
                  )}
                  {homepageMeta?.marketSize && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.18em] text-white/85">
                      <TrendingUp className="h-3 w-3 text-orange-300" />
                      Market: {homepageMeta.marketSize}
                    </span>
                  )}
                </div>
                {strategicNote && (
                  <p className="mx-auto mt-4 max-w-2xl text-[14px] italic leading-relaxed text-cream-100/75 md:text-[14.5px]">
                    “{strategicNote}”
                  </p>
                )}
              </div>
            );
          })()}

          {/* Intro — purpose-built one-liner per industry (from SEO content) */}
          {ind.intro && (
            <p className="mx-auto mb-10 max-w-3xl text-center text-[15px] leading-relaxed text-cream-100/80 md:text-base">
              {ind.intro}
            </p>
          )}

          {/* Metric strip */}
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6">
            {ind.metrics.slice(0, 3).map((m) => (
              <div key={m.label} className="text-center">
                <p
                  className="num-display text-2xl md:text-3xl"
                  style={{ color: '#FFA070' }}
                >
                  {m.value}
                </p>
                <p className="mt-1 text-[14px] text-cream-100/60">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Proof — single real-world outcome line per industry (from SEO content) */}
          {ind.proof && (
            <p className="mx-auto mt-8 max-w-3xl text-center text-[14px] italic leading-relaxed text-cream-100/70 md:text-sm">
              <span className="font-semibold not-italic text-orange-300">Proof — </span>
              {ind.proof}
            </p>
          )}

          {/* Journey card */}
          {journey.length > 0 && (
            <div className="mx-auto mt-12 max-w-4xl">
              <JourneyCard
                title={`${ind.name} Operations Flow on UpWon`}
                steps={journey}
                accent={accent}
              />
            </div>
          )}
        </Container>
      </section>

      {/* ========== INDUSTRY-INSIDER PAINS (brief §X.2) ==========
          Title pattern: "{N} challenges we hear from every {industry role}".
          We swap the leading number to the live `ind.pains.length` so the
          headline always matches the number of cards rendered below. That
          way a future 6th pain doesn't desync the copy from the data. */}
      <section className="relative overflow-hidden bg-cream-100 section-pad">
        <div className="absolute inset-0 grid-bg-light opacity-50" />
        <Container className="relative">
          <SectionHeading
            align="center"
            variant="light"
            eyebrow="In your own words"
            title={(ind.insiderPain || '').replace(/^\d+/, ind.pains.length)}
            description="Verbatim from real conversations with operators in this vertical."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {ind.pains.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex items-start gap-4 rounded-2xl border border-cream-300 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-enterprise"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-rose-100 text-rose-600">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-navy-950">{p.title}</p>
                  <p className="mt-1 text-sm text-charcoal">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ========== INDUSTRY'S RING ON THE UPWON UNIVERSE (brief §X.3) ========== */}
      <IndustryRingPlacement industry={ind} />

      {/* ========== UPWON CAPABILITIES FOR THIS VERTICAL ========== */}
      <section id="capabilities" className="relative overflow-hidden bg-white section-pad scroll-mt-32">
        <Container className="relative">
          <SectionHeading
            align="center"
            variant="light"
            eyebrow={`UpWon for ${ind.name}`}
            title="What UpWon does — specific to your operation."
            description="Out-of-box capabilities. Not customisations. Not workarounds."
          />
          <div className="mt-12 overflow-hidden rounded-2xl border border-cream-300 bg-white shadow-sm">
            <div className="grid grid-cols-1 gap-px bg-cream-300 md:grid-cols-2">
              {ind.capabilities.map((c, i) => (
                <motion.div
                  key={c}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
                  className="flex items-start gap-3 bg-white p-5"
                >
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: accent }}
                  />
                  <p className="text-sm text-navy-900">{c}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ========== INDUSTRY-SPECIFIC FEATURE DEEP-DIVE (brief §X.5) ==========
          Pulls the deep-dive blocks for THIS industry's primary platform —
          a bakery visitor sees ERP's "Batch costing down to the gram" + FSSAI
          deep-dives; an FMCG distributor visitor sees SFA-DMS's Scheme engine
          + Salesman app deep-dives. The section reads as if it could not
          have been written for any other industry. */}
      {(() => {
        const primary = ind.relevantPlatforms?.[0]
          ? PLATFORM_MODULES.find((p) => p.id === ind.relevantPlatforms[0])
          : null;
        if (!primary) return null;
        const primaryTheme = getPlatformTheme(primary.slug);
        return (
          <FeatureDeepDiveSection
            slug={primary.slug}
            theme={primaryTheme}
            productSlug={primary.slug}
            eyebrow={`${ind.name} · Feature Deep-Dive`}
            title={
              <>
                Built for {ind.name.toLowerCase()} —{' '}
                <span style={{ color: primaryTheme.accent }}>down to the detail.</span>
              </>
            }
            description={`The two ${primary.code} capabilities that matter most to ${ind.name.toLowerCase()} operators — not a generic feature tour.`}
          />
        );
      })()}

      {/* ========== EXPANSION SPECTRUM — only for FMCG / Non-Food / QSR ========== */}
      {key === 'qsr' && (
        <ExpansionGrid
          items={FRANCHISE_SPECTRUM}
          eyebrow="UpWon FMS works for every franchise model"
          title="Not just food franchises. Every type of franchise — managed from one platform."
          subtitle="UpWon FMS & POS is built around the universal mechanics of franchise operations. These mechanics apply across every franchise category."
          introTitle="Why franchise is UpWon's territory"
          introBody="UpWon FMS was built around how Indian franchises actually operate — outlet ordering, billing, royalty, SOP and analytics. Every feature was built after sitting inside Indian franchise networks and understanding their operational reality."
        />
      )}
      {(key === 'fmcg' || key === 'non-food-fmcg') && (
        <ExpansionGrid
          items={DISTRIBUTION_SPECTRUM}
          eyebrow="The complete distribution spectrum"
          title="Every category that reaches a retail shelf — UpWon covers it."
          subtitle="Distribution challenges in food FMCG and non-food FMCG are operationally identical. UpWon solves them across both."
          introTitle="Why distribution is UpWon's territory"
          introBody="Distribution operations across food and non-food FMCG share identical DNA — large field forces, multi-level distributor networks, scheme management, secondary sales capture and warehouse FEFO. UpWon was built around these challenges, not retrofitted."
        />
      )}

      {/* ========== AUTHORITY STRIP — used after spectrum ========== */}
      {(key === 'qsr' || key === 'fmcg' || key === 'non-food-fmcg') && (
        <AuthorityNoteStrip
          title={
            key === 'qsr'
              ? 'UpWon FMS is the only platform in India built specifically around how Indian franchises operate.'
              : 'UpWon SFA-DMS is built for distribution complexity at scale — across food and non-food FMCG.'
          }
          body="Every feature was built after sitting inside Indian operations — not adapted from a generic ERP."
          stats={[
            { value: '200+', label: 'Outlets / distributors live' },
            { value: '9', label: 'Sub-systems' },
            { value: '8+', label: 'Categories served' },
            { value: '45 days', label: 'Average go-live' },
          ]}
          accent={accent}
        />
      )}

      {/* ========== WHAT'S THE SAME — only for Non-Food FMCG ========== */}
      {key === 'non-food-fmcg' && <WhatsTheSame />}

      {/* ========== RELEVANT PLATFORMS ========== */}
      {relevantPlatforms.length > 0 && (
        <section className="relative overflow-hidden bg-cream-200 section-pad">
          <Container className="relative">
            <SectionHeading
              align="center"
              variant="light"
              eyebrow="Which platforms"
              title={`Most relevant UpWon platforms for ${ind.name.toLowerCase()}.`}
              description="Start with the one that solves your biggest problem. Add others as you grow."
            />
            {/* Adapt column count + max-width to the actual platform count
                so 1-3 cards stay centered (don't drift left into an empty
                4th slot). At md+ everything stays 2 columns for density. */}
            <div
              className={`mx-auto mt-12 grid gap-5 md:grid-cols-2 ${
                {
                  1: 'lg:grid-cols-1 lg:max-w-md',
                  2: 'lg:grid-cols-2 lg:max-w-3xl',
                  3: 'lg:grid-cols-3 lg:max-w-5xl',
                  4: 'lg:grid-cols-4',
                }[Math.min(relevantPlatforms.length, 4)] || 'lg:grid-cols-4'
              }`}
            >
              {relevantPlatforms.map((p, i) => {
                const pt = getPlatformTheme(p.slug);
                return (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="rounded-2xl border border-cream-300 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-enterprise"
                  >
                    <div
                      className="grid h-11 w-11 place-items-center rounded-lg"
                      style={{
                        background: `${pt.accent}15`,
                        color: pt.accent,
                      }}
                    >
                      <p.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-bold text-navy-950">{p.code}</h3>
                    <p
                      className="mt-2 text-[14px] italic"
                      style={{
                        color: pt.accentDark,
                        fontFamily: '"Calibri Light", "Arial", "Helvetica Neue", sans-serif',
                        fontWeight: 300,
                      }}
                    >
                      {p.hero}
                    </p>
                    <p className="mt-2 text-[14px] leading-relaxed text-navy-700">{p.short}</p>
                    <Link
                      to={`/products/${p.slug}`}
                      className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold transition-colors hover:underline"
                      style={{ color: pt.accent }}
                    >
                      Explore
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* ========== APPLICABILITY MATRIX ========== */}
      <ApplicabilityMatrix
        scope={ind.slug}
        eyebrow="Platform applicability"
        title={`Which platforms apply to ${ind.name.toLowerCase()} — at a glance.`}
        description="Out-of-the-box level for each platform. Configured deeper at go-live."
      />

      {/* ========== HONEST COMPARISON (brief §X.6) ==========
          Pulls the comparison rows for THIS industry's primary platform
          (the first relevantPlatforms entry) so a bakery owner sees the
          ERP vs SAP vs Tally comparison, an FMCG distributor sees the
          SFA-DMS vs Bizom vs WhatsApp+Excel comparison, etc. */}
      {(() => {
        const primarySlug = ind.relevantPlatforms?.[0]
          ? PLATFORM_MODULES.find((p) => p.id === ind.relevantPlatforms[0])?.slug
          : 'erp';
        const cmp = HONEST_COMPARISON[primarySlug] || HONEST_COMPARISON.erp;
        return (
          <HonestComparison
            rows={cmp.rows}
            competitorA={cmp.competitorA}
            competitorB={cmp.competitorB}
            eyebrow={`The honest ${ind.name} comparison`}
            title={`UpWon vs ${cmp.competitorA} vs ${cmp.competitorB} — for ${ind.name.toLowerCase()}.`}
          />
        );
      })()}

      {/* ========== INDUSTRY CASE STUDY (brief §X.7) ==========
          Same 3-panel Challenge/Solution/Result format used on product pages
          (§2.9), but the data is industry-specific so a bakery owner reading
          /industries/bakery sees a real bakery case study, not a generic one.
          Driven by INDUSTRY_CASE_STUDIES in industryExtras.js. */}
      {industryCaseStudy && (
        <CaseStudyFullCard
          study={industryCaseStudy}
          theme={{ accent }}
          eyebrowOverride={`${ind.name} · same playbook, same result`}
          titleOverride={
            <>
              How a {ind.name.toLowerCase()} operator —{' '}
              <span style={{ color: accent }}>
                with the same problems — fixed them.
              </span>
            </>
          }
        />
      )}

      {/* ========== ROI NUMBERS DARK STRIP ========== */}
      {/* <section className="relative overflow-hidden bg-navy-950 py-16 text-white">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <Container className="relative">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-orange-400">
            Outcome benchmarks · {ind.name}
          </p>
          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-3">
            {ind.metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="bg-navy-950 p-8 text-center"
              >
                <p className="num-display text-3xl md:text-4xl" style={{ color: '#FFA070' }}>
                  {m.value}
                </p>
                <p className="mt-2 text-[14px] text-cream-100/70">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section> */}

  

      {/* ========== LEAD HOOK ========== */}
      {/* <LeadHookPreview
        variant={ind.slug === 'fmcg' || ind.slug === 'non-food-fmcg' ? 'benchmark' : 'checklist'}
        accent={accent}
        eyebrow={`Free Download — ${ind.name}`}
        title={`The ${ind.name} Readiness Assessment.`}
        subtitle={`A 60-point self-evaluation that reveals exactly where your operations have gaps and what fixing them could mean for your margins.`}
        points={[
          'Production, distribution and financial readiness scored separately',
          `Industry benchmarks — where top-performing ${ind.name.toLowerCase()} businesses score vs average`,
          'Prioritised list of what to fix first based on your score',
          'Used by 500+ business owners across India',
        ]}
        preview={{
          title: `${ind.name} Readiness Checklist`,
          sub: '60-point self-assessment · free download',
        }}
      /> */}
      

      {/* Self-serve toolbox — same Tebra block as the homepage so industry
          readers can quantify, evaluate, compare or audit without booking. */}
      {/* <InteractiveToolsSection /> */}

      {/* ========== INDUSTRY PEER TESTIMONIAL (brief §X.8) ==========
          Single named pull quote from an operator in THIS industry — not a
          generic marquee. Reuses the same named quote that powers the
          industry case study so the voice is consistent across §X.7 and §X.8.
          Replaces TestimonialsMarquee on industry pages. */}
      {industryCaseStudy?.quote && (
        <IndustryPeerQuote
          industryName={ind.name}
          quote={industryCaseStudy.quote}
          accent={accent}
          before={industryCaseStudy.challenge.split('.').slice(0, 1).join('.') + '.'}
          after={industryCaseStudy.results
            .map((r) => `${r.metric} ${r.label}`)
            .slice(0, 2)
            .join(' · ')}
        />
      )}

          {/* ========== INDUSTRY FAQ ========== */}
      {faqs.length > 0 && (
        <IndustryFaq
          faqs={faqs}
          eyebrow={`${ind.name} · Honest Q&A`}
          title="Questions only an operator in this industry would ask."
        />
      )}

      {/* ========== INDUSTRY DEMO CTA (brief §X.10) ==========
          Reuses the same ProductDemoCta component the product pages use, but
          fed with industry-specific sub-segment dropdown options + an
          industry-flavoured headline. The form prefills /demo with the
          industry slug so the demo team can prepare an industry-specific
          walkthrough. */}
      {/* <ProductDemoCta
        slug={`industry-${ind.slug}`}
        productCode={`Your ${ind.name} business`}
        theme={{ accent, accentSoft: accent }}
        subIndustries={INDUSTRY_SUB_SEGMENTS[key]}
      /> */}

      
    </>
  );
}

// Sub-segment dropdown options per industry (brief §X.10).
// Brief asks for "business type within industry (manufacturer/franchise/both)
// + primary challenge". We lean lighter on free-text and tighter on dropdowns
// because mid-market Indian buyers convert better with shorter forms.
const INDUSTRY_SUB_SEGMENTS = {
  bakery: ['Bakery manufacturer', 'Bakery-café franchise', 'Cake & celebration retail', 'Both — manufacturer + outlets', 'Other'],
  dairy: ['Dairy processor', 'Co-operative federation', 'Speciality dairy', 'Ice cream / frozen', 'Other'],
  fmcg: ['FMCG brand (own field force)', 'FMCG distributor', 'C&F agent', 'Super-stockist', 'Regional brand', 'Other'],
  qsr: ['QSR chain', 'Bakery-café chain', 'Sweet-shop franchise', 'Cloud kitchen', 'Multi-brand operator', 'Other'],
  sweets: ['Heritage mithai brand', 'Modern packed-sweets brand', 'Namkeen / snacks manufacturer', 'Multi-outlet retail', 'Other'],
  spices: ['Spice manufacturer (domestic)', 'Spice exporter', 'Masala / blend brand', 'Agro processor', 'Other'],
  'food-processing': ['Single-plant processor', 'Multi-plant processor', 'Co-packer / contract manufacturer', 'Private label specialist', 'Other'],
  beverages: ['Juice / nectar brand', 'Carbonated drinks', 'RTD / functional drinks', 'Multi-plant beverage manufacturer', 'Other'],
  'non-food-fmcg': ['Personal care brand', 'Home care / cleaning brand', 'OTC health brand', 'Agri-input brand', 'Multi-category distributor', 'Other'],
  engineering: ['Engineering goods manufacturer', 'Auto components', 'Fabrication / job-work', 'Packaging machinery', 'Other'],
};
