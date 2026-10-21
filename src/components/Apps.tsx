import { APPS, type App } from "@/lib/data";

function Phone({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    <div
      className={`phone absolute w-[42%] overflow-hidden rounded-[1.9rem] border-[5px] border-[#16181d] bg-[#16181d] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" decoding="async" className="block w-full rounded-[1.5rem]" />
    </div>
  );
}

function AppRow({ a, i }: { a: App; i: number }) {
  const flip = i % 2 === 1;
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <div className={flip ? "lg:order-2" : ""} data-reveal>
        <p className="eyebrow">{a.category}</p>
        <h3 className="mt-4 text-5xl leading-[0.95] font-extrabold tracking-tight sm:text-6xl">
          {a.title}
        </h3>
        <p className="mt-5 max-w-md text-lg leading-snug text-mist">{a.blurb}</p>
        <ul className="mt-6 space-y-2.5 text-sm text-snow/90">
          {a.facts.map((f) => (
            <li key={f} className="flex items-center gap-3">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: a.accent, boxShadow: `0 0 12px ${a.accent}` }}
              />
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          {a.tags.map((t) => (
            <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-mist">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* three phones fanned out; hover spreads them apart */}
      <div
        className={`phones group relative mx-auto aspect-square w-full max-w-xl ${flip ? "lg:order-1" : ""}`}
        data-reveal
        style={{ ["--d" as string]: 120 }}
      >
        <div
          className="pointer-events-none absolute inset-[12%] rounded-full opacity-60"
          style={{ background: `radial-gradient(closest-side, ${a.accent}40, transparent)` }}
          aria-hidden="true"
        />
        <Phone src={a.shots[0]} alt="" className="phone-l top-[8%] left-[4%]" />
        <Phone src={a.shots[2]} alt="" className="phone-r top-[8%] right-[4%]" />
        <Phone src={a.shots[1]} alt={`${a.title} app screen`} className="phone-c top-0 left-1/2 z-10" />
      </div>
    </div>
  );
}

export default function Apps() {
  return (
    <section id="apps" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <div data-reveal>
          <p className="eyebrow">Mobile apps</p>
          <h2 className="mt-5 text-4xl leading-[1] font-extrabold tracking-tight sm:text-6xl">
            And on your <span className="serif-i text-accent">phone.</span>
          </h2>
        </div>
        <div className="mt-16 space-y-28">
          {APPS.map((a, i) => (
            <AppRow key={a.title} a={a} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
