import type { Metadata } from "next";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ProcessSection } from "@/components/sections/ProcessSection";

export const metadata: Metadata = {
  title: "상담 절차",
  description: "비공개 상담 신청부터 사건 해결까지, 단계별 상담 절차를 안내합니다.",
};

export default function ProcessPage() {
  return (
    <PublicLayout>
      <main className="pt-16 lg:pt-[72px]">
        <ProcessSection />
      </main>
    </PublicLayout>
  );
}
