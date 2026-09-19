import { m as motion } from 'framer-motion';
import Eyebrow from './Eyebrow.jsx';

/*
  Section intro — the site's standard eyebrow / headline / subtext block.

  One place for the cadence every section shares: the eyebrow fades in, the
  headline and subtext rise behind it, and the type sits on the same ramp
  (28 → 32 → 36.8px headline, 14.5 → 15px subtext) at every breakpoint.

  This is the newer of the two heading components. `SectionHeading` is the
  original and is still used across the product and industry pages at a
  flat 36.8px; prefer this one for anything being brought onto the current
  pattern.
*/

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

const GROUP = {
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

export default function SectionIntro({
  eyebrow,
  title,
  description,
  align = 'center',
  // 'light' (default) for navy type on a light ground, 'dark' for white
  // type on a dark one.
  variant = 'light',
  className = '',
  titleClassName = '',
}) {
  const isCenter = align === 'center';
  const isDark = variant === 'dark';

  return (
    <motion.div
      variants={GROUP}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className={`${
        isCenter ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'
      } ${className}`}
    >
      {eyebrow && (
        <motion.div variants={FADE_IN}>
          <Eyebrow
            variant={isDark ? 'dark' : 'light'}
            className={isCenter ? 'justify-center' : ''}
          >
            {eyebrow}
          </Eyebrow>
        </motion.div>
      )}

      <motion.h2
        variants={FADE_UP}
        className={`mt-3 h-display text-[28px] leading-[1.12] tracking-tight sm:text-[32px] lg:text-[36.8px] ${
          isDark ? 'text-white' : 'text-navy-950'
        } ${titleClassName}`}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          variants={FADE_UP}
          className={`mt-4 max-w-2xl text-[14.5px] leading-relaxed sm:text-[15px] ${
            isCenter ? 'mx-auto' : ''
          } ${isDark ? 'text-cream-100/75' : 'text-navy-600'}`}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
