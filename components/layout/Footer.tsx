import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants/site";

const QUICK_LINKS = [
  { label: "비공개 상담 신청", href: SITE_CONFIG.contact.consultationUrl },
  { label: "AI 상담 정리", href: "/consultation/ai" },
  { label: "상담 분야", href: "/practice-areas" },
  { label: "상담 절차", href: "/process" },
  { label: "변호사 소개", href: "/lawyer" },
  { label: "자주 묻는 질문", href: "/faq" },
  { label: "문의", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "개인정보처리방침", href: "/privacy" },
  { label: "이용약관", href: "/terms" },
  { label: "면책사항", href: "/disclaimer" },
  { label: "문의", href: "/contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#060f1e]">
      {/* 상단 구분선 */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* 메인 푸터 영역 */}
        <div className="py-14 sm:py-16">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">

            {/* 브랜드 영역 */}
            <div className="lg:col-span-4">
              {/* 로고 */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <ShieldCheck size={20} strokeWidth={2} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-[1rem] font-extrabold text-white">{SITE_CONFIG.name}</p>
                  <p className="text-[0.6rem] font-semibold tracking-[0.08em] text-amber-500/70">
                    데이트폭력 · 스토킹 피해 상담
                  </p>
                </div>
              </div>

              <p className="mt-5 text-[0.8125rem] leading-relaxed text-slate-500">
                {SITE_CONFIG.description}
              </p>

              {/* 카카오 버튼 */}
              <a
                href={SITE_CONFIG.contact.kakaoChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#FEE500] px-4 py-2.5 text-sm font-bold text-[#3A1D1D] transition-colors hover:bg-[#e6ce00]"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 3C6.477 3 2 6.582 2 11c0 2.8 1.61 5.267 4.063 6.824L5.06 21.1a.5.5 0 0 0 .72.547l4.163-2.773A11.27 11.27 0 0 0 12 19c5.523 0 10-3.582 10-8S17.523 3 12 3z" />
                </svg>
                카카오톡 상담하기
              </a>
            </div>

            {/* 연락처 */}
            <div className="lg:col-span-3 lg:col-start-6">
              <h3 className="mb-5 text-[0.75rem] font-bold uppercase tracking-wider text-slate-500">
                연락처
              </h3>
              <ul className="space-y-3.5">
                <li>
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone}`}
                    className="flex items-center gap-3 text-sm text-slate-400 transition-colors hover:text-amber-400"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5">
                      <Phone size={12} className="text-amber-500" />
                    </div>
                    {SITE_CONFIG.contact.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="flex items-center gap-3 text-sm text-slate-400 transition-colors hover:text-amber-400"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5">
                      <Mail size={12} className="text-amber-500" />
                    </div>
                    {SITE_CONFIG.contact.email}
                  </a>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-400">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5">
                    <MapPin size={12} className="text-amber-500" />
                  </div>
                  <span className="leading-relaxed">{SITE_CONFIG.contact.address}</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-400">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5">
                    <Clock size={12} className="text-amber-500" />
                  </div>
                  {SITE_CONFIG.businessHours}
                </li>
              </ul>
            </div>

            {/* 링크들 */}
            <div className="lg:col-span-2 lg:col-start-10">
              <h3 className="mb-5 text-[0.75rem] font-bold uppercase tracking-wider text-slate-500">
                빠른 링크
              </h3>
              <ul className="space-y-2.5">
                {QUICK_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-400 transition-colors hover:text-amber-400"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* 하단 바 */}
        <div className="flex flex-col gap-3 border-t border-white/[0.07] py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-[0.75rem] text-slate-600">
              © {currentYear} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <div className="flex gap-3">
              {LEGAL_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[0.75rem] text-slate-600 transition-colors hover:text-slate-400"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <p className="text-[0.6875rem] text-slate-700">
            본 사이트는 법률 정보 제공 목적이며, 법률 조언으로 갈음할 수 없습니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
