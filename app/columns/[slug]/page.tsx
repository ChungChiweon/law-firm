import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { KakaoButton } from "@/components/common/KakaoButton";
import { COLUMNS, getColumn } from "@/lib/constants/columns";
import { SITE_CONFIG } from "@/lib/constants/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return COLUMNS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const column = getColumn(slug);
  if (!column) return { title: "칼럼을 찾을 수 없습니다" };
  return {
    title: column.title,
    description: column.excerpt,
    keywords: column.keywords,
    openGraph: {
      title: `${column.title} | ${SITE_CONFIG.name}`,
      description: column.excerpt,
      type: "article",
      publishedTime: column.date,
    },
  };
}

export default async function ColumnDetailPage({ params }: Props) {
  const { slug } = await params;
  const column = getColumn(slug);
  if (!column) notFound();

  return (
    <PublicLayout>
      <main className="pt-16 lg:pt-[72px]">
        <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
          {/* 브레드크럼 */}
          <nav aria-label="breadcrumb" className="mb-6 flex items-center gap-1.5 text-[0.75rem] text-slate-400">
            <Link href="/" className="transition-colors hover:text-amber-600">홈</Link>
            <ChevronRight size={12} />
            <Link href="/columns" className="transition-colors hover:text-amber-600">법률 칼럼</Link>
            <ChevronRight size={12} />
            <span className="truncate text-slate-500">{column.category}</span>
          </nav>

          {/* 헤더 */}
          <header className="border-b border-slate-100 pb-6">
            <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-[0.6875rem] font-bold text-amber-700">
              {column.category}
            </span>
            <h1 className="mt-3 text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl">
              {column.title}
            </h1>
            <p className="mt-3 flex items-center gap-2 text-[0.8125rem] text-slate-400">
              <time dateTime={column.date}>{column.date.replaceAll("-", ".")}</time>
              <span>·</span>
              <span>약 {column.readingMinutes}분 분량</span>
            </p>
          </header>

          {/* 본문 */}
          <div className="mt-8 flex flex-col gap-8">
            {column.body.map((section, i) => (
              <section key={i}>
                <h2 className="mb-3 text-lg font-bold text-slate-900">{section.heading}</h2>
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="mb-3 text-[0.9375rem] leading-[1.8] text-slate-600">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>

          {/* 면책 */}
          <p className="mt-10 rounded-xl bg-slate-50 px-4 py-3 text-[0.75rem] leading-relaxed text-slate-400">
            ※ 본 칼럼은 일반적인 정보 제공을 위한 것이며, 개별 사건에 대한 법률 자문을 대체하지 않습니다.
            구체적인 상황은 변호사 상담을 통해 확인하시기 바랍니다.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-amber-200/60 bg-gradient-to-br from-amber-50 to-white p-7 text-center">
            <div>
              <p className="text-lg font-bold text-slate-800">내 상황이 궁금하다면</p>
              <p className="mt-1 text-sm text-slate-500">여성 변호사가 직접, 비공개로 검토해 드립니다.</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <KakaoButton size="md" />
              <Link
                href={SITE_CONFIG.contact.consultationUrl}
                className="inline-flex items-center gap-2 rounded-md bg-[#0a1628] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0f2040] active:scale-[0.98] sm:text-base"
              >
                상담 신청하기
              </Link>
            </div>
          </div>

          {/* 목록으로 */}
          <div className="mt-8">
            <Link
              href="/columns"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-amber-600"
            >
              <ArrowLeft size={15} />
              칼럼 목록으로
            </Link>
          </div>
        </article>
      </main>
    </PublicLayout>
  );
}
