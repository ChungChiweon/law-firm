import Link from "next/link";
import { Fragment } from "react";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { SectionHeading } from "@/components/common/SectionHeading";
import { PrintButton } from "@/components/common/PrintButton";
import { KakaoButton } from "@/components/common/KakaoButton";
import { SITE_CONFIG } from "@/lib/constants/site";
import {
  EVIDENCE_URGENT,
  EVIDENCE_BY_TYPE,
  EVIDENCE_TIPS,
} from "@/lib/constants/evidenceGuide";

// **굵게** 표시를 <strong>으로 변환하는 간단한 렌더러
function RichText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-bold text-slate-900">
            {part}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}

export function EvidenceGuideSection() {
  return (
    <SectionWrapper background="white">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="EVIDENCE"
          title="증거 보전 가이드"
          description="사건 초기의 대응이 결과를 좌우합니다. 지금 무엇을 남기고, 무엇을 하지 말아야 하는지 정리했습니다."
        />

        {/* 지금 당장 — Do / Don't */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-emerald-800">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-sm text-white">
                ✓
              </span>
              지금 해야 할 것
            </h3>
            <ul className="space-y-3">
              {EVIDENCE_URGENT.do.map((t, i) => (
                <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-slate-700">
                  <span className="mt-1 text-emerald-500">•</span>
                  <span><RichText text={t} /></span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-rose-800">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-600 text-sm text-white">
                ✕
              </span>
              하지 말아야 할 것
            </h3>
            <ul className="space-y-3">
              {EVIDENCE_URGENT.dont.map((t, i) => (
                <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-slate-700">
                  <span className="mt-1 text-rose-500">•</span>
                  <span><RichText text={t} /></span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 유형별 체크리스트 */}
        <h3 className="mb-5 mt-14 text-xl font-bold text-slate-900">
          피해 유형별 증거 체크리스트
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {EVIDENCE_BY_TYPE.map((cat) => (
            <div
              key={cat.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_6px_rgba(0,0,0,0.04)]"
            >
              <h4 className="mb-3 border-b border-slate-100 pb-3 font-bold text-slate-800">
                {cat.title}
              </h4>
              <ul className="space-y-2.5">
                {cat.items.map((item, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-slate-600">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {cat.tip && (
                <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2.5 text-xs leading-relaxed text-amber-800">
                  💡 {cat.tip}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* 정리 팁 */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="mb-3 font-bold text-slate-800">증거를 정리하는 팁</h3>
          <ul className="space-y-2">
            {EVIDENCE_TIPS.map((t, i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-slate-600">
                <span className="mt-1 text-slate-400">•</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 면책 안내 */}
        <p className="mt-6 text-xs leading-relaxed text-slate-400">
          ※ 본 가이드는 일반적인 정보 제공을 위한 것이며, 개별 사건에 대한 법률 자문을 대체하지
          않습니다. 구체적인 상황은 변호사 상담을 통해 확인하시기 바랍니다.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-amber-200/60 bg-gradient-to-br from-amber-50 to-white p-7 text-center print:hidden">
          <div>
            <p className="text-lg font-bold text-slate-800">
              내 상황에서 무엇이 증거가 되는지 궁금하다면
            </p>
            <p className="mt-1 text-sm text-slate-500">
              여성 변호사가 직접, 비공개로 검토해 드립니다.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <KakaoButton size="md" />
            <Link
              href={SITE_CONFIG.contact.consultationUrl}
              className="inline-flex items-center gap-2 rounded-md bg-[#0a1628] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0f2040] active:scale-[0.98] sm:text-base"
            >
              상담 신청하기
            </Link>
            <PrintButton />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 shrink-0 text-amber-500"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
