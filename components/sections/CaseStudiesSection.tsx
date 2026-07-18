import { SectionWrapper } from "@/components/common/SectionWrapper";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CASE_STUDIES } from "@/lib/constants/cases";

export function CaseStudiesSection() {
  return (
    <SectionWrapper background="slate" className="section-divider">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="CASES"
          title="이렇게 도와드렸습니다"
          description="실제 사건을 식별할 수 없도록 각색한 상담 예시입니다. 결과를 보장하지는 않지만, 어떻게 접근하는지 참고하실 수 있습니다."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {CASE_STUDIES.map((c) => (
            <div
              key={c.id}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_6px_rgba(0,0,0,0.04)]"
            >
              <span className="mb-3 inline-flex w-fit items-center rounded-full bg-slate-100 px-2.5 py-1 text-[0.6875rem] font-bold text-slate-500">
                {c.category}
              </span>
              <div className="mb-3">
                <p className="mb-1 text-[0.6875rem] font-bold uppercase tracking-wider text-slate-400">상황</p>
                <p className="text-sm leading-relaxed text-slate-700">{c.situation}</p>
              </div>
              <div>
                <p className="mb-1 text-[0.6875rem] font-bold uppercase tracking-wider text-amber-600">접근 방식</p>
                <p className="text-sm leading-relaxed text-slate-600">{c.approach}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-[0.75rem] text-slate-400">
          ※ 위 사례는 이해를 돕기 위한 일반화된 예시이며, 결과를 보장하지 않습니다.
        </p>
      </div>
    </SectionWrapper>
  );
}
