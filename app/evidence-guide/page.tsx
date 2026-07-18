import type { Metadata } from "next";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { EvidenceGuideSection } from "@/components/sections/EvidenceGuideSection";

export const metadata: Metadata = {
  title: "증거 보전 가이드",
  description:
    "성범죄·데이트폭력·스토킹·디지털성범죄 피해 시 무엇을 남기고 무엇을 하지 말아야 하는지, 피해 유형별 증거 보전 방법을 정리했습니다.",
};

export default function EvidenceGuidePage() {
  return (
    <PublicLayout>
      <main className="pt-16 lg:pt-[72px]">
        <EvidenceGuideSection />
      </main>
    </PublicLayout>
  );
}
