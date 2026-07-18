"use client";

import { useRef, useState } from "react";
import { Paperclip, X, Loader2, FileText, Image as ImageIcon, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { ConsultationAttachment } from "@/lib/supabase/types";
import {
  MAX_FILES,
  MAX_FILE_SIZE,
  ACCEPT_ATTR,
  isAllowedType,
  humanSize,
} from "@/lib/constants/upload";

interface AttachmentUploaderProps {
  value: ConsultationAttachment[];
  onChange: (next: ConsultationAttachment[]) => void;
  disabled?: boolean;
}

export function AttachmentUploader({ value, onChange, disabled }: AttachmentUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadingCount, setUploadingCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const remaining = MAX_FILES - value.length - uploadingCount;

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError(null);

    const list = Array.from(files);
    if (list.length > remaining) {
      setError(`파일은 최대 ${MAX_FILES}개까지 첨부할 수 있습니다.`);
      return;
    }

    // 순차 업로드하며 로컬 누적본에 반영 (state는 비동기라 누적용 변수 사용)
    let current = [...value];
    for (const file of list) {
      if (!isAllowedType(file.type)) {
        setError("이미지 또는 PDF 파일만 첨부할 수 있습니다.");
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        setError(`"${file.name}"이(가) 너무 큽니다. (최대 10MB)`);
        continue;
      }

      setUploadingCount((n) => n + 1);
      try {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/consultation/upload", { method: "POST", body: fd });
        const json = (await res.json()) as {
          success: boolean;
          attachment?: ConsultationAttachment;
          message?: string;
        };
        if (!res.ok || !json.success || !json.attachment) {
          setError(json.message ?? "파일 업로드에 실패했습니다.");
        } else {
          current = [...current, json.attachment];
          onChange(current);
        }
      } catch {
        setError("네트워크 오류로 업로드에 실패했습니다.");
      } finally {
        setUploadingCount((n) => n - 1);
      }
    }

    if (inputRef.current) inputRef.current.value = "";
  };

  const remove = (path: string) => {
    onChange(value.filter((a) => a.path !== path));
  };

  const canAdd = !disabled && remaining > 0;

  return (
    <div className="flex flex-col gap-2.5">
      {/* 업로드된 파일 목록 */}
      {value.length > 0 && (
        <ul className="flex flex-col gap-2">
          {value.map((a) => (
            <li
              key={a.path}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-slate-400">
                {a.name.toLowerCase().endsWith(".pdf") ? <FileText size={16} /> : <ImageIcon size={16} />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-slate-700">{a.name}</span>
                <span className="text-[0.6875rem] text-slate-400">{humanSize(a.size)}</span>
              </span>
              <button
                type="button"
                onClick={() => remove(a.path)}
                disabled={disabled}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-200 hover:text-slate-600"
                aria-label={`${a.name} 첨부 삭제`}
              >
                <X size={15} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* 업로드 중 표시 */}
      {uploadingCount > 0 && (
        <p className="flex items-center gap-2 text-[0.8125rem] text-slate-500">
          <Loader2 size={14} className="animate-spin" />
          {uploadingCount}개 파일 업로드 중…
        </p>
      )}

      {/* 추가 버튼 */}
      {canAdd && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-500 transition hover:border-amber-400 hover:bg-amber-50 hover:text-amber-700"
        >
          <Paperclip size={15} />
          파일 첨부 <span className="text-slate-300">·</span>
          <span className="text-[0.75rem] text-slate-400">
            {value.length}/{MAX_FILES} · 이미지·PDF, 10MB 이하
          </span>
        </button>
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
