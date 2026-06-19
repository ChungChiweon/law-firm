import type { Metadata } from "next";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { FaqSection } from "@/components/sections/FaqSection";

export const metadata: Metadata = {
  title: "자주 묻는 질문",
  description: "성범죄 피해 상담 시 자주 묻는 질문과 답변을 확인하세요.",
};

export default function FaqPage() {
  return (
    <PublicLayout>
      <main className="pt-16 lg:pt-[72px]">
        <FaqSection />
      </main>
    </PublicLayout>
  );
}
