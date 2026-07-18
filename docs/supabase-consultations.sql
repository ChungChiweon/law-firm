-- ============================================================
-- 관계범죄 상담센터 — Supabase consultations 테이블 생성 SQL
-- Supabase Dashboard → SQL Editor 에 붙여넣고 실행하세요.
-- ============================================================

-- 1. 테이블 생성
CREATE TABLE IF NOT EXISTS consultations (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name           TEXT        NOT NULL,
  phone          TEXT        NOT NULL,
  area           TEXT        NOT NULL,
  region         TEXT,
  opponent_type  TEXT,
  content        TEXT        NOT NULL,
  contact_time   TEXT,
  preferred_at   TIMESTAMPTZ,
  privacy_agreed BOOLEAN     NOT NULL DEFAULT false,
  attachments    JSONB       NOT NULL DEFAULT '[]'::jsonb,
  status         TEXT        NOT NULL DEFAULT 'new',
  source         TEXT        NOT NULL DEFAULT 'landing',
  memo           TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ
);

-- 2. 인덱스 (조회 성능)
CREATE INDEX IF NOT EXISTS idx_consultations_status     ON consultations (status);
CREATE INDEX IF NOT EXISTS idx_consultations_created_at ON consultations (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultations_area       ON consultations (area);

-- 3. updated_at 자동 갱신 트리거
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_consultations_updated_at
  BEFORE UPDATE ON consultations
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 4. status, source, area ENUM 제약 (CHECK)
ALTER TABLE consultations
  ADD CONSTRAINT chk_status CHECK (
    status IN ('new', 'contacted', 'reviewing', 'retained', 'closed')
  );

ALTER TABLE consultations
  ADD CONSTRAINT chk_source CHECK (
    source IN ('landing', 'kakao', 'phone', 'referral')
  );

ALTER TABLE consultations
  ADD CONSTRAINT chk_area CHECK (
    area IN (
      'sexual_crime', 'dating_violence', 'stalking',
      'digital_sex', 'telecom_sex', 'camera_crime',
      'domestic_violence', 'workplace_sex', 'other'
    )
  );

-- 기존 테이블 마이그레이션 (area 제약 변경):
-- ALTER TABLE consultations DROP CONSTRAINT IF EXISTS chk_area;
-- ALTER TABLE consultations ADD CONSTRAINT chk_area CHECK (
--   area IN (
--     'sexual_crime', 'dating_violence', 'stalking',
--     'digital_sex', 'telecom_sex', 'camera_crime',
--     'domestic_violence', 'workplace_sex', 'other'
--   )
-- );

-- 5. RLS (Row Level Security) 설정
-- anon 키는 INSERT만 허용, SELECT/UPDATE/DELETE는 service_role만 가능

ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- 랜딩페이지 방문자: 자신의 행 INSERT만 허용 (privacy_agreed = true 필수)
CREATE POLICY "anon_insert_consultations"
  ON consultations
  FOR INSERT
  TO anon
  WITH CHECK (privacy_agreed = true);

-- service_role: 전체 권한 (관리자 API에서 사용)
-- service_role 은 RLS 를 우회하므로 별도 정책 불필요

-- 6. 컬럼 설명 (선택)
COMMENT ON TABLE  consultations               IS '법률 상담 신청 접수 데이터';
COMMENT ON COLUMN consultations.area          IS '상담 분야: sexual_crime|dating_violence|stalking|digital_sex|telecom_sex|camera_crime|domestic_violence|workplace_sex|other';
COMMENT ON COLUMN consultations.opponent_type IS '상대방 유형: family|individual|company|landlord|other';
COMMENT ON COLUMN consultations.contact_time  IS '연락 가능 시간: morning|afternoon|evening|anytime';
COMMENT ON COLUMN consultations.status        IS '처리 상태: new|contacted|reviewing|retained|closed';
COMMENT ON COLUMN consultations.source        IS '접수 경로: landing|kakao|phone|referral';
COMMENT ON COLUMN consultations.memo          IS '내부 메모 (의뢰인에게 비공개)';
COMMENT ON COLUMN consultations.updated_at    IS '최종 수정일시 (트리거 자동 갱신)';

-- 기존 테이블에 컬럼 추가 (이미 테이블이 있는 경우)
-- ALTER TABLE consultations ADD COLUMN IF NOT EXISTS memo TEXT;
-- ALTER TABLE consultations ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ;
-- ALTER TABLE consultations ADD COLUMN IF NOT EXISTS attachments JSONB NOT NULL DEFAULT '[]'::jsonb;
-- ALTER TABLE consultations ADD COLUMN IF NOT EXISTS preferred_at TIMESTAMPTZ;
-- ALTER TABLE consultations DROP CONSTRAINT IF EXISTS chk_status;
-- ALTER TABLE consultations ADD CONSTRAINT chk_status CHECK (
--   status IN ('new', 'contacted', 'reviewing', 'retained', 'closed')
-- );

-- ============================================================
-- 7. 첨부 파일용 Storage 비공개 버킷 + 정책
-- ------------------------------------------------------------
-- 상담 신청 시 증거 파일(이미지·PDF)을 비공개로 보관합니다.
-- 업로드/열람은 서버(service_role)에서만 수행하므로 공개하지 않습니다.
-- ------------------------------------------------------------

-- 7-1. 비공개 버킷 생성 (public = false)
INSERT INTO storage.buckets (id, name, public)
VALUES ('consultation-files', 'consultation-files', false)
ON CONFLICT (id) DO NOTHING;

-- 7-2. (선택) anon 업로드를 서버 프록시 대신 직접 허용하려는 경우에만 사용.
--      본 프로젝트는 service_role 서버 업로드를 사용하므로 기본은 불필요합니다.
--      service_role 은 RLS 를 우회하므로 별도 정책 없이 업로드·서명URL 발급이 됩니다.
--
-- CREATE POLICY "anon_upload_consultation_files"
--   ON storage.objects FOR INSERT TO anon
--   WITH CHECK (bucket_id = 'consultation-files');

-- ⚠️ 주의: SUPABASE_SERVICE_ROLE_KEY 환경변수가 설정되어 있어야
--          파일 업로드(/api/consultation/upload)와 관리자 열람이 동작합니다.

-- ============================================================
-- 실행 확인 쿼리
-- SELECT * FROM consultations ORDER BY created_at DESC LIMIT 10;
-- SELECT id, public FROM storage.buckets WHERE id = 'consultation-files';
-- ============================================================
