import { cn } from "@/lib/utils/cn";
import { Check, Loader2 } from "lucide-react";
import { AI_QUESTIONS } from "@/lib/constants/aiQuestions";

interface AiProgressProps {
  currentStep: number;  // 0..N-1 = 질문, N = 요약 생성, N+1 = 신청, N+2 = 완료
  totalQuestions: number;
}

// 진행률 단계 레이블: 질문 stepLabel + 고정 2단계
const STEP_LABELS = [
  ...AI_QUESTIONS.map((q) => q.stepLabel),
  "요약",
  "신청",
];

export function AiProgress({ currentStep, totalQuestions }: AiProgressProps) {
  const displaySteps = STEP_LABELS.slice(0, totalQuestions + 2);

  return (
    <div className="flex items-center justify-center gap-1.5 py-2">
      {displaySteps.map((label, idx) => {
        const isDone       = idx < currentStep;
        const isActive     = idx === currentStep;
        const isGenerating = currentStep === totalQuestions && idx === totalQuestions;

        return (
          <div key={label + idx} className="flex items-center gap-1.5">
            <div className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full text-[0.6rem] font-bold transition-all duration-300",
                  isDone                  && "bg-amber-500 text-white",
                  isActive && !isGenerating && "bg-[#0a1628] text-white ring-2 ring-amber-400/40",
                  isActive && isGenerating  && "bg-[#0a1628] text-white",
                  !isDone && !isActive     && "bg-slate-100 text-slate-400"
                )}
              >
                {isDone ? (
                  <Check size={10} strokeWidth={3} />
                ) : isActive && isGenerating ? (
                  <Loader2 size={10} className="animate-spin" />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  "text-[0.5625rem] font-semibold leading-none transition-colors",
                  isDone    && "text-amber-600",
                  isActive  && "text-[#0a1628]",
                  !isDone && !isActive && "text-slate-300"
                )}
              >
                {label}
              </span>
            </div>
            {idx < displaySteps.length - 1 && (
              <div
                className={cn(
                  "mb-3.5 h-px w-4 transition-colors duration-300 sm:w-6",
                  idx < currentStep ? "bg-amber-400" : "bg-slate-200"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
