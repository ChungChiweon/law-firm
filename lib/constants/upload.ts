// ══════════════════════════════════════════════════════════════
// 상담 첨부 파일 제한 (클라이언트·서버 공용 순수 상수)
// supabase-js를 클라이언트 번들에 끌어오지 않도록 상수만 분리했습니다.
// ══════════════════════════════════════════════════════════════

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const MAX_FILES = 5;

// 허용 MIME 타입 (이미지 + PDF)
export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/pdf",
] as const;

// <input accept="..."> 속성값
export const ACCEPT_ATTR = "image/*,.pdf,.heic,.heif";

export function isAllowedType(mime: string): boolean {
  return (ALLOWED_MIME_TYPES as readonly string[]).includes(mime);
}

export function humanSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
