"use client";

import { useEffect, useRef } from "react";

/**
 * A small accent dot that follows the mouse and grows over links and buttons.
 * Only transform changes, once per frame, and only on devices with a mouse.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = dot.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    document.documentElement.classList.add("has-cursor");
    let x = -100;
    let y = -100;
    let raf = 0;
    const draw = () => {
      raf = 0;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(draw);
    };
    const onOver = (e: PointerEvent) => {
      const t = (e.target as Element | null)?.closest?.("a, button, [data-cursor]");
      el.classList.toggle("is-big", !!t);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return <div ref={dot} className="cursor-dot" aria-hidden="true" />;
}
