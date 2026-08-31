import type { ReactNode } from "react";

/** One scroll-snap viewport containing multiple content blocks. */
export function SectionGroup({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`flex min-h-screen snap-start snap-always flex-col justify-center px-5 py-20 sm:px-6 sm:py-24 ${className}`}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 lg:gap-16">
        {children}
      </div>
    </section>
  );
}

/** A block inside a SectionGroup — optional top divider for separation. */
export function SectionBlock({
  id,
  children,
  divider = false,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  divider?: boolean;
  className?: string;
}) {
  return (
    <div id={id} className={className}>
      {divider && (
        <div className="mb-10 flex items-center gap-4 lg:mb-14" aria-hidden>
          <div className="h-px flex-1 bg-border" />
        </div>
      )}
      {children}
    </div>
  );
}
