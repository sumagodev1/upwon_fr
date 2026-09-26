import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo.jsx';
import { COMPANY } from '../../../data/company.js';
import { PLATFORM_NAV } from '../../../data/platformNav.js';
import { INDUSTRIES } from '../../../data/industries.js';
import { submitLead } from '../../../lib/leads.js';
import { fetchSocialMediaLinks } from '../../../lib/socialMediaLinks.js';
import { socialIcon } from '../../../lib/socialIcons.jsx';
import { useEffect, useState } from 'react';

// The contact lines and social buttons are authored in the admin panel's
// Social Media Links area (lib/socialMediaLinks.js). These two lists are what
// the footer shows until that read lands — on the prerendered HTML, during
// hydration, and whenever the API is unconfigured, unreachable or has nothing
// authored — so they reproduce the footer exactly as it read before the CMS,
// in the shape the lib returns.
const FALLBACK_CONTACT_LINES = [
  { kind: 'ADDRESS', icon: 'MapPin', text: COMPANY.contact.address, href: null },
  {
    kind: 'EMAIL',
    icon: 'Mail',
    text: COMPANY.contact.email,
    href: `mailto:${COMPANY.contact.email}`,
  },
  {
    kind: 'PHONE',
    icon: 'Phone',
    text: COMPANY.contact.phone,
    href: `tel:${COMPANY.contact.phone}`,
  },
  // Plain text, as it always was here; a published WEBSITE line is a link.
  { kind: 'WEBSITE', icon: 'Globe', text: COMPANY.contact.website, href: null },
];

// Placeholders with no destination, exactly as before the CMS. They disappear
// the moment an admin adds a real profile link (see hasSocialLinks).
const FALLBACK_SOCIAL_LINKS = [
  { label: 'LinkedIn', icon: 'Linkedin', url: '#' },
  { label: 'Twitter', icon: 'Twitter', url: '#' },
];

// Only real off-site URLs open a new tab; the '#' placeholders never do.
const isExternal = (href) => /^https?:\/\//i.test(href);

// Outcome-led "Why UpWon" column — Tebra leads its footer with this so the
// buyer sees the value, not the catalogue. Each link routes into the most
// relevant existing page; no new routes required.
const WHY_LINKS = [
  { label: 'Cut wastage 15-20%', to: '/why-upwon' },
  { label: 'Live in 30-45 days', to: '/implementation' },
  { label: 'FSSAI & GST compliance native', to: '/products/erp' },
  { label: 'Same-day secondary sales', to: '/products/sfa-dms' },
  { label: 'Run 200 outlets, one team', to: '/products/fms' },
  { label: 'CXO mobile dashboard', to: '/products/mobile-apps' },
  { label: 'Quantify the ROI', to: '/roi-calculator' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Null until the published lists land. The first render — which must match
  // the prerendered HTML — always uses the built-in lists.
  const [published, setPublished] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchSocialMediaLinks().then((links) => {
      if (!cancelled && links) setPublished(links);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // hasX false means nothing is authored, so the built-in list stays; true
  // with an empty array means every row was switched off, so none render.
  const contactLines = published?.hasContactLines
    ? published.contactLines
    : FALLBACK_CONTACT_LINES;
  const socialLinks = published?.hasSocialLinks ? published.socialLinks : FALLBACK_SOCIAL_LINKS;

  return (
    <footer className="relative overflow-hidden border-t border-navy-800 bg-navy-950 text-cream-100">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-navy-400/12 blur-3xl" />

      {/* Subtle India map watermark (SVG outline at low opacity) */}
      <div className="pointer-events-none absolute -right-32 top-1/2 -translate-y-1/2 opacity-[0.04]">
        <svg width="600" height="600" viewBox="0 0 100 100" fill="white">
          <circle cx="50" cy="50" r="40" />
        </svg>
      </div>

      <div className="container-max container-px relative">
        {/* Main 5-column — Tebra-style. Outcomes first ("Why UpWon"), then
            the catalogue (Products, Industries), then Company + Newsletter.
            Tablet (md): brand block spans both columns at top, then the 4 link
            columns fill a 2×2 grid beneath. Desktop (lg): full 5-column row. */}
        <div className="grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div className="md:col-span-2 lg:col-span-1">
            <Logo variant="light" />

            {/* <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream-100/80">
              UpWon is India's enterprise suite for food manufacturers, FMCG
              companies and franchise networks — built in Nashik, scaling
              globally.
            </p> */}

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream-100/80">
              India's enterprise suite for food, FMCG and franchise businesses. Built in Nashik, scaling globally.
            </p>

            {/* Two-brand line */}
            <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="text-[10.5px] uppercase tracking-[0.18em] text-cream-100/60">
                Powered by
              </p>
              <p className="mt-2 font-display text-sm font-bold text-white">
                {COMPANY.parent}
              </p>
              <p className="mt-0.5 text-[14px] text-teal-300">
                {COMPANY.parentTagline}
              </p>
            </div>

            {contactLines.length > 0 && (
              <ul className="mt-6 space-y-2.5 text-sm text-cream-100/80">
                {contactLines.map((line, index) => {
                  const Icon = socialIcon(line.icon);
                  return (
                    <li key={`${line.kind}-${index}`} className="flex items-start gap-2.5">
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                      {line.href ? (
                        <a
                          href={line.href}
                          className="hover:text-white"
                          {...(isExternal(line.href)
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                        >
                          {line.text}
                        </a>
                      ) : (
                        line.text
                      )}
                    </li>
                  );
                })}
              </ul>
            )}

            {socialLinks.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {socialLinks.map((link, index) => {
                  const Icon = socialIcon(link.icon);
                  return (
                    <a
                      key={`${link.icon}-${index}`}
                      href={link.url}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-cream-100/80 transition-colors hover:border-orange-500/40 hover:text-orange-500"
                      aria-label={link.label}
                      title={link.label}
                      {...(isExternal(link.url)
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Why UpWon — outcome-led column. Tebra puts this first because
              buyers scan footers for value before they scan for products. */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white">
              Why UpWon
            </h4>
            <ul className="space-y-2.5">
              {WHY_LINKS.map((w) => (
                <li key={w.label}>
                  <Link
                    to={w.to}
                    className="text-sm text-cream-100/70 transition-colors hover:text-white"
                  >
                    {w.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products column */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white">
              Products
            </h4>
            <ul className="space-y-2.5">
              {PLATFORM_NAV.map((m) => (
                <li key={m.id}>
                  <Link
                    to={`/products/${m.slug}`}
                    className="text-sm text-cream-100/70 transition-colors hover:text-white"
                  >
                    {m.code}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries column */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white">
              Industries
            </h4>
            <ul className="space-y-2.5">
              {INDUSTRIES.slice(0, 8).map((ind) => (
                <li key={ind.id}>
                  <Link
                    to={`/industries/${ind.slug}`}
                    className="text-sm text-cream-100/70 transition-colors hover:text-white"
                  >
                    {ind.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Newsletter column */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white">
              Company
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/about" className="text-sm text-cream-100/70 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/clients" className="text-sm text-cream-100/70 hover:text-white">
                  Clients
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm text-cream-100/70 hover:text-white">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-sm text-cream-100/70 hover:text-white">
                  Partner Program
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-cream-100/70 hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-cream-100/70 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-7 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-orange-400">
                Newsletter
              </p>
              {subscribed ? (
                <p className="mt-3 text-[14px] text-emerald-300">You're in. Watch your inbox.</p>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitLead('newsletter_footer', { email });
                    setSubscribed(true);
                  }}
                  className="mt-3"
                >
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      required
                      className="w-full rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-[14px] text-white placeholder-cream-100/40 outline-none focus:border-orange-500/40"
                    />
                    <button
                      type="submit"
                      className="rounded-md bg-orange-500 px-3 py-2 text-[14px] font-semibold text-white hover:bg-orange-600"
                    >
                      Join
                    </button>
                  </div>
                  {/* <p className="mt-2 text-[14px] text-cream-100/50">
                    Monthly food industry insights. No spam.
                  </p> */}
                  <p className="mt-2 text-[14px] text-cream-100/50">
                    Monthly food & FMCG insights. No spam.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Tagline & bottom strip */}
        <div className="border-t border-white/[0.08] py-6 text-center">
          <p className="font-display text-lg italic text-orange-400 md:text-xl">
            Outdo. Scale. Win.
          </p>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] py-6 text-[14px] text-cream-100/50 md:flex-row md:items-center">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>© {new Date().getFullYear()} {COMPANY.parent}</span>
            <span className="hidden h-3 w-px bg-white/10 md:inline-block" />
            <span>ISO-aligned · CMM Level 3 process rigour</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/legal" className="hover:text-white">Privacy</Link>
            <Link to="/legal" className="hover:text-white">Terms</Link>
            <Link to="/legal" className="hover:text-white">Security</Link>
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
