// ── 사건 유형 계층 구조 ───────────────────────────────
// 현재 활성: 관계범죄(relationshipCrime), 성범죄(sexualOffense)
// 추후 확장: 상속·이혼·부동산·민사·형사 추가 가능

export type ActiveCaseCategory = "relationshipCrime" | "sexualOffense";

export type FutureCaseCategory =
  | "inheritance"
  | "divorce"
  | "realEstate"
  | "civil"
  | "generalCriminal";

export type CaseCategory = ActiveCaseCategory | FutureCaseCategory;

// ── 현재 활성 상담 분야 값 (DB area 컬럼과 1:1 매핑) ──
export const ACTIVE_AREA_VALUES = [
  "sexual_crime",
  "dating_violence",
  "stalking",
  "digital_sex",
  "telecom_sex",
  "camera_crime",
  "domestic_violence",
  "workplace_sex",
  "other",
] as const;

export type ActiveAreaValue = (typeof ACTIVE_AREA_VALUES)[number];

// ── 카테고리별 분야 묶음 ──────────────────────────────
export const CASE_CATEGORY_MAP: Record<ActiveCaseCategory, ActiveAreaValue[]> = {
  relationshipCrime: [
    "dating_violence",
    "stalking",
    "domestic_violence",
  ],
  sexualOffense: [
    "sexual_crime",
    "digital_sex",
    "telecom_sex",
    "camera_crime",
    "workplace_sex",
  ],
};

// ── 추후 사건유형 추가 방법 ───────────────────────────
// 1. ACTIVE_AREA_VALUES에 새 값 추가 (예: "inheritance")
// 2. FutureCaseCategory → ActiveCaseCategory로 이동
// 3. CASE_CATEGORY_MAP에 해당 카테고리 배열 추가
// 4. lib/constants/practiceAreas.ts 에 카드 항목 추가
// 5. lib/constants/consultation.ts CONSULTATION_AREAS 추가
// 6. lib/constants/admin.ts AREA_LABEL / AREA_FILTER_OPTIONS 추가
// 7. app/api/consultation/route.ts VALID_AREAS에 추가
// 8. app/api/ai/summary/route.ts VALID_AREAS, AREA_LABELS에 추가
// 9. Supabase: CHECK 제약 업데이트 (docs/supabase-consultations.sql 참고)
