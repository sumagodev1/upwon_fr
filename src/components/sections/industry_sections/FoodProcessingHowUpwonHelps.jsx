import { m as motion, useReducedMotion } from 'framer-motion';
import Container from '../../ui/Container.jsx';
import Eyebrow from '../../ui/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const VIEWPORT = { once: true, amount: 0.1 };

/*
  Each artwork is a complete card — numbered tab, bordered frame and icon
  already drawn — so only the label is overlaid, in the blank area beneath the
  icon. The numbers are baked into the images, so this order is fixed.

  They share a 196x~336 frame, so the label is positioned with percentages and
  sized in cqw, keeping it identical on every card at any width.
*/
const WORKFLOWS = [
  { label: 'Procurement & Purchasing', lines: ['Procurement &', 'Purchasing'], art: '/images/food_procurement.webp' },
  { label: 'Raw Material & Ingredient Management', lines: ['Raw Material & Ingredient', 'Management'], art: '/images/food_raw_material.webp' },
  { label: 'Recipe & Bill of Materials Management', lines: ['Recipe & Bill of Materials', 'Management'], art: '/images/food_recipe_bill.webp' },
  { label: 'Production Management', lines: ['Production', 'Management'], art: '/images/food_production_management.webp' },
  { label: 'Quality Inspection', lines: ['Quality', 'Inspection'], art: '/images/food_quality_inspection.webp' },
  { label: 'Shelf-Life & Batch Visibility', lines: ['Shelf-Life &', 'Batch Visibility'], art: '/images/food_shelf_life.webp' },
  { label: 'Packaging Management', lines: ['Packaging', 'Management'], art: '/images/food_packaging_management.webp' },
  { label: 'Inventory Management', lines: ['Inventory', 'Management'], art: '/images/food_inventory_management.webp' },
  { label: 'Warehouse Operations', lines: ['Warehouse', 'Operations'], art: '/images/food_warehouse_management.webp' },
  { label: 'Sales & Order Management', lines: ['Sales & Order', 'Management'], art: '/images/food_sales_order_management.webp' },
  { label: 'Distribution & Dispatch', lines: ['Distribution &', 'Dispatch'], art: '/images/food_distribution.webp' },
  { label: 'Multi-Location Operations', lines: ['Multi-Location', 'Operations'], art: '/images/food_multi_location.webp' },
  { label: 'Finance & Reporting', lines: ['Finance &', 'Reporting'], art: '/images/food_finance_reporting.webp' },
];

export default function FoodProcessingHowUpwonHelps() {
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

  const cardsGroup = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger(0.05), delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: d(20), scale: reduceMotion ? 1 : 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: EASE },
    },
    hover: { y: d(-6), transition: { duration: 0.28, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
      <Container className="relative z-10">
        {/* ================= HEADING ================= */}
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeIn}>
            <Eyebrow className="justify-center">HOW UPWON HELPS</Eyebrow>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-3 h-display text-[30px] leading-[1.1] tracking-tight text-navy-950 sm:text-[34px] lg:text-[36.8px]"
          >
            One <span className="gradient-text-orange">Connected Platform</span>{' '}
            for Your Food Processing Operations
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-3xl text-[15px] leading-relaxed text-navy-600 sm:text-base"
          >
            UpWon connects the key workflows behind food processing—helping teams
            manage the movement of materials, batches, products, information, and
            operations through one unified platform.
          </motion.p>
        </motion.div>
      </Container>

      {/* ================= WORKFLOW CARDS ================= */}
      {/* Wider than the shared Container so seven cards fit a row at xl */}
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={cardsGroup}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-9 flex flex-wrap justify-center gap-3 sm:mt-11"
        >
          {WORKFLOWS.map(({ label, lines, art }) => (
            <motion.article
              key={label}
              variants={cardVariants}
              whileHover="hover"
              className="group relative aspect-[196/336] w-[calc(50%-0.375rem)] [container-type:inline-size] sm:w-[calc(33.333%-0.5rem)] md:w-[calc(25%-0.5625rem)] lg:w-[calc(20%-0.6rem)] xl:w-[calc(14.2857%-0.643rem)]"
            >
              <img
                src={art}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-fill"
              />

              {/* Label sits in the blank area under the baked-in icon */}
              <div className="absolute inset-x-0 bottom-[7%] px-[9%]">
                <h3 className="h-display text-center font-semibold leading-snug text-navy-950 [font-size:clamp(9px,5.8cqw,11.5px)]">
                  {lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h3>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
