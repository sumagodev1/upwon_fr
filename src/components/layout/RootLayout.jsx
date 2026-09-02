import { useEffect, Suspense, StrictMode } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { LazyMotion, domAnimation } from 'framer-motion';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import AnnouncementBar from './AnnouncementBar.jsx';
import FloatingActions from './FloatingActions.jsx';
import ExitIntentPopup from './ExitIntentPopup.jsx';
import ScrollStickyBar from './ScrollStickyBar.jsx';
import ScrollToTop from '../common/ScrollToTop.jsx';
import { initAnalytics, trackPageview } from '../../lib/analytics.js';

// Quiet branded fallback shown while a lazily-loaded route chunk resolves.
function RouteFallback() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-cream-200">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-orange-500/30 border-t-orange-500" />
    </div>
  );
}

export default function RootLayout() {
  const { pathname } = useLocation();

  // Initialise analytics once (no-op until VITE_GA4_ID is configured).
  useEffect(() => {
    initAnalytics();
  }, []);

  // Track an SPA page_view on every route change.
  useEffect(() => {
    trackPageview(pathname);
  }, [pathname]);

  // The demo page is itself the conversion endpoint — don't show the
  // "Book Demo" sticky bar on top of it.
  const showStickyBar = pathname !== '/demo';

  // Site-wide fade-up: observe every <section> inside <main>, mark it as
  // fade-up-eligible (which hides it via CSS), then reveal it once it
  // scrolls into view. Done in JS so a non-JS environment never sees
  // hidden sections. Sections already in viewport are revealed on the
  // next frame so the hero never gets stuck invisible.
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }
    const main = document.querySelector('main');
    if (!main) return;
    // Sections marked data-no-fade opt out: .fade-up-section carries a
    // transform, and a transformed ancestor makes background-attachment:
    // fixed resolve against that element instead of the viewport — which
    // silently kills any parallax background inside it.
    const sections = main.querySelectorAll('section:not([data-no-fade])');
    if (!sections.length) return;

    sections.forEach((s) => s.classList.add('fade-up-section'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px 100px 0px' },
    );

    sections.forEach((s) => observer.observe(s));

    // Safety net: if any section is still hidden after 250ms (e.g. observer
    // failed to fire on an in-viewport element), reveal it anyway.
    const safetyTimer = window.setTimeout(() => {
      sections.forEach((s) => {
        const rect = s.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (inView) s.classList.add('section-revealed');
      });
    }, 250);

    return () => {
      observer.disconnect();
      window.clearTimeout(safetyTimer);
    };
  }, [pathname]);

  return (
    <StrictMode>
      <LazyMotion features={domAnimation} strict>
        <ScrollToTop />
        <div className="relative min-h-screen bg-cream-200 text-charcoal">
          <AnnouncementBar />
          <Navbar />
          <main className="relative">
            <Suspense fallback={<RouteFallback />}>
              <Outlet />
            </Suspense>
          </main>
          <Footer />
          <FloatingActions />
          <ExitIntentPopup />
          {showStickyBar && <ScrollStickyBar />}
        </div>
      </LazyMotion>
    </StrictMode>
  );
}
