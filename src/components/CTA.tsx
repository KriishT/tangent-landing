import { useEffect, useId, useState, type FormEvent } from "react";
import { motion } from "../lib/motion";
import { Apple, Download } from "lucide-react";
import { useReducedMotion } from "../hooks/useTheme";
import { FALLBACK_WINDOWS_URL, LINKS } from "../lib/constants";
import { getLatestRelease } from "../lib/latestRelease";
import { useDownloadGuide } from "./DownloadGuide";

const MAC_NOTIFY_KEY = "tangent-mac-notify";

function useLatestDownloads() {
  const [windowsUrl, setWindowsUrl] = useState(FALLBACK_WINDOWS_URL);

  useEffect(() => {
    let cancelled = false;
    getLatestRelease().then((release) => {
      if (cancelled) return;
      setWindowsUrl(release.windowsUrl);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return { windowsUrl };
}

export function DownloadButton({ className = "" }: { className?: string }) {
  const { windowsUrl } = useLatestDownloads();
  const openGuide = useDownloadGuide();

  return (
    <a
      href={windowsUrl}
      onClick={() => openGuide("windows")}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] active:scale-[0.98] ${className}`}
    >
      <Download className="h-4 w-4" aria-hidden />
      Download for Windows
    </a>
  );
}

/** Mac build isn't ready — collect emails for a launch ping. */
export function MacNotifyForm({ className = "" }: { className?: string }) {
  const inputId = useId();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(() => {
    try {
      return Boolean(localStorage.getItem(MAC_NOTIFY_KEY));
    } catch {
      return false;
    }
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) return;

    try {
      localStorage.setItem(MAC_NOTIFY_KEY, trimmed);
    } catch {
      /* ignore */
    }
    setDone(true);

    const subject = encodeURIComponent("Tangent Mac waitlist");
    const body = encodeURIComponent(`Please notify me when Mac is ready.\n\nEmail: ${trimmed}`);
    window.open(`${LINKS.contact}?subject=${subject}&body=${body}`, "_self");
  };

  if (done) {
    return (
      <p
        className={`inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 py-3.5 text-sm text-muted ${className}`}
      >
        <Apple className="h-4 w-4 text-accent" aria-hidden />
        You&apos;re on the Mac list
      </p>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-surface-raised ${className}`}
      >
        <Apple className="h-4 w-4" aria-hidden />
        Mac — notify me
      </button>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`flex w-full max-w-sm flex-col gap-2 sm:max-w-none sm:flex-row sm:items-center ${className}`}
    >
      <label className="sr-only" htmlFor={inputId}>
        Email for Mac launch notification
      </label>
      <input
        id={inputId}
        type="email"
        required
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="min-w-0 flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink outline-none ring-accent placeholder:text-muted focus:ring-2"
      />
      <button
        type="submit"
        className="shrink-0 rounded-xl border border-border bg-surface-raised px-4 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
      >
        Notify me
      </button>
    </form>
  );
}

export function HeroKeycaps() {
  const reduced = useReducedMotion();
  const keys = ["Ctrl", "Shift", "Space"];

  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      {keys.map((key, i) => (
        <motion.span
          key={key}
          className="inline-flex min-w-[2.5rem] items-center justify-center rounded-md border border-border bg-surface-raised px-2 py-1.5 font-mono text-[10px] font-medium text-muted shadow-sm sm:text-xs"
          animate={reduced ? undefined : { y: [0, 2, 0] }}
          transition={
            reduced
              ? undefined
              : {
                  duration: 0.15,
                  delay: i * 0.08,
                  repeat: Infinity,
                  repeatDelay: 2.5,
                  ease: "easeInOut",
                }
          }
        >
          {key}
        </motion.span>
      ))}
      <span className="ml-1 text-xs text-muted">anywhere</span>
    </div>
  );
}
