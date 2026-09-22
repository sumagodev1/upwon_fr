import { useState } from 'react';
import { Zap, ShieldCheck, RefreshCw, Wallet } from 'lucide-react';
import Container from '../shared/Container/Container.jsx';
import SectionHeading from '../shared/SectionHeading/SectionHeading.jsx';
import { INTEGRATIONS } from '../../data/metrics.js';

// Split integrations into 3 marquee rows so each scrolls at its own pace
const ROWS = [
  INTEGRATIONS.slice(0, 7),
  INTEGRATIONS.slice(7, 14),
  INTEGRATIONS.slice(14, 20),
];

// Why these integrations matter — the highlight strip above the logo wall
const VALUE_PROPS = [
  {
    icon: Zap,
    title: 'Pre-built & live',
    desc: 'Every connector is production-ready on Day 1 — no consulting hours, no custom builds.',
  },
  {
    icon: Wallet,
    title: 'Zero integration cost',
    desc: 'Included in your UpWon contract. No partner bills, no per-API fees, no surprises.',
  },
  {
    icon: RefreshCw,
    title: 'Real-time data sync',
    desc: 'Orders, payments and stock flow into UpWon the moment they happen — not at end-of-day.',
  },
  {
    icon: ShieldCheck,
    title: 'Certified & secure',
    desc: 'Official partner integrations with audit trails, encryption and uptime SLAs you can show.',
  },
];

function BrandTile({ brand }) {
  const [imgFailed, setImgFailed] = useState(false);
  const initials = brand.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const showImg = brand.logo && !imgFailed;

  return (
    <div
      className="group grid h-20 w-32 shrink-0 place-items-center px-4 transition-all duration-300 hover:-translate-y-1 md:h-24 md:w-40"
      title={brand.name}
      aria-label={brand.name}
    >
      {showImg ? (
        <img
          src={brand.logo}
          alt={`${brand.name} logo`}
          loading="lazy" decoding="async"
          className="h-12 w-12 object-contain opacity-85 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 md:h-14 md:w-14"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span
          className="font-display text-3xl font-extrabold tracking-tight opacity-85 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 md:text-4xl"
          style={{ color: brand.color }}
        >
          {initials}
        </span>
      )}
    </div>
  );
}

function MarqueeRow({ items, direction = 'left', duration = 40 }) {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-slate-soft to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-slate-soft to-transparent" />

      <div
        className="flex w-max items-center gap-2 py-3"
        style={{
          animation: `ticker ${duration}s linear infinite`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {loop.map((b, i) => (
          <BrandTile key={`${b.name}-${i}`} brand={b} />
        ))}
      </div>
    </div>
  );
}

export default function IntegrationsSection() {
  return (
    <section className="relative overflow-hidden bg-slate-soft section-pad">
      <div className="absolute inset-0 grid-bg-light opacity-60" />

      <Container className="relative">
        <SectionHeading
          align="center"
          variant="light"
          eyebrow="Integration Ecosystem"
          title="UpWon connects to your entire business ecosystem."
          description="Pre-built connectors for India's leading platforms — food delivery, payments, accounting, hardware. UpWon integrates where your business already operates."
        />

        {/* Why these integrations matter — highlight strip */}
        <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {VALUE_PROPS.map((v) => (
            <div
              key={v.title}
              className="group rounded-2xl border border-navy-100 bg-white/70 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-500/30 hover:bg-white hover:shadow-enterprise"
            >
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-orange-100 text-orange-600 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                  <v.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-navy-950">
                    {v.title}
                  </p>
                  <p className="mt-1 text-[14px] leading-relaxed text-navy-600">
                    {v.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Logo wall — three rows, alternating direction, no cards */}
        <div className="mt-12 space-y-1">
          <MarqueeRow items={ROWS[0]} direction="left" duration={42} />
          <MarqueeRow items={ROWS[1]} direction="right" duration={48} />
          {/* <MarqueeRow items={ROWS[2]} direction="left" duration={38} /> */}
        </div>

        <p className="mt-10 text-center text-[14px] text-navy-500">
          Plus 40+ additional connectors via UpWon's open integration fabric.
        </p>
      </Container>
    </section>
  );
}
