import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  snap?: boolean;
};

/** Full-viewport section for hero, demo, and CTA only. */
export function Section({
  id,
  children,
  className = "",
  snap = true,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`flex min-h-screen flex-col justify-center px-5 py-20 sm:px-6 ${
        snap ? "snap-start snap-always" : ""
      } ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
