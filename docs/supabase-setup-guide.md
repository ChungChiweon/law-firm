# Supabase 실제 운영 연결 가이드

상담 신청 데이터를 실제 DB에 저장하고 관리자 CRM에서 조회·수정하는 방법입니다.

---

## 1. Supabase 프로젝트 생성

1. [supabase.com](https://supabase.com) 접속 → **Start your project** 클릭
2. GitHub 계정으로 로그인 (권장)
3. **New project** 클릭
4. 설정:
   - **Organization**: 개인 또는 팀 선택
   - **Project name**: `law-firm` (원하는 이름)
   - **Database Password**: 강력한 비밀번호 입력 후 반드시 저장
   - **Region**: `Northeast Asia (Seoul)` ← 속도를 위해 서울 선택
5. **Create new project** 클릭 (약 1~2분 소요)

---

## 2. SQL Editor에서 테이블 생성

1. 좌측 메뉴 **SQL Editor** 클릭
2. **New query** 클릭
3. `docs/supabase-consultations.sql` 파일 전체 내용 복사 → 붙여넣기
4. **Run** (또는 `Ctrl+Enter`) 클릭
5. 하단에 `Success. No rows returned` 확인

### 실행 확인

SQL Editor에서 아래 쿼리로 테이블이 정상 생성됐는지 확인:

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'consultations'
ORDER BY ordinal_position;
```

---

## 3. API 키 확인

1. 좌측 메뉴 **Project Settings** → **API** 클릭
2. 아래 값을 복사해둡니다:

| 항목 | 위치 | 사용처 |
|------|------|--------|
| **Project URL** | `https://xxxxxx.supabase.co` | `NEXT_PUBLIC_SUPABASE_URL` |
| **anon public** key | `eyJhb...` | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| **service_role** key | `eyJhb...` | `SUPABASE_SERVICE_ROLE_KEY` |

> ⚠️ **service_role key는 절대 공개 금지** — 모든 RLS 정책을 우회합니다.  
> `NEXT_PUBLIC_` 접두사 없이 설정해야 브라우저에 노출되지 않습니다.

---

## 4. 로컬 .env.local 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 아래 내용을 입력합니다:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# 관리자 비밀번호
ADMIN_ACCESS_PASSWORD=강력한-비밀번호-입력

# OpenAI (선택)
# OPENAI_API_KEY=sk-proj-...
```

`.env.local.example` 파일을 복사해서 시작할 수 있습니다:

```bash
cp .env.local.example .env.local
```

---

## 5. Vercel 환경변수 설정

GitHub push → Vercel 자동 배포 환경에서:

1. [vercel.com](https://vercel.com) → 프로젝트 선택
2. **Settings** → **Environment Variables**
3. 아래 4개 변수 입력 (Environment: Production + Preview + Development 모두 체크):

| 변수명 | 필수 | 값 |
|--------|------|-----|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | service_role key |
| `ADMIN_ACCESS_PASSWORD` | ✅ | 관리자 비밀번호 |

4. **Save** 클릭 후 **Deployments** 탭 → **Redeploy** 클릭

---

## 6. 저장 테스트

### 로컬에서 테스트

```bash
npm run dev
```

1. `http://localhost:3000/consultation` 접속
2. 상담 신청 폼 작성 후 제출
3. 성공 화면이 표시되면 Supabase에서 확인:
   - Supabase 대시보드 → **Table Editor** → `consultations` 테이블
   - 방금 제출한 데이터가 있으면 연결 성공 ✅

### 실패 시 확인 사항

| 증상 | 원인 | 해결 |
|------|------|------|
| 제출 후 카카오 안내 메시지 표시 | 환경변수 미설정 또는 URL/키 오류 | `.env.local` 값 재확인 |
| `new row violates check constraint` | area 값이 DB 제약과 불일치 | `docs/supabase-consultations.sql` 재실행 |
| CORS 오류 | Supabase URL 오탈자 | URL 앞뒤 공백 확인 |

---

## 7. 관리자 CRM 확인

1. `/admin-login` 접속 → `ADMIN_ACCESS_PASSWORD`로 로그인
2. `/admin` 접속
3. **데모 모드 배너가 사라지고** 실제 데이터가 표시되면 연결 성공 ✅

### 관리자 기능 테스트

| 기능 | 확인 방법 |
|------|----------|
| 목록 조회 | 접수된 상담이 최신순으로 표시 |
| 검색 | 이름/내용 검색 결과 표시 |
| 상태 변경 | 상세 보기 → 상태 드롭다운 변경 → 저장 |
| 메모 작성 | 상세 보기 → 내부 메모 입력 → 저장 |

---

## 연결 구조 요약

```
브라우저 ─→ POST /api/consultation ─→ Supabase (anon key, INSERT 전용)
              ↓
           [상담 데이터 저장]

관리자 브라우저 ─→ GET/PATCH /api/admin/consultations ─→ Supabase (service role key, RLS 우회)
                   ↓
                [전체 데이터 조회·수정]
```

> **왜 service_role key가 필요한가?**  
> RLS 정책상 anon(방문자)은 INSERT(상담 신청)만 허용됩니다.  
> 관리자가 모든 데이터를 조회·수정하려면 RLS를 우회하는 service_role key가 필요합니다.  
> service_role key는 서버(API Route)에서만 사용하며 브라우저에 절대 노출되지 않습니다.

---

## 참고 문서

| 문서 | 용도 |
|------|------|
| `docs/supabase-consultations.sql` | 테이블 생성 SQL |
| `docs/vercel-env-checklist.md` | 환경변수 상세 설명 |
| `docs/go-live-checklist.md` | 전체 오픈 전 체크리스트 |
