import { AnimatePresence, motion } from "../../lib/motion";

type VoiceHudProps = {
  visible: boolean;
  releasing?: boolean;
};

export function VoiceHud({ visible, releasing }: VoiceHudProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute inset-x-0 top-[32%] z-20 flex justify-center px-4"
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 26 }}
        >
          <div className="flex items-center gap-4 rounded-2xl border border-app-stroke bg-app-surface/95 px-5 py-3.5 shadow-lg backdrop-blur-md">
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center">
              <span className="voice-ring absolute inset-0 rounded-full border-2 border-app-accent/40" />
              <span className="voice-ring-delayed absolute inset-0 rounded-full border-2 border-app-accent/30" />
              <span className="voice-mic-dot relative z-10 h-2.5 w-2.5 rounded-full bg-app-accent" />
            </div>
            <div className="min-w-0">
              <p className="text-base font-semibold text-app-heading">
                {releasing ? "Saving…" : "Listening"}
              </p>
              <p className="text-xs text-app-muted">
                {releasing ? "On-device transcription" : "Hold hotkey · speak · release to save"}
              </p>
            </div>
            {!releasing && (
              <div className="flex items-end gap-0.5">
                {[0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 rounded-full bg-app-accent voice-bar"
                    style={{
                      animation: `voice-bar-dance ${0.5 + (i % 3) * 0.1}s ease-in-out ${i * 0.07}s infinite`,
                      ["--bar-peak" as string]: `${h * 16}px`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
