export default function Eyebrow({ children, variant = 'light', className = '' }) {
  // Default is light theme (orange-600 text). For dark sections, pass variant="dark".
  const base = variant === 'dark' ? 'text-orange-400' : 'text-orange-600';
  return (
    <p
      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] ${base} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse-slow" />
      {children}
    </p>
  );
}
