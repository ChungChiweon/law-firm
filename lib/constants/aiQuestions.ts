// ── AI 5문답 질문 정의 ────────────────────────────────
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
  type: "chips" | "text" | "textarea";
  /** chips일 때 선택지 목록 */
  options?: AiQuestionOption[];
  /** 필수 여부 (false이면 '건너뛰기' 버튼 노출) */
  required: boolean;
  /** text / textarea 글자수 제한 */
  maxLength?: number;
  /** 진행률 바에 표시되는 짧은 단계 레이블 (최대 4자 권장) */
  stepLabel: string;
}

// ── 관리자/AI 요약 레이블 맵 ─────────────────────────
// chips 선택지의 value → 한글 레이블 변환에 사용합니다.
// 새 질문/선택지를 추가하면 여기에도 추가하세요.
export const AI_QUESTION_LABEL_MAP: Record<string, Record<string, string>> = {
  area: {
    sexual_crime:      "성범죄 피해",
    dating_violence:   "데이트폭력 피해",
    stalking:          "스토킹 피해",
    digital_sex:       "디지털 성범죄 피해",
    camera_crime:      "카메라등이용촬영 피해",
    domestic_violence: "가정·관계폭력 피해",
    workplace_sex:     "직장·학교 성비위 피해",
    other:             "기타",
  },
  concern: {
    how_to_report: "고소·신고 방법",
    evidence:      "증거 보전",
    settlement:    "합의 요청 대응",
    privacy:       "비밀 유지",
    second_harm:   "2차 피해 방지",
    other_concern: "기타",
  },
  stage: {
    before_report: "신고 전",
    police_invest: "경찰 조사 단계",
    prosecution:   "검찰 단계",
    trial:         "재판 진행 중",
    other_stage:   "기타·모름",
  },
  evidence: {
    has_evidence:   "증거 있음",
    no_evidence:    "없거나 불확실",
    deleted_spread: "삭제·유포된 상태",
  },
};

// ── 질문 목록 ─────────────────────────────────────────
export const AI_QUESTIONS: AiQuestion[] = [
  {
    key:       "area",
    stepLabel: "피해유형",
    question: "어떤 피해로 상담을 원하시나요?",
    hint:     "가장 가까운 유형을 선택해 주세요. 잘 모르셔도 괜찮습니다.",
    type:     "chips",
    required: true,
    options: [
      { value: "sexual_crime",      label: "성범죄 피해",        emoji: "🛡️" },
      { value: "dating_violence",   label: "데이트폭력 피해",    emoji: "💙" },
      { value: "stalking",          label: "스토킹 피해",        emoji: "👁️" },
      { value: "digital_sex",       label: "디지털 성범죄 피해", emoji: "📱" },
      { value: "camera_crime",      label: "카메라등이용촬영",   emoji: "📷" },
      { value: "domestic_violence", label: "가정·관계폭력 피해", emoji: "🏠" },
      { value: "workplace_sex",     label: "직장·학교 성비위",   emoji: "💼" },
      { value: "other",             label: "잘 모르겠어요",      emoji: "❓" },
    ],
  },
  {
    key:       "concern",
    stepLabel: "걱정사항",
    question: "현재 가장 걱정되는 부분은 무엇인가요?",
    hint:     "여러 걱정이 있으셔도 가장 먼저 해결하고 싶은 것을 선택해 주세요.",
    type:     "chips",
    required: true,
    options: [
      { value: "how_to_report", label: "고소·신고 방법",    emoji: "📋" },
      { value: "evidence",      label: "증거 보전",          emoji: "🔍" },
      { value: "settlement",    label: "합의 요청 대응",     emoji: "⚖️" },
      { value: "privacy",       label: "비밀 유지",          emoji: "🔒" },
      { value: "second_harm",   label: "2차 피해 방지",      emoji: "🛡️" },
      { value: "other_concern", label: "기타·잘 모르겠어요", emoji: "❓" },
    ],
  },
  {
    key:       "stage",
    stepLabel: "진행단계",
    question: "현재 진행 단계는 어디인가요?",
    hint:     "현재 상황에 가장 가까운 단계를 선택해 주세요.",
    type:     "chips",
    required: true,
    options: [
      { value: "before_report", label: "신고 전",        emoji: "🔹" },
      { value: "police_invest", label: "경찰 조사 단계", emoji: "🔍" },
      { value: "prosecution",   label: "검찰 단계",      emoji: "📂" },
      { value: "trial",         label: "재판 진행 중",   emoji: "🏛️" },
      { value: "other_stage",   label: "기타·모름",      emoji: "❓" },
    ],
  },
  {
    key:       "evidence",
    stepLabel: "증거",
    question: "증거자료나 기록이 있나요?",
    hint:     "있는 것을 선택해 주세요. 없어도 상담에 영향은 없습니다.",
    type:     "chips",
    required: true,
    options: [
      { value: "has_evidence",   label: "있어요 (문자·사진·영상 등)", emoji: "✅" },
      { value: "no_evidence",    label: "없거나 잘 모르겠어요",       emoji: "❓" },
      { value: "deleted_spread", label: "삭제되었거나 유포된 상태",   emoji: "⚠️" },
    ],
  },
  {
    key:       "situation",
    stepLabel: "상황",
    question:  "현재 상황을 편하게 적어주세요.",
    hint:      "어떤 내용이든 괜찮습니다. 자세할수록 더 정확한 검토가 가능합니다.",
    type:      "textarea",
    required:  true,
    maxLength: 300,
  },
];
