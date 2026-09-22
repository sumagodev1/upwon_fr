import { m } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.36, 1];

export default function WmsSectionReady() {
    return (
        <section className="relative overflow-hidden bg-[#f7f8fb] py-14 sm:py-16 md:py-20 lg:py-24 xl:py-28">
            {/* Background glow */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-orange-100/40 blur-[120px]" />
            </div>

            <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-8 xl:px-10">
                {/* Heading */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="mx-auto max-w-4xl text-center"
                >
                    <Eyebrow className="justify-center">
                        Built In Flow
                    </Eyebrow>

                    <h2 className="mt-3 h-display text-[32px] leading-[1.1] tracking-tight text-navy-950 sm:text-[36px] lg:text-[42px]">
                        From Production to Dispatch,
                        <br />
                        <span className="gradient-text-orange">
                            Every Batch Stays in Sync.
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-navy-600 sm:text-base">
                        The moment a production batch is completed, warehouse stock updates
                        instantly with its batch and expiry details intact—eliminating separate
                        stock entry and reconciliation gaps.
                    </p>
                </m.div>

                {/* Progress Workflow */}
                <m.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.7,
                        delay: 0.1,
                        ease: EASE,
                    }}
                    className="mx-auto mt-8 w-full max-w-[1100px] sm:mt-10"
                >
                    {/* Workflow Image */}
                    <img
                        src="/images/wms_progress.webp"
                        alt="Production to dispatch workflow"
                        className="mx-auto block h-auto w-full"
                        loading="lazy"
                    />

                    {/* Step Names */}
                    {/* <div className="mt-3 grid grid-cols-4 gap-1 text-center sm:mt-4 sm:gap-3">
                        <div>
                            <p className="text-[10px] font-bold leading-[1.25] text-navy-950 sm:text-xs md:text-sm lg:text-base">
                                Production
                                <br />
                                Batch Completed
                            </p>
                        </div>

                        <div>
                            <p className="text-[10px] font-bold leading-[1.25] text-navy-950 sm:text-xs md:text-sm lg:text-base">
                                Warehouse
                                <br />
                                Stock Updated
                            </p>
                        </div>

                        <div>
                            <p className="text-[10px] font-bold leading-[1.25] text-navy-950 sm:text-xs md:text-sm lg:text-base">
                                FEFO-Ranked
                                <br />
                                for Putaway
                            </p>
                        </div>

                        <div>
                            <p className="text-[10px] font-bold leading-[1.25] text-navy-950 sm:text-xs md:text-sm lg:text-base">
                                Ready for
                                <br />
                                Dispatch
                            </p>
                        </div>
                    </div> */}
                </m.div>

                {/* Message */}
                <m.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.6,
                        delay: 0.15,
                        ease: EASE,
                    }}
                    className="relative z-10 mx-auto mt-6 max-w-5xl sm:mt-8"
                >
                    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-orange-100 bg-[#fff7f1] px-5 py-4 text-center shadow-[0_10px_35px_rgba(255,79,10,0.08)] sm:flex-row sm:rounded-full sm:px-8">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ff4f0a]">
                            <CheckCircle2
                                size={20}
                                strokeWidth={3}
                                className="text-white"
                            />
                        </span>

                        <p className="text-sm font-semibold leading-relaxed text-[#222b38] sm:text-left sm:text-base">
                            No manual stock entry. No mismatch between what was made
                            and what&apos;s on the shelf.
                        </p>
                    </div>
                </m.div>

                {/* Main Image */}
                <m.div
                    initial={{ opacity: 0, y: 35, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.8,
                        delay: 0.2,
                        ease: EASE,
                    }}
                    className="relative mx-auto mt-8 max-w-6xl sm:mt-10"
                >
                    <div className="overflow-hidden rounded-2xl border border-white bg-white shadow-[0_20px_50px_rgba(17,40,91,0.12)] sm:rounded-[24px] md:rounded-[28px]">
                        <img
                            src="/images/no_manual_stock.webp"
                            alt="Warehouse stock management with automated inventory updates"
                            className="block h-auto w-full"
                            loading="lazy"
                        />
                    </div>

                    <div className="pointer-events-none absolute -bottom-10 left-1/2 -z-10 h-24 w-[75%] -translate-x-1/2 rounded-full bg-orange-200/30 blur-[60px]" />
                </m.div>
            </div>
        </section>
    );
}