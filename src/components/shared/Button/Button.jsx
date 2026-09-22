import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function Button({
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  icon = null,
  arrow = false,
}) {
  const sizes = {
    sm: 'px-4 py-2 text-[14px]',
    md: 'px-5 py-3 text-sm',
    lg: 'px-6 py-3.5 text-[15px]',
  };

  const variants = {
    primary:
      'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-glow-orange',
    secondary:
      'border border-white/15 bg-white/[0.04] text-white hover:border-white/30 hover:bg-white/[0.08]',
    ghost: 'text-white hover:bg-white/[0.06]',
    'ghost-light': 'text-navy-700 hover:bg-navy-100/60 hover:text-navy-950',
    light:
      'border border-navy-200 bg-white text-navy-950 hover:border-navy-300 hover:shadow-enterprise',
    dark: 'bg-navy-950 text-white hover:bg-navy-900',
  };

  const cls = `inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500/40 ${
    sizes[size]
  } ${variants[variant]} ${className}`;

  const content = (
    <>
      {icon}
      {children}
      {arrow && <ArrowUpRight className="h-4 w-4" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cls}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={cls}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      {content}
    </button>
  );
}
