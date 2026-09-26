import { useCallback, useEffect, useState } from 'react';
import { m as motion } from 'framer-motion';
import { ArrowRight, MapPin, Users } from 'lucide-react';
import Container from '../../components/shared/Container/Container.jsx';
import PageHero from '../../components/shared/PageHero/PageHero.jsx';
import SectionHeading from '../../components/shared/SectionHeading/SectionHeading.jsx';
import Seo from '../../components/shared/Seo/Seo.jsx';
import VacancyModal from '../../components/shared/VacancyModal/VacancyModal.jsx';
import { fetchCareerVacancies } from '../../lib/careers.js';

/*
  /careers

  Open Roles is authored in the admin panel's Career → Vacancy Management tab
  and read back through lib/careers.js. Everything else on this page — the
  hero, the three things we believe, and the "no matching role?" block under
  the list — is static and stays that way; nobody asked for them to be
  authored, and the list is the only part a recruiter needs to change weekly.

  Like the Insider and Contact sections, the list starts from the built-in
  ROLES below — what the SSG build bakes into the prerendered HTML and what
  renders if the API is unreachable — and swaps to the published vacancies once
  the API answers.
*/

/*
  The built-in roles, written in the shape lib/careers.js returns so the
  fetched and the built-in list render through one path — the same choice
  ContactPage's FALLBACK_FORM makes.

  These are the six this page has always shown, and they are also what the
  backend's seed inserts into an empty career_vacancies, so a freshly seeded
  API publishes exactly this list in exactly this order and the swap is
  invisible. The one rewrite is that "Nashik · On-site" is split into the
  `location` and `workMode` the API sends separately; the row prints them back
  with the same separator, so not a pixel of the prerendered markup moves.

  `id: null` is the load-bearing field. A vacancy id is what an application is
  filed against, and these six have none — they are text in a bundle, not rows
  anything could be stored against. So a role without an id keeps the mailto:
  link this page has always had, and only a published one opens the popup with
  its apply form. That is not a compromise, it is the honest reading: with no
  API there is nowhere for an application to go, and a "Send application"
  button over a request that cannot happen is exactly the lie the popup exists
  to stop telling. It also keeps the prerendered list working before hydration
  and with JavaScript off, which a button would not.

  The four fields below are the ones the row prints. The popup's fields —
  description, requirements, skills — are deliberately absent: an id-less role
  never opens one, and inventing bullet points for a job advert that nobody
  authored would be worse than showing none.
*/
const ROLES = [
  {
    id: null,
    title: 'Senior Full-Stack Engineer (Node + React)',
    department: 'Engineering',
    location: 'Nashik',
    workMode: 'On-site',
  },
  {
    id: null,
    title: 'Mobile Lead (React Native)',
    department: 'Engineering',
    location: 'Nashik',
    workMode: 'Hybrid',
  },
  {
    id: null,
    title: 'Product Manager — Manufacturing',
    department: 'Product',
    location: 'Nashik',
    workMode: 'Hybrid',
  },
  {
    id: null,
    title: 'Implementation Consultant — Bakery & QSR',
    department: 'Delivery',
    location: 'Pan-India',
    workMode: 'Field',
  },
  {
    id: null,
    title: 'Enterprise Account Executive',
    department: 'Sales',
    location: 'Mumbai / Pune',
    workMode: 'On-site',
  },
  {
    id: null,
    title: 'Customer Success Manager',
    department: 'Customer Success',
    location: 'Nashik',
    workMode: 'On-site',
  },
];

const VALUES = [
  { title: 'Inside the factory, not the conference room', desc: 'We learn from the shop floor, not from slide decks.' },
  { title: 'Premium without arrogance', desc: 'We win on outcomes, not on volume.' },
  { title: 'Senior, small, sharp', desc: '30 people doing the work of 300. Quality over headcount.' },
];

export default function CareersPage() {
  /*
    The published vacancies, or the built-in list until the API answers.

    The fetch resolves to null only when nothing was learned — unconfigured,
    offline, CORS, a non-2xx — and null means "keep what you have", so a CMS
    outage never leaves this page claiming nobody is hiring. An empty ARRAY is
    a different answer and is taken at face value: the API replied and nothing
    is published, so the list says so rather than restoring six hardcoded roles
    the company may no longer be hiring for, as mailto: links with no vacancy
    row behind them. See lib/careers.js.
  */
  const [roles, setRoles] = useState(ROLES);

  /*
    The open role. `selected` outlives `open` on purpose: AnimatePresence keeps
    the dialog mounted through its exit animation, and clearing the vacancy on
    close would blank the panel while it fades.
  */
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  // `published` may be an empty array, which is an answer; only null means
  // "nothing was learned, keep what you have".
  const loadVacancies = useCallback(async () => {
    const published = await fetchCareerVacancies();
    if (published !== null) setRoles(published);
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetchCareerVacancies().then((published) => {
      if (!cancelled && published !== null) setRoles(published);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  /*
    The role was taken down while somebody was filling its form in — the server
    refused the submit, and the popup has already told them so. Re-read the
    list, so the row goes with it and nobody else starts an application that
    cannot be filed.
  */
  const handleVacancyClosed = useCallback(() => {
    void loadVacancies();
  }, [loadVacancies]);

  const openVacancy = (vacancy) => {
    setSelected(vacancy);
    setOpen(true);
  };

  /*
    Memoised, and it has to be: VacancyModal's scroll-lock/ESC/focus-trap effect
    hands focus back in its cleanup, so a fresh arrow function on every render
    would tear that effect down and back up while the dialog is open — pulling
    focus out of the panel. handleVacancyClosed re-renders this component with
    the dialog open by design, which is exactly when that happened.
  */
  const closeVacancy = useCallback(() => setOpen(false), []);

  return (
    <>
      <Seo
        title="Careers — Build UpWon at Byte Elephants"
        description="Join the team building UpWon — India's food-first enterprise suite. Engineering, product, implementation, sales and customer success roles in Nashik and pan-India."
        keywords="UpWon careers, Byte Elephants jobs, food ERP jobs Nashik, implementation consultant"
        canonical="https://upwon.in/careers"
      />
      <PageHero
        breadcrumb={[
          { label: 'Home', to: '/' },
          { label: 'Careers' },
        ]}
        eyebrow="Join Byte Elephants · UpWon"
        title={
          <>
            Build the operating system <br />
            for <span className="gradient-text-orange">India's food industry.</span>
          </>
        }
        description="A senior, small, fast-moving team building enterprise software inside real food businesses. If you want to do the most consequential work of your career — read on."
      />

      <section className="relative overflow-hidden bg-cream-100 section-pad">
        <div className="absolute inset-0 grid-bg-light opacity-50" />
        <Container className="relative">
          <SectionHeading
            align="center"
            variant="light"
            eyebrow="How we work"
            title="Three things we believe about the work."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="rounded-2xl border border-cream-300 bg-white p-7 shadow-sm"
              >
                <p className="num-display text-3xl text-orange-600">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-4 text-base font-bold text-navy-950">{v.title}</h3>
                <p className="mt-2 text-sm text-charcoal">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-white section-pad">
        <Container className="relative">
          <SectionHeading
            align="center"
            variant="light"
            eyebrow="Open roles"
            title="Currently hiring."
            description="Don't see your role? Email us anyway — we hire ahead of need for exceptional people."
          />

          {/*
            An empty list is a real state, not a failure: the API answered and
            nothing is published. It is said plainly and once, because the
            "No matching role?" block below already gives the address to write
            to and repeating it here would only read as an error.
          */}
          <div className="mt-12 overflow-hidden rounded-2xl border border-cream-300 bg-white shadow-sm">
            {roles.length === 0 ? (
              <div className="px-6 py-14 text-center">
                <MapPin className="mx-auto h-6 w-6 text-orange-500" />
                <p className="mt-3 font-semibold text-navy-950">
                  No open roles right now.
                </p>
                <p className="mx-auto mt-2 max-w-md text-sm text-charcoal">
                  We are not advertising anything this week — but we hire ahead of need.
                  Send us your CV using the address below and we will read it.
                </p>
              </div>
            ) : (
              roles.map((role, i) => (
                <RoleRow
                  key={role.id ?? role.title}
                  role={role}
                  index={i}
                  last={i === roles.length - 1}
                  onOpen={() => openVacancy(role)}
                />
              ))
            )}
          </div>

          <div className="mt-10 rounded-2xl border border-orange-300 bg-orange-50 p-6 text-center">
            <Users className="mx-auto h-6 w-6 text-orange-600" />
            <p className="mt-3 font-semibold text-navy-950">No matching role?</p>
            <p className="mt-1 text-sm text-charcoal">
              Email us at{' '}
              <a href="mailto:hello@upwon.in" className="font-semibold text-orange-600">
                hello@upwon.in
              </a>{' '}
              with your portfolio. We hire ahead of need for exceptional people.
            </p>
          </div>
        </Container>
      </section>

      <VacancyModal
        open={open}
        vacancy={selected}
        onClose={closeVacancy}
        onVacancyClosed={handleVacancyClosed}
      />
    </>
  );
}

/*
  One row of the Open Roles list.

  A published vacancy is a button that opens the popup; a built-in one is the
  mailto: link this page has always used, because there is no row for an
  application to be filed against — see the note on ROLES above. Both are
  rendered from the same markup and the same classes, so the two are
  indistinguishable on the page apart from what pressing them does.
*/
function RoleRow({ role, index, last, onOpen }) {
  const animation = {
    initial: { opacity: 0, x: -8 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.4, delay: (index % 6) * 0.04 },
  };

  const className = `group flex w-full flex-col gap-3 p-5 text-left transition-colors hover:bg-cream-100 sm:flex-row sm:items-center sm:justify-between ${
    last ? '' : 'border-b border-cream-300'
  }`;

  const inner = (
    <>
      <div>
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-orange-600">
          {role.department}
        </span>
        <p className="mt-1 text-base font-semibold text-navy-950 group-hover:text-orange-600">
          {role.title}
        </p>
      </div>
      <div className="flex items-center gap-3 text-[14px] text-navy-600">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-orange-500" />
          {role.location} · {role.workMode}
        </span>
        <ArrowRight className="h-4 w-4 shrink-0 text-orange-600 transition-transform group-hover:translate-x-1" />
      </div>
    </>
  );

  if (!role.id) {
    return (
      <motion.a
        {...animation}
        href={`mailto:hello@upwon.in?subject=Application — ${role.title}`}
        className={className}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...animation}
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      className={className}
    >
      {inner}
    </motion.button>
  );
}
