import { useState } from 'react';
import { m as motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowUpRight,
  ArrowRight,
  Mail,
  CheckCircle2,
  Sparkles,
  Calendar,
  Send,
} from 'lucide-react';
import Container from '../components/ui/Container.jsx';
import Eyebrow from '../components/ui/Eyebrow.jsx';
import InsiderHeroSection from '../components/sections/InsiderHeroSection.jsx';
import Seo from '../components/common/Seo.jsx';
import { ISSUES, CURRENT_ISSUE } from '../data/newsletter.js';

/*
  Section heading motion, shared by every heading block on this page so the
  eyebrow / headline / subtext cadence matches the rest of the site.
*/
const EASE = [0.22, 1, 0.3, 1];

const HEADING_VIEWPORT = { once: true, amount: 0.1 };

const HEADING_GROUP = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const FADE_IN = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.55, ease: EASE } },
};

const FADE_UP = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

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
      {/* ========== HERO ==========
          The signup is the hero's call to action, so it rides on the artwork
          in place of the usual pair of CTA links. */}
      <InsiderHeroSection
        issue={activeIssue}
        footer={
          <>
            <SubscribeForm />

            <p className="mt-3 text-[14px] text-cream-100/75">
              One email a month · Unsubscribe in one click · No spam, ever.
            </p>
          </>
        }
      />

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
      <section className="relative bg-white py-10 sm:py-12 lg:py-14">
        <div className="absolute inset-0 grid-bg-light opacity-30" />
        <Container className="relative">
          <motion.div
            variants={HEADING_GROUP}
            initial="hidden"
            whileInView="visible"
            viewport={HEADING_VIEWPORT}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div variants={FADE_IN}>
              <Eyebrow className="justify-center">
                {`INSIDE THE ${activeIssue.label} ISSUE`}
              </Eyebrow>
            </motion.div>

            <motion.h2
              variants={FADE_UP}
              className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
            >
              {hasStories ? (
                <>
                  {activeIssue.stories.length} Stories That{' '}
                  <span className="gradient-text-orange">Move the Dial.</span>
                </>
              ) : (
                <>
                  This Issue Isn&rsquo;t{' '}
                  <span className="gradient-text-orange">Published Yet.</span>
                </>
              )}
            </motion.h2>

            <motion.p
              variants={FADE_UP}
              className="mx-auto mt-4 max-w-2xl text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
            >
              {hasStories
                ? "A new signup, an industry shift, two product updates, a customer win, and one playbook you'll quote in your next ops review."
                : `The ${activeIssue.label} issue is still in the works. Read the latest published issue while you wait.`}
            </motion.p>
          </motion.div>

          {hasStories ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-6">
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
            <div className="mx-auto mt-8 max-w-md text-center lg:mt-10">
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
      <section className="relative overflow-hidden bg-cream-100 py-10 sm:py-12 lg:py-14">
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
              <Eyebrow>IN-DEPTH FEATURE</Eyebrow>

              <h2 className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]">
                Inside How Monginis Runs 200+ Outlets on{' '}
                <span className="gradient-text-orange">One Platform.</span>
              </h2>

              <p className="mt-4 text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]">
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
