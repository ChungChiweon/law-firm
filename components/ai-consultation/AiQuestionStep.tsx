"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { AiQuestion } from "@/lib/constants/aiQuestions";

// QuestionConfig는 외부 호환을 위해 AiQuestion의 alias로 재export
export type { AiQuestion as QuestionConfig };

interface AiQuestionStepProps {
  config:     AiQuestion;
  stepNumber: number;
  totalSteps: number;
  onAnswer:   (value: string) => void;
}

export function AiQuestionStep({ config, stepNumber, totalSteps, onAnswer }: AiQuestionStepProps) {
  const [value, setValue] = useState("");
  const [multiSelected, setMultiSelected] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const toggleMulti = (v: string) => {
    setMultiSelected((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );
  };

  const submitMulti = () => {
    if (multiSelected.length === 0) return;
    onAnswer(multiSelected.join(","));
  };

  useEffect(() => {
    if (config.type !== "chips" && config.type !== "chips-multi") {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [config.type]);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onAnswer(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && config.type !== "textarea") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* 질문 버블 */}
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0a1628] text-[0.625rem] font-black text-amber-400">
          AI
        </div>
        <div className="flex-1">
          <div className="inline-block rounded-2xl rounded-tl-sm bg-[#0a1628] px-4 py-3">
            <p className="text-[0.6875rem] font-semibold text-amber-400/70">
              질문 {stepNumber} / {totalSteps}
            </p>
            <p className="mt-0.5 text-[0.9375rem] font-semibold leading-snug text-white">
              {config.question}
            </p>
          </div>
          {config.hint && (
            <p className="mt-1.5 pl-1 text-[0.75rem] text-slate-400">{config.hint}</p>
          )}
        </div>
      </div>

      {/* 입력 영역 */}
      {config.type === "chips" && config.options ? (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5">
          {config.options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onAnswer(opt.value)}
              className={cn(
                "group flex flex-col items-start gap-1 rounded-xl border-2 border-slate-200 bg-white px-4 py-3.5",
                "text-left text-[0.875rem] font-semibold text-slate-700",
                "transition-all duration-150 hover:border-amber-400 hover:bg-amber-50 hover:text-amber-800",
                "active:scale-[0.97]"
              )}
            >
              {opt.emoji && <span className="text-xl">{opt.emoji}</span>}
              {opt.label}
            </button>
          ))}
        </div>
      ) : config.type === "chips-multi" && config.options ? (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5">
            {config.options.map((opt) => {
              const selected = multiSelected.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleMulti(opt.value)}
                  className={cn(
                    "flex items-center gap-2 rounded-xl border-2 px-4 py-3.5",
                    "text-left text-[0.875rem] font-semibold transition-all duration-150 active:scale-[0.97]",
                    selected
                      ? "border-amber-400 bg-amber-50 text-amber-800"
                      : "border-slate-200 bg-white text-slate-700 hover:border-amber-300 hover:bg-amber-50/50"
                  )}
                >
                  <span className={cn(
                    "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                    selected ? "border-amber-500 bg-amber-500" : "border-slate-300 bg-white"
                  )}>
                    {selected && <Check size={10} className="text-white" strokeWidth={3} />}
                  </span>
                  {opt.label}
                </button>
              );
            })}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={submitMulti}
              disabled={multiSelected.length === 0}
              className={cn(
                "flex items-center gap-2 rounded-xl px-5 py-2.5 text-[0.875rem] font-bold text-white transition-all",
                multiSelected.length > 0
                  ? "bg-amber-500 hover:bg-amber-400 active:scale-95"
                  : "cursor-not-allowed bg-slate-200 text-slate-400"
              )}
            >
              다음 <ArrowRight size={14} />
            </button>
          </div>
        </div>
      ) : config.type === "textarea" ? (
        <div className="flex flex-col gap-2">
          {config.examples && config.examples.length > 0 && (
            <div className="rounded-xl bg-slate-50 px-4 py-3">
              <p className="mb-1.5 text-[0.6875rem] font-semibold text-slate-400 uppercase tracking-wider">예시</p>
              <ul className="flex flex-col gap-1">
                {config.examples.map((ex, i) => (
                  <li key={i} className="text-[0.8125rem] text-slate-500 leading-snug before:content-['·_'] before:text-slate-300">
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="편하게 적어주세요."
            maxLength={config.maxLength}
            rows={4}
            className="w-full resize-none rounded-2xl border-2 border-slate-200 bg-white px-4 py-3.5 text-[0.9375rem] leading-relaxed text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10"
          />
          <div className="flex items-center justify-between">
            <span className="text-[0.75rem] text-slate-400">
              {value.length}{config.maxLength ? ` / ${config.maxLength}자` : "자"}
            </span>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!value.trim()}
              className={cn(
                "flex items-center gap-2 rounded-xl px-5 py-2.5 text-[0.875rem] font-bold text-white transition-all",
                value.trim()
                  ? "bg-amber-500 hover:bg-amber-400 active:scale-95"
                  : "cursor-not-allowed bg-slate-200 text-slate-400"
              )}
            >
              다음 <ArrowRight size={14} />
            </button>
          </div>
        </div>
      ) : (
        /* type === "text" */
        <div className="flex gap-2">
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={config.hint}
            maxLength={config.maxLength}
            className="flex-1 rounded-2xl border-2 border-slate-200 bg-white px-4 py-3.5 text-[0.9375rem] text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10"
          />
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!value.trim()}
            className={cn(
              "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-all",
              value.trim()
                ? "bg-amber-500 text-white hover:bg-amber-400 active:scale-95"
                : "cursor-not-allowed bg-slate-100 text-slate-300"
            )}
          >
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
