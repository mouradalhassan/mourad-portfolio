import { HERO, SITE } from "@/lib/data";
import Portrait from "./Portrait";

const STACK = ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Node.js", "Vercel", "Netlify", "Tailwind", "GSAP"];

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* split: name on the left, the character on a full-height colour panel */}
      <div className="grid flex-1 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="relative flex flex-col justify-end px-5 pt-32 pb-10 sm:px-[5vw] lg:pt-40 lg:pb-16">
          <p className="rise font-mono text-[0.7rem] tracking-[0.25em] text-fog uppercase">
            {HERO.status}
          </p>

          <h1
            data-split
            className="mt-6 text-[clamp(4.2rem,12vw,13rem)] leading-[0.82] font-black tracking-[-0.05em]"
          >
            Mourad
            <br />
            <span className="serif-i font-normal text-accent">Al Hassan</span>
          </h1>

          <p className="rise mt-8 font-mono text-sm tracking-[0.12em] text-snow uppercase" style={{ animationDelay: "0.2s" }}>
            Full stack developer <span className="text-accent">/</span> Tripoli, Lebanon
          </p>

          <p className="rise mt-5 max-w-xl text-base leading-relaxed text-mist sm:text-lg" style={{ animationDelay: "0.26s" }}>
            {HERO.bio}
          </p>

          <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "0.32s" }}>
            <a href="#work" className="btn btn-solid magnet">
              View work <span aria-hidden="true">↓</span>
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener" className="btn btn-ghost magnet">
              Resume
            </a>
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener" className="btn btn-ghost magnet">
              WhatsApp
            </a>
            <a href={SITE.github} target="_blank" rel="noopener" className="btn btn-ghost magnet">
              GitHub
            </a>
          </div>

          <dl className="rise mt-10 grid max-w-xl grid-cols-3 gap-5 border-t border-line pt-6" style={{ animationDelay: "0.4s" }}>
            {HERO.facts.map((f) => (
              <div key={f.v}>
                {/^\d+\+$/.test(f.k) ? (
                  <dt className="text-2xl font-bold" data-count={parseInt(f.k, 10)} data-suffix="+">
                    {f.k}
                  </dt>
                ) : (
                  <dt className="text-2xl font-bold">{f.k}</dt>
                )}
                <dd className="mt-1 text-xs leading-snug text-fog">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative min-h-[60svh] overflow-hidden bg-[#9f1916] lg:min-h-0">
          <div className="absolute inset-0">
            <Portrait fill />
          </div>
          <p className="absolute bottom-5 left-5 z-10 font-mono text-[0.66rem] tracking-[0.22em] text-white/90 uppercase">
            Move your cursor ↔
          </p>
        </div>
      </div>

      {/* stack ticker across the bottom edge */}
      <div className="marquee border-t border-line py-4">
        <ul className="marquee-track">
          {[...STACK, ...STACK].map((t, i) => (
            <li key={i} className="flex shrink-0 items-center gap-8 pr-8 font-mono text-sm tracking-[0.18em] text-mist uppercase whitespace-nowrap">
              {t}
              <span className="text-accent" aria-hidden="true">✦</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
