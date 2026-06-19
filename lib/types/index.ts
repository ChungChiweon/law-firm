export interface PracticeArea {
  id: string;
  icon: string;
  title: string;
  description: string;
  href: string;
  category?: string;
}

export interface TrustPoint {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface LawyerProfile {
  id: string;
  name: string;
  title: string;
  imageUrl?: string;
  education: string[];
  career: string[];
  specialties: string[];
  bio: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface NavItem {
  label: string;
  href: string;
}

// ── 상담 신청 ──────────────────────────────────────────
// 피해자 중심 상담 분야
// 추후 확장: caseTypes.ts의 FutureCaseCategory 참고
export type ConsultationArea =
  | "sexual_crime"      // 성범죄 피해
  | "dating_violence"   // 데이트폭력 피해
  | "stalking"          // 스토킹 피해
  | "digital_sex"       // 디지털 성범죄 피해
  | "camera_crime"      // 카메라등이용촬영 피해
  | "telecom_sex"       // 통신매체이용음란 피해
  | "workplace_sex"     // 직장·학교 내 성희롱/성비위 피해
  | "domestic_violence" // 가정폭력·관계폭력 피해
  | "other";            // 기타

export type OpponentType =
  | "victim_self"    // 피해 당사자
  | "family_support" // 가족·지인 (대리 상담)
  | "other";

export type ContactTime =
  | "morning"
  | "afternoon"
  | "evening"
  | "anytime";

export interface ConsultationFormData {
  name: string;
  phone: string;
  area: ConsultationArea | "";
  region: string;
  opponentType: OpponentType | "";
  content: string;
  contactTime: ContactTime | "";
  privacyAgreed: boolean;
}

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
}
