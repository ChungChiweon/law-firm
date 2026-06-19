# 시연 흐름 가이드 — 성범죄 피해 상담센터

> 의뢰인 시연 전 이 문서를 한 번 읽고 화면을 순서대로 열어 두세요.

---

## 1. 시연 순서

```
홈 (/)
 ├─ [AI로 상담 내용 정리하기] → /consultation/ai   ← 메인 시연
 ├─ [변호사 상담 연결하기]   → /consultation       ← 보조 시연
 └─ [카카오 비공개 상담]     → SITE_CONFIG URL     ← 버튼만 확인

/admin-login → [비밀번호 입력] → /admin  ← 마지막에 CRM 시연
```

---

## 2. 확인할 URL

| 화면 | URL | 비고 |
|------|-----|------|
| 홈 랜딩 | `http://localhost:3000/` | 전체 소개 |
| AI 상담 정리 | `http://localhost:3000/consultation/ai` | 5문답 흐름 |
| 일반 상담 신청 | `http://localhost:3000/consultation` | 직접 폼 |
| 관리자 로그인 | `http://localhost:3000/admin-login` | 비밀번호 입력 |
| 관리자 CRM | `http://localhost:3000/admin` | 데모 데이터 (로그인 후) |

---

## 3. 각 화면 설명

### 홈 `/`
- **HeroSection**: "혼자 감당하지 마세요." / "망설이지 않아도 됩니다."  
  → AI 상담 버튼 + 변호사 상담 버튼 + 카카오 버튼
- **PracticeAreaSection**: 8가지 피해 유형 카드 (클릭 시 /consultation?area=XXX)
- **ProcessSection**: 접수 → 검토 → 상담 → 지원 4단계
- **LawyerProfileSection**: 여성 변호사 소개
- **FaqSection**: 자주 묻는 질문
- **CtaSection**: 하단 CTA — "혼자 결정하지 않아도 됩니다"

### AI 상담 정리 `/consultation/ai`
5문답 → AI 요약 → 이름/연락처 입력 → 접수 완료

| 질문 | 설명 |
|------|------|
| Q1 어떤 피해로 상담을 원하시나요? | 8가지 피해유형 chips |
| Q2 현재 가장 걱정되는 부분은? | 6가지 걱정사항 chips |
| Q3 현재 진행 단계는? | 5가지 단계 chips |
| Q4 증거자료나 기록이 있나요? | 3가지 상황 chips |
| Q5 현재 상황을 편하게 적어주세요 | textarea (300자) |

→ AI 요약 생성 (OPENAI_API_KEY 없으면 mock 요약 반환, 빌드 안 깨짐)  
→ 이름 + 연락처 입력 → Supabase 저장 (미설정 시 API 에러 노출)  
→ 완료 화면: "영업일 기준 1일 이내 연락" + 카카오 버튼

### 일반 상담 신청 `/consultation`
- 오른쪽 사이드바: 안내 가이드 + 카카오/전화 빠른 연락
- 상담 분야 chips 선택 (9가지)
- 성공 시: 카카오 버튼 + "결과를 보장하지 않습니다" 고지

### 관리자 로그인 `/admin-login`
- `ADMIN_ACCESS_PASSWORD` 설정 시: 비밀번호 입력 → `/admin` 이동
- 미설정 시 (로컬 개발): 비밀번호 없이 `/admin` 바로 접근 가능
- 로그인 성공 시 httpOnly 쿠키 발급 (8시간 유효)
- 헤더 "로그아웃" 버튼으로 쿠키 삭제 후 로그인 화면 이동

### 관리자 CRM `/admin`
- `ADMIN_ACCESS_PASSWORD` 설정 시: 쿠키 없으면 `/admin-login`으로 자동 리다이렉트
- Supabase 미설정 → **데모 데이터 6건 자동 표시** (에러 없음)
- 상태: 신규(2) / 연락완료(1) / 검토중(1) / 수임완료(1) / 종료(1)
- 상태 카드 클릭으로 필터링 가능
- 검색·필터 → 클라이언트 사이드 필터 (데모 모드)
- 항목 클릭 → 슬라이드아웃 상세 패널 (메모, 상태 변경 버튼 표시)
- Supabase 설정 시 → 실제 상담 데이터 조회

---

## 4. 아직 실제 연동 전인 기능

| 기능 | 현재 상태 | 운영 시 필요 |
|------|-----------|-------------|
| Supabase DB 저장 | `.env.local` 미설정 시 에러 | Supabase 프로젝트 생성 + 환경변수 |
| AI 요약 (OpenAI) | `OPENAI_API_KEY` 없으면 mock 반환 | OpenAI API 키 발급 |
| 카카오 채널 | 버튼 노출, 실제 채널 URL 미연결 | `SITE_CONFIG.contact.kakaoChannelUrl` 변경 |
| 전화번호 | `02-000-0000` 플레이스홀더 | `lib/constants/site.ts` 수정 |
| 관리자 로그인 | MVP 비밀번호 방식 (쿠키, 8시간) | 운영 시 Supabase Auth / NextAuth 검토 |
| 이메일 알림 | 없음 | Supabase Edge Function + Resend |

---

## 5. 실제 운영 전 필요한 설정

### 5-1. `.env.local` 파일 생성

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhb...

# OpenAI (선택 — 없으면 mock 요약 반환)
OPENAI_API_KEY=sk-...

# 관리자 접근 비밀번호 (미설정 시 로컬에서 비밀번호 없이 접근 가능)
ADMIN_ACCESS_PASSWORD=강력한-비밀번호로-교체
```

### 5-2. Supabase 테이블 생성

`docs/supabase-consultations.sql` 파일의 SQL을 Supabase SQL Editor에서 실행합니다.

### 5-3. `lib/constants/site.ts` 수정

```typescript
contact: {
  phone:             "실제 전화번호",
  email:             "실제 이메일",
  address:           "실제 주소",
  kakaoChannelUrl:   "https://pf.kakao.com/실제채널ID",
  consultationUrl:   "/consultation",
}
```

### 5-4. 배포 (Vercel 기준)

```bash
vercel deploy
# Environment Variables에 위 .env.local 항목 동일하게 입력
```

---

## 6. 빠른 로컬 실행

```bash
cd law-firm
npm install
npm run dev        # http://localhost:3000
npm run build      # 프로덕션 빌드 테스트
```
