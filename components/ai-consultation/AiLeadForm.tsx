"use client";

import { useState } from "react";
import { Loader2, Shield } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface AiLeadFormProps {
  onSubmit: (name: string, phone: string) => Promise<void>;
  isSubmitting: boolean;
  submitError: string;
}

export function AiLeadForm({ onSubmit, isSubmitting, submitError }: AiLeadFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; agreed?: string }>({});

  const validate = (): boolean => {
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = "이름을 입력해 주세요.";
    else if (name.trim().length > 50) errs.name = "이름이 너무 깁니다.";
    if (!phone.trim()) errs.phone = "연락처를 입력해 주세요.";
    else if (!/^[0-9\-\s+()]{7,20}$/.test(phone.trim())) errs.phone = "올바른 연락처 형식이 아닙니다.";
    if (!agreed) errs.agreed = "개인정보 수집·이용에 동의해 주세요.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;
    onSubmit(name.trim(), phone.trim());
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* 사용자 말풍선 */}
      <div className="mb-5 flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-slate-100 px-4 py-3 text-[0.875rem] text-slate-600">
          요약 내용 확인했습니다. 상담 신청할게요.
        </div>
      </div>

      {/* AI 안내 말풍선 */}
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0a1628] text-[0.625rem] font-black text-amber-400">
          AI
        </div>
        <div className="rounded-2xl rounded-tl-sm bg-[#0a1628] px-4 py-3">
          <p className="text-[0.875rem] font-medium text-white">
            마지막으로 연락받으실 정보를 입력해 주세요.
            담당 변호사가 직접 연락드리겠습니다.
          </p>
        </div>
      </div>

      {/* 폼 */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* 이름 */}
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름"
            maxLength={50}
            autoComplete="name"
            className={cn(
              "w-full rounded-2xl border-2 bg-white px-4 py-3.5 text-[0.9375rem] text-slate-800 outline-none transition",
              "placeholder:text-slate-300 focus:ring-4 focus:ring-amber-400/10",
              errors.name ? "border-red-400 focus:border-red-400" : "border-slate-200 focus:border-amber-400"
            )}
          />
          {errors.name && <p className="mt-1 pl-1 text-[0.75rem] text-red-500">{errors.name}</p>}
        </div>

        {/* 연락처 */}
        <div>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="연락처 (예: 010-0000-0000)"
            maxLength={20}
            autoComplete="tel"
            className={cn(
              "w-full rounded-2xl border-2 bg-white px-4 py-3.5 text-[0.9375rem] text-slate-800 outline-none transition",
              "placeholder:text-slate-300 focus:ring-4 focus:ring-amber-400/10",
              errors.phone ? "border-red-400 focus:border-red-400" : "border-slate-200 focus:border-amber-400"
            )}
          />
          {errors.phone && <p className="mt-1 pl-1 text-[0.75rem] text-red-500">{errors.phone}</p>}
        </div>

        {/* 개인정보 동의 */}
        <label className={cn(
          "flex cursor-pointer items-start gap-3 rounded-xl border-2 px-4 py-3 transition",
          agreed ? "border-amber-400 bg-amber-50" : "border-slate-200 bg-white hover:border-slate-300",
          errors.agreed && "border-red-300"
        )}>
          <div
            className={cn(
              "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 transition",
              agreed ? "border-amber-500 bg-amber-500" : "border-slate-300"
            )}
          >
            {agreed && (
              <svg width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden="true">
                <path d="M1 3l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <input
            type="checkbox"
            className="sr-only"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span className="text-[0.8125rem] leading-relaxed text-slate-600">
            <strong className="text-slate-800">개인정보 수집·이용에 동의합니다.</strong>
            <br />
            <span className="text-slate-400">수집 항목: 이름, 연락처, 상담 내용 / 목적: 법률 상담 접수 및 안내</span>
          </span>
        </label>
        {errors.agreed && <p className="pl-1 text-[0.75rem] text-red-500">{errors.agreed}</p>}

        {/* 서버 에러 */}
        {submitError && (
          <div className="rounded-xl bg-red-50 px-4 py-3 text-[0.8125rem] text-red-600">
            {submitError}
          </div>
        )}

        {/* 제출 */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-[0.9375rem] font-bold text-white transition-all",
            isSubmitting
              ? "cursor-not-allowed bg-slate-300"
              : "bg-[#0a1628] hover:bg-[#0f2040] active:scale-[0.99] shadow-[0_4px_20px_rgba(10,22,40,0.3)]"
          )}
        >
          {isSubmitting ? (
            <><Loader2 size={16} className="animate-spin" /> 접수 중…</>
          ) : (
            <><Shield size={15} /> 상담 신청 완료하기</>
          )}
        </button>
      </form>
    </div>
  );
}
