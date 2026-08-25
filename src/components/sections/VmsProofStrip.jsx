import { m as motion } from 'framer-motion';
import {
  UserRoundPlus,
  Clock3,
  ShieldCheck,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

function MetricCard({
  icon: Icon,
  value,
  direction,
  title,
  description,
  delay = 0,
}) {
  const isUp = direction === 'up';

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

export default function VmsProofStrip() {
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
          <Eyebrow className="justify-center">
            Proof Strip
          </Eyebrow>

          <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
            Not a Pitch.{' '}
            <span className="gradient-text-orange">
              Just What&apos;s Already Under Control.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-600">
            Best-available operational proof from live UpWon deployments —
            presented honestly, without inflating results or implying unsupported
            VMS-specific outcomes.
          </p>
        </motion.div>

        {/* ================= COMPACT PROOF GRID ================= */}
        <div className="mx-auto mt-8 grid max-w-[1280px] gap-3 lg:grid-cols-12">
          
          {/* Top Left */}
          <div className="lg:col-span-5">
            <MetricCard
              icon={UserRoundPlus}
              value="40%"
              direction="up"
              title="Faster Vendor Onboarding"
              description="Bring vendor information online faster with a structured, centralized workflow. Collect, organize, validate, and manage vendor details, documents, compliance records, and approvals in one place—reducing manual work, improving accuracy, and keeping every vendor record up to date."
            />
          </div>

          {/* Top Right Image */}
          <div className="lg:col-span-7">
            <ProofImage
              src="/images/vms_proof_number1.webp"
              alt="Vendor management operational proof"
              delay={0.08}
            />
          </div>

          {/* Bottom Left Image */}
          <div className="lg:col-span-5">
            <ProofImage
              src="/images/vms_proof_number2.webp"
              alt="Vendor approval and procurement workflow"
              delay={0.1}
            />
          </div>

          {/* Bottom Center */}
          <div className="lg:col-span-3">
            <MetricCard
              icon={Clock3}
              value="32%"
              direction="down"
              title="Reduced Processing Time"
              description="Fewer manual follow-ups and faster approvals across procurement workflows."
              delay={0.05}
            />
          </div>

          {/* Bottom Right */}
          <div className="lg:col-span-4">
            <MetricCard
              icon={ShieldCheck}
              value="28%"
              direction="up"
              title="Better Compliance Visibility"
              description="Centralized vendor records, documents and compliance for complete visibility."
              delay={0.1}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}