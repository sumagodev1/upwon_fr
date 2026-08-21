// Custom platform icons per the UpWon Platform Identity Brief (v1.0).
//
// The high-fidelity brand SVGs now ship from /public/icons, so each platform
// icon renders that asset via a single <img>. Call sites are unchanged — they
// still do `<Icon className="h-6 w-6" />` exactly as with the previous inline
// SVG components; only the implementation behind each name moved to an image.
//
// Because these are full-colour brand illustrations (not line glyphs), they no
// longer inherit the parent's `color`/currentColor accent — they carry their
// own artwork. Sizing still comes from the caller's className; we add
// `object-contain` so the artwork keeps its aspect ratio inside that box.
//
// Assets live under /public/icons and are referenced by absolute URL so the
// browser downloads + caches one copy regardless of how many times an icon is
// rendered (they are not inlined into the JS bundle).

// Shared renderer — keeps every platform icon identical except for its source.
// Some call sites carried over SVG-only props (strokeWidth, stroke, fill, …)
// from when these were inline <svg> components. Those are stripped here so they
// never reach the <img> and trigger an "unknown DOM attribute" React warning.
function PlatformImg({
  src,
  alt,
  className = 'h-6 w-6',
  // swallow SVG-only props — invalid on an <img>
  strokeWidth,
  stroke,
  fill,
  strokeLinecap,
  strokeLinejoin,
  viewBox,
  ...rest
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      aria-hidden={alt === '' ? true : undefined}
      // mix-blend-multiply makes the asset's solid white background blend away
      // against the (light) chip behind it, so it reads as the mark alone — not
      // a white box. scale-110 zooms in slightly to tighten the baked-in margin.
      // Caveat: these are illustration-grade assets, so detail stays soft at
      // small sizes, and multiply only works on light backgrounds.
      className={`${className} scale-110 object-contain mix-blend-multiply`}
      {...rest}
    />
  );
}

// ERP — The Connected Brain.
export function ErpConnectedBrain(props) {
  return <PlatformImg src="/icons/ERP.svg" alt="" {...props} />;
}

// SFA-DMS — The Living Route Map.
export function SfaLivingRouteMap(props) {
  return <PlatformImg src="/icons/SFA-DMS.svg" alt="" {...props} />;
}

// FMS — The Hub & Spoke Crown.
export function FmsHubSpokeCrown(props) {
  return <PlatformImg src="/icons/FMS-OPS.svg" alt="" {...props} />;
}

// POS — The Smart Terminal.
export function PosSmartTerminal(props) {
  return <PlatformImg src="/icons/POS.svg" alt="" {...props} />;
}

// HRMS — The People Lifecycle Arc.
export function HrmsLifecycleArc(props) {
  return <PlatformImg src="/icons/HRMS.svg" alt="" {...props} />;
}

// WMS — The Precision Grid.
export function WmsPrecisionGrid(props) {
  return <PlatformImg src="/icons/WMS.svg" alt="" {...props} />;
}

// VMS / Vendor Portal — The Partnership Bridge.
export function VmsPartnershipBridge(props) {
  return <PlatformImg src="/icons/VMS.svg" alt="" {...props} />;
}
