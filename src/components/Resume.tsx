export default function Resume() {
  return (
    <section id="cv" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <div data-reveal>
          <p className="eyebrow">CV</p>
          <h2 data-split className="mt-5 text-4xl leading-[1] font-extrabold tracking-tight sm:text-6xl">
            My <span className="serif-i text-accent">CV.</span>
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/resume.pdf" target="_blank" rel="noopener" className="btn btn-solid magnet">
              Open CV <span aria-hidden="true">↗</span>
            </a>
            <a href="/resume.pdf" download="Mourad_Al_Hassan_CV.pdf" className="btn btn-ghost magnet">
              Download PDF
            </a>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-white/[0.02]" data-reveal>
          <iframe
            src="/resume.pdf#view=FitH"
            title="Mourad Al Hassan CV"
            className="hidden h-[1100px] w-full md:block"
            loading="lazy"
          />
          <p className="p-6 text-sm text-mist md:hidden">
            The preview isn&rsquo;t shown on small screens. Use Open CV above.
          </p>
        </div>
      </div>
    </section>
  );
}
