// Single source of truth for site-wide SEO constants. Imported by the <Seo>
// component, the schema helpers, the sitemap generator and the knowledgebase.
// Keep this plain JS (no JSX / framer imports) so build-time tooling
// (scripts/sitemap-plugin.js via esbuild) can import it safely.

export const SITE_NAME = 'UpWon';
export const SITE_URL = 'https://upwon.in';

// Brand legal / parent attribution — reused in Organization schema + llms.txt.
export const LEGAL_NAME = 'Byte Elephants Technologies';

export const DEFAULT_TITLE =
  'UpWon — Outdo. Scale. Win. | Enterprise Suite for Food & FMCG';

export const DEFAULT_DESCRIPTION =
  "UpWon — India's enterprise suite for food manufacturers, FMCG companies and franchise networks. Built for Food. Proven for FMCG. Outdo. Scale. Win.";

// Default keywords. Per-page <Seo keywords="..."> overrides this. Kept tight —
// keyword meta is low-weight for Google but still parsed by some AI crawlers.
export const DEFAULT_KEYWORDS =
  'food ERP, FMCG software, food manufacturing ERP, distribution management system, SFA DMS, FSSAI compliance software, batch traceability, franchise management software, India';

// --- Open Graph / featured-image system ----------------------------------
// Social cards want a 1200×630 image. Drop a real banner at
// public/og-default.png and it becomes the sitewide fallback automatically.
// Until then we fall back to the brand logo so previews are never broken.
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;
// Safe fallback that is guaranteed to exist in /public today.
export const FALLBACK_OG_IMAGE = `${SITE_URL}/upwon-logo.png`;

export const TWITTER_HANDLE = '@upwon'; // update when the handle is live

// Resolve an absolute, crawlable image URL from a page-level `image` prop.
// Accepts an absolute URL, a root-relative path ("/og/erp.png"), or nothing.
export function resolveOgImage(image) {
  if (!image) return DEFAULT_OG_IMAGE;
  if (/^https?:\/\//i.test(image)) return image;
  return `${SITE_URL}${image.startsWith('/') ? '' : '/'}${image}`;
}

// Resolve an absolute canonical URL from a path or absolute URL.
export function absoluteUrl(pathOrUrl) {
  if (!pathOrUrl) return SITE_URL;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;
}
