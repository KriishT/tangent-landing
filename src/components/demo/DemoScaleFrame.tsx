import { useEffect, useRef, useState, type ReactNode } from "react";

/** Fixed canvas size — the demo always renders at this size and scales down to fit. */
export const DEMO_DESIGN_WIDTH = 1024;
export const DEMO_DESIGN_HEIGHT = 540;

export function DemoScaleFrame({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      const s = Math.min(
        width / DEMO_DESIGN_WIDTH,
        height / DEMO_DESIGN_HEIGHT,
        1,
      );
      setScale(s);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex w-full min-h-0 flex-1 items-center justify-center"
    >
      <div
        className="relative shrink-0"
        style={{
          width: DEMO_DESIGN_WIDTH * scale,
          height: DEMO_DESIGN_HEIGHT * scale,
        }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: DEMO_DESIGN_WIDTH,
            height: DEMO_DESIGN_HEIGHT,
            transform: `scale(${scale})`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
