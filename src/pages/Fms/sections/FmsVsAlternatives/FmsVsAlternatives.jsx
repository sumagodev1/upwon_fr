import { m as motion } from 'framer-motion';
import Container from '../../../../components/shared/Container/Container.jsx';
import Eyebrow from '../../../../components/shared/Eyebrow/Eyebrow.jsx';

const EASE = [0.22, 1, 0.3, 1];

const HEADERS = [
  { key: 'criteria', label: 'Criteria' },
  { key: 'upwon', label: 'UpWon', highlight: true },
  { key: 'pos', label: 'Petpooja / POSist' },
  { key: 'whatsapp', label: 'WhatsApp + Tally' },
];

const ROWS = [
  {
    criteria: 'Hub-spoke central kitchen',
    upwon: 'Central kitchen demand consolidation built-in — production plan auto-generated',
    pos: 'Limited — kitchen module is bolt-on; consolidation manual',
    whatsapp: 'No central kitchen module — WhatsApp orders, Excel planning',
  },
  {
    criteria: 'Outlet POS + back-office',
    upwon: 'Same UI, same data — POS to royalty in one platform',
    pos: 'POS only — back-office is separate integration project',
    whatsapp: 'No POS — third-party billing software needed',
  },
  {
    criteria: 'Royalty automation',
    upwon: 'Auto-calculated from POS daily — franchisee statement on the 1st',
    pos: 'POS data must be exported and reconciled monthly',
    whatsapp: 'Manual calculation; dispute-prone',
  },
  {
    criteria: 'Aggregator integration',
    upwon: 'Swiggy, Zomato, ONDC native — orders + settlement auto-matched',
    pos: 'Aggregator orders need plug-ins per platform',
    whatsapp: 'No integration — settlement reconciled manually',
  },
  {
    criteria: 'Multi-outlet visibility',
    upwon: 'Live across 200+ outlets — sales, stock, KOT throughput',
    pos: 'Visible outlet-by-outlet; consolidation is a report job',
    whatsapp: 'No consolidation — outlets call HQ for status',
  },
  {
    criteria: 'Right fit for',
    upwon: 'Franchise chains 10–500 outlets running CK or hub-spoke',
    pos: 'Single-outlet or small chains with simple menus',
    whatsapp: 'Owner-operated single outlets with no expansion plans',
  },
];

function TableCell({ children, type }) {
  const styles = {
    criteria:
      'bg-white text-navy-700 font-semibold',
    upwon:
      'bg-[#fffaf5] text-[#986128] font-semibold',
    pos:
      'bg-[#fffdf7] text-navy-700',
    whatsapp:
      'bg-[#fff9fa] text-navy-700',
  };

  return (
    <td
      className={`border-b border-r border-[#d8dde4] px-5 py-4 text-[13px] leading-[1.55] last:border-r-0 md:px-5 md:py-[17px] ${styles[type]}`}
    >
      {children}
    </td>
  );
}

export default function FmsVsAlternatives() {
  return (
    <section className="relative overflow-hidden bg-[#faf9f7] py-16 md:py-24">
      <Container>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-4xl text-center"
        >
          <Eyebrow className="justify-center">
            UpWon vs the Alternatives
          </Eyebrow>

          <h2 className="mt-3 h-display text-[32px] leading-[1.12] tracking-tight text-navy-950 md:text-[42px]">
            A POS With a Royalty Feature Is{' '}<br/>
            <span className="gradient-text-orange">
              Not the Same as a Franchise Operating System.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-[15px] leading-relaxed text-navy-600 md:text-base">
            No star ratings. The rows below match what franchisors rank highest —
            domain expertise and native ERP / central-kitchen integration, not
            feature count or AI depth.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: EASE }}
          className="mx-auto mt-12 max-w-[1280px]"
        >
          <div className="overflow-x-auto rounded-[18px] border border-[#d8dde4] bg-white shadow-[0_10px_40px_rgba(25,35,60,0.04)]">
            <table className="w-full min-w-[1000px] border-collapse">
              {/* Header */}
              <thead>
                <tr>
                  {HEADERS.map((header) => (
                    <th
                      key={header.key}
                      className={`border-r border-white/20 px-5 py-[15px] text-left text-[10px] font-extrabold uppercase tracking-[0.16em] last:border-r-0 md:px-5 ${
                        header.highlight
                          ? 'bg-[#f4511e] text-white'
                          : 'bg-[#1c2442] text-white'
                      }`}
                    >
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {ROWS.map((row, index) => (
                  <motion.tr
                    key={row.criteria}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.05,
                      ease: EASE,
                    }}
                    className="transition-colors duration-200"
                  >
                    {/* Criteria */}
                    <TableCell type="criteria">
                      <span className="block max-w-[210px]">
                        {row.criteria}
                      </span>
                    </TableCell>

                    {/* UpWon */}
                    <TableCell type="upwon">
                      <div className="flex items-start gap-2">
                        <span className="mt-[7px] h-[4px] w-[4px] shrink-0 rounded-full bg-[#f4511e]" />
                        <span>{row.upwon}</span>
                      </div>
                    </TableCell>

                    {/* POS */}
                    <TableCell type="pos">
                      <div className="flex items-start gap-2">
                        <span className="mt-[7px] h-[4px] w-[4px] shrink-0 rounded-full bg-[#d88b43]" />
                        <span>{row.pos}</span>
                      </div>
                    </TableCell>

                    {/* WhatsApp + Tally */}
                    <TableCell type="whatsapp">
                      <div className="flex items-start gap-2">
                        <span className="mt-[7px] h-[4px] w-[4px] shrink-0 rounded-full bg-[#c84a56]" />
                        <span>{row.whatsapp}</span>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile hint */}
          <p className="mt-3 text-center text-xs text-navy-400 md:hidden">
            Swipe horizontally to compare all platforms
          </p>
        </motion.div>
      </Container>
    </section>
  );
}