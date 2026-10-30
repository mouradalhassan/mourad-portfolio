"use client";

import { useEffect } from "react";

/**
 * Page-wide motion, all in one place. Everything here only moves or fades
 * elements (transform / opacity) or changes a CSS variable, and nothing runs
 * every frame unless the user is actually interacting, so it stays smooth.
 *
 *  - [data-split]    headings: words rise in one after another when seen
 *  - [data-reveal]   fades/slides in when it enters the screen (CSS does the motion)
 *  - [data-count]    counts up from 0 once visible
 *  - [data-anim]     sections whose looping animations only run while on screen
 *  - .spot           cards get a glow that follows the cursor
 *  - .tilt           screens tilt toward the cursor while hovered
 *  - .magnet         buttons lean toward the cursor while hovered
 *  - #progress       thin scroll-progress bar at the top
 */
export default function Effects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    /* ---- split headings into words (keeps nested spans such as the serif accent) ---- */
    document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
      let n = 0;
      const walk = (node: Node) => {
        [...node.childNodes].forEach((c) => {
          if (c.nodeType === 3) {
            const parts = (c.textContent || "").split(/(\s+)/);
            const frag = document.createDocumentFragment();
            parts.forEach((p) => {
              if (!p) return;
              if (/^\s+$/.test(p)) {
                frag.appendChild(document.createTextNode(p));
              } else {
                const w = document.createElement("span");
                w.className = "w";
                const inner = document.createElement("span");
                inner.style.setProperty("--i", String(n++));
                inner.textContent = p;
                w.appendChild(inner);
                frag.appendChild(w);
              }
            });
            c.parentNode?.replaceChild(frag, c);
          } else if (c.nodeType === 1 && (c as Element).tagName !== "BR") {
            walk(c);
          }
        });
      };
      walk(el);
      el.classList.add("is-split");
    });

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
      .querySelectorAll<HTMLElement>("[data-reveal], [data-count], [data-split]")
      .forEach((el) => io.observe(el));

    /* ---- scroll progress bar: one cheap transform per scroll frame ---- */
    const bar = document.getElementById("progress");
    let ticking = false;
    const onScroll = () => {
      if (ticking || !bar) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* ---- cursor spotlight on cards (only the hovered card is touched) ---- */
    const onMove = (ev: PointerEvent) => {
      const card = (ev.target as Element | null)?.closest?.(".spot") as HTMLElement | null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${ev.clientX - r.left}px`);
      card.style.setProperty("--my", `${ev.clientY - r.top}px`);
    };
    if (fine) window.addEventListener("pointermove", onMove, { passive: true });

    /* ---- hover tilt + magnetic buttons: listeners live only while hovering ---- */
    const cleanups: (() => void)[] = [];
    if (fine && !reduce) {
      document.querySelectorAll<HTMLElement>(".tilt").forEach((el) => {
        const move = (ev: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const px = (ev.clientX - r.left) / r.width - 0.5;
          const py = (ev.clientY - r.top) / r.height - 0.5;
          el.style.transform = `perspective(1100px) rotateY(${(px * 7).toFixed(2)}deg) rotateX(${(-py * 6).toFixed(2)}deg) scale(1.012)`;
          el.style.setProperty("--sx", `${(px + 0.5) * 100}%`);
        };
        const enter = () => {
          el.style.transition = "transform 0.15s ease-out";
          el.addEventListener("pointermove", move);
        };
        const leave = () => {
          el.removeEventListener("pointermove", move);
          el.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
          el.style.transform = "";
        };
        el.addEventListener("pointerenter", enter);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointerenter", enter);
          el.removeEventListener("pointerleave", leave);
          el.removeEventListener("pointermove", move);
        });
      });
      document.querySelectorAll<HTMLElement>(".magnet").forEach((el) => {
        const move = (ev: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const dx = (ev.clientX - (r.left + r.width / 2)) * 0.22;
          const dy = (ev.clientY - (r.top + r.height / 2)) * 0.3;
          el.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
        };
        const enter = () => {
          el.style.transition = "transform 0.12s ease-out";
          el.addEventListener("pointermove", move);
        };
        const leave = () => {
          el.removeEventListener("pointermove", move);
          el.style.transition = "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
          el.style.transform = "";
        };
        el.addEventListener("pointerenter", enter);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointerenter", enter);
          el.removeEventListener("pointerleave", leave);
          el.removeEventListener("pointermove", move);
        });
      });
    }

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
      cleanups.forEach((f) => f());
      runIo.disconnect();
      document.removeEventListener("click", onClick);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return null;
}
