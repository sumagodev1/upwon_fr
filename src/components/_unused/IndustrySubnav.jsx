import { NavLink } from 'react-router-dom';
import { INDUSTRIES } from '../../data/industries.js';

export default function IndustrySubnav() {
  return (
    <div className="relative border-b border-white/[0.06] bg-navy-950">
      <div className="container-max container-px">
        <div className="flex gap-0 overflow-x-auto mask-fade-lr">
          {INDUSTRIES.map((ind) => (
            <NavLink
              key={ind.slug}
              to={`/industries/${ind.slug}`}
              className={({ isActive }) =>
                `relative inline-flex shrink-0 items-center gap-2 whitespace-nowrap px-4 py-3.5 text-[14px] font-medium font-display transition-colors ${
                  isActive ? 'text-white' : 'text-cream-100/60 hover:text-cream-100'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <ind.icon className="h-3.5 w-3.5 opacity-80" />
                  {ind.name}
                  {isActive && (
                    <span className="absolute inset-x-3 -bottom-px h-0.5 bg-orange-500" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
