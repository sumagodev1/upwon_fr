import { Link } from 'react-router-dom';
import Container from '../Container/Container.jsx';

export default function MidCtaBand({
  title = 'Want to see UpWon working for your business?',
  subtitle = 'Your industry, your pain points, your specific operation — not a generic demo.',
  primaryLabel = 'Book Industry-Specific Demo',
  primaryTo = '/demo',
  // Secondary button is optional — omit `secondaryLabel` to render only the
  // primary CTA. No default label, so it doesn't appear unless explicitly set.
  secondaryLabel,
  secondaryTo = '/resources',
  accent,
}) {
  // accent is optional — defaults to brand orange
  const bgColor = accent || '#E85A2A';

  return (
    <section style={{ background: bgColor }} className="py-14 md:py-16">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-2xl">
 <h2 className="h-display text-[36.8px] text-balance text-white">
              {title}
            </h2>
            <p className="mt-2 text-sm text-white/80 md:text-base">{subtitle}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to={primaryTo}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-navy-950 transition-all hover:-translate-y-0.5 hover:shadow-enterprise"
              style={{ color: bgColor }}
            >
              {primaryLabel}
            </Link>
            {secondaryLabel && (
              <Link
                to={secondaryTo}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/40 bg-white/15 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-white/25"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
