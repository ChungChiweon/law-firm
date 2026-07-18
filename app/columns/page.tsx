import type { Metadata } from "next";
import Link from "next/link";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { SectionHeading } from "@/components/common/SectionHeading";
import { COLUMNS } from "@/lib/constants/columns";

export const metadata: Metadata = {
  title: "법률 칼럼",
  description:
    "스토킹·데이트폭력·디지털성범죄·성범죄 피해에 대한 법률 정보와 초기 대응 가이드를 여성 변호사가 정리했습니다.",
};

export default function ColumnsPage() {
  return (
    <PublicLayout>
      <main className="pt-16 lg:pt-[72px]">
        <SectionWrapper background="white">
          <div className="mx-auto max-w-4xl">
            <SectionHeading
              eyebrow="LEGAL COLUMN"
              title="법률 칼럼"
              description="피해 유형별 초기 대응과 절차를 이해하기 쉽게 정리했습니다. 궁금한 점은 언제든 비공개로 상담하세요."
            />

            <ul className="grid gap-4 sm:grid-cols-2">
              {COLUMNS.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/columns/${c.slug}`}
                    className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_6px_rgba(0,0,0,0.04)] transition-all hover:border-amber-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
                  >
                    <span className="mb-3 inline-flex w-fit items-center rounded-full bg-amber-50 px-2.5 py-1 text-[0.6875rem] font-bold text-amber-700">
                      {c.category}
                    </span>
                    <h2 className="text-lg font-bold leading-snug text-slate-900">{c.title}</h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{c.excerpt}</p>
                    <span className="mt-4 flex items-center gap-2 text-[0.75rem] text-slate-400">
                      <time dateTime={c.date}>{c.date.replaceAll("-", ".")}</time>
                      <span>·</span>
                      <span>약 {c.readingMinutes}분</span>
                      <span className="ml-auto font-semibold text-amber-600">읽기 →</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </SectionWrapper>
      </main>
    </PublicLayout>
  );
}
