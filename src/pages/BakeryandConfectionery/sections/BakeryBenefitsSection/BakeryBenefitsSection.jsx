import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const BENEFITS = [
  {
    image: '/images/bake_better_visibility.webp',
    alt: 'Better Inventory Visibility',
  },
  {
    image: '/images/bake_more_structure.webp',
    alt: 'More Structured Procurement',
  },
  {
    image: '/images/bake_reduced_manual.webp',
    alt: 'Reduced Manual Coordination',
  },
  {
    image: '/images/bake_improve_production.webp',
    alt: 'Improved Production Planning',
  },
  {
    image: '/images/bake_stronger_multi_loc.webp',
    alt: 'Stronger Multi-Location Control',
  },
  {
    image: '/images/bake_stock_movement.webp',
    alt: 'Better Visibility into Stock Movement',
  },
  {
    image: '/images/bake_faster_access.webp',
    alt: 'Faster Access to Operational Insights',
  },
  {
    image: '/images/bake_more_informed.webp',
    alt: 'More Informed Business Decisions',
  },
];

export default function BakeryBenefitsSection() {
  return (
    <section className="relative overflow-hidden bg-[#f7f8fa] py-16 sm:py-20 lg:py-24">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-180px] top-[100px] h-[420px] w-[420px] rounded-full bg-[#f3d7cb]/25 blur-[120px]" />
        <div className="absolute right-[-180px] bottom-[80px] h-[420px] w-[420px] rounded-full bg-[#dce6f5]/50 blur-[120px]" />
      </div>

      <Container className="relative z-10">
        {/* ================= HEADING ================= */}
        <div className="mx-auto max-w-4xl text-center">
          <Eyebrow className="justify-center">
            BENEFITS THAT DRIVE GROWTH
          </Eyebrow>

          <h2 className="mt-3 h-display text-[32px] leading-[1.1] tracking-tight text-navy-950 sm:text-[25px] md:text-[31px] lg:text-[36.8px]">
            Built for Businesses
            <br />
            Where{' '}
            <span className="gradient-text-orange">
              Every Day Counts
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-[15px] leading-relaxed text-navy-600 sm:text-base lg:text-[17px]">
            With UpWon, bakery and confectionery teams can work with greater
            control across the complete operational cycle.
          </p>
        </div>

        {/* ================= BENEFIT IMAGES ================= */}
        <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-5">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.image}
              className="overflow-hidden rounded-[20px] border border-navy-950/10 bg-white shadow-[0_12px_35px_rgba(25,35,55,0.10)]"
            >
              <img
                src={benefit.image}
                alt={benefit.alt}
                className="block h-auto w-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}  