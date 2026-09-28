// import {
//     useRef,
//     useState,
//     useLayoutEffect,
// } from 'react';

// import {
//     m as motion,
//     useScroll,
//     useTransform,
// } from 'framer-motion';

// import {
//     BadgeCheck,
// } from 'lucide-react';

// import Container from '../../../../components/shared/Container/Container.jsx';
// import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';


// const EASE = [0.22, 1, 0.3, 1];


// const capabilities = [
//     {
//         number: '01',
//         title: 'RFQ Management & Comparative Analysis',
//         desc: 'Compare supplier quotes side by side and choose the best value with complete transparency.',
//         image: '/images/vms_rfq_management.webp',
//         imageAlt: 'RFQ Management and Comparative Analysis',
//     },
//     {
//         number: '02',
//         title: 'Rate Contracts',
//         desc: 'Negotiate, finalize and lock in terms. Track contract validity and rate revisions over time.',
//         image: '/images/vms_rate_contracts.webp',
//         imageAlt: 'Rate Contracts',
//     },
//     {
//         number: '03',
//         title: 'Individual Vendor Login',
//         desc: 'Vendors manage their profile, documents, POs and QC reports from their dedicated portal.',
//         image: '/images/vms_vendor_login.webp',
//         imageAlt: 'Individual Vendor Login',
//     },
//     {
//         number: '04',
//         title: 'PO Status Tracking',
//         desc: 'Real-time visibility for both buyers and vendors. No more status-check phone calls.',
//         image: '/images/vms_status_logging.webp',
//         imageAlt: 'PO Status Tracking',
//     },
//     {
//         number: '05',
//         title: 'QC Process',
//         desc: 'Quality inspections linked directly to orders and vendors with digital records and outcomes.',
//         image: '/images/vms_qc_process.webp',
//         imageAlt: 'QC Process',
//     },
//     {
//         number: '06',
//         title: 'Vendor Performance Matrix',
//         desc: 'Vendors are scored across key metrics—quality, delivery, responsiveness and more.',
//         image: '/images/vms_performance_matrix.webp',
//         imageAlt: 'Vendor Performance Matrix',
//     },
//     {
//         number: '07',
//         title: 'Payment Management',
//         desc: 'Vendors see their own payment status and history without chasing your team.',
//         image: '/images/vms_payment_management.webp',
//         imageAlt: 'Payment Management',
//     },
// ];


// /* =========================================================
//    CAPABILITY ITEM
// ========================================================= */

// function CapabilityItem({
//     item,
//     index,
//     activeIndex,
//     itemRefs,
// }) {

//     const isActive =
//         activeIndex === index;

//     const isLast =
//         index === capabilities.length - 1;


//     return (
//         <motion.article
//             ref={(el) => {
//                 itemRefs.current[index] = el;
//             }}

//             initial={{
//                 opacity: 0,
//                 y: 25,
//             }}

//             whileInView={{
//                 opacity: 1,
//                 y: 0,
//             }}

//             viewport={{
//                 once: true,
//                 margin: '-80px',
//             }}

//             transition={{
//                 duration: 0.55,
//                 ease: EASE,
//             }}

//             className="
//                 relative
//                 grid
//                 grid-cols-1
//                 gap-6
//                 pb-7
//                 md:grid-cols-[64px_minmax(210px,0.85fr)_minmax(0,1.55fr)]
//                 md:gap-8
//                 lg:gap-10
//             "
//         >

//             {/* =================================================
//                 TIMELINE NUMBER + LINE
//             ================================================= */}

//             <div
//                 className="
//                     relative
//                     hidden
//                     justify-center
//                     md:flex
//                 "
//             >

//                 {!isLast && (
//                     <div
//                         className="
//                             absolute
//                             left-1/2
//                             top-[54px]
//                             h-[calc(100%+28px)]
//                             w-px
//                             -translate-x-1/2
//                             bg-gradient-to-b
//                             from-blue-300
//                             via-navy-200
//                             to-navy-100
//                         "
//                     />
//                 )}


//                 {/* NUMBER */}

//                 <div
//                     className={`
//                         relative
//                         z-10
//                         flex
//                         h-[54px]
//                         w-[54px]
//                         shrink-0
//                         items-center
//                         justify-center
//                         rounded-full
//                         border
//                         text-[18px]
//                         font-semibold
//                         transition-all
//                         duration-300

//                         ${
//                             isActive
//                                 ? `
//                                     border-blue-500
//                                     bg-blue-600
//                                     text-white
//                                     shadow-[0_0_0_5px_rgba(37,99,235,0.08),0_8px_25px_rgba(37,99,235,0.2)]
//                                 `
//                                 : `
//                                     border-navy-200
//                                     bg-white
//                                     text-navy-700
//                                     shadow-sm
//                                 `
//                         }
//                     `}
//                 >
//                     {item.number}
//                 </div>

//             </div>


//             {/* =================================================
//                 TEXT CONTENT
//             ================================================= */}

//             <div
//                 className="
//                     relative
//                     pt-1
//                     md:pt-3
//                 "
//             >

//                 {/* MOBILE NUMBER */}

//                 <div
//                     className="
//                         mb-4
//                         flex
//                         items-center
//                         gap-3
//                         md:hidden
//                     "
//                 >

//                     <div
//                         className={`
//                             flex
//                             h-11
//                             w-11
//                             items-center
//                             justify-center
//                             rounded-full
//                             border
//                             text-[15px]
//                             font-semibold
//                             transition-all
//                             duration-300

//                             ${
//                                 isActive
//                                     ? `
//                                         border-blue-600
//                                         bg-blue-600
//                                         text-white
//                                     `
//                                     : `
//                                         border-navy-200
//                                         bg-white
//                                         text-navy-700
//                                     `
//                             }
//                         `}
//                     >
//                         {item.number}
//                     </div>


//                     <div
//                         className="
//                             h-px
//                             flex-1
//                             bg-navy-200
//                         "
//                     />

//                 </div>


//                 {/* TITLE */}

//                 <h3
//                     className="
//                         max-w-[280px]
//                         text-[18px]
//                         font-bold
//                         leading-[1.4]
//                         text-navy-950
//                         lg:text-[19px]
//                     "
//                 >
//                     {item.title}
//                 </h3>


//                 {/* ACCENT LINE */}

//                 <div
//                     className={`
//                         mt-4
//                         h-[2px]
//                         w-9
//                         rounded-full
//                         transition-colors
//                         duration-300

//                         ${
//                             isActive
//                                 ? 'bg-blue-600'
//                                 : 'bg-orange-500'
//                         }
//                     `}
//                 />


//                 {/* DESCRIPTION */}

//                 <p
//                     className="
//                         mt-4
//                         max-w-[280px]
//                         text-[14px]
//                         leading-[1.7]
//                         text-navy-600
//                     "
//                 >
//                     {item.desc}
//                 </p>

//             </div>


//             {/* =================================================
//                 IMAGE CARD
//             ================================================= */}

//             <div
//                 className="
//                     group
//                     relative
//                     overflow-hidden
//                     rounded-[16px]
//                     border
//                     border-navy-200/80
//                     bg-white
//                     p-2
//                     shadow-[0_12px_35px_rgba(15,23,42,0.08)]
//                     transition-all
//                     duration-500
//                     hover:-translate-y-0.5
//                     hover:border-blue-300
//                     hover:shadow-[0_20px_50px_rgba(37,99,235,0.12)]
//                 "
//             >

//                 {/* SOFT BLUE GLOW */}

//                 <div
//                     className="
//                         pointer-events-none
//                         absolute
//                         -right-20
//                         -top-20
//                         h-44
//                         w-44
//                         rounded-full
//                         bg-blue-100/50
//                         blur-3xl
//                     "
//                 />


//                 <div
//                     className="
//                         relative
//                         overflow-hidden
//                         rounded-[10px]
//                         bg-navy-50
//                     "
//                 >

//                     <img
//                         src={item.image}
//                         alt={item.imageAlt}

//                         loading={
//                             index < 2
//                                 ? 'eager'
//                                 : 'lazy'
//                         }

//                         decoding="async"

//                         className="
//                             block
//                             h-auto
//                             w-full
//                             object-cover
//                             transition-transform
//                             duration-700
//                             group-hover:scale-[1.015]
//                         "
//                     />

//                 </div>

//             </div>

//         </motion.article>
//     );
// }


// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// export default function VmsCoreCapabilities() {

//     /* =========================================================
//        REFS
//     ========================================================= */

//     const sectionRef =
//         useRef(null);

//     const rightViewportRef =
//         useRef(null);

//     const rightContentRef =
//         useRef(null);

//     const itemRefs =
//         useRef([]);


//     /* =========================================================
//        STATE
//     ========================================================= */

//     const [
//         activeIndex,
//         setActiveIndex,
//     ] = useState(0);


//     const [
//         contentOverflow,
//         setContentOverflow,
//     ] = useState(0);


//     /* =========================================================
//        MEASURE RIGHT CONTENT

//        Calculates exactly how much content is hidden below
//        the fixed right-side frame.
//     ========================================================= */

//     useLayoutEffect(() => {

//         const calculateOverflow = () => {

//             const viewport =
//                 rightViewportRef.current;

//             const content =
//                 rightContentRef.current;


//             if (
//                 !viewport ||
//                 !content
//             ) {
//                 return;
//             }


//             const viewportHeight =
//                 viewport.clientHeight;


//             const contentHeight =
//                 content.scrollHeight;


//             const overflow =
//                 Math.max(
//                     0,
//                     contentHeight -
//                     viewportHeight
//                 );


//             setContentOverflow(
//                 overflow
//             );

//         };


//         calculateOverflow();


//         const resizeObserver =
//             new ResizeObserver(
//                 calculateOverflow
//             );


//         if (
//             rightViewportRef.current
//         ) {

//             resizeObserver.observe(
//                 rightViewportRef.current
//             );

//         }


//         if (
//             rightContentRef.current
//         ) {

//             resizeObserver.observe(
//                 rightContentRef.current
//             );

//         }


//         window.addEventListener(
//             'resize',
//             calculateOverflow
//         );


//         return () => {

//             resizeObserver.disconnect();


//             window.removeEventListener(
//                 'resize',
//                 calculateOverflow
//             );

//         };

//     }, []);


//     /* =========================================================
//        SECTION SCROLL PROGRESS
//     ========================================================= */

//     const {
//         scrollYProgress,
//     } = useScroll({

//         target: sectionRef,

//         offset: [
//             'start start',
//             'end end',
//         ],

//     });


//     /* =========================================================
//        RIGHT CONTENT MOVEMENT

//        IMPORTANT:

//        LEFT SIDE        = DOES NOT MOVE
//        RIGHT FRAME      = DOES NOT MOVE
//        CONTENT IN FRAME = MOVES
//     ========================================================= */

//     const rightContentY =
//         useTransform(

//             scrollYProgress,

//             [0, 1],

//             [
//                 0,
//                 -contentOverflow,
//             ],

//         );


//     /* =========================================================
//        ACTIVE NUMBER

//        FIX:

//        01 stays blue at beginning.
//        02-06 use center detection.
//        07 stays blue at end.
//     ========================================================= */

//     useLayoutEffect(() => {

//         const updateActive = (
//             progress =
//                 scrollYProgress.get()
//         ) => {

//             const viewport =
//                 rightViewportRef.current;


//             if (!viewport) {
//                 return;
//             }


//             /* =============================================
//                FIRST ITEM

//                Force 01 blue while section starts.
//             ============================================= */

//             if (progress <= 0.08) {

//                 setActiveIndex(0);

//                 return;
//             }


//             /* =============================================
//                LAST ITEM

//                Force 07 blue before section releases.
//             ============================================= */

//             if (progress >= 0.92) {

//                 setActiveIndex(
//                     capabilities.length - 1
//                 );

//                 return;
//             }


//             /* =============================================
//                MIDDLE ITEMS

//                Find capability closest to center.
//             ============================================= */

//             const viewportRect =
//                 viewport.getBoundingClientRect();


//             const viewportCenter =
//                 viewportRect.top +
//                 viewportRect.height / 2;


//             let closestIndex = 0;

//             let closestDistance =
//                 Infinity;


//             itemRefs.current.forEach(
//                 (element, index) => {

//                     if (!element) {
//                         return;
//                     }


//                     const rect =
//                         element.getBoundingClientRect();


//                     const itemCenter =
//                         rect.top +
//                         rect.height / 2;


//                     const distance =
//                         Math.abs(
//                             itemCenter -
//                             viewportCenter
//                         );


//                     if (
//                         distance <
//                         closestDistance
//                     ) {

//                         closestDistance =
//                             distance;

//                         closestIndex =
//                             index;

//                     }

//                 }
//             );


//             setActiveIndex(
//                 closestIndex
//             );

//         };


//         /* =============================================
//            INITIAL STATE

//            Guarantees 01 starts blue.
//         ============================================= */

//         updateActive(0);


//         /* =============================================
//            LISTEN TO SCROLL
//         ============================================= */

//         const unsubscribe =
//             scrollYProgress.on(
//                 'change',
//                 updateActive
//             );


//         return () => {

//             unsubscribe();

//         };

//     }, [
//         scrollYProgress,
//         contentOverflow,
//     ]);


//     /* =========================================================
//        SECTION HEIGHT

//        Gives the section enough scroll distance for all
//        right-side cards to pass through the frame.
//     ========================================================= */

//     const sectionStyle =
//         contentOverflow > 0
//             ? {
//                 height:
//                     `calc(100vh + ${contentOverflow}px)`,
//             }
//             : undefined;


//     /* =========================================================
//        RENDER
//     ========================================================= */

//     return (

//         <section
//             ref={sectionRef}

//             style={sectionStyle}

//             className="
//                 relative
//                 bg-white
//             "
//         >

//             {/* =================================================
//                 BACKGROUND DECORATIONS
//             ================================================= */}

//             <div
//                 className="
//                     pointer-events-none
//                     absolute
//                     inset-0
//                     overflow-hidden
//                 "
//             >

//                 {/* LEFT ORANGE GLOW */}

//                 <div
//                     className="
//                         absolute
//                         -left-40
//                         top-32
//                         h-[450px]
//                         w-[450px]
//                         rounded-full
//                         bg-orange-50/70
//                         blur-[120px]
//                     "
//                 />


//                 {/* RIGHT BLUE GLOW */}

//                 <div
//                     className="
//                         absolute
//                         -right-48
//                         top-[20%]
//                         h-[550px]
//                         w-[550px]
//                         rounded-full
//                         bg-blue-50/70
//                         blur-[150px]
//                     "
//                 />


//                 {/* BOTTOM GLOW */}

//                 <div
//                     className="
//                         absolute
//                         bottom-[-250px]
//                         left-[25%]
//                         h-[500px]
//                         w-[600px]
//                         rounded-full
//                         bg-sky-50/80
//                         blur-[150px]
//                     "
//                 />

//             </div>


//             {/* =================================================
//                 STICKY SCREEN

//                 Entire visible layout stays on screen while
//                 this section has scroll distance remaining.
//             ========================================================= */}

//             <div
//                 className="
//                     sticky
//                     top-0
//                     flex
//                     h-screen
//                     items-center
//                     py-20
//                     md:py-24
//                     lg:py-28
//                 "
//             >

//                 <Container
//                     className="
//                         relative
//                         w-full
//                     "
//                 >

//                     <div
//                         className="
//                             grid
//                             gap-14
//                             xl:grid-cols-[410px_minmax(0,1fr)]
//                             xl:gap-16
//                         "
//                     >

//                         {/* =================================================
//                             LEFT SIDE

//                             REMAINS IN SAME SCREEN POSITION
//                         ================================================= */}

//                         <motion.div
//                             initial={{
//                                 opacity: 0,
//                                 x: -24,
//                             }}

//                             whileInView={{
//                                 opacity: 1,
//                                 x: 0,
//                             }}

//                             viewport={{
//                                 once: true,
//                             }}

//                             transition={{
//                                 duration: 0.65,
//                                 ease: EASE,
//                             }}

//                             className="
//                                 relative
//                                 z-10
//                                 xl:flex
//                                 xl:h-[calc(100vh-10rem)]
//                                 xl:flex-col
//                                 xl:justify-center
//                             "
//                         >

//                             <Eyebrow
//                                 icon={BadgeCheck}
//                             >
//                                 CORE CAPABILITIES
//                             </Eyebrow>


//                             <h2
//                                 className="
//                                     mt-3
//                                     h-display
//                                     text-[32px]
//                                     leading-[1.1]
//                                     tracking-tight
//                                     text-navy-950
//                                     sm:text-[36.8px]
//                                 "
//                             >
//                                 From First Quote to Final Payment-

//                                 <span
//                                     className="
//                                         gradient-text-orange
//                                     "
//                                 >
//                                     In One System.
//                                 </span>

//                             </h2>


//                             {/* SUPPORTING TEXT */}

//                             <div
//                                 className="
//                                     mt-7
//                                     space-y-1
//                                     text-[16px]
//                                     leading-[1.65]
//                                     text-navy-700
//                                     md:text-[17px]
//                                 "
//                             >

//                                 <p>
//                                     Every stage connected.
//                                 </p>

//                                 <p>
//                                     Every vendor interaction visible.
//                                 </p>

//                                 <p>
//                                     Every decision backed by data.
//                                 </p>

//                             </div>

//                         </motion.div>


//                         {/* =================================================
//                             RIGHT SIDE
//                         ================================================= */}

//                         <motion.div
//                             initial={{
//                                 opacity: 0,
//                                 y: 20,
//                             }}

//                             whileInView={{
//                                 opacity: 1,
//                                 y: 0,
//                             }}

//                             viewport={{
//                                 once: true,
//                             }}

//                             transition={{
//                                 duration: 0.65,
//                                 delay: 0.1,
//                                 ease: EASE,
//                             }}

//                             className="
//                                 relative
//                                 h-[calc(100vh-10rem)]
//                                 min-h-[620px]
//                             "
//                         >

//                             {/* =================================================
//                                 OUTER TIMELINE FRAME

//                                 THIS FRAME DOES NOT MOVE
//                             ================================================= */}

//                             <div
//                                 ref={
//                                     rightViewportRef
//                                 }

//                                 className="
//                                     relative
//                                     h-full
//                                     overflow-hidden
//                                     rounded-[22px]
//                                     border
//                                     border-navy-200/80
//                                     bg-white
//                                     p-5
//                                     shadow-[0_20px_60px_rgba(15,23,42,0.06)]
//                                     md:p-7
//                                     lg:p-8
//                                 "
//                             >

//                                 {/* TOP HIGHLIGHT */}

//                                 <div
//                                     className="
//                                         pointer-events-none
//                                         absolute
//                                         left-0
//                                         right-0
//                                         top-0
//                                         z-30
//                                         h-[2px]
//                                         bg-gradient-to-r
//                                         from-transparent
//                                         via-blue-300/70
//                                         to-transparent
//                                     "
//                                 />


//                                 {/* LEFT BORDER */}

//                                 <div
//                                     className="
//                                         pointer-events-none
//                                         absolute
//                                         bottom-0
//                                         left-0
//                                         top-0
//                                         z-30
//                                         w-px
//                                         bg-gradient-to-b
//                                         from-blue-400/60
//                                         via-navy-100
//                                         to-transparent
//                                     "
//                                 />


//                                 {/* =================================================
//                                     SCROLLING CONTENT

//                                     ONLY THIS PART MOVES UP/DOWN.
//                                 ================================================= */}

//                                 <motion.div
//                                     ref={
//                                         rightContentRef
//                                     }

//                                     style={{
//                                         y: rightContentY,
//                                     }}

//                                     className="
//                                         relative
//                                         will-change-transform
//                                     "
//                                 >

//                                     {capabilities.map(
//                                         (
//                                             item,
//                                             index
//                                         ) => (

//                                             <CapabilityItem
//                                                 key={
//                                                     item.number
//                                                 }

//                                                 item={
//                                                     item
//                                                 }

//                                                 index={
//                                                     index
//                                                 }

//                                                 activeIndex={
//                                                     activeIndex
//                                                 }

//                                                 itemRefs={
//                                                     itemRefs
//                                                 }
//                                             />

//                                         )
//                                     )}

//                                 </motion.div>

//                             </div>

//                         </motion.div>

//                     </div>

//                 </Container>

//             </div>

//         </section>

//     );
// }





import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import {
    m as motion,
} from 'framer-motion';

import {
    ArrowLeft,
    ArrowRight,
    BadgeCheck,
} from 'lucide-react';

import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';
import HeadingLines from '../../../../components/shared/HeadingLines/HeadingLines.jsx';


const EASE = [0.22, 1, 0.3, 1];


/* =========================================================
   CAPABILITIES
========================================================= */

/*
  The built-in copy, written in the shape the API sends so that a CMS section
  and the shipped one take one identical path through the render below.
*/
const EYEBROW = 'CORE CAPABILITIES';
const HEADING_LINES = [
    [{ text: 'From First Quote to Final Payment-', accent: false }],
    [{ text: 'In One System.', accent: true }],
];
const SUBTEXT =
    'Every stage connected.\nEvery vendor interaction visible.\nEvery decision backed by data.';

const BUILT_IN_CAPABILITIES = [
    {
        number: '01',
        title: 'RFQ Management & Comparative Analysis',
        desc: 'Compare supplier quotes side by side and choose the best value with complete transparency.',
        image: '/images/vms_rfq_management.webp',
        imageAlt: 'RFQ Management and Comparative Analysis',
    },
    {
        number: '02',
        title: 'Rate Contracts',
        desc: 'Negotiate, finalize and lock in terms. Track contract validity and rate revisions over time.',
        image: '/images/vms_rate_contracts.webp',
        imageAlt: 'Rate Contracts',
    },
    {
        number: '03',
        title: 'Individual Vendor Login',
        desc: 'Vendors manage their profile, documents, POs and QC reports from their dedicated portal.',
        image: '/images/vms_vendor_login.webp',
        imageAlt: 'Individual Vendor Login',
    },
    {
        number: '04',
        title: 'PO Status Tracking',
        desc: 'Real-time visibility for both buyers and vendors. No more status-check phone calls.',
        image: '/images/vms_status_logging.webp',
        imageAlt: 'PO Status Tracking',
    },
    {
        number: '05',
        title: 'QC Process',
        desc: 'Quality inspections linked directly to orders and vendors with digital records and outcomes.',
        image: '/images/vms_qc_process.webp',
        imageAlt: 'QC Process',
    },
    {
        number: '06',
        title: 'Vendor Performance Matrix',
        desc: 'Vendors are scored across key metrics—quality, delivery, responsiveness and more.',
        image: '/images/vms_performance_matrix.webp',
        imageAlt: 'Vendor Performance Matrix',
    },
    {
        number: '07',
        title: 'Payment Management',
        desc: 'Vendors see their own payment status and history without chasing your team.',
        image: '/images/vms_payment_management.webp',
        imageAlt: 'Payment Management',
    },
];


/* =========================================================
   CREATE MANY COPIES

   This prevents the track from ever running out of cards.

   5 copies:
   01 02 03 04 05 06 07
   01 02 03 04 05 06 07
   01 02 03 04 05 06 07
   01 02 03 04 05 06 07
   01 02 03 04 05 06 07
========================================================= */

/*
   How many copies of the list the track holds, so it never runs out of cards
   while the visitor scrolls.

   The copies and the starting offset used to be computed here. They moved
   into the component with the list itself: which cards are in play is now a
   prop, so neither can be known until render.
*/
const COPY_COUNT = 5;


/*
   The active position starts at the middle copy.

   Copy 1 = index 0
   Copy 2 = index 7
   Copy 3 = index 14  ← START HERE
   Copy 4 = index 21
   Copy 5 = index 28
*/



/* =========================================================
   CARD
========================================================= */

function CapabilityCard({
    item,
    index,
    activeIndex,
}) {

    const isActive =
        activeIndex === index;


    return (
        <motion.article
            className="
                group
                relative
                h-[365px]
                w-[280px]
                shrink-0
                overflow-hidden
                rounded-[16px]
                border
                border-navy-200/80
                bg-white
                shadow-[0_6px_0_rgba(15,23,42,0.85)]

                sm:h-[380px]
                sm:w-[300px]

                md:h-[390px]
                md:w-[310px]

                lg:h-[400px]
                lg:w-[320px]
            "
            animate={{
                scale: isActive
                    ? 1
                    : 0.985,
            }}
            transition={{
                duration: 0.45,
                ease: EASE,
            }}
        >

            {/* =================================================
                NUMBER
            ================================================= */}

            <div
                className={`
                    absolute
                    left-5
                    top-5
                    z-30
                    flex
                    h-[30px]
                    min-w-[30px]
                    items-center
                    justify-center
                    rounded-full
                    border
                    px-2
                    text-[10px]
                    font-semibold
                    tracking-tight
                    transition-all
                    duration-300

                    ${
                        isActive
                            ? `
                                border-blue-500
                                bg-blue-600
                                text-white
                            `
                            : `
                                border-navy-200
                                bg-white
                                text-navy-700
                            `
                    }
                `}
            >
                {item.number}
            </div>


            {/* =================================================
                TEXT
            ================================================= */}

            <div
                className="
                    relative
                    z-20
                    px-5
                    pt-[68px]

                    sm:px-6
                "
            >

                <h3
                    className="
                        max-w-[255px]
                        text-[15px]
                        font-bold
                        uppercase
                        leading-[1.25]
                        tracking-[-0.025em]
                        text-navy-950

                        sm:text-[16px]
                    "
                >
                    {item.title}
                </h3>


                <div
                    className={`
                        mt-4
                        h-[2px]
                        w-9
                        rounded-full

                        ${
                            isActive
                                ? 'bg-blue-600'
                                : 'bg-orange-500'
                        }
                    `}
                />


                <p
                    className="
                        mt-4
                        max-w-[255px]
                        text-[12px]
                        leading-[1.55]
                        text-navy-600

                        sm:text-[13px]
                    "
                >
                    {item.desc}
                </p>

            </div>


            {/* =================================================
                IMAGE

                More height so dashboard image remains complete.
            ================================================= */}

            <div
                className="
                    absolute
                    bottom-[5px]
                    left-0
                    right-0
                    flex
                    h-[180px]
                    items-end
                    justify-center
                    px-4
                    pb-4

                    sm:h-[190px]
                    sm:px-5

                    md:h-[195px]

                    lg:h-[200px]
                    lg:px-6
                "
            >

                <motion.img
                    src={item.image}
                    alt={item.imageAlt}

                    loading="lazy"

                    decoding="async"

                    animate={{
                        scale: isActive
                            ? 1
                            : 0.985,

                        y: isActive
                            ? 0
                            : 2,
                    }}

                    transition={{
                        duration: 0.5,
                        ease: EASE,
                    }}

                    className="
                        block
                        h-auto
                        max-h-[160px]
                        w-auto
                        max-w-full
                        object-contain
                        object-center

                        sm:max-h-[170px]
                        md:max-h-[180px]
                        lg:max-h-[188px]

                        transition-transform
                        duration-700

                        group-hover:scale-[1.025]
                    "
                />

            </div>


            {/* =================================================
                BOTTOM LINE
            ================================================= */}

            <div
                className={`
                    absolute
                    bottom-0
                    left-0
                    right-0
                    z-30
                    h-[5px]

                    ${
                        isActive
                            ? 'bg-blue-600'
                            : 'bg-navy-900'
                    }
                `}
            />

        </motion.article>
    );
}


/* =========================================================
   MAIN
========================================================= */

export default function VmsCoreCapabilities({ section = null }) {

    /*
       The list in play, and the two values derived from it.

       Both used to be module-level constants. They cannot be any more: the
       CMS decides how many cards there are, so the length of the track and
       the offset the carousel starts at follow the prop.
    */
    const capabilities =
        section && section.cards.length > 0
            ? section.cards
            : BUILT_IN_CAPABILITIES;

    const eyebrow = section ? section.eyebrow : EYEBROW;
    const headingLines = section ? section.headingLines : HEADING_LINES;
    // Each authored line is its own <p> under the heading.
    const subtextLines = (section ? section.subtext : SUBTEXT)
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);

    const infiniteCapabilities = useMemo(
        () =>
            Array.from(
                { length: COPY_COUNT },
                () => capabilities
            ).flat(),
        [capabilities]
    );

    // The middle copy, so there is room to scroll either way from the start.
    const START_INDEX =
        capabilities.length * 2;

    const cardRef =
        useRef(null);


    const [
        activeIndex,
        setActiveIndex,
    ] = useState(
        START_INDEX
    );


    const [
        cardStep,
        setCardStep,
    ] = useState(336);


    const [
        animateTrack,
        setAnimateTrack,
    ] = useState(true);


    /* =========================================================
       MEASURE CARD WIDTH
    ========================================================= */

    useEffect(() => {

        const measureCard =
            () => {

                if (
                    !cardRef.current
                ) {
                    return;
                }


                const width =
                    cardRef.current
                        .getBoundingClientRect()
                        .width;


                setCardStep(
                    width + 16
                );
            };


        measureCard();


        window.addEventListener(
            'resize',
            measureCard
        );


        return () => {

            window.removeEventListener(
                'resize',
                measureCard
            );

        };

    }, []);


    /* =========================================================
       INFINITE POSITION NORMALIZATION

       Keep the active card inside the MIDDLE COPY.

       Middle copy:
       14 → 20

       If we reach:
       21

       immediately reset to:
       14

       Both positions show card 01.

       There is no blank area because the reset happens
       AFTER the duplicated card has already arrived.
    ========================================================= */

    useEffect(() => {

        const middleStart =
            capabilities.length * 2;

        const middleEnd =
            middleStart +
            capabilities.length -
            1;


        /*
           Moving forward beyond 07.
        */

        if (
            activeIndex >
            middleEnd
        ) {

            const timeout =
                window.setTimeout(
                    () => {

                        setAnimateTrack(
                            false
                        );

                        setActiveIndex(
                            middleStart
                        );


                        requestAnimationFrame(
                            () => {

                                requestAnimationFrame(
                                    () => {

                                        setAnimateTrack(
                                            true
                                        );

                                    }
                                );

                            }
                        );

                    },
                    1250
                );


            return () =>
                window.clearTimeout(
                    timeout
                );
        }


        /*
           Moving backwards before 01.
        */

        if (
            activeIndex <
            middleStart
        ) {

            const timeout =
                window.setTimeout(
                    () => {

                        setAnimateTrack(
                            false
                        );

                        setActiveIndex(
                            middleEnd
                        );


                        requestAnimationFrame(
                            () => {

                                requestAnimationFrame(
                                    () => {

                                        setAnimateTrack(
                                            true
                                        );

                                    }
                                );

                            }
                        );

                    },
                    1250
                );


            return () =>
                window.clearTimeout(
                    timeout
                );
        }

    }, [
        activeIndex,
    ]);


    /* =========================================================
       NEXT
    ========================================================= */

    const handleNext = () => {

        setAnimateTrack(
            true
        );

        setActiveIndex(
            (current) =>
                current + 1
        );
    };


    /* =========================================================
       PREVIOUS
    ========================================================= */

    const handlePrevious = () => {

        setAnimateTrack(
            true
        );

        setActiveIndex(
            (current) =>
                current - 1
        );
    };


    /* =========================================================
       AUTO SCROLL

       Slow continuous movement.

       Every 3.8 seconds:
       next card

       Animation:
       1.2 seconds
    ========================================================= */

    useEffect(() => {

        const timer =
            window.setInterval(
                () => {

                    setAnimateTrack(
                        true
                    );

                    setActiveIndex(
                        (current) =>
                            current + 1
                    );

                },
                3800
            );


        return () => {

            window.clearInterval(
                timer
            );

        };

    }, []);


    /* =========================================================
       DRAG / SWIPE
    ========================================================= */

    const handleDragEnd = (
        event,
        info
    ) => {

        const offset =
            info.offset.x;

        const velocity =
            info.velocity.x;


        if (
            offset < -60 ||
            velocity < -500
        ) {

            handleNext();

            return;
        }


        if (
            offset > 60 ||
            velocity > 500
        ) {

            handlePrevious();

        }

    };


    /* =========================================================
       DISPLAY NUMBER

       01 → 07 regardless of duplicate copy.
    ========================================================= */

    const displayIndex =
        (
            activeIndex %
            capabilities.length
        );


    return (

        <section
            className="
                relative
                w-full
                overflow-hidden
                bg-white
                py-14

                sm:py-16
                md:py-20
                lg:py-24
            "
        >

            <Container
                className="
                    relative
                    w-full
                "
            >

                {/* =================================================
                    NO OUTER BORDER
                ================================================= */}

                <div
                    className="
                        relative
                        w-full
                        overflow-hidden
                        bg-white
                        py-4

                        sm:py-6
                        md:py-8
                    "
                >

                    {/* =================================================
                        HEADER
                    ================================================= */}

                    <div
                        className="
                            flex
                            items-end
                            justify-between
                            gap-6
                            px-1

                            sm:px-2
                            md:px-4
                            lg:px-6
                        "
                    >

                        {/* HEADER */}

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

                            className="
                                max-w-[650px]
                            "
                        >

                            {eyebrow && (
                                <Eyebrow
                                    icon={BadgeCheck}
                                >
                                    {eyebrow}
                                </Eyebrow>
                            )}


                            <h2
                                className="
                                    mt-3
                                    h-display
                                    max-w-[650px]
                                    text-[32px]
                                    leading-[1.02]
                                    tracking-tight
                                    text-navy-950

                                    sm:text-[22.8px]
                                    md:text-[28px]
                                    lg:text-[36.8px]
                                "
                            >
                                {/*
                                   The accent run is drawn `block`, so each
                                   authored line becomes its own line here -
                                   which is what the stored newline means.
                                */}
                                <HeadingLines
                                    lines={headingLines}
                                    accentClassName="block gradient-text-orange"
                                />
                            </h2>


                            <div
                                className="
                                    mt-6
                                    space-y-1
                                    text-[15px]
                                    leading-[1.65]
                                    text-navy-700

                                    md:text-[16px]
                                    lg:text-[17px]
                                "
                            >
                                {/*
                                   Three short lines rather than a paragraph,
                                   so the stored subtext is split on its
                                   newlines and each becomes its own <p>.
                                */}
                                {subtextLines.map((line) => (
                                    <p key={line}>{line}</p>
                                ))}
                            </div>

                        </motion.div>


                        {/* =================================================
                            ARROWS
                        ================================================= */}

                        <div
                            className="
                                flex
                                shrink-0
                                items-center
                                gap-2
                                pb-1

                                sm:gap-3
                            "
                        >

                            <button
                                type="button"
                                onClick={
                                    handlePrevious
                                }

                                aria-label="
                                    Previous capability
                                "

                                className="
                                    flex
                                    h-[40px]
                                    w-[40px]
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-navy-200
                                    bg-white
                                    text-navy-700
                                    transition-all
                                    duration-200

                                    hover:border-blue-500
                                    hover:bg-blue-50
                                    hover:text-blue-600

                                    active:scale-95

                                    sm:h-[44px]
                                    sm:w-[44px]
                                "
                            >

                                <ArrowLeft
                                    size={17}
                                    strokeWidth={1.7}
                                />

                            </button>


                            <button
                                type="button"
                                onClick={
                                    handleNext
                                }

                                aria-label="
                                    Next capability
                                "

                                className="
                                    flex
                                    h-[40px]
                                    w-[40px]
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-navy-200
                                    bg-white
                                    text-navy-700
                                    transition-all
                                    duration-200

                                    hover:border-blue-500
                                    hover:bg-blue-50
                                    hover:text-blue-600

                                    active:scale-95

                                    sm:h-[44px]
                                    sm:w-[44px]
                                "
                            >

                                <ArrowRight
                                    size={17}
                                    strokeWidth={1.7}
                                />

                            </button>

                        </div>

                    </div>


                    {/* =================================================
                        CAROUSEL
                    ================================================= */}

                    <div
                        className="
                            relative
                            mt-10
                            overflow-hidden

                            sm:mt-12
                            md:mt-14
                        "
                    >

                        {/* LEFT MASK */}

                        <div
                            className="
                                pointer-events-none
                                absolute
                                bottom-0
                                left-0
                                top-0
                                z-40
                                w-8
                                bg-gradient-to-r
                                from-white
                                to-transparent

                                sm:w-10
                                md:w-14
                            "
                        />


                        {/* RIGHT MASK */}

                        <div
                            className="
                                pointer-events-none
                                absolute
                                bottom-0
                                right-0
                                top-0
                                z-40
                                w-8
                                bg-gradient-to-l
                                from-white
                                to-transparent

                                sm:w-10
                                md:w-14
                            "
                        />


                        {/* =================================================
                            TRACK

                            IMPORTANT:
                            The track is much longer than the viewport.
                            There is ALWAYS another card after 07.
                        ================================================= */}

                        <motion.div
                            drag="x"

                            dragConstraints={{
                                left: 0,
                                right: 0,
                            }}

                            dragElastic={0.08}

                            onDragEnd={
                                handleDragEnd
                            }

                            animate={{
                                x:
                                    -activeIndex *
                                    cardStep,
                            }}

                            transition={
                                animateTrack
                                    ? {
                                        duration: 1.2,
                                        ease: EASE,
                                    }
                                    : {
                                        duration: 0,
                                    }
                            }

                            className="
                                flex
                                w-max
                                gap-4
                                cursor-grab
                                pl-1
                                pr-1
                                active:cursor-grabbing

                                sm:pl-2
                                sm:pr-2

                                md:pl-4
                                md:pr-4

                                lg:pl-6
                                lg:pr-6
                            "
                        >

                            {infiniteCapabilities.map(
                                (
                                    item,
                                    index
                                ) => (

                                    <div
                                        key={`
                                            ${item.number}-
                                            ${index}
                                        `}

                                        ref={
                                            index ===
                                            START_INDEX
                                                ? cardRef
                                                : null
                                        }

                                        className="
                                            shrink-0
                                        "
                                    >

                                        <CapabilityCard
                                            item={
                                                item
                                            }

                                            index={
                                                index
                                            }

                                            activeIndex={
                                                activeIndex
                                            }
                                        />

                                    </div>

                                )
                            )}

                        </motion.div>

                    </div>


                    {/* =================================================
                        COUNTER
                    ================================================= */}

                    <div
                        className="
                            mt-8
                            flex
                            items-center
                            justify-between
                            px-1

                            sm:px-2
                            md:px-4
                            lg:px-6
                        "
                    >

                        <div
                            className="
                                flex
                                items-center
                                gap-1
                                text-[11px]
                                font-semibold
                                tracking-[0.08em]
                            "
                        >

                            <span
                                className="
                                    font-bold
                                    text-blue-600
                                "
                            >
                                {String(
                                    displayIndex + 1
                                ).padStart(
                                    2,
                                    '0'
                                )}
                            </span>


                            <span
                                className="
                                    text-navy-300
                                "
                            >
                                /
                            </span>


                            <span
                                className="
                                    text-navy-500
                                "
                            >
                                07
                            </span>

                        </div>


                        {/* =================================================
                            PROGRESS
                        ================================================= */}

                        <div
                            className="
                                h-[2px]
                                w-[130px]
                                overflow-hidden
                                rounded-full
                                bg-navy-100

                                sm:w-[180px]
                                md:w-[220px]
                            "
                        >

                            <motion.div
                                className="
                                    h-full
                                    rounded-full
                                    bg-blue-600
                                "

                                animate={{
                                    width: `${
                                        (
                                            displayIndex + 1
                                        ) /
                                        capabilities.length *
                                        100
                                    }%`,
                                }}

                                transition={{
                                    duration: 0.7,
                                    ease: EASE,
                                }}
                            />

                        </div>

                    </div>


                    {/* =================================================
                        MOBILE DOTS
                    ================================================= */}

                    <div
                        className="
                            mt-6
                            flex
                            justify-center
                            gap-1.5
                            md:hidden
                        "
                    >

                        {capabilities.map(
                            (
                                item,
                                index
                            ) => (

                                <button
                                    key={
                                        item.number
                                    }

                                    type="button"

                                    onClick={() => {

                                        setAnimateTrack(
                                            true
                                        );

                                        setActiveIndex(
                                            START_INDEX +
                                            index
                                        );

                                    }}

                                    aria-label={`
                                        Go to capability
                                        ${item.number}
                                    `}

                                    className={`
                                        h-[5px]
                                        rounded-full
                                        transition-all
                                        duration-300

                                        ${
                                            displayIndex ===
                                            index
                                                ? 'w-7 bg-blue-600'
                                                : 'w-1.5 bg-navy-200'
                                        }
                                    `}
                                />

                            )
                        )}

                    </div>

                </div>

            </Container>

        </section>
    );
}