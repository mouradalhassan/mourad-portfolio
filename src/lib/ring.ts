import { FRAMES, frameUrl } from "./heroFrames";

/** The 36 real head-turn poses around the full circle (about 10° apart),
    sorted by the direction he is looking. Shared by the portrait and the
    <head> preload so both use the same URLs. */
export const RING = FRAMES.filter((f) => f.isPerimeter)
  .map((f) => ({
    src: frameUrl(f),
    angle: ((Math.atan2(f.gy, f.gx) * 180) / Math.PI + 360) % 360,
  }))
  .sort((a, b) => a.angle - b.angle);
