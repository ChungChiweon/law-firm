"use client";

import { Phone, MapPin, ExternalLink, FileText } from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { AREA_LABEL } from "@/lib/constants/admin";
import type { AdminConsultation } from "@/lib/supabase/types";

interface AdminConsultationTableProps {
  items: AdminConsultation[];
  onSelect: (item: AdminConsultation) => void;
}

export function AdminConsultationTable({ items, onSelect }: AdminConsultationTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50">
            {["접수일시", "이름", "연락처", "분야", "지역", "상담 내용", "상태", ""].map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-[0.7rem] font-bold uppercase tracking-wider text-slate-400 first:pl-5 last:pr-4"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {items.map((item) => (
            <TableRow key={item.id} item={item} onSelect={onSelect} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableRow({ item, onSelect }: { item: AdminConsultation; onSelect: (i: AdminConsultation) => void }) {
  const createdAt = new Date(item.created_at).toLocaleString("ko-KR", {
    month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit",
  });

  return (
    <tr
      className="group cursor-pointer transition-colors hover:bg-amber-50/50"
      onClick={() => onSelect(item)}
    >
      <td className="whitespace-nowrap pl-5 py-3.5 text-[0.8125rem] text-slate-500">
        {createdAt}
      </td>
      <td className="px-4 py-3.5 font-semibold text-slate-800">
        {item.name}
        {item.memo && (
          <FileText size={11} className="ml-1.5 inline text-amber-400" aria-label="메모 있음" />
        )}
      </td>
      <td className="px-4 py-3.5">
        <a
          href={`tel:${item.phone}`}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 text-[0.8125rem] text-amber-600 hover:underline"
        >
          <Phone size={11} />
          {item.phone}
        </a>
      </td>
      <td className="px-4 py-3.5">
        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[0.75rem] font-medium text-slate-600">
          {AREA_LABEL[item.area] ?? item.area}
        </span>
      </td>
      <td className="px-4 py-3.5 text-[0.8125rem] text-slate-500">
        {item.region ? (
          <span className="flex items-center gap-1">
            <MapPin size={11} />
            {item.region}
          </span>
        ) : (
          <span className="text-slate-300">—</span>
        )}
      </td>
      <td className="max-w-[220px] px-4 py-3.5">
        <p className="truncate text-[0.8125rem] text-slate-500">{item.content}</p>
      </td>
      <td className="px-4 py-3.5">
        <StatusBadge status={item.status} size="sm" />
      </td>
      <td className="pr-4 py-3.5 text-right">
        <button
          onClick={() => onSelect(item)}
          className="rounded-lg p-1.5 text-slate-300 transition hover:bg-slate-100 hover:text-slate-600"
          aria-label="상세보기"
        >
          <ExternalLink size={14} />
        </button>
      </td>
    </tr>
  );
}
