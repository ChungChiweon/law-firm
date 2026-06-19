"use client";

import { usePathname } from "next/navigation";

export function SunSweep() {
  const pathname = usePathname();

  return (
    <div
      key={pathname}
      aria-hidden="true"
      className="animate-sun-sweep pointer-events-none absolute z-20"
      style={{
        top: 0,
        bottom: 0,
        right: "-200%",
        width: "200%",
        background:
          "linear-gradient(105deg," +
          "transparent 0%," +
          "rgba(255,252,240,0.28) 25%," +
          "rgba(255,255,252,0.55) 45%," +
          "rgba(255,255,255,0.65) 50%," +
          "rgba(255,255,252,0.55) 55%," +
          "rgba(255,252,240,0.28) 75%," +
          "transparent 100%)",
      }}
    />
  );
}
