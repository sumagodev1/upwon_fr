import Container from '../Container/Container.jsx';

// Brand badges — each food / FMCG client gets a distinctive styled mark
// (real logos aren't publicly hosted for these regional brands, so we render
// each name in its brand colour with a unique typographic treatment).
const BRANDS = [
  { name: 'Monginis',       color: '#E5202E', font: 'font-display italic font-extrabold tracking-tight' },
  { name: 'Kaka Halwai',    color: '#8B0000', font: 'font-display font-bold tracking-wide' },
  { name: 'U2 Cake',        color: '#E91E63', font: 'font-display font-extrabold uppercase tracking-wider' },
  { name: 'U2 Burger',      color: '#D32F2F', font: 'font-display font-extrabold uppercase tracking-wider' },
  { name: 'Gokul',          color: '#1565C0', font: 'font-display font-bold tracking-tight' },
  { name: 'Winni',          color: '#C2185B', font: 'font-display italic font-bold' },
  { name: 'BrownBear',      color: '#6D4C41', font: 'font-display font-extrabold tracking-tight' },
  { name: 'Dairy Don',      color: '#0277BD', font: 'font-display font-bold uppercase tracking-wide' },
  { name: 'CakeCarnival',   color: '#AD1457', font: 'font-display italic font-extrabold tracking-tight' },
  { name: 'Mrs. Foodrite',  color: '#2E7D32', font: 'font-display font-bold tracking-tight' },
  { name: 'Mr. Puff',       color: '#EF6C00', font: 'font-display font-extrabold italic' },
  { name: 'Vatsalya Dairy', color: '#00838F', font: 'font-display font-bold tracking-wide' },
  { name: 'Kekiz',          color: '#F57F17', font: 'font-display font-extrabold uppercase tracking-wider' },
  { name: 'Fantasy Bakery', color: '#6A1B9A', font: 'font-display font-bold italic tracking-tight' },
  { name: 'Jolliz',         color: '#C62828', font: 'font-display font-extrabold uppercase' },
  { name: 'OFC',            color: '#388E3C', font: 'font-display font-extrabold uppercase tracking-widest' },
];

// The clients whose real logo files ship with the site. Pass this to
// `logos` on any page that should show artwork rather than the typographic
// marks above.
export const CLIENT_LOGOS = [
  { name: 'Monginis', src: '/images/testimonial/mongignis.webp' },
  { name: 'Kaka Halwai', src: '/images/testimonial/kaka%20halwai.webp' },
  { name: 'U2 Cake', src: '/images/testimonial/u2cake.webp' },
  { name: 'Winni', src: '/images/testimonial/winni.webp' },
  { name: 'Gokul', src: '/images/testimonial/gokul.webp' },
  { name: 'OFC', src: '/images/testimonial/ofc.webp' },
];

function BrandLogo({ brand }) {
  return (
    <div
      className="grid h-20 min-w-[180px] shrink-0 place-items-center rounded-xl border border-cream-300 bg-white px-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 md:h-24 md:min-w-[210px]"
      title={brand.name}
    >
      {brand.src ? (
        <img
          src={brand.src}
          alt={`${brand.name} logo`}
          loading="lazy"
          decoding="async"
          className="max-h-12 w-auto max-w-[150px] object-contain md:max-h-14"
        />
      ) : (
        <span
          className={`text-xl md:text-2xl ${brand.font}`}
          style={{ color: brand.color }}
        >
          {brand.name}
        </span>
      )}
    </div>
  );
}

// `embedded=true` strips the outer <section> wrapper + heading so this can
// be re-used inside another section (e.g. the About-page Numbers block)
// without duplicating its eyebrow or its surrounding chrome.
// `logos` — optional array of { name, src } to render real logo images instead
// of the default typographic brand marks (used on the SFA-DMS page).
export default function TrustStrip({ embedded = false, logos }) {
  const items = logos && logos.length ? logos : BRANDS;

  // The ticker slides by half the track, so one copy of the set has to be
  // wider than the viewport or a gap opens at the wrap. A short list (the
  // real-logo roster is six) is repeated more times to cover that.
  const copies = items.length < 10 ? 4 : 2;
  const loop = Array.from({ length: copies }, () => items).flat();

  const marquee = (
    <div className="relative overflow-hidden mask-fade-lr">
      <div className="flex w-max items-center gap-4 px-4 animate-ticker md:gap-5">
        {loop.map((b, i) => (
          <BrandLogo key={`${b.name}-${i}`} brand={b} />
        ))}
      </div>
    </div>
  );

  if (embedded) return marquee;

  return (
    <section className="relative overflow-hidden border-y border-cream-300 bg-slate-soft py-12 md:py-14">
      <Container>
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.22em] text-navy-500">
          Trusted by operations leaders at
        </p>
      </Container>
      <div className="mt-8">{marquee}</div>
    </section>
  );
}
