import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { ConsultationInsert, ConsultationAttachment } from "@/lib/supabase/types";
import { notifyNewConsultation } from "@/lib/notify";
import { MAX_FILES } from "@/lib/constants/upload";

// ── 서버 전용 Supabase 클라이언트 ───────────────────
// API Route는 서버에서만 실행되므로 직접 생성
// 제네릭 없이 생성 후 insert 시 타입 캐스팅 — supabase-js v2 복잡한 추론 우회
function getSupabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Supabase 환경변수가 설정되지 않았습니다.");
  }
  return createClient(url, key);
}

// ── 허용된 상담 분야 값 (관계범죄·성범죄 중심) ──────────
const VALID_AREAS = new Set([
  "sexual_crime", "dating_violence", "stalking",
  "digital_sex", "telecom_sex", "camera_crime",
  "domestic_violence", "workplace_sex", "other",
]);

// ── 허용된 상대방 유형 값 ────────────────────────────
const VALID_OPPONENT_TYPES = new Set([
  "victim_self", "family_support", "other",
]);

// ── 허용된 연락 가능 시간 값 ─────────────────────────
const VALID_CONTACT_TIMES = new Set([
  "morning", "afternoon", "evening", "anytime",
]);

// ── 서버 사이드 입력 검증 ────────────────────────────
interface ValidationResult {
  ok: boolean;
  message?: string;
}

function validatePayload(body: unknown): ValidationResult {
  if (!body || typeof body !== "object") {
    return { ok: false, message: "잘못된 요청 형식입니다." };
  }

  const data = body as Record<string, unknown>;

  // 필수값 검증
  if (!data.name || typeof data.name !== "string" || !data.name.trim()) {
    return { ok: false, message: "이름을 입력해 주세요." };
  }
  if (data.name.trim().length > 50) {
    return { ok: false, message: "이름이 너무 깁니다." };
  }

  if (!data.phone || typeof data.phone !== "string" || !data.phone.trim()) {
    return { ok: false, message: "연락처를 입력해 주세요." };
  }
  if (!/^[0-9\-\s+()]{7,20}$/.test(data.phone.trim())) {
    return { ok: false, message: "올바른 연락처 형식이 아닙니다." };
  }

  if (!data.area || typeof data.area !== "string" || !VALID_AREAS.has(data.area)) {
    return { ok: false, message: "올바른 상담 분야를 선택해 주세요." };
  }

  if (!data.content || typeof data.content !== "string" || data.content.trim().length < 10) {
    return { ok: false, message: "상담 내용을 10자 이상 입력해 주세요." };
  }
  if (data.content.trim().length > 5000) {
    return { ok: false, message: "상담 내용은 5000자 이내로 입력해 주세요." };
  }

  // 개인정보 동의 필수
  if (data.privacyAgreed !== true) {
    return { ok: false, message: "개인정보 수집·이용에 동의해 주세요." };
  }

  // 선택값 enum 검증
  if (
    data.opponentType &&
    typeof data.opponentType === "string" &&
    !VALID_OPPONENT_TYPES.has(data.opponentType)
  ) {
    return { ok: false, message: "올바른 상대방 유형을 선택해 주세요." };
  }

  if (
    data.contactTime &&
    typeof data.contactTime === "string" &&
    !VALID_CONTACT_TIMES.has(data.contactTime)
  ) {
    return { ok: false, message: "올바른 연락 가능 시간을 선택해 주세요." };
  }

  return { ok: true };
}

// ── 첨부 파일 목록 정제 ──────────────────────────────
// 클라이언트가 보낸 attachments를 신뢰하지 않고 형식만 통과시킵니다.
// (실제 파일은 업로드 API가 이미 검증·저장한 뒤 경로만 전달됨)
function sanitizeAttachments(raw: unknown): ConsultationAttachment[] {
  if (!Array.isArray(raw)) return [];
  const out: ConsultationAttachment[] = [];
  for (const item of raw.slice(0, MAX_FILES)) {
    if (
      item &&
      typeof item === "object" &&
      typeof (item as Record<string, unknown>).path === "string" &&
      typeof (item as Record<string, unknown>).name === "string" &&
      typeof (item as Record<string, unknown>).size === "number"
    ) {
      const a = item as Record<string, unknown>;
      out.push({
        path: (a.path as string).slice(0, 300),
        name: (a.name as string).slice(0, 200),
        size: a.size as number,
      });
    }
  }
  return out;
}

// ── POST /api/consultation ───────────────────────────
export async function POST(request: NextRequest) {
  // Content-Type 확인
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { success: false, message: "Content-Type은 application/json이어야 합니다." },
      { status: 400 }
    );
  }

  // Body 파싱
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "요청 데이터를 파싱할 수 없습니다." },
      { status: 400 }
    );
  }

  // 서버 사이드 검증
  const validation = validatePayload(body);
  if (!validation.ok) {
    return NextResponse.json(
      { success: false, message: validation.message },
      { status: 422 }
    );
  }

  const data = body as Record<string, unknown>;
  const attachments = sanitizeAttachments(data.attachments);

  // 희망 상담 일시: 유효한 ISO이고 과거가 아닌 경우만 저장
  let preferredAt: string | null = null;
  if (typeof data.preferredAt === "string" && data.preferredAt) {
    const t = Date.parse(data.preferredAt);
    if (!Number.isNaN(t) && t > Date.now() - 3600_000) {
      preferredAt = new Date(t).toISOString();
    }
  }

  // Supabase insert 페이로드 구성
  const insertPayload: ConsultationInsert = {
    name: (data.name as string).trim(),
    phone: (data.phone as string).trim(),
    area: data.area as string,
    region: data.region ? (data.region as string).trim() || null : null,
    opponent_type: data.opponentType ? (data.opponentType as string) : null,
    content: (data.content as string).trim(),
    contact_time: data.contactTime ? (data.contactTime as string) : null,
    preferred_at: preferredAt,
    privacy_agreed: true,
    attachments,
    status: "new",
    source: "landing",
  };

  // Supabase insert
  try {
    const supabase = getSupabaseServer();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from("consultations")
      .insert(insertPayload as ConsultationInsert);

    if (error) {
      console.error("[Consultation API] Supabase error:", error.message);
      return NextResponse.json(
        {
          success: false,
          message:
            "일시적으로 접수가 원활하지 않습니다. 카카오톡 상담을 이용해 주시거나 전화로 문의해 주세요.",
        },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("[Consultation API] Unexpected error:", err);
    return NextResponse.json(
      {
        success: false,
        message:
          "일시적으로 접수가 원활하지 않습니다. 카카오톡 상담을 이용해 주시거나 전화로 문의해 주세요.",
      },
      { status: 500 }
    );
  }

  // ── 접수 알림 (변호사에게 즉시 통지) ──────────────────
  // 알림 실패가 접수 성공을 막지 않도록 방어적으로 처리합니다.
  try {
    await notifyNewConsultation({
      name: insertPayload.name,
      phone: insertPayload.phone,
      area: insertPayload.area,
      region: insertPayload.region,
      contactTime: insertPayload.contact_time,
      preferredAt: insertPayload.preferred_at,
      content: insertPayload.content,
      attachmentCount: attachments.length,
    });
  } catch (err) {
    console.error("[Consultation API] 알림 발송 예외:", err);
  }

  return NextResponse.json(
    { success: true, message: "상담 신청이 접수되었습니다." },
    { status: 201 }
  );
}
