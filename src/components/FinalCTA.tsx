import { DownloadButton, MacDownloadButton } from "./CTA";
import { Section } from "./Section";

export function FinalCTA() {
  return (
    <Section
      id="get-started"
      className="!min-h-0 border-t border-border bg-ink py-20 text-canvas sm:py-24"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl tracking-tight text-canvas sm:text-4xl">
          Catch the thought. Keep the flow.
        </h2>
        <p className="mt-4 text-sm text-canvas/70 sm:text-base">
          Free to try on Windows and Mac. No account. Your data stays yours.
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <DownloadButton />
          <MacDownloadButton />
        </div>
      </div>
    </Section>
  );
}
