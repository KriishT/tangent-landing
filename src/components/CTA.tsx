import { motion } from "../lib/motion";
import { Download, Apple } from "lucide-react";
import { useReducedMotion } from "../hooks/useTheme";
import {
  APP_VERSION,
  INSTALLER_SIZE,
  WINDOWS_DOWNLOAD_URL,
  MAC_DOWNLOAD_URL,
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

export function MacDownloadButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={MAC_DOWNLOAD_URL}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-surface-raised ${className}`}
    >
      <Apple className="h-4 w-4" aria-hidden />
      Download for Mac
    </a>
  );
}

export function DownloadMeta() {
  return (
    <p className="text-xs text-muted">
      v{APP_VERSION} · {INSTALLER_SIZE} · Windows 10/11 &amp; macOS 10.15+ · free to try · no
      account required
    </p>
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
