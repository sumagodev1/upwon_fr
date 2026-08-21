import { m as motion } from 'framer-motion';
import Eyebrow from './Eyebrow.jsx';

/**
 * Section heading — the title carries the message, description is optional
 * supporting context (kept compact). Titles are deliberately large and bold
 * so they deliver the agenda without needing a sub-paragraph beneath.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  variant = 'light',
  className = '',
  titleClassName = '',
  descriptionClassName = '',
}) {
  const isCenter = align === 'center';
  const isLight = variant === 'light';

  return (
    <div
      className={`flex flex-col gap-4 ${
        isCenter ? 'mx-auto max-w-3xl items-center text-center' : 'max-w-3xl'
      } ${className}`}
    >
      {eyebrow && <Eyebrow variant={variant}>{eyebrow}</Eyebrow>}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className={`h-display text-balance text-[36.8px] leading-[1.1] ${
          isLight ? 'text-navy-950' : 'text-white'
        } ${titleClassName}`}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className={`text-balance text-base leading-relaxed ${
            isLight ? 'text-navy-600' : 'text-slate-400'
          } ${descriptionClassName}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
