// Image-SEO wrapper. Enforces meaningful alt text, lazy/async decoding and
// explicit dimensions (to prevent CLS), with optional semantic <figure>/
// <figcaption> markup. Use for content/screenshot images where descriptive
// alt + captions matter for SEO and accessibility.
//
// Filename guidance (do at asset-export time, not in code):
//   BAD :  /images/dashboard1.webp
//   GOOD:  /images/warehouse-live-stock-dashboard.webp
//
// Usage:
//   <SeoImage
//     src="/images/warehouse-live-stock-dashboard.webp"
//     alt="UpWon WMS live stock dashboard showing FEFO bin allocation"
//     width={1280} height={720}
//     caption="Live stock by bin, with FEFO enforcement at the scanner."
//   />
export default function SeoImage({
  src,
  alt,
  width,
  height,
  caption,
  priority = false,
  className = '',
  imgClassName = '',
  ...rest
}) {
  // Fail loud in dev if alt is missing — alt text is non-negotiable for SEO
  // and a11y. In production we still render (empty alt) so a missing string
  // never breaks a page.
  if (process.env.NODE_ENV !== 'production' && (!alt || !alt.trim())) {
    // eslint-disable-next-line no-console
    console.warn(`[SeoImage] Missing alt text for image: ${src}`);
  }

  const img = (
    <img
      src={src}
      alt={alt || ''}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchpriority={priority ? 'high' : undefined}
      decoding="async"
      className={imgClassName}
      {...rest}
    />
  );

  if (caption) {
    return (
      <figure className={className}>
        {img}
        <figcaption className="mt-2 text-center text-[14px] text-navy-500">
          {caption}
        </figcaption>
      </figure>
    );
  }

  return <div className={className}>{img}</div>;
}
