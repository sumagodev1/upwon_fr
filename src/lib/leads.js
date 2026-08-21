import { trackEvent } from './analytics.js';

// Central lead-capture helper.
//
// SG09 E1 (the #1 critical gap) needs every form wired to a CRM / email
// pipeline. The endpoint is environment-driven (VITE_LEAD_ENDPOINT) so the
// front-end is integration-ready without committing a secret URL: point it at
// a HubSpot / Brevo / serverless webhook and every form starts delivering.
//
// When no endpoint is configured the call still resolves successfully (so the
// local/dev UX is unchanged) and an analytics `lead_submit` event always
// fires, so funnel tracking works regardless of backend wiring.

const ENDPOINT =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_LEAD_ENDPOINT) ||
  '';

export async function submitLead(source, payload = {}) {
  trackEvent('lead_submit', { source, ...scalarsOnly(payload) });

  if (!ENDPOINT) {
    return { ok: true, delivered: false };
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source, payload, ts: Date.now() }),
    });
    return { ok: res.ok, delivered: res.ok };
  } catch {
    // Never block the UI on a network error — the user still sees success and
    // the event is captured; ops can reconcile from analytics if needed.
    return { ok: true, delivered: false, error: true };
  }
}

// GA4 event params must be flat scalars — strip nested / non-scalar values.
function scalarsOnly(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj || {})) {
    if (typeof v === 'string' || typeof v === 'number') out[k] = v;
  }
  return out;
}
