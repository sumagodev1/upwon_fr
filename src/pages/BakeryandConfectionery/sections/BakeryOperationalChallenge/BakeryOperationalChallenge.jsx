import { m as motion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const CHALLENGES = [
  {
    number: '01',
    title: 'Ingredient & Raw Material Control',
    description:
      'Track flour, sugar, dairy, chocolate, packaging, and other ingredients with better visibility across purchases and inventory.',
    image: '/images/bakery_ingrident_raw_material.webp',
    icon: '📦',
  },
  {
    number: '02',
    title: 'Batch Production Management',
    description:
      'Plan production batches, monitor material consumption, and maintain better control over recipes and production output.',
    image: '/images/bakery_batch_production.webp',
    icon: '⚙️',
  },
  {
    number: '03',
    title: 'Shelf-Life & Expiry Visibility',
    description:
      'Keep track of perishable inventory and product movement to reduce avoidable wastage and improve stock decisions.',
    image: '/images/bakery_shelf_life.webp',
    icon: '🗓️',
  },
  {
    number: '04',
    title: 'Multi-Outlet Inventory',
    description:
      'Maintain visibility across central kitchens, warehouses, retail outlets, and distribution locations from one system.',
    image: '/images/bakery_oper_multi_outlet.webp',
    icon: '🏪',
  },
  {
    number: '05',
    title: 'Demand & Production Planning',
    description:
      'Use sales and inventory insights to plan production quantities more accurately and avoid overproduction or stock shortages.',
    image: '/images/bakery_demand_production.webp',
    icon: '📈',
  },
  {
    number: '06',
    title: 'Procurement & Vendor Coordination',
    description:
      'Manage suppliers, purchase requirements, approvals, and incoming materials through structured procurement workflows.',
    image: '/images/bakery_procuremt.webp',
    icon: '🤝',
  },
];

export default function BakeryOperationalChallenge() {
  return (
    <section
      className="relative overflow-hidden bg-[#f7f8fa] py-12 sm:py-14 md:py-16 lg:py-20"
      style={{
        backgroundImage:
          "url('/images/oper_challenge.webp')",
        backgroundSize: '100% 100%',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* ================= LIGHT BACKGROUND OVERLAY ================= */}
      <div className="pointer-events-none absolute inset-0 bg-white/10" />

      <Container className="relative z-10">
        {/* ================= SECTION HEADING ================= */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-4xl text-center"
        >
          <Eyebrow className="justify-center">
            OPERATIONAL CHALLENGES
          </Eyebrow>

          <h2 className="mt-3 h-display text-[32px] leading-[1.1] tracking-tight text-navy-950 sm:text-[36.8px]">
            Operational{' '}
            <span className="gradient-text-orange">
              Challenges
            </span>{' '}
            Bakery Businesses Face
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            From raw material control to production planning and multi-outlet
            coordination, bakery operations become increasingly complex as the
            business grows.
          </p>
        </motion.div>

        {/* ================= CHALLENGE CARDS ================= */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          className="mx-auto mt-8 grid max-w-6xl gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
        >
          {CHALLENGES.map((challenge, index) => (
            <motion.article
              key={challenge.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: 0.55,
                ease: EASE,
                delay: index * 0.07,
              }}
              whileHover={{
                y: -5,
                transition: { duration: 0.25 },
              }}
              className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-[22px] border border-white/70 bg-white/80 p-5 shadow-[0_12px_35px_rgba(25,35,55,0.10)] backdrop-blur-sm sm:min-h-[390px] sm:p-6"
            >
              {/* ================= TOP CONTENT ================= */}
              <div className="relative z-10 flex items-start justify-between gap-4">
                {/* Number */}
                <div className="flex h-12 min-w-12 items-center justify-center rounded-full border border-[#eadfd3] bg-white/90 px-3 shadow-sm">
                  <span className="h-display text-[22px] font-bold leading-none text-[#c94f2c]">
                    {challenge.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#f0d8cc] bg-[#fff7f2] text-[28px] shadow-[0_8px_24px_rgba(201,79,44,0.10)] transition-transform duration-300 group-hover:scale-105">
                  <span role="img" aria-label="">
                    {challenge.icon}
                  </span>
                </div>
              </div>

              {/* ================= TEXT ================= */}
              <div className="relative z-10 mt-5">
                <h3 className="h-display max-w-[280px] text-[22px] font-semibold leading-[1.25] text-navy-950">
                  {challenge.title}
                </h3>

                <span className="mt-3 block h-[2px] w-8 rounded-full bg-[#d95b31]" />

                <p className="mt-3 max-w-[310px] text-sm leading-relaxed text-navy-600">
                  {challenge.description}
                </p>
              </div>

              {/* ================= IMAGE ================= */}
              <div className="relative mt-auto pt-5">
                <div className="relative overflow-hidden rounded-[16px]">
                  <img
                    src={challenge.image}
                    alt={challenge.title}
                    loading="lazy"
                    decoding="async"
                    className="h-[145px] w-full object-cover object-center transition-transform duration-500 group-hover:scale-105 sm:h-[155px]"
                  />

                  <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/30 to-transparent" />
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}