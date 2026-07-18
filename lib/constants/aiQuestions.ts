// ── AI 6문답 질문 정의 ────────────────────────────────
// 질문 순서 변경, 추가/삭제, 선택지 수정은 이 파일만 편집하면 됩니다.
// AiConsultationChat.tsx는 이 배열을 읽어 렌더링합니다.

export interface AiQuestionOption {
  value: string;
  label: string;
  emoji?: string;
}

export interface AiQuestion {
  /** DB/요약 적재 시 사용되는 키 (영문 snake_case) */
  key: string;
  /** 질문 제목 — 채팅 버블에 표시 */
  question: string;
  /** 질문 설명 — 질문 아래 보조 텍스트 */
  hint: string;
  /** 입력 방식 */
  type: "chips" | "chips-multi" | "text" | "textarea";
  /** chips / chips-multi일 때 선택지 목록 */
  options?: AiQuestionOption[];
  /** 필수 여부 */
  required: boolean;
  /** text / textarea 글자수 제한 */
  maxLength?: number;
  /** 진행률 바에 표시되는 짧은 단계 레이블 (최대 4자 권장) */
  stepLabel: string;
  /** textarea 예시 문구 목록 */
  examples?: string[];
}

// ── 관리자/AI 요약 레이블 맵 ─────────────────────────
// chips/chips-multi 선택지의 value → 한글 레이블 변환에 사용합니다.
export const AI_QUESTION_LABEL_MAP: Record<string, Record<string, string>> = {
  area: {
    dating_violence:   "데이트폭력",
    stalking:          "스토킹",
    sexual_assault:    "강제추행",
    digital_sex:       "디지털 성범죄",
    telecom_sex:       "통신매체이용음란",
    camera_crime:      "불법촬영",
    domestic_violence: "가정폭력",
    workplace_sex:     "직장·학교 내 성비위",
    other:             "기타",
  },
  role: {
    victim:   "피해자",
    family:   "가족·지인",
    unknown:  "잘 모르겠음",
  },
  stage: {
    before_report:    "아직 신고 전",
    police_scheduled: "경찰 조사 예정",
    police_ongoing:   "경찰 조사 진행 중",
    prosecution:      "검찰 단계",
    trial:            "재판 진행 중",
    unknown:          "잘 모르겠음",
  },
  urgency: {
    today_tomorrow: "오늘 또는 내일",
    within_3days:   "3일 이내",
    within_week:    "1주일 이내",
    within_month:   "1개월 이내",
    not_urgent:     "급하지 않음",
  },
  concerns: {
    police_response:  "경찰 조사 대응",
    complaint:        "고소 여부",
    settlement:       "합의 문제",
    evidence:         "증거 확보",
    protection:       "접근금지·보호조치",
    second_harm:      "2차 피해 방지",
    privacy:          "신원 노출·비밀 유지",
    other_concern:    "기타",
  },
};

// ── 질문 목록 ─────────────────────────────────────────
export const AI_QUESTIONS: AiQuestion[] = [
  {
    key:      "area",
    stepLabel: "유형",
    question: "어떤 일로 상담을 원하시나요?",
    hint:     "가장 가까운 유형을 선택해 주세요. 정확하지 않아도 괜찮습니다.",
    type:     "chips",
    required: true,
    options: [
      { value: "dating_violence",   label: "데이트폭력"         },
      { value: "stalking",          label: "스토킹"              },
      { value: "sexual_assault",    label: "강제추행"            },
      { value: "digital_sex",       label: "디지털 성범죄"       },
      { value: "telecom_sex",       label: "통신매체이용음란"    },
      { value: "camera_crime",      label: "불법촬영"            },
      { value: "domestic_violence", label: "가정폭력"            },
      { value: "workplace_sex",     label: "직장·학교 내 성비위" },
      { value: "other",             label: "기타"                },
    ],
  },
  {
    key:      "role",
    stepLabel: "입장",
    question: "현재 입장은 무엇인가요?",
    hint:     "현재 상황에 가장 가까운 것을 선택해 주세요.",
    type:     "chips",
    required: true,
    options: [
      { value: "victim",  label: "피해자"      },
      { value: "family",  label: "가족·지인"    },
      { value: "unknown", label: "잘 모르겠음"  },
    ],
  },
  {
    key:      "stage",
    stepLabel: "진행",
    question: "사건은 어느 정도 진행되었나요?",
    hint:     "현재 상황에 가장 가까운 단계를 선택해 주세요.",
    type:     "chips",
    required: true,
    options: [
      { value: "before_report",    label: "아직 신고 전"      },
      { value: "police_scheduled", label: "경찰 조사 예정"    },
      { value: "police_ongoing",   label: "경찰 조사 진행 중" },
      { value: "prosecution",      label: "검찰 단계"         },
      { value: "trial",            label: "재판 진행 중"      },
      { value: "unknown",          label: "잘 모르겠음"       },
    ],
  },
  {
    key:      "urgency",
    stepLabel: "긴급도",
    question: "언제까지 대응이 필요하신가요?",
    hint:     "경찰 출석 요구, 접근금지 신청, 합의 연락 등 급한 일정이 있다면 가까운 일정을 선택해 주세요.",
    type:     "chips",
    required: true,
    options: [
      { value: "today_tomorrow", label: "오늘 또는 내일" },
      { value: "within_3days",   label: "3일 이내"       },
      { value: "within_week",    label: "1주일 이내"     },
      { value: "within_month",   label: "1개월 이내"     },
      { value: "not_urgent",     label: "급하지 않음"    },
    ],
  },
  {
    key:      "concerns",
    stepLabel: "걱정",
    question: "가장 걱정되는 부분은 무엇인가요?",
    hint:     "해당하는 것을 모두 선택한 후 '다음'을 눌러주세요.",
    type:     "chips-multi",
    required: true,
    options: [
      { value: "police_response",  label: "경찰 조사 대응"       },
      { value: "complaint",        label: "고소 여부"             },
      { value: "settlement",       label: "합의 문제"             },
      { value: "evidence",         label: "증거 확보"             },
      { value: "protection",       label: "접근금지·보호조치"     },
      { value: "second_harm",      label: "2차 피해 방지"         },
      { value: "privacy",          label: "신원 노출·비밀 유지"   },
      { value: "other_concern",    label: "기타"                  },
    ],
  },
  {
    key:      "situation",
    stepLabel: "상황",
    question: "현재 상황을 편하게 적어주세요.",
    hint:     "정확한 법률 용어가 아니어도 괜찮습니다. 기억나는 내용과 가장 걱정되는 부분을 편하게 적어주세요.",
    type:     "textarea",
    required: true,
    maxLength: 400,
    examples: [
      "전 연인이 계속 연락하고 집 앞까지 찾아옵니다.",
      "카카오톡 대화 내용이 있는데 증거로 사용할 수 있는지 궁금합니다.",
      "경찰 조사를 앞두고 있어 어떻게 대응해야 할지 걱정됩니다.",
      "상대방이 고소하겠다고 말한 상황입니다.",
      "정확히 어떤 절차가 필요한지 잘 모르겠습니다.",
    ],
  },
];
