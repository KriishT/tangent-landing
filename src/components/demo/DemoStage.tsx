import { memo } from "react";
import { AnimatePresence, motion } from "../../lib/motion";

const PHASES = [
  { id: "capture", label: "Capture" },
  { id: "triage", label: "Triage" },
  { id: "board", label: "Board" },
  { id: "notify", label: "Resurface" },
] as const;

type PhaseGroup = (typeof PHASES)[number]["id"];

function phaseGroup(phase: string): PhaseGroup {
  if (
    [
      "editor",
      "hotkey",
      "voice-in",
      "voice-listen",
      "voice-release",
      "capture-in",
      "typing",
      "context",
      "submit",
      "linger",
      "timer",
    ].includes(phase)
  )
    return "capture";
  if (["triage", "sort"].includes(phase)) return "triage";
  if (phase === "board") return "board";
  return "notify";
}

export const PhaseIndicator = memo(function PhaseIndicator({ phase }: { phase: string }) {
  const active = phaseGroup(phase);
  const activeIdx = PHASES.findIndex((p) => p.id === active);

  return (
    <div className="mt-6 flex items-center justify-center gap-2 sm:mt-8 sm:gap-3">
      {PHASES.map((p, i) => {
        const isActive = p.id === active;
        const isPast = i < activeIdx;
        return (
          <div key={p.id} className="flex items-center gap-2 sm:gap-3">
            <div
              className="flex items-center gap-2 transition-opacity duration-300"
              style={{ opacity: isActive ? 1 : isPast ? 0.55 : 0.3 }}
            >
              <span
                className={`h-2 w-2 rounded-full sm:h-2.5 sm:w-2.5 ${
                  isActive ? "bg-accent phase-dot-active" : isPast ? "bg-accent/50" : "bg-border"
                }`}
              />
              <span
                className={`hidden text-xs font-medium sm:inline ${
                  isActive ? "text-ink" : "text-muted"
                }`}
              >
                {p.label}
              </span>
            </div>
            {i < PHASES.length - 1 && (
              <div className="relative h-px w-6 bg-border sm:w-10">
                <div
                  className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-500 ease-out"
                  style={{ width: i < activeIdx ? "100%" : "0%" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
});

export function DemoAmbient() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="demo-ambient-glow absolute left-1/2 top-[55%] h-[min(100vw,800px)] w-[min(130vw,1100px)] -translate-x-1/2 -translate-y-1/2" />
      <div className="demo-grid absolute inset-0" />
    </div>
  );
}

export function HotkeyRipple({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="pointer-events-none absolute inset-0 z-[5] rounded-2xl border-2 border-accent/50"
              initial={{ opacity: 0.8, scale: 1 }}
              animate={{ opacity: 0, scale: 1.06 + i * 0.05 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75, delay: i * 0.1, ease: "easeOut" }}
            />
          ))}
          <motion.div
            className="pointer-events-none absolute inset-0 z-[4] rounded-2xl bg-accent/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
