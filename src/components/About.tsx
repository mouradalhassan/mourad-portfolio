import { ABOUT } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <div>
            <div data-reveal>
              <p className="eyebrow">04 — About</p>
              <h2 data-split className="mt-5 text-4xl leading-[1] font-extrabold tracking-tight sm:text-6xl">
                Everything you saw
                <br />
                <span className="serif-i text-accent">is live.</span>
              </h2>
            </div>
            <div className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed">
              {ABOUT.paragraphs.map((t, i) => (
                <p
                  key={t}
                  data-reveal
                  style={{ ["--d" as string]: 100 + i * 120 }}
                  className={i === 0 ? "text-snow" : "text-mist"}
                >
                  {t}
                </p>
              ))}
            </div>

            <dl
              className="mt-10 grid max-w-xl gap-6 border-t border-line pt-8 sm:grid-cols-2"
              data-reveal
              style={{ ["--d" as string]: 300 }}
            >
              <div>
                <dt className="font-mono text-[0.7rem] tracking-[0.18em] text-fog uppercase">
                  Open to
                </dt>
                <dd className="mt-2 text-sm leading-relaxed">
                  {ABOUT.openTo}
                  <span className="block text-mist">Based in Tripoli, Lebanon</span>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.7rem] tracking-[0.18em] text-fog uppercase">
                  Languages
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-snow">
                  {ABOUT.languages}
                </dd>
              </div>
            </dl>
          </div>

          <div className="space-y-10">
            {ABOUT.skills.map((g, gi) => (
              <div key={g.group} className="border-t border-line pt-6" data-reveal style={{ ["--d" as string]: gi * 120 }}>
                <h3 className="font-mono text-[0.7rem] tracking-[0.18em] text-fog uppercase">
                  {g.group}
                </h3>
                <ul className="chips mt-4 flex flex-wrap gap-2">
                  {g.items.map((s, i) => (
                    <li
                      key={s}
                      style={{ ["--i" as string]: i }}
                      className="rounded-full border border-line bg-white/[0.02] px-4 py-2 text-sm text-snow/90 transition-colors hover:border-accent/60 hover:text-snow"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
