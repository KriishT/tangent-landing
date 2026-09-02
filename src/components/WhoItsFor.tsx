import { motion } from "../lib/motion";
import { useReducedMotion } from "../hooks/useTheme";

const personas = [
  {
    quote:
      "I know exactly what a context switch costs. I need somewhere to park a thought in the two seconds before it's gone.",
    label: "Developers & engineers",
    accent: "border-l-accent",
  },
  {
    quote:
      "My best sentences arrive mid-sentence on something else. Stopping to jot it down kills the paragraph I was writing.",
    label: "Writers & knowledge workers",
    accent: "border-l-[#b8862e]",
  },
  {
    quote:
      "I need somewhere to put a thought immediately, without it becoming another thing to manage.",
    label: "High mental load & ADHD",
    accent: "border-l-[#8a72c4]",
  },
];

export function WhoItsFor() {
  const reduced = useReducedMotion();

  return (
    <div>
      <h2 className="font-display text-2xl tracking-tight text-ink sm:text-3xl">
        Built for people who&apos;ve felt this.
      </h2>
      <p className="mt-2 text-sm text-muted sm:text-base">
        Not personas we invented — patterns we kept hearing.
      </p>

      <div className="mt-5 grid gap-3 lg:grid-cols-3 lg:gap-4">
        {personas.map((p, i) => (
          <motion.blockquote
            key={p.label}
            initial={reduced ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className={`flex flex-col rounded-r-xl border-l-[3px] bg-surface py-4 pl-4 pr-4 sm:py-5 sm:pl-5 ${p.accent}`}
          >
            <p className="text-sm leading-relaxed text-ink sm:text-base">
              &ldquo;{p.quote}&rdquo;
            </p>
            <footer className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-muted sm:text-xs">
              {p.label}
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </div>
  );
}
