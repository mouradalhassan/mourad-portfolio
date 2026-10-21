import { NAV_LINKS } from "@/lib/data";

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-3 py-3 sm:justify-between sm:px-5 sm:py-4">
        <a
          href="#top"
          className="hidden rounded-full bg-ink/90 px-4 py-2 text-sm font-semibold whitespace-nowrap sm:block"
        >
          Mourad<span className="hidden sm:inline"> Al Hassan</span>
        </a>
        <nav className="flex items-center gap-1 rounded-full bg-ink/90 p-1 text-sm">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`rounded-full px-3 py-2 text-[13px] text-mist transition-colors hover:text-snow sm:px-4 sm:text-sm ${
                l.href === "#apps" || l.href === "#services" ? "hidden md:block" : ""
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener"
            className="hidden rounded-full bg-snow px-4 py-2 font-semibold text-ink sm:block"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
