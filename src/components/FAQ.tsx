import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is it free?",
    a: "Yes. Voice, triage, reminders, and calendar export are included. No account and no paywall.",
  },
  {
    q: "Is there a Mac version?",
    a: "Yes — Apple Silicon (M1 and later). Download the .dmg from the buttons above. Intel Macs are not in this build yet.",
  },
  {
    q: "Does it work offline?",
    a: "Capture, triage, and on-device voice work without a network. The app checks GitHub for updates, and optional calendar sync uses the internet. We don't collect analytics.",
  },
  {
    q: "Do you see my thoughts or my screen?",
    a: "No. Thoughts stay in a local SQLite file. Context is app name + window title — not screenshots or keystrokes. Calendar sync is opt-in.",
  },
  {
    q: 'What exactly is "work context"?',
    a: "The app in focus, window title, and timestamp — so you remember why you had the thought.",
  },
  {
    q: "Will it slow my machine down?",
    a: "Built with Tauri (Rust + native WebView), not bundled Chromium — meant to stay light in the tray.",
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
