"use client";

import { useEffect, useState } from "react";

/**
 * A short opening curtain with the name, shown once per visit (sessionStorage).
 * It is a brief overlay that slides up and is then removed, so it doesn't
 * affect scrolling or the cursor tracking afterwards.
 */
export default function Intro() {
  const [phase, setPhase] = useState<"show" | "out" | "gone">("gone");

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("intro-seen") === "1";
    } catch {
      /* private mode: just show it */
    }
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      sessionStorage.setItem("intro-seen", "1");
    } catch {
      /* ignore */
    }
    setPhase("show");
    const t1 = setTimeout(() => setPhase("out"), 1250);
    const t2 = setTimeout(() => setPhase("gone"), 2050);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "gone") return null;
  return (
    <div className={`intro ${phase === "out" ? "is-out" : ""}`} aria-hidden="true">
      <p className="intro__name">
        <span className="intro__first">Mourad</span>
        <span className="intro__last serif-i">Al Hassan</span>
      </p>
      <span className="intro__bar" />
    </div>
  );
}
