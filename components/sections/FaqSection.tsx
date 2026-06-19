import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { SectionHeading } from "@/components/common/SectionHeading";
import { FAQ_ITEMS } from "@/lib/constants/faqs";
import { SITE_CONFIG } from "@/lib/constants/site";

export function FaqSection() {
  return (
    <SectionWrapper id="faq" background="white" className="section-divider">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="FAQ"
          title="자주 묻는 질문"
          description="상담 전 자주 하시는 질문들을 모았습니다. 더 궁금한 점은 직접 상담을 통해 해결해드립니다."
        />

        <div className="grid gap-3">
          <Accordion multiple={false} className="contents">
            {FAQ_ITEMS.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="overflow-hidden rounded-xl border border-slate-200/70 bg-white shadow-[0_1px_6px_rgba(0,0,0,0.04)] transition-shadow data-[state=open]:border-amber-200 data-[state=open]:shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
              >
                <AccordionTrigger className="group px-5 py-4 text-left hover:no-underline sm:px-6 sm:py-5 [&[data-state=open]]:text-amber-700">
                  <span className="flex items-start gap-3.5">
                    {/* Q 번호 배지 */}
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-slate-100 text-[0.625rem] font-black text-slate-400 transition-colors group-aria-expanded:bg-amber-100 group-aria-expanded:text-amber-600">
                      Q
                    </span>
                    <span className="text-[0.9375rem] font-semibold leading-snug text-slate-800 transition-colors group-hover:text-amber-700 group-aria-expanded:text-amber-700">
                      {item.question}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5 sm:px-6 sm:pb-6">
                  <div className="flex gap-3.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-amber-50 text-[0.625rem] font-black text-amber-500">
                      A
                    </span>
                    <p className="text-[0.875rem] leading-relaxed text-slate-600">
                      {item.answer}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* 하단 안내 카드 */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-amber-200/50 bg-gradient-to-br from-amber-50 to-white p-6 sm:flex-row sm:p-7">
          <div>
            <p className="font-bold text-slate-800">원하시는 답변을 찾지 못하셨나요?</p>
            <p className="mt-1 text-sm text-slate-500">변호사에게 직접 질문하시면 정확한 답변을 드립니다.</p>
          </div>
          <Link
            href={SITE_CONFIG.contact.consultationUrl}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#0a1628] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0f2040] active:scale-[0.98]"
          >
            직접 상담 신청하기
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
