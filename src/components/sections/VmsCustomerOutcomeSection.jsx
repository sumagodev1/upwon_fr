import { useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { Play, BadgeCheck, X } from 'lucide-react';
import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIDEO_SRC = '/video/pos_growth_engine.mp4';

const VIDEOS = [
    {
        id: 0,
        label: 'VMS',
        duration: '2:15',
        badge: 'UpWon VMS',
        title: 'Connected vendor management',
        description:
            'See how UpWon brings vendors, procurement, and business workflows together in one connected system.',
        button: 'Read case study',
    },
    {
        id: 1,
        label: 'Vendor Self-Service',
        duration: '1:42',
        badge: 'Vendor Self-Service',
        title: 'Faster vendor collaboration',
        description:
            'Give vendors a simple self-service experience while keeping every interaction visible to your team.',
        button: 'Read case study',
    },
    {
        id: 2,
        label: 'Procurement Intelligence',
        duration: '2:08',
        badge: 'Procurement Intelligence',
        title: 'Smarter procurement decisions',
        description:
            'Turn vendor and procurement data into clearer insights, stronger decisions, and better business visibility.',
        button: 'Read case study',
    },
];

export default function VmsCustomerOutcomeSection() {

    /*
     * activeIndex:
     * Controls which card is WIDE.
     *
     * popupVideo:
     * Controls which video is currently open in popup.
     */
    const [activeIndex, setActiveIndex] = useState(0);
    const [popupVideo, setPopupVideo] = useState(null);

    const activeVideo = VIDEOS[activeIndex];

    /*
     * ============================================================
     * CARD CLICK BEHAVIOR
     *
     * First click:
     * - If different card -> make it wide
     *
     * Second click:
     * - If already wide -> open popup
     * ============================================================
     */
    const handleCardClick = (video) => {

        if (video.id !== activeIndex) {
            setActiveIndex(video.id);
            return;
        }

        setPopupVideo(video);
    };

    /*
     * ============================================================
     * CLOSE POPUP
     * ============================================================
     */
    const closePopup = () => {
        setPopupVideo(null);
    };

    /*
     * ============================================================
     * DYNAMIC GRID COLUMNS
     *
     * IMPORTANT:
     * Cards DO NOT reorder.
     *
     * Card 1 wide:
     * [ WIDE ][ SMALL ][ SMALL ]
     *
     * Card 2 wide:
     * [ SMALL ][ WIDE ][ SMALL ]
     *
     * Card 3 wide:
     * [ SMALL ][ SMALL ][ WIDE ]
     * ============================================================
     */
    const gridColumns =
        activeIndex === 0
            ? 'lg:grid-cols-[minmax(0,2fr)_minmax(190px,0.68fr)_minmax(190px,0.68fr)]'
            : activeIndex === 1
                ? 'lg:grid-cols-[minmax(190px,0.68fr)_minmax(0,2fr)_minmax(190px,0.68fr)]'
                : 'lg:grid-cols-[minmax(190px,0.68fr)_minmax(190px,0.68fr)_minmax(0,2fr)]';

    /*
     * ============================================================
     * DESCRIPTION POSITION
     *
     * Tailwind does not safely generate dynamic:
     * lg:col-start-${activeIndex + 1}
     *
     * So use explicit classes.
     * ============================================================
     */
    const contentPosition =
        activeIndex === 0
            ? 'lg:col-start-1'
            : activeIndex === 1
                ? 'lg:col-start-2'
                : 'lg:col-start-3';

    return (
        <section
            className="
                relative
                w-full
                overflow-hidden
                bg-[#0f1535]
                py-16
                text-white
                md:py-20
                lg:py-24
            "
        >

            {/* =========================================================
                BACKGROUND
            ========================================================= */}
            <div className="pointer-events-none absolute inset-0">
                <div
                    className="
                        absolute
                        inset-0
                        bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.07),transparent_55%)]
                    "
                />
            </div>


            <Container className="relative z-10">

                {/* =======================================================
                    HEADING
                ======================================================= */}
                <motion.div
                    initial={{
                        opacity: 0,
                        x: -24,
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        duration: 0.65,
                        ease: EASE,
                    }}
                    className="relative z-20"
                >

                    <Eyebrow icon={BadgeCheck}>
                        CUSTOMER OUTCOMES
                    </Eyebrow>


                    <h2
                        className="
                            mt-3
                            h-display
                            text-[32px]
                            leading-[1.1]
                            tracking-tight
                            text-white
                            sm:text-[36.8px]
                        "
                    >
                        The Proof Point This
                        <span className="gradient-text-orange">
                            Page Still Needs.
                        </span>
                    </h2>


                    {/* =================================================
                        SUPPORTING TEXT
                    ================================================= */}
                    <div
                        className="
                            mt-6
                            max-w-[900px]
                            text-[16px]
                            font-medium
                            leading-[1.65]
                            text-white/80
                            md:text-[17px]
                        "
                    >
                        <p>
                            See how UpWon helps businesses bring vendors into
                            one connected workflow — with self-service,
                            streamlined procurement, and better visibility
                            across the vendor base.
                        </p>
                    </div>

                </motion.div>


                {/* =======================================================
                    VIDEO GRID
                ======================================================= */}
                <div
                    className={`
                        relative
                        z-10
                        mt-10
                        grid
                        grid-cols-1
                        gap-3
                        sm:mt-12
                        ${gridColumns}
                        lg:gap-4
                    `}
                >

                    {/* =====================================================
                        CARD 1 — VMS
                    ===================================================== */}
                    <VideoCard
                        video={VIDEOS[0]}
                        isActive={activeIndex === 0}
                        onClick={handleCardClick}
                    />


                    {/* =====================================================
                        CARD 2 — VENDOR SELF-SERVICE
                    ===================================================== */}
                    <VideoCard
                        video={VIDEOS[1]}
                        isActive={activeIndex === 1}
                        onClick={handleCardClick}
                    />


                    {/* =====================================================
                        CARD 3 — PROCUREMENT INTELLIGENCE
                    ===================================================== */}
                    <VideoCard
                        video={VIDEOS[2]}
                        isActive={activeIndex === 2}
                        onClick={handleCardClick}
                    />

                </div>


                {/* =======================================================
                    ACTIVE CONTENT
                    ======================================================= */}
                <div
                    className="
                        mt-7
                        grid
                        grid-cols-1
                        lg:grid-cols-3
                        lg:gap-4
                    "
                >

                    <motion.div
                        key={activeVideo.id}
                        initial={{
                            opacity: 0,
                            y: 12,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.35,
                            ease: EASE,
                        }}
                        className={`
                            min-w-0
                            ${contentPosition}
                            lg:col-span-1
                        `}
                    >

                        {/* =================================================
                            TITLE
                        ================================================= */}
                        <h3
                            className="
                                text-[28px]
                                font-medium
                                leading-[1.2]
                                tracking-tight
                                text-white
                                sm:text-[30px]
                                lg:text-[32px]
                            "
                        >
                            {activeVideo.title}
                        </h3>


                        {/* =================================================
                            DESCRIPTION
                        ================================================= */}
                        <p
                            className="
                                mt-3
                                max-w-[850px]
                                text-[16px]
                                font-medium
                                leading-[1.6]
                                text-white/90
                                sm:text-[17px]
                            "
                        >
                            {activeVideo.description}
                        </p>


                

                    </motion.div>

                </div>

            </Container>


            {/* =============================================================
                VIDEO POPUP
            ============================================================= */}
            <AnimatePresence>
                {popupVideo && (
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.25,
                        }}
                        className="
                            fixed
                            inset-0
                            z-[9999]
                            flex
                            items-center
                            justify-center
                            bg-black/85
                            px-4
                            py-8
                            backdrop-blur-md
                        "
                        onClick={closePopup}
                    >

                        {/* =================================================
                            POPUP
                        ================================================= */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.92,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.95,
                                y: 10,
                            }}
                            transition={{
                                duration: 0.35,
                                ease: EASE,
                            }}
                            className="
                                relative
                                w-full
                                max-w-[1100px]
                                overflow-hidden
                                rounded-2xl
                                bg-[#111111]
                                shadow-[0_30px_100px_rgba(0,0,0,0.7)]
                            "
                            onClick={(event) => event.stopPropagation()}
                        >

                            {/* =================================================
                                CLOSE BUTTON
                            ================================================= */}
                            <button
                                type="button"
                                onClick={closePopup}
                                aria-label="Close video"
                                className="
                                    absolute
                                    right-4
                                    top-4
                                    z-30
                                    grid
                                    h-10
                                    w-10
                                    place-items-center
                                    rounded-full
                                    border
                                    border-white/20
                                    bg-black/60
                                    text-white
                                    backdrop-blur-md
                                    transition-all
                                    duration-200
                                    hover:scale-105
                                    hover:bg-black/80
                                "
                            >
                                <X className="h-5 w-5" />
                            </button>


                            {/* =================================================
                                VIDEO
                            ================================================= */}
                            <div
                                className="
                                    relative
                                    aspect-video
                                    w-full
                                    bg-black
                                "
                            >

                                <video
                                    key={popupVideo.id}
                                    src={VIDEO_SRC}
                                    autoPlay
                                    controls
                                    playsInline
                                    className="
                                        h-full
                                        w-full
                                        object-contain
                                    "
                                />

                            </div>


                            {/* =================================================
                                POPUP FOOTER
                            ================================================= */}
                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    gap-4
                                    border-t
                                    border-white/10
                                    bg-[#111111]
                                    px-5
                                    py-4
                                    sm:px-6
                                "
                            >

                                <div>
                                    <p
                                        className="
                                            text-sm
                                            font-semibold
                                            text-white
                                            sm:text-base
                                        "
                                    >
                                        {popupVideo.label}
                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            text-xs
                                            text-white/50
                                        "
                                    >
                                        UpWon VMS
                                    </p>
                                </div>


                                <div
                                    className="
                                        inline-flex
                                        items-center
                                        gap-1
                                        rounded-[4px]
                                        border
                                        border-white/20
                                        px-2
                                        py-1
                                        text-[11px]
                                        text-white/70
                                    "
                                >
                                    <Play className="h-3 w-3 fill-current" />
                                    {popupVideo.duration}
                                </div>

                            </div>

                        </motion.div>

                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}


/* ========================================================================
   VIDEO CARD COMPONENT

   IMPORTANT:
   There is NO autoPlay here.

   The card only shows a preview image/frame.
   The actual video starts ONLY inside the popup.
======================================================================== */

function VideoCard({ video, isActive, onClick }) {

    return (
        <motion.div
            layout
            transition={{
                layout: {
                    duration: 0.55,
                    ease: EASE,
                },
            }}
            className="group cursor-pointer"
            onClick={() => onClick(video)}
        >

            {/* =============================================================
                CARD
            ============================================================= */}
            <div
                className="
                    relative
                    h-[450px]
                    overflow-hidden
                    rounded-[7px]
                    bg-[#151515]
                    sm:h-[500px]
                    lg:h-[450px]
                "
            >

                {/* =========================================================
                    VIDEO PREVIEW

                    IMPORTANT:
                    NO autoPlay
                    NO loop

                    This prevents all 3 videos from playing simultaneously.
                ========================================================= */}
                <video
                    src={VIDEO_SRC}
                    muted
                    playsInline
                    preload="metadata"
                    className="
                        absolute
                        inset-0
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-[1.025]
                    "
                />


                {/* =========================================================
                    DARK OVERLAY
                ========================================================= */}
                <div
                    className="
                        absolute
                        inset-0
                        bg-black/25
                        transition-colors
                        duration-500
                        group-hover:bg-black/15
                    "
                />


                {/* =========================================================
                    BOTTOM GRADIENT
                ========================================================= */}
                <div
                    className="
                        absolute
                        inset-x-0
                        bottom-0
                        h-40
                        bg-gradient-to-t
                        from-black/80
                        to-transparent
                    "
                />


                {/* =========================================================
                    PLAY BUTTON

                    It is only visual.
                    Clicking the card controls the state.
                ========================================================= */}
                <div
                    className={`
                        absolute
                        left-1/2
                        top-1/2
                        grid
                        -translate-x-1/2
                        -translate-y-1/2
                        place-items-center
                        rounded-full
                        bg-white
                        text-black
                        shadow-2xl
                        transition-all
                        duration-300
                        group-hover:scale-105
                        ${
                            isActive
                                ? 'h-[78px] w-[78px]'
                                : 'h-[62px] w-[62px]'
                        }
                    `}
                >
                    <Play
                        className={`
                            ml-1
                            fill-current
                            ${
                                isActive
                                    ? 'h-8 w-8'
                                    : 'h-6 w-6'
                            }
                        `}
                    />
                </div>


                {/* =========================================================
                    BADGE
                ========================================================= */}
                <div className="absolute bottom-5 left-5">

                    {isActive ? (
                        <span
                            className="
                                rounded-sm
                                bg-white
                                px-2.5
                                py-1
                                text-[11px]
                                font-semibold
                                text-navy-950
                            "
                        >
                            {video.badge}
                        </span>
                    ) : (
                        <div
                            className="
                                rounded-full
                                border
                                border-white/20
                                bg-black/30
                                px-4
                                py-2
                                text-xs
                                font-semibold
                                text-white
                                backdrop-blur-sm
                            "
                        >
                            {video.badge}
                        </div>
                    )}

                </div>

            </div>


            {/* =============================================================
                META
            ============================================================= */}
            <div className="mt-3 flex items-center gap-2">

                <span
                    className="
                        inline-flex
                        items-center
                        gap-1
                        rounded-[3px]
                        border
                        border-white/60
                        px-1.5
                        py-[3px]
                        text-[11px]
                        leading-none
                        text-white
                    "
                >
                    <Play className="h-2.5 w-2.5 fill-current" />
                    {video.duration}
                </span>


                <span className="text-sm font-semibold text-white">
                    {video.label}
                </span>

            </div>

        </motion.div>
    );
}