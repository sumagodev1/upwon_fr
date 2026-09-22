import { Head } from 'vite-react-ssg';
import {
  SITE_NAME,
  SITE_URL,
  LEGAL_NAME,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
  TWITTER_HANDLE,
  resolveOgImage,
} from '../../../seo/siteConfig.js';

// Per-page SEO. Renders <title>, meta description/keywords, robots, Open Graph,
// Twitter cards, canonical link and one-or-many JSON-LD blocks.
//
// IMPORTANT — why <Head> and not document.head mutation:
// This site is prerendered by vite-react-ssg, whose <Head> export *is*
// react-helmet-async's <Helmet>, wrapped in a HelmetProvider on both the client
// and the build-time prerender pass. Everything below therefore ships inside the
// STATIC HTML at build time — which is exactly what Google and AI crawlers
// (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, …) read first — and then
// updates correctly on client-side navigation. The previous useEffect-based
// head mutation only ran in the browser, so none of it was in the served HTML.
//
// Usage:
//   <Seo
//     title="UpWon ERP — Production control"
//     description="..."
//     keywords="food manufacturing erp, batch costing"
//     canonical="https://upwon.in/products/erp"
//     image="/og/erp.png"                 // absolute or root-relative; has fallback
//     type="article"                       // 'website' (default) | 'article'
//     jsonLd={[productJsonLd(...), faqJsonLd(...)]}
//     noindex                              // exclude from search engines
//   />

export default function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonical,
  image,
  type = 'website',
  jsonLd,
  noindex = false,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const ogImage = resolveOgImage(image);
  const robots = noindex ? 'noindex, nofollow' : 'index, follow';

  // Normalise JSON-LD to an array of truthy blocks. Each is emitted as its own
  // <script>; react-helmet-async serialises these into the prerendered <head>.
  const blocks = (Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []).filter(
    Boolean,
  );

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      {/* AI-crawler specific directives — explicitly let modern answer engines
          index and use the content for citations. */}
      <meta name="googlebot" content={robots} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph — LinkedIn / Facebook / WhatsApp */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="en_IN" />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content={String(OG_IMAGE_WIDTH)} />
      <meta property="og:image:height" content={String(OG_IMAGE_HEIGHT)} />
      <meta property="og:image:alt" content={fullTitle} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {TWITTER_HANDLE && <meta name="twitter:site" content={TWITTER_HANDLE} />}

      {/* Structured data — each block as its own ld+json script. */}
      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Head>
  );
}

// ---------------------------------------------------------------------------
// Reusable JSON-LD builders so pages stay terse. All emit schema.org markup.
// ---------------------------------------------------------------------------

export const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/upwon-logo.png`,
  parentOrganization: {
    '@type': 'Organization',
    name: LEGAL_NAME,
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nashik',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91-93568-98277',
      contactType: 'sales',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
  ],
};

// WebSite schema — enables Google sitelinks search box eligibility and helps
// AI crawlers anchor every page to the same site entity.
export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { '@type': 'Organization', name: SITE_NAME },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/blog?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export function productJsonLd({ name, description, slug }) {
  // No aggregateRating: we don't publish a verified review corpus, and the
  // brand guideline (SG01) forbids approximated / unsubstantiated numbers.
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, iOS, Android',
    description,
    url: `${SITE_URL}/products/${slug}`,
    publisher: { '@type': 'Organization', name: SITE_NAME },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: '0',
      description: 'Custom pricing — book a demo for a quote.',
    },
  };
}

export function industryJsonLd({ name, description, slug }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `UpWon for ${name}`,
    description,
    url: `${SITE_URL}/industries/${slug}`,
    provider: { '@type': 'Organization', name: SITE_NAME },
    areaServed: { '@type': 'Country', name: 'India' },
  };
}

// Article / knowledgebase schema — powers article rich results and gives AI
// engines clean authorship + dating signals to cite.
export function articleJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author = LEGAL_NAME,
  section,
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    ...(url ? { mainEntityOfPage: { '@type': 'WebPage', '@id': url } } : {}),
    ...(url ? { url } : {}),
    ...(image ? { image: resolveOgImage(image) } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified || datePublished
      ? { dateModified: dateModified || datePublished }
      : {}),
    ...(section ? { articleSection: section } : {}),
    author: { '@type': 'Organization', name: author },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/upwon-logo.png` },
    },
  };
}

// FAQPage schema — enables Google's FAQ rich result (SG03 §9.2). Pass the same
// [{ q, a }] array the on-page accordion renders so the markup never drifts
// from the visible content.
export function faqJsonLd(faqs) {
  if (!faqs || !faqs.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

// BreadcrumbList schema (SG03 §9.2). `items` = [{ name, to }] in order; the
// last item is treated as the current page.
export function breadcrumbJsonLd(items) {
  if (!items || !items.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      ...(it.to ? { item: `${SITE_URL}${it.to}` } : {}),
    })),
  };
}

// LocalBusiness schema for the Nashik HQ (SG03 §9.2) — powers Google Maps /
// local-pack eligibility.
export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'UpWon — Byte Elephants Technologies',
  url: SITE_URL,
  image: `${SITE_URL}/upwon-logo.png`,
  email: 'hello@upwon.in',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nashik',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  areaServed: 'IN',
  priceRange: '₹₹₹',
};
