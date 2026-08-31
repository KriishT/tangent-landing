import { Shield, Database, Mic, EyeOff } from "lucide-react";
import { IconBox } from "./IconBox";

const points = [
  {
    icon: Shield,
    title: "No account. No cloud. No telemetry.",
    body: "Tangent never phones home. Your thoughts stay on your machine.",
  },
  {
    icon: Database,
    title: "Your data, your SQLite file.",
    body: "Plain SQLite you can back up, browse, or delete. Export anytime.",
  },
  {
    icon: Mic,
    title: "On-device voice, if you want it.",
    body: "Optional voice capture runs entirely local with Whisper.",
  },
  {
    icon: EyeOff,
    title: "Context capture is yours to control.",
    body: "Toggle work context off entirely or blocklist specific apps.",
  },
];

export function Privacy() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 sm:p-8">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Privacy</p>
          <h2 className="mt-2 font-display text-2xl tracking-tight text-ink sm:text-3xl">
            Local-first isn&apos;t a footnote. It&apos;s a promise.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            Half-formed thoughts and work context shouldn&apos;t live on someone else&apos;s server.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {points.map((p) => (
            <div key={p.title} className="flex items-start gap-3">
              <IconBox icon={p.icon} size="sm" />
              <div className="min-w-0">
                <h3 className="text-sm font-semibold leading-snug text-ink">{p.title}</h3>
                <p className="mt-1 text-sm text-muted">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
