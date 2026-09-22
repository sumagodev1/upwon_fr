import { useEffect, useRef } from 'react';

// A rotating wireframe sphere made of twisted meridian curves — white lines on
// a dark backdrop, depth-faded for a 3D feel. Pure canvas, cheap to run.
export default function WireframeSphere({
  size = 340,
  color = '255,255,255',
  lines = 42,
  twist = 3.1,
  speed = 0.006,
}) {
  const canvasRef = useRef(null);
  const angleRef = useRef(0);

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
    const R = size * 0.42;
    const SEG = 60;

    // Precompute each twisted meridian on the unit sphere.
    const curves = [];
    for (let i = 0; i < lines; i++) {
      const baseLon = (i / lines) * Math.PI * 2;
      const pts = [];
      for (let t = 0; t <= SEG; t++) {
        const lat = (t / SEG) * Math.PI - Math.PI / 2; // -90° → +90°
        const lon = baseLon + twist * lat; // spiral toward the poles
        pts.push({
          x: Math.cos(lat) * Math.cos(lon),
          y: Math.sin(lat),
          z: Math.cos(lat) * Math.sin(lon),
        });
      }
      curves.push(pts);
    }

    const angleX = 0.5;
    let raf = 0;

    const project = (p) => {
      const cY = Math.cos(angleRef.current);
      const sY = Math.sin(angleRef.current);
      const cX = Math.cos(angleX);
      const sX = Math.sin(angleX);
      const x = p.x * cY - p.z * sY;
      let z = p.x * sY + p.z * cY;
      const y = p.y * cX - z * sX;
      z = p.y * sX + z * cX;
      return { sx: cx + x * R, sy: cy + y * R, depth: (z + 1) / 2 };
    };

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      ctx.lineWidth = 1;
      for (const pts of curves) {
        let prev = project(pts[0]);
        for (let j = 1; j < pts.length; j++) {
          const cur = project(pts[j]);
          const depth = (prev.depth + cur.depth) / 2;
          ctx.globalAlpha = 0.12 + depth * 0.6;
          ctx.strokeStyle = `rgba(${color},1)`;
          ctx.beginPath();
          ctx.moveTo(prev.sx, prev.sy);
          ctx.lineTo(cur.sx, cur.sy);
          ctx.stroke();
          prev = cur;
        }
      }
      ctx.globalAlpha = 1;
      angleRef.current += speed;
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, [size, color, lines, twist, speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ width: size, height: size, maxWidth: '100%' }}
    />
  );
}
