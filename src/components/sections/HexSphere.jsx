import { useEffect, useRef } from 'react';

// Rotating geodesic "hexagon" sphere: nodes spread over a sphere (Fibonacci
// distribution) are linked to their nearest neighbours to form an organic net,
// with a glowing logo core and brand logos pinned to nodes.
export default function HexSphere({
  size = 420,
  nodeCount = 140,
  neighbours = 5,
  color = '#7ea6d4',
  logoSrc = '/upwon-logo.png',
  logos = [],
}) {
  const canvasRef = useRef(null);
  const logoRefs = useRef([]);
  // Rotation state kept in refs so drag can steer it without re-running effects.
  const angleYRef = useRef(0);
  const draggingRef = useRef(false);
  const dragRef = useRef({ x: 0, a: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const radius = size * 0.42;

    // --- Distribute nodes evenly over a sphere (Fibonacci sphere) ---
    const points = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2; // 1 -> -1
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      points.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
    }

    // --- Link each node to its nearest neighbours (build edge list once) ---
    const edgeSet = new Set();
    const edges = [];
    for (let i = 0; i < points.length; i++) {
      const dists = points
        .map((p, j) => ({
          j,
          d:
            (p.x - points[i].x) ** 2 +
            (p.y - points[i].y) ** 2 +
            (p.z - points[i].z) ** 2,
        }))
        .filter((o) => o.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, neighbours);
      for (const { j } of dists) {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!edgeSet.has(key)) {
          edgeSet.add(key);
          edges.push([i, j]);
        }
      }
    }

    // Distribute logos evenly over the sphere with farthest-point sampling —
    // each on the node maximally distant from those already chosen. Keeps the
    // spread balanced from every angle (no clustering as the globe rotates).
    const d2 = (a, b) => (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2;
    const logoNodes = [0];
    while (logoNodes.length < logos.length && logoNodes.length < points.length) {
      let best = -1;
      let bestD = -1;
      for (let i = 0; i < points.length; i++) {
        if (logoNodes.includes(i)) continue;
        let md = Infinity;
        for (const j of logoNodes) md = Math.min(md, d2(points[i], points[j]));
        if (md > bestD) {
          bestD = md;
          best = i;
        }
      }
      logoNodes.push(best);
    }

    const angleX = 0.35;
    let raf = 0;

    const project = (p) => {
      const cosY = Math.cos(angleYRef.current);
      const sinY = Math.sin(angleYRef.current);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const x = p.x * cosY - p.z * sinY;
      let z = p.x * sinY + p.z * cosY;
      const y = p.y * cosX - z * sinX;
      z = p.y * sinX + z * cosX;
      return { sx: cx + x * radius, sy: cy + y * radius, depth: (z + 1) / 2 };
    };

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      const proj = points.map(project);

      // Edges — fade & thin with depth for a 3D feel.
      for (const [a, b] of edges) {
        const pa = proj[a];
        const pb = proj[b];
        const depth = (pa.depth + pb.depth) / 2;
        ctx.globalAlpha = 0.16 + depth * 0.44;
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.6 + depth * 0.9;
        ctx.beginPath();
        ctx.moveTo(pa.sx, pa.sy);
        ctx.lineTo(pb.sx, pb.sy);
        ctx.stroke();
      }

      // Nodes — drawn as small flat-top hexagons (bigger/brighter up front).
      for (const p of proj) {
        ctx.globalAlpha = 0.3 + p.depth * 0.4;
        ctx.fillStyle = color;
        const r = 1.4 + p.depth * 2.4;
        ctx.beginPath();
        for (let k = 0; k < 6; k++) {
          const ang = (Math.PI / 3) * k; // flat-top hexagon
          const hx = p.sx + r * Math.cos(ang);
          const hy = p.sy + r * Math.sin(ang);
          if (k === 0) ctx.moveTo(hx, hy);
          else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      // Logo badges pinned to their nodes — move / scale / fade with rotation.
      // Pulled toward the centre (INSET) so a rim badge stays inside the
      // silhouette. Badges may pass over the centre, but the core sits above
      // them (z-index) so they slide BEHIND the UPWON logo.
      const INSET = 0.82;
      for (let li = 0; li < logoNodes.length; li++) {
        const el = logoRefs.current[li];
        if (!el) continue;
        const pr = proj[logoNodes[li]];
        const lx = cx + (pr.sx - cx) * INSET;
        const ly = cy + (pr.sy - cy) * INSET;
        const scale = 0.72 + pr.depth * 0.42;
        const opacity = Math.max(0, Math.min(1, (pr.depth - 0.34) / 0.16));
        el.style.transform = `translate(${lx}px, ${ly}px) translate(-50%, -50%) scale(${scale})`;
        el.style.opacity = String(opacity);
        el.style.zIndex = String(100 + Math.round(pr.depth * 100));
      }

      // Auto-spin, but hold still while the user is dragging.
      if (!draggingRef.current) angleYRef.current += 0.0035;
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, [size, nodeCount, neighbours, color, logos]);

  // Badge sizes scale with the sphere so they stay proportional on any screen.
  const logoW = Math.round(size * 0.148);
  const logoH = Math.round(size * 0.1);

  // Drag to spin the globe horizontally; it resumes auto-rotating on release.
  const onPointerDown = (e) => {
    draggingRef.current = true;
    dragRef.current = { x: e.clientX, a: angleYRef.current };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!draggingRef.current) return;
    angleYRef.current = dragRef.current.a + (e.clientX - dragRef.current.x) * 0.008;
  };
  const endDrag = () => {
    draggingRef.current = false;
  };

  return (
    <div
      className="relative mx-auto cursor-grab touch-none select-none active:cursor-grabbing"
      style={{ width: size, height: size, maxWidth: '100%' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onPointerCancel={endDrag}
    >
      <canvas ref={canvasRef} style={{ width: size, height: size, maxWidth: '100%' }} />

      {/* Glowing white core with the UPWON logo. */}
      <div
        className="absolute left-1/2 top-1/2 z-[300] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
        style={{
          width: size * 0.28,
          height: size * 0.28,
          background:
            'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.75) 45%, rgba(158,203,255,0.15) 75%, rgba(158,203,255,0) 100%)',
          boxShadow: '0 0 60px 20px rgba(158,203,255,0.35)',
        }}
      >
        <img src={logoSrc} alt="UPWON" className="w-[80%] object-contain" />
      </div>

      {/* Brand logos pinned to sphere nodes (positioned imperatively). */}
      {logos.map((logo, li) => (
        <div
          key={logo.alt}
          ref={(el) => {
            logoRefs.current[li] = el;
          }}
          className="pointer-events-none absolute left-0 top-0 flex items-center justify-center will-change-transform"
          style={{ width: logoW, height: logoH }}
        >
          <img
            src={logo.src}
            alt={logo.alt}
            loading="lazy"
            decoding="async"
            className="max-h-full w-auto max-w-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}
