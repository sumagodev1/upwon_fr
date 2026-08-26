import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const FEATURE_IMAGES = [
    {
        title: 'Real-time visibility',
        description:
            'Monitor key bakery operations, inventory levels, and business activity with a clearer real-time view.',
        image: '/images/bake_real_time_visibility.webp',
    },
    {
        title: 'Smarter inventory management',
        description:
            'Keep ingredients, packaging, and stock movement organized with better visibility across operations.',
        image: '/images/bake_smart_inventory.webp',
    },
    {
        title: 'Better production planning',
        description:
            'Plan production with greater clarity by connecting ingredient availability, recipes, and operational demand.',
        image: '/images/bake_better_production.webp',
    },
    {
        title: 'Actionable insights for better decisions',
        description:
            'Turn operational data into useful insights that help teams respond faster and make better business decisions.',
        image: '/images/bake_action_insight.webp',
    },
];

export default function BakeryWhyUpwon() {
    return (
        <section className="relative overflow-hidden bg-[#f8f9fb] py-16 sm:py-20 lg:py-24">
            {/* Soft Background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-[-180px] top-[80px] h-[420px] w-[420px] rounded-full bg-orange-100/30 blur-[120px]" />
                <div className="absolute right-[-160px] top-[220px] h-[400px] w-[400px] rounded-full bg-[#e8edf6] blur-[120px]" />
            </div>

            <Container className="relative z-10">

                {/* ================= TOP SECTION ================= */}
                <div className="grid items-stretch gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:gap-10">

                    {/* LEFT CONTENT */}
                    <div className="flex flex-col justify-center py-2 lg:py-6">
                        <Eyebrow>WHY UPWON</Eyebrow>

                        <h2 className="mt-3 h-display text-[32px] leading-[1.1] tracking-tight text-navy-950 sm:text-[25px] md:text-[31px] lg:text-[36.8px]">
                            Keep Your Business{' '}
                            <span className="gradient-text-orange">
                                Moving as Smoothly
                            </span>{' '}
                            as Your Production Line.
                        </h2>

                        <p className="mt-6 max-w-[650px] text-[16px] leading-[1.7] text-navy-600 sm:text-[17px]">
                            Bakery operations depend on timing, coordination, and consistency.
                            UpWon brings the systems behind those operations together—helping
                            teams manage purchasing, inventory, production, vendors, and
                            reporting from one connected platform.
                        </p>

                        {/* MINI BENEFIT STRIP */}
                        <div className="mt-8 grid overflow-hidden rounded-[22px] border border-navy-950/5 bg-white/70 shadow-[0_14px_40px_rgba(25,35,55,0.08)] backdrop-blur-sm sm:grid-cols-3">

                            <div className="flex min-h-[145px] flex-col items-center justify-center px-4 py-5 text-center sm:border-r sm:border-navy-950/10">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-[25px] text-[#e85d24]">
                                    ◈
                                </div>

                                <p className="mt-3 text-[14px] font-semibold text-navy-950">
                                    One platform.
                                </p>
                            </div>

                            <div className="flex min-h-[145px] flex-col items-center justify-center border-t border-navy-950/10 px-4 py-5 text-center sm:border-r sm:border-t-0 sm:border-navy-950/10">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-[25px] text-[#e85d24]">
                                    ↔
                                </div>

                                <p className="mt-3 text-[14px] font-semibold text-navy-950">
                                    Connected operations.
                                </p>
                            </div>

                            <div className="flex min-h-[145px] flex-col items-center justify-center border-t border-navy-950/10 px-4 py-5 text-center sm:border-t-0">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-[25px] text-[#e85d24]">
                                    ▮▮▮
                                </div>

                                <p className="mt-3 text-[14px] font-semibold text-navy-950">
                                    Better control.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT MAIN IMAGE */}
                    <div className="relative min-h-[420px] overflow-hidden rounded-[24px] border border-white/60 shadow-[0_18px_55px_rgba(25,35,55,0.14)] sm:min-h-[500px] lg:min-h-full">
                        <img
                            src="/images/bake_why_upwon.webp"
                            alt="Connected bakery operations with UpWon"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>
                </div>

                {/* ================= FEATURE CARDS ================= */}
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    {FEATURE_IMAGES.map((feature) => (
                        <div
                            key={feature.title}
                            className="flex h-full min-h-[370px] flex-col overflow-hidden rounded-[22px] border border-navy-950/10 bg-white shadow-[0_12px_35px_rgba(25,35,55,0.10)]"
                        >
                            {/* SAME IMAGE HEIGHT FOR ALL */}
                            <div className="h-[220px] w-full flex-shrink-0 overflow-hidden">
                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            {/* SAME TEXT AREA FOR ALL */}
                            <div className="flex min-h-[150px] flex-1 flex-col px-5 py-4">
                                <h3 className="text-[18px] font-semibold leading-[1.3] text-navy-950">
                                    {feature.title}
                                </h3>

                                <p className="mt-2 text-[14px] leading-[1.65] text-navy-600">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ================= BOTTOM MESSAGE STRIP ================= */}
                <div className="mt-6 flex min-h-[78px] flex-col items-center justify-center gap-5 rounded-[22px] border border-navy-950/5 bg-white/75 px-6 py-5 text-center shadow-[0_12px_35px_rgba(25,35,55,0.07)] backdrop-blur-sm md:flex-row md:gap-8 md:px-10">

                    <span className="whitespace-nowrap text-[15px] font-semibold text-navy-950 sm:text-[16px]">
                        One platform.
                    </span>

                    <span className="hidden text-xl text-[#e85d24] md:block">
                        •
                    </span>

                    <span className="whitespace-nowrap text-[15px] font-semibold text-navy-950 sm:text-[16px]">
                        Connected operations.
                    </span>

                    <span className="hidden text-xl text-[#e85d24] md:block">
                        •
                    </span>

                    <p className="text-[17px] font-semibold text-navy-950 sm:text-[18px]">
                        Better control from{' '}
                        <span className="gradient-text-orange">
                            ingredient to finished product.
                        </span>
                    </p>
                </div>
            </Container>
        </section>
    );
}