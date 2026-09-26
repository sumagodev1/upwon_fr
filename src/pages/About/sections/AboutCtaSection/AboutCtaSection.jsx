import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { m as motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import { fetchAboutCta } from '../../../../lib/aboutPage.js';

/*
  The closing CTA, directly above the footer on /about.

  Its heading, its subtext and both pieces of artwork are authored in the admin
  panel's About Us → CTA Section tab. The heading uses the home hero's two
  markers — a newline for a line break, `**like this**` for the orange accent —
  and arrives parsed into `headingLines`. The two buttons are behaviour, not
  content, and stay in this file; there is no eyebrow on this banner and never
  has been.

  TWO image slots, because this banner is two compositions rather than two sizes
  of one file: the wide scene below runs at its natural 8:3 with the copy over
  the sky at its right, and the narrow one is a portrait scene with the copy in
  the clear space under the desk. They swap at Tailwind's `lg` and the published
  COPY applies to both.

  Each slot keeps its own built-in artwork as its fallback, and an unpublished
  mobile slot is the ordinary state rather than a gap: a banner with no crop
  authored renders exactly as this section did before the slot existed. What the
  narrow block does NOT do is fall back to the wide file — at that width
  object-cover would show a centre sliver of it, which is the whole reason the
  second slot was worth having.
*/

const EASE = [0.22, 1, 0.3, 1];

const BG_DESKTOP = '/images/about_cta_desktop.webp';
const BG_MOBILE = '/images/about_us_cta_mobile.webp';

/*
  Up to what width the portrait artwork is served — NOT the 767px the home hero
  and HeroSlider use for theirs, and not PageHero's 539px either.

  Those three bands are ONE picture that resizes across the whole range, so each
  had to find the width where its own shape stops being portrait and hand over
  there. This banner is not that: it is two separate DOM blocks swapped by
  `hidden lg:block` / `block lg:hidden`, so its aspect does not drift and then
  flip — it flips exactly at Tailwind's `lg`, and the crop is right for
  everything below it, tablets included.

  Measured on /about, the narrow block's own box: 342x691 (0.50) at a 390px
  viewport, 678x941 (0.72) at 768, 934x1154 (0.81) at 1023 — portrait the whole
  way — and at 1024 the other block takes over at 886x332 (2.67, the wide file's
  own 8:3). So 1024px is where the crop stops, and it is the CSS breakpoint above
  that decides it: move either `lg:` class and this has to move with it.

  WHY .98 AND NOT A ROUND 1023px. Tailwind's `lg:` is `(min-width: 1024px)`, so
  the widths this block is visible at are every width BELOW 1024 — not every width
  up to 1023. Viewport widths are fractional whenever the device pixel ratio is
  not a whole number, which on Windows at 125% scaling is the ordinary case: a
  1279px-wide window there reports 1023.2 CSS px. `(max-width: 1023px)` does not
  match 1023.2, and neither does `(min-width: 1024px)` — so the portrait block was
  displayed while the browser resolved this <picture> to the WIDE file and painted
  an 8:3 banner object-cover into a 0.81 box, which is the exact failure the second
  slot exists to prevent. Measured in Chrome at an emulated 1023px viewport with
  devicePixelRatio 1.25: the narrow block displayed, `(max-width: 1023px)` false,
  `(max-width: 1023.98px)` true.

  The .98 rather than `not all and (min-width: 1024px)` is Bootstrap's convention
  and is kept here for the same reason: a plain max-width reads the same way as the
  rest of the site's <source> media, and the 0.02px it gives up is finer than any
  device can render. The other three bands (HeroSlider's 767, PageHero's 539) have
  the same off-by-a-fraction edge and are left alone here — they are shared
  components on the hero pattern rather than this section, and their fallback <img>
  is the same photograph rather than a different composition.

  Paired with the 840x1680 target in the server's about-image-spec.ts (`ctaMobile`)
  and the admin panel's hint for this slot; changing this means changing those.
*/
const MOBILE_SOURCE_MEDIA = '(max-width: 1023.98px)';

/*
  The built-in banner, written in the shape lib/aboutPage.js returns — the orange
  last line becoming the `**accent**` the API parses back into `accent: true`, so
  a freshly seeded API publishes this very banner and the swap is invisible.

  It is the fallback, not the source of truth: what the SSG build bakes into the
  prerendered HTML and what renders if the API is unreachable.

  The heading echoes the line printed on the office wall in the artwork itself.
*/
const FALLBACK_CTA = {
  headingLines: [
    [
      { text: 'Smarter Businesses. Stronger Industries. ', accent: false },
      { text: 'Brighter Futures.', accent: true },
    ],
  ],
  subtext:
    'Nine years inside India’s food belt, seven integrated platforms and 50+ live deployments. See what that adds up to for your own operations.',
  image: BG_DESKTOP,
  mobileImage: BG_MOBILE,
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
  Both crops are bright, so the copy runs navy here rather than reversing
  out to white the way the dark CTA artwork elsewhere on the site does.
*/
function CtaButtons({ compact = false }) {
  const height = compact ? 'min-h-[48px]' : 'min-h-[52px]';
  const width = compact ? 'w-full' : 'w-full sm:w-auto';

  return (
    <>
      <Link
        to="/demo"
        className={`group inline-flex ${height} ${width} items-center justify-center gap-2 rounded-[9px] bg-orange-500 px-6 text-[14px] font-semibold text-white shadow-[0_12px_30px_rgba(232,90,42,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 active:scale-[0.99]`}
      >
        Book a Free Demo
        <ArrowRight
          size={17}
          strokeWidth={2}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>

      <Link
        to="/contact"
        className={`group inline-flex ${height} ${width} items-center justify-center gap-2 rounded-[9px] border border-navy-950/20 bg-white/70 px-6 text-[14px] font-semibold text-navy-950 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-navy-950/35 hover:bg-white/90 active:scale-[0.99]`}
      >
        Talk to Our Team
        <ArrowRight
          size={17}
          strokeWidth={2}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </>
  );
}

export default function AboutCtaSection() {
  /*
    The banner starts as the built-in one and is swapped for the published one
    once the API answers — the same order as every other authored section on the
    site. fetchAboutCta resolves to null for every failure (unconfigured,
    offline, CORS, nothing authored), and null means "keep what you have".
  */
  const [cta, setCta] = useState(FALLBACK_CTA);

  useEffect(() => {
    let cancelled = false;

    fetchAboutCta().then((published) => {
      if (!cancelled && published) setCta(published);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // Null means either slot was published empty — or, for the mobile one, simply
  // never filled in. Both read the same way and the house files answer for both:
  // each block is a photograph with copy laid over it and has nothing to render
  // without one. The two are resolved separately because they are separate
  // compositions; neither ever stands in for the other.
  const desktopImage = cta.image || BG_DESKTOP;
  const mobileImage = cta.mobileImage || BG_MOBILE;

  return (
    <section className="relative w-full bg-white py-10 sm:py-12 lg:py-14">
      {/* Rounded card on the page's standard Container width, so its edges
          line up with every section above it rather than running wider.
          `overflow-hidden` is what clips the photograph to the radius. */}
      <Container>
        <div className="relative overflow-hidden rounded-[20px] shadow-[0_18px_50px_rgba(25,35,55,0.08)] ring-1 ring-navy-950/[0.06] sm:rounded-[24px]">
          {/* =========================================================
              DESKTOP — the artwork renders at its natural 2048x768 ratio.
              The laptop and the wall copy occupy the left third, so the
              page's own copy sits on the right, over the sky.
          ========================================================= */}
          <div className="relative hidden w-full lg:block">
            {/* The width/height pair is the shipped artwork's 2048x768 (8:3) and
                stays put for a published banner: the image runs h-auto w-full, so
                these two only reserve the box before it loads, and the admin
                panel holds an upload to within 15% of that ratio.

                A BARE <img>, deliberately, and NOT the <picture> the narrow block
                below has — and it costs a phone NOTHING, which is the opposite of
                what an earlier note here claimed.

                THAT NOTE SAID a `display: none` image has no box to intersect and
                so loads eagerly rather than lazily, and priced the bare <img> at
                "one 107KB download on a phone". Measured rather than reasoned, it
                is false: Chrome does not start a `loading="lazy"` image that is
                inside a `display: none` subtree at all. On /about at an emulated
                375x812 viewport, fully settled, there is NO request for either CTA
                file, and this <img> reports complete=false, naturalWidth=0. The
                isolated control confirms the mechanism — same hidden container, the
                same src: with loading="lazy" nothing is fetched; with
                loading="eager" it is fetched immediately at 2048x768. So each
                viewport downloads exactly ONE banner: a phone the portrait crop the
                <source> below picks, a desktop this file, and neither pays for the
                block it is not showing.

                What remains true is the reason a <source> here would be a bad
                trade even at zero cost. THIS block sizes the card: `h-auto` means
                the height comes from whatever file the <img> holds, and
                `width`/`height` give it `aspect-ratio: auto 8/3` — the `auto`
                defers to the loaded image. Handing this img a second, portrait
                candidate makes the card's own height depend on which candidate won,
                for a saving that is already zero. It stays a bare <img>, exactly as
                it was before the mobile slot existed. */}
            <img
              src={desktopImage}
              alt=""
              aria-hidden="true"
              width={2048}
              height={768}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />

            {/* Scrim — kept deliberately light so the photograph reads at
                full strength. It only firms up the far right, where the copy
                sits, and clears entirely by the middle of the frame so the
                sunset, skyline and laptop keep their colour. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-l from-white/55 via-white/15 to-transparent"
            />

            {/* The copy occupies the right half of the frame and is centred
                within it, so the gutters either side of it stay even instead
                of the block drifting toward one edge. */}
            <div className="absolute inset-0 flex items-center">
              <div className="ml-auto flex w-1/2 justify-center px-6 sm:px-8 lg:px-10">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="flex w-full max-w-[420px] flex-col items-start text-left xl:max-w-[500px]"
                >
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65, delay: 0.05, ease: EASE }}
                    className="h-display text-[26px] leading-[1.1] tracking-tight text-navy-950 xl:text-[31px] 2xl:text-[36.8px]"
                  >
                    <Heading lines={cta.headingLines} />
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                    className="mt-4 text-[13.5px] leading-relaxed text-navy-700 lg:max-w-[92%] xl:text-[15px]"
                  >
                    {cta.subtext}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
                    className="mt-7 flex w-full flex-col items-stretch gap-3 xl:w-auto xl:flex-row xl:items-start"
                  >
                    <CtaButtons />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* =========================================================
              MOBILE / TABLET — its own portrait artwork, with the copy
              sitting in the clear space it leaves beneath the desk.
          ========================================================= */}
          <div className="relative block w-full overflow-hidden lg:hidden">
            {/* Cropped from the top rather than shown whole: the file carries
                a long run of empty desk below the laptop that would otherwise
                open a gap between the scene and the copy. A published crop is
                held to a 1:2 portrait target, so it is cropped the same way.

                A <picture>, and the only one in this section. The <source> is what
                the published crop arrives on, and the browser resolves it before
                any of our code runs, the way the heroes do it. The <img> behind it
                is the WIDE file, not a second copy of the narrow one, so the branch
                a desktop takes here is the URL the visible block above is fetching
                anyway. Belt and braces: measured, a lazy <img> inside a
                `display: none` subtree is not fetched at all (see the wide block's
                note), so this costs nothing — and if a browser did fetch it, it
                would be a cache hit rather than a second download of artwork nobody
                will see. It is never displayed either way: at every width this
                <img> is chosen, this whole block is `display: none`.

                Safe here in a way the same trick is NOT safe on the wide block
                (see the comment there): this box is `absolute inset-0` and sized
                entirely by CSS, so a viewport dragged the other way, leaving this
                img briefly holding the wide file until the crop loads, paints the
                wrong artwork for those milliseconds but cannot move the layout by
                a pixel. The wide block's height comes from its file, which is why
                that one stays a bare <img>.

                No width/height pair: the box is `absolute inset-0` and sized
                entirely by CSS, so the attributes reserve nothing and could only
                mis-describe whichever file was chosen. The wide block keeps its
                pair because that one's height really does come from the file.

                The <picture> takes the positioning and the <img> fills it, as in
                HeroSlider and PageHero — an empty inline <picture> around an
                out-of-flow <img> would be a zero-height line box by the letter of
                the spec, and `block` means not having to rely on that. */}
            <picture className="absolute inset-0 block h-full w-full">
              <source media={MOBILE_SOURCE_MEDIA} srcSet={mobileImage} />
              <img
                src={desktopImage}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
            </picture>

            {/* The padding-top is a share of the block's own width, so the
                copy always starts just under the desk however wide the
                screen is. */}
            <div className="relative px-6 pb-10 pt-[95%] text-left sm:px-8 sm:pb-12">
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: EASE }}
                className="h-display w-full text-[27px] leading-[1.1] tracking-tight text-navy-950"
              >
                <Heading lines={cta.headingLines} />
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
                className="mt-3 w-full text-[14.5px] leading-relaxed text-navy-700"
              >
                {cta.subtext}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.14, ease: EASE }}
                className="mt-6 flex w-full flex-col gap-2.5"
              >
                <CtaButtons compact />
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
