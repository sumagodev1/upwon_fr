// Single source of truth for the public URL surface used to generate
// sitemap.xml + robots.txt at build time (see scripts/sitemap-plugin.js).
//
// Why it lives here and not in App.jsx: the router table in App.jsx also holds
// *internal* routes that must NOT be indexed — param placeholders (`:slug`),
// the catch-all `*` (404), the legacy `/platform` redirect target and the
// `/case-studies` alias that renders the same component as `/clients/:slug`.
// Listing the canonical, indexable paths explicitly here keeps those out of the
// sitemap, while the dynamic `:slug` routes are expanded from the same data the
// pages render from — so a new product / industry / post / case study / issue
// appears in the sitemap automatically the moment its data entry is added.

import { PLATFORM_MODULES, MOBILE_EXPERIENCE } from '../data/modules.js';
import { INDUSTRIES } from '../data/industries.js';
import { POSTS } from '../data/blog.js';
import { ALL_CASES } from '../data/caseStudy.js';
import { ISSUES } from '../data/newsletter.js';
import { KB_CATEGORIES, KB_ARTICLES } from '../data/knowledgebase.js';

export const SITE_URL = 'https://upwon.in';

// Paths the crawler should be told to stay out of (also excluded from the
// sitemap). Personalised / transactional surfaces with no indexable value.
export const DISALLOW = ['/proposal'];

// Static, indexable pages. priority/changefreq are advisory hints to crawlers.
// Mirrors the static routes in App.jsx minus the non-canonical ones noted above.
const STATIC_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },

  // Awareness
  { path: '/what-is-upwon', changefreq: 'monthly', priority: 0.8 },
  { path: '/why-upwon', changefreq: 'monthly', priority: 0.8 },
  { path: '/resources', changefreq: 'weekly', priority: 0.6 },
  { path: '/blog', changefreq: 'weekly', priority: 0.7 },

  // Consideration — hubs
  { path: '/industries', changefreq: 'monthly', priority: 0.8 },
  { path: '/clients', changefreq: 'monthly', priority: 0.7 },
  { path: '/newsletter', changefreq: 'weekly', priority: 0.6 },
  { path: '/implementation', changefreq: 'monthly', priority: 0.7 },

  // Evaluation — tools & comparisons
  { path: '/roi-calculator', changefreq: 'monthly', priority: 0.7 },
  { path: '/self-evaluation', changefreq: 'monthly', priority: 0.6 },
  { path: '/compare/upwon-vs-sap', changefreq: 'monthly', priority: 0.7 },
  { path: '/compare/upwon-vs-tally', changefreq: 'monthly', priority: 0.7 },
  { path: '/compare/upwon-vs-others', changefreq: 'monthly', priority: 0.6 },

  // Decision
  { path: '/demo', changefreq: 'monthly', priority: 0.9 },
  { path: '/pricing', changefreq: 'monthly', priority: 0.8 },
  { path: '/free-audit', changefreq: 'monthly', priority: 0.7 },
  { path: '/partners', changefreq: 'monthly', priority: 0.6 },

  // Support / company
  { path: '/about', changefreq: 'monthly', priority: 0.6 },
  { path: '/careers', changefreq: 'monthly', priority: 0.5 },
  { path: '/contact', changefreq: 'yearly', priority: 0.5 },
  { path: '/legal', changefreq: 'yearly', priority: 0.3 },
];

// All 7 platforms + the Mobile Experience resolve under /products/:slug
// (see findProductBySlug in src/data/modules.js).
const productRoutes = () =>
  [...PLATFORM_MODULES, MOBILE_EXPERIENCE].map((p) => ({
    path: `/products/${p.slug}`,
    changefreq: 'monthly',
    priority: 0.9,
  }));

const industryRoutes = () =>
  INDUSTRIES.map((i) => ({
    path: `/industries/${i.slug}`,
    changefreq: 'monthly',
    priority: 0.8,
  }));

const blogRoutes = () =>
  POSTS.map((post) => ({
    path: `/blog/${post.slug}`,
    changefreq: 'monthly',
    priority: 0.6,
    // Posts carry a publish date — surface it as <lastmod> for freshness.
    lastmod: post.date,
  }));

const caseStudyRoutes = () =>
  ALL_CASES.map((c) => ({
    path: `/clients/${c.slug}`,
    changefreq: 'yearly',
    priority: 0.6,
  }));

// Newsletter: one URL per issue, plus one per story inside each issue.
const newsletterRoutes = () =>
  ISSUES.flatMap((issue) => [
    { path: `/newsletter/${issue.slug}`, changefreq: 'monthly', priority: 0.5 },
    ...(issue.stories ?? []).map((story) => ({
      path: `/newsletter/${issue.slug}/${story.slug}`,
      changefreq: 'yearly',
      priority: 0.5,
    })),
  ]);

// Knowledgebase: hub + one URL per category + one per article.
const knowledgebaseRoutes = () => [
  { path: '/knowledgebase', changefreq: 'weekly', priority: 0.7 },
  ...KB_CATEGORIES.map((c) => ({
    path: `/knowledgebase/${c.slug}`,
    changefreq: 'monthly',
    priority: 0.6,
  })),
  ...KB_ARTICLES.map((a) => ({
    path: `/knowledgebase/${a.category}/${a.slug}`,
    changefreq: 'monthly',
    priority: 0.6,
    lastmod: a.dateModified || a.datePublished,
  })),
];

// Build the full, de-duplicated list of indexable routes. Called by the build
// plugin and the dev middleware so both emit identical output.
export function getSitemapRoutes() {
  const all = [
    ...STATIC_ROUTES,
    ...productRoutes(),
    ...industryRoutes(),
    ...blogRoutes(),
    ...caseStudyRoutes(),
    ...newsletterRoutes(),
    ...knowledgebaseRoutes(),
  ];

  const seen = new Set();
  return all.filter((r) => {
    if (seen.has(r.path)) return false;
    seen.add(r.path);
    return true;
  });
}
