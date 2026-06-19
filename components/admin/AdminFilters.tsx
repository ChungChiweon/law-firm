"use client";

import { Search, X, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { AREA_FILTER_OPTIONS, STATUS_OPTIONS } from "@/lib/constants/admin";

interface AdminFiltersProps {
  search: string;
  area: string;
  status: string;
  onSearchChange: (v: string) => void;
  onAreaChange: (v: string) => void;
  onStatusChange: (v: string) => void;
  onReset: () => void;
  total: number;
}

export function AdminFilters({
  search, area, status,
  onSearchChange, onAreaChange, onStatusChange, onReset,
  total,
}: AdminFiltersProps) {
  const hasFilter = !!search || !!area || !!status;

  return (
    <div className="space-y-3">
      {/* 상단 행: 검색 + 카운트 */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search
            size={15}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="이름, 연락처, 사건내용 검색…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-9 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 hover:border-slate-300"
          />
          {search && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label="검색어 지우기"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <span className="shrink-0 text-[0.8125rem] text-slate-500">
          총 <strong className="text-slate-800">{total.toLocaleString()}</strong>건
        </span>
      </div>

      {/* 하단 행: 필터 셀렉트 */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5 text-[0.75rem] font-medium text-slate-400">
          <SlidersHorizontal size={13} />
          필터
        </div>

        <FilterSelect
          value={area}
          onChange={onAreaChange}
          options={AREA_FILTER_OPTIONS}
          placeholder="전체 분야"
        />

        <FilterSelect
          value={status}
          onChange={onStatusChange}
          options={[
            { value: "", label: "전체 상태" },
            ...STATUS_OPTIONS,
          ]}
          placeholder="전체 상태"
        />

        {hasFilter && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-[0.75rem] font-medium text-red-500 transition hover:bg-red-100"
          >
            <X size={12} />
            초기화
          </button>
        )}
      </div>
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={placeholder}
      className={cn(
        "h-8 rounded-lg border px-2.5 pr-7 text-[0.8125rem] outline-none transition",
        "appearance-none bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20",
        value
          ? "border-amber-300 bg-amber-50 font-semibold text-amber-700"
          : "border-slate-200 text-slate-600 hover:border-slate-300"
      )}
      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center" }}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}
