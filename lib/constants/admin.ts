import type { ConsultationStatus } from "@/lib/supabase/types";

export interface StatusConfig {
  label: string;
  color: "slate" | "blue" | "amber" | "green" | "zinc";
}

export const STATUS_CONFIG: Record<ConsultationStatus, StatusConfig> = {
  new:       { label: "신규",     color: "blue"  },
  contacted: { label: "연락완료", color: "amber" },
  reviewing: { label: "검토중",   color: "slate" },
  retained:  { label: "수임완료", color: "green" },
  closed:    { label: "종료",     color: "zinc"  },
};

export const STATUS_OPTIONS = (
  Object.entries(STATUS_CONFIG) as [ConsultationStatus, StatusConfig][]
).map(([value, cfg]) => ({ value, label: cfg.label }));

// ── 상담 분야 라벨 (피해자 중심) ──────────────────────
export const AREA_LABEL: Record<string, string> = {
  sexual_crime:      "성범죄 피해",
  dating_violence:   "데이트폭력 피해",
  stalking:          "스토킹 피해",
  digital_sex:       "디지털 성범죄",
  camera_crime:      "카메라등이용촬영",
  telecom_sex:       "통신매체이용음란",
  workplace_sex:     "직장·학교 성비위",
  domestic_violence: "가정폭력·관계폭력",
  other:             "기타",
};

export const OPPONENT_LABEL: Record<string, string> = {
  victim_self:    "피해 당사자",
  family_support: "가족·지인",
  other:          "기타",
};

export const CONTACT_TIME_LABEL: Record<string, string> = {
  morning:   "오전 09–12시",
  afternoon: "오후 12–18시",
  evening:   "저녁 18–20시",
  anytime:   "언제든 가능",
};

export const SOURCE_LABEL: Record<string, string> = {
  landing:  "랜딩페이지",
  kakao:    "카카오톡",
  phone:    "전화",
  referral: "소개",
};

export const AREA_FILTER_OPTIONS = [
  { value: "",                  label: "전체 분야" },
  { value: "sexual_crime",      label: "성범죄 피해" },
  { value: "dating_violence",   label: "데이트폭력 피해" },
  { value: "stalking",          label: "스토킹 피해" },
  { value: "digital_sex",       label: "디지털 성범죄" },
  { value: "camera_crime",      label: "카메라등이용촬영" },
  { value: "telecom_sex",       label: "통신매체이용음란" },
  { value: "workplace_sex",     label: "직장·학교 성비위" },
  { value: "domestic_violence", label: "가정폭력·관계폭력" },
  { value: "other",             label: "기타" },
];
