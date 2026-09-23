import { Fragment } from 'react';

/**
 * Renders a CMS heading.
 *
 * Headings are authored as plain text with two markers — a newline for a line
 * break, `**like this**` for the orange accent — and the API parses that
 * server-side into `headingLines`: an array of lines, each an array of
 * `{ text, accent }` parts. This component is the only place that turns that
 * tree into JSX, so no section has to know the marker grammar and none of them
 * can drift into rendering it differently.
 *
 * Sections that ship their own static copy write it in the same shape, so
 * CMS-driven and built-in headings take one identical path.
 */
export default function HeadingLines({ lines, accentClassName = 'gradient-text-orange' }) {
  if (!Array.isArray(lines)) return null;

  return lines.map((parts, lineIndex) => (
    <Fragment key={lineIndex}>
      {lineIndex > 0 && <br />}
      {parts.map((part, partIndex) =>
        part.accent ? (
          <span key={partIndex} className={accentClassName}>
            {part.text}
          </span>
        ) : (
          <Fragment key={partIndex}>{part.text}</Fragment>
        ),
      )}
    </Fragment>
  ));
}
