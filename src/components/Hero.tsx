import { motion } from "framer-motion";
import {
  DownloadButton,
  DownloadMeta,
  HeroKeycaps,
  MacNotifyForm,
} from "./CTA";
import { Section } from "./Section";

export function Hero() {
  return (
    <Section id="download" className="pt-28">
      <div className="mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 font-mono text-xs uppercase tracking-widest text-accent"
        >
          Catch the thought. Keep the flow.
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="font-display text-balance text-4xl leading-[1.1] tracking-tight text-ink sm:text-5xl md:text-6xl"
        >
          A thought hits mid-work.{" "}
          <span className="italic text-muted">You shouldn&apos;t have to choose</span>{" "}
          between losing it and losing your flow.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="mx-auto mt-6 max-w-xl text-balance text-lg text-muted"
        >
          Tangent is a lightweight desktop capture bar — one hotkey, one line, back to
          work in under two seconds, with the context of what you were doing saved
          automatically.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
            <DownloadButton />
            <MacNotifyForm />
          </div>
          <DownloadMeta />
          <div className="mt-4">
            <HeroKeycaps />
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
