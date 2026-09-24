import { useEffect, useState } from 'react';
import { m as motion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import { fetchErpComparisonSection } from '../../../../lib/erpPage.js';
import {
  FALLBACK_CATEGORIES,
  FALLBACK_COLUMNS,
  FALLBACK_COPY,
  FALLBACK_LEADER,
} from './alternativesContent.js';

/*
  "UPWON vs the Alternatives" — an honest, plain-language comparison against
  global ERPs and generic/open-source platforms. Matter-of-fact cell values
  (no star ratings, no "best in class"). The column header row is sticky, so it
  stays visible while the grouped rows scroll past (like the reference).
  Desktop: a table, one column per competitor. Mobile: grouped cards.

  The content is the CMS's — including the columns. This file renders whatever
  it is handed: cells are looked up against the column they belong to, so a
  column added in the admin panel appears here with nothing to change. The
  built-in grid in alternativesContent.js is only what the page shows before the
  fetch lands and whenever the API cannot be reached.
*/

const EASE = [0.22, 1, 0.3, 1];

/**
 * The grid template.
 *
 * The leader column is half again as wide as the rest, which share what is
 * left. An inline style rather than a class because the number of columns is
 * content: a fixed `grid-cols-[1.5fr_1fr_1fr_1fr]` would break the moment an
 * administrator added a fourth competitor.
 */
const gridStyle = (columnCount) => ({
  gridTemplateColumns: `1.5fr repeat(${columnCount}, 1fr)`,
});

function ColHeader({ col }) {
  return (
    <div className="flex flex-col">
      {/* Only drawn when one is set - the header is text today. */}
      {col.logo && (
        <img
          src={col.logo}
          alt={col.logoAlt || col.name}
          loading="lazy"
          decoding="async"
          className="mb-1.5 h-5 w-auto max-w-[120px] self-start object-contain"
        />
      )}
      <span
        className={`text-sm font-extrabold ${col.highlight ? 'text-orange-600' : 'text-navy-900'} md:text-base`}
      >
        {col.name}
      </span>
      {col.description && (
        <span className="mt-0.5 text-[14px] text-navy-500">{col.description}</span>
      )}
    </div>
  );
}

export default function AlternativesComparison() {
  const [copy, setCopy] = useState(FALLBACK_COPY);
  const [leader, setLeader] = useState(FALLBACK_LEADER);
  const [columns, setColumns] = useState(FALLBACK_COLUMNS);
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);

  /*
   * One read on mount, guarded inside the fetcher so the SSG build never makes
   * it. Copy and grid are swapped in separately: a section whose heading has
   * been edited but whose columns have not should show the new heading over the
   * built-in grid rather than an empty table.
   */
  useEffect(() => {
    let cancelled = false;
    fetchErpComparisonSection().then((section) => {
      if (cancelled || !section) return;
      setCopy({
        eyebrow: section.eyebrow,
        headingLines: section.headingLines,
        subtext: section.subtext,
      });
      if (section.leader.label) setLeader(section.leader);
      if (section.columns.length > 0) setColumns(section.columns);
      if (section.categories.length > 0) setCategories(section.categories);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Nothing published and nothing built in - render nothing rather than an
  // empty frame.
  if (columns.length === 0 || categories.length === 0) return null;

  const cols = gridStyle(columns.length);

  return (
    <section className="relative bg-cream-100 py-14 md:py-20">
      <div className="pointer-events-none absolute inset-0 grid-bg-light opacity-40" />

      <Container className="relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          {copy.eyebrow && <Eyebrow className="justify-center">{copy.eyebrow}</Eyebrow>}
 <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            <HeadingLines lines={copy.headingLines} />
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            {copy.subtext}
          </p>
        </motion.div>

        {/* ===== Desktop table (sticky header, scrolling rows) ===== */}
        <div className="mx-auto mt-12 hidden max-w-5xl rounded-2xl border border-cream-300 bg-white shadow-sm md:block">
          {/* Sticky header */}
          <div
            style={cols}
            className="grid sticky top-[112px] z-20 rounded-t-2xl bg-white shadow-[0_6px_16px_-12px_rgba(15,21,53,0.25)]"
          >
            <div className="flex flex-col justify-center p-5">
              <span className="text-sm font-extrabold text-navy-900 md:text-base">
                {leader.label}
              </span>
              {leader.description && (
                <span className="mt-0.5 text-[14px] text-navy-500">{leader.description}</span>
              )}
            </div>
            {columns.map((col) => (
              <div
                key={col.id}
                className={`p-5 ${col.highlight ? 'border-x border-orange-100 bg-orange-50' : ''}`}
              >
                <ColHeader col={col} />
              </div>
            ))}
          </div>

          {/* Groups */}
          {categories.map((group) => (
            <div key={group.name}>
              {/* Category label row — sticky under the header until the next group */}
              <div
                style={cols}
                className="grid sticky top-[186px] z-10 border-t border-cream-300 bg-white shadow-[0_5px_12px_-10px_rgba(15,21,53,0.3)]"
              >
                <div className="px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-navy-500">
                  {group.name}
                </div>
                {/* One filler per column, so the band spans the full width. */}
                {columns.map((col) => (
                  <div
                    key={col.id}
                    className={
                      col.highlight ? 'border-x border-orange-100 bg-orange-50' : 'bg-white'
                    }
                  />
                ))}
              </div>

              {/* Rows */}
              {group.rows.map((row) => (
                <div key={row.parameter} style={cols} className="grid border-t border-cream-300">
                  <div className="p-5 text-[14px] font-semibold leading-snug text-navy-900">
                    {row.parameter}
                  </div>
                  {columns.map((col) =>
                    col.highlight ? (
                      <div key={col.id} className="border-x border-orange-100 bg-orange-50 p-5">
                        <span className="flex items-start gap-2 text-[14px] font-semibold leading-snug text-navy-950">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                          {row.values[col.id] ?? ''}
                        </span>
                      </div>
                    ) : (
                      <div key={col.id} className="p-5 text-[14px] leading-snug text-navy-600">
                        {row.values[col.id] ?? ''}
                      </div>
                    ),
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* ===== Mobile — grouped cards ===== */}
        <div className="mt-10 space-y-8 md:hidden">
          {categories.map((group) => (
            <div key={group.name}>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-navy-400">
                {group.name}
              </p>
              <div className="space-y-4">
                {group.rows.map((row) => (
                  <motion.div
                    key={row.parameter}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="rounded-2xl border border-cream-300 bg-white p-5 shadow-sm"
                  >
                    <p className="text-[14px] font-bold leading-snug text-navy-950">
                      {row.parameter}
                    </p>
                    <div className="mt-3 space-y-2">
                      {columns.map((col) =>
                        col.highlight ? (
                          <div
                            key={col.id}
                            className="rounded-xl border border-orange-100 bg-orange-50/70 p-3"
                          >
                            <p className="text-[11px] font-bold uppercase tracking-wide text-orange-600">
                              {col.name}
                            </p>
                            <p className="mt-0.5 text-[14px] font-semibold text-navy-950">
                              {row.values[col.id] ?? ''}
                            </p>
                          </div>
                        ) : (
                          <div key={col.id} className="rounded-xl border border-cream-300 p-3">
                            <p className="text-[11px] font-bold uppercase tracking-wide text-navy-500">
                              {col.name}
                            </p>
                            <p className="mt-0.5 text-[14px] text-navy-600">
                              {row.values[col.id] ?? ''}
                            </p>
                          </div>
                        ),
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
