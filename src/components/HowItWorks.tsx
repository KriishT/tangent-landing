import { motion } from "framer-motion";
import { Keyboard, Inbox, Layers, Bell } from "lucide-react";
import { useReducedMotion } from "../hooks/useTheme";
import { IconBox } from "./IconBox";

const steps = [
  {
    icon: Keyboard,
    title: "Capture",
    line: "Hotkey from anywhere. Hold to speak, or type one line.",
  },
  {
    icon: Inbox,
    title: "Park",
    line: "Saved locally with the app, file, and project you were in.",
  },
  {
    icon: Layers,
    title: "Triage",
    line: "Sort into Act, Keep, or Drop — all keyboard-driven.",
  },
  {
    icon: Bell,
    title: "Resurface",
    line: "Due dates, notifications, and calendar export when it matters.",
  },
];

export function HowItWorks() {
  const reduced = useReducedMotion();

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-accent">How it works</p>
      <h2 className="mt-2 font-display text-2xl tracking-tight text-ink sm:text-3xl">
        Four beats. Zero ceremony.
      </h2>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:mt-8 lg:grid-cols-4 lg:gap-4">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            className="rounded-xl border border-border bg-surface p-4 sm:p-5"
          >
            <IconBox icon={step.icon} size="sm" className="mb-3" />
            <h3 className="font-display text-base text-ink sm:text-lg">{step.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted sm:text-[15px]">
              {step.line}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
