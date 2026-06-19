import { UserCheck, Zap, ShieldCheck, Target } from "lucide-react";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { SectionHeading } from "@/components/common/SectionHeading";
import { TRUST_POINTS } from "@/lib/constants/trustPoints";
import type { TrustPoint } from "@/lib/types";

const ICON_MAP: Record<string, React.ElementType> = {
  UserCheck,
  Zap,
  ShieldCheck,
  Target,
};

export function TrustSection() {
  return (
    <SectionWrapper id="trust" background="white" className="section-divider">
      <SectionHeading
        eyebrow="Why Choose Us"
        title="믿고 연락할 수 있는 이유"
        description="상담을 망설이고 계신다면, 아래 내용을 먼저 확인해 주세요."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {TRUST_POINTS.map((point, index) => (
          <TrustCard key={point.id} point={point} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}

function TrustCard({ point, index }: { point: TrustPoint; index: number }) {
  const Icon = ICON_MAP[point.icon] ?? ShieldCheck;

  return (
    <div className="group relative flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-200/60 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
      {/* 상단 액센트 라인 */}
      <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 rounded-t-2xl bg-gradient-to-r from-amber-400 to-amber-600 transition-transform duration-300 group-hover:scale-x-100" />

      {/* 번호 + 아이콘 행 */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#0a1628] to-[#1a3a6b] shadow-[0_4px_12px_rgba(10,22,40,0.25)] transition-transform duration-300 group-hover:scale-105">
          <Icon size={22} className="text-amber-400" strokeWidth={1.5} />
        </div>
        <span className="text-3xl font-black text-slate-100 select-none">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* 텍스트 */}
      <h3 className="mb-2.5 text-[0.9375rem] font-bold text-slate-900">{point.title}</h3>
      <p className="flex-1 text-sm leading-relaxed text-slate-500">{point.description}</p>
    </div>
  );
}
