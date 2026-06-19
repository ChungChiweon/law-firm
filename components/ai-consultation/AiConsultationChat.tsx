"use client";

import { useState, useRef, useEffect } from "react";
import { CheckCircle, MessageCircle } from "lucide-react";
import { AiProgress } from "@/components/ai-consultation/AiProgress";
import { AiQuestionStep } from "@/components/ai-consultation/AiQuestionStep";
import { AiSummaryCard } from "@/components/ai-consultation/AiSummaryCard";
import { AiLeadForm } from "@/components/ai-consultation/AiLeadForm";
import { SITE_CONFIG } from "@/lib/constants/site";
import { AI_QUESTIONS, AI_QUESTION_LABEL_MAP } from "@/lib/constants/aiQuestions";

// ── 타입 ──────────────────────────────────────────────
type Phase = "questions" | "generating" | "summary" | "lead" | "submitting" | "done";

type Answers = Record<string, string>;

interface CompletedQA {
  question:     string;
  answer:       string;
  displayAnswer: string;
}

// ── 헬퍼: chips 선택값 → 한글 레이블 ─────────────────
function getDisplayAnswer(questionKey: string, value: string, type: string): string {
  if (type === "chips") {
    return AI_QUESTION_LABEL_MAP[questionKey]?.[value] ?? value;
  }
  return value;
}

// ── 메인 컴포넌트 ─────────────────────────────────────
export function AiConsultationChat() {
  const [phase, setPhase]               = useState<Phase>("questions");
  const [currentStep, setCurrentStep]   = useState(0);
  const [answers, setAnswers]           = useState<Answers>({});
  const [completedQA, setCompletedQA]   = useState<CompletedQA[]>([]);
  const [summary, setSummary]           = useState("");
  const [summaryError, setSummaryError] = useState("");
  const [submitError, setSubmitError]   = useState("");
  const summaryFetched = useRef(false);
  const bottomRef      = useRef<HTMLDivElement | null>(null);

  const totalSteps = AI_QUESTIONS.length;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [phase, currentStep, completedQA.length]);

  const handleAnswer = (value: string) => {
    const q          = AI_QUESTIONS[currentStep];
    const newAnswers = { ...answers, [q.key]: value };
    setAnswers(newAnswers);
    setCompletedQA((prev) => [
      ...prev,
      {
        question:     q.question,
        answer:       value,
        displayAnswer: getDisplayAnswer(q.key, value, q.type),
      },
    ]);

    const nextStep = currentStep + 1;
    if (nextStep < totalSteps) {
      setCurrentStep(nextStep);
    } else {
      setPhase("generating");
      if (!summaryFetched.current) {
        summaryFetched.current = true;
        fetchSummary(newAnswers);
      }
    }
  };

  const fetchSummary = async (fa: Answers) => {
    setSummaryError("");
    const labelOf = (key: string) =>
      AI_QUESTION_LABEL_MAP[key]?.[fa[key]] ?? fa[key] ?? "";

    try {
      const res  = await fetch("/api/ai/summary", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          area:      fa["area"] ?? "other",
          region:    "",
          opponent:  `걱정 사항: ${labelOf("concern")}`,
          amount:    `진행 단계: ${labelOf("stage")} / 증거: ${labelOf("evidence")}`,
          situation: fa["situation"] ?? "",
        }),
      });
      const json = await res.json() as { success: boolean; summary?: string; message?: string };
      if (!res.ok || !json.success) {
        setSummaryError(json.message ?? "요약 생성에 실패했습니다.");
        setSummary("요약을 생성하지 못했습니다. 아래에서 상담 신청을 계속할 수 있습니다.");
      } else {
        setSummary(json.summary ?? "");
      }
    } catch {
      setSummaryError("네트워크 오류가 발생했습니다.");
      setSummary("요약을 생성하지 못했습니다. 아래에서 상담 신청을 계속할 수 있습니다.");
    }
    setPhase("summary");
  };

  const handleLeadSubmit = async (name: string, phone: string) => {
    setPhase("submitting");
    setSubmitError("");

    // 모든 답변을 구조화된 텍스트로 직렬화
    const lines = AI_QUESTIONS.map((q, i) => {
      const raw     = answers[q.key] ?? "";
      const display = getDisplayAnswer(q.key, raw, q.type);
      return `${i + 1}. ${q.question.replace(/\?$/, "")}: ${display}`;
    });

    const content = [
      "[AI 상담 접수 — 성범죄 피해 상담센터]",
      "",
      ...lines,
      "",
      "[AI 요약]",
      summary,
    ].join("\n");

    try {
      const res  = await fetch("/api/consultation", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          area:          answers["area"] || "other",
          region:        null,
          content,
          privacyAgreed: true,
          source:        "landing",
        }),
      });
      const json = await res.json() as { success: boolean; message?: string };
      if (!res.ok || !json.success) {
        setSubmitError(json.message ?? "저장 중 오류가 발생했습니다.");
        setPhase("lead");
        return;
      }
      setPhase("done");
    } catch {
      setSubmitError("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      setPhase("lead");
    }
  };

  const progressStep =
    phase === "questions"                        ? currentStep
    : phase === "generating" || phase === "summary" ? totalSteps
    : phase === "lead" || phase === "submitting"    ? totalSteps + 1
    : totalSteps + 2;

  return (
    <div className="flex flex-col">
      <div className="mb-6">
        <AiProgress currentStep={progressStep} totalQuestions={totalSteps} />
      </div>

      <div className="flex flex-col gap-5">
        {/* 완료된 Q&A 히스토리 */}
        {completedQA.map((qa, idx) => (
          <div key={idx} className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0a1628] text-[0.625rem] font-black text-amber-400">
                AI
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-[#0a1628] px-4 py-3">
                <p className="text-[0.6875rem] font-semibold text-amber-400/70">
                  질문 {idx + 1} / {totalSteps}
                </p>
                <p className="mt-0.5 text-[0.875rem] font-semibold text-white">{qa.question}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-amber-500 px-4 py-3">
                <p className="text-[0.875rem] font-semibold text-white">{qa.displayAnswer}</p>
              </div>
            </div>
          </div>
        ))}

        {/* 현재 질문 */}
        {phase === "questions" && (
          <AiQuestionStep
            key={currentStep}
            config={AI_QUESTIONS[currentStep]}
            stepNumber={currentStep + 1}
            totalSteps={totalSteps}
            onAnswer={handleAnswer}
          />
        )}

        {(phase === "generating" || phase === "summary") && (
          <AiSummaryCard
            summary={summary}
            isLoading={phase === "generating"}
            onProceed={() => setPhase("lead")}
          />
        )}

        {summaryError && phase === "summary" && (
          <p className="rounded-xl bg-red-50 px-4 py-2.5 text-[0.8125rem] text-red-500">
            {summaryError}
          </p>
        )}

        {(phase === "lead" || phase === "submitting") && (
          <AiLeadForm
            onSubmit={handleLeadSubmit}
            isSubmitting={phase === "submitting"}
            submitError={submitError}
          />
        )}

        {phase === "done" && <DoneScreen />}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}

function DoneScreen() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="mb-5 flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-amber-500 px-4 py-3 text-[0.875rem] font-semibold text-white">
          상담 신청 완료했습니다.
        </div>
      </div>

      <div className="rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 px-5 py-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <CheckCircle size={24} className="text-green-600" />
        </div>
        <h3 className="text-base font-extrabold text-slate-900">접수가 완료되었습니다</h3>
        <p className="mt-1.5 text-[0.875rem] leading-relaxed text-slate-500">
          여성 담당 변호사가 내용을 검토하여<br />
          <strong className="text-slate-700">영업일 기준 1일 이내</strong>에 연락드립니다.
        </p>
        <p className="mt-2 text-[0.75rem] text-slate-400">
          상담 내용은 비공개로 관리됩니다. 구체적 판단은 변호사 검토 후 안내드립니다.
        </p>

        <a
          href={SITE_CONFIG.contact.kakaoChannelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FEE500] py-3.5 text-[0.9375rem] font-bold text-[#3A1D1D] transition hover:bg-[#e6ce00]"
        >
          <MessageCircle size={16} />
          카카오톡으로 비공개 상담
        </a>

        <p className="mt-3 text-[0.75rem] text-slate-400">
          급한 문의는 전화{" "}
          <a href={`tel:${SITE_CONFIG.contact.phone}`} className="font-semibold text-amber-600 underline">
            {SITE_CONFIG.contact.phone}
          </a>
          으로 연락해 주세요.
        </p>
      </div>
    </div>
  );
}
