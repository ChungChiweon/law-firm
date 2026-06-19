import Link from "next/link";
import { ArrowRight, Lock, Clock, UserCheck } from "lucide-react";
import { KakaoButton } from "@/components/common/KakaoButton";
import { SITE_CONFIG } from "@/lib/constants/site";

const HERO_CONTENT = {
  title: {
    line1: "혼자 감당하지 마세요.",
    line2: "망설이지 않아도 됩니다.",
  },
  subtitle:
    "데이트폭력·성범죄·스토킹 피해,\n여성 변호사가 함께 듣고 해결 방법을 찾겠습니다.",
  guarantees: [
    { icon: UserCheck, text: "여성 변호사 직접 상담" },
    { icon: Lock,      text: "비밀 완전 보장" },
    { icon: Clock,     text: "초기 대응 지원" },
  ],
  notices: "상담 내용 비공개 · 결과 보장 없음 · 수임 강요 없음",
  stats: [
    { value: "여성", label: "변호사 직접 상담" },
    { value: "비공개", label: "상담 내용 관리" },
    { value: "초기", label: "대응 중심 지원" },
  ],
} as const;

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#060f1e]">
      {/* 다층 배경 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,#0f2a50,transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_80%_60%,#1a3a6b26,transparent)]" />

      {/* 상단 골드 라인 */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/70 to-transparent" />

      {/* 미세 격자 */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* 우측 장식 원형 */}
      <div className="absolute -right-56 top-1/4 h-[600px] w-[600px] rounded-full border border-white/[0.04] bg-gradient-to-br from-white/[0.02] to-transparent" />
      <div className="absolute -right-32 top-1/3 h-[350px] w-[350px] rounded-full border border-amber-400/[0.06]" />
      <div className="absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-white/[0.06] to-transparent lg:block" />

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 pb-20 pt-24 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">

        {/* 센터명 뱃지 */}
        <div className="mb-7 flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-amber-500/20 bg-amber-500/[0.08] px-4 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
            </span>
            <span className="text-[11px] font-bold tracking-[0.1em] text-amber-300">
              {SITE_CONFIG.name}
            </span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 backdrop-blur-sm">
            <span className="text-[11px] font-semibold tracking-wide text-slate-400">
              {SITE_CONFIG.secondaryName}
            </span>
          </div>
        </div>

        {/* 타이틀 */}
        <div className="max-w-3xl">
          <h1 className="text-[2.25rem] font-extrabold leading-[1.22] tracking-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.18]">
            <span className="block text-slate-100">{HERO_CONTENT.title.line1}</span>
            <span className="mt-1 block text-amber-400 sm:mt-2">
              {HERO_CONTENT.title.line2}
            </span>
          </h1>

          {/* 구분선 */}
          <div className="mt-6 h-px w-16 bg-amber-500/40" />

          {/* 부제목 */}
          <p className="mt-5 max-w-lg whitespace-pre-line text-base leading-[1.85] text-slate-300 sm:text-[1.0625rem]">
            {HERO_CONTENT.subtitle}
          </p>

          {/* 보증 항목 */}
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2.5">
            {HERO_CONTENT.guarantees.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 text-sm text-slate-400">
                <Icon size={13} className="text-amber-500/80" strokeWidth={2} />
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* CTA 버튼 */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
            <Link
              href="/consultation/ai"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-amber-500 px-7 py-[0.9375rem] text-[0.9375rem] font-bold text-white shadow-[0_4px_24px_rgba(245,158,11,0.25)] transition-all duration-200 hover:bg-amber-400 hover:shadow-[0_6px_32px_rgba(245,158,11,0.35)] active:scale-[0.98] sm:text-base"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              AI로 상담 내용 정리하기
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
            </Link>

            <Link
              href={SITE_CONFIG.contact.consultationUrl}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-[0.9375rem] text-[0.9375rem] font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/15 sm:text-base"
            >
              비공개 상담 신청하기
            </Link>
          </div>

          <div className="mt-3.5">
            <KakaoButton size="lg" />
          </div>

          {/* 하단 신뢰 문구 */}
          <p className="mt-5 flex items-center gap-2.5 text-[0.8125rem] text-slate-600">
            <span className="inline-block h-px w-8 bg-slate-700" />
            {HERO_CONTENT.notices}
          </p>
        </div>

        {/* 통계 바 */}
        <div className="mt-16 grid grid-cols-3 gap-0 border-t border-white/[0.08] pt-8 sm:mt-20">
          {HERO_CONTENT.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`px-4 text-center sm:px-8 sm:text-left ${
                i < HERO_CONTENT.stats.length - 1 ? "border-r border-white/[0.08]" : ""
              }`}
            >
              <p className="text-xl font-black tracking-tight text-amber-400 sm:text-2xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[0.75rem] font-medium text-slate-500 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 스크롤 유도 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-1.5 opacity-40">
          <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/30 pt-1.5">
            <div className="h-2 w-0.5 animate-bounce rounded-full bg-white/60" />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-white/40">scroll</span>
        </div>
      </div>
    </section>
  );
}
