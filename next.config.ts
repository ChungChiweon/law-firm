import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── 이미지 설정 ────────────────────────────────────────
  // 현재는 로컬 이미지만 사용하므로 추가 설정 불필요.
  // 외부 이미지(CDN, 카카오 등)를 <Image>로 로드할 경우 아래 설정 추가:
  //
  // images: {
  //   remotePatterns: [
  //     { protocol: "https", hostname: "example.com" },
  //   ],
  // },
};

export default nextConfig;
