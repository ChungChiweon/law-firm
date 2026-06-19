import Link from "next/link";
import { ArrowRight, Lock, ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants/site";
import { SunSweep } from "@/components/sections/SunSweep";

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">

      {/* 배경 이미지 */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/hero-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center right",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* 햇빛 스윕 */}
      <SunSweep />

      {/* 왼쪽 텍스트 가독성 — 어두운 오버레이 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to right," +
            "rgba(0,0,0,0.82) 0%," +
            "rgba(0,0,0,0.65) 18%," +
            "rgba(0,0,0,0.40) 36%," +
            "rgba(0,0,0,0.12) 54%," +
            "transparent 68%)",
        }}
      />

      {/* 상하 비네트 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom," +
            "rgba(0,0,0,0.45) 0%,rgba(0,0,0,0.10) 12%," +
            "transparent 28%,transparent 68%," +
            "rgba(0,0,0,0.60) 100%)",
        }}
      />

      {/* 콘텐츠 */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-screen flex-col justify-center pb-20 pt-[84px] sm:pt-[92px] lg:pt-[96px]">

          <div className="w-full max-w-[560px]">

            {/* 뱃지 */}
            <div className="mb-7 flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2.5 rounded-full bg-[#e8e3dc] px-4 py-1.5">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500/50 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c9a45e]" />
                </span>
                <span className="text-[11px] font-bold tracking-[0.1em] text-[#1a1814]">
                  {SITE_CONFIG.name}
                </span>
              </div>
              <div className="inline-flex items-center gap-2.5 rounded-full bg-[#e8e3dc] px-4 py-1.5">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500/50 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c9a45e]" />
                </span>
                <span className="text-[11px] font-medium tracking-wide text-[#1a1814]">
                  {SITE_CONFIG.secondaryName}
                </span>
              </div>
            </div>

            {/* H1 */}
            <h1 className="text-[2.0rem] font-extrabold leading-[1.24] tracking-tight sm:text-[2.625rem] lg:text-[3.125rem] lg:leading-[1.20]">
              <span className="block text-[#e8e3dc]">혼자 감당하지 마세요.</span>
              <span className="mt-1 block text-[#c9a45e] sm:mt-2">망설이지 않아도 됩니다.</span>
            </h1>

            {/* 구분선 */}
            <div className="mt-6 h-px w-10 bg-[#c9a45e]/28" />

            {/* 보조 문구 */}
            <p className="mt-5 max-w-[460px] whitespace-pre-line text-[0.9375rem] leading-[1.92] text-[#c8c2b8] sm:text-base">
              {"데이트폭력·성범죄·스토킹 피해,\n여성 변호사가 비공개로 상담합니다."}
            </p>

            {/* 보증 항목 */}
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {["여성 변호사 직접 상담", "상담 내용 비공개", "초기 대응 중심"].map((text) => (
                <div key={text} className="flex items-center gap-1.5 text-[0.8125rem] text-[#a8a096]">
                  <ShieldCheck size={12} strokeWidth={2.5} className="text-[#c9a45e]/70" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={SITE_CONFIG.contact.consultationUrl}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#e8e3dc] px-7 py-[0.9375rem] text-[0.9375rem] font-bold text-[#1a1814] shadow-[0_4px_28px_rgba(0,0,0,0.40)] transition-all duration-200 hover:bg-[#f0ebe3] active:scale-[0.98]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                비공개 상담 신청
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="/consultation/ai"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#e8e3dc] px-7 py-[0.9375rem] text-[0.9375rem] font-bold text-[#1a1814] shadow-[0_4px_28px_rgba(0,0,0,0.40)] transition-all duration-200 hover:bg-[#f0ebe3] active:scale-[0.98]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                AI로 상담 내용 정리
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* 신뢰 문구 */}
            <p className="mt-5 flex items-center gap-2 text-[0.75rem] text-[#a8a096]">
              <Lock size={11} className="shrink-0 text-[#a8a096]" strokeWidth={2} />
              상담 내용 비공개 · 결과 보장 없음 · 수임 강요 없음
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
