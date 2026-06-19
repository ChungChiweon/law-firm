import type { Metadata } from "next";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { LawyerProfileSection } from "@/components/sections/LawyerProfileSection";

export const metadata: Metadata = {
  title: "변호사 소개",
  description: "여성 변호사가 직접 상담합니다. 피해자의 입장에서 함께합니다.",
};

export default function LawyerPage() {
  return (
    <PublicLayout>
      <main className="pt-16 lg:pt-[72px]">
        <LawyerProfileSection />
      </main>
    </PublicLayout>
  );
}
