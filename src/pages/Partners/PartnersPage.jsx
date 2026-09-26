import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { m as motion } from 'framer-motion';
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, TrendingUp } from 'lucide-react';
import Container from '../../components/shared/Container/Container.jsx';
import PageHero from '../../components/shared/PageHero/PageHero.jsx';
import SectionHeading from '../../components/shared/SectionHeading/SectionHeading.jsx';
import Seo from '../../components/shared/Seo/Seo.jsx';
import {
  PARTNER_APPLICATION_NOT_CONNECTED,
  canSubmitPartnerApplication,
  fetchPartnerHero,
  submitPartnerApplication,
} from '../../lib/partnerProgram.js';
import { MAX_FOR, checkPartnerApplication, counterFor, isOver } from '../../lib/partnerFields.js';

/*
  /partners

  ONE section of this page is authored in the admin panel: the hero, in its
  Partner Program → Hero Section tab, read back through lib/partnerProgram.js.
  Everything else here — the three partnership models, the earnings calculator
  and the copy around the form — is static and stays that way; nobody asked for
  them to be authored, and there is no table behind them.

  Like the Insider, Contact and Careers sections, the hero starts from the
  built-in FALLBACK_HERO below — what the SSG build bakes into the prerendered
  HTML and what renders if the API is unreachable — and swaps to the published
  hero once the API answers.

  THE APPLICATION FORM DELIVERS. It posts to the API's third and last public
  write, and what comes back decides what the applicant sees: the success panel
  only once a row has actually been filed, and a named failure with every typed
  value still in place otherwise. It used to be an onSubmit that called
  window.alert('Application received') and sent nothing anywhere at all — there
  is no mail transport behind this endpoint, so the row in
  partner_program_applications is the only delivery there is.

  Every field is checked here before anything is sent, against the same bounds
  the server's validator applies (lib/partnerFields.js mirrors it rule for
  rule), so an applicant fixes a typo under the input rather than in a 422. The
  server stays the authority: a field error it reports anyway is shown under
  that same input, which works because the form state is keyed by the API's own
  field names.
*/

const MODELS = [
  {
    name: 'Referral Partner',
    rate: '8–10%',
    desc: 'Introduce. We close + implement. You earn on closure + renewals.',
    best: 'CAs, food consultants, industry associations',
    includes: ['Certified partner badge', 'Marketing collateral', 'Deal registration', 'Renewal share'],
  },
  {
    name: 'Sales Partner',
    rate: '15–20%',
    desc: 'You sell. We implement. You earn higher share + renewals.',
    best: 'IT firms with sales teams, ERP resellers',
    includes: ['All Referral benefits', 'Pre-sales support', 'Demo access', 'Higher renewal share'],
  },
  {
    name: 'Implementation Partner',
    rate: '20–25% + 30% impl',
    desc: 'You sell + implement. You earn the most.',
    best: 'Established ERP implementation partners',
    includes: ['All Sales benefits', 'Implementation revenue', 'Tier-1 certification', 'Co-marketing'],
  },
];

/*
  The built-in hero — the copy this band has always carried, written in the shape
  lib/partnerProgram.js returns so the fetched and the built-in hero render
  through one path.

  It is the fallback, not the source of truth: what the SSG build bakes into the
  prerendered HTML and what renders if the API is unreachable. The published hero
  replaces it at runtime.

  These three strings are also exactly what the backend's seed inserts into an
  empty partner_program_hero — the orange second line becoming the `**accent**`
  the API parses back into `accent: true` — so a freshly seeded API publishes
  this very hero and the swap is invisible.

  `image: null` is the seeded state too, and deliberately: this hero has never
  had a backdrop, and publishing the section must not change how the page looks
  until somebody uploads one. A null image means no `bgImages`, which is the flat
  ambient PageHero backdrop the page renders today. `mobileImage` — the optional
  portrait crop for phones — is null for the same reason and in the same way.
*/
const FALLBACK_HERO = {
  eyebrow: 'UpWon Channel Partner Program',
  headingLines: [
    [{ text: 'Your clients need this.', accent: false }],
    [{ text: 'You can earn from introducing them.', accent: true }],
  ],
  subtext:
    'IT firms, CAs, food consultants, HR advisors and industry associations — introduce UpWon to businesses in your network. You introduce. We close and implement. You earn.',
  image: null,
  mobileImage: null,
};

/*
  An untouched form.

  Every key is the API's own field name — fullName, not name; workEmail, not
  email — so the body posted to the endpoint is this object trimmed, and a field
  error the server reports lands under the right input with nothing in between to
  translate it. Renaming a field here means renaming it on the server, which is
  the point.
*/
const emptyApplication = () => ({
  fullName: '',
  company: '',
  role: '',
  background: '',
  mobile: '',
  workEmail: '',
});

/*
  One authored heading, rendered line by line with the accented parts in the
  orange gradient — the same renderer the home hero, the Contact hero and the
  Insider feature section use. It reproduces exactly the markup this hero's
  title has always had: a `<br />` between the lines and the second one wrapped
  in `gradient-text-orange`.
*/
function Heading({ lines }) {
  return lines.map((parts, lineIndex) => (
    <Fragment key={lineIndex}>
      {lineIndex > 0 && <br />}
      {parts.map((part, partIndex) =>
        part.accent ? (
          <span key={partIndex} className="gradient-text-orange">
            {part.text}
          </span>
        ) : (
          <Fragment key={partIndex}>{part.text}</Fragment>
        ),
      )}
    </Fragment>
  ));
}

export default function PartnersPage() {
  const [deals, setDeals] = useState(5);
  const [avgDeal, setAvgDeal] = useState(8); // ₹ lakh
  const [model, setModel] = useState(1); // index of MODELS

  /*
    The hero starts as the built-in one and is swapped for the published one once
    the API answers — the same order as the home, Contact and Insider heroes, for
    the same reason: the headline is the LCP element and the page is prerendered,
    so the first paint must come from markup that already exists.

    fetchPartnerHero resolves to null for every failure — unconfigured, offline,
    CORS, nothing authored — and null means "keep what you have".
  */
  const [hero, setHero] = useState(FALLBACK_HERO);

  useEffect(() => {
    let cancelled = false;

    fetchPartnerHero().then((published) => {
      if (!cancelled && published) setHero(published);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  /*
    The backdrop. One published backdrop or none: with none this is empty, and
    PageHero then renders its flat ambient background exactly as it does today
    rather than a photo under a navy scrim.

    The backdrop is handed over as PageHero's `{ src, mobileSrc }` form, so a
    published portrait crop becomes the <picture> source phones get and the wide
    file stays what every other viewport downloads.

    The two slots are independent in the panel, so a hero can carry either crop
    alone. One crop published on its own serves every screen — the same rule the
    Contact hero uses, and for the same reason: mixing in an unrelated fallback
    photograph would put two different pictures on what is one page to a visitor
    who rotates their phone. `mobileSrc` is therefore only set when it is a
    DIFFERENT file from `src`; equal to it, the <picture> would carry a source
    that changes nothing.
  */
  const heroImages = useMemo(() => {
    const src = hero.image || hero.mobileImage;
    if (!src) return [];
    const mobileSrc = hero.mobileImage && hero.mobileImage !== src ? hero.mobileImage : null;
    return [{ src, mobileSrc }];
  }, [hero.image, hero.mobileImage]);

  /*
    The submit's own state.

    `sent` is set only by a 2xx from the API, which is the whole point: the
    success panel is a statement that a row exists.
    `sending` blocks a second press while the first request is in flight.
    `attempted` makes every field's error visible from the first press, the way a
    blur does for one field.
    `serverErrors` holds what the API named in a 422; each entry survives until
    its own field is edited, so a message never sits under a box it is no longer
    about.
    `submitError` is the one line beside the button explaining the last failed
    attempt. It stays until the next press rather than clearing on the next
    keystroke: "wait a few minutes" has to still be on screen when the applicant
    looks back at the button.
  */
  const [form, setForm] = useState(emptyApplication);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [touched, setTouched] = useState({});
  const [serverErrors, setServerErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

  /** The in-flight latch. See handleSubmit for why this is a ref and not state. */
  const inFlight = useRef(false);

  /*
    Whether an application can be delivered at all in this build. False means no
    VITE_API_BASE_URL, so there is nowhere to post to: the form says so before
    the applicant fills anything in, and the button is disabled. The alternative
    — six fields and a success panel over a request that never happened — is
    exactly what this page used to do.
  */
  const deliverable = canSubmitPartnerApplication();

  /*
    Every field's error, recomputed each render. Cheap, and it means the Apply
    button and the inline messages can never disagree about whether the form is
    ready.
  */
  const errors = useMemo(() => checkPartnerApplication(form), [form]);
  const hasErrors = Object.values(errors).some(Boolean);

  /**
   * A server error shows until its field changes; a local one once the field has
   * been left, or once Apply has been pressed.
   */
  const errorFor = (name) =>
    serverErrors[name] ??
    (attempted || touched[name] ? (errors[name] ?? undefined) : undefined);

  const touch = (name) => setTouched((t) => ({ ...t, [name]: true }));

  /** An edited field no longer carries the last attempt's error from the API. */
  const patch = (changes) => {
    setForm((f) => ({ ...f, ...changes }));
    setServerErrors((current) => {
      const next = { ...current };
      Object.keys(changes).forEach((field) => delete next[field]);
      return next;
    });
  };

  const earnings = useMemo(() => {
    const rate = [9, 17.5, 22.5][model] / 100;
    const implRate = model === 2 ? 0.3 : 0;
    const renewal = 0.6; // 60% of recurring
    const dealRevenue = deals * avgDeal * 1_00_000;
    const yr1 = dealRevenue * (rate + implRate);
    const yr2 = dealRevenue * rate * renewal + yr1;
    return { yr1, yr2 };
  }, [deals, avgDeal, model]);

  const fmt = (n) => `₹${(n / 1_00_000).toFixed(1)} L`;

  /*
    The submit.

    Three things have to hold every time: it never files the same application
    twice, it never shows the success panel for a request that did not succeed,
    and it never discards what the applicant typed.
  */
  const handleSubmit = async (event) => {
    event.preventDefault();

    /*
      A second press while the first request is in flight would file the
      application twice. Three things stop that, and the ref is the one that
      actually has to hold: the button is disabled while `sending`, but `sending`
      is a state flag, so two submit events raised in the same tick — a double
      click, Enter on top of a click, a password manager submitting the form —
      both run against the render where it was still false. A ref changes
      immediately.
    */
    if (inFlight.current) return;

    setAttempted(true);
    setSubmitError(null);

    // Nothing is sent while a field is wrong. setAttempted above has already put
    // every message on screen, so the applicant can see why.
    if (hasErrors) return;

    inFlight.current = true;
    setSending(true);
    try {
      const result = await submitPartnerApplication(form);

      if (result.ok) {
        setSent(true);
        setServerErrors({});
        return;
      }

      // Every value the applicant typed stays exactly where it is — `form` is
      // untouched here on purpose — so Apply again is one press away.
      setSubmitError(result.message);
      setServerErrors(result.fieldErrors);
    } finally {
      inFlight.current = false;
      setSending(false);
    }
  };

  /** A second application starts from a clean form, not from the last one's answers. */
  const startAnother = () => {
    setForm(emptyApplication());
    setTouched({});
    setAttempted(false);
    setServerErrors({});
    setSubmitError(null);
    setSent(false);
  };

  // What is said beside the button, in order of what the applicant most needs to
  // know: the form is not connected at all, then why the last press failed, then
  // that something above is still wrong.
  const buttonNotice = !deliverable
    ? PARTNER_APPLICATION_NOT_CONNECTED
    : (submitError ?? (attempted && hasErrors
        ? 'Fix the highlighted fields above to continue.'
        : null));

  return (
    <>
      <Seo
        title="Partner Program — Refer, Sell & Implement UpWon"
        description="Earn with UpWon's partner program — referral, sales and implementation tiers (8–25% + implementation revenue) for CAs, IT firms and ERP partners across India."
        keywords="UpWon partner program, ERP reseller India, implementation partner, referral commission"
        canonical="https://upwon.in/partners"
      />
      <PageHero
        breadcrumb={[
          { label: 'Home', to: '/' },
          { label: 'Channel Partner Program' },
        ]}
        eyebrow={hero.eyebrow}
        title={<Heading lines={hero.headingLines} />}
        description={hero.subtext}
        bgImages={heroImages}
      />

      {/* Three models */}
      <section className="relative overflow-hidden bg-cream-100 section-pad">
        <div className="absolute inset-0 grid-bg-light opacity-50" />
        <Container className="relative">
          <SectionHeading
            align="center"
            variant="light"
            eyebrow="Three partnership models"
            title="Pick the model that fits how you work."
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {MODELS.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className={`relative rounded-2xl border p-7 shadow-sm transition-all ${
                  model === i
                    ? 'border-orange-500 bg-white ring-2 ring-orange-500/20'
                    : 'border-cream-300 bg-white hover:border-orange-300'
                } cursor-pointer`}
                onClick={() => setModel(i)}
              >
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-orange-600">
                  Model {String.fromCharCode(65 + i)}
                </p>
                <h3 className="mt-3 h-display text-xl text-navy-950">{m.name}</h3>
                <p className="num-display mt-4 text-3xl text-orange-600">{m.rate}</p>
                <p className="mt-1 text-[14px] text-navy-500">commission rate</p>
                <p className="mt-4 text-sm text-charcoal">{m.desc}</p>
                <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.16em] text-navy-500">
                  Best for: {m.best}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {m.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-2 text-[14px] text-navy-800">
                      <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-orange-600" />
                      {inc}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Earnings calculator */}
      <section className="relative overflow-hidden bg-navy-950 py-20 text-white">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <Container className="relative">
          <p className="text-center text-[10.5px] font-semibold uppercase tracking-[0.18em] text-orange-400">
            Earnings calculator · {MODELS[model].name}
          </p>
          <h2 className="mt-3 text-center h-display text-3xl text-balance md:text-4xl">
            Specifically, how much can you earn?
          </h2>

          <div className="mt-12 grid items-start gap-10 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-cream-100/60">
                Your inputs
              </p>
              <div className="mt-6 space-y-7">
                <div>
                  <div className="flex items-end justify-between">
                    <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cream-100/70">
                      Deals per year
                    </label>
                    <span className="num-display text-lg text-orange-400">{deals}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={20}
                    value={deals}
                    onChange={(e) => setDeals(Number(e.target.value))}
                    className="mt-2 w-full accent-orange-500"
                  />
                </div>
                <div>
                  <div className="flex items-end justify-between">
                    <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cream-100/70">
                      Avg. deal size
                    </label>
                    <span className="num-display text-lg text-orange-400">₹{avgDeal} L</span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={50}
                    value={avgDeal}
                    onChange={(e) => setAvgDeal(Number(e.target.value))}
                    className="mt-2 w-full accent-orange-500"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-7">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-orange-300">
                Your projected earnings
              </p>
              <div className="mt-6 grid gap-6">
                <div>
                  <p className="num-display text-4xl text-orange-300 md:text-5xl">
                    {fmt(earnings.yr1)}
                  </p>
                  <p className="mt-1 text-sm text-cream-100/80">Year 1 earnings</p>
                </div>
                <div className="border-t border-white/10 pt-6">
                  <p className="num-display text-3xl text-white md:text-4xl">{fmt(earnings.yr2)}</p>
                  <p className="mt-1 text-sm text-cream-100/80">Year 2 earnings (with renewals)</p>
                </div>
              </div>
              <a
                href="#apply"
                className="mt-7 inline-flex items-center gap-2 rounded-md bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600"
              >
                Apply to join
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Application form */}
      <section id="apply" className="relative overflow-hidden bg-cream-100 section-pad">
        <Container className="relative">
          <div className="mx-auto max-w-2xl">
            <SectionHeading
              align="center"
              variant="light"
              eyebrow="Apply"
              title="Apply to the UpWon Channel Partner Program."
              description="Tell us a little about you. We'll respond within 2 business days."
            />
            {sent ? (
              /*
                Only reachable from a 2xx: there is a row in
                partner_program_applications behind this panel, and the admin's
                Partner Program Application tab is already showing it.
              */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-10 flex flex-col items-center rounded-2xl border border-cream-300 bg-white p-7 text-center shadow-sm"
              >
                <div className="grid h-14 w-14 place-items-center rounded-2xl border border-orange-300 bg-orange-100 text-orange-600">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="mt-6 h-display text-2xl text-navy-950 md:text-3xl">
                  Application received.
                </h3>
                <p className="mt-3 max-w-md text-sm text-charcoal">
                  The UpWon partnerships team will be in touch within 2 business days.
                </p>
                <button onClick={startAnother} className="btn-secondary mt-7" type="button">
                  Submit another application
                </button>
              </motion.div>
            ) : (
              /*
                noValidate: the browser's own check would open a native bubble
                over the first empty box and stop the handler running, so the
                inline messages below would never appear. The `type` and
                `required` attributes stay for the keyboard they choose and for
                what they tell a screen reader; the checks that actually decide
                are the ones mirroring the server's.
              */
              <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-10 grid gap-4 rounded-2xl border border-cream-300 bg-white p-7 shadow-sm sm:grid-cols-2"
              >
                <Input
                  label="Full name"
                  name="fullName"
                  value={form.fullName}
                  onChange={(v) => patch({ fullName: v })}
                  onBlur={() => touch('fullName')}
                  error={errorFor('fullName')}
                  disabled={sending}
                  required
                />
                <Input
                  label="Company"
                  name="company"
                  value={form.company}
                  onChange={(v) => patch({ company: v })}
                  onBlur={() => touch('company')}
                  error={errorFor('company')}
                  disabled={sending}
                  required
                />
                <Input
                  label="Your role"
                  name="role"
                  placeholder="Founder, Practice Lead…"
                  value={form.role}
                  onChange={(v) => patch({ role: v })}
                  onBlur={() => touch('role')}
                  error={errorFor('role')}
                  disabled={sending}
                />
                <Input
                  label="Background"
                  name="background"
                  placeholder="CA · IT firm · Consultant"
                  value={form.background}
                  onChange={(v) => patch({ background: v })}
                  onBlur={() => touch('background')}
                  error={errorFor('background')}
                  disabled={sending}
                />
                <Input
                  label="Mobile"
                  name="mobile"
                  value={form.mobile}
                  onChange={(v) => patch({ mobile: v })}
                  onBlur={() => touch('mobile')}
                  error={errorFor('mobile')}
                  disabled={sending}
                  required
                  className="sm:col-span-2"
                />
                <Input
                  label="Work email"
                  name="workEmail"
                  type="email"
                  value={form.workEmail}
                  onChange={(v) => patch({ workEmail: v })}
                  onBlur={() => touch('workEmail')}
                  error={errorFor('workEmail')}
                  disabled={sending}
                  required
                  className="sm:col-span-2"
                />

                {buttonNotice && (
                  <p
                    role="alert"
                    className="flex items-start gap-1.5 text-[13px] font-medium text-orange-700 sm:col-span-2"
                  >
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span>{buttonNotice}</span>
                  </p>
                )}

                <button
                  className="btn-primary-glow sm:col-span-2 !py-3 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
                  type="submit"
                  disabled={sending || !deliverable || (attempted && hasErrors)}
                  aria-busy={sending}
                >
                  {sending ? (
                    <>
                      Sending…
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Apply now
                      <TrendingUp className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}

function Input({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  type = 'text',
  placeholder,
  disabled = false,
  className = '',
}) {
  const id = `partner-${name}`;

  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id}>
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-600">
            {label}
            {required && <span className="ml-1 text-orange-500">*</span>}
          </span>
        </label>
        <Counter value={value} max={MAX_FOR[name]} />
      </div>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        required={required}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-2 w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-navy-950 outline-none disabled:bg-cream-200 disabled:text-navy-500 ${
          error
            ? 'border-orange-600 focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20'
            : 'border-cream-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
        }`}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

/** One field's inline message. Renders nothing when the field is fine. */
function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-[13px] text-orange-700">
      {message}
    </p>
  );
}

/*
  The counter beside a capped field's label: "12/120".

  Every capped field carries one instead of a `maxLength` attribute, because the
  browser truncates a paste at `maxLength` with no event and no message — which
  silently loses the tail of a pasted value and makes the "must be N characters
  or fewer (currently M)" message unreachable. This shows the overflow and the
  check blocks the submit on it.
*/
function Counter({ value, max }) {
  return (
    <span
      className={`shrink-0 text-[11px] tabular-nums ${
        isOver(value, max) ? 'font-medium text-orange-700' : 'text-navy-400'
      }`}
    >
      {counterFor(value, max)}
    </span>
  );
}
