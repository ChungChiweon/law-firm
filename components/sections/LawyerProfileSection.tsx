import { User, GraduationCap, Briefcase } from "lucide-react";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { SectionHeading } from "@/components/common/SectionHeading";
import { LAWYERS } from "@/lib/constants/lawyers";
import type { LawyerProfile } from "@/lib/types";

export function LawyerProfileSection() {
  return (
    <SectionWrapper id="lawyer" background="slate" className="section-divider">
      <SectionHeading
        eyebrow="Our Lawyers"
        title="여성 변호사 직접 상담"
        description="의뢰인의 이야기를 먼저 듣겠습니다. 판단 없이, 함께 방향을 찾겠습니다."
      />
      <div className="grid gap-8 lg:grid-cols-2">
        {LAWYERS.map((lawyer) => (
          <LawyerCard key={lawyer.id} lawyer={lawyer} />
        ))}
      </div>
    </SectionWrapper>
  );
}

function LawyerCard({ lawyer }: { lawyer: LawyerProfile }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-[0_2px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.1)]">

      {/* 헤더 배너 — 네이비 그라디언트 */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#060f1e] via-[#0a1628] to-[#0f2040] px-6 py-7 sm:px-8">
        {/* 배너 내 패턴 */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
            backgroundSize: "10px 10px",
          }}
        />
        {/* 골드 장식선 */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

        <div className="relative flex items-center gap-5">
          {/* 사진 */}
          <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-2xl border-2 border-white/15 bg-white/10 sm:h-20 sm:w-20">
            {lawyer.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={lawyer.imageUrl}
                alt={`변호사 ${lawyer.name}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-white/20">
                <User size={32} strokeWidth={1} />
              </div>
            )}
          </div>

          {/* 이름 정보 */}
          <div>
            <p className="mb-1 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-amber-400/80">
              {lawyer.title}
            </p>
            <h3 className="text-xl font-extrabold text-white sm:text-2xl">
              {lawyer.name}
              <span className="ml-1.5 text-base font-medium text-white/50">변호사</span>
            </h3>
            {/* 전문 분야 태그 */}
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {lawyer.specialties.map((spec) => (
                <span
                  key={spec}
                  className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 text-[0.6875rem] font-semibold text-amber-300"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 카드 본문 */}
      <div className="p-6 sm:p-8">
        {/* 소개글 */}
        <blockquote className="relative mb-7 rounded-xl border-l-[3px] border-amber-400 bg-slate-50 py-4 pl-5 pr-4">
          <p className="text-[0.8125rem] italic leading-relaxed text-slate-600 sm:text-sm">
            &ldquo;{lawyer.bio}&rdquo;
          </p>
        </blockquote>

        {/* 학력 + 경력 그리드 */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* 학력 */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#0a1628]">
                <GraduationCap size={12} className="text-amber-400" />
              </div>
              <span className="text-[0.75rem] font-bold uppercase tracking-wider text-slate-400">학력</span>
            </div>
            <ul className="space-y-2">
              {lawyer.education.map((edu, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/60" />
                  <span className="text-[0.8125rem] leading-snug text-slate-600">{edu}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 경력 */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#0a1628]">
                <Briefcase size={12} className="text-amber-400" />
              </div>
              <span className="text-[0.75rem] font-bold uppercase tracking-wider text-slate-400">주요 경력</span>
            </div>
            <ul className="space-y-2">
              {lawyer.career.map((c, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/60" />
                  <span className="text-[0.8125rem] leading-snug text-slate-600">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
