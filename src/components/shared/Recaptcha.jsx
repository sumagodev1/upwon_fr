import { useEffect, useRef } from 'react';

/**
 * Google's reCAPTCHA v2 checkbox.
 *
 * Written against the API directly rather than adding a wrapper package: the
 * whole integration is one script tag and three calls, and a dependency for
 * that is more to keep current than the code it replaces.
 *
 * The parent owns the token. This reports it upward and renders nothing about
 * it, because the token only matters to the submit handler - and a token is
 * single-use, so the parent also needs a way to throw a spent one away. That
 * is `resetKey`: change it and the widget returns to an unticked box.
 */

const SITE_KEY = (import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? '').trim();
const SCRIPT_ID = 'google-recaptcha-v2';

/**
 * Loads api.js once per document and resolves when grecaptcha is usable.
 *
 * Module-level rather than per-component, so two mounted widgets - or one
 * component mounted twice, which StrictMode does in development - never insert
 * two script tags.
 *
 * `onload=` plus `render=explicit` is the documented way to know the API is
 * ready. Polling for window.grecaptcha would also work and would also be a
 * race, since the object exists slightly before render() does.
 */
let loader = null;

function loadRecaptcha() {
  if (loader) return loader;

  loader = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      // The prerender pass has no DOM and no visitor to challenge.
      reject(new Error('no window'));
      return;
    }
    if (window.grecaptcha?.render) {
      resolve();
      return;
    }

    window.__onRecaptchaLoad = () => resolve();

    if (document.getElementById(SCRIPT_ID)) return; // In flight; callback resolves.

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = 'https://www.google.com/recaptcha/api.js?onload=__onRecaptchaLoad&render=explicit';
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      // A blocked or offline script must not leave this pending forever, or
      // Send would sit unusable with nothing on screen explaining why.
      loader = null;
      reject(new Error('reCAPTCHA script could not be loaded'));
    };
    document.head.appendChild(script);
  });

  return loader;
}

/** True when a site key is configured, so callers can skip requiring a token. */
export const recaptchaConfigured = SITE_KEY !== '';

export default function Recaptcha({ onChange, resetKey = 0, error }) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const onChangeRef = useRef(onChange);

  // Held in a ref so the render effect does not depend on the parent passing a
  // stable callback - re-rendering the widget on every keystroke elsewhere in
  // the form would wipe out the visitor's tick.
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!SITE_KEY) return undefined;

    let cancelled = false;

    loadRecaptcha()
      .then(() => {
        if (cancelled || !containerRef.current || widgetIdRef.current !== null) return;
        if (!window.grecaptcha?.render) return;

        widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
          sitekey: SITE_KEY,
          callback: (token) => onChangeRef.current(token),
          // A token expires two minutes after it is issued. Clearing it here
          // means a form left open then sent fails in the browser, which is a
          // clearer thing to recover from than a rejection at the server.
          'expired-callback': () => onChangeRef.current(null),
          'error-callback': () => onChangeRef.current(null),
        });
      })
      .catch(() => {
        if (!cancelled) onChangeRef.current(null);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (resetKey === 0 || widgetIdRef.current === null) return;
    window.grecaptcha?.reset(widgetIdRef.current);
    onChangeRef.current(null);
  }, [resetKey]);

  // Nothing configured: render nothing at all rather than an empty box. The
  // backend accepts tokenless submissions while its own secret is unset, so
  // this is a working state rather than a broken one.
  if (!SITE_KEY) return null;

  return (
    <div>
      <div ref={containerRef} />
      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
