import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

// Accessible, semantic breadcrumb trail. Pair with breadcrumbJsonLd() in <Seo>
// so the visible trail and the structured data never drift.
//
//   const trail = [
//     { name: 'Home', to: '/' },
//     { name: 'Knowledgebase', to: '/knowledgebase' },
//     { name: 'Inventory Management', to: '/knowledgebase/inventory-management' },
//     { name: 'How to track stock' },   // last item = current page (no link)
//   ];
//   <Breadcrumbs items={trail} />
//   <Seo jsonLd={breadcrumbJsonLd(trail)} ... />
//
// Renders a <nav aria-label="Breadcrumb"> with an ordered list — the markup
// Google expects, and crawlable plain links for topical/internal linking.
export default function Breadcrumbs({ items = [], className = '' }) {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-[14px] text-navy-500">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.name}-${i}`} className="flex items-center gap-1.5">
              {item.to && !isLast ? (
                <Link
                  to={item.to}
                  className="transition-colors hover:text-orange-600"
                >
                  {item.name}
                </Link>
              ) : (
                <span
                  className={isLast ? 'font-semibold text-navy-800' : undefined}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.name}
                </span>
              )}
              {!isLast && (
                <ChevronRight className="h-3.5 w-3.5 text-navy-300" aria-hidden />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
