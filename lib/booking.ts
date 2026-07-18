// ══════════════════════════════════════════════════════════════
// 상담 예약 슬롯 계산 (순수 함수 · 클라이언트/서버 공용)
// ──────────────────────────────────────────────────────────────
// 특정 날짜·시간을 골라 "희망 상담 일시"를 예약합니다.
// 실제 가용성 관리(변호사 일정 연동)는 추후 확장. 지금은 규칙 기반.
// ══════════════════════════════════════════════════════════════

export const BOOKING_CONFIG = {
  daysAhead: 14,                       // 오늘부터 며칠 내까지 선택 가능
  slotHours: [10, 11, 14, 15, 16, 17], // 예약 가능한 정시(시)
  weekdaysOnly: true,                  // 평일만 (토·일 제외)
  leadHours: 2,                        // 지금으로부터 최소 몇 시간 이후만
  timezoneOffset: "+09:00",            // KST 고정
};

const WEEKDAY_KO = ["일", "월", "화", "수", "목", "금", "토"];

export interface DateOption {
  date: string;    // YYYY-MM-DD
  day: number;     // 일
  month: number;   // 월
  weekday: string; // 한글 요일
  isWeekend: boolean;
}

export interface SlotOption {
  time: string;    // "HH:00"
  hour: number;
  label: string;   // "오후 2:00"
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function toDateStr(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// 선택 가능한 날짜 목록 (오늘부터 daysAhead일, 주말 제외 옵션)
export function getAvailableDates(now: Date = new Date()): DateOption[] {
  const out: DateOption[] = [];
  for (let i = 0; i <= BOOKING_CONFIG.daysAhead; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    const dow = d.getDay();
    const isWeekend = dow === 0 || dow === 6;
    if (BOOKING_CONFIG.weekdaysOnly && isWeekend) continue;
    out.push({
      date: toDateStr(d),
      day: d.getDate(),
      month: d.getMonth() + 1,
      weekday: WEEKDAY_KO[dow],
      isWeekend,
    });
  }
  return out;
}

// 시각 라벨 ("오후 2:00")
export function hourLabel(hour: number): string {
  const period = hour < 12 ? "오전" : "오후";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${period} ${h12}:00`;
}

// 특정 날짜의 예약 가능 슬롯 (오늘이면 leadHours 이내 시각 제외)
export function getTimeSlots(dateStr: string, now: Date = new Date()): SlotOption[] {
  const isToday = dateStr === toDateStr(now);
  const earliest = new Date(now.getTime() + BOOKING_CONFIG.leadHours * 3600_000);

  return BOOKING_CONFIG.slotHours
    .filter((hour) => {
      if (!isToday) return true;
      // 오늘이면 현재+leadHours 이후 시각만
      return hour > earliest.getHours() || (hour === earliest.getHours() && earliest.getMinutes() === 0);
    })
    .map((hour) => ({ time: `${pad(hour)}:00`, hour, label: hourLabel(hour) }));
}

// 연락 가능 시간 버킷 파생 (기존 contact_time 필드 호환)
export function toContactTimeBucket(hour: number): "morning" | "afternoon" | "evening" {
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
}

// 저장용 ISO 문자열 (KST 고정)
export function buildPreferredAt(dateStr: string, time: string): string {
  return new Date(`${dateStr}T${time}:00${BOOKING_CONFIG.timezoneOffset}`).toISOString();
}

// 표시용 라벨 ("8월 12일 (화) 오후 2:00")
export function formatPreferred(dateStr: string, time: string): string {
  const [, m, d] = dateStr.split("-").map(Number);
  const wd = WEEKDAY_KO[new Date(`${dateStr}T12:00:00`).getDay()];
  const hour = Number(time.split(":")[0]);
  return `${m}월 ${d}일 (${wd}) ${hourLabel(hour)}`;
}

// ISO 문자열 → 표시용 라벨 (관리자/알림용, KST)
export function formatPreferredAt(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    month: "long",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
