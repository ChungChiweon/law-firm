import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// 모든 공개 페이지의 공통 껍데기 — Header + 본문 + Footer
// /admin, /admin-login 등 관리자 전용 페이지는 이 컴포넌트를 사용하지 않음
export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
