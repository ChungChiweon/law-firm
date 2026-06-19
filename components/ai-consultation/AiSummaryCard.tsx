import { Sparkles, RefreshCw } from "lucide-react";

interface AiSummaryCardProps {
  summary: string;
  onProceed: () => void;
  isLoading?: boolean;
}

export function AiSummaryCard({ summary, onProceed, isLoading }: AiSummaryCardProps) {
  if (isLoading) {
    return (
      <div className="animate-in fade-in duration-300">
        <div className="flex items-start gap-3 mb-5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0a1628] text-[0.625rem] font-black text-amber-400">
            AI
          </div>
          <div className="flex-1 rounded-2xl rounded-tl-sm bg-[#0a1628] px-4 py-4">
            <div className="flex items-center gap-2.5">
              <RefreshCw size={14} className="animate-spin text-amber-400" />
              <p className="text-[0.875rem] font-medium text-white">
                사건 내용을 분석 중입니다…
              </p>
            </div>
            <div className="mt-3 space-y-2">
              <div className="h-2.5 w-4/5 animate-pulse rounded-full bg-white/10" />
              <div className="h-2.5 w-3/5 animate-pulse rounded-full bg-white/10" />
              <div className="h-2.5 w-2/3 animate-pulse rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* AI 요약 버블 */}
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0a1628] text-[0.625rem] font-black text-amber-400">
          AI
        </div>
        <div className="flex-1">
          <div className="rounded-2xl rounded-tl-sm bg-[#0a1628] px-4 py-4">
            <div className="mb-2 flex items-center gap-1.5">
              <Sparkles size={12} className="text-amber-400" />
              <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-amber-400/80">
                AI 사건 요약
              </p>
            </div>
            <p className="whitespace-pre-wrap text-[0.875rem] leading-relaxed text-slate-200">
              {summary}
            </p>
          </div>

          {/* AI 안내 문구 */}
          <div className="mt-2.5 rounded-xl bg-amber-50 border border-amber-100 px-3.5 py-2.5">
            <p className="text-[0.75rem] leading-relaxed text-amber-700">
              <strong>안내:</strong> 이 요약은 AI가 상담 접수를 돕기 위해 자동 생성한 내용입니다.
              법률적 판단이 아니며, 담당 변호사가 검토 후 정확한 안내를 드립니다.
            </p>
          </div>
        </div>
      </div>

      {/* 진행 버튼 */}
      <button
        type="button"
        onClick={onProceed}
        className="w-full rounded-2xl bg-amber-500 py-4 text-[0.9375rem] font-bold text-white shadow-[0_8px_24px_rgba(245,158,11,0.25)] transition-all hover:bg-amber-400 hover:shadow-[0_8px_32px_rgba(245,158,11,0.35)] active:scale-[0.99]"
      >
        상담 신청하기 →
      </button>
      <p className="mt-2 text-center text-[0.75rem] text-slate-400">
        이름과 연락처를 입력해 변호사 검토를 받으세요
      </p>
    </div>
  );
}
