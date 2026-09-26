import { useEffect, useState } from 'react';
import { m as motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Clock,
  Mail,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  User,
} from 'lucide-react';
import Container from '../../components/shared/Container/Container.jsx';
import PostPicture from '../../components/shared/PostPicture/PostPicture.jsx';
import Seo from '../../components/shared/Seo/Seo.jsx';
import {
  findPost,
  getCategory,
  getRelatedPosts,
  formatPostDate,
} from '../../data/blog.js';
import { fetchBlogIndex, fetchBlogPost } from '../../lib/blog.js';
import { blogIcon } from '../../lib/blogIcons.js';

// Brief §18.2 (post view) — a full blog post. It draws no content upgrade
// (download offer) for any post: the built-in posts in data/blog.js still
// carry a `contentUpgrade`, which goes unused, and a published post has none.
export default function BlogPostPage() {
  const { slug } = useParams();

  /*
    The built-in post renders first — it is the copy the sitemap vouches for
    (seo/routes.js enumerates data/blog.js's slugs), what any server-rendered
    pass would bake in, and what renders if the API is unreachable — and the
    post published through the admin panel's Resource Page → Blog → Posts tab
    replaces it once the API answers. (This route has no getStaticPaths in
    App.jsx today, so it is not prerendered; the order is kept anyway, so
    adding one later cannot break hydration.)

    Two calls, because they answer different questions — the same pair
    NewsletterStoryPage makes:
      - fetchBlogPost carries the article itself: its body and the server's
        pick of related posts;
      - fetchBlogIndex says what is LIVE, and it is the only read that carries
        the categories' labels and icons — a published post names its category
        by slug alone.
    Both resolve to null for every failure — see lib/blog.js.

    The answer is stored with the slug it was for, so a slow reply for the
    previous article can never paint over the next one.
  */
  const [published, setPublished] = useState(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchBlogPost(slug), fetchBlogIndex()]).then(([found, index]) => {
      if (cancelled) return;
      setPublished({ slug, found, index });
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const settled = published?.slug === slug;
  const fetched = settled ? published : null;
  const builtIn = findPost(slug);

  /*
    A published listing is the authority on what is live — the same rule
    BlogPage uses to choose its list. When the blog HAS posts (`hasPosts`, see
    lib/blog.js) and this slug is not among them, the post was switched off or
    deleted in the admin panel, so a built-in copy of it stops rendering once
    the API has said so rather than living on at a URL the listing no longer
    links to. With no listing — API unreachable, unconfigured, no post rows at
    all — the built-in copy stands.
  */
  const listed = fetched?.index?.hasPosts ? fetched.index : null;
  const unpublished = Boolean(listed) && !listed.posts.some((p) => p.slug === slug);

  // The published post when there is one; otherwise the built-in one, unless
  // the API says it is gone.
  const post = fetched?.found ?? (builtIn && !unpublished ? builtIn : null);
  const isPublished = Boolean(post) && post === fetched?.found;

  // Each post loads fresh from the top on slug change.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  // Not a built-in post and the API has not answered yet: hold the hero's
  // frame rather than flashing "not found" at a post that exists only in the
  // admin panel.
  if (!post && !settled) {
    return (
      <section
        aria-busy="true"
        className="relative flex min-h-[68vh] items-center overflow-hidden bg-navy-950 pt-32 pb-12 md:min-h-[74vh] md:pt-40 md:pb-16"
      >
        <span className="sr-only">Loading article…</span>
      </section>
    );
  }

  // 404 fallback — unknown slug.
  if (!post) {
    return (
      <section className="relative overflow-hidden bg-black-100 pt-40 pb-24 text-center">
        <Container>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange-600">
            Article not found
          </p>
          <h1 className="mt-3 h-display text-3xl text-navy-900 md:text-4xl">
            That article doesn't exist (yet).
          </h1>
          <p className="mt-4 text-navy-600">
            It may have moved or never published. Browse the rest of the blog.
          </p>
          <Link to="/blog" className="btn-primary mt-7 inline-flex">
            <ArrowLeft className="h-4 w-4" />
            Back to the blog
          </Link>
        </Container>
      </section>
    );
  }

  /*
    A category in one shape whichever source it came from — `{ id, label, icon }`
    with `icon` a lucide COMPONENT, the shape data/blog.js's CATEGORIES have. A
    published category's icon arrives as a name and is resolved through
    lib/blogIcons.js. The published categories win while the listing is
    published, so a label renamed in the panel shows here as it does on /blog;
    otherwise — and for a slug they do not carry — it is the built-in category
    of that id, which every seeded category shares.
  */
  const categoryOf = (id) => {
    const listedCategory = listed?.categories.find((c) => c.slug === id);
    if (!listedCategory) return getCategory(id);
    return {
      id: listedCategory.slug,
      label: listedCategory.label,
      icon: blogIcon(listedCategory.icon),
    };
  };

  const cat = categoryOf(post.category);

  // The server's pick for a published post — getRelatedPosts' own rule (same
  // category newest first, then the rest), applied to what is live — and the
  // built-in pick for a built-in one.
  const related = isPublished ? post.related : getRelatedPosts(post.slug, 3);

  return (
    <>
      <Seo
        title={`${post.title} — UpWon Blog`}
        description={post.excerpt}
        canonical={`https://upwon.in/blog/${post.slug}`}
      />

      {/* ========== HERO — full-bleed post image with title overlaid ========== */}
      <section className="relative flex min-h-[68vh] items-center overflow-hidden bg-navy-950 pt-32 pb-12 md:min-h-[74vh] md:pt-40 md:pb-16">
        {/* Background image — a published post can have none (none set, or
            an upload deleted out from under it); the navy base and overlay
            then carry the hero. Every built-in post has one. A phone crop,
            when one is published, is served below 768px — a portrait 3:4
            file for this tall box, and this is the only place it is used:
            every card keeps the landscape desktop image on all screens. */}
        {post.image && (
          <PostPicture
            mobileImage={post.mobileImage}
            className="absolute inset-0 block h-full w-full"
          >
            <img
              src={post.image}
              alt={post.title}
              fetchpriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </PostPicture>
        )}
        {/* Legibility overlay — darkens the photo so white text stays readable,
            and fades to a darker base at the bottom where the copy sits. */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/55 to-navy-950/92" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-navy-950/85 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

        <Container className="relative w-full">
          <div className="flex justify-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-orange-300 transition-colors hover:text-orange-200"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to the blog
            </Link>
          </div>

          <div className="mx-auto mt-6 max-w-3xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/15 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-200 backdrop-blur"
            >
              {cat?.icon && <cat.icon className="h-3.5 w-3.5" />}
              {cat?.label}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 h-display text-balance text-[2rem] leading-[1.08] tracking-tightest text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] md:text-[2.6rem] lg:text-[3.2rem]"
            >
              {post.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[14px] text-white/80"
            >
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-orange-300" />
                {formatPostDate(post.date)}
              </span>
              {/* Read time is optional on a published post. */}
              {post.readTime && (
                <>
                  <span className="text-white/50">·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-orange-300" />
                    {post.readTime}
                  </span>
                </>
              )}
              <span className="text-white/50">·</span>
              <span className="inline-flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-orange-300" />
                {post.author}
              </span>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ========== ARTICLE BODY ========== */}
      <section className="relative bg-white section-pad">
        <Container>
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_260px]">
            {/* Article column */}
            <article>
              {/* Lead */}
              <p className="text-balance border-l-2 border-orange-500 pl-5 text-lg font-medium leading-relaxed text-navy-800 md:text-xl">
                {post.lead}
              </p>

              {/* Body */}
              <div className="mt-8">
                {post.body.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>

              {/* Demo CTA */}
              <div className="mt-12 rounded-2xl border border-navy-100 bg-gradient-to-br from-navy-950 via-navy-900 to-[#0a0e26] p-6 text-white ring-1 ring-white/5 md:p-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange-300">
                  Want this in action?
                </p>
                <h3 className="mt-2 font-display text-xl font-bold leading-tight md:text-2xl">
                  See it on a 30-minute live demo.
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/70">
                  Walk through your own scenarios with our solutions team. No
                  pitch deck — your operations, our screens, real questions.
                </p>
                <Link
                  to="/demo"
                  className="mt-5 inline-flex items-center gap-1.5 rounded-md bg-orange-500 px-5 py-3 text-[14px] font-bold text-white transition-transform duration-300 hover:scale-[1.02]"
                >
                  Book Free Demo
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
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
                  Get the next playbook
                </p>
                <p className="mt-2 text-[14px] leading-relaxed text-navy-700">
                  One curated email a month — operator playbooks, benchmark
                  numbers, real wins.
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

      {/* ========== RELATED POSTS ========== */}
      {related.length > 0 && (
        <section className="relative overflow-hidden bg-cream-100 section-pad">
          <div className="absolute inset-0 grid-bg-light opacity-30" />
          <Container className="relative">
            <div className="mx-auto max-w-6xl">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange-600">
                    Keep reading
                  </p>
                  <h2 className="mt-2 h-display text-2xl text-navy-950 md:text-3xl">
                    Related playbooks
                  </h2>
                </div>
                <Link
                  to="/blog"
                  className="hidden text-[14px] font-semibold text-orange-600 hover:text-orange-700 md:inline-flex"
                >
                  See all posts →
                </Link>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => {
                  const rCat = categoryOf(r.category);
                  return (
                    <Link
                      key={r.slug}
                      to={`/blog/${r.slug}`}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-cream-300 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-enterprise"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        {r.image ? (
                          <img
                            src={r.image}
                            alt={r.title}
                            loading="lazy"
                            decoding="async"
                            className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          />
                        ) : (
                          <div
                            aria-hidden="true"
                            className="h-full w-full bg-gradient-to-br from-navy-900 to-navy-950"
                          />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <p className="text-[10px] font-bold uppercase tracking-[0.20em] text-orange-600">
                          {rCat?.label}
                        </p>
                        <h3 className="mt-2 font-display text-base font-bold leading-snug text-navy-950">
                          {r.title}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-[14px] text-navy-700">
                          {r.excerpt}
                        </p>
                        <span className="mt-auto inline-flex items-center gap-1 pt-4 text-[14px] font-semibold text-orange-600">
                          Read article
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

// Renders one body block. Keeps post content structured without a markdown dep.
function Block({ block }) {
  if (block.type === 'h2') {
    return (
      <h2 className="mt-9 h-display text-2xl font-bold leading-tight text-navy-950 md:text-[1.7rem]">
        {block.text}
      </h2>
    );
  }
  if (block.type === 'ul') {
    return (
      <ul className="mt-4 space-y-2.5">
        {block.items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
            <span className="text-[15.5px] leading-relaxed text-navy-700 md:text-[16.5px]">
              {item}
            </span>
          </li>
        ))}
      </ul>
    );
  }
  if (block.type === 'quote') {
    return (
      <blockquote className="my-8 border-l-4 border-orange-500 bg-cream-100 py-5 pl-6 pr-5 rounded-r-xl">
        <p className="text-balance font-display text-lg font-semibold leading-snug text-navy-950 md:text-xl">
          “{block.text}”
        </p>
        {block.cite && (
          <footer className="mt-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-navy-500">
            — {block.cite}
          </footer>
        )}
      </blockquote>
    );
  }
  // default: paragraph
  return (
    <p className="mt-5 text-balance text-[15.5px] leading-relaxed text-navy-700 md:text-[16.5px]">
      {block.text}
    </p>
  );
}
