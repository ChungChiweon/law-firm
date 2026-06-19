"use client";

import { useState } from "react";
import { X, Phone, MapPin, Clock, FileText, User, Briefcase, Save, Loader2 } from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { STATUS_OPTIONS, AREA_LABEL, OPPONENT_LABEL, CONTACT_TIME_LABEL, SOURCE_LABEL } from "@/lib/constants/admin";
import { cn } from "@/lib/utils/cn";
import type { AdminConsultation, ConsultationStatus } from "@/lib/supabase/types";

interface AdminConsultationDetailProps {
  item: AdminConsultation;
  onClose: () => void;
  onUpdated: (id: string, changes: { status?: ConsultationStatus; memo?: string | null }) => void;
}

export function AdminConsultationDetail({ item, onClose, onUpdated }: AdminConsultationDetailProps) {
  const [status, setStatus] = useState<ConsultationStatus>(item.status);
  const [memo, setMemo] = useState(item.memo ?? "");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const isDirty = status !== item.status || memo !== (item.memo ?? "");

  const handleSave = async () => {
    if (!isDirty || saving) return;
    setSaving(true);
    setSaveMsg(null);
    try {
      const res = await fetch("/api/admin/consultations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, status, memo: memo || null }),
      });
      const json = await res.json() as { success: boolean; message?: string };
      if (!res.ok || !json.success) throw new Error(json.message ?? "오류");
      setSaveMsg({ ok: true, text: "저장되었습니다." });
      onUpdated(item.id, { status, memo: memo || null });
    } catch (e) {
      setSaveMsg({ ok: false, text: e instanceof Error ? e.message : "저장 실패" });
    } finally {
      setSaving(false);
    }
  };

  const createdAt = new Date(item.created_at).toLocaleString("ko-KR", {
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit",
  });

  return (
    <>
      {/* 오버레이 */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 패널 */}
      <div className="fixed inset-y-0 right-0 z-50 flex w-full flex-col bg-white shadow-2xl sm:w-[480px] lg:w-[520px]">
        {/* 패널 헤더 */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-[#060f1e] px-5 py-4">
          <div>
            <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-amber-400/70">
              Consultation Detail
            </p>
            <h2 className="mt-0.5 text-base font-bold text-white">{item.name} 님 상담 내용</h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 transition hover:bg-white/10 hover:text-white"
            aria-label="닫기"
          >
            <X size={18} />
          </button>
        </div>

        {/* 스크롤 영역 */}
        <div className="flex-1 overflow-y-auto">
          {/* 기본 정보 */}
          <div className="border-b border-slate-100 px-5 py-5">
            <SectionTitle>기본 정보</SectionTitle>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
              <DetailItem icon={User} label="이름" value={item.name} />
              <DetailItem icon={Phone} label="연락처" value={
                <a href={`tel:${item.phone}`} className="text-amber-600 underline underline-offset-2">
                  {item.phone}
                </a>
              } />
              <DetailItem icon={Briefcase} label="상담 분야" value={
                <span className="font-semibold text-slate-800">
                  {AREA_LABEL[item.area] ?? item.area}
                </span>
              } />
              <DetailItem icon={MapPin} label="사건 지역" value={item.region ?? "—"} />
              <DetailItem icon={User} label="상대방 유형" value={
                item.opponent_type ? (OPPONENT_LABEL[item.opponent_type] ?? item.opponent_type) : "—"
              } />
              <DetailItem icon={Clock} label="연락 가능 시간" value={
                item.contact_time ? (CONTACT_TIME_LABEL[item.contact_time] ?? item.contact_time) : "—"
              } />
              <DetailItem icon={FileText} label="접수 경로" value={
                SOURCE_LABEL[item.source] ?? item.source
              } />
              <DetailItem icon={Clock} label="접수일시" value={createdAt} />
            </dl>
          </div>

          {/* 상담 내용 */}
          <div className="border-b border-slate-100 px-5 py-5">
            <SectionTitle>상담 내용</SectionTitle>
            <div className="mt-3 rounded-xl bg-slate-50 px-4 py-3.5">
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                {item.content}
              </p>
            </div>
          </div>

          {/* 상태 변경 */}
          <div className="border-b border-slate-100 px-5 py-5">
            <SectionTitle>상태 관리</SectionTitle>
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setStatus(opt.value as ConsultationStatus)}
                  className={cn(
                    "rounded-lg border px-2 py-2 text-center text-[0.75rem] font-semibold transition",
                    status === opt.value
                      ? "border-amber-400 bg-amber-50 text-amber-700 shadow-[0_0_0_2px_rgba(245,158,11,0.15)]"
                      : "border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-[0.75rem] text-slate-400">현재 상태:</span>
              <StatusBadge status={status} size="sm" />
              {status !== item.status && (
                <span className="text-[0.75rem] text-amber-600">변경됨</span>
              )}
            </div>
          </div>

          {/* 내부 메모 */}
          <div className="px-5 py-5">
            <SectionTitle>내부 메모</SectionTitle>
            <p className="mt-0.5 text-[0.75rem] text-slate-400">
              의뢰인에게 공개되지 않는 내부 기록입니다.
            </p>
            <textarea
              rows={5}
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="담당자 메모를 입력하세요…"
              className="mt-2.5 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-700 outline-none transition placeholder:text-slate-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 hover:border-slate-300"
              maxLength={2000}
            />
            <p className="mt-1 text-right text-[0.6875rem] text-slate-300">{memo.length}/2000</p>
          </div>
        </div>

        {/* 저장 버튼 영역 */}
        <div className="border-t border-slate-100 bg-white px-5 py-4">
          {saveMsg && (
            <p className={cn(
              "mb-3 rounded-lg px-3 py-2 text-[0.8125rem] font-medium",
              saveMsg.ok ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
            )}>
              {saveMsg.text}
            </p>
          )}
          <div className="flex gap-2.5">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              닫기
            </button>
            <button
              onClick={handleSave}
              disabled={!isDirty || saving}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition",
                isDirty && !saving
                  ? "bg-amber-500 hover:bg-amber-400 shadow-[0_4px_16px_rgba(245,158,11,0.2)]"
                  : "cursor-not-allowed bg-slate-200 text-slate-400"
              )}
            >
              {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              {saving ? "저장 중…" : "변경사항 저장"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-wider text-slate-400">
      <span className="inline-block h-px flex-1 bg-slate-100" />
      {children}
      <span className="inline-block h-px flex-1 bg-slate-100" />
    </h3>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <dt className="mb-0.5 flex items-center gap-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-slate-400">
        <Icon size={10} />
        {label}
      </dt>
      <dd className="text-[0.8125rem] text-slate-600">{value}</dd>
    </div>
  );
}
