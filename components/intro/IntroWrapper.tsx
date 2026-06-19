"use client";

import { useIntro } from "@/hooks/useIntro";
import { IntroScreen } from "@/components/intro/IntroScreen";

function getReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function IntroWrapper({ children }: { children: React.ReactNode }) {
  const { state, enter } = useIntro();
  const reducedMotion = getReducedMotion();

  const isDone = state === "done";

  return (
    <>
      {/* 인트로 오버레이 */}
      <IntroScreen state={state} onEnter={enter} reducedMotion={reducedMotion} />

      {/* 랜딩페이지 — 인트로 중 숨김, 헤더 포함 */}
      <div
        style={{
          opacity: isDone ? 1 : 0,
          transition: isDone ? "opacity 600ms ease-out" : "none",
          pointerEvents: isDone ? "auto" : "none",
          visibility: isDone ? "visible" : "hidden",
        }}
      >
        {children}
      </div>
    </>
  );
}
