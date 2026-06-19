# GitHub 업로드 가이드

GitHub에 소스코드를 안전하게 업로드하는 단계별 절차입니다.

---

## 업로드 전 확인 (자동 제외 목록)

아래 항목은 `.gitignore`에 이미 설정되어 있어 GitHub에 업로드되지 않습니다.

| 항목 | 제외 이유 |
|------|----------|
| `.env.local` | API 키·비밀번호 등 실제 시크릿 |
| `node_modules/` | 의존성 패키지 (용량 매우 큼) |
| `.next/` | 빌드 결과물 (Vercel이 자동 생성) |
| `coverage/` | 테스트 커버리지 결과물 |
| `*.log` | 디버그 로그 파일 |
| `.vercel/` | Vercel CLI 캐시 |
| `*.tsbuildinfo` | TypeScript 빌드 캐시 |

> **반드시 포함되어야 하는 파일**: `.env.local.example` (실제 값 없는 템플릿)

---

## ① GitHub 저장소 생성

1. [github.com](https://github.com) 로그인
2. 우상단 **+** → **New repository** 클릭
3. 설정:
   - **Repository name**: `law-firm` (또는 원하는 이름)
   - **Visibility**: `Private` ← **반드시 비공개로 설정**
   - Initialize 옵션은 **모두 체크 해제** (로컬에서 push할 예정)
4. **Create repository** 클릭
5. 표시되는 저장소 URL 복사 (`https://github.com/계정명/law-firm.git`)

---

## ② 로컬 명령어

터미널(PowerShell 또는 Git Bash)에서 프로젝트 폴더로 이동 후 순서대로 실행합니다.

```bash
# 프로젝트 폴더로 이동
cd C:\Users\USER\Documents\law-firm

# Git 초기화
git init

# 전체 파일 스테이징 (.gitignore 제외 항목은 자동 제외)
git add .

# 첫 커밋
git commit -m "feat: 성범죄 피해 상담센터 랜딩페이지 + CRM 초기 구성"

# 기본 브랜치를 main으로 설정
git branch -M main

# GitHub 저장소 연결 (위에서 복사한 URL 사용)
git remote add origin https://github.com/계정명/law-firm.git

# GitHub에 업로드
git push -u origin main
```

---

## ③ 업로드 후 확인 사항

GitHub 저장소 페이지에서 아래 항목을 직접 확인하세요.

| 확인 항목 | 확인 방법 |
|----------|----------|
| **README 정상 표시** | 저장소 메인 페이지에 README.md 내용이 보여야 함 |
| **docs 폴더 포함** | `docs/` 폴더 클릭 시 가이드 문서들이 보여야 함 |
| **`.env.local` 미포함** | 저장소에서 `.env.local` 파일이 없어야 함 |
| **`node_modules` 미포함** | `node_modules/` 폴더가 없어야 함 |
| **`.env.local.example` 포함** | 루트 폴더에 `.env.local.example` 파일이 보여야 함 |

---

## ④ 이후 변경사항 업로드 방법

실제 운영 정보 입력 후 재업로드할 때:

```bash
git add .
git commit -m "chore: 실제 운영 정보 반영 (연락처·변호사 정보)"
git push
```

Vercel과 연결되어 있으면 `git push` 시 자동으로 재배포됩니다.

---

## 주의사항

- 저장소는 **반드시 Private(비공개)** 으로 유지하세요. 의뢰인 상담 내용과 관련된 코드가 포함되어 있습니다.
- `ADMIN_ACCESS_PASSWORD` 등 실제 비밀번호는 절대 코드에 직접 입력하지 마세요. 항상 환경변수로 관리합니다.
- 커밋 메시지에 비밀번호나 API 키를 포함하지 마세요.
