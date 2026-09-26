import { Fragment, useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { m as motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Compass, X, MapPin, Briefcase, ArrowRight } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import SectionIntro from '../../../../components/shared/SectionIntro/SectionIntro.jsx';
import { COMPANY } from '../../../../data/company.js';
import { fetchAboutTeamSection } from '../../../../lib/aboutPage.js';

// Brief §19.3 — Team & Values.
// Two halves:
//   TOP — Team grid (founder + 4-5 senior leads), authored in the admin panel's
//         About Us → People Section (Team) tab: the section copy, and the people
//         as an ordered list of name / role / meta line / optional photograph.
//         Avatars are initial-based placeholders until real headshots ship —
//         kept consistent with the founder card pattern elsewhere on the page.
//   BOTTOM — 4 core values block: Domain First / Customer Obsession /
//            Simplicity at Scale / India-Built for India. Each as a tile
//            with icon + name + one-line operating principle. NOT authored, by
//            the brief: the four operating principles stay in this file.
//
// The TEAM array below is the fallback, not the source of truth — what the SSG
// build bakes into the prerendered HTML and what renders if the API is
// unreachable. It is also what the seed published verbatim, so a freshly seeded
// API serves these same six people in this same order.
//
// The CMS does not hold the "Learn more" popup's content: it holds the card —
// name, role, meta line, photograph — and not the bio, the focus chips or the
// LinkedIn URL. So a published person's popup is looked up in the TEAM entries
// below BY NAME (see BUILT_IN_PROFILES): the six the seed publishes keep the six
// dialogs this page has always had, and a person the page has never heard of
// simply has no Learn more control rather than a stranger's biography behind their
// name. Ask for those three fields on the CMS person and the lookup goes away.
const TEAM = [
  {
    name: COMPANY?.founder?.name || 'Nikhil Mehta',
    role: COMPANY?.founder?.role || 'Founder & CEO',
    based: 'Nashik',
    domain: 'Vision · Domain · Customer',
    linkedin: COMPANY?.founder?.linkedin || '#',
    accent: '#E85A2A',
    pinned: true,
    bio: 'Started Byte Elephants Technologies in Nashik in 2016 with one belief: food and FMCG businesses deserve software built for the way they actually run. Spends most weeks with customers — on plant floors, delivery routes and franchise counters — turning what he sees into the UpWon roadmap.',
    focus: ['Company vision & strategy', 'Customer & domain depth', 'Long-term product direction'],
  },
  {
    name: 'CTO / Co-founder',
    role: 'Chief Technology Officer',
    based: 'Nashik',
    domain: 'Platform · Architecture · Scale',
    linkedin: '#',
    accent: '#1565C0',
    bio: 'Owns the technical foundation of the UpWon suite — the shared data layer that lets ERP, SFA-DMS, FMS, POS, HRMS, WMS and the Vendor Portal run as one system with zero reconciliation. Focused on keeping the platform fast and reliable as it scales across thousands of daily users.',
    focus: ['Platform architecture', 'Reliability & security', 'Engineering at scale'],
  },
  {
    name: 'Head of Engineering',
    role: 'VP Engineering',
    based: 'Nashik / Bangalore',
    domain: 'Delivery · Quality · DevEx',
    linkedin: '#',
    accent: '#2E7D32',
    bio: 'Runs delivery across the engineering org — shipping the seven-platform suite on a predictable cadence without trading away quality. Champions developer experience and automated testing so the team moves fast and breaks nothing customers depend on.',
    focus: ['Release delivery', 'Quality & testing', 'Developer experience'],
  },
  {
    name: 'Head of Customer Success',
    role: 'VP Customer Success',
    based: 'Pune',
    domain: 'Onboarding · CSM · Renewals',
    linkedin: '#',
    accent: '#00695C',
    bio: 'Leads onboarding and ongoing success for every UpWon customer — from go-live through expansion and renewal. Makes sure each deployment delivers measurable outcomes, not just a login, so customers stay and grow with the platform.',
    focus: ['Onboarding & go-live', 'Account health', 'Renewals & expansion'],
  },
  {
    name: 'Head of Product',
    role: 'VP Product',
    based: 'Nashik',
    domain: 'Product · Research · Roadmap',
    linkedin: '#',
    accent: '#6A1B9A',
    bio: 'Turns deep customer research into the product roadmap. Every product manager on the team spends a week each quarter inside a customer\'s plant, route or outlet — so what ships is grounded in how the food belt actually operates, not in assumptions.',
    focus: ['Product roadmap', 'Customer research', 'Discovery & prioritisation'],
  },
  {
    name: 'Head of Domain',
    role: 'Food & FMCG Practice Lead',
    based: 'Nashik',
    domain: 'Industry · Compliance · Solutions',
    linkedin: '#',
    accent: '#C8820A',
    bio: 'The food & FMCG domain authority behind the suite — translating industry workflows, statutory requirements and compliance into product. Ensures UpWon speaks the language of manufacturers, distributors and franchise brands out of the box, with no Western-template retrofits.',
    focus: ['Industry workflows', 'Statutory & compliance', 'Solution design'],
  },
];

/*
  The tint each card's avatar carries, by the person's position in the grid.

  Not authored, and not in the API's shape: the colours are a rhythm across the
  row rather than a property of a person, and they are the six the TEAM entries
  above already carry, in the same order — so the seeded six publish into exactly
  the grid the page draws today. A seventh person cycles back to the first tint.
*/
const ACCENTS = ['#E85A2A', '#1565C0', '#2E7D32', '#00695C', '#6A1B9A', '#C8820A'];

/*
  The built-in profiles, by name.

  The popup's copy — the biography, the focus chips and the LinkedIn link — is not
  in the CMS, so a published person brings none of it with them. What they can keep
  is the profile this page has always shown for that NAME: the seed publishes these
  six people verbatim, so matching on the name means publishing the section stops
  deleting six dialogs' worth of content from the live page.

  Matched on the trimmed, case-folded name and nothing else. Rename a placeholder to
  a real person and their card simply has no Learn more control, which is the safe
  direction — a biography must never end up under somebody else's name.
*/
const BUILT_IN_PROFILES = new Map(TEAM.map((person) => [person.name.trim().toLowerCase(), person]));

/*
  What the Learn more popup shows for a published person, or null when the page has
  nothing for that name.

  The authored fields win wherever the two could disagree, so the card and the
  dialog can never say different things: the name and the role are the published
  ones, the tint is the card's (a position in the grid, not a property of a person),
  and the location line is the first segment of the published meta line, which is
  how that line is composed — 'Nashik · Vision · Domain · Customer'. A meta line
  with no separator is not split, because the whole of it beside a map pin would
  read as a place when it is not one.

  Everything else — the biography, the focus chips, the LinkedIn link, the founder's
  pin — comes from the built-in profile, because there is nowhere else for it to
  come from. Carry bio, focus and linkedinUrl on the CMS person and this whole
  lookup goes away.
*/
function profileFor(member, accent) {
  const builtIn = BUILT_IN_PROFILES.get(member.name.trim().toLowerCase());
  if (!builtIn) return null;

  const based = member.meta.includes('·') ? member.meta.split('·')[0].trim() : '';

  return {
    ...builtIn,
    name: member.name,
    role: member.role,
    based: based || builtIn.based,
    accent,
  };
}

/*
  The built-in section copy, written in the shape lib/aboutPage.js returns — the
  orange half of the headline becoming the `**accent**` the API parses back into
  `accent: true`, so a freshly seeded API publishes this very heading and the swap
  is invisible.
*/
const FALLBACK_SECTION = {
  eyebrow: 'People & principles',
  headingLines: [
    [
      { text: 'The team behind UpWon — ', accent: false },
      { text: 'and what we live by.', accent: true },
    ],
  ],
  subtext:
    'Six senior leads. Four operating principles. Each principle is a hiring filter, a product gate and a customer promise — not a poster.',
};

/*
  One authored heading, rendered line by line with the accented parts in the
  orange gradient — the same renderer the home hero, the Contact hero and the
  Partner hero use. It reproduces exactly the markup this section's title has
  always had: the second half wrapped in `gradient-text-orange`.
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
  Each principle carries its own illustration. NOTE: the India file ships
  with a space in its name (`about_built_for _india.webp`), so its path is
  percent-encoded — rename the file and this entry together if it is ever
  cleaned up.
*/
const VALUES = [
  {
    name: 'Domain First',
    desc: 'We hire food, FMCG and franchise operators before software engineers. Code follows domain — not the other way around.',
    accent: '#E85A2A',
    image: '/images/about_domain_first.webp',
    width: 1326,
    height: 1187,
  },
  {
    name: 'Customer Obsession',
    desc: 'Every product manager spends one week per quarter inside a customer\'s plant, route or outlet. No proxy. No second-hand stories.',
    accent: '#00695C',
    image: '/images/about_customer_obession.webp',
    width: 1490,
    height: 1056,
  },
  {
    name: 'Simplicity at Scale',
    desc: 'A 200-outlet franchise should be as easy to run as the first one. We refuse complexity that the owner-MD cannot operate herself.',
    accent: '#1565C0',
    image: '/images/about_simplicity_at_scale.webp',
    width: 1536,
    height: 1024,
  },
  {
    name: 'India-Built for India',
    desc: 'Built in Nashik for the way India\'s food belt actually runs — multi-lingual, offline-first, statutory-native. No retrofits from Western templates.',
    accent: '#C8820A',
    image: '/images/about_built_for%20_india.webp',
    width: 1536,
    height: 1024,
  },
];

export default function TeamAndValuesSection() {
  // Which team member's detail modal is open (null = closed). Only a person the
  // page has a profile for can open it — see the note at the top of this file.
  const [selected, setSelected] = useState(null);

  /*
    The section starts as the built-in one and is swapped for the published one
    once the API answers — the same order as every other authored section on the
    site. fetchAboutTeamSection resolves to null for every failure
    (unconfigured, offline, CORS, nothing authored), and null means "keep what you
    have".
  */
  const [published, setPublished] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchAboutTeamSection().then((section) => {
      if (!cancelled && section) setPublished(section);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const copy = published ?? FALLBACK_SECTION;

  /*
    The people, in one shape whichever source they came from: the card renders
    `meta` as the grey line under the role, so a built-in person's `based` and
    `domain` are joined here exactly as the card used to join them.

    WHICH LIST WINS. The published one, whenever the section HAS a list — and that
    includes an empty one. `hasMembers` is the API saying whether any person row
    exists at all, ACTIVE or INACTIVE, so "every person is Inactive" (render the
    empty grid — somebody chose that, and putting the placeholder six back would
    republish exactly what they took down) stops being the same answer as "there is
    no person row at all" (nothing authored, keep the built-in six).
    See lib/aboutPage.js.

    `profile` is what the Learn more popup needs, and the CMS does not hold it —
    see the note at the top of this file.
  */
  const people = useMemo(() => {
    if (published?.hasMembers) {
      return published.members.map((member, i) => {
        const accent = ACCENTS[i % ACCENTS.length];
        return {
          name: member.name,
          role: member.role,
          meta: member.meta,
          photo: member.photo,
          photoAlt: member.photoAlt,
          accent,
          profile: profileFor(member, accent),
        };
      });
    }

    return TEAM.map((member) => ({
      name: member.name,
      role: member.role,
      meta: `${member.based} · ${member.domain}`,
      photo: null,
      photoAlt: null,
      accent: member.accent,
      profile: member,
    }));
  }, [published]);

  return (
    <section
      id="team"
      className="relative overflow-hidden bg-white py-10 sm:py-12 lg:py-14 scroll-mt-32"
    >
      <div className="absolute inset-0 grid-bg-light opacity-30" />
      <Container className="relative">
        <SectionIntro
          // Blank is not reachable from the panel — the server requires an
          // eyebrow — so this only covers a row that somehow lost one.
          eyebrow={copy.eyebrow ?? FALLBACK_SECTION.eyebrow}
          title={<Heading lines={copy.headingLines} />}
          description={copy.subtext}
        />

        {/* Team grid — people, not cards: a tinted avatar circle, the name,
            the role, and a "Learn more" control that opens the profile. No
            border or panel, so the row reads as a set of faces rather than a
            set of tiles. */}
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {people.map((member, i) => {
            /*
              The first two words' initials — 'Neil SR Mashalkar' → 'NS' — which
              is what these cards have always shown. The founder card on the same
              page derives its monogram differently ('NM', first and last); the
              API returns no `initials` field for either, deliberately, because
              one server-side rule would have had to silently change one of them.
            */
            const initials = member.name
              .split(' ')
              .map((w) => w[0])
              .filter(Boolean)
              .slice(0, 2)
              .join('')
              .toUpperCase();
            return (
              <motion.article
                key={member.name + i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group flex min-w-0 flex-col items-start"
              >
                {/* A published headshot sits where the monogram would, at the
                    same 96px circle; the admin panel holds it to a square crop
                    (400x400 minimum), which is what object-cover in a circle
                    needs. Without one the monogram stands in — a tint of the
                    person's accent rather than a solid block, to sit as quietly
                    as a photograph would. */}
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.photoAlt ?? `${member.name}, ${member.role}`}
                    width={400}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    className="h-[96px] w-[96px] shrink-0 rounded-full object-cover transition-transform duration-500 group-hover:-translate-y-0.5"
                    style={{ background: `${member.accent}1f` }}
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="grid h-[96px] w-[96px] shrink-0 place-items-center rounded-full transition-transform duration-500 group-hover:-translate-y-0.5"
                    style={{ background: `${member.accent}1f` }}
                  >
                    <span
                      className="h-display text-[26px] font-bold tracking-tight"
                      style={{ color: member.accent }}
                    >
                      {initials}
                    </span>
                  </span>
                )}

                <h3 className="mt-5 h-display text-[19px] font-bold leading-snug tracking-tight text-navy-950">
                  {member.name}
                </h3>

                <p className="mt-2 text-[14.5px] leading-relaxed text-navy-700">
                  {member.role}
                </p>

                <p className="mt-1 text-[13px] leading-relaxed text-navy-500">
                  {member.meta}
                </p>

                {/* Rendered only for a person the page has a profile for — see
                    BUILT_IN_PROFILES and the note at the top of this file. */}
                {member.profile && (
                  <button
                    type="button"
                    onClick={() => setSelected(member.profile)}
                    aria-haspopup="dialog"
                    className="mt-4 inline-flex items-center gap-2 rounded-full text-[13.5px] font-semibold text-navy-950 transition-colors duration-300 hover:text-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40"
                  >
                    Learn more
                    <span
                      aria-hidden="true"
                      className="grid h-6 w-6 place-items-center rounded-full bg-navy-950 text-white transition-colors duration-300 group-hover:bg-orange-500"
                    >
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} />
                    </span>
                  </button>
                )}
              </motion.article>
            );
          })}
        </div>

        {/* 4 core values */}
        <div className="mt-20">
          <div className="text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.22em] text-orange-700">
              <Compass className="h-3 w-3" />
              The four operating principles
            </p>
            <h3 className="mt-4 font-display text-balance text-[1.7rem] font-bold leading-tight text-navy-950 md:text-[2.1rem]">
              What we measure ourselves against —{' '}
              <span className="gradient-text-orange">every quarter.</span>
            </h3>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <motion.article
                key={v.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-enterprise"
                style={{ borderColor: '#E4E7EB' }}
              >
                {/* Accent top edge on hover */}
                <span
                  className="pointer-events-none absolute inset-x-0 -top-px z-10 h-px scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${v.accent}, transparent)`,
                  }}
                />

                {/* Illustration. The files are drawn on white with no ground
                    of their own, so the card supplies a tint of the accent
                    behind them and `object-contain` keeps each scene whole. */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{ background: `${v.accent}0f` }}
                >
                  <img
                    src={v.image}
                    alt=""
                    aria-hidden="true"
                    width={v.width}
                    height={v.height}
                    loading="lazy"
                    decoding="async"
                    className="mx-auto block aspect-[4/3] w-full object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p
                    className="text-[10.5px] font-bold uppercase tracking-[0.22em]"
                    style={{ color: v.accent }}
                  >
                    Principle {String(i + 1).padStart(2, '0')}
                  </p>
                  <h4 className="mt-1 font-display text-[18px] font-bold leading-tight text-navy-950">
                    {v.name}
                  </h4>
                  <p className="mt-2 text-[14px] leading-relaxed text-navy-700">
                    {v.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </Container>

      {/* Member detail modal — opened by clicking any team card */}
      <TeamMemberModal member={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

// ─── Team member detail modal ────────────────────────────────────────────────
// Centred dialog over a dark blurred backdrop — same shell conventions as the
// site's other modals (portal on document.body, framer-motion enter/exit, body
// scroll-lock, closes on backdrop click / ESC / × button). `member` being null
// keeps it closed; passing a member object opens it.
function TeamMemberModal({ member, onClose }) {
  const open = Boolean(member);

  useEffect(() => {
    if (!open) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (typeof document === 'undefined') return null;

  const initials = member
    ? member.name
        .split(' ')
        .map((w) => w[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '';

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/65 px-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${member.name} — ${member.role}`}
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-cream-300 bg-white shadow-enterprise-lg"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-navy-700 shadow-sm transition-colors hover:bg-cream-100"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header — accent-tinted band with avatar + name + role */}
            <div
              className="px-7 pb-6 pt-8"
              style={{ background: `linear-gradient(135deg, ${member.accent}14, #ffffff)` }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl font-display text-xl font-bold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${member.accent}, ${member.accent}cc)`,
                    boxShadow: `0 10px 22px -8px ${member.accent}66`,
                  }}
                >
                  {initials}
                </div>
                <div className="min-w-0 pt-1">
                  {member.pinned && (
                    <span
                      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.18em] text-white"
                      style={{ background: member.accent }}
                    >
                      Founder
                    </span>
                  )}
                  <h3 className="mt-1 font-display text-xl font-bold leading-tight text-navy-950">
                    {member.name}
                  </h3>
                  <p
                    className="mt-0.5 text-[12px] font-semibold uppercase tracking-[0.16em]"
                    style={{ color: member.accent }}
                  >
                    {member.role}
                  </p>
                  <p className="mt-2 inline-flex items-center gap-1.5 text-[14px] text-navy-600">
                    <MapPin className="h-3.5 w-3.5" style={{ color: member.accent }} />
                    {member.based}
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="border-t border-cream-200 px-7 py-6">
              <p className="text-[14px] leading-relaxed text-navy-700">{member.bio}</p>

              {member.focus?.length > 0 && (
                <div className="mt-5">
                  <p className="inline-flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.22em] text-navy-500">
                    <Briefcase className="h-3 w-3" style={{ color: member.accent }} />
                    Focus areas
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {member.focus.map((f) => (
                      <span
                        key={f}
                        className="rounded-full px-3 py-1 text-[14px] font-medium"
                        style={{ background: `${member.accent}12`, color: member.accent }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label={`${member.name} on LinkedIn`}
                className="mt-6 inline-flex items-center gap-1.5 rounded-lg border border-cream-300 px-4 py-2 text-[14px] font-semibold text-navy-700 transition-colors hover:border-navy-300 hover:text-navy-950"
              >
                <Linkedin className="h-3.5 w-3.5" />
                Connect on LinkedIn
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
