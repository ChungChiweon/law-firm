import type { PracticeArea } from "@/lib/types";

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: "sexual_crime",
    icon: "Shield",
    title: "성범죄 피해",
    description:
      "강제추행, 강간 등 성범죄 피해에 대해 고소 절차, 증거 보전, 피해자 진술 방법을 여성 변호사가 직접 안내합니다.",
    href: "/consultation?area=sexual_crime",
    category: "sexualOffense",
  },
  {
    id: "dating_violence",
    icon: "Heart",
    title: "데이트폭력 피해",
    description:
      "연인 관계에서 발생한 신체적·정신적 폭력, 협박 피해에 대해 신고 방법과 법적 보호 절차를 안내합니다.",
    href: "/consultation?area=dating_violence",
    category: "relationshipCrime",
  },
  {
    id: "stalking",
    icon: "Eye",
    title: "스토킹 피해",
    description:
      "스토킹처벌법에 따른 신고·고소, 접근금지 가처분, 긴급응급조치 신청까지 피해자 보호를 위한 절차를 지원합니다.",
    href: "/consultation?area=stalking",
    category: "relationshipCrime",
  },
  {
    id: "digital_sex",
    icon: "Monitor",
    title: "디지털 성범죄 피해",
    description:
      "불법 촬영물 유포·공유, 딥페이크 피해 등 디지털 성범죄에 대한 삭제 요청, 고소, 피해자 지원을 안내합니다.",
    href: "/consultation?area=digital_sex",
    category: "sexualOffense",
  },
  {
    id: "camera_crime",
    icon: "Camera",
    title: "카메라등이용촬영 피해",
    description:
      "동의 없는 촬영·유포 피해에 대해 신속한 삭제 요청, 형사 고소, 손해배상 청구 방법을 안내합니다.",
    href: "/consultation?area=camera_crime",
    category: "sexualOffense",
  },
  {
    id: "telecom_sex",
    icon: "MessageSquare",
    title: "통신매체이용음란 피해",
    description:
      "전화·문자·메신저 등을 통해 성적 수치심을 유발하는 내용을 받은 경우 고소 및 법적 대응 절차를 안내합니다.",
    href: "/consultation?area=telecom_sex",
    category: "sexualOffense",
  },
  {
    id: "workplace_sex",
    icon: "Briefcase",
    title: "직장·학교 성희롱·성비위",
    description:
      "직장 내 성희롱, 학교 내 성폭력 피해에 대해 신고·조사 절차, 피해자 보호 조치, 형사 처리를 지원합니다.",
    href: "/consultation?area=workplace_sex",
    category: "sexualOffense",
  },
  {
    id: "domestic_violence",
    icon: "Home",
    title: "가정폭력·관계폭력 피해",
    description:
      "가정폭력 피해 신고, 임시보호명령 신청, 피해자 분리 지원 등 안전한 보호를 위한 초기 대응을 함께합니다.",
    href: "/consultation?area=domestic_violence",
    category: "relationshipCrime",
  },
];
