import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

/** Fixed canvas — header, demo window, and phase bar render at this size and scale down together. */
export const DEMO_SECTION_WIDTH = 1024;
export const DEMO_SECTION_HEIGHT = 700;

export function DemoScaleFrame({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      const s = Math.min(
        width / DEMO_SECTION_WIDTH,
        height / DEMO_SECTION_HEIGHT,
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
      className="flex h-full w-full min-h-0 items-center justify-center"
    >
      <div
        className="relative shrink-0"
        style={{
          width: DEMO_SECTION_WIDTH * scale,
          height: DEMO_SECTION_HEIGHT * scale,
        }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: DEMO_SECTION_WIDTH,
            height: DEMO_SECTION_HEIGHT,
            transform: `scale(${scale})`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
