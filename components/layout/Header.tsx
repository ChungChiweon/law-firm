"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone, ChevronRight } from "lucide-react";
import { SITE_CONFIG, NAV_ITEMS } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          isScrolled
            ? "border-b border-slate-100 bg-white/98 shadow-[0_1px_20px_rgba(0,0,0,0.08)] backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        {/* 상단 골드 라인 (투명 상태에서만) */}
        {!isScrolled && (
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
        )}

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-[68px]">

            {/* 로고 */}
            <Link
              href="/"
              className="group flex items-center gap-3"
              onClick={closeMenu}
            >
              {/* 로고 마크 */}
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                isScrolled ? "bg-[#0a1628]" : "bg-amber-500/20 border border-amber-500/30"
              )}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 3L4 7v5c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V7L12 3z"
                    fill={isScrolled ? "#f59e0b" : "#fbbf24"} opacity="0.9" />
                </svg>
              </div>
              {/* 텍스트 */}
              <div className="flex flex-col leading-none">
                <span className={cn(
                  "text-[0.9375rem] font-bold tracking-tight transition-colors",
                  isScrolled ? "text-slate-900" : "text-white"
                )}>
                  {SITE_CONFIG.name}
                </span>
                <span className={cn(
                  "text-[0.6rem] font-semibold tracking-[0.1em] transition-colors",
                  isScrolled ? "text-amber-600" : "text-amber-400/80"
                )}>
                  데이트폭력·스토킹 피해 상담
                </span>
              </div>
            </Link>

            {/* 데스크탑 네비게이션 */}
            <nav className="hidden items-center gap-1 lg:flex">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md px-3.5 py-2 text-sm font-medium transition-all duration-200 hover:text-amber-600",
                    isScrolled
                      ? "text-slate-600 hover:bg-slate-50"
                      : "text-white/80 hover:bg-white/8 hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* 데스크탑 우측 액션 */}
            <div className="hidden items-center gap-3 lg:flex">
              <a
                href={`tel:${SITE_CONFIG.contact.phone}`}
                className={cn(
                  "flex items-center gap-1.5 text-[0.8125rem] font-medium transition-colors hover:text-amber-500",
                  isScrolled ? "text-slate-500" : "text-white/60"
                )}
              >
                <Phone size={13} strokeWidth={2} />
                {SITE_CONFIG.contact.phone}
              </a>
              <div className={cn("h-4 w-px", isScrolled ? "bg-slate-200" : "bg-white/15")} />
              <Link
                href={SITE_CONFIG.contact.consultationUrl}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200",
                  isScrolled
                    ? "bg-[#0a1628] text-white hover:bg-[#0f2040]"
                    : "border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/15"
                )}
              >
                무료 상담
                <ChevronRight size={13} />
              </Link>
            </div>

            {/* 모바일 메뉴 버튼 */}
            <button
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg transition-all lg:hidden",
                isScrolled
                  ? "text-slate-700 hover:bg-slate-100"
                  : "text-white hover:bg-white/10"
              )}
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 메뉴 오버레이 */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* 모바일 메뉴 슬라이드 패널 */}
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-out lg:hidden",
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="min-h-[60vh] border-b border-slate-100 bg-white pb-8 pt-4 shadow-2xl">
          {/* 패널 헤더 */}
          <div className="flex items-center justify-between px-4 pb-4 pt-2 sm:px-6">
            <Link href="/" className="flex items-center gap-2.5" onClick={closeMenu}>
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0a1628]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 3L4 7v5c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V7L12 3z" fill="#f59e0b" />
                </svg>
              </div>
              <span className="text-sm font-bold text-slate-900">{SITE_CONFIG.name}</span>
            </Link>
            <button
              onClick={closeMenu}
              className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              aria-label="메뉴 닫기"
            >
              <X size={18} />
            </button>
          </div>

          {/* 네비게이션 */}
          <nav className="px-3 sm:px-5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between rounded-lg px-3 py-3.5 text-[0.9375rem] font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-amber-700"
                onClick={closeMenu}
              >
                {item.label}
                <ChevronRight size={16} className="text-slate-300" />
              </Link>
            ))}
          </nav>

          {/* 모바일 CTA */}
          <div className="mt-4 space-y-2.5 border-t border-slate-100 px-4 pt-5 sm:px-6">
            <a
              href={`tel:${SITE_CONFIG.contact.phone}`}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 py-3 text-sm font-medium text-slate-600 transition-colors hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700"
            >
              <Phone size={15} />
              {SITE_CONFIG.contact.phone} 전화 상담
            </a>
            <a
              href={SITE_CONFIG.contact.kakaoChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#FEE500] py-3 text-sm font-bold text-[#3A1D1D] transition-colors hover:bg-[#e6ce00]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 3C6.477 3 2 6.582 2 11c0 2.8 1.61 5.267 4.063 6.824L5.06 21.1a.5.5 0 0 0 .72.547l4.163-2.773A11.27 11.27 0 0 0 12 19c5.523 0 10-3.582 10-8S17.523 3 12 3z" />
              </svg>
              카카오톡 상담
            </a>
            <Link
              href={SITE_CONFIG.contact.consultationUrl}
              className="flex w-full items-center justify-center rounded-lg bg-[#0a1628] py-3 text-sm font-bold text-white transition-colors hover:bg-[#0f2040]"
              onClick={closeMenu}
            >
              무료 상담 신청하기
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
