import { SERVICES } from "@/lib/data";

/* Simple line icons; the strokes "draw" themselves when the card appears. */
const ICONS: Record<string, React.ReactNode> = {
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2.5l2.2 11h10.6L21 7H6.4" />
      <circle cx="9.5" cy="19" r="1.4" />
      <circle cx="17" cy="19" r="1.4" />
    </>
  ),
  panel: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M9 9v11M12.5 13h5M12.5 16.5h3" />
    </>
  ),
  bell: (
    <>
      <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15z" />
      <path d="M10 20.5a2 2 0 0 0 4 0" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 3c3.5 2 5.5 6 5 11l-2.5 2.5h-5L7 14c-.5-5 1.5-9 5-11z" />
      <circle cx="12" cy="10" r="1.8" />
      <path d="M9.5 16.5 8 21l4-2 4 2-1.5-4.5" />
    </>
  ),
  lang: (
    <>
      <path d="M4 5h9M8.5 3v2M6 5c.5 3 2.5 5.5 6 7M11 5c-.5 3-3 6-7 8" />
      <path d="M13 21l4-10 4 10M14.5 17.5h5" />
    </>
  ),
};

export default function Services() {
  return (
    <section id="services" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5">
        <div data-reveal>
          <p className="eyebrow">03 — What I can do</p>
          <h2 data-split className="mt-5 max-w-3xl text-4xl leading-[1] font-extrabold tracking-tight sm:text-6xl">
            From the first call
            <br />
            <span className="serif-i text-accent">to a live website.</span>
          </h2>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <li
              key={s.title}
              data-reveal
              style={{ ["--d" as string]: i * 70 }}
              className="spot group relative overflow-hidden rounded-2xl border border-line bg-white/[0.025] p-7 transition-transform duration-500 hover:-translate-y-1"
            >
              <svg
                viewBox="0 0 24 24"
                className="draw h-9 w-9 text-accent"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {ICONS[s.icon]}
              </svg>
              <h3 className="mt-6 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-mist">{s.text}</p>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}
