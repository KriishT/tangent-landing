const comparisons = [
  {
    objection: "...Notes or Sticky Notes?",
    answer: "Those need a window switch, and nothing ever comes back out of them.",
  },
  {
    objection: "...my phone?",
    answer: "Reaching for your phone IS the context switch.",
  },
  {
    objection: "...a dictation tool?",
    answer: "Those paste text where your cursor is. They don't park anything.",
  },
  {
    objection: "...a task manager?",
    answer: "Those ask you to decide things at the exact moment you can't afford to.",
  },
];

export function WhyNot() {
  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
      <div>
        <h2 className="font-display text-2xl tracking-tight text-ink sm:text-3xl lg:text-4xl">
          Why not just&hellip;
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          Tangent isn&apos;t replacing your notes app — it catches the thought when you
          can&apos;t afford to open one.
        </p>
      </div>

      <dl className="divide-y divide-border rounded-2xl border border-border bg-surface">
        {comparisons.map((c) => (
          <div key={c.objection} className="px-5 py-5 sm:px-6 sm:py-6">
            <dt className="font-display text-lg text-accent sm:text-xl">{c.objection}</dt>
            <dd className="mt-2 text-base leading-relaxed text-ink/80 sm:text-[17px]">
              {c.answer}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
