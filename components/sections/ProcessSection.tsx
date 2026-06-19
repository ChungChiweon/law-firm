import Link from "next/link";
import { ArrowRight, FileText, Search, BookOpen, MessageSquare } from "lucide-react";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { SectionHeading } from "@/components/common/SectionHeading";
import { PROCESS_STEPS } from "@/lib/constants/process";
import { KakaoButton } from "@/components/common/KakaoButton";
import { SITE_CONFIG } from "@/lib/constants/site";

const STEP_ICONS = [FileText, Search, BookOpen, MessageSquare] as const;

export function ProcessSection() {
  return (
    <SectionWrapper id="process" background="navy">
      <SectionHeading
        eyebrow="Consultation Process"
        title="4단계 상담 절차"
        description="복잡한 절차 없이 간단하게 시작할 수 있습니다. 모든 결정은 의뢰인이 합니다."
        light
      />

      {/* 타임라인 */}
      <div className="relative mt-4">
        {/* 데스크탑 연결선 */}
        <div className="absolute left-0 right-0 top-[3.25rem] hidden h-px bg-gradient-to-r from-white/5 via-white/15 to-white/5 lg:block" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {PROCESS_STEPS.map((step, index) => {
            const Icon = STEP_ICONS[index];
            const isFirst = index === 0;
            return (
              <div key={step.step} className="relative flex gap-4 lg:flex-col lg:gap-0">
                {/* 모바일 수직선 */}
                {index < PROCESS_STEPS.length - 1 && (
                  <div className="absolute left-[1.625rem] top-14 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-white/15 to-white/5 lg:hidden" />
                )}

                {/* 스텝 서클 */}
                <div className="relative z-10 shrink-0 lg:mb-6">
                  <div className={`
                    flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full border-2 transition-all
                    ${isFirst
                      ? "border-amber-400 bg-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                      : "border-white/20 bg-white/5 backdrop-blur-sm"
                    }
                  `}>
                    <Icon
                      size={20}
                      strokeWidth={1.5}
                      className={isFirst ? "text-[#0a1628]" : "text-white/50"}
                    />
                  </div>
                  {/* 스텝 번호 */}
                  <div className={`
                    absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[0.625rem] font-black
                    ${isFirst ? "bg-[#0a1628] text-amber-400" : "bg-white/10 text-white/40"}
                  `}>
                    {step.step}
                  </div>
                </div>

                {/* 텍스트 */}
                <div className="pb-8 lg:pb-0">
                  <h3 className={`mb-2 text-[0.9375rem] font-bold leading-snug ${isFirst ? "text-white" : "text-slate-300"}`}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-500">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 구분선 */}
      <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* 하단 CTA */}
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
        <Link
          href={SITE_CONFIG.contact.consultationUrl}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-7 py-3.5 text-sm font-bold text-white shadow-[0_4px_20px_rgba(245,158,11,0.25)] transition-all hover:bg-amber-400 hover:shadow-[0_6px_28px_rgba(245,158,11,0.35)] active:scale-[0.98] sm:w-auto sm:text-[0.9375rem]"
        >
          비공개 상담 신청하기
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
        <KakaoButton size="md" />
      </div>
    </SectionWrapper>
  );
}
