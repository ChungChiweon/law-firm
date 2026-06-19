import type { Metadata } from "next";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PracticeAreaSection } from "@/components/sections/PracticeAreaSection";

export const metadata: Metadata = {
  title: "상담 분야",
  description: "성범죄, 데이트폭력, 스토킹, 디지털 성범죄 등 여성 변호사가 직접 상담합니다.",
};

export default function PracticeAreasPage() {
  return (
    <PublicLayout>
      <main className="pt-16 lg:pt-[72px]">
        <PracticeAreaSection />
      </main>
    </PublicLayout>
  );
}
