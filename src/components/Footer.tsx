import { LINKS } from "../lib/constants";
import { TangentLogo } from "./TangentLogo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-5 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <TangentLogo size="sm" />
          <p className="mt-3 max-w-xs text-sm text-muted">
            A flow protector for stray thoughts. Not a notes app.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <li>
              <a href={LINKS.github} className="hover:text-ink" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href={LINKS.changelog} className="hover:text-ink" target="_blank" rel="noreferrer">
                Changelog
              </a>
            </li>
            <li>
              <a href={LINKS.privacy} className="hover:text-ink">
                Privacy
              </a>
            </li>
            <li>
              <a href={LINKS.contact} className="hover:text-ink">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <p className="mx-auto mt-10 max-w-6xl text-xs text-muted">
        &copy; {year} Tangent. Built with Tauri.
      </p>
    </footer>
  );
}
