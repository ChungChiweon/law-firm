"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, AlertCircle, ChevronDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import {
  CONSULTATION_AREAS,
  OPPONENT_TYPES,
  AREA_QUERY_MAP,
  PRIVACY_POLICY_TEXT,
} from "@/lib/constants/consultation";
import type { ConsultationFormData, ConsultationArea } from "@/lib/types";
import type { ConsultationAttachment } from "@/lib/supabase/types";
import { AttachmentUploader } from "@/components/consultation/AttachmentUploader";
import { BookingCalendar, type BookingValue } from "@/components/consultation/BookingCalendar";
import { buildPreferredAt, toContactTimeBucket } from "@/lib/booking";
import { SITE_CONFIG } from "@/lib/constants/site";

const SITE_CONFIG_PHONE = SITE_CONFIG.contact.phone;

const INITIAL_FORM: ConsultationFormData = {
  name: "",
  phone: "",
  area: "",
  region: "",
  opponentType: "",
  content: "",
  contactTime: "",
  privacyAgreed: false,
};

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ConsultationForm() {
  const [form, setForm] = useState<ConsultationFormData>(INITIAL_FORM);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [attachments, setAttachments] = useState<ConsultationAttachment[]>([]);
  const [booking, setBooking] = useState<BookingValue | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof ConsultationFormData, string>>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  // 익명일 때 실제로 저장될 이름 ("익명" 또는 입력한 닉네임)
  const effectiveName = isAnonymous ? form.name.trim() || "익명" : form.name.trim();

  // URL 쿼리 파라미터로 분야 자동 선택 (클라이언트 마운트 시 한 번만 실행)
  // useSearchParams 대신 window.location으로 읽어 Suspense 경계 dehydration을 방지
  useEffect(() => {
    const areaParam = new URLSearchParams(window.location.search).get("area");
    if (areaParam && areaParam in AREA_QUERY_MAP) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm((prev) => ({ ...prev, area: AREA_QUERY_MAP[areaParam] as ConsultationArea }));
    }
  }, []);

  const set = <K extends keyof ConsultationFormData>(key: K, value: ConsultationFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: typeof errors = {};
    if (!isAnonymous && !form.name.trim()) next.name = "이름을 입력해 주세요.";
    if (!form.phone.trim()) {
      next.phone = "연락처를 입력해 주세요.";
    } else if (!/^[0-9\-\s+()]{7,20}$/.test(form.phone.trim())) {
      next.phone = "올바른 연락처 형식으로 입력해 주세요.";
    }
    if (!form.area) next.area = "상담 분야를 선택해 주세요.";
    if (!form.content.trim()) {
      next.content = "상담하실 내용을 간략히 입력해 주세요.";
    } else if (form.content.trim().length < 10) {
      next.content = "10자 이상 입력해 주세요.";
    }
    if (!form.privacyAgreed) next.privacyAgreed = "개인정보 수집·이용에 동의해 주세요.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // 중복 제출 방지
    if (status === "submitting") return;

    setStatus("submitting");
    setSubmitError(null);

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:          effectiveName,
          phone:         form.phone,
          area:          form.area,
          region:        form.region || null,
          opponentType:  form.opponentType || null,
          content:       form.content,
          // 예약 슬롯을 선택하면 정확한 희망 일시 + 연락 시간대(파생)를 함께 전송
          contactTime:   booking ? toContactTimeBucket(Number(booking.time.split(":")[0])) : null,
          preferredAt:   booking ? buildPreferredAt(booking.date, booking.time) : null,
          privacyAgreed: form.privacyAgreed,
          attachments,
        }),
      });

      const json = (await res.json()) as { success: boolean; message?: string };

      if (!res.ok || !json.success) {
        setSubmitError(
          json.message ?? "오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
        );
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setSubmitError(
        "네트워크 오류가 발생했습니다. 인터넷 연결을 확인한 후 다시 시도해 주세요."
      );
      setStatus("error");
    }
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setIsAnonymous(false);
    setAttachments([]);
    setBooking(null);
    setErrors({});
    setStatus("idle");
    setSubmitError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (status === "success") {
    return <SuccessMessage onReset={handleReset} name={effectiveName} />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
    >
      {/* 폼 헤더 */}
      <div className="border-b border-slate-100 bg-slate-50 px-6 py-4 sm:px-8">
        <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-amber-600">
          Confidential Consultation
        </p>
        <h2 className="mt-0.5 text-lg font-bold text-slate-900">
          상담 신청서
        </h2>
        <p className="mt-1 text-[0.8125rem] text-slate-500">
          <span className="text-red-500">*</span> 표시 항목은 필수입니다. 상담 내용은 비공개로 관리됩니다.
        </p>
      </div>

      <div className="space-y-6 px-6 py-7 sm:px-8 sm:py-8">

        {/* 익명 상담 토글 */}
        <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-slate-700">
              이름 없이 익명으로 상담하기
            </p>
            <p className="mt-0.5 text-[0.75rem] text-slate-400">
              실명 대신 닉네임으로 신청할 수 있습니다. 회신을 위해 연락처는 필요합니다.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={isAnonymous}
            aria-label="익명으로 상담하기"
            onClick={() => {
              setIsAnonymous((v) => !v);
              setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            className={cn(
              "relative h-6 w-11 shrink-0 rounded-full transition-colors",
              isAnonymous ? "bg-amber-500" : "bg-slate-300"
            )}
          >
            <span
              className={cn(
                "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                isAnonymous && "translate-x-5"
              )}
            />
          </button>
        </div>

        {/* 이름 + 연락처 */}
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label={isAnonymous ? "닉네임" : "이름"}
            required={!isAnonymous}
            error={errors.name}
            hint={isAnonymous ? "비워두면 '익명'으로 접수됩니다. (선택)" : undefined}
          >
            <Input
              type="text"
              placeholder={isAnonymous ? "예: ㅇㅇ" : "홍길동"}
              value={form.name}
              onChange={(v) => set("name", v)}
              hasError={!!errors.name}
              autoComplete={isAnonymous ? "off" : "name"}
            />
          </Field>

          <Field label="연락처" required error={errors.phone} hint="하이픈(-) 없이 입력하셔도 됩니다.">
            <Input
              type="tel"
              placeholder="010-0000-0000"
              value={form.phone}
              onChange={(v) => set("phone", v)}
              hasError={!!errors.phone}
              autoComplete="tel"
            />
          </Field>
        </div>

        {/* 상담 분야 */}
        <Field label="상담 분야" required error={errors.area}>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {CONSULTATION_AREAS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => set("area", opt.value)}
                className={cn(
                  "rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-150 active:scale-[0.97]",
                  form.area === opt.value
                    ? "border-amber-400 bg-amber-50 text-amber-700 shadow-[0_0_0_2px_rgba(245,158,11,0.15)]"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </Field>

        {/* 사건 지역 + 상대방 유형 */}
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="사건 지역" hint="관할 경찰서·법원 안내에 참고됩니다. (선택)">
            <Input
              type="text"
              placeholder="예: 서울 강남구"
              value={form.region}
              onChange={(v) => set("region", v)}
            />
          </Field>

          <Field label="상담 구분">
            <Select
              placeholder="선택해 주세요"
              options={OPPONENT_TYPES}
              value={form.opponentType}
              onChange={(v) => set("opponentType", v as ConsultationFormData["opponentType"])}
            />
          </Field>
        </div>

        {/* 사건 내용 */}
        <Field
          label="상담 내용"
          required
          error={errors.content}
          hint="구체적으로 작성하실수록 더욱 정확한 안내를 드릴 수 있습니다."
        >
          <div className="relative">
            <textarea
              rows={6}
              placeholder={`상황을 편하게 적어주세요. 어떤 내용이든 괜찮습니다.\n\n예시: "교제하던 상대방이 헤어진 후 계속 연락하고 집 앞에 나타납니다. 어떻게 해야 할지 모르겠어서 도움을 요청합니다."`}
              value={form.content}
              onChange={(e) => set("content", e.target.value)}
              className={cn(
                "w-full resize-none rounded-xl border bg-white px-4 py-3.5 text-sm leading-relaxed text-slate-800 outline-none transition-all placeholder:text-slate-300",
                "focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20",
                errors.content
                  ? "border-red-300 focus:border-red-400 focus:ring-red-400/20"
                  : "border-slate-200 hover:border-slate-300"
              )}
            />
            <span className="absolute bottom-3 right-3 text-[0.6875rem] text-slate-300 select-none">
              {form.content.length}자
            </span>
          </div>
        </Field>

        {/* 증거 파일 첨부 (선택) */}
        <Field
          label="자료 첨부"
          hint="대화 캡처·사진·진단서 등을 첨부할 수 있습니다. 비공개로 안전하게 보관됩니다. (선택)"
        >
          <AttachmentUploader
            value={attachments}
            onChange={setAttachments}
            disabled={status === "submitting"}
          />
        </Field>

        {/* 희망 상담 일시 (예약) */}
        <Field
          label="희망 상담 일시"
          hint="원하시는 날짜·시간을 선택하시면 맞춰 연락드립니다. (선택 · 평일 기준)"
        >
          <BookingCalendar value={booking} onChange={setBooking} />
        </Field>

        {/* 개인정보 동의 */}
        <div className={cn(
          "rounded-xl border p-4 transition-colors",
          errors.privacyAgreed ? "border-red-200 bg-red-50" : "border-slate-100 bg-slate-50"
        )}>
          <label className="flex cursor-pointer items-start gap-3">
            <div className="relative mt-0.5 shrink-0">
              <input
                type="checkbox"
                checked={form.privacyAgreed}
                onChange={(e) => set("privacyAgreed", e.target.checked)}
                className="sr-only"
              />
              <div className={cn(
                "flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all",
                form.privacyAgreed
                  ? "border-amber-500 bg-amber-500"
                  : errors.privacyAgreed
                  ? "border-red-400 bg-white"
                  : "border-slate-300 bg-white"
              )}>
                {form.privacyAgreed && (
                  <svg viewBox="0 0 10 8" fill="none" className="h-3 w-3" aria-hidden="true">
                    <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </div>
            <div>
              <p className="text-[0.8125rem] font-semibold text-slate-700">
                개인정보 수집·이용에 동의합니다 <span className="text-red-500">*</span>
              </p>
              <pre className="mt-1.5 whitespace-pre-wrap font-sans text-[0.75rem] leading-relaxed text-slate-500">
                {PRIVACY_POLICY_TEXT}
              </pre>
            </div>
          </label>
          {errors.privacyAgreed && (
            <p className="mt-2 flex items-center gap-1.5 text-[0.75rem] text-red-500">
              <AlertCircle size={12} />
              {errors.privacyAgreed}
            </p>
          )}
        </div>

        {/* 제출 오류 배너 */}
        {submitError && (
          <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5">
            <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-500" />
            <div>
              <p className="text-sm font-semibold text-red-700">접수에 실패했습니다</p>
              <p className="mt-0.5 text-[0.8125rem] text-red-600">{submitError}</p>
              <p className="mt-1.5 text-[0.75rem] text-red-400">
                계속 오류가 발생하면{" "}
                <a
                  href={`tel:${SITE_CONFIG_PHONE}`}
                  className="underline underline-offset-2 hover:text-red-500"
                >
                  전화
                </a>
                {" "}또는 카카오톡으로 문의해 주세요.
              </p>
            </div>
          </div>
        )}

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={status === "submitting"}
          onClick={() => { if (status === "error") setStatus("idle"); }}
          className={cn(
            "group relative w-full overflow-hidden rounded-xl py-4 text-[0.9375rem] font-bold text-white shadow-[0_4px_20px_rgba(245,158,11,0.2)] transition-all duration-200",
            status === "submitting"
              ? "cursor-not-allowed bg-amber-400"
              : "bg-amber-500 hover:bg-amber-400 hover:shadow-[0_6px_28px_rgba(245,158,11,0.3)] active:scale-[0.99]"
          )}
        >
          {/* shimmer */}
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />

          {status === "submitting" ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 size={18} className="animate-spin" />
              접수 중입니다…
            </span>
          ) : (
            "상담 내용 접수하기"
          )}
        </button>

        <p className="text-center text-[0.75rem] text-slate-400">
          접수 후 담당 변호사가 직접 확인하여 연락드립니다.
        </p>
      </div>
    </form>
  );
}

// ── 공통 Field 래퍼 ─────────────────────────────────
function Field({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="text-[0.75rem] text-slate-400">{hint}</p>
      )}
      {error && (
        <p className="flex items-center gap-1.5 text-[0.75rem] text-red-500">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  );
}

// ── 텍스트 Input ─────────────────────────────────────
function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  hasError,
  autoComplete,
}: {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  hasError?: boolean;
  autoComplete?: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoComplete={autoComplete}
      className={cn(
        "h-12 w-full rounded-xl border bg-white px-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-300",
        "focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20",
        hasError
          ? "border-red-300 focus:border-red-400 focus:ring-red-400/20"
          : "border-slate-200 hover:border-slate-300"
      )}
    />
  );
}

// ── Select ─────────────────────────────────────────
function Select<T extends string>({
  placeholder,
  options,
  value,
  onChange,
}: {
  placeholder: string;
  options: { value: T; label: string }[];
  value: T | "";
  onChange: (v: T | "") => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T | "")}
        className={cn(
          "h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm outline-none transition-all",
          "focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 hover:border-slate-300",
          value ? "text-slate-800" : "text-slate-300"
        )}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={15}
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  );
}

// ── 제출 완료 화면 ──────────────────────────────────
function SuccessMessage({ onReset, name }: { onReset: () => void; name: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)]">
      <div className="bg-gradient-to-r from-[#060f1e] to-[#0a1f3c] px-6 py-4 sm:px-8">
        <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-amber-400/80">
          접수 완료
        </p>
        <h2 className="mt-0.5 text-lg font-bold text-white">상담 신청이 접수되었습니다</h2>
      </div>

      <div className="flex flex-col items-center gap-5 px-6 py-10 text-center sm:px-8 sm:py-12">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
          <CheckCircle2 size={32} className="text-green-500" strokeWidth={1.5} />
        </div>

        <div>
          <p className="text-lg font-bold text-slate-900">
            {name} 님, 접수해 주셔서 감사합니다.
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
            여성 담당 변호사가 내용을 검토하여
            <strong className="text-slate-700"> 영업일 기준 1일 이내</strong>에 연락드립니다.
            상담 내용은 비공개로 관리됩니다.
          </p>
        </div>

        <div className="mt-2 w-full max-w-sm rounded-xl bg-amber-50 px-5 py-4 text-left">
          <p className="mb-2 text-[0.75rem] font-bold uppercase tracking-wider text-amber-600">
            다음 단계
          </p>
          <ul className="space-y-1.5 text-[0.8125rem] text-slate-600">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-amber-500">①</span>
              여성 변호사가 접수 내용을 직접 검토합니다.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-amber-500">②</span>
              영업일 기준 1일 이내로 연락드립니다.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-amber-500">③</span>
              편한 방법으로 상담 방향을 함께 찾겠습니다.
            </li>
          </ul>
        </div>

        <div className="w-full max-w-sm">
          <p className="mb-2 text-center text-[0.75rem] font-semibold text-slate-400">
            더 빠른 연락이 필요하시면
          </p>
          <a
            href={SITE_CONFIG.contact.kakaoChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#FEE500] py-4 text-[1rem] font-bold text-[#3A1D1D] shadow-[0_4px_20px_rgba(254,229,0,0.4)] transition hover:bg-[#e6ce00] hover:shadow-[0_6px_28px_rgba(254,229,0,0.5)] active:scale-[0.98]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 3C6.477 3 2 6.582 2 11c0 2.8 1.61 5.267 4.063 6.824L5.06 21.1a.5.5 0 0 0 .72.547l4.163-2.773A11.27 11.27 0 0 0 12 19c5.523 0 10-3.582 10-8S17.523 3 12 3z" />
            </svg>
            카카오톡으로 바로 연락하기
          </a>
        </div>

        <button
          onClick={onReset}
          className="rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700"
        >
          새 상담 신청하기
        </button>

        <p className="text-[0.75rem] text-slate-400">
          결과를 보장하지 않습니다 · 수임 강요 없음
        </p>
      </div>
    </div>
  );
}
