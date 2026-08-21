// Lightweight, privacy-safe analytics shim.
//
// GA4 loads ONLY when VITE_GA4_ID is configured, so the site ships
// tracking-ready without hard-coding a property id (the brief / SG09 E2 ask
// for GA4 + event tracking, but the real id is an ops decision). Every helper
// is a safe no-op until an id is set, so calling them is always harmless.

const GA_ID =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GA4_ID) ||
  '';

let loaded = false;

export function initAnalytics() {
  if (loaded || !GA_ID || typeof window === 'undefined') return;
  loaded = true;

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  // We send page_views manually on route change (SPA), so disable auto.
  window.gtag('config', GA_ID, { send_page_view: false });
}

export function trackPageview(path) {
  if (typeof window === 'undefined' || !window.gtag || !GA_ID) return;
  window.gtag('event', 'page_view', { page_path: path });
}

export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined' || !window.gtag || !GA_ID) return;
  window.gtag('event', name, params);
}

export const analyticsEnabled = Boolean(GA_ID);
