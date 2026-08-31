import { useId } from "react";

type TangentLogoProps = {
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  className?: string;
  animate?: boolean;
};

const sizes = { sm: 24, md: 32, lg: 48 };

/** Inline SVG mark — orbit ring + tangent ray branching off to be caught. */
export function TangentMark({
  size = 32,
  className,
  monochrome = false,
}: {
  size?: number;
  className?: string;
  monochrome?: boolean;
}) {
  const gid = useId().replace(/:/g, "");

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {!monochrome && (
        <defs>
          <linearGradient id={`${gid}-bg`} x1="4" y1="29" x2="28" y2="3" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2a3478" />
            <stop offset="0.45" stopColor="#4a5bb8" />
            <stop offset="1" stopColor="#7b8fe8" />
          </linearGradient>
        </defs>
      )}
      <rect
        width="32"
        height="32"
        rx="7"
        fill={monochrome ? "currentColor" : `url(#${gid}-bg)`}
        className={monochrome ? "text-ink" : undefined}
      />
      <circle
        cx="12.25"
        cy="19.6"
        r="6.7"
        stroke="var(--canvas)"
        strokeWidth="3.35"
        strokeLinecap="round"
        strokeDasharray="31.5 10.6"
        strokeDashoffset="3.7"
      />
      <line
        x1="16.8"
        y1="15.1"
        x2="23.4"
        y2="8.5"
        stroke="var(--canvas)"
        strokeWidth="3.35"
        strokeLinecap="round"
      />
      <circle cx="16.8" cy="15.1" r="1.6" fill="var(--canvas)" />
    </svg>
  );
}

export function TangentLogo({
  size = "md",
  showWordmark = true,
  className = "",
}: TangentLogoProps) {
  const px = sizes[size];

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`} aria-label="Tangent">
      <TangentMark size={px} />
      {showWordmark && (
        <span className="font-display text-[1.35em] tracking-tight text-ink">
          Tangent
        </span>
      )}
    </div>
  );
}
