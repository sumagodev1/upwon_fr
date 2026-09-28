import { m as motion } from 'framer-motion';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import Container from '../../../../components/shared/Container/Container.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import { wmsIcon } from '../../../../lib/wmsIcons.js';

const EASE = [0.22, 1, 0.3, 1];

const BG_IMAGE = '/images/wms_customer outcome_corner.webp';

/*
  The built-in copy, written in the shape the API sends so that a CMS section
  and the shipped one take one identical path through the render below.

  That is also why the icons are names rather than imported components: a
  record cannot hold a component, so the CMS sends a name and lib/wmsIcons.js
  turns it back into one. Keeping the built-in set in the same form means the
  render resolves both the same way.
*/
const EYEBROW = 'Customer Outcomes';
const HEADING_LINES = [
  [
    { text: '15–20%', accent: true },
    { text: ' Less Wastage.', accent: false },
  ],
  [
    { text: '20–35%', accent: true },
    { text: ' Better Fulfilment Accuracy.', accent: false },
  ],
];
const SUBTEXT =
  'Real operational impact across manufacturing and distribution — from better inventory precision and reduced wastage to faster, more accurate order fulfilment.';

const outcomes = [
  {
    icon: 'PackageOpen',
    value: '15–20%',
    title: 'Less Wastage',
    description:
      'Better inventory control and FEFO execution help reduce expiry losses and write-offs.',
    accent: 'orange',
  },
  {
    icon: 'Target',
    value: '20–35%',
    title: 'Better Fulfilment Accuracy',
    description:
      'Fewer picking errors and real-time stock visibility help improve order accuracy.',
    accent: 'blue',
  },
  {
    icon: 'Clock3',
    value: '30–40%',
    title: 'Faster Order Processing',
    description:
      'Automated workflows and smart allocation help reduce overall order cycle time.',
    accent: 'orange',
  },
  {
    icon: 'ClipboardList',
    value: '99%+',
    title: 'Inventory Visibility',
    description:
      'Real-time tracking across locations provides clear and accurate stock visibility.',
    accent: 'blue',
  },
  {
    icon: 'ChartNoAxesCombined',
    value: '10–15%',
    title: 'Higher Space Utilization',
    description:
      'Intelligent slotting and warehouse optimization improve storage efficiency.',
    accent: 'orange',
  },
];

export default function WmsClientRecognition({ section = null }) {
  const eyebrow = section ? section.eyebrow : EYEBROW;
  const headingLines = section ? section.headingLines : HEADING_LINES;
  const subtext = section ? section.subtext : SUBTEXT;
  const cards = section && section.cards.length > 0 ? section.cards : outcomes;

  return (
    <section className="relative isolate overflow-hidden bg-[#f8f9fb] py-12 md:py-16 lg:py-[72px]">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 grid-bg-light opacity-40" />

      {/* Soft Background Glow */}
      <div className="pointer-events-none absolute left-[5%] top-[20%] z-0 h-[280px] w-[280px] rounded-full bg-orange-100/20 blur-[110px]" />

      <Container className="relative z-10">
        {/* IMPORTANT:
            This wrapper controls the image boundary.
            The image cannot go outside the Container.
        */}
        <div className="relative">
          {/* =====================================================
              TOP RIGHT CORNER IMAGE
              STRICTLY INSIDE THE CONTAINER
              ===================================================== */}
          <div className="pointer-events-none absolute right-0 top-0 z-0 hidden h-[230px] w-[38%] overflow-hidden lg:block">
            <img
              src={BG_IMAGE}
              alt=""
              className="h-full w-full object-cover object-center"
            />

            {/* Left fade */}
            <div className="absolute inset-y-0 left-0 w-[30%] bg-gradient-to-r from-[#f8f9fb] via-[#f8f9fb]/85 to-transparent" />

            {/* Bottom fade - image ends here */}
            <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-b from-transparent to-[#f8f9fb]" />

            {/* Slight top fade */}
            <div className="absolute inset-x-0 top-0 h-[8%] bg-gradient-to-b from-[#f8f9fb]/20 to-transparent" />
          </div>

          {/* =====================================================
              MAIN CONTENT
              ===================================================== */}
          <div className="relative z-10">
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="max-w-4xl"
            >
              {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}

              <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
                {/*
                  The figures are the accented runs, drawn in solid orange
                  here rather than the gradient the other headings use.
                */}
                <HeadingLines lines={headingLines} accentClassName="text-orange-600" />
              </h2>

              {subtext && (
                <p className="mt-5 max-w-3xl text-base leading-relaxed text-navy-600 md:text-lg">
                  {subtext}
                </p>
              )}
            </motion.div>

            {/* Cards */}
            <div className="relative z-20 mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {cards.map((item, index) => {
                // A name, not a component — resolved the same way whether it
                // came from the CMS or the built-in set above.
                const Icon = wmsIcon(item.icon);
                const isOrange = item.accent !== 'blue';

                return (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.07,
                      ease: EASE,
                    }}
                    whileHover={{
                      y: -5,
                      transition: { duration: 0.25 },
                    }}
                    className="group relative min-h-[330px] overflow-hidden rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
                  >
                    {/* Icon */}
                    <div
                      className={`grid h-14 w-14 place-items-center rounded-full border ${
                        isOrange
                          ? 'border-orange-200 bg-orange-50 text-orange-600'
                          : 'border-orange-200 bg-orange-50 text-orange-600'
                      }`}
                    >
                      <Icon className="h-7 w-7" strokeWidth={1.8} />
                    </div>

                    {/* Value */}
                    <h3
                      className={`mt-6 text-[36px] font-bold leading-none tracking-tight ${
                        isOrange ? 'text-orange-600' : 'text-orange-600'
                      }`}
                    >
                      {item.value}
                    </h3>

                    {/* Title */}
                    <h4 className="mt-3 min-h-[58px] text-[20px] font-bold leading-tight text-navy-950">
                      {item.title}
                    </h4>

                    {/* Accent Line */}
                    <div
                      className={`mt-5 h-[2px] w-11 transition-all duration-300 group-hover:w-16 ${
                        isOrange ? 'bg-orange-600' : 'bg-orange-600'
                      }`}
                    />

                    {/* Description */}
                    <p className="mt-5 text-[15px] leading-relaxed text-navy-600">
                      {item.description}
                    </p>

                    {/* Bottom Hover Line */}
                    <div
                      className={`absolute bottom-0 left-0 h-[3px] w-0 transition-all duration-500 group-hover:w-full ${
                        isOrange ? 'bg-orange-600' : 'bg-blue-600'
                      }`}
                    />
                  </motion.article>
                );
              })}
            </div>

            
          </div>
        </div>
      </Container>
    </section>
  );
}