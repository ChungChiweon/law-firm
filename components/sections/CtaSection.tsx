import Link from "next/link";
import { ArrowRight, Bot, Phone, CheckCircle2 } from "lucide-react";
import { KakaoButton } from "@/components/common/KakaoButton";
import { SITE_CONFIG } from "@/lib/constants/site";

const CTA_CONTENT = {
  eyebrow: "비공개 상담",
  title: "혼자 결정하지 않아도 됩니다",
  subtitle:
    "말씀하기 어려운 상황도 괜찮습니다.\n여성 변호사가 함께 듣고, 할 수 있는 것을 함께 찾겠습니다.",
  notices: [
    "여성 변호사 직접 상담",
    "상담 내용 비공개 관리",
    "결과 보장 없음 · 수임 강요 없음",
    "초기 대응부터 함께합니다",
  ],
} as const;

export function CtaSection() {
  return (
    <section id="cta" className="relative overflow-hidden bg-[#060f1e]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,#0f2a5020,transparent)]" />
      <div className="absolute -left-48 bottom-0 h-80 w-80 rounded-full bg-amber-500/[0.04] blur-3xl" />
      <div className="absolute -right-48 top-0 h-80 w-80 rounded-full bg-amber-500/[0.04] blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">

          {/* 좌측 */}
          <div className="max-w-xl text-center lg:text-left">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/[0.08] px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span className="text-[0.6875rem] font-bold uppercase tracking-[0.15em] text-amber-400">
                {CTA_CONTENT.eyebrow}
              </span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
              {CTA_CONTENT.title}
            </h2>

            <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-slate-400 sm:text-[1.0625rem]">
              {CTA_CONTENT.subtitle}
            </p>

            <ul className="mt-7 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {CTA_CONTENT.notices.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-400">
                  <CheckCircle2 size={14} className="shrink-0 text-amber-500/70" strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 우측 CTA 카드 */}
          <div className="w-full max-w-sm shrink-0 lg:max-w-[340px]">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm sm:p-7">
              <p className="mb-5 text-center text-sm font-semibold text-slate-400">
                편한 방법으로 연락해 주세요
              </p>

              <div className="flex flex-col gap-3">
                <Link
                  href="/consultation/ai"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-4 text-[0.9375rem] font-bold text-white shadow-[0_4px_20px_rgba(245,158,11,0.25)] transition-all hover:bg-amber-400 hover:shadow-[0_6px_28px_rgba(245,158,11,0.35)] active:scale-[0.98]"
                >
                  <Bot size={16} />
                  AI로 상담 내용 정리하기
                  <ArrowRight size={15} className="ml-auto transition-transform group-hover:translate-x-0.5" />
                </Link>

                <Link
                  href={SITE_CONFIG.contact.consultationUrl}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 py-3.5 text-[0.9375rem] font-semibold text-white transition-colors hover:border-white/25 hover:bg-white/[0.05]"
                >
                  변호사 상담 연결하기
                </Link>

                <KakaoButton size="lg" className="w-full justify-center rounded-xl" />

                <a
                  href={`tel:${SITE_CONFIG.contact.phone}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-3.5 text-sm font-medium text-slate-400 transition-colors hover:border-white/20 hover:text-slate-200"
                >
                  <Phone size={14} />
                  {SITE_CONFIG.contact.phone}
                </a>
              </div>

              <p className="mt-4 text-center text-[0.75rem] text-slate-600">
                {SITE_CONFIG.businessHours}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
