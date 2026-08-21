import { useCallback, useRef, useState } from 'react';

// Pointer-driven comparison slider. Unified mouse + touch via Pointer Events,
// pointer-capture so the drag keeps tracking outside the element, and clamped
// 0–100 output. GPU-friendly: consumers translate/clip with the returned %.
export default function useDragSlider(initial = 50) {
  const containerRef = useRef(null);
  const [pos, setPos] = useState(initial);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  const onPointerDown = useCallback(
    (e) => {
      setDragging(true);
      e.currentTarget.setPointerCapture?.(e.pointerId);
      updateFromClientX(e.clientX);
    },
    [updateFromClientX],
  );

  const onPointerMove = useCallback(
    (e) => {
      if (!dragging) return;
      updateFromClientX(e.clientX);
    },
    [dragging, updateFromClientX],
  );

  const stop = useCallback((e) => {
    setDragging(false);
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  }, []);

  // Keyboard support — arrow keys nudge the handle for accessibility.
  const onKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 4));
    if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 4));
  }, []);

  return {
    containerRef,
    pos,
    setPos,
    dragging,
    handlers: { onPointerDown, onPointerMove, onPointerUp: stop, onPointerCancel: stop, onKeyDown },
  };
}
