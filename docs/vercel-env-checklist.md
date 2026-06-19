# Vercel 환경변수 체크리스트

Vercel 대시보드에서 설정해야 하는 환경변수 목록입니다.  
**Settings → Environment Variables** 에서 입력하세요.

---

## 환경변수 목록

### 1. `ADMIN_ACCESS_PASSWORD`

| 항목 | 내용 |
|------|------|
| **필수 여부** | ✅ 필수 (미설정 시 /admin 무방비 노출) |
| **미설정 시 동작** | `/admin`에 누구나 접근 가능 (비밀번호 검증 건너뜀) |
| **설정 위치** | Vercel → Settings → Environment Variables |
| **권장 형식** | 영문+숫자+특수문자 12자리 이상 (예: `Secure!Pass#2026`) |
| **테스트 방법** | 배포 후 `/admin-login` 접속 → 설정한 비밀번호로 로그인 확인 |

```
ADMIN_ACCESS_PASSWORD=강력한-비밀번호-여기에-입력
```

---

### 2. `NEXT_PUBLIC_SUPABASE_URL`

| 항목 | 내용 |
|------|------|
| **필수 여부** | ⚠️ 권장 (미설정 시 상담 저장 불가) |
| **미설정 시 동작** | 상담 신청 폼 제출 시 오류 반환. `/admin`은 데모 6건 자동 표시 |
| **설정 위치** | Vercel → Settings → Environment Variables |
| **값 가져오는 곳** | Supabase 대시보드 → Project Settings → API → Project URL |
| **테스트 방법** | `/consultation` 에서 상담 신청 후 Supabase 테이블에 데이터 확인 |

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxx.supabase.co
```

---

### 3. `NEXT_PUBLIC_SUPABASE_ANON_KEY`

| 항목 | 내용 |
|------|------|
| **필수 여부** | ⚠️ 권장 (미설정 시 상담 저장 불가) |
| **미설정 시 동작** | `NEXT_PUBLIC_SUPABASE_URL`과 동일 (함께 설정해야 작동) |
| **설정 위치** | Vercel → Settings → Environment Variables |
| **값 가져오는 곳** | Supabase 대시보드 → Project Settings → API → anon public key |
| **테스트 방법** | `NEXT_PUBLIC_SUPABASE_URL`과 동시에 확인 |

```
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> `NEXT_PUBLIC_` 접두사가 붙은 변수는 브라우저에서도 읽힙니다.  
> anon key는 Supabase RLS(Row Level Security) 정책으로 보호되므로 공개되어도 안전합니다.

---

### 4. `OPENAI_API_KEY`

| 항목 | 내용 |
|------|------|
| **필수 여부** | 선택 (미설정 시 AI 상담이 mock 요약으로 대체됨) |
| **미설정 시 동작** | `/consultation/ai` 에서 고정된 mock 요약 텍스트 반환. 오류 없음 |
| **설정 위치** | Vercel → Settings → Environment Variables |
| **값 가져오는 곳** | [platform.openai.com](https://platform.openai.com) → API Keys |
| **테스트 방법** | `/consultation/ai` 에서 5문답 완료 후 AI 요약이 실제 내용 반영하는지 확인 |

```
OPENAI_API_KEY=sk-proj-...
```

---

## Vercel 환경변수 설정 절차

1. [vercel.com](https://vercel.com) 로그인 → 프로젝트 선택
2. 상단 탭 **Settings** 클릭
3. 좌측 메뉴 **Environment Variables** 클릭
4. 변수 이름(Name)과 값(Value) 입력
5. **Environment** 선택: `Production`, `Preview`, `Development` 모두 체크 권장
6. **Save** 클릭
7. 모든 변수 입력 후 **Deployments** 탭에서 **Redeploy** 클릭 (환경변수는 재배포 시 적용)

---

## 설정 우선순위 요약

| 우선순위 | 환경변수 | 이유 |
|---------|----------|------|
| 1순위 | `ADMIN_ACCESS_PASSWORD` | 미설정 시 보안 위협 |
| 2순위 | `NEXT_PUBLIC_SUPABASE_URL` + `ANON_KEY` | 미설정 시 상담 저장 불가 |
| 3순위 | `OPENAI_API_KEY` | 미설정 시 mock 요약 (기능 저하만) |
