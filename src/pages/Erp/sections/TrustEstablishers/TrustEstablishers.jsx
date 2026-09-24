import { useEffect, useRef, useState } from 'react';
import { m as motion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import HexSphere from '../../../../components/shared/HexSphere/HexSphere.jsx';
import { erpIcon } from '../../../../lib/erpIcons.js';
import { fetchErpEstablishersSection } from '../../../../lib/erpPage.js';
import {
  FALLBACK_BADGES,
  FALLBACK_COPY,
  FALLBACK_LOGOS,
} from './trustEstablishersContent.js';

/*
  "Trust Establishers" — clears the final practical objections (security,
  compliance, fit with existing tools) before the page asks for a conversation.
  Kept deliberately simple — a credibility strip, not a hero moment.

  The content is the CMS's. This file renders it and nothing else: the copy, the
  badges and the sphere's logos all arrive as data, and the built-in set in
  trustEstablishersContent.js is only what the page shows before the fetch lands
  and whenever the API cannot be reached.

  The sphere's logos are the home page globe's, read from the same record - so a
  partner added in the admin panel shows up on both pages from one edit.
*/

const EASE = [0.22, 1, 0.3, 1];

export default function TrustEstablishers() {
  const [copy, setCopy] = useState(FALLBACK_COPY);
  const [badges, setBadges] = useState(FALLBACK_BADGES);
  const [logos, setLogos] = useState(FALLBACK_LOGOS);
  const [centreLogo, setCentreLogo] = useState(null);

  const wrapRef = useRef(null);
  const [sphereSize, setSphereSize] = useState(360);

  /*
   * One read on mount, guarded inside the fetcher so the SSG build never makes
   * it. Each part falls back on its own: a section whose badges have been
   * edited but whose logo list is empty should show the new badges beside the
   * built-in sphere rather than an empty circle.
   */
  useEffect(() => {
    let cancelled = false;
    fetchErpEstablishersSection().then((section) => {
      if (cancelled || !section) return;
      setCopy({
        eyebrow: section.eyebrow,
        headingLines: section.headingLines,
        subtext: section.subtext,
      });
      if (section.badges.length > 0) setBadges(section.badges);
      if (section.logos.length > 0) setLogos(section.logos);
      if (section.centreLogo) setCentreLogo(section.centreLogo);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const measure = () => {
      const w = el.clientWidth || 0;
      setSphereSize(Math.round(Math.max(260, Math.min(w, 420))));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const nodeCount = sphereSize >= 380 ? 160 : 120;

  return (
    <section className="relative overflow-hidden bg-white py-14 md:py-20">
      <div className="pointer-events-none absolute inset-0 grid-bg-light opacity-40" />

      <Container className="relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          {copy.eyebrow && <Eyebrow className="justify-center">{copy.eyebrow}</Eyebrow>}
          <h2 className="mt-3 h-display text-balance text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            <HeadingLines lines={copy.headingLines} />
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            {copy.subtext}
          </p>
        </motion.div>

        {/* Panels */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-2 lg:items-stretch">
          {/* Compliance badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, ease: EASE }}
            className="flex flex-col"
          >
            <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-orange-600">
              Compliant by design
            </p>
            <div className="mt-5 grid flex-1 grid-cols-1 place-content-center gap-3 sm:grid-cols-2">
              {badges.map((badge) => {
                const Icon = erpIcon(badge.icon);
                return (
                  <div
                    key={badge.title}
                    className="flex items-start gap-3 rounded-xl border border-cream-300 bg-white p-3.5"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-orange-500/10 text-orange-600">
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[14px] font-bold text-navy-950">{badge.title}</p>
                      <p className="mt-0.5 text-[14px] leading-snug text-navy-600">
                        {badge.subtext}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Integration sphere — the home page globe */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
          >
            <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-orange-600">
              Connected to what you already use
            </p>
            <div ref={wrapRef} className="mt-3 flex justify-center">
              <HexSphere
                size={sphereSize}
                nodeCount={nodeCount}
                logos={logos}
                // Left undefined when unset, so the sphere keeps its own default
                // rather than being handed an explicit null to work around.
                {...(centreLogo ? { logoSrc: centreLogo } : {})}
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
