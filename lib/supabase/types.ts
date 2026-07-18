// Supabase 테이블 타입 정의
// 추후 `npx supabase gen types typescript --project-id <id>` 명령어로 자동 생성 가능

// 관리자 CRM 상태 (랜딩 → 수임 흐름)
export type ConsultationStatus =
  | "new"        // 신규 접수
  | "contacted"  // 연락 완료
  | "reviewing"  // 검토 중
  | "retained"   // 수임 완료
  | "closed";    // 종료

export type ConsultationSource = "landing" | "kakao" | "phone" | "referral";

// 첨부 파일 메타데이터 (원본은 Supabase Storage 비공개 버킷에 보관, DB엔 경로만)
export interface ConsultationAttachment {
  path: string;  // 버킷 내 저장 경로
  name: string;  // 원본 파일명
  size: number;  // 바이트
}

export interface ConsultationRow {
  id: string;
  name: string;
  phone: string;
  area: string;
  region: string | null;
  opponent_type: string | null;
  content: string;
  contact_time: string | null;
  preferred_at: string | null;   // 희망 상담 일시 (ISO, 예약 시)
  privacy_agreed: boolean;
  attachments: ConsultationAttachment[] | null;
  status: ConsultationStatus;
  source: ConsultationSource;
  memo: string | null;        // 내부 메모 (관리자용)
  created_at: string;
  updated_at: string | null;
}

// 관리자 목록용 (필드 동일, 명시적 alias)
export type AdminConsultation = ConsultationRow;

export interface AdminConsultationUpdate {
  status?: ConsultationStatus;
  memo?: string | null;
}

export interface ConsultationInsert {
  name: string;
  phone: string;
  area: string;
  region?: string | null;
  opponent_type?: string | null;
  content: string;
  contact_time?: string | null;
  preferred_at?: string | null;
  privacy_agreed: boolean;
  attachments?: ConsultationAttachment[];
  status?: ConsultationStatus;
  source?: ConsultationSource;
}

// Supabase v2 제네릭이 요구하는 전체 구조
export interface Database {
  public: {
    Tables: {
      consultations: {
        Row: ConsultationRow;
        Insert: ConsultationInsert;
        Update: Partial<ConsultationInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
