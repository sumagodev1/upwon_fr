import { m as motion } from 'framer-motion';
import {
  ArrowRight,
  Network,
  Rocket,
} from 'lucide-react';

import Container from '../ui/Container.jsx';
import Eyebrow from '../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

export default function VmsOneSuite() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f8fbff] py-16 sm:py-20 md:py-24 lg:py-28">

      {/* =========================================================
          BACKGROUND
      ========================================================= */}
      <div className="pointer-events-none absolute inset-0">

        {/* Main supplied visual */}
        {/* <div
          className="
            absolute
            inset-0
            bg-contain
            bg-center
            bg-no-repeat
          "
          style={{
            backgroundImage: "url('/images/one_suite_vms.png')",
          }}
        /> */}

        {/* Very subtle white overlay for readability */}
        <div className="absolute inset-0 bg-white/[0.015]" />

      </div>

      <Container className="relative z-10">

        {/* =========================================================
            TOP CONTENT
        ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            margin: '-80px',
          }}
          transition={{
            duration: 0.7,
            ease: EASE,
          }}
          className="mx-auto max-w-[1200px] text-center"
        >

          {/* Eyebrow */}
          <Eyebrow>
            ONE SUITE, NOT SIX VENDORS
          </Eyebrow>

          {/* Heading */}
          <h2
            className="
              mx-auto
              mt-4
              max-w-[1180px]
              h-display
              text-[38px]
              leading-[1.08]
              tracking-tight
              text-navy-950
              sm:text-[44px]
              md:text-[52px]
              lg:text-[58px]
              xl:text-[62px]
            "
          >
            VMS Stands on Its Own.
            <br />

            <span className="gradient-text-orange">
              It&apos;s Even Better Next to Your ERP and Warehouse System.
            </span>
          </h2>

          {/* Description */}
          <p
            className="
              mx-auto
              mt-5
              max-w-[850px]
              text-base
              leading-[1.65]
              text-navy-600
              sm:text-[17px]
              md:text-lg
            "
          >
            UpWon VMS works powerfully on its own for vendor and procurement
            management — and connects natively with the rest of the UpWon
            suite when you&apos;re ready.
          </p>

        </motion.div>


        {/* =========================================================
            DESKTOP VISUAL AREA
            The supplied image contains the complete visual design.
        ========================================================= */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.98,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            margin: '-70px',
          }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: EASE,
          }}
          className="
            relative
            mx-auto
            mt-10
            hidden
            w-full
            max-w-[1450px]
            lg:block
          "
        >

          {/* Keeps the image ratio */}
          <div className="relative w-full overflow-hidden">

            <img
              src="/images/one_suite_vms.png"
              alt="UpWon VMS connected with ERP, WMS and the UpWon suite"
              className="
                block
                h-auto
                w-full
                object-contain
              "
              loading="lazy"
              decoding="async"
            />

          </div>

        </motion.div>


        {/* =========================================================
            MOBILE VISUAL
        ========================================================= */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: '-60px',
          }}
          transition={{
            duration: 0.7,
            delay: 0.1,
            ease: EASE,
          }}
          className="
            relative
            mx-auto
            mt-10
            block
            max-w-[760px]
            lg:hidden
          "
        >

          <div
            className="
              relative
              overflow-hidden
              rounded-[24px]
              border
              border-[#dce7f7]
              bg-white
              p-2
              shadow-[0_20px_60px_rgba(30,64,175,0.10)]
            "
          >

            <img
              src="/images/one_suite_vms.png"
              alt="UpWon VMS connected with ERP, WMS and the UpWon suite"
              className="
                block
                h-auto
                w-full
                object-contain
              "
              loading="lazy"
              decoding="async"
            />

          </div>

        </motion.div>


        {/* =========================================================
            RESPONSIVE CONNECTION CARDS
            These are HTML versions for mobile readability.
        ========================================================= */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">

          <SuiteCard
            icon={Network}
            title="ERP"
            description="Connect procurement data with your core business operations."
          />

          <SuiteCard
            icon={Network}
            title="WMS"
            description="Connect purchasing with warehouse and inventory workflows."
          />

          <SuiteCard
            icon={Network}
            title="SFA-DMS"
            description="Extend supplier and procurement data across connected workflows."
          />

          <SuiteCard
            icon={Network}
            title="HrEasy"
            description="Connect people, approvals and procurement processes when needed."
          />

        </div>


        {/* =========================================================
            BOTTOM MESSAGE
        ========================================================= */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: '-60px',
          }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: EASE,
          }}
          className="
            relative
            mx-auto
            mt-8
            max-w-[1250px]
            overflow-hidden
            rounded-[24px]
            border
            border-[#e0e8f7]
            bg-white/95
            shadow-[0_15px_50px_rgba(15,23,42,0.07)]
            backdrop-blur-sm
            sm:mt-10
          "
        >

          {/* Top gradient */}
          <div
            className="
              absolute
              left-0
              right-0
              top-0
              h-[2px]
              bg-gradient-to-r
              from-[#2454d8]
              via-[#00bfc3]
              to-[#f5a400]
            "
          />

          <div
            className="
              flex
              flex-col
              gap-5
              px-5
              py-5
              sm:px-7
              sm:py-6
              md:flex-row
              md:items-center
              md:gap-7
              md:px-9
            "
          >

            {/* Icon */}
            <div
              className="
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#eef4ff]
                text-[#1747c7]
              "
            >
              <Rocket
                className="h-7 w-7"
                strokeWidth={1.7}
              />
            </div>


            {/* Text */}
            <div className="min-w-0 flex-1">

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">

                <h3
                  className="
                    h-display
                    text-[22px]
                    font-semibold
                    leading-tight
                    text-[#102a72]
                    sm:text-[25px]
                  "
                >
                  Buy what you need today.
                </h3>

                <p
                  className="
                    text-[14px]
                    leading-[1.6]
                    text-navy-600
                    sm:text-[16px]
                  "
                >
                  Everything else is already built to connect, when
                  you&apos;re ready.
                </p>

              </div>

            </div>


            {/* CTA */}
            <div className="shrink-0">

              <button
                type="button"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-[#dbe5fa]
                  bg-[#f7faff]
                  px-5
                  py-3
                  text-[14px]
                  font-semibold
                  text-[#1747c7]
                  transition-all
                  duration-300
                  hover:border-[#1747c7]/30
                  hover:bg-[#eef4ff]
                  hover:shadow-[0_8px_25px_rgba(37,84,216,0.10)]
                "
              >
                <span>
                  Explore the UpWon Suite
                </span>

                <ArrowRight
                  className="
                    h-5
                    w-5
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                  strokeWidth={1.8}
                />

              </button>

            </div>

          </div>
        </motion.div>


        {/* =========================================================
            CONNECTED SUITE LABELS
        ========================================================= */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
            delay: 0.25,
          }}
          className="
            mx-auto
            mt-7
            flex
            max-w-[900px]
            flex-wrap
            items-center
            justify-center
            gap-2
            sm:gap-3
          "
        >

          <SuitePill label="ERP" />

          <SuiteConnector />

          <SuitePill label="WMS" />

          <SuiteConnector />

          <SuitePill label="SFA-DMS" />

          <SuiteConnector />

          <SuitePill label="HrEasy" />

        </motion.div>

      </Container>
    </section>
  );
}


/* ================================================================
   MOBILE SUITE CARD
================================================================ */

function SuiteCard({
  icon: Icon,
  title,
  description,
}) {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      transition={{
        duration: 0.25,
        ease: EASE,
      }}
      className="
        rounded-[20px]
        border
        border-[#dfe8f6]
        bg-white
        p-5
        shadow-[0_10px_35px_rgba(15,23,42,0.05)]
      "
    >

      <div className="flex items-center gap-3">

        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[#edf4ff]
            text-[#2454d8]
          "
        >
          <Icon
            className="h-5 w-5"
            strokeWidth={1.8}
          />
        </div>

        <h3
          className="
            h-display
            text-[18px]
            font-semibold
            text-navy-950
          "
        >
          {title}
        </h3>

      </div>

      <p
        className="
          mt-3
          text-[13px]
          leading-[1.65]
          text-navy-600
        "
      >
        {description}
      </p>

    </motion.div>
  );
}


/* ================================================================
   SUITE PILL
================================================================ */

function SuitePill({ label }) {
  return (
    <div
      className="
        rounded-full
        border
        border-[#d9e4f7]
        bg-white
        px-4
        py-2
        text-[11px]
        font-bold
        uppercase
        tracking-[0.12em]
        text-[#1747c7]
        shadow-[0_5px_20px_rgba(15,23,42,0.04)]
      "
    >
      {label}
    </div>
  );
}


/* ================================================================
   SUITE CONNECTOR
================================================================ */

function SuiteConnector() {
  return (
    <div
      className="
        hidden
        h-px
        w-5
        bg-gradient-to-r
        from-[#b8c9e8]
        to-[#d7e2f5]
        sm:block
      "
    />
  );
}