import { useState } from 'react';
import { m as motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowUpRight,
  ArrowRight,
  Mail,
  CheckCircle2,
  Sparkles,
  Newspaper,
  Calendar,
  Send,
} from 'lucide-react';
import Container from '../components/ui/Container.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import HeroBgSlideshow from '../components/ui/HeroBgSlideshow.jsx';
import Seo from '../components/common/Seo.jsx';
import { ISSUES, CURRENT_ISSUE } from '../data/newsletter.js';

function StoryCard({ story, index, issueSlug }) {
  const href = `/newsletter/${issueSlug}/${story.slug}`;
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-cream-300 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-enterprise"
    >
      <Link to={href} className="block">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-cream-200">
          <img
            src={story.image}
            alt={story.title}
            loading="lazy" decoding="async"
            className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent" />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.20em] text-orange-600">
          {story.eyebrow}
        </p>
        <h3 className="mt-2 font-display text-lg font-bold leading-snug text-navy-950 md:text-xl">
          {story.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-[14px] leading-relaxed text-navy-700">
          {story.blurb}
        </p>
        <Link
          to={href}
          className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[14px] font-semibold text-orange-600 hover:text-orange-700"
        >
          {story.cta}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.article>
  );
}

function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    // TODO: wire to your CRM / Mailchimp endpoint
    setSubmitted(true);
    setEmail('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
    >
      <label className="relative flex-1">
        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
        <input
          type="email"
          required
          placeholder="you@yourcompany.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-cream-300 bg-white px-9 py-3 text-[14px] text-navy-900 placeholder:text-navy-400 focus:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
        />
      </label>
      <button
        type="submit"
        className="btn-primary !px-5 !py-3 !text-[14px]"
        disabled={submitted}
      >
        {submitted ? (
          <>
            <CheckCircle2 className="h-4 w-4" />
            Subscribed
          </>
        ) : (
          <>
            Subscribe
            <Send className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}

export default function NewsletterPage() {
  // /newsletter/<issueSlug> shows that specific issue; /newsletter alone shows
  // the current issue. Past issues with no stories yet fall back to current.
  const { issueSlug } = useParams();
  const requested = issueSlug ? ISSUES.find((i) => i.slug === issueSlug) : null;
  // The archive chip the user clicked stays selected — even for past issues
  // that have no stories yet. Only an unknown slug falls back to current.
  const activeIssue = requested || CURRENT_ISSUE;
  const hasStories = activeIssue.stories.length > 0;

  return (
    <>
      <Seo
        title="Operations Insider — Monthly Food & FMCG Newsletter"
        description="Monthly newsletter on food ops, product releases, customer wins and the operational shifts shaping India's food and FMCG sector."
        canonical="https://upwon.in/newsletter"
      />
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden bg-navy-950 pt-32 pb-16 md:pt-40 md:pb-20">
        {/* Crossfading photo backdrop under a heavy navy overlay so the white
            hero text stays legible. */}
        <HeroBgSlideshow
          images={[
            'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=60',
            'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1600&q=60',
            'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=60',
          ]}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/90 via-navy-950/85 to-navy-950/92" />
        <div className="absolute inset-0 grid-bg opacity-25" />
        <div className="pointer-events-none absolute -left-32 top-1/4 h-[400px] w-[400px] rounded-full bg-orange-500/[0.15] blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-orange-500/[0.10] blur-[120px]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            {/* Breadcrumb */}
            <nav className="mb-6 text-[14px]">
              <ol className="inline-flex items-center gap-1.5 text-cream-100/50">
                <li><Link to="/" className="hover:text-white">Home</Link></li>
                <li><ArrowRight className="h-3 w-3 text-cream-100/30" /></li>
                <li className="text-white">Insider</li>
              </ol>
            </nav>

            {/* Issue chip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-300"
            >
              <Newspaper className="h-3.5 w-3.5" />
              {activeIssue.label} · Issue {activeIssue.issueNumber}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 h-display text-balance text-[2rem] leading-[1.05] tracking-tightest text-white md:text-[2.8rem] lg:text-[3.4rem]"
            >
              The UpWon{' '}
              <span className="gradient-text-orange">Operations Insider</span>
            </motion.h1>

            {/* Subtitle */}
            {/* <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22 }}
              className="mt-5 text-balance text-base leading-relaxed text-white md:text-lg"
            >
              What changed in Indian Food &amp; FMCG operations this month — and what
              to do about it. Product releases, customer wins, industry shifts,
              compliance updates.
            </motion.p> */}

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22 }}
              className="mt-5 text-balance text-base leading-relaxed text-white md:text-lg"
            >
              Monthly intelligence for food & FMCG operators — 
              product updates, industry shifts, compliance changes, 
              and what's actually working on the ground.
            </motion.p>

            {/* Inline benefits */}
            {/* <motion.ul
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[14px] text-white"
            >
              {[
                'Product releases',
                'Industry trends',
                'Customer wins',
                'Compliance updates',
              ].map((b) => (
                <li key={b} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-orange-300" />
                  {b}
                </li>
              ))}
            </motion.ul> */}

            {/* Subscribe form */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.42 }}
              className="mt-9 flex flex-col items-center"
            >
              <SubscribeForm />
              <p className="mt-3 text-[14px] text-white">
                One email a month · Unsubscribe in one click · No spam, ever.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ========== ARCHIVE NAV ========== */}
      <section className="border-y border-cream-300 bg-cream-100">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-2 py-4 md:gap-3">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-500">
              <Calendar className="h-3.5 w-3.5 text-orange-500" />
              Archive
            </span>
            {ISSUES.map((iss) => {
              const isActive = iss.slug === activeIssue.slug;
              return (
                <Link
                  key={iss.slug}
                  to={`/newsletter/${iss.slug}`}
                  className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[14px] font-medium transition-colors ${isActive
                      ? 'border-orange-300 bg-orange-50 text-orange-700'
                      : 'border-cream-300 bg-white text-navy-700 hover:border-orange-200 hover:bg-orange-50/40'
                    }`}
                >
                  {iss.label}
                  {iss.current && (
                    <span className="rounded-full bg-orange-500 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                      Current
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ========== 6-CARD STORY GRID ========== */}
      <section className="relative bg-white section-pad">
        <div className="absolute inset-0 grid-bg-light opacity-30" />
        <Container className="relative">
          <SectionHeading
            align="center"
            variant="light"
            eyebrow={`Inside the ${activeIssue.label} issue`}
            title={
              hasStories ? (
                <>
                  {activeIssue.stories.length} stories that{' '}
                  <span className="gradient-text-orange">move the dial.</span>
                </>
              ) : (
                <>
                  This issue isn't{' '}
                  <span className="gradient-text-orange">published yet.</span>
                </>
              )
            }
            description={
              hasStories
                ? "A new signup, an industry shift, two product updates, a customer win, and one playbook you'll quote in your next ops review."
                : `The ${activeIssue.label} issue is still in the works. Read the latest published issue while you wait.`
            }
          />

          {hasStories ? (
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {activeIssue.stories.map((story, i) => (
                <StoryCard
                  key={story.slug}
                  story={story}
                  index={i}
                  issueSlug={activeIssue.slug}
                />
              ))}
            </div>
          ) : (
            <div className="mx-auto mt-12 max-w-md text-center">
              <Link
                to={`/newsletter/${CURRENT_ISSUE.slug}`}
                className="inline-flex items-center gap-2 btn-primary-glow !px-6 !py-3.5"
              >
                Read the {CURRENT_ISSUE.label} issue
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </Container>
      </section>

      {/* ========== LONG-FORM CALLOUT ========== */}
      <section className="relative overflow-hidden bg-cream-100 section-pad">
        <div className="pointer-events-none absolute -left-32 top-1/3 h-[400px] w-[400px] rounded-full bg-orange-500/[0.06] blur-[120px]" />

        <Container className="relative">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-2xl border border-cream-300 shadow-enterprise"
            >
              <img
                src="https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=2000&q=80"
                alt="Monginis production"
                className="block aspect-[4/3] w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-sm">
                <Sparkles className="h-3 w-3" />
                Long-form
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange-600">
                In-depth feature
              </p>
              <h2 className="mt-3 h-display text-balance text-3xl leading-tight text-navy-950 md:text-4xl">
                Inside how Monginis runs 200+ outlets on{' '}
                <span className="gradient-text-orange">one platform.</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-navy-700">
                The full story behind a 5.7× outlet expansion without growing the
                back-office team — how the team mapped 18 plant SOPs in 5 days,
                rolled out plant-by-plant in 4 weeks, and crossed ₹20 L in daily
                transactions with zero P1 incidents.
              </p>
              <ul className="mt-5 space-y-2.5 text-[14px] text-navy-800">
                {[
                  'Why hub-spoke order consolidation beat their old phone-tree process',
                  'How royalty calculation went from spreadsheet to automatic',
                  'The 4-phase rollout schedule that hit Day 30 go-live cleanly',
                ].map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/clients/monginis"
                className="mt-7 inline-flex items-center gap-2 btn-primary-glow !px-6 !py-3.5"
              >
                Read the full case study
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ========== SUBSCRIBE / CTA FOOTER ========== */}
      {/* <section className="relative overflow-hidden bg-navy-950 section-pad">
        <div className="absolute inset-0 grid-bg opacity-25" />
        <div className="pointer-events-none absolute -left-32 top-1/4 h-[400px] w-[400px] rounded-full bg-orange-500/[0.12] blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-orange-500/[0.08] blur-[120px]" />

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center text-orange-300">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
              Don't miss the next issue
            </p>
            <h2 className="mt-5 h-display text-balance text-3xl text-white md:text-4xl lg:text-5xl">
              Get next month's Insider{' '}
              <span className="gradient-text-orange">in your inbox.</span>
            </h2>
            <p className="mt-5 text-balance text-white/70 md:text-lg">
              One curated email a month — what shipped, what changed in the
              industry, and which customers won big.
            </p>

            <div className="mt-9 flex flex-col items-center">
              <SubscribeForm />
              <p className="mt-4 text-[14px] text-white/45">
                Trusted by operations and finance leaders at 50+ Food &amp; FMCG
                brands across India.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/contact" className="btn-secondary-dark !px-5 !py-3 !text-[14px]">
                Contact our team
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link to="/demo" className="btn-primary !py-3 !text-[14px]">
                Request a demo
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section> */}
    </>
  );
}
