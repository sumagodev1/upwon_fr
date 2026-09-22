import { m as motion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const FLOW_STEPS = [
  {
    number: '01',
    title: 'Procure',
    description:
      'Source the right ingredients and materials from approved vendors.',
    image: '/images/bake_Procure.webp',
  },
  {
    number: '02',
    title: 'Receive & Store',
    description:
      'Track incoming stock and maintain visibility across inventory locations.',
    image: '/images/bake_Receive_Store.webp',
  },
  {
    number: '03',
    title: 'Plan Production',
    description:
      'Prepare production based on demand, orders, and available materials.',
    image: '/images/bake_Plan_Production.webp',
  },
  {
    number: '04',
    title: 'Produce',
    description:
      'Manage batches and monitor material usage and output.',
    image: '/images/bake_Distribute-1.webp',
  },
  {
    number: '05',
    title: 'Distribute',
    description:
      'Move finished products efficiently across stores, outlets, and delivery channels.',
    image: '/images/bake_Distribute.webp',
  },
  {
    number: '06',
    title: 'Analyze',
    description:
      'Use operational data to improve planning, reduce waste, and make faster decisions.',
    image: '/images/bake_Analyze.webp',
  },
];

export default function BakeryIngrediantstoStore() {
  return (
    <section className="relative overflow-hidden bg-[#f7f8fa] py-16 sm:py-20 lg:py-24">
      {/* ================= BACKGROUND DECORATION ================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-180px] top-[120px] h-[420px] w-[420px] rounded-full bg-[#f3d7cb]/20 blur-[100px]" />
        <div className="absolute right-[-180px] bottom-[80px] h-[420px] w-[420px] rounded-full bg-[#dce6f5]/40 blur-[100px]" />
      </div>

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
            FROM INGREDIENTS TO STORE SHELVES
          </Eyebrow>

          <h2 className="mt-3 h-display text-[32px] leading-[1.1] tracking-tight text-navy-950 sm:text-[25px] md:text-[31px] lg:text-[36.8px]">
            A Connected Flow for{' '}
            <span className="gradient-text-orange">
              Every Stage of Production
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-[15px] leading-relaxed text-navy-600 sm:text-base">
            Connect procurement, inventory, production, distribution, and
            business insights through one continuous operational flow built for
            bakery and confectionery businesses.
          </p>
        </motion.div>

        {/* ================= PRODUCTION FLOW ================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
          className="relative mx-auto mt-10 max-w-7xl overflow-hidden rounded-[28px] border border-[#d9dce3] bg-white/70 px-5 py-8 shadow-[0_20px_60px_rgba(25,35,55,0.08)] backdrop-blur-sm sm:mt-12 sm:px-8 sm:py-10 lg:px-12 lg:py-12"
        >
          {/* ================= TOP LABEL ================= */}
          <div className="flex items-center justify-between gap-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-navy-600 sm:text-xs">
              Bakery Operations Flow on UpWon
            </p>

          
          </div>

          {/* ================= DESKTOP CONNECTING LINE ================= */}
          <div className="pointer-events-none absolute left-[9%] right-[9%] top-[188px] hidden h-px bg-[#cfd4dc] xl:block" />

          {/* ================= FLOW STEPS ================= */}
          <div className="relative mt-8 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-3">
            {FLOW_STEPS.map((step, index) => (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  ease: EASE,
                  delay: index * 0.07,
                }}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.25 },
                }}
                className="group relative min-w-0 text-center"
              >
                {/* ================= LARGE IMAGE + NUMBER ================= */}
                <div className="relative z-10 mx-auto h-[118px] w-[118px] sm:h-[125px] sm:w-[125px] xl:h-[140px] xl:w-[140px]">
                  
                  {/* Outer Ring */}
                  <div className="absolute inset-0 rounded-full border border-[#f06a2a]/40 bg-white p-[5px] shadow-[0_12px_30px_rgba(25,35,55,0.14)] transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-[0_18px_40px_rgba(201,79,44,0.2)]">
                    {/* Image */}
                    <div className="h-full w-full overflow-hidden rounded-full border-2 border-[#e5e7eb] bg-white">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Step Number - OUTSIDE IMAGE */}
                  <div
                    className={`absolute bottom-[-5px] right-[-5px] z-20 flex h-[38px] w-[38px] items-center justify-center rounded-full border-[3px] border-white text-[11px] font-bold shadow-[0_5px_16px_rgba(25,35,55,0.28)] sm:h-[42px] sm:w-[42px] sm:text-[12px] ${
                      index === 0
                        ? 'bg-[#c94f2c] text-white'
                        : 'bg-[#303949] text-white'
                    }`}
                  >
                    {step.number}
                  </div>
                </div>

                {/* ================= CONTENT ================= */}
                <div className="mt-6">
                  <h3 className="h-display min-h-[46px] text-[16px] font-semibold leading-[1.28] text-navy-950 sm:text-[17px]">
                    {step.title}
                  </h3>

                  <span className="mx-auto mt-3 block h-[2px] w-8 rounded-full bg-[#d95b31]" />

                  <p className="mx-auto mt-3 max-w-[220px] text-[13px] leading-relaxed text-navy-600">
                    {step.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          {/* ================= BOTTOM FLOW INDICATOR ================= */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-navy-500 sm:text-[11px]">
            <span>Ingredients</span>

            <span className="h-px w-6 bg-[#d95b31]/50 sm:w-10" />

            <span className="h-2 w-2 rounded-full bg-[#d95b31]" />

            <span className="h-px w-6 bg-[#d95b31]/50 sm:w-10" />

            <span>Production</span>

            <span className="h-px w-6 bg-[#d95b31]/50 sm:w-10" />

            <span className="h-2 w-2 rounded-full bg-[#d95b31]" />

            <span className="h-px w-6 bg-[#d95b31]/50 sm:w-10" />

            <span>Store Shelves</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}