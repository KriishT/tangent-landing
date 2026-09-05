import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is it free?",
    a: "Yes — the free tier is fully usable. A one-time Pro unlock adds voice, return-to-context, and calendar export.",
  },
  {
    q: "Is there a Mac version?",
    a: "Not yet — Windows is available now. Use “Mac — notify me” on the download buttons and we’ll email you when the Mac build ships.",
  },
  {
    q: "Does it work offline?",
    a: "Entirely. Tangent never needs a network connection — capture, triage, and voice all work offline.",
  },
  {
    q: "Do you see my thoughts or my screen?",
    a: "No. Nothing leaves your machine. Context is app name + window title only — not screenshots or keystrokes.",
  },
  {
    q: 'What exactly is "work context"?',
    a: "The app in focus, window title, and timestamp — so you remember why you had the thought.",
  },
  {
    q: "Will it slow my machine down?",
    a: "Under 120 MB idle. Built with Tauri (Rust + native WebView), not bundled Chromium.",
  },
  {
    q: "What if I never sort my captures?",
    a: "Unsorted thoughts sit in triage until you're ready. Drop exists for guilt-free deletion.",
  },
  {
    q: "Can I get my data out?",
    a: "Yes — plain SQLite, plus a built-in export in Settings.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      <h2 className="font-display text-2xl tracking-tight text-ink sm:text-3xl">
        Questions we&apos;d ask.
      </h2>

      <div className="mt-5 grid gap-2 lg:grid-cols-2 lg:gap-x-4">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div
              key={faq.q}
              className="overflow-hidden rounded-xl border border-border bg-surface"
            >
              <h3>
                <button
                  type="button"
                  id={`faq-btn-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-ink sm:px-5"
                >
                  {faq.q}
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-muted transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  />
                </button>
              </h3>
              <div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-btn-${i}`}
                className="grid transition-[grid-template-rows,opacity] duration-200 ease-out"
                style={{
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div className="overflow-hidden">
                  <p className="px-4 pb-3 text-sm leading-relaxed text-muted sm:px-5 sm:pb-4">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
