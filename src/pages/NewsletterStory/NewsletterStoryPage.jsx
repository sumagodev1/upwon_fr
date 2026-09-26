import { useEffect, useState } from 'react';
import { m as motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowRight,
  Calendar,
  Clock,
  Mail,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  Newspaper,
} from 'lucide-react';
import Container from '../../components/shared/Container/Container.jsx';
import Seo, { articleJsonLd, breadcrumbJsonLd } from '../../components/shared/Seo/Seo.jsx';
import { findIssueAndStory } from '../../data/newsletter.js';
import { fetchInsiderIssues, fetchInsiderStory } from '../../lib/insiderPage.js';

export default function NewsletterStoryPage() {
  const { issueSlug, storySlug } = useParams();
  const routeKey = `${issueSlug}/${storySlug}`;

  /*
    The static lookup renders first — it is what a prerender would bake in
    and what renders if the API is unreachable — and the story published
    through the admin panel's Insider → News tab replaces it once the API
    answers.

    Two calls, because they answer different questions: the story endpoint
    carries the body, and the issue list says what is live (and feeds "Also
    in this issue"). Both resolve to null for every failure — see
    lib/insiderPage.js.

    The answer is stored with the route it was for, so a slow reply for the
    previous article can never paint over the next one.
  */
  const [published, setPublished] = useState(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchInsiderStory(issueSlug, storySlug), fetchInsiderIssues()]).then(
      ([found, issues]) => {
        if (cancelled) return;
        setPublished({ key: `${issueSlug}/${storySlug}`, found, issues });
      },
    );
    return () => {
      cancelled = true;
    };
  }, [issueSlug, storySlug]);

  const settled = published?.key === routeKey;
  const fetched = settled ? published : null;
  const builtIn = findIssueAndStory(issueSlug, storySlug);

  /*
    A healthy issue list is the authority on what is live. A static story it
    no longer carries was switched off or deleted in the admin panel, so it
    stops rendering once the API has said so. With no list — API unreachable,
    unconfigured, nothing published — the static copy stands.
  */
  const listedIssue = fetched?.issues?.find((i) => i.slug === issueSlug) ?? null;
  const unpublished =
    Boolean(fetched?.issues) &&
    !(listedIssue?.stories ?? []).some((s) => s.slug === storySlug);

  // The published story when there is one; otherwise the static one, unless
  // the API says it is gone. Issue and story always come from the same source.
  const resolved =
    fetched?.found ?? (builtIn.story && !unpublished ? builtIn : null);
  const issue = resolved?.issue ?? null;
  const story = resolved?.story ?? null;

  // Scroll to top on slug change so each article loads fresh from the hero.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [issueSlug, storySlug]);

  // Not a static story and the API has not answered yet: hold the hero's
  // frame rather than flashing "not found" at a story that exists only in the
  // admin panel.
  if (!story && !settled) {
    return (
      <section
        aria-busy="true"
        className="relative flex min-h-[68vh] items-center overflow-hidden bg-navy-950 pt-32 pb-12 md:min-h-[74vh] md:pt-40 md:pb-16"
      >
        <span className="sr-only">Loading story…</span>
      </section>
    );
  }

  // 404 fallback — story or issue not found.
  if (!issue || !story) {
    return (
      <section className="relative overflow-hidden bg-cream-100 pt-40 pb-24 text-center">
        <Container>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange-600">
            Story not found
          </p>
          <h1 className="mt-3 h-display text-3xl text-navy-900 md:text-4xl">
            That article doesn't exist (yet).
          </h1>
          <p className="mt-4 text-navy-600">
            It may have moved or never published. Head back to the current issue.
          </p>
          <Link to="/newsletter" className="btn-primary mt-7 inline-flex">
            <ArrowLeft className="h-4 w-4" />
            Back to the Insider
          </Link>
        </Container>
      </section>
    );
  }

  // Related stories — same issue, excluding the current one. Taken from the
  // published list when there is one, so they link only to live stories.
  const siblings = fetched?.issues
    ? (listedIssue?.stories ?? [])
    : (builtIn.issue?.stories ?? []);
  const related = siblings.filter((s) => s.slug !== story.slug).slice(0, 3);

  const storyUrl = `https://upwon.in/newsletter/${issue.slug}/${story.slug}`;

  return (
    <>
      <Seo
        title={`${story.title} — Operations Insider`}
        description={story.blurb}
        canonical={storyUrl}
        image={story.image}
        type="article"
        jsonLd={[
          breadcrumbJsonLd([
            { name: 'Home', to: '/' },
            { name: 'Insider', to: '/newsletter' },
            { name: issue.label, to: `/newsletter/${issue.slug}` },
            { name: story.title },
          ]),
          articleJsonLd({
            title: story.title,
            description: story.blurb,
            url: storyUrl,
            image: story.image,
            section: issue.label,
          }),
        ]}
      />
      {/* ========== HERO — full-bleed story image with title overlaid ========== */}
      <section className="relative flex min-h-[68vh] items-center overflow-hidden bg-navy-950 pt-32 pb-12 md:min-h-[74vh] md:pt-40 md:pb-16">
        {/* Background image — a published story can lose its image (a
            deleted upload); the navy base and overlay then carry the hero. */}
        {story.image && (
          <img
            src={story.image}
            alt={story.imageAlt || story.title}
            fetchpriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        {/* Legibility overlay — darkens the photo so white text stays readable,
            and fades to a darker base at the bottom where the copy sits. */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/55 to-navy-950/92" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-navy-950/85 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

        <Container className="relative w-full">
          <div className="flex justify-center">
            <Link
              to="/newsletter"
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-orange-300 transition-colors hover:text-orange-200"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to {issue.label} issue
            </Link>
          </div>

          <div className="mx-auto mt-6 max-w-3xl text-center">
            {/* Eyebrow chip */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/15 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-200 backdrop-blur"
            >
              <Newspaper className="h-3.5 w-3.5" />
              {story.eyebrow}
            </motion.span>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 h-display text-balance text-[2rem] leading-[1.08] tracking-tightest text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] md:text-[2.6rem] lg:text-[3.2rem]"
            >
              {story.title}
            </motion.h1>

            {/* Meta line */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[14px] text-white/80"
            >
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-orange-300" />
                {issue.label}
              </span>
              {story.readTime && (
                <>
                  <span className="text-white/50">·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-orange-300" />
                    {story.readTime}
                  </span>
                </>
              )}
              <span className="text-white/50">·</span>
              <span className="inline-flex items-center gap-1.5">
                Issue {issue.issueNumber}
              </span>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ========== ARTICLE BODY ========== */}
      <section className="relative bg-white section-pad">
        <Container>
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_240px]">
            {/* Article column */}
            <article className="prose-article">
              {/* Intro / blurb in larger lead style */}
              <p className="text-balance border-l-2 border-orange-500 pl-5 text-lg font-medium leading-relaxed text-navy-800 md:text-xl">
                {story.blurb}
              </p>

              {/* Body paragraphs */}
              <div className="mt-8 space-y-5 text-[15.5px] leading-relaxed text-navy-700 md:text-[16.5px]">
                {story.body.map((para, i) => (
                  <p key={i} className="text-balance">
                    {para}
                  </p>
                ))}
              </div>

              {/* End-of-article CTA card */}
              <div className="mt-12 rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 via-white to-orange-50/40 p-6 md:p-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange-700">
                  Want this in action?
                </p>
                <h3 className="mt-2 font-display text-xl font-bold leading-tight text-navy-950 md:text-2xl">
                  See it on a 30-minute live demo.
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-navy-700">
                  Walk through your own scenarios with our solutions team. No
                  pitch deck — just your shape, our screens, real questions.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    to="/demo"
                    className="btn-primary-glow !px-5 !py-3 !text-[14px]"
                  >
                    Book Free Demo
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/newsletter"
                    className="btn-secondary !px-5 !py-3 !text-[14px]"
                  >
                    Back to {issue.label}
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              {/* Share */}
              <div className="rounded-2xl border border-cream-300 bg-cream-100 p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-navy-500">
                  Share this article
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    { Icon: Linkedin, label: 'LinkedIn' },
                    { Icon: Twitter, label: 'Twitter' },
                    { Icon: Mail, label: 'Email' },
                    { Icon: LinkIcon, label: 'Copy link' },
                  ].map(({ Icon, label }) => (
                    <button
                      key={label}
                      type="button"
                      aria-label={label}
                      onClick={() => {
                        if (label === 'Copy link') {
                          navigator.clipboard?.writeText(window.location.href);
                        }
                      }}
                      className="grid h-9 w-9 place-items-center rounded-full border border-cream-300 bg-white text-navy-700 transition-colors hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Subscribe mini */}
              <div className="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-orange-700">
                  Get the next issue
                </p>
                <p className="mt-2 text-[14px] leading-relaxed text-navy-700">
                  One curated email a month — product releases, customer wins,
                  industry shifts.
                </p>
                <Link
                  to="/newsletter"
                  className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-semibold text-orange-600 hover:text-orange-700"
                >
                  Subscribe
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* ========== RELATED STORIES ========== */}
      {related.length > 0 && (
        <section className="relative overflow-hidden bg-cream-100 section-pad">
          <div className="absolute inset-0 grid-bg-light opacity-30" />
          <Container className="relative">
            <div className="mx-auto max-w-6xl">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange-600">
                    Also in this issue
                  </p>
                  <h2 className="mt-2 h-display text-2xl text-navy-950 md:text-3xl">
                    More from {issue.label}
                  </h2>
                </div>
                <Link
                  to="/newsletter"
                  className="hidden text-[14px] font-semibold text-orange-600 hover:text-orange-700 md:inline-flex"
                >
                  See full issue →
                </Link>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/newsletter/${issue.slug}/${r.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-cream-300 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-enterprise"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-cream-200">
                      {r.image && (
                        <img
                          src={r.image}
                          alt={r.imageAlt || r.title}
                          loading="lazy" decoding="async"
                          className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.20em] text-orange-600">
                        {r.eyebrow}
                      </p>
                      <h3 className="mt-2 font-display text-base font-bold leading-snug text-navy-950">
                        {r.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-[14px] text-navy-700">
                        {r.blurb}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1 pt-4 text-[14px] font-semibold text-orange-600">
                        Read story
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
