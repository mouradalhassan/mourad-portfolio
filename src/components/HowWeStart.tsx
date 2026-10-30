"use client";

import { useState } from "react";
import { STEPS } from "@/lib/data";

/**
 * "How we start": five steps on a progress rail. Hovering a step (or focusing
 * or tapping it) opens it, so the details show without having to click, and
 * the rail fills up to that step.
 */
export default function HowWeStart() {
  const [active, setActive] = useState(0);
  const last = STEPS.length - 1;

  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <div data-reveal>
          <p className="eyebrow">05 — Process</p>
          <h2 data-split className="mt-5 text-4xl leading-[1] font-extrabold tracking-tight sm:text-6xl">
            How we <span className="serif-i text-accent">start.</span>
          </h2>
        </div>

        <div className="mt-14" data-reveal style={{ ["--d" as string]: 120 }}>
          {/* rail (desktop) */}
          <div className="relative mb-8 hidden h-3 lg:block" aria-hidden="true">
            <span className="absolute top-1/2 right-0 left-[1.4rem] h-px -translate-y-1/2 bg-white/10" />
            <span
              className="absolute top-1/2 left-[1.4rem] h-px origin-left -translate-y-1/2 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
              style={{
                // dot 0 → last dot: (column + gap) × (steps − 1)
                width: `calc((100% + 1rem) / ${STEPS.length} * ${last})`,
                transform: `scaleX(${active / last})`,
              }}
            />
            <div className="absolute inset-0 grid grid-cols-5 gap-4">
              {STEPS.map((s, i) => (
                <span key={s.n} className="relative">
                  <span
                    className={`absolute top-1/2 left-[1.4rem] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ${
                      i <= active
                        ? "scale-110 bg-accent shadow-[0_0_14px_rgba(255,77,61,0.8)]"
                        : "bg-white/25"
                    }`}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* cards */}
          <ol className="grid items-start gap-4 lg:grid-cols-5">
            {STEPS.map((s, i) => {
              const open = i === active;
              return (
                <li key={s.n}>
                  <button
                    type="button"
                    aria-expanded={open}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className={`group w-full rounded-2xl border p-6 text-left transition-[border-color,background-color,box-shadow,transform] duration-500 ${
                      open
                        ? "border-accent/60 bg-accent/[0.07] shadow-[0_20px_60px_-30px_rgba(255,77,61,0.6)]"
                        : "border-line bg-white/[0.02] hover:-translate-y-0.5"
                    }`}
                  >
                    <span
                      className={`block font-mono text-2xl font-bold transition-colors duration-500 ${
                        open ? "text-accent" : "text-snow/80"
                      }`}
                    >
                      {s.n}
                    </span>
                    <span className="mt-5 block text-xl leading-tight font-bold">
                      {s.t}
                    </span>
                    {/* opens smoothly: 0fr → 1fr */}
                    <span
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <span className="overflow-hidden">
                        <span className="block pt-4 text-sm leading-relaxed text-mist">
                          {s.d}
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
