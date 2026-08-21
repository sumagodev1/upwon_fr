import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingDown } from 'lucide-react';
import Container from '../ui/Container.jsx';
import useCountUp from '../../hooks/useCountUp.js';

// The hidden tax of running food ops without UpWon — emotional, concrete numbers
const TAX_STATS = [
  { value: 18, suffix: '%',     label: 'Daily wastage bleeding margin' },
  { value: 2,  prefix: '₹',  suffix: 'L+',label: 'Leaked every month, untracked' },
  { value: 15, suffix: ' days', label: 'Behind on closing books, every month' },
  { value: 200,suffix: '+',     label: 'Operational fires put out per week' },
];

// Overheard founder conversations — feels real, not generic pain bullets
const VOICES = [
  {
    role: 'Plant Head',
    initials: 'PH',
    time: '6:42 AM',
    quote: 'We lose 15–20% to wastage and we don\'t know where.',
  },
  {
    role: 'Sales Director',
    initials: 'SD',
    time: '10:15 AM',
    quote: 'Our distributor data is always late, always wrong.',
  },
  {
    role: 'Franchise COO',
    initials: 'CO',
    time: '1:30 PM',
    quote: 'Opening 3 new outlets means hiring 3 new people to babysit them.',
  },
  {
    role: 'CFO',
    initials: 'CF',
    time: '11:48 PM',
    quote: 'We close our books 15 days after month-end. Every. Single. Month.',
  },
];

// Brief §1.3 — three exact situations the client wants every food business
// owner to recognise. Different framing from VOICES (which are quotes); these
// are pointed second-person prompts that make the owner nod.
const SITUATIONS = [
  {
    icon: '📊',
    title: 'Are you calculating production costs at month-end — and flying blind all month?',
  },
  {
    icon: '📱',
    title: 'Salesman orders on WhatsApp, stock on Tally, claims on Excel — reconciled every Sunday?',
  },
  {
    icon: '🏪',
    title: 'Your franchise outlets running on systems that don\'t talk to your HQ?',
  },
];

function TaxStat({ stat, i }) {
  const { value, ref } = useCountUp(stat.value, { duration: 1600 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-center text-center"
    >
      <p className="num-display text-[2.25rem] font-bold leading-none text-orange-600 sm:text-[2.6rem] md:text-5xl lg:text-[3.4rem]">
        {stat.prefix || ''}
        {value}
        {stat.suffix || ''}
      </p>
      <p className="mt-3 max-w-[200px] text-[14px] font-medium leading-snug text-navy-700">
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function ChaosSection() {
  return (
    <section className="relative overflow-hidden bg-cream-200 section-pad">
      <div className="absolute inset-0 grid-bg-light opacity-40" />

      <Container className="relative">
        {/* Header — direct, emotional */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.22em] text-orange-700">
            <TrendingDown className="h-3 w-3" />
            The Operational Tax You're Paying
          </p>
 <h2 className="mt-4 h-display text-[36.8px] text-balance leading-[1.1] text-navy-950">
            Every food business is bleeding{' '}
            <span className="text-orange-600">the same money.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-balance text-base leading-relaxed text-navy-600 md:text-lg">
            Wastage. Late dispatches. Missing data. Festival queues breaking
            you. Add it up — it's eating 20% of your margin.
          </p>
        </div>

        {/* Animated stat row — the cost in cold numbers */}
        <div className="mt-10 grid grid-cols-2 gap-8 rounded-3xl border border-rose-200 bg-gradient-to-br from-rose-50/60 via-white to-rose-50/40 p-8 shadow-sm md:grid-cols-4 md:p-10">
          {TAX_STATS.map((s, i) => (
            <TaxStat key={s.label} stat={s} i={i} />
          ))}
        </div>

        {/* Chat-style founder voices — feels overheard, not generic */}
        <div className="mt-10">
          <p className="mb-5 text-center text-[10.5px] font-semibold uppercase tracking-[0.22em] text-navy-500">
            What founders tell us — verbatim
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {VOICES.map((v, i) => (
              <motion.div
                key={v.role}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4 }}
                className="group flex flex-col rounded-2xl border border-rose-100 bg-white p-5 shadow-sm transition-all duration-300 hover:border-rose-300 hover:shadow-enterprise"
              >
                {/* Avatar + identity row */}
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-rose-100 font-display text-[14px] font-bold text-rose-700">
                    {v.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-semibold leading-tight text-navy-950">
                      {v.role}
                    </p>
                    <p className="mt-0.5 text-[14px] font-medium text-navy-500">
                      {v.time}
                    </p>
                  </div>
                </div>

                {/* Quote bubble */}
                <div className="relative mt-4 flex-1 rounded-2xl rounded-tl-sm bg-rose-50 px-4 py-3 text-[14px] italic leading-relaxed text-navy-900">
                  &ldquo;{v.quote}&rdquo;
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Brief §1.3 — "Is this situation you are stuck in?" — three
            second-person prompts that make the owner nod. Distinct from the
            founder quotes above: those are voices, these are sharp pokes. */}
        <div className="mt-12">
          <p className="text-center font-display text-xl font-bold text-navy-950 md:text-2xl">
            Is this the situation you are stuck in?
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {SITUATIONS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-4 rounded-2xl border border-navy-200 bg-navy-950 p-6 text-white shadow-enterprise"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-orange-500/15 text-2xl">
                  <span aria-hidden>{s.icon}</span>
                </div>
                <p className="text-[14px] font-medium leading-snug text-cream-100">
                  {s.title}
                </p>
              </motion.div>
            ))}
          </div>
          <p className="mt-6 text-center text-[14px] italic text-navy-700">
            We built UpWon because these problems don&rsquo;t have to exist.
          </p>
        </div>

        {/* Transition strip — leads into solution */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-orange-300 bg-gradient-to-br from-orange-50 to-orange-100/40 p-6 text-center shadow-sm md:flex-row md:justify-between md:text-left"
        >
          <div>
            <p className="font-display text-lg font-bold text-navy-950 md:text-xl">
              Stop running your business on adrenaline.
            </p>
            <p className="mt-1 text-[14px] text-navy-700 md:text-sm">
              Most ERPs were not built for this complexity. UpWon was — one
              integrated suite, purpose-built for food and FMCG at scale.
            </p>
          </div>
          {/* <Link to="/why-upwon" className="btn-primary !text-[14px] shrink-0">
            See how UpWon fixes this
            <ArrowRight className="h-3.5 w-3.5" />
          </Link> */}
        </motion.div>
      </Container>
    </section>
  );
}
