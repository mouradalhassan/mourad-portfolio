import { SITE } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-28 sm:py-40" data-anim>
      <div className="relative mx-auto max-w-7xl px-5">
        <div className="flex items-end justify-between gap-10" data-reveal>
          <div>
            <p className="eyebrow">06 — Contact</p>
            <h2 data-split className="mt-5 text-[clamp(2.8rem,8vw,7rem)] leading-[0.95] font-extrabold tracking-tight">
              Got a project
              <br />
              or a role?
              <br />
              <span className="serif-i text-accent">Let&rsquo;s talk.</span>
            </h2>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3" data-reveal style={{ ["--d" as string]: 150 }}>
          <a
            href={`https://wa.me/${SITE.whatsapp}`}
            target="_blank"
            rel="noopener"
            className="btn btn-solid magnet"
          >
            WhatsApp {SITE.phone}
          </a>
          <a href={`mailto:${SITE.email}`} className="btn btn-ghost magnet">
            {SITE.email}
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener"
            className="btn btn-ghost magnet"
          >
            LinkedIn ↗
          </a>
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener"
            className="btn btn-ghost magnet"
          >
            GitHub ↗
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener"
            className="btn btn-ghost magnet"
          >
            Resume (PDF)
          </a>
        </div>

        <div className="marquee mt-20" aria-hidden="true">
          <ul className="marquee-track">
            {[...Array(8)].map((_, i) => (
              <li key={i} className="flex shrink-0 items-center gap-8 pr-8 text-4xl font-extrabold whitespace-nowrap text-snow/10 sm:text-6xl">
                Let&rsquo;s work together <span className="text-accent/60">✦</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-line pt-6 text-xs text-fog sm:flex-row">
          <p>
            © 2026 {SITE.name} · {SITE.location}
          </p>
          <p>Built with Next.js and GSAP.</p>
        </div>
      </div>
    </section>
  );
}
