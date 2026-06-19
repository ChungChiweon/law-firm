import { createClient } from "@supabase/supabase-js";

// 클라이언트 사이드용 Supabase 인스턴스 (읽기 전용 용도)
// 환경변수 미설정 시 null 반환 — 호출 측에서 null 체크 후 사용
export function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}
