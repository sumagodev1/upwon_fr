/**
 * Brand logo — uses the official UpWon mark from /public/upwon-logo.png.
 *
 * Props:
 *   - size: 'sm' | 'md' | 'lg' | 'xl' — controls the mark's pixel height
 *   - variant: 'dark' | 'light' — only affects the optional tagline colour
 *   - showTagline: appends "by Byte Elephants" — useful in footers
 *   - className: extra layout classes for the wrapper
 */
export default function Logo({
  className = '',
  variant = 'dark',
  showTagline = false,
  size = 'md',
}) {
  const heights = {
    sm: 'h-9',
    md: 'h-11',
    lg: 'h-12 md:h-14',
    xl: 'h-20 md:h-24',
  };
  const taglineColor = variant === 'light' ? 'text-cream-200/80' : 'text-navy-600';
  const tealClass = variant === 'light' ? 'text-teal-300' : 'text-teal-600';
  const h = heights[size] || heights.md;

  const isLight = variant === 'light';

  const img = (
    <img
      src="/upwon-logo.webp"
      alt="UpWon — Business Growth Suite"
      className={`${h} w-auto object-contain select-none`}
      width="500"
      height="237"
      decoding="async"
      fetchpriority="high"
      draggable="false"
    />
  );

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {isLight ? (
        // On dark backgrounds the logo's navy wordmark would disappear, so
        // wrap it in a soft white pill for legibility.
        <div className="rounded-xl bg-white/95 px-2 py-1 shadow-md ring-1 ring-white/20 backdrop-blur-sm">
          {img}
        </div>
      ) : (
        img
      )}
      {showTagline && (
        <span
          className={`hidden text-[10px] font-medium uppercase tracking-[0.22em] sm:inline ${taglineColor}`}
        >
          by <span className={tealClass}>Byte Elephants</span>
        </span>
      )}
    </div>
  );
}
