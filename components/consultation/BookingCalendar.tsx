"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils/cn";
import {
  getAvailableDates,
  getTimeSlots,
  type DateOption,
  type SlotOption,
} from "@/lib/booking";

export interface BookingValue {
  date: string; // YYYY-MM-DD
  time: string; // HH:00
}

interface BookingCalendarProps {
  value: BookingValue | null;
  onChange: (next: BookingValue | null) => void;
}

export function BookingCalendar({ value, onChange }: BookingCalendarProps) {
  // 컴포넌트 마운트 시점 기준 (렌더마다 now가 흔들리지 않도록 고정)
  const now = useMemo(() => new Date(), []);
  const dates = useMemo<DateOption[]>(() => getAvailableDates(now), [now]);

  const [activeDate, setActiveDate] = useState<string>(value?.date ?? dates[0]?.date ?? "");
  const slots = useMemo<SlotOption[]>(
    () => (activeDate ? getTimeSlots(activeDate, now) : []),
    [activeDate, now]
  );

  const selectDate = (date: string) => {
    setActiveDate(date);
    // 날짜를 바꾸면 시간 선택 초기화
    if (value?.date !== date) onChange(null);
  };

  const selectSlot = (time: string) => {
    if (value?.date === activeDate && value?.time === time) {
      onChange(null); // 같은 슬롯 재클릭 → 해제
    } else {
      onChange({ date: activeDate, time });
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* 날짜 선택 (가로 스크롤) */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {dates.map((d) => {
          const active = d.date === activeDate;
          return (
            <button
              key={d.date}
              type="button"
              onClick={() => selectDate(d.date)}
              className={cn(
                "flex min-w-[3.5rem] shrink-0 flex-col items-center gap-0.5 rounded-xl border px-3 py-2 transition-all active:scale-[0.97]",
                active
                  ? "border-amber-400 bg-amber-50 text-amber-700 shadow-[0_0_0_2px_rgba(245,158,11,0.15)]"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
              )}
            >
              <span className="text-[0.6875rem] text-slate-400">{d.month}월</span>
              <span className="text-base font-bold leading-none">{d.day}</span>
              <span className="text-[0.6875rem]">{d.weekday}</span>
            </button>
          );
        })}
      </div>

      {/* 시간 슬롯 */}
      {slots.length > 0 ? (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {slots.map((s) => {
            const selected = value?.date === activeDate && value?.time === s.time;
            return (
              <button
                key={s.time}
                type="button"
                onClick={() => selectSlot(s.time)}
                className={cn(
                  "rounded-xl border px-2 py-2.5 text-sm font-medium transition-all active:scale-[0.97]",
                  selected
                    ? "border-amber-400 bg-amber-500 text-white shadow-[0_2px_10px_rgba(245,158,11,0.3)]"
                    : "border-slate-200 bg-white text-slate-600 hover:border-amber-300 hover:bg-amber-50"
                )}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      ) : (
        <p className="rounded-xl bg-slate-50 px-4 py-3 text-[0.8125rem] text-slate-400">
          이 날짜는 예약 가능한 시간이 마감되었습니다. 다른 날짜를 선택해 주세요.
        </p>
      )}

      {value && (
        <p className="text-[0.8125rem] text-amber-700">
          선택됨: <strong>{value.date.split("-")[1]}월 {Number(value.date.split("-")[2])}일 · {slots.find((s) => s.time === value.time)?.label ?? value.time}</strong>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="ml-2 text-slate-400 underline underline-offset-2 hover:text-slate-600"
          >
            해제
          </button>
        </p>
      )}
    </div>
  );
}
