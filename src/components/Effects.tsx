"use client";

import { useEffect } from "react";

/**
 * Page-wide light motion, all in one place:
 *  - [data-reveal]   fades/slides in when it enters the screen (CSS does the motion)
 *  - [data-count]    counts up from 0 once visible
 *  - .spot           cards get a glow that follows the cursor
 * Only transforms/opacity and one CSS variable change, so it stays smooth.
 */
export default function Effects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const countUp = (el: HTMLElement) => {
      const to = Number(el.dataset.count || 0);
      const suffix = el.dataset.suffix || "";
      if (reduce) {
        el.textContent = to + suffix;
        return;
      }
      const t0 = performance.now();
      const dur = 1400;
      const tick = (now: number) => {
        const k = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - k, 3);
        el.textContent = Math.round(to * eased) + suffix;
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.classList.add("in");
          if (el.dataset.count) countUp(el);
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    document
      .querySelectorAll<HTMLElement>("[data-reveal], [data-count]")
      .forEach((el) => io.observe(el));

    const onMove = (ev: PointerEvent) => {
      const card = (ev.target as Element | null)?.closest?.(".spot") as HTMLElement | null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${ev.clientX - r.left}px`);
      card.style.setProperty("--my", `${ev.clientY - r.top}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // smooth scrolling for in-page links (done in JS: CSS smooth-scroll fights the pinned gallery)
    const onClick = (ev: MouseEvent) => {
      const a = (ev.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const target = document.querySelector(a.getAttribute("href") || "");
      if (!target) return;
      ev.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    };
    document.addEventListener("click", onClick);

    // pause looping animations while their section is off screen
    const runIo = new IntersectionObserver((entries) => {
      for (const e of entries) e.target.classList.toggle("run", e.isIntersecting);
    });
    document.querySelectorAll("[data-anim]").forEach((el) => runIo.observe(el));

    return () => {
      runIo.disconnect();
      document.removeEventListener("click", onClick);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return null;
}
