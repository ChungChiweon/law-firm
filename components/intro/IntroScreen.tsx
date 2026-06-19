"use client";

import { useEffect, useRef } from "react";
import type { IntroState } from "@/hooks/useIntro";

interface IntroScreenProps {
  state: IntroState;
  onEnter: () => void;
  reducedMotion: boolean;
}

export function IntroScreen({ state, onEnter, reducedMotion }: IntroScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  if (state === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        opacity: state === "fading" ? 0 : 1,
        transition: state === "fading" ? "opacity 1000ms ease-in-out" : "none",
        pointerEvents: state === "fading" ? "none" : "auto",
      }}
    >
      {/* 배경 — 영상 또는 히어로 이미지 (reduced-motion) */}
      {reducedMotion ? (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/hero-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center right",
          }}
        />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/hero-intro.mp4" type="video/mp4" />
        </video>
      )}

      {/* 어두운 오버레이 — 버튼 가독성 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top," +
            "rgba(0,0,0,0.55) 0%," +
            "rgba(0,0,0,0.20) 40%," +
            "rgba(0,0,0,0.10) 100%)",
        }}
      />

      {/* 하단 중앙 콘텐츠 */}
      <div className="absolute bottom-16 left-0 right-0 z-10 flex flex-col items-center gap-4">
        {/* 입장 버튼 */}
        <button
          onClick={onEnter}
          className="group relative overflow-hidden rounded-2xl px-14 py-5 text-[1.125rem] font-semibold tracking-[0.06em] text-[#1a1814] transition-all duration-500"
          style={{
            background: "rgba(255,255,255,0.72)",
            border: "1px solid rgba(255,255,255,0.60)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.18)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,164,94,0.28)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,164,94,0.55)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 8px 40px rgba(201,164,94,0.25), inset 0 1px 0 rgba(255,255,255,0.20)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.10)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.28)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.18)";
          }}
        >
          상담센터 입장
        </button>

        {/* 보조 문구 */}
        <p className="text-[0.75rem] tracking-[0.10em] text-[#1a1814]/60">
          성범죄 · 데이트폭력 · 스토킹 피해 상담
        </p>
      </div>
    </div>
  );
}
