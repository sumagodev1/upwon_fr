import { m as motion } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import { vmsIcon } from '../../../../lib/vmsIcons.js';

const EASE = [0.22, 1, 0.3, 1];

/*
  The built-in copy and layout, written in the shape the API sends so that a
  CMS section and the shipped one take one identical path through the render.

  TILES is the bento: each entry carries its own kind and column span, and the
  order is the layout - 5 + 7 fills the first row of twelve, then 5 + 3 + 4
  fills the second. The icons are names rather than imported components for
  the same reason the other pages' are: a record cannot hold a component, so
  the CMS sends a name and lib/vmsIcons.js turns it back into one.
*/
const EYEBROW = 'Proof Strip';
const HEADING_LINES = [
  [
    { text: 'Not a Pitch. ', accent: false },
    { text: "Just What's Already Under Control.", accent: true },
  ],
];
const SUBTEXT =
  'Best-available operational proof from live UpWon deployments — presented honestly, without inflating results or implying unsupported VMS-specific outcomes.';

const TILES = [
  {
    kind: 'METRIC',
    colSpan: 5,
    icon: 'UserRoundPlus',
    value: '40%',
    direction: 'up',
    title: 'Faster Vendor Onboarding',
    description:
      'Bring vendor information online faster with a structured, centralized workflow. Collect, organize, validate, and manage vendor details, documents, compliance records, and approvals in one place—reducing manual work, improving accuracy, and keeping every vendor record up to date.',
  },
  {
    kind: 'IMAGE',
    colSpan: 7,
    image: '/images/vms_proof_number1.webp',
    imageAlt: 'Vendor management operational proof',
  },
  {
    kind: 'IMAGE',
    colSpan: 5,
    image: '/images/vms_proof_number2.webp',
    imageAlt: 'Vendor approval and procurement workflow',
  },
  {
    kind: 'METRIC',
    colSpan: 3,
    icon: 'Clock3',
    value: '32%',
    direction: 'down',
    title: 'Reduced Processing Time',
    description:
      'Fewer manual follow-ups and faster approvals across procurement workflows.',
  },
  {
    kind: 'METRIC',
    colSpan: 4,
    icon: 'ShieldCheck',
    value: '28%',
    direction: 'up',
    title: 'Better Compliance Visibility',
    description:
      'Centralized vendor records, documents and compliance for complete visibility.',
  },
];

/*
  Tailwind compiles the classes it can see in the source, so a span cannot be
  interpolated into `lg:col-span-${n}` - the class would never be generated.
  Hence a lookup of the literal strings, covering the spans the schema allows.
*/
const COL_SPAN_CLASS = {
  3: 'lg:col-span-3',
  4: 'lg:col-span-4',
  5: 'lg:col-span-5',
  6: 'lg:col-span-6',
  7: 'lg:col-span-7',
  8: 'lg:col-span-8',
  9: 'lg:col-span-9',
  10: 'lg:col-span-10',
  11: 'lg:col-span-11',
  12: 'lg:col-span-12',
};

function MetricCard({ icon, value, direction, title, description, delay = 0 }) {
  // A name, not a component — resolved the same way whether it came from the
  // CMS or the built-in set above.
  const Icon = vmsIcon(icon);
  const isUp = direction !== 'down';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      className="h-full rounded-2xl border-[1.5px] border-[#cbd2d9] bg-white p-5 shadow-[0_4px_14px_rgba(15,23,42,0.06)] sm:p-6"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl border border-[#d9dee5] bg-cream-100">
          <Icon
            size={27}
            strokeWidth={1.7}
            className="text-primary-600"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <span className="h-display text-[42px] leading-none tracking-tight text-navy-950 sm:text-[46px]">
            {value}
          </span>

          {isUp ? (
            <ArrowUp
              size={26}
              strokeWidth={2}
              className="text-orange-600"
            />
          ) : (
            <ArrowDown
              size={26}
              strokeWidth={2}
              className="text-orange-600"
            />
          )}
        </div>
      </div>

      <h3 className="mt-4 text-lg font-semibold leading-tight text-navy-950 sm:text-xl">
        {title}
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-relaxed text-navy-600 sm:text-[15px]">
        {description}
      </p>
    </motion.div>
  );
}

function ProofImage({ src, alt, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className="h-full min-h-[230px] overflow-hidden rounded-2xl border-[1.5px] border-[#cbd2d9] bg-cream-100 shadow-[0_4px_14px_rgba(15,23,42,0.06)]"
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    </motion.div>
  );
}

export default function VmsProofStrip({ section = null }) {
  const eyebrow = section ? section.eyebrow : EYEBROW;
  const headingLines = section ? section.headingLines : HEADING_LINES;
  const subtext = section ? section.subtext : SUBTEXT;
  const tiles = section && section.tiles.length > 0 ? section.tiles : TILES;

  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16">
      <Container>
        {/* ================= HEADING - OLD DESIGN KEPT EXACTLY ================= */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          {eyebrow && <Eyebrow className="justify-center">{eyebrow}</Eyebrow>}

          <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            <HeadingLines lines={headingLines} />
          </h2>

          {subtext && (
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
              {subtext}
            </p>
          )}
        </motion.div>

        {/* ================= THE BENTO =================
            One list, laid out by each tile's own span. The order is the
            layout, so reordering in the CMS rearranges the grid. */}
        <div className="mx-auto mt-8 grid max-w-[1280px] gap-3 lg:grid-cols-12">
          {tiles.map((tile, index) => (
            <div
              key={index}
              className={COL_SPAN_CLASS[tile.colSpan] ?? COL_SPAN_CLASS[4]}
            >
              {tile.kind === 'IMAGE' ? (
                <ProofImage
                  src={tile.image}
                  alt={tile.imageAlt}
                  delay={index * 0.04}
                />
              ) : (
                <MetricCard
                  icon={tile.icon}
                  value={tile.value}
                  direction={tile.direction}
                  title={tile.title}
                  description={tile.description}
                  delay={index * 0.04}
                />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}