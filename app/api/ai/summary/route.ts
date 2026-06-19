import { NextRequest, NextResponse } from "next/server";

// ── 입력 유효성 ───────────────────────────────────────
const VALID_AREAS = new Set([
  "sexual_crime", "dating_violence", "stalking",
  "digital_sex", "telecom_sex", "camera_crime",
  "domestic_violence", "workplace_sex", "other",
]);

const AREA_LABELS: Record<string, string> = {
  sexual_crime:      "성범죄 피해",
  dating_violence:   "데이트폭력 피해",
  stalking:          "스토킹 피해",
  digital_sex:       "디지털 성범죄 피해",
  telecom_sex:       "통신매체이용음란 피해",
  camera_crime:      "카메라등이용촬영 피해",
  domestic_violence: "가정폭력·관계폭력 피해",
  workplace_sex:     "직장·학교 성비위 피해",
  other:             "기타",
};

// ── 장난 입력 방어 ────────────────────────────────────
function isSpamInput(text: string): boolean {
  const spamPatterns = [/^(.)\1{5,}$/, /^[ㅋㅎㅠㅡ\s]{3,}$/, /^[a-z]{1,3}$/i];
  return spamPatterns.some((p) => p.test(text.trim()));
}

// ── Mock 요약 생성 ────────────────────────────────────
function buildMockSummary(
  areaLabel: string, opponent: string, stage: string, situation: string
): string {
  return `[AI 사건 요약 — 검토 접수 완료]

의뢰인께서 ${areaLabel} 관련 사건으로 상담을 신청하셨습니다.

• 입장·관계: ${opponent || "미입력"}
• 진행 단계: ${stage || "미입력"}
• 상황 개요: ${situation.slice(0, 120)}${situation.length > 120 ? "…" : ""}

사건의 구체적인 검토를 위해 변호사의 면밀한 확인이 필요한 상황으로 보입니다. 접수 후 영업일 기준 1일 이내 담당 변호사가 직접 연락드리겠습니다.

※ 이 요약은 AI가 상담 접수를 돕기 위해 자동 생성한 내용으로, 법률 판단이 아닙니다. 결과를 보장하지 않습니다.`;
}

// ── POST /api/ai/summary ──────────────────────────────
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "잘못된 요청입니다." }, { status: 400 });
  }

  const data = body as Record<string, string>;
  const { area, opponent, amount: stage, situation } = data;

  // 필수값 검증
  if (!area || !VALID_AREAS.has(area)) {
    return NextResponse.json({ success: false, message: "사건 유형을 선택해 주세요." }, { status: 422 });
  }
  if (!situation?.trim() || situation.trim().length < 5) {
    return NextResponse.json({ success: false, message: "상황 내용을 입력해 주세요." }, { status: 422 });
  }
  if (situation.trim().length > 600) {
    return NextResponse.json({ success: false, message: "입력이 너무 깁니다." }, { status: 422 });
  }

  // 장난 입력 방어 (situation의 핵심 부분만 검사)
  const coreText = situation.replace(/\[.*?\]/g, "").trim();
  if (coreText.length > 3 && isSpamInput(coreText)) {
    return NextResponse.json(
      { success: false, message: "정확한 상황을 입력해 주세요. 구체적인 내용이 있어야 요약이 가능합니다." },
      { status: 422 }
    );
  }

  const areaLabel = AREA_LABELS[area] ?? "기타";
  const apiKey    = process.env.OPENAI_API_KEY;

  // ── Mock 모드 (API Key 없음) ──────────────────────
  if (!apiKey) {
    await new Promise((r) => setTimeout(r, 1000));
    return NextResponse.json({
      success: true,
      summary: buildMockSummary(areaLabel, opponent ?? "", stage ?? "", situation.trim()),
      mode: "mock",
    });
  }

  // ── OpenAI 모드 ───────────────────────────────────
  try {
    const OpenAI = (await import("openai")).default;
    const client = new OpenAI({ apiKey });

    const userContent = `당신은 법률 상담 접수 보조 AI입니다. 관계범죄·성범죄 상담센터의 접수 담당자 역할로, 아래 의뢰인 답변을 바탕으로 사건 요약을 한국어로 작성하세요.

의뢰인 답변:
- 사건 유형: ${areaLabel}
- 입장·관계: ${opponent || "미입력"}
- 진행 단계: ${stage || "미입력"}
- 상황 및 시급한 문제: ${situation.trim()}

작성 지침:
- 200자 이내 핵심 요약
- 피해자·피의자 단정 표현 금지
- "~로 보입니다", "~가 필요할 수 있습니다" 등 완화된 표현 사용
- 단정적 법률 판단 금지
- 불안 조장 표현 금지
- 마지막 줄: "담당 변호사가 검토 후 연락드리겠습니다." 포함
- 마지막에: "※ 이 요약은 AI 자동 생성으로, 법률 판단이 아닙니다. 결과를 보장하지 않습니다." 포함`;

    const completion = await client.chat.completions.create({
      model:       "gpt-4o-mini",
      messages:    [{ role: "user", content: userContent }],
      max_tokens:  400,
      temperature: 0.3,
    });

    const summary =
      completion.choices[0]?.message?.content?.trim() ??
      buildMockSummary(areaLabel, opponent ?? "", stage ?? "", situation.trim());

    return NextResponse.json({ success: true, summary, mode: "openai" });
  } catch (err) {
    console.error("[AI Summary] OpenAI error:", err);
    return NextResponse.json({
      success: true,
      summary: buildMockSummary(areaLabel, opponent ?? "", stage ?? "", situation.trim()),
      mode: "mock-fallback",
    });
  }
}
