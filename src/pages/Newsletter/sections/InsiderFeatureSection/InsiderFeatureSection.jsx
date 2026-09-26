import { Fragment, useEffect, useState } from 'react';
import { m as motion } from 'framer-motion';
import { CheckCircle2, Sparkles } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import { fetchInsiderFeature } from '../../../../lib/insiderPage.js';

/*
  Operations Insider — Long-form Feature Section
  The in-depth callout beneath the story grid on /newsletter and
  /newsletter/:issueSlug.

  Authored in the admin panel's Insider → Feature Section tab. The heading
  uses the home hero's two markers — a newline for a line break, `**like
  this**` for the orange accent — and arrives parsed into `headingLines`, so
  this file renders it the way the home HeroSection does and never has to
  know the marker grammar.
*/

/*
  The built-in callout — the block that used to be hard-coded in
  NewsletterPage, written in the shape lib/insiderPage.js returns.

  It is the fallback, not the source of truth: what the SSG build bakes into
  the prerendered HTML and what renders if the API is unreachable. The
  published version replaces it at runtime, and a callout published as
  switched off removes the section entirely.
*/
const FALLBACK_FEATURE = {
  badge: 'Long-form',
  eyebrow: 'IN-DEPTH FEATURE',
  headingLines: [
    [
      { text: 'Inside How Monginis Runs 200+ Outlets on ', accent: false },
      { text: 'One Platform.', accent: true },
    ],
  ],
  body: 'The full story behind a 5.7× outlet expansion without growing the back-office team — how the team mapped 18 plant SOPs in 5 days, rolled out plant-by-plant in 4 weeks, and crossed ₹20 L in daily transactions with zero P1 incidents.',
  bullets: [
    'Why hub-spoke order consolidation beat their old phone-tree process',
    'How royalty calculation went from spreadsheet to automatic',
    'The 4-phase rollout schedule that hit Day 30 go-live cleanly',
  ],
  image:
    'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=2000&q=80',
  imageAlt: 'Monginis production',
};

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

export default function InsiderFeatureSection() {
  /*
    Starts as the built-in callout and is swapped for the published one once
    the API answers, like the hero above it. Null here means "published as
    hidden" — only a real answer from the API can set it, never a failure:
    fetchInsiderFeature keeps "switched off" and "unavailable" apart.
  */
  const [feature, setFeature] = useState(FALLBACK_FEATURE);

  useEffect(() => {
    let cancelled = false;
    fetchInsiderFeature().then((published) => {
      if (cancelled || !published) return;
      setFeature(published.hidden ? null : published.feature);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!feature) return null;

  return (
    <section className="relative overflow-hidden bg-cream-100 py-10 sm:py-12 lg:py-14">
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[400px] w-[400px] rounded-full bg-orange-500/[0.06] blur-[120px]" />

      <Container className="relative">
        {/* Two columns with artwork; the copy column alone, centred to the
            same reading width, when a published callout carries no image. */}
        <div
          className={`mx-auto grid items-center gap-10 ${
            feature.image ? 'max-w-6xl lg:grid-cols-[1.1fr_1fr]' : 'max-w-3xl'
          }`}
        >
          {feature.image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-2xl border border-cream-300 shadow-enterprise"
            >
              <img
                src={feature.image}
                alt={feature.imageAlt}
                className="block aspect-[4/3] w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              {feature.badge && (
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-sm">
                  <Sparkles className="h-3 w-3" />
                  {feature.badge}
                </span>
              )}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {feature.eyebrow && <Eyebrow>{feature.eyebrow}</Eyebrow>}

            <h2 className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]">
              <Heading lines={feature.headingLines} />
            </h2>

            {feature.body && (
              <p className="mt-4 text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]">
                {feature.body}
              </p>
            )}

            {feature.bullets.length > 0 && (
              <ul className="mt-5 space-y-2.5 text-[14px] text-navy-800">
                {feature.bullets.map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            )}

          </motion.div>
        </div>
      </Container>
    </section>
  );
}
