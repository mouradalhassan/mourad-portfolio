import { MORE_KINDS } from "@/lib/data";

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  // the list is doubled so the loop is seamless
  const loop = [...items, ...items];
  return (
    <div className="marquee">
      <ul className={`marquee-track ${reverse ? "is-reverse" : ""}`}>
        {loop.map((n, i) => (
          <li
            key={i}
            className="flex shrink-0 items-center gap-8 pr-8 text-3xl font-bold whitespace-nowrap text-snow/85 sm:text-5xl"
            aria-hidden={i >= items.length}
          >
            {n}
            <span className="text-accent text-2xl sm:text-3xl" aria-hidden="true">
              ✦
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The kinds of businesses behind the other websites, as moving text (no names). */
export default function More() {
  const half = Math.ceil(MORE_KINDS.length / 2);
  return (
    <section className="relative overflow-hidden py-24 sm:py-32" data-anim>
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:flex-row sm:items-end sm:justify-between">
        <div data-reveal>
          <p className="eyebrow">And there&rsquo;s more</p>
          <p className="mt-4 max-w-md text-xl leading-snug text-mist sm:text-2xl">
            Those were five.{" "}
            <span className="text-snow">The others were built for:</span>
          </p>
        </div>
        <div className="text-right" data-reveal style={{ ["--d" as string]: 120 }}>
          <span
            className="count-num block text-[clamp(5rem,14vw,11rem)] leading-[0.85] font-extrabold tracking-tight"
            data-count="20"
            data-suffix="+"
          >
            20+
          </span>
          <span className="font-mono text-xs tracking-[0.2em] text-fog uppercase">
            websites built
          </span>
        </div>
      </div>

      <div className="mt-14 space-y-5" data-reveal>
        <Row items={MORE_KINDS.slice(0, half)} />
        <Row items={MORE_KINDS.slice(half)} reverse />
      </div>
    </section>
  );
}
