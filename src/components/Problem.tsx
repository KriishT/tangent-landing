import { motion } from "framer-motion";
import { Brain, Zap, MapPin } from "lucide-react";
import { useReducedMotion } from "../hooks/useTheme";
import { IconBox } from "./IconBox";

const problems = [
  {
    icon: Brain,
    title: "You lose the thought.",
    body: "Writing it down means leaving your work. By the time you're in Notes, half of it is gone.",
  },
  {
    icon: Zap,
    title: "You lose the flow.",
    body: "Only ~10% of devs resume coding within a minute of an interruption — most hunt for context before they can edit again.",
  },
  {
    icon: MapPin,
    title: "You lose the why.",
    body: "By the time you review a note, you've forgotten what you were doing when you had it.",
  },
];

export function Problem() {
  const reduced = useReducedMotion();

  return (
    <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">The cost</p>
        <h2 className="mt-2 font-display text-2xl tracking-tight text-ink sm:text-3xl lg:text-4xl">
          The interruption tax is real.
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted sm:text-base">
          Every stray thought forces a choice: drop what you&apos;re doing, or let it vanish.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3 lg:col-span-8">
        {problems.map((p, i) => (
          <motion.article
            key={p.title}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="flex flex-col rounded-xl border border-border bg-surface p-4 sm:p-5"
          >
            <IconBox icon={p.icon} size="sm" className="mb-3" />
            <h3 className="font-display text-base text-ink sm:text-lg">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{p.body}</p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
