import { useEffect, useState } from 'react';
import { m as motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowRight,
  Mail,
  CheckCircle2,
  Calendar,
  Send,
} from 'lucide-react';
import Container from '../../components/shared/Container/Container.jsx';
import Eyebrow from '../../components/shared/Eyebrow/Eyebrow.jsx';
import InsiderHeroSection from './sections/InsiderHeroSection/InsiderHeroSection.jsx';
import InsiderFeatureSection from './sections/InsiderFeatureSection/InsiderFeatureSection.jsx';
import Seo from '../../components/shared/Seo/Seo.jsx';
import { ISSUES } from '../../data/newsletter.js';
import { fetchInsiderIssues } from '../../lib/insiderPage.js';
import { checkSubscribe } from '../../lib/leadFields.js';

// The story grid's subtext for an issue that has no summary of its own — the
// line this page always carried, written for the March 2026 issue.
const DEFAULT_ISSUE_SUMMARY =
  "A new signup, an industry shift, two product updates, a customer win, and one playbook you'll quote in your next ops review.";

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
          {/* A published story can lose its image (a deleted upload); the
              cream frame then stands in rather than a broken <img>. */}
          {story.image && (
            <img
              src={story.image}
              alt={story.imageAlt || story.title}
              loading="lazy" decoding="async"
              className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          )}
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
  const [attempted, setAttempted] = useState(false);
  const [touched, setTouched] = useState(false);

  const emailError = checkSubscribe({ email }).email;
  const showEmailError = (attempted || touched) && emailError;

  const handleSubmit = (e) => {
    e.preventDefault();
    setAttempted(true);
    /*
      This replaces `if (!email || !email.includes('@')) return;`, which refused
      the submit without saying anything: 'a@b' passed it, and anything without
      an @ was dropped on the floor with the button looking like it had worked.
    */
    if (emailError) return;
    // TODO: wire to your CRM / Mailchimp endpoint
    setSubmitted(true);
    setEmail('');
    setAttempted(false);
    setTouched(false);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-2"
    >
      <div className="flex w-full flex-col gap-2 sm:flex-row">
      <label className="relative flex-1">
        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
        <input
          type="email"
          required
          placeholder="you@yourcompany.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched(true)}
          aria-invalid={showEmailError ? true : undefined}
          aria-describedby={showEmailError ? 'insider-news-error' : undefined}
          className={`w-full rounded-md border bg-white px-9 py-3 text-[14px] text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 ${
            showEmailError ? 'border-orange-400' : 'border-cream-300 focus:border-orange-300'
          }`}
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
      </div>
      {showEmailError && (
        <p id="insider-news-error" className="text-[13px] text-orange-600">
          {emailError}
        </p>
      )}
    </form>
  );
}

export default function NewsletterPage() {
  // /newsletter/<issueSlug> shows that specific issue; /newsletter alone shows
  // the current issue. Past issues with no stories yet fall back to current.
  const { issueSlug } = useParams();

  /*
    Issues start as the static set in data/newsletter.js and are swapped for
    the ones published through the admin panel's Insider → News tab once the
    API answers. The static set is what the SSG build bakes in
    and what renders if the API is unreachable; fetchInsiderIssues resolves to
    null for every failure, and null means "keep what you have".

    An issue that exists only in the admin panel therefore renders client-side:
    /newsletter/<its-slug> shows the current issue until the fetch lands.
  */
  const [issues, setIssues] = useState(ISSUES);

  useEffect(() => {
    let cancelled = false;
    fetchInsiderIssues().then((published) => {
      if (cancelled || !published) return;
      setIssues(published);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // The issue marked current (falls back to the first, the newest).
  const currentIssue = issues.find((i) => i.current) || issues[0];
  const requested = issueSlug ? issues.find((i) => i.slug === issueSlug) : null;
  // The archive chip the user clicked stays selected — even for past issues
  // that have no stories yet. Only an unknown slug falls back to current.
  const activeIssue = requested || currentIssue;
  const hasStories = activeIssue.stories.length > 0;
  // Where the "not published yet" state sends readers: the current issue if it
  // has stories, else the newest one that does. The admin can mark an empty
  // issue current, and a link back to the page you are on is a dead end.
  const readableIssue =
    (currentIssue.stories.length > 0 && currentIssue) ||
    issues.find((i) => i.stories.length > 0) ||
    null;

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
            {issues.map((iss) => {
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
              {/* The standing line describes the issue's stories, so an issue
                  with none keeps the "still in the works" line instead. */}
              {hasStories
                ? DEFAULT_ISSUE_SUMMARY
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
          ) : readableIssue ? (
            <div className="mx-auto mt-8 max-w-md text-center lg:mt-10">
              <Link
                to={`/newsletter/${readableIssue.slug}`}
                className="inline-flex items-center gap-2 btn-primary-glow !px-6 !py-3.5"
              >
                Read the {readableIssue.label} issue
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : null}
        </Container>
      </section>

      {/* ========== LONG-FORM CALLOUT ==========
          Its own section so the admin panel's Feature Section tab can author
          it (or switch it off) independently of the issues above. */}
      <InsiderFeatureSection />

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
