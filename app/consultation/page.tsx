import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ChevronRight, Bot } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ConsultationForm } from "@/components/consultation/ConsultationForm";
import { ConsultationGuide } from "@/components/consultation/ConsultationGuide";
import { SITE_CONFIG } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "상담 신청 — 성범죄 피해 상담센터",
  description:
    "데이트폭력·성범죄·스토킹 피해, 여성 변호사가 직접 검토합니다. 비공개로 상담을 신청하세요.",
};

export default function ConsultationPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        <ConsultationHero />

        {/* 본문 그리드 */}
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8 lg:pb-24">
          <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start xl:grid-cols-[1fr_360px]">
                {/* AI 상담 정리 배너 */}
            <AiConsultationBanner />

            {/* 폼 — useSearchParams 사용으로 Suspense 필요 */}
            <Suspense fallback={<FormSkeleton />}>
              <ConsultationForm />
            </Suspense>

            {/* 사이드 가이드 */}
            <ConsultationGuide />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// ── Hero 영역 ────────────────────────────────────────
function ConsultationHero() {
  return (
    <div className="relative overflow-hidden bg-[#060f1e] pt-16">
      {/* 상단 골드 라인 */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />

      {/* 배경 그라디언트 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,#0f2a50,transparent)]" />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* 브레드크럼 */}
        <nav aria-label="breadcrumb" className="mb-5 flex items-center gap-1.5 text-[0.75rem] text-slate-500">
          <Link href="/" className="transition-colors hover:text-amber-400">홈</Link>
          <ChevronRight size={12} className="text-slate-700" />
          <span className="text-slate-400">상담 신청</span>
        </nav>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[0.6875rem] font-bold uppercase tracking-[0.15em] text-amber-400/80">
              Confidential Consultation
            </p>
            <h1 className="text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
              비공개 상담 신청
            </h1>
            <p className="mt-2.5 text-[0.875rem] leading-relaxed text-slate-400 sm:text-[0.9375rem]">
              간단한 내용만 남겨주시면 여성 변호사가 직접 검토 후 연락드립니다.
              상담 내용은 비공개로 관리됩니다.
            </p>
          </div>

          {/* 우측 카카오 빠른 접근 */}
          <a
            href={SITE_CONFIG.contact.kakaoChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden shrink-0 items-center gap-2 rounded-xl bg-[#FEE500] px-5 py-3 text-sm font-bold text-[#3A1D1D] transition-colors hover:bg-[#e6ce00] sm:inline-flex"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 3C6.477 3 2 6.582 2 11c0 2.8 1.61 5.267 4.063 6.824L5.06 21.1a.5.5 0 0 0 .72.547l4.163-2.773A11.27 11.27 0 0 0 12 19c5.523 0 10-3.582 10-8S17.523 3 12 3z" />
            </svg>
            카카오톡 상담
          </a>
        </div>

        {/* 하단 장식선 */}
        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  );
}

// ── AI 상담 배너 ────────────────────────────────────
function AiConsultationBanner() {
  return (
    <Link
      href="/consultation/ai"
      className="group mb-2 flex items-center gap-4 rounded-2xl border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 px-5 py-4 transition-all hover:border-amber-400 hover:shadow-[0_4px_20px_rgba(245,158,11,0.15)]"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 transition group-hover:bg-amber-500/20">
        <Bot size={20} className="text-amber-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-slate-800 text-[0.9375rem]">AI로 먼저 상담 정리하기</p>
        <p className="mt-0.5 text-[0.8125rem] text-slate-500">
          5가지 질문에 답하면 AI가 사건을 요약해 드립니다
        </p>
      </div>
      <ChevronRight size={18} className="shrink-0 text-amber-500 transition group-hover:translate-x-0.5" />
    </Link>
  );
}

// ── 로딩 스켈레톤 ──────────────────────────────────
function FormSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)]">
      <div className="border-b border-slate-100 bg-slate-50 px-6 py-4 sm:px-8">
        <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
        <div className="mt-2 h-5 w-40 animate-pulse rounded bg-slate-200" />
      </div>
      <div className="space-y-6 px-6 py-7 sm:px-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-3.5 w-20 animate-pulse rounded bg-slate-100" />
            <div className="h-12 w-full animate-pulse rounded-xl bg-slate-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
