import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "관리자 — 상담 접수 관리",
  robots: { index: false, follow: false },
};

// 관리자 페이지는 항상 서버에서 동적 렌더링
export const dynamic = "force-dynamic";

export default function AdminPage() {
  return <AdminDashboard />;
}
