import { m as motion, useReducedMotion } from 'framer-motion';
import {
  ShoppingCart,
  ChefHat,
  FileText,
  Factory,
  Package,
  Store,
  Users,
  User,
  BarChart3,
  ClipboardList,
} from 'lucide-react';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

// The ten moving parts a growing F&B brand has to keep in step
const PARTS = [
  { label: 'Procurement', Icon: ShoppingCart, tint: 'bg-[#fff3ec]', ink: 'text-orange-500' },
  { label: 'Central Kitchens', Icon: ChefHat, tint: 'bg-[#eef4fd]', ink: 'text-[#2f6fed]' },
  { label: 'Recipes', Icon: FileText, tint: 'bg-[#eef8f1]', ink: 'text-[#1f9d55]' },
  { label: 'Production', Icon: Factory, tint: 'bg-[#fff3ec]', ink: 'text-orange-500' },
  { label: 'Inventory', Icon: Package, tint: 'bg-[#eef0f8]', ink: 'text-navy-800' },
  { label: 'Outlets', Icon: Store, tint: 'bg-[#f4eefd]', ink: 'text-[#7c3aed]' },
  { label: 'Franchise Partners', Icon: Users, tint: 'bg-[#fff3ec]', ink: 'text-orange-500' },
  { label: 'Employees', Icon: User, tint: 'bg-[#eef8f1]', ink: 'text-[#1f9d55]' },
  { label: 'Sales', Icon: BarChart3, tint: 'bg-[#eef4fd]', ink: 'text-[#2f6fed]' },
  { label: 'Customer Orders', Icon: ClipboardList, tint: 'bg-[#fdeeee]', ink: 'text-[#dc2626]' },
];

export default function QsrChallengeSection() {
  const reduceMotion = useReducedMotion();

  const d = (value) => (reduceMotion ? 0 : value);
  const stagger = (value) => (reduceMotion ? 0 : value);

  /* ================= VARIANTS ================= */

  const group = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.1), delayChildren: 0.05 },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.55, ease: EASE } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: d(16) },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  const tilesGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.05), delayChildren: 0.12 },
    },
  };

  const tileVariants = {
    hidden: { opacity: 0, y: d(14), scale: reduceMotion ? 1 : 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45, ease: EASE },
    },
    hover: { y: d(-4), transition: { duration: 0.25, ease: EASE } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.96 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
      <Container className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10 xl:gap-14">
          {/* ================= LEFT — COPY + MOVING PARTS ================= */}
          <div className="min-w-0">
            <motion.div
              variants={group}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              <motion.div variants={fadeIn}>
                <Eyebrow>THE CHALLENGE</Eyebrow>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="mt-3 h-display text-[28px] leading-[1.12] tracking-tight text-navy-950 sm:text-[32px] lg:text-[36.8px]"
              >
                More Outlets. More Orders.{' '}
                <span className="gradient-text-orange">
                  More Complexity to Coordinate.
                </span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
              >
                QSR and franchise-led F&amp;B businesses depend on close
                coordination between procurement, central kitchens, recipes,
                production, inventory, outlets, franchise partners, employees,
                sales, and customer orders. As brands expand across locations,
                teams must maintain consistency while managing ingredient
                availability, outlet requirements, stock movement, production
                planning, food costs, workforce activity, and business
                performance.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="mt-3.5 max-w-xl text-[14.5px] leading-relaxed text-navy-600 sm:text-[15px]"
              >
                When these processes operate through spreadsheets and
                disconnected systems, head-office visibility becomes harder,
                outlet-level coordination slows down, and maintaining
                consistency across locations becomes increasingly difficult.
              </motion.p>
            </motion.div>

            <motion.div
              variants={tilesGroup}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="mt-7 grid grid-cols-3 gap-3 sm:grid-cols-5"
            >
              {PARTS.map(({ label, Icon, tint, ink }) => (
                <motion.div
                  key={label}
                  variants={tileVariants}
                  whileHover="hover"
                  className={`flex min-w-0 flex-col items-center rounded-[12px] border border-navy-950/[0.05] px-2 py-3.5 text-center transition-shadow duration-300 hover:shadow-[0_10px_24px_rgba(25,35,55,0.09)] ${tint}`}
                >
                  <Icon className={`h-6 w-6 ${ink}`} strokeWidth={1.6} />

                  <span className="mt-2 text-[10.5px] font-semibold leading-tight text-navy-900">
                    {label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ================= RIGHT — ARTWORK ================= */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="min-w-0"
          >
            <img
              src="/images/qsr_the_challenge.webp"
              alt="An operations manager surrounded by paperwork, spreadsheets and disconnected outlet, production and ingredient systems"
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
