// Responsive-image helpers for Unsplash-hosted photos.
//
// Every photo on the site is an Unsplash URL of the shape:
//   https://images.unsplash.com/photo-xxxx?auto=format&fit=crop&w=1280&q=70
// Unsplash already negotiates AVIF/WebP via `auto=format`, but it serves the
// single fixed `w=` width to every device — so phones download desktop-sized
// images. `srcSet()` rebuilds the same URL at several widths so the browser
// can pick the smallest one that fits the layout (paired with a `sizes` attr).
//
// Non-Unsplash URLs (logos, simple-icons, data URIs) pass through as
// `undefined` — callers just omit srcSet for those.

const DEFAULT_WIDTHS = [480, 768, 1024, 1366, 1600];

/**
 * Build a `srcSet` string of width-variants for an Unsplash URL.
 * Never upscales beyond the URL's own `w=` (its intended max).
 * Returns `undefined` for non-Unsplash / param-less URLs.
 */
export function srcSet(url, widths = DEFAULT_WIDTHS) {
  if (!url || !url.includes('images.unsplash.com') || !url.includes('?')) {
    return undefined;
  }
  const [base, query] = url.split('?');
  const max = Number(new URLSearchParams(query).get('w')) || widths[widths.length - 1];

  const chosen = widths.filter((w) => w < max);
  chosen.push(max); // always include the source's own width as the top stop

  return chosen
    .map((w) => {
      const p = new URLSearchParams(query); // preserves param order → w stays in place
      p.set('w', String(w));
      return `${base}?${p.toString()} ${w}w`;
    })
    .join(', ');
}
