import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "../lib/motion";

export type DownloadPlatform = "windows" | "mac";

const DownloadGuideContext = createContext<(platform: DownloadPlatform) => void>(() => {});

export function useDownloadGuide() {
  return useContext(DownloadGuideContext);
}

export function DownloadGuideProvider({ children }: { children: ReactNode }) {
  const [platform, setPlatform] = useState<DownloadPlatform | null>(null);

  useEffect(() => {
    if (!platform) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPlatform(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [platform]);

  return (
    <DownloadGuideContext.Provider value={setPlatform}>
      {children}
      <AnimatePresence>
        {platform && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/45 p-4 sm:items-center dark:bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPlatform(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="download-guide-title"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-md rounded-2xl border border-border bg-surface p-5 shadow-xl sm:p-7"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-5 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-muted">
                    Download started
                  </p>
                  <h2 id="download-guide-title" className="mt-1 font-display text-2xl text-ink">
                    {platform === "windows" ? "Install on Windows" : "Install on Mac"}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setPlatform(null)}
                  className="rounded-lg p-2 text-muted transition-colors hover:bg-surface-raised hover:text-ink"
                  aria-label="Close install instructions"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {platform === "windows" ? <WindowsGuide /> : <MacGuide />}

              <button
                type="button"
                onClick={() => setPlatform(null)}
                className="mt-6 w-full rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DownloadGuideContext.Provider>
  );
}

function WindowsGuide() {
  return (
    <div className="space-y-4 text-left text-sm leading-relaxed text-muted">
      <ol className="list-decimal space-y-2.5 pl-5 text-ink">
        <li>Open the installer from your Downloads folder.</li>
        <li>
          If Windows shows <strong>Windows protected your PC</strong>, click{" "}
          <strong>More info</strong>.
        </li>
        <li>
          Then click <strong>Run anyway</strong> and finish the installer.
        </li>
      </ol>
      <p>
        This warning appears because Tangent is not yet code-signed. It is the same installer you
        just downloaded from this site.
      </p>
    </div>
  );
}

function MacGuide() {
  return (
    <div className="space-y-4 text-left text-sm leading-relaxed text-muted">
      <ol className="list-decimal space-y-2.5 pl-5 text-ink">
        <li>
          Open the downloaded <strong>.dmg</strong>.
        </li>
        <li>
          Drag <strong>Tangent</strong> into <strong>Applications</strong>.
        </li>
        <li>
          <strong>Eject the disk image</strong> — do not run the app from the DMG.
        </li>
        <li>Open Tangent from Applications.</li>
        <li>
          If macOS blocks it: System Settings → Privacy &amp; Security →{" "}
          <strong>Open Anyway</strong>.
        </li>
      </ol>
      <p>
        If macOS says the app is “damaged,” run this in Terminal, then open Tangent again:
      </p>
      <code className="block overflow-x-auto rounded-lg bg-surface-raised px-3 py-2 font-mono text-[12px] text-ink">
        xattr -cr /Applications/Tangent.app
      </code>
    </div>
  );
}
