/**
 * Frame data + preloading for the pre-extracted head-turn frames (ported from
 * the Vite portfolio's src/lib/frames.js into the Next.js app).
 *
 * Every frame carries a measured gaze vector (gx, gy) in the unit disk:
 *   gx = -1 fully turned to the viewer's LEFT … +1 fully to the viewer's RIGHT
 *   gy = -1 fully UP … +1 fully DOWN                          (screen y grows downward)
 * The renderer turns the cursor position into a target vector in the same space
 * and draws the frame whose measured vector is nearest.
 */
import meta from "./character.meta.json";

export type FrameEntry = {
  index: number;
  videoFrame: number;
  file: string;
  mirrored: boolean;
  gx: number;
  gy: number;
  angle: number;
  amp: number;
  isPerimeter: boolean;
};

export const FRAMES = meta.frames as FrameEntry[];
export const FRAME_COUNT = meta.frameCount as number;
export const CENTER_INDEX = meta.centerIndex as number;
export const FRAME_SIZE = { width: meta.width, height: meta.height };
export const FACE_CENTER = meta.faceCenter as { x: number; y: number };
export const BACKGROUND = meta.background as string;

// In Next.js everything in /public is served from the site root.
export const frameUrl = (entry: FrameEntry) => `/frames/${entry.file}`;

/** URL of the neutral, look-at-camera pose — handy for a static fallback. */
export const CENTER_FRAME_URL = "/frames/center.webp";

/**
 * Index of the frame whose gaze vector is nearest to (x, y).
 * `available` lets the search ignore frames that have not finished loading yet.
 * Returns -1 when nothing is available.
 */
export function nearestFrame(
  x: number,
  y: number,
  available?: boolean[]
): number {
  let best = -1;
  let bestD = Infinity;
  for (let i = 0; i < FRAMES.length; i++) {
    if (available && !available[i]) continue;
    const f = FRAMES[i];
    const dx = f.gx - x;
    const dy = f.gy - y;
    const d = dx * dx + dy * dy;
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  }
  return best;
}

/** Squared distance from a frame's gaze vector to (x, y). */
export function gazeDistance2(index: number, x: number, y: number): number {
  const f = FRAMES[index];
  const dx = f.gx - x;
  const dy = f.gy - y;
  return dx * dx + dy * dy;
}

type Drawable = ImageBitmap | HTMLImageElement;

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load ${url}`));
    img.src = url;
  });
}

/**
 * Decode an <img> into an ImageBitmap so drawImage never decodes on the render
 * thread. Falls back to the <img> where createImageBitmap is unavailable.
 */
async function toDrawable(img: HTMLImageElement): Promise<Drawable> {
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(img);
    } catch {
      /* fall through */
    }
  }
  if (img.decode) {
    try {
      await img.decode();
    } catch {
      /* ignore */
    }
  }
  return img;
}

export async function loadFrame(index: number): Promise<Drawable> {
  return toDrawable(await loadImage(frameUrl(FRAMES[index])));
}
