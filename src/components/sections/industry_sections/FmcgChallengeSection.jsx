import { m as motion } from 'framer-motion';
import {
    Package,
    ClipboardList,
    Truck,
    BarChart3,
    Boxes,
    Clock,
    MapPin,
    Users,
    AlertTriangle,
} from 'lucide-react';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const CHALLENGES = [
    {
        number: '01',
        title: 'Inventory Management',
        description:
            'Tracking stock across multiple locations is complex, leading to stockouts or overstocking.',
        Icon: Package,
    },
    {
        number: '02',
        title: 'Order Management',
        description:
            'Manual tracking and disconnected systems cause delays and order fulfillment issues.',
        Icon: ClipboardList,
    },
    {
        number: '03',
        title: 'Distribution & Delivery',
        description:
            'Route planning, real-time tracking, and on-time delivery are hard to manage efficiently.',
        Icon: Truck,
    },
    {
        number: '04',
        title: 'Demand Variability',
        description:
            'Unpredictable demand and inaccurate forecasting lead to excess stock or missed sales.',
        Icon: BarChart3,
    },
];

const PRESSURE_POINTS = [
    {
        title: 'High SKUs',
        description: 'Thousands of products to track',
        Icon: Boxes,
    },
    {
        title: 'Short Shelf Life',
        description: 'Time-sensitive inventory',
        Icon: Clock,
    },
    {
        title: 'Wide Reach',
        description: 'Multi-location operations',
        Icon: MapPin,
    },
    {
        title: 'Many Stakeholders',
        description: 'Multiple teams, multiple systems',
        Icon: Users,
    },
];

export default function FmcgChallengeSection() {
    return (
        <section className="relative w-full overflow-hidden bg-[#fdf8f3] pb-[190px] pt-12 sm:pb-[220px] sm:pt-16 md:pt-24 lg:pb-[230px]">
            {/* ================= BACKGROUND IMAGE ================= */}
            <div className="pointer-events-none absolute inset-0">
                <img
                    src="/images/fmcg_the_challenge.webp"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-full w-full object-cover object-left-bottom"
                />
                {/* Mobile: heavier wash, the copy stacks right over the artwork */}
                <div className="absolute inset-0 bg-[#fdf8f3]/85 lg:hidden" />
                {/* Desktop: top-weighted wash only — the products stay clear at the bottom */}
                <div className="absolute inset-0 hidden bg-gradient-to-b from-[#fdf8f3]/92 via-[#fdf8f3]/45 to-transparent lg:block" />
                <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-l from-[#fdf8f3]/95 to-transparent lg:block" />
            </div>

            <Container className="relative z-10 w-full">
                <div className="grid w-full min-w-0 items-start gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
                    {/* ================= LEFT ================= */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.7, ease: EASE }}
                        className="min-w-0"
                    >
                        <Eyebrow>THE CHALLENGE</Eyebrow>

                        <h2 className="mt-3 h-display text-[32px] leading-[1.1] tracking-tight text-navy-950 sm:text-[25px] md:text-[31px] lg:text-[36.8px]">
                            Fast-Moving Products Need Faster,{' '}
                            <span className="gradient-text-orange">Better-Coordinated</span>{' '}
                            Operations.
                        </h2>


                        {/* Callout */}
                        <div className="mt-6 rounded-[18px] border border-[#f4dcc7] bg-[#fff4ea]/85 p-5 backdrop-blur-[2px] sm:p-6">
                            <div className="flex items-start gap-4">
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#f0cead] bg-white/85">
                                    <BarChart3 className="h-5 w-5 text-orange-500" strokeWidth={1.8} />
                                </span>

                                <div className="min-w-0">
                                    <h3 className="h-display text-[15px] font-semibold leading-snug text-navy-950 sm:text-base">
                                        In FMCG, speed wins. But disconnected processes slow you down.
                                    </h3>
                                    <p className="mt-2 text-[13px] leading-relaxed text-navy-600 sm:text-sm">
                                        From stock visibility to last-mile delivery, gaps in
                                        coordination create delays, increase costs, and impact
                                        customer satisfaction.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Pressure points */}
                        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4">
                            {PRESSURE_POINTS.map(({ title, description, Icon }, index) => (
                                <motion.div
                                    key={title}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, ease: EASE, delay: index * 0.07 }}
                                    className="text-center"
                                >
                                    <Icon
                                        className="mx-auto h-6 w-6 text-orange-500"
                                        strokeWidth={1.6}
                                    />
                                    <p className="mt-2 text-[12px] font-semibold text-navy-950">
                                        {title}
                                    </p>
                                    <p className="mt-1 text-[11px] leading-snug text-navy-600">
                                        {description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ================= RIGHT ================= */}
                    <div className="min-w-0">
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.6, ease: EASE }}
                            className="h-display text-[20px] font-semibold leading-tight text-navy-950 sm:text-[24px]"
                        >
                            Key Challenges FMCG Companies Face
                        </motion.h3>

                        <div className="mt-5 space-y-3">
                            {CHALLENGES.map(({ number, title, description, Icon }, index) => (
                                <motion.div
                                    key={number}
                                    initial={{ opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, ease: EASE, delay: index * 0.08 }}
                                    className="group flex min-w-0 items-center gap-3 rounded-[18px] border border-[#f2e3d6] bg-white/85 px-3 py-4 backdrop-blur-[2px] transition-all duration-400 hover:border-[#e8c7a9] hover:bg-white hover:shadow-[0_16px_40px_rgba(112,67,35,0.10)] sm:gap-4 sm:px-5"
                                >
                                    {/* Icon */}
                                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border border-[#f6ddc7] bg-[#fff4ea] transition-colors duration-300 group-hover:border-[#efc39a] sm:h-14 sm:w-14">
                                        <Icon
                                            className="h-6 w-6 text-orange-500 sm:h-7 sm:w-7"
                                            strokeWidth={1.5}
                                        />
                                    </span>

                                    {/* Text */}
                                    <div className="min-w-0 flex-1">
                                        <h4 className="h-display text-[15px] font-semibold leading-tight text-navy-950 sm:text-[17px]">
                                            {title}
                                        </h4>
                                        <p className="mt-1 text-[12px] leading-relaxed text-navy-600 sm:text-[13px]">
                                            {description}
                                        </p>
                                    </div>

                                    {/* Number */}
                                    <div className="flex shrink-0 items-center justify-end border-l border-[#f0e2d6] pl-3 sm:pl-6">
                                        <span className="h-display text-[26px] font-medium leading-none text-[#f0a877] transition-colors duration-300 group-hover:text-orange-500 sm:text-[34px]">
                                            {number}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Result strip */}
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.55, ease: EASE, delay: 0.3 }}
                            className="mt-4 flex items-start gap-3 rounded-[18px] border border-[#f4d8c2] bg-[#fff2e6]/85 px-4 py-4 backdrop-blur-[2px] sm:items-center sm:gap-4 sm:px-5"
                        >
                            <AlertTriangle
                                className="h-6 w-6 shrink-0 text-orange-500 sm:h-7 sm:w-7"
                                strokeWidth={1.7}
                            />
                            <div className="min-w-0">
                                <p className="h-display text-[13px] font-semibold leading-snug text-navy-950 sm:text-[15px]">
                                    Disconnected operations. Lost visibility. Slower decisions.
                                </p>
                                <p className="mt-0.5 h-display text-[13px] font-semibold leading-snug text-orange-600 sm:text-[15px]">
                                    The result? Higher costs and unhappy customers.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
