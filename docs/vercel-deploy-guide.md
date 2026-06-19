# Vercel 배포 가이드 — 성범죄 피해 상담센터

> 이 가이드를 따라 배포하면 약 10분 안에 완료됩니다.
> 실제 배포 전 `docs/deployment-checklist.md`의 STEP 1~5를 먼저 완료하세요.

---

## 사전 준비

- [ ] GitHub 계정 (github.com)
- [ ] Vercel 계정 (vercel.com) — GitHub 계정으로 가입 권장
- [ ] `docs/deployment-checklist.md` STEP 1~5 완료

---

## STEP 1 — GitHub에 코드 올리기

로컬 터미널에서 실행하세요.

```bash
# 프로젝트 폴더로 이동
cd C:\Users\USER\Documents\law-firm

# Git 초기화 (최초 1회)
git init
git add .
git commit -m "init: 성범죄 피해 상담센터 초기 커밋"

# GitHub에 새 레포지토리 생성 후 연결
# github.com → New repository → 이름 입력 → Create repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

> **주의**: `.env.local` 파일은 `.gitignore`에 포함되어 있어 자동으로 제외됩니다.

---

## STEP 2 — Vercel 프로젝트 생성

1. [vercel.com](https://vercel.com)에 로그인
2. 우측 상단 **"Add New…"** → **"Project"** 클릭
3. **"Import Git Repository"** 에서 GitHub 레포지토리 선택
4. **Framework Preset**: `Next.js` (자동 감지됨)
5. **Root Directory**: `.` (기본값 유지)
6. **Build Command**: `next build` (기본값 유지)
7. **Output Directory**: `.next` (기본값 유지)

---

## STEP 3 — 환경변수 입력

Vercel 프로젝트 생성 화면 하단 **"Environment Variables"** 섹션에 아래 항목을 입력합니다.

| 변수명 | 필수 여부 | 값 | 설명 |
|--------|-----------|-----|------|
| `NEXT_PUBLIC_SUPABASE_URL` | 선택 | `https://xxx.supabase.co` | 없으면 /admin 데모 모드 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 선택 | `eyJhb...` | 없으면 상담 저장 불가 |
| `OPENAI_API_KEY` | 선택 | `sk-...` | 없으면 AI 요약 mock 반환 |
| `ADMIN_ACCESS_PASSWORD` | **권장** | 영문+숫자 8자 이상 | 없으면 /admin 자유 접근 |

> **환경 선택**: Production, Preview, Development 모두 체크 권장  
> **나중에 추가하는 방법**: Vercel 대시보드 → 프로젝트 → Settings → Environment Variables

---

## STEP 4 — 배포 실행

1. **"Deploy"** 버튼 클릭
2. 빌드 로그 확인 (약 1~3분 소요)
3. 배포 완료 시 `https://프로젝트명.vercel.app` URL 생성됨

---

## STEP 5 — 배포 후 확인

Vercel이 발급한 URL(`https://프로젝트명.vercel.app`)로 아래 항목을 확인합니다.

### 필수 확인

| 화면 | URL | 확인 항목 |
|------|-----|-----------|
| 홈 | `/` | 전화번호·카카오 버튼 실제값 표시 |
| AI 상담 | `/consultation/ai` | 5문답 흐름 전체 작동 |
| 일반 상담 | `/consultation` | 폼 제출 후 저장 확인 |
| 관리자 로그인 | `/admin-login` | 비밀번호 입력 → /admin 이동 |
| 관리자 CRM | `/admin` | 상담 데이터 표시 (또는 데모 모드) |
| 문의 | `/contact` | 카카오·전화 링크 작동 |
| 개인정보처리방침 | `/privacy` | 페이지 정상 로드 |

### 카카오 공유 확인

카카오톡에서 URL을 공유했을 때 아래 항목이 표시되는지 확인합니다.

- [ ] OG 이미지 표시 (`/public/images/og-image.png` 추가 후)
- [ ] 사이트 제목 표시
- [ ] 사이트 설명 표시

### 모바일 확인 (390px)

실제 스마트폰으로 아래 항목을 직접 확인합니다.

- [ ] 홈 화면 레이아웃 깨짐 없음
- [ ] 버튼이 손가락으로 탭 가능한 크기
- [ ] AI 상담 5문답 흐름 완료 가능
- [ ] 상담 폼 입력 가능

---

## STEP 6 — 실제 도메인 연결 (선택)

1. Vercel 대시보드 → 프로젝트 → **Settings → Domains**
2. 구매한 도메인 입력 (예: `example.com`)
3. 도메인 registrar에서 DNS 설정:
   - `A` 레코드: `76.76.21.21` (Vercel IP)
   - 또는 `CNAME`: `cname.vercel-dns.com`
4. DNS 전파 후 HTTPS 자동 적용 (약 24시간 이내)
5. `lib/constants/site.ts`의 `url` 값을 실제 도메인으로 변경 후 재배포

---

## 자주 발생하는 빌드 오류

| 오류 메시지 | 원인 | 해결 방법 |
|-------------|------|-----------|
| `Cannot find module` | 패키지 누락 | `npm install` 후 재배포 |
| `Type error` | TypeScript 오류 | 로컬에서 `npm run build` 확인 |
| `Environment variable not found` | 환경변수 미설정 | Vercel 환경변수 재확인 |
| `ENOENT: no such file or directory` | 이미지 경로 오류 | `public/images/` 파일 확인 |

---

## 재배포 방법

코드 수정 후 재배포는 `git push`만 하면 자동으로 실행됩니다.

```bash
git add .
git commit -m "fix: 전화번호 수정"
git push
```

Vercel이 GitHub 변경을 감지하고 자동으로 빌드·배포합니다.

---

## 참고 문서

| 문서 | 용도 |
|------|------|
| `docs/deployment-checklist.md` | 배포 전 단계별 체크리스트 |
| `docs/client-info-form.md` | 실제 운영 정보 입력 양식 |
| `docs/demo-flow.md` | 시연 흐름 가이드 |
| `.env.local.example` | 환경변수 목록 및 설명 |
