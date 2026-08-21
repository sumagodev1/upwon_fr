import { m as motion } from 'framer-motion';
import { Users, CheckCircle2 } from 'lucide-react';
import Container from '../ui/Container.jsx';

/*
  HRMS "One Suite, Not Six Vendors" — positions HREasy as both a standalone HRMS
  AND part of the wider UpWon suite. A hexagonal hub: HREasy at the centre, the
  six other platforms as wedges around it, with labels flanking left/right. All
  spokes optional, all native if adopted, on one shared data model.
*/

const EASE = [0.22, 1, 0.3, 1];

// angle in screen degrees (0 = right, clockwise). Each spoke owns a 60° wedge.
const SPOKES = {
  erp: { code: 'ERP', desc: 'Run your core business with complete control.', img: '/images/ERP.webp', angle: 240, color: '#42A5F5', side: 'left' },
  wms: { code: 'WMS', desc: 'Inventory in sync. Operations in control.', img: '/images/WMS.webp', angle: 180, color: '#FDE68A', side: 'left' },
  vms: { code: 'Vendor Portal', desc: 'Stronger collaboration. Greater transparency.', img: '/images/VMS.webp', angle: 120, color: '#C8DDE8', side: 'left' },
  fms: { code: 'FMS', desc: 'Control finances. Plan with confidence.', img: '/images/FMS.webp', angle: 300, color: '#EDE9FE', side: 'right' },
  pos: { code: 'POS', desc: 'Smarter billing. Seamless experience.', img: '/images/POS.webp', angle: 0, color: '#FBCFE8', side: 'right' },
  sfa: { code: 'SFA-DMS', desc: 'Drive sales, manage distributors, grow faster.', img: '/images/SFA-DMS.webp', angle: 60, color: '#C7D2FE', side: 'right' },
};

const LEFT_ORDER = ['erp', 'wms', 'vms'];
const RIGHT_ORDER = ['fms', 'pos', 'sfa'];

const R_OUT = 188;
const R_IN = 74;
const R_ICON = 150;
const GAP_DEG = 4;

const polar = (r, deg) => {
  const a = (deg * Math.PI) / 180;
  return [200 + r * Math.cos(a), 200 + r * Math.sin(a)];
};

const wedgePath = (angle) => {
  const a1 = angle - 30 + GAP_DEG;
  const a2 = angle + 30 - GAP_DEG;
  const [x1, y1] = polar(R_IN, a1);
  const [x2, y2] = polar(R_OUT, a1);
  const [x3, y3] = polar(R_OUT, a2);
  const [x4, y4] = polar(R_IN, a2);
  return `M${x1},${y1} L${x2},${y2} L${x3},${y3} L${x4},${y4} Z`;
};

function Label({ spoke }) {
  return (
    <div>
      <div className="flex items-center gap-2.5">
        <span className="h-3 w-3 shrink-0 rounded-[3px]" style={{ background: spoke.color }} />
        <h3 className="text-[1.05rem] font-bold leading-tight tracking-tight text-navy-950">
          {spoke.code}
        </h3>
      </div>
      <p className="mt-1.5 text-[13px] leading-snug text-navy-600">{spoke.desc}</p>
    </div>
  );
}

export default function HrmsOneSuite() {
  return (
    <section className="relative overflow-hidden bg-[#f5f6fa] py-12 md:py-16">
      <Container>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-orange-600">
            <Users className="h-4 w-4" />
            One Suite, Not Six Vendors
          </span>
          <h2 className="mt-4 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            HREasy Stands on Its Own. It&apos;s Even Better Next to Your{' '}
            <span className="gradient-text-orange">ERP, SFA-DMS and FMS.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            A dedicated HRMS you can rely on, with the power of a complete suite that works together
            on one shared data model.
          </p>
        </motion.div>

        {/* Hexagon hub */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mt-12 grid items-center gap-8 lg:grid-cols-[minmax(0,330px)_minmax(0,580px)_minmax(0,330px)] lg:gap-4"
        >
          {/* Left labels */}
          <div className="flex flex-col gap-10 lg:items-end lg:text-right">
            {LEFT_ORDER.map((k) => (
              <Label key={k} spoke={SPOKES[k]} />
            ))}
          </div>

          {/* Diagram */}
          <div className="relative mx-auto aspect-square w-full max-w-[580px]">
            <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
              {Object.values(SPOKES).map((s) => (
                <path key={s.code} d={wedgePath(s.angle)} fill={s.color} />
              ))}
            </svg>

            {/* Icon circles */}
            {Object.values(SPOKES).map((s) => {
              const [x, y] = polar(R_ICON, s.angle);
              return (
                <div
                  key={s.code}
                  className="absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 bg-white shadow-md transition-transform duration-300 hover:scale-110"
                  style={{
                    left: `${(x / 400) * 100}%`,
                    top: `${(y / 400) * 100}%`,
                    width: '19%',
                    height: '19%',
                    borderColor: s.color,
                  }}
                >
                  <img src={s.img} alt={`${s.code} icon`} loading="lazy" className="h-[62%] w-[62%] object-contain" />
                </div>
              );
            })}

            {/* Centre */}
            <div className="absolute left-1/2 top-1/2 grid h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-white shadow-lg">
              <div className="px-2 text-center">
                <p className="h-display leading-none tracking-tight" style={{ fontSize: 'clamp(15px, 2.1vw, 26px)' }}>
                  <span className="text-orange-500">HR</span>
                  <span className="text-navy-950">easy</span>
                </p>
                <img
                  src="/images/HRMS.webp"
                  alt=""
                  aria-hidden
                  className="mx-auto mt-1.5 h-[26%] max-h-7 object-contain"
                />
                <p
                  className="mt-1.5 font-medium leading-tight text-navy-600"
                  style={{ fontSize: 'clamp(8px, 0.95vw, 12px)' }}
                >
                  Complete HRMS.
                  <br />
                  Powerful on its own.
                </p>
              </div>
            </div>
          </div>

          {/* Right labels */}
          <div className="flex flex-col gap-10 lg:items-start lg:text-left">
            {RIGHT_ORDER.map((k) => (
              <Label key={k} spoke={SPOKES[k]} />
            ))}
          </div>
        </motion.div>

        {/* Closing line */}
        <div className="mt-12 flex items-center justify-center gap-3 text-center">
          <CheckCircle2 className="h-6 w-6 shrink-0 text-orange-500" strokeWidth={1.9} />
          <p className="text-[15px] leading-snug">
            <span className="font-bold text-navy-900">Buy what you need today.</span>{' '}
            <span className="font-semibold text-orange-600">
              Everything else is already built to connect, when you&apos;re ready.
            </span>
          </p>
        </div>
      </Container>
    </section>
  );
}
