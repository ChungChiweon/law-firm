import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// ══════════════════════════════════════════════════════════════
// 상담 첨부 파일 스토리지 (서버 전용)
// ──────────────────────────────────────────────────────────────
// Supabase Storage의 비공개 버킷에 증거 파일을 보관합니다.
// 업로드/서명URL 생성은 service_role 키를 사용해 서버에서만 수행하며,
// 버킷은 공개되지 않습니다. (docs/supabase-consultations.sql 하단 참고)
// ══════════════════════════════════════════════════════════════

export const CONSULTATION_BUCKET = "consultation-files";

// 서명 URL 유효 시간(초) — 관리자가 첨부를 열람할 때 사용
export const SIGNED_URL_TTL = 60 * 10; // 10분

// 스토리지 접근용 서버 클라이언트 (service_role 우선, 없으면 anon)
export function getStorageClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Supabase 환경변수가 설정되지 않았습니다.");
  }
  return createClient(url, key);
}

// 안전한 저장 경로 생성: YYYY/MM/uuid-원본명(정제)
export function buildStoragePath(originalName: string): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const uuid =
    globalThis.crypto?.randomUUID?.() ??
    Math.random().toString(36).slice(2);
  // 파일명에서 경로 구분자·제어문자 제거, 길이 제한
  const safe = originalName
    .replace(/[/\\?%*:|"<>\x00-\x1f]/g, "_")
    .slice(-80);
  return `${yyyy}/${mm}/${uuid}-${safe}`;
}
