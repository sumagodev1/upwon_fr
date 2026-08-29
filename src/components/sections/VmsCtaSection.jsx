import { m as motion } from 'framer-motion';
import {
    ArrowRight,
    BadgeCheck,
} from 'lucide-react';

const EASE = [0.22, 1, 0.3, 1];

export default function VmsCtaSection() {
    return (
        <section className="relative w-full overflow-hidden">

            {/* =========================================================
                BACKGROUND IMAGE
            ========================================================= */}

            <div className="absolute inset-0">
                <img
                    src="/images/vms_cta_secti.webp"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-center"
                />
            </div>


            {/* =========================================================
                BACKGROUND OVERLAY
            ========================================================= */}

            <div className="pointer-events-none absolute inset-0 bg-[#4338ca]/10" />


            {/* =========================================================
                MAIN CTA CONTENT
            ========================================================= */}

            <div className="relative z-10 flex min-h-[490px] w-full items-center px-6 py-16 sm:min-h-[520px] sm:px-8 sm:py-20 md:min-h-[550px] md:px-10 lg:min-h-[580px] lg:px-12">

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
                        EYEBROW
                    ================================================= */}

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.55,
                            ease: EASE,
                        }}
                        className="mb-5"
                    >
                       
                    </motion.div>


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
                        className="h-display max-w-[680px] text-[32px] leading-[1.1] tracking-tight text-white sm:text-[36.8px] md:text-[42px] lg:text-[48px]"
                    >
                        See Your Vendor Base on UpWon —{' '}
                        <span className="text-white">
                            Live, in 30 Minutes.
                        </span>
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
                        className="mt-5 max-w-[620px] text-[15px] leading-[1.55] text-white/90 sm:text-base lg:text-[17px]"
                    >
                        An invitation to a conversation about your
                        business's own vendor relationships — not
                        a demo request form.
                    </motion.p>


                    {/* =================================================
                        CTA BUTTONS
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
                        className="mt-8 flex w-full flex-col items-start gap-3 sm:w-auto sm:flex-row"
                    >

                        {/* =================================================
                            PRIMARY CTA
                        ================================================= */}

                        <a
                            href="#contact"
                            className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[9px] bg-white px-6 text-[14px] font-semibold text-[#4338ca] shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/95 hover:shadow-[0_16px_35px_rgba(0,0,0,0.18)] sm:w-auto"
                        >
                            Talk to a Procurement Specialist

                            <ArrowRight
                                size={17}
                                strokeWidth={2}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </a>


                        {/* =================================================
                            SECONDARY CTA
                        ================================================= */}

                        <a
                            href="#vendor-base"
                            className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[9px] border border-white/40 bg-white/10 px-6 text-[14px] font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/20 sm:w-auto"
                        >
                            See How This Fits Your Vendor Base

                            <ArrowRight
                                size={17}
                                strokeWidth={2}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </a>

                    </motion.div>


           

                </motion.div>

            </div>

        </section>
    );
}