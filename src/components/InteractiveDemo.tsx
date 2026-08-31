import { useCallback, useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { RotateCcw } from "lucide-react";

import { useReducedMotion } from "../hooks/useTheme";

import { CAPTURE_TEXT, CONTEXT_CHIP, DEFAULT_HOTKEY } from "../lib/constants";

import { TangentMark } from "./TangentLogo";

import {

  AppMock,

  AppWindow,

  DesktopNotification,

} from "./demo/AppMock";

import { DemoAmbient, HotkeyRipple, PhaseIndicator } from "./demo/DemoStage";
import { DemoScaleFrame } from "./demo/DemoScaleFrame";
import { VoiceHud } from "./demo/VoiceHud";



const TIMELINE = [

  { phase: "editor" as const, duration: 1100 },

  { phase: "hotkey" as const, duration: 650 },

  { phase: "voice-in" as const, duration: 400 },

  { phase: "voice-listen" as const, duration: 1700 },

  { phase: "voice-release" as const, duration: 550 },

  { phase: "capture-in" as const, duration: 400 },

  { phase: "typing" as const, duration: CAPTURE_TEXT.length * 46 },

  { phase: "context" as const, duration: 750 },

  { phase: "submit" as const, duration: 320 },

  { phase: "linger" as const, duration: 1000 },

  { phase: "timer" as const, duration: 1100 },

  { phase: "triage" as const, duration: 1000 },

  { phase: "sort" as const, duration: 1900 },

  { phase: "board" as const, duration: 1500 },

  { phase: "notify" as const, duration: 2400 },

  { phase: "logo" as const, duration: 2600 },

  { phase: "pause" as const, duration: 1200 },

] as const;



type Phase = (typeof TIMELINE)[number]["phase"];



const sceneVariants = {

  enter: { opacity: 0, scale: 0.94, y: 28, filter: "blur(8px)" },

  center: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" },

  exit: { opacity: 0, scale: 1.03, y: -20, filter: "blur(6px)" },

};



function MockEditor({ showCaret, dimmed }: { showCaret: boolean; dimmed?: boolean }) {

  return (

    <motion.div

      className="flex h-full min-h-[480px] font-mono text-sm leading-relaxed lg:text-[15px]"

      animate={{ opacity: dimmed ? 0.45 : 1 }}

      transition={{ duration: 0.35 }}

    >

      <div className="select-none border-r border-app-stroke py-6 pr-4 pl-5 text-right text-app-faint">

        {Array.from({ length: 12 }, (_, i) => (

          <div key={i + 1} className="leading-7">

            {i + 1}

          </div>

        ))}

      </div>

      <div className="flex-1 overflow-hidden py-6 pr-8">

        <div className="text-app-muted">

          <span className="text-[#c586c0]">import</span>{" "}

          <span className="text-app-heading">{"{ fetchWithRetry }"}</span>{" "}

          <span className="text-[#c586c0]">from</span>{" "}

          <span className="text-[#ce9178]">&apos;./http&apos;</span>;

        </div>

        <div className="mt-1 text-app-muted">

          <span className="text-app-accent">export async function</span>{" "}

          <span className="text-[#dcdcaa]">retryWithBackoff</span>

          <span>(req: Request) {"{"}</span>

        </div>

        <div className="pl-4 text-app-muted sm:pl-6">

          <span className="text-app-accent">const</span> res ={" "}

          <span className="text-app-accent">await</span> fetch(url);

        </div>

        <div className="pl-4 text-app-muted sm:pl-6">

          <span className="text-app-accent">if</span> (res.status === 429) {"{"}

        </div>

        <div className="flex pl-8 text-app-heading sm:pl-10">

          <span className="text-app-faint">// handle rate limit</span>

          {showCaret && (

            <span className="ml-0.5 inline-block h-[1.1em] w-[2px] animate-blink bg-app-accent" />

          )}

        </div>

        <div className="pl-4 text-app-muted sm:pl-6">{"}"}</div>

        <div className="pl-4 text-app-muted sm:pl-6">

          <span className="text-app-accent">return</span> res;

        </div>

        <div className="text-app-muted">{"}"}</div>

      </div>

    </motion.div>

  );

}



function CaptureBar({

  visible,

  text,

  showContext,

  exiting,

  glowing,

  fromVoice,

}: {

  visible: boolean;

  text: string;

  showContext: boolean;

  exiting: boolean;

  glowing?: boolean;

  fromVoice?: boolean;

}) {

  return (

    <AnimatePresence>

      {visible && !exiting && (

        <motion.div

          className="absolute inset-x-4 top-[32%] z-20 sm:inset-x-10 lg:inset-x-14"

          initial={{ opacity: 0, y: -40, scale: 0.88 }}

          animate={{ opacity: 1, y: 0, scale: 1 }}

          exit={{ opacity: 0, y: -24, scale: 0.95 }}

          transition={{ type: "spring", stiffness: 380, damping: 26 }}

        >

          <motion.div

            className={`flex items-center gap-3 rounded-2xl border border-app-stroke border-t-[3px] border-t-app-accent bg-app-surface/98 px-4 py-3 backdrop-blur-md sm:px-5 sm:py-3.5 ${

              glowing ? "capture-bar-glow" : ""

            }`}

            animate={glowing ? { scale: [1, 1.01, 1] } : {}}

            transition={{ duration: 0.6 }}

          >

            <motion.span

              className={`h-2 w-2 shrink-0 rounded-full ${fromVoice ? "bg-app-idea" : "bg-app-accent"}`}

              animate={{ opacity: [1, 0.4, 1] }}

              transition={{ duration: 1, repeat: Infinity }}

            />

            <span className="min-w-0 flex-1 font-sans text-sm text-app-heading sm:text-base lg:text-lg">

              {text}

              {text.length < CAPTURE_TEXT.length && (

                <span className="ml-px inline-block h-[1em] w-[2px] animate-blink bg-app-accent" />

              )}

            </span>

            {fromVoice && text.length > 0 && !showContext && (

              <span className="shrink-0 rounded-md bg-app-surface-muted px-2 py-0.5 text-[10px] font-medium text-app-idea sm:text-xs">

                voice

              </span>

            )}

            <AnimatePresence>

              {showContext && (

                <motion.span

                  initial={{ opacity: 0, scale: 0.5, x: -12 }}

                  animate={{ opacity: 1, scale: 1, x: 0 }}

                  transition={{ type: "spring", stiffness: 500, damping: 18 }}

                  className="shrink-0 rounded-lg bg-app-accent-dim px-2.5 py-1 font-mono text-[10px] text-app-accent sm:text-xs"

                >

                  {CONTEXT_CHIP}

                </motion.span>

              )}

            </AnimatePresence>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>

  );

}



function KeycapChord({ pressed }: { pressed: boolean }) {

  return (

    <motion.div

      className="absolute -top-14 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 sm:-top-16 sm:gap-2.5"

      initial={false}

      animate={{ opacity: pressed ? 1 : 0, y: pressed ? 0 : 12, scale: pressed ? 1 : 0.9 }}

      transition={{ type: "spring", stiffness: 400, damping: 22 }}

    >

      {DEFAULT_HOTKEY.map((key, i) => (

        <motion.span

          key={key}

          className="rounded-lg border border-app-stroke bg-app-surface-raised px-2.5 py-1.5 font-mono text-[10px] font-medium text-app-heading shadow-lg sm:px-3 sm:py-2 sm:text-xs"

          initial={false}

          animate={{ y: pressed ? 3 : 0 }}

          transition={{ type: "spring", stiffness: 600, damping: 18, delay: i * 0.04 }}

        >

          {key}

        </motion.span>

      ))}

    </motion.div>

  );

}



function TimerOverlay({ visible }: { visible: boolean }) {

  return (

    <AnimatePresence>

      {visible && (

        <motion.div

          className="absolute inset-0 z-30 flex items-center justify-center bg-app-canvas/75 backdrop-blur-sm"

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          exit={{ opacity: 0 }}

        >

          {[0, 1, 2].map((i) => (

            <motion.div

              key={i}

              className="absolute h-32 w-32 rounded-full border-2 border-app-accent/30 sm:h-40 sm:w-40"

              initial={{ scale: 0.5, opacity: 0.8 }}

              animate={{ scale: 2.2, opacity: 0 }}

              transition={{ duration: 1.2, delay: i * 0.25, ease: "easeOut" }}

            />

          ))}

          <motion.div

            className="relative text-center"

            initial={{ scale: 0.5, opacity: 0 }}

            animate={{ scale: 1, opacity: 1 }}

            transition={{ type: "spring", stiffness: 280, damping: 18 }}

          >

            <motion.span

              className="block font-mono text-5xl font-semibold tracking-tight text-app-accent sm:text-7xl"

              animate={{ scale: [1, 1.06, 1] }}

              transition={{ duration: 0.8, repeat: 1 }}

            >

              1.4s

            </motion.span>

            <motion.span

              className="mt-2 block text-xs uppercase tracking-[0.2em] text-app-muted sm:text-sm"

              initial={{ opacity: 0, y: 8 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ delay: 0.2 }}

            >

              Back in your editor

            </motion.span>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>

  );

}



function LogoReveal({ visible }: { visible: boolean }) {

  return (

    <AnimatePresence>

      {visible && (

        <motion.div

          className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-app-canvas"

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

        >

          <motion.div

            className="absolute h-48 w-48 rounded-full border border-app-accent/20"

            initial={{ scale: 0, opacity: 0.8 }}

            animate={{ scale: 2.5, opacity: 0 }}

            transition={{ duration: 1.4, ease: "easeOut" }}

          />

          <motion.div

            initial={{ scale: 0.4, opacity: 0, rotate: -12 }}

            animate={{ scale: 1, opacity: 1, rotate: 0 }}

            transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.05 }}

          >

            <TangentMark size={72} />

          </motion.div>

          <motion.p

            className="mt-5 font-sans text-3xl font-bold text-app-heading"

            initial={{ opacity: 0, y: 12 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ delay: 0.25, type: "spring", stiffness: 300 }}

          >

            Tangent

          </motion.p>

          <motion.p

            className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-app-accent sm:text-xs"

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            transition={{ delay: 0.45 }}

          >

            Catch the thought. Keep the flow.

          </motion.p>

        </motion.div>

      )}

    </AnimatePresence>

  );

}



function useDemoTimeline(enabled: boolean, onCycle: () => void) {

  const [phase, setPhase] = useState<Phase>("editor");

  const [stepIndex, setStepIndex] = useState(0);

  const [typedChars, setTypedChars] = useState(0);

  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null);



  const reset = useCallback(() => {

    if (typingRef.current) clearInterval(typingRef.current);

    setPhase("editor");

    setStepIndex(0);

    setTypedChars(0);

  }, []);



  useEffect(() => {

    if (!enabled) return;

    const step = TIMELINE[stepIndex];

    if (!step) {

      onCycle();

      reset();

      return;

    }

    setPhase(step.phase);

    if (step.phase === "typing") {

      setTypedChars(0);

      const interval = setInterval(() => {

        setTypedChars((c) => {

          if (c >= CAPTURE_TEXT.length) {

            clearInterval(interval);

            return c;

          }

          return c + 1;

        });

      }, 46);

      typingRef.current = interval;

    }

    const timer = setTimeout(() => setStepIndex((i) => i + 1), step.duration);

    return () => {

      clearTimeout(timer);

      if (typingRef.current) {

        clearInterval(typingRef.current);

        typingRef.current = null;

      }

    };

  }, [enabled, stepIndex, onCycle, reset]);



  return { phase, typedChars, reset };

}



export function InteractiveDemo() {

  const reduced = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);

  const [cycle, setCycle] = useState(0);

  const [playing, setPlaying] = useState(false);



  useEffect(() => {

    const el = containerRef.current;

    if (!el) return;

    const obs = new IntersectionObserver(

      ([entry]) => {

        if (entry.isIntersecting && !reduced) setPlaying(true);

      },

      { threshold: 0.35 },

    );

    obs.observe(el);

    return () => obs.disconnect();

  }, [reduced]);



  const handleCycle = useCallback(() => setCycle((c) => c + 1), []);

  const { phase, typedChars, reset } = useDemoTimeline(playing && !reduced, handleCycle);



  const handleReplay = () => {

    reset();

    setCycle((c) => c + 1);

    setPlaying(true);

  };



  const inEditor = [

    "editor", "hotkey", "voice-in", "voice-listen", "voice-release",

    "capture-in", "typing", "context",

    "submit", "linger", "timer",

  ].includes(phase);

  const inApp = ["triage", "sort", "board", "notify"].includes(phase);

  const showHotkey = phase === "hotkey";

  const showVoice = ["voice-in", "voice-listen", "voice-release"].includes(phase);

  const voiceReleasing = phase === "voice-release";

  const showCapture = ["capture-in", "typing", "context", "submit"].includes(phase);

  const showContext = ["context", "submit"].includes(phase);

  const captureExiting = phase === "linger";

  const captureGlowing = phase === "context" || phase === "submit";

  const editorDimmed = showCapture || showVoice;

  const fromVoice = ["capture-in", "typing", "context", "submit"].includes(phase);

  const showCaret = inEditor && phase !== "timer";

  const showTimer = phase === "timer";

  const showLogoScene = phase === "logo" || phase === "pause";

  const showNotify = phase === "notify" || showLogoScene;

  const typedText = CAPTURE_TEXT.slice(0, typedChars);



  return (

    <section

      id="demo"

      ref={containerRef}

      className="relative h-svh max-h-svh snap-start snap-always overflow-hidden"

    >

      <DemoAmbient />



      <div className="relative z-10 flex h-full min-h-0 w-full flex-col pt-16 pb-3 sm:pt-20 sm:pb-4">

        <div className="mx-auto flex h-full min-h-0 w-full max-w-6xl flex-1 px-4 sm:px-6">

          <DemoScaleFrame>

            <div className="flex h-[700px] w-[1024px] flex-col">

              <div className="mb-4 flex shrink-0 items-end justify-between gap-4">

                <div>

                  <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl lg:text-5xl">

                    See it in action

                  </h2>

                  <p className="mt-2 text-sm text-muted sm:text-base">

                    Hold the hotkey and speak — or type. Capture → triage → resurface.

                  </p>

                </div>

                {!reduced && (

                  <button

                    type="button"

                    onClick={handleReplay}

                    className="flex shrink-0 items-center gap-1.5 rounded-xl border border-border bg-surface/80 px-4 py-2.5 text-xs text-muted backdrop-blur-sm transition-colors hover:bg-surface hover:text-ink sm:text-sm"

                    aria-label="Replay demo"

                  >

                    <RotateCcw className="h-4 w-4" />

                    Replay

                  </button>

                )}

              </div>



              <div className="relative h-[540px] shrink-0" style={{ perspective: 1400 }}>

                <HotkeyRipple visible={showHotkey} />



                {reduced ? (

                  <div className="relative h-full w-full">

                    <AppMock view="board" showTriageCard triageSelected sorted boardCard />

                    <DesktopNotification visible />

                  </div>

                ) : (

                  <div key={cycle} className="relative h-full w-full">

                    <AnimatePresence mode="wait">

                    {inEditor && !showLogoScene && (

                      <motion.div

                        key="editor-scene"

                        className="absolute inset-0 h-full"

                        variants={sceneVariants}

                        initial="enter"

                        animate="center"

                        exit="exit"

                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}

                      >

                        <AppWindow title="retry.ts — VS Code">

                          <div className="relative min-h-[480px] bg-app-canvas">

                            <MockEditor showCaret={showCaret} dimmed={editorDimmed} />

                            <KeycapChord pressed={showHotkey} />

                            <VoiceHud visible={showVoice} releasing={voiceReleasing} />

                            <CaptureBar

                              visible={showCapture}

                              text={typedText}

                              showContext={showContext}

                              exiting={captureExiting}

                              glowing={captureGlowing}

                              fromVoice={fromVoice}

                            />

                            <TimerOverlay visible={showTimer} />

                          </div>

                        </AppWindow>

                      </motion.div>

                    )}

                    {inApp && !showLogoScene && (

                      <motion.div

                        key="app-scene"

                        className="absolute inset-0 h-full"

                        variants={sceneVariants}

                        initial="enter"

                        animate="center"

                        exit="exit"

                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}

                      >

                        <AppMock

                          view={phase === "board" || phase === "notify" ? "board" : "triage"}

                          showTriageCard

                          triageSelected={phase === "triage" || phase === "sort"}

                          sorted={phase === "sort" || phase === "board" || phase === "notify"}

                          boardCard={phase === "board" || phase === "notify"}

                        />

                        <DesktopNotification visible={showNotify} />

                      </motion.div>

                    )}

                    {showLogoScene && (

                      <motion.div

                        key="logo-scene"

                        className="absolute inset-0 h-full"

                        variants={sceneVariants}

                        initial="enter"

                        animate="center"

                        exit="exit"

                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}

                      >

                        <AppWindow>

                          <div className="relative min-h-[480px] w-full">

                            <LogoReveal visible />

                          </div>

                        </AppWindow>

                      </motion.div>

                    )}

                </AnimatePresence>

                  </div>

                )}

              </div>



              {!reduced && (

                <div className="flex shrink-0 items-end justify-center pt-3">

                  <PhaseIndicator phase={phase} />

                </div>

              )}

            </div>

          </DemoScaleFrame>

        </div>

      </div>

    </section>

  );

}


