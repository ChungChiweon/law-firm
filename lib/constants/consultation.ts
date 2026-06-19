import type {
  SelectOption,
  ConsultationArea,
  OpponentType,
  ContactTime,
} from "@/lib/types";

export const CONSULTATION_AREAS: SelectOption<ConsultationArea>[] = [
  { value: "sexual_crime",      label: "성범죄 피해" },
  { value: "dating_violence",   label: "데이트폭력 피해" },
  { value: "stalking",          label: "스토킹 피해" },
  { value: "digital_sex",       label: "디지털 성범죄 피해" },
  { value: "camera_crime",      label: "카메라등이용촬영 피해" },
  { value: "telecom_sex",       label: "통신매체이용음란 피해" },
  { value: "workplace_sex",     label: "직장·학교 성희롱·성비위" },
  { value: "domestic_violence", label: "가정폭력·관계폭력 피해" },
  { value: "other",             label: "기타" },
];

// URL querystring area 파라미터 → 폼 value 매핑
export const AREA_QUERY_MAP: Record<string, ConsultationArea> = {
  sexual_crime:      "sexual_crime",
  dating_violence:   "dating_violence",
  stalking:          "stalking",
  digital_sex:       "digital_sex",
  camera_crime:      "camera_crime",
  telecom_sex:       "telecom_sex",
  workplace_sex:     "workplace_sex",
  domestic_violence: "domestic_violence",
  other:             "other",
};

export const OPPONENT_TYPES: SelectOption<OpponentType>[] = [
  { value: "victim_self",    label: "피해 당사자" },
  { value: "family_support", label: "가족·지인 (대리 상담)" },
  { value: "other",          label: "기타·상황에 따라 안내 가능" },
];

export const CONTACT_TIMES: SelectOption<ContactTime>[] = [
  { value: "morning",   label: "오전 (09:00 – 12:00)" },
  { value: "afternoon", label: "오후 (12:00 – 18:00)" },
  { value: "evening",   label: "저녁 (18:00 – 20:00)" },
  { value: "anytime",   label: "언제든 가능" },
];

export const GUIDE_ITEMS = [
  {
    icon: "Lock",
    title: "상담 내용은 비공개로 관리됩니다",
    description:
      "모든 상담 내용은 변호사 비밀 유지 의무에 따라 철저히 보호됩니다. 외부 공개는 절대 없습니다.",
  },
  {
    icon: "UserCheck",
    title: "여성 변호사가 직접 검토합니다",
    description:
      "접수된 상담 내용은 여성 담당 변호사가 직접 확인합니다. 편하게 말씀해 주시면 됩니다.",
  },
  {
    icon: "Clock",
    title: "초기 대응이 중요합니다",
    description:
      "경찰 조사·출석 일정이 있는 경우 빠른 변호사 검토가 필요합니다. 접수 후 우선 연락드립니다.",
  },
  {
    icon: "ShieldOff",
    title: "결과를 보장하지 않습니다",
    description:
      "최선을 다해 지원하지만 결과를 미리 약속하거나 보장하지 않습니다. 수임 강요는 없습니다.",
  },
] as const;

export const PRIVACY_POLICY_TEXT = `수집 항목: 이름, 연락처, 상담 내용
수집 목적: 법률 상담 서비스 제공 및 회신
보유 기간: 상담 완료 후 1년`;
