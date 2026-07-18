import { CONSULTATION_AREAS, CONTACT_TIMES } from "@/lib/constants/consultation";
import { formatPreferredAt } from "@/lib/booking";

// ══════════════════════════════════════════════════════════════
// 새 상담 접수 알림
// ──────────────────────────────────────────────────────────────
// 상담이 접수되면 변호사에게 즉시 알립니다. (골든타임 = 수임률)
// 설정된 채널만 발송되며, 미설정·실패해도 접수 자체는 절대 막지 않습니다.
//
// 필요한 환경변수(.env.local / Vercel) — 있는 것만 발송됩니다:
//   SLACK_WEBHOOK_URL   Slack Incoming Webhook URL
//   RESEND_API_KEY      Resend API Key   (이메일 발송용)
//   NOTIFY_EMAIL_TO     알림 받을 이메일 주소 (Resend 사용 시 필수)
//   NOTIFY_EMAIL_FROM   발신 주소 (미설정 시 onboarding@resend.dev)
//
// ※ 카카오 알림톡은 채널 승인 + 템플릿 심사 + 발송대행사(솔라피/알리고 등)
//    연동이 필요합니다. 아래 sendKakaoAlimtalk 자리에 연동을 추가하세요.
// ══════════════════════════════════════════════════════════════

export interface ConsultationNotice {
  name: string;
  phone: string;
  area: string;
  region?: string | null;
  contactTime?: string | null;
  preferredAt?: string | null;
  content: string;
  attachmentCount?: number;
}

function labelOf<T extends { value: string; label: string }>(
  list: readonly T[],
  value?: string | null
): string {
  if (!value) return "-";
  return list.find((o) => o.value === value)?.label ?? value;
}

function buildLines(d: ConsultationNotice): string[] {
  const time = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  return [
    `이름: ${d.name}`,
    `연락처: ${d.phone}`,
    `분야: ${labelOf(CONSULTATION_AREAS, d.area)}`,
    `지역: ${d.region || "-"}`,
    `연락 가능 시간: ${labelOf(CONTACT_TIMES, d.contactTime)}`,
    `희망 상담 일시: ${d.preferredAt ? formatPreferredAt(d.preferredAt) : "미지정"}`,
    `첨부 파일: ${d.attachmentCount ? `${d.attachmentCount}개 (관리자 페이지에서 확인)` : "없음"}`,
    `접수 시각: ${time}`,
    "",
    "내용:",
    d.content,
  ];
}

// ── Slack ────────────────────────────────────────────────────
async function sendSlack(d: ConsultationNotice): Promise<void> {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return;
  const text = `🔔 *새 상담 접수*\n${buildLines(d).join("\n")}`;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
}

// ── Email (Resend) ───────────────────────────────────────────
async function sendEmail(d: ConsultationNotice): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL_TO;
  if (!apiKey || !to) return;
  const from = process.env.NOTIFY_EMAIL_FROM || "onboarding@resend.dev";
  const html = `<h2>새 상담 접수</h2><pre style="font:14px/1.6 sans-serif;white-space:pre-wrap">${buildLines(
    d
  )
    .join("\n")
    .replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]!))}</pre>`;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `[상담접수] ${d.name} · ${labelOf(CONSULTATION_AREAS, d.area)}`,
      html,
    }),
  });
}

// ── 카카오 알림톡 (연동 자리) ─────────────────────────────────
// 발송대행사 연동 후 이 함수 안에서 호출하세요. 현재는 no-op.
async function sendKakaoAlimtalk(_d: ConsultationNotice): Promise<void> {
  // 예: 솔라피/알리고 REST API 호출 (승인된 템플릿 필요)
  return;
}

// ── 통합 진입점 ──────────────────────────────────────────────
// 절대 throw하지 않습니다. 각 채널 실패는 로그만 남기고 넘어갑니다.
export async function notifyNewConsultation(d: ConsultationNotice): Promise<void> {
  const results = await Promise.allSettled([
    sendSlack(d),
    sendEmail(d),
    sendKakaoAlimtalk(d),
  ]);
  results.forEach((r, i) => {
    if (r.status === "rejected") {
      const ch = ["Slack", "Email", "Alimtalk"][i];
      console.error(`[notify] ${ch} 발송 실패:`, r.reason);
    }
  });
}
