import type { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50">
      <div className="bg-orb pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-400/20 blur-3xl sm:h-96 sm:w-96" />
      <div className="bg-orb bg-orb--slow pointer-events-none absolute -bottom-32 right-[-6rem] h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl sm:h-[28rem] sm:w-[28rem]" />
      <div className="relative flex min-h-screen items-start justify-center px-4 py-8 sm:px-6 lg:items-center lg:py-12">
        <div className="app-shell w-full max-w-md sm:max-w-lg lg:max-w-xl">{children}</div>
      </div>
    </div>
  );
}
