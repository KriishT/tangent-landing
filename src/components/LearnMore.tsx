import { useCallback, useState } from "react";
import { Brain, MapPin, Zap } from "lucide-react";
import { motion } from "../lib/motion";
import { useReducedMotion } from "../hooks/useTheme";
import { IconBox } from "./IconBox";

const beats = [
  {
    icon: Brain,
    title: "The thought vanishes",
    body: "Half the idea is gone before you finish opening Notes.",
  },
  {
    icon: Zap,
    title: "The flow breaks",
    body: "One interruption — a minute lost finding your place again.",
  },
  {
    icon: MapPin,
    title: "The why disappears",
    body: "Later, you can't remember which file sparked it.",
  },
];

const GHOST_THOUGHTS = [
  { text: "refactor this later…", style: { top: "14%", left: "6%" }, delay: 0 },
  { text: "what was I doing?", style: { top: "20%", right: "5%" }, delay: 1.4 },
  { text: "email the team", style: { bottom: "28%", left: "10%" }, delay: 2.8 },
  { text: "rename the handler", style: { bottom: "22%", right: "8%" }, delay: 0.7 },
  { text: "add tests for this", style: { top: "38%", left: "4%" }, delay: 2.1 },
];

const HEADLINE_WORDS = [
  "Mid-work",
  "thoughts",
  "deserve",
  "a",
  { emphasis: "two-second" },
  "parking",
  "spot.",
] as const;

const headlineContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

const headlineWord = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const beatSpring = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 22,
      delay: 0.55 + i * 0.1,
    },
  }),
};

function DriftingThoughts({ reduced }: { reduced: boolean }) {
  if (reduced) return null;

  return (
    <div className="learn-more-ghosts pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {GHOST_THOUGHTS.map((ghost) => (
        <span
          key={ghost.text}
          className="learn-more-ghost"
          style={{
            ...ghost.style,
            animationDelay: `${ghost.delay}s`,
            ["--ghost-delay" as string]: `${ghost.delay}s`,
          }}
        >
          <span className="learn-more-ghost-text">{ghost.text}</span>
          <span className="learn-more-ghost-strike" />
        </span>
      ))}
    </div>
  );
}

export function LearnMore() {
  const reduced = useReducedMotion();
  const [spotlight, setSpotlight] = useState({ x: 50, y: 45 });
  const [spotlightOn, setSpotlightOn] = useState(false);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (reduced) return;
      const rect = e.currentTarget.getBoundingClientRect();
      setSpotlight({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
      setSpotlightOn(true);
    },
    [reduced],
  );

  const handlePointerLeave = useCallback(() => {
    setSpotlightOn(false);
  }, []);

  return (
    <section
      id="learn-more"
      aria-labelledby="learn-more-heading"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="learn-more relative flex h-svh max-h-svh min-h-[28rem] snap-start snap-always flex-col justify-center overflow-hidden border-y border-border bg-surface pt-16"
    >
      <DriftingThoughts reduced={reduced} />

      <div className="learn-more-ambient pointer-events-none absolute inset-0" aria-hidden />

      {!reduced && (
        <div
          className={`learn-more-spotlight pointer-events-none absolute inset-0 transition-opacity duration-700 ${
            spotlightOn ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: `radial-gradient(520px circle at ${spotlight.x}% ${spotlight.y}%, rgba(98,104,232,0.14), transparent 55%)`,
          }}
          aria-hidden
        />
      )}

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col justify-center px-5 py-6 sm:px-6 sm:py-8">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="font-mono text-xs uppercase tracking-[0.2em] text-accent"
        >
          Why Tangent
        </motion.p>

        <motion.h2
          id="learn-more-heading"
          variants={reduced ? undefined : headlineContainer}
          initial={reduced ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-3 font-display text-[clamp(1.75rem,4.2vw,3.25rem)] leading-[1.1] tracking-tight text-ink"
        >
          {HEADLINE_WORDS.map((word, i) =>
            typeof word === "string" ? (
              <motion.span
                key={word + i}
                variants={reduced ? undefined : headlineWord}
                className="mr-[0.28em] inline-block"
              >
                {word}
              </motion.span>
            ) : (
              <motion.span
                key="emphasis"
                variants={reduced ? undefined : headlineWord}
                className="learn-more-emphasis mr-[0.28em] inline-block italic text-muted"
              >
                {word.emphasis}
              </motion.span>
            ),
          )}
        </motion.h2>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:mt-5 sm:text-base"
        >
          One hotkey, one line — with the app and file you were in saved automatically.
        </motion.p>

        <ul className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
          {beats.map((beat, i) => (
            <motion.li
              key={beat.title}
              custom={i}
              variants={reduced ? undefined : beatSpring}
              initial={reduced ? false : "hidden"}
              whileInView="show"
              viewport={{ once: true, margin: "-20px" }}
              whileHover={reduced ? undefined : { y: -3, transition: { duration: 0.2 } }}
              className="learn-more-beat group rounded-xl border border-border/80 bg-canvas/50 px-4 py-3.5 backdrop-blur-sm sm:px-4 sm:py-4"
            >
              <motion.div
                className="inline-block"
                whileHover={reduced ? undefined : { rotate: [-2, 2, 0], transition: { duration: 0.35 } }}
              >
                <IconBox icon={beat.icon} size="sm" />
              </motion.div>
              <p className="mt-2.5 text-sm font-medium leading-snug text-ink">{beat.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">{beat.body}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
