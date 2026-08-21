export default function BrowserFrame({ url = 'upwon.in/dashboard', title, accentBorder = 'border-white/10', children }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border ${accentBorder} bg-white/[0.04] shadow-enterprise-lg backdrop-blur-md`}>
      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.04] px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28CA41]" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="flex h-6 max-w-xs flex-1 items-center rounded-md bg-white/[0.06] px-3">
            <span className="text-[14px] text-cream-100/60">{url}</span>
          </div>
        </div>
        {title && (
          <span className="hidden text-[14px] font-medium text-cream-100/50 md:inline-block">
            {title}
          </span>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}
