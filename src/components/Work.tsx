"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS, type Project } from "@/lib/data";

const host = (p: Project) => (p.href ? new URL(p.href).host : "online store");
const pad = (n: number) => String(n).padStart(2, "0");

function Panel({ p, i }: { p: Project; i: number }) {
  return (
    <article className="pn relative flex flex-col-reverse gap-8 px-5 py-14 lg:h-screen lg:w-screen lg:shrink-0 lg:flex-row lg:items-center lg:gap-[4vw] lg:py-0 lg:pr-[5vw] lg:pl-[6vw]">
      {/* soft accent glow behind the screen (desktop) */}
      <div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          background: `radial-gradient(42vw 44vh at 68% 52%, ${p.accent}24, transparent)`,
        }}
        aria-hidden="true"
      />

      {/* text column: never overlaps a screenshot */}
      <div className="pn-text relative z-10 lg:w-[30vw] lg:shrink-0">
        <p className="eyebrow">
          {pad(i + 1)} · {p.category}
        </p>
        <h3 className="mt-4 text-5xl leading-[0.95] font-extrabold tracking-tight sm:text-6xl lg:text-[clamp(2.8rem,4.6vw,5.5rem)]">
          {p.title}
        </h3>
        <p className="mt-5 max-w-sm text-lg leading-snug text-mist">{p.blurb}</p>
        <ul className="mt-6 space-y-2.5 text-sm text-snow/90">
          {p.facts.map((f) => (
            <li key={f} className="flex items-center gap-3">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: p.accent, boxShadow: `0 0 12px ${p.accent}` }}
              />
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-line px-3 py-1 text-xs text-mist"
            >
              {t}
            </span>
          ))}
        </div>
        {p.href && (
          <a
            href={p.href}
            target="_blank"
            rel="noopener"
            className="btn btn-solid mt-7"
          >
            Visit live site <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>

      {/* the screen: both screenshots full size, cross-fading on scroll */}
      <div className="pn-media relative will-change-transform lg:flex-1">
        {p.href && (
          <span className="absolute -top-3 right-5 z-20 inline-flex items-center gap-2 rounded-full border border-line bg-ink-2 px-3 py-1 text-[0.7rem] font-semibold text-snow">
            <span className="live-dot" /> Live
          </span>
        )}
        <div className="tilt relative overflow-hidden rounded-xl border border-white/10 bg-ink-2 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)]">
          <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
            <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
            <i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
            <i className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
            <span className="ml-3 truncate rounded-md bg-white/5 px-3 py-0.5 font-mono text-[0.65rem] text-fog">
              {host(p)}
            </span>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.images[0]}
              alt={`${p.title} website`}
              decoding="async"
              className="pn-img absolute inset-0 h-full w-full object-cover object-top"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.images[1]}
              alt=""
              decoding="async"
              className="pn-img2 absolute inset-0 h-full w-full object-cover object-top will-change-[opacity]"
            />
          </div>
        </div>
        {/* which screen is showing */}
        <div className="mt-4 hidden h-[2px] overflow-hidden rounded-full bg-white/10 lg:block">
          <div
            className="pn-prog h-full origin-left"
            style={{ background: p.accent, transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const trackEl = track.current;
        const sec = section.current;
        if (!trackEl || !sec) return;

        const dist = () => trackEl.scrollWidth - window.innerWidth;
        const total = PROJECTS.length;
        const setCount = (i: number) => {
          if (count.current)
            count.current.textContent = `${pad(i)} / ${pad(total)}`;
        };

        const tween = gsap.to(trackEl, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: sec,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            fastScrollEnd: true,
            start: "top top",
            end: () => "+=" + dist(),
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (bar.current)
                bar.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });

        gsap.utils.toArray<HTMLElement>(".pn", trackEl).forEach((p, i) => {
          const q = gsap.utils.selector(p);
          const when = (start: string, toggleActions: string) => ({
            trigger: p,
            containerAnimation: tween,
            start,
            toggleActions,
          });
          // One-time, time-based entrances: nothing else is recalculated on
          // every scroll frame, which keeps the sideways scroll smooth.
          gsap.from(q(".pn-text > *"), {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.07,
            ease: "power3.out",
            scrollTrigger: when("left 75%", "play none none none"),
          });
          gsap.from(q(".pn-media"), {
            x: 120,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: when("left 85%", "play none none none"),
          });
          // screenshot 1 → screenshot 2 once the panel has been seen; back again when scrolling back
          gsap.to(q(".pn-img2"), {
            opacity: 1,
            duration: 0.7,
            ease: "power2.inOut",
            scrollTrigger: when("left -8%", "play none none reverse"),
          });
          gsap.to(q(".pn-prog"), {
            scaleX: 1,
            duration: 0.7,
            ease: "power2.inOut",
            scrollTrigger: when("left -8%", "play none none reverse"),
          });
          ScrollTrigger.create({
            trigger: p,
            containerAnimation: tween,
            start: "left 60%",
            end: "right 60%",
            onToggle: (self) => {
              if (self.isActive) setCount(i + 1);
            },
          });
        });
        setCount(0);

        const refresh = () => ScrollTrigger.refresh();
        if (document.readyState !== "complete")
          window.addEventListener("load", refresh, { once: true });
        return () => window.removeEventListener("load", refresh);
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={section} id="work" className="relative overflow-hidden">
      <div ref={track} className="will-change-transform lg:flex lg:h-screen lg:w-max">
        {/* intro panel */}
        <div className="px-5 pt-24 pb-6 lg:flex lg:h-screen lg:w-[70vw] lg:shrink-0 lg:flex-col lg:justify-center lg:p-0 lg:pl-[6vw]">
          <p className="eyebrow">01 — Selected work</p>
          <h2 data-split className="mt-5 text-5xl leading-[0.95] font-extrabold tracking-tight sm:text-6xl lg:text-[7vw]">
            Real sites.
            <br />
            <span className="serif-i text-accent">Real businesses.</span>
          </h2>
          <p className="mt-10 hidden items-center gap-3 font-mono text-xs tracking-[0.2em] text-fog uppercase lg:flex">
            Scroll <span className="nudge" aria-hidden="true">→</span>
          </p>
        </div>

        {PROJECTS.map((p, i) => (
          <Panel key={p.slug} p={p} i={i} />
        ))}
      </div>

      {/* progress (desktop) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-5 z-40 hidden items-center gap-4 px-[6vw] lg:flex">
        <span ref={count} className="font-mono text-xs text-mist">
          00 / {pad(PROJECTS.length)}
        </span>
        <div className="h-px flex-1 bg-line">
          <div
            ref={bar}
            className="h-full origin-left bg-accent"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
}
