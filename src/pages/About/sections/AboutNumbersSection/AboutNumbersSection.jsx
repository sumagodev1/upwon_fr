import { Fragment, useEffect, useMemo, useState } from 'react';
import { m as motion } from 'framer-motion';
import { Briefcase, Boxes, Calendar, Heart } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import SectionIntro from '../../../../components/shared/SectionIntro/SectionIntro.jsx';
import useCountUp from '../../../../hooks/useCountUp.js';
import TrustStrip, { CLIENT_LOGOS } from '../../../../components/shared/TrustStrip/TrustStrip.jsx';
import { PLATFORM_MODULES } from '../../../../data/modules.js';
import { fetchAboutNumbersSection } from '../../../../lib/aboutPage.js';

// Brief §19.4 — UpWon in Numbers + customer logo strip.
// 4 stats: Businesses Deployed / Platforms / Years Domain Expertise /
// Customer Retention. Each animates a count-up on scroll into view via the
// shared useCountUp hook. Customer logo strip (TrustStrip) is reused from
// the homepage so the brand wall stays consistent across pages.
//
// The section copy and the stat cards are authored in the admin panel's
// About Us → Number Section tab. The customer logo strip below them is NOT
// authored, by the brief: it stays in this file, as does the "Read customer
// stories" link under it.
//
// The built-in STATS array is the fallback, not the source of truth — what the
// SSG build bakes into the prerendered HTML and what renders if the API is
// unreachable. It is also what the seed published verbatim, so a freshly seeded
// API serves these same four cards in this same order.
//
// The platform count pulls live from PLATFORM_MODULES.length so it stays in
// sync if the suite ever changes (currently 7). A PUBLISHED card cannot do
// that — a column cannot hold "however many modules there are", and the seed
// froze it as the string '7' — so an eighth platform means editing that card in
// the panel by hand. The description beside it names all seven anyway, so that
// edit was always going to be manual.
const STATS = [
  {
    icon: Briefcase,
    value: 150,
    suffix: '+',
    label: 'Businesses Deployed',
    sub: 'Across food, FMCG and franchise verticals',
    duration: 1800,
  },
  {
    icon: Boxes,
    value: PLATFORM_MODULES.length, // live count — 7 platforms today
    suffix: '',
    label: 'Enterprise Platforms',
    sub: 'ERP · SFA-DMS · FMS · POS · HRMS · WMS · Vendor Portal',
    duration: 1200,
  },
  {
    icon: Calendar,
    value: 12,
    suffix: '+',
    label: 'Years Domain Expertise',
    sub: 'Inside India\'s food belt — 2016 to today',
    duration: 1400,
  },
  {
    icon: Heart,
    value: 98,
    suffix: '%',
    label: 'Customer Retention',
    sub: 'Yearly. Verified across deployed accounts.',
    duration: 2000,
  },
];

/*
  The icon and the count-up's duration by the card's POSITION in the row.

  Neither is authored, and neither is in the API's shape: the icons are a rhythm
  across the row rather than a property of a number, and the durations are timed
  so four cards counting at once finish together rather than in a stagger. Both
  lists are the ones the built-in cards above already carry, in the same order, so
  the seeded four publish into exactly the row the page draws today. A fifth card
  cycles back to the first icon and counts for the hook's own default.
*/
const ICONS = [Briefcase, Boxes, Calendar, Heart];
const DURATIONS = [1800, 1200, 1400, 2000];
const DEFAULT_DURATION = 1800;

/*
  The built-in section copy, written in the shape lib/aboutPage.js returns — the
  orange half of the headline becoming the `**accent**` the API parses back into
  `accent: true`, so a freshly seeded API publishes this very heading and the swap
  is invisible.
*/
const FALLBACK_SECTION = {
  eyebrow: 'UpWon in numbers',
  headingLines: [
    [
      { text: 'The numbers behind the company — ', accent: false },
      { text: 'honestly defensible.', accent: true },
    ],
  ],
  subtext:
    'We round small numbers, not big ones. Every stat below is something we can pull up in a customer review.',
};

/*
  One authored heading, rendered line by line with the accented parts in the
  orange gradient — the same renderer the home hero, the Contact hero and the
  Partner hero use.
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

/*
  A published value — '150+', '7', '98%', '16,500+' — split into the number the
  card counts to and the suffix printed in orange beside it, which is how these
  cards have always been written.

  The server guarantees a value starts with a digit, so the split is a rule
  rather than a guess. Grouping is preserved when the author typed it: '16,500+'
  counts up and lands on '16,500+', not '16500+'. Anything this cannot read a
  number out of is printed as it was typed, with no count-up — unreachable
  through the panel, and better than a card animating to NaN.
*/
function splitValue(raw) {
  const value = String(raw).trim();
  const match = /^([0-9][0-9,]*)(.*)$/.exec(value);
  if (!match) return { value: null, suffix: '', text: value, grouped: false };

  const number = Number(match[1].replace(/,/g, ''));
  if (!Number.isFinite(number)) {
    return { value: null, suffix: '', text: value, grouped: false };
  }

  return {
    value: number,
    suffix: match[2],
    text: value,
    grouped: match[1].includes(','),
  };
}

export default function AboutNumbersSection() {
  /*
    The section starts as the built-in one and is swapped for the published one
    once the API answers — the same order as every other authored section on the
    site. fetchAboutNumbersSection resolves to null for every failure
    (unconfigured, offline, CORS, nothing authored), and null means "keep what you
    have".
  */
  const [published, setPublished] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchAboutNumbersSection().then((section) => {
      if (!cancelled && section) setPublished(section);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const copy = published ?? FALLBACK_SECTION;

  /*
    The cards, in one shape whichever source they came from.

    WHICH LIST WINS. The published one whenever the section HAS a list, including
    an empty one: `hasStats` is the API saying whether any card row exists at all,
    ACTIVE or INACTIVE, so "every card is Inactive" (render the band empty) is no
    longer read as "there is no card row at all" (nothing authored, keep the
    built-in four). It matters here more than anywhere else on the page — the four
    are claims about the business, and a number taken down because it can no longer
    be defended must not come back because the list it was in went empty. See
    lib/aboutPage.js.
  */
  const cards = useMemo(() => {
    if (published?.hasStats) {
      return published.stats.map((stat, i) => ({
        ...splitValue(stat.value),
        label: stat.label,
        sub: stat.description,
        icon: ICONS[i % ICONS.length],
        duration: DURATIONS[i] ?? DEFAULT_DURATION,
      }));
    }

    return STATS.map((stat) => ({
      value: stat.value,
      suffix: stat.suffix,
      text: `${stat.value}${stat.suffix}`,
      grouped: false,
      label: stat.label,
      sub: stat.sub,
      icon: stat.icon,
      duration: stat.duration,
    }));
  }, [published]);

  return (
    <section
      id="numbers"
      className="relative overflow-hidden bg-cream-100 py-10 sm:py-12 lg:py-14 scroll-mt-32"
    >
      <div className="absolute inset-0 grid-bg-light opacity-40" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-orange-500/[0.07] blur-[140px]" />

      <Container className="relative">
        <SectionIntro
          // Blank is not reachable from the panel — the server requires an
          // eyebrow — so this only covers a row that somehow lost one.
          eyebrow={copy.eyebrow ?? FALLBACK_SECTION.eyebrow}
          title={<Heading lines={copy.headingLines} />}
          description={copy.subtext}
        />

        {/* Stats */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((s, i) => (
            <StatCard key={`${s.label}-${i}`} stat={s} index={i} />
          ))}
        </div>

        {/* Customer logo strip */}
        <div className="mt-16">
          <p className="text-center text-[10.5px] font-bold uppercase tracking-[0.22em] text-navy-500">
            Trusted by growing food &amp; FMCG businesses across India
          </p>
          <div className="mt-6">
            <TrustStrip embedded logos={CLIENT_LOGOS} />
          </div>
          <div className="mt-8 text-center">
            <a
              href="/clients"
              className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-orange-600 hover:text-orange-700"
            >
              Read customer stories →
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

function StatCard({ stat, index }) {
  // The hook runs for every card, countable or not — it cannot be called
  // conditionally, and it is what holds the ref that starts the animation when
  // the card scrolls into view.
  const { ref, value } = useCountUp(stat.value ?? 0, { duration: stat.duration });
  const countable = stat.value !== null;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.55,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative overflow-hidden rounded-2xl border border-cream-300 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-enterprise"
    >
      <span className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-orange-500/0 blur-2xl transition-colors duration-700 group-hover:bg-orange-500/15" />

      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-50 text-orange-600 ring-1 ring-orange-100 transition-transform duration-500 group-hover:scale-110">
        <stat.icon className="h-5 w-5" strokeWidth={1.75} />
      </div>

      <p className="num-display mt-5 text-5xl font-bold leading-none tracking-tightest text-navy-950">
        {countable ? (
          <>
            {stat.grouped ? value.toLocaleString('en-IN') : value}
            <span className="text-orange-500">{stat.suffix}</span>
          </>
        ) : (
          stat.text
        )}
      </p>
      <p className="mt-3 font-display text-[14px] font-bold leading-tight text-navy-900">
        {stat.label}
      </p>
      <p className="mt-1 text-[14px] leading-snug text-navy-600">{stat.sub}</p>
    </motion.article>
  );
}
