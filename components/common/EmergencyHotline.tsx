import { SITE_CONFIG } from "@/lib/constants/site";

// ══════════════════════════════════════════════════════════════
// 긴급 지원 핫라인 배너 (24시간 공공기관)
// ──────────────────────────────────────────────────────────────
// 상담센터 연결 전, 지금 위험한 피해자가 먼저 연락할 공식 창구를
// 사이트 최상단에 상시 노출합니다. (app/layout.tsx에서 렌더)
// 번호는 lib/constants/site.ts의 emergencyContacts에서 관리합니다.
// ══════════════════════════════════════════════════════════════

export function EmergencyHotline() {
  const contacts = SITE_CONFIG.emergencyContacts;

  return (
    <aside
      role="complementary"
      aria-label="긴급 지원 연락처"
      className="fixed inset-x-0 top-0 z-[60] flex h-9 w-full items-center border-b border-rose-200 bg-rose-50 text-rose-900 print:hidden"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 overflow-x-auto whitespace-nowrap px-4 sm:gap-4 sm:px-6">
        <p className="flex shrink-0 items-center gap-1.5 text-xs font-bold sm:text-sm">
          <AlertIcon />
          지금 위험하다면
        </p>
        <ul className="flex shrink-0 items-center gap-x-4">
          {contacts.map((c) => (
            <li key={c.tel} className="text-xs sm:text-sm">
              <a
                href={`tel:${c.tel.replace(/[^0-9]/g, "")}`}
                className="font-semibold underline-offset-2 hover:underline"
              >
                {c.label} <span className="font-bold tabular-nums">{c.tel}</span>
              </a>
              <span className="ml-1 text-rose-500">· {c.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function AlertIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
    </svg>
  );
}
