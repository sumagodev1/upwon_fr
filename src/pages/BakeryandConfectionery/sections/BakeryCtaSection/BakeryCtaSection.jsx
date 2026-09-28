import { Link } from 'react-router-dom';
import { ArrowRight, Boxes } from 'lucide-react';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';
import { erpIcon } from '../../../../lib/erpIcons.js';

/**
 * A button's link. Site paths stay client-side routes; the CMS also allows an
 * absolute URL, which react-router's Link would treat as a relative path.
 */
function CtaLink({ to, children, ...rest }) {
    if (/^https?:\/\//.test(to)) {
        return (
            <a href={to} target="_blank" rel="noopener noreferrer" {...rest}>
                {children}
            </a>
        );
    }
    return (
        <Link to={to} {...rest}>
            {children}
        </Link>
    );
}

/**
 * CMS-only: the copy, artwork, buttons and marks come from the CMS via the
 * page. With no published band, or the API unreachable, the section renders
 * nothing rather than falling back to built-in content. Artwork is optional -
 * without it the band keeps its light ground.
 *
 * @param {{ section?: object | null }} props - the published band.
 */
export default function BakeryCtaSection({ section = null }) {
    if (!section) return null;

    const { desktopImage, mobileImage, primary, secondary } = section;
    const features = section.features.map((feature) => ({
        ...feature,
        icon: erpIcon(feature.icon),
    }));

    return (
        <section className="relative w-full overflow-hidden bg-[#f7f7f5] py-4 sm:py-6 lg:py-8">
            {/* Full Width CTA */}
            <div className="relative mx-auto w-full max-w-[1800px] overflow-hidden rounded-[18px] border border-orange-200/60">
                
                {/* ================= BACKGROUND IMAGES ================= */}
                {(desktopImage || mobileImage) && (
                <picture className="absolute inset-0 block h-full w-full">
                    {/* Mobile Image */}
                    {mobileImage && desktopImage && (
                        <source
                            media="(max-width: 767px)"
                            srcSet={mobileImage}
                        />
                    )}

                    {/* Desktop Image */}
                    <img
                        src={desktopImage ?? mobileImage}
                        alt="UpWon bakery operations platform"
                        className="h-full w-full object-cover object-center"
                    />
                </picture>
                )}

                {/* ================= MOBILE OVERLAY ================= */}
                {/* Stronger overlay on mobile for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#faf9f6]/95 via-[#faf9f6]/82 via-[48%] to-[#faf9f6]/25 md:hidden" />

                {/* ================= DESKTOP LEFT OVERLAY ================= */}
                <div className="absolute inset-y-0 left-0 hidden w-[72%]  from-[#faf9f6]/100 via-[#faf9f6]/92 via-[42%] to-[#faf9f6]/10 to-transparent md:block" />

                {/* Very light overall overlay */}
                <div className="absolute inset-0 bg-black/[0.02]" />

                {/* ================= CONTENT ================= */}
                <div className="relative z-10 flex min-h-[680px] items-start pt-8 sm:min-h-[700px] sm:pt-10 md:min-h-[520px] md:items-center md:pt-0 lg:min-h-[540px]">
                    <div className="w-full max-w-[720px] px-6 py-8 sm:px-8 sm:py-10 md:px-12 lg:px-16 xl:px-20">
                        
                        {/* Heading */}
                        <h2 className="h-display text-[32px] leading-[1.1] tracking-tight text-navy-950 sm:text-[38px] md:text-[31px] lg:text-[36.8px]">
                            <HeadingLines lines={section.headingLines} />
                        </h2>

                        {/* Description */}
                        {section.subtext && (
                            <p className="mt-5 max-w-[590px] text-[15px] leading-[1.7] text-[#4d596b] sm:text-[16px] md:text-[17px]">
                                {section.subtext}
                            </p>
                        )}

                        {/* CTA Buttons */}
                        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                            <CtaLink
                                to={primary.href}
                                className="group inline-flex min-h-[54px] items-center justify-center gap-4 rounded-[13px] bg-[#f4510b] px-6 text-[15px] font-semibold text-white shadow-[0_12px_25px_rgba(244,81,11,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#df4306]"
                            >
                                {primary.label}

                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
                                    <ArrowRight
                                        size={18}
                                        strokeWidth={2.5}
                                    />
                                </span>
                            </CtaLink>

                            {secondary && (
                            <CtaLink
                                to={secondary.href}
                                className="group inline-flex min-h-[54px] items-center justify-center gap-3 rounded-[13px] border border-[#d8d0c7] bg-white/70 px-6 text-[15px] font-semibold text-[#303949] backdrop-blur-sm transition duration-300 hover:border-[#e85d24]/40 hover:bg-white/90"
                            >
                                <Boxes
                                    size={20}
                                    className="text-[#e85d24]"
                                    strokeWidth={1.9}
                                />

                                {secondary.label}

                                <ArrowRight
                                    size={18}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                    strokeWidth={2}
                                />
                            </CtaLink>
                            )}
                        </div>

                        {/* ================= BOTTOM FEATURES ================= */}
                        {features.length > 0 && (
                        <div className="mt-8 grid max-w-[650px] grid-cols-2 border-t border-[#d9d1c9]/80 pt-6 sm:grid-cols-4">
                            {features.map((feature, index) => {
                                const Icon = feature.icon;

                                return (
                                    <div
                                        key={feature.label}
                                        className={`flex flex-col items-center px-2 py-2 text-center sm:px-3 ${
                                            index !== features.length - 1
                                                ? 'sm:border-r sm:border-[#d9d1c9]/80'
                                                : ''
                                        }`}
                                    >
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-[#e85d24] shadow-[0_6px_20px_rgba(25,35,55,0.08)] backdrop-blur-sm">
                                            <Icon
                                                size={24}
                                                strokeWidth={1.8}
                                            />
                                        </div>

                                        <p className="mt-3 text-[13px] font-semibold leading-[1.3] text-[#303949] sm:text-[14px]">
                                            {feature.label}
                                        </p>

                                        <p className="mt-0.5 text-[12px] font-medium leading-[1.3] text-[#4d596b] sm:text-[14px]">
                                            {feature.subLabel}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}