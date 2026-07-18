import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EmergencyHotline } from "@/components/common/EmergencyHotline";
import { QuickExit } from "@/components/common/QuickExit";

// 모든 공개 페이지의 공통 껍데기 — 긴급 핫라인 + Header + 본문 + Footer + 빠른 이탈
// /admin, /admin-login 등 관리자 전용 페이지는 이 컴포넌트를 사용하지 않음
// (긴급 핫라인·빠른 이탈은 방문자용이므로 관리자 페이지에는 노출하지 않음)
export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 상단 고정: 긴급 핫라인 배너 (헤더 위, 항상 노출) */}
      <EmergencyHotline />
      {/* 고정 배너 높이만큼 본문을 밀어내는 스페이서 (배너 h-9 = 36px) */}
      <div aria-hidden className="h-9" />
      <Header />
      {children}
      <Footer />
      {/* 빠른 이탈(안전 탈출) 버튼 — 모든 공개 페이지에 상시 노출 */}
      <QuickExit />
    </>
  );
}
