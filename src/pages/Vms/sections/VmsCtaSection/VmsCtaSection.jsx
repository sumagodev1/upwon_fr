import { m as motion } from 'framer-motion';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import {
    ArrowRight,
} from 'lucide-react';

const EASE = [0.22, 1, 0.3, 1];

/*
  The built-in copy, written in the shape the API sends so that a CMS band and
  the shipped one take one identical path through the render below.
*/
const HEADING_LINES = [
    [{ text: 'See Your Vendor Base', accent: false }],
    [
        { text: 'on UpWon — ', accent: false },
        { text: 'Live, in 30 Minutes.', accent: true },
    ],
];
const SUBTEXT =
    "An invitation to a conversation about your business's own vendor relationships — not a demo request form.";
const IMAGE = '/images/vms_final_cta.webp';
const MOBILE_IMAGE = '/images/vms_cta_mobile.webp';
const PRIMARY = { label: 'Talk to a Procurement Specialist', href: '#contact' };
const SECONDARY = { label: 'See How This Fits Your Vendor Base', href: '#vendor-base' };

export default function VmsCtaSection({ section = null }) {
    const headingLines = section ? section.headingLines : HEADING_LINES;
    const subtext = section ? section.subtext : SUBTEXT;
    // A band without its own photograph falls back to the site's, so the copy
    // always has something behind it.
    const image = (section && section.image) || IMAGE;
    const mobileImage = (section && section.mobileImage) || MOBILE_IMAGE;
    const primary = section ? section.primary : PRIMARY;
    const secondary = section ? section.secondary : SECONDARY;

    return (
        <section className="relative w-full overflow-hidden">

            {/* =========================================================
                DESKTOP CTA
            ========================================================= */}

            <div className="relative hidden w-full md:block">

                <img
                    src={image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full"
                />

                <div className="absolute inset-0">

                    <div className="flex h-full w-full items-center px-6 sm:px-8 md:px-10 lg:px-12">

                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{
                                once: true,
                                margin: '-80px',
                            }}
                            transition={{
                                duration: 0.7,
                                ease: EASE,
                            }}
                            className="flex w-full max-w-[720px] flex-col items-start text-left lg:ml-[7vw] xl:ml-[9vw]"
                        >

                            {/* =================================================
                                HEADING
                            ================================================= */}

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.65,
                                    delay: 0.05,
                                    ease: EASE,
                                }}
                                className="
                                    h-display
                                    max-w-3xl
                                    text-[36.8px]
                                    leading-[1.1]
                                    tracking-tight
                                    text-navy-950
                                "
                            >
                                <HeadingLines lines={headingLines} />
                            </motion.h2>


                            {/* =================================================
                                SUBTEXT
                            ================================================= */}

                            <motion.p
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.1,
                                    ease: EASE,
                                }}
                                className="
                                    mt-4
                                    max-w-2xl
                                    text-base
                                    leading-relaxed
                                    text-navy-600
                                "
                            >
                                {subtext}
                            </motion.p>


                            {/* =================================================
                                DESKTOP BUTTONS
                            ================================================= */}

                            <motion.div
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.16,
                                    ease: EASE,
                                }}
                                className="
                                    mt-8
                                    flex
                                    w-full
                                    flex-col
                                    items-start
                                    gap-3
                                    sm:w-auto
                                    sm:flex-row
                                "
                            >

                                <a
                                    href={primary.href}
                                    className="
                                        group
                                        inline-flex
                                        min-h-[52px]
                                        w-full
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-[9px]
                                        bg-orange-500
                                        px-6
                                        text-[14px]
                                        font-semibold
                                        text-white
                                        shadow-[0_12px_30px_rgba(67,56,202,0.20)]
                                        transition-all
                                        duration-300
                                        hover:-translate-y-0.5
                                        hover:shadow-[0_16px_35px_rgba(67,56,202,0.25)]
                                        sm:w-auto
                                    "
                                >
                                    {primary.label}

                                    <ArrowRight
                                        size={17}
                                        strokeWidth={2}
                                        className="
                                            transition-transform
                                            duration-300
                                            group-hover:translate-x-1
                                        "
                                    />
                                </a>


                                <a
                                    href={secondary ? secondary.href : "#"}
                                    className="
                                        group
                                        inline-flex
                                        min-h-[52px]
                                        w-full
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-[9px]
                                        border
                                        border-[#4338ca]/30
                                        bg-white/60
                                        px-6
                                        text-[14px]
                                        font-semibold
                                        text-[#0f1535]
                                        backdrop-blur-sm
                                        transition-all
                                        duration-300
                                        hover:-translate-y-0.5
                                        hover:border-[#4338ca]/50
                                        hover:bg-white/80
                                        sm:w-auto
                                    "
                                >
                                    {secondary ? secondary.label : ''}

                                    <ArrowRight
                                        size={17}
                                        strokeWidth={2}
                                        className="
                                            transition-transform
                                            duration-300
                                            group-hover:translate-x-1
                                        "
                                    />
                                </a>

                            </motion.div>

                        </motion.div>

                    </div>

                </div>

            </div>


            {/* =========================================================
                MOBILE CTA
            ========================================================= */}

            <div className="block w-full md:hidden">

                {/* =====================================================
                    MOBILE IMAGE

                    Crop ONLY the unnecessary bottom white area.
                    The artwork itself remains full width.
                ===================================================== */}

                <div
                    className="
                        relative
                        h-[255px]
                        w-full
                        overflow-hidden
                    "
                >
                    <img
                        src={mobileImage}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        className="
                            absolute
                            left-0
                            top-0
                            block
                            h-auto
                            w-full
                        "
                    />
                </div>


                {/* =====================================================
                    MOBILE CONTENT

                    Starts immediately after the shortened image.
                ===================================================== */}

                <div
                    className="
                        relative
                        z-10
                        -mt-[2px]
                        w-full
                        bg-[#f4f3ff]
                        px-6
                        pb-8
                        pt-2
                        text-left
                    "
                >

                    {/* =================================================
                        MOBILE HEADING
                    ================================================= */}

                    <motion.h2
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{
                            once: true,
                            margin: '-40px',
                        }}
                        transition={{
                            duration: 0.6,
                            ease: EASE,
                        }}
                        className="
                            h-display
                            w-full
                            text-[30px]
                            leading-[1.08]
                            tracking-tight
                            text-navy-950
                        "
                    >
                        <HeadingLines lines={headingLines} />
                    </motion.h2>


                    {/* =================================================
                        MOBILE SUBTEXT
                    ================================================= */}

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.55,
                            delay: 0.08,
                            ease: EASE,
                        }}
                        className="
                            mt-3
                            w-full
                            max-w-[390px]
                            text-base
                            leading-relaxed
                            text-navy-600
                        "
                    >
                        {subtext}
                    </motion.p>


                    {/* =================================================
                        MOBILE BUTTONS
                    ================================================= */}

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.55,
                            delay: 0.14,
                            ease: EASE,
                        }}
                        className="
                            mt-5
                            flex
                            w-full
                            flex-col
                            gap-2.5
                        "
                    >

                        {/* Primary CTA */}

                        <a
                            href={primary.href}
                            className="
                                group
                                inline-flex
                                min-h-[48px]
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-[9px]
                                bg-orange-500
                                px-5
                                text-[14px]
                                font-semibold
                                text-white
                                shadow-[0_10px_25px_rgba(67,56,202,0.18)]
                                transition-all
                                duration-300
                                active:scale-[0.99]
                            "
                        >
                            {primary.label}

                            <ArrowRight
                                size={16}
                                strokeWidth={2}
                                className="
                                    transition-transform
                                    duration-300
                                    group-hover:translate-x-1
                                "
                            />
                        </a>


                        {/* Secondary CTA */}

                        <a
                            href={secondary ? secondary.href : "#"}
                            className="
                                group
                                inline-flex
                                min-h-[48px]
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-[9px]
                                border
                                border-[#4338ca]/30
                                bg-white
                                px-5
                                text-[14px]
                                font-semibold
                                text-[#0f1535]
                                transition-all
                                duration-300
                                hover:border-[#4338ca]/50
                                hover:bg-white/80
                                active:scale-[0.99]
                            "
                        >
                            {secondary ? secondary.label : ''}

                            <ArrowRight
                                size={16}
                                strokeWidth={2}
                                className="
                                    transition-transform
                                    duration-300
                                    group-hover:translate-x-1
                                "
                            />
                        </a>

                    </motion.div>

                </div>

            </div>

        </section>
    );
}