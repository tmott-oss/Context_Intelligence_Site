import type { ReactNode } from "react";

export function Eyebrow({ children, dark = false, centered = false }: { children: ReactNode; dark?: boolean; centered?: boolean }) {
  return <p className={`eyebrow${dark ? " eyebrow--dark" : ""}${centered ? " eyebrow--centered" : ""}`}>{children}</p>;
}
