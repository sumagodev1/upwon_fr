import { useParams, Navigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { m as motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, CheckCircle2 } from 'lucide-react';
import Container from '../components/ui/Container.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import HeroSlider from '../components/ui/HeroSlider.jsx';
import PlatformDashboard from '../components/sections/PlatformDashboard.jsx';
import MidCtaBand from '../components/sections/MidCtaBand.jsx';
import HonestComparison from '../components/sections/HonestComparison.jsx';
import PlatformVocabularySection from '../components/sections/PlatformVocabularySection.jsx';
import ConnectedFlowDiagram from '../components/sections/ConnectedFlowDiagram.jsx';
import PlatformPackagesSection from '../components/sections/PlatformPackagesSection.jsx';
import PainAmplificationSection from '../components/sections/PainAmplificationSection.jsx';
import ModuleNavigator from '../components/sections/ModuleNavigator.jsx';
import FeatureDeepDiveSection from '../components/sections/FeatureDeepDiveSection.jsx';
import CaseStudyFullCard from '../components/sections/CaseStudyFullCard.jsx';
import ProductDemoCta from '../components/sections/ProductDemoCta.jsx';
import LeadHookPreview from '../components/sections/LeadHookPreview.jsx';
import TestimonialsMarquee from '../components/sections/TestimonialsMarquee.jsx';
import TrustStrip from '../components/sections/TrustStrip.jsx';
import TrustSection from '../components/sections/TrustSection.jsx';
import EnterpriseTrust from '../components/sections/EnterpriseTrust.jsx';
import IndustriesVideoIntro from '../components/sections/IndustriesVideoIntro.jsx';
import StructuralGapSection from '../components/sections/StructuralGapSection.jsx';
import GrowsWithYou from '../components/sections/GrowsWithYou.jsx';
import ImplementationPartnership from '../components/sections/ImplementationPartnership.jsx';
import ComplianceEcosystem from '../components/sections/ComplianceEcosystem.jsx';
import UpwonVsAlternatives from '../components/sections/UpwonVsAlternatives.jsx';
import CustomerOutcomesStory from '../components/sections/CustomerOutcomesStory.jsx';
import SfaFinalCta from '../components/sections/SfaFinalCta.jsx';
import InteractiveToolsSection from '../components/sections/InteractiveToolsSection.jsx';
import TopSectorsForProduct from '../components/sections/TopSectorsForProduct.jsx';
import IndustryFaq from '../components/sections/IndustryFaq.jsx';
import Seo, { productJsonLd, breadcrumbJsonLd, faqJsonLd } from '../components/common/Seo.jsx';
import { PLATFORM_MODULES, getPlatformTheme, HONEST_COMPARISON, PRODUCT_FAQS, findProductBySlug } from '../data/modules.js';
import { INTEGRATIONS } from '../data/metrics.js';

// Render an integration as a logo-only tile (with initial-letter fallback if
// the CDN image fails or isn't available for that brand). Name is exposed via
// title + aria-label for accessibility.
function IntegrationLogo({ item }) {
  const [imgFailed, setImgFailed] = useState(false);
  const initials = item.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const showImg = item.logo && !imgFailed;

  return (
    <div
      className="group grid h-24 place-items-center rounded-xl border border-cream-300 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-500/30 hover:shadow-enterprise md:h-28"
      title={item.name}
      aria-label={item.name}
    >
      {showImg ? (
        <img
          src={item.logo}
          alt={`${item.name} logo`}
          loading="lazy" decoding="async"
          className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110 md:h-14 md:w-14"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span
          className="font-display text-2xl font-extrabold transition-transform duration-300 group-hover:scale-110 md:text-3xl"
          style={{ color: item.color }}
        >
          {initials}
        </span>
      )}
    </div>
  );
}

export default function ProductPage({ slug: slugProp, hideBreadcrumb = false }) {
  // Each platform now has its own dedicated page file that renders this shared
  // engine with a fixed slug (e.g. SfaDmsPage → <ProductPage slug="sfa-dms" />).
  // Fall back to the route param so the dynamic /products/:slug route still
  // works for any slug without its own file yet.
  const params = useParams();
  const slug = slugProp || params.slug;
  const product = findProductBySlug(slug);

  if (!product) return <Navigate to="/platform" replace />;
  const theme = getPlatformTheme(product.slug);
  // HONEST_COMPARISON now keys per-platform with { competitorA, competitorB,
  // rows }. Fall back to ERP only if a slug has no entry (e.g., mobile-apps).
  const comparison = HONEST_COMPARISON[product.slug] || HONEST_COMPARISON.erp;
  const comparisonRows = comparison.rows;
  const platformIndex = PLATFORM_MODULES.findIndex((p) => p.slug === slug) + 1;

  // Hero slider falls back to a single-slide derived from the product hero so
  // ProductPage stays robust even if a platform's heroSlides hasn't been
  // authored yet. Each slide picks up the platform's brand-book accent so the
  // hero glow tints match the platform's Recommended palette (brief: "Product
  // landing page hero uses the platform's Recommended palette as the hero
  // accent").
  const baseSlides =
    product.heroSlides && product.heroSlides.length
      ? product.heroSlides
      : [
          {
            eyebrow: product.code,
            headline: product.hero,
            subhead: product.description,
            cta: { label: `See ${product.code} in 30 min`, to: '/demo' },
            secondaryCta: { label: 'Download datasheet', to: '/resources' },
            bg: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=2000&q=70',
          },
        ];
  const heroSlides = baseSlides.map((s) => ({ accent: theme.accent, ...s }));

  // Per-product SEO — brief rule 8 (dedicated keyword cluster per page).
  // Pulls title / desc straight from the platform record so SEO copy stays
  // in sync with on-page copy without forking.
  const seoTitle = product.seoTitle || `${product.code} — ${product.hero}`;
  const seoDesc = product.metaDescription || product.description;

  // Product-specific FAQ (brief §2.12) — drives both the on-page accordion
  // and the FAQPage rich-result schema, so the two never drift.
  const faqs = PRODUCT_FAQS[product.slug] || [];
  const breadcrumbItems = [
    { name: 'Home', to: '/' },
    { name: 'Products', to: '/platform' },
    { name: product.code, to: `/products/${product.slug}` },
  ];

  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDesc}
        canonical={`https://upwon.in/products/${product.slug}`}
        type="product"
        jsonLd={[
          productJsonLd({ name: product.code, description: seoDesc, slug: product.slug }),
          breadcrumbJsonLd(breadcrumbItems),
          faqJsonLd(faqs),
        ]}
      />

      {/* ========== HERO — auto-scroll slider (brief §2.1) ========== */}
      <HeroSlider
        slides={heroSlides}
        variant="dark"
        intervalMs={5000}
        topPad="pt-32 md:pt-40"
        breadcrumb={
          hideBreadcrumb ? undefined : (
            <ol className="inline-flex items-center gap-1.5">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><ArrowRight className="h-3 w-3 opacity-60" /></li>
              <li><Link to="/platform" className="hover:text-white">Products</Link></li>
              <li><ArrowRight className="h-3 w-3 opacity-60" /></li>
              <li className="text-white">{product.code}</li>
            </ol>
          )
        }
      />

      {/* ========== SECTION 2 — proof strip ==========
          Products with a `proofStrip` (e.g. SFA-DMS) get the full stat-counter +
          source-note + logo-marquee card; the rest keep the plain trusted-by
          logo marquee. */}
      {product.proofStrip ? (
        <TrustSection
          eyebrow={product.proofStrip.eyebrow}
          title={
            <>
              {product.proofStrip.lead}{' '}
              <span className="gradient-text-orange">{product.proofStrip.accent}</span>
            </>
          }
          stats={product.proofStrip.stats}
          sourceNote={product.proofStrip.sourceNote}
          showRating={false}
          statsFirst
        />
      ) : product.enterpriseTrust ? null : (
        <TrustStrip />
      )}

      {/* ========== ENTERPRISE TRUST — security + recognition cards ========== */}
      {product.enterpriseTrust && <EnterpriseTrust />}

      {/* ========== VIDEO INTRO — product video with Odoo-style playback bar ========== */}
      {product.videoIntro && (
        <IndustriesVideoIntro
          eyebrow={product.videoIntro.eyebrow}
          heading={
            <>
              {product.videoIntro.lead}{' '}
              <span className="gradient-text-orange">{product.videoIntro.accent}</span>
            </>
          }
          subtext={product.videoIntro.subtext}
        />
      )}

      {/* ========== STRUCTURAL GAP — disconnected → connected transformation ========== */}
      {product.structuralGap && <StructuralGapSection />}

      {/* ========== GROWS WITH YOU — phased SFA → DMS → Suite adoption stepper ========== */}
      {product.growsWithYou && <GrowsWithYou />}

      {/* ========== IMPLEMENTATION & PARTNERSHIP — phased go-live timeline ========== */}
      {product.implPartnership && <ImplementationPartnership />}

      {/* ========== TRUST ESTABLISHERS — compliance + connected ecosystem ========== */}
      {product.complianceEcosystem && <ComplianceEcosystem />}

      {/* ========== UPWON VS THE ALTERNATIVES — honest plain-language distinction ========== */}
      {product.upwonVsAlternatives && <UpwonVsAlternatives />}

      {/* ========== CUSTOMER OUTCOMES — named case-study carousel ========== */}
      {product.outcomeStory && <CustomerOutcomesStory />}

      {/* ========== FAQ — SFA-DMS due-diligence questions ========== */}
      {product.sfaFaqs && (
        <IndustryFaq
          faqs={SFA_DMS_FAQS}
          eyebrow="FAQ"
          title={
            <>
              Questions Distribution Heads Ask{' '}
              <span className="gradient-text-orange">Before They Commit.</span>
            </>
          }
          description="Kept to how a Sales or Distribution Head actually asks it — not how a sales deck phrases it."
        />
      )}

      {/* ========== FINAL CTA — low-pressure invitation over navy band ========== */}
      {product.sfaFinalCta && <SfaFinalCta />}

      {/* ===== Sections below temporarily disabled (commented out via `false &&`).
              Flip to `true` (or remove the wrapper) to re-enable them. ===== */}
      {false && (
        <>
      {/* ========== EXCEL PROBLEMS — pain amplification (brief §2.3) ==========
          Per-platform LEFT "The reality" + RIGHT "What it costs you" matrix. */}
      <PainAmplificationSection slug={product.slug} productCode={product.code} />

      {/* ========== CORE WORKFLOW / CONNECTED OPERATIONS (brief §2.7) ==========
          End-to-end animated infographic — driven by PLATFORM_FLOW. */}
      <div id="workflow" className="scroll-mt-32" />
      <ConnectedFlowDiagram slug={product.slug} theme={theme} />

      {/* ========== LIVE VISIBILITY DEMO — quick stats + live dashboard ========== */}
      <section
        id="overview"
        className="relative overflow-hidden bg-navy-900 scroll-mt-32 pb-20 pt-14"
      >
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div
          className="pointer-events-none absolute -top-32 right-[-12%] h-[600px] w-[600px] rounded-full blur-[140px]"
          style={{ background: theme.glow }}
        />

        <Container className="relative">
          <div className="grid items-end gap-12 lg:grid-cols-[1fr_1fr]">
            <div className="min-w-0">
              <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2">
                <span
                  className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]"
                  style={{
                    borderColor: '#FF734050',
                    background: '#FF734018',
                    color: '#FF7340',
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full animate-pulse-slow"
                    style={{ background: '#E85A2A' }}
                  />
                  {product.code}
                </span>
                <span className="text-[14px] font-medium text-white">
                  Platform {platformIndex} · {theme.label}
                </span>
              </div>

              {/* Tagline — brief mandates italic Calibri Light / Arial Light, in platform accent. */}
              <h2 className="text-balance break-words text-[1.5rem] leading-[1.18] tracking-tight text-white sm:text-[1.7rem] md:text-3xl lg:text-[2.4rem]">
                <span
                  className="italic"
                  style={{
                    color: '#FFFFFF',
                    fontFamily: '"Calibri Light", "Arial", "Helvetica Neue", sans-serif',
                    fontWeight: 300,
                  }}
                >
                  {product.hero}
                </span>
              </h2>

              {product.secondaryTagline && (
                <p className="mt-3 text-[13px] uppercase tracking-[0.18em] text-cream-100/55">
                  <span className="mr-2 text-cream-100/40">
                    {product.secondaryTaglineLabel || '·'}
                  </span>
                  <span
                    className="italic"
                    style={{
                      color: '#FF7340',
                      textShadow: '0 1px 12px rgba(0,0,0,0.35)',
                    }}
                  >
                    {product.secondaryTagline}
                  </span>
                </p>
              )}

              <p className="mt-5 max-w-xl break-words text-[15px] leading-relaxed text-cream-100/75 md:text-base">
                {product.description}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link to="/demo" className="btn-primary-glow !px-6 !py-3.5">
                  See {product.code} in 30 min
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                {/* <Link to="/resources" className="btn-secondary-dark !px-6 !py-3.5">
                  Download datasheet
                </Link> */}
              </div>

              <div className="mt-9 grid gap-6 sm:grid-cols-3">
                {product.quickStats?.map((s) => (
                  <div key={s.label}>
                    <p
                      className="num-display text-2xl md:text-3xl"
                      style={{ color: '#FFFFFF' }}
                    >
                      {s.value}
                    </p>
                    <p className="mt-1 text-[14px] text-cream-100/60">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Live dashboard */}
            <div className="relative min-w-0">
              <div
                className="pointer-events-none absolute -inset-x-4 -inset-y-6 rounded-3xl blur-2xl"
                style={{ background: `linear-gradient(135deg, ${theme.accent}20, transparent 70%)` }}
              />
              <div className="relative">
                <PlatformDashboard slug={product.slug} theme={theme} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========== SIGNATURE CAPABILITIES · BUILT FOR · WHY UPWON ==========
          Pulled from the per-product SEO content. Renders only when a product
          record carries these fields, so it stays robust for any platform that
          hasn't been authored yet. */}
      {(product.signatureCapabilities?.length || product.builtFor || product.whyUpWon) && (
        <section className="relative overflow-hidden bg-cream-100 section-pad">
          <div className="absolute inset-0 grid-bg-light opacity-50" />
          <Container className="relative">
            <SectionHeading
              align="center"
              variant="light"
              eyebrow={`Why ${product.code}`}
              title="What sets it apart — and who it's built for."
            />

            {product.signatureCapabilities?.length > 0 && (
              <div className="mt-12 grid gap-5 md:grid-cols-3">
                {product.signatureCapabilities.map((c, i) => (
                  <motion.div
                    key={c}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="flex items-start gap-3 rounded-2xl border border-cream-300 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-enterprise"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0"
                      style={{ color: theme.accent }}
                    />
                    <p className="text-sm leading-relaxed text-navy-900">{c}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {(product.builtFor || product.whyUpWon) && (
              <div className="mt-10 grid gap-5 md:grid-cols-2">
                {product.builtFor && (
                  <div
                    className="rounded-2xl border bg-white p-6 shadow-sm"
                    style={{ borderColor: `${theme.accent}30` }}
                  >
                    <p
                      className="text-xs font-semibold uppercase tracking-[0.18em]"
                      style={{ color: theme.accentDark }}
                    >
                      Built for
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-navy-800">
                      {product.builtFor}
                    </p>
                  </div>
                )}
                {product.whyUpWon && (
                  <div
                    className="rounded-2xl border bg-white p-6 shadow-sm"
                    style={{ borderColor: `${theme.accent}30` }}
                  >
                    <p
                      className="text-xs font-semibold uppercase tracking-[0.18em]"
                      style={{ color: theme.accentDark }}
                    >
                      Why UpWon
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-navy-800">
                      {product.whyUpWon}
                    </p>
                  </div>
                )}
              </div>
            )}
          </Container>
        </section>
      )}

      {/* Excel Problems / Pain + Core Workflow moved above (after Customer Logos). */}

      {/* ========== UNUSED — MODULE NAVIGATOR (brief §2.4) ========== */}
      {/* <ModuleNavigator
        subsystems={product.subsystems}
        theme={theme}
        productCode={product.code}
        productSlug={product.slug}
      /> */}

      {/* ========== UNUSED — FEATURE DEEP-DIVES (brief §2.5 + §2.6) ========== */}
      {/* <FeatureDeepDiveSection
        slug={product.slug}
        theme={theme}
        productSlug={product.slug}
      /> */}

      {/* ========== INDUSTRY USE CASES — Top 7 sectors ========== */}
      <div id="industries" className="scroll-mt-32" />
      <TopSectorsForProduct
        productSlug={product.slug}
        productCode={product.code}
        accent={theme.accent}
      />

      {/* ========== UNUSED — MID-CTA BAND ========== */}
      {/* <MidCtaBand
        title={`Want to see ${product.code} for your business?`}
        subtitle="We demo only the modules relevant to your operation. No generic tour. 30 minutes, your industry."
        primaryLabel="Book Industry-Specific Demo"
        primaryTo="/demo"
        accent={theme.accent}
      /> */}

      {/* ========== ROI / CASE STUDY (brief §2.9) ========== */}
      <div id="roi" className="scroll-mt-32" />

      {/* ========== UNUSED — FEATURE → BENEFIT → OUTCOME ========== */}
      {false && (
      <section id="features" className="relative overflow-hidden bg-cream-200 section-pad scroll-mt-32">
        <div className="absolute inset-0 grid-bg-light opacity-40" />
        <Container className="relative">
          <SectionHeading
            align="center"
            variant="light"
            eyebrow="The Value Chain"
            title="Feature → What it enables → Business outcome."
          />
          <div className="mt-12 overflow-hidden rounded-2xl border border-cream-300 bg-white shadow-enterprise">
            <div className="grid grid-cols-1 gap-px bg-cream-300 md:grid-cols-2">
              {product.features.map((f, i) => (
                <motion.div
                  key={f}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
                  className="flex items-start gap-3 bg-white p-5"
                >
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: theme.accent }}
                  />
                  <p className="text-sm text-navy-900">{f}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Competitive differentiator */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-10 rounded-2xl border p-6 md:p-8"
            style={{
              borderColor: `${theme.accent}40`,
              background: `${theme.accent}08`,
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: theme.accentDark }}
            >
              The UpWon Difference
            </p>
            <p className="mt-3 text-base leading-relaxed text-navy-950 md:text-lg">

              
              {product.differentiator}
            </p>
          </motion.div>
        </Container>
      </section>
      )}

      {/* ========== ROI / CASE STUDY — FULL FORMAT (brief §2.9) ==========
          3-panel Challenge | Solution | Result + named pull quote + gated PDF. */}
      <CaseStudyFullCard
        slug={product.slug}
        theme={theme}
        productCode={product.code}
      />

      {/* ========== HONEST 3-WAY COMPARISON ==========
          Now wired to every product page via per-platform HONEST_COMPARISON
          entries. Each platform compares against its real-world alternatives
          (e.g., SFA-DMS vs Bizom vs WhatsApp+Excel; WMS vs SAP EWM vs manual). */}
      <HonestComparison
        rows={comparisonRows}
        competitorA={comparison.competitorA}
        competitorB={comparison.competitorB}
        eyebrow={`Why ${product.code} — not ${comparison.competitorA}, not ${comparison.competitorB}`}
        title={`${product.code} vs the alternatives — no marketing spin.`}
      />

      {/* ========== UNUSED — INTEGRATIONS ========== */}
      {false && (
      <section className="relative overflow-hidden bg-white py-14 md:py-16">
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange-600">
              Integrations
            </p>
            <h2 className="mt-3 h-display text-balance text-2xl text-navy-950 md:text-3xl lg:text-[2rem]">
              {product.code} plugs into{' '}
              <span className="gradient-text-orange">what you already use.</span>
            </h2>
          </div>
          <div className="mx-auto mt-8 grid max-w-5xl grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {INTEGRATIONS.slice(0, 12).map((it) => (
              <IntegrationLogo key={it.name} item={it} />
            ))}
          </div>
        </Container>
      </section>
      )}

      {/* ========== PLATFORM VOCABULARY ==========
          Expert glossary block — speaks the exact language of buyers in this
          platform's workflow. Driven by PLATFORM_VOCABULARY in modules.js.
          Renders nothing if the slug has no vocabulary block (e.g.,
          mobile-apps experience layer). */}
      {/* <PlatformVocabularySection slug={product.slug} theme={theme} /> */}

      {/* ========== PRICING — Platform packages (brief §2.11) ========== */}
      <div id="pricing" className="scroll-mt-32" />
      <PlatformPackagesSection
        slug={product.slug}
        theme={theme}
        productCode={product.code}
      />

      {/* ========== LEAD HOOK ========== */}
      {/* <div id="roi" className="scroll-mt-32" />
      <LeadHookPreview
        variant={product.slug === 'sfa-dms' ? 'benchmark' : product.slug === 'erp' ? 'report' : 'checklist'}
        accent={theme.accent}
        eyebrow={`Free Download — ${product.code}`}
        title={`The ${product.code} capability deep-dive.`}
        subtitle={`How food and FMCG operators use ${product.code} to solve specific operational pain points. Real implementation patterns, real outcomes.`}
        points={[
          'Detailed capability map for the 9-11 sub-systems',
          'Integration patterns with existing systems',
          `${product.quickStats?.[2]?.value || '40%'} outcomes documented from real deployments`,
          'Used by 500+ operations leaders across India',
        ]}
        buttonLabel="Get Free Deep-Dive"
        preview={{
          title: `${product.code} Deep-Dive`,
          sub: '24 pages · Real deployment patterns',
        }}
      /> */}

      {/* ========== INTERACTIVE TOOLS — self-serve mid-funnel toolbox ========== */}
      {/* <InteractiveToolsSection /> */}

      {/* ========== UNUSED — OTHER PLATFORMS ========== */}
      {false && (
      <section className="relative overflow-hidden bg-cream-200 py-16">
        <Container className="relative">
          <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-orange-600">
            Explore other UpWon platforms
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {PLATFORM_MODULES.filter((p) => p.slug !== product.slug).slice(0, 6).map((p) => {
              const otherTheme = getPlatformTheme(p.slug);
              return (
                <Link
                  key={p.id}
                  to={`/products/${p.slug}`}
                  className="group rounded-xl border border-cream-300 bg-white p-4 transition-all hover:-translate-y-1 hover:shadow-enterprise"
                  style={{ ['--other-accent']: otherTheme.accent }}
                >
                  <div
                    className="grid h-9 w-9 place-items-center rounded-md"
                    style={{
                      background: `${otherTheme.accent}15`,
                      color: otherTheme.accent,
                    }}
                  >
                    <p.icon className="h-4 w-4" />
                  </div>
                  <p className="mt-3 text-[14px] font-semibold text-navy-950">{p.code}</p>
                  <p className="mt-1 text-[14px] text-navy-600 line-clamp-2">{p.short}</p>
                  <ArrowRight
                    className="mt-2 h-3 w-3 transition-transform group-hover:translate-x-1"
                    style={{ color: otherTheme.accent }}
                  />
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
      )}

      <div id="cases" className="scroll-mt-32" />
      {/* <TestimonialsMarquee /> */}

      {/* FAQ — brief §2.12: 8 product-specific questions, also emitted as
          FAQPage schema above. The footer's sitewide CTA strip closes the
          page, so no in-page DemoCtaCompact is rendered here. */}
      <div id="faq" className="scroll-mt-32" />
      {faqs.length > 0 && (
        <IndustryFaq
          faqs={faqs}
          eyebrow={`${product.code} · Questions before you commit`}
          title="The questions buyers ask us about this platform."
        />
      )}
        </>
      )}

      {/* ========== FINAL CTA — in-page demo booking (brief §2.13) ==========
          5-field form, "what happens next" timeline, WhatsApp/Phone/Email lanes. */}
      {/* <ProductDemoCta
        slug={product.slug}
        productCode={product.code}
        theme={theme}
        subIndustries={PRODUCT_SUB_INDUSTRIES[product.slug]}
      /> */}
    </>
  );
}

// SFA-DMS due-diligence FAQ — phrased the way a Sales/Distribution Head asks it.
const SFA_DMS_FAQS = [
  {
    q: 'What exactly is UpWon SFA-DMS, and who is it built for?',
    a: 'UpWon SFA-DMS is a sales-force-automation and distributor-management platform for Indian food & FMCG brands and distributors — beat planning, order booking, secondary-sales capture, schemes and claims, and distributor stock/credit visibility on one system. It is built for brands and distributors running roughly 50–800 field reps, not single-distributor setups or heavy global MNC rollouts.',
  },
  {
    q: 'Can we roll it out to our field team before our full distributor network?',
    a: 'Yes. SFA (your field team) and DMS (distributor operations) can be adopted in sequence — region by region or beat by beat. Start by empowering your field reps, then extend to distributors when you are ready. It is not a forced, simultaneous rollout across every distributor on day one.',
  },
  {
    q: 'Does it work offline in low-connectivity markets?',
    a: 'Yes. The field app captures orders, visits and collections offline and syncs automatically once the rep is back on network — so beats in low-connectivity rural and semi-urban markets are never blocked by signal.',
  },
  {
    q: 'Is it GST-compliant for distributor billing?',
    a: 'Yes. Distributor billing, invoicing and e-invoicing are built to India’s GST requirements natively, so secondary billing stays compliant without bolt-on tools.',
  },
  {
    q: 'Can it integrate with our existing ERP if we’re not moving to UpWon ERP?',
    a: 'Yes. UpWon SFA-DMS connects to your existing ERP through standard integrations, so you get field and distributor visibility even before — or without — moving to UpWon ERP. The deepest value comes when SFA, DMS and ERP share one data model, but that is a choice, not a prerequisite.',
  },
  {
    q: 'What support do we get after go-live?',
    a: 'You stay connected to the team that actually builds the product — direct implementation and support access, not layers of SI partners and tickets. Support continues as an ongoing partnership after launch, including field-team refreshers as your network grows.',
  },
];

// Sub-industry dropdown options per platform — fed into ProductDemoCta so the
// form's industry select stays tight to what each platform actually sells.
// Keep these short (5-7 items each). Brief §2.13 calls this out for the ERP
// page; we apply the same pattern to all 7 products for consistency.
const PRODUCT_SUB_INDUSTRIES = {
  erp: ['Bakery & Confectionery', 'Dairy & Milk', 'Sweets & Namkeen', 'Snacks & RTE', 'Beverages & Juices', 'Spices & Agro', 'Other food'],
  'sfa-dms': ['FMCG brand (own field force)', 'FMCG distributor', 'C&F agent', 'Super-stockist', 'Regional brand', 'Other'],
  fms: ['QSR chain', 'Bakery-café chain', 'Sweet-shop franchise', 'Cloud kitchen', 'Multi-brand operator', 'Other'],
  pos: ['F&B single-outlet', 'F&B multi-outlet', 'Retail single-outlet', 'Retail chain', 'Quick-service / counter', 'Other'],
  hrms: ['Manufacturing — mixed workforce', 'FMCG / Distribution', 'F&B / Franchise chain', 'Services / Office only', 'Multi-state operations', 'Other'],
  wms: ['Cold-chain warehouse', 'Ambient FMCG distribution', 'Manufacturing warehouse', '3PL operator', 'Multi-location network', 'Other'],
  'vendor-portal': ['Food manufacturer', 'FMCG manufacturer', 'Engineering / Mfg', 'Distribution / Trading', 'Multi-category buyer', 'Other'],
};
