import { motion, AnimatePresence } from "framer-motion";
import {
  Crosshair,
  LayoutGrid,
  Gem,
  Settings,
  Moon,
} from "lucide-react";
import { TangentMark } from "../TangentLogo";
import { CAPTURE_TEXT, CONTEXT_CHIP } from "../../lib/constants";

const NAV = [
  { id: "triage" as const, label: "Triage", icon: Crosshair },
  { id: "board" as const, label: "Board", icon: LayoutGrid },
  { id: "stats" as const, label: "Stats", icon: Gem },
  { id: "settings" as const, label: "Settings", icon: Settings },
];

type AppView = "triage" | "board";

export function AppWindow({
  children,
  title = "Tangent",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="demo-window-shell flex h-full flex-col overflow-hidden rounded-2xl border border-app-stroke bg-app-surface lg:rounded-3xl">
      <div className="flex items-center justify-between border-b border-app-stroke bg-app-surface-raised px-4 py-2.5">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="font-sans text-xs text-app-muted sm:text-sm">{title}</span>
        <div className="flex gap-2 text-[10px] text-app-muted">
          <span>─</span>
          <span>□</span>
          <span>×</span>
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );
}

function Sidebar({ active }: { active: AppView }) {
  return (
    <aside className="flex w-[168px] shrink-0 flex-col border-r border-app-stroke bg-app-surface py-5">
      <div className="mb-6 flex items-center gap-2.5 px-3 sm:px-4">
        <TangentMark size={32} />
        <span className="font-sans text-[15px] font-bold tracking-tight text-app-heading">
          Tangent
        </span>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 px-2">
        {NAV.map((item) => {
          const showActive =
            (active === "triage" && item.id === "triage") ||
            (active === "board" && item.id === "board");
          return (
            <div
              key={item.id}
              className={`flex items-center gap-2 rounded-r-md border-l-2 py-2 pl-2.5 pr-2 text-[13px] font-medium ${
                showActive
                  ? "border-app-accent bg-app-surface-muted text-app-heading"
                  : "border-transparent text-app-muted"
              }`}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </div>
          );
        })}
      </nav>
      <div className="mx-2 mt-auto rounded-md border border-app-stroke bg-app-surface-muted px-2 py-2">
        <div className="flex items-center gap-1.5 text-[11px] text-app-muted">
          <Moon className="h-3.5 w-3.5" />
          <span>Dark</span>
        </div>
      </div>
    </aside>
  );
}

function ThoughtCard({
  body,
  context,
  selected = false,
  due,
}: {
  body: string;
  context: string;
  selected?: boolean;
  due?: string;
}) {
  return (
    <div
      className={`relative rounded-xl border bg-app-surface px-3 py-3 sm:px-4 ${
        selected ? "border-app-accent" : "border-app-stroke"
      }`}
    >
      {selected && (
        <span className="absolute bottom-3 left-0 top-3 w-[3px] rounded-r bg-app-accent" />
      )}
      <p className="text-sm leading-snug text-app-heading sm:text-base">{body}</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {due && (
          <span className="rounded-md bg-app-success-soft px-1.5 py-0.5 text-[9px] text-app-success sm:text-[11px]">
            {due}
          </span>
        )}
        <span className="rounded-md bg-app-surface-muted px-1.5 py-0.5 text-[9px] text-app-muted sm:text-[11px]">
          {context}
        </span>
      </div>
    </div>
  );
}

export function TriageView({
  showCard,
  selected,
  sorted,
}: {
  showCard: boolean;
  selected: boolean;
  sorted: boolean;
}) {
  return (
    <div className="flex-1 overflow-hidden p-4 sm:p-7">
      <h2 className="text-xl font-semibold text-app-heading sm:text-2xl">Triage</h2>
      <p className="mt-1 text-[11px] text-app-muted sm:text-xs">
        {showCard ? "1 parked" : "0 parked"} · hold{" "}
        <strong className="text-app-body">Ctrl + Shift + Space</strong> to speak · j/k · 1-5
      </p>

      <div className="mt-4 flex items-center gap-3 rounded-2xl border border-app-stroke border-t-[3px] border-t-app-accent bg-app-surface px-4 py-2 sm:mt-5 sm:px-5 sm:py-2.5">
        <input
          readOnly
          placeholder="Jot a quick thought and press Enter…"
          className="min-w-0 flex-1 bg-transparent text-sm text-app-heading placeholder:text-app-faint sm:text-base"
        />
        <button
          type="button"
          className="shrink-0 rounded-lg bg-app-accent px-4 py-2 text-xs font-semibold text-white sm:text-sm"
        >
          Add
        </button>
      </div>

      <div className="mt-4 min-h-[120px] sm:mt-5">
        <AnimatePresence>
          {!showCard ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex min-h-[80px] items-center justify-center rounded-xl border border-dashed border-app-stroke px-4 text-center text-[10px] leading-relaxed text-app-muted sm:text-[13px]"
            >
              Inbox at zero. Nice.
            </motion.div>
          ) : (
            <motion.div
              key="card"
              initial={{ opacity: 0, y: 24, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
            >
              <ThoughtCard
                body={CAPTURE_TEXT}
                context={CONTEXT_CHIP}
                selected={selected}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showCard && (
        <motion.div
          className="mt-3 flex flex-wrap gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: sorted ? 1 : 0.5 }}
        >
          {[
            { n: 1, label: "Do Now", color: "text-app-now" },
            { n: 2, label: "Do Soon", color: "text-app-soon" },
            { n: 3, label: "Later", color: "text-app-later" },
            { n: 4, label: "Idea", color: "text-app-idea" },
            { n: 5, label: "Drop", color: "text-app-muted" },
          ].map((b) => (
            <motion.span
              key={b.n}
              className={`rounded-md border px-2 py-1 text-[9px] font-medium sm:text-[11px] ${
                sorted && b.n === 1
                  ? "border-app-accent bg-app-accent-dim text-app-accent"
                  : "border-app-stroke bg-app-surface-muted text-app-muted"
              }`}
              animate={sorted && b.n === 1 ? { scale: [1, 1.12, 1], boxShadow: ["0 0 0 0 rgba(98,104,232,0)", "0 0 20px 4px rgba(98,104,232,0.4)", "0 0 0 0 rgba(98,104,232,0)"] } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className={`font-mono ${b.color}`}>{b.n}</span> {b.label}
            </motion.span>
          ))}
        </motion.div>
      )}
      {sorted && (
        <motion.p
          className="mt-2 text-center font-mono text-[9px] text-app-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Pressed <kbd className="rounded border border-app-stroke px-1">1</kbd> → Do Now
        </motion.p>
      )}
    </div>
  );
}

export function BoardView({ showCard }: { showCard: boolean }) {
  const cols = [
    { name: "Do Now", dot: "bg-app-now", hasCard: showCard },
    { name: "Do Soon", dot: "bg-app-soon", hasCard: false },
    { name: "Later", dot: "bg-app-later", hasCard: false },
    { name: "Idea", dot: "bg-app-idea", hasCard: false },
  ];

  return (
    <div className="flex-1 overflow-hidden p-4 sm:p-7">
      <h2 className="text-xl font-semibold text-app-heading sm:text-2xl">Priority board</h2>
      <p className="mt-1 text-[11px] text-app-muted sm:text-xs">
        {showCard ? "1 active" : "0 active"} · 0 done
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4 sm:gap-3">
        {cols.map((col) => (
          <div
            key={col.name}
            className="rounded-xl border border-app-stroke bg-app-surface-muted p-2 sm:p-3"
          >
            <div className="mb-2 flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${col.dot}`} />
              <span className="text-[10px] font-medium text-app-heading sm:text-[12px]">
                {col.name}
              </span>
            </div>
            {col.hasCard ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              >
                <ThoughtCard
                  body={CAPTURE_TEXT}
                  context={CONTEXT_CHIP}
                  due="due tomorrow, 9:00 AM"
                />
              </motion.div>
            ) : (
              <p className="py-4 text-center text-[9px] text-app-faint sm:text-[11px]">
                Drop here
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function AppMock({
  view,
  showTriageCard,
  triageSelected,
  sorted,
  boardCard,
}: {
  view: AppView;
  showTriageCard: boolean;
  triageSelected: boolean;
  sorted: boolean;
  boardCard: boolean;
}) {
  return (
    <AppWindow>
      <div className="flex h-full min-h-[480px] bg-app-canvas">
        <Sidebar active={view} />
        {view === "triage" ? (
          <TriageView
            showCard={showTriageCard}
            selected={triageSelected}
            sorted={sorted}
          />
        ) : (
          <BoardView showCard={boardCard} />
        )}
      </div>
    </AppWindow>
  );
}

export function DesktopNotification({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute right-3 top-3 z-40 w-[260px] rounded-xl border border-app-stroke bg-app-surface p-4 shadow-2xl sm:right-5 sm:top-5 sm:w-[300px]"
          initial={{ opacity: 0, x: 80, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          exit={{ opacity: 0, x: 40, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 340, damping: 24 }}
        >
          <motion.div
            className="absolute -left-1 top-6 h-3 w-3 rounded-full bg-app-accent"
            animate={{ scale: [1, 1.8, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <TangentMark size={20} />
              <span className="text-xs font-semibold text-app-heading sm:text-sm">
                Tangent
              </span>
            </div>
            <span className="text-[10px] text-app-faint">×</span>
          </div>
          <p className="mt-2 text-xs leading-snug text-app-heading sm:text-sm">
            {CAPTURE_TEXT}
          </p>
          <p className="mt-1 font-mono text-[8px] text-app-muted sm:text-[10px]">
            {CONTEXT_CHIP} · due tomorrow
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
