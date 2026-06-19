import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, Clock, MapPin, ArrowRight, Bot, Lock } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITE_CONFIG } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "문의",
  description: "성범죄 피해 상담센터에 문의하세요. 전화, 이메일, 카카오톡으로 연락하실 수 있습니다.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        <ContactHero />
        <div className="mx-auto max-w-3xl px-4 pb-20 pt-8 sm:px-6 sm:pb-24 lg:px-8">
          <div className="space-y-4">
            {/* 카카오톡 — 가장 빠른 방법 강조 */}
            <KakaoCard />

            {/* 연락처 정보 */}
            <ContactInfoCard />

            {/* 상담 신청 버튼 */}
            <ConsultationCard />

            {/* 비공개 안내 */}
            <PrivacyNoticeCard />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function ContactHero() {
  return (
    <div className="relative overflow-hidden bg-[#060f1e] pt-16">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,#0f2a50,transparent)]" />

      <div className="relative mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <p className="mb-2 text-[0.6875rem] font-bold uppercase tracking-[0.15em] text-amber-400/80">
          Contact Us
        </p>
        <h1 className="text-2xl font-extrabold text-white sm:text-3xl">문의</h1>
        <p className="mt-2.5 text-[0.875rem] leading-relaxed text-slate-400">
          편한 방법으로 연락해 주세요. 상담 내용은 비공개로 관리됩니다.
        </p>
        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  );
}

function KakaoCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-yellow-200 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      <div className="border-b border-yellow-100 bg-yellow-50 px-6 py-3.5">
        <p className="text-[0.75rem] font-bold uppercase tracking-wider text-yellow-700">가장 빠른 방법</p>
      </div>
      <div className="px-6 py-6">
        <p className="mb-1 text-[0.9375rem] font-bold text-slate-900">카카오톡 상담</p>
        <p className="mb-5 text-[0.8125rem] text-slate-500">
          채팅으로 편하게 연락하세요. 문자보다 빠르게 안내해 드립니다.
        </p>
        <a
          href={SITE_CONFIG.contact.kakaoChannelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#FEE500] py-3.5 text-[0.9375rem] font-bold text-[#3A1D1D] shadow-[0_4px_16px_rgba(254,229,0,0.35)] transition hover:bg-[#e6ce00] hover:shadow-[0_6px_24px_rgba(254,229,0,0.45)] active:scale-[0.98]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 3C6.477 3 2 6.582 2 11c0 2.8 1.61 5.267 4.063 6.824L5.06 21.1a.5.5 0 0 0 .72.547l4.163-2.773A11.27 11.27 0 0 0 12 19c5.523 0 10-3.582 10-8S17.523 3 12 3z" />
          </svg>
          카카오톡으로 연락하기
        </a>
      </div>
    </div>
  );
}

function ContactInfoCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      <div className="border-b border-slate-100 bg-slate-50 px-6 py-3.5">
        <h2 className="text-[0.875rem] font-bold text-slate-800">연락처 안내</h2>
      </div>
      <div className="divide-y divide-slate-50 px-6 py-2">
        <ContactRow
          icon={<Phone size={15} className="text-amber-500" />}
          label="전화"
          value={SITE_CONFIG.contact.phone}
          href={`tel:${SITE_CONFIG.contact.phone}`}
        />
        <ContactRow
          icon={<Mail size={15} className="text-amber-500" />}
          label="이메일"
          value={SITE_CONFIG.contact.email}
          href={`mailto:${SITE_CONFIG.contact.email}`}
        />
        <ContactRow
          icon={<Clock size={15} className="text-amber-500" />}
          label="상담 시간"
          value={SITE_CONFIG.businessHours}
        />
        <ContactRow
          icon={<MapPin size={15} className="text-amber-500" />}
          label="주소"
          value={SITE_CONFIG.contact.address}
        />
      </div>
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4 py-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50">
        {icon}
      </div>
      <div>
        <p className="text-[0.75rem] font-semibold text-slate-400">{label}</p>
        <p className="mt-0.5 text-[0.875rem] text-slate-800">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block transition-colors hover:bg-slate-50">
        {content}
      </a>
    );
  }
  return <div>{content}</div>;
}

function ConsultationCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      <div className="border-b border-slate-100 bg-slate-50 px-6 py-3.5">
        <h2 className="text-[0.875rem] font-bold text-slate-800">온라인 상담 신청</h2>
      </div>
      <div className="px-6 py-6">
        <p className="mb-5 text-[0.8125rem] leading-relaxed text-slate-500">
          시간이 없거나 통화가 어려우시면 온라인으로 내용을 남겨 주세요.
          여성 변호사가 직접 확인 후 영업일 기준 1일 이내에 연락드립니다.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/consultation/ai"
            className="group flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-amber-200 bg-amber-50 px-5 py-3.5 text-[0.875rem] font-bold text-amber-800 transition-all hover:border-amber-400 hover:bg-amber-100 active:scale-[0.98]"
          >
            <Bot size={16} className="text-amber-600" />
            AI로 먼저 정리하기
            <ArrowRight size={14} className="ml-auto transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/consultation"
            className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0a1628] px-5 py-3.5 text-[0.875rem] font-bold text-white transition-all hover:bg-[#0f2040] active:scale-[0.98]"
          >
            비공개 상담 신청
            <ArrowRight size={14} className="ml-auto transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function PrivacyNoticeCard() {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-200/60 bg-white px-5 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      <Lock size={14} className="mt-0.5 shrink-0 text-slate-400" />
      <p className="text-[0.8125rem] leading-relaxed text-slate-500">
        상담 내용은 담당 변호사 외에 공개되지 않습니다. 연락 주신 내용은{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-slate-700">
          개인정보처리방침
        </Link>
        에 따라 처리됩니다. 결과를 보장하지 않으며, 수임을 강요하지 않습니다.
      </p>
    </div>
  );
}
