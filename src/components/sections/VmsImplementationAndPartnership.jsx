import { m as motion } from 'framer-motion';
import {
    ClipboardCheck,
    UserRoundCheck,
    FileCheck2,
    Rocket,
    Headphones,
    ArrowDown,
} from 'lucide-react';

import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const IMPLEMENTATION_STEPS = [
    {
        number: '01',
        icon: ClipboardCheck,
        title: 'Vendor Base Audit',
        description:
            'Map your existing supplier ecosystem, contracts, relationships, and operational dependencies before implementation begins.',
        image: '/images/vendor_base_audit.webp',
        position: 'left',
    },
    {
        number: '02',
        icon: UserRoundCheck,
        title: 'Key Vendor Onboarding',
        description:
            'Start with strategic vendors first, with guided vendor-side onboarding to make adoption simple and protect established relationships.',
        image: '/images/key_vedor_onboarding.webp',
        position: 'right',
    },
    {
        number: '03',
        icon: FileCheck2,
        title: 'Rate Contract Migration',
        description:
            'Move existing rate cards, commercial terms, and supplier agreements into the VMS without disrupting active procurement operations.',
        image: '/images/rate_contarct_migration.webp',
        position: 'left',
    },
    {
        number: '04',
        icon: Rocket,
        title: 'Full Rollout',
        description:
            'Expand the platform across the wider supplier base with a controlled rollout designed around your procurement processes and teams.',
        image: '/images/full_rollout.webp',
        position: 'right',
    },
    {
        number: '05',
        icon: Headphones,
        title: 'Ongoing Support',
        description:
            'Keep suppliers and internal teams supported after launch with continuous assistance, adoption guidance, and operational support.',
        image: '/images/vms_ongoing_support.webp',
        position: 'left',
    },
];

export default function VmsImplementationAndPartnership() {
    return (
        <section className="relative w-full overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28">

            {/* =========================================================
          BACKGROUND
      ========================================================= */}
            <div className="pointer-events-none absolute inset-0">

                {/* subtle grid */}
                <div className="absolute inset-0 grid-bg-light opacity-[0.16]" />

                {/* soft purple glow */}
                <div className="absolute left-[-180px] top-[12%] h-[480px] w-[480px] rounded-full bg-purple-100/30 blur-3xl" />

                {/* orange glow */}
                <div className="absolute bottom-[-180px] right-[-100px] h-[500px] w-[500px] rounded-full bg-orange-100/20 blur-3xl" />

                {/* subtle center glow */}
                <div className="absolute left-1/2 top-[35%] h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-purple-50/40 blur-3xl" />
            </div>

            <Container className="relative z-10">

                {/* =========================================================
            SECTION INTRO
        ========================================================= */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="mx-auto max-w-[900px] text-center"
                >
                    <Eyebrow>
                        IMPLEMENTATION &amp; PARTNERSHIP
                    </Eyebrow>

                    <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
                        Bring Your Vendors on Board
                        <br />

                        <span className="gradient-text-orange">
                            Without Losing a Single Relationship.
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-[760px] text-base leading-[1.65] text-navy-600 sm:text-[17px] md:text-lg">
                        A phased rollout that starts with your key vendors, migrates
                        existing commercial data, and expands to the full supplier base
                        with vendor-side onboarding support built in.
                    </p>
                </motion.div>

                {/* =========================================================
            IMPLEMENTATION TIMELINE
        ========================================================= */}
                <div className="relative mt-16 md:mt-20 lg:mt-24">

                    {/* =======================================================
              CENTER TIMELINE
          ======================================================= */}
                    <div
                        className="
              pointer-events-none
              absolute
              bottom-8
              left-1/2
              top-8
              hidden
              w-px
              -translate-x-1/2
              bg-gradient-to-b
              from-transparent
              via-[#6d28d9]/30
              to-transparent
              lg:block
            "
                    />

                    {/* =======================================================
              STEPS
          ======================================================= */}
                    <div className="space-y-12 sm:space-y-16 lg:space-y-0">

                        {IMPLEMENTATION_STEPS.map((step, index) => {
                            const isLeft = step.position === 'left';

                            return (
                                <motion.div
                                    key={step.number}
                                    initial={{
                                        opacity: 0,
                                        y: 35,
                                        x: isLeft ? -20 : 20,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                        x: 0,
                                    }}
                                    viewport={{
                                        once: true,
                                        margin: '-100px',
                                    }}
                                    transition={{
                                        duration: 0.75,
                                        delay: index * 0.05,
                                        ease: EASE,
                                    }}
                                    className="relative lg:min-h-[560px]"
                                >

                                    {/* =================================================
                      DESKTOP
                      
                      IMPORTANT:
                      Image + timeline + content are now in the
                      SAME GRID ROW.

                      This prevents text from overlapping the image.
                  ================================================= */}
                                    <div className="hidden lg:grid lg:min-h-[560px] lg:grid-cols-[minmax(0,1fr)_90px_minmax(0,1fr)] lg:items-center lg:gap-8">

                                        {/* =================================================
                        LEFT COLUMN
                    ================================================= */}
                                        <div className="flex min-w-0 items-center justify-end">
                                            {isLeft ? (
                                                <StepImage
                                                    step={step}
                                                    align="right"
                                                />
                                            ) : (
                                                <StepContent
                                                    step={step}
                                                    align="left"
                                                />
                                            )}
                                        </div>

                                        {/* =================================================
                        CENTER TIMELINE NODE
                    ================================================= */}
                                        <TimelineNode
                                            step={step}
                                            index={index}
                                        />

                                        {/* =================================================
                        RIGHT COLUMN
                    ================================================= */}
                                        <div className="flex min-w-0 items-center justify-start">
                                            {isLeft ? (
                                                <StepContent
                                                    step={step}
                                                    align="right"
                                                />
                                            ) : (
                                                <StepImage
                                                    step={step}
                                                    align="left"
                                                />
                                            )}
                                        </div>

                                    </div>

                                    {/* =================================================
                      MOBILE / TABLET
                  ================================================= */}
                                    <div className="lg:hidden">

                                        <div className="mx-auto max-w-[720px]">

                                            {/* =================================================
                          MOBILE STEP HEADER
                      ================================================= */}
                                            <div className="mb-5 flex items-center gap-4">

                                                <div
                                                    className="
                            flex
                            h-12
                            w-12
                            shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            bg-[#4f18b8]
                            text-white
                            shadow-[0_12px_30px_rgba(79,24,184,0.2)]
                          "
                                                >
                                                    <StepIcon step={step} />
                                                </div>

                                                <div>

                                                    <span
                                                        className="
                              block
                              text-[11px]
                              font-bold
                              uppercase
                              tracking-[0.22em]
                              text-[#6d28d9]
                            "
                                                    >
                                                        STEP {step.number}
                                                    </span>

                                                    <h3
                                                        className="
                              mt-1
                              h-display
                              text-[24px]
                              font-semibold
                              leading-tight
                              text-navy-950
                              sm:text-[28px]
                            "
                                                    >
                                                        {step.title}
                                                    </h3>

                                                </div>
                                            </div>

                                            {/* =================================================
                          MOBILE IMAGE
                      ================================================= */}
                                            <StepImage
                                                step={step}
                                                align="center"
                                            />

                                            {/* =================================================
                          MOBILE DESCRIPTION
                      ================================================= */}
                                            <StepContent
                                                step={step}
                                                align="left"
                                                mobile
                                            />

                                        </div>

                                        {/* =================================================
                        MOBILE CONNECTOR
                    ================================================= */}
                                        {index !== IMPLEMENTATION_STEPS.length - 1 && (
                                            <div className="flex justify-center py-7">

                                                <div className="flex flex-col items-center">

                                                    <div className="h-8 border-l border-dashed border-[#6d28d9]/35" />

                                                    <ArrowDown
                                                        className="h-4 w-4 text-[#6d28d9]/60"
                                                        strokeWidth={1.7}
                                                    />

                                                </div>

                                            </div>
                                        )}

                                    </div>

                                </motion.div>
                            );
                        })}

                    </div>
                </div>

            </Container>
        </section>
    );
}


/* ================================================================
   TIMELINE NODE
================================================================ */

function TimelineNode({ step }) {
    return (
        <div className="relative z-20 flex justify-center">

            <motion.div
                whileHover={{
                    scale: 1.08,
                    rotate: 2,
                }}
                transition={{
                    duration: 0.25,
                    ease: EASE,
                }}
                className="
          relative
          flex
          h-[72px]
          w-[72px]
          shrink-0
          items-center
          justify-center
          rounded-[22px]
          bg-gradient-to-br
          from-[#5b21b6]
          to-[#45138f]
          text-white
          shadow-[0_14px_35px_rgba(79,24,184,0.24)]
        "
            >

                <StepIcon step={step} />

                <span
                    className="
            absolute
            -right-2
            -top-2
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-full
            border-2
            border-[#fdf8f2]
            bg-[#f26722]
            text-[10px]
            font-bold
            text-white
          "
                >
                    {step.number}
                </span>

            </motion.div>

        </div>
    );
}


/* ================================================================
   STEP ICON
================================================================ */

function StepIcon({ step }) {
    const Icon = step.icon;

    return (
        <Icon
            className="h-7 w-7"
            strokeWidth={1.7}
        />
    );
}


/* ================================================================
   IMAGE CARD
================================================================ */

function StepImage({ step, align = 'center' }) {
    return (
        <motion.div
            whileHover={{
                y: -7,
            }}
            transition={{
                duration: 0.35,
                ease: EASE,
            }}
            className={`
        group
        relative
        w-full
        max-w-[570px]
        ${align === 'right' ? 'lg:mr-0' : ''}
        ${align === 'left' ? 'lg:ml-0' : ''}
        ${align === 'center' ? 'mx-auto' : ''}
      `}
        >

            {/* image glow */}
            <div
                className="
          pointer-events-none
          absolute
          -inset-5
          rounded-[40px]
          bg-purple-100/30
          opacity-0
          blur-2xl
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
            />

            {/* image frame */}
            <div
                className="
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-[#e6daf5]
          bg-[#351079]
          p-2
          shadow-[0_20px_55px_rgba(45,20,82,0.12)]
        "
            >

                {/* top accent */}
                <div
                    className="
            absolute
            left-7
            right-7
            top-2
            z-10
            h-[2px]
            rounded-full
            bg-gradient-to-r
            from-transparent
            via-[#00c8c8]
            to-transparent
            opacity-70
          "
                />

                <img
                    src={step.image}
                    alt={`${step.title} implementation process`}
                    className="
            block
            h-auto
            w-full
            rounded-[21px]
            object-contain
            transition-transform
            duration-700
            ease-out
            group-hover:scale-[1.025]
          "
                    loading="lazy"
                />

                {/* subtle overlay */}
                <div
                    className="
            pointer-events-none
            absolute
            inset-2
            rounded-[21px]
            ring-1
            ring-inset
            ring-white/10
          "
                />

            </div>

        </motion.div>
    );
}


/* ================================================================
   CONTENT
================================================================ */

function StepContent({
    step,
    align = 'left',
    mobile = false,
}) {
    const Icon = step.icon;

    return (
        <div
            className={`
        max-w-[510px]
        ${mobile ? 'mt-6' : ''}
        ${align === 'right' ? 'text-left' : 'text-left'}
      `}
        >

            {/* desktop step label */}
            {!mobile && (
                <div className="mb-4 flex items-center gap-3">

                    <span
                        className="
              text-[11px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-[#6d28d9]
            "
                    >
                        Step {step.number}
                    </span>

                    <span className="h-px w-10 bg-[#6d28d9]/25" />

                    <Icon
                        className="h-4 w-4 text-[#6d28d9]"
                        strokeWidth={1.8}
                    />

                </div>
            )}

            {/* desktop heading */}
            {!mobile && (
                <h3
                    className="
            h-display
            text-[30px]
            font-semibold
            leading-[1.12]
            tracking-tight
            text-navy-950
            xl:text-[36px]
          "
                >
                    {step.title}
                </h3>
            )}

            {/* divider */}
            <div
                className={`
          h-[2px]
          bg-gradient-to-r
          from-[#6d28d9]
          to-[#f26722]
          ${mobile ? 'mt-4 w-[120px]' : 'mt-4 w-[135px]'}
        `}
            />

            {/* description */}
            <p
                className="
          mt-4
          max-w-[500px]
          text-[15px]
          leading-[1.7]
          text-navy-600
          sm:text-base
        "
            >
                {step.description}
            </p>

        </div>
    );
}