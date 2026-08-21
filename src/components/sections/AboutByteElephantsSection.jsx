import { m as motion } from 'framer-motion';
import { MapPin, Calendar, Users, Boxes, ShieldCheck, Trophy, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';
import { COMPANY } from '../../data/company.js';

const FACTS = [
  { icon: Calendar, label: 'Founded', value: COMPANY.founded },
  { icon: MapPin, label: 'Headquarters', value: COMPANY.hq },
  { icon: Users, label: 'Domain Experts', value: `${COMPANY.team} senior` },
  { icon: Boxes, label: 'Live Platforms', value: `${COMPANY.productCount} products` },
  { icon: Trophy, label: 'Deployments', value: '50+ enterprises' },
  { icon: ShieldCheck, label: 'Methodology', value: 'ISO-aligned SOPs' },
];

export default function AboutByteElephantsSection() {
  return (
    <section className="relative overflow-hidden bg-white section-pad">
      <div className="absolute inset-0 grid-bg-light opacity-60" />
      <Container className="relative">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse-slow" />
              The Team Behind UpWon
            </p>
 <h2 className="mt-5 h-display text-[36.8px] text-balance text-navy-950">
              Byte Elephants Technologies. <br />
              <span className="text-orange-600">Built from inside food businesses.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-navy-700">
              UpWon was not designed in a lab. Over 8 years and 50+ live
              deployments, our platforms were built, refined, and hardened
              inside real food manufacturing plants, active distributor
              networks, and franchise chains across India.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-navy-700">
              Headquartered in <span className="font-semibold text-navy-950">Nashik, Maharashtra</span> — the heart of India's food
              processing belt — with a lean, senior team of {COMPANY.team} domain
              experts who have seen your operational challenges firsthand.
            </p>

            <div className="mt-8 rounded-2xl border border-navy-100 bg-navy-50/50 p-5">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-orange-600">
                Our Vision
              </p>
              <p className="mt-3 text-sm font-medium text-navy-950 md:text-base">
                "{COMPANY.vision}"
              </p>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link to="/case-studies" className="btn-primary">
                See deployment stories
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="btn-secondary">
                Meet the team
              </Link>
            </div>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-navy-100 bg-navy-100 sm:grid-cols-2">
            {FACTS.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group relative cursor-default bg-white p-6 transition-colors duration-300 hover:bg-cream-50"
              >
                <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-navy-100 bg-navy-50 text-orange-600 transition-all duration-300 group-hover:scale-110 group-hover:border-orange-500/40 group-hover:bg-orange-100">
                  <f.icon className="h-5 w-5" />
                </div>
                <p className="mt-5 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-navy-500">
                  {f.label}
                </p>
                <p className="mt-1 font-display text-lg font-bold text-navy-950">
                  {f.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
