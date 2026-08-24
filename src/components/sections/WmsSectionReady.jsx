import { m } from 'framer-motion';
import {
    Factory,
    Warehouse,
    CalendarClock,
    Truck,
    CheckCircle2,
    ArrowRight,
} from 'lucide-react';
import Eyebrow from '../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.36, 1];

const flowSteps = [
    {
        icon: Factory,
        title: 'Production',
        subtitle: 'Batch Completed',
    },
    {
        icon: Warehouse,
        title: 'Warehouse',
        subtitle: 'Stock Updated',
    },
    {
        icon: CalendarClock,
        title: 'FEFO-Ranked',
        subtitle: 'for Putaway',
    },
    {
        icon: Truck,
        title: 'Ready for',
        subtitle: 'Dispatch',
    },
];

export default function WmsSectionReady() {
    return (
        <section className="relative overflow-hidden bg-[#f7f8fb] py-14 sm:py-16 md:py-20 lg:py-24 xl:py-28">
            {/* Background glow */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-orange-100/40 blur-[80px] sm:h-[400px] sm:w-[700px] sm:blur-[100px] lg:h-[500px] lg:w-[900px] lg:blur-[120px]" />
            </div>

            <div className="relative mx-auto w-full max-w-7xl px-4 min-[375px]:px-5 sm:px-6 md:px-8 lg:px-8 xl:px-10">
                {/* Heading */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="mx-auto max-w-4xl text-center"
                >
                    <Eyebrow className="justify-center">
                        Built In Flow
                    </Eyebrow>

                    <h2 className="mt-3 h-display text-[36.8px] leading-[1.1] tracking-tight text-navy-950">
                        From Production to Dispatch,
                        <br />
                        <span className="gradient-text-orange">
                            Every Batch Stays in Sync.
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-navy-600">
                        The moment a production batch is completed, warehouse stock updates
                        instantly with its batch and expiry details intact—eliminating separate
                        stock entry and reconciliation gaps.
                    </p>
                </m.div>

                {/* ================= DESKTOP FLOW ================= */}
                <div className="mx-auto mt-10 hidden max-w-6xl items-center justify-between lg:mt-12 md:flex">
                    {flowSteps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <div
                                key={step.title}
                                className="flex min-w-0 flex-1 items-center last:flex-none"
                            >
                                <div className="flex shrink-0 flex-col items-center text-center">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ff4f0a] shadow-[0_12px_30px_rgba(255,79,10,0.22)] md:h-24 md:w-24 lg:h-28 lg:w-28 xl:h-32 xl:w-32">
                                        <Icon
                                            className="text-white"
                                            strokeWidth={1.8}
                                            size={48}
                                        />
                                    </div>

                                    <h3 className="mt-3 text-[14px] font-semibold leading-tight text-[#1f2937] md:text-[15px] lg:mt-4 lg:text-base xl:mt-5 xl:text-lg">
                                        {step.title}
                                        <br />
                                        {step.subtitle}
                                    </h3>
                                </div>

                                {index < flowSteps.length - 1 && (
                                    <div className="mx-2 flex min-w-[25px] flex-1 items-center md:mx-3 lg:mx-4 xl:mx-5">
                                        <div className="h-[2px] min-w-0 flex-1 bg-gradient-to-r from-orange-200 via-[#ff4f0a] to-orange-200" />

                                        <ArrowRight
                                            className="ml-0.5 shrink-0 text-[#ff4f0a] md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8"
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* ================= MOBILE FLOW ================= */}
                <div className="mt-8 grid grid-cols-2 gap-3 min-[375px]:gap-4 sm:mt-10 md:hidden">
                    {flowSteps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <m.div
                                key={step.title}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.08,
                                    ease: EASE,
                                }}
                                className="flex min-h-[145px] flex-col items-center justify-center rounded-xl border border-gray-100 bg-white px-2 py-4 text-center shadow-sm min-[375px]:min-h-[155px] min-[375px]:rounded-2xl min-[375px]:p-4 sm:min-h-[170px] sm:p-5"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ff4f0a] min-[375px]:h-12 min-[375px]:w-12 sm:h-14 sm:w-14">
                                    <Icon
                                        className="text-white"
                                        size={22}
                                        strokeWidth={1.8}
                                    />
                                </div>

                                <h3 className="mt-3 text-[12px] font-semibold leading-snug text-[#1f2937] min-[375px]:text-[13px] sm:text-sm">
                                    {step.title}
                                    <br />
                                    {step.subtitle}
                                </h3>
                            </m.div>
                        );
                    })}
                </div>

                {/* ================= MESSAGE ================= */}
                <m.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{
                        duration: 0.6,
                        delay: 0.15,
                        ease: EASE,
                    }}
                    className="relative z-10 mx-auto mt-8 max-w-5xl min-[375px]:mt-10 sm:mt-12"
                >
                    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-orange-100 bg-[#fff7f1] px-4 py-4 text-center shadow-[0_10px_35px_rgba(255,79,10,0.08)] min-[375px]:px-5 sm:flex-row sm:rounded-full sm:px-8 sm:py-4 md:gap-4 lg:px-10">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ff4f0a] sm:h-10 sm:w-10">
                            <CheckCircle2
                                size={20}
                                strokeWidth={3}
                                className="text-white sm:h-[22px] sm:w-[22px]"
                            />
                        </span>

                        <p className="max-w-3xl text-[13px] font-semibold leading-relaxed text-[#222b38] min-[375px]:text-sm sm:text-left sm:text-base md:text-[17px] lg:text-lg">
                            No manual stock entry. No mismatch between what was
                            made and what&apos;s on the shelf.
                        </p>
                    </div>
                </m.div>

                {/* ================= MAIN IMAGE ================= */}
                <m.div
                    initial={{ opacity: 0, y: 35, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{
                        duration: 0.8,
                        delay: 0.2,
                        ease: EASE,
                    }}
                    className="relative mx-auto mt-7 max-w-6xl min-[375px]:mt-8 sm:mt-10"
                >
                    <div className="overflow-hidden rounded-2xl border border-white bg-white shadow-[0_20px_50px_rgba(17,40,91,0.12)] sm:rounded-[24px] md:rounded-[28px] md:shadow-[0_30px_80px_rgba(17,40,91,0.15)]">
                        <img
                            src="/images/no_manual_stock.webp"
                            alt="Warehouse stock management with automated inventory updates"
                            className="block h-auto w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <div className="pointer-events-none absolute -bottom-10 left-1/2 -z-10 h-24 w-[80%] -translate-x-1/2 rounded-full bg-orange-200/30 blur-[50px] sm:-bottom-14 sm:h-32 sm:w-[75%] sm:blur-[60px] lg:-bottom-16 lg:h-40 lg:w-[70%] lg:blur-[70px]" />
                </m.div>
            </div>
        </section>
    );
}





