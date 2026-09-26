// The top image of a blog post page: the <img> BlogPostPage already renders
// for the desktop file, wrapped in a <picture> whose source serves the post's
// portrait (3:4) phone crop below 768px — lib/blog.js's `mobileImage`. Used
// there and nowhere else: every card keeps the landscape desktop <img> on all
// screens.
//
// No crop, no wrapper: the <img> comes back untouched, so every built-in post
// (data/blog.js has no crops) and every published post nobody has cropped
// renders exactly as it did before the mobile slot existed. With a crop the
// <picture> takes `className` — the box the <img> already fills — and the <img>
// keeps every class and attribute of its own, as in HeroSlider and
// AboutCtaSection.
const MOBILE_SOURCE_MEDIA = '(max-width: 767px)';

export default function PostPicture({ mobileImage, className = '', children }) {
  if (!mobileImage) return children;

  return (
    <picture className={className}>
      <source media={MOBILE_SOURCE_MEDIA} srcSet={mobileImage} />
      {children}
    </picture>
  );
}
