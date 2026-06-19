# AI 상담 정리 기능 — 설계 문서

## 개요

방문자가 `/consultation/ai` 페이지에서 5가지 질문에 답하면, AI가 사건 내용을 요약하고 상담 DB에 저장합니다.

---

## 5문답 흐름

```
Q1. 어떤 법률 문제인가요?     → 분야 칩 선택 (7개 옵션)
Q2. 사건이 발생한 지역은?     → 텍스트 입력 (최대 50자)
Q3. 상대방은 누구인가요?      → 텍스트 입력 (최대 100자)
Q4. 금액·피해 규모가 있나요?  → 텍스트 입력 (최대 100자)
Q5. 현재 진행 상황은?         → 텍스트 입력 (최대 300자)
         ↓
   AI 사건 요약 생성
         ↓
   이름 / 연락처 / 동의 입력
         ↓
   /api/consultation 저장
         ↓
   완료 화면 + 카카오톡 버튼
```

---

## API 비용 방어 방식

| 항목 | 방식 |
|------|------|
| 요청 횟수 | 5문답 완료 후 1회만 호출, `summaryFetched` ref로 중복 방지 |
| 입력 글자수 | 각 답변 최대 300자 제한 (Q5 기준, 나머지 50~100자) |
| 모델 선택 | `gpt-4o-mini` — 저비용 고성능 모델 |
| 토큰 제한 | `max_tokens: 400` — 응답 길이 상한 |
| 장난 입력 방어 | 반복 문자·이모지·짧은 알파벳 패턴 감지 → 422 반환 |
| 필수값 검증 | area + situation 미입력 시 API 미호출 |

---

## Mock 모드

`OPENAI_API_KEY` 환경변수가 없으면 자동으로 mock 모드로 동작합니다.

- OpenAI API를 전혀 호출하지 않음
- 1초 딜레이 후 템플릿 기반 요약 반환
- 빌드·런타임 모두 정상 동작
- 응답에 `mode: "mock"` 포함

API 에러 발생 시에도 `mode: "mock-fallback"`으로 자동 폴백합니다.

---

## OpenAI API 연결 방법

### 1. API 키 발급

1. [OpenAI 대시보드](https://platform.openai.com) 접속
2. API Keys → Create new secret key
3. 생성된 키 복사 (`sk-...`)

### 2. 환경변수 설정

```bash
# .env.local 파일에 추가
OPENAI_API_KEY=sk-your-key-here
```

### 3. 개발 서버 재시작

```bash
npm run dev
```

### 4. 동작 확인

`/consultation/ai` 에서 5문답 완료 후 응답 헤더에 `mode: "openai"` 확인

---

## 주의사항

- AI 요약은 법률 판단이 아닌 상담 접수 보조 목적
- 단정적 표현 금지 (프롬프트에 `완화된 표현` 지시 포함)
- 마지막 문장: "담당 변호사가 검토 후 연락드리겠습니다." 고정
- 저장 데이터: Q&A 전문 + AI 요약이 `content` 필드에 함께 저장됨

---

## 데이터 저장 구조

```
consultations 테이블:
  area    → Q1 선택값 (inheritance | civil | ...)
  region  → Q2 답변 (텍스트)
  content → [Q1-Q5 전문] + [AI 요약] (합산)
  source  → "landing"
  status  → "new"
```
