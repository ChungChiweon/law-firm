# 최종 Launch 보고서 — 성범죄 피해 상담센터

작성일: 2026-06-19  
빌드 상태: **PASS** (lint 0 errors · build 16 pages)  
**최종 판정: ✅ PASS — GitHub 업로드 및 Vercel 배포 준비 완료**

---

## 1. 현재 완성된 기능

| 기능 | 상태 | 비고 |
|------|------|------|
| 랜딩페이지 (홈) | ✅ 완성 | Hero·분야·절차·변호사·FAQ·CTA 전체 섹션 |
| 일반 상담 신청 | ✅ 완성 | Supabase 저장, 없으면 오류 반환 |
| AI 5문답 상담 | ✅ 완성 | OpenAI 없으면 mock 요약 자동 반환 |
| 상담 요약 화면 | ✅ 완성 | AI 요약 + 상담 신청 연결 |
| 관리자 CRM | ✅ 완성 | Supabase 없으면 데모 6건 표시 |
| 관리자 로그인 | ✅ 완성 | SHA-256 쿠키 인증, 8시간 유지 |
| 개인정보처리방침 | ✅ 완성 | 법률 전문가 검토 필요 |
| 이용약관 | ✅ 완성 | 법률 전문가 검토 필요 |
| 면책사항 | ✅ 완성 | 법률 전문가 검토 필요 |
| 문의 페이지 | ✅ 완성 | 카카오·전화·이메일 버튼 |
| OG 메타데이터 | ✅ 완성 | og:image 경로 지정 (파일은 별도 추가 필요) |
| 관리자 보호 (proxy.ts) | ✅ 완성 | /admin 비밀번호 미설정 시 자유 접근 주의 |

---

## 2. 주요 URL

| 화면 | URL | 타입 |
|------|-----|------|
| 홈 랜딩페이지 | `/` | Static |
| 일반 상담 신청 | `/consultation` | Static |
| AI 5문답 상담 | `/consultation/ai` | Static |
| 관리자 CRM | `/admin` | Dynamic |
| 관리자 로그인 | `/admin-login` | Static |
| 개인정보처리방침 | `/privacy` | Static |
| 이용약관 | `/terms` | Static |
| 면책사항 | `/disclaimer` | Static |
| 문의 | `/contact` | Static |
| 상담 저장 API | `POST /api/consultation` | Dynamic |
| AI 요약 API | `POST /api/ai/summary` | Dynamic |
| CRM 조회 API | `GET /api/admin/consultations` | Dynamic |

---

## 3. GitHub 업로드 순서

> **전제**: GitHub 계정 로그인 상태, Git 설치 완료

### Step 1 — GitHub 저장소 생성
1. [github.com](https://github.com) → 우상단 **+** → **New repository**
2. Repository name: `law-firm` (또는 원하는 이름)
3. **Visibility: Private** (반드시 비공개)
4. Initialize 옵션 전부 **체크 해제**
5. **Create repository** 클릭 → 저장소 URL 복사

### Step 2 — 로컬에서 업로드

```bash
cd C:\Users\USER\Documents\law-firm

# 이미 git init 완료 상태이므로 아래부터 실행
git add .
git commit -m "feat: 성범죄 피해 상담센터 랜딩페이지 + CRM 초기 구성"
git branch -M main
git remote add origin https://github.com/계정명/law-firm.git
git push -u origin main
```

### Step 3 — 업로드 확인
- GitHub 저장소에서 `.env.local` 파일 **없음** 확인
- `docs/` 폴더 포함 확인
- `README.md` 정상 표시 확인

---

## 4. Vercel 배포 순서

### Step 1 — Vercel 연결
1. [vercel.com](https://vercel.com) 로그인 (GitHub 계정 연동 권장)
2. **Add New → Project** 클릭
3. GitHub 저장소 `law-firm` 선택 → **Import**

### Step 2 — 환경변수 입력 (배포 전 필수)
**Settings → Environment Variables** 에서 아래 변수 입력:

```
ADMIN_ACCESS_PASSWORD=강력한비밀번호입력   ← 필수 (보안)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co   ← 권장
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhb...             ← 권장
OPENAI_API_KEY=sk-proj-...                          ← 선택
```

### Step 3 — 배포
- **Deploy** 클릭 → Vercel 자동 빌드 (약 1~2분)
- Deployments 탭에서 상태 `Ready` 확인

### Step 4 — 배포 후 확인
- 발급된 Vercel URL로 접속 테스트
- `/admin-login` → 비밀번호 로그인 확인
- `/consultation` → 상담 폼 제출 테스트

---

## 5. 환경변수 목록

| 변수명 | 필수 여부 | 미설정 시 동작 |
|--------|----------|--------------|
| `ADMIN_ACCESS_PASSWORD` | ✅ 필수 | /admin 무방비 노출 |
| `NEXT_PUBLIC_SUPABASE_URL` | ⚠️ 권장 | 상담 저장 불가, /admin 데모 표시 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ⚠️ 권장 | 상담 저장 불가 (URL과 세트) |
| `OPENAI_API_KEY` | 선택 | mock 요약 반환 (오류 없음) |

> **환경변수 없이도 빌드 및 실행 가능**. 단, ADMIN_ACCESS_PASSWORD 미설정 시 /admin 보안 취약.

---

## 6. 오픈 전 체크리스트

### 콘텐츠 (의뢰인 정보 입력 필요)
- [ ] `lib/constants/site.ts` → 전화번호 교체 (`contact.phone`)
- [ ] `lib/constants/site.ts` → 카카오채널 URL 교체 (`contact.kakaoChannelUrl`)
- [ ] `lib/constants/site.ts` → 법률사무소명·대표변호사명·등록번호 교체
- [ ] `lib/constants/site.ts` → 실제 도메인으로 URL 교체
- [ ] `lib/constants/lawyers.ts` → 변호사 이름·학력·경력 교체

### 이미지
- [ ] `public/images/og-image.png` 추가 (1200×630px)
- [ ] `public/images/lawyers/lawyer-1.jpg` 추가 (600×800px 이상)

### 법적 페이지
- [ ] 개인정보처리방침 법률 전문가 검토
- [ ] 이용약관 법률 전문가 검토
- [ ] 면책사항 법률 전문가 검토

### 배포 환경
- [ ] `ADMIN_ACCESS_PASSWORD` Vercel 환경변수 설정
- [ ] Supabase 프로젝트 생성 + `docs/supabase-consultations.sql` 실행
- [ ] Supabase 환경변수 2개 Vercel에 설정

### 기능 테스트
- [ ] 실제 기기 모바일 테스트 (iPhone/Android)
- [ ] 카카오 버튼 → 실제 채널 연결 확인
- [ ] 상담 폼 제출 → Supabase 저장 확인
- [ ] AI 상담 5문답 완료 → 요약 화면 확인
- [ ] 관리자 로그인 → CRM 접속 확인

---

## 7. 배포 가능 여부

| 점검 항목 | 결과 |
|----------|------|
| `npm run lint` | ✅ PASS (오류 0) |
| `npm run build` | ✅ PASS (16 pages) |
| `.env.local` gitignore 제외 | ✅ |
| `node_modules` gitignore 제외 | ✅ |
| `.next` gitignore 제외 | ✅ |
| API 키 소스 노출 | ✅ 없음 |
| `.env.local.example` 포함 | ✅ |
| `docs/` 포함 | ✅ |
| OG 메타데이터 설정 | ✅ |
| 관리자 보호 (proxy.ts) | ✅ |

### **최종 판정: ✅ PASS**

> 코드는 GitHub 업로드 및 Vercel 배포 가능 상태입니다.  
> 실제 의뢰인 오픈 전 위 체크리스트의 콘텐츠·이미지·법적 페이지 항목을 완료하세요.

---

## 참고 문서

| 문서 | 용도 |
|------|------|
| `docs/github-upload-guide.md` | GitHub 업로드 단계별 가이드 |
| `docs/vercel-env-checklist.md` | 환경변수 상세 설명 |
| `docs/go-live-checklist.md` | 실제 오픈 전 전체 체크리스트 |
| `docs/vercel-deploy-guide.md` | Vercel 배포 가이드 |
| `docs/client-info-form.md` | 의뢰인 정보 입력 양식 |
| `docs/image-assets-guide.md` | 이미지 규격·경로 가이드 |
| `docs/legal-pages-checklist.md` | 법적 페이지 검토 항목 |
