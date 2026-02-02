import type { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-full bg-slate-950 text-slate-50">
      <div className="mx-auto w-full max-w-md px-4 py-6">{children}</div>
    </div>
  );
}
