"use client";

import { useEffect, useCallback } from "react";

// ══════════════════════════════════════════════════════════════
// 빠른 이탈(안전 탈출) 버튼
// ──────────────────────────────────────────────────────────────
// 가해자가 옆에 있을 수 있는 피해자를 위한 안전 기능입니다.
//   · 버튼 클릭 또는 ESC 키 → 즉시 무해한 페이지(네이버)로 전환
//   · location.replace 사용 → 뒤로가기로 이 사이트가 다시 열리지 않음
//   · 새 탭에 검색 결과를 띄워 화면을 자연스럽게 가림
// 모든 페이지에 항상 노출됩니다. (app/layout.tsx에서 렌더)
// ══════════════════════════════════════════════════════════════

// 전환될 무해한 사이트 (필요 시 교체 가능)
const SAFE_URL = "https://www.naver.com";
// ESC 키로도 이탈 (true 권장)
const ENABLE_ESC = true;

export function QuickExit() {
  const escape = useCallback(() => {
    try {
      // 1) 새 탭에 평범한 검색 화면을 띄워 시선을 돌림 (팝업 차단 시 무시)
      window.open("https://search.naver.com/search.naver?query=날씨", "_blank");
    } catch {
      /* 무시 */
    }
    // 2) 현재 탭을 히스토리에서 교체 → 뒤로가기로 돌아오지 못하게 함
    window.location.replace(SAFE_URL);
  }, []);

  useEffect(() => {
    if (!ENABLE_ESC) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        escape();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [escape]);

  return (
    <button
      type="button"
      onClick={escape}
      aria-label="빠른 나가기 — 이 사이트를 즉시 닫고 다른 페이지로 이동합니다"
      className="fixed right-4 top-12 z-[100] inline-flex items-center gap-1.5 rounded-full bg-slate-900/90 px-4 py-2.5 text-sm font-bold text-white shadow-lg ring-1 ring-white/20 backdrop-blur transition-all hover:bg-red-600 active:scale-95 sm:right-6 print:hidden"
    >
      <XIcon />
      <span>빠른 나가기</span>
      <kbd className="ml-0.5 hidden rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-semibold leading-none sm:inline">
        ESC
      </kbd>
    </button>
  );
}

function XIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
