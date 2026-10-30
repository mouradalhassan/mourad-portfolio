"use client";

import { useEffect, useRef } from "react";
import {
  BACKGROUND,
  CENTER_FRAME_URL,
  FACE_CENTER,
  FRAME_SIZE,
} from "@/lib/heroFrames";
import { RING } from "@/lib/ring";

type Drawable = ImageBitmap | HTMLImageElement;

const ANGLE_EASE = 0.35; // how fast the head turns toward the cursor
const HOLD_R = 0.1; // × card width: right on his face the direction is undefined, so he keeps his last look
const HYST = 2.5; // degrees: stay on the current pose until another is clearly closer

/** Shortest signed angle from a to b, in degrees. */
const delta = (a: number, b: number) => ((b - a + 540) % 360) - 180;

/**
 * Cursor-following portrait made of 36 real head-turn poses (no video, no
 * blending). Exactly one real pose is drawn at any moment, so there is never a
 * double image. The frames are preloaded from <head> (see layout.tsx) on
 * mouse devices, and tracking starts with whatever poses are ready, using the
 * nearest loaded one. A plain <img> of the neutral pose is the first paint.
 */
export default function Portrait({ fill = false }: { fill?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const box = wrap.current;
    const move = inner.current;
    if (!canvas || !box || !move) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ring: (Drawable | null)[] = new Array(RING.length).fill(null);
    let neutral: Drawable | null = null;
    let alive = true;
    let running = false;
    let raf = 0;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let engaged = false;
    let tgtAngle = 0;
    let curAngle = 0;
    let shownIdx = -2; // -1 = neutral
    let px = 0;
    let py = 0;
    let tpx = 0;
    let tpy = 0;

    const blit = (img: Drawable) => {
      const s = Math.max(w / FRAME_SIZE.width, h / FRAME_SIZE.height);
      const dw = FRAME_SIZE.width * s;
      const dh = FRAME_SIZE.height * s;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = BACKGROUND;
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    };

    /** Nearest loaded pose to an angle, sticking to the current one when close. */
    const pick = (a: number) => {
      let best = -1;
      let bestD = Infinity;
      for (let i = 0; i < RING.length; i++) {
        if (!ring[i]) continue;
        const d = Math.abs(delta(a, RING[i].angle));
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      }
      if (shownIdx >= 0 && ring[shownIdx] && best !== shownIdx) {
        const dCur = Math.abs(delta(a, RING[shownIdx].angle));
        if (dCur - bestD < HYST) return shownIdx;
      }
      return best;
    };

    const draw = () => {
      const idx = engaged ? pick(((curAngle % 360) + 360) % 360) : -1;
      if (idx === shownIdx) return;
      const img = idx >= 0 ? ring[idx] : neutral;
      if (!img) return;
      blit(img);
      shownIdx = idx;
    };

    const step = () => {
      const d = delta(curAngle, tgtAngle);
      curAngle += d * ANGLE_EASE;
      px += (tpx - px) * 0.12;
      py += (tpy - py) * 0.12;
      move.style.transform = `translate3d(${(px * 9).toFixed(2)}px, ${(py * 7).toFixed(2)}px, 0) scale(1.05)`;
      draw();
      const settled =
        Math.abs(d) < 0.05 &&
        Math.abs(tpx - px) < 0.002 &&
        Math.abs(tpy - py) < 0.002;
      if (settled) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(step);
    };
    const kick = () => {
      if (running || !alive) return;
      running = true;
      raf = requestAnimationFrame(step);
    };

    const layout = () => {
      const r = box.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      shownIdx = -2;
      draw();
    };

    const onMove = (ev: PointerEvent) => {
      const r = box.getBoundingClientRect();
      const fx = r.left + r.width * 0.5;
      const fy = r.top + r.height * FACE_CENTER.y;
      const vx = ev.clientX - fx;
      const vy = ev.clientY - fy;
      if (Math.hypot(vx, vy) > HOLD_R * r.width) {
        const a = (Math.atan2(vy, vx) * 180) / Math.PI;
        if (!engaged) curAngle = a; // first look: turn straight to the cursor
        tgtAngle = a;
        engaged = true;
      }
      tpx = Math.max(-1, Math.min(1, vx / (window.innerWidth * 0.5)));
      tpy = Math.max(-1, Math.min(1, vy / (window.innerHeight * 0.5)));
      kick();
    };
    const onLeave = () => {
      engaged = false;
      tpx = 0;
      tpy = 0;
      kick();
    };

    window.addEventListener("resize", layout);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    const load = (src: string) =>
      new Promise<Drawable>((resolve, reject) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = async () => {
          try {
            resolve(await createImageBitmap(img));
          } catch {
            resolve(img);
          }
        };
        img.onerror = reject;
        img.src = src; // already in the HTTP cache thanks to the <head> preload
      });

    load(CENTER_FRAME_URL)
      .then((img) => {
        neutral = img;
        layout();
      })
      .catch(() => {});
    // every pose becomes usable the moment it arrives; no waiting for all of them
    RING.forEach((r, i) => {
      load(r.src)
        .then((img) => {
          if (!alive) return;
          ring[i] = img;
          shownIdx = -2; // a closer pose may be available now
          if (engaged) kick();
        })
        .catch(() => {});
    });

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", layout);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrap}
      className={
        fill
          ? "relative h-full w-full overflow-hidden"
          : "relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-line"
      }
      style={{ background: BACKGROUND }}
    >
      <div ref={inner} className="absolute inset-0 will-change-transform">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CENTER_FRAME_URL}
          alt="Portrait of Mourad Al Hassan"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
