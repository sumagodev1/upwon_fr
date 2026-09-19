import { useMemo, useState } from 'react';
import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Clock,
  Download,
  Filter,
  PlayCircle,
  Mail,
  Newspaper,
  Calculator,
  Truck,
  Store,
  TrendingUp,
} from 'lucide-react';
import Container from '../components/ui/Container.jsx';
import ResourcesHeroSection from '../components/sections/ResourcesHeroSection.jsx';
import Seo from '../components/common/Seo.jsx';
import SectionIntro from '../components/ui/SectionIntro.jsx';
import { submitLead } from '../lib/leads.js';
import {
  SORTED_POSTS,
  CATEGORIES_WITH_COUNTS,
  getCategory,
  getFeaturedPost,
  formatPostDate,
} from '../data/blog.js';

// §18.1 hub tab nav — Blog | Case Studies | Guides | Videos | Tools. Blog and
// Tools route out; the rest jump to their section on this page.
const HUB_TABS = [
  { id: 'blog', label: 'Blog', icon: Newspaper, to: '/blog' },
  { id: 'case-studies', label: 'Case Studies', icon: Store, anchor: '#case-studies' },
  { id: 'guides', label: 'Guides', icon: BookOpen, anchor: '#guides' },
  { id: 'videos', label: 'Videos', icon: PlayCircle, anchor: '#videos' },
  { id: 'tools', label: 'Tools', icon: Calculator, to: '/roi-calculator' },
];

// Brief §18 — Resources hub spec:
//  - 6 SEO-targeted blog categories
//  - 5 gated guides
//  - Filterable case study grid
//  - Video library
//  - Newsletter strip (low friction)
//
// The hub is one of the brief's Priority-1 builds. Content here is
// placeholder-but-credible — the structure is what the brief demands.

// Blog categories + posts now live in src/data/blog.js — the hub renders the
// latest posts from there and deep-links each card to /blog/:slug.

// 5 gated guides per brief §18.3
const GUIDES = [
  {
    title: 'ERP Buyer\'s Guide — Food & FMCG',
    desc: 'The 47 questions to ask before signing any ERP contract.',
    cat: 'Buyer\'s Guide',
    pages: '48 pages',
    icon: BookOpen,
  },
  {
    title: 'FMCG Distribution Playbook',
    desc: 'Beat planning, scheme automation and secondary sales — distribution at scale.',
    cat: 'Playbook',
    pages: '36 pages',
    icon: Truck,
  },
  {
    title: 'FSSAI Compliance Checklist 2025',
    desc: '47-point checklist used by 50+ food businesses to pass audits first time.',
    cat: 'Checklist',
    pages: '12 pages',
    icon: Calendar,
  },
  {
    title: 'Franchise Tech Stack Guide',
    desc: 'HQ, central kitchen and outlet — what each layer needs and where to integrate.',
    cat: 'Tech Guide',
    pages: '28 pages',
    icon: Store,
  },
  {
    title: 'SFA-DMS ROI Benchmarks',
    desc: 'Real numbers from 30+ distribution deployments — productivity, scheme leak, secondary visibility.',
    cat: 'Benchmark',
    pages: '24 pages',
    icon: TrendingUp,
  },
];

const VIDEOS = [
  { title: 'UpWon ERP — 4-minute product tour',         duration: '4:12', tag: 'Product' },
  { title: 'How Kaka Halwai cut wastage 18% in 4 months', duration: '6:48', tag: 'Customer' },
  { title: 'Webinar — Scaling franchise to 200 outlets',  duration: '38:20', tag: 'Webinar' },
  { title: 'SFA-DMS for FMCG — field-to-warehouse flow',   duration: '5:30', tag: 'Product' },
];

const CASE_FILTERS = [
  { id: 'all',       label: 'All' },
  { id: 'food-mfg',  label: 'Food Mfg' },
  { id: 'fmcg-dist', label: 'FMCG Distribution' },
  { id: 'franchise', label: 'Franchise' },
  { id: 'hrms',      label: 'HRMS' },
  { id: 'warehouse', label: 'Warehouse' },
];

// Only these have full case-study pages today; other cards link to the
// Clients hub rather than redirecting through a missing /clients/:slug route.
const KNOWN_CASE_SLUGS = new Set(['monginis', 'kaka-halwai', 'u2-cake']);

const CASE_STUDIES = [
  { id: 1, tag: 'food-mfg',  brand: 'Kaka Halwai',     line: '18% wastage reduction in 4 months.',     industry: 'Sweets & Namkeen', slug: 'kaka-halwai' },
  { id: 2, tag: 'franchise', brand: 'Monginis',        line: '500+ outlets on one HQ dashboard.',       industry: 'Bakery Franchise',  slug: 'monginis' },
  { id: 3, tag: 'fmcg-dist', brand: 'Regional Distributor (Mumbai)', line: '40% more productive salesman calls.', industry: 'FMCG Distribution', slug: 'mumbai-distributor' },
  { id: 4, tag: 'warehouse', brand: 'Food Manufacturer (4 plants)',  line: 'Zero expiry write-offs after FEFO rollout.', industry: 'Food Warehouse', slug: 'food-mfg-fefo' },
  { id: 5, tag: 'hrms',      brand: 'Manufacturing Co. (450 staff)', line: 'Monthly payroll cycle: 5 days → 8 hours.', industry: 'HRMS',           slug: 'hrms-payroll' },
  { id: 6, tag: 'franchise', brand: 'Bakery-Café Chain (45 outlets)',line: '100% outlet order visibility.',           industry: 'Franchise Ops',  slug: 'bakery-cafe-chain' },
];

export default function ResourcesPage() {
  const [activeCat, setActiveCat] = useState('all');
  const [caseFilter, setCaseFilter] = useState('all');
  const [emailValue, setEmailValue] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Featured (latest) post leads the §18.1 hero; the grid shows the rest.
  const featured = getFeaturedPost();
  const filteredArticles = useMemo(() => {
    const rest = SORTED_POSTS.filter((p) => p.slug !== featured.slug);
    if (activeCat === 'all') return rest;
    return rest.filter((p) => p.category === activeCat);
  }, [activeCat, featured.slug]);

  const filteredCases = useMemo(() => {
    if (caseFilter === 'all') return CASE_STUDIES;
    return CASE_STUDIES.filter((c) => c.tag === caseFilter);
  }, [caseFilter]);

  return (
    <>
      <Seo
        title="Resources — Guides, Case Studies, Newsletter"
        description="Operator playbooks, named case studies, comparison guides and the monthly Operations Insider — for food and FMCG leaders evaluating ERP."
        canonical="https://upwon.in/resources"
      />
      <ResourcesHeroSection />

      {/* ========== §18.1 HUB TAB NAV — Blog | Case Studies | Guides | Videos | Tools ========== */}
      <section className="relative bg-white pt-8">
        <Container className="relative">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {HUB_TABS.map((t) =>
              t.to ? (
                <Link
                  key={t.id}
                  to={t.to}
                  className="inline-flex items-center gap-1.5 rounded-full border border-navy-200 bg-white px-4 py-2 text-[14px] font-semibold text-navy-800 transition-all hover:border-orange-400 hover:text-orange-600"
                >
                  <t.icon className="h-3.5 w-3.5 text-orange-500" />
                  {t.label}
                </Link>
              ) : (
                <a
                  key={t.id}
                  href={t.anchor}
                  className="inline-flex items-center gap-1.5 rounded-full border border-navy-200 bg-white px-4 py-2 text-[14px] font-semibold text-navy-800 transition-all hover:border-orange-400 hover:text-orange-600"
                >
                  <t.icon className="h-3.5 w-3.5 text-orange-500" />
                  {t.label}
                </a>
              )
            )}
          </div>
        </Container>
      </section>

      {/* ========== §18.1 FEATURED (latest) ARTICLE ========== */}
      <section id="blog" className="relative overflow-hidden bg-white pt-8 scroll-mt-24">
        <Container className="relative">
          <Link
            to={`/blog/${featured.slug}`}
            className="group grid overflow-hidden rounded-3xl border border-cream-300 bg-white shadow-enterprise transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-enterprise-lg lg:grid-cols-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
              <img
                src={featured.image}
                alt={featured.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow">
                Latest on the blog
              </span>
            </div>
            <div className="flex flex-col justify-center p-7 md:p-10">
              {(() => {
                const fc = getCategory(featured.category);
                return (
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-orange-700">
                    {fc?.icon && <fc.icon className="h-3 w-3" />}
                    {fc?.label}
                  </span>
                );
              })()}
              <h2 className="mt-4 h-display text-balance text-[1.7rem] leading-[1.12] text-navy-950 group-hover:text-orange-600 md:text-[2.1rem]">
                {featured.title}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-navy-700">
                {featured.excerpt}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] text-navy-500">
                <span>{formatPostDate(featured.date)}</span>
                <span className="text-navy-300">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-orange-500" />
                  {featured.readTime}
                </span>
                <span className="ml-auto inline-flex items-center gap-1 font-semibold text-orange-600">
                  Read article
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </Link>
        </Container>
      </section>

      {/* ========== BLOG GRID — latest posts by topic (brief §18.2) ========== */}
      <section className="relative overflow-hidden bg-cream-100 py-10 sm:py-12 lg:py-14">
        <div className="absolute inset-0 grid-bg-light opacity-40" />
        <Container className="relative">
          <SectionIntro
            eyebrow="Insights by Topic"
            title={
              <>
                Six Lanes.{' '}
                <span className="gradient-text-orange">Pick What You Operate In.</span>
              </>
            }
            description="Operator playbooks, not vendor marketing — each lane built from real deployments."
          />

          {/* Category filter tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setActiveCat('all')}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[14px] font-semibold transition-all ${
                activeCat === 'all'
                  ? 'border-orange-500 bg-orange-500 text-white'
                  : 'border-cream-300 bg-white text-navy-700 hover:border-orange-200'
              }`}
            >
              <Filter className="h-3 w-3" />
              All
            </button>
            {CATEGORIES_WITH_COUNTS.map((c) => {
              const active = activeCat === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveCat(c.id)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[14px] font-semibold transition-all ${
                    active
                      ? 'border-orange-500 bg-orange-500 text-white'
                      : 'border-cream-300 bg-white text-navy-700 hover:border-orange-200'
                  }`}
                >
                  <c.icon className="h-3 w-3" />
                  {c.label}
                  <span
                    className={`ml-1 rounded-full px-1.5 text-[14px] font-bold ${
                      active ? 'bg-white/20 text-white' : 'bg-cream-200 text-navy-500'
                    }`}
                  >
                    {c.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Post grid — deep-links each card to /blog/:slug */}
          <div className="mt-8 grid gap-5 lg:mt-10 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((p, i) => {
              const cat = getCategory(p.category);
              return (
                <motion.div
                  key={p.slug}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
                >
                  <Link
                    to={`/blog/${p.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-cream-300 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-orange-500/40 hover:shadow-enterprise"
                  >
                    <span className="inline-flex w-fit items-center gap-1 rounded-full border border-orange-200 bg-orange-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-orange-700">
                      {cat?.icon && <cat.icon className="h-3 w-3" />}
                      {cat?.label || p.category}
                    </span>
                    <h3 className="mt-4 flex-1 text-lg font-bold text-navy-950 group-hover:text-orange-600">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-charcoal">{p.excerpt}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-cream-300 pt-4">
                      <span className="text-[14px] text-navy-500">{p.readTime}</span>
                      <span className="inline-flex items-center gap-1 text-[14px] font-semibold text-orange-600">
                        Read article
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* See the full blog */}
          <div className="mt-10 text-center">
            <Link to="/blog" className="btn-secondary inline-flex !text-[14px]">
              See all posts on the blog
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Container>
      </section>

      {/* ========== 5 GATED GUIDES (brief §18.3) ========== */}
      <section id="guides" className="relative overflow-hidden bg-white py-10 sm:py-12 lg:py-14 scroll-mt-24">
        <Container className="relative">
          <SectionIntro
            eyebrow="In-depth Guides for Decision-Makers"
            title={
              <>
                Five Guides Every Food &amp; FMCG Operator{' '}
                <span className="gradient-text-orange">Should Download.</span>
              </>
            }
            description="Email-gated PDFs. Built from real deployments — not generic vendor whitepapers."
          />

          <div className="mt-8 grid gap-5 lg:mt-10 md:grid-cols-2 lg:grid-cols-3">
            {GUIDES.map((g, i) => (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
                className="group rounded-2xl border border-amber-200 bg-amber-50/50 p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-enterprise"
              >
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-amber-500/15 text-amber-700">
                  <g.icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-700">
                  {g.cat} · {g.pages}
                </p>
                <h3 className="mt-2 text-lg font-bold text-navy-950">{g.title}</h3>
                <p className="mt-2 text-sm text-charcoal">{g.desc}</p>
                <Link
                  to="/free-audit"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber-600 px-4 py-2.5 text-[14px] font-bold text-white shadow-sm hover:bg-amber-700"
                >
                  <Download className="h-4 w-4" />
                  Download Free (email)
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ========== FILTERABLE CASE STUDY GRID (brief §18.4) ========== */}
      <section id="case-studies" className="relative overflow-hidden bg-cream-100 py-10 sm:py-12 lg:py-14 scroll-mt-24">
        <div className="absolute inset-0 grid-bg-light opacity-40" />
        <Container className="relative">
          <SectionIntro
            eyebrow="Real Businesses. Real Results."
            title={
              <>
                Filter Customer Stories by{' '}
                <span className="gradient-text-orange">Platform or Industry.</span>
              </>
            }
          />

          {/* Filter chips */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {CASE_FILTERS.map((f) => {
              const active = caseFilter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setCaseFilter(f.id)}
                  className={`rounded-full border px-3.5 py-1.5 text-[14px] font-semibold transition-all ${
                    active
                      ? 'border-navy-950 bg-navy-950 text-white'
                      : 'border-cream-300 bg-white text-navy-700 hover:border-navy-400'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Case study grid */}
          <div className="mt-8 grid gap-5 lg:mt-10 md:grid-cols-2 lg:grid-cols-3">
            {filteredCases.map((cs, i) => (
              <motion.div
                key={cs.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
                className="group rounded-2xl border border-cream-300 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-orange-500/40 hover:shadow-enterprise"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-navy-500">
                  {cs.industry}
                </p>
                <h3 className="mt-2 h-display text-xl font-bold text-navy-950 group-hover:text-orange-600">
                  {cs.brand}
                </h3>
                <p className="mt-3 text-sm font-semibold text-navy-700">{cs.line}</p>
                <Link
                  to={KNOWN_CASE_SLUGS.has(cs.slug) ? `/clients/${cs.slug}` : '/clients'}
                  className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-bold text-orange-600 hover:text-orange-700"
                >
                  Read full story
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            ))}
            {filteredCases.length === 0 && (
              <p className="col-span-full py-12 text-center text-sm text-navy-500">
                No case studies in this category yet — try another filter.
              </p>
            )}
          </div>
        </Container>
      </section>

      {/* ========== VIDEO LIBRARY (brief §18.5) ========== */}
      <section id="videos" className="relative overflow-hidden bg-white py-10 sm:py-12 lg:py-14 scroll-mt-24">
        <Container className="relative">
          <SectionIntro
            eyebrow="Watch UpWon in Action"
            title={
              <>
                Product Tours, Customer Stories and{' '}
                <span className="gradient-text-orange">Recorded Webinars.</span>
              </>
            }
          />
          <div className="mt-8 grid gap-5 lg:mt-10 md:grid-cols-2 lg:grid-cols-4">
            {VIDEOS.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: (i % 4) * 0.05 }}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-cream-300 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-orange-500/40 hover:shadow-enterprise"
              >
                <div className="relative aspect-video w-full bg-navy-950">
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-white/15 backdrop-blur transition-transform group-hover:scale-110">
                      <PlayCircle className="h-8 w-8 text-white" />
                    </span>
                  </div>
                  <span className="absolute bottom-2 right-2 rounded bg-navy-950/80 px-1.5 py-0.5 text-[14px] font-bold text-white">
                    {v.duration}
                  </span>
                </div>
                <div className="p-4">
                  <span className="rounded-full border border-orange-200 bg-orange-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-orange-700">
                    {v.tag}
                  </span>
                  <h3 className="mt-2 text-[14px] font-bold leading-snug text-navy-950 group-hover:text-orange-600">
                    {v.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ========== NEWSLETTER STRIP (brief §18.6 — email only, low friction) ========== */}
      <section className="relative overflow-hidden bg-orange-500 py-14 text-white">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center md:flex-row md:items-start md:text-left">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/15">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <div className="mt-4 md:ml-5 md:mt-0 md:flex-1">
              <h3 className="h-display text-2xl font-bold leading-snug">
                Join 2,000+ Food &amp; FMCG leaders — one weekly read.
              </h3>
              <p className="mt-1 text-[14px] text-white/85">
                Operator playbooks, benchmark numbers, real wins. No fluff. Unsubscribe one click.
              </p>
              {subscribed ? (
                <p className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/15 px-4 py-2 text-sm font-semibold">
                  ✓ You&rsquo;re in. First issue lands Wednesday.
                </p>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (emailValue) {
                      submitLead('newsletter_resources', { email: emailValue });
                      setSubscribed(true);
                    }
                  }}
                  className="mt-4 flex flex-col gap-2 sm:flex-row"
                >
                  <input
                    type="email"
                    required
                    placeholder="your-email@company.com"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/60 outline-none focus:border-white/60"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-navy-950 px-5 py-3 text-sm font-bold text-white shadow hover:bg-navy-900"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* <DemoCtaCompact
        eyebrow="Read on, then talk to us"
        title="Insights are useful. Working systems are better."
      /> */}
    </>
  );
}
