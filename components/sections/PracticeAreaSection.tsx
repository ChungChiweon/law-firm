import Link from "next/link";
import {
  Shield, Eye, Monitor, MessageSquare,
  Camera, Home, Briefcase, Heart, ArrowUpRight,
} from "lucide-react";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { SectionHeading } from "@/components/common/SectionHeading";
import { PRACTICE_AREAS } from "@/lib/constants/practiceAreas";
import { SITE_CONFIG } from "@/lib/constants/site";
import type { PracticeArea } from "@/lib/types";

const ICON_MAP: Record<string, React.ElementType> = {
  Shield, Eye, Monitor, MessageSquare,
  Camera, Home, Briefcase, Heart,
};

export function PracticeAreaSection() {
  return (
    <SectionWrapper id="practice-areas" background="slate" className="section-divider">
      <SectionHeading
        eyebrow="Practice Areas"
        title="상담 가능한 피해 유형"
        description="어떤 상황인지 말씀하기 어려우셔도 괜찮습니다. 여성 변호사가 함께 들으며 방향을 찾아드립니다."
      />

      {/* 법적 안내 배너 */}
      <div className="mb-7 rounded-xl border border-slate-200 bg-white px-4 py-3.5 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
        <p className="text-[0.8125rem] leading-relaxed text-slate-500">
          <strong className="text-slate-700">안내 사항 —</strong>{" "}
          AI 상담은 법률 판단이 아닌 상담 접수 보조입니다. 구체적 판단은 변호사 검토 후 가능합니다.
          상담 내용은 비공개로 관리되며, 결과를 보장하지 않습니다.
          상황에 따라 적절한 상담 방향을 안내드립니다.
        </p>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {PRACTICE_AREAS.map((area) => (
          <PracticeAreaCard key={area.id} area={area} />
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-slate-400">
        해당 유형이 없으시거나 확신이 없으셔도 괜찮습니다.{" "}
        <Link
          href={SITE_CONFIG.contact.consultationUrl}
          className="font-semibold text-amber-600 underline underline-offset-2 hover:text-amber-700"
        >
          먼저 연락해 주세요 →
        </Link>
      </p>
    </SectionWrapper>
  );
}

function PracticeAreaCard({ area }: { area: PracticeArea }) {
  const Icon = ICON_MAP[area.icon] ?? Shield;

  return (
    <Link
      href={area.href}
      className="group relative flex flex-col rounded-xl border border-slate-200/60 bg-white p-5 shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-300/50 hover:shadow-[0_6px_24px_rgba(0,0,0,0.07)]"
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-amber-50/0 to-amber-50/0 transition-all duration-300 group-hover:from-amber-50/40 group-hover:to-transparent" />

      <div className="relative flex flex-col flex-1">
        <div className="mb-3.5 flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0a1628] transition-all duration-300 group-hover:bg-amber-500">
            <Icon size={18} className="text-amber-400 transition-colors group-hover:text-white" strokeWidth={1.5} />
          </div>
          <ArrowUpRight
            size={15}
            className="mt-0.5 text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-500"
          />
        </div>

        <h3 className="mb-1.5 text-[0.9375rem] font-bold text-slate-900">{area.title}</h3>
        <p className="flex-1 text-[0.8125rem] leading-relaxed text-slate-500">{area.description}</p>

        <div className="mt-3.5 border-t border-slate-100 pt-3">
          <span className="text-[0.8125rem] font-semibold text-slate-400 transition-colors group-hover:text-amber-600">
            상담 신청하기
          </span>
        </div>
      </div>
    </Link>
  );
}
