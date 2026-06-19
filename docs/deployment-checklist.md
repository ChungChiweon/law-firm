# 배포 체크리스트 — 성범죄 피해 상담센터

> 실제 운영 전 아래 항목을 순서대로 완료하세요.
> ✅ 완료 / ⬜ 미완료 / ❌ 오류

---

## STEP 1 — 실제 운영 정보 입력

> `docs/client-info-form.md`를 의뢰인에게 전달하고 내용을 받은 후 진행합니다.

### 1-1. `lib/constants/site.ts` 수정

- [ ] `name` — 사이트명
- [ ] `secondaryName` — 보조명
- [ ] `description` — SEO 소개 문구
- [ ] `url` — 실제 도메인 (예: https://example.com)
- [ ] `contact.phone` — 실제 전화번호
- [ ] `contact.email` — 실제 이메일
- [ ] `contact.address` — 실제 주소
- [ ] `contact.kakaoChannelUrl` — 실제 카카오채널 URL
- [ ] `businessHours` — 실제 상담 가능 시간
- [ ] `office.name` — 법률사무소명
- [ ] `office.representativeName` — 대표 변호사명
- [ ] `office.barNumber` — 변호사 등록번호
- [ ] `legalNotice.barAssociation` — 소속 지방변호사회
- [ ] `legalNotice.businessRegNo` — 사업자등록번호 (해당 시)
- [ ] `legalNotice.privacyOfficer` — 개인정보 보호책임자

### 1-2. `lib/constants/lawyers.ts` 수정

- [ ] 변호사 1: 이름, 직함, 학력, 경력, 전문 분야, 자기소개
- [ ] 변호사 2: 이름, 직함, 학력, 경력 (1명이면 해당 블록 삭제)
- [ ] 변호사 사진 파일을 `public/images/lawyers/`에 추가
- [ ] `imageUrl` 값을 실제 파일 경로로 교체

### 1-3. 이미지 파일 추가

- [ ] `/public/images/og-image.png` — OG 이미지 추가 (1200×630px)
- [ ] `/public/images/lawyers/파일명.jpg` — 변호사 사진 추가

---

## STEP 2 — 법적 페이지 검토

> `docs/legal-pages-checklist.md` 참조

- [ ] `/privacy` 개인정보처리방침 — 법률 전문가 검토 완료
- [ ] `/terms` 이용약관 — 법률 전문가 검토 완료
- [ ] `/disclaimer` 면책사항 — 법률 전문가 검토 완료
- [ ] 변호사 광고 심의 필요 여부 확인 (소속 지방변호사회 문의)

---

## STEP 3 — Supabase 설정 (상담 저장 기능)

> 이 단계를 건너뛰면 상담 신청 폼은 오류를 반환합니다. (시연 시에는 건너뛰어도 됩니다)

- [ ] [supabase.com](https://supabase.com)에서 새 프로젝트 생성
- [ ] **SQL Editor**에서 `docs/supabase-consultations.sql` 실행
- [ ] **Project Settings → API**에서 URL과 anon key 복사
- [ ] `.env.local` 또는 Vercel 환경변수에 입력:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://xxxxxx.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhb...
  ```
- [ ] 로컬에서 상담 신청 테스트 → Supabase 대시보드에서 저장 확인

---

## STEP 4 — 관리자 비밀번호 설정

- [ ] `.env.local` 또는 Vercel 환경변수에 입력:
  ```
  ADMIN_ACCESS_PASSWORD=강력한-비밀번호-입력
  ```
- [ ] `/admin-login`에서 비밀번호 입력 → `/admin` 접근 확인
- [ ] 로그아웃 버튼 작동 확인

> **보안 주의**: 이 방식은 MVP 보호장치입니다.  
> 실제 운영 시 Supabase Auth 또는 NextAuth.js 등 강한 인증으로 교체를 권장합니다.

---

## STEP 5 — OpenAI 설정 (AI 상담 요약)

> 이 단계를 건너뛰면 AI 상담에서 mock 요약이 반환됩니다. (시연 가능)

- [ ] [platform.openai.com](https://platform.openai.com)에서 API Key 발급
- [ ] `.env.local` 또는 Vercel 환경변수에 입력:
  ```
  OPENAI_API_KEY=sk-...
  ```
- [ ] `/consultation/ai` → AI 요약 카드 실제 내용 확인

---

## STEP 6 — 로컬 최종 확인

```bash
npm run lint    # 오류 0개 확인
npm run build   # 빌드 성공 확인
npm run dev     # 로컬 실행 후 아래 항목 확인
```

### 화면별 확인 항목

| 화면 | 확인 항목 | 완료 |
|------|-----------|------|
| `/` | 전화번호·카카오 버튼 실제값 표시 | ⬜ |
| `/` | 변호사 이름·사진 실제값 표시 | ⬜ |
| `/consultation/ai` | AI 요약 카드 정상 표시 | ⬜ |
| `/consultation` | 상담 신청 후 Supabase 저장 확인 | ⬜ |
| `/contact` | 전화·이메일·카카오 링크 작동 | ⬜ |
| `/privacy` | 개인정보 보호책임자 실명 표시 | ⬜ |
| `/admin-login` | 비밀번호 입력 → `/admin` 이동 | ⬜ |
| `/admin` | 실제 상담 데이터 표시 (Supabase 설정 후) | ⬜ |
| 모바일 390px | 모든 화면 레이아웃 깨짐 없음 | ⬜ |

---

## STEP 7 — Vercel 배포

```bash
# Vercel CLI 사용 시
vercel deploy --prod

# 또는 GitHub 연결 후 자동 배포
```

### Vercel 환경변수 설정

Vercel 대시보드 → 프로젝트 → Settings → Environment Variables에 입력:

| 변수명 | 필수 여부 | 설명 |
|--------|-----------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | 선택 (DB 저장 시 필수) | Supabase 프로젝트 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 선택 (DB 저장 시 필수) | Supabase anon key |
| `OPENAI_API_KEY` | 선택 | AI 요약 (없으면 mock 반환) |
| `ADMIN_ACCESS_PASSWORD` | 권장 | 관리자 접근 비밀번호 |

---

## STEP 8 — 배포 후 확인

- [ ] 실제 도메인으로 접속 확인
- [ ] 카카오톡 공유 시 OG 이미지·제목 정상 표시 확인
- [ ] 모바일(실제 기기)에서 전체 화면 확인
- [ ] 상담 신청 → 관리자 화면에서 수신 확인
- [ ] 전화번호 링크 클릭 → 전화 연결 확인
- [ ] 카카오채널 링크 클릭 → 채널 연결 확인

---

## 참고 문서

| 문서 | 위치 |
|------|------|
| 의뢰인 정보 입력 양식 | `docs/client-info-form.md` |
| 시연 흐름 가이드 | `docs/demo-flow.md` |
| 법적 페이지 검토 항목 | `docs/legal-pages-checklist.md` |
| 의뢰인 확인 체크리스트 | `docs/client-review-checklist.md` |
| Supabase SQL | `docs/supabase-consultations.sql` |
