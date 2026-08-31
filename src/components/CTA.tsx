import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Apple } from "lucide-react";
import { useReducedMotion } from "../hooks/useTheme";
import {
  APP_VERSION,
  INSTALLER_SIZE,
  WINDOWS_DOWNLOAD_URL,
} from "../lib/constants";

export function DownloadButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={WINDOWS_DOWNLOAD_URL}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] active:scale-[0.98] ${className}`}
    >
      <Download className="h-4 w-4" aria-hidden />
      Download for Windows
    </a>
  );
}

export function DownloadMeta() {
  return (
    <p className="text-xs text-muted">
      v{APP_VERSION} · {INSTALLER_SIZE} · Windows 10/11 · free to try · no account required
    </p>
  );
}

type MacNotifyProps = {
  variant?: "inline" | "button";
  className?: string;
};

export function MacNotifyForm({ variant = "button", className = "" }: MacNotifyProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: wire to Formspree, Buttondown, or your email API endpoint
    console.info("[Mac waitlist]", email);
    setSubmitted(true);
    setEmail("");
  };

  if (variant === "inline" && !open) {
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
    <div className={className}>
      {variant === "button" && !open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-surface-raised"
        >
          <Apple className="h-4 w-4" aria-hidden />
          Mac — notify me
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 sm:flex-row sm:items-center"
          >
            {submitted ? (
              <p className="text-sm text-accent">Got it — we'll email you when Mac ships.</p>
            ) : (
              <>
                <label htmlFor="mac-email" className="sr-only">
                  Email for Mac release notification
                </label>
                <input
                  id="mac-email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-w-[200px] flex-1 rounded-lg border border-border bg-surface-raised px-3 py-2.5 text-sm text-ink placeholder:text-muted"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-surface-raised px-4 py-2.5 text-sm font-medium text-ink hover:bg-border"
                >
                  Notify me
                </button>
              </>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
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
