# 성범죄 피해 상담센터 — 법률 랜딩페이지 + CRM

데이트폭력·성범죄·스토킹·디지털 성범죄 피해자를 위한 여성 변호사 상담 랜딩페이지.  
Next.js 16 App Router + Supabase + OpenAI(선택) 기반.

---

## 주요 URL

| 화면 | URL |
|------|-----|
| 홈 랜딩페이지 | `/` |
| AI 5문답 상담 정리 | `/consultation/ai` |
| 일반 상담 신청 폼 | `/consultation` |
| 문의 | `/contact` |
| 관리자 로그인 | `/admin-login` |
| 관리자 CRM | `/admin` |
| 개인정보처리방침 | `/privacy` |
| 이용약관 | `/terms` |
| 면책사항 | `/disclaimer` |
| 상담 접수 API | `POST /api/consultation` |
| AI 요약 API | `POST /api/ai/summary` |

---

## Vercel 배포

자세한 내용은 [`docs/vercel-deploy-guide.md`](docs/vercel-deploy-guide.md)를 참고하세요.

```bash
# GitHub에 푸시하면 Vercel이 자동으로 빌드·배포합니다.
git add .
git commit -m "deploy: 실제 운영 정보 반영"
git push
```

---

## 로컬 실행

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 설정 (아래 항목 참고)
cp .env.example .env.local   # 파일이 없으면 직접 생성

# 3. 개발 서버 실행
npm run dev          # http://localhost:3000

# 4. 빌드 테스트
npm run build
npm run lint
```

---

## 환경변수 (`.env.local`)

```env
# ── Supabase (없으면 /admin 데모 데이터 표시, 폼 저장 비활성) ──
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhb...

# ── OpenAI (없으면 mock 요약 반환, 빌드 정상) ──
OPENAI_API_KEY=sk-...

# ── 관리자 접근 비밀번호 (없으면 /admin 자유 접근) ──
ADMIN_ACCESS_PASSWORD=강력한-비밀번호-입력
```

> `.env.local.example` 파일을 복사하여 `.env.local`을 생성하세요.  
> Supabase 환경변수가 없어도 앱은 정상 실행됩니다.  
> `/admin`에서는 샘플 6건 데모 데이터가 자동으로 표시됩니다.

---

## Supabase 설정

1. [supabase.com](https://supabase.com)에서 새 프로젝트 생성
2. **SQL Editor**에서 `docs/supabase-consultations.sql` 실행
3. **Project Settings → API**에서 URL과 anon key 복사 → `.env.local` 입력

---

## OpenAI 설정

1. [platform.openai.com](https://platform.openai.com)에서 API Key 발급
2. `.env.local`의 `OPENAI_API_KEY`에 입력
3. 미설정 시 mock 요약이 자동 반환됩니다 (빌드 영향 없음)

---

## 실제 운영 전 체크리스트

> 상세 내용은 [`docs/deployment-checklist.md`](docs/deployment-checklist.md) 참고

- [ ] `docs/client-info-form.md` 작성 후 개발자에게 전달
- [ ] `lib/constants/site.ts` — 전화번호·이메일·주소·카카오 URL·사무소명 교체
- [ ] `lib/constants/lawyers.ts` — 변호사 이름·학력·경력·사진 교체
- [ ] OG 이미지 `/public/images/og-image.png` 추가 (1200×630px)
- [ ] Supabase 프로젝트 생성 + `docs/supabase-consultations.sql` 실행
- [ ] `ADMIN_ACCESS_PASSWORD` 환경변수 설정
- [ ] OpenAI API Key 설정 (선택 — 없으면 mock 요약 반환)
- [ ] 법적 페이지 법률 전문가 검토 (`docs/legal-pages-checklist.md` 참고)
- [ ] Vercel 배포 후 실제 기기 모바일 확인

---

## 기술 스택

| 항목 | 선택 |
|------|------|
| 프레임워크 | Next.js 16 App Router |
| 언어 | TypeScript (strict) |
| 스타일 | TailwindCSS v4 |
| UI 컴포넌트 | shadcn/ui (`@base-ui/react`) |
| 데이터베이스 | Supabase (PostgreSQL) |
| AI 요약 | OpenAI gpt-4o-mini (선택) |
| 배포 | Vercel 권장 |

---

## 주요 파일 구조

```
app/
  page.tsx                  홈 랜딩
  consultation/
    page.tsx                일반 상담 폼
    ai/page.tsx             AI 5문답 상담
  (dashboard)/admin/        관리자 CRM
  api/
    consultation/           상담 저장 API
    ai/summary/             AI 요약 API
    admin/consultations/    CRM 조회 API

lib/
  constants/
    site.ts                 사이트 기본 정보 (전화번호 등)
    aiQuestions.ts          AI 5문답 질문 정의 ← 질문 수정 시 이 파일만 편집
    consultation.ts         상담 분야·안내 문구
    admin.ts                CRM 레이블·필터
  supabase/types.ts         DB 타입

components/
  ai-consultation/          AI 채팅 UI 컴포넌트
  consultation/             일반 폼 컴포넌트
  admin/                    CRM 컴포넌트
  sections/                 랜딩 섹션 컴포넌트
  layout/                   Header / Footer

docs/
  client-info-form.md       의뢰인 정보 입력 양식
  deployment-checklist.md   배포 체크리스트
  demo-flow.md              시연 순서 가이드
  legal-pages-checklist.md  법적 페이지 검토 항목
  client-review-checklist.md 의뢰인 확인 체크리스트
  supabase-consultations.sql DB 생성 SQL
```

---

## AI 질문 수정 방법

`lib/constants/aiQuestions.ts` 파일만 편집하면 됩니다.

- 질문 추가: `AI_QUESTIONS` 배열에 항목 추가
- 선택지 수정: `options` 배열 수정
- 질문 순서 변경: 배열 순서 변경
- 레이블 맵 갱신: `AI_QUESTION_LABEL_MAP`에 새 value 추가

나머지 컴포넌트(AiConsultationChat, AiProgress 등)는 자동 반영됩니다.

---

## 문서 목록

| 문서 | 용도 |
|------|------|
| [`docs/supabase-setup-guide.md`](docs/supabase-setup-guide.md) | **Supabase 연결 가이드** (프로젝트 생성 → SQL → 환경변수 → 테스트) |
| [`docs/final-launch-report.md`](docs/final-launch-report.md) | **최종 Launch 보고서** (완성 기능·배포 순서·판정) |
| [`docs/github-upload-guide.md`](docs/github-upload-guide.md) | **GitHub 업로드 가이드** (저장소 생성 → 명령어 → 업로드 후 확인) |
| [`docs/vercel-env-checklist.md`](docs/vercel-env-checklist.md) | **Vercel 환경변수 체크리스트** (필수·권장·선택 변수 설명) |
| [`docs/go-live-checklist.md`](docs/go-live-checklist.md) | **실제 오픈 전 최종 체크리스트** (콘텐츠·기능·기기 테스트) |
| [`docs/vercel-deploy-guide.md`](docs/vercel-deploy-guide.md) | Vercel 배포 가이드 (GitHub 연결 → 환경변수 → 배포 후 확인) |
| [`docs/deployment-checklist.md`](docs/deployment-checklist.md) | 배포 전 단계별 체크리스트 (정보 입력 → DB → 비밀번호 → 확인) |
| [`docs/image-assets-guide.md`](docs/image-assets-guide.md) | 이미지 자산 가이드 (OG 이미지·변호사 사진 규격 및 경로) |
| [`docs/client-info-form.md`](docs/client-info-form.md) | 의뢰인이 채워서 전달할 실제 운영 정보 양식 |
| [`docs/demo-flow.md`](docs/demo-flow.md) | 의뢰인 시연 순서 가이드 |
| [`docs/legal-pages-checklist.md`](docs/legal-pages-checklist.md) | 법적 페이지 검토 항목 |
| [`docs/client-review-checklist.md`](docs/client-review-checklist.md) | 의뢰인 최종 확인 체크리스트 |
