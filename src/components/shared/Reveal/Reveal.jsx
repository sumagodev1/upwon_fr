import { m as motion } from 'framer-motion';

/**
 * Scroll-triggered reveal wrapper. Drop around any element to fade/slide it
 * in as it enters the viewport. Defaults to a soft "fade-up" — the most
 * versatile choice for sections, cards and copy blocks.
 *
 * Props:
 *   - as: 'div' | 'section' | 'article' | 'li' ... (defaults to 'div')
 *   - direction: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale'
 *   - delay:    seconds to wait before starting
 *   - duration: animation length (default 0.55s)
 *   - distance: how far to translate (default 24px)
 *   - once:     only animate first time (default true)
 *   - margin:   IntersectionObserver margin (default -60px — fire slightly before in view)
 *   - className / style: forwarded to the motion element
 *   - children: anything
 */
const presets = {
  up:    (d) => ({ opacity: 0, y:  d }),
  down:  (d) => ({ opacity: 0, y: -d }),
  left:  (d) => ({ opacity: 0, x:  d }),
  right: (d) => ({ opacity: 0, x: -d }),
  fade:  ()  => ({ opacity: 0 }),
  scale: ()  => ({ opacity: 0, scale: 0.92 }),
};

const finals = {
  up:    { opacity: 1, y: 0 },
  down:  { opacity: 1, y: 0 },
  left:  { opacity: 1, x: 0 },
  right: { opacity: 1, x: 0 },
  fade:  { opacity: 1 },
  scale: { opacity: 1, scale: 1 },
};

export default function Reveal({
  as = 'div',
  direction = 'up',
  delay = 0,
  duration = 0.55,
  distance = 24,
  once = true,
  margin = '-60px',
  className = '',
  style,
  children,
  ...rest
}) {
  const MotionTag = motion[as] || motion.div;
  const initial = presets[direction] ? presets[direction](distance) : presets.up(distance);
  const animate = finals[direction] || finals.up;

  return (
    <MotionTag
      initial={initial}
      whileInView={animate}
      viewport={{ once, margin }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Stagger container — wrap a list of <Reveal /> or motion children to
 * cascade their entrance with a consistent rhythm.
 */
export function RevealGroup({
  className = '',
  stagger = 0.08,
  delayChildren = 0,
  once = true,
  margin = '-40px',
  children,
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Used inside RevealGroup to participate in the stagger. Same semantics as
 * <Reveal /> but reads timing from the parent.
 */
export function RevealItem({
  as = 'div',
  direction = 'up',
  distance = 18,
  duration = 0.5,
  className = '',
  children,
  ...rest
}) {
  const MotionTag = motion[as] || motion.div;
  const initial = presets[direction] ? presets[direction](distance) : presets.up(distance);
  const animate = finals[direction] || finals.up;

  return (
    <MotionTag
      variants={{
        hidden: initial,
        visible: { ...animate, transition: { duration, ease: [0.16, 1, 0.3, 1] } },
      }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
