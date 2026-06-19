import { UserCheck, Lock, Clock, ShieldOff, Phone } from "lucide-react";
import { GUIDE_ITEMS } from "@/lib/constants/consultation";
import { SITE_CONFIG } from "@/lib/constants/site";

const ICON_MAP: Record<string, React.ElementType> = {
  UserCheck,
  Lock,
  Clock,
  ShieldOff,
};

export function ConsultationGuide() {
  return (
    <aside className="flex flex-col gap-5">
      {/* 안내 카드 */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
        {/* 카드 헤더 */}
        <div className="bg-gradient-to-r from-[#060f1e] to-[#0a1f3c] px-5 py-4 sm:px-6">
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-amber-400/80">
            Consultation Guide
          </p>
          <h2 className="mt-0.5 text-base font-bold text-white">
            상담 전에 꼭 확인하세요
          </h2>
        </div>

        {/* 가이드 항목 */}
        <ul className="divide-y divide-slate-100">
          {GUIDE_ITEMS.map((item) => {
            const Icon = ICON_MAP[item.icon] ?? ShieldOff;
            return (
              <li key={item.title} className="flex gap-4 px-5 py-4 sm:px-6">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50">
                  <Icon size={15} className="text-amber-600" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-[0.8125rem] font-semibold text-slate-800">{item.title}</p>
                  <p className="mt-0.5 text-[0.75rem] leading-relaxed text-slate-500">
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 빠른 연락 카드 */}
      <div className="rounded-2xl border border-slate-200/60 bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.05)] sm:p-6">
        <p className="mb-1 text-[0.75rem] font-bold uppercase tracking-wider text-slate-400">
          빠른 상담
        </p>
        <p className="mb-4 text-sm font-semibold text-slate-700">
          지금 바로 연락하고 싶으신가요?
        </p>

        <div className="flex flex-col gap-2.5">
          <a
            href={SITE_CONFIG.contact.kakaoChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FEE500] py-3 text-sm font-bold text-[#3A1D1D] transition-colors hover:bg-[#e6ce00] active:scale-[0.98]"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 3C6.477 3 2 6.582 2 11c0 2.8 1.61 5.267 4.063 6.824L5.06 21.1a.5.5 0 0 0 .72.547l4.163-2.773A11.27 11.27 0 0 0 12 19c5.523 0 10-3.582 10-8S17.523 3 12 3z" />
            </svg>
            카카오톡 상담
          </a>
          <a
            href={`tel:${SITE_CONFIG.contact.phone}`}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-medium text-slate-600 transition-colors hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700"
          >
            <Phone size={14} />
            {SITE_CONFIG.contact.phone}
          </a>
        </div>

        <p className="mt-3 text-center text-[0.6875rem] text-slate-400">
          {SITE_CONFIG.businessHours}
        </p>
      </div>

      {/* 하단 신뢰 문구 */}
      <p className="rounded-xl bg-slate-50 px-4 py-3 text-center text-[0.75rem] leading-relaxed text-slate-500">
        상담 후 수임 강요는 일절 없으며,<br />
        언제든 자유롭게 결정하실 수 있습니다.
      </p>
    </aside>
  );
}
