import type { TrustPoint } from "@/lib/types";

export const TRUST_POINTS: TrustPoint[] = [
  {
    id: "female-lawyer",
    icon: "UserCheck",
    title: "여성 변호사 직접 상담",
    description:
      "여성 담당 변호사가 직접 사건을 검토하고 상담합니다. 말씀하기 어려운 내용도 편하게 전해주세요.",
  },
  {
    id: "privacy",
    icon: "ShieldCheck",
    title: "완전한 비공개 관리",
    description:
      "모든 상담 내용은 변호사 비밀 유지 의무에 따라 철저히 보호됩니다. 가족에게도 공개하지 않습니다.",
  },
  {
    id: "speed",
    icon: "Zap",
    title: "초기 대응 중심",
    description:
      "접수 후 영업일 기준 1일 이내 연락드립니다. 경찰 출석·조사 일정이 있는 경우 우선 처리합니다.",
  },
  {
    id: "honest",
    icon: "Target",
    title: "솔직한 안내",
    description:
      "결과를 보장하거나 과장하지 않습니다. 현재 상황에서 할 수 있는 것을 정확하게 안내합니다.",
  },
];
