import { Phone, MapPin, ChevronRight } from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { AREA_LABEL } from "@/lib/constants/admin";
import type { AdminConsultation } from "@/lib/supabase/types";

interface AdminConsultationCardProps {
  item: AdminConsultation;
  onClick: () => void;
}

export function AdminConsultationCard({ item, onClick }: AdminConsultationCardProps) {
  const createdAt = new Date(item.created_at).toLocaleDateString("ko-KR", {
    month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit",
  });

  return (
    <button
      onClick={onClick}
      className="w-full rounded-xl border border-slate-200 bg-white p-4 text-left shadow-[0_1px_6px_rgba(0,0,0,0.04)] transition hover:border-amber-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.07)] active:scale-[0.99]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* 이름 + 분야 */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-slate-900">{item.name}</span>
            <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[0.6875rem] font-medium text-slate-500">
              {AREA_LABEL[item.area] ?? item.area}
            </span>
          </div>

          {/* 연락처 + 지역 */}
          <div className="mt-1.5 flex flex-wrap items-center gap-3 text-[0.8125rem] text-slate-500">
            <span className="flex items-center gap-1">
              <Phone size={11} />
              {item.phone}
            </span>
            {item.region && (
              <span className="flex items-center gap-1">
                <MapPin size={11} />
                {item.region}
              </span>
            )}
          </div>

          {/* 내용 미리보기 */}
          <p className="mt-2 line-clamp-2 text-[0.8125rem] leading-relaxed text-slate-500">
            {item.content}
          </p>

          {/* 하단: 상태 + 날짜 */}
          <div className="mt-3 flex items-center gap-2">
            <StatusBadge status={item.status} size="sm" />
            <span className="text-[0.6875rem] text-slate-400">{createdAt}</span>
          </div>
        </div>

        <ChevronRight size={16} className="mt-1 shrink-0 text-slate-300" />
      </div>
    </button>
  );
}
