import type { LucideIcon } from "lucide-react";

type IconBoxProps = {
  icon: LucideIcon;
  size?: "sm" | "md";
  className?: string;
};

const sizes = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
};

const iconSizes = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
};

/** Square icon container — prevents stretch in flex rows. */
export function IconBox({ icon: Icon, size = "md", className = "" }: IconBoxProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-xl border border-border bg-accent-dim text-accent ${sizes[size]} ${className}`}
      aria-hidden
    >
      <Icon className={iconSizes[size]} strokeWidth={2} />
    </span>
  );
}
