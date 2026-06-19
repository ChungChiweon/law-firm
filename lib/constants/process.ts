import type { ProcessStep } from "@/lib/types";

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: "상담 접수",
    description:
      "온라인 양식 또는 카카오톡으로 간단한 내용을 남겨주세요. 어떤 내용이든 괜찮습니다.",
  },
  {
    step: 2,
    title: "내용 확인",
    description:
      "접수된 내용을 바탕으로 상황과 긴급도를 검토합니다. 빠른 대응이 필요한 경우 우선 처리합니다.",
  },
  {
    step: 3,
    title: "변호사 검토",
    description:
      "여성 담당 변호사가 직접 내용을 검토하고 도움이 될 수 있는 방향을 살펴봅니다.",
  },
  {
    step: 4,
    title: "상담 진행",
    description:
      "전화, 카카오톡 또는 방문으로 상담이 진행됩니다. 결정은 언제나 의뢰인이 합니다.",
  },
];
