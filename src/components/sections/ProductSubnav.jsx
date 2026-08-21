import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Sticky in-page sub-nav for product microsites — brief §2.2.
// Appears once the user scrolls past the hero slider. Anchor links jump to
// the named sections on the product page. Always-visible Book Demo button
// preserves conversion intent through long scrolls.
const SECTIONS = [
  { id: 'workflow', label: 'Workflow' },
  { id: 'overview', label: 'Live Demo' },
  { id: 'industries', label: 'Use Cases' },
  { id: 'roi', label: 'ROI' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'faq', label: 'FAQ' },
];

export default function ProductSubnav({ productCode }) {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState('overview');

  useEffect(() => {
    // Show once user has scrolled past roughly one viewport (past the hero).
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Track which section is in view so the corresponding link gets the
    // orange underline indicator.
    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!elements.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{ top: 'calc(var(--ann-h, 0px) + 84px)' }}
      className={`fixed inset-x-0 z-40 border-b border-cream-300 bg-white/95 backdrop-blur transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
      aria-hidden={!visible}
    >
      <div className="container-max container-px">
        <div className="flex items-center gap-1 overflow-x-auto mask-fade-lr">
          {productCode && (
            <span className="mr-3 shrink-0 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-500">
              {productCode}
            </span>
          )}
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`relative inline-flex shrink-0 items-center whitespace-nowrap px-3.5 py-3 text-[14px] font-medium font-display transition-colors ${
                active === s.id ? 'text-navy-950' : 'text-navy-600 hover:text-navy-900'
              }`}
            >
              {s.label}
              {active === s.id && (
                <span className="absolute inset-x-3 -bottom-px h-0.5 bg-orange-500" />
              )}
            </a>
          ))}
          <Link
            to="/demo"
            className="ml-auto shrink-0 rounded-full bg-orange-500 px-4 py-1.5 text-[14px] font-semibold text-white shadow-sm transition-all hover:bg-orange-600 hover:shadow"
          >
            Book Demo
          </Link>
        </div>
      </div>
    </div>
  );
}
