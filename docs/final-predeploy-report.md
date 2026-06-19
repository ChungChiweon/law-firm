# 배포 직전 최종 점검 보고서 — 성범죄 피해 상담센터

점검일: 2026-06-19  
빌드 상태: **PASS** (lint 0 errors · build 16 pages)

---

## 배포 가능 여부

| 항목 | 상태 | 비고 |
|------|------|------|
| `npm run lint` | ✅ PASS | 오류 0 |
| `npm run build` | ✅ PASS | 16 pages, Proxy |
| 공개 위험 파일 | ✅ PASS | .env.local 없음, 시크릿 노출 없음 |
| 내부 링크 | ✅ PASS | NAV_ITEMS 수정 완료 |
| placeholder 현황 | ⚠️ 교체 필요 | 의뢰인 정보 미입력 (정상 — 운영 전 교체) |

> **종합 판정: 코드 배포 가능 상태**  
> 단, 아래 "배포 전 반드시 입력할 값"을 교체한 후 재배포 필요

---

## 완성 기능 목록

| 기능 | 상태 | 비고 |
|------|------|------|
| 홈 랜딩페이지 (`/`) | ✅ | Hero·분야·절차·변호사·FAQ·CTA 전체 섹션 |
| AI 5문답 상담 정리 (`/consultation/ai`) | ✅ | OpenAI 없으면 mock 요약 자동 반환 |
| 비공개 상담 신청 폼 (`/consultation`) | ✅ | Supabase 없으면 API 오류 반환 |
| 문의 페이지 (`/contact`) | ✅ | 카카오·전화·이메일·상담 연결 버튼 |
| 관리자 로그인 (`/admin-login`) | ✅ | 비밀번호 쿠키 인증 (8시간) |
| 관리자 CRM (`/admin`) | ✅ | Supabase 없으면 데모 6건 자동 표시 |
| 개인정보처리방침 (`/privacy`) | ✅ | 법률 전문가 검토 필요 |
| 이용약관 (`/terms`) | ✅ | 법률 전문가 검토 필요 |
| 면책사항 (`/disclaimer`) | ✅ | 법률 전문가 검토 필요 |
| 관리자 접근 제한 (proxy.ts) | ✅ | SHA-256 쿠키 검증 |
| OG 메타데이터 | ✅ | og:image 경로 지정 (파일 추가 필요) |
| 모바일 반응형 | ✅ | 390px 기준 설계 |

---

## 주요 URL

| 화면 | URL |
|------|-----|
| 홈 | `/` |
| AI 상담 | `/consultation/ai` |
| 일반 상담 | `/consultation` |
| 문의 | `/contact` |
| 관리자 로그인 | `/admin-login` |
| 관리자 CRM | `/admin` |
| 개인정보처리방침 | `/privacy` |
| 이용약관 | `/terms` |
| 면책사항 | `/disclaimer` |

---

## 배포 전 반드시 입력할 값

> `lib/constants/site.ts`와 `lib/constants/lawyers.ts`를 수정합니다.
> 상세 양식: `docs/client-info-form.md`

### 필수 (없으면 실제 운영 불가)

| 위치 | 항목 | 현재 placeholder |
|------|------|-----------------|
| `site.ts` | `contact.phone` | `02-000-0000` |
| `site.ts` | `contact.email` | `contact@law-firm.kr` |
| `site.ts` | `contact.kakaoChannelUrl` | `pf.kakao.com/_your_channel` |
| `site.ts` | `contact.address` | `강남구 테헤란로 000` |
| `site.ts` | `office.name` | `○○법률사무소` |
| `site.ts` | `office.representativeName` | `○○○` |
| `site.ts` | `office.barNumber` | `제○○○○호` |
| `site.ts` | `url` | `https://law-firm.kr` |
| `lawyers.ts` | 변호사 1 이름·학력·경력 | `○○○` |
| 환경변수 | `ADMIN_ACCESS_PASSWORD` | 미설정 (자유 접근) |

### 권장 (없어도 실행되지만 완성도 저하)

| 위치 | 항목 |
|------|------|
| `public/images/og-image.png` | SNS 공유 썸네일 (1200×630px) |
| `public/images/lawyers/lawyer-1.jpg` | 변호사 프로필 사진 |
| `site.ts` | `businessHours` (현재 평일 09:00–18:00) |
| `site.ts` | `legalNotice.barAssociation` |
| `site.ts` | `legalNotice.privacyOfficer` |
| 환경변수 | `NEXT_PUBLIC_SUPABASE_URL` + `ANON_KEY` (없으면 상담 저장 불가) |
| 환경변수 | `OPENAI_API_KEY` (없으면 mock 요약 반환) |

---

## 보안 점검 결과

| 점검 항목 | 결과 | 상세 |
|-----------|------|------|
| `.env.local` git 커밋 제외 | ✅ | `.gitignore`의 `.env*` 패턴으로 제외 |
| `.env.local.example` git 포함 | ✅ | `!.env*.example` 예외 추가 완료 |
| API 키 소스 노출 | ✅ | 없음 (package-lock.json npm URL만 있음) |
| `ADMIN_ACCESS_PASSWORD` 소스 노출 | ✅ | 없음 (환경변수로만 참조) |
| Supabase anon key 소스 노출 | ✅ | 없음 |
| `/admin` 검색엔진 노출 차단 | ✅ | `robots: { index: false }` |
| `/admin-login` 검색엔진 노출 차단 | ✅ | layout.tsx `robots: { index: false }` |
| 관리자 접근 제한 (운영 시) | ⚠️ | `ADMIN_ACCESS_PASSWORD` 환경변수 설정 필요 |

---

## 링크 점검 결과

| 항목 | 결과 | 비고 |
|------|------|------|
| 카카오 버튼 전체 (`SITE_CONFIG.kakaoChannelUrl`) | ✅ | 8개 위치 모두 상수 참조 |
| 전화 링크 (`tel:SITE_CONFIG.contact.phone`) | ✅ | 상수 참조 |
| Header NAV_ITEMS 앵커 링크 | ✅ | `#` → `/#` 수정 완료 |
| Footer 퀵 링크 | ✅ | `/#` 형식 사용 |
| 내부 페이지 링크 (`/consultation` 등) | ✅ | 모두 정상 |
| 하드코딩된 외부 URL | ✅ | 없음 (SITE_CONFIG 참조) |

---

## 점검 중 발견 및 수정한 이슈

| 이슈 | 심각도 | 조치 |
|------|--------|------|
| `NAV_ITEMS` href가 `#anchor` 형식 — 하위 페이지에서 홈 섹션 이동 불가 | **중** | `/#anchor` 형식으로 수정 |
| `privacy/page.tsx`가 `office.representativeName`을 개인정보 보호책임자로 사용 | 낮음 | 전용 `legalNotice.privacyOfficer` 필드로 변경 |
| `/admin-login` 검색엔진 노출 차단 누락 | 낮음 | `layout.tsx` 추가, `robots: noindex` |

---

## 남은 필수 작업 (의뢰인)

1. `docs/client-info-form.md` 작성 후 개발자에게 전달
2. 개발자가 `site.ts`, `lawyers.ts` 실제 정보로 교체
3. 변호사 사진 파일 전달 → `public/images/lawyers/`에 추가
4. OG 이미지(1200×630px) 제작 → `public/images/og-image.png`에 추가
5. Supabase 프로젝트 생성 + SQL 실행
6. Vercel 배포 + 환경변수 설정 (`ADMIN_ACCESS_PASSWORD` 필수)
7. 법적 페이지 법률 전문가 검토 (`docs/legal-pages-checklist.md` 참고)

---

## 참고 문서

| 문서 | 용도 |
|------|------|
| `docs/vercel-deploy-guide.md` | Vercel 배포 단계별 가이드 |
| `docs/deployment-checklist.md` | 배포 전 단계별 체크리스트 |
| `docs/client-info-form.md` | 의뢰인 정보 입력 양식 |
| `docs/image-assets-guide.md` | 이미지 규격 및 경로 안내 |
| `docs/legal-pages-checklist.md` | 법적 페이지 검토 항목 |
