# 이미지 자산 가이드 — 성범죄 피해 상담센터

> 실제 운영 전 아래 이미지를 준비하여 지정된 경로에 추가하세요.
> 이미지 파일이 없어도 빌드·실행은 정상 동작합니다.

---

## 필요한 이미지 목록

| 용도 | 파일 경로 | 규격 | 우선순위 |
|------|-----------|------|----------|
| SNS 공유 썸네일 | `public/images/og-image.png` | 1200×630px | **필수** |
| 변호사 1 프로필 | `public/images/lawyers/lawyer-1.jpg` | 400×400px 이상 | 권장 |
| 변호사 2 프로필 | `public/images/lawyers/lawyer-2.jpg` | 400×400px 이상 | 권장 |

> 파일이 없으면: OG 이미지 없이 공유, 변호사 카드에 기본 아이콘 표시

---

## 1. OG 이미지 (SNS 공유 썸네일)

### 용도
카카오톡, 페이스북, 트위터/X, 슬랙 등에서 URL 공유 시 표시되는 미리보기 이미지입니다.

### 저장 경로
```
public/images/og-image.png
```

### 권장 규격

| 항목 | 값 |
|------|-----|
| 가로 × 세로 | **1200 × 630px** (카카오·페이스북 표준) |
| 파일 형식 | PNG 또는 JPG |
| 파일 크기 | 1MB 이하 권장 |
| 최소 크기 | 600 × 315px (이 이하면 일부 플랫폼에서 미리보기 없음) |

### 권장 내용
- 사이트명 텍스트
- 변호사 신뢰감을 주는 시각적 요소
- **결과 보장·선정적 표현 금지**
- 전화번호는 포함 가능

### 디자인 도구 추천
- Canva (canva.com) — 무료, "OG Image 1200×630" 검색
- Figma (figma.com) — 1200×630 프레임 생성
- Adobe Express (express.adobe.com)

---

## 2. 변호사 프로필 사진

### 저장 경로
```
public/images/lawyers/lawyer-1.jpg   ← 대표 변호사
public/images/lawyers/lawyer-2.jpg   ← 파트너 변호사 (해당 시)
```

### 파일명 규칙
- 기본: `lawyer-1.jpg`, `lawyer-2.jpg`
- 또는 실제 이름 사용: `kim.jpg`, `lee.jpg`
- 파일명 변경 시 `lib/constants/lawyers.ts`의 `imageUrl` 값도 함께 변경

### 권장 규격

| 항목 | 값 |
|------|-----|
| 가로 × 세로 | **정방형 (1:1 비율)**, 400×400px 이상 |
| 파일 형식 | JPG 또는 WebP |
| 파일 크기 | 500KB 이하 권장 |
| 배경 | 단색 배경 또는 사무실 배경 권장 |

### `lawyers.ts` 연결 방법

```typescript
// lib/constants/lawyers.ts

imageUrl: "/images/lawyers/lawyer-1.jpg",  // ← 이 값을 교체
```

파일 저장 후 이 값을 실제 파일 경로로 교체하면 자동으로 반영됩니다.

---

## 3. 카카오톡 공유 미리보기 확인 방법

OG 이미지가 카카오톡에서 정상 표시되는지 확인하는 방법입니다.

### 방법 1 — 카카오 공유 디버거 (배포 후)
1. [developers.kakao.com/tool/clear/og](https://developers.kakao.com/tool/clear/og) 접속
2. 배포된 사이트 URL 입력
3. OG 이미지·제목·설명 미리보기 확인
4. 캐시 초기화 후 실제 카카오톡에서 공유 테스트

### 방법 2 — Facebook 디버거 (배포 후)
1. [developers.facebook.com/tools/debug](https://developers.facebook.com/tools/debug) 접속
2. URL 입력 → "디버그" 클릭
3. `og:image`, `og:title`, `og:description` 값 확인

### 방법 3 — 로컬 테스트 (배포 전)
```bash
# ngrok 등 터널링 도구로 로컬 서버를 외부에 노출 후 확인
npx ngrok http 3000
```

---

## 4. 현재 메타데이터 설정 상태

`app/layout.tsx`에 설정된 공유 메타데이터 (실제 값은 `lib/constants/site.ts` 참고):

| 항목 | 설정값 | 비고 |
|------|--------|------|
| `og:title` | `{사이트명} \| 여성 변호사 직접 상담` | ✅ |
| `og:description` | SITE_CONFIG.description | ✅ |
| `og:image` | `/images/og-image.png` | ★ 파일 추가 필요 |
| `og:image:width` | 1200 | ✅ |
| `og:image:height` | 630 | ✅ |
| `og:locale` | `ko_KR` | ✅ |
| `twitter:card` | `summary_large_image` | ✅ |
| `twitter:image` | `/images/og-image.png` | ★ 파일 추가 필요 |
| `metadataBase` | `SITE_CONFIG.url` | ★ 실제 도메인 교체 필요 |

> **metadataBase 주의**: `lib/constants/site.ts`의 `url` 값이 실제 도메인으로 교체되어야  
> OG 이미지 URL이 `https://실제도메인/images/og-image.png` 형태로 생성됩니다.

---

## 5. 이미지 추가 후 재배포

이미지를 추가한 후 git push하면 Vercel이 자동으로 재배포합니다.

```bash
git add public/images/
git commit -m "assets: OG 이미지 및 변호사 프로필 사진 추가"
git push
```
