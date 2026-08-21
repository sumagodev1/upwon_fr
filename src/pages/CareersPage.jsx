import { m as motion } from 'framer-motion';
import { ArrowRight, MapPin, Users } from 'lucide-react';
import Container from '../components/ui/Container.jsx';
import PageHero from '../components/sections/PageHero.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import Seo from '../components/common/Seo.jsx';

const ROLES = [
  { team: 'Engineering', title: 'Senior Full-Stack Engineer (Node + React)', location: 'Nashik · On-site' },
  { team: 'Engineering', title: 'Mobile Lead (React Native)', location: 'Nashik · Hybrid' },
  { team: 'Product', title: 'Product Manager — Manufacturing', location: 'Nashik · Hybrid' },
  { team: 'Delivery', title: 'Implementation Consultant — Bakery & QSR', location: 'Pan-India · Field' },
  { team: 'Sales', title: 'Enterprise Account Executive', location: 'Mumbai / Pune · On-site' },
  { team: 'Customer Success', title: 'Customer Success Manager', location: 'Nashik · On-site' },
];

const VALUES = [
  { title: 'Inside the factory, not the conference room', desc: 'We learn from the shop floor, not from slide decks.' },
  { title: 'Premium without arrogance', desc: 'We win on outcomes, not on volume.' },
  { title: 'Senior, small, sharp', desc: '30 people doing the work of 300. Quality over headcount.' },
];

export default function CareersPage() {
  return (
    <>
      <Seo
        title="Careers — Build UpWon at Byte Elephants"
        description="Join the team building UpWon — India's food-first enterprise suite. Engineering, product, implementation, sales and customer success roles in Nashik and pan-India."
        keywords="UpWon careers, Byte Elephants jobs, food ERP jobs Nashik, implementation consultant"
        canonical="https://upwon.in/careers"
      />
      <PageHero
        breadcrumb={[
          { label: 'Home', to: '/' },
          { label: 'Careers' },
        ]}
        eyebrow="Join Byte Elephants · UpWon"
        title={
          <>
            Build the operating system <br />
            for <span className="gradient-text-orange">India's food industry.</span>
          </>
        }
        description="A senior, small, fast-moving team building enterprise software inside real food businesses. If you want to do the most consequential work of your career — read on."
      />

      <section className="relative overflow-hidden bg-cream-100 section-pad">
        <div className="absolute inset-0 grid-bg-light opacity-50" />
        <Container className="relative">
          <SectionHeading
            align="center"
            variant="light"
            eyebrow="How we work"
            title="Three things we believe about the work."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="rounded-2xl border border-cream-300 bg-white p-7 shadow-sm"
              >
                <p className="num-display text-3xl text-orange-600">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-4 text-base font-bold text-navy-950">{v.title}</h3>
                <p className="mt-2 text-sm text-charcoal">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-white section-pad">
        <Container className="relative">
          <SectionHeading
            align="center"
            variant="light"
            eyebrow="Open roles"
            title="Currently hiring."
            description="Don't see your role? Email us anyway — we hire ahead of need for exceptional people."
          />

          <div className="mt-12 overflow-hidden rounded-2xl border border-cream-300 bg-white shadow-sm">
            {ROLES.map((r, i) => (
              <motion.a
                key={r.title}
                href={`mailto:hello@upwon.in?subject=Application — ${r.title}`}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.04 }}
                className={`group flex flex-col gap-3 p-5 transition-colors hover:bg-cream-100 sm:flex-row sm:items-center sm:justify-between ${
                  i < ROLES.length - 1 ? 'border-b border-cream-300' : ''
                }`}
              >
                <div>
                  <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-orange-600">
                    {r.team}
                  </span>
                  <p className="mt-1 text-base font-semibold text-navy-950 group-hover:text-orange-600">
                    {r.title}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-[14px] text-navy-600">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-orange-500" />
                    {r.location}
                  </span>
                  <ArrowRight className="h-4 w-4 text-orange-600 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.a>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-orange-300 bg-orange-50 p-6 text-center">
            <Users className="mx-auto h-6 w-6 text-orange-600" />
            <p className="mt-3 font-semibold text-navy-950">No matching role?</p>
            <p className="mt-1 text-sm text-charcoal">
              Email us at{' '}
              <a href="mailto:hello@upwon.in" className="font-semibold text-orange-600">
                hello@upwon.in
              </a>{' '}
              with your portfolio. We hire ahead of need for exceptional people.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
