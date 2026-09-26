import { useEffect, useState } from 'react';
import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import { ALL_CASES } from '../../../../data/caseStudy.js';
import { fetchClientsCases } from '../../../../lib/clientsPage.js';

/*
  Featured Case Studies
  "What Growth Actually Looks Like on UpWon." on /clients

  Authored in the admin panel (Clients → Case Studies): the eyebrow, heading
  and subtext as section copy, and one card per client.
*/

const EASE = [0.22, 1, 0.3, 1];

const HEADING_VIEWPORT = { once: true, amount: 0.1 };

const HEADING_GROUP = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const FADE_IN = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.55, ease: EASE } },
};

const FADE_UP = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/*
  The built-in section.

  This is the fallback, not the source of truth: what is published through
  the admin panel replaces it at runtime. It is what the SSG build bakes into
  the prerendered HTML and what renders if the API is unreachable. Written in
  the shape lib/clientsPage.js returns, so both take one render path.
*/
const FALLBACK = {
  eyebrow: 'RESULTS THAT SPEAK FOR THEMSELVES',
  headingLines: [
    [
      { text: 'What Growth Actually Looks Like ', accent: false },
      { text: 'on UpWon.', accent: true },
    ],
  ],
  subtext:
    'Three businesses, named and on the record — what each one was wrestling with, and what changed once their operations came together on one platform.',
  cards: ALL_CASES.map((c) => ({
    category: c.category,
    brand: c.brand,
    location: c.location,
    scale: c.scale,
    headline: c.headline,
    outcomes: c.outcomes.slice(0, 3),
    storyUrl: `/clients/${c.slug}`,
  })),
};

/** Site paths go through the router; absolute URLs are plain links. */
function StoryLink({ to }) {
  const className =
    'mt-6 inline-flex items-center gap-1 text-sm font-semibold text-orange-600 group-hover:text-orange-700';
  const content = (
    <>
      Read the full story
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </>
  );

  return to.startsWith('/') ? (
    <Link to={to} className={className}>
      {content}
    </Link>
  ) : (
    <a href={to} className={className} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  );
}

export default function ClientsCasesSection() {
  /*
    Starts as the built-in section and is swapped for the published one once
    the API answers. fetchClientsCases resolves to null for every failure, and
    null means "keep what you have".
  */
  const [section, setSection] = useState(FALLBACK);

  useEffect(() => {
    let cancelled = false;
    fetchClientsCases().then((published) => {
      if (cancelled || !published) return;
      setSection(published);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-cream-100 py-10 sm:py-12 lg:py-14">
      <div className="absolute inset-0 grid-bg-light opacity-50" />
      <Container className="relative">
        <motion.div
          variants={HEADING_GROUP}
          initial="hidden"
          whileInView="visible"
          viewport={HEADING_VIEWPORT}
          className="mx-auto max-w-3xl text-center"
        >
          {section.eyebrow && (
            <motion.div variants={FADE_IN}>
              <Eyebrow className="justify-center">{section.eyebrow}</Eyebrow>
            </motion.div>
          )}

          <motion.h2
            variants={FADE_UP}
            className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
          >
            <HeadingLines lines={section.headingLines} />
          </motion.h2>

          {section.subtext && (
            <motion.p
              variants={FADE_UP}
              className="mx-auto mt-4 max-w-2xl text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
            >
              {section.subtext}
            </motion.p>
          )}
        </motion.div>

        <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-3">
          {section.cards.map((c, i) => (
            <motion.div
              key={`${c.brand}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="group flex flex-col rounded-2xl border border-cream-300 bg-white p-7 shadow-sm transition-all hover:border-orange-500/40 hover:shadow-enterprise"
            >
              {c.category && (
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-orange-600">
                  {c.category}
                </p>
              )}
              <h3 className="mt-2 h-display text-2xl text-navy-950">{c.brand}</h3>
              <p className="mt-1 text-[14px] text-navy-600">
                <MapPin className="mr-1 inline-block h-3 w-3 text-orange-500" />
                {[c.location, c.scale].filter(Boolean).join(' · ')}
              </p>
              <p className="mt-5 flex-1 text-[14px] italic text-charcoal">"{c.headline}"</p>

              {c.outcomes.length > 0 && (
                <div className="mt-6 grid grid-cols-3 gap-2">
                  {c.outcomes.map((o) => (
                    <div
                      key={`${o.value}-${o.label}`}
                      className="rounded-lg border border-cream-300 bg-cream-100 px-2 py-2 text-center"
                    >
                      <p className="num-display text-sm text-orange-600">{o.value}</p>
                      <p className="mt-0.5 text-[14px] leading-tight text-navy-600 line-clamp-2">
                        {o.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {c.storyUrl && <StoryLink to={c.storyUrl} />}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
