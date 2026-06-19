import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants/site";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

// ── OG 이미지 설정 ────────────────────────────────────────────
// 실제 운영 전 public/images/og-image.png 파일을 추가하세요.
// 권장 규격: 1200×630px, PNG 또는 JPG
// 파일이 없으면 SNS 공유 시 이미지 없이 표시됩니다.
const BASE_URL = "https://law-firm-chi-ten.vercel.app";

const OG_IMAGE = {
  url: `${BASE_URL}/images/og-image.png`,
  width: 1200,
  height: 630,
  alt: `${SITE_CONFIG.name} — 여성 변호사 직접 상담`,
};

export const metadata: Metadata = {
  // ── metadataBase ────────────────────────────────────────────
  // ★ 실제 도메인으로 교체 필요: lib/constants/site.ts의 url 값
  // Vercel 배포 시 자동으로 배포 URL이 사용됩니다.
  metadataBase: new URL(BASE_URL),

  // ── 제목 ───────────────────────────────────────────────────
  title: {
    default: `${SITE_CONFIG.name} | 여성 변호사 직접 상담`,
    template: `%s | ${SITE_CONFIG.name}`,
  },

  // ── 설명 ───────────────────────────────────────────────────
  description: SITE_CONFIG.description,

  // ── 키워드 ─────────────────────────────────────────────────
  keywords: [
    "성범죄피해상담",
    "여성변호사상담",
    "데이트폭력상담",
    "스토킹피해",
    "디지털성범죄",
    "성범죄변호사",
    "피해자법률상담",
    "비공개상담",
    "성폭력피해",
    "카메라불법촬영",
  ],

  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,

  // ── Open Graph (카카오·페이스북·슬랙 등 SNS 공유) ──────────
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: BASE_URL,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | 여성 변호사 직접 상담`,
    description: SITE_CONFIG.description,
    images: [OG_IMAGE],
  },

  // ── Twitter / X 카드 ────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | 여성 변호사 직접 상담`,
    description: SITE_CONFIG.description,
    images: [OG_IMAGE],
  },

  // ── Canonical URL ───────────────────────────────────────────
  alternates: {
    canonical: BASE_URL,
  },

  // ── 검색엔진 크롤링 ────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a1628",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body className={`${notoSansKR.className} antialiased`}>{children}</body>
    </html>
  );
}
