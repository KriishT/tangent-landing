import { AnimatePresence, motion } from "framer-motion";

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
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-app-accent/40"
                animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-app-accent/30"
                animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut", delay: 0.45 }}
              />
              <motion.span
                className="relative z-10 h-2.5 w-2.5 rounded-full bg-app-accent"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 0.9, repeat: Infinity }}
              />
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
              <motion.div
                className="flex items-end gap-0.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {[0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8].map((h, i) => (
                  <motion.span
                    key={i}
                    className="w-1 rounded-full bg-app-accent"
                    animate={{ height: [4, h * 16, 4] }}
                    transition={{
                      duration: 0.5 + (i % 3) * 0.1,
                      repeat: Infinity,
                      delay: i * 0.07,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
