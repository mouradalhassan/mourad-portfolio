import { SITE } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-28 sm:py-40">
      <div className="relative mx-auto max-w-7xl px-5">
        <div className="flex items-end justify-between gap-10" data-reveal>
          <div>
            <p className="eyebrow">Contact</p>
            <h2 className="mt-5 text-[clamp(2.8rem,8vw,7rem)] leading-[0.95] font-extrabold tracking-tight">
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
            className="btn btn-solid"
          >
            WhatsApp {SITE.phone}
          </a>
          <a href={`mailto:${SITE.email}`} className="btn btn-ghost">
            {SITE.email}
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener"
            className="btn btn-ghost"
          >
            LinkedIn ↗
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener"
            className="btn btn-ghost"
          >
            Resume (PDF)
          </a>
        </div>

        <div className="mt-24 flex flex-col justify-between gap-3 border-t border-line pt-6 text-xs text-fog sm:flex-row">
          <p>
            © 2026 {SITE.name} · {SITE.location}
          </p>
          <p>Built with Next.js and GSAP.</p>
        </div>
      </div>
    </section>
  );
}
