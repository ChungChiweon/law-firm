# 실제 오픈 전 최종 체크리스트 (Go Live)

사이트를 실제 의뢰인에게 공개하기 전 아래 항목을 모두 확인하세요.  
상세 가이드: `docs/deployment-checklist.md` · `docs/vercel-env-checklist.md`

---

## A. 콘텐츠 확인

- [ ] **전화번호 확인** — `lib/constants/site.ts` → `contact.phone` 실제 번호로 교체
  - 확인 방법: 홈 화면 하단·헤더·상담 완료 화면에 정확한 번호 표시 여부
- [ ] **카카오채널 URL 확인** — `contact.kakaoChannelUrl` 실제 채널 URL로 교체
  - 확인 방법: 카카오 버튼 클릭 → 실제 채널로 연결되는지 확인
- [ ] **법률사무소명 확인** — `office.name`, `office.representativeName`, `office.barNumber` 교체
  - 확인 방법: 하단 Footer에 사무소명·등록번호 정확히 표시 여부
- [ ] **주소 확인** — `contact.address` 실제 주소로 교체
  - 확인 방법: `/contact` 페이지 주소 표시 여부

---

## B. 이미지 자산

- [ ] **변호사 사진 업로드** — `public/images/lawyers/lawyer-1.jpg` 추가
  - 규격: 600×800px 이상, JPG/WebP, 배경 단색 권장
  - 확인 방법: 홈 "변호사 소개" 섹션에 사진 표시 여부
- [ ] **OG 이미지 업로드** — `public/images/og-image.png` 추가
  - 규격: 1200×630px, PNG/JPG
  - 확인 방법: [카카오 공유 디버거](https://developers.kakao.com/tool/clear/og) 또는 SNS 공유 테스트

---

## C. 법적 페이지

- [ ] **개인정보처리방침 법률 검토** — `/privacy` 내용 변호사 검토 완료 여부
  - 확인 방법: `/privacy` 페이지 접속 → 내용 검토
- [ ] **이용약관 법률 검토** — `/terms` 내용 검토 완료 여부
- [ ] **면책사항 법률 검토** — `/disclaimer` 내용 검토 완료 여부
- [ ] **개인정보 보호책임자 이름** — `legalNotice.privacyOfficer` 실제 담당자명으로 교체

---

## D. 보안 및 관리자

- [ ] **관리자 비밀번호 설정** — Vercel 환경변수 `ADMIN_ACCESS_PASSWORD` 입력 완료
  - 테스트: `/admin-login` → 설정한 비밀번호로 로그인 성공 여부
  - 테스트: 틀린 비밀번호 입력 시 오류 메시지 표시 여부
- [ ] **관리자 CRM 확인** — `/admin` 접속 후 대시보드 정상 표시 여부
- [ ] **로그아웃 버튼 확인** — 관리자 화면 우상단 로그아웃 버튼 작동 여부

---

## E. 핵심 기능 테스트

- [ ] **AI 상담 테스트** — `/consultation/ai` 5문답 완료 후 요약 화면 확인
  - `OPENAI_API_KEY` 설정 시: 실제 AI 요약 반환 여부
  - 미설정 시: mock 요약 정상 표시 여부
- [ ] **상담 저장 테스트** — `/consultation` 폼 제출 후 Supabase 테이블 저장 확인
  - 확인 방법: Supabase 대시보드 → Table Editor → `consultations` 테이블
- [ ] **카카오 공유 테스트** — 카카오톡에서 링크 공유 시 OG 이미지·제목 표시 확인
  - 도구: [카카오 공유 디버거](https://developers.kakao.com/tool/clear/og)

---

## F. 기기·브라우저 테스트

- [ ] **모바일 테스트 (iPhone/Android)** — 실제 기기에서 접속 후 전체 화면 확인
  - 홈 스크롤, 상담 폼, AI 상담 단계, 버튼 클릭 테스트
- [ ] **모바일 전화 버튼** — 전화번호 클릭 시 통화 앱 연결 여부
- [ ] **모바일 카카오 버튼** — 카카오톡 앱으로 연결 여부
- [ ] **PC 브라우저 테스트** — Chrome 최신 버전 기준 전체 화면 확인
- [ ] **실제 기기 테스트 (iPad 등 태블릿)** — 선택 사항

---

## G. 최종 확인

- [ ] **커스텀 도메인 연결** (선택) — Vercel 도메인 설정 후 HTTPS 자동 적용 확인
- [ ] **404 페이지** — 존재하지 않는 URL 접속 시 Next.js 기본 404 표시 여부
- [ ] **빌드 오류 없음** — Vercel Deployments 탭에서 최신 배포 상태 `Ready` 확인

---

## 완료 기준

**위 항목 전체 체크 완료 → 실제 의뢰인 공개 가능**

> 법적 페이지(개인정보처리방침·이용약관·면책사항)는 반드시 법률 전문가 검토 후 공개하세요.  
> 자세한 항목은 `docs/legal-pages-checklist.md` 참고.
