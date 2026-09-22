import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { m as motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Menu,
  X,
  ChevronDown,
  PhoneCall,
  Factory,
  Building2,
  Store,
  Truck,
  ChefHat,
  Globe2,
  Boxes,
  ShieldCheck,
  Snowflake,
  Activity,
  Receipt,
  Calculator,
  Rocket,
  Sparkles,
  Trophy,
  Scale,
  Newspaper,
  ClipboardCheck,
  Stethoscope,
  FileText,
  LayoutGrid,
} from 'lucide-react';
import Logo from '../Logo/Logo.jsx';
import { PLATFORM_NAV } from '../../../data/platformNav.js';
import { INDUSTRIES } from '../../../data/industries.js';
import { COMPANY } from '../../../data/company.js';

// Sticky-header toll-free. Display the formatted number; strip non-digits
// for the tel: handler so dialers parse it cleanly.
const TOLL_FREE_DISPLAY = COMPANY.contact.tollFree;
const TOLL_FREE_TEL = TOLL_FREE_DISPLAY.replace(/\D/g, '');

// Mega-menu copy for each product module — Tebra-style benefit sentences
// (matches the Industries dropdown treatment). Keyed by slug so we don't
// fork modules.js, where `short` is consumed elsewhere as a category chip.
const PRODUCT_MEGA_DESCS = {
  erp:
    'Batch production, recipe BOM, multi-plant control — with FSSAI and GST built in.',
  'sfa-dms':
    'Beat plans, secondary sales and distributor stock visible on one live dashboard.',
  fms:
    'Franchisee onboarding, royalty, outlet POS and Swiggy / Zomato — every store in sync.',
  pos:
    'Offline-first counter billing with native Swiggy, Zomato and loyalty in one tablet.',
  hrms:
    'Multi-state payroll, biometric attendance, PF / ESIC / TDS — fully automated.',
  wms:
    'FEFO putaway, expiry alerts and temperature zones — built for perishable warehouses.',
  'vendor-portal':
    'Supplier onboarding, RFQs, PO confirmation and quality self-certification, in one place.',
  'mobile-apps':
    'Role-specific apps for CXOs, plant security, outlet audits and field sales.',
};

// Industry mega-menu copy. The `tag` field on each industry is just a
// classification label ("Featured", etc.) — these are the descriptive
// one-liners shown in the dropdown.
const INDUSTRY_MEGA_DESCS = {
  bakery:
    'Recipe scaling, batch costs, expiry control, outlet POS — purpose-built for bakery chains.',
  dairy:
    'Raw milk to finished SKU — fat tracking, batch QC, cold-chain and FSSAI milk compliance.',
  'fmcg-distribution':
    'Beat plans, secondary sales same-day, distributor stock and scheme leakage — under control.',
  'qsr-franchise':
    'Outlet ordering, central kitchen, royalty and aggregator orders — every outlet, one platform.',
  'sweets-namkeen':
    'Heritage SKU recipes, festive ramps, counter POS — built around traditional Indian sweet shops.',
  'spices-agro':
    'Multi-grade procurement, blending, moisture / aflatoxin control, export-ready documentation.',
  'food-processing':
    'Process manufacturing, allergen flagging, multi-plant yield tracking and statutory compliance.',
  beverage:
    'Carbonation, blending, cold-chain dispatch — beverage-specific production and route control.',
  'non-food-fmcg':
    'Personal care, home and hygiene FMCG — same SFA / DMS engine, same secondary-sales discipline.',
  'engineering-manufacturing':
    'Discrete manufacturing — BOM, work-order, costing and quality, on the UpWon ERP backbone.',
};

// Axis 2 of the Platform mega-menu — "By Business Type". Mirrors Tebra's
// "Independent Practices / Billing Companies" column: the same catalogue,
// re-sliced by the buyer's self-identification. Destinations point at the
// most relevant existing page (no new routes required).
const PLATFORM_BY_BUSINESS = [
  { label: 'Single-plant manufacturers', desc: 'Start with ERP, add as you grow', to: '/products/erp', icon: Factory },
  { label: 'Multi-plant operations', desc: 'One login, every plant', to: '/platform', icon: Building2 },
  { label: 'Franchise & QSR chains', desc: 'Run every outlet from one HQ', to: '/products/fms', icon: ChefHat },
  { label: 'FMCG distributors', desc: 'Secondary sales same-day', to: '/products/sfa-dms', icon: Truck },
  { label: 'Cloud kitchens', desc: 'Multi-brand, multi-outlet', to: '/products/pos', icon: Store },
  { label: 'Exporters & cold chain', desc: 'FEFO + temperature zones', to: '/products/wms', icon: Globe2 },
];

// Axis 3 — "Popular Features". Tebra's third column deep-links straight to
// the highest-converting topics. We do the same: every entry routes to the
// product page where that capability lives.
const PLATFORM_POPULAR = [
  { label: 'Batch traceability', to: '/products/erp', icon: Boxes },
  { label: 'FSSAI compliance', to: '/products/erp', icon: ShieldCheck },
  { label: 'FEFO inventory', to: '/products/wms', icon: Snowflake },
  { label: 'Recipe & BOM costing', to: '/products/erp', icon: Receipt },
  { label: 'Swiggy / Zomato POS', to: '/products/pos', icon: Store },
  { label: 'BizPulse CEO app', to: '/products/mobile-apps', icon: Activity },
  { label: 'ROI Calculator', to: '/roi-calculator', icon: Calculator },
  { label: 'Live in 30-45 days', to: '/implementation', icon: Rocket },
];

// Featured CTA panel that pins to the right of every mega menu — the Tebra
// pattern of "if you don't know where to start, do this instead". Routes to
// the self-evaluation teaser since that's our equivalent of Tebra's
// "Efficiency Grader" tool.
const PLATFORM_FEATURED = {
  eyebrow: "Not sure where to start?",
  title: 'Take the 2-minute self-evaluation',
  desc: 'Answer 8 questions. We tell you which platform fits — and the ROI you should expect.',
  cta: { label: 'Start evaluation', to: '/self-evaluation' },
};

const INDUSTRIES_FEATURED = {
  eyebrow: 'See your industry, live',
  title: 'Book an industry-specific demo',
  desc: 'A 30-minute walkthrough mapped to your sub-vertical — bakery, dairy, spices, QSR or your category.',
  cta: { label: 'Book a demo', to: '/demo' },
};

// Resources dropdown — Tebra-style. Each item carries an icon + a 2-line
// benefit description (matches the By Module and Industries columns).
const RESOURCES = [
  {
    label: 'Blog',
    to: '/blog',
    icon: FileText,
    desc: 'Operator playbooks across ERP, distribution, warehouse, HR and compliance.',
  },
  {
    label: 'Knowledgebase',
    to: '/knowledgebase',
    icon: LayoutGrid,
    desc: 'Practical how-to guides on inventory, FSSAI compliance and FMCG distribution.',
  },
  {
    label: 'ROI Calculator',
    to: '/roi-calculator',
    icon: Calculator,
    desc: 'Quantify UpWon\'s rupee impact for your operations — 2 minutes, 8 inputs.',
  },
  {
    label: 'Self-Evaluation',
    to: '/self-evaluation',
    icon: ClipboardCheck,
    desc: '8 questions about your operations. We tell you which platform fits — and where to start.',
  },
  {
    label: 'Free Operations Audit',
    to: '/free-audit',
    icon: Stethoscope,
    desc: 'Share your setup. Get a one-page audit of the top 3 leaks and the highest-ROI fix.',
  },
  {
    label: 'Implementation Process',
    to: '/implementation',
    icon: Rocket,
    desc: 'How UpWon goes live in 30-45 days — playbook, milestones and the team behind it.',
  },
  {
    label: 'UpWon vs SAP',
    to: '/compare/upwon-vs-sap',
    icon: Scale,
    desc: 'Side-by-side on cost, time-to-go-live, food fit and multi-plant — honest comparison.',
  },
  {
    label: 'UpWon vs Tally + Zoho',
    to: '/compare/upwon-vs-tally',
    icon: Scale,
    desc: 'When you outgrow Tally — what breaks, what UpWon gives you instead.',
  },
  {
    label: 'Client Success Stories',
    to: '/clients',
    icon: Trophy,
    desc: 'Named clients, real numbers — Monginis, Kaka Halwai, U2 Cake, BrownBear and more.',
  },
  {
    label: 'Operations Insider',
    to: '/newsletter',
    icon: Newspaper,
    desc: 'Monthly newsletter on food ops, product releases, customer wins and industry shifts.',
  },
];

const RESOURCES_FEATURED = {
  eyebrow: 'Free download',
  title: "The Food Ops Playbook",
  desc: '32-page guide on running batch production, distribution and franchise outlets on one platform.',
  cta: { label: 'Get the PDF', to: '/resources' },
};

// Routes whose hero is still on a dark navy background — on these pages the
// navbar text must be light when the user hasn't scrolled past the hero.
// Trailing slashes tolerated so /industries/bakery/ works the same as
// /industries/bakery. Homepage hero is light grey now — intentionally NOT here.
const DARK_HERO_PATTERNS = [
  /^\/products\/[^/]+\/?$/,    // /products/erp(/), /products/fms(/), etc
  /^\/industries\/[^/]+\/?$/,  // /industries/bakery(/), /industries/dairy(/), etc
  // /newsletter, /newsletter/<issue>, and /newsletter/<issue>/<story> all
  // have dark hero — the regex allows up to 2 trailing path segments.
  /^\/newsletter(\/[^/]+){0,2}\/?$/,
  // Blog POST pages (/blog/<slug>) have a dark navy hero. The /blog listing
  // itself uses the light PageHero, so it is intentionally excluded.
  /^\/blog\/[^/]+\/?$/,
  // Knowledgebase hub + category + article all use a dark navy hero (same
  // treatment as blog posts), so the navbar must run in dark mode over them.
  // Allows up to 2 trailing segments: /knowledgebase, /knowledgebase/<cat>,
  // /knowledgebase/<cat>/<article>.
  /^\/knowledgebase(\/[^/]+){0,2}\/?$/,
  // These PageHero pages now run a photo slideshow under a dark navy scrim
  // (white hero text), so the navbar must sit in dark mode over them too.
  /^\/why-upwon\/?$/,
  /^\/clients\/?$/,
  /^\/resources\/?$/,
  /^\/about\/?$/,
];

function isDarkHeroRoute(pathname) {
  return DARK_HERO_PATTERNS.some((re) => re.test(pathname));
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { pathname } = useLocation();

  const onDarkHero = useMemo(() => isDarkHeroRoute(pathname), [pathname]);
  // When sitting on top of a dark hero AND not scrolled, the navbar is "in dark mode"
  const inDarkMode = onDarkHero && !scrolled;

  // Active-state detection for each dropdown — highlights the dropdown button
  // (with the same orange underline) when the user is on one of its children.
  // Top-level NavLinks (Why UpWon / Clients / Insider / About) handle their
  // own active state via React Router, so we exclude those from these checks.
  const isProductsActive =
    pathname.startsWith('/products') || pathname === '/platform';
  const isIndustriesActive = pathname.startsWith('/industries');
  const isResourcesActive =
    pathname.startsWith('/compare') ||
    pathname === '/resources' ||
    pathname === '/roi-calculator' ||
    pathname === '/implementation' ||
    pathname === '/case-studies' ||
    pathname === '/free-audit';

  useEffect(() => {
    // On dark-hero routes (industry/product/newsletter), stay transparent
    // until the user scrolls past most of the hero — otherwise the light
    // bg-white/90 + cream border briefly washes the hero with a light strip.
    // On other routes, trigger as soon as we have a tiny bit of scroll.
    const onScroll = () => {
      const threshold = isDarkHeroRoute(pathname)
        ? Math.max(window.innerHeight * 0.6, 320)
        : 20;
      setScrolled(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <header
      style={{ top: 'var(--ann-h, 0px)' }}
      className={`fixed inset-x-0 z-50 transition-all duration-500 ${scrolled
          ? 'border-b border-cream-300 bg-white/90 backdrop-blur-xl shadow-sm'
          : inDarkMode
            // On dark-hero routes BEFORE the visitor scrolls, the navbar sits
            // over the hero photo. If the photo has bright zones (e.g. the
            // dairy / strawberry hero), white nav text washes out. A subtle
            // dark gradient scrim + light backdrop blur keeps the links
            // readable on any hero image without making the navbar feel
            // opaque or visually heavy.
            ? 'bg-gradient-to-b from-navy-950/55 via-navy-950/25 to-transparent backdrop-blur-[2px]'
            : 'bg-transparent'
        }`}
    >
      <div className="container-max container-px">
        <nav className="relative flex h-[84px] items-center justify-between">
          <Link
            to="/"
            className="group transition-transform duration-300 hover:scale-[1.02]"
            aria-label="UpWon home"
          >
            <Logo variant={inDarkMode ? 'light' : 'dark'} size="lg" />
          </Link>

          <ul className="hidden flex-1 items-center justify-center gap-1 lg:flex">
            {/* Products dropdown */}
            <li
              onMouseEnter={() => setActiveDropdown('products')}
              onMouseLeave={() => setActiveDropdown(null)}
            // Products mega-menu centers on the nav (≈ viewport centre), so its
            // panel must anchor to the relative <nav>, not this <li>. Dropping
            // `relative` here lets the absolute panel below resolve to <nav>.
            // className="relative"
            >
              <button className={dropdownBtnCls(inDarkMode, isProductsActive)}>
                Products
                <ChevronDown className="h-3 w-3" />
              </button>
              <AnimatePresence>
                {activeDropdown === 'products' && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    // Centered under the nav (≈ viewport centre) + top spacing.
                    // Centering uses framer's own `x: '-50%'` (a transform framer
                    // controls, so it isn't overridden like Tailwind -translate-x-1/2,
                    // and it's a % of the ACTUAL rendered width so it stays centred
                    // even when the panel clamps to the viewport on narrow screens).
                    // `-mt-6` keeps the transparent hover area touching the button;
                    // `pt-9` is the visible spacing.
                    // className="absolute left-0 top-full pt-3 2xl:left-1/2 2xl:-translate-x-1/2"
                    className="absolute left-1/2 top-full -mt-6 pt-9"
                    style={{ x: '-50%' }}
                  >
                    <div className="grid w-[1040px] 2xl:w-[1200px] max-w-[calc(100vw-2rem)] grid-cols-12 gap-0 overflow-hidden rounded-xl border border-cream-300 bg-white shadow-enterprise-lg">
                      {/* Axis 1 — By Module (Tebra-style benefit copy, matches Industries) */}
                      <div className="col-span-4 border-r border-cream-200 p-4">
                        <MegaHeading>By Module</MegaHeading>
                        <div className="mt-2 grid grid-cols-1 gap-0.5">
                          {PLATFORM_NAV.map((m) => (
                            <MegaItem
                              key={m.id}
                              to={`/products/${m.slug}`}
                              icon={m.icon}
                              label={m.code}
                              desc={PRODUCT_MEGA_DESCS[m.slug] || m.short}
                              descLines={2}
                              accent={m.accent}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Axis 2 — By Business Type */}
                      <div className="col-span-3 border-r border-cream-200 p-4">
                        <MegaHeading>By Business Type</MegaHeading>
                        <div className="mt-2 grid grid-cols-1 gap-0.5">
                          {PLATFORM_BY_BUSINESS.map((b) => (
                            <MegaItem
                              key={b.label}
                              to={b.to}
                              icon={b.icon}
                              label={b.label}
                              desc={b.desc}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Axis 3 — Popular Features (deep links) */}
                      <div className="col-span-2 border-r border-cream-200 p-4">
                        <MegaHeading>Popular</MegaHeading>
                        <ul className="mt-2 space-y-0.5">
                          {PLATFORM_POPULAR.map((p) => (
                            <li key={p.label}>
                              <Link
                                to={p.to}
                                className="group flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-cream-100"
                              >
                                <p.icon className="h-3.5 w-3.5 shrink-0 text-orange-600" />
                                <span className="text-[14px] font-medium leading-tight text-navy-800 group-hover:text-navy-950">
                                  {p.label}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Featured CTA — Tebra's right-rail promo */}
                      <FeaturedPanel panel={PLATFORM_FEATURED} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Industries dropdown */}
            <li
              onMouseEnter={() => setActiveDropdown('industries')}
              onMouseLeave={() => setActiveDropdown(null)}
            // Industries mega-menu centers on the nav (≈ viewport centre), so its
            // panel must anchor to the relative <nav>, not this <li>. Dropping
            // `relative` here lets the absolute panel below resolve to <nav>.
            // className="relative"
            >
              <button className={dropdownBtnCls(inDarkMode, isIndustriesActive)}>
                Industries
                <ChevronDown className="h-3 w-3" />
              </button>
              <AnimatePresence>
                {activeDropdown === 'industries' && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    // Centered under the nav (≈ viewport centre) + top spacing.
                    // Centering uses framer's own `x: '-50%'` (a transform framer
                    // controls, so it isn't overridden like Tailwind -translate-x-1/2,
                    // and it's a % of the ACTUAL rendered width so it stays centred
                    // even when the panel clamps to the viewport on narrow screens).
                    // `-mt-6` keeps the transparent hover area touching the button;
                    // `pt-9` is the visible spacing.
                    // className="absolute left-0 top-full pt-3 2xl:left-1/2 2xl:-translate-x-1/2"
                    className="absolute left-1/2 top-full -mt-6 pt-9"
                    style={{ x: '-50%' }}
                  >
                    <div className="grid w-[940px] 2xl:w-[1080px] max-w-[calc(100vw-2rem)] grid-cols-12 gap-0 overflow-hidden rounded-xl border border-cream-300 bg-white shadow-enterprise-lg">
                      <div className="col-span-9 border-r border-cream-200 p-4">
                        <MegaHeading>Industries we serve</MegaHeading>
                        <div className="mt-2 grid grid-cols-2 gap-0.5">
                          {INDUSTRIES.map((ind) => (
                            <MegaItem
                              key={ind.id}
                              to={
                                ind.name === 'Bakery & Confectionery'
                                  ? '/industries/bakery-and-confectionery'
                                  : `/industries/${ind.slug}`
                              }
                              icon={ind.icon}
                              label={ind.name}
                              desc={INDUSTRY_MEGA_DESCS[ind.slug] || ind.tag}
                              descLines={2}
                            />
                          ))}
                        </div>
                      </div>
                      <FeaturedPanel panel={INDUSTRIES_FEATURED} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            <li>
              <NavLink to="/why-upwon" className={navLinkCls(inDarkMode)}>
                Why UpWon
              </NavLink>
            </li>
            <li>
              <NavLink to="/clients" className={navLinkCls(inDarkMode)}>
                Clients
              </NavLink>
            </li>
            <li>
              <NavLink to="/newsletter" className={navLinkCls(inDarkMode)}>
                Insider
              </NavLink>
            </li>

            {/* Resources dropdown */}
            <li
              onMouseEnter={() => setActiveDropdown('resources')}
              onMouseLeave={() => setActiveDropdown(null)}
            // Resources mega-menu centers on the nav (≈ viewport centre), so its
            // panel must anchor to the relative <nav>, not this <li>. Dropping
            // `relative` here lets the absolute panel below resolve to <nav>.
            // className="relative"
            >
              <button className={dropdownBtnCls(inDarkMode, isResourcesActive)}>
                Resources
                <ChevronDown className="h-3 w-3" />
              </button>
              <AnimatePresence>
                {activeDropdown === 'resources' && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    // Centered under the nav (≈ viewport centre) + top spacing.
                    // Centering uses framer's own `x: '-50%'` (a transform framer
                    // controls, so it isn't overridden like Tailwind -translate-x-1/2,
                    // and it's a % of the ACTUAL rendered width so it stays centred
                    // even when the panel clamps to the viewport on narrow screens).
                    // `-mt-6` keeps the transparent hover area touching the button;
                    // `pt-9` is the visible spacing.
                    // className="absolute right-0 top-full pt-3"
                    className="absolute left-1/2 top-full -mt-6 pt-9"
                    style={{ x: '-50%' }}
                  >
                    <div className="grid w-[820px] max-w-[calc(100vw-2rem)] grid-cols-12 gap-0 overflow-hidden rounded-xl border border-cream-300 bg-white shadow-enterprise-lg">
                      <div className="col-span-9 border-r border-cream-200 p-4">
                        <div className="flex items-center justify-between pr-2">
                          <MegaHeading>Resources</MegaHeading>
                          <Link
                            to="/resources"
                            className="inline-flex items-center gap-1 text-[14px] font-semibold text-orange-600 transition-colors hover:text-orange-700"
                          >
                            <LayoutGrid className="h-3 w-3" />
                            View resources hub
                          </Link>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-0.5">
                          {RESOURCES.map((r) => (
                            <MegaItem
                              key={r.to}
                              to={r.to}
                              icon={r.icon}
                              label={r.label}
                              desc={r.desc}
                              descLines={2}
                            />
                          ))}
                        </div>
                      </div>
                      <FeaturedPanel panel={RESOURCES_FEATURED} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            <li>
              <NavLink to="/about" className={navLinkCls(inDarkMode)}>
                About
              </NavLink>
            </li>
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            {/* Toll-free — click-to-call. Now safe at all widths because
                the centered nav is a flex-1 sibling, not an absolute overlay. */}
            <a
              href={`tel:${TOLL_FREE_TEL}`}
              className={`group hidden items-center gap-2 rounded-md border px-3 py-2 text-[14px] font-semibold transition-colors xl:inline-flex ${inDarkMode
                  ? 'border-white/20 bg-white/[0.06] text-white hover:bg-white/[0.10]'
                  : 'border-cream-300 bg-white text-navy-900 hover:border-orange-300 hover:bg-orange-50'
                }`}
              aria-label={`Call ${COMPANY.contact.tollFreeLabel || 'Sales'} toll-free ${TOLL_FREE_DISPLAY}`}
            >
              <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-orange-500/15 text-orange-600">
                <PhoneCall className="h-3.5 w-3.5" />
                <span className="absolute inset-0 -z-0 rounded-full bg-orange-500/30 opacity-0 transition-opacity duration-300 group-hover:animate-ping group-hover:opacity-100" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className={`text-[9px] font-semibold uppercase tracking-[0.16em] ${inDarkMode ? 'text-white/70' : 'text-orange-600'
                  }`}>
                  Toll-Free · {COMPANY.contact.tollFreeLabel || 'Sales'}
                </span>
                <span className="num-display text-[14px] font-bold">{TOLL_FREE_DISPLAY}</span>
              </span>
            </a>

            <Link to="/demo" className="btn-primary !py-2.5 !text-[14px]">
              Book Free Demo
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <button
            onClick={() => setOpen((o) => !o)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-md border lg:hidden ${inDarkMode
                ? 'border-white/20 bg-white/[0.06] text-white'
                : 'border-cream-300 bg-white text-navy-950'
              }`}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden border-t border-cream-300 bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container-max container-px py-6 max-h-[80vh] overflow-y-auto">
              <MobileGroup title="Platform · By Module">
                {PLATFORM_NAV.map((m) => (
                  <MobileLink
                    key={m.id}
                    to={`/products/${m.slug}`}
                    accent={m.accent}
                  >
                    {m.code}
                  </MobileLink>
                ))}
              </MobileGroup>

              <MobileGroup title="Platform · By Business">
                {PLATFORM_BY_BUSINESS.map((b) => (
                  <MobileLink key={b.label} to={b.to}>
                    {b.label}
                  </MobileLink>
                ))}
              </MobileGroup>

              <MobileGroup title="Popular Features">
                {PLATFORM_POPULAR.map((p) => (
                  <MobileLink key={p.label} to={p.to}>
                    {p.label}
                  </MobileLink>
                ))}
              </MobileGroup>

              <MobileGroup title="Industries">
                {INDUSTRIES.map((ind) => (
                  <MobileLink key={ind.id} to={`/industries/${ind.slug}`}>
                    {ind.name}
                  </MobileLink>
                ))}
              </MobileGroup>

              <MobileGroup title="Resources">
                <MobileLink to="/resources">Resources Hub</MobileLink>
                {RESOURCES.map((r) => (
                  <MobileLink key={r.to} to={r.to}>
                    {r.label}
                  </MobileLink>
                ))}
              </MobileGroup>

              <MobileGroup title="Company">
                <MobileLink to="/why-upwon">Why UpWon</MobileLink>
                <MobileLink to="/clients">Clients</MobileLink>
                <MobileLink to="/newsletter">Insider · Newsletter</MobileLink>
                <MobileLink to="/about">About</MobileLink>
                <MobileLink to="/partners">Partner Program</MobileLink>
                <MobileLink to="/contact">Contact</MobileLink>
              </MobileGroup>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={`tel:${TOLL_FREE_TEL}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-orange-300 bg-orange-50 px-5 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-orange-100"
                >
                  <PhoneCall className="h-4 w-4 text-orange-600" />
                  Call Toll-Free · <span className="num-display">{TOLL_FREE_DISPLAY}</span>
                </a>
                <Link to="/demo" className="btn-primary w-full">
                  Book Free Demo
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Active page underline + dim-inactive text colour so the user can always
// tell which page they're on. Underline is an orange pill that sits under
// the label; rendered via `after:` so no extra DOM.
// Dark-mode nav links sit over hero photography. The `[text-shadow:...]`
// arbitrary utility gives every white label a soft dark drop-shadow so it
// reads even when the photo behind has bright zones (e.g. the dairy /
// strawberry hero on /products/erp). The inactive opacity also bumped from
// /70 to /85 so the labels are crisp without losing the visual hierarchy
// against the active item.
const DARK_LINK_SHADOW =
  '[text-shadow:0_1px_10px_rgba(15,21,53,0.55),_0_1px_2px_rgba(0,0,0,0.4)]';

const navLinkCls = (inDarkMode) => ({ isActive }) =>
  `relative inline-flex items-center whitespace-nowrap rounded-md px-3.5 py-2 text-[17px] font-semibold transition-colors ${inDarkMode
    ? isActive
      ? `text-white ${DARK_LINK_SHADOW}`
      : `text-white/85 hover:text-white ${DARK_LINK_SHADOW}`
    : isActive
      ? 'text-navy-950'
      : 'text-navy-600 hover:text-navy-950'
  } ${isActive
    ? 'after:absolute after:bottom-0 after:left-3.5 after:right-3.5 after:h-[3px] after:rounded-full after:bg-orange-500 after:shadow-[0_0_10px_rgba(232,93,38,0.4)]'
    : ''
  }`;

// Dropdown-button styling — mirrors navLinkCls so the Products / Industries /
// Resources dropdowns also show the active underline when the user is on one
// of their child pages.
const dropdownBtnCls = (inDarkMode, isActive) =>
  `relative inline-flex items-center gap-1 whitespace-nowrap rounded-md px-3.5 py-2 text-[17px] font-semibold transition-colors ${inDarkMode
    ? isActive
      ? `text-white ${DARK_LINK_SHADOW}`
      : `text-white/85 hover:text-white ${DARK_LINK_SHADOW}`
    : isActive
      ? 'text-navy-950'
      : 'text-navy-600 hover:text-navy-950'
  } ${isActive
    ? 'after:absolute after:bottom-0 after:left-3.5 after:right-6 after:h-[3px] after:rounded-full after:bg-orange-500 after:shadow-[0_0_10px_rgba(232,93,38,0.4)]'
    : ''
  }`;

// Click-to-expand mobile group. Each group renders its title as a button
// with a chevron that rotates 180° when open; children are wrapped in an
// AnimatePresence height transition so the panel slides cleanly. All
// groups start collapsed so the drawer stays compact on first open.
function MobileGroup({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-1 border-b border-cream-300 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-md px-2 py-3 text-left transition-colors hover:bg-cream-100"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-600">
          {title}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-navy-500 transition-transform duration-300 ${open ? 'rotate-180 text-orange-500' : ''
            }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-col pb-2 pl-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Small caps section heading used inside the desktop mega menus.
function MegaHeading({ children }) {
  return (
    <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-600">
      {children}
    </p>
  );
}

// Mega-menu link row — icon tile + bold label + dim sub-line. One component
// used across all axes (modules, business types, industries) so they share
// the same hover + spacing language.
// `descLines` controls how the description wraps. Default = 1 (truncate)
// so Module / Business / Resources rows stay the same compact 1-liner.
// Industries opts in to 2 to show the richer benefit copy.
function MegaItem({ to, icon: Icon, label, desc, descLines = 1, accent }) {
  const descClass =
    descLines === 1 ? 'truncate' : descLines === 2 ? 'line-clamp-2' : 'line-clamp-3';
  // When an accent is supplied (product platform items), tint the icon chip +
  // label with that platform's brand colour. Each chip gets a soft tinted
  // background (12% accent) with the accent itself as the icon stroke. The
  // label idles in navy but shifts to the accent on hover so the platform
  // identity is reinforced without competing with the navbar's hierarchy.
  const iconStyle = accent
    ? {
      backgroundColor: `${accent}14`,
      borderColor: `${accent}33`,
      color: accent,
    }
    : undefined;
  return (
    <Link
      to={to}
      className="group flex items-start gap-2.5 rounded-md px-2 py-2 transition-colors hover:bg-cream-100"
    >
      <span
        style={iconStyle}
        className={
          accent
            ? 'mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md border transition-transform duration-300 group-hover:scale-110'
            : 'mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md border border-cream-300 bg-cream-100 text-orange-600 group-hover:border-orange-300 group-hover:bg-orange-50'
        }
      >
        <Icon className="h-3.5 w-3.5" />
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block truncate text-[14px] font-semibold text-navy-950">
          {label}
        </span>
        {desc && (
          <span className={`mt-0.5 block text-[14px] leading-snug text-navy-600 ${descClass}`}>
            {desc}
          </span>
        )}
      </span>
    </Link>
  );
}

// Right-rail featured CTA panel — the Tebra promo block. Renders on a
// soft navy/orange gradient so it visually pops against the white menu.
function FeaturedPanel({ panel }) {
  return (
    <div className="col-span-3 flex flex-col justify-between bg-gradient-to-br from-navy-950 to-navy-900 p-4 text-white">
      <div>
        <p className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-orange-300">
          <Sparkles className="h-3 w-3" />
          {panel.eyebrow}
        </p>
        <p className="mt-2 text-[15px] font-bold leading-snug">{panel.title}</p>
        <p className="mt-2 text-[14px] leading-relaxed text-white/70">{panel.desc}</p>
      </div>
      <Link
        to={panel.cta.to}
        className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-md bg-orange-500 px-3 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-orange-400"
      >
        {panel.cta.label}
        <ArrowUpRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

function MobileLink({ to, children, accent }) {
  return (
    <NavLink
      to={to}
      style={accent ? { color: accent, borderLeft: `3px solid ${accent}` } : undefined}
      className={({ isActive }) =>
        `block rounded-md px-3 py-2 text-[14px] font-medium transition-colors ${isActive
          ? 'bg-cream-100 text-navy-950'
          : accent
            ? 'hover:bg-cream-100'
            : 'text-navy-700 hover:bg-cream-100 hover:text-navy-950'
        }`
      }
    >
      {children}
    </NavLink>
  );
}
