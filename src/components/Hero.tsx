import { HERO, SITE } from "@/lib/data";
import Portrait from "./Portrait";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16"
    >
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] h-[40rem] w-[40rem] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,77,61,0.35), transparent)",
        }}
        aria-hidden="true"
      />
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <div className="rise inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-xs text-mist">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            {HERO.status}
          </div>

          <h1
            data-split
            className="mt-7 text-[clamp(3.2rem,9vw,7.5rem)] leading-[0.92] font-extrabold tracking-tight"
          >
            Mourad
            <br />
            <span className="serif-i text-accent">Al Hassan</span>
          </h1>

          <p
            className="rise mt-6 text-lg font-semibold sm:text-xl"
            style={{ animationDelay: "0.16s" }}
          >
            {SITE.role}
          </p>
          <p
            className="rise mt-3 max-w-xl leading-relaxed text-mist"
            style={{ animationDelay: "0.22s" }}
          >
            {HERO.bio}
          </p>

          <div
            className="rise mt-8 flex flex-wrap gap-3"
            style={{ animationDelay: "0.3s" }}
          >
            <a href="#work" className="btn btn-solid magnet">
              View work <span aria-hidden="true">↓</span>
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener"
              className="btn btn-ghost magnet"
            >
              Resume
            </a>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener"
              className="btn btn-ghost magnet"
            >
              WhatsApp
            </a>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener"
              className="btn btn-ghost magnet"
            >
              GitHub
            </a>
          </div>

          <dl
            className="rise mt-12 grid max-w-xl grid-cols-3 gap-5 border-t border-line pt-6"
            style={{ animationDelay: "0.38s" }}
          >
            {HERO.facts.map((f) => (
              <div key={f.v}>
                {/^\d+\+$/.test(f.k) ? (
                  <dt
                    className="text-xl font-bold sm:text-2xl"
                    data-count={parseInt(f.k, 10)}
                    data-suffix="+"
                  >
                    {f.k}
                  </dt>
                ) : (
                  <dt className="text-xl font-bold sm:text-2xl">{f.k}</dt>
                )}
                <dd className="mt-1 text-xs leading-snug text-fog">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          className="rise mx-auto w-full max-w-md"
          style={{ animationDelay: "0.2s" }}
        >
          <Portrait />
          <p className="mt-3 text-center font-mono text-[0.7rem] tracking-[0.2em] text-fog uppercase">
            {SITE.location}
          </p>
        </div>
      </div>
    </section>
  );
}
