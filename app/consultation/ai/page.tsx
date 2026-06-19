import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Bot } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { AiConsultationChat } from "@/components/ai-consultation/AiConsultationChat";
import { SITE_CONFIG } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "AI 상담 정리 — 5문답으로 상담 내용 요약",
  description:
    "5가지 질문에 답하면 AI가 상담 내용을 정리해 드립니다. 여성 변호사가 직접 검토 후 연락드립니다.",
};

export default function AiConsultationPage() {
  return (
    <PublicLayout>
      <main className="min-h-screen bg-slate-50">
        <AiHero />
        <div className="mx-auto max-w-2xl px-4 pb-20 pt-8 sm:px-6">
          {/* AI 안내 배너 */}
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-[0.8125rem] leading-relaxed text-amber-700">
              <strong>이 화면은 상담 접수 보조입니다.</strong>{" "}
              5가지 질문에 답하면 AI가 상담 내용을 정리하고, 여성 변호사가 직접 검토 후 연락드립니다.
              법률 판단이 아니며 결과를 보장하지 않습니다.
            </p>
          </div>

          {/* 채팅 컨테이너 */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_32px_rgba(0,0,0,0.06)]">
            {/* 채팅 헤더 */}
            <div className="flex items-center gap-3 border-b border-slate-100 bg-[#060f1e] px-5 py-3.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500">
                <Bot size={15} className="text-white" />
              </div>
              <div>
                <p className="text-[0.8125rem] font-bold text-white">{SITE_CONFIG.name} AI</p>
                <p className="text-[0.6875rem] text-slate-400">5문답 상담 내용 정리</p>
              </div>
              {/* 온라인 표시 */}
              <div className="ml-auto flex items-center gap-1.5">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                <span className="text-[0.6875rem] text-green-400">준비됨</span>
              </div>
            </div>

            {/* 채팅 본문 */}
            <div className="px-4 py-6 sm:px-6">
              <AiConsultationChat />
            </div>
          </div>

          {/* 일반 상담으로 이동 링크 */}
          <div className="mt-6 text-center">
            <p className="text-[0.8125rem] text-slate-400">
              AI 없이 바로 신청하시겠어요?{" "}
              <Link href="/consultation" className="font-semibold text-amber-600 underline underline-offset-2 hover:text-amber-500">
                일반 상담 신청하기 →
              </Link>
            </p>
          </div>
        </div>
      </main>
    </PublicLayout>
  );
}

// ── Hero ──────────────────────────────────────────────
function AiHero() {
  return (
    <div className="relative overflow-hidden bg-[#060f1e] pt-16">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,#0f2a50,transparent)]" />

      <div className="relative mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-12">
        {/* 브레드크럼 */}
        <nav aria-label="breadcrumb" className="mb-5 flex items-center gap-1.5 text-[0.75rem] text-slate-500">
          <Link href="/" className="hover:text-amber-400 transition-colors">홈</Link>
          <ChevronRight size={12} className="text-slate-700" />
          <Link href="/consultation" className="hover:text-amber-400 transition-colors">상담 신청</Link>
          <ChevronRight size={12} className="text-slate-700" />
          <span className="text-slate-400">AI 상담 정리</span>
        </nav>

        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/20">
            <Bot size={22} className="text-amber-400" />
          </div>
          <div>
            <p className="mb-1 text-[0.6875rem] font-bold uppercase tracking-[0.15em] text-amber-400/80">
              AI Legal Intake
            </p>
            <h1 className="text-2xl font-extrabold text-white sm:text-3xl">
              AI로 먼저 상담 정리하기
            </h1>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-slate-400">
              5가지 질문에 답하면 AI가 상담 내용을 정리합니다.<br />
              여성 변호사가 직접 검토 후 연락드립니다.
            </p>
          </div>
        </div>

        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  );
}
