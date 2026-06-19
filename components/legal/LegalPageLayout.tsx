import Link from "next/link";
import { ChevronRight, AlertTriangle } from "lucide-react";

interface LegalPageLayoutProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  breadcrumb: string;
  lastUpdated?: string;
  requiresReview?: boolean;
  children: React.ReactNode;
}

// Header/Footer는 PublicLayout이 담당 — 이 컴포넌트는 법적 페이지 본문 구조만 담당
export function LegalPageLayout({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
  lastUpdated,
  requiresReview = true,
  children,
}: LegalPageLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="relative overflow-hidden bg-[#060f1e] pt-16">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,#0f2a50,transparent)]" />

        <div className="relative mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="breadcrumb" className="mb-5 flex items-center gap-1.5 text-[0.75rem] text-slate-500">
            <Link href="/" className="transition-colors hover:text-amber-400">홈</Link>
            <ChevronRight size={12} className="text-slate-700" />
            <span className="text-slate-400">{breadcrumb}</span>
          </nav>

          <p className="mb-2 text-[0.6875rem] font-bold uppercase tracking-[0.15em] text-amber-400/80">
            {eyebrow}
          </p>
          <h1 className="text-2xl font-extrabold text-white sm:text-3xl">{title}</h1>
          <p className="mt-2.5 text-[0.875rem] leading-relaxed text-slate-400">{subtitle}</p>

          {lastUpdated && (
            <p className="mt-4 text-[0.75rem] text-slate-600">최종 업데이트: {lastUpdated}</p>
          )}

          <div className="mt-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </div>

      {/* 본문 */}
      <div className="mx-auto max-w-3xl px-4 pb-20 pt-8 sm:px-6 sm:pb-24 lg:px-8">
        {requiresReview && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5">
            <AlertTriangle size={15} className="mt-0.5 shrink-0 text-amber-500" />
            <p className="text-[0.8125rem] text-amber-800">
              <strong>실제 운영 전 법률 전문가 검토가 필요합니다.</strong>{" "}
              이 문서는 초안이며, 사무소의 실제 운영 방침에 맞게 수정이 필요합니다.
            </p>
          </div>
        )}
        <div className="space-y-4">{children}</div>
      </div>
    </main>
  );
}
