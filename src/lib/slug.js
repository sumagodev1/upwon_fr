// SEO-friendly slug utilities. Used by the knowledgebase (and any future
// data-driven content) so URLs stay lowercase, hyphenated and canonical.

// Turn an arbitrary string into a clean URL slug:
//   "How to Track Stock!" → "how-to-track-stock"
//   "Inventory & Costing"  → "inventory-costing"
export function slugify(input) {
  return String(input)
    .normalize('NFKD') // split accented chars so diacritics can be stripped
    .replace(/[̀-ͯ]/g, '') // remove diacritic marks
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // drop anything that isn't alnum/space/hyphen
    .replace(/[\s_]+/g, '-') // spaces + underscores → single hyphen
    .replace(/-+/g, '-') // collapse repeated hyphens
    .replace(/^-+|-+$/g, ''); // trim leading/trailing hyphens
}

// Deduplicate slugs within a set. Given a slug already seen, appends -2, -3, …
// Pass a Set you reuse across a batch (e.g. when generating from titles).
export function uniqueSlug(base, seen = new Set()) {
  let slug = slugify(base);
  if (!slug) slug = 'untitled';
  let candidate = slug;
  let n = 2;
  while (seen.has(candidate)) {
    candidate = `${slug}-${n++}`;
  }
  seen.add(candidate);
  return candidate;
}
