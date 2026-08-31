import { AnimatePresence, motion } from "framer-motion";

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

export function PhaseIndicator({ phase }: { phase: string }) {
  const active = phaseGroup(phase);
  const activeIdx = PHASES.findIndex((p) => p.id === active);

  return (
    <div className="mt-6 flex items-center justify-center gap-2 sm:mt-8 sm:gap-3">
      {PHASES.map((p, i) => {
        const isActive = p.id === active;
        const isPast = i < activeIdx;
        return (
          <div key={p.id} className="flex items-center gap-2 sm:gap-3">
            <motion.div
              className="flex items-center gap-2"
              animate={{ opacity: isActive ? 1 : isPast ? 0.55 : 0.3 }}
            >
              <motion.span
                className={`h-2 w-2 rounded-full sm:h-2.5 sm:w-2.5 ${
                  isActive ? "bg-accent" : isPast ? "bg-accent/50" : "bg-border"
                }`}
                animate={isActive ? { scale: [1, 1.35, 1] } : { scale: 1 }}
                transition={{ duration: 1.2, repeat: isActive ? Infinity : 0 }}
              />
              <span
                className={`hidden text-xs font-medium sm:inline ${
                  isActive ? "text-ink" : "text-muted"
                }`}
              >
                {p.label}
              </span>
            </motion.div>
            {i < PHASES.length - 1 && (
              <div className="relative h-px w-6 bg-border sm:w-10">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-accent"
                  initial={{ width: "0%" }}
                  animate={{ width: i < activeIdx ? "100%" : "0%" }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function DemoAmbient() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="demo-ambient-glow absolute left-1/2 top-[55%] h-[min(100vw,800px)] w-[min(130vw,1100px)] -translate-x-1/2 -translate-y-1/2"
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.08, 0.9] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
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
