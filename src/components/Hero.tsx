import { HERO, SITE } from "@/lib/data";
import Portrait from "./Portrait";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-36 pb-16"
    >
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] h-[40rem] w-[40rem] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,77,61,0.35), transparent)",
        }}
        aria-hidden="true"
      />

      {/* corner labels: small, quiet, editorial */}
      <p className="rise absolute top-[5.6rem] left-5 font-mono text-[0.66rem] tracking-[0.22em] text-fog uppercase sm:left-[6vw]">
        Tripoli · Lebanon
      </p>
      <p className="rise absolute top-[5.6rem] right-5 hidden font-mono text-[0.66rem] tracking-[0.22em] text-fog uppercase sm:block sm:right-[6vw]">
        Portfolio · 2026
      </p>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div>
          <div className="rise inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-xs text-mist">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            {HERO.status}
          </div>

          <h1
            data-split
            className="mt-7 text-[clamp(2.6rem,5.9vw,5.5rem)] leading-[0.98] font-extrabold tracking-[-0.035em]"
          >
            I build websites
            <br />
            that <span className="serif-i text-accent">work,</span>
            <br />
            in English and Arabic.
          </h1>

          <p
            className="rise mt-7 max-w-xl text-lg leading-relaxed text-mist"
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
          <p className="mt-3 flex items-center justify-between font-mono text-[0.66rem] tracking-[0.2em] text-fog uppercase">
            <span>Move your cursor</span>
            <span aria-hidden="true">↔</span>
          </p>
        </div>
      </div>
    </section>
  );
}
