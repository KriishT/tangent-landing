import { motion } from "../lib/motion";
import { DownloadButton, MacNotifyForm } from "./CTA";
import { useReducedMotion } from "../hooks/useTheme";

const IMAGE =
  "https://images.unsplash.com/photo-1555095062-75840ec594b0?w=2000&q=80&auto=format&fit=crop";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="download"
      className="vision-banner relative flex h-svh max-h-svh min-h-[32rem] snap-start snap-always items-center justify-center overflow-hidden pt-16"
      aria-label="Tangent"
    >
      <img
        src={IMAGE}
        alt=""
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full scale-105 object-cover opacity-35"
        aria-hidden
      />
      <div className="absolute inset-0 bg-canvas/88 dark:bg-canvas/92" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,rgba(98,104,232,0.14)_0%,transparent_65%)]"
        aria-hidden
      />
      <div className="demo-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto max-w-2xl px-6 text-center sm:px-8"
      >
        <h1 className="font-display text-4xl leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-6xl">
          Catch the thought.
          <br />
          <span className="italic text-muted">Keep the flow.</span>
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
          One hotkey, one line, under two seconds — with the app and file you were in saved
          automatically.
        </p>

        <div className="mt-9 flex flex-col items-center gap-4">
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <DownloadButton />
            <MacNotifyForm />
          </div>
          <a
            href="#learn-more"
            className="text-sm text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            Learn more
          </a>
        </div>

        <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted">
          Local-first · No account · Free on Windows
        </p>
      </motion.div>
    </section>
  );
}
