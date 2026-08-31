import { useEffect, useState } from "react";
import { TangentLogo } from "./TangentLogo";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "#demo", label: "Demo" },
  { href: "#features", label: "Features" },
  { href: "#faq", label: "FAQ" },
  { href: "#download", label: "Download" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-canvas/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-5"
        aria-label="Main"
      >
        <a href="#" className="shrink-0 rounded-lg focus-visible:outline-none">
          <TangentLogo size="sm" />
        </a>

        <div className="flex min-w-0 items-center gap-1">
          <ul className="flex items-center gap-0.5 sm:gap-1">
            {navLinks.map((link) => (
              <li key={link.href} className="shrink-0">
                <a
                  href={link.href}
                  className="whitespace-nowrap rounded-lg px-2 py-2 text-xs text-muted transition-colors hover:text-ink sm:px-3 sm:text-sm"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
